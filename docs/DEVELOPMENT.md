# 开发与设计

本文档面向想改代码、适配新版 DSH 或审查实现的人。用户安装与使用请看 [README](../README.zh.md)。

## 环境要求

- DeepSeek Harness `0.2.1-rc.2` 或兼容的 0.2.x Web 组合。
- 包含 `@deepseek-ai/dsh-client-ui-workspace` 的 Web / Desktop 组合（官方默认组合都包含）。
- 文件拖拽引用还需要右侧栏的 `@deepseek-ai/dsh-client-ui-sidebar-files` 文件页（官方默认组合包含）。
- 桌面端与 `dsh web` 均可使用。

## 构建

```powershell
pnpm install
pnpm typecheck
pnpm build
pnpm verify
```

构建产物：

- `lib/index.js`：Host 半侧。空 `apply()`，只负责让 Loader 发现本包并暴露浏览器半侧。
- `lib/client.js`：浏览器半侧。`scripts/build.mjs` 用 esbuild 打包成 CJS，再包进
  `window.__ModuleLoader__.load({ id, factory })`；React、React DOM 与 `@deepseek-ai/*`
  保持 external，由 DSH 的静态模块表提供。
- `lib/types/**`：最小类型声明。

> 在当前 Windows 环境里，`pnpm typecheck` 可能因 pnpm 自身的 modules 目录处理而中止；可以直接运行 `node_modules/.bin/tsc --noEmit`。`lib` 目录在 workspace-write 沙箱下可能因 ACL 拒绝写入，构建需要更宽的权限。

## 目录

```text
src/index.ts                     Host 半侧（no-op）
src/client/index.ts              浏览器入口：注册 shell.overlay Slot
src/client/overlay.tsx           悬浮球、快速面板、Toast
src/client/new-session-namer.tsx 工作区 `+` 的新建命名对话框与空会话标题显示
src/client/file-drag.ts          文件树行拖拽到输入框，插入 `@路径` 引用
src/client/edit-resend.tsx       最后一条提示词的内联编辑、轮次前 fork 与重发
src/client/timeline.tsx          右侧消息时间线
src/client/store.ts              localStorage 状态、宽度双向同步
src/client/hooks.ts              会话切换等 Hook
src/client/styles.css            全部样式（DSH 主题 token）
scripts/build.mjs                esbuild 构建与 Module Loader 包装
cordis.patch.yml                 Host bundle 插入行
assets/*.svg                    README 横幅与功能演示图
```

## 使用的公开扩展点

- `shell.overlay`：悬浮球、面板、时间线、新建命名对话框、Toast。
- 公开服务：`ctx.sessions.create`、`ctx.sessions.fork`、`ctx.sessions.using(...).binding.session.rename` / `loadThrough` / `prompt`、`ctx.workspaces.archiveSession`、`ctx.uiWorkspace.openSession`。
- 文件引用：`ctx.conversation.input.for(actx)` 返回的 `SessionInput`；`actions.captureInsertion()` + `insertReference()` 插入与原生 `@` 补全相同的结构化引用。
- DOM 标记：`[data-row-key="workspace:<id>"]`（工作区标题行）、`[data-row-key="session:<id>"]`、
  `[data-files-entry="file"]` / `[data-files-entry="directory"]` / `[data-files-path]`（文件树行）、`[data-composer-card]`（输入框卡片）、
  `[data-conversation-scroll]`、`[data-chat-flow-kind="user"]`、`[data-chat-flow-key]`（前缀是事件 seq）、`[data-clock]`（消息操作行）、`[data-chat-group-part]`。
- CSS 变量：`--dsh-chat-user-width`、`--dsh-chat-content-width` 与 `--dsw-alias-*` 主题 token。

## 设计取舍

- **宽度双向同步**：优先写 DSH 的宽度偏好，同时观察 DSH 自己的宽度手柄变化，避免两套控件互相打架。
- **时间线按问答轮次**：一个用户提问 + 随后的助手回答合并成一个节点，节点锚定在用户提问处；DSH 自带的轮次导航保留，本插件提供问答级定位。
- **原生轮次导航可隐藏**：悬浮球面板默认隐藏 DSH 右侧的横条 TurnNavigator；实现上给 `[data-conversation-scroll]` 内带 `_frame` class 的 `nav[aria-label]` 加标记，再用 CSS 隐藏。用户可在面板里重新打开。
- **命名先于创建**：对话框在创建 Session 前拦截，取消不会留下空会话；创建后通过公开的 Session 引用写入标题，再打开会话。
- **文件拖拽只写引用**：不读取文件内容、不调用上传、不移动或复制文件；只把现有路径作为 `@path` chip 插入草稿，和桌面端原生拖入文件的行为一致。
- **编辑重发是“轮次前 fork + 新提示词”**：DSH 日志不可原地改写；插件用 `[data-chat-flow-key]` 的事件 seq 找到最后一条用户消息，`loadThrough` 后定位携带该消息的 `agent/inbox/spliced`，在它之前 `sessions.fork`。这样原提示词（包括 inbox 副本）和被暂停的那一轮都不会进入新分支；新分支继承历史与标题，原对话归档。
- **编辑入口嵌入原生操作行**：在最后一条用户消息的 `[data-clock]` 操作行末尾追加铅笔图标（DOM 注入；React 重渲染后被 MutationObserver 重挂）。点击后把该 flow item 的 `minHeight` 扩到编辑器高度，并在同一位置渲染全宽内联编辑器；取消/发送后恢复原高度，下面的内容随之回落。这样既保持原生消息形式，又让被编辑的消息在流内占位。

## 已知限制

- 设置只存在当前浏览器，不跨设备同步。
- 时间线依赖 Chat 视图的 `data-chat-flow-*` 标记；Trajectory 视图没有这些标记。
- 工作区行的 `+` 没有公开 Slot，插件按“工作区标题行最后一个按钮”识别；DSH 调整该行 DOM 后需要同步适配。
- 命名后的空会话在首轮消息前仍被 Host 视为 blank，侧边栏名称是插件对该行的显示替换，不改写 Host 的 blank 状态。
- 文件树没有公开的拖拽 API，插件按 `data-files-entry` / `data-files-path` 标记文件与文件夹行并自行标记 `draggable`；DSH 调整该面板 DOM 后需要同步适配。
- 隐藏原生轮次导航依赖 DSH Chat 的 `[data-conversation-scroll] nav[aria-label]` 和 class 后缀 `_frame`；DSH 升级后如结构变化需要同步适配。
- 引用会插入到输入框当前光标/选区，而不是鼠标落点。
- 编辑重发会产生新的 Session ID，并把原对话归档；原提示词中的图片/文件附件不会重发（`PromptContentPart` 的图片需要重新读取字节，文件需要新的上传 receipt）。
- 编辑重发的 fork 边界依赖 `agent/inbox/spliced` 携带提示词 id；如果 DSH 改变日志结构，会退化为“轮次前边界”，仍能移除用户消息，但可能保留一个空的 turn 起始。
- 插件按 DSH `0.2.1-rc.2` 的 Slot / DOM / 公开服务契约开发；DSH 升级后如标记或接口变化需要同步适配。

## 本地数据

| 键 | 内容 |
| --- | --- |
| `dsh-enhance.state.v1` | 宽度、时间线/新建命名开关、悬浮球位置；旧版文件夹字段保留但不再显示 |
| `dsh.conversation.contentWidth` | 与 DSH 共用的对话宽度偏好（px） |

清理方式：在开发者工具中删除上述键，或在插件面板中重置对应设置。
