/* Shared behaviour for every page. Loaded with `defer`. */

// ---- Mobile menu ----
(function () {
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ---- Nav shadow on scroll ----
(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;
  var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ---- Scroll reveal ----
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.reveal, .reveal-group');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (el) { io.observe(el); });
})();

// ---- Fingerprint "decode" effect (home page, runs once) ----
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var el = document.querySelector('[data-decode]');
  if (!el || reduce) return;
  var finalText = el.textContent;
  var glyphs = '0123456789ABCDEF';
  var frame = 0, total = 26;
  var t = setInterval(function () {
    frame++;
    var revealed = Math.floor((frame / total) * finalText.length);
    var out = '';
    for (var i = 0; i < finalText.length; i++) {
      var c = finalText[i];
      if (c === ' ') { out += ' '; continue; }
      out += i < revealed ? c : glyphs[Math.floor(Math.random() * glyphs.length)];
    }
    el.textContent = out;
    if (frame >= total) { clearInterval(t); el.textContent = finalText; }
  }, 34);
})();
