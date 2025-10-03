import { a as ue, p as h, i as oe, f as _, b as ne, c as N, s as te, d as Be, t as I, e as A, g as f, h as ie, j as le, k as g, l as e, m as U, n as d, o as w, q as K, u as o, r as m, v as G, w as fe, x as me, y as re, z as be, A as Ye, B as ae, C as ve, D as Ie, E as ge, F as Oe, G as L } from "./x-DpVwziig.js";
import { createEventDispatcher as he, onMount as se } from "svelte";
import { T as Se, a as Ae } from "./Toast-DXZ9gllw.js";
var De = _('<button type="button" class="text-xl font-bold text-primary hover:text-primary-hover transition-colors svelte-1r8bk40"> </button>'), Fe = _('<img class="h-8 w-8 svelte-1r8bk40"/>'), Re = _('<a class="flex items-center space-x-2 text-xl font-bold text-primary hover:text-primary-hover transition-colors svelte-1r8bk40"><!> <span class="svelte-1r8bk40"> </span></a>'), qe = me('<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" class="svelte-1r8bk40"></path>'), Ge = me('<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" class="svelte-1r8bk40"></path>'), Ke = _('<div id="mobile-menu" class="md:hidden border-t border-primary bg-surface svelte-1r8bk40"><div class="px-4 py-2 space-y-1 svelte-1r8bk40"><!></div></div>'), Pe = _('<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden svelte-1r8bk40" role="button" tabindex="0" aria-label="Close menu"></div>'), He = _('<nav aria-label="Main navigation"><div class="max-w-7xl mx-auto svelte-1r8bk40"><div><div class="flex items-center svelte-1r8bk40"><!></div> <div class="hidden md:flex items-center space-x-8 svelte-1r8bk40"><!></div> <div class="flex items-center space-x-4 svelte-1r8bk40"><!> <!> <button type="button" class="md:hidden p-2 rounded-lg text-primary hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary svelte-1r8bk40" aria-controls="mobile-menu" aria-label="Toggle navigation menu"><svg class="w-6 h-6 svelte-1r8bk40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><!></svg></button></div></div> <!></div></nav> <!>', 1);
const Je = {
  hash: "svelte-1r8bk40",
  code: `
    /* Smooth transitions */.navbar.svelte-1r8bk40 {transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1);}

    /* Mobile menu animations */.mobile-menu-enter.svelte-1r8bk40 {
        animation: svelte-1r8bk40-mobile-menu-enter 0.2s ease-out;}.mobile-menu-exit.svelte-1r8bk40 {
        animation: svelte-1r8bk40-mobile-menu-exit 0.15s ease-in;}

    @keyframes svelte-1r8bk40-mobile-menu-enter {
        0% {
            opacity: 0;
            transform: translateY(-10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes svelte-1r8bk40-mobile-menu-exit {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-10px);
        }
    }

    /* Focus styles for accessibility */.navbar.svelte-1r8bk40 button:where(.svelte-1r8bk40):focus,
    .navbar.svelte-1r8bk40 a:where(.svelte-1r8bk40):focus {outline:2px solid var(--color-primary-500);outline-offset:2px;}

    /* Brand hover effects */.navbar-brand.svelte-1r8bk40:hover {transform:translateY(-1px);}

    /* Mobile menu item styles */.mobile-menu-item.svelte-1r8bk40 {display:block;border-radius:var(--radius-lg);padding-left:0.75rem;padding-right:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;font-size:1rem;line-height:1.5rem;font-weight:500;color:rgb(var(--color-text));transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;}.mobile-menu-item.svelte-1r8bk40:hover {background-color:rgb(var(--color-surface-secondary));}

    /* Responsive adjustments */
    @media (max-width: 768px) {.navbar.svelte-1r8bk40 {padding-left:1rem;padding-right:1rem;}
    }`
};
function et(B, a) {
  le(a, !1), ue(B, Je);
  let s = h(a, "brand", 8, ""), M = h(a, "variant", 8, "default"), T = h(a, "size", 8, "md"), c = h(a, "position", 8, "sticky"), D = h(a, "showThemeToggle", 8, !0), b = h(a, "className", 8, "");
  const p = he();
  let i = U(!1), C = U(!1), k = U();
  const y = { sm: "py-2 px-4", md: "py-3 px-6", lg: "py-4 px-8" }, z = {
    default: "bg-surface border-b border-primary shadow-adaptive-sm",
    transparent: "bg-transparent",
    solid: "bg-surface shadow-adaptive-md",
    bordered: "bg-surface border border-primary shadow-adaptive-sm"
  }, Y = {
    static: "relative",
    sticky: "sticky top-0 z-40",
    fixed: "fixed top-0 left-0 right-0 z-40"
  };
  function O(r) {
    p("brandClick", { event: r });
  }
  function l() {
    g(i, !e(i)), p("menuToggle", { isOpen: e(i) });
  }
  function E() {
    g(C, window.scrollY > 10);
  }
  se(() => (window.addEventListener("scroll", E), () => window.removeEventListener("scroll", E)));
  function x(r) {
    r.key === "Escape" && e(i) && (g(i, !1), p("menuToggle", { isOpen: !1 }));
  }
  function n(r) {
    e(i) && e(k) && !e(k).contains(r.target) && (g(i, !1), p("menuToggle", { isOpen: !1 }));
  }
  se(() => (document.addEventListener("keydown", x), document.addEventListener("click", n), () => {
    document.removeEventListener("keydown", x), document.removeEventListener("click", n);
  })), oe();
  var t = He(), u = ne(t), P = d(u), F = d(P), H = d(F), V = d(H);
  {
    var W = (r) => {
      var v = fe(), R = ne(v);
      {
        var $ = (S) => {
          var j = De(), Q = d(j);
          I(() => ae(Q, s())), A("click", j, O), f(S, j);
        }, Ee = (S) => {
          var j = Re(), Q = d(j);
          {
            var je = (q) => {
              var ee = Fe();
              I(() => {
                G(ee, "src", (m(s()), o(() => s().logo))), G(ee, "alt", (m(s()), o(() => s().text)));
              }), f(q, ee);
            };
            N(Q, (q) => {
              m(s()), o(() => s().logo) && q(je);
            });
          }
          var Le = w(Q, 2), Ne = d(Le);
          I(() => {
            G(j, "href", (m(s()), o(() => s().href || "#"))), ae(Ne, (m(s()), o(() => s().text)));
          }), A("click", j, (q) => O(q)), f(S, j);
        };
        N(R, (S) => {
          typeof s() == "string" ? S($) : S(Ee, !1);
        });
      }
      f(r, v);
    };
    N(V, (r) => {
      s() && r(W);
    });
  }
  var J = w(H, 2), X = d(J);
  te(X, a, "nav", {}, null);
  var pe = w(J, 2), de = d(pe);
  {
    var ke = (r) => {
      Se(r, { size: "md", variant: "outline" });
    };
    N(de, (r) => {
      D() && r(ke);
    });
  }
  var ce = w(de, 2);
  te(ce, a, "actions", {}, null);
  var Z = w(ce, 2), xe = d(Z), ye = d(xe);
  {
    var we = (r) => {
      var v = qe();
      f(r, v);
    }, _e = (r) => {
      var v = Ge();
      f(r, v);
    };
    N(ye, (r) => {
      e(i) ? r(we) : r(_e, !1);
    });
  }
  var Me = w(F, 2);
  {
    var Te = (r) => {
      var v = Ke(), R = d(v), $ = d(R);
      te($, a, "mobile-nav", {}, null), re(3, v, () => be, () => ({ y: -20, duration: 200 })), f(r, v);
    };
    N(Me, (r) => {
      e(i) && r(Te);
    });
  }
  Be(u, (r) => g(k, r), () => e(k));
  var Ce = w(u, 2);
  {
    var ze = (r) => {
      var v = Pe();
      A("click", v, () => g(i, !1)), A("keydown", v, (R) => R.key === "Escape" && g(i, !1)), re(3, v, () => Ye, () => ({ duration: 200 })), f(r, v);
    };
    N(Ce, (r) => {
      e(i) && r(ze);
    });
  }
  I(() => {
    K(
      u,
      1,
      `
        navbar
        ${m(c()), o(() => Y[c()]) ?? ""}
        ${m(M()), o(() => z[M()]) ?? ""}
        ${e(C) ? "backdrop-blur-sm bg-surface/95" : ""}
        transition-all duration-200
        ${b() ?? ""}
    `,
      "svelte-1r8bk40"
    ), K(
      F,
      1,
      `flex items-center justify-between ${m(T()), o(() => y[T()]) ?? ""}`,
      "svelte-1r8bk40"
    ), G(Z, "aria-expanded", e(i));
  }), A("click", Z, l), f(B, t), ie();
}
var Qe = _('<div><div class="flex items-center"><svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg> <span class="text-sm font-medium flex-1"> </span></div> <button class="ml-3 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity" aria-label="Close notification"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>'), Ue = _("<div></div>");
function tt(B, a) {
  le(a, !1);
  let s = h(a, "notifications", 28, () => []), M = h(a, "position", 8, "top-right"), T = h(a, "maxNotifications", 8, 5);
  const c = he(), D = "px-4 py-3 rounded-md border flex items-center justify-between mb-3 shadow-lg", b = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
    info: "bg-blue-100 border-blue-400 text-blue-700",
    default: "bg-gray-100 border-gray-400 text-gray-700"
  }, p = {
    success: "M5 13l4 4L19 7",
    error: "M6 18L18 6M6 6l12 12",
    warning: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16c-.77.833.192 2.5 1.732 2.5z",
    info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    default: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  }, i = {
    "top-right": "fixed top-4 right-4",
    "top-left": "fixed top-4 left-4",
    "bottom-right": "fixed bottom-4 right-4",
    "bottom-left": "fixed bottom-4 left-4"
  };
  function C(l) {
    return `${D} ${b[l] || b.default}`;
  }
  function k(l) {
    return p[l] || p.default;
  }
  function y(l) {
    c("close");
  }
  ve(
    () => (m(s()), m(T())),
    () => {
      s().length > T() && s(s().slice(-T()));
    }
  ), ve(() => m(s()), () => {
    s().length > 0 && s().forEach((l) => {
      l.duration && l.duration > 0 && setTimeout(
        () => {
          y(l.id);
        },
        l.duration
      );
    });
  }), Ie(), oe();
  var z = fe(), Y = ne(z);
  {
    var O = (l) => {
      var E = Ue();
      ge(E, 5, s, (x) => x.id, (x, n) => {
        var t = Qe(), u = d(t), P = d(u), F = d(P), H = w(P, 2), V = d(H), W = w(u, 2);
        I(
          (J, X) => {
            K(t, 1, J), G(F, "d", X), ae(V, (e(n), o(() => e(n).message)));
          },
          [
            () => Oe((e(n), o(() => C(e(n).type)))),
            () => (e(n), o(() => k(e(n).type)))
          ]
        ), A("click", W, () => y(e(n).id)), re(3, t, () => be, () => ({ x: M().includes("right") ? 300 : -300, duration: 300 })), f(x, t);
      }), I(() => K(E, 1, `${m(M()), o(() => i[M()]) ?? ""} z-50 max-w-sm w-full space-y-2`)), f(l, E);
    };
    N(Y, (l) => {
      m(s()), o(() => s().length > 0) && l(O);
    });
  }
  f(B, z), ie();
}
var Ve = _("<div></div>");
const We = {
  hash: "svelte-1hjxuh0",
  code: `.toast-manager.svelte-1hjxuh0 {
        /* Ensure toasts don't interfere with page interactions */pointer-events:none;}

    /* Re-enable pointer events for individual toasts */.toast-manager > * {pointer-events:auto;}

    /* Stack toasts with proper spacing */.toast-manager.svelte-1hjxuh0 {display:flex;flex-direction:column;gap:0.5rem;}`
};
function nt(B, a) {
  le(a, !1), ue(B, We);
  let s = h(a, "position", 8, "top-right"), M = h(a, "maxToasts", 8, 5), T = h(a, "className", 8, ""), c = U([]), D = 0;
  function b(n) {
    const t = `toast-${++D}`, u = {
      id: t,
      title: "",
      message: "",
      type: "info",
      duration: 5e3,
      closable: !0,
      showIcon: !0,
      ...n
    };
    return e(c).length >= M() && g(c, e(c).slice(1)), g(c, [...e(c), u]), t;
  }
  function p(n, t = {}) {
    return b({ message: n, type: "success", ...t });
  }
  function i(n, t = {}) {
    return b({
      message: n,
      type: "error",
      duration: 0,
      // Don't auto-dismiss errors
      ...t
    });
  }
  function C(n, t = {}) {
    return b({ message: n, type: "warning", ...t });
  }
  function k(n, t = {}) {
    return b({ message: n, type: "info", ...t });
  }
  function y(n) {
    g(c, e(c).filter((t) => t.id !== n));
  }
  function z() {
    g(c, []);
  }
  function Y(n, t) {
    g(c, e(c).map((u) => u.id === n ? { ...u, ...t } : u));
  }
  function O(n) {
    y(n.detail.id);
  }
  function l(n) {
  }
  se(() => (typeof window < "u" && (window.toast = { show: b, success: p, error: i, warning: C, info: k, close: y, closeAll: z, update: Y }), () => {
    typeof window < "u" && delete window.toast;
  }));
  var E = { show: b, success: p, error: i, warning: C, info: k, close: y, closeAll: z, update: Y };
  oe();
  var x = Ve();
  return ge(x, 5, () => e(c), (n) => n.id, (n, t) => {
    Ae(n, {
      get id() {
        return e(t), o(() => e(t).id);
      },
      get title() {
        return e(t), o(() => e(t).title);
      },
      get message() {
        return e(t), o(() => e(t).message);
      },
      get type() {
        return e(t), o(() => e(t).type);
      },
      get duration() {
        return e(t), o(() => e(t).duration);
      },
      get closable() {
        return e(t), o(() => e(t).closable);
      },
      get showIcon() {
        return e(t), o(() => e(t).showIcon);
      },
      get position() {
        return s();
      },
      $$events: { close: O, click: l }
    });
  }), I(() => K(x, 1, `toast-manager fixed inset-0 pointer-events-none z-notification ${T() ?? ""}`, "svelte-1hjxuh0")), f(B, x), L(a, "show", b), L(a, "success", p), L(a, "error", i), L(a, "warning", C), L(a, "info", k), L(a, "close", y), L(a, "closeAll", z), L(a, "update", Y), ie(E);
}
export {
  et as N,
  nt as T,
  tt as a
};
