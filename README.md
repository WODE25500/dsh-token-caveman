# dsh-token-caveman

**Terse prose — fewer tokens on the way out. Style, never substance.** — a DeepSeek Harness (dsh) skill, layer caveman of a four-layer token-saving family.

Compress the agent own output so every reply costs fewer tokens. A style discipline that cuts throat-clearing and padding without ever dropping the content the task needs.

> Family: [dsh-token-skills](https://github.com/WODE25500/dsh-token-skills) groups all four layers — handoff, rtk, headroom, caveman.

## Install

DSH Desktop manages its own profile. Use **Plugins → Add plugin** there and point it at this directory; that installs the bundle and registers it in the profile the desktop app actually runs.

Command line, with `dsh` on your PATH — `--profile` is required, and the profile name has to be the one you run:

    dsh plugin --profile desktop add dsh-token-caveman

`dsh plugin` only forwards its arguments to pnpm inside that profile directory. The package gets installed, but the bundle still has to be enabled in the profile. Note that `--profile web` is a different profile: installing there does not make the skill show up in DSH Desktop.

After installing, start a new session so the skill catalog picks it up. Then tell the agent to use the skill, or just mention: `dsh-token-caveman`.

## Upstream

Based on / referencing [https://www.npmjs.com/package/skill-caveman](https://www.npmjs.com/package/skill-caveman). This repo is the DSH adaptation — a thin skill, not a re-implementation of the engine.

## License

MIT
