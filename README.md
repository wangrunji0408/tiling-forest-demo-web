# Tiling Forest Demo · Web

《Tiling Forest – Tiling Town Demo》的非官方浏览器移植。使用原版 demo 的地图、像素贴图、图块定义、中文规则及音频，通过 JavaScript / Canvas 2D 重新实现玩法。

原作者：**muratsubo Games**。原版体验版：[Steam](https://store.steampowered.com/app/4213590/)。

**原版游戏、游戏设计、关卡、图像、音乐、音效、字体及相关商标的版权归原作者及各自权利人所有。此项目并非官方作品，与原作者没有隶属或背书关系。版权声明不构成原始素材的再分发授权。** 详细资源说明见 [COPYRIGHT.md](COPYRIGHT.md)。

## 运行

需要 Node.js 18 或更新版本，无需安装 npm 依赖。

```sh
npm run dev
```

打开 http://localhost:4173 。`dist/` 是可直接托管的静态网页目录。

```sh
npm test
```

## 已实现

- 原版完整森林地图：35 个区域，36 档图块奖励。
- 相邻边道路 / 地形匹配，沿已到达的道路探索、解锁区域。
- 填满区域、区域内道路连通、树桩相向配对判定。
- 花朵沿道路传播、在空地停止；多个树桩对导致花朵枯萎。
- N-6 通关与森林完全完成判定。
- 原版像素资源、Logo、字体、音乐和音效。
- 图块选择、拖动、缩放、全景、区域定位、备忘标记。
- 撤销 / 重做、区域重置、恢复完成布局、浏览器自动存档。
- JSON 导入导出，兼容原版 `progress.json` 导入。
- 中文规则、区域指南和合法落子提示。

## 操作

| 操作 | 输入 |
| --- | --- |
| 放置 / 移除图块 | 鼠标左键 / 右键 |
| 移动镜头 | 拖动、WASD、方向键 |
| 缩放 | Q / E；移动模式下滚轮 |
| 上 / 下一个图块 | R / T、滚轮 |
| 快选前 10 个图块 | 1–0 |
| 撤销 / 重做 | Z / X |
| 重置当前区域 | C |
| 收起图块栏 | Tab |
| 切换移动模式 | Esc |
| 指南 / 规则 | G / H |

不同朝向是需要独立解锁的图块，不提供绕过解锁的任意旋转。

## 结构

- `dist/engine.js`：独立规则引擎。
- `dist/app.js`：Canvas 渲染、交互、音频、存档和 UI。
- `dist/data.json`：从原版资源整理出的地图和规则数据。
- `dist/assets/`：原版资源，版权归原作者及各自权利人。
- `scripts/extract.py`：从本机 CrossOver 安装的 demo PE 资源表提取资源。
- `tests/engine.test.mjs`：规则与存档测试。
- `docs/reverse-engineering.md`：逆向依据、实现范围与验证记录。

重新提取资源需要 Python 和 `pip install -r requirements.txt`。脚本默认读取 macOS CrossOver 的 Steam 容器中已安装的 Tiling Forest。无需修改原版可执行文件或原版存档。

## 还原范围

地图和图块资源直接来自原版；玩法规则在浏览器中重写。界面为适合浏览器的重新实现，尚未逐帧复刻原版界面、教程演出及所有动画。原版动态指南推理、Steam 成就与 Steam 云存档没有移植。网页存档保存在当前浏览器，需要跨设备时请手动导出。

本项目不附带 Windows 可执行文件、Steam DLL、账号信息或个人存档。暂未对原创移植代码授予单独的开源许可证；仓库公开不代表所有内容均可自由再分发。
