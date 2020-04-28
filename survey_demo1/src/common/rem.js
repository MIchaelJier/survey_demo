!(function(n) {
  const e = n.document;
  const t = e.documentElement;
  const i = 720;
  const d = i / 100;
  const o = 'orientationchange' in n ? 'orientationchange' : 'resize';
  const a = function() {
    let width = t.clientWidth || 320;
    width > 720 && (width = 720);
    t.style.fontSize = width / d + 'px';
    console.log('rem.js生效');
  };
  e.addEventListener &&
    (n.addEventListener(o, a, !1),
    e.addEventListener('DOMContentLoaded', a, !1));
})(window);
