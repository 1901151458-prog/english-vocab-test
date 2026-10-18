/* =============================================================================
 * 初中英语词汇量快速定级测试单 · 交互逻辑
 * 依赖：data.js（VT_DATA）、logic.js（VT_LOGIC）；无第三方库
 * ========================================================================== */
(function () {
  "use strict";

  var data = window.VT_DATA;
  var logic = window.VT_LOGIC;
  var levels = data.levels;
  var STORAGE_KEY = "vt-vocab-placement-v1";
  var CIRC = 2 * Math.PI * 52; // 环形进度周长

  /* ------------------------------ 状态 ------------------------------ */
  var state = {
    checked: {},        // { levelId: [wordNumber, ...] }
    startedAt: null,    // ms
    elapsed: 0,         // ms
    timerId: null,
    profile: { name: "", cls: "" },
    history: [],
    result: null,
    spot: null,
    spotSig: ""
  };

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var els = {};
  var btnMap = {};

  /* ------------------------------ 工具 ------------------------------ */
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
    toast._tid = setTimeout(function () { t.classList.remove("is-show"); }, 2200);
  }

  /* ------------------------------ 存储 ------------------------------ */
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        checked: state.checked,
        startedAt: state.startedAt,
        elapsed: state.elapsed,
        profile: state.profile,
        history: state.history,
        savedAt: Date.now()
      }));
    } catch (e) { /* 隐私模式下忽略 */ }
  }

  function loadState() {
    var raw;
    try { raw = localStorage.getItem(STORAGE_KEY); } catch (e) { return; }
    if (!raw) return;
    try {
      var obj = JSON.parse(raw);
      if (obj && typeof obj === "object") {
        state.checked = obj.checked || {};
        state.profile = obj.profile || { name: "", cls: "" };
        state.history = Array.isArray(obj.history) ? obj.history : [];
        if (obj.startedAt && !isNaN(obj.startedAt)) {
          state.startedAt = obj.startedAt;
          state.elapsed = Number(obj.elapsed) || 0;
          // 用“已完成用时”续接计时，避免把关闭页面的时间算进去
          state.startedAt = Date.now() - state.elapsed;
        }
      }
    } catch (e) { /* 数据损坏则忽略 */ }
  }

  /* ------------------------------ 计时 ------------------------------ */
  function startTimer() {
    if (state.timerId) return;
    state.startedAt = Date.now() - (state.elapsed || 0);
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
      els.timer.classList.toggle("is-warn", state.elapsed > 8 * 60 * 1000 && state.elapsed <= 12 * 60 * 1000);
      els.timer.classList.toggle("is-over", state.elapsed > 12 * 60 * 1000);
    }
  }

  /* ------------------------------ 勾选状态 ------------------------------ */
  function listOf(levelId) {
    if (!state.checked[levelId]) state.checked[levelId] = [];
    return state.checked[levelId];
  }

  function isChecked(levelId, n) {
    return listOf(levelId).indexOf(n) >= 0;
  }

  function counts() {
    return levels.map(function (lv) { return listOf(lv.id).length; });
  }

  function toggleWord(levelId, n, btn) {
    var list = listOf(levelId);
    var idx = list.indexOf(n);
    if (idx >= 0) list.splice(idx, 1);
    else list.push(n);
    btn.setAttribute("aria-pressed", idx >= 0 ? "false" : "true");
    startTimer();
    update();
    saveState();
  }

  /* ------------------------------ 渲染：五级阶梯 ------------------------------ */
  function renderHeroLadder() {
    var box = els.heroLadder;
    if (!box) return;
    var max = levels[levels.length - 1].cum;
    box.innerHTML = levels.map(function (lv) {
      return '<li class="ladder-row" style="--lv:' + lv.color + '">' +
        '<span class="lv-name">L' + lv.id + '<small>' + lv.name + "</small></span>" +
        '<span class="ladder-bar"><i style="width:' + Math.round(lv.cum / max * 100) + "%;background:" + lv.color + '"></i></span>' +
        '<span class="lv-cum">≈ ' + lv.cum + " 词</span>" +
        "</li>";
    }).join("");
  }

  /* ------------------------------ 渲染：词表 ------------------------------ */
  function renderLevels() {
    var frag = document.createDocumentFragment();
    levels.forEach(function (lv) {
      var card = document.createElement("article");
      card.className = "level-card";
      card.id = "level-" + lv.id;
      card.style.setProperty("--lv", lv.color);
      card.innerHTML =
        '<div class="level-head">' +
          '<div class="level-title">' +
            '<span class="level-badge">Level ' + lv.id + "</span>" +
            "<h3>" + lv.name + "</h3>" +
            '<span class="level-book">' + lv.book + " · 累计约 " + lv.cum + " 词</span>" +
          "</div>" +
          '<span class="level-status" data-status>未勾选</span>' +
        "</div>" +
        '<div class="level-progress">' +
          '<span class="lp-count"><b data-count>0</b> / 20</span>' +
          '<span class="lp-bar"><i data-bar></i></span>' +
          '<span class="lp-target">通过 ≥16 个</span>' +
        "</div>" +
        '<div class="word-grid" role="group" aria-label="Level ' + lv.id + " " + lv.name + ' 词表"></div>' +
        '<div class="level-foot"><span>本级抽查：随机 2 词口头核对</span><span data-foot>累计约 ' + lv.cum + " 词</span></div>";

      var grid = card.querySelector(".word-grid");
      lv.words.forEach(function (w) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "word";
        btn.setAttribute("data-level", lv.id);
        btn.setAttribute("data-n", w.n);
        btn.setAttribute("aria-pressed", "false");
        btn.setAttribute("title", w.w + " · " + w.pos + " " + w.meaning);
        btn.innerHTML =
          '<span class="box" aria-hidden="true"></span>' +
          '<span class="num">' + w.n + "</span>" +
          '<span class="w">' + w.w + "</span>" +
          '<span class="meaning">' + w.pos + " " + w.meaning + "</span>";
        btn.addEventListener("click", function () { toggleWord(lv.id, w.n, btn); });
        grid.appendChild(btn);
        btnMap[lv.id + "-" + w.n] = btn;
      });

      frag.appendChild(card);
    });
    els.levels.appendChild(frag);
  }

  /* ------------------------------ 渲染：实时面板 ------------------------------ */
  function renderLiveLevels() {
    els.liveLevels.innerHTML = levels.map(function (lv) {
      return '<li style="--lv:' + lv.color + '">' +
        '<span class="ll-name">L' + lv.id + "</span>" +
        '<span class="ll-bar"><i data-llbar="' + lv.id + '"></i></span>' +
        '<span class="ll-count" data-llcount="' + lv.id + '">0/20</span>' +
        "</li>";
    }).join("");
  }

  /* ------------------------------ 渲染：教师答案 ------------------------------ */
  function renderAnswerBlocks() {
    var box = els.answerTables;
    if (!box) return;
    box.innerHTML = levels.map(function (lv) {
      var items = lv.words.map(function (w) {
        return '<div class="answer-item" style="--lv:' + lv.color + '">' +
          '<span class="ai-num">' + w.n + "</span>" +
          '<span class="ai-w">' + w.w + "</span>" +
          '<span class="ai-m"><span class="ai-p">' + w.pos + "</span> " + w.meaning + "</span>" +
          "</div>";
      }).join("");
      return '<div class="answer-block" style="--lv:' + lv.color + '">' +
        "<h4><i></i>Level " + lv.id + " " + lv.name + "（20 词）</h4>" +
        '<div class="answer-grid">' + items + "</div>" +
        "</div>";
    }).join("");
  }

  /* ------------------------------ 渲染：速查表 ------------------------------ */
  function renderRangeTable() {
    var tbody = els.rangeTable ? els.rangeTable.querySelector("tbody") : null;
    if (!tbody) return;
    var rows = logic.rangeTable(data);
    tbody.innerHTML = rows.map(function (r) {
      return "<tr data-range-label=\"" + escapeHtml(r.label) + "\">" +
        "<td>" + r.label + "</td><td>" + r.case + "</td><td>" + r.range[0] + "–" + r.range[1] + " 词</td></tr>";
    }).join("");
  }

  /* ------------------------------ 渲染：结果 ------------------------------ */
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
    if (min > 12) return "超过 12 分钟，结果仅供参考，建议重测";
    if (min > 8) return "略超过 8 分钟，可留意是否犹豫过久";
    if (min < 1.5) return "用时很短，建议确认没有猜词";
    return "在 5–8 分钟建议区间内";
  }

  function renderDistGrid(countsArr) {
    if (!els.distGrid) return;
    var html = levels.map(function (lv, i) {
      var cells = "";
      var checkedN = {};
      listOf(lv.id).forEach(function (n) { checkedN[n] = true; });
      for (var n = 1; n <= 20; n++) {
        var cls = "dist-cell" + (checkedN[n] ? " is-on" : "") + (n > 1 && (n - 1) % 5 === 0 ? " is-sep" : "");
        cells += '<span class="' + cls + '" style="--lv:' + lv.color + '" title="L' + lv.id + " 第 " + n + ' 词"></span>';
      }
      return '<div class="dist-row" style="--lv:' + lv.color + '">' +
        '<span class="dr-label">L' + lv.id + "</span>" +
        '<span class="dist-cells">' + cells + "</span>" +
        "</div>";
    }).join("");
    els.distGrid.innerHTML = html;

    if (els.distLegend) {
      els.distLegend.innerHTML = levels.map(function (lv, i) {
        return '<li style="--lv:' + lv.color + '"><span class="chip"></span>L' + lv.id + " " + lv.name + "：" + countsArr[i] + " / 20</li>";
      }).join("");
    }
  }

  function rulerSvg(result) {
    var W = 480, H = 198;
    var padL = 20, padR = 16;
    var axisY = 118;
    var x = function (v) { return padL + (v / 2400) * (W - padL - padR); };
    var p = [];

    // 级别色带
    levels.forEach(function (lv, i) {
      var start = i === 0 ? 0 : levels[i - 1].cum;
      var x0 = x(start), x1 = x(lv.cum);
      p.push('<rect x="' + x0 + '" y="' + (axisY + 4) + '" width="' + Math.max(1, x1 - x0) + '" height="28" fill="' + lv.color + '" fill-opacity="0.15" stroke="' + lv.color + '" stroke-opacity="0.55" stroke-width="1"/>');
      p.push('<text x="' + ((x0 + x1) / 2) + '" y="' + (axisY + 22) + '" text-anchor="middle" font-size="11" font-weight="700" fill="' + lv.color + '">L' + lv.id + "</text>");
    });

    // 轴线
    p.push('<line x1="' + padL + '" y1="' + axisY + '" x2="' + (W - padR) + '" y2="' + axisY + '" stroke="#134B70" stroke-width="1.6"/>');

    // 刻度
    for (var v = 0; v <= 2400; v += 100) {
      var xv = x(v);
      var major = v % 600 === 0;
      p.push('<line x1="' + xv + '" y1="' + axisY + '" x2="' + xv + '" y2="' + (axisY - (major ? 16 : 8)) + '" stroke="#6c8296" stroke-width="' + (major ? 1.3 : 0.9) + '"/>');
      if (major) {
        p.push('<text x="' + xv + '" y="' + (axisY - 22) + '" text-anchor="middle" font-size="10" fill="#5B7184">' + v + "</text>");
      }
    }

    // 课标 1600 参考线
    var x1600 = x(1600);
    p.push('<line x1="' + x1600 + '" y1="' + (axisY - 32) + '" x2="' + x1600 + '" y2="' + (axisY + 34) + '" stroke="#A9721A" stroke-width="1.4" stroke-dasharray="5 4"/>');
    p.push('<text x="' + x1600 + '" y="' + (axisY - 37) + '" text-anchor="middle" font-size="9.5" fill="#A9721A">课标 1600</text>');

    // 本次估算位置
    var xe = x(Math.min(2400, Math.max(0, result.estimate)));
    var labelX = Math.min(W - padR - 40, Math.max(padL + 40, xe));
    p.push('<line x1="' + xe + '" y1="' + axisY + '" x2="' + xe + '" y2="' + (axisY - 40) + '" stroke="#C0553F" stroke-width="1.8"/>');
    p.push('<polygon points="' + xe + "," + (axisY - 40) + " " + (xe - 5) + "," + (axisY - 50) + " " + (xe + 5) + "," + (axisY - 50) + '" fill="#C0553F"/>');
    p.push('<text x="' + labelX + '" y="' + (axisY - 56) + '" text-anchor="middle" font-size="11" font-weight="700" fill="#C0553F">▲ 约 ' + result.estimate + " 词</text>");

    // 单位
    p.push('<text x="' + (W - padR) + '" y="' + (H - 4) + '" text-anchor="end" font-size="9.5" fill="#8BA0B1">累计词汇量（词）</text>');

    return '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="词汇量刻度尺：估算 ' + result.estimate + ' 词">' + p.join("") + "</svg>";
  }

  function renderResult(result) {
    var body = els.resultBody;
    var empty = els.resultEmpty;
    if (result.total <= 0) {
      if (body) body.hidden = true;
      if (empty) empty.hidden = false;
      return;
    }
    if (body) body.hidden = false;
    if (empty) empty.hidden = true;

    els.resLevel.textContent = result.label;
    els.resSub.textContent = resultSub(result);

    var badge = els.resBadge;
    badge.textContent = result.code === "edge" ? "边缘" : result.code === "below" ? "未达" : result.code === "perfect" ? "满级" : "通过";
    badge.className = "rc-badge" + (result.code === "edge" ? " is-edge" : result.code === "below" ? " is-below" : "");

    els.resEstimate.textContent = result.estimateText;
    els.resRange.textContent = "区间 " + result.rangeText;
    els.resTotal.textContent = result.total + " / 100";
    els.resQuick.textContent = "快速粗估 ×24 ≈ " + result.quick + " 词";
    els.resTime.textContent = fmtTime(state.elapsed);
    els.resTimeNote.textContent = timeNote(state.elapsed);
    els.resRecommend.textContent = result.recommend;
    els.resStop.textContent = result.code === "below" ? "止于第 1 级" : result.code === "perfect" ? "五级全过" : "止于第 " + (result.highest + 1) + " 级";

    var adviceLv = levels[Math.min(4, Math.max(0, result.adviceLevel - 1))] || levels[0];
    els.resAdvice.textContent = result.code === "below"
      ? "从 Level 1 起步级开始：先过七上单元词表，每天 15 词（词 → 义 → 拼写），先补高频名词与动词。"
      : adviceLv.advice;
    els.resGoal.textContent = goalText(result) + "；期望线：初二 ≥ Level 3，初三 ≥ Level 4。";

    renderDistGrid(counts());
    if (els.ruler) els.ruler.innerHTML = rulerSvg(result);
    if (els.rulerNote) {
      els.rulerNote.textContent = "你的估算位置落在 " + result.label + " 区间（" + result.rangeText + "）；下一目标：" + result.recommend + "。";
    }

    renderSpot(result);
    renderLevelTable(result);
    renderRangeHighlight(result);
  }

  function renderSpot(result) {
    var countsArr = counts();
    var sig = countsArr.join(",");
    if (!state.spot || state.spotSig !== sig) {
      var byLevel = levels.map(function (lv) {
        return lv.words.filter(function (w) { return isChecked(lv.id, w.n); })
          .map(function (w) { return { n: w.n, w: w.w, meaning: w.meaning }; });
      });
      state.spot = logic.pickSpotCheck(byLevel, levels, 2);
      state.spotSig = sig;
    }
    if (!els.spotList) return;
    if (!state.spot.length) {
      els.spotList.innerHTML = '<p class="panel-note">勾选单词后，这里会为每个级别抽 2 个词，供老师口头核对。</p>';
      return;
    }
    els.spotList.innerHTML = state.spot.map(function (item) {
      return '<div class="spot-item" style="--lv:' + item.color + '">' +
        '<span class="spot-level">Level ' + item.levelId + " " + item.name + "</span>" +
        item.words.map(function (w) { return '<span class="spot-word">' + w.w + "</span>"; }).join("") +
        "</div>";
    }).join("");
  }

  function renderLevelTable(result) {
    var tbody = els.levelTable ? els.levelTable.querySelector("tbody") : null;
    if (!tbody) return;
    var current = result.highest; // 1–5，0=未达
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

  function renderRangeHighlight(result) {
    var tbody = els.rangeTable ? els.rangeTable.querySelector("tbody") : null;
    if (!tbody) return;
    $$("tr", tbody).forEach(function (tr) {
      tr.classList.toggle("is-current", tr.getAttribute("data-range-label") === result.label);
    });
  }

  /* ------------------------------ 渲染：复测记录 ------------------------------ */
  function renderHistory() {
    if (!els.historyTable) return;
    var tbody = els.historyTable.querySelector("tbody");
    var list = state.history.slice().sort(function (a, b) { return a.ts - b.ts; });
    if (!list.length) {
      tbody.innerHTML = '<tr class="empty"><td colspan="8">还没有保存记录。做完测试后点“保存本次记录”，即可在这里追踪变化。</td></tr>';
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
        "<td>" + h.total + " / 100</td>" +
        "<td>" + escapeHtml(h.label) + "</td>" +
        "<td>约 " + h.estimate + " 词</td>" +
        "<td>" + delta + "</td>" +
        "</tr>";
    }).join("");
  }

  /* ------------------------------ 全量刷新 ------------------------------ */
  function update() {
    var countsArr = counts();
    var result = logic.evaluate(countsArr, data);
    state.result = result;

    // 顶部与工具条
    if (els.globalCount) els.globalCount.textContent = result.total;
    if (els.globalBar) els.globalBar.style.width = Math.min(100, result.total) + "%";

    // 每个级别卡片
    levels.forEach(function (lv, i) {
      var card = document.getElementById("level-" + lv.id);
      if (!card) return;
      var c = countsArr[i];
      var st = logic.levelStatus(c);
      var statusEl = card.querySelector("[data-status]");
      var countEl = card.querySelector("[data-count]");
      var barEl = card.querySelector("[data-bar]");
      if (countEl) countEl.textContent = c;
      if (barEl) barEl.style.width = (c / 20 * 100) + "%";
      if (statusEl) {
        statusEl.textContent = c === 0 ? "未勾选" : st === "pass" ? "通过" : st === "edge" ? "边缘" : "未过";
        statusEl.className = "level-status" +
          (c === 0 ? "" : st === "pass" ? " is-pass" : st === "edge" ? " is-edge" : " is-fail");
      }
    });

    // 实时面板
    if (els.liveTotal) els.liveTotal.textContent = result.total;
    if (els.ringFg) {
      els.ringFg.style.strokeDasharray = CIRC;
      els.ringFg.style.strokeDashoffset = CIRC * (1 - Math.min(100, result.total) / 100);
    }
    if (els.liveLevel) {
      els.liveLevel.textContent = result.total === 0 ? "尚未开始" : result.label;
    }
    if (els.liveEstimate) {
      els.liveEstimate.textContent = result.total === 0
        ? "勾选后实时显示估算词汇量"
        : "约 " + result.estimate + " 词 · 区间 " + result.rangeText;
    }
    levels.forEach(function (lv, i) {
      var lb = document.querySelector('[data-llbar="' + lv.id + '"]');
      var lc = document.querySelector('[data-llcount="' + lv.id + '"]');
      if (lb) lb.style.width = (countsArr[i] / 20 * 100) + "%";
      if (lc) lc.textContent = countsArr[i] + "/20";
    });

    // 结果区
    renderResult(result);

    // 移动端底部条
    if (els.miniCount) els.miniCount.textContent = result.total;
    if (els.miniLevel) els.miniLevel.textContent = result.total === 0 ? "尚未开始" : result.label;
  }

  /* ------------------------------ 复制 / 保存 ------------------------------ */
  function buildResultText() {
    var r = state.result;
    if (!r || r.total <= 0) return "";
    var who = [state.profile.name, state.profile.cls].filter(Boolean).join(" / ") || "未填写";
    return [
      "【初中英语词汇量快速定级测试单】",
      "姓名/班级：" + who,
      "勾选总数：" + r.total + " / 100",
      "定级：" + r.label,
      "估算词汇量：约 " + r.estimate + " 词（区间 " + r.rangeText + "）",
      "用时：" + fmtTime(state.elapsed) + "（" + timeNote(state.elapsed) + "）",
      "止于级别：" + (r.code === "below" ? "第 1 级" : r.code === "perfect" ? "五级全过" : "第 " + (r.highest + 1) + " 级"),
      "建议回补：" + r.recommend,
      "快速粗估（×24）：约 " + r.quick + " 词",
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

  function saveResult() {
    var r = state.result;
    if (!r || r.total <= 0) { toast("先勾选单词再保存结果"); return; }
    state.history.push({
      ts: Date.now(),
      name: state.profile.name,
      cls: state.profile.cls,
      elapsed: state.elapsed,
      total: r.total,
      label: r.label,
      estimate: r.estimate,
      counts: counts()
    });
    if (state.history.length > 24) state.history = state.history.slice(-24);
    saveState();
    renderHistory();
    toast("已保存本次记录（共 " + state.history.length + " 次）");
  }

  /* ------------------------------ 重置 ------------------------------ */
  function resetAll() {
    if (state.result && state.result.total > 0) {
      if (!window.confirm("确定清空本次勾选与计时吗？已保存的复测记录会保留。")) return;
    }
    state.checked = {};
    state.startedAt = null;
    state.elapsed = 0;
    state.spot = null;
    state.spotSig = "";
    stopTimer();
    updateTimer();
    $$(".word").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
    saveState();
    update();
    toast("已清空本次勾选");
  }

  /* ------------------------------ 答案显示 ------------------------------ */
  function toggleAnswers() {
    var on = document.body.classList.toggle("show-answers");
    var btn = els.btnAnswerToggle;
    if (btn) {
      btn.setAttribute("aria-expanded", on ? "true" : "false");
      btn.textContent = on ? "隐藏答案" : "显示答案";
    }
    toast(on ? "已在屏幕上显示词性与释义（打印时不会显示）" : "已隐藏答案");
  }

  /* ------------------------------ 绑定事件 ------------------------------ */
  function bindEvents() {
    if (els.btnReset) els.btnReset.addEventListener("click", resetAll);
    if (els.btnClear) els.btnClear.addEventListener("click", resetAll);
    if (els.btnPrint) els.btnPrint.addEventListener("click", function () { window.print(); });
    if (els.btnPrint2) els.btnPrint2.addEventListener("click", function () { window.print(); });
    if (els.btnPrintResult) els.btnPrintResult.addEventListener("click", function () { window.print(); });
    if (els.btnSaveResult) els.btnSaveResult.addEventListener("click", saveResult);
    if (els.btnCopyResult) {
      els.btnCopyResult.addEventListener("click", function () {
        var text = buildResultText();
        if (!text) { toast("先勾选单词再复制结果"); return; }
        copyText(text).then(function (ok) {
          toast(ok ? "结果已复制到剪贴板" : "复制失败，请手动选择文本");
        });
      });
    }
    if (els.btnSpotRefresh) {
      els.btnSpotRefresh.addEventListener("click", function () {
        state.spot = null;
        state.spotSig = "";
        if (state.result) renderSpot(state.result);
        toast("已换一组抽查词");
      });
    }
    if (els.btnAnswerToggle) els.btnAnswerToggle.addEventListener("click", toggleAnswers);

    if (els.inpName) {
      els.inpName.addEventListener("input", function () {
        state.profile.name = els.inpName.value.slice(0, 24);
        saveState();
      });
    }
    if (els.inpClass) {
      els.inpClass.addEventListener("input", function () {
        state.profile.cls = els.inpClass.value.slice(0, 24);
        saveState();
      });
    }

    window.addEventListener("pagehide", saveState);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) saveState();
    });
  }

  /* ------------------------------ 初始化 ------------------------------ */
  function init() {
    els = {
      levels: $("#levels"),
      heroLadder: $("#heroLadder"),
      timer: $("#timer"),
      timerText: $("#timerText"),
      outTimer2: $("#outTimer2"),
      outDate: $("#outDate"),
      globalCount: $("#globalCount"),
      globalBar: $("#globalBar"),
      liveTotal: $("#liveTotal"),
      ringFg: $("#ringFg"),
      liveLevel: $("#liveLevel"),
      liveEstimate: $("#liveEstimate"),
      liveLevels: $("#liveLevels"),
      miniCount: $("#miniCount"),
      miniLevel: $("#miniLevel"),
      resultEmpty: $("#resultEmpty"),
      resultBody: $("#resultBody"),
      resLevel: $("#resLevel"),
      resSub: $("#resSub"),
      resBadge: $("#resBadge"),
      resEstimate: $("#resEstimate"),
      resRange: $("#resRange"),
      resTotal: $("#resTotal"),
      resQuick: $("#resQuick"),
      resTime: $("#resTime"),
      resTimeNote: $("#resTimeNote"),
      resRecommend: $("#resRecommend"),
      resStop: $("#resStop"),
      resAdvice: $("#resAdvice"),
      resGoal: $("#resGoal"),
      distGrid: $("#distGrid"),
      distLegend: $("#distLegend"),
      ruler: $("#ruler"),
      rulerNote: $("#rulerNote"),
      spotList: $("#spotList"),
      spotPanel: $("#spotPanel"),
      btnSpotRefresh: $("#btnSpotRefresh"),
      levelTable: $("#levelTable"),
      rangeTable: $("#rangeTable"),
      answerTables: $("#answerTables"),
      historyTable: $("#historyTable"),
      historyEmpty: $("#historyEmpty"),
      btnSaveResult: $("#btnSaveResult"),
      btnCopyResult: $("#btnCopyResult"),
      btnPrintResult: $("#btnPrintResult"),
      btnPrint: $("#btnPrint"),
      btnPrint2: $("#btnPrint2"),
      btnReset: $("#btnReset"),
      btnClear: $("#btnClear"),
      btnAnswerToggle: $("#btnAnswerToggle"),
      inpName: $("#inpName"),
      inpClass: $("#inpClass"),
      toast: $("#toast")
    };

    loadState();

    renderHeroLadder();
    renderLevels();
    renderLiveLevels();
    renderAnswerBlocks();
    renderRangeTable();
    bindEvents();

    if (els.inpName) els.inpName.value = state.profile.name || "";
    if (els.inpClass) els.inpClass.value = state.profile.cls || "";
    if (els.outDate) els.outDate.textContent = todayText();

    // 恢复勾选
    levels.forEach(function (lv) {
      listOf(lv.id).forEach(function (n) {
        var btn = btnMap[lv.id + "-" + n];
        if (btn) btn.setAttribute("aria-pressed", "true");
      });
    });

    // 续接计时
    if (state.startedAt) {
      state.timerId = setInterval(function () {
        state.elapsed = Date.now() - state.startedAt;
        updateTimer();
      }, 500);
      updateTimer();
    }

    renderHistory();
    update();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
