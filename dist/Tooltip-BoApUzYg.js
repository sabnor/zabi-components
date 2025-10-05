import { a as Me, p as x, C as ie, D as Te, i as ke, f as y, c as R, g as n, h as he, j as ye, r as E, l as e, m as ee, n as a, k as H, b as ue, o as d, s as ce, t as f, q as C, F as fe, e as $, u as W, x as Pe, v as J, w as xe, Q as be, B as A, d as Se, P as _e, R as oe, E as ve, S as me, G as Le, y as He, z as Ve } from "./x-Dsi-CPO3.js";
import { createEventDispatcher as Be, onMount as Ie } from "svelte";
import { T as Xe, e as je, c as Ee, i as De, s as Ge, d as Oe } from "./Toast-BTynzMV8.js";
var Ye = y("<div></div>"), Ze = Pe('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" class="svelte-14njway"></path></svg>'), qe = Pe('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" class="svelte-14njway"></path></svg>'), Ue = y('<button type="button"><!> <!> <!> <!></button> <button type="button" aria-label="Close badge"><svg class="w-full h-full text-current svelte-14njway" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" class="svelte-14njway"></path></svg></button>', 1), Je = y("<div></div>"), Ke = Pe('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" class="svelte-14njway"></path></svg>'), Qe = Pe('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" class="svelte-14njway"></path></svg>'), $e = y("<span><!> <!> <!> <!></span>"), et = y('<div class="inline-flex items-center gap-1 svelte-14njway"><!></div>');
const tt = {
  hash: "svelte-14njway",
  code: `
    /* Hover effects for closable badges */.badge-closable.svelte-14njway:hover {transform:translateY(-1px);box-shadow:0 4px 8px rgba(0, 0, 0, 0.2);}.badge-closable.svelte-14njway:active {transform:translateY(0);}

    /* Focus styles for accessibility */.badge-closable.svelte-14njway:focus {outline:2px solid var(--color-plasma-red-500);outline-offset:2px;}

    /* Animation for badge appearance */
    @keyframes svelte-14njway-badge-enter {
        0% {
            opacity: 0;
            transform: scale(0.8);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }.badge-enter.svelte-14njway {
        animation: svelte-14njway-badge-enter 0.2s ease-out;}

    /* Animation for badge removal */
    @keyframes svelte-14njway-badge-exit {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.8);
        }
    }.badge-exit.svelte-14njway {
        animation: svelte-14njway-badge-exit 0.2s ease-in;}

    /* Dot animation */.badge-dot.svelte-14njway {
        animation: svelte-14njway-badge-dot-pulse 2s infinite;}

    @keyframes svelte-14njway-badge-dot-pulse {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }

    /* Icon rotation for loading states */.badge-icon-loading.svelte-14njway {
        animation: svelte-14njway-badge-icon-spin 1s linear infinite;}

    @keyframes svelte-14njway-badge-icon-spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }`
};
function Vt(se, t) {
  ye(t, !1), Me(se, tt);
  const h = ee(), w = ee(), j = ee(), m = ee(), F = ee(), Z = ee(), V = ee();
  let X = x(t, "variant", 8, "default"), L = x(t, "size", 8, "md"), M = x(t, "shape", 8, "rounded"), G = x(t, "dot", 8, !1), B = x(t, "closable", 8, !1), s = x(t, "icon", 8, void 0), S = x(t, "iconPosition", 8, "left");
  const P = Be();
  function q(k) {
    const I = k;
    I.stopPropagation(), P("close", { event: I });
  }
  function z(k) {
    P("click", { event: k });
  }
  function r(k) {
    const I = k;
    (I.key === "Enter" || I.key === " ") && (I.preventDefault(), I.target === I.currentTarget ? z(k) : q(k));
  }
  ie(() => {
  }, () => {
    H(h, {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base"
    });
  }), ie(() => {
  }, () => {
    H(w, {
      default: "bg-surface-secondary text-primary border border-primary",
      success: "bg-success-surface text-success-text border border-success/30",
      warning: "bg-warning-surface text-warning-text border border-warning/30",
      error: "bg-error-surface text-error-text border border-error/30",
      info: "bg-info-surface text-info-text border border-info/30",
      neutral: "bg-surface-tertiary text-secondary border border-secondary"
    });
  }), ie(() => {
  }, () => {
    H(j, {
      rounded: "rounded-md",
      pill: "rounded-full",
      square: "rounded-none"
    });
  }), ie(() => {
  }, () => {
    H(m, { sm: "w-1.5 h-1.5", md: "w-2 h-2", lg: "w-2.5 h-2.5" });
  }), ie(
    () => (e(h), E(L()), e(w), E(X()), e(j), E(M()), E(B())),
    () => {
      H(F, [
        "inline-flex",
        "items-center",
        "gap-1.5",
        "font-medium",
        "border",
        "transition-all",
        "duration-200",
        "ease-in-out",
        "select-none",
        "cursor-default",
        e(h)[L()],
        e(w)[X()],
        e(j)[M()],
        B() ? "cursor-pointer hover:opacity-80" : ""
      ].join(" "));
    }
  ), ie(() => E(L()), () => {
    H(Z, [
      "flex-shrink-0",
      L() === "sm" ? "w-3 h-3" : L() === "md" ? "w-4 h-4" : "w-5 h-5"
    ].join(" "));
  }), ie(() => E(L()), () => {
    H(V, [
      "flex-shrink-0",
      "ml-1",
      "hover:bg-white/10",
      "rounded-full",
      "p-0.5",
      "transition-colors",
      "duration-150",
      "ease-in-out",
      L() === "sm" ? "w-3 h-3" : L() === "md" ? "w-4 h-4" : "w-5 h-5"
    ].join(" "));
  }), Te(), ke();
  var K = et(), ne = a(K);
  {
    var _ = (k) => {
      var I = Ue(), U = ue(I), re = a(U);
      {
        var te = (l) => {
          var D = Ye();
          f(() => C(
            D,
            1,
            `w-2 h-2 rounded-full bg-current ${e(m), E(L()), W(() => e(m)[L()]) ?? ""}`,
            "svelte-14njway"
          )), n(l, D);
        };
        R(re, (l) => {
          G() && l(te);
        });
      }
      var O = d(re, 2);
      {
        var g = (l) => {
          var D = Ze(), Q = a(D);
          f(() => {
            C(D, 0, `${e(Z) ?? ""} text-current`, "svelte-14njway"), J(Q, "d", s());
          }), n(l, D);
        };
        R(O, (l) => {
          s() && S() === "left" && l(g);
        });
      }
      var v = d(O, 2);
      ce(v, t, "default", {}, null);
      var c = d(v, 2);
      {
        var o = (l) => {
          var D = qe(), Q = a(D);
          f(() => {
            C(D, 0, `${e(Z) ?? ""} text-current`, "svelte-14njway"), J(Q, "d", s());
          }), n(l, D);
        };
        R(c, (l) => {
          s() && S() === "right" && l(o);
        });
      }
      var u = d(U, 2);
      f(() => {
        C(U, 1, fe(e(F)), "svelte-14njway"), C(u, 1, fe(e(V)), "svelte-14njway");
      }), $("click", U, z), $("keydown", U, r), $("click", u, q), $("keydown", u, r), n(k, I);
    }, T = (k) => {
      var I = $e(), U = a(I);
      {
        var re = (o) => {
          var u = Je();
          f(() => C(
            u,
            1,
            `w-2 h-2 rounded-full bg-current ${e(m), E(L()), W(() => e(m)[L()]) ?? ""}`,
            "svelte-14njway"
          )), n(o, u);
        };
        R(U, (o) => {
          G() && o(re);
        });
      }
      var te = d(U, 2);
      {
        var O = (o) => {
          var u = Ke(), l = a(u);
          f(() => {
            C(u, 0, `${e(Z) ?? ""} text-current`, "svelte-14njway"), J(l, "d", s());
          }), n(o, u);
        };
        R(te, (o) => {
          s() && S() === "left" && o(O);
        });
      }
      var g = d(te, 2);
      ce(g, t, "default", {}, null);
      var v = d(g, 2);
      {
        var c = (o) => {
          var u = Qe(), l = a(u);
          f(() => {
            C(u, 0, `${e(Z) ?? ""} text-current`, "svelte-14njway"), J(l, "d", s());
          }), n(o, u);
        };
        R(v, (o) => {
          s() && S() === "right" && o(c);
        });
      }
      f(() => C(I, 1, fe(e(F)), "svelte-14njway")), n(k, I);
    };
    R(ne, (k) => {
      B() ? k(_) : k(T, !1);
    });
  }
  n(se, K), he();
}
var at = y("<h1><!></h1>"), st = y("<h2><!></h2>"), rt = y("<h3><!></h3>"), nt = y("<h4><!></h4>"), it = y("<h5><!></h5>"), ot = y("<h6><!></h6>");
function Xt(se, t) {
  ye(t, !1);
  const h = ee();
  let w = x(t, "level", 8, 1), j = x(t, "text", 8, ""), m = x(t, "color", 8, "text-text"), F = x(t, "spacing", 8, "normal");
  const Z = {
    1: "!text-6xl md:!text-7xl font-bold leading-tight block",
    2: "!text-4xl md:!text-5xl font-bold leading-tight block",
    3: "!text-3xl md:!text-4xl font-semibold leading-snug block",
    4: "!text-2xl md:!text-3xl font-semibold leading-snug block",
    5: "!text-xl md:!text-2xl font-medium leading-normal block",
    6: "!text-lg md:!text-xl font-medium leading-normal block"
  }, V = {
    tight: {
      1: "mb-2",
      2: "mb-3",
      3: "mb-2",
      4: "mb-2",
      5: "mb-1",
      6: "mb-1"
    },
    normal: {
      1: "mb-4",
      2: "mb-4",
      3: "mb-3",
      4: "mb-3",
      5: "mb-2",
      6: "mb-2"
    },
    loose: {
      1: "mb-6",
      2: "mb-6",
      3: "mb-4",
      4: "mb-4",
      5: "mb-3",
      6: "mb-3"
    }
  };
  ie(
    () => (E(w()), E(m()), E(F())),
    () => {
      H(h, `${Z[w()]} font-title ${m()} ${V[F()][w()]}`);
    }
  ), Te();
  var X = xe(), L = ue(X);
  {
    var M = (B) => {
      var s = at(), S = a(s);
      ce(S, t, "default", {}, (P) => {
        var q = be();
        f(() => A(q, j())), n(P, q);
      }), f(() => C(s, 1, fe(e(h)))), n(B, s);
    }, G = (B) => {
      var s = xe(), S = ue(s);
      {
        var P = (z) => {
          var r = st(), K = a(r);
          ce(K, t, "default", {}, (ne) => {
            var _ = be();
            f(() => A(_, j())), n(ne, _);
          }), f(() => C(r, 1, fe(e(h)))), n(z, r);
        }, q = (z) => {
          var r = xe(), K = ue(r);
          {
            var ne = (T) => {
              var k = rt(), I = a(k);
              ce(I, t, "default", {}, (U) => {
                var re = be();
                f(() => A(re, j())), n(U, re);
              }), f(() => C(k, 1, fe(e(h)))), n(T, k);
            }, _ = (T) => {
              var k = xe(), I = ue(k);
              {
                var U = (te) => {
                  var O = nt(), g = a(O);
                  ce(g, t, "default", {}, (v) => {
                    var c = be();
                    f(() => A(c, j())), n(v, c);
                  }), f(() => C(O, 1, fe(e(h)))), n(te, O);
                }, re = (te) => {
                  var O = xe(), g = ue(O);
                  {
                    var v = (o) => {
                      var u = it(), l = a(u);
                      ce(l, t, "default", {}, (D) => {
                        var Q = be();
                        f(() => A(Q, j())), n(D, Q);
                      }), f(() => C(u, 1, fe(e(h)))), n(o, u);
                    }, c = (o) => {
                      var u = xe(), l = ue(u);
                      {
                        var D = (Q) => {
                          var de = ot(), pe = a(de);
                          ce(pe, t, "default", {}, (we) => {
                            var le = be();
                            f(() => A(le, j())), n(we, le);
                          }), f(() => C(de, 1, fe(e(h)))), n(Q, de);
                        };
                        R(
                          l,
                          (Q) => {
                            w() === 6 && Q(D);
                          },
                          !0
                        );
                      }
                      n(o, u);
                    };
                    R(
                      g,
                      (o) => {
                        w() === 5 ? o(v) : o(c, !1);
                      },
                      !0
                    );
                  }
                  n(te, O);
                };
                R(
                  I,
                  (te) => {
                    w() === 4 ? te(U) : te(re, !1);
                  },
                  !0
                );
              }
              n(T, k);
            };
            R(
              K,
              (T) => {
                w() === 3 ? T(ne) : T(_, !1);
              },
              !0
            );
          }
          n(z, r);
        };
        R(
          S,
          (z) => {
            w() === 2 ? z(P) : z(q, !1);
          },
          !0
        );
      }
      n(B, s);
    };
    R(L, (B) => {
      w() === 1 ? B(M) : B(G, !1);
    });
  }
  n(se, X), he();
}
var lt = y('<img alt="" class="absolute inset-0 w-full h-full object-cover animate-pulse"/>'), dt = y('<img class="w-full h-full object-cover transition-opacity duration-300"/>'), ct = y('<div class="absolute inset-0 flex items-center justify-center" style="background-color: rgb(var(--color-surface-secondary)); color: rgb(var(--color-text-secondary));"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l2.586-2.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>'), vt = y("<div><!> <!> <!></div>");
function Gt(se, t) {
  ye(t, !1);
  let h = x(t, "src", 8), w = x(t, "alt", 8, ""), j = x(t, "width", 8, "100%"), m = x(t, "height", 8, "auto"), F = x(t, "loading", 8, "lazy"), Z = x(t, "className", 8, ""), V = x(t, "placeholder", 8, "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"), X = ee(!1), L = ee(!1), M = ee(!1), G = ee();
  Ie(() => {
    if (F() === "lazy") {
      const _ = new IntersectionObserver(
        (T) => {
          T.forEach((k) => {
            k.isIntersecting && (H(M, !0), _.unobserve(k.target));
          });
        },
        { rootMargin: "50px" }
      );
      return e(G) && _.observe(e(G)), () => _.disconnect();
    } else
      H(M, !0);
  });
  function B() {
    H(X, !0);
  }
  function s() {
    H(L, !0), console.warn("Failed to load image:", h());
  }
  ke();
  var S = vt(), P = a(S);
  {
    var q = (_) => {
      var T = lt();
      f(() => J(T, "src", V())), n(_, T);
    };
    R(P, (_) => {
      !e(X) && !e(L) && _(q);
    });
  }
  var z = d(P, 2);
  {
    var r = (_) => {
      var T = dt();
      f(() => {
        J(T, "src", h()), J(T, "alt", w()), J(T, "loading", F()), _e(T, `opacity: ${e(X) ? 1 : 0};`);
      }), $("load", T, B), $("error", T, s), n(_, T);
    };
    R(z, (_) => {
      e(M) && !e(L) && _(r);
    });
  }
  var K = d(z, 2);
  {
    var ne = (_) => {
      var T = ct();
      n(_, T);
    };
    R(K, (_) => {
      e(L) && _(ne);
    });
  }
  Se(S, (_) => H(G, _), () => e(G)), f(() => {
    C(S, 1, `relative overflow-hidden ${Z() ?? ""}`), _e(S, `width: ${(typeof j() == "number" ? j() + "px" : j()) ?? ""}; height: ${(typeof m() == "number" ? m() + "px" : m()) ?? ""};`);
  }), n(se, S), he();
}
var mt = y('<div class="fixed bottom-4 left-4 p-4 rounded-lg text-xs font-mono z-50 max-w-xs" style="background-color: rgb(var(--color-surface-elevated)); color: rgb(var(--color-text));"><div class="flex items-center justify-between mb-2"><h3 class="font-bold"> </h3> <button class="hover:opacity-80" style="color: rgb(var(--color-text-secondary));">×</button></div> <div class="space-y-1"><div> </div> <div> </div> <div> </div> <div> </div> <div class="pt-1" style="border-top-color: rgb(var(--color-border));"><div class="font-semibold"> </div></div></div></div>');
function Yt(se, t) {
  ye(t, !1);
  let h = x(t, "isVisible", 12, !1), w = x(t, "showInDev", 8, !0), j = x(t, "title", 8, "Debug Panel"), m = ee({
    domContentLoaded: 0,
    loadComplete: 0,
    firstPaint: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0
  });
  Ie(() => {
    if (typeof window < "u" && "PerformanceObserver" in window) {
      const B = [], s = new PerformanceObserver((z) => {
        for (const r of z.getEntries())
          r.name === "first-paint" && oe(m, e(m).firstPaint = r.startTime);
      });
      s.observe({ entryTypes: ["paint"] }), B.push(s);
      const S = new PerformanceObserver((z) => {
        for (const r of z.getEntries())
          r.name === "first-contentful-paint" && oe(m, e(m).firstContentfulPaint = r.startTime);
      });
      S.observe({ entryTypes: ["paint"] }), B.push(S);
      const P = new PerformanceObserver((z) => {
        const r = z.getEntries(), K = r[r.length - 1];
        oe(m, e(m).largestContentfulPaint = K.startTime);
      });
      P.observe({ entryTypes: ["largest-contentful-paint"] }), B.push(P);
      const q = new PerformanceObserver((z) => {
        for (const r of z.getEntries())
          r.hadRecentInput || oe(m, e(m).cumulativeLayoutShift += r.value);
      });
      return q.observe({ entryTypes: ["layout-shift"] }), B.push(q), () => {
        B.forEach((z) => z.disconnect());
      };
    }
    const M = () => {
      oe(m, e(m).domContentLoaded = performance.now());
    }, G = () => {
      oe(m, e(m).loadComplete = performance.now());
    };
    return window.addEventListener("DOMContentLoaded", M), window.addEventListener("load", G), w(), () => {
      window.removeEventListener("DOMContentLoaded", M), window.removeEventListener("load", G);
    };
  });
  function F(M) {
    return `${Math.round(M)}ms`;
  }
  function Z() {
    const M = e(m).firstContentfulPaint, G = e(m).largestContentfulPaint, B = e(m).cumulativeLayoutShift;
    let s = 100;
    return M > 1800 && (s -= 20), G > 2500 && (s -= 30), B > 0.1 && (s -= 25), e(m).loadComplete > 3e3 && (s -= 25), s >= 90 ? "🟢 Excellent" : s >= 70 ? "🟡 Good" : s >= 50 ? "🟠 Needs Improvement" : "🔴 Poor";
  }
  ke();
  var V = xe(), X = ue(V);
  {
    var L = (M) => {
      var G = mt(), B = a(G), s = a(B), S = a(s), P = d(s, 2), q = d(B, 2), z = a(q), r = a(z), K = d(z, 2), ne = a(K), _ = d(K, 2), T = a(_), k = d(_, 2), I = a(k), U = d(k, 2), re = a(U), te = a(re);
      f(
        (O, g, v, c, o) => {
          A(S, j()), A(r, `FCP: ${O ?? ""}`), A(ne, `LCP: ${g ?? ""}`), A(T, `CLS: ${v ?? ""}`), A(I, `Load: ${c ?? ""}`), A(te, o);
        },
        [
          () => (e(m), W(() => F(e(m).firstContentfulPaint))),
          () => (e(m), W(() => F(e(m).largestContentfulPaint))),
          () => (e(m), W(() => e(m).cumulativeLayoutShift.toFixed(3))),
          () => (e(m), W(() => F(e(m).loadComplete))),
          () => W(Z)
        ]
      ), $("click", P, () => h(!1)), n(M, G);
    };
    R(X, (M) => {
      h() && M(L);
    });
  }
  n(se, V), he();
}
var ut = y('<span class="text-sm svelte-1nnpss" style="color: rgb(var(--color-text-secondary));"> </span>'), ft = y('<div class="flex justify-between items-center mb-2 svelte-1nnpss"><label class="text-sm font-medium svelte-1nnpss" style="color: rgb(var(--color-text));"> </label> <!></div>'), xt = y('<div class="absolute inset-0 flex items-center justify-center svelte-1nnpss"><span class="text-xs font-medium svelte-1nnpss" style="color: rgb(var(--color-text-inverse));"> </span></div>'), gt = y('<div class="relative svelte-1nnpss"><div><div role="progressbar" aria-valuemin="0"></div></div> <!></div>'), pt = y('<span style="color: rgb(var(--color-text));"> </span>'), bt = y('<div class="relative inline-block svelte-1nnpss"><svg viewBox="0 0 44 44" role="progressbar" aria-valuemin="0"><circle cx="22" cy="22" r="20" stroke="currentColor" stroke-width="4" fill="none" class="text-border svelte-1nnpss"></circle><circle cx="22" cy="22" r="20" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"></circle></svg> <div class="absolute inset-0 flex items-center justify-center svelte-1nnpss"><!></div></div>'), ht = y("<div><!> <!> <!></div>");
const yt = {
  hash: "svelte-1nnpss",
  code: `
    /* Striped animation */
    @keyframes svelte-1nnpss-stripes {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 40px 0;
        }
    }.bg-stripes.svelte-1nnpss {background-image:linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.15) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.15) 75%,
            transparent 75%,
            transparent
        );background-size:40px 40px;
        animation: svelte-1nnpss-stripes 1s linear infinite;}

    /* Smooth transitions */.progress-bar.svelte-1nnpss {transition:width 0.3s ease-out;}.progress-circle.svelte-1nnpss {transition:stroke-dashoffset 0.3s ease-out;}

    /* Focus styles for accessibility */[role="progressbar"].svelte-1nnpss:focus {outline:2px solid var(--color-primary-500);outline-offset:2px;}

    /* Animation for completion */.progress-complete.svelte-1nnpss {
        animation: svelte-1nnpss-progress-complete 0.5s ease-out;}

    @keyframes svelte-1nnpss-progress-complete {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }`
};
function Zt(se, t) {
  ye(t, !1), Me(se, yt);
  const h = ee(), w = ee(), j = ee(), m = ee(), F = ee();
  let Z = x(t, "value", 8, 0), V = x(t, "max", 8, 100), X = x(t, "size", 8, "md"), L = x(t, "variant", 8, "default"), M = x(t, "shape", 8, "linear"), G = x(t, "animated", 8, !0), B = x(t, "striped", 8, !1), s = x(t, "showValue", 8, !1), S = x(t, "label", 8, ""), P = x(t, "className", 8, "");
  const q = Be();
  let z = `progress-${Math.random().toString(36).substr(2, 9)}`;
  const r = {
    sm: { linear: "h-1", circular: "w-8 h-8", text: "text-xs" },
    md: { linear: "h-2", circular: "w-12 h-12", text: "text-sm" },
    lg: { linear: "h-3", circular: "w-16 h-16", text: "text-base" }
  }, K = {
    default: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
    info: "bg-info"
  }, ne = {
    default: "bg-surface-tertiary",
    success: "bg-success-surface",
    warning: "bg-warning-surface",
    error: "bg-error-surface",
    info: "bg-info-surface"
  };
  ie(() => (E(Z()), E(V())), () => {
    H(h, Math.min(Math.max(Z() / V() * 100, 0), 100));
  }), ie(() => e(h), () => {
    H(w, e(h) >= 100);
  }), ie(
    () => (e(w), E(Z()), E(V())),
    () => {
      e(w) && q("complete", { value: Z(), max: V() });
    }
  ), ie(() => E(M()), () => {
    H(j, M() === "circular" ? 2 * Math.PI * 20 : 0);
  }), ie(() => e(j), () => {
    H(m, e(j));
  }), ie(() => (e(j), e(h)), () => {
    H(F, e(j) - e(h) / 100 * e(j));
  }), Te(), ke();
  var _ = ht(), T = a(_);
  {
    var k = (O) => {
      var g = ft(), v = a(g), c = a(v), o = d(v, 2);
      {
        var u = (l) => {
          var D = ut(), Q = a(D);
          f((de) => A(Q, `${de ?? ""}%`), [
            () => (e(h), W(() => Math.round(e(h))))
          ]), n(l, D);
        };
        R(o, (l) => {
          s() && l(u);
        });
      }
      f(() => {
        J(v, "for", z), A(c, S());
      }), n(O, g);
    };
    R(T, (O) => {
      S() && O(k);
    });
  }
  var I = d(T, 2);
  {
    var U = (O) => {
      var g = gt(), v = a(g), c = a(v), o = d(v, 2);
      {
        var u = (l) => {
          var D = xt(), Q = a(D), de = a(Q);
          f((pe) => A(de, `${pe ?? ""}%`), [
            () => (e(h), W(() => Math.round(e(h))))
          ]), n(l, D);
        };
        R(o, (l) => {
          s() && X() === "lg" && l(u);
        });
      }
      f(
        (l) => {
          C(
            v,
            1,
            `
                w-full rounded-full overflow-hidden
                ${E(X()), W(() => r[X()].linear) ?? ""}
                ${E(L()), W(() => ne[L()]) ?? ""}
            `,
            "svelte-1nnpss"
          ), J(c, "id", z), C(
            c,
            1,
            `
                        h-full rounded-full transition-all duration-300 ease-out
                        ${E(L()), W(() => K[L()]) ?? ""}
                        ${G() ? "animate-pulse" : ""}
                        ${B() ? "bg-stripes" : ""}
                    `,
            "svelte-1nnpss"
          ), _e(c, `width: ${e(h) ?? ""}%`), J(c, "aria-valuenow", Z()), J(c, "aria-valuemax", V()), J(c, "aria-label", l);
        },
        [
          () => (E(S()), e(h), W(() => S() || `Progress: ${Math.round(e(h))}%`))
        ]
      ), n(O, g);
    }, re = (O) => {
      var g = xe(), v = ue(g);
      {
        var c = (o) => {
          var u = bt(), l = a(u), D = d(a(l)), Q = d(l, 2), de = a(Q);
          {
            var pe = (le) => {
              var ge = pt(), p = a(ge);
              f(
                (i) => {
                  C(
                    ge,
                    1,
                    `font-medium ${E(X()), W(() => r[X()].text) ?? ""}`,
                    "svelte-1nnpss"
                  ), A(p, `${i ?? ""}%`);
                },
                [
                  () => (e(h), W(() => Math.round(e(h))))
                ]
              ), n(le, ge);
            }, we = (le) => {
              var ge = xe(), p = ue(ge);
              ce(p, t, "center", {}, null), n(le, ge);
            };
            R(de, (le) => {
              s() ? le(pe) : le(we, !1);
            });
          }
          f(
            (le) => {
              J(l, "id", z), C(
                l,
                0,
                `transform -rotate-90 ${E(X()), W(() => r[X()].circular) ?? ""}`,
                "svelte-1nnpss"
              ), J(l, "aria-valuenow", Z()), J(l, "aria-valuemax", V()), J(l, "aria-label", le), J(D, "stroke-dasharray", e(m)), J(D, "stroke-dashoffset", e(F)), C(
                D,
                0,
                `
                        transition-all duration-300 ease-out
                        ${E(L()), W(() => K[L()]) ?? ""}
                        ${G() ? "animate-pulse" : ""}
                    `,
                "svelte-1nnpss"
              );
            },
            [
              () => (E(S()), e(h), W(() => S() || `Progress: ${Math.round(e(h))}%`))
            ]
          ), n(o, u);
        };
        R(
          v,
          (o) => {
            M() === "circular" && o(c);
          },
          !0
        );
      }
      n(O, g);
    };
    R(I, (O) => {
      M() === "linear" ? O(U) : O(re, !1);
    });
  }
  var te = d(I, 2);
  ce(te, t, "default", {}, null), f(() => C(_, 1, `progress-container ${P() ?? ""}`, "svelte-1nnpss")), n(se, _), he();
}
var wt = y('<div class="text-center"><div></div> <p class="text-xs text-tertiary"> </p></div>'), _t = y('<div class="text-center"><div></div> <p class="text-xs text-tertiary"> </p></div>'), kt = y('<div class="text-center"><div></div> <p class="text-xs text-tertiary"> </p></div>'), zt = y("<div></div>"), Ct = y("<div></div>"), jt = y("<div></div>"), St = y('<div class="flex items-center space-x-4"><span class="text-tertiary text-sm w-12"> </span> <span> </span></div>'), Tt = y('<div class="flex items-center space-x-4"><span class="text-tertiary text-sm w-12"> </span> <span class="text-secondary text-sm w-20"> </span> <div></div></div>'), Pt = y('<div class="text-center space-y-2"><div></div> <p class="text-xs text-tertiary"> </p></div>'), Lt = y('<div class="text-center space-y-2"><div></div> <p class="text-xs text-tertiary"> </p></div>'), Et = y('<div class="text-center space-y-2"><div></div> <p class="text-xs text-tertiary"> </p></div>'), Mt = y('<div class="min-h-screen bg-primary p-8"><div class="max-w-6xl mx-auto space-y-8"><div class="flex justify-between items-center mb-8"><div><h1 class="text-4xl font-bold text-primary mb-2">Tailwind Scale Demo</h1> <p class="text-lg text-secondary">Comprehensive scales supporting light and dark modes</p></div> <!></div> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Color Scales</h2> <div class="space-y-3"><h3 class="text-xl font-medium text-primary">Primary Scale</h3> <div class="grid grid-cols-11 gap-2"></div></div> <div class="space-y-3"><h3 class="text-xl font-medium text-primary">Secondary Scale</h3> <div class="grid grid-cols-11 gap-2"></div></div> <div class="space-y-3"><h3 class="text-xl font-medium text-primary">Neutral Scale</h3> <div class="grid grid-cols-11 gap-2"></div></div> <div class="space-y-3"><h3 class="text-xl font-medium text-primary">Semantic Colors</h3> <div class="grid grid-cols-3 gap-4"><div class="space-y-2"><h4 class="text-sm font-medium text-primary">Success</h4> <div class="grid grid-cols-5 gap-1"></div></div> <div class="space-y-2"><h4 class="text-sm font-medium text-primary">Warning</h4> <div class="grid grid-cols-5 gap-1"></div></div> <div class="space-y-2"><h4 class="text-sm font-medium text-primary">Error</h4> <div class="grid grid-cols-5 gap-1"></div></div></div></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Background & Surface Colors</h2> <div class="grid grid-cols-2 gap-6"><div class="space-y-4"><h3 class="text-xl font-medium text-primary">Background Colors</h3> <div class="space-y-3"><div class="bg-primary p-4 rounded-lg border border-primary"><p class="text-inverse font-medium">Primary Background</p> <p class="text-inverse text-sm opacity-80">bg-primary</p></div> <div class="bg-secondary p-4 rounded-lg border border-primary"><p class="text-primary font-medium">Secondary Background</p> <p class="text-secondary text-sm">bg-secondary</p></div> <div class="bg-tertiary p-4 rounded-lg border border-primary"><p class="text-primary font-medium">Tertiary Background</p> <p class="text-secondary text-sm">bg-tertiary</p></div></div></div> <div class="space-y-4"><h3 class="text-xl font-medium text-primary">Surface Colors</h3> <div class="space-y-3"><div class="bg-surface-primary p-4 rounded-lg border border-primary shadow-adaptive-sm"><p class="text-primary font-medium">Primary Surface</p> <p class="text-secondary text-sm">bg-surface-primary</p></div> <div class="bg-surface-secondary p-4 rounded-lg border border-primary shadow-adaptive-sm"><p class="text-primary font-medium">Secondary Surface</p> <p class="text-secondary text-sm">bg-surface-secondary</p></div> <div class="bg-surface-elevated p-4 rounded-lg border border-primary shadow-adaptive-md"><p class="text-primary font-medium">Elevated Surface</p> <p class="text-secondary text-sm">bg-surface-elevated</p></div></div></div></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Typography Scale</h2> <div class="space-y-4"></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Spacing Scale</h2> <div class="space-y-4"></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Border Radius Scale</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Shadow Scale</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-6"></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Animation Scale</h2> <div class="grid grid-cols-2 md:grid-cols-3 gap-4"></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Component Examples</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-4"><h3 class="text-xl font-medium text-primary">Cards</h3> <div class="space-y-3"><div class="card p-4"><h4 class="text-lg font-medium text-primary mb-2">Standard Card</h4> <p class="text-secondary">This is a standard card with adaptive styling.</p></div> <div class="card-elevated p-4"><h4 class="text-lg font-medium text-primary mb-2">Elevated Card</h4> <p class="text-secondary">This is an elevated card with more shadow.</p></div></div></div> <div class="space-y-4"><h3 class="text-xl font-medium text-primary">Buttons</h3> <div class="space-y-3"><button class="button-primary">Primary Button</button> <button class="button-secondary">Secondary Button</button> <div class="flex space-x-2"><button class="px-3 py-1 text-sm rounded-md transition-colors" style="background-color: rgb(var(--color-success)); color: rgb(var(--color-text-inverse));">Success</button> <button class="px-3 py-1 text-sm rounded-md transition-colors" style="background-color: rgb(var(--color-warning)); color: rgb(var(--color-text-inverse));">Warning</button> <button class="px-3 py-1 text-sm rounded-md transition-colors" style="background-color: rgb(var(--color-error)); color: rgb(var(--color-text-inverse));">Error</button></div></div></div></div></section></div></div>');
function qt(se) {
  var t = Mt(), h = a(t), w = a(h), j = d(a(w), 2);
  Xe(j, { size: "lg", variant: "outline" });
  var m = d(w, 2), F = d(a(m), 2), Z = d(a(F), 2);
  ve(Z, 4, () => [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], me, (g, v) => {
    var c = wt(), o = a(c), u = d(o, 2), l = a(u);
    f(() => {
      C(o, 1, `w-16 h-16 rounded-lg bg-primary-${v ?? ""} border border-primary mb-2`), A(l, v);
    }), n(g, c);
  });
  var V = d(F, 2), X = d(a(V), 2);
  ve(X, 4, () => [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], me, (g, v) => {
    var c = _t(), o = a(c), u = d(o, 2), l = a(u);
    f(() => {
      C(o, 1, `w-16 h-16 rounded-lg bg-secondary-${v ?? ""} border border-primary mb-2`), A(l, v);
    }), n(g, c);
  });
  var L = d(V, 2), M = d(a(L), 2);
  ve(M, 4, () => [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], me, (g, v) => {
    var c = kt(), o = a(c), u = d(o, 2), l = a(u);
    f(() => {
      C(o, 1, `w-16 h-16 rounded-lg bg-neutral-${v ?? ""} border border-primary mb-2`), A(l, v);
    }), n(g, c);
  });
  var G = d(L, 2), B = d(a(G), 2), s = a(B), S = d(a(s), 2);
  ve(S, 4, () => [400, 500, 600, 700, 800], me, (g, v) => {
    var c = zt();
    f(() => C(c, 1, `w-8 h-8 rounded bg-success-${v ?? ""} border border-primary`)), n(g, c);
  });
  var P = d(s, 2), q = d(a(P), 2);
  ve(q, 4, () => [400, 500, 600, 700, 800], me, (g, v) => {
    var c = Ct();
    f(() => C(c, 1, `w-8 h-8 rounded bg-warning-${v ?? ""} border border-primary`)), n(g, c);
  });
  var z = d(P, 2), r = d(a(z), 2);
  ve(r, 4, () => [400, 500, 600, 700, 800], me, (g, v) => {
    var c = jt();
    f(() => C(c, 1, `w-8 h-8 rounded bg-error-${v ?? ""} border border-primary`)), n(g, c);
  });
  var K = d(m, 4), ne = d(a(K), 2);
  ve(
    ne,
    4,
    () => [
      { size: "2xs", text: "Extra Small Text", class: "text-2xs" },
      { size: "xs", text: "Small Text", class: "text-xs" },
      { size: "sm", text: "Small Medium Text", class: "text-sm" },
      { size: "base", text: "Base Text", class: "text-base" },
      { size: "lg", text: "Large Text", class: "text-lg" },
      { size: "xl", text: "Extra Large Text", class: "text-xl" },
      { size: "2xl", text: "2X Large Text", class: "text-2xl" },
      { size: "3xl", text: "3X Large Text", class: "text-3xl" },
      { size: "4xl", text: "4X Large Text", class: "text-4xl" },
      { size: "5xl", text: "5X Large Text", class: "text-5xl" },
      { size: "6xl", text: "6X Large Text", class: "text-6xl" }
    ],
    me,
    (g, v) => {
      var c = St(), o = a(c), u = a(o), l = d(o, 2), D = a(l);
      f(() => {
        A(u, v.size), C(l, 1, `${v.class ?? ""} text-primary`), A(D, v.text);
      }), n(g, c);
    }
  );
  var _ = d(K, 2), T = d(a(_), 2);
  ve(
    T,
    4,
    () => [
      { size: "1", value: "0.25rem", class: "w-1" },
      { size: "2", value: "0.5rem", class: "w-2" },
      { size: "4", value: "1rem", class: "w-4" },
      { size: "8", value: "2rem", class: "w-8" },
      { size: "16", value: "4rem", class: "w-16" },
      { size: "32", value: "8rem", class: "w-32" },
      { size: "64", value: "16rem", class: "w-64" },
      { size: "128", value: "32rem", class: "w-128" },
      { size: "256", value: "64rem", class: "w-256" }
    ],
    me,
    (g, v) => {
      var c = Tt(), o = a(c), u = a(o), l = d(o, 2), D = a(l), Q = d(l, 2);
      f(() => {
        A(u, v.size), A(D, v.value), C(Q, 1, `${v.class ?? ""} h-4 bg-primary-500 rounded`);
      }), n(g, c);
    }
  );
  var k = d(_, 2), I = d(a(k), 2);
  ve(
    I,
    4,
    () => [
      { size: "none", class: "rounded-none" },
      { size: "sm", class: "rounded-sm" },
      { size: "DEFAULT", class: "rounded" },
      { size: "md", class: "rounded-md" },
      { size: "lg", class: "rounded-lg" },
      { size: "xl", class: "rounded-xl" },
      { size: "2xl", class: "rounded-2xl" },
      { size: "3xl", class: "rounded-3xl" },
      { size: "full", class: "rounded-full" }
    ],
    me,
    (g, v) => {
      var c = Pt(), o = a(c), u = d(o, 2), l = a(u);
      f(() => {
        C(o, 1, `w-16 h-16 bg-primary-500 ${v.class ?? ""} mx-auto`), A(l, v.size);
      }), n(g, c);
    }
  );
  var U = d(k, 2), re = d(a(U), 2);
  ve(
    re,
    4,
    () => [
      { name: "xs", class: "shadow-xs" },
      { name: "sm", class: "shadow-sm" },
      { name: "DEFAULT", class: "shadow" },
      { name: "md", class: "shadow-md" },
      { name: "lg", class: "shadow-lg" },
      { name: "xl", class: "shadow-xl" },
      { name: "2xl", class: "shadow-2xl" },
      { name: "Adaptive", class: "shadow-adaptive-lg" }
    ],
    me,
    (g, v) => {
      var c = Lt(), o = a(c), u = d(o, 2), l = a(u);
      f(() => {
        C(o, 1, `w-20 h-20 bg-surface-primary border border-primary ${v.class ?? ""} mx-auto`), A(l, v.name);
      }), n(g, c);
    }
  );
  var te = d(U, 2), O = d(a(te), 2);
  ve(
    O,
    4,
    () => [
      { name: "Fade In", class: "animate-fade-in" },
      { name: "Slide Up", class: "animate-slide-in-up" },
      { name: "Slide Down", class: "animate-slide-in-down" },
      { name: "Scale In", class: "animate-scale-in" },
      { name: "Bounce", class: "animate-bounce-gentle" },
      { name: "Pulse", class: "animate-pulse-slow" }
    ],
    me,
    (g, v) => {
      var c = Et(), o = a(c), u = d(o, 2), l = a(u);
      f(() => {
        C(o, 1, `w-16 h-16 bg-primary-500 rounded-lg ${v.class ?? ""} mx-auto`), A(l, v.name);
      }), n(g, c);
    }
  ), n(se, t);
}
var Bt = y("<div></div>");
function Ut(se, t) {
  let h = x(t, "width", 8, "100%"), w = x(t, "height", 8, "1rem"), j = x(t, "borderRadius", 8, "0.5rem"), m = x(t, "className", 8, "");
  var F = Bt();
  f(() => {
    C(F, 1, `animate-pulse ${m() ?? ""}`), _e(F, `width: ${h() ?? ""}; height: ${w() ?? ""}; border-radius: ${j() ?? ""}; background-color: rgb(var(--color-surface-secondary));`);
  }), n(se, F);
}
var It = y('<button type="button" class="inline-block svelte-13nzt82"><!></button>'), Dt = y('<div role="button" tabindex="0" class="inline-block svelte-13nzt82"><!></div>'), Ot = y("<div></div>"), At = y('<div role="tooltip"><div class="relative svelte-13nzt82"> <!></div></div>'), Nt = y("<!> <!>", 1);
const Rt = {
  hash: "svelte-13nzt82",
  code: `
    /* Ensure tooltip is above other elements */.tooltip-container {z-index:1000;}

    /* Smooth transitions */.tooltip-enter.svelte-13nzt82 {
        animation: svelte-13nzt82-tooltip-enter 0.2s ease-out;}.tooltip-exit.svelte-13nzt82 {
        animation: svelte-13nzt82-tooltip-exit 0.15s ease-in;}

    @keyframes svelte-13nzt82-tooltip-enter {
        0% {
            opacity: 0;
            transform: scale(0.95);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes svelte-13nzt82-tooltip-exit {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.95);
        }
    }

    /* Arrow positioning */.tooltip-arrow.svelte-13nzt82 {position:absolute;width:0;height:0;}`
};
function Jt(se, t) {
  ye(t, !1), Me(se, Rt);
  let h = x(t, "content", 8, ""), w = x(t, "placement", 8, "top"), j = x(t, "trigger", 8, "hover"), m = x(t, "disabled", 8, !1), F = x(t, "delay", 8, 200), Z = x(t, "maxWidth", 8, "200px"), V = x(t, "variant", 8, "default"), X = x(t, "size", 8, "md"), L = x(t, "arrow", 8, !0), M = x(t, "interactive", 8, !1), G = x(t, "className", 8, "");
  const B = Be();
  let s = ee(), S = ee(), P = ee(!1), q, z, r;
  const K = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  }, ne = {
    default: "bg-surface-elevated text-primary border-primary shadow-adaptive-lg",
    dark: "bg-surface text-inverse border-primary shadow-adaptive-lg",
    light: "bg-surface text-primary border-primary shadow-adaptive-lg",
    info: "bg-info text-inverse border-info shadow-adaptive-lg",
    success: "bg-success text-inverse border-success shadow-adaptive-lg",
    warning: "bg-warning text-inverse border-warning shadow-adaptive-lg",
    error: "bg-error text-inverse border-error shadow-adaptive-lg"
  };
  function _() {
    if (!e(S) || !e(s) || !De()) return { top: 0, left: 0 };
    const p = Ge();
    if (!p) return { top: 0, left: 0 };
    r = e(S).getBoundingClientRect();
    const i = e(s).getBoundingClientRect(), N = p.scrollY, b = p.scrollX, ze = p.innerWidth, Ce = p.innerHeight;
    let Y = 0, ae = 0;
    switch (w()) {
      case "top":
        Y = r.top + N - i.height - 8, ae = r.left + b + (r.width - i.width) / 2;
        break;
      case "top-start":
        Y = r.top + N - i.height - 8, ae = r.left + b;
        break;
      case "top-end":
        Y = r.top + N - i.height - 8, ae = r.right + b - i.width;
        break;
      case "bottom":
        Y = r.bottom + N + 8, ae = r.left + b + (r.width - i.width) / 2;
        break;
      case "bottom-start":
        Y = r.bottom + N + 8, ae = r.left + b;
        break;
      case "bottom-end":
        Y = r.bottom + N + 8, ae = r.right + b - i.width;
        break;
      case "left":
        Y = r.top + N + (r.height - i.height) / 2, ae = r.left + b - i.width - 8;
        break;
      case "left-start":
        Y = r.top + N, ae = r.left + b - i.width - 8;
        break;
      case "left-end":
        Y = r.bottom + N - i.height, ae = r.left + b - i.width - 8;
        break;
      case "right":
        Y = r.top + N + (r.height - i.height) / 2, ae = r.right + b + 8;
        break;
      case "right-start":
        Y = r.top + N, ae = r.right + b + 8;
        break;
      case "right-end":
        Y = r.bottom + N - i.height, ae = r.right + b + 8;
        break;
    }
    return ae < 8 && (ae = 8), ae + i.width > ze - 8 && (ae = ze - i.width - 8), Y < 8 && (Y = 8), Y + i.height > Ce + N - 8 && (Y = Ce + N - i.height - 8), { top: Y, left: ae };
  }
  function T(p) {
    m() || e(P) || (je(z), q = Oe(
      () => {
        if (H(P, !0), B("show", { event: p }), !Ee(() => {
          const N = _();
          e(s) && (oe(s, e(s).style.top = `${N.top}px`), oe(s, e(s).style.left = `${N.left}px`));
        })) {
          const N = _();
          e(s) && (oe(s, e(s).style.top = `${N.top}px`), oe(s, e(s).style.left = `${N.left}px`));
        }
      },
      F()
    ));
  }
  function k(p) {
    e(P) && (je(q), z = Oe(
      () => {
        H(P, !1), B("hide", { event: p });
      },
      M() ? 300 : 0
    ));
  }
  function I(p) {
    j() === "click" && (e(P) ? k(p) : T(p));
  }
  function U(p) {
    j() === "click" && (p.key === "Enter" || p.key === " ") && (p.preventDefault(), e(P) ? k(p) : T(p));
  }
  function re(p) {
    j() === "focus" && T(p);
  }
  function te(p) {
    j() === "focus" && k(p);
  }
  function O(p) {
    j() === "hover" && T(p);
  }
  function g(p) {
    j() === "hover" && k(p);
  }
  function v() {
    M() && clearTimeout(z);
  }
  function c(p) {
    M() && k(p);
  }
  function o() {
    m() || H(P, !0);
  }
  function u() {
    H(P, !1);
  }
  function l() {
    e(P) ? u() : o();
  }
  Ie(() => () => {
    je(q), je(z);
  }), ie(
    () => (e(P), e(s), Ee),
    () => {
      if (e(P) && e(s) && De() && !Ee(() => {
        const i = _();
        e(s) && (oe(s, e(s).style.top = `${i.top}px`), oe(s, e(s).style.left = `${i.left}px`));
      })) {
        const i = _();
        e(s) && (oe(s, e(s).style.top = `${i.top}px`), oe(s, e(s).style.left = `${i.left}px`));
      }
    }
  ), Te();
  var D = { show: o, hide: u, toggle: l };
  ke();
  var Q = Nt(), de = ue(Q);
  {
    var pe = (p) => {
      var i = It(), N = a(i);
      ce(N, t, "default", {}, null), Se(i, (b) => H(S, b), () => e(S)), f(() => J(i, "aria-describedby", e(P) ? "tooltip-{content}" : void 0)), $("click", i, (b) => I(b)), $("keydown", i, (b) => U(b)), $("focus", i, (b) => re(b)), $("blur", i, (b) => te(b)), $("mouseenter", i, (b) => O(b)), $("mouseleave", i, (b) => g(b)), n(p, i);
    }, we = (p) => {
      var i = Dt(), N = a(i);
      ce(N, t, "default", {}, null), Se(i, (b) => H(S, b), () => e(S)), f(() => J(i, "aria-describedby", e(P) ? "tooltip-{content}" : void 0)), $("click", i, (b) => I(b)), $("keydown", i, (b) => U(b)), $("focus", i, (b) => re(b)), $("blur", i, (b) => te(b)), $("mouseenter", i, (b) => O(b)), $("mouseleave", i, (b) => g(b)), n(p, i);
    };
    R(de, (p) => {
      j() === "click" ? p(pe) : p(we, !1);
    });
  }
  var le = d(de, 2);
  {
    var ge = (p) => {
      var i = At(), N = a(i), b = a(N), ze = d(b);
      {
        var Ce = (Y) => {
          var ae = Ot();
          f(
            (Ae, Ne, Re, Fe, We) => C(
              ae,
              1,
              `
                    absolute w-2 h-2 transform rotate-45
                    ${Ae ?? ""}
                    ${Ne ?? ""}
                    ${Re ?? ""}
                    ${Fe ?? ""}
                    ${We ?? ""}
                `,
              "svelte-13nzt82"
            ),
            [
              () => (E(V()), W(() => ne[V()].split(" ")[0])),
              () => (E(w()), W(() => w().includes("top") ? "bottom-[-4px] left-1/2 -translate-x-1/2" : "")),
              () => (E(w()), W(() => w().includes("bottom") ? "top-[-4px] left-1/2 -translate-x-1/2" : "")),
              () => (E(w()), W(() => w().includes("left") ? "right-[-4px] top-1/2 -translate-y-1/2" : "")),
              () => (E(w()), W(() => w().includes("right") ? "left-[-4px] top-1/2 -translate-y-1/2" : ""))
            ]
          ), n(Y, ae);
        };
        R(ze, (Y) => {
          L() && Y(Ce);
        });
      }
      Se(i, (Y) => H(s, Y), () => e(s)), f(() => {
        J(i, "id", `tooltip-${h() ?? ""}`), C(
          i,
          1,
          `
            fixed z-tooltip
            ${E(X()), W(() => K[X()]) ?? ""}
            ${E(V()), W(() => ne[V()]) ?? ""}
            border rounded-lg shadow-adaptive-lg
            ${G() ?? ""}
        `,
          "svelte-13nzt82"
        ), _e(i, `max-width: ${Z() ?? ""};`), A(b, `${h() ?? ""} `);
      }), $("mouseenter", i, v), $("mouseleave", i, c), He(3, i, () => Ve, () => ({
        x: w().includes("left") ? -10 : w().includes("right") ? 10 : 0,
        y: w().includes("top") ? -10 : w().includes("bottom") ? 10 : 0,
        duration: 200
      })), n(p, i);
    };
    R(le, (p) => {
      e(P) && h() && p(ge);
    });
  }
  return n(se, Q), Le(t, "show", o), Le(t, "hide", u), Le(t, "toggle", l), he(D);
}
export {
  Vt as B,
  Xt as H,
  Gt as O,
  Yt as P,
  qt as S,
  Jt as T,
  Zt as a,
  Ut as b
};
