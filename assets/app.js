/* =============================================================================
 * 初中英语词汇量快速定级测试单 · 交互逻辑（选择题版 v3.0）
 * 依赖：data.js（VT_DATA）、logic.js（VT_LOGIC）；无第三方库
 * ========================================================================== */
(function () {
  "use strict";

  var data = window.VT_DATA;
  var logic = window.VT_LOGIC;
  var levels = data.levels;
  var items = logic.flatten(data);
  var meta = data.meta;
  var NONE_OPTION = meta.noneOption;
  var STORAGE_KEY = "vt-vocab-placement-v3";
  var LETTERS = ["A", "B", "C", "D"];

  /* ------------------------------ 状态 ------------------------------ */
  var state = {
    answers: {},        // { 全局题号: 0–3 }
    current: 0,
    startedAt: null,    // ms
    elapsed: 0,         // ms
    timerId: null,
    finished: false,
    profile: { name: "", cls: "" },
    history: [],
    advanceTimer: null,
    lastToastG: -1
  };

  var els = {};
  var scoreCache = null;

  /* ------------------------------ 工具 ------------------------------ */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function fmtTime(ms) {
    var total = Math.max(0, Math.floor(ms / 1000));
    var m = Math.floor(total / 60);
    var s = total % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  function todayText() {
    var d = new Date();
    var p = function (n) { return (n < 10 ? "0" : "") + n; };
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  }

  function toast(msg) {
    var t = els.toast;
    if (!t) return;
    t.textContent = msg;
    t.classList.add("is-show");
    clearTimeout(toast._tid);
    toast._tid = setTimeout(function () { t.classList.remove("is-show"); }, 2400);
  }

  function answeredCount() {
    return Object.keys(state.answers).length;
  }

  function isAnswered(g) {
    return Object.prototype.hasOwnProperty.call(state.answers, g);
  }

  function letterOf(choice) {
    return choice === 3 ? "D" : LETTERS[choice];
  }

  function choiceText(item, choice) {
    if (choice === null || choice === undefined) return "未作答";
    if (choice === 3) return "D. " + NONE_OPTION;
    return LETTERS[choice] + ". " + item.opts[choice];
  }

  function answerText(item) {
    if (item.ans === -1) return "D. " + NONE_OPTION;
    return LETTERS[item.ans] + ". " + item.opts[item.ans];
  }

  /* ------------------------------ 存储 ------------------------------ */
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        answers: state.answers,
        current: state.current,
        startedAt: state.startedAt,
        elapsed: state.elapsed,
        finished: state.finished,
        profile: state.profile,
        history: state.history,
        savedAt: Date.now()
      }));
    } catch (e) { /* 隐私模式忽略 */ }
  }

  function loadState() {
    var raw;
    try { raw = localStorage.getItem(STORAGE_KEY); } catch (e) { return; }
    if (!raw) return;
    try {
      var obj = JSON.parse(raw);
      if (!obj || typeof obj !== "object") return;
      state.answers = obj.answers && typeof obj.answers === "object" ? obj.answers : {};
      state.current = Number.isFinite(obj.current) ? Math.min(items.length - 1, Math.max(0, obj.current)) : 0;
      state.finished = !!obj.finished;
      state.elapsed = Number(obj.elapsed) || 0;
      state.profile = obj.profile || { name: "", cls: "" };
      state.history = Array.isArray(obj.history) ? obj.history : [];
      if (obj.startedAt && !state.finished) {
        state.startedAt = Date.now() - state.elapsed;
      }
    } catch (e) { /* 数据损坏则忽略 */ }
  }

  /* ------------------------------ 计时 ------------------------------ */
  function startTimer() {
    if (state.timerId) return;
    if (!state.startedAt) state.startedAt = Date.now() - (state.elapsed || 0);
    state.timerId = setInterval(function () {
      state.elapsed = Date.now() - state.startedAt;
      updateTimer();
    }, 500);
    updateTimer();
  }

  function stopTimer() {
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function updateTimer() {
    var text = fmtTime(state.elapsed);
    if (els.timerText) els.timerText.textContent = text;
    if (els.outTimer2) els.outTimer2.textContent = text;
    if (els.timer) {
      els.timer.classList.toggle("is-warn", state.elapsed > 18 * 60000 && state.elapsed <= 25 * 60000);
      els.timer.classList.toggle("is-over", state.elapsed > 25 * 60000);
    }
  }

  /* ------------------------------ 首屏五级阶梯 ------------------------------ */
  function renderHeroLadder() {
    if (!els.heroLadder) return;
    var max = levels[levels.length - 1].cum;
    els.heroLadder.innerHTML = levels.map(function (lv) {
      return '<li class="ladder-row" style="--lv:' + lv.color + '">' +
        '<span class="lv-name">L' + lv.id + '<small>' + lv.name + "</small></span>" +
        '<span class="ladder-bar"><i style="width:' + Math.round(lv.cum / max * 100) + "%;background:" + lv.color + '"></i></span>' +
        '<span class="lv-cum">≈ ' + lv.cum + " 词</span>" +
        "</li>";
    }).join("");
  }

  /* ------------------------------ 答题卡 ------------------------------ */
  function renderSheet() {
    if (els.sheetLevels) {
      els.sheetLevels.innerHTML = levels.map(function (lv) {
        return '<div class="sheet-level" style="--lv:' + lv.color + '">' +
          '<span class="sl-name">L' + lv.id + "</span>" +
          '<span class="sl-bar"><i data-slbar="' + lv.id + '"></i></span>' +
          '<span class="sl-count" data-slcount="' + lv.id + '">0/20</span>' +
          "</div>";
      }).join("");
    }

    if (els.sheetMap) {
      var html = "";
      levels.forEach(function (lv, li) {
        html += '<div class="sheet-group" style="--lv:' + lv.color + '">' +
          '<span class="sg-label">L' + lv.id + " " + lv.name + "</span>" +
          '<div class="sg-cells">';
        for (var i = 0; i < lv.words.length; i++) {
          var g = li * 20 + i;
          html += '<button type="button" class="sheet-cell" data-g="' + g + '" aria-label="第 ' + (g + 1) + ' 题">' + (i + 1) + "</button>";
        }
        html += "</div></div>";
      });
      els.sheetMap.innerHTML = html;
    }
  }

  function updateSheet() {
    var answered = answeredCount();
    if (els.sheetAnswered) els.sheetAnswered.textContent = "已答 " + answered + " / " + items.length;

    levels.forEach(function (lv, li) {
      var n = 0;
      for (var i = 0; i < 20; i++) {
        if (isAnswered(li * 20 + i)) n++;
      }
      var bar = document.querySelector('[data-slbar="' + lv.id + '"]');
      var cnt = document.querySelector('[data-slcount="' + lv.id + '"]');
      if (bar) bar.style.width = (n / 20 * 100) + "%";
      if (cnt) cnt.textContent = n + "/20";
    });

    if (els.sheetMap) {
      $$(".sheet-cell", els.sheetMap).forEach(function (b) {
        var g = Number(b.getAttribute("data-g"));
        b.classList.toggle("is-done", isAnswered(g));
        b.classList.toggle("is-current", g === state.current && !state.finished);
      });
    }
    if (els.miniCount) els.miniCount.textContent = answered;
    if (els.miniLevel) {
      els.miniLevel.textContent = state.finished
        ? (scoreCache ? scoreCache.result.label : "已提交")
        : "Level " + items[state.current].levelId + " " + items[state.current].levelName;
    }
    if (els.miniJump) {
      els.miniJump.textContent = state.finished ? "看结果" : "答题";
    }
  }

  /* ------------------------------ 开始面板 ------------------------------ */
  function renderStartPanel() {
    if (!els.startPanel) return;
    var answered = answeredCount();
    var hasProgress = answered > 0 && !state.finished;

    els.startPanel.hidden = false;
    els.runner.hidden = true;

    if (state.finished) {
      els.startTitle.textContent = "本次测试已提交";
      els.startSub.textContent = scoreCache
        ? "答对 " + scoreCache.total.correct + " / 100 · 定级 " + scoreCache.result.label
        : "已完成";
      els.btnStart.hidden = true;
      els.btnResume.hidden = false;
      els.btnResume.textContent = "查看结果";
      els.btnRestart2.hidden = false;
      els.startNote.textContent = "如需重测，点击“重新开始”会清空本次答案与计时（复测记录保留）。";
    } else if (hasProgress) {
      els.startTitle.textContent = "继续上次答题";
      els.startSub.textContent = "已答 " + answered + " / 100 题 · 已用 " + fmtTime(state.elapsed);
      els.btnStart.hidden = true;
      els.btnResume.hidden = false;
      els.btnResume.textContent = "继续答题";
      els.btnRestart2.hidden = false;
      els.startNote.textContent = "进度保存在本机浏览器；也可以重新开始一套新的。";
    } else {
      els.startTitle.textContent = "准备好了吗？";
      els.startSub.textContent = "共 100 题 · 每题 4 个选项 · 建议 12–18 分钟";
      els.btnStart.hidden = false;
      els.btnResume.hidden = true;
      els.btnRestart2.hidden = true;
      els.startNote.textContent = "建议在安静环境完成；本页不需要登录，成绩保存在本机浏览器。";
    }
  }

  /* ------------------------------ 题目渲染 ------------------------------ */
  function renderQuestion() {
    var item = items[state.current];
    if (!item) return;

    if (els.qLevel) {
      els.qLevel.textContent = "Level " + item.levelId + " " + item.levelName;
      els.qLevel.style.setProperty("--lv", item.color);
    }
    if (els.qCount) els.qCount.textContent = "第 " + (state.current + 1) + " / " + items.length + " 题";
    if (els.qLevelCount) els.qLevelCount.textContent = "本级 " + item.n + "/20";
    if (els.qProgress) els.qProgress.style.width = ((state.current + 1) / items.length * 100) + "%";
    if (els.qWord) els.qWord.textContent = item.w;
    if (els.qPos) els.qPos.textContent = item.pos;

    var html = "";
    for (var i = 0; i < 4; i++) {
      var text = i === 3 ? NONE_OPTION : item.opts[i];
      var selected = state.answers[state.current] === i;
      html += '<button type="button" class="opt' + (i === 3 ? " opt-none" : "") +
        '" data-choice="' + i + '" aria-pressed="' + (selected ? "true" : "false") + '">' +
        '<span class="opt-letter">' + LETTERS[i] + "</span>" +
        '<span class="opt-text">' + text + "</span>" +
        "</button>";
    }
    els.qOptions.innerHTML = html;

    if (els.btnPrev) els.btnPrev.disabled = state.current === 0;
    if (els.btnNext) {
      els.btnNext.disabled = state.current >= items.length - 1;
      els.btnNext.textContent = state.current >= items.length - 1 ? "已是最后一题" : "下一题";
    }
    updateSheet();
  }

  function selectChoice(choice) {
    if (state.finished) return;
    var g = state.current;
    var wasAnswered = isAnswered(g);
    state.answers[g] = choice;
    if (!state.startedAt) state.startedAt = Date.now() - state.elapsed;
    startTimer();
    saveState();

    $$(".opt", els.qOptions).forEach(function (b) {
      b.setAttribute("aria-pressed", Number(b.getAttribute("data-choice")) === choice ? "true" : "false");
    });
    updateSheet();

    if (!wasAnswered) {
      clearTimeout(state.advanceTimer);
      if (g < items.length - 1) {
        state.advanceTimer = setTimeout(function () {
          if (state.current === g && !state.finished) {
            state.current = g + 1;
            saveState();
            renderQuestion();
          }
        }, 260);
      } else if (state.lastToastG !== g) {
        state.lastToastG = g;
        toast("最后一题已作答，点“提交答案”生成结果");
      }
    }
  }

  function goTo(g) {
    if (state.finished) return;
    clearTimeout(state.advanceTimer);
    state.current = Math.min(items.length - 1, Math.max(0, g));
    saveState();
    renderQuestion();
  }

  /* ------------------------------ 开始 / 继续 / 重置 ------------------------------ */
  function showRunner() {
    els.startPanel.hidden = true;
    els.runner.hidden = false;
    renderQuestion();
    updateSheet();
  }

  function startFresh() {
    if (answeredCount() > 0 && !state.finished) {
      if (!window.confirm("重新开始会清空已答的题目，确定吗？")) return;
    }
    state.answers = {};
    state.current = 0;
    state.startedAt = Date.now();
    state.elapsed = 0;
    state.finished = false;
    state.lastToastG = -1;
    clearTimeout(state.advanceTimer);
    stopTimer();
    startTimer();
    saveState();
    scoreCache = null;
    renderLevelTable(null);
    showRunner();
    toast("开始答题，计时已启动");
    var sec = document.getElementById("test");
    if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resumeQuiz() {
    if (state.finished) {
      var r = document.getElementById("result");
      if (r) r.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    startTimer();
    showRunner();
    var sec = document.getElementById("test");
    if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function restartQuiz() {
    var msg = state.finished ? "确定重新开始一套新的测试吗？当前结果将被清空（复测记录保留）。" : "确定重新开始吗？已答的题目会被清空。";
    if (!window.confirm(msg)) return;
    state.answers = {};
    state.current = 0;
    state.startedAt = null;
    state.elapsed = 0;
    state.finished = false;
    state.lastToastG = -1;
    scoreCache = null;
    clearTimeout(state.advanceTimer);
    stopTimer();
    updateTimer();
    saveState();
    renderStartPanel();
    renderResult();
    renderLevelTable(null);
    updateSheet();
    var sec = document.getElementById("test");
    if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
    toast("已清空，可重新开始");
  }

  /* ------------------------------ 提交 ------------------------------ */
  function submit() {
    if (state.finished) {
      var r0 = document.getElementById("result");
      if (r0) r0.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    var answered = answeredCount();
    var blank = items.length - answered;
    if (blank > 0) {
      var ok = window.confirm("还有 " + blank + " 题未作答，未答按 0 分计。确定提交吗？");
      if (!ok) return;
    }
    if (state.startedAt) state.elapsed = Date.now() - state.startedAt;
    stopTimer();
    state.finished = true;
    clearTimeout(state.advanceTimer);
    saveState();
    scoreCache = logic.score(state.answers, data);
    renderResult();
    renderStartPanel();
    updateTimer();
    updateSheet();
    toast("已提交，结果已生成");
    var r = document.getElementById("result");
    if (r) r.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ------------------------------ 结果渲染 ------------------------------ */
  function resultSub(result) {
    if (result.code === "below") return "Level 1 未达通过 —— 建议先从起步级词表系统补起";
    if (result.code === "perfect") return "五级全部通过，达到本单上限（约 2400 词）";
    if (result.code === "edge") return "连续通过 Level 1–" + result.highest + "，停在 Level " + (result.highest + 1) + "（边缘）";
    return "连续通过 Level 1–" + result.highest + "，停在 Level " + (result.highest + 1);
  }

  function goalText(result) {
    var h = result.highest;
    if (h >= 4) return "已达到初三期望线（Level 4）";
    if (h === 3) return "已达到初二期望线（Level 3）；距初三期望线（Level 4）还差 1 级";
    if (h >= 1) return "距初二期望线（Level 3）还差 " + (3 - h) + " 级";
    return "距初二期望线（Level 3）还差 3 级";
  }

  function timeNote(ms) {
    var min = ms / 60000;
    if (ms <= 0) return "尚未开始计时";
    if (min > 25) return "超过 25 分钟，结果仅供参考，建议重测";
    if (min > 18) return "略超过 18 分钟，可留意是否犹豫过久";
    if (min < 7) return "用时较短，建议确认没有随意作答";
    return "在 12–18 分钟建议区间内";
  }

  function renderResult() {
    var body = els.resultBody;
    var empty = els.resultEmpty;
    if (!state.finished || !scoreCache) {
      if (body) body.hidden = true;
      if (empty) empty.hidden = false;
      return;
    }
    if (body) body.hidden = false;
    if (empty) empty.hidden = true;

    var sc = scoreCache;
    var result = sc.result;

    els.resLevel.textContent = result.label;
    els.resSub.textContent = resultSub(result);
    var badge = els.resBadge;
    badge.textContent = result.code === "edge" ? "边缘" : result.code === "below" ? "未达" : result.code === "perfect" ? "满级" : "通过";
    badge.className = "rc-badge" + (result.code === "edge" ? " is-edge" : result.code === "below" ? " is-below" : "");

    els.resEstimate.textContent = result.estimateText;
    els.resRange.textContent = "区间 " + result.rangeText;
    els.resCorrect.textContent = sc.total.correct + " / 100";
    els.resAccuracy.textContent = "全卷正确率 " + sc.total.correct + "% · 未答 " + sc.total.blank + " 题";
    els.resTime.textContent = fmtTime(state.elapsed);
    els.resTimeNote.textContent = timeNote(state.elapsed);
    els.resRecommend.textContent = result.recommend;
    els.resStop.textContent = result.code === "below" ? "止于第 1 级" : result.code === "perfect" ? "五级全过" : "止于第 " + (result.highest + 1) + " 级";
    els.resMeta.textContent = "误选 " + sc.total.wrong + " 题 · 未答 " + sc.total.blank + " 题 · “无正确含义”题答对 " +
      sc.trap.correct + " / " + sc.trap.total;

    var adviceLv = levels[Math.min(4, Math.max(0, result.levelIndex - 1))] || levels[0];
    els.resAdvice.textContent = result.code === "below"
      ? "从 Level 1 起步级开始：先过七上单元词表，每天 15 词（词 → 义 → 拼写），先补高频名词与动词。"
      : adviceLv.advice;
    els.resGoal.textContent = goalText(result) + "；期望线：初二 ≥ Level 3，初三 ≥ Level 4。";

    renderDist(sc);
    if (els.ruler) els.ruler.innerHTML = rulerSvg(result);
    if (els.rulerNote) {
      els.rulerNote.textContent = "你的估算位置落在 " + result.label + " 区间（" + result.rangeText + "）；下一目标：" + result.recommend + "。";
    }
    renderWrongList(sc);
    renderReview(sc);
    renderLevelTable(result);
    renderRangeHighlight(result);
    fillPrintHeader();
  }

  function renderDist(sc) {
    if (!els.distGrid) return;
    var html = levels.map(function (lv, li) {
      var cells = "";
      for (var i = 0; i < 20; i++) {
        var d = sc.details[li * 20 + i];
        var st = d.state;
        var cls = "dist-cell is-" + st + (i > 0 && i % 5 === 0 ? " is-sep" : "");
        cells += '<span class="' + cls + '" title="L' + lv.id + " 第 " + (i + 1) + " 题：" +
          (st === "correct" ? "答对" : st === "wrong" ? "答错" : "未答") + '"></span>';
      }
      return '<div class="dist-row" style="--lv:' + lv.color + '">' +
        '<span class="dr-label">L' + lv.id + "</span>" +
        '<span class="dist-cells">' + cells + "</span>" +
        "</div>";
    }).join("");
    els.distGrid.innerHTML = html;

    if (els.distLegend) {
      els.distLegend.innerHTML = sc.perLevel.map(function (p) {
        return '<li style="--lv:' + p.color + '"><span class="chip"></span>L' + p.id + " " + p.name +
          "：对 " + p.correct + " · 错 " + p.wrong + " · 未答 " + p.blank + "</li>";
      }).join("");
    }
  }

  function rulerSvg(result) {
    var W = 480, H = 198;
    var padL = 20, padR = 16;
    var axisY = 118;
    var x = function (v) { return padL + (v / 2400) * (W - padL - padR); };
    var p = [];

    levels.forEach(function (lv, i) {
      var start = i === 0 ? 0 : levels[i - 1].cum;
      var x0 = x(start), x1 = x(lv.cum);
      p.push('<rect x="' + x0 + '" y="' + (axisY + 4) + '" width="' + Math.max(1, x1 - x0) +
        '" height="28" fill="' + lv.color + '" fill-opacity="0.15" stroke="' + lv.color +
        '" stroke-opacity="0.55" stroke-width="1"/>');
      p.push('<text x="' + ((x0 + x1) / 2) + '" y="' + (axisY + 22) +
        '" text-anchor="middle" font-size="11" font-weight="700" fill="' + lv.color + '">L' + lv.id + "</text>");
    });

    p.push('<line x1="' + padL + '" y1="' + axisY + '" x2="' + (W - padR) + '" y2="' + axisY + '" stroke="#134B70" stroke-width="1.6"/>');

    for (var v = 0; v <= 2400; v += 100) {
      var xv = x(v);
      var major = v % 600 === 0;
      p.push('<line x1="' + xv + '" y1="' + axisY + '" x2="' + xv + '" y2="' + (axisY - (major ? 16 : 8)) +
        '" stroke="#6c8296" stroke-width="' + (major ? 1.3 : 0.9) + '"/>');
      if (major) {
        p.push('<text x="' + xv + '" y="' + (axisY - 22) + '" text-anchor="middle" font-size="10" fill="#5B7184">' + v + "</text>");
      }
    }

    var x1600 = x(1600);
    p.push('<line x1="' + x1600 + '" y1="' + (axisY - 32) + '" x2="' + x1600 + '" y2="' + (axisY + 34) +
      '" stroke="#A9721A" stroke-width="1.4" stroke-dasharray="5 4"/>');
    p.push('<text x="' + x1600 + '" y="' + (axisY - 37) + '" text-anchor="middle" font-size="9.5" fill="#A9721A">课标 1600</text>');

    var xe = x(Math.min(2400, Math.max(0, result.estimate)));
    var labelX = Math.min(W - padR - 40, Math.max(padL + 40, xe));
    p.push('<line x1="' + xe + '" y1="' + axisY + '" x2="' + xe + '" y2="' + (axisY - 40) + '" stroke="#C0553F" stroke-width="1.8"/>');
    p.push('<polygon points="' + xe + "," + (axisY - 40) + " " + (xe - 5) + "," + (axisY - 50) + " " + (xe + 5) + "," + (axisY - 50) + '" fill="#C0553F"/>');
    p.push('<text x="' + labelX + '" y="' + (axisY - 56) + '" text-anchor="middle" font-size="11" font-weight="700" fill="#C0553F">▲ 约 ' + result.estimate + " 词</text>");
    p.push('<text x="' + (W - padR) + '" y="' + (H - 4) + '" text-anchor="end" font-size="9.5" fill="#8BA0B1">累计词汇量（词）</text>');

    return '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="词汇量刻度尺：估算 ' + result.estimate + ' 词">' + p.join("") + "</svg>";
  }

  function renderWrongList(sc) {
    if (!els.wrongList) return;
    var bad = sc.details.filter(function (d) { return d.state !== "correct"; });
    if (!bad.length) {
      els.wrongList.innerHTML = '<div class="wrong-empty">本卷全部答对，没有需要回补的词。<br>下一阶段可保持每周 2 次阅读 + 1 次写作，向高中衔接词拓展。</div>';
      return;
    }
    var html = "";
    levels.forEach(function (lv, li) {
      var list = bad.filter(function (d) { return d.levelIndex === li; });
      if (!list.length) return;
      html += '<div class="wrong-group" style="--lv:' + lv.color + '">' +
        '<div class="wg-head"><span class="wg-name">Level ' + lv.id + " " + lv.name + "</span>" +
        '<span class="wg-count">' + list.length + " 题需回补</span></div>" +
        '<div class="wg-items">';
      list.forEach(function (d) {
        html += '<div class="wrong-item">' +
          '<span class="wi-word">' + d.w + ' <i>' + d.pos + "</i></span>" +
          '<span class="wi-meaning">' + d.meaning + "</span>" +
          '<span class="wi-state ' + (d.state === "blank" ? "is-blank" : "is-wrong") + '">' +
          (d.state === "blank" ? "未作答" : "你选了 " + choiceText(d, d.choice)) + "</span>" +
          '<span class="wi-answer">正确：' + answerText(d) + "</span>" +
          "</div>";
      });
      html += "</div></div>";
    });
    els.wrongList.innerHTML = html;
  }

  function renderReview(sc) {
    if (!els.reviewTables) return;
    var html = "";
    levels.forEach(function (lv, li) {
      html += '<div class="review-block" style="--lv:' + lv.color + '">' +
        '<h4>Level ' + lv.id + " " + lv.name + "（" + (li * 20 + 1) + "–" + (li * 20 + 20) + " 题）</h4>" +
        '<div class="table-wrap"><table class="table review-table"><thead><tr>' +
        "<th>#</th><th>单词</th><th>你的选择</th><th>正确答案</th><th>结果</th></tr></thead><tbody>";
      for (var i = 0; i < 20; i++) {
        var d = sc.details[li * 20 + i];
        var mark = d.state === "correct" ? '<span class="mk ok">✓ 对</span>'
          : d.state === "wrong" ? '<span class="mk no">✗ 错</span>'
            : '<span class="mk blank">— 未答</span>';
        html += "<tr>" +
          "<td>" + d.n + "</td>" +
          "<td><b>" + d.w + "</b> <small>" + d.pos + "</small></td>" +
          "<td>" + choiceText(d, d.choice) + "</td>" +
          "<td>" + answerText(d) + "</td>" +
          "<td>" + mark + "</td>" +
          "</tr>";
      }
      html += "</tbody></table></div></div>";
    });
    els.reviewTables.innerHTML = html;
  }

  function renderLevelTable(result) {
    var tbody = els.levelTable ? els.levelTable.querySelector("tbody") : null;
    if (!tbody) return;
    var current = result ? result.highest : -1;
    tbody.innerHTML = levels.map(function (lv) {
      var highlight = current === lv.id ? ' class="is-current"' : "";
      return "<tr" + highlight + ">" +
        "<td>Level " + lv.id + "<br>" + lv.name + "</td>" +
        "<td>约 " + lv.cum + " 词</td>" +
        "<td>" + lv.book + "</td>" +
        "<td>" + lv.desc + "</td>" +
        "<td>" + lv.exam + "</td>" +
        "<td>" + lv.advice + "</td>" +
        "</tr>";
    }).join("");
  }

  function renderRangeTable() {
    var tbody = els.rangeTable ? els.rangeTable.querySelector("tbody") : null;
    if (!tbody) return;
    tbody.innerHTML = logic.rangeTable(data).map(function (r) {
      return '<tr data-range-label="' + escapeHtml(r.label) + '">' +
        "<td>" + r.label + "</td><td>" + r.case + "</td><td>" + r.range[0] + "–" + r.range[1] + " 词</td></tr>";
    }).join("");
  }

  function renderRangeHighlight(result) {
    var tbody = els.rangeTable ? els.rangeTable.querySelector("tbody") : null;
    if (!tbody) return;
    $$("tr", tbody).forEach(function (tr) {
      tr.classList.toggle("is-current", tr.getAttribute("data-range-label") === result.label);
    });
  }

  function renderAnswerTables() {
    if (!els.answerTables) return;
    els.answerTables.innerHTML = levels.map(function (lv) {
      var rows = lv.words.map(function (w) {
        var ansTxt = w.ans === -1 ? "D. " + NONE_OPTION : LETTERS[w.ans] + ". " + w.opts[w.ans];
        return "<tr>" +
          "<td>" + w.n + "</td>" +
          "<td><b>" + w.w + "</b> <small>" + w.pos + "</small></td>" +
          "<td>" + w.meaning + "</td>" +
          "<td>" + ansTxt + "</td>" +
          "<td>" + (w.ans === -1 ? '<span class="tag trap">无正确含义</span>' : '<span class="tag">正常题</span>') + "</td>" +
          "</tr>";
      }).join("");
      return '<div class="answer-block" style="--lv:' + lv.color + '">' +
        "<h4><i></i>Level " + lv.id + " " + lv.name + "（20 题）</h4>" +
        '<div class="table-wrap"><table class="table answer-table"><thead><tr>' +
        "<th>#</th><th>单词</th><th>标准释义</th><th>正确答案</th><th>题型</th>" +
        "</tr></thead><tbody>" + rows + "</tbody></table></div></div>";
    }).join("");
  }

  /* ------------------------------ 复测记录 ------------------------------ */
  function renderHistory() {
    if (!els.historyTable) return;
    var tbody = els.historyTable.querySelector("tbody");
    var list = state.history.slice().sort(function (a, b) { return a.ts - b.ts; });
    if (!list.length) {
      tbody.innerHTML = '<tr class="empty"><td colspan="8">还没有保存记录。提交后点“保存本次记录”，即可在这里追踪变化。</td></tr>';
      if (els.historyEmpty) els.historyEmpty.hidden = true;
      return;
    }
    if (els.historyEmpty) els.historyEmpty.hidden = true;
    var prev = null;
    tbody.innerHTML = list.map(function (h, i) {
      var delta = prev == null ? "—" : (h.estimate - prev >= 0 ? "+" : "") + (h.estimate - prev) + " 词";
      prev = h.estimate;
      var when = new Date(h.ts);
      var date = when.getFullYear() + "-" + ("0" + (when.getMonth() + 1)).slice(-2) + "-" + ("0" + when.getDate()).slice(-2);
      var who = [h.name, h.cls].filter(Boolean).join(" / ") || "未填写";
      return "<tr>" +
        "<td>" + (i + 1) + "</td>" +
        "<td>" + date + "</td>" +
        "<td>" + escapeHtml(who) + "</td>" +
        "<td>" + fmtTime(h.elapsed || 0) + "</td>" +
        "<td>" + h.correct + " / 100</td>" +
        "<td>" + escapeHtml(h.label) + "</td>" +
        "<td>约 " + h.estimate + " 词</td>" +
        "<td>" + delta + "</td>" +
        "</tr>";
    }).join("");
  }

  function saveResult() {
    if (!scoreCache) { toast("提交答案后才能保存结果"); return; }
    state.history.push({
      ts: Date.now(),
      name: state.profile.name,
      cls: state.profile.cls,
      elapsed: state.elapsed,
      correct: scoreCache.total.correct,
      label: scoreCache.result.label,
      estimate: scoreCache.result.estimate
    });
    if (state.history.length > 24) state.history = state.history.slice(-24);
    saveState();
    renderHistory();
    toast("已保存本次记录（共 " + state.history.length + " 次）");
  }

  /* ------------------------------ 复制 / 打印 ------------------------------ */
  function buildResultText() {
    if (!scoreCache) return "";
    var sc = scoreCache;
    var who = [state.profile.name, state.profile.cls].filter(Boolean).join(" / ") || "未填写";
    return [
      "【初中英语词汇量快速定级测试单 · 选择题版】",
      "姓名/班级：" + who,
      "答对题数：" + sc.total.correct + " / 100（正确率 " + sc.total.correct + "%）",
      "定级：" + sc.result.label,
      "估算词汇量：约 " + sc.result.estimate + " 词（区间 " + sc.result.rangeText + "）",
      "用时：" + fmtTime(state.elapsed) + "（" + timeNote(state.elapsed) + "）",
      "误选：" + sc.total.wrong + " 题 · 未答：" + sc.total.blank + " 题",
      "“无正确含义”题答对：" + sc.trap.correct + " / " + sc.trap.total,
      "建议回补：" + sc.result.recommend,
      "生成时间：" + new Date().toLocaleString("zh-CN")
    ].join("\n");
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return fallback(); });
    }
    return Promise.resolve(fallback());
    function fallback() {
      try {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        var ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
      } catch (e) { return false; }
    }
  }

  function fillPrintHeader() {
    if (els.pfName) els.pfName.textContent = state.profile.name || "____________";
    if (els.pfClass) els.pfClass.textContent = state.profile.cls || "____________";
    if (els.pfDate) els.pfDate.textContent = todayText();
    if (els.pfTime) els.pfTime.textContent = fmtTime(state.elapsed);
  }

  /* ------------------------------ 事件绑定 ------------------------------ */
  function bindEvents() {
    if (els.btnStart) els.btnStart.addEventListener("click", startFresh);
    if (els.btnResume) els.btnResume.addEventListener("click", resumeQuiz);
    if (els.btnRestart2) els.btnRestart2.addEventListener("click", restartQuiz);
    if (els.btnReset) els.btnReset.addEventListener("click", restartQuiz);
    if (els.btnRetake) els.btnRetake.addEventListener("click", restartQuiz);
    if (els.btnPrev) els.btnPrev.addEventListener("click", function () { goTo(state.current - 1); });
    if (els.btnNext) els.btnNext.addEventListener("click", function () { goTo(state.current + 1); });
    if (els.btnSubmit) els.btnSubmit.addEventListener("click", submit);
    if (els.btnSubmit2) els.btnSubmit2.addEventListener("click", submit);
    if (els.btnSaveResult) els.btnSaveResult.addEventListener("click", saveResult);
    if (els.btnCopyResult) {
      els.btnCopyResult.addEventListener("click", function () {
        var text = buildResultText();
        if (!text) { toast("提交答案后才能复制结果"); return; }
        copyText(text).then(function (ok) {
          toast(ok ? "结果已复制到剪贴板" : "复制失败，请手动选择文本");
        });
      });
    }
    if (els.btnPrint) els.btnPrint.addEventListener("click", function () { window.print(); });
    if (els.btnPrintResult) els.btnPrintResult.addEventListener("click", function () { window.print(); });

    if (els.qOptions) {
      els.qOptions.addEventListener("click", function (e) {
        var btn = e.target.closest ? e.target.closest(".opt") : null;
        if (!btn || state.finished) return;
        selectChoice(Number(btn.getAttribute("data-choice")));
      });
    }

    if (els.sheetMap) {
      els.sheetMap.addEventListener("click", function (e) {
        var btn = e.target.closest ? e.target.closest(".sheet-cell") : null;
        if (!btn || state.finished) return;
        goTo(Number(btn.getAttribute("data-g")));
      });
    }

    if (els.inpName) {
      els.inpName.addEventListener("input", function () {
        state.profile.name = els.inpName.value.slice(0, 24);
        saveState();
        fillPrintHeader();
      });
    }
    if (els.inpClass) {
      els.inpClass.addEventListener("input", function () {
        state.profile.cls = els.inpClass.value.slice(0, 24);
        saveState();
        fillPrintHeader();
      });
    }

    if (els.btnGoResult) {
      els.btnGoResult.addEventListener("click", function (e) {
        if (!state.finished) {
          e.preventDefault();
          toast("完成答题并提交后查看结果");
          var t = document.getElementById("test");
          if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
    if (els.miniJump) {
      els.miniJump.addEventListener("click", function (e) {
        if (state.finished) {
          e.preventDefault();
          var r = document.getElementById("result");
          if (r) r.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }

    document.addEventListener("keydown", function (e) {
      if (state.finished || !els.runner || els.runner.hidden) return;
      var tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      var k = e.key;
      if (k >= "1" && k <= "4") { selectChoice(Number(k) - 1); e.preventDefault(); }
      else if (k === "a" || k === "A") { selectChoice(0); e.preventDefault(); }
      else if (k === "b" || k === "B") { selectChoice(1); e.preventDefault(); }
      else if (k === "c" || k === "C") { selectChoice(2); e.preventDefault(); }
      else if (k === "d" || k === "D") { selectChoice(3); e.preventDefault(); }
      else if (k === "ArrowLeft") { goTo(state.current - 1); e.preventDefault(); }
      else if (k === "ArrowRight") { goTo(state.current + 1); e.preventDefault(); }
    });

    window.addEventListener("pagehide", saveState);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) saveState();
    });
  }

  /* ------------------------------ 初始化 ------------------------------ */
  function init() {
    els = {
      heroLadder: $("#heroLadder"),
      timer: $("#timer"),
      timerText: $("#timerText"),
      outTimer2: $("#outTimer2"),
      outDate: $("#outDate"),
      startPanel: $("#startPanel"),
      startTitle: $("#startTitle"),
      startSub: $("#startSub"),
      startNote: $("#startNote"),
      btnStart: $("#btnStart"),
      btnResume: $("#btnResume"),
      btnRestart2: $("#btnRestart2"),
      runner: $("#runner"),
      qCard: $("#qCard"),
      qLevel: $("#qLevel"),
      qCount: $("#qCount"),
      qLevelCount: $("#qLevelCount"),
      qProgress: $("#qProgress"),
      qWord: $("#qWord"),
      qPos: $("#qPos"),
      qOptions: $("#qOptions"),
      btnPrev: $("#btnPrev"),
      btnNext: $("#btnNext"),
      btnSubmit: $("#btnSubmit"),
      btnSubmit2: $("#btnSubmit2"),
      sheetAnswered: $("#sheetAnswered"),
      sheetLevels: $("#sheetLevels"),
      sheetMap: $("#sheetMap"),
      miniCount: $("#miniCount"),
      miniLevel: $("#miniLevel"),
      miniJump: $("#miniJump"),
      resultEmpty: $("#resultEmpty"),
      resultBody: $("#resultBody"),
      resLevel: $("#resLevel"),
      resSub: $("#resSub"),
      resBadge: $("#resBadge"),
      resEstimate: $("#resEstimate"),
      resRange: $("#resRange"),
      resCorrect: $("#resCorrect"),
      resAccuracy: $("#resAccuracy"),
      resTime: $("#resTime"),
      resTimeNote: $("#resTimeNote"),
      resRecommend: $("#resRecommend"),
      resStop: $("#resStop"),
      resMeta: $("#resMeta"),
      resAdvice: $("#resAdvice"),
      resGoal: $("#resGoal"),
      distGrid: $("#distGrid"),
      distLegend: $("#distLegend"),
      ruler: $("#ruler"),
      rulerNote: $("#rulerNote"),
      wrongList: $("#wrongList"),
      reviewTables: $("#reviewTables"),
      levelTable: $("#levelTable"),
      rangeTable: $("#rangeTable"),
      answerTables: $("#answerTables"),
      historyTable: $("#historyTable"),
      historyEmpty: $("#historyEmpty"),
      btnSaveResult: $("#btnSaveResult"),
      btnCopyResult: $("#btnCopyResult"),
      btnPrintResult: $("#btnPrintResult"),
      btnPrint: $("#btnPrint"),
      btnReset: $("#btnReset"),
      btnRetake: $("#btnRetake"),
      btnGoResult: $("#btnGoResult"),
      inpName: $("#inpName"),
      inpClass: $("#inpClass"),
      toast: $("#toast"),
      pfName: $("#pfName"),
      pfClass: $("#pfClass"),
      pfDate: $("#pfDate"),
      pfTime: $("#pfTime")
    };

    loadState();

    renderHeroLadder();
    renderSheet();
    renderAnswerTables();
    renderRangeTable();
    renderLevelTable(null);
    bindEvents();

    if (els.inpName) els.inpName.value = state.profile.name || "";
    if (els.inpClass) els.inpClass.value = state.profile.cls || "";
    if (els.outDate) els.outDate.textContent = todayText();

    if (state.finished) {
      scoreCache = logic.score(state.answers, data);
      renderResult();
      renderStartPanel();
    } else {
      if (state.startedAt) {
        state.timerId = setInterval(function () {
          state.elapsed = Date.now() - state.startedAt;
          updateTimer();
        }, 500);
      }
      renderStartPanel();
      updateTimer();
    }

    renderHistory();
    updateSheet();
    fillPrintHeader();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
