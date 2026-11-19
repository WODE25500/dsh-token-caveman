// Guards the manifest defects that break installation.
//
// DSH validates an installed package by reading its package.json and parsing it
// with JSON.parse. A UTF-8 BOM in that file makes the parse fail, and the CLI
// then reports the failure as an install-time SyntaxError on a package that
// otherwise looks fine:
//
//   dsh: installation rejected: Cannot validate installed package <name>:
//   SyntaxError: Unexpected token '﻿', "﻿{ ... " is not valid JSON
//
// Some Windows editors add that BOM silently, so it is worth a test rather than
// a comment. This script also keeps dsh.bundle.patch honest: a patch path that
// does not exist installs without error and then does nothing.

import { readFile, stat } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const failures = []
const BOM = '\uFEFF'

const raw = await readFile(join(root, 'package.json'))
if (raw.length >= 3 && raw[0] === 0xef && raw[1] === 0xbb && raw[2] === 0xbf) {
  failures.push('package.json starts with a UTF-8 BOM; JSON.parse rejects it, so installation fails')
}

const text = raw.toString('utf8')
let manifest
try {
  manifest = JSON.parse(text.startsWith(BOM) ? text.slice(1) : text)
} catch (error) {
  failures.push(`package.json is not valid JSON: ${error.message}`)
}

if (manifest) {
  for (const key of ['name', 'version']) {
    if (!manifest[key]) failures.push(`package.json is missing ${key}`)
  }

  const patch = manifest.dsh?.bundle?.patch
  if (!patch) {
    failures.push('package.json is missing dsh.bundle.patch')
  } else {
    try {
      await stat(join(root, patch))
    } catch {
      failures.push(`dsh.bundle.patch points at a file that does not exist: ${patch}`)
    }
  }

  const skills = manifest.files ?? []
  if (!skills.includes('skills')) {
    failures.push('package.json files[] must ship the skills/ directory')
  }
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`FAIL ${failure}`)
  process.exit(1)
}

console.log('ok: package.json is BOM-free JSON, its bundle patch exists, and skills/ is shipped')
