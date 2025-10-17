function n() {
  return typeof window < "u";
}
function r() {
  return n() ? window : void 0;
}
function i() {
  return n() ? document : void 0;
}
function u() {
  return n() ? localStorage : void 0;
}
function a() {
  return n() ? sessionStorage : void 0;
}
function s(e) {
  return n() ? requestAnimationFrame(e) : void 0;
}
function f(e, t) {
  return n() ? setTimeout(e, t) : void 0;
}
function c(e) {
  n() && e && clearTimeout(e);
}
function d(e, t) {
  return n() ? setInterval(e, t) : void 0;
}
function l(e) {
  n() && e && clearInterval(e);
}
let o = 0;
function m(e = "id") {
  return n() ? `${e}-${Math.random().toString(36).substr(2, 9)}` : `${e}-ssr-${++o}`;
}
export {
  m as generateId,
  n as isBrowser,
  l as safeClearInterval,
  c as safeClearTimeout,
  i as safeDocument,
  u as safeLocalStorage,
  s as safeRequestAnimationFrame,
  a as safeSessionStorage,
  d as safeSetInterval,
  f as safeSetTimeout,
  r as safeWindow
};
