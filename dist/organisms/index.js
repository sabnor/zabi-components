import { D as A, p as d, f as x, a as E, h as e, k as u, i as w, e as Z, v as N, b, o as r, s as $, g as o, r as F, n as y, x as G, y as aa, z as ea, q as B, w as ta } from "../props-wKhXfKGm.js";
import { T as M } from "../ThemeToggle-BBLYWPSs.js";
function sa(v, a) {
  $(a, !o(a));
}
function ia() {
}
var ra = x('<div class="mt-2"><!></div>'), va = x('<div class="md:hidden"><div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200"><!> <div class="pt-4"><!> <!></div></div></div>'), na = x('<nav><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex-shrink-0"><button type="button" class="text-xl font-bold text-gray-900"> </button></div> <div class="hidden md:block"><div class="ml-10 flex items-baseline space-x-4"><!></div></div> <div class="hidden md:block"><div class="ml-4 flex items-center space-x-4"><!> <!></div></div> <div class="md:hidden"><button type="button" class="text-gray-500 hover:text-gray-600" aria-label="Toggle menu"><span class="text-2xl">☰</span></button></div></div> <!></div></nav>');
function ba(v, a) {
  let n = d(a, "brand", 3, ""), m = d(a, "showThemeToggle", 3, !0), p = d(a, "className", 3, ""), k = F(a, [
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
  var s = na();
  E(s, () => ({
    class: `bg-white border-b border-gray-200 sticky top-0 z-50 ${// Brand click is now handled by the parent component
    // through event forwarding
    p() ?? ""}`,
    ...k
  }));
  var h = e(s), c = e(h), t = e(c), _ = e(t);
  _.__click = [ia];
  var l = e(_), f = r(t, 2), H = e(f), I = e(H);
  u(I, () => a.nav ?? y);
  var P = r(f, 2), J = e(P), z = e(J);
  u(z, () => a.actions ?? y);
  var K = r(z, 2);
  {
    var L = (i) => {
      M(i, {});
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
      var C = va(), U = e(C), D = e(U);
      u(D, () => a.nav ?? y);
      var V = r(D, 2), j = e(V);
      u(j, () => a.actions ?? y);
      var W = r(j, 2);
      {
        var X = (T) => {
          var q = ra(), Y = e(q);
          M(Y, {}), b(T, q);
        };
        w(W, (T) => {
          m() && T(X);
        });
      }
      b(i, C);
    };
    w(R, (i) => {
      o(g) && i(S);
    });
  }
  N(() => G(l, n())), b(v, s);
}
A(["click"]);
var la = (v, a, n) => a(o(n), v), da = x("<li><a> </a></li>"), oa = x("<nav><ul></ul></nav>");
function xa(v, a) {
  let n = d(a, "variant", 3, "header"), m = d(a, "items", 19, () => []), p = d(a, "currentPath", 3, ""), k = F(a, [
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
  E(s, () => ({
    class: `navigation navigation-${n() ?? ""}`,
    ...k
  }));
  var h = e(s);
  aa(h, 21, m, ea, (c, t) => {
    var _ = da(), l = e(_);
    l.__click = [la, g, t];
    var f = e(l);
    N(() => {
      ta(l, "href", o(t).href), B(l, 1, `px-3 py-2 text-sm font-medium rounded-md transition-colors ${p() === o(t).href ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`), G(f, o(t).label);
    }), b(c, _);
  }), N(() => B(h, 1, `flex ${n() === "sidebar" ? "flex-col space-y-2" : "space-x-6"}`)), b(v, s);
}
A(["click"]);
export {
  ba as Navbar,
  xa as Navigation
};
