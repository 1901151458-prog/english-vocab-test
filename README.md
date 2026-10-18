# 初中英语词汇量快速定级测试单（互动版）

人教版《英语》（2024 新版）· 成都适用 · 初二 / 初三

在线地址（GitHub Pages）：<https://1901151458-prog.github.io/english-vocab-test/>

## 这是什么

一份 **5 级 × 20 词 = 100 词** 的初中英语词汇量快速定级测试。网页版在纸质测试单基础上增加了：

- **点选即统计**：点一下单词＝认识（打勾），再点一下取消；实时统计每级勾选数与总数。
- **自动定级**：按“连续通过最高级”判定 Level 1–5、各级“边缘”或“未达 Level 1”。
- **词汇量估算**：按“前 k−1 级累计 + 第 k 级勾选数 ÷ 20 × 该级增量”精确估算，并给出区间。
- **结果卡**：定级、估算词量、用时、止于级别、建议回补级别，可直接截图或打印。
- **勾选分布图 + 词汇量刻度尺**：直观看到掌握分布与课标 1600 词参考线。
- **口头抽查清单**：每级自动随机抽 2 个已勾词，供老师核对（可换一组）。
- **复测记录**：结果保存在本机浏览器，可多次保存、对比进步。
- **教师答案**：全部 100 词附词性（含不可数 [U] 标注）与中文释义。
- **打印**：A4 打印友好，可打印当前勾选状态与结果卡；也可下载空白打印版 PDF。

## 目录结构

```
index.html              页面结构
assets/style.css        样式（含 A4 打印样式）
assets/data.js          100 词数据（5 级 × 20 词，词性 + 释义）
assets/logic.js         定级 / 估算 / 速查表 / 抽查 纯逻辑
assets/app.js           页面交互
assets/favicon.svg      站点图标
assets/vocab-test-print.pdf   空白打印版（6 页 A4）
assets/source/vocab-test-v2.tex   LaTeX 源码（可自行修改重排）
```

## 本地打开

无需构建，直接双击 `index.html` 即可（建议用 Chrome / Edge / Safari 最新版）。
如需本地服务器：

```bash
python -m http.server 8080
# 打开 http://localhost:8080
```

## 部署到 GitHub Pages

```bash
git init
git add .
git commit -m "init: 词汇量快速定级测试单互动版"
git branch -M main
git remote add origin https://github.com/1901151458-prog/english-vocab-test.git
git push -u origin main
```

仓库 Settings → Pages → Deploy from a branch → `main` / `/ (root)` → Save，
约 1 分钟后可访问 `https://1901151458-prog.github.io/english-vocab-test/`。

## 定级规则（与纸质版一致）

| 每级勾选数 | 判定 |
|---|---|
| ≥ 16 | 通过 |
| 12–15 | 边缘 |
| ≤ 11 | 未过 |

- 定级：从 Level 1 起逐级查看，取“连续通过”的最高级；最高通过级之后一级为“边缘”时记为“X 级边缘”；L1 未达通过记为“未达 Level 1”。
- 估算：k ＝ 第一个未达到通过标准的级别（边缘或未过）；五级全过时 k＝5。
  词汇量 ≈ 前 k−1 级累计词量 +（第 k 级勾选数 ÷ 20）× 第 k 级增量词量。
- 期望线：初二 ≥ Level 3，初三 ≥ Level 4。

## 数据与说明

- 词表按人教版（2024 新版）初中各册单词表抽样编制，共 100 词；词义取常见义项。
- 抽样误差约 ±10%，本单用于分层教学与词汇回补，不替代标准化测评。
- 勾选与复测记录仅保存在浏览器 `localStorage`，不会上传服务器。
- 版本：v2.0（2026-10）。可自由复印/用于教学，请保留声明。
