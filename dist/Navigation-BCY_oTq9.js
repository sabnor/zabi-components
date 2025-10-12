import { j as d, i as F, f as u, k as g, a as N, t as j, e as D, b, p as G, c as H, d as a, l as n, g as s, m as ta, n as p, o as I, s as sa, q as va, r as ra, h as ia, u as C, v as na } from "./props-D1U_TNgY.js";
import { createEventDispatcher as J } from "svelte";
import { T as A } from "./ThemeToggle-Dgb0rEn7.js";
var da = u('<div class="mt-2"><!></div>'), la = u('<div class="md:hidden"><div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200"><!> <div class="pt-4"><!> <!></div></div></div>'), oa = u('<nav><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex-shrink-0"><button type="button" class="text-xl font-bold text-gray-900"> </button></div> <div class="hidden md:block"><div class="ml-10 flex items-baseline space-x-4"><!></div></div> <div class="hidden md:block"><div class="ml-4 flex items-center space-x-4"><!> <!></div></div> <div class="md:hidden"><button type="button" class="text-gray-500 hover:text-gray-600" aria-label="Toggle menu"><span class="text-2xl">☰</span></button></div></div> <!></div></nav>');
function ha(y, e) {
  H(e, !1);
  let f = d(e, "brand", 8, ""), x = d(e, "showThemeToggle", 8, !0), h = d(e, "className", 8, "");
  const k = J();
  let l = ta(!1);
  function o() {
    sa(l, !s(l));
  }
  function _() {
    k("brandClick");
  }
  F();
  var v = oa(), t = a(v), c = a(t), r = a(c), m = a(r), T = a(m), M = n(r, 2), K = a(M), L = a(K);
  g(L, e, "nav", {});
  var P = n(M, 2), Q = a(P), q = a(Q);
  g(q, e, "actions", {});
  var R = n(q, 2);
  {
    var S = (i) => {
      A(i, {});
    };
    N(R, (i) => {
      x() && i(S);
    });
  }
  var U = n(P, 2), V = a(U), W = n(c, 2);
  {
    var X = (i) => {
      var z = la(), Y = a(z), B = a(Y);
      g(B, e, "nav", {});
      var Z = n(B, 2), E = a(Z);
      g(E, e, "actions", {});
      var $ = n(E, 2);
      {
        var aa = (w) => {
          var O = da(), ea = a(O);
          A(ea, {}), b(w, O);
        };
        N($, (w) => {
          x() && w(aa);
        });
      }
      b(i, z);
    };
    N(W, (i) => {
      s(l) && i(X);
    });
  }
  j(() => {
    p(v, 1, `bg-white border-b border-gray-200 sticky top-0 z-50 ${h() ?? ""}`), I(T, f());
  }), D("click", m, _), D("click", V, o), b(y, v), G();
}
var ca = u("<li><a> </a></li>"), ba = u("<nav><ul></ul></nav>");
function _a(y, e) {
  H(e, !1);
  let f = d(e, "variant", 8, "header"), x = d(e, "items", 24, () => []), h = d(e, "currentPath", 8, "");
  const k = J();
  function l(v, t) {
    t.preventDefault(), k("navigate", { item: v, href: v.href });
  }
  F();
  var o = ba(), _ = a(o);
  va(_, 5, x, ra, (v, t) => {
    var c = ca(), r = a(c), m = a(r);
    j(() => {
      ia(r, "href", (s(t), C(() => s(t).href))), p(r, 1, `px-3 py-2 text-sm font-medium rounded-md transition-colors ${na(h()), s(t), C(() => h() === s(t).href ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100") ?? ""}`), I(m, (s(t), C(() => s(t).label)));
    }), D("click", r, (T) => l(s(t), T)), b(v, c);
  }), j(() => {
    p(o, 1, `navigation navigation-${f() ?? ""}`), p(_, 1, `flex ${f() === "sidebar" ? "flex-col space-y-2" : "space-x-6"}`);
  }), b(y, o), G();
}
export {
  ha as N,
  _a as a
};
