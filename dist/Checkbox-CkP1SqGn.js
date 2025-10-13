import { j as J, p as a, f as C, a as I, k as K, b as y, c as M, d as j, r as V, g as l, l as o, n as L, h as w, m as B, i as q, o as T, q as F, t as G, v as A, w as E, x as R } from "./props-wKhXfKGm.js";
function ee(t, e) {
  J(() => {
    var s = t.getRootNode(), r = (
      /** @type {ShadowRoot} */
      s.host ? (
        /** @type {ShadowRoot} */
        s
      ) : (
        /** @type {Document} */
        s.head ?? /** @type {Document} */
        s.ownerDocument.head
      )
    );
    if (!r.querySelector("#" + e.hash)) {
      const n = document.createElement("style");
      n.id = e.hash, n.textContent = e.code, r.appendChild(n);
    }
  });
}
var O = C("<button><!></button>");
function ae(t, e) {
  j(e, !0);
  let s = a(e, "variant", 3, "primary"), r = a(e, "size", 3, "md"), n = a(e, "disabled", 3, !1), x = a(e, "type", 3, "button"), g = a(e, "className", 3, ""), m = V(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "variant",
    "size",
    "disabled",
    "type",
    "className",
    "children"
  ]), h = o(() => ({
    sm: "px-3 py-1.5 text-sm font-medium",
    md: "px-4 py-2 text-sm font-medium",
    lg: "px-6 py-3 text-base font-semibold"
  })), v = o(() => ({
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400",
    success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:text-gray-400",
    brand: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400"
  })), u = o(() => [
    "inline-flex items-center justify-center rounded-md transition-all duration-200",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "active:scale-95 transform-gpu",
    "shadow-sm hover:shadow-md",
    l(h)[r()],
    l(v)[s()],
    g()
  ].filter(Boolean).join(" "));
  var c = O();
  I(c, () => ({
    type: x(),
    class: l(u),
    disabled: n(),
    ...m
  }));
  var p = w(c);
  K(p, () => e.children ?? L), y(t, c), M();
}
function H(t) {
  const e = {
    default: "input-variant-default",
    success: "input-variant-success",
    warning: "input-variant-warning",
    error: "input-variant-error",
    info: "input-variant-info"
  };
  return e[t] || e.default;
}
function te(t) {
  const e = {
    default: "card-variant-default",
    success: "card-variant-success",
    warning: "card-variant-warning",
    error: "card-variant-error",
    info: "card-variant-info"
  };
  return e[t] || e.default;
}
function S(t, e) {
  const s = {
    default: `variant-${e}-default`,
    success: `variant-${e}-success`,
    warning: `variant-${e}-warning`,
    error: `variant-${e}-error`,
    info: `variant-${e}-info`
  };
  return s[t] || s.default;
}
function se(t) {
  return {
    border: S(t, "border"),
    text: S(t, "text"),
    bg: S(t, "bg")
  };
}
function re(t, e) {
  return t.reduce((s, r) => (s[r] = `${e}-${r}`, s), {});
}
var Q = C("<label> </label>"), U = C("<div><!> <input/></div>");
function ne(t, e) {
  j(e, !0);
  let s = a(e, "value", 7, ""), r = a(e, "type", 3, "text"), n = a(e, "label", 3, ""), x = a(e, "placeholder", 3, ""), g = a(e, "disabled", 3, !1), m = a(e, "size", 3, "md"), h = a(e, "variant", 3, "default"), v = V(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "type",
    "label",
    "placeholder",
    "disabled",
    "size",
    "variant"
  ]), u = B(typeof window < "u" ? `input-${Math.random().toString(36).substr(2, 9)}` : `input-ssr-${Date.now()}`), c = o(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), p = o(() => H(h())), f = o(() => [
    "w-full rounded-md transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
    l(c)[m()],
    l(p)
  ].join(" ")), b = o(() => "block text-sm font-medium text-primary mb-1");
  function _(d) {
    const i = d.target;
    s(i.value);
  }
  var k = U(), z = w(k);
  {
    var D = (d) => {
      var i = Q();
      F(i, 1, G(l(b)));
      var P = w(i);
      A(() => {
        E(i, "for", u), R(P, n());
      }), y(d, i);
    };
    q(z, (d) => {
      n() && d(D);
    });
  }
  var N = T(z, 2);
  I(
    N,
    () => ({
      id: u,
      type: r(),
      value: s(),
      placeholder: x(),
      disabled: g(),
      class: l(f),
      oninput: _,
      ...v
    }),
    void 0,
    void 0,
    void 0,
    !0
  ), y(t, k), M();
}
var W = C("<label> </label>"), X = C("<div><!> <textarea></textarea></div>");
function ie(t, e) {
  j(e, !0);
  let s = a(e, "value", 7, ""), r = a(e, "label", 3, ""), n = a(e, "placeholder", 3, ""), x = a(e, "disabled", 3, !1), g = a(e, "rows", 3, 4), m = a(e, "size", 3, "md"), h = a(e, "variant", 3, "default"), v = V(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "label",
    "placeholder",
    "disabled",
    "rows",
    "size",
    "variant"
  ]), u = B(typeof window < "u" ? `textarea-${Math.random().toString(36).substr(2, 9)}` : `textarea-ssr-${Date.now()}`), c = o(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), p = o(() => H(h())), f = o(() => [
    "w-full rounded-md transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
    "resize-y",
    l(c)[m()],
    l(p)
  ].join(" ")), b = o(() => "block text-sm font-medium text-primary mb-1");
  function _(d) {
    const i = d.target;
    s(i.value);
  }
  var k = X(), z = w(k);
  {
    var D = (d) => {
      var i = W();
      F(i, 1, G(l(b)));
      var P = w(i);
      A(() => {
        E(i, "for", u), R(P, r());
      }), y(d, i);
    };
    q(z, (d) => {
      r() && d(D);
    });
  }
  var N = T(z, 2);
  I(N, () => ({
    id: u,
    value: s(),
    placeholder: n(),
    disabled: x(),
    rows: g(),
    class: l(f),
    oninput: _,
    ...v
  })), y(t, k), M();
}
var Y = C('<label class="text-sm font-medium cursor-pointer"> </label>'), Z = C('<div class="flex items-center gap-2"><input/> <!></div>');
function le(t, e) {
  j(e, !0);
  let s = a(e, "checked", 7, !1), r = a(e, "disabled", 3, !1), n = a(e, "label", 3, ""), x = V(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "checked",
    "disabled",
    "label"
  ]), g = B(typeof window < "u" ? `checkbox-${Math.random().toString(36).substr(2, 9)}` : `checkbox-ssr-${Date.now()}`), m = o(() => [
    "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded",
    "focus:ring-blue-500 focus:ring-2",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  ].join(" "));
  function h(f) {
    const b = f.target;
    s(b.checked);
  }
  var v = Z(), u = w(v);
  I(
    u,
    () => ({
      type: "checkbox",
      id: g,
      checked: s(),
      disabled: r(),
      class: l(m),
      onchange: h,
      ...x
    }),
    void 0,
    void 0,
    void 0,
    !0
  );
  var c = T(u, 2);
  {
    var p = (f) => {
      var b = Y(), _ = w(b);
      A(() => {
        E(b, "for", g), R(_, n());
      }), y(f, b);
    };
    q(c, (f) => {
      n() && f(p);
    });
  }
  y(t, v), M();
}
export {
  ae as B,
  le as C,
  ne as I,
  ie as T,
  te as a,
  S as b,
  se as c,
  re as d,
  ee as e,
  H as g
};
