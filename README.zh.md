# dsh-token-caveman

**Terse prose — fewer tokens on the way out. Style, never substance.** — 一个 DeepSeek Harness (dsh) skill,四层省 Token 家族的第 caveman 层。

输出极简——让回复少花 token。一种措辞纪律,砍掉开场白与啰嗦,但从不丢任务需要的内容。

> 家族:[dsh-token-skills](https://github.com/WODE25500/dsh-token-skills) 包含全部四层 — handoff、rtk、headroom、caveman。

## 安装

DSH 桌面端自己管理自己的 profile。用桌面端的 **插件 → 添加插件**,指向本目录:它会把这个 bundle 装进桌面端真正在跑的那个 profile。

命令行(需 `dsh` 在 PATH 上),`--profile` 是必填项,名字必须是你在用的那个 profile:

    dsh plugin --profile desktop add dsh-token-caveman

`dsh plugin` 只是把参数转发给该 profile 目录里的 pnpm —— 包装上了,但 bundle 还得在这个 profile 里启用。注意 `--profile web` 是另一个 profile:装到那里,桌面端看不到这个 skill。

装完开一个新会话,技能目录才会收录它。然后直接让 agent 用这个技能,或者提一句 `dsh-token-caveman`。

## 上游

基于/引用 [https://www.npmjs.com/package/skill-caveman](https://www.npmjs.com/package/skill-caveman)。本仓库是 DSH 适配 — 一个薄 skill,不重造引擎。

## 许可

MIT
