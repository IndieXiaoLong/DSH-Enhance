# 发布到插件市场

DSH 目前有两类市场入口，发布方式不同。

## A. DSH Discover（自建 format 1 索引）

Discover 支持用户添加自建索引 URL；仓库没有通往全局官方索引的发布权限或后台上传入口。`market/index.json` 是本项目的索引文件，推送到 GitHub 后可通过下面的 Raw HTTPS 地址提供给 Discover，用户仍需在 **设置 → Discover** 手动添加。

```text
https://raw.githubusercontent.com/IndieXiaoLong/DSH-Enhance/main/market/index.json
```

发布步骤：

1. 把包发布到 npm（或准备一个 commit 固定的 Git 地址）。
2. 在你的市场索引 JSON 的 `plugins` 数组中加入一项，并用 `parseMarketIndex` 校验后放到 HTTPS 上。
3. 用户在 **设置 → Discover** 添加这个索引 URL。

索引条目示例（`engines.dsh` 与 `package.json` 的 `engines.dsh` 保持一致）：

```json
{
  "format": 1,
  "title": "My DSH plugins",
  "plugins": [
    {
      "name": "dsh-enhance",
      "title": "DSH Enhance",
      "description": "Naming, file references, timeline, and a floating panel for the DSH Web GUI.",
      "author": "IndieXiaoLong",
      "homepage": "https://github.com/IndieXiaoLong/DSH-Enhance#readme",
      "repository": { "url": "https://github.com/IndieXiaoLong/DSH-Enhance" },
      "icon": "https://raw.githubusercontent.com/IndieXiaoLong/DSH-Enhance/main/assets/icon.png",
      "versions": [
        {
          "version": "0.1.0",
          "publishTimestamp": 1792735424,
          "source": {
            "type": "git",
            "url": "https://github.com/IndieXiaoLong/DSH-Enhance",
            "commit": "49d6fed489813cdf783c22cdf42c7a82a0690bd6"
          },
          "engines": { "dsh": "^0.2.1-rc.2" }
        }
      ]
    }
  ]
}
```

- `publishTimestamp` 是 Unix **秒**，不是毫秒。
- `source` 也可以用 Git：`{ "type": "git", "url": "https://github.com/<you>/dsh-enhance", "commit": "<40位小写sha>" }`。
- 如果索引顶层声明了 `metadata.categories`，条目里的 `metadata.category` 必须引用已声明的 id；不分类时省略 `metadata` 即可。
- 图标必须是 HTTPS、与索引同源，或不超过 32 KiB 的 `data:image/...;base64`。
- `title`/`description` 可写成 `{ "en": "...", "zh": "..." }`，对象形式必须包含 `en`。

## B. 社区 dsh-market（awesome-dsh-plugin 目录）

`dsh-market` 的目录来自 [`awesome-dsh-plugin`](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin)，仅添加 Topic 不会自动收录。按照其[投稿指南](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin/blob/main/contributing.md)，提交一个 PR，在 `data/plugins/IndieXiaoLong__DSH-Enhance.yml` 添加本仓库 `market/community-entry.yml` 的内容。不要修改该目录仓库的 README，它们由脚本生成。

发布步骤：

1. 建一个公开 GitHub 仓库并推送本目录（如果目录还没有 `.git`，先 `git init`）。
2. 给仓库加必需的 `dsh-plugin` Topic，其他相关 Topic 可选。
3. 仓库创建至少满一天后，向 `awesome-dsh-plugin` 提交上述 PR；维护者审核并合并后，`dsh-market` 通常在一天内同步。
4. 创建 Release / tag（例如 `v0.1.0`），可选发布 npm 包或附带预构建 tarball，提升安装体验。
5. 仓库的 `package.json` 要能被扫描到；本仓库已包含：
   - `dsh.bundle.patch`（Host 插入行）；
   - `dsh.client`（浏览器半侧）；
   - `engines.dsh`（兼容范围，用于市场显示 `dshEngines`）；
   - `description` / `descriptionZh` / `keywords` / `README` 安装命令。
6. 在市场里搜索 `dsh-enhance` 确认收录。

## 发布前检查清单

- `package.json` 的 `author`、`repository`、`homepage` 已填写。
- npm 包名可用：`npm view dsh-enhance`；如果已被占用，改用 `@你的scope/dsh-enhance`。
- 如果社区市场用 `github:<owner>/<repo>` 安装，仓库必须包含 `lib/` 构建产物；本仓库将提交 `lib/`，npm tarball 也会按 `files` 包含它。
- 一个 512×512 左右且小于 32 KiB 的插件图标（`assets/icon.png`）。
- README 截图或封面；如果使用 `assets/`，确保图片路径在仓库中存在。
- 如果 `0.1.0` 已经发布过，发布前把版本号递增（例如 `0.1.1`）。
- `npm pack --dry-run` 检查包内容；包会包含 README、资源、`lib/**`、`cordis.patch.yml` 和 `package.json`。

## 发布命令

```powershell
# npm
npm login
npm publish --access public

# GitHub（首次）
git init
git add .
git commit -m "dsh-enhance 0.1.0"
git branch -M main
git remote add origin https://github.com/<you>/dsh-enhance.git
git push -u origin main
```
