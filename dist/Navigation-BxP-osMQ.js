import { l as p, p as l, f as u, a as G, s as f, b as P, t as z, e as j, c as b, h as a, j as i, k as s, m as ea, n as H, o as ta, q as sa, r as ra, u as E, v as va, w as $, x as ia } from "./props-B4BdFk2B.js";
import { T as F } from "./ThemeToggle-Cm25ThjX.js";
var na = u('<div class="mt-2"><!></div>'), la = u('<div class="md:hidden"><div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200"><!> <div class="pt-4"><!> <!></div></div></div>'), da = u('<nav><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex-shrink-0"><button type="button" class="text-xl font-bold text-gray-900"> </button></div> <div class="hidden md:block"><div class="ml-10 flex items-baseline space-x-4"><!></div></div> <div class="hidden md:block"><div class="ml-4 flex items-center space-x-4"><!> <!></div></div> <div class="md:hidden"><button type="button" class="text-gray-500 hover:text-gray-600" aria-label="Toggle menu"><span class="text-2xl">☰</span></button></div></div> <!></div></nav>');
function _a(y, e) {
  const k = p(e, ["children", "$$slots", "$$events", "$$legacy"]), T = p(k, ["brand", "showThemeToggle", "className"]);
  let _ = l(e, "brand", 8, ""), x = l(e, "showThemeToggle", 8, !0), m = l(e, "className", 8, ""), d = ea(!1);
  function o() {
    ta(d, !s(d));
  }
  function g() {
  }
  var n = da();
  G(n, () => ({
    class: `bg-white border-b border-gray-200 sticky top-0 z-50 ${m() ?? ""}`,
    ...T
  }));
  var t = a(n), c = a(t), r = a(c), h = a(r), w = a(h), C = i(r, 2), I = a(C), J = a(I);
  f(J, e, "nav", {});
  var M = i(C, 2), K = a(M), q = a(K);
  f(q, e, "actions", {});
  var L = i(q, 2);
  {
    var Q = (v) => {
      F(v, {});
    };
    P(L, (v) => {
      x() && v(Q);
    });
  }
  var R = i(M, 2), S = a(R), U = i(c, 2);
  {
    var V = (v) => {
      var B = la(), W = a(B), D = a(W);
      f(D, e, "nav", {});
      var X = i(D, 2), O = a(X);
      f(O, e, "actions", {});
      var Y = i(O, 2);
      {
        var Z = (N) => {
          var A = na(), aa = a(A);
          F(aa, {}), b(N, A);
        };
        P(Y, (N) => {
          x() && N(Z);
        });
      }
      b(v, B);
    };
    P(U, (v) => {
      s(d) && v(V);
    });
  }
  z(() => H(w, _())), j("click", h, g), j("click", S, o), b(y, n);
}
var oa = u("<li><a> </a></li>"), ca = u("<nav><ul></ul></nav>");
function xa(y, e) {
  const k = p(e, ["children", "$$slots", "$$events", "$$legacy"]), T = p(k, ["variant", "items", "currentPath"]);
  let _ = l(e, "variant", 8, "header"), x = l(e, "items", 24, () => []), m = l(e, "currentPath", 8, "");
  function d(n, t) {
    t.preventDefault();
  }
  var o = ca();
  G(o, () => ({
    class: `navigation navigation-${_() ?? ""}`,
    ...T
  }));
  var g = a(o);
  sa(g, 5, x, ra, (n, t) => {
    var c = oa(), r = a(c), h = a(r);
    z(() => {
      va(r, "href", (s(t), $(() => s(t).href))), E(r, 1, `px-3 py-2 text-sm font-medium rounded-md transition-colors ${ia(m()), s(t), $(() => m() === s(t).href ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100") ?? ""}`), H(h, (s(t), $(() => s(t).label)));
    }), j("click", r, (w) => d(s(t), w)), b(n, c);
  }), z(() => E(g, 1, `flex ${_() === "sidebar" ? "flex-col space-y-2" : "space-x-6"}`)), b(y, o);
}
export {
  _a as N,
  xa as a
};
