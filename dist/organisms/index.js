import { D as G, p as d, f as m, a as M, h as e, q as u, i as w, e as Z, t as N, b, y as r, s as $, g as o, r as A, w as y, C as E, F as aa, G as ea, z as q, B as ta } from "../props-BKbHJRuR.js";
import { T as F } from "../ThemeToggle-Z2Ndc0if.js";
function sa(v, a) {
  $(a, !o(a));
}
function ia() {
}
var ra = m('<div class="mt-2"><!></div>'), va = m('<div class="md:hidden"><div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200"><!> <div class="pt-4"><!> <!></div></div></div>'), la = m('<nav><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex-shrink-0"><button type="button" class="text-xl font-bold text-gray-900"> </button></div> <div class="hidden md:block"><div class="ml-10 flex items-baseline space-x-4"><!></div></div> <div class="hidden md:block"><div class="ml-4 flex items-center space-x-4"><!> <!></div></div> <div class="md:hidden"><button type="button" class="text-gray-500 hover:text-gray-600" aria-label="Toggle menu"><span class="text-2xl">☰</span></button></div></div> <!></div></nav>');
function ba(v, a) {
  let l = d(a, "brand", 3, ""), x = d(a, "showThemeToggle", 3, !0), p = d(a, "className", 3, ""), k = A(a, [
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
  M(s, () => ({
    class: `bg-white border-b border-gray-200 sticky top-0 z-50 ${// Brand click is now handled by the parent component
    // through event forwarding
    p() ?? ""}`,
    ...k
  }));
  var h = e(s), c = e(h), t = e(c), _ = e(t);
  _.__click = [ia];
  var n = e(_), f = r(t, 2), H = e(f), I = e(H);
  u(I, () => a.nav ?? y);
  var P = r(f, 2), J = e(P), C = e(J);
  u(C, () => a.actions ?? y);
  var K = r(C, 2);
  {
    var L = (i) => {
      F(i, {});
    };
    w(K, (i) => {
      x() && i(L);
    });
  }
  var O = r(P, 2), Q = e(O);
  Q.__click = [sa, g];
  var R = r(c, 2);
  {
    var S = (i) => {
      var z = va(), U = e(z), B = e(U);
      u(B, () => a.nav ?? y);
      var V = r(B, 2), D = e(V);
      u(D, () => a.actions ?? y);
      var W = r(D, 2);
      {
        var X = (T) => {
          var j = ra(), Y = e(j);
          F(Y, {}), b(T, j);
        };
        w(W, (T) => {
          x() && T(X);
        });
      }
      b(i, z);
    };
    w(R, (i) => {
      o(g) && i(S);
    });
  }
  N(() => E(n, l())), b(v, s);
}
G(["click"]);
var na = (v, a, l) => a(o(l), v), da = m("<li><a> </a></li>"), oa = m("<nav><ul></ul></nav>");
function ma(v, a) {
  let l = d(a, "variant", 3, "header"), x = d(a, "items", 19, () => []), p = d(a, "currentPath", 3, ""), k = A(a, [
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
  M(s, () => ({
    class: `navigation navigation-${l() ?? ""}`,
    ...k
  }));
  var h = e(s);
  aa(h, 21, x, ea, (c, t) => {
    var _ = da(), n = e(_);
    n.__click = [na, g, t];
    var f = e(n);
    N(() => {
      ta(n, "href", o(t).href), q(n, 1, `px-3 py-2 text-sm font-medium rounded-md transition-colors ${p() === o(t).href ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`), E(f, o(t).label);
    }), b(c, _);
  }), N(() => q(h, 1, `flex ${l() === "sidebar" ? "flex-col space-y-2" : "space-x-6"}`)), b(v, s);
}
G(["click"]);
export {
  ba as Navbar,
  ma as Navigation
};
