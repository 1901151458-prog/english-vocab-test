/* 词汇测试 · 深色 / 浅色背景切换 */
(function () {
  var KEY = 'dsh-theme';
  var OLD = 'vocab-test-theme';
  var html = document.documentElement;
  var saved = 'dark';
  try { saved = localStorage.getItem(KEY) || localStorage.getItem(OLD) || 'dark'; } catch (e) {}
  if (saved !== 'light' && saved !== 'dark') saved = 'dark';
  html.setAttribute('data-theme', saved);
  html.style.colorScheme = saved === 'dark' ? 'dark' : 'light';

  function update(btn) {
    if (!btn) return;
    var dark = html.getAttribute('data-theme') === 'dark';
    btn.textContent = dark ? '☀ 浅色' : '☾ 深色';
    btn.setAttribute('aria-label', dark ? '切换到浅色背景' : '切换到深色背景');
    btn.setAttribute('title', dark ? '切换到浅色背景' : '切换到深色背景');
    btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
  }

  function set(theme) {
    html.setAttribute('data-theme', theme);
    html.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
    try { localStorage.setItem(KEY, theme); try { localStorage.setItem(OLD, theme); } catch (e) {} } catch (e) {}
    document.querySelectorAll('.theme-toggle').forEach(update);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b1620' : '#134B70');
  }

  function inject() {
    var actions = document.querySelector('.header-actions');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-ghost btn-sm theme-toggle';
    btn.addEventListener('click', function () {
      set(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
    if (actions) actions.appendChild(btn);
    else document.body.appendChild(btn);
    update(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
