import { a as fe, p as h, i as oe, f as _, b as ne, c as N, s as re, d as Be, t as I, e as A, g as f, h as le, j as ce, k as g, l as e, m as U, n as c, o as w, q as K, u as i, r as m, v as G, w as me, x as be, y as ae, z as ge, A as Ye, B as se, C as ue, D as Ie, E as he, F as Oe, G as L } from "./x-Dsi-CPO3.js";
import { createEventDispatcher as pe, onMount as ie } from "svelte";
import { T as Se, i as Ae, s as De, a as Fe } from "./Toast-ByJq2iC8.js";
var Re = _('<button type="button" class="text-xl font-bold text-primary hover:text-primary-hover transition-colors svelte-1r8bk40"> </button>'), qe = _('<img class="h-8 w-8 svelte-1r8bk40"/>'), Ge = _('<a class="flex items-center space-x-2 text-xl font-bold text-primary hover:text-primary-hover transition-colors svelte-1r8bk40"><!> <span class="svelte-1r8bk40"> </span></a>'), Ke = be('<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" class="svelte-1r8bk40"></path>'), Pe = be('<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" class="svelte-1r8bk40"></path>'), We = _('<div id="mobile-menu" class="md:hidden border-t border-primary bg-surface svelte-1r8bk40"><div class="px-4 py-2 space-y-1 svelte-1r8bk40"><!></div></div>'), He = _('<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden svelte-1r8bk40" role="button" tabindex="0" aria-label="Close menu"></div>'), Je = _('<nav aria-label="Main navigation"><div class="max-w-7xl mx-auto svelte-1r8bk40"><div><div class="flex items-center svelte-1r8bk40"><!></div> <div class="hidden md:flex items-center space-x-8 svelte-1r8bk40"><!></div> <div class="flex items-center space-x-4 svelte-1r8bk40"><!> <!> <button type="button" class="md:hidden p-2 rounded-lg text-primary hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary svelte-1r8bk40" aria-controls="mobile-menu" aria-label="Toggle navigation menu"><svg class="w-6 h-6 text-text svelte-1r8bk40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><!></svg></button></div></div> <!></div></nav> <!>', 1);
const Qe = {
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

    /* Mobile menu item styles */.mobile-menu-item.svelte-1r8bk40 {display:block;border-radius:var(--radius-lg);padding-left:0.75rem;padding-right:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;font-size:1rem;line-height:1.5rem;font-weight:500;color:rgb(var(--color-primary));transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;}.mobile-menu-item.svelte-1r8bk40:hover {background-color:rgb(var(--color-surface-secondary));}

    /* Responsive adjustments */
    @media (max-width: 768px) {.navbar.svelte-1r8bk40 {padding-left:1rem;padding-right:1rem;}
    }`
};
function rt(B, a) {
  ce(a, !1), fe(B, Qe);
  let s = h(a, "brand", 8, ""), M = h(a, "variant", 8, "default"), T = h(a, "size", 8, "md"), d = h(a, "position", 8, "sticky"), D = h(a, "showThemeToggle", 8, !0), b = h(a, "className", 8, "");
  const p = pe();
  let o = U(!1), C = U(!1), x = U();
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
  function O(n) {
    p("brandClick", { event: n });
  }
  function l() {
    g(o, !e(o)), p("menuToggle", { isOpen: e(o) });
  }
  function E() {
    g(C, window.scrollY > 10);
  }
  ie(() => (window.addEventListener("scroll", E), () => window.removeEventListener("scroll", E)));
  function k(n) {
    n.key === "Escape" && e(o) && (g(o, !1), p("menuToggle", { isOpen: !1 }));
  }
  function r(n) {
    e(o) && e(x) && !e(x).contains(n.target) && (g(o, !1), p("menuToggle", { isOpen: !1 }));
  }
  ie(() => (document.addEventListener("keydown", k), document.addEventListener("click", r), () => {
    document.removeEventListener("keydown", k), document.removeEventListener("click", r);
  })), oe();
  var t = Je(), u = ne(t), P = c(u), F = c(P), W = c(F), V = c(W);
  {
    var X = (n) => {
      var v = me(), R = ne(v);
      {
        var J = (S) => {
          var j = Re(), Q = c(j);
          I(() => se(Q, s())), A("click", j, (ee) => O(ee)), f(S, j);
        }, je = (S) => {
          var j = Ge(), Q = c(j);
          {
            var ee = (q) => {
              var te = qe();
              I(() => {
                G(te, "src", (m(s()), i(() => s().logo))), G(te, "alt", (m(s()), i(() => s().text)));
              }), f(q, te);
            };
            N(Q, (q) => {
              m(s()), i(() => s().logo) && q(ee);
            });
          }
          var Le = w(Q, 2), Ne = c(Le);
          I(() => {
            G(j, "href", (m(s()), i(() => s().href || "#"))), se(Ne, (m(s()), i(() => s().text)));
          }), A("click", j, (q) => O(q)), f(S, j);
        };
        N(R, (S) => {
          typeof s() == "string" ? S(J) : S(je, !1);
        });
      }
      f(n, v);
    };
    N(V, (n) => {
      s() && n(X);
    });
  }
  var H = w(W, 2), Z = c(H);
  re(Z, a, "nav", {}, null);
  var xe = w(H, 2), de = c(xe);
  {
    var ke = (n) => {
      Se(n, { size: "md", variant: "outline" });
    };
    N(de, (n) => {
      D() && n(ke);
    });
  }
  var ve = w(de, 2);
  re(ve, a, "actions", {}, null);
  var $ = w(ve, 2), ye = c($), we = c(ye);
  {
    var _e = (n) => {
      var v = Ke();
      f(n, v);
    }, Me = (n) => {
      var v = Pe();
      f(n, v);
    };
    N(we, (n) => {
      e(o) ? n(_e) : n(Me, !1);
    });
  }
  var Te = w(F, 2);
  {
    var Ce = (n) => {
      var v = We(), R = c(v), J = c(R);
      re(J, a, "mobile-nav", {}, null), ae(3, v, () => ge, () => ({ y: -20, duration: 200 })), f(n, v);
    };
    N(Te, (n) => {
      e(o) && n(Ce);
    });
  }
  Be(u, (n) => g(x, n), () => e(x));
  var ze = w(u, 2);
  {
    var Ee = (n) => {
      var v = He();
      A("click", v, () => g(o, !1)), A("keydown", v, (R) => {
        R.key === "Escape" && g(o, !1);
      }), ae(3, v, () => Ye, () => ({ duration: 200 })), f(n, v);
    };
    N(ze, (n) => {
      e(o) && n(Ee);
    });
  }
  I(() => {
    K(
      u,
      1,
      `
        navbar
        ${m(d()), i(() => Y[d()]) ?? ""}
        ${m(M()), i(() => z[M()]) ?? ""}
        ${e(C) ? "backdrop-blur-sm bg-surface/95" : ""}
        transition-all duration-200
        ${b() ?? ""}
    `,
      "svelte-1r8bk40"
    ), K(
      F,
      1,
      `flex items-center justify-between ${m(T()), i(() => y[T()]) ?? ""}`,
      "svelte-1r8bk40"
    ), G($, "aria-expanded", e(o));
  }), A("click", $, l), f(B, t), le();
}
var Ue = _('<div><div class="flex items-center"><svg class="w-5 h-5 mr-3 flex-shrink-0 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg> <span class="text-sm font-medium flex-1"> </span></div> <button class="ml-3 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity" aria-label="Close notification"><svg class="w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>'), Ve = _("<div></div>");
function nt(B, a) {
  ce(a, !1);
  let s = h(a, "notifications", 28, () => []), M = h(a, "position", 8, "top-right"), T = h(a, "maxNotifications", 8, 5);
  const d = pe(), D = "px-4 py-3 rounded-md border flex items-center justify-between mb-3 shadow-lg", b = {
    success: "bg-success-surface border-success text-success-text",
    error: "bg-error-surface border-error text-error-text",
    warning: "bg-warning-surface border-warning text-warning-text",
    info: "bg-info-surface border-info text-info-text",
    default: "bg-surface border-border text-text"
  }, p = {
    success: "M5 13l4 4L19 7",
    error: "M6 18L18 6M6 6l12 12",
    warning: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16c-.77.833.192 2.5 1.732 2.5z",
    info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    default: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  }, o = {
    "top-right": "fixed top-4 right-4",
    "top-left": "fixed top-4 left-4",
    "bottom-right": "fixed bottom-4 right-4",
    "bottom-left": "fixed bottom-4 left-4"
  };
  function C(l) {
    return `${D} ${b[l] || b.default}`;
  }
  function x(l) {
    return p[l] || p.default;
  }
  function y(l) {
    d("close");
  }
  ue(
    () => (m(s()), m(T())),
    () => {
      s().length > T() && s(s().slice(-T()));
    }
  ), ue(() => m(s()), () => {
    s().length > 0 && s().forEach((l) => {
      l.duration && l.duration > 0 && setTimeout(
        () => {
          y(l.id);
        },
        l.duration
      );
    });
  }), Ie(), oe();
  var z = me(), Y = ne(z);
  {
    var O = (l) => {
      var E = Ve();
      he(E, 5, s, (k) => k.id, (k, r) => {
        var t = Ue(), u = c(t), P = c(u), F = c(P), W = w(P, 2), V = c(W), X = w(u, 2);
        I(
          (H, Z) => {
            K(t, 1, H), G(F, "d", Z), se(V, (e(r), i(() => e(r).message)));
          },
          [
            () => Oe((e(r), i(() => C(e(r).type)))),
            () => (e(r), i(() => x(e(r).type)))
          ]
        ), A("click", X, () => y(e(r).id)), ae(3, t, () => ge, () => ({ x: M().includes("right") ? 300 : -300, duration: 300 })), f(k, t);
      }), I(() => K(E, 1, `${m(M()), i(() => o[M()]) ?? ""} z-50 max-w-sm w-full space-y-2`)), f(l, E);
    };
    N(Y, (l) => {
      m(s()), i(() => s().length > 0) && l(O);
    });
  }
  f(B, z), le();
}
var Xe = _("<div></div>");
const Ze = {
  hash: "svelte-1hjxuh0",
  code: `.toast-manager.svelte-1hjxuh0 {
        /* Ensure toasts don't interfere with page interactions */pointer-events:none;}

    /* Re-enable pointer events for individual toasts */.toast-manager > * {pointer-events:auto;}

    /* Stack toasts with proper spacing */.toast-manager.svelte-1hjxuh0 {display:flex;flex-direction:column;gap:0.5rem;}`
};
function at(B, a) {
  ce(a, !1), fe(B, Ze);
  let s = h(a, "position", 8, "top-right"), M = h(a, "maxToasts", 8, 5), T = h(a, "className", 8, ""), d = U([]), D = 0;
  function b(r) {
    const t = `toast-${++D}`, u = {
      id: t,
      title: "",
      message: "",
      type: "info",
      duration: 5e3,
      closable: !0,
      showIcon: !0,
      ...r
    };
    return e(d).length >= M() && g(d, e(d).slice(1)), g(d, [...e(d), u]), t;
  }
  function p(r, t = {}) {
    return b({ message: r, type: "success", ...t });
  }
  function o(r, t = {}) {
    return b({
      message: r,
      type: "error",
      duration: 0,
      // Don't auto-dismiss errors
      ...t
    });
  }
  function C(r, t = {}) {
    return b({ message: r, type: "warning", ...t });
  }
  function x(r, t = {}) {
    return b({ message: r, type: "info", ...t });
  }
  function y(r) {
    g(d, e(d).filter((t) => t.id !== r));
  }
  function z() {
    g(d, []);
  }
  function Y(r, t) {
    g(d, e(d).map((u) => u.id === r ? { ...u, ...t } : u));
  }
  function O(r) {
    y(r.detail.id);
  }
  function l(r) {
  }
  ie(() => {
    if (!Ae()) return;
    const r = De();
    if (r)
      return r.toast = { show: b, success: p, error: o, warning: C, info: x, close: y, closeAll: z, update: Y }, () => {
        delete r.toast;
      };
  });
  var E = { show: b, success: p, error: o, warning: C, info: x, close: y, closeAll: z, update: Y };
  oe();
  var k = Xe();
  return he(k, 5, () => e(d), (r) => r.id, (r, t) => {
    Fe(r, {
      get id() {
        return e(t), i(() => e(t).id);
      },
      get title() {
        return e(t), i(() => e(t).title);
      },
      get message() {
        return e(t), i(() => e(t).message);
      },
      get type() {
        return e(t), i(() => e(t).type);
      },
      get duration() {
        return e(t), i(() => e(t).duration);
      },
      get closable() {
        return e(t), i(() => e(t).closable);
      },
      get showIcon() {
        return e(t), i(() => e(t).showIcon);
      },
      get position() {
        return s();
      },
      $$events: { close: O, click: l }
    });
  }), I(() => K(k, 1, `toast-manager fixed inset-0 pointer-events-none z-notification ${T() ?? ""}`, "svelte-1hjxuh0")), f(B, k), L(a, "show", b), L(a, "success", p), L(a, "error", o), L(a, "warning", C), L(a, "info", x), L(a, "close", y), L(a, "closeAll", z), L(a, "update", Y), le(E);
}
export {
  rt as N,
  at as T,
  nt as a
};
