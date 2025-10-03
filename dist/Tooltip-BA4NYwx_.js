import { a as Te, p as u, C as ie, D as ze, i as we, f as _, c as H, g as r, h as pe, j as he, r as C, l as e, m as Y, n as a, k as O, b as ue, o as i, s as ne, t as p, q as S, F as oe, e as R, u as X, x as Se, v as J, _ as Fe, w as xe, W as ye, B as W, d as je, P as ke, $ as me, E as ce, Z as ve, G as Le, y as qe, z as Re } from "./x-DpVwziig.js";
import { createEventDispatcher as Pe, onMount as Be } from "svelte";
import { T as We } from "./Toast-DXZ9gllw.js";
var He = _("<div></div>"), Oe = Se('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" class="svelte-14njway"></path></svg>'), Ve = Se('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" class="svelte-14njway"></path></svg>'), Xe = _('<button type="button"><!> <!> <!> <!></button> <button type="button" aria-label="Close badge"><svg class="w-full h-full svelte-14njway" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" class="svelte-14njway"></path></svg></button>', 1), Ze = _("<div></div>"), Ge = Se('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" class="svelte-14njway"></path></svg>'), Ye = Se('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" class="svelte-14njway"></path></svg>'), Ue = _("<span><!> <!> <!> <!></span>"), Je = _('<div class="inline-flex items-center gap-1 svelte-14njway"><!></div>');
const Ke = {
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
function Ht(K, t) {
  he(t, !1), Te(K, Ke);
  const y = Y(), w = Y(), j = Y(), m = Y(), L = Y(), B = Y(), F = Y();
  let q = u(t, "variant", 8, "default"), T = u(t, "size", 8, "md"), k = u(t, "shape", 8, "rounded"), P = u(t, "dot", 8, !1), D = u(t, "closable", 8, !1), d = u(t, "icon", 8, void 0), E = u(t, "iconPosition", 8, "left");
  const M = Pe();
  function Q(g) {
    g.stopPropagation(), M("close", { event: g });
  }
  function A(g) {
    M("click", { event: g });
  }
  ie(() => {
  }, () => {
    O(y, {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base"
    });
  }), ie(() => {
  }, () => {
    O(w, {
      default: "bg-surface-secondary text-primary border border-primary",
      success: "bg-success-surface text-success-text border border-success/30",
      warning: "bg-warning-surface text-warning-text border border-warning/30",
      error: "bg-error-surface text-error-text border border-error/30",
      info: "bg-info-surface text-info-text border border-info/30",
      neutral: "bg-surface-tertiary text-secondary border border-secondary"
    });
  }), ie(() => {
  }, () => {
    O(j, {
      rounded: "rounded-md",
      pill: "rounded-full",
      square: "rounded-none"
    });
  }), ie(() => {
  }, () => {
    O(m, { sm: "w-1.5 h-1.5", md: "w-2 h-2", lg: "w-2.5 h-2.5" });
  }), ie(
    () => (e(y), C(T()), e(w), C(q()), e(j), C(k()), C(D())),
    () => {
      O(L, [
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
        e(y)[T()],
        e(w)[q()],
        e(j)[k()],
        D() ? "cursor-pointer hover:opacity-80" : ""
      ].join(" "));
    }
  ), ie(() => C(T()), () => {
    O(B, [
      "flex-shrink-0",
      T() === "sm" ? "w-3 h-3" : T() === "md" ? "w-4 h-4" : "w-5 h-5"
    ].join(" "));
  }), ie(() => C(T()), () => {
    O(F, [
      "flex-shrink-0",
      "ml-1",
      "hover:bg-white/10",
      "rounded-full",
      "p-0.5",
      "transition-colors",
      "duration-150",
      "ease-in-out",
      T() === "sm" ? "w-3 h-3" : T() === "md" ? "w-4 h-4" : "w-5 h-5"
    ].join(" "));
  }), ze(), we();
  var f = Je(), N = a(f);
  {
    var te = (g) => {
      var I = Xe(), V = ue(I), $ = a(V);
      {
        var ee = (o) => {
          var v = He();
          p(() => S(
            v,
            1,
            `w-2 h-2 rounded-full bg-current ${e(m), C(T()), X(() => e(m)[T()]) ?? ""}`,
            "svelte-14njway"
          )), r(o, v);
        };
        H($, (o) => {
          P() && o(ee);
        });
      }
      var U = i($, 2);
      {
        var b = (o) => {
          var v = Oe(), Z = a(v);
          p(() => {
            S(v, 0, oe(e(B)), "svelte-14njway"), J(Z, "d", d());
          }), r(o, v);
        };
        H(U, (o) => {
          d() && E() === "left" && o(b);
        });
      }
      var h = i(U, 2);
      ne(h, t, "default", {}, null);
      var c = i(h, 2);
      {
        var s = (o) => {
          var v = Ve(), Z = a(v);
          p(() => {
            S(v, 0, oe(e(B)), "svelte-14njway"), J(Z, "d", d());
          }), r(o, v);
        };
        H(c, (o) => {
          d() && E() === "right" && o(s);
        });
      }
      var n = i(V, 2);
      p(() => {
        S(V, 1, oe(e(L)), "svelte-14njway"), S(n, 1, oe(e(F)), "svelte-14njway");
      }), R("click", V, A), R("keydown", V, (o) => o.key === "Enter" && A(o)), R("click", n, Q), R("keydown", n, (o) => o.key === "Enter" && Q(o)), r(g, I);
    }, z = (g) => {
      var I = Ue(), V = a(I);
      {
        var $ = (s) => {
          var n = Ze();
          p(() => S(
            n,
            1,
            `w-2 h-2 rounded-full bg-current ${e(m), C(T()), X(() => e(m)[T()]) ?? ""}`,
            "svelte-14njway"
          )), r(s, n);
        };
        H(V, (s) => {
          P() && s($);
        });
      }
      var ee = i(V, 2);
      {
        var U = (s) => {
          var n = Ge(), o = a(n);
          p(() => {
            S(n, 0, oe(e(B)), "svelte-14njway"), J(o, "d", d());
          }), r(s, n);
        };
        H(ee, (s) => {
          d() && E() === "left" && s(U);
        });
      }
      var b = i(ee, 2);
      ne(b, t, "default", {}, null);
      var h = i(b, 2);
      {
        var c = (s) => {
          var n = Ye(), o = a(n);
          p(() => {
            S(n, 0, oe(e(B)), "svelte-14njway"), J(o, "d", d());
          }), r(s, n);
        };
        H(h, (s) => {
          d() && E() === "right" && s(c);
        });
      }
      p(() => S(I, 1, oe(e(L)), "svelte-14njway")), r(g, I);
    };
    H(N, (g) => {
      D() ? g(te) : g(z, !1);
    });
  }
  r(K, f), pe();
}
var Qe = _('<div class="absolute inset-0 bg-surface/50 rounded-lg flex items-center justify-center" aria-hidden="true"><div class="animate-spin rounded-full h-6 w-6 border-2 border-tertiary border-t-transparent"></div></div>'), $e = _('<div><div class="card-header svelte-1qx5g6b"><!></div> <div class="card-content svelte-1qx5g6b"><!></div> <div class="card-footer svelte-1qx5g6b"><!></div> <!></div>');
const et = {
  hash: "svelte-1qx5g6b",
  code: ".card-header.svelte-1qx5g6b:empty {display:none;}.card-content.svelte-1qx5g6b:empty {display:none;}.card-footer.svelte-1qx5g6b:empty {display:none;}"
};
function Ot(K, t) {
  he(t, !1), Te(K, et);
  const y = Y(), w = Y();
  let j = u(t, "variant", 8, "default"), m = u(t, "density", 8, "comfortable"), L = u(t, "disabled", 8, !1), B = u(t, "loading", 8, !1), F = u(t, "className", 8, ""), q = u(t, "ariaLabel", 8, ""), T = u(t, "ariaDescribedBy", 8, "");
  const k = Pe(), P = { compact: "p-3 rounded-md", comfortable: "p-4 rounded-lg" }, D = {
    default: "bg-[var(--zabi-surface)] border border-[var(--zabi-border)] shadow-sm",
    elevated: "bg-[var(--zabi-surface)] border border-[var(--zabi-border)] shadow-md",
    outlined: "bg-[var(--zabi-surface)] border-2 border-[var(--zabi-border)] shadow-sm"
  };
  function d(b) {
    if (L() || B()) {
      b.preventDefault();
      return;
    }
    k("click", { value: !0, event: b });
  }
  function E(b) {
    L() || B() || b.key === "Escape" && b.target.blur();
  }
  function M(b) {
    !L() && !B() && k("focus", { event: b });
  }
  function Q(b) {
    !L() && !B() && k("blur", { event: b });
  }
  function A(b) {
    !L() && !B() && k("hover", { event: b });
  }
  function f(b) {
    !L() && !B() && k("leave", { event: b });
  }
  ie(
    () => (C(j()), C(m()), C(L()), C(B()), C(F())),
    () => {
      O(y, [
        "transition-all duration-200",
        D[j()],
        P[m()],
        L() ? "opacity-50 cursor-not-allowed" : "",
        B() ? "animate-pulse" : "",
        F()
      ].filter(Boolean).join(" "));
    }
  ), ie(
    () => (C(B()), C(q()), C(T())),
    () => {
      O(w, {
        "aria-busy": B(),
        "aria-label": q() || void 0,
        "aria-describedby": T() || void 0
      });
    }
  ), ze(), we();
  var N = $e();
  Fe(N, () => ({ class: e(y), ...e(w) }), void 0, void 0, "svelte-1qx5g6b");
  var te = a(N), z = a(te);
  ne(z, t, "header", {}, null);
  var g = i(te, 2), I = a(g);
  ne(I, t, "default", {}, null);
  var V = i(g, 2), $ = a(V);
  ne($, t, "footer", {}, null);
  var ee = i(V, 2);
  {
    var U = (b) => {
      var h = Qe();
      r(b, h);
    };
    H(ee, (b) => {
      B() && b(U);
    });
  }
  R("click", N, d), R("mouseenter", N, A), R("mouseleave", N, f), R("keydown", N, E), R("focus", N, M), R("blur", N, Q), r(K, N), pe();
}
var tt = _("<h1><!></h1>"), at = _("<h2><!></h2>"), st = _("<h3><!></h3>"), rt = _("<h4><!></h4>"), it = _("<h5><!></h5>"), nt = _("<h6><!></h6>");
function Vt(K, t) {
  he(t, !1);
  const y = Y();
  let w = u(t, "level", 8, 1), j = u(t, "text", 8, ""), m = u(t, "color", 8, "text-white"), L = u(t, "spacing", 8, "normal");
  const B = {
    1: "!text-6xl md:!text-7xl font-bold leading-tight block",
    2: "!text-4xl md:!text-5xl font-bold leading-tight block",
    3: "!text-3xl md:!text-4xl font-semibold leading-snug block",
    4: "!text-2xl md:!text-3xl font-semibold leading-snug block",
    5: "!text-xl md:!text-2xl font-medium leading-normal block",
    6: "!text-lg md:!text-xl font-medium leading-normal block"
  }, F = {
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
    () => (C(w()), C(m()), C(L())),
    () => {
      O(y, `${B[w()]} font-title ${m()} ${F[L()][w()]}`);
    }
  ), ze();
  var q = xe(), T = ue(q);
  {
    var k = (D) => {
      var d = tt(), E = a(d);
      ne(E, t, "default", {}, (M) => {
        var Q = ye();
        p(() => W(Q, j())), r(M, Q);
      }), p(() => S(d, 1, oe(e(y)))), r(D, d);
    }, P = (D) => {
      var d = xe(), E = ue(d);
      {
        var M = (A) => {
          var f = at(), N = a(f);
          ne(N, t, "default", {}, (te) => {
            var z = ye();
            p(() => W(z, j())), r(te, z);
          }), p(() => S(f, 1, oe(e(y)))), r(A, f);
        }, Q = (A) => {
          var f = xe(), N = ue(f);
          {
            var te = (g) => {
              var I = st(), V = a(I);
              ne(V, t, "default", {}, ($) => {
                var ee = ye();
                p(() => W(ee, j())), r($, ee);
              }), p(() => S(I, 1, oe(e(y)))), r(g, I);
            }, z = (g) => {
              var I = xe(), V = ue(I);
              {
                var $ = (U) => {
                  var b = rt(), h = a(b);
                  ne(h, t, "default", {}, (c) => {
                    var s = ye();
                    p(() => W(s, j())), r(c, s);
                  }), p(() => S(b, 1, oe(e(y)))), r(U, b);
                }, ee = (U) => {
                  var b = xe(), h = ue(b);
                  {
                    var c = (n) => {
                      var o = it(), v = a(o);
                      ne(v, t, "default", {}, (Z) => {
                        var re = ye();
                        p(() => W(re, j())), r(Z, re);
                      }), p(() => S(o, 1, oe(e(y)))), r(n, o);
                    }, s = (n) => {
                      var o = xe(), v = ue(o);
                      {
                        var Z = (re) => {
                          var de = nt(), be = a(de);
                          ne(be, t, "default", {}, (_e) => {
                            var le = ye();
                            p(() => W(le, j())), r(_e, le);
                          }), p(() => S(de, 1, oe(e(y)))), r(re, de);
                        };
                        H(
                          v,
                          (re) => {
                            w() === 6 && re(Z);
                          },
                          !0
                        );
                      }
                      r(n, o);
                    };
                    H(
                      h,
                      (n) => {
                        w() === 5 ? n(c) : n(s, !1);
                      },
                      !0
                    );
                  }
                  r(U, b);
                };
                H(
                  V,
                  (U) => {
                    w() === 4 ? U($) : U(ee, !1);
                  },
                  !0
                );
              }
              r(g, I);
            };
            H(
              N,
              (g) => {
                w() === 3 ? g(te) : g(z, !1);
              },
              !0
            );
          }
          r(A, f);
        };
        H(
          E,
          (A) => {
            w() === 2 ? A(M) : A(Q, !1);
          },
          !0
        );
      }
      r(D, d);
    };
    H(T, (D) => {
      w() === 1 ? D(k) : D(P, !1);
    });
  }
  r(K, q), pe();
}
var lt = _('<img alt="" class="absolute inset-0 w-full h-full object-cover animate-pulse"/>'), ot = _('<img class="w-full h-full object-cover transition-opacity duration-300"/>'), dt = _('<div class="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l2.586-2.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>'), ct = _("<div><!> <!> <!></div>");
function Xt(K, t) {
  he(t, !1);
  let y = u(t, "src", 8), w = u(t, "alt", 8, ""), j = u(t, "width", 8, "100%"), m = u(t, "height", 8, "auto"), L = u(t, "loading", 8, "lazy"), B = u(t, "className", 8, ""), F = u(t, "placeholder", 8, "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"), q = Y(!1), T = Y(!1), k = Y(!1), P = Y();
  Be(() => {
    if (L() === "lazy") {
      const z = new IntersectionObserver(
        (g) => {
          g.forEach((I) => {
            I.isIntersecting && (O(k, !0), z.unobserve(I.target));
          });
        },
        { rootMargin: "50px" }
      );
      return e(P) && z.observe(e(P)), () => z.disconnect();
    } else
      O(k, !0);
  });
  function D() {
    O(q, !0);
  }
  function d() {
    O(T, !0), console.warn("Failed to load image:", y());
  }
  we();
  var E = ct(), M = a(E);
  {
    var Q = (z) => {
      var g = lt();
      p(() => J(g, "src", F())), r(z, g);
    };
    H(M, (z) => {
      !e(q) && !e(T) && z(Q);
    });
  }
  var A = i(M, 2);
  {
    var f = (z) => {
      var g = ot();
      p(() => {
        J(g, "src", y()), J(g, "alt", w()), J(g, "loading", L()), ke(g, `opacity: ${e(q) ? 1 : 0};`);
      }), R("load", g, D), R("error", g, d), r(z, g);
    };
    H(A, (z) => {
      e(k) && !e(T) && z(f);
    });
  }
  var N = i(A, 2);
  {
    var te = (z) => {
      var g = dt();
      r(z, g);
    };
    H(N, (z) => {
      e(T) && z(te);
    });
  }
  je(E, (z) => O(P, z), () => e(P)), p(() => {
    S(E, 1, `relative overflow-hidden ${B() ?? ""}`), ke(E, `width: ${(typeof j() == "number" ? j() + "px" : j()) ?? ""}; height: ${(typeof m() == "number" ? m() + "px" : m()) ?? ""};`);
  }), r(K, E), pe();
}
var vt = _('<div class="fixed bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs"><div class="flex items-center justify-between mb-2"><h3 class="font-bold"> </h3> <button class="text-gray-400 hover:text-white">×</button></div> <div class="space-y-1"><div> </div> <div> </div> <div> </div> <div> </div> <div class="pt-1 border-t border-gray-600"><div class="font-semibold"> </div></div></div></div>');
function Zt(K, t) {
  he(t, !1);
  let y = u(t, "isVisible", 12, !1), w = u(t, "showInDev", 8, !0), j = u(t, "title", 8, "Debug Panel"), m = Y({
    domContentLoaded: 0,
    loadComplete: 0,
    firstPaint: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0
  });
  Be(() => {
    typeof window < "u" && "PerformanceObserver" in window && (new PerformanceObserver((k) => {
      for (const P of k.getEntries())
        P.name === "first-paint" && me(m, e(m).firstPaint = P.startTime);
    }).observe({ entryTypes: ["paint"] }), new PerformanceObserver((k) => {
      for (const P of k.getEntries())
        P.name === "first-contentful-paint" && me(m, e(m).firstContentfulPaint = P.startTime);
    }).observe({ entryTypes: ["paint"] }), new PerformanceObserver((k) => {
      const P = k.getEntries(), D = P[P.length - 1];
      me(m, e(m).largestContentfulPaint = D.startTime);
    }).observe({ entryTypes: ["largest-contentful-paint"] }), new PerformanceObserver((k) => {
      for (const P of k.getEntries())
        P.hadRecentInput || me(m, e(m).cumulativeLayoutShift += P.value);
    }).observe({ entryTypes: ["layout-shift"] })), window.addEventListener("DOMContentLoaded", () => {
      me(m, e(m).domContentLoaded = performance.now());
    }), window.addEventListener("load", () => {
      me(m, e(m).loadComplete = performance.now());
    }), w();
  });
  function L(k) {
    return `${Math.round(k)}ms`;
  }
  function B() {
    const k = e(m).firstContentfulPaint, P = e(m).largestContentfulPaint, D = e(m).cumulativeLayoutShift;
    let d = 100;
    return k > 1800 && (d -= 20), P > 2500 && (d -= 30), D > 0.1 && (d -= 25), e(m).loadComplete > 3e3 && (d -= 25), d >= 90 ? "🟢 Excellent" : d >= 70 ? "🟡 Good" : d >= 50 ? "🟠 Needs Improvement" : "🔴 Poor";
  }
  we();
  var F = xe(), q = ue(F);
  {
    var T = (k) => {
      var P = vt(), D = a(P), d = a(D), E = a(d), M = i(d, 2), Q = i(D, 2), A = a(Q), f = a(A), N = i(A, 2), te = a(N), z = i(N, 2), g = a(z), I = i(z, 2), V = a(I), $ = i(I, 2), ee = a($), U = a(ee);
      p(
        (b, h, c, s, n) => {
          W(E, j()), W(f, `FCP: ${b ?? ""}`), W(te, `LCP: ${h ?? ""}`), W(g, `CLS: ${c ?? ""}`), W(V, `Load: ${s ?? ""}`), W(U, n);
        },
        [
          () => (e(m), X(() => L(e(m).firstContentfulPaint))),
          () => (e(m), X(() => L(e(m).largestContentfulPaint))),
          () => (e(m), X(() => e(m).cumulativeLayoutShift.toFixed(3))),
          () => (e(m), X(() => L(e(m).loadComplete))),
          () => X(B)
        ]
      ), R("click", M, () => y(!1)), r(k, P);
    };
    H(q, (k) => {
      y() && k(T);
    });
  }
  r(K, F), pe();
}
var ut = _('<span class="text-sm text-secondary svelte-1nnpss"> </span>'), mt = _('<div class="flex justify-between items-center mb-2 svelte-1nnpss"><label class="text-sm font-medium text-primary svelte-1nnpss"> </label> <!></div>'), ft = _('<div class="absolute inset-0 flex items-center justify-center svelte-1nnpss"><span class="text-xs font-medium text-white svelte-1nnpss"> </span></div>'), xt = _('<div class="relative svelte-1nnpss"><div><div role="progressbar" aria-valuemin="0"></div></div> <!></div>'), gt = _("<span> </span>"), bt = _('<div class="relative inline-block svelte-1nnpss"><svg viewBox="0 0 44 44" role="progressbar" aria-valuemin="0"><circle cx="22" cy="22" r="20" stroke="currentColor" stroke-width="4" fill="none" class="text-neutral-200 dark:text-neutral-700 svelte-1nnpss"></circle><circle cx="22" cy="22" r="20" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"></circle></svg> <div class="absolute inset-0 flex items-center justify-center svelte-1nnpss"><!></div></div>'), pt = _("<div><!> <!> <!></div>");
const ht = {
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
function Gt(K, t) {
  he(t, !1), Te(K, ht);
  const y = Y(), w = Y(), j = Y(), m = Y(), L = Y();
  let B = u(t, "value", 8, 0), F = u(t, "max", 8, 100), q = u(t, "size", 8, "md"), T = u(t, "variant", 8, "default"), k = u(t, "shape", 8, "linear"), P = u(t, "animated", 8, !0), D = u(t, "striped", 8, !1), d = u(t, "showValue", 8, !1), E = u(t, "label", 8, ""), M = u(t, "className", 8, "");
  const Q = Pe();
  let A = `progress-${Math.random().toString(36).substr(2, 9)}`;
  const f = {
    sm: { linear: "h-1", circular: "w-8 h-8", text: "text-xs" },
    md: { linear: "h-2", circular: "w-12 h-12", text: "text-sm" },
    lg: { linear: "h-3", circular: "w-16 h-16", text: "text-base" }
  }, N = {
    default: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
    info: "bg-info"
  }, te = {
    default: "bg-surface-tertiary",
    success: "bg-success-surface",
    warning: "bg-warning-surface",
    error: "bg-error-surface",
    info: "bg-info-surface"
  };
  ie(() => (C(B()), C(F())), () => {
    O(y, Math.min(Math.max(B() / F() * 100, 0), 100));
  }), ie(() => e(y), () => {
    O(w, e(y) >= 100);
  }), ie(
    () => (e(w), C(B()), C(F())),
    () => {
      e(w) && Q("complete", { value: B(), max: F() });
    }
  ), ie(() => C(k()), () => {
    O(j, k() === "circular" ? 2 * Math.PI * 20 : 0);
  }), ie(() => e(j), () => {
    O(m, e(j));
  }), ie(() => (e(j), e(y)), () => {
    O(L, e(j) - e(y) / 100 * e(j));
  }), ze(), we();
  var z = pt(), g = a(z);
  {
    var I = (b) => {
      var h = mt(), c = a(h), s = a(c), n = i(c, 2);
      {
        var o = (v) => {
          var Z = ut(), re = a(Z);
          p((de) => W(re, `${de ?? ""}%`), [
            () => (e(y), X(() => Math.round(e(y))))
          ]), r(v, Z);
        };
        H(n, (v) => {
          d() && v(o);
        });
      }
      p(() => {
        J(c, "for", A), W(s, E());
      }), r(b, h);
    };
    H(g, (b) => {
      E() && b(I);
    });
  }
  var V = i(g, 2);
  {
    var $ = (b) => {
      var h = xt(), c = a(h), s = a(c), n = i(c, 2);
      {
        var o = (v) => {
          var Z = ft(), re = a(Z), de = a(re);
          p((be) => W(de, `${be ?? ""}%`), [
            () => (e(y), X(() => Math.round(e(y))))
          ]), r(v, Z);
        };
        H(n, (v) => {
          d() && q() === "lg" && v(o);
        });
      }
      p(
        (v) => {
          S(
            c,
            1,
            `
                w-full rounded-full overflow-hidden
                ${C(q()), X(() => f[q()].linear) ?? ""}
                ${C(T()), X(() => te[T()]) ?? ""}
            `,
            "svelte-1nnpss"
          ), J(s, "id", A), S(
            s,
            1,
            `
                        h-full rounded-full transition-all duration-300 ease-out
                        ${C(T()), X(() => N[T()]) ?? ""}
                        ${P() ? "animate-pulse" : ""}
                        ${D() ? "bg-stripes" : ""}
                    `,
            "svelte-1nnpss"
          ), ke(s, `width: ${e(y) ?? ""}%`), J(s, "aria-valuenow", B()), J(s, "aria-valuemax", F()), J(s, "aria-label", v);
        },
        [
          () => (C(E()), e(y), X(() => E() || `Progress: ${Math.round(e(y))}%`))
        ]
      ), r(b, h);
    }, ee = (b) => {
      var h = xe(), c = ue(h);
      {
        var s = (n) => {
          var o = bt(), v = a(o), Z = i(a(v)), re = i(v, 2), de = a(re);
          {
            var be = (le) => {
              var ge = gt(), l = a(ge);
              p(
                (x) => {
                  S(
                    ge,
                    1,
                    `
                        font-medium text-primary
                        ${C(q()), X(() => f[q()].text) ?? ""}
                    `,
                    "svelte-1nnpss"
                  ), W(l, `${x ?? ""}%`);
                },
                [
                  () => (e(y), X(() => Math.round(e(y))))
                ]
              ), r(le, ge);
            }, _e = (le) => {
              var ge = xe(), l = ue(ge);
              ne(l, t, "center", {}, null), r(le, ge);
            };
            H(de, (le) => {
              d() ? le(be) : le(_e, !1);
            });
          }
          p(
            (le) => {
              J(v, "id", A), S(
                v,
                0,
                `transform -rotate-90 ${C(q()), X(() => f[q()].circular) ?? ""}`,
                "svelte-1nnpss"
              ), J(v, "aria-valuenow", B()), J(v, "aria-valuemax", F()), J(v, "aria-label", le), J(Z, "stroke-dasharray", e(m)), J(Z, "stroke-dashoffset", e(L)), S(
                Z,
                0,
                `
                        transition-all duration-300 ease-out
                        ${C(T()), X(() => N[T()]) ?? ""}
                        ${P() ? "animate-pulse" : ""}
                    `,
                "svelte-1nnpss"
              );
            },
            [
              () => (C(E()), e(y), X(() => E() || `Progress: ${Math.round(e(y))}%`))
            ]
          ), r(n, o);
        };
        H(
          c,
          (n) => {
            k() === "circular" && n(s);
          },
          !0
        );
      }
      r(b, h);
    };
    H(V, (b) => {
      k() === "linear" ? b($) : b(ee, !1);
    });
  }
  var U = i(V, 2);
  ne(U, t, "default", {}, null), p(() => S(z, 1, `progress-container ${M() ?? ""}`, "svelte-1nnpss")), r(K, z), pe();
}
var yt = _('<div class="text-center"><div></div> <p class="text-xs text-tertiary"> </p></div>'), wt = _('<div class="text-center"><div></div> <p class="text-xs text-tertiary"> </p></div>'), _t = _('<div class="text-center"><div></div> <p class="text-xs text-tertiary"> </p></div>'), kt = _("<div></div>"), zt = _("<div></div>"), Ct = _("<div></div>"), jt = _('<div class="flex items-center space-x-4"><span class="text-tertiary text-sm w-12"> </span> <span> </span></div>'), Tt = _('<div class="flex items-center space-x-4"><span class="text-tertiary text-sm w-12"> </span> <span class="text-secondary text-sm w-20"> </span> <div></div></div>'), St = _('<div class="text-center space-y-2"><div></div> <p class="text-xs text-tertiary"> </p></div>'), Pt = _('<div class="text-center space-y-2"><div></div> <p class="text-xs text-tertiary"> </p></div>'), Lt = _('<div class="text-center space-y-2"><div></div> <p class="text-xs text-tertiary"> </p></div>'), Bt = _('<div class="min-h-screen bg-primary p-8"><div class="max-w-6xl mx-auto space-y-8"><div class="flex justify-between items-center mb-8"><div><h1 class="text-4xl font-bold text-primary mb-2">Tailwind Scale Demo</h1> <p class="text-lg text-secondary">Comprehensive scales supporting light and dark modes</p></div> <!></div> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Color Scales</h2> <div class="space-y-3"><h3 class="text-xl font-medium text-primary">Primary Scale</h3> <div class="grid grid-cols-11 gap-2"></div></div> <div class="space-y-3"><h3 class="text-xl font-medium text-primary">Secondary Scale</h3> <div class="grid grid-cols-11 gap-2"></div></div> <div class="space-y-3"><h3 class="text-xl font-medium text-primary">Neutral Scale</h3> <div class="grid grid-cols-11 gap-2"></div></div> <div class="space-y-3"><h3 class="text-xl font-medium text-primary">Semantic Colors</h3> <div class="grid grid-cols-3 gap-4"><div class="space-y-2"><h4 class="text-sm font-medium text-primary">Success</h4> <div class="grid grid-cols-5 gap-1"></div></div> <div class="space-y-2"><h4 class="text-sm font-medium text-primary">Warning</h4> <div class="grid grid-cols-5 gap-1"></div></div> <div class="space-y-2"><h4 class="text-sm font-medium text-primary">Error</h4> <div class="grid grid-cols-5 gap-1"></div></div></div></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Background & Surface Colors</h2> <div class="grid grid-cols-2 gap-6"><div class="space-y-4"><h3 class="text-xl font-medium text-primary">Background Colors</h3> <div class="space-y-3"><div class="bg-primary p-4 rounded-lg border border-primary"><p class="text-inverse font-medium">Primary Background</p> <p class="text-inverse text-sm opacity-80">bg-primary</p></div> <div class="bg-secondary p-4 rounded-lg border border-primary"><p class="text-primary font-medium">Secondary Background</p> <p class="text-secondary text-sm">bg-secondary</p></div> <div class="bg-tertiary p-4 rounded-lg border border-primary"><p class="text-primary font-medium">Tertiary Background</p> <p class="text-secondary text-sm">bg-tertiary</p></div></div></div> <div class="space-y-4"><h3 class="text-xl font-medium text-primary">Surface Colors</h3> <div class="space-y-3"><div class="bg-surface-primary p-4 rounded-lg border border-primary shadow-adaptive-sm"><p class="text-primary font-medium">Primary Surface</p> <p class="text-secondary text-sm">bg-surface-primary</p></div> <div class="bg-surface-secondary p-4 rounded-lg border border-primary shadow-adaptive-sm"><p class="text-primary font-medium">Secondary Surface</p> <p class="text-secondary text-sm">bg-surface-secondary</p></div> <div class="bg-surface-elevated p-4 rounded-lg border border-primary shadow-adaptive-md"><p class="text-primary font-medium">Elevated Surface</p> <p class="text-secondary text-sm">bg-surface-elevated</p></div></div></div></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Typography Scale</h2> <div class="space-y-4"></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Spacing Scale</h2> <div class="space-y-4"></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Border Radius Scale</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Shadow Scale</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-6"></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Animation Scale</h2> <div class="grid grid-cols-2 md:grid-cols-3 gap-4"></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Component Examples</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-4"><h3 class="text-xl font-medium text-primary">Cards</h3> <div class="space-y-3"><div class="card p-4"><h4 class="text-lg font-medium text-primary mb-2">Standard Card</h4> <p class="text-secondary">This is a standard card with adaptive styling.</p></div> <div class="card-elevated p-4"><h4 class="text-lg font-medium text-primary mb-2">Elevated Card</h4> <p class="text-secondary">This is an elevated card with more shadow.</p></div></div></div> <div class="space-y-4"><h3 class="text-xl font-medium text-primary">Buttons</h3> <div class="space-y-3"><button class="button-primary">Primary Button</button> <button class="button-secondary">Secondary Button</button> <div class="flex space-x-2"><button class="px-3 py-1 text-sm bg-success-500 hover:bg-success-600 text-white rounded-md transition-colors">Success</button> <button class="px-3 py-1 text-sm bg-warning-500 hover:bg-warning-600 text-white rounded-md transition-colors">Warning</button> <button class="px-3 py-1 text-sm bg-error-500 hover:bg-error-600 text-white rounded-md transition-colors">Error</button></div></div></div></div></section></div></div>');
function Yt(K) {
  var t = Bt(), y = a(t), w = a(y), j = i(a(w), 2);
  We(j, { size: "lg", variant: "outline" });
  var m = i(w, 2), L = i(a(m), 2), B = i(a(L), 2);
  ce(B, 4, () => [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], ve, (h, c) => {
    var s = yt(), n = a(s), o = i(n, 2), v = a(o);
    p(() => {
      S(n, 1, `w-16 h-16 rounded-lg bg-primary-${c ?? ""} border border-primary mb-2`), W(v, c);
    }), r(h, s);
  });
  var F = i(L, 2), q = i(a(F), 2);
  ce(q, 4, () => [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], ve, (h, c) => {
    var s = wt(), n = a(s), o = i(n, 2), v = a(o);
    p(() => {
      S(n, 1, `w-16 h-16 rounded-lg bg-secondary-${c ?? ""} border border-primary mb-2`), W(v, c);
    }), r(h, s);
  });
  var T = i(F, 2), k = i(a(T), 2);
  ce(k, 4, () => [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], ve, (h, c) => {
    var s = _t(), n = a(s), o = i(n, 2), v = a(o);
    p(() => {
      S(n, 1, `w-16 h-16 rounded-lg bg-neutral-${c ?? ""} border border-primary mb-2`), W(v, c);
    }), r(h, s);
  });
  var P = i(T, 2), D = i(a(P), 2), d = a(D), E = i(a(d), 2);
  ce(E, 4, () => [400, 500, 600, 700, 800], ve, (h, c) => {
    var s = kt();
    p(() => S(s, 1, `w-8 h-8 rounded bg-success-${c ?? ""} border border-primary`)), r(h, s);
  });
  var M = i(d, 2), Q = i(a(M), 2);
  ce(Q, 4, () => [400, 500, 600, 700, 800], ve, (h, c) => {
    var s = zt();
    p(() => S(s, 1, `w-8 h-8 rounded bg-warning-${c ?? ""} border border-primary`)), r(h, s);
  });
  var A = i(M, 2), f = i(a(A), 2);
  ce(f, 4, () => [400, 500, 600, 700, 800], ve, (h, c) => {
    var s = Ct();
    p(() => S(s, 1, `w-8 h-8 rounded bg-error-${c ?? ""} border border-primary`)), r(h, s);
  });
  var N = i(m, 4), te = i(a(N), 2);
  ce(
    te,
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
    (h, c) => {
      var s = jt(), n = a(s), o = a(n), v = i(n, 2), Z = a(v);
      p(() => {
        W(o, c.size), S(v, 1, `${c.class ?? ""} text-primary`), W(Z, c.text);
      }), r(h, s);
    }
  );
  var z = i(N, 2), g = i(a(z), 2);
  ce(
    g,
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
    (h, c) => {
      var s = Tt(), n = a(s), o = a(n), v = i(n, 2), Z = a(v), re = i(v, 2);
      p(() => {
        W(o, c.size), W(Z, c.value), S(re, 1, `${c.class ?? ""} h-4 bg-primary-500 rounded`);
      }), r(h, s);
    }
  );
  var I = i(z, 2), V = i(a(I), 2);
  ce(
    V,
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
    (h, c) => {
      var s = St(), n = a(s), o = i(n, 2), v = a(o);
      p(() => {
        S(n, 1, `w-16 h-16 bg-primary-500 ${c.class ?? ""} mx-auto`), W(v, c.size);
      }), r(h, s);
    }
  );
  var $ = i(I, 2), ee = i(a($), 2);
  ce(
    ee,
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
    (h, c) => {
      var s = Pt(), n = a(s), o = i(n, 2), v = a(o);
      p(() => {
        S(n, 1, `w-20 h-20 bg-surface-primary border border-primary ${c.class ?? ""} mx-auto`), W(v, c.name);
      }), r(h, s);
    }
  );
  var U = i($, 2), b = i(a(U), 2);
  ce(
    b,
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
    (h, c) => {
      var s = Lt(), n = a(s), o = i(n, 2), v = a(o);
      p(() => {
        S(n, 1, `w-16 h-16 bg-primary-500 rounded-lg ${c.class ?? ""} mx-auto`), W(v, c.name);
      }), r(h, s);
    }
  ), r(K, t);
}
var Et = _("<div></div>");
function Ut(K, t) {
  let y = u(t, "width", 8, "100%"), w = u(t, "height", 8, "1rem"), j = u(t, "borderRadius", 8, "0.5rem"), m = u(t, "className", 8, "");
  var L = Et();
  p(() => {
    S(L, 1, `animate-pulse bg-stone-800 ${m() ?? ""}`), ke(L, `width: ${y() ?? ""}; height: ${w() ?? ""}; border-radius: ${j() ?? ""};`);
  }), r(K, L);
}
var Mt = _('<button type="button" class="inline-block svelte-13nzt82"><!></button>'), It = _('<div role="button" tabindex="0" class="inline-block svelte-13nzt82"><!></div>'), Dt = _("<div></div>"), At = _('<div role="tooltip"><div class="relative svelte-13nzt82"> <!></div></div>'), Nt = _("<!> <!>", 1);
const Ft = {
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
function Jt(K, t) {
  he(t, !1), Te(K, Ft);
  let y = u(t, "content", 8, ""), w = u(t, "placement", 8, "top"), j = u(t, "trigger", 8, "hover"), m = u(t, "disabled", 8, !1), L = u(t, "delay", 8, 200), B = u(t, "maxWidth", 8, "200px"), F = u(t, "variant", 8, "default"), q = u(t, "size", 8, "md"), T = u(t, "arrow", 8, !0), k = u(t, "interactive", 8, !1), P = u(t, "className", 8, "");
  const D = Pe();
  let d = Y(), E = Y(), M = Y(!1), Q, A, f;
  const N = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  }, te = {
    default: "bg-surface-elevated text-primary border-primary shadow-adaptive-lg",
    dark: "bg-surface text-inverse border-primary shadow-adaptive-lg",
    light: "bg-surface text-primary border-primary shadow-adaptive-lg",
    info: "bg-info text-inverse border-info shadow-adaptive-lg",
    success: "bg-success text-inverse border-success shadow-adaptive-lg",
    warning: "bg-warning text-inverse border-warning shadow-adaptive-lg",
    error: "bg-error text-inverse border-error shadow-adaptive-lg"
  };
  function z() {
    if (!e(E) || !e(d)) return { top: 0, left: 0 };
    f = e(E).getBoundingClientRect();
    const l = e(d).getBoundingClientRect(), x = window.scrollY, se = window.scrollX, fe = window.innerWidth, Ce = window.innerHeight;
    let ae = 0, G = 0;
    switch (w()) {
      case "top":
        ae = f.top + x - l.height - 8, G = f.left + se + (f.width - l.width) / 2;
        break;
      case "top-start":
        ae = f.top + x - l.height - 8, G = f.left + se;
        break;
      case "top-end":
        ae = f.top + x - l.height - 8, G = f.right + se - l.width;
        break;
      case "bottom":
        ae = f.bottom + x + 8, G = f.left + se + (f.width - l.width) / 2;
        break;
      case "bottom-start":
        ae = f.bottom + x + 8, G = f.left + se;
        break;
      case "bottom-end":
        ae = f.bottom + x + 8, G = f.right + se - l.width;
        break;
      case "left":
        ae = f.top + x + (f.height - l.height) / 2, G = f.left + se - l.width - 8;
        break;
      case "left-start":
        ae = f.top + x, G = f.left + se - l.width - 8;
        break;
      case "left-end":
        ae = f.bottom + x - l.height, G = f.left + se - l.width - 8;
        break;
      case "right":
        ae = f.top + x + (f.height - l.height) / 2, G = f.right + se + 8;
        break;
      case "right-start":
        ae = f.top + x, G = f.right + se + 8;
        break;
      case "right-end":
        ae = f.bottom + x - l.height, G = f.right + se + 8;
        break;
    }
    return G < 8 && (G = 8), G + l.width > fe - 8 && (G = fe - l.width - 8), ae < 8 && (ae = 8), ae + l.height > Ce + x - 8 && (ae = Ce + x - l.height - 8), { top: ae, left: G };
  }
  function g(l) {
    m() || e(M) || (clearTimeout(A), Q = setTimeout(
      () => {
        O(M, !0), D("show", { event: l }), requestAnimationFrame(() => {
          const x = z();
          e(d) && (me(d, e(d).style.top = `${x.top}px`), me(d, e(d).style.left = `${x.left}px`));
        });
      },
      L()
    ));
  }
  function I(l) {
    e(M) && (clearTimeout(Q), A = setTimeout(
      () => {
        O(M, !1), D("hide", { event: l });
      },
      k() ? 300 : 0
    ));
  }
  function V(l) {
    j() === "click" && (e(M) ? I(l) : g(l));
  }
  function $(l) {
    j() === "click" && (l.key === "Enter" || l.key === " ") && (l.preventDefault(), e(M) ? I(l) : g(l));
  }
  function ee(l) {
    j() === "focus" && g(l);
  }
  function U(l) {
    j() === "focus" && I(l);
  }
  function b(l) {
    j() === "hover" && g(l);
  }
  function h(l) {
    j() === "hover" && I(l);
  }
  function c() {
    k() && clearTimeout(A);
  }
  function s(l) {
    k() && I(l);
  }
  function n() {
    m() || O(M, !0);
  }
  function o() {
    O(M, !1);
  }
  function v() {
    e(M) ? o() : n();
  }
  Be(() => () => {
    clearTimeout(Q), clearTimeout(A);
  }), ie(() => (e(M), e(d)), () => {
    e(M) && e(d) && requestAnimationFrame(() => {
      const l = z();
      me(d, e(d).style.top = `${l.top}px`), me(d, e(d).style.left = `${l.left}px`);
    });
  }), ze();
  var Z = { show: n, hide: o, toggle: v };
  we();
  var re = Nt(), de = ue(re);
  {
    var be = (l) => {
      var x = Mt(), se = a(x);
      ne(se, t, "default", {}, null), je(x, (fe) => O(E, fe), () => e(E)), p(() => J(x, "aria-describedby", e(M) ? "tooltip-{content}" : void 0)), R("click", x, V), R("keydown", x, $), R("focus", x, ee), R("blur", x, U), R("mouseenter", x, b), R("mouseleave", x, h), r(l, x);
    }, _e = (l) => {
      var x = It(), se = a(x);
      ne(se, t, "default", {}, null), je(x, (fe) => O(E, fe), () => e(E)), p(() => J(x, "aria-describedby", e(M) ? "tooltip-{content}" : void 0)), R("click", x, V), R("keydown", x, $), R("focus", x, ee), R("blur", x, U), R("mouseenter", x, b), R("mouseleave", x, h), r(l, x);
    };
    H(de, (l) => {
      j() === "click" ? l(be) : l(_e, !1);
    });
  }
  var le = i(de, 2);
  {
    var ge = (l) => {
      var x = At(), se = a(x), fe = a(se), Ce = i(fe);
      {
        var ae = (G) => {
          var Ee = Dt();
          p(
            (Me, Ie, De, Ae, Ne) => S(
              Ee,
              1,
              `
                    absolute w-2 h-2 transform rotate-45
                    ${Me ?? ""}
                    ${Ie ?? ""}
                    ${De ?? ""}
                    ${Ae ?? ""}
                    ${Ne ?? ""}
                `,
              "svelte-13nzt82"
            ),
            [
              () => (C(F()), X(() => te[F()].split(" ")[0])),
              () => (C(w()), X(() => w().includes("top") ? "bottom-[-4px] left-1/2 -translate-x-1/2" : "")),
              () => (C(w()), X(() => w().includes("bottom") ? "top-[-4px] left-1/2 -translate-x-1/2" : "")),
              () => (C(w()), X(() => w().includes("left") ? "right-[-4px] top-1/2 -translate-y-1/2" : "")),
              () => (C(w()), X(() => w().includes("right") ? "left-[-4px] top-1/2 -translate-y-1/2" : ""))
            ]
          ), r(G, Ee);
        };
        H(Ce, (G) => {
          T() && G(ae);
        });
      }
      je(x, (G) => O(d, G), () => e(d)), p(() => {
        J(x, "id", `tooltip-${y() ?? ""}`), S(
          x,
          1,
          `
            fixed z-tooltip
            ${C(q()), X(() => N[q()]) ?? ""}
            ${C(F()), X(() => te[F()]) ?? ""}
            border rounded-lg shadow-adaptive-lg
            ${P() ?? ""}
        `,
          "svelte-13nzt82"
        ), ke(x, `max-width: ${B() ?? ""};`), W(fe, `${y() ?? ""} `);
      }), R("mouseenter", x, c), R("mouseleave", x, s), qe(3, x, () => Re, () => ({
        x: w().includes("left") ? -10 : w().includes("right") ? 10 : 0,
        y: w().includes("top") ? -10 : w().includes("bottom") ? 10 : 0,
        duration: 200
      })), r(l, x);
    };
    H(le, (l) => {
      e(M) && y() && l(ge);
    });
  }
  return r(K, re), Le(t, "show", n), Le(t, "hide", o), Le(t, "toggle", v), pe(Z);
}
export {
  Ht as B,
  Ot as C,
  Vt as H,
  Xt as O,
  Zt as P,
  Yt as S,
  Jt as T,
  Gt as a,
  Ut as b
};
