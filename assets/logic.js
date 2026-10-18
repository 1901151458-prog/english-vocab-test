/* =============================================================================
 * 初中英语词汇量快速定级测试单 · 纯逻辑（无 DOM，可在 Node 中直接测试）
 * ========================================================================== */
(function (root) {
  "use strict";

  var PASS = 16;
  var EDGE = 12;

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

  /** 「Level k」词汇量区间：通过 k 级，停在 k+1 级且只勾 0–11 个 */
  function rangeForPass(level, nextLevel) {
    return [level.cum, roundInt(level.cum + (11 / 20) * nextLevel.inc)];
  }

  /** 「Level k 边缘」词汇量区间：通过 k 级，k+1 级勾 12–15 个 */
  function rangeForEdge(level, nextLevel) {
    return [roundInt(level.cum + (12 / 20) * nextLevel.inc), roundInt(level.cum + 0.75 * nextLevel.inc)];
  }

  /**
   * 核心定级计算。
   * counts: [L1..L5] 各级勾选数
   * data:   VT_DATA
   */
  function evaluate(counts, data) {
    var levels = data.levels;
    var total = counts.reduce(function (a, b) { return a + b; }, 0);

    // 连续通过的最高级（1–5；0 = 未达 Level 1）
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

    var result = {
      total: total,
      counts: counts.slice(),
      highest: highest,
      perLevel: perLevel,
      quick: Math.round(total * 24)
    };

    if (highest === 0) {
      // 未达 Level 1：按 L1 勾选数估算
      result.code = "below";
      result.label = "未达 Level 1";
      result.shortLabel = "未达 L1";
      result.levelIndex = 0;
      result.k = 1;
      result.stop = "第 1 级";
      result.recommend = "Level 1 起步级";
      result.estimate = roundInt((counts[0] / 20) * levels[0].inc);
      result.range = [0, roundInt(0.75 * levels[0].inc)];
      result.adviceLevel = 0;
    } else if (highest === levels.length) {
      // 五级全过
      var top = levels[levels.length - 1];
      result.code = "perfect";
      result.label = "Level 5 " + top.name;
      result.shortLabel = "Level 5";
      result.levelIndex = 5;
      result.k = 5;
      result.stop = "五级全过";
      result.recommend = "保持 Level 5，向高中衔接拓展";
      result.estimate = roundInt(top.cum - top.inc + (counts[4] / 20) * top.inc);
      result.range = [roundInt(top.cum - 0.2 * top.inc), top.cum];
      result.adviceLevel = 5;
    } else {
      // 通过 highest 级，停在下一级
      var nextIdx = highest; // 0-based index of the first non-passed level
      var next = levels[nextIdx];
      var prev = levels[highest - 1];
      var nextCount = counts[nextIdx];

      result.levelIndex = highest;
      result.k = highest + 1;
      result.stop = "第 " + (highest + 1) + " 级";
      result.recommend = "Level " + (highest + 1) + " " + next.name;
      result.estimate = roundInt(prev.cum + (nextCount / 20) * next.inc);
      result.adviceLevel = highest;

      if (nextCount >= EDGE && nextCount <= 15) {
        result.code = "edge";
        result.label = "Level " + highest + " 边缘";
        result.shortLabel = "Level " + highest + " 边缘";
        result.range = rangeForEdge(prev, next);
      } else {
        result.code = "pass";
        result.label = "Level " + highest + " " + prev.name;
        result.shortLabel = "Level " + highest;
        result.range = rangeForPass(prev, next);
      }
    }

    result.rangeText = result.range[0] + "–" + result.range[1] + " 词";
    result.estimateText = "约 " + result.estimate + " 词";
    return result;
  }

  /** 速查表：定级结果 → 估算词汇量区间（与 PDF 版一致） */
  function rangeTable(data) {
    var levels = data.levels;
    var rows = [];
    rows.push({
      label: "未达 Level 1",
      case: "L1 勾选 0–15 个（含 L1 边缘）",
      range: [0, roundInt(0.75 * levels[0].inc)]
    });
    for (var i = 0; i < levels.length; i++) {
      var lv = levels[i];
      var isTop = i === levels.length - 1;
      if (isTop) {
        rows.push({
          label: "Level " + lv.id + " " + lv.name,
          case: "五级全部通过（L5 勾选 16–20 个）",
          range: [roundInt(lv.cum - 0.2 * lv.inc), lv.cum]
        });
      } else {
        rows.push({
          label: "Level " + lv.id + " " + lv.name,
          case: "L" + lv.id + " 通过，L" + (lv.id + 1) + " 勾选 0–11 个",
          range: rangeForPass(lv, levels[i + 1])
        });
        rows.push({
          label: "Level " + lv.id + " 边缘",
          case: "L" + lv.id + " 通过，L" + (lv.id + 1) + " 勾选 12–15 个",
          range: rangeForEdge(lv, levels[i + 1])
        });
      }
    }
    return rows;
  }

  /** 抽查：每级随机取 n 个已勾词（不足 n 个则全取） */
  function pickSpotCheck(checkedByLevel, levels, n, rng) {
    var rand = rng || Math.random;
    var out = [];
    levels.forEach(function (lv, idx) {
      var list = checkedByLevel[idx] || [];
      if (!list.length) return;
      var pool = list.slice();
      var picked = [];
      while (picked.length < Math.min(n, pool.length)) {
        var j = Math.floor(rand() * pool.length);
        picked.push(pool.splice(j, 1)[0]);
      }
      out.push({ levelId: lv.id, color: lv.color, name: lv.name, words: picked });
    });
    return out;
  }

  /** 分布图用：把勾选情况转成 5×20 布尔矩阵（接受编号或 {n} 对象） */
  function gridMatrix(checkedByLevel) {
    return checkedByLevel.map(function (list) {
      var row = new Array(20).fill(false);
      (list || []).forEach(function (item) {
        var n = typeof item === "number" ? item : item && item.n;
        if (n >= 1 && n <= 20) row[n - 1] = true;
      });
      return row;
    });
  }

  var api = {
    PASS: PASS,
    EDGE: EDGE,
    levelStatus: levelStatus,
    evaluate: evaluate,
    rangeTable: rangeTable,
    rangeForPass: rangeForPass,
    rangeForEdge: rangeForEdge,
    pickSpotCheck: pickSpotCheck,
    gridMatrix: gridMatrix
  };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.VT_LOGIC = api;
})(typeof window !== "undefined" ? window : globalThis);
