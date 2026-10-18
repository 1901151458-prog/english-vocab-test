# 初中英语词汇量快速定级测试单（选择题版）

人教版《英语》（2024 新版）· 成都适用 · 初二 / 初三

在线地址（GitHub Pages）：<https://1901151458-prog.github.io/english-vocab-test/>

## 这是什么

一份 **5 级 × 20 题 = 100 道选择题** 的初中英语词汇量快速定级测试。每题给出 A、B、C 三个中文释义选项，**选出该单词的正确含义**；若三个选项都不是它的正确含义，就选 **D「以上都不正确」**，用来防止“蒙对”。

- **正常题 80 道**：正确含义在 A/B/C 中（每级 16 道）。
- **无正确含义题 20 道**：每级 4 道，正确含义故意不给出，正确答案为 D。
- **判分**：答对 1 分；选错、未答 0 分（答错不倒扣）；每级答对 ≥16 题“通过”、12–15 题“边缘”、≤11 题“未过”。
- **自动定级**：取“连续通过”的最高级；用“前 k−1 级累计 + 第 k 级答对数 ÷ 20 × 该级增量”估算词汇量，并给出区间。
- **一题一屏**：点选后自动跳下一题，可上/下题与答题卡跳转修改；计时 12–18 分钟。
- **结果**：定级、词汇量估算、正确率、误选/未答统计、“无正确含义题”答对数；答题分布图（绿对/红错/灰未答）、词汇量刻度尺、**错词回补清单**、逐题回顾、复测记录。
- **教师答案**：全部 100 题的标准释义、正确答案（A/B/C/D）与题型。
- **打印**：结果页可打印结果卡 + 错词清单；另有 **选择题打印卷 PDF**（4 页 A4，含答题卡）和**快速勾选版 PDF**（6 页 A4）。

## 目录结构

```
index.html                     互动答题页（开始 / 答题 / 结果 / 教师答案）
print.html                     选择题打印卷（网页，可直接打印或导出 PDF）
assets/style.css               样式（含 A4 打印样式）
assets/data.js                 100 题数据（单词 / 词性 / 释义 / 3 个选项 / 正确项）
assets/logic.js                判分、定级、词汇量估算、速查表（纯逻辑，可在 Node 中测试）
assets/app.js                  页面交互（答题卡、计时、结果渲染、本地保存）
assets/vocab-test-mcq-print.pdf  选择题打印卷 PDF（4 页）
assets/vocab-test-print.pdf      快速勾选版 PDF（6 页，旧版纸质单）
assets/source/vocab-test-v2.tex  快速勾选版 LaTeX 源码
```

## 本地打开

无需构建，直接双击 `index.html` 即可（建议 Chrome / Edge / Safari 最新版）。
如需本地服务器：

```bash
python -m http.server 8080
# 打开 http://localhost:8080
```

## 部署到 GitHub Pages

```bash
git init
git add .
git commit -m "选择题版 v3.0"
git branch -M main
git remote add origin https://github.com/1901151458-prog/english-vocab-test.git
git push -u origin main
```

仓库 Settings → Pages → Deploy from a branch → `main` / `/ (root)` → Save，
约 1 分钟后可访问 `https://1901151458-prog.github.io/english-vocab-test/`。

## 数据说明

- 词表按人教版（2024 新版）初中各册单词表抽样编制，共 100 词；释义取常见义项。
- 每题 3 个干扰项取自同级别、同词性的其它词释义，人工核查避免近义歧义。
- 抽样误差约 ±10%，本单用于分层教学与词汇回补，不替代标准化测评。
- 答题进度、复测记录仅保存在浏览器 `localStorage`，不会上传服务器。
- 版本：选择题版 v3.0（2026-10）。可自由复印/用于教学，请保留声明。
