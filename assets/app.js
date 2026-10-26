/* =============================================================================
 * 初中英语词汇量快速定级测试单 · 交互逻辑（v4：5 秒/题 · 全屏 · 即时判对错 · 10 连错结束）
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
  var STORAGE_KEY = "vt-vocab-placement-v4";
  var LETTERS = ["A", "B", "C", "D"];
  var QUESTION_MS = 5000;      // 每题 5 秒
  var FEEDBACK_MS = 1500;      // 反馈停留时间
  var STREAK_LIMIT = 10;       // 连续 10 题答错结束
  var PASS_PER_LEVEL = 15;     // 本级答对 15 题通过；前 15 题全对自动跳级
  var CD_CIRC = 2 * Math.PI * 20;

  /* ------------------------------ 状态 ------------------------------ */
  var state = {
    answers: {},          // { 全局题号: 0–3 | -1(超时) }
    autoPassed: {},       // { levelIndex: true } 前 15 题全对、自动跳级的级别
    current: 0,
    startedAt: null,
    elapsed: 0,
    timerId: null,
    finished: false,
    earlyStop: false,
    completedAll: false,
    stopLevel: 0,
    streak: 0,
    locked: false,
    phase: "idle",
    mode: "placement",
    countdownId: null,
    countdownStart: 0,
    nextTimer: null,
    profile: { name: "", cls: "" },
    history: []
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

  function answeredCount() { return Object.keys(state.answers).length; }
  function isAnswered(g) { return Object.prototype.hasOwnProperty.call(state.answers, g); }

  function statusOf(g) {
    if (!isAnswered(g)) return "untested";
    var c = state.answers[g];
    if (c === -1) return "timeout";
    return c === logic.answerOf(items[g]) ? "correct" : "wrong";
  }

  /* 当前级别的题号区间与答对数 */
  function levelRange(li) {
    var start = 0;
    for (var i = 0; i < li; i++) start += levels[i].words.length;
    return [start, start + levels[li].words.length];
  }
  function levelCorrect(li) {
    var range = levelRange(li), n = 0;
    for (var g = range[0]; g < range[1]; g++) {
      if (state.answers[g] === logic.answerOf(items[g])) n++;
    }
    return n;
  }
  function nextLevelStart(li) {
    return levelRange(li)[1];
  }

  function estimateLabel(result) {
    if (result.estimate < 100) return "不足 100 词";
    return "约 " + result.estimate + " 词";
  }

  function itemAnswerText(item) {
    if (item.ans === -1) return "D. " + NONE_OPTION;
    return LETTERS[item.ans] + ". " + item.opts[item.ans];
  }

  function choiceText(item, choice) {
    if (choice === null || choice === undefined) return "未测";
    if (choice === -1) return "超时未答";
    if (choice === 3) return "D. " + NONE_OPTION;
    return LETTERS[choice] + ". " + item.opts[choice];
  }

  /* ------------------------------ 存储 ------------------------------ */
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        answers: state.answers,
        autoPassed: state.autoPassed,
        current: state.current,
        startedAt: state.startedAt,
        elapsed: state.elapsed,
        finished: state.finished,
        earlyStop: state.earlyStop,
        completedAll: state.completedAll,
        stopLevel: state.stopLevel,
        mode: state.mode,
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
      state.autoPassed = obj.autoPassed && typeof obj.autoPassed === "object" ? obj.autoPassed : {};
      state.current = Number.isFinite(obj.current) ? Math.min(items.length - 1, Math.max(0, obj.current)) : 0;
      state.finished = !!obj.finished;
      state.earlyStop = !!obj.earlyStop;
      state.completedAll = !!obj.completedAll;
      state.stopLevel = Number(obj.stopLevel) || 0;
      state.mode = obj.mode === "practice" ? "practice" : "placement";
      state.elapsed = Number(obj.elapsed) || 0;
      state.profile = obj.profile || { name: "", cls: "" };
      state.history = Array.isArray(obj.history) ? obj.history : [];
      if (obj.startedAt && !state.finished) state.startedAt = Date.now() - state.elapsed;
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
    if (els.stageTimer) els.stageTimer.textContent = text;
    if (els.timer) {
      els.timer.classList.toggle("is-warn", state.elapsed > 12 * 60000 && state.elapsed <= 18 * 60000);
      els.timer.classList.toggle("is-over", state.elapsed > 18 * 60000);
    }
  }

  /* ------------------------------ 全屏 ------------------------------ */
  function isFullscreen() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement);
  }

  function requestFullscreen() {
    var el = document.documentElement;
    var fn = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
    if (!fn) { toast("当前浏览器不支持全屏，已进入专注模式"); return; }
    try {
      var p = fn.call(el);
      if (p && p.catch) p.catch(function () { toast("浏览器未允许全屏，已进入专注模式"); });
    } catch (e) { /* 忽略 */ }
  }

  function exitFullscreen() {
    if (!isFullscreen()) return;
    var fn = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
    if (!fn) return;
    try {
      var p = fn.call(document);
      if (p && p.catch) p.catch(function () {});
    } catch (e) { /* 忽略 */ }
  }

  function syncFullscreenBtn() {
    if (!els.btnFullscreen) return;
    els.btnFullscreen.textContent = isFullscreen() ? "退出全屏" : "全屏";
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

  /* ------------------------------ 答题进度图 ------------------------------ */
  function renderProgressMap() {
    if (!els.sheetMap) return;
    var html = "";
    levels.forEach(function (lv, li) {
      html += '<div class="stage-group" style="--lv:' + lv.color + '">' +
        '<span class="sgg-label">L' + lv.id + "</span>" +
        '<div class="sgg-cells">';
      for (var i = 0; i < 20; i++) {
        var g = li * 20 + i;
        html += '<span class="stage-cell" data-g="' + g + '" title="第 ' + (g + 1) + ' 题">' + (i + 1) + "</span>";
      }
      html += "</div></div>";
    });
    els.sheetMap.innerHTML = html;
    updateProgressMap();
  }

  function updateProgressMap() {
    if (!els.sheetMap) return;
    $$(".stage-cell", els.sheetMap).forEach(function (b) {
      var g = Number(b.getAttribute("data-g"));
      var st = statusOf(g);
      b.className = "stage-cell is-" + st +
        (g === state.current && state.phase !== "finished" ? " is-current" : "");
    });
    if (els.streakNum) els.streakNum.textContent = state.streak;
    if (els.streak) {
      els.streak.classList.toggle("is-warn", state.streak >= 7);
      els.streak.classList.toggle("is-danger", state.streak >= 9);
    }
  }

  /* ------------------------------ 开始面板 ------------------------------ */
  function isPractice() { return state.mode === "practice"; }

  function renderMode() {
    var practice = isPractice();
    var locked = answeredCount() > 0 && !state.finished;
    if (els.modeSwitch) {
      els.modeSwitch.hidden = locked;
      Array.prototype.forEach.call(els.modeSwitch.querySelectorAll(".mode-btn"), function (b) {
        var on = b.getAttribute("data-mode") === state.mode;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }
    if (els.modeHint) els.modeHint.hidden = locked;
    if (els.btnStart) els.btnStart.textContent = practice ? "开始练习（进入全屏）" : "开始答题（进入全屏）";
  }

  function setMode(mode) {
    if (state.phase === "testing" && answeredCount() > 0 && !state.finished) {
      toast("答题中不能切换模式，请先结束或重新开始");
      return;
    }
    state.mode = mode === "practice" ? "practice" : "placement";
    saveState();
    renderStartPanel();
  }

  function renderStartPanel() {
    if (!els.startPanel) return;
    var answered = answeredCount();
    var hasProgress = answered > 0 && !state.finished;

    els.startPanel.hidden = false;
    els.testStage.hidden = true;
    document.body.classList.remove("is-testing", "is-practice");
    renderMode();

    if (state.finished) {
      els.startTitle.textContent = isPractice() ? "本次练习已结束" : "本次测试已结束";
      els.startSub.textContent = scoreCache
        ? (state.earlyStop ? "提前结束 · " : "") + "答对 " + scoreCache.total.correct + " / 100 · 定级 " + scoreCache.result.label
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
      els.btnResume.textContent = "继续答题（进入全屏）";
      els.btnRestart2.hidden = false;
      els.startNote.textContent = "进度保存在本机浏览器；也可以重新开始一套新的。";
    } else {
      els.startTitle.textContent = "准备好了吗？";
      els.startSub.textContent = isPractice()
        ? "共 100 题 · 不限时 · 选完立刻看释义，手动进入下一题"
        : "共 100 题 · 每题 4 个选项 · 每题 5 秒自动进入下一题";
      els.btnStart.hidden = false;
      els.btnResume.hidden = true;
      els.btnRestart2.hidden = true;
      els.startNote.textContent = isPractice()
        ? "练习模式不自动跳题、不因连续答错提前结束；可随时点“结束测试”查看统计。"
        : "开始后进入全屏专注模式；连续 10 题答错会自动结束测试。";
    }
  }

  /* ------------------------------ 题目渲染 ------------------------------ */
  function renderQuestion() {
    var item = items[state.current];
    if (!item) return;
    state.phase = "testing";
    state.locked = false;

    if (els.qLevel) {
      els.qLevel.textContent = "Level " + item.levelId + " " + item.levelName;
      els.qLevel.style.setProperty("--lv", item.color);
    }
    if (els.qCount) els.qCount.textContent = "第 " + (state.current + 1) + " / " + items.length + " 题";
    if (els.qLevelCount) els.qLevelCount.textContent = "本级 " + item.n + "/20";
    if (els.qWord) els.qWord.textContent = item.w;
    if (els.qPos) els.qPos.textContent = item.pos;
    if (els.feedback) {
      els.feedback.hidden = true;
      els.feedback.className = "feedback";
      els.feedback.textContent = "";
    }

    var html = "";
    for (var i = 0; i < 4; i++) {
      html += '<button type="button" class="opt' + (i === 3 ? " opt-none" : "") +
        '" data-choice="' + i + '">' +
        '<span class="opt-letter">' + LETTERS[i] + "</span>" +
        '<span class="opt-text">' + (i === 3 ? NONE_OPTION : item.opts[i]) + "</span>" +
        "</button>";
    }
    els.qOptions.innerHTML = html;

    updateProgressMap();
    if (isPractice()) {
      stopCountdown();
      if (els.countdown) els.countdown.hidden = true;
      if (els.cdNum) els.cdNum.textContent = "–";
    } else {
      if (els.countdown) els.countdown.hidden = false;
      startCountdown();
    }
  }

  /* ------------------------------ 5 秒倒计时 ------------------------------ */
  function startCountdown() {
    clearInterval(state.countdownId);
    state.countdownStart = Date.now();
    updateCountdown(QUESTION_MS);
    state.countdownId = setInterval(function () {
      var left = QUESTION_MS - (Date.now() - state.countdownStart);
      if (left <= 0) {
        clearInterval(state.countdownId);
        state.countdownId = null;
        updateCountdown(0);
        handleTimeout();
        return;
      }
      updateCountdown(left);
    }, 80);
  }

  function updateCountdown(left) {
    var sec = Math.max(0, Math.ceil(left / 1000));
    var ratio = Math.max(0, Math.min(1, left / QUESTION_MS));
    if (els.cdNum) els.cdNum.textContent = sec;
    if (els.cdFg) {
      els.cdFg.style.strokeDasharray = CD_CIRC;
      els.cdFg.style.strokeDashoffset = CD_CIRC * (1 - ratio);
    }
    if (els.countdown) {
      els.countdown.classList.toggle("is-urgent", sec <= 2 && state.phase === "testing");
      els.countdown.classList.toggle("is-paused", state.phase !== "testing");
    }
  }

  function stopCountdown() {
    clearInterval(state.countdownId);
    state.countdownId = null;
  }

  /* ------------------------------ 判题与反馈 ------------------------------ */
  function showFeedback(pkg) {
    var item = pkg.item;
    var answerIdx = logic.answerOf(item);
    var correct = pkg.state === "correct";

    $$(".opt", els.qOptions).forEach(function (b) {
      var idx = Number(b.getAttribute("data-choice"));
      b.classList.remove("is-right", "is-wrong");
      b.disabled = true;
      if (idx === answerIdx) b.classList.add("is-right");
      if (!correct && idx === pkg.choice) b.classList.add("is-wrong");
    });

    if (els.feedback) {
      els.feedback.hidden = false;
      els.feedback.className = "feedback " + (correct ? "is-correct" : pkg.timeout ? "is-timeout" : "is-wrong");
      els.feedback.innerHTML = correct
        ? '<b>✓ 正确</b><span>你是对的</span>'
        : '<b>' + (pkg.timeout ? "⏱ 超时未答" : "✗ 答错") + "</b><span>正确答案：" + itemAnswerText(item) +
          (item.ans === -1 ? '<i>（标准释义：' + item.meaning + "）</i>" : "") + "</span>";
    }
    if (isPractice() && els.feedback) {
      var meaning = item.meaning ? "<b>" + item.w + "：</b>" + item.meaning : "";
      els.feedback.innerHTML += '<span class="practice-explain">' + meaning + "</span>" +
        '<button type="button" class="practice-next" id="practiceNext">' +
        (state.current >= items.length - 1 ? "查看统计" : "下一题 →") + "</button>";
    }
    if (els.cdNum) els.cdNum.textContent = "–";
    if (els.countdown) els.countdown.classList.add("is-paused");
  }

  function scheduleNext(delay, endAfter, target) {
    clearTimeout(state.nextTimer);
    state.nextTimer = setTimeout(function () {
      if (endAfter) { finishQuiz(true); return; }
      if (target == null) target = state.current + 1;
      if (target >= items.length) { finishQuiz(false); return; }
      state.current = target;
      saveState();
      renderQuestion();
    }, delay);
  }

  function practiceNext() {
    if (!isPractice()) return;
    if (state.current >= items.length - 1) { finishQuiz(false); return; }
    state.current += 1;
    state.locked = false;
    saveState();
    renderQuestion();
    updateProgressMap();
  }

  function selectChoice(choice) {
    if (state.locked || state.phase !== "testing" || state.finished) return;
    state.locked = true;
    stopCountdown();

    var item = items[state.current];
    var answerIdx = logic.answerOf(item);
    var st = choice === answerIdx ? "correct" : "wrong";
    state.answers[state.current] = choice;
    if (st === "correct") state.streak = 0;
    else state.streak += 1;
    state.stopLevel = item.levelId;

    showFeedback({ item: item, state: st, choice: choice, timeout: false });
    updateProgressMap();
    saveState();

    if (isPractice()) return;

    var end = state.streak >= STREAK_LIMIT;
    var target = null;
    if (st === "correct") {
      var range = levelRange(item.levelIndex);
      var correctNow = levelCorrect(item.levelIndex);
      if (correctNow >= PASS_PER_LEVEL && state.current === range[0] + PASS_PER_LEVEL - 1) {
        target = nextLevelStart(item.levelIndex);
        state.autoPassed[item.levelIndex] = true;
        var nextLv = levels[item.levelIndex + 1];
        toast(nextLv
          ? "本级已答对 15 题，通过；自动进入 " + (nextLv.code || ("Level " + nextLv.id)) + " " + nextLv.name
          : "本级已答对 15 题，测试完成");
      }
    }
    scheduleNext(FEEDBACK_MS + 150, end, target);
  }

  function handleTimeout() {
    if (state.locked || state.phase !== "testing" || state.finished) return;
    state.locked = true;
    var item = items[state.current];
    state.answers[state.current] = -1;
    state.streak += 1;
    state.stopLevel = item.levelId;
    showFeedback({ item: item, state: "timeout", choice: -1, timeout: true });
    updateProgressMap();
    saveState();
    var end = state.streak >= STREAK_LIMIT;
    scheduleNext(FEEDBACK_MS + 250, end);
  }

  /* ------------------------------ 开始 / 继续 / 重置 ------------------------------ */
  function enterTestMode() {
    document.body.classList.add("is-testing");
    els.startPanel.hidden = true;
    els.testStage.hidden = false;
    requestFullscreen();
    state.phase = "testing";
    state.locked = false;
    state.streak = 0;
    document.body.classList.toggle("is-practice", isPractice());
    if (els.countdown) els.countdown.hidden = isPractice();
    if (!state.startedAt) state.startedAt = Date.now();
    startTimer();
    renderQuestion();
    updateProgressMap();
    syncFullscreenBtn();
  }

  function startFresh() {
    if (answeredCount() > 0 && !state.finished) {
      if (!window.confirm("重新开始会清空已答的题目，确定吗？")) return;
    }
    state.answers = {};
    state.autoPassed = {};
    state.current = 0;
    state.startedAt = Date.now();
    state.elapsed = 0;
    state.finished = false;
    state.earlyStop = false;
    state.completedAll = false;
    state.stopLevel = 0;
    state.streak = 0;
    clearTimeout(state.nextTimer);
    clearInterval(state.countdownId);
    stopTimer();
    saveState();
    scoreCache = null;
    enterTestMode();
    toast("答题开始：每题 5 秒，选完自动进入下一题");
  }

  function resumeQuiz() {
    if (state.finished) {
      var r = document.getElementById("result");
      if (r) r.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    var idx = state.current;
    while (idx < items.length && isAnswered(idx)) idx++;
    state.current = Math.min(items.length - 1, idx);
    enterTestMode();
    var sec = document.getElementById("test");
    if (sec) sec.scrollIntoView({ block: "start" });
  }

  function restartQuiz() {
    var msg = state.finished ? "确定重新开始一套新的测试吗？当前结果将被清空（复测记录保留）。" : "确定重新开始吗？已答的题目会被清空。";
    if (!window.confirm(msg)) return;
    exitFullscreen();
    state.answers = {};
    state.current = 0;
    state.startedAt = null;
    state.elapsed = 0;
    state.finished = false;
    state.earlyStop = false;
    state.completedAll = false;
    state.stopLevel = 0;
    state.streak = 0;
    state.phase = "idle";
    clearTimeout(state.nextTimer);
    clearInterval(state.countdownId);
    stopTimer();
    updateTimer();
    saveState();
    document.body.classList.remove("is-testing");
    renderStartPanel();
    renderResult();
    renderLevelTable(null);
    var sec = document.getElementById("test");
    if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
    toast("已清空，可重新开始");
  }

  /* ------------------------------ 结束 ------------------------------ */
  function finishQuiz(early) {
    if (state.finished) return;
    state.finished = true;
    state.earlyStop = !!early;
    state.completedAll = !early && answeredCount() >= items.length;
    if (early) state.streak = STREAK_LIMIT;
    state.phase = "finished";
    state.locked = true;
    if (state.startedAt) state.elapsed = Date.now() - state.startedAt;
    clearTimeout(state.nextTimer);
    clearInterval(state.countdownId);
    stopTimer();
    exitFullscreen();
    document.body.classList.remove("is-testing");
    saveState();
    scoreCache = logic.score(state.answers, data, state.autoPassed);
    renderResult();
    renderStartPanel();
    updateTimer();
    toast(early ? "连续 10 题答错，测试已提前结束" : "测试已结束，结果已生成");
    var r = document.getElementById("result");
    if (r) r.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function submitNow() {
    if (state.finished) {
      var r0 = document.getElementById("result");
      if (r0) r0.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    var blank = items.length - answeredCount();
    var ok = window.confirm(blank > 0
      ? "还有 " + blank + " 题未测，未测按 0 分计。确定结束测试吗？"
      : "确定结束测试并查看结果吗？");
    if (!ok) return;
    finishQuiz(false);
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
    if (isPractice()) return "练习模式 · 不限时";
    var min = ms / 60000;
    if (ms <= 0) return "尚未开始计时";
    if (min > 18) return "明显超过预期用时，结果仅供参考";
    if (min > 12) return "用时略长";
    if (min < 1) return "用时很短，说明作答非常迅速";
    return "用时正常（每题 5 秒节奏）";
  }

  function renderResult() {
    var body = els.resultBody;
    var empty = els.resultEmpty;
    if (!state.finished || !scoreCache) {
      if (body) body.hidden = true;
      if (empty) empty.hidden = false;
      if (els.earlyBanner) els.earlyBanner.hidden = true;
      return;
    }
    if (body) body.hidden = false;
    if (empty) empty.hidden = true;

    var sc = scoreCache;
    var result = sc.result;

    if (els.earlyBanner) {
      els.earlyBanner.hidden = !state.earlyStop;
      if (state.earlyStop) {
        if (els.earlyReason) {
          els.earlyReason.textContent = "连续 " + STREAK_LIMIT + " 题答错（含超时未答），测试在 Level " + state.stopLevel +
            " 第 " + (state.current % 20 + 1) + " 题处提前结束。";
        }
        if (els.earlyNote) {
          els.earlyNote.textContent = "为什么提前结束：连续答错说明当前级别已明显超出你的词汇水平，继续测容易变成猜题，既测不出真实词汇量，也会浪费时间。未测题目记为“未测”，不参与答对计数；定级按已测部分计算（未测级别按 0 分计）。建议从 " + result.recommend + " 开始系统回补。";
        }
      }
    }

    els.resLevel.textContent = result.label;
    els.resSub.textContent = (isPractice() ? "练习模式 · " : "") + resultSub(result);
    var badge = els.resBadge;
    badge.textContent = result.code === "edge" ? "边缘" : result.code === "below" ? "未达" : result.code === "perfect" ? "满级" : "通过";
    badge.className = "rc-badge" + (result.code === "edge" ? " is-edge" : result.code === "below" ? " is-below" : "");

    els.resEstimate.textContent = estimateLabel(result);
    els.resRange.textContent = "区间 " + result.rangeText;
    els.resCorrect.textContent = sc.total.correct + " / 100";
    els.resAccuracy.textContent = "已答 " + sc.total.answered + " 题 · 正确率 " + Math.round(sc.accuracy * 100) + "%";
    els.resTime.textContent = fmtTime(state.elapsed);
    els.resTimeNote.textContent = timeNote(state.elapsed);
    els.resRecommend.textContent = result.recommend;
    els.resStop.textContent = state.earlyStop
      ? "提前结束（Level " + state.stopLevel + "）"
      : (result.code === "below" ? "止于第 1 级" : result.code === "perfect" ? "五级全过" : "止于第 " + (result.highest + 1) + " 级");

    var parts = [
      "正确 " + sc.total.correct,
      "错误 " + sc.total.wrong,
      "超时未答 " + sc.total.timeout,
      "未测 " + sc.total.blank,
      "“无正确含义”题答对 " + sc.trap.correct + " / " + sc.trap.total
    ];
    els.resMeta.textContent = parts.join(" · ");

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
        var g = li * 20 + i;
        var st = statusOf(g);
        var cls = "dist-cell is-" + st + (i > 0 && i % 5 === 0 ? " is-sep" : "");
        var txt = st === "correct" ? "答对" : st === "wrong" ? "答错" : st === "timeout" ? "超时" : "未测";
        cells += '<span class="' + cls + '" title="L' + lv.id + " 第 " + (i + 1) + " 题：" + txt + '"></span>';
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
          "：对 " + p.correct + " · 错 " + p.wrong + " · 超时 " + p.timeout + " · 未测 " + p.blank + "</li>";
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
    p.push('<text x="' + labelX + '" y="' + (axisY - 56) + '" text-anchor="middle" font-size="11" font-weight="700" fill="#C0553F">▲ ' + estimateLabel(result) + "</text>");
    p.push('<text x="' + (W - padR) + '" y="' + (H - 4) + '" text-anchor="end" font-size="9.5" fill="#8BA0B1">累计词汇量（词）</text>');

    return '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="词汇量刻度尺：估算 ' + result.estimate + ' 词">' + p.join("") + "</svg>";
  }

  function renderWrongList(sc) {
    if (!els.wrongList) return;
    var bad = sc.details.filter(function (d) { return d.state === "wrong" || d.state === "timeout"; });
    if (!bad.length) {
      els.wrongList.innerHTML = '<div class="wrong-empty">已测题目全部答对，没有需要回补的词。<br>下一阶段可保持每周 2 次阅读 + 1 次写作，向高中衔接词拓展。</div>';
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
          '<span class="wi-state ' + (d.state === "timeout" ? "is-blank" : "is-wrong") + '">' +
          (d.state === "timeout" ? "超时未答" : "你选了 " + choiceText(d, d.choice)) + "</span>" +
          '<span class="wi-answer">正确：' + itemAnswerText(d) + "</span>" +
          "</div>";
      });
      html += "</div></div>";
    });
    els.wrongList.innerHTML = html;
  }

  function exportWrongCsv() {
    if (!scoreCache) { toast("结束测试后才能导出"); return; }
    var sc = scoreCache;
    var bad = sc.details.filter(function (d) { return d.state === "wrong" || d.state === "timeout"; });
    if (!bad.length) { toast("没有错题可导出"); return; }
    var rows = [["级别", "题号", "单词", "词性", "正确释义", "你的选择", "状态"]];
    bad.forEach(function (d) {
      var lv = levels[d.levelIndex] || { id: "", name: "" };
      rows.push([
        "Level " + lv.id + " " + lv.name, d.n, d.w, d.pos,
        itemAnswerText(d), choiceText(d, d.choice),
        d.state === "timeout" ? "超时未答" : "答错"
      ]);
    });
    var csv = rows.map(function (r) {
      return r.map(function (v) { return '"' + String(v).replace(/"/g, '""') + '"'; }).join(",");
    }).join("\r\n");
    var blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "词汇错题清单-" + new Date().toISOString().slice(0, 10) + ".csv";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    toast("已导出 " + bad.length + " 题");
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
        var g = li * 20 + i;
        var d = sc.details[g];
        var st = statusOf(g);
        var mark = st === "correct" ? '<span class="mk ok">✓ 对</span>'
          : st === "wrong" ? '<span class="mk no">✗ 错</span>'
            : st === "timeout" ? '<span class="mk timeout">⏱ 超时</span>'
              : '<span class="mk blank">— 未测</span>';
        html += "<tr>" +
          "<td>" + d.n + "</td>" +
          "<td><b>" + d.w + "</b> <small>" + d.pos + "</small></td>" +
          "<td>" + choiceText(d, d.choice) + "</td>" +
          "<td>" + itemAnswerText(d) + "</td>" +
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
      tbody.innerHTML = '<tr class="empty"><td colspan="8">还没有保存记录。测试结束后点“保存本次记录”，即可在这里追踪变化。</td></tr>';
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
        "<td>" + escapeHtml(h.label) + (h.early ? "（提前结束）" : "") + "</td>" +
        "<td>约 " + h.estimate + " 词</td>" +
        "<td>" + delta + "</td>" +
        "</tr>";
    }).join("");
  }

  function saveResult() {
    if (!scoreCache) { toast("结束测试后才能保存结果"); return; }
    state.history.push({
      ts: Date.now(),
      name: state.profile.name,
      cls: state.profile.cls,
      elapsed: state.elapsed,
      correct: scoreCache.total.correct,
      label: scoreCache.result.label,
      estimate: scoreCache.result.estimate,
      early: state.earlyStop
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
    var lines = [
      "【初中英语词汇量快速定级测试单 · 选择题版（5 秒/题）】",
      "模式：" + (isPractice() ? "练习模式（不限时、手动下一题）" : "正式定级（5 秒/题、自动跳题）"),
      "姓名/班级：" + who,
      "答对题数：" + sc.total.correct + " / 100（已答 " + sc.total.answered + " 题，正确率 " + Math.round(sc.accuracy * 100) + "%）",
      "定级：" + sc.result.label,
      "估算词汇量：" + estimateLabel(sc.result) + "（区间 " + sc.result.rangeText + "）",
      "用时：" + fmtTime(state.elapsed),
      "正确 " + sc.total.correct + " · 错误 " + sc.total.wrong + " · 超时未答 " + sc.total.timeout + " · 未测 " + sc.total.blank,
      "“无正确含义”题答对：" + sc.trap.correct + " / " + sc.trap.total,
      "建议回补：" + sc.result.recommend
    ];
    if (state.earlyStop) lines.push("说明：连续 " + STREAK_LIMIT + " 题答错，测试提前结束（未测题按 0 分计）。");
    lines.push("生成时间：" + new Date().toLocaleString("zh-CN"));
    return lines.join("\n");
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
    if (els.qOptions) els.qOptions.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest(".opt") : null;
      if (!b || b.disabled) return;
      selectChoice(Number(b.getAttribute("data-choice")));
    });
    if (els.btnStart) els.btnStart.addEventListener("click", startFresh);
    if (els.modeSwitch) els.modeSwitch.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest(".mode-btn") : null;
      if (b) setMode(b.getAttribute("data-mode"));
    });
    if (els.feedback) els.feedback.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("#practiceNext") : null;
      if (b) practiceNext();
    });
    if (els.btnResume) els.btnResume.addEventListener("click", resumeQuiz);
    if (els.btnRestart2) els.btnRestart2.addEventListener("click", restartQuiz);
    if (els.btnReset) els.btnReset.addEventListener("click", restartQuiz);
    if (els.btnRetake) els.btnRetake.addEventListener("click", restartQuiz);
    if (els.btnEndTest) els.btnEndTest.addEventListener("click", submitNow);
    if (els.btnFullscreen) {
      els.btnFullscreen.addEventListener("click", function () {
        if (isFullscreen()) exitFullscreen();
        else requestFullscreen();
      });
    }
    if (els.btnSaveResult) els.btnSaveResult.addEventListener("click", saveResult);
    if (els.btnCopyResult) {
      els.btnCopyResult.addEventListener("click", function () {
        var text = buildResultText();
        if (!text) { toast("结束测试后才能复制结果"); return; }
        copyText(text).then(function (ok) {
          toast(ok ? "结果已复制到剪贴板" : "复制失败，请手动选择文本");
        });
      });
    }
    if (els.btnPrint) els.btnPrint.addEventListener("click", function () { window.print(); });
    if (els.btnPrintResult) els.btnPrintResult.addEventListener("click", function () { window.print(); });
    if (els.btnExportWrong) els.btnExportWrong.addEventListener("click", exportWrongCsv);

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
          toast("结束测试后才能查看结果");
          var t = document.getElementById("test");
          if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }

    document.addEventListener("keydown", function (e) {
      if (state.finished || state.phase !== "testing" || !els.testStage || els.testStage.hidden) return;
      var tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      var k = e.key;
      if (isPractice() && state.locked && (k === "Enter" || k === " ")) { practiceNext(); e.preventDefault(); return; }
      if (k >= "1" && k <= "4") { selectChoice(Number(k) - 1); e.preventDefault(); }
      else if (k === "a" || k === "A") { selectChoice(0); e.preventDefault(); }
      else if (k === "b" || k === "B") { selectChoice(1); e.preventDefault(); }
      else if (k === "c" || k === "C") { selectChoice(2); e.preventDefault(); }
      else if (k === "d" || k === "D") { selectChoice(3); e.preventDefault(); }
    });

    document.addEventListener("fullscreenchange", syncFullscreenBtn);
    document.addEventListener("webkitfullscreenchange", syncFullscreenBtn);

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
      modeSwitch: $("#modeSwitch"),
      modeHint: $("#modeHint"),
      btnStart: $("#btnStart"),
      btnResume: $("#btnResume"),
      btnRestart2: $("#btnRestart2"),
      testStage: $("#testStage"),
      stageTimer: $("#stageTimer"),
      countdown: $("#countdown"),
      cdNum: $("#cdNum"),
      cdFg: $("#cdFg"),
      qLevel: $("#qLevel"),
      qCount: $("#qCount"),
      qLevelCount: $("#qLevelCount"),
      qWord: $("#qWord"),
      qPos: $("#qPos"),
      qOptions: $("#qOptions"),
      feedback: $("#feedback"),
      streak: $("#streak"),
      streakNum: $("#streakNum"),
      sheetMap: $("#sheetMap"),
      btnFullscreen: $("#btnFullscreen"),
      btnEndTest: $("#btnEndTest"),
      resultEmpty: $("#resultEmpty"),
      resultBody: $("#resultBody"),
      earlyBanner: $("#earlyBanner"),
      earlyReason: $("#earlyReason"),
      earlyNote: $("#earlyNote"),
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
      btnExportWrong: $("#btnExportWrong"),
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
    renderProgressMap();
    renderAnswerTables();
    renderRangeTable();
    renderLevelTable(null);
    bindEvents();

    if (els.inpName) els.inpName.value = state.profile.name || "";
    if (els.inpClass) els.inpClass.value = state.profile.cls || "";
    if (els.outDate) els.outDate.textContent = todayText();

    if (state.finished) {
      scoreCache = logic.score(state.answers, data, state.autoPassed);
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
    updateProgressMap();
    fillPrintHeader();
    syncFullscreenBtn();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
