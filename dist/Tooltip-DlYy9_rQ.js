import { a as je, p as f, C as ne, D as Te, i as we, f as y, c as q, g as s, h as be, j as he, r as B, l as e, m as K, n as a, k as O, b as ue, o as i, s as de, t as b, q as T, F as le, e as U, u as H, x as Se, v as V, _ as Ne, B as M, w as xe, W as ye, d as Ce, P as ke, $ as fe, E as ve, Z as me, G as Le, y as Fe, z as Re } from "./x-DpVwziig.js";
import { createEventDispatcher as Pe, onMount as Ee } from "svelte";
import { T as We } from "./Toast-DXZ9gllw.js";
var He = y("<div></div>"), Oe = Se('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" class="svelte-14njway"></path></svg>'), Ve = Se('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" class="svelte-14njway"></path></svg>'), Xe = y('<button type="button"><!> <!> <!> <!></button> <button type="button" aria-label="Close badge"><svg class="w-full h-full svelte-14njway" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" class="svelte-14njway"></path></svg></button>', 1), Ye = y("<div></div>"), Ze = Se('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" class="svelte-14njway"></path></svg>'), Ge = Se('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" class="svelte-14njway"></path></svg>'), Ue = y("<span><!> <!> <!> <!></span>"), Je = y('<div class="inline-flex items-center gap-1 svelte-14njway"><!></div>');
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
function Xt(J, t) {
  he(t, !1), je(J, Ke);
  const h = K(), _ = K(), C = K(), g = K(), N = K(), F = K(), R = K();
  let W = f(t, "variant", 8, "default"), S = f(t, "size", 8, "md"), k = f(t, "shape", 8, "rounded"), j = f(t, "dot", 8, !1), D = f(t, "closable", 8, !1), m = f(t, "icon", 8, void 0), P = f(t, "iconPosition", 8, "left");
  const L = Pe();
  function Z(c) {
    c.stopPropagation(), L("close", { event: c });
  }
  function A(c) {
    L("click", { event: c });
  }
  ne(() => {
  }, () => {
    O(h, {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base"
    });
  }), ne(() => {
  }, () => {
    O(_, {
      default: "bg-surface-secondary text-primary border border-primary",
      success: "bg-success-surface text-success-text border border-success/30",
      warning: "bg-warning-surface text-warning-text border border-warning/30",
      error: "bg-error-surface text-error-text border border-error/30",
      info: "bg-info-surface text-info-text border border-info/30",
      neutral: "bg-surface-tertiary text-secondary border border-secondary"
    });
  }), ne(() => {
  }, () => {
    O(C, {
      rounded: "rounded-md",
      pill: "rounded-full",
      square: "rounded-none"
    });
  }), ne(() => {
  }, () => {
    O(g, { sm: "w-1.5 h-1.5", md: "w-2 h-2", lg: "w-2.5 h-2.5" });
  }), ne(
    () => (e(h), B(S()), e(_), B(W()), e(C), B(k()), B(D())),
    () => {
      O(N, [
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
        e(h)[S()],
        e(_)[W()],
        e(C)[k()],
        D() ? "cursor-pointer hover:opacity-80" : ""
      ].join(" "));
    }
  ), ne(() => B(S()), () => {
    O(F, [
      "flex-shrink-0",
      S() === "sm" ? "w-3 h-3" : S() === "md" ? "w-4 h-4" : "w-5 h-5"
    ].join(" "));
  }), ne(() => B(S()), () => {
    O(R, [
      "flex-shrink-0",
      "ml-1",
      "hover:bg-white/10",
      "rounded-full",
      "p-0.5",
      "transition-colors",
      "duration-150",
      "ease-in-out",
      S() === "sm" ? "w-3 h-3" : S() === "md" ? "w-4 h-4" : "w-5 h-5"
    ].join(" "));
  }), Te(), we();
  var x = Je(), Q = a(x);
  {
    var te = (c) => {
      var z = Xe(), G = ue(z), ae = a(G);
      {
        var re = (v) => {
          var o = He();
          b(() => T(
            o,
            1,
            `w-2 h-2 rounded-full bg-current ${e(g), B(S()), H(() => e(g)[S()]) ?? ""}`,
            "svelte-14njway"
          )), s(v, o);
        };
        q(ae, (v) => {
          j() && v(re);
        });
      }
      var $ = i(ae, 2);
      {
        var I = (v) => {
          var o = Oe(), X = a(o);
          b(() => {
            T(o, 0, le(e(F)), "svelte-14njway"), V(X, "d", m());
          }), s(v, o);
        };
        q($, (v) => {
          m() && P() === "left" && v(I);
        });
      }
      var w = i($, 2);
      de(w, t, "default", {}, null);
      var u = i(w, 2);
      {
        var r = (v) => {
          var o = Ve(), X = a(o);
          b(() => {
            T(o, 0, le(e(F)), "svelte-14njway"), V(X, "d", m());
          }), s(v, o);
        };
        q(u, (v) => {
          m() && P() === "right" && v(r);
        });
      }
      var n = i(G, 2);
      b(() => {
        T(G, 1, le(e(N)), "svelte-14njway"), T(n, 1, le(e(R)), "svelte-14njway");
      }), U("click", G, (v) => A(v)), U("keydown", G, (v) => {
        const o = v;
        o.key === "Enter" && A(o);
      }), U("click", n, (v) => Z(v)), U("keydown", n, (v) => {
        const o = v;
        o.key === "Enter" && Z(o);
      }), s(c, z);
    }, d = (c) => {
      var z = Ue(), G = a(z);
      {
        var ae = (r) => {
          var n = Ye();
          b(() => T(
            n,
            1,
            `w-2 h-2 rounded-full bg-current ${e(g), B(S()), H(() => e(g)[S()]) ?? ""}`,
            "svelte-14njway"
          )), s(r, n);
        };
        q(G, (r) => {
          j() && r(ae);
        });
      }
      var re = i(G, 2);
      {
        var $ = (r) => {
          var n = Ze(), v = a(n);
          b(() => {
            T(n, 0, le(e(F)), "svelte-14njway"), V(v, "d", m());
          }), s(r, n);
        };
        q(re, (r) => {
          m() && P() === "left" && r($);
        });
      }
      var I = i(re, 2);
      de(I, t, "default", {}, null);
      var w = i(I, 2);
      {
        var u = (r) => {
          var n = Ge(), v = a(n);
          b(() => {
            T(n, 0, le(e(F)), "svelte-14njway"), V(v, "d", m());
          }), s(r, n);
        };
        q(w, (r) => {
          m() && P() === "right" && r(u);
        });
      }
      b(() => T(z, 1, le(e(N)), "svelte-14njway")), s(c, z);
    };
    q(Q, (c) => {
      D() ? c(te) : c(d, !1);
    });
  }
  s(J, x), be();
}
var Qe = y('<div class="card-image svelte-1qx5g6b"><img class="svelte-1qx5g6b"/></div>'), $e = y('<h3 class="card-title svelte-1qx5g6b"> </h3>'), et = y('<p class="card-subtitle svelte-1qx5g6b"> </p>'), tt = y('<p class="card-description svelte-1qx5g6b"> </p>'), at = y('<article><!> <div class="card-content svelte-1qx5g6b"><!> <!> <!> <!></div></article>');
const rt = {
  hash: "svelte-1qx5g6b",
  code: ".card.svelte-1qx5g6b {overflow:hidden;border-radius:var(--radius-lg);border-width:1px;--tw-border-opacity: 1;border-color:rgb(229 231 235 / var(--tw-border-opacity, 1));--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}.card-elevated.svelte-1qx5g6b {--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.interactive.svelte-1qx5g6b {cursor:pointer;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:200ms}.interactive.svelte-1qx5g6b:hover {--tw-translate-y: -0.25rem;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.card-image.svelte-1qx5g6b {aspect-ratio:16 / 9;overflow:hidden}.card-image.svelte-1qx5g6b img:where(.svelte-1qx5g6b) {height:100%;width:100%;-o-object-fit:cover;object-fit:cover}.card-content.svelte-1qx5g6b > :where(.svelte-1qx5g6b):not([hidden]) ~ :where(.svelte-1qx5g6b):not([hidden]) {--tw-space-y-reverse: 0;margin-top:calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.5rem * var(--tw-space-y-reverse))}.card-content.svelte-1qx5g6b {padding:1rem}.card-title.svelte-1qx5g6b {font-size:1.125rem;line-height:1.75rem;font-weight:600;--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity, 1))}.card-subtitle.svelte-1qx5g6b {font-size:0.875rem;line-height:1.25rem;font-weight:500;--tw-text-opacity: 1;color:rgb(75 85 99 / var(--tw-text-opacity, 1))}.card-description.svelte-1qx5g6b {font-size:0.875rem;line-height:1.25rem;--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity, 1))}"
};
function Yt(J, t) {
  he(t, !1), je(J, rt);
  let h = f(t, "title", 8, ""), _ = f(t, "subtitle", 8, ""), C = f(t, "description", 8, ""), g = f(t, "image", 8, ""), N = f(t, "variant", 8, "default"), F = f(t, "interactive", 8, !1), R = f(t, "className", 8, "");
  const W = Pe();
  function S(d) {
    F() && W("click", { event: d });
  }
  we();
  var k = at();
  Ne(
    k,
    () => ({
      class: `card card-${N() ?? ""} ${F() ? "interactive" : ""} ${R() ?? ""}`,
      role: F() ? "button" : void 0,
      ...F() ? { tabindex: 0 } : {}
    }),
    void 0,
    void 0,
    "svelte-1qx5g6b"
  );
  var j = a(k);
  {
    var D = (d) => {
      var c = Qe(), z = a(c);
      b(() => {
        V(z, "src", g()), V(z, "alt", h());
      }), s(d, c);
    };
    q(j, (d) => {
      g() && d(D);
    });
  }
  var m = i(j, 2), P = a(m);
  {
    var L = (d) => {
      var c = $e(), z = a(c);
      b(() => M(z, h())), s(d, c);
    };
    q(P, (d) => {
      h() && d(L);
    });
  }
  var Z = i(P, 2);
  {
    var A = (d) => {
      var c = et(), z = a(c);
      b(() => M(z, _())), s(d, c);
    };
    q(Z, (d) => {
      _() && d(A);
    });
  }
  var x = i(Z, 2);
  {
    var Q = (d) => {
      var c = tt(), z = a(c);
      b(() => M(z, C())), s(d, c);
    };
    q(x, (d) => {
      C() && d(Q);
    });
  }
  var te = i(x, 2);
  de(te, t, "default", {}, null), U("click", k, (d) => S(d)), s(J, k), be();
}
var st = y("<h1><!></h1>"), it = y("<h2><!></h2>"), nt = y("<h3><!></h3>"), ot = y("<h4><!></h4>"), lt = y("<h5><!></h5>"), dt = y("<h6><!></h6>");
function Zt(J, t) {
  he(t, !1);
  const h = K();
  let _ = f(t, "level", 8, 1), C = f(t, "text", 8, ""), g = f(t, "color", 8, "text-white"), N = f(t, "spacing", 8, "normal");
  const F = {
    1: "!text-6xl md:!text-7xl font-bold leading-tight block",
    2: "!text-4xl md:!text-5xl font-bold leading-tight block",
    3: "!text-3xl md:!text-4xl font-semibold leading-snug block",
    4: "!text-2xl md:!text-3xl font-semibold leading-snug block",
    5: "!text-xl md:!text-2xl font-medium leading-normal block",
    6: "!text-lg md:!text-xl font-medium leading-normal block"
  }, R = {
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
  ne(
    () => (B(_()), B(g()), B(N())),
    () => {
      O(h, `${F[_()]} font-title ${g()} ${R[N()][_()]}`);
    }
  ), Te();
  var W = xe(), S = ue(W);
  {
    var k = (D) => {
      var m = st(), P = a(m);
      de(P, t, "default", {}, (L) => {
        var Z = ye();
        b(() => M(Z, C())), s(L, Z);
      }), b(() => T(m, 1, le(e(h)))), s(D, m);
    }, j = (D) => {
      var m = xe(), P = ue(m);
      {
        var L = (A) => {
          var x = it(), Q = a(x);
          de(Q, t, "default", {}, (te) => {
            var d = ye();
            b(() => M(d, C())), s(te, d);
          }), b(() => T(x, 1, le(e(h)))), s(A, x);
        }, Z = (A) => {
          var x = xe(), Q = ue(x);
          {
            var te = (c) => {
              var z = nt(), G = a(z);
              de(G, t, "default", {}, (ae) => {
                var re = ye();
                b(() => M(re, C())), s(ae, re);
              }), b(() => T(z, 1, le(e(h)))), s(c, z);
            }, d = (c) => {
              var z = xe(), G = ue(z);
              {
                var ae = ($) => {
                  var I = ot(), w = a(I);
                  de(w, t, "default", {}, (u) => {
                    var r = ye();
                    b(() => M(r, C())), s(u, r);
                  }), b(() => T(I, 1, le(e(h)))), s($, I);
                }, re = ($) => {
                  var I = xe(), w = ue(I);
                  {
                    var u = (n) => {
                      var v = lt(), o = a(v);
                      de(o, t, "default", {}, (X) => {
                        var ie = ye();
                        b(() => M(ie, C())), s(X, ie);
                      }), b(() => T(v, 1, le(e(h)))), s(n, v);
                    }, r = (n) => {
                      var v = xe(), o = ue(v);
                      {
                        var X = (ie) => {
                          var ce = dt(), pe = a(ce);
                          de(pe, t, "default", {}, (_e) => {
                            var oe = ye();
                            b(() => M(oe, C())), s(_e, oe);
                          }), b(() => T(ce, 1, le(e(h)))), s(ie, ce);
                        };
                        q(
                          o,
                          (ie) => {
                            _() === 6 && ie(X);
                          },
                          !0
                        );
                      }
                      s(n, v);
                    };
                    q(
                      w,
                      (n) => {
                        _() === 5 ? n(u) : n(r, !1);
                      },
                      !0
                    );
                  }
                  s($, I);
                };
                q(
                  G,
                  ($) => {
                    _() === 4 ? $(ae) : $(re, !1);
                  },
                  !0
                );
              }
              s(c, z);
            };
            q(
              Q,
              (c) => {
                _() === 3 ? c(te) : c(d, !1);
              },
              !0
            );
          }
          s(A, x);
        };
        q(
          P,
          (A) => {
            _() === 2 ? A(L) : A(Z, !1);
          },
          !0
        );
      }
      s(D, m);
    };
    q(S, (D) => {
      _() === 1 ? D(k) : D(j, !1);
    });
  }
  s(J, W), be();
}
var ct = y('<img alt="" class="absolute inset-0 w-full h-full object-cover animate-pulse"/>'), vt = y('<img class="w-full h-full object-cover transition-opacity duration-300"/>'), mt = y('<div class="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l2.586-2.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>'), ut = y("<div><!> <!> <!></div>");
function Gt(J, t) {
  he(t, !1);
  let h = f(t, "src", 8), _ = f(t, "alt", 8, ""), C = f(t, "width", 8, "100%"), g = f(t, "height", 8, "auto"), N = f(t, "loading", 8, "lazy"), F = f(t, "className", 8, ""), R = f(t, "placeholder", 8, "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"), W = K(!1), S = K(!1), k = K(!1), j = K();
  Ee(() => {
    if (N() === "lazy") {
      const d = new IntersectionObserver(
        (c) => {
          c.forEach((z) => {
            z.isIntersecting && (O(k, !0), d.unobserve(z.target));
          });
        },
        { rootMargin: "50px" }
      );
      return e(j) && d.observe(e(j)), () => d.disconnect();
    } else
      O(k, !0);
  });
  function D() {
    O(W, !0);
  }
  function m() {
    O(S, !0), console.warn("Failed to load image:", h());
  }
  we();
  var P = ut(), L = a(P);
  {
    var Z = (d) => {
      var c = ct();
      b(() => V(c, "src", R())), s(d, c);
    };
    q(L, (d) => {
      !e(W) && !e(S) && d(Z);
    });
  }
  var A = i(L, 2);
  {
    var x = (d) => {
      var c = vt();
      b(() => {
        V(c, "src", h()), V(c, "alt", _()), V(c, "loading", N()), ke(c, `opacity: ${e(W) ? 1 : 0};`);
      }), U("load", c, D), U("error", c, m), s(d, c);
    };
    q(A, (d) => {
      e(k) && !e(S) && d(x);
    });
  }
  var Q = i(A, 2);
  {
    var te = (d) => {
      var c = mt();
      s(d, c);
    };
    q(Q, (d) => {
      e(S) && d(te);
    });
  }
  Ce(P, (d) => O(j, d), () => e(j)), b(() => {
    T(P, 1, `relative overflow-hidden ${F() ?? ""}`), ke(P, `width: ${(typeof C() == "number" ? C() + "px" : C()) ?? ""}; height: ${(typeof g() == "number" ? g() + "px" : g()) ?? ""};`);
  }), s(J, P), be();
}
var ft = y('<div class="fixed bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs"><div class="flex items-center justify-between mb-2"><h3 class="font-bold"> </h3> <button class="text-gray-400 hover:text-white">×</button></div> <div class="space-y-1"><div> </div> <div> </div> <div> </div> <div> </div> <div class="pt-1 border-t border-gray-600"><div class="font-semibold"> </div></div></div></div>');
function Ut(J, t) {
  he(t, !1);
  let h = f(t, "isVisible", 12, !1), _ = f(t, "showInDev", 8, !0), C = f(t, "title", 8, "Debug Panel"), g = K({
    domContentLoaded: 0,
    loadComplete: 0,
    firstPaint: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0
  });
  Ee(() => {
    typeof window < "u" && "PerformanceObserver" in window && (new PerformanceObserver((k) => {
      for (const j of k.getEntries())
        j.name === "first-paint" && fe(g, e(g).firstPaint = j.startTime);
    }).observe({ entryTypes: ["paint"] }), new PerformanceObserver((k) => {
      for (const j of k.getEntries())
        j.name === "first-contentful-paint" && fe(g, e(g).firstContentfulPaint = j.startTime);
    }).observe({ entryTypes: ["paint"] }), new PerformanceObserver((k) => {
      const j = k.getEntries(), D = j[j.length - 1];
      fe(g, e(g).largestContentfulPaint = D.startTime);
    }).observe({ entryTypes: ["largest-contentful-paint"] }), new PerformanceObserver((k) => {
      for (const j of k.getEntries())
        j.hadRecentInput || fe(g, e(g).cumulativeLayoutShift += j.value);
    }).observe({ entryTypes: ["layout-shift"] })), window.addEventListener("DOMContentLoaded", () => {
      fe(g, e(g).domContentLoaded = performance.now());
    }), window.addEventListener("load", () => {
      fe(g, e(g).loadComplete = performance.now());
    }), _();
  });
  function N(k) {
    return `${Math.round(k)}ms`;
  }
  function F() {
    const k = e(g).firstContentfulPaint, j = e(g).largestContentfulPaint, D = e(g).cumulativeLayoutShift;
    let m = 100;
    return k > 1800 && (m -= 20), j > 2500 && (m -= 30), D > 0.1 && (m -= 25), e(g).loadComplete > 3e3 && (m -= 25), m >= 90 ? "🟢 Excellent" : m >= 70 ? "🟡 Good" : m >= 50 ? "🟠 Needs Improvement" : "🔴 Poor";
  }
  we();
  var R = xe(), W = ue(R);
  {
    var S = (k) => {
      var j = ft(), D = a(j), m = a(D), P = a(m), L = i(m, 2), Z = i(D, 2), A = a(Z), x = a(A), Q = i(A, 2), te = a(Q), d = i(Q, 2), c = a(d), z = i(d, 2), G = a(z), ae = i(z, 2), re = a(ae), $ = a(re);
      b(
        (I, w, u, r, n) => {
          M(P, C()), M(x, `FCP: ${I ?? ""}`), M(te, `LCP: ${w ?? ""}`), M(c, `CLS: ${u ?? ""}`), M(G, `Load: ${r ?? ""}`), M($, n);
        },
        [
          () => (e(g), H(() => N(e(g).firstContentfulPaint))),
          () => (e(g), H(() => N(e(g).largestContentfulPaint))),
          () => (e(g), H(() => e(g).cumulativeLayoutShift.toFixed(3))),
          () => (e(g), H(() => N(e(g).loadComplete))),
          () => H(F)
        ]
      ), U("click", L, () => h(!1)), s(k, j);
    };
    q(W, (k) => {
      h() && k(S);
    });
  }
  s(J, R), be();
}
var xt = y('<span class="text-sm text-secondary svelte-1nnpss"> </span>'), gt = y('<div class="flex justify-between items-center mb-2 svelte-1nnpss"><label class="text-sm font-medium text-primary svelte-1nnpss"> </label> <!></div>'), pt = y('<div class="absolute inset-0 flex items-center justify-center svelte-1nnpss"><span class="text-xs font-medium text-white svelte-1nnpss"> </span></div>'), bt = y('<div class="relative svelte-1nnpss"><div><div role="progressbar" aria-valuemin="0"></div></div> <!></div>'), ht = y("<span> </span>"), yt = y('<div class="relative inline-block svelte-1nnpss"><svg viewBox="0 0 44 44" role="progressbar" aria-valuemin="0"><circle cx="22" cy="22" r="20" stroke="currentColor" stroke-width="4" fill="none" class="text-neutral-200 dark:text-neutral-700 svelte-1nnpss"></circle><circle cx="22" cy="22" r="20" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"></circle></svg> <div class="absolute inset-0 flex items-center justify-center svelte-1nnpss"><!></div></div>'), wt = y("<div><!> <!> <!></div>");
const _t = {
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
function Jt(J, t) {
  he(t, !1), je(J, _t);
  const h = K(), _ = K(), C = K(), g = K(), N = K();
  let F = f(t, "value", 8, 0), R = f(t, "max", 8, 100), W = f(t, "size", 8, "md"), S = f(t, "variant", 8, "default"), k = f(t, "shape", 8, "linear"), j = f(t, "animated", 8, !0), D = f(t, "striped", 8, !1), m = f(t, "showValue", 8, !1), P = f(t, "label", 8, ""), L = f(t, "className", 8, "");
  const Z = Pe();
  let A = `progress-${Math.random().toString(36).substr(2, 9)}`;
  const x = {
    sm: { linear: "h-1", circular: "w-8 h-8", text: "text-xs" },
    md: { linear: "h-2", circular: "w-12 h-12", text: "text-sm" },
    lg: { linear: "h-3", circular: "w-16 h-16", text: "text-base" }
  }, Q = {
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
  ne(() => (B(F()), B(R())), () => {
    O(h, Math.min(Math.max(F() / R() * 100, 0), 100));
  }), ne(() => e(h), () => {
    O(_, e(h) >= 100);
  }), ne(
    () => (e(_), B(F()), B(R())),
    () => {
      e(_) && Z("complete", { value: F(), max: R() });
    }
  ), ne(() => B(k()), () => {
    O(C, k() === "circular" ? 2 * Math.PI * 20 : 0);
  }), ne(() => e(C), () => {
    O(g, e(C));
  }), ne(() => (e(C), e(h)), () => {
    O(N, e(C) - e(h) / 100 * e(C));
  }), Te(), we();
  var d = wt(), c = a(d);
  {
    var z = (I) => {
      var w = gt(), u = a(w), r = a(u), n = i(u, 2);
      {
        var v = (o) => {
          var X = xt(), ie = a(X);
          b((ce) => M(ie, `${ce ?? ""}%`), [
            () => (e(h), H(() => Math.round(e(h))))
          ]), s(o, X);
        };
        q(n, (o) => {
          m() && o(v);
        });
      }
      b(() => {
        V(u, "for", A), M(r, P());
      }), s(I, w);
    };
    q(c, (I) => {
      P() && I(z);
    });
  }
  var G = i(c, 2);
  {
    var ae = (I) => {
      var w = bt(), u = a(w), r = a(u), n = i(u, 2);
      {
        var v = (o) => {
          var X = pt(), ie = a(X), ce = a(ie);
          b((pe) => M(ce, `${pe ?? ""}%`), [
            () => (e(h), H(() => Math.round(e(h))))
          ]), s(o, X);
        };
        q(n, (o) => {
          m() && W() === "lg" && o(v);
        });
      }
      b(
        (o) => {
          T(
            u,
            1,
            `
                w-full rounded-full overflow-hidden
                ${B(W()), H(() => x[W()].linear) ?? ""}
                ${B(S()), H(() => te[S()]) ?? ""}
            `,
            "svelte-1nnpss"
          ), V(r, "id", A), T(
            r,
            1,
            `
                        h-full rounded-full transition-all duration-300 ease-out
                        ${B(S()), H(() => Q[S()]) ?? ""}
                        ${j() ? "animate-pulse" : ""}
                        ${D() ? "bg-stripes" : ""}
                    `,
            "svelte-1nnpss"
          ), ke(r, `width: ${e(h) ?? ""}%`), V(r, "aria-valuenow", F()), V(r, "aria-valuemax", R()), V(r, "aria-label", o);
        },
        [
          () => (B(P()), e(h), H(() => P() || `Progress: ${Math.round(e(h))}%`))
        ]
      ), s(I, w);
    }, re = (I) => {
      var w = xe(), u = ue(w);
      {
        var r = (n) => {
          var v = yt(), o = a(v), X = i(a(o)), ie = i(o, 2), ce = a(ie);
          {
            var pe = (oe) => {
              var ge = ht(), l = a(ge);
              b(
                (p) => {
                  T(
                    ge,
                    1,
                    `
                        font-medium text-primary
                        ${B(W()), H(() => x[W()].text) ?? ""}
                    `,
                    "svelte-1nnpss"
                  ), M(l, `${p ?? ""}%`);
                },
                [
                  () => (e(h), H(() => Math.round(e(h))))
                ]
              ), s(oe, ge);
            }, _e = (oe) => {
              var ge = xe(), l = ue(ge);
              de(l, t, "center", {}, null), s(oe, ge);
            };
            q(ce, (oe) => {
              m() ? oe(pe) : oe(_e, !1);
            });
          }
          b(
            (oe) => {
              V(o, "id", A), T(
                o,
                0,
                `transform -rotate-90 ${B(W()), H(() => x[W()].circular) ?? ""}`,
                "svelte-1nnpss"
              ), V(o, "aria-valuenow", F()), V(o, "aria-valuemax", R()), V(o, "aria-label", oe), V(X, "stroke-dasharray", e(g)), V(X, "stroke-dashoffset", e(N)), T(
                X,
                0,
                `
                        transition-all duration-300 ease-out
                        ${B(S()), H(() => Q[S()]) ?? ""}
                        ${j() ? "animate-pulse" : ""}
                    `,
                "svelte-1nnpss"
              );
            },
            [
              () => (B(P()), e(h), H(() => P() || `Progress: ${Math.round(e(h))}%`))
            ]
          ), s(n, v);
        };
        q(
          u,
          (n) => {
            k() === "circular" && n(r);
          },
          !0
        );
      }
      s(I, w);
    };
    q(G, (I) => {
      k() === "linear" ? I(ae) : I(re, !1);
    });
  }
  var $ = i(G, 2);
  de($, t, "default", {}, null), b(() => T(d, 1, `progress-container ${L() ?? ""}`, "svelte-1nnpss")), s(J, d), be();
}
var kt = y('<div class="text-center"><div></div> <p class="text-xs text-tertiary"> </p></div>'), zt = y('<div class="text-center"><div></div> <p class="text-xs text-tertiary"> </p></div>'), Ct = y('<div class="text-center"><div></div> <p class="text-xs text-tertiary"> </p></div>'), jt = y("<div></div>"), Tt = y("<div></div>"), St = y("<div></div>"), Pt = y('<div class="flex items-center space-x-4"><span class="text-tertiary text-sm w-12"> </span> <span> </span></div>'), Lt = y('<div class="flex items-center space-x-4"><span class="text-tertiary text-sm w-12"> </span> <span class="text-secondary text-sm w-20"> </span> <div></div></div>'), Et = y('<div class="text-center space-y-2"><div></div> <p class="text-xs text-tertiary"> </p></div>'), Bt = y('<div class="text-center space-y-2"><div></div> <p class="text-xs text-tertiary"> </p></div>'), Mt = y('<div class="text-center space-y-2"><div></div> <p class="text-xs text-tertiary"> </p></div>'), qt = y('<div class="min-h-screen bg-primary p-8"><div class="max-w-6xl mx-auto space-y-8"><div class="flex justify-between items-center mb-8"><div><h1 class="text-4xl font-bold text-primary mb-2">Tailwind Scale Demo</h1> <p class="text-lg text-secondary">Comprehensive scales supporting light and dark modes</p></div> <!></div> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Color Scales</h2> <div class="space-y-3"><h3 class="text-xl font-medium text-primary">Primary Scale</h3> <div class="grid grid-cols-11 gap-2"></div></div> <div class="space-y-3"><h3 class="text-xl font-medium text-primary">Secondary Scale</h3> <div class="grid grid-cols-11 gap-2"></div></div> <div class="space-y-3"><h3 class="text-xl font-medium text-primary">Neutral Scale</h3> <div class="grid grid-cols-11 gap-2"></div></div> <div class="space-y-3"><h3 class="text-xl font-medium text-primary">Semantic Colors</h3> <div class="grid grid-cols-3 gap-4"><div class="space-y-2"><h4 class="text-sm font-medium text-primary">Success</h4> <div class="grid grid-cols-5 gap-1"></div></div> <div class="space-y-2"><h4 class="text-sm font-medium text-primary">Warning</h4> <div class="grid grid-cols-5 gap-1"></div></div> <div class="space-y-2"><h4 class="text-sm font-medium text-primary">Error</h4> <div class="grid grid-cols-5 gap-1"></div></div></div></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Background & Surface Colors</h2> <div class="grid grid-cols-2 gap-6"><div class="space-y-4"><h3 class="text-xl font-medium text-primary">Background Colors</h3> <div class="space-y-3"><div class="bg-primary p-4 rounded-lg border border-primary"><p class="text-inverse font-medium">Primary Background</p> <p class="text-inverse text-sm opacity-80">bg-primary</p></div> <div class="bg-secondary p-4 rounded-lg border border-primary"><p class="text-primary font-medium">Secondary Background</p> <p class="text-secondary text-sm">bg-secondary</p></div> <div class="bg-tertiary p-4 rounded-lg border border-primary"><p class="text-primary font-medium">Tertiary Background</p> <p class="text-secondary text-sm">bg-tertiary</p></div></div></div> <div class="space-y-4"><h3 class="text-xl font-medium text-primary">Surface Colors</h3> <div class="space-y-3"><div class="bg-surface-primary p-4 rounded-lg border border-primary shadow-adaptive-sm"><p class="text-primary font-medium">Primary Surface</p> <p class="text-secondary text-sm">bg-surface-primary</p></div> <div class="bg-surface-secondary p-4 rounded-lg border border-primary shadow-adaptive-sm"><p class="text-primary font-medium">Secondary Surface</p> <p class="text-secondary text-sm">bg-surface-secondary</p></div> <div class="bg-surface-elevated p-4 rounded-lg border border-primary shadow-adaptive-md"><p class="text-primary font-medium">Elevated Surface</p> <p class="text-secondary text-sm">bg-surface-elevated</p></div></div></div></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Typography Scale</h2> <div class="space-y-4"></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Spacing Scale</h2> <div class="space-y-4"></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Border Radius Scale</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-4"></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Shadow Scale</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-6"></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Animation Scale</h2> <div class="grid grid-cols-2 md:grid-cols-3 gap-4"></div></section> <section class="space-y-6"><h2 class="text-3xl font-semibold text-primary mb-4">Component Examples</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-4"><h3 class="text-xl font-medium text-primary">Cards</h3> <div class="space-y-3"><div class="card p-4"><h4 class="text-lg font-medium text-primary mb-2">Standard Card</h4> <p class="text-secondary">This is a standard card with adaptive styling.</p></div> <div class="card-elevated p-4"><h4 class="text-lg font-medium text-primary mb-2">Elevated Card</h4> <p class="text-secondary">This is an elevated card with more shadow.</p></div></div></div> <div class="space-y-4"><h3 class="text-xl font-medium text-primary">Buttons</h3> <div class="space-y-3"><button class="button-primary">Primary Button</button> <button class="button-secondary">Secondary Button</button> <div class="flex space-x-2"><button class="px-3 py-1 text-sm bg-success-500 hover:bg-success-600 text-white rounded-md transition-colors">Success</button> <button class="px-3 py-1 text-sm bg-warning-500 hover:bg-warning-600 text-white rounded-md transition-colors">Warning</button> <button class="px-3 py-1 text-sm bg-error-500 hover:bg-error-600 text-white rounded-md transition-colors">Error</button></div></div></div></div></section></div></div>');
function Kt(J) {
  var t = qt(), h = a(t), _ = a(h), C = i(a(_), 2);
  We(C, { size: "lg", variant: "outline" });
  var g = i(_, 2), N = i(a(g), 2), F = i(a(N), 2);
  ve(F, 4, () => [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], me, (w, u) => {
    var r = kt(), n = a(r), v = i(n, 2), o = a(v);
    b(() => {
      T(n, 1, `w-16 h-16 rounded-lg bg-primary-${u ?? ""} border border-primary mb-2`), M(o, u);
    }), s(w, r);
  });
  var R = i(N, 2), W = i(a(R), 2);
  ve(W, 4, () => [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], me, (w, u) => {
    var r = zt(), n = a(r), v = i(n, 2), o = a(v);
    b(() => {
      T(n, 1, `w-16 h-16 rounded-lg bg-secondary-${u ?? ""} border border-primary mb-2`), M(o, u);
    }), s(w, r);
  });
  var S = i(R, 2), k = i(a(S), 2);
  ve(k, 4, () => [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], me, (w, u) => {
    var r = Ct(), n = a(r), v = i(n, 2), o = a(v);
    b(() => {
      T(n, 1, `w-16 h-16 rounded-lg bg-neutral-${u ?? ""} border border-primary mb-2`), M(o, u);
    }), s(w, r);
  });
  var j = i(S, 2), D = i(a(j), 2), m = a(D), P = i(a(m), 2);
  ve(P, 4, () => [400, 500, 600, 700, 800], me, (w, u) => {
    var r = jt();
    b(() => T(r, 1, `w-8 h-8 rounded bg-success-${u ?? ""} border border-primary`)), s(w, r);
  });
  var L = i(m, 2), Z = i(a(L), 2);
  ve(Z, 4, () => [400, 500, 600, 700, 800], me, (w, u) => {
    var r = Tt();
    b(() => T(r, 1, `w-8 h-8 rounded bg-warning-${u ?? ""} border border-primary`)), s(w, r);
  });
  var A = i(L, 2), x = i(a(A), 2);
  ve(x, 4, () => [400, 500, 600, 700, 800], me, (w, u) => {
    var r = St();
    b(() => T(r, 1, `w-8 h-8 rounded bg-error-${u ?? ""} border border-primary`)), s(w, r);
  });
  var Q = i(g, 4), te = i(a(Q), 2);
  ve(
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
    me,
    (w, u) => {
      var r = Pt(), n = a(r), v = a(n), o = i(n, 2), X = a(o);
      b(() => {
        M(v, u.size), T(o, 1, `${u.class ?? ""} text-primary`), M(X, u.text);
      }), s(w, r);
    }
  );
  var d = i(Q, 2), c = i(a(d), 2);
  ve(
    c,
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
    (w, u) => {
      var r = Lt(), n = a(r), v = a(n), o = i(n, 2), X = a(o), ie = i(o, 2);
      b(() => {
        M(v, u.size), M(X, u.value), T(ie, 1, `${u.class ?? ""} h-4 bg-primary-500 rounded`);
      }), s(w, r);
    }
  );
  var z = i(d, 2), G = i(a(z), 2);
  ve(
    G,
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
    (w, u) => {
      var r = Et(), n = a(r), v = i(n, 2), o = a(v);
      b(() => {
        T(n, 1, `w-16 h-16 bg-primary-500 ${u.class ?? ""} mx-auto`), M(o, u.size);
      }), s(w, r);
    }
  );
  var ae = i(z, 2), re = i(a(ae), 2);
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
    (w, u) => {
      var r = Bt(), n = a(r), v = i(n, 2), o = a(v);
      b(() => {
        T(n, 1, `w-20 h-20 bg-surface-primary border border-primary ${u.class ?? ""} mx-auto`), M(o, u.name);
      }), s(w, r);
    }
  );
  var $ = i(ae, 2), I = i(a($), 2);
  ve(
    I,
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
    (w, u) => {
      var r = Mt(), n = a(r), v = i(n, 2), o = a(v);
      b(() => {
        T(n, 1, `w-16 h-16 bg-primary-500 rounded-lg ${u.class ?? ""} mx-auto`), M(o, u.name);
      }), s(w, r);
    }
  ), s(J, t);
}
var It = y("<div></div>");
function Qt(J, t) {
  let h = f(t, "width", 8, "100%"), _ = f(t, "height", 8, "1rem"), C = f(t, "borderRadius", 8, "0.5rem"), g = f(t, "className", 8, "");
  var N = It();
  b(() => {
    T(N, 1, `animate-pulse bg-stone-800 ${g() ?? ""}`), ke(N, `width: ${h() ?? ""}; height: ${_() ?? ""}; border-radius: ${C() ?? ""};`);
  }), s(J, N);
}
var Dt = y('<button type="button" class="inline-block svelte-13nzt82"><!></button>'), At = y('<div role="button" tabindex="0" class="inline-block svelte-13nzt82"><!></div>'), Nt = y("<div></div>"), Ft = y('<div role="tooltip"><div class="relative svelte-13nzt82"> <!></div></div>'), Rt = y("<!> <!>", 1);
const Wt = {
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
function $t(J, t) {
  he(t, !1), je(J, Wt);
  let h = f(t, "content", 8, ""), _ = f(t, "placement", 8, "top"), C = f(t, "trigger", 8, "hover"), g = f(t, "disabled", 8, !1), N = f(t, "delay", 8, 200), F = f(t, "maxWidth", 8, "200px"), R = f(t, "variant", 8, "default"), W = f(t, "size", 8, "md"), S = f(t, "arrow", 8, !0), k = f(t, "interactive", 8, !1), j = f(t, "className", 8, "");
  const D = Pe();
  let m = K(), P = K(), L = K(!1), Z, A, x;
  const Q = {
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
  function d() {
    if (!e(P) || !e(m)) return { top: 0, left: 0 };
    x = e(P).getBoundingClientRect();
    const l = e(m).getBoundingClientRect(), p = window.scrollY, se = window.scrollX, E = window.innerWidth, ze = window.innerHeight;
    let ee = 0, Y = 0;
    switch (_()) {
      case "top":
        ee = x.top + p - l.height - 8, Y = x.left + se + (x.width - l.width) / 2;
        break;
      case "top-start":
        ee = x.top + p - l.height - 8, Y = x.left + se;
        break;
      case "top-end":
        ee = x.top + p - l.height - 8, Y = x.right + se - l.width;
        break;
      case "bottom":
        ee = x.bottom + p + 8, Y = x.left + se + (x.width - l.width) / 2;
        break;
      case "bottom-start":
        ee = x.bottom + p + 8, Y = x.left + se;
        break;
      case "bottom-end":
        ee = x.bottom + p + 8, Y = x.right + se - l.width;
        break;
      case "left":
        ee = x.top + p + (x.height - l.height) / 2, Y = x.left + se - l.width - 8;
        break;
      case "left-start":
        ee = x.top + p, Y = x.left + se - l.width - 8;
        break;
      case "left-end":
        ee = x.bottom + p - l.height, Y = x.left + se - l.width - 8;
        break;
      case "right":
        ee = x.top + p + (x.height - l.height) / 2, Y = x.right + se + 8;
        break;
      case "right-start":
        ee = x.top + p, Y = x.right + se + 8;
        break;
      case "right-end":
        ee = x.bottom + p - l.height, Y = x.right + se + 8;
        break;
    }
    return Y < 8 && (Y = 8), Y + l.width > E - 8 && (Y = E - l.width - 8), ee < 8 && (ee = 8), ee + l.height > ze + p - 8 && (ee = ze + p - l.height - 8), { top: ee, left: Y };
  }
  function c(l) {
    g() || e(L) || (clearTimeout(A), Z = setTimeout(
      () => {
        O(L, !0), D("show", { event: l }), requestAnimationFrame(() => {
          const p = d();
          e(m) && (fe(m, e(m).style.top = `${p.top}px`), fe(m, e(m).style.left = `${p.left}px`));
        });
      },
      N()
    ));
  }
  function z(l) {
    e(L) && (clearTimeout(Z), A = setTimeout(
      () => {
        O(L, !1), D("hide", { event: l });
      },
      k() ? 300 : 0
    ));
  }
  function G(l) {
    C() === "click" && (e(L) ? z(l) : c(l));
  }
  function ae(l) {
    C() === "click" && (l.key === "Enter" || l.key === " ") && (l.preventDefault(), e(L) ? z(l) : c(l));
  }
  function re(l) {
    C() === "focus" && c(l);
  }
  function $(l) {
    C() === "focus" && z(l);
  }
  function I(l) {
    C() === "hover" && c(l);
  }
  function w(l) {
    C() === "hover" && z(l);
  }
  function u() {
    k() && clearTimeout(A);
  }
  function r(l) {
    k() && z(l);
  }
  function n() {
    g() || O(L, !0);
  }
  function v() {
    O(L, !1);
  }
  function o() {
    e(L) ? v() : n();
  }
  Ee(() => () => {
    clearTimeout(Z), clearTimeout(A);
  }), ne(() => (e(L), e(m)), () => {
    e(L) && e(m) && requestAnimationFrame(() => {
      const l = d();
      fe(m, e(m).style.top = `${l.top}px`), fe(m, e(m).style.left = `${l.left}px`);
    });
  }), Te();
  var X = { show: n, hide: v, toggle: o };
  we();
  var ie = Rt(), ce = ue(ie);
  {
    var pe = (l) => {
      var p = Dt(), se = a(p);
      de(se, t, "default", {}, null), Ce(p, (E) => O(P, E), () => e(P)), b(() => V(p, "aria-describedby", e(L) ? "tooltip-{content}" : void 0)), U("click", p, (E) => G(E)), U("keydown", p, (E) => ae(E)), U("focus", p, (E) => re(E)), U("blur", p, (E) => $(E)), U("mouseenter", p, (E) => I(E)), U("mouseleave", p, (E) => w(E)), s(l, p);
    }, _e = (l) => {
      var p = At(), se = a(p);
      de(se, t, "default", {}, null), Ce(p, (E) => O(P, E), () => e(P)), b(() => V(p, "aria-describedby", e(L) ? "tooltip-{content}" : void 0)), U("click", p, (E) => G(E)), U("keydown", p, (E) => ae(E)), U("focus", p, (E) => re(E)), U("blur", p, (E) => $(E)), U("mouseenter", p, (E) => I(E)), U("mouseleave", p, (E) => w(E)), s(l, p);
    };
    q(ce, (l) => {
      C() === "click" ? l(pe) : l(_e, !1);
    });
  }
  var oe = i(ce, 2);
  {
    var ge = (l) => {
      var p = Ft(), se = a(p), E = a(se), ze = i(E);
      {
        var ee = (Y) => {
          var Be = Nt();
          b(
            (Me, qe, Ie, De, Ae) => T(
              Be,
              1,
              `
                    absolute w-2 h-2 transform rotate-45
                    ${Me ?? ""}
                    ${qe ?? ""}
                    ${Ie ?? ""}
                    ${De ?? ""}
                    ${Ae ?? ""}
                `,
              "svelte-13nzt82"
            ),
            [
              () => (B(R()), H(() => te[R()].split(" ")[0])),
              () => (B(_()), H(() => _().includes("top") ? "bottom-[-4px] left-1/2 -translate-x-1/2" : "")),
              () => (B(_()), H(() => _().includes("bottom") ? "top-[-4px] left-1/2 -translate-x-1/2" : "")),
              () => (B(_()), H(() => _().includes("left") ? "right-[-4px] top-1/2 -translate-y-1/2" : "")),
              () => (B(_()), H(() => _().includes("right") ? "left-[-4px] top-1/2 -translate-y-1/2" : ""))
            ]
          ), s(Y, Be);
        };
        q(ze, (Y) => {
          S() && Y(ee);
        });
      }
      Ce(p, (Y) => O(m, Y), () => e(m)), b(() => {
        V(p, "id", `tooltip-${h() ?? ""}`), T(
          p,
          1,
          `
            fixed z-tooltip
            ${B(W()), H(() => Q[W()]) ?? ""}
            ${B(R()), H(() => te[R()]) ?? ""}
            border rounded-lg shadow-adaptive-lg
            ${j() ?? ""}
        `,
          "svelte-13nzt82"
        ), ke(p, `max-width: ${F() ?? ""};`), M(E, `${h() ?? ""} `);
      }), U("mouseenter", p, u), U("mouseleave", p, r), Fe(3, p, () => Re, () => ({
        x: _().includes("left") ? -10 : _().includes("right") ? 10 : 0,
        y: _().includes("top") ? -10 : _().includes("bottom") ? 10 : 0,
        duration: 200
      })), s(l, p);
    };
    q(oe, (l) => {
      e(L) && h() && l(ge);
    });
  }
  return s(J, ie), Le(t, "show", n), Le(t, "hide", v), Le(t, "toggle", o), be(X);
}
export {
  Xt as B,
  Yt as C,
  Zt as H,
  Gt as O,
  Ut as P,
  Kt as S,
  $t as T,
  Jt as a,
  Qt as b
};
