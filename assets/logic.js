/* =============================================================================
 * 初中英语词汇量快速定级测试单 · 纯逻辑（选择题版，无 DOM，可在 Node 中测试）
 * ---------------------------------------------------------------------------
 * 题型：每题 3 个中文释义选项（A/B/C，下标 0–2）＋ 选项 D「以上都不正确」（下标 3）
 *       ans = 0/1/2 → 正确选项为对应释义；ans = -1 → 正确答案为 D
 * 判分：选对 1 分；选错 / 未答 0 分（答错不倒扣）
 * ========================================================================== */
(function (root) {
  "use strict";

  var PASS = 16;
  var EDGE = 12;
  var NONE_INDEX = 3;

  /** 正确答案下标（0–3） */
  function answerOf(item) {
    return item.ans === -1 ? NONE_INDEX : item.ans;
  }

  /** 单题判分：correct / wrong / blank */
  function grade(item, choice) {
    if (choice === undefined || choice === null) return "blank";
    return choice === answerOf(item) ? "correct" : "wrong";
  }

  /** 单级状态：pass / edge / fail / empty */
  function levelStatus(count) {
    if (count >= PASS) return "pass";
    if (count >= EDGE) return "edge";
    if (count > 0) return "fail";
    return "empty";
  }

  function roundInt(n) {
    return Math.round(n);
  }

  /** 通过级的词汇量区间（该级 16–20 分） */
  function rangeForPass(level, nextLevel) {
    return [level.cum, roundInt(level.cum + (11 / 20) * nextLevel.inc)];
  }

  /** 边缘级的词汇量区间（该级 12–15 分） */
  function rangeForEdge(level, nextLevel) {
    return [roundInt(level.cum + (12 / 20) * nextLevel.inc), roundInt(level.cum + 0.75 * nextLevel.inc)];
  }

  /** 把题库拍平成 100 题（带级别信息与全局序号） */
  function flatten(data) {
    var out = [];
    data.levels.forEach(function (lv) {
      lv.words.forEach(function (w) {
        out.push({
          g: out.length,
          levelId: lv.id,
          levelIndex: data.levels.indexOf(lv),
          levelName: lv.name,
          color: lv.color,
          n: w.n,
          w: w.w,
          pos: w.pos,
          meaning: w.meaning,
          opts: w.opts,
          ans: w.ans,
          trap: w.ans === -1
        });
      });
    });
    return out;
  }

  /** 定级与词汇量估算（counts = 每级答对数） */
  function evaluate(counts, data) {
    var levels = data.levels;
    var total = counts.reduce(function (a, b) { return a + b; }, 0);

    var highest = 0;
    for (var i = 0; i < levels.length; i++) {
      if (counts[i] >= PASS) highest = i + 1;
      else break;
    }

    var perLevel = levels.map(function (lv, idx) {
      return {
        id: lv.id,
        count: counts[idx],
        status: levelStatus(counts[idx]),
        passed: counts[idx] >= PASS
      };
    });

    var result = { total: total, counts: counts.slice(), highest: highest, perLevel: perLevel };

    if (highest === 0) {
      result.code = "below";
      result.label = "未达 Level 1";
      result.levelIndex = 0;
      result.k = 1;
      result.stop = "第 1 级";
      result.recommend = "Level 1 起步级";
      result.estimate = roundInt((counts[0] / 20) * levels[0].inc);
      result.range = [0, roundInt(0.75 * levels[0].inc)];
    } else if (highest === levels.length) {
      var top = levels[levels.length - 1];
      result.code = "perfect";
      result.label = "Level 5 " + top.name;
      result.levelIndex = 5;
      result.k = 5;
      result.stop = "五级全过";
      result.recommend = "保持 Level 5，向高中衔接拓展";
      result.estimate = roundInt(top.cum - top.inc + (counts[4] / 20) * top.inc);
      result.range = [roundInt(top.cum - 0.2 * top.inc), top.cum];
    } else {
      var nextIdx = highest;
      var next = levels[nextIdx];
      var prev = levels[highest - 1];
      var nextCount = counts[nextIdx];

      result.levelIndex = highest;
      result.k = highest + 1;
      result.stop = "第 " + (highest + 1) + " 级";
      result.recommend = "Level " + (highest + 1) + " " + next.name;
      result.estimate = roundInt(prev.cum + (nextCount / 20) * next.inc);

      if (nextCount >= EDGE && nextCount <= 15) {
        result.code = "edge";
        result.label = "Level " + highest + " 边缘";
        result.range = rangeForEdge(prev, next);
      } else {
        result.code = "pass";
        result.label = "Level " + highest + " " + prev.name;
        result.range = rangeForPass(prev, next);
      }
    }

    result.rangeText = result.range[0] + "–" + result.range[1] + " 词";
    result.estimateText = "约 " + result.estimate + " 词";
    return result;
  }

  /** 整卷判分：answers = { 全局题号: 0–3 } */
  function score(answers, data) {
    var items = flatten(data);
    var perLevel = data.levels.map(function (lv) {
      return {
        id: lv.id,
        name: lv.name,
        color: lv.color,
        total: lv.words.length,
        correct: 0,
        wrong: 0,
        blank: 0
      };
    });

    var details = items.map(function (item, i) {
      var has = Object.prototype.hasOwnProperty.call(answers, i);
      var choice = has ? answers[i] : null;
      var st = grade(item, choice);
      perLevel[item.levelIndex][st] += 1;
      return {
        g: i,
        levelId: item.levelId,
        levelIndex: item.levelIndex,
        levelName: item.levelName,
        color: item.color,
        n: item.n,
        w: item.w,
        pos: item.pos,
        meaning: item.meaning,
        opts: item.opts,
        ans: item.ans,
        answer: answerOf(item),
        trap: item.trap,
        choice: choice,
        state: st
      };
    });

    var total = { correct: 0, wrong: 0, blank: 0, answered: 0, total: items.length };
    perLevel.forEach(function (p) {
      total.correct += p.correct;
      total.wrong += p.wrong;
      total.blank += p.blank;
    });
    total.answered = total.correct + total.wrong;

    var counts = perLevel.map(function (p) { return p.correct; });
    var result = evaluate(counts, data);

    var trapTotal = 0, trapCorrect = 0;
    details.forEach(function (d) {
      if (d.trap) {
        trapTotal++;
        if (d.state === "correct") trapCorrect++;
      }
    });

    return {
      items: items,
      details: details,
      perLevel: perLevel,
      counts: counts,
      total: total,
      trap: { total: trapTotal, correct: trapCorrect },
      result: result,
      accuracy: total.answered ? total.correct / total.answered : 0
    };
  }

  /** 速查表：定级结果 → 估算词汇量区间 */
  function rangeTable(data) {
    var levels = data.levels;
    var rows = [];
    rows.push({
      label: "未达 Level 1",
      case: "L1 答对 0–15 题（含 L1 边缘）",
      range: [0, roundInt(0.75 * levels[0].inc)]
    });
    for (var i = 0; i < levels.length; i++) {
      var lv = levels[i];
      var isTop = i === levels.length - 1;
      if (isTop) {
        rows.push({
          label: "Level " + lv.id + " " + lv.name,
          case: "五级全部通过（L5 答对 16–20 题）",
          range: [roundInt(lv.cum - 0.2 * lv.inc), lv.cum]
        });
      } else {
        rows.push({
          label: "Level " + lv.id + " " + lv.name,
          case: "L" + lv.id + " 通过，L" + (lv.id + 1) + " 答对 0–11 题",
          range: rangeForPass(lv, levels[i + 1])
        });
        rows.push({
          label: "Level " + lv.id + " 边缘",
          case: "L" + lv.id + " 通过，L" + (lv.id + 1) + " 答对 12–15 题",
          range: rangeForEdge(lv, levels[i + 1])
        });
      }
    }
    return rows;
  }

  var api = {
    PASS: PASS,
    EDGE: EDGE,
    NONE_INDEX: NONE_INDEX,
    answerOf: answerOf,
    grade: grade,
    levelStatus: levelStatus,
    flatten: flatten,
    evaluate: evaluate,
    score: score,
    rangeTable: rangeTable,
    rangeForPass: rangeForPass,
    rangeForEdge: rangeForEdge
  };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.VT_LOGIC = api;
})(typeof window !== "undefined" ? window : globalThis);
