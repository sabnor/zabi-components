import { x as F, p as d, f as x, c as G, k as e, y as u, i as w, j as Z, z as N, d as b, A as r, s as $, g as o, r as M, B as y, C as q, D as aa, E as ea, F as A, G as ta } from "./ssr-safe-bsWGK4V4.js";
import { T as E } from "./ThemeToggle-BlNPkAQy.js";
function sa(v, a) {
  $(a, !o(a));
}
function ia() {
}
var ra = x('<div class="mt-2"><!></div>'), va = x('<div class="md:hidden"><div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200"><!> <div class="pt-4"><!> <!></div></div></div>'), la = x('<nav><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex-shrink-0"><button type="button" class="text-xl font-bold text-gray-900"> </button></div> <div class="hidden md:block"><div class="ml-10 flex items-baseline space-x-4"><!></div></div> <div class="hidden md:block"><div class="ml-4 flex items-center space-x-4"><!> <!></div></div> <div class="md:hidden"><button type="button" class="text-gray-500 hover:text-gray-600" aria-label="Toggle menu"><span class="text-2xl">☰</span></button></div></div> <!></div></nav>');
function ba(v, a) {
  let l = d(a, "brand", 3, ""), m = d(a, "showThemeToggle", 3, !0), p = d(a, "className", 3, ""), k = M(a, [
    "$$slots",
    "$$events",
    "$$legacy",
    "brand",
    "showThemeToggle",
    "className",
    "children",
    "nav",
    "actions"
  ]), g = Z(!1);
  var s = la();
  G(s, () => ({
    class: `bg-white border-b border-gray-200 sticky top-0 z-50 ${// Brand click is now handled by the parent component
    // through event forwarding
    p() ?? ""}`,
    ...k
  }));
  var f = e(s), c = e(f), t = e(c), _ = e(t);
  _.__click = [ia];
  var n = e(_), h = r(t, 2), H = e(h), I = e(H);
  u(I, () => a.nav ?? y);
  var P = r(h, 2), J = e(P), C = e(J);
  u(C, () => a.actions ?? y);
  var K = r(C, 2);
  {
    var L = (i) => {
      E(i, {});
    };
    w(K, (i) => {
      m() && i(L);
    });
  }
  var O = r(P, 2), Q = e(O);
  Q.__click = [sa, g];
  var R = r(c, 2);
  {
    var S = (i) => {
      var j = va(), U = e(j), z = e(U);
      u(z, () => a.nav ?? y);
      var V = r(z, 2), B = e(V);
      u(B, () => a.actions ?? y);
      var W = r(B, 2);
      {
        var X = (T) => {
          var D = ra(), Y = e(D);
          E(Y, {}), b(T, D);
        };
        w(W, (T) => {
          m() && T(X);
        });
      }
      b(i, j);
    };
    w(R, (i) => {
      o(g) && i(S);
    });
  }
  N(() => q(n, l())), b(v, s);
}
F(["click"]);
var na = (v, a, l) => a(o(l), v), da = x("<li><a> </a></li>"), oa = x("<nav><ul></ul></nav>");
function xa(v, a) {
  let l = d(a, "variant", 3, "header"), m = d(a, "items", 19, () => []), p = d(a, "currentPath", 3, ""), k = M(a, [
    "$$slots",
    "$$events",
    "$$legacy",
    "variant",
    "items",
    "currentPath",
    "children"
  ]);
  function g(c, t) {
    t.preventDefault();
  }
  var s = oa();
  G(s, () => ({
    class: `navigation navigation-${l() ?? ""}`,
    ...k
  }));
  var f = e(s);
  aa(f, 21, m, ea, (c, t) => {
    var _ = da(), n = e(_);
    n.__click = [na, g, t];
    var h = e(n);
    N(() => {
      ta(n, "href", o(t).href), A(n, 1, `px-3 py-2 text-sm font-medium rounded-md transition-colors ${p() === o(t).href ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`), q(h, o(t).label);
    }), b(c, _);
  }), N(() => A(f, 1, `flex ${l() === "sidebar" ? "flex-col space-y-2" : "space-x-6"}`)), b(v, s);
}
F(["click"]);
export {
  ba as N,
  xa as a
};
