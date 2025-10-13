import { l as k, p as n, f as x, a as F, s as y, b as N, t as $, e as O, c as u, h as a, j as i, k as s, m as ea, n as G, o as ta, q as sa, r as ra, u as va, v as A, w as ia, x as P, y as la } from "./props-DyILkQVH.js";
import { T as E } from "./ThemeToggle-2HEU5v1Q.js";
var na = x('<div class="mt-2"><!></div>'), da = x('<div class="md:hidden"><div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200"><!> <div class="pt-4"><!> <!></div></div></div>'), oa = x('<nav><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex-shrink-0"><button type="button" class="text-xl font-bold text-gray-900"> </button></div> <div class="hidden md:block"><div class="ml-10 flex items-baseline space-x-4"><!></div></div> <div class="hidden md:block"><div class="ml-4 flex items-center space-x-4"><!> <!></div></div> <div class="md:hidden"><button type="button" class="text-gray-500 hover:text-gray-600" aria-label="Toggle menu"><span class="text-2xl">☰</span></button></div></div> <!></div></nav>');
function ga(d, e) {
  const o = k(e, ["children", "$$slots", "$$events", "$$legacy"]), T = k(o, ["brand", "showThemeToggle", "className"]);
  let g = n(e, "brand", 8, ""), m = n(e, "showThemeToggle", 8, !0), h = n(e, "className", 8, ""), c = ea(!1);
  function _() {
    ta(c, !s(c));
  }
  function f() {
  }
  var l = oa();
  F(l, () => ({
    class: `bg-white border-b border-gray-200 sticky top-0 z-50 ${h() ?? ""}`,
    ...T
  }));
  var t = a(l), b = a(t), r = a(b), p = a(r), H = a(p), z = i(r, 2), I = a(z), J = a(I);
  y(J, e, "nav", {});
  var j = i(z, 2), K = a(j), C = a(K);
  y(C, e, "actions", {});
  var L = i(C, 2);
  {
    var Q = (v) => {
      E(v, {});
    };
    N(L, (v) => {
      m() && v(Q);
    });
  }
  var R = i(j, 2), S = a(R), U = i(b, 2);
  {
    var V = (v) => {
      var M = da(), W = a(M), q = a(W);
      y(q, e, "nav", {});
      var X = i(q, 2), B = a(X);
      y(B, e, "actions", {});
      var Y = i(B, 2);
      {
        var Z = (w) => {
          var D = na(), aa = a(D);
          E(aa, {}), u(w, D);
        };
        N(Y, (w) => {
          m() && w(Z);
        });
      }
      u(v, M);
    };
    N(U, (v) => {
      s(c) && v(V);
    });
  }
  $(() => G(H, g())), O("click", p, f), O("click", S, _), u(d, l);
}
var ca = (d, e, o) => e(s(o), d), _a = x("<li><a> </a></li>"), ba = x("<nav><ul></ul></nav>");
function ma(d, e) {
  const o = k(e, ["children", "$$slots", "$$events", "$$legacy"]), T = k(o, ["variant", "items", "currentPath"]);
  let g = n(e, "variant", 8, "header"), m = n(e, "items", 24, () => []), h = n(e, "currentPath", 8, "");
  function c(l, t) {
    t.preventDefault();
  }
  var _ = ba();
  F(_, () => ({
    class: `navigation navigation-${g() ?? ""}`,
    ...T
  }));
  var f = a(_);
  ra(f, 5, m, va, (l, t) => {
    var b = _a(), r = a(b);
    r.__click = [ca, c, t];
    var p = a(r);
    $(() => {
      ia(r, "href", (s(t), P(() => s(t).href))), A(r, 1, `px-3 py-2 text-sm font-medium rounded-md transition-colors ${la(h()), s(t), P(() => h() === s(t).href ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100") ?? ""}`), G(p, (s(t), P(() => s(t).label)));
    }), u(l, b);
  }), $(() => A(f, 1, `flex ${g() === "sidebar" ? "flex-col space-y-2" : "space-x-6"}`)), u(d, _);
}
sa(["click"]);
export {
  ga as N,
  ma as a
};
