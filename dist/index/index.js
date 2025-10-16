import { T as V } from "../Toggle-jyTNoVKS.js";
function s(e) {
  const r = {
    default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
    success: "border-green-300 focus:border-green-500 focus:ring-green-500",
    warning: "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500",
    error: "border-red-300 focus:border-red-500 focus:ring-red-500",
    info: "border-blue-300 focus:border-blue-500 focus:ring-blue-500"
  };
  return r[e] || r.default;
}
function i(e) {
  const r = {
    default: "border-gray-200 bg-white",
    success: "border-green-200 bg-green-50",
    warning: "border-yellow-200 bg-yellow-50",
    error: "border-red-200 bg-red-50",
    info: "border-blue-200 bg-blue-50"
  };
  return r[e] || r.default;
}
function u(e, r) {
  var o;
  const n = {
    default: {
      border: "border-gray-300",
      text: "text-gray-900",
      bg: "bg-white"
    },
    success: {
      border: "border-green-300",
      text: "text-green-900",
      bg: "bg-green-50"
    },
    warning: {
      border: "border-yellow-300",
      text: "text-yellow-900",
      bg: "bg-yellow-50"
    },
    error: {
      border: "border-red-300",
      text: "text-red-900",
      bg: "bg-red-50"
    },
    info: {
      border: "border-blue-300",
      text: "text-blue-900",
      bg: "bg-blue-50"
    }
  };
  return ((o = n[e]) == null ? void 0 : o[r]) || n.default[r];
}
function d(e) {
  return {
    border: u(e, "border"),
    text: u(e, "text"),
    bg: u(e, "bg")
  };
}
function l(e, r) {
  return e.reduce((n, o) => (n[o] = `${r}-${o}`, n), {});
}
function t() {
  return typeof window < "u";
}
function b() {
  return t() ? window : void 0;
}
function f() {
  return t() ? document : void 0;
}
function g() {
  return t() ? localStorage : void 0;
}
function c() {
  return t() ? sessionStorage : void 0;
}
function w(e) {
  return t() ? requestAnimationFrame(e) : void 0;
}
function m(e, r) {
  return t() ? setTimeout(e, r) : void 0;
}
function x(e) {
  t() && e && clearTimeout(e);
}
function y(e, r) {
  return t() ? setInterval(e, r) : void 0;
}
function v(e) {
  t() && e && clearInterval(e);
}
let a = 0;
function $(e = "id") {
  return t() ? `${e}-${Math.random().toString(36).substr(2, 9)}` : `${e}-ssr-${++a}`;
}
const C = (e = "id") => typeof window < "u" ? `${e}-${Math.random().toString(36).substr(2, 9)}` : `${e}-ssr-${Date.now()}`, S = (...e) => e.filter(Boolean).join(" "), I = (e) => {
  const r = new FormData(e);
  return Object.fromEntries(r.entries());
}, p = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e), M = (e) => e != null && e !== "";
export {
  V as Toggle,
  S as cn,
  C as createId,
  l as createVariantClassMap,
  $ as generateId,
  d as getAllVariantClasses,
  i as getCardVariantClasses,
  I as getFormData,
  s as getInputVariantClasses,
  u as getVariantClasses,
  t as isBrowser,
  v as safeClearInterval,
  x as safeClearTimeout,
  f as safeDocument,
  g as safeLocalStorage,
  w as safeRequestAnimationFrame,
  c as safeSessionStorage,
  y as safeSetInterval,
  m as safeSetTimeout,
  b as safeWindow,
  p as validateEmail,
  M as validateRequired
};
