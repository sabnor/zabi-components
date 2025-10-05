import { a as Pe, p as g, C as ie, D as Te, i as ke, f as h, c as N, g as s, h as he, j as ye, r as E, l as e, m as $, n as a, k as W, b as me, o as l, s as de, t as x, q as z, F as fe, e as Q, u as R, x as je, v as U, w as xe, Q as be, B as O, d as Ce, P as _e, R as ue, E as ce, S as ve, G as Se, y as Ne, z as Fe } from "./x-Dsi-CPO3.js";
import { createEventDispatcher as Le, onMount as Ee } from "svelte";
import { T as Re } from "./Toast-1EMgTOM4.js";
var We = h("<div></div>"), He = je('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" class="svelte-14njway"></path></svg>'), Ve = je('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" class="svelte-14njway"></path></svg>'), Xe = h('<button type="button"><!> <!> <!> <!></button> <button type="button" aria-label="Close badge"><svg class="w-full h-full text-current svelte-14njway" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" class="svelte-14njway"></path></svg></button>', 1), Ge = h("<div></div>"), Ye = je('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" class="svelte-14njway"></path></svg>'), Ze = je('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" class="svelte-14njway"></path></svg>'), qe = h("<span><!> <!> <!> <!></span>"), Ue = h('<div class="inline-flex items-center gap-1 svelte-14njway"><!></div>');
const Je = {
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
function Nt(ae, t) {
  ye(t, !1), Pe(ae, Je);
  const b = $(), y = $(), C = $(), u = $(), F = $(), Y = $(), H = $();
  let V = g(t, "variant", 8, "default"), P = g(t, "size", 8, "md"), M = g(t, "shape", 8, "rounded"), X = g(t, "dot", 8, !1), B = g(t, "closable", 8, !1), c = g(t, "icon", 8, void 0), T = g(t, "iconPosition", 8, "left");
  const S = Le();
  function Z(w) {
    const I = w;
    I.stopPropagation(), S("close", { event: I });
  }
  function k(w) {
    S("click", { event: w });
  }
  function r(w) {
    const I = w;
    (I.key === "Enter" || I.key === " ") && (I.preventDefault(), I.target === I.currentTarget ? k(w) : Z(w));
  }
  ie(() => {
  }, () => {
    W(b, {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base"
    });
  }), ie(() => {
  }, () => {
    W(y, {
      default: "bg-surface-secondary text-primary border border-primary",
      success: "bg-success-surface text-success-text border border-success/30",
      warning: "bg-warning-surface text-warning-text border border-warning/30",
      error: "bg-error-surface text-error-text border border-error/30",
      info: "bg-info-surface text-info-text border border-info/30",
      neutral: "bg-surface-tertiary text-secondary border border-secondary"
    });
  }), ie(() => {
  }, () => {
    W(C, {
      rounded: "rounded-md",
      pill: "rounded-full",
      square: "rounded-none"
    });
  }), ie(() => {
  }, () => {
    W(u, { sm: "w-1.5 h-1.5", md: "w-2 h-2", lg: "w-2.5 h-2.5" });
  }), ie(
    () => (e(b), E(P()), e(y), E(V()), e(C), E(M()), E(B())),
    () => {
      W(F, [
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
        e(b)[P()],
        e(y)[V()],
        e(C)[M()],
        B() ? "cursor-pointer hover:opacity-80" : ""
      ].join(" "));
    }
  ), ie(() => E(P()), () => {
    W(Y, [
      "flex-shrink-0",
      P() === "sm" ? "w-3 h-3" : P() === "md" ? "w-4 h-4" : "w-5 h-5"
    ].join(" "));
  }), ie(() => E(P()), () => {
    W(H, [
      "flex-shrink-0",
      "ml-1",
      "hover:bg-white/10",
      "rounded-full",
      "p-0.5",
      "transition-colors",
      "duration-150",
      "ease-in-out",
      P() === "sm" ? "w-3 h-3" : P() === "md" ? "w-4 h-4" : "w-5 h-5"
    ].join(" "));
  }), Te(), ke();
  var J = Ue(), ne = a(J);
  {
    var _ = (w) => {
      var I = Xe(), q = me(I), re = a(q);
      {
        var ee = (o) => {
          var D = We();
          x(() => z(
            D,
            1,
            `w-2 h-2 rounded-full bg-current ${e(u), E(P()), R(() => e(u)[P()]) ?? ""}`,
            "svelte-14njway"
          )), s(o, D);
        };
        N(re, (o) => {
          X() && o(ee);
        });
      }
      var A = l(re, 2);
      {
        var p = (o) => {
          var D = He(), K = a(D);
          x(() => {
            z(D, 0, `${e(Y) ?? ""} text-current`, "svelte-14njway"), U(K, "d", c());
          }), s(o, D);
        };
        N(A, (o) => {
          c() && T() === "left" && o(p);
        });
      }
      var v = l(A, 2);
      de(v, t, "default", {}, null);
      var d = l(v, 2);
      {
        var i = (o) => {
          var D = Ve(), K = a(D);
          x(() => {
            z(D, 0, `${e(Y) ?? ""} text-current`, "svelte-14njway"), U(K, "d", c());
          }), s(o, D);
        };
        N(d, (o) => {
          c() && T() === "right" && o(i);
        });
      }
      var f = l(q, 2);
      x(() => {
        z(q, 1, fe(e(F)), "svelte-14njway"), z(f, 1, fe(e(H)), "svelte-14njway");
      }), Q("click", q, k), Q("keydown", q, r), Q("click", f, Z), Q("keydown", f, r), s(w, I);
    }, j = (w) => {
      var I = qe(), q = a(I);
      {
        var re = (i) => {
          var f = Ge();
          x(() => z(
            f,
            1,
            `w-2 h-2 rounded-full bg-current ${e(u), E(P()), R(() => e(u)[P()]) ?? ""}`,
            "svelte-14njway"
          )), s(i, f);
        };
        N(q, (i) => {
          X() && i(re);
        });
      }
      var ee = l(q, 2);
      {
        var A = (i) => {
          var f = Ye(), o = a(f);
          x(() => {
            z(f, 0, `${e(Y) ?? ""} text-current`, "svelte-14njway"), U(o, "d", c());
          }), s(i, f);
        };
        N(ee, (i) => {
          c() && T() === "left" && i(A);
        });
      }
      var p = l(ee, 2);
      de(p, t, "default", {}, null);
      var v = l(p, 2);
      {
        var d = (i) => {
          var f = Ze(), o = a(f);
          x(() => {
            z(f, 0, `${e(Y) ?? ""} text-current`, "svelte-14njway"), U(o, "d", c());
          }), s(i, f);
        };
        N(v, (i) => {
          c() && T() === "right" && i(d);
        });
      }
      x(() => z(I, 1, fe(e(F)), "svelte-14njway")), s(w, I);
    };
    N(ne, (w) => {
      B() ? w(_) : w(j, !1);
    });
  }
  s(ae, J), he();
}
var Ke = h("<h1><!></h1>"), Qe = h("<h2><!></h2>"), $e = h("<h3><!></h3>"), et = h("<h4><!></h4>"), tt = h("<h5><!></h5>"), at = h("<h6><!></h6>");
function Ft(ae, t) {
  ye(t, !1);
  const b = $();
  let y = g(t, "level", 8, 1), C = g(t, "text", 8, ""), u = g(t, "color", 8, "text-text"), F = g(t, "spacing", 8, "normal");
  const Y = {
    1: "!text-6xl md:!text-7xl font-bold leading-tight block",
    2: "!text-4xl md:!text-5xl font-bold leading-tight block",
    3: "!text-3xl md:!text-4xl font-semibold leading-snug block",
    4: "!text-2xl md:!text-3xl font-semibold leading-snug block",
    5: "!text-xl md:!text-2xl font-medium leading-normal block",
    6: "!text-lg md:!text-xl font-medium leading-normal block"
  }, H = {
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
    () => (E(y()), E(u()), E(F())),
    () => {
      W(b, `${Y[y()]} font-title ${u()} ${H[F()][y()]}`);
    }
  ), Te();
  var V = xe(), P = me(V);
  {
    var M = (B) => {
      var c = Ke(), T = a(c);
      de(T, t, "default", {}, (S) => {
        var Z = be();
        x(() => O(Z, C())), s(S, Z);
      }), x(() => z(c, 1, fe(e(b)))), s(B, c);
    }, X = (B) => {
      var c = xe(), T = me(c);
      {
        var S = (k) => {
          var r = Qe(), J = a(r);
          de(J, t, "default", {}, (ne) => {
            var _ = be();
            x(() => O(_, C())), s(ne, _);
          }), x(() => z(r, 1, fe(e(b)))), s(k, r);
        }, Z = (k) => {
          var r = xe(), J = me(r);
          {
            var ne = (j) => {
              var w = $e(), I = a(w);
              de(I, t, "default", {}, (q) => {
                var re = be();
                x(() => O(re, C())), s(q, re);
              }), x(() => z(w, 1, fe(e(b)))), s(j, w);
            }, _ = (j) => {
              var w = xe(), I = me(w);
              {
                var q = (ee) => {
                  var A = et(), p = a(A);
                  de(p, t, "default", {}, (v) => {
                    var d = be();
                    x(() => O(d, C())), s(v, d);
                  }), x(() => z(A, 1, fe(e(b)))), s(ee, A);
                }, re = (ee) => {
                  var A = xe(), p = me(A);
                  {
                    var v = (i) => {
                      var f = tt(), o = a(f);
                      de(o, t, "default", {}, (D) => {
                        var K = be();
                        x(() => O(K, C())), s(D, K);
                      }), x(() => z(f, 1, fe(e(b)))), s(i, f);
                    }, d = (i) => {
                      var f = xe(), o = me(f);
                      {
                        var D = (K) => {
                          var le = at(), pe = a(le);
                          de(pe, t, "default", {}, (we) => {
                            var oe = be();
                            x(() => O(oe, C())), s(we, oe);
                          }), x(() => z(le, 1, fe(e(b)))), s(K, le);
                        };
                        N(
                          o,
                          (K) => {
                            y() === 6 && K(D);
                          },
                          !0
                        );
                      }
                      s(i, f);
                    };
                    N(
                      p,
                      (i) => {
                        y() === 5 ? i(v) : i(d, !1);
                      },
                      !0
                    );
                  }
                  s(ee, A);
                };
                N(
                  I,
                  (ee) => {
                    y() === 4 ? ee(q) : ee(re, !1);
                  },
                  !0
                );
              }
              s(j, w);
            };
            N(
              J,
              (j) => {
                y() === 3 ? j(ne) : j(_, !1);
              },
              !0
            );
          }
          s(k, r);
        };
        N(
          T,
          (k) => {
            y() === 2 ? k(S) : k(Z, !1);
          },
          !0
        );
      }
      s(B, c);
    };
    N(P, (B) => {
      y() === 1 ? B(M) : B(X, !1);
    });
  }
  s(ae, V), he();
}
var rt = h('<img alt="" class="absolute inset-0 w-full h-full object-cover animate-pulse"/>'), st = h('<img class="w-full h-full object-cover transition-opacity duration-300"/>'), nt = h('<div class="absolute inset-0 flex items-center justify-center" style="background-color: rgb(var(--color-surface-secondary)); color: rgb(var(--color-text-secondary));"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l2.586-2.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>'), it = h("<div><!> <!> <!></div>");
function Rt(ae, t) {
  ye(t, !1);
  let b = g(t, "src", 8), y = g(t, "alt", 8, ""), C = g(t, "width", 8, "100%"), u = g(t, "height", 8, "auto"), F = g(t, "loading", 8, "lazy"), Y = g(t, "className", 8, ""), H = g(t, "placeholder", 8, "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"), V = $(!1), P = $(!1), M = $(!1), X = $();
  Ee(() => {
    if (F() === "lazy") {
      const _ = new IntersectionObserver(
        (j) => {
          j.forEach((w) => {
            w.isIntersecting && (W(M, !0), _.unobserve(w.target));
          });
        },
        { rootMargin: "50px" }
      );
      return e(X) && _.observe(e(X)), () => _.disconnect();
    } else
      W(M, !0);
  });
  function B() {
    W(V, !0);
  }
  function c() {
    W(P, !0), console.warn("Failed to load image:", b());
  }
  ke();
  var T = it(), S = a(T);
  {
    var Z = (_) => {
      var j = rt();
      x(() => U(j, "src", H())), s(_, j);
    };
    N(S, (_) => {
      !e(V) && !e(P) && _(Z);
    });
  }
  var k = l(S, 2);
  {
    var r = (_) => {
      var j = st();
      x(() => {
        U(j, "src", b()), U(j, "alt", y()), U(j, "loading", F()), _e(j, `opacity: ${e(V) ? 1 : 0};`);
      }), Q("load", j, B), Q("error", j, c), s(_, j);
    };
    N(k, (_) => {
      e(M) && !e(P) && _(r);
    });
  }
  var J = l(k, 2);
  {
    var ne = (_) => {
      var j = nt();
      s(_, j);
    };
    N(J, (_) => {
      e(P) && _(ne);
    });
  }
  Ce(T, (_) => W(X, _), () => e(X)), x(() => {
    z(T, 1, `relative overflow-hidden ${Y() ?? ""}`), _e(T, `width: ${(typeof C() == "number" ? C() + "px" : C()) ?? ""}; height: ${(typeof u() == "number" ? u() + "px" : u()) ?? ""};`);
  }), s(ae, T), he();
}
var ot = h('<div class="fixed bottom-4 left-4 p-4 rounded-lg text-xs font-mono z-50 max-w-xs" style="background-color: rgb(var(--color-surface-elevated)); color: rgb(var(--color-text));"><div class="flex items-center justify-between mb-2"><h3 class="font-bold"> </h3> <button class="hover:opacity-80" style="color: rgb(var(--color-text-secondary));">×</button></div> <div class="space-y-1"><div> </div> <div> </div> <div> </div> <div> </div> <div class="pt-1" style="border-top-color: rgb(var(--color-border));"><div class="font-semibold"> </div></div></div></div>');
function Wt(ae, t) {
  ye(t, !1);
  let b = g(t, "isVisible", 12, !1), y = g(t, "showInDev", 8, !0), C = g(t, "title", 8, "Debug Panel"), u = $({
    domContentLoaded: 0,
    loadComplete: 0,
    firstPaint: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0
  });
  Ee(() => {
    if (typeof window < "u" && "PerformanceObserver" in window) {
      const B = [], c = new PerformanceObserver((k) => {
        for (const r of k.getEntries())
          r.name === "first-paint" && ue(u, e(u).firstPaint = r.startTime);
      });
      c.observe({ entryTypes: ["paint"] }), B.push(c);
      const T = new PerformanceObserver((k) => {
        for (const r of k.getEntries())
          r.name === "first-contentful-paint" && ue(u, e(u).firstContentfulPaint = r.startTime);
      });
      T.observe({ entryTypes: ["paint"] }), B.push(T);
      const S = new PerformanceObserver((k) => {
        const r = k.getEntries(), J = r[r.length - 1];
        ue(u, e(u).largestContentfulPaint = J.startTime);
      });
      S.observe({ entryTypes: ["largest-contentful-paint"] }), B.push(S);
      const Z = new PerformanceObserver((k) => {
        for (const r of k.getEntries())
          r.hadRecentInput || ue(u, e(u).cumulativeLayoutShift += r.value);
      });
      return Z.observe({ entryTypes: ["layout-shift"] }), B.push(Z), () => {
        B.forEach((k) => k.disconnect());
      };
    }
    const M = () => {
      ue(u, e(u).domContentLoaded = performance.now());
    }, X = () => {
      ue(u, e(u).loadComplete = performance.now());
    };
    return window.addEventListener("DOMContentLoaded", M), window.addEventListener("load", X), y(), () => {
      window.removeEventListener("DOMContentLoaded", M), window.removeEventListener("load", X);
    };
  });
  function F(M) {
    return `${Math.round(M)}ms`;
  }
  function Y() {
    const M = e(u).firstContentfulPaint, X = e(u).largestContentfulPaint, B = e(u).cumulativeLayoutShift;
    let c = 100;
    return M > 1800 && (c -= 20), X > 2500 && (c -= 30), B > 0.1 && (c -= 25), e(u).loadComplete > 3e3 && (c -= 25), c >= 90 ? "🟢 Excellent" : c >= 70 ? "🟡 Good" : c >= 50 ? "🟠 Needs Improvement" : "🔴 Poor";
  }
  ke();
  var H = xe(), V = me(H);
  {
    var P = (M) => {
      var X = ot(), B = a(X), c = a(B), T = a(c), S = l(c, 2), Z = l(B, 2), k = a(Z), r = a(k), J = l(k, 2), ne = a(J), _ = l(J, 2), j = a(_), w = l(_, 2), I = a(w), q = l(w, 2), re = a(q), ee = a(re);
      x(
        (A, p, v, d, i) => {
          O(T, C()), O(r, `FCP: ${A ?? ""}`), O(ne, `LCP: ${p ?? ""}`), O(j, `CLS: ${v ?? ""}`), O(I, `Load: ${d ?? ""}`), O(ee, i);
        },
        [
          () => (e(u), R(() => F(e(u).firstContentfulPaint))),
          () => (e(u), R(() => F(e(u).largestContentfulPaint))),
          () => (e(u), R(() => e(u).cumulativeLayoutShift.toFixed(3))),
          () => (e(u), R(() => F(e(u).loadComplete))),
          () => R(Y)
        ]
      ), Q("click", S, () => b(!1)), s(M, X);
    };
    N(V, (M) => {
      b() && M(P);
    });
  }
  s(ae, H), he();
}
var lt = h('<span class="text-sm svelte-1nnpss" style="color: rgb(var(--color-text-secondary));"> </span>'), dt = h('<div class="flex justify-between items-center mb-2 svelte-1nnpss"><label class="text-sm font-medium svelte-1nnpss" style="color: rgb(var(--color-text));"> </label> <!></div>'), ct = h('<div class="absolute inset-0 flex items-center justify-center svelte-1nnpss"><span class="text-xs font-medium svelte-1nnpss" style="color: rgb(var(--color-text-inverse));"> </span></div>'), vt = h('<div class="relative svelte-1nnpss"><div><div role="progressbar" aria-valuemin="0"></div></div> <!></div>'), mt = h('<span style="color: rgb(var(--color-text));"> </span>'), ut = h('<div class="relative inline-block svelte-1nnpss"><svg viewBox="0 0 44 44" role="progressbar" aria-valuemin="0"><circle cx="22" cy="22" r="20" stroke="currentColor" stroke-width="4" fill="none" class="text-border svelte-1nnpss"></circle><circle cx="22" cy="22" r="20" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"></circle></svg> <div class="absolute inset-0 flex items-center justify-center svelte-1nnpss"><!></div></div>'), ft = h("<div><!> <!> <!></div>");
const xt = {
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
function Ht(ae, t) {
  ye(t, !1), Pe(ae, xt);
  const b = $(), y = $(), C = $(), u = $(), F = $();
  let Y = g(t, "value", 8, 0), H = g(t, "max", 8, 100), V = g(t, "size", 8, "md"), P = g(t, "variant", 8, "default"), M = g(t, "shape", 8, "linear"), X = g(t, "animated", 8, !0), B = g(t, "striped", 8, !1), c = g(t, "showValue", 8, !1), T = g(t, "label", 8, ""), S = g(t, "className", 8, "");
  const Z = Le();
  let k = `progress-${Math.random().toString(36).substr(2, 9)}`;
  const r = {
    sm: { linear: "h-1", circular: "w-8 h-8", text: "text-xs" },
    md: { linear: "h-2", circular: "w-12 h-12", text: "text-sm" },
    lg: { linear: "h-3", circular: "w-16 h-16", text: "text-base" }
  }, J = {
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
  ie(() => (E(Y()), E(H())), () => {
    W(b, Math.min(Math.max(Y() / H() * 100, 0), 100));
  }), ie(() => e(b), () => {
    W(y, e(b) >= 100);
  }), ie(
    () => (e(y), E(Y()), E(H())),
    () => {
      e(y) && Z("complete", { value: Y(), max: H() });
    }
  ), ie(() => E(M()), () => {
    W(C, M() === "circular" ? 2 * Math.PI * 20 : 0);
  }), ie(() => e(C), () => {
    W(u, e(C));
  }), ie(() => (e(C), e(b)), () => {
    W(F, e(C) - e(b) / 100 * e(C));
  }), Te(), ke();
  var _ = ft(), j = a(_);
  {
    var w = (A) => {
      var p = dt(), v = a(p), d = a(v), i = l(v, 2);
      {
        var f = (o) => {
          var D = lt(), K = a(D);
          x((le) => O(K, `${le ?? ""}%`), [
            () => (e(b), R(() => Math.round(e(b))))
          ]), s(o, D);
        };
        N(i, (o) => {
          c() && o(f);
        });
      }
      x(() => {
        U(v, "for", k), O(d, T());
      }), s(A, p);
    };
    N(j, (A) => {
      T() && A(w);
    });
  }
  var I = l(j, 2);
  {
    var q = (A) => {
      var p = vt(), v = a(p), d = a(v), i = l(v, 2);
      {
        var f = (o) => {
          var D = ct(), K = a(D), le = a(K);
          x((pe) => O(le, `${pe ?? ""}%`), [
            () => (e(b), R(() => Math.round(e(b))))
          ]), s(o, D);
        };
        N(i, (o) => {
          c() && V() === "lg" && o(f);
        });
      }
      x(
        (o) => {
          z(
            v,
            1,
            `
                w-full rounded-full overflow-hidden
                ${E(V()), R(() => r[V()].linear) ?? ""}
                ${E(P()), R(() => ne[P()]) ?? ""}
            `,
            "svelte-1nnpss"
          ), U(d, "id", k), z(
            d,
            1,
            `
                        h-full rounded-full transition-all duration-300 ease-out
                        ${E(P()), R(() => J[P()]) ?? ""}
                        ${X() ? "animate-pulse" : ""}
                        ${B() ? "bg-stripes" : ""}
                    `,
            "svelte-1nnpss"
          ), _e(d, `width: ${e(b) ?? ""}%`), U(d, "aria-valuenow", Y()), U(d, "aria-valuemax", H()), U(d, "aria-label", o);
        },
        [
          () => (E(T()), e(b), R(() => T() || `Progress: ${Math.round(e(b))}%`))
        ]
      ), s(A, p);
    }, re = (A) => {
      var p = xe(), v = me(p);
      {
        var d = (i) => {
          var f = ut(), o = a(f), D = l(a(o)), K = l(o, 2), le = a(K);
          {
            var pe = (oe) => {
              var ge = mt(), n = a(ge);
              x(
                (m) => {
                  z(
                    ge,
                    1,
                    `font-medium ${E(V()), R(() => r[V()].text) ?? ""}`,
                    "svelte-1nnpss"
                  ), O(n, `${m ?? ""}%`);
                },
                [
                  () => (e(b), R(() => Math.round(e(b))))
                ]
              ), s(oe, ge);
            }, we = (oe) => {
              var ge = xe(), n = me(ge);
              de(n, t, "center", {}, null), s(oe, ge);
            };
            N(le, (oe) => {
              c() ? oe(pe) : oe(we, !1);
            });
          }
          x(
            (oe) => {
              U(o, "id", k), z(
                o,
                0,
                `transform -rotate-90 ${E(V()), R(() => r[V()].circular) ?? ""}`,
                "svelte-1nnpss"
              ), U(o, "aria-valuenow", Y()), U(o, "aria-valuemax", H()), U(o, "aria-label", oe), U(D, "stroke-dasharray", e(u)), U(D, "stroke-dashoffset", e(F)), z(
                D,
                0,
                `
                        transition-all duration-300 ease-out
                        ${E(P()), R(() => J[P()]) ?? ""}
                        ${X() ? "animate-pulse" : ""}
                    `,
                "svelte-1nnpss"
              );
            },
            [
              () => (E(T()), e(b), R(() => T() || `Progress: ${Math.round(e(b))}%`))
            ]
          ), s(i, f);
        };
        N(
          v,
          (i) => {
            M() === "circular" && i(d);
          },
          !0
        );
      }
      s(A, p);
    };
    N(I, (A) => {
      M() === "linear" ? A(q) : A(re, !1);
    });
  }
  var ee = l(I, 2);
  de(ee, t, "default", {}, null), x(() => z(_, 1, `progress-container ${S() ?? ""}`, "svelte-1nnpss")), s(ae, _), he();
}
var gt = h('<div class="text-center"><div></div> <p class="text-xs text-tertiary"> </p></div>'), pt = h('<div class="text-center"><div></div> <p class="text-xs text-tertiary"> </p></div>'), bt = h('<div class="text-center"><div></div> <p class="text-xs text-tertiary"> </p></div>'), ht = h("<div></div>"), yt = h("<div></div>"), wt = h("<div></div>"), _t = h('<div class="flex items-center space-x-4"><span class="text-tertiary text-sm w-12"> </span> <span> </span></div>'), kt = h('<div class="flex items-center space-x-4"><span class="text-tertiary text-sm w-12"> </span> <span class="text-secondary text-sm w-20"> </span> <div></div></div>'), zt = h('<div class="text-center space-y-2"><div></div> <p class="text-xs text-tertiary"> </p></div>'), Ct = h('<div class="text-center space-y-2"><div></div> <p class="text-xs text-tertiary"> </p></div>'), Tt = h('<div class="text-center space-y-2"><div></div> <p class="text-xs text-tertiary"> </p></div>'), jt = h('<div class="min-h-screen bg-primary p-8"><div class="max-w-6xl mx-auto space-y-8"><div class="flex justify-between items-center mb-8"><div><h1 class="text-4xl font-bold text-primary mb-2">Tailwind Scale Demo</h1> <p class="text-lg text-secondary">Comprehensive scales supporting light and dark modes</p></div> <!></div> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Color Scales</h2> <div class="space-y-3"><h3 class="text-xl font-medium text-primary">Primary Scale</h3> <div class="grid grid-cols-11 gap-2"></div></div> <div class="space-y-3"><h3 class="text-xl font-medium text-primary">Secondary Scale</h3> <div class="grid grid-cols-11 gap-2"></div></div> <div class="space-y-3"><h3 class="text-xl font-medium text-primary">Neutral Scale</h3> <div class="grid grid-cols-11 gap-2"></div></div> <div class="space-y-3"><h3 class="text-xl font-medium text-primary">Semantic Colors</h3> <div class="grid grid-cols-3 gap-4"><div class="space-y-2"><h4 class="text-sm font-medium text-primary">Success</h4> <div class="grid grid-cols-5 gap-1"></div></div> <div class="space-y-2"><h4 class="text-sm font-medium text-primary">Warning</h4> <div class="grid grid-cols-5 gap-1"></div></div> <div class="space-y-2"><h4 class="text-sm font-medium text-primary">Error</h4> <div class="grid grid-cols-5 gap-1"></div></div></div></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Background & Surface Colors</h2> <div class="grid grid-cols-2 gap-6"><div class="space-y-4"><h3 class="text-xl font-medium text-primary">Background Colors</h3> <div class="space-y-3"><div class="bg-primary p-4 rounded-lg border border-primary"><p class="text-inverse font-medium">Primary Background</p> <p class="text-inverse text-sm opacity-80">bg-primary</p></div> <div class="bg-secondary p-4 rounded-lg border border-primary"><p class="text-primary font-medium">Secondary Background</p> <p class="text-secondary text-sm">bg-secondary</p></div> <div class="bg-tertiary p-4 rounded-lg border border-primary"><p class="text-primary font-medium">Tertiary Background</p> <p class="text-secondary text-sm">bg-tertiary</p></div></div></div> <div class="space-y-4"><h3 class="text-xl font-medium text-primary">Surface Colors</h3> <div class="space-y-3"><div class="bg-surface-primary p-4 rounded-lg border border-primary shadow-adaptive-sm"><p class="text-primary font-medium">Primary Surface</p> <p class="text-secondary text-sm">bg-surface-primary</p></div> <div class="bg-surface-secondary p-4 rounded-lg border border-primary shadow-adaptive-sm"><p class="text-primary font-medium">Secondary Surface</p> <p class="text-secondary text-sm">bg-surface-secondary</p></div> <div class="bg-surface-elevated p-4 rounded-lg border border-primary shadow-adaptive-md"><p class="text-primary font-medium">Elevated Surface</p> <p class="text-secondary text-sm">bg-surface-elevated</p></div></div></div></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Typography Scale</h2> <div class="space-y-4"></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Spacing Scale</h2> <div class="space-y-4"></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Border Radius Scale</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Shadow Scale</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-6"></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Animation Scale</h2> <div class="grid grid-cols-2 md:grid-cols-3 gap-4"></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Component Examples</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-4"><h3 class="text-xl font-medium text-primary">Cards</h3> <div class="space-y-3"><div class="card p-4"><h4 class="text-lg font-medium text-primary mb-2">Standard Card</h4> <p class="text-secondary">This is a standard card with adaptive styling.</p></div> <div class="card-elevated p-4"><h4 class="text-lg font-medium text-primary mb-2">Elevated Card</h4> <p class="text-secondary">This is an elevated card with more shadow.</p></div></div></div> <div class="space-y-4"><h3 class="text-xl font-medium text-primary">Buttons</h3> <div class="space-y-3"><button class="button-primary">Primary Button</button> <button class="button-secondary">Secondary Button</button> <div class="flex space-x-2"><button class="px-3 py-1 text-sm rounded-md transition-colors" style="background-color: rgb(var(--color-success)); color: rgb(var(--color-text-inverse));">Success</button> <button class="px-3 py-1 text-sm rounded-md transition-colors" style="background-color: rgb(var(--color-warning)); color: rgb(var(--color-text-inverse));">Warning</button> <button class="px-3 py-1 text-sm rounded-md transition-colors" style="background-color: rgb(var(--color-error)); color: rgb(var(--color-text-inverse));">Error</button></div></div></div></div></section></div></div>');
function Vt(ae) {
  var t = jt(), b = a(t), y = a(b), C = l(a(y), 2);
  Re(C, { size: "lg", variant: "outline" });
  var u = l(y, 2), F = l(a(u), 2), Y = l(a(F), 2);
  ce(Y, 4, () => [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], ve, (p, v) => {
    var d = gt(), i = a(d), f = l(i, 2), o = a(f);
    x(() => {
      z(i, 1, `w-16 h-16 rounded-lg bg-primary-${v ?? ""} border border-primary mb-2`), O(o, v);
    }), s(p, d);
  });
  var H = l(F, 2), V = l(a(H), 2);
  ce(V, 4, () => [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], ve, (p, v) => {
    var d = pt(), i = a(d), f = l(i, 2), o = a(f);
    x(() => {
      z(i, 1, `w-16 h-16 rounded-lg bg-secondary-${v ?? ""} border border-primary mb-2`), O(o, v);
    }), s(p, d);
  });
  var P = l(H, 2), M = l(a(P), 2);
  ce(M, 4, () => [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], ve, (p, v) => {
    var d = bt(), i = a(d), f = l(i, 2), o = a(f);
    x(() => {
      z(i, 1, `w-16 h-16 rounded-lg bg-neutral-${v ?? ""} border border-primary mb-2`), O(o, v);
    }), s(p, d);
  });
  var X = l(P, 2), B = l(a(X), 2), c = a(B), T = l(a(c), 2);
  ce(T, 4, () => [400, 500, 600, 700, 800], ve, (p, v) => {
    var d = ht();
    x(() => z(d, 1, `w-8 h-8 rounded bg-success-${v ?? ""} border border-primary`)), s(p, d);
  });
  var S = l(c, 2), Z = l(a(S), 2);
  ce(Z, 4, () => [400, 500, 600, 700, 800], ve, (p, v) => {
    var d = yt();
    x(() => z(d, 1, `w-8 h-8 rounded bg-warning-${v ?? ""} border border-primary`)), s(p, d);
  });
  var k = l(S, 2), r = l(a(k), 2);
  ce(r, 4, () => [400, 500, 600, 700, 800], ve, (p, v) => {
    var d = wt();
    x(() => z(d, 1, `w-8 h-8 rounded bg-error-${v ?? ""} border border-primary`)), s(p, d);
  });
  var J = l(u, 4), ne = l(a(J), 2);
  ce(
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
    ve,
    (p, v) => {
      var d = _t(), i = a(d), f = a(i), o = l(i, 2), D = a(o);
      x(() => {
        O(f, v.size), z(o, 1, `${v.class ?? ""} text-primary`), O(D, v.text);
      }), s(p, d);
    }
  );
  var _ = l(J, 2), j = l(a(_), 2);
  ce(
    j,
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
    ve,
    (p, v) => {
      var d = kt(), i = a(d), f = a(i), o = l(i, 2), D = a(o), K = l(o, 2);
      x(() => {
        O(f, v.size), O(D, v.value), z(K, 1, `${v.class ?? ""} h-4 bg-primary-500 rounded`);
      }), s(p, d);
    }
  );
  var w = l(_, 2), I = l(a(w), 2);
  ce(
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
    ve,
    (p, v) => {
      var d = zt(), i = a(d), f = l(i, 2), o = a(f);
      x(() => {
        z(i, 1, `w-16 h-16 bg-primary-500 ${v.class ?? ""} mx-auto`), O(o, v.size);
      }), s(p, d);
    }
  );
  var q = l(w, 2), re = l(a(q), 2);
  ce(
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
    ve,
    (p, v) => {
      var d = Ct(), i = a(d), f = l(i, 2), o = a(f);
      x(() => {
        z(i, 1, `w-20 h-20 bg-surface-primary border border-primary ${v.class ?? ""} mx-auto`), O(o, v.name);
      }), s(p, d);
    }
  );
  var ee = l(q, 2), A = l(a(ee), 2);
  ce(
    A,
    4,
    () => [
      { name: "Fade In", class: "animate-fade-in" },
      { name: "Slide Up", class: "animate-slide-in-up" },
      { name: "Slide Down", class: "animate-slide-in-down" },
      { name: "Scale In", class: "animate-scale-in" },
      { name: "Bounce", class: "animate-bounce-gentle" },
      { name: "Pulse", class: "animate-pulse-slow" }
    ],
    ve,
    (p, v) => {
      var d = Tt(), i = a(d), f = l(i, 2), o = a(f);
      x(() => {
        z(i, 1, `w-16 h-16 bg-primary-500 rounded-lg ${v.class ?? ""} mx-auto`), O(o, v.name);
      }), s(p, d);
    }
  ), s(ae, t);
}
var St = h("<div></div>");
function Xt(ae, t) {
  let b = g(t, "width", 8, "100%"), y = g(t, "height", 8, "1rem"), C = g(t, "borderRadius", 8, "0.5rem"), u = g(t, "className", 8, "");
  var F = St();
  x(() => {
    z(F, 1, `animate-pulse ${u() ?? ""}`), _e(F, `width: ${b() ?? ""}; height: ${y() ?? ""}; border-radius: ${C() ?? ""}; background-color: rgb(var(--color-surface-secondary));`);
  }), s(ae, F);
}
var Pt = h('<button type="button" class="inline-block svelte-13nzt82"><!></button>'), Lt = h('<div role="button" tabindex="0" class="inline-block svelte-13nzt82"><!></div>'), Et = h("<div></div>"), Mt = h('<div role="tooltip"><div class="relative svelte-13nzt82"> <!></div></div>'), Bt = h("<!> <!>", 1);
const It = {
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
function Gt(ae, t) {
  ye(t, !1), Pe(ae, It);
  let b = g(t, "content", 8, ""), y = g(t, "placement", 8, "top"), C = g(t, "trigger", 8, "hover"), u = g(t, "disabled", 8, !1), F = g(t, "delay", 8, 200), Y = g(t, "maxWidth", 8, "200px"), H = g(t, "variant", 8, "default"), V = g(t, "size", 8, "md"), P = g(t, "arrow", 8, !0), M = g(t, "interactive", 8, !1), X = g(t, "className", 8, "");
  const B = Le();
  let c = $(), T = $(), S = $(!1), Z, k, r;
  const J = {
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
    if (!e(T) || !e(c)) return { top: 0, left: 0 };
    r = e(T).getBoundingClientRect();
    const n = e(c).getBoundingClientRect(), m = window.scrollY, se = window.scrollX, L = window.innerWidth, ze = window.innerHeight;
    let te = 0, G = 0;
    switch (y()) {
      case "top":
        te = r.top + m - n.height - 8, G = r.left + se + (r.width - n.width) / 2;
        break;
      case "top-start":
        te = r.top + m - n.height - 8, G = r.left + se;
        break;
      case "top-end":
        te = r.top + m - n.height - 8, G = r.right + se - n.width;
        break;
      case "bottom":
        te = r.bottom + m + 8, G = r.left + se + (r.width - n.width) / 2;
        break;
      case "bottom-start":
        te = r.bottom + m + 8, G = r.left + se;
        break;
      case "bottom-end":
        te = r.bottom + m + 8, G = r.right + se - n.width;
        break;
      case "left":
        te = r.top + m + (r.height - n.height) / 2, G = r.left + se - n.width - 8;
        break;
      case "left-start":
        te = r.top + m, G = r.left + se - n.width - 8;
        break;
      case "left-end":
        te = r.bottom + m - n.height, G = r.left + se - n.width - 8;
        break;
      case "right":
        te = r.top + m + (r.height - n.height) / 2, G = r.right + se + 8;
        break;
      case "right-start":
        te = r.top + m, G = r.right + se + 8;
        break;
      case "right-end":
        te = r.bottom + m - n.height, G = r.right + se + 8;
        break;
    }
    return G < 8 && (G = 8), G + n.width > L - 8 && (G = L - n.width - 8), te < 8 && (te = 8), te + n.height > ze + m - 8 && (te = ze + m - n.height - 8), { top: te, left: G };
  }
  function j(n) {
    u() || e(S) || (clearTimeout(k), Z = setTimeout(
      () => {
        W(S, !0), B("show", { event: n }), requestAnimationFrame(() => {
          const m = _();
          e(c) && (ue(c, e(c).style.top = `${m.top}px`), ue(c, e(c).style.left = `${m.left}px`));
        });
      },
      F()
    ));
  }
  function w(n) {
    e(S) && (clearTimeout(Z), k = setTimeout(
      () => {
        W(S, !1), B("hide", { event: n });
      },
      M() ? 300 : 0
    ));
  }
  function I(n) {
    C() === "click" && (e(S) ? w(n) : j(n));
  }
  function q(n) {
    C() === "click" && (n.key === "Enter" || n.key === " ") && (n.preventDefault(), e(S) ? w(n) : j(n));
  }
  function re(n) {
    C() === "focus" && j(n);
  }
  function ee(n) {
    C() === "focus" && w(n);
  }
  function A(n) {
    C() === "hover" && j(n);
  }
  function p(n) {
    C() === "hover" && w(n);
  }
  function v() {
    M() && clearTimeout(k);
  }
  function d(n) {
    M() && w(n);
  }
  function i() {
    u() || W(S, !0);
  }
  function f() {
    W(S, !1);
  }
  function o() {
    e(S) ? f() : i();
  }
  Ee(() => () => {
    clearTimeout(Z), clearTimeout(k);
  }), ie(() => (e(S), e(c)), () => {
    e(S) && e(c) && requestAnimationFrame(() => {
      const n = _();
      ue(c, e(c).style.top = `${n.top}px`), ue(c, e(c).style.left = `${n.left}px`);
    });
  }), Te();
  var D = { show: i, hide: f, toggle: o };
  ke();
  var K = Bt(), le = me(K);
  {
    var pe = (n) => {
      var m = Pt(), se = a(m);
      de(se, t, "default", {}, null), Ce(m, (L) => W(T, L), () => e(T)), x(() => U(m, "aria-describedby", e(S) ? "tooltip-{content}" : void 0)), Q("click", m, (L) => I(L)), Q("keydown", m, (L) => q(L)), Q("focus", m, (L) => re(L)), Q("blur", m, (L) => ee(L)), Q("mouseenter", m, (L) => A(L)), Q("mouseleave", m, (L) => p(L)), s(n, m);
    }, we = (n) => {
      var m = Lt(), se = a(m);
      de(se, t, "default", {}, null), Ce(m, (L) => W(T, L), () => e(T)), x(() => U(m, "aria-describedby", e(S) ? "tooltip-{content}" : void 0)), Q("click", m, (L) => I(L)), Q("keydown", m, (L) => q(L)), Q("focus", m, (L) => re(L)), Q("blur", m, (L) => ee(L)), Q("mouseenter", m, (L) => A(L)), Q("mouseleave", m, (L) => p(L)), s(n, m);
    };
    N(le, (n) => {
      C() === "click" ? n(pe) : n(we, !1);
    });
  }
  var oe = l(le, 2);
  {
    var ge = (n) => {
      var m = Mt(), se = a(m), L = a(se), ze = l(L);
      {
        var te = (G) => {
          var Me = Et();
          x(
            (Be, Ie, De, Ae, Oe) => z(
              Me,
              1,
              `
                    absolute w-2 h-2 transform rotate-45
                    ${Be ?? ""}
                    ${Ie ?? ""}
                    ${De ?? ""}
                    ${Ae ?? ""}
                    ${Oe ?? ""}
                `,
              "svelte-13nzt82"
            ),
            [
              () => (E(H()), R(() => ne[H()].split(" ")[0])),
              () => (E(y()), R(() => y().includes("top") ? "bottom-[-4px] left-1/2 -translate-x-1/2" : "")),
              () => (E(y()), R(() => y().includes("bottom") ? "top-[-4px] left-1/2 -translate-x-1/2" : "")),
              () => (E(y()), R(() => y().includes("left") ? "right-[-4px] top-1/2 -translate-y-1/2" : "")),
              () => (E(y()), R(() => y().includes("right") ? "left-[-4px] top-1/2 -translate-y-1/2" : ""))
            ]
          ), s(G, Me);
        };
        N(ze, (G) => {
          P() && G(te);
        });
      }
      Ce(m, (G) => W(c, G), () => e(c)), x(() => {
        U(m, "id", `tooltip-${b() ?? ""}`), z(
          m,
          1,
          `
            fixed z-tooltip
            ${E(V()), R(() => J[V()]) ?? ""}
            ${E(H()), R(() => ne[H()]) ?? ""}
            border rounded-lg shadow-adaptive-lg
            ${X() ?? ""}
        `,
          "svelte-13nzt82"
        ), _e(m, `max-width: ${Y() ?? ""};`), O(L, `${b() ?? ""} `);
      }), Q("mouseenter", m, v), Q("mouseleave", m, d), Ne(3, m, () => Fe, () => ({
        x: y().includes("left") ? -10 : y().includes("right") ? 10 : 0,
        y: y().includes("top") ? -10 : y().includes("bottom") ? 10 : 0,
        duration: 200
      })), s(n, m);
    };
    N(oe, (n) => {
      e(S) && b() && n(ge);
    });
  }
  return s(ae, K), Se(t, "show", i), Se(t, "hide", f), Se(t, "toggle", o), he(D);
}
export {
  Nt as B,
  Ft as H,
  Rt as O,
  Wt as P,
  Vt as S,
  Gt as T,
  Ht as a,
  Xt as b
};
