import { p as a, m as ee, f as c, i as S, a as T, y as le, b as l, c as H, d as V, h as d, o as B, r as N, g as i, l as I, v as j, w as J, x as D, q as te, t as re, z as se, k as X, n as Y, A as R, B as G, C as de, D as ve, e as ce, s as be } from "../props-wKhXfKGm.js";
import { a as ue, e as ge } from "../Checkbox-CkP1SqGn.js";
import { B as nt, C as st, I as dt, T as vt } from "../Checkbox-CkP1SqGn.js";
import { T as bt } from "../ThemeToggle-BBLYWPSs.js";
var me = c('<label class="block text-sm font-medium text-gray-700 mb-1"> </label>'), fe = c("<option disabled> </option>"), he = c("<option> </option>"), pe = c("<div><!> <select><!><!></select></div>");
function Ke(x, e) {
  V(e, !0);
  let t = a(e, "value", 7, void 0), r = a(e, "options", 19, () => []), n = a(e, "placeholder", 3, "Select an option"), g = a(e, "label", 3, ""), b = a(e, "disabled", 3, !1), f = a(e, "size", 3, "md"), w = N(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "options",
    "placeholder",
    "label",
    "disabled",
    "size"
  ]), z = ee(typeof window < "u" ? `select-${Math.random().toString(36).substr(2, 9)}` : `select-ssr-${Date.now()}`), k = I(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), u = I(() => [
    "w-full border border-gray-300 rounded-md bg-white",
    "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    i(k)[f()]
  ].join(" "));
  function v(y) {
    const p = y.target;
    t(p.value);
  }
  var s = pe(), o = d(s);
  {
    var m = (y) => {
      var p = me(), M = d(p);
      j(() => {
        J(p, "for", z), D(M, g());
      }), l(y, p);
    };
    S(o, (y) => {
      g() && y(m);
    });
  }
  var h = B(o, 2);
  T(h, () => ({
    id: z,
    value: t(),
    disabled: b(),
    class: i(u),
    onchange: v,
    ...w
  }));
  var P = d(h);
  {
    var _ = (y) => {
      var p = fe(), M = d(p);
      p.value = p.__value = "", j(() => D(M, n())), l(y, p);
    };
    S(P, (y) => {
      n() && !t() && y(_);
    });
  }
  var C = B(P);
  le(C, 17, r, (y) => y.value, (y, p) => {
    var M = he(), q = d(M), A = {};
    j(() => {
      M.disabled = i(p).disabled, D(q, i(p).label), A !== (A = i(p).value) && (M.value = (M.__value = i(p).value) ?? "");
    }), l(y, M);
  }), l(x, s), H();
}
var xe = c('<span class="text-sm font-medium text-gray-700"> </span>'), _e = c('<div class="flex items-center gap-3"><button><span></span></button> <!></div>');
function Le(x, e) {
  V(e, !0);
  let t = a(e, "checked", 7, !1), r = a(e, "disabled", 3, !1), n = a(e, "label", 3, ""), g = N(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "checked",
    "disabled",
    "label"
  ]), b = I(() => [
    "relative inline-flex w-11 h-6 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent",
    "transition-colors duration-200 ease-in-out",
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    t() ? "bg-blue-600" : "bg-gray-200",
    r() ? "opacity-50 cursor-not-allowed" : ""
  ].join(" ")), f = I(() => [
    "pointer-events-none inline-block w-5 h-5 transform rounded-full bg-white shadow-lg",
    "transition duration-200 ease-in-out",
    t() ? "translate-x-5" : "translate-x-0"
  ].join(" "));
  function w(o) {
    r() || t(!t());
  }
  var z = _e(), k = d(z);
  T(k, () => ({
    type: "button",
    role: "switch",
    "aria-checked": t(),
    "aria-label": n() || "Toggle",
    disabled: r(),
    onclick: w,
    class: i(b),
    ...g
  }));
  var u = d(k), v = B(k, 2);
  {
    var s = (o) => {
      var m = xe(), h = d(m);
      j(() => D(h, n())), l(o, m);
    };
    S(v, (o) => {
      n() && o(s);
    });
  }
  j(() => te(u, 1, re(i(f)))), l(x, z), H();
}
var ye = c('<label class="block text-sm font-medium text-gray-700"> </label>'), we = c('<span class="text-white text-lg">✓</span>'), ze = c("<button><!></button>"), ke = c('<div class="space-y-2"><!> <div></div></div>');
function Qe(x, e) {
  V(e, !0);
  let t = a(e, "value", 7, ""), r = a(e, "label", 3, ""), n = a(e, "disabled", 3, !1), g = N(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "label",
    "disabled"
  ]);
  const b = [
    { label: "Red", value: "#ef4444" },
    { label: "Blue", value: "#3b82f6" },
    { label: "Green", value: "#10b981" },
    { label: "Yellow", value: "#f59e0b" },
    { label: "Purple", value: "#8b5cf6" },
    { label: "Pink", value: "#ec4899" },
    { label: "Gray", value: "#6b7280" },
    { label: "Black", value: "#000000" }
  ];
  let f = ee(typeof window < "u" ? `color-picker-${Math.random().toString(36).substr(2, 9)}` : `color-picker-ssr-${Date.now()}`);
  var w = ke(), z = d(w);
  {
    var k = (v) => {
      var s = ye(), o = d(s);
      j(() => {
        J(s, "for", f), D(o, r());
      }), l(v, s);
    };
    S(z, (v) => {
      r() && v(k);
    });
  }
  var u = B(z, 2);
  T(u, () => ({
    id: f,
    class: "grid grid-cols-4 gap-2",
    role: "radiogroup",
    ...g
  })), le(u, 21, () => b, se, (v, s) => {
    var o = ze(), m = () => t(i(s).value);
    T(o, () => ({
      type: "button",
      class: `w-12 h-12 rounded-lg border-2 transition-all ${t() === i(s).value ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300 hover:border-gray-400"}`,
      style: `background-color: ${i(s).value ?? ""};`,
      onclick: m,
      disabled: n(),
      role: "radio",
      "aria-checked": t() === i(s).value,
      "aria-label": i(s).label,
      ...g
    }));
    var h = d(o);
    {
      var P = (_) => {
        var C = we();
        l(_, C);
      };
      S(h, (_) => {
        t() === i(s).value && _(P);
      });
    }
    l(v, o);
  }), l(x, w), H();
}
var Ce = c('<img class="w-full h-48 object-cover rounded-md mb-4"/>'), Pe = c("<h3> </h3>"), Se = c("<div><!> <!> <!></div>");
function We(x, e) {
  V(e, !0);
  let t = a(e, "title", 3, ""), r = a(e, "image", 3, ""), n = a(e, "interactive", 3, !1), g = a(e, "variant", 3, "default"), b = a(e, "size", 3, "md"), f = N(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "title",
    "image",
    "interactive",
    "variant",
    "size",
    "children"
  ]), w = I(() => ({ sm: "p-3", md: "p-4", lg: "p-6" })), z = I(() => ue(g())), k = I(() => [
    "rounded-lg transition-all duration-200",
    "hover:shadow-adaptive-md",
    n() ? "cursor-pointer hover:scale-[1.02]" : "",
    i(w)[b()],
    i(z)
  ].join(" ")), u = I(() => "text-lg font-semibold mb-2 text-primary");
  var v = Se();
  T(v, () => ({ class: i(k), ...f }));
  var s = d(v);
  {
    var o = (_) => {
      var C = Ce();
      j(() => {
        J(C, "src", r()), J(C, "alt", t());
      }), l(_, C);
    };
    S(s, (_) => {
      r() && _(o);
    });
  }
  var m = B(s, 2);
  {
    var h = (_) => {
      var C = Pe();
      te(C, 1, re(i(u)));
      var y = d(C);
      j(() => D(y, t())), l(_, C);
    };
    S(m, (_) => {
      t() && _(h);
    });
  }
  var P = B(m, 2);
  X(P, () => e.children ?? Y), l(x, v), H();
}
var Te = c('<button><!> <span class="ml-1 text-xs">×</span></button>'), je = c("<span><!></span>");
function Ze(x, e) {
  V(e, !0);
  let t = a(e, "variant", 3, "default"), r = a(e, "size", 3, "md"), n = a(e, "closable", 3, !1), g = N(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "variant",
    "size",
    "closable",
    "children"
  ]);
  function b(o) {
    o.stopPropagation();
  }
  let f = I(() => ({
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  })), w = I(() => ({
    default: "bg-gray-100 text-gray-800 border-gray-300",
    success: "bg-green-100 text-green-800 border-green-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    error: "bg-red-100 text-red-800 border-red-300",
    info: "bg-blue-100 text-blue-800 border-blue-300"
  })), z = I(() => [
    "inline-flex items-center gap-1 font-medium border rounded-md",
    i(f)[r()],
    i(w)[t()],
    n() ? "cursor-pointer hover:opacity-80" : ""
  ].join(" "));
  var k = R(), u = G(k);
  {
    var v = (o) => {
      var m = Te();
      T(m, () => ({
        type: "button",
        class: i(z),
        onclick: b,
        ...g
      }));
      var h = d(m);
      X(h, () => e.children ?? Y), l(o, m);
    }, s = (o) => {
      var m = je();
      T(m, () => ({ class: i(z), ...g }));
      var h = d(m);
      X(h, () => e.children ?? Y), l(o, m);
    };
    S(u, (o) => {
      n() ? o(v) : o(s, !1);
    });
  }
  l(x, k), H();
}
var Me = c("<h1> <!></h1>"), Be = c("<h2> <!></h2>"), De = c("<h3> <!></h3>"), Ie = c("<h4> <!></h4>"), Ne = c("<h5> <!></h5>"), Xe = c("<h6> <!></h6>");
function $e(x, e) {
  V(e, !0);
  let t = a(e, "level", 3, 1), r = a(e, "text", 3, ""), n = N(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "level",
    "text",
    "children"
  ]), g = I(() => ({
    1: "text-4xl font-bold",
    2: "text-3xl font-bold",
    3: "text-2xl font-semibold",
    4: "text-xl font-semibold",
    5: "text-lg font-medium",
    6: "text-base font-medium"
  })), b = I(() => ["text-gray-900", i(g)[t()]].join(" "));
  var f = R(), w = G(f);
  {
    var z = (u) => {
      var v = Me();
      T(v, () => ({ class: i(b), ...n }));
      var s = d(v), o = B(s);
      X(o, () => e.children ?? Y), j(() => D(s, r())), l(u, v);
    }, k = (u) => {
      var v = R(), s = G(v);
      {
        var o = (h) => {
          var P = Be();
          T(P, () => ({ class: i(b), ...n }));
          var _ = d(P), C = B(_);
          X(C, () => e.children ?? Y), j(() => D(_, r())), l(h, P);
        }, m = (h) => {
          var P = R(), _ = G(P);
          {
            var C = (p) => {
              var M = De();
              T(M, () => ({ class: i(b), ...n }));
              var q = d(M), A = B(q);
              X(A, () => e.children ?? Y), j(() => D(q, r())), l(p, M);
            }, y = (p) => {
              var M = R(), q = G(M);
              {
                var A = (O) => {
                  var U = Ie();
                  T(U, () => ({ class: i(b), ...n }));
                  var K = d(U), Q = B(K);
                  X(Q, () => e.children ?? Y), j(() => D(K, r())), l(O, U);
                }, oe = (O) => {
                  var U = R(), K = G(U);
                  {
                    var Q = (E) => {
                      var F = Ne();
                      T(F, () => ({ class: i(b), ...n }));
                      var L = d(F), W = B(L);
                      X(W, () => e.children ?? Y), j(() => D(L, r())), l(E, F);
                    }, ie = (E) => {
                      var F = R(), L = G(F);
                      {
                        var W = (Z) => {
                          var $ = Xe();
                          T($, () => ({ class: i(b), ...n }));
                          var ae = d($), ne = B(ae);
                          X(ne, () => e.children ?? Y), j(() => D(ae, r())), l(Z, $);
                        };
                        S(
                          L,
                          (Z) => {
                            t() === 6 && Z(W);
                          },
                          !0
                        );
                      }
                      l(E, F);
                    };
                    S(
                      K,
                      (E) => {
                        t() === 5 ? E(Q) : E(ie, !1);
                      },
                      !0
                    );
                  }
                  l(O, U);
                };
                S(
                  q,
                  (O) => {
                    t() === 4 ? O(A) : O(oe, !1);
                  },
                  !0
                );
              }
              l(p, M);
            };
            S(
              _,
              (p) => {
                t() === 3 ? p(C) : p(y, !1);
              },
              !0
            );
          }
          l(h, P);
        };
        S(
          s,
          (h) => {
            t() === 2 ? h(o) : h(m, !1);
          },
          !0
        );
      }
      l(u, v);
    };
    S(w, (u) => {
      t() === 1 ? u(z) : u(k, !1);
    });
  }
  l(x, f), H();
}
var Ye = c('<div class="flex justify-between items-center mb-2"><label class="text-sm font-medium text-gray-700"> </label> <span class="text-sm text-gray-500"> </span></div>'), Re = c('<div><!> <div><div class="h-full bg-blue-600 rounded-full"></div></div></div>');
function et(x, e) {
  V(e, !0);
  let t = a(e, "value", 3, 0), r = a(e, "max", 3, 100), n = a(e, "size", 3, "md"), g = a(e, "label", 3, ""), b = N(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "max",
    "size",
    "label"
  ]), f = ee(typeof window < "u" ? `progress-${Math.random().toString(36).substr(2, 9)}` : `progress-ssr-${Date.now()}`), w = I(() => Math.min(Math.max(t() / r() * 100, 0), 100)), z = I(() => ({ sm: "h-1", md: "h-2", lg: "h-3" }));
  var k = Re(), u = d(k);
  {
    var v = (m) => {
      var h = Ye(), P = d(h), _ = d(P), C = B(P, 2), y = d(C);
      j(
        (p) => {
          J(P, "for", f), D(_, g()), D(y, `${p ?? ""}%`);
        },
        [() => Math.round(i(w))]
      ), l(m, h);
    };
    S(u, (m) => {
      g() && m(v);
    });
  }
  var s = B(u, 2);
  T(s, () => ({
    id: f,
    class: `w-full bg-gray-200 rounded-full overflow-hidden ${i(z)[n()] ?? ""}`,
    role: "progressbar",
    "aria-valuenow": t(),
    "aria-valuemin": "0",
    "aria-valuemax": r(),
    ...b
  }));
  var o = d(s);
  j(() => de(o, `width: ${i(w) ?? ""}%`)), l(x, k), H();
}
var Ge = c("<div></div>");
function tt(x, e) {
  let t = a(e, "width", 3, "100%"), r = a(e, "height", 3, "1rem"), n = a(e, "className", 3, ""), g = N(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "width",
    "height",
    "className",
    "children"
  ]);
  var b = Ge();
  T(b, () => ({
    class: `animate-pulse bg-gray-200 rounded ${n() ?? ""}`,
    style: `width: ${t() ?? ""}; height: ${r() ?? ""};`,
    ...g
  })), l(x, b);
}
function He(x, e) {
  be(e, !1);
}
var Ve = c('<button type="button" class="ml-3 text-gray-400 hover:text-gray-600" aria-label="Close notification">×</button>'), qe = c('<div><div class="flex items-start"><div class="flex-1"><p> </p></div> <!></div></div>');
function at(x, e) {
  let t = a(e, "message", 3, ""), r = a(e, "type", 3, "info"), n = a(e, "closable", 3, !0), g = N(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "message",
    "type",
    "closable",
    "children"
  ]), b = ce(!0);
  const f = {
    success: "bg-green-100 border-green-300 text-green-800",
    error: "bg-red-100 border-red-300 text-red-800",
    warning: "bg-yellow-100 border-yellow-300 text-yellow-800",
    info: "bg-blue-100 border-blue-300 text-blue-800"
  };
  var w = R(), z = G(w);
  {
    var k = (u) => {
      var v = qe();
      T(v, () => ({
        class: "fixed top-4 right-4 max-w-sm w-full bg-white border rounded-lg shadow-lg p-4 z-50",
        role: "alert",
        ...g
      }));
      var s = d(v), o = d(s), m = d(o), h = d(m), P = B(o, 2);
      {
        var _ = (C) => {
          var y = Ve();
          y.__click = [He, b], l(C, y);
        };
        S(P, (C) => {
          n() && C(_);
        });
      }
      j(() => {
        te(m, 1, `text-sm ${f[r()] ?? ""}`), D(h, t());
      }), l(u, v);
    };
    S(z, (u) => {
      i(b) && u(k);
    });
  }
  l(x, w);
}
ve(["click"]);
var Ae = c('<div class="tooltip group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible svelte-13nzt82" role="tooltip" aria-hidden="true"> </div>'), Oe = c("<div><!> <!></div>");
const Ue = {
  hash: "svelte-13nzt82",
  code: `:root {--tooltip-bg: #1f2937;--tooltip-color: white;--tooltip-padding: 0.5rem 0.75rem;--tooltip-radius: 0.375rem;--tooltip-font-size: 0.875rem;--tooltip-line-height: 1.25rem;--tooltip-max-width: 200px;--tooltip-gap: 0.5rem;--tooltip-arrow-size: 4px;--tooltip-transition: opacity 0.2s ease-in-out,
            visibility 0.2s ease-in-out;}.tooltip-container.svelte-13nzt82 {position:relative;display:inline-block;}.tooltip.svelte-13nzt82 {position:absolute;z-index:50;padding:var(--tooltip-padding);background-color:var(--tooltip-bg);color:var(--tooltip-color);border-radius:var(--tooltip-radius);font-size:var(--tooltip-font-size);line-height:var(--tooltip-line-height);max-width:var(--tooltip-max-width);white-space:normal;word-wrap:break-word;opacity:0;visibility:hidden;transition:var(--tooltip-transition);pointer-events:none;
        /* Use logical properties for better internationalization */inset-inline-start:50%;inset-block-start:50%;transform:translate(-50%, -50%);}

    /* Simplified positioning using CSS custom properties and logical properties */.tooltip-container[data-placement="top"].svelte-13nzt82 .tooltip:where(.svelte-13nzt82) {inset-block-end:100%;inset-inline-start:50%;transform:translateX(-50%);margin-block-end:var(--tooltip-gap);}.tooltip-container[data-placement="bottom"].svelte-13nzt82 .tooltip:where(.svelte-13nzt82) {inset-block-start:100%;inset-inline-start:50%;transform:translateX(-50%);margin-block-start:var(--tooltip-gap);}.tooltip-container[data-placement="left"].svelte-13nzt82 .tooltip:where(.svelte-13nzt82) {inset-inline-end:100%;inset-block-start:50%;transform:translateY(-50%);margin-inline-end:var(--tooltip-gap);}.tooltip-container[data-placement="right"].svelte-13nzt82 .tooltip:where(.svelte-13nzt82) {inset-inline-start:100%;inset-block-start:50%;transform:translateY(-50%);margin-inline-start:var(--tooltip-gap);}

    /* Modern arrow implementation using CSS clip-path for better performance */.tooltip.svelte-13nzt82::before {content:"";position:absolute;width:calc(var(--tooltip-arrow-size) * 2);height:calc(var(--tooltip-arrow-size) * 2);background-color:var(--tooltip-bg);}.tooltip-container[data-placement="top"].svelte-13nzt82 .tooltip:where(.svelte-13nzt82)::before {inset-block-start:100%;inset-inline-start:50%;transform:translateX(-50%);clip-path:polygon(50% 100%, 0 0, 100% 0);}.tooltip-container[data-placement="bottom"].svelte-13nzt82 .tooltip:where(.svelte-13nzt82)::before {inset-block-end:100%;inset-inline-start:50%;transform:translateX(-50%);clip-path:polygon(0 100%, 50% 0, 100% 100%);}.tooltip-container[data-placement="left"].svelte-13nzt82 .tooltip:where(.svelte-13nzt82)::before {inset-inline-start:100%;inset-block-start:50%;transform:translateY(-50%);clip-path:polygon(0 50%, 100% 0, 100% 100%);}.tooltip-container[data-placement="right"].svelte-13nzt82 .tooltip:where(.svelte-13nzt82)::before {inset-inline-end:100%;inset-block-start:50%;transform:translateY(-50%);clip-path:polygon(0 0, 100% 50%, 0 100%);}

    /* Delay support using CSS custom properties */.tooltip-container[data-delay].svelte-13nzt82 .tooltip:where(.svelte-13nzt82) {transition-delay:calc(var(--tooltip-delay, 0) * 1ms);}

    /* Responsive design with modern CSS */
    @media (max-width: 640px) {.tooltip.svelte-13nzt82 {--tooltip-max-width: calc(100vw - 2rem);inset-inline-start:50% !important;inset-inline-end:auto !important;transform:translateX(-50%) !important;margin:var(--tooltip-gap) 0 !important;}.tooltip.svelte-13nzt82::before {display:none;}
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {:root {--tooltip-bg: #374151;}
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {:root {--tooltip-bg: #000000;--tooltip-color: #ffffff;}
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {.tooltip.svelte-13nzt82 {transition:none;}
    }`
};
function lt(x, e) {
  ge(x, Ue);
  let t = a(e, "content", 3, ""), r = a(e, "placement", 3, "top"), n = a(e, "delay", 3, 0), g = a(e, "disabled", 3, !1), b = N(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "content",
    "placement",
    "delay",
    "disabled",
    "children"
  ]);
  var f = Oe();
  T(
    f,
    () => ({
      class: "tooltip-container group relative inline-block",
      "data-placement": r(),
      "data-delay": n(),
      "data-disabled": g(),
      ...b
    }),
    void 0,
    void 0,
    "svelte-13nzt82"
  );
  var w = d(f);
  X(w, () => e.children ?? Y);
  var z = B(w, 2);
  {
    var k = (u) => {
      var v = Ae(), s = d(v);
      j(() => D(s, t())), l(u, v);
    };
    S(z, (u) => {
      t() && !g() && u(k);
    });
  }
  l(x, f);
}
var Ee = c("<img/>");
function rt(x, e) {
  let t = a(e, "alt", 3, ""), r = a(e, "width", 3, "100%"), n = a(e, "height", 3, "auto"), g = a(e, "className", 3, ""), b = N(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "src",
    "alt",
    "width",
    "height",
    "className",
    "children"
  ]);
  var f = Ee();
  T(f, () => ({
    src: e.src,
    alt: t(),
    class: `w-full h-auto object-cover ${g() ?? ""}`,
    style: `width: ${(typeof r() == "number" ? r() + "px" : r()) ?? ""}; height: ${(typeof n() == "number" ? n() + "px" : n()) ?? ""};`,
    loading: "lazy",
    ...b
  })), l(x, f);
}
export {
  Ze as Badge,
  nt as Button,
  We as Card,
  st as Checkbox,
  Qe as ColorPicker,
  $e as Heading,
  dt as Input,
  rt as OptimizedImage,
  et as Progress,
  Ke as Select,
  tt as Skeleton,
  vt as Textarea,
  bt as ThemeToggle,
  at as Toast,
  Le as Toggle,
  lt as Tooltip
};
