import { p as t, x as ee, f as g, i as j, a as S, F as le, b as l, c as R, d as F, h as r, y as B, r as D, g as v, v as M, t as N, B as E, C as T, z as te, A as re, G as de, q as X, w as Y, H as G, I as H, J as ve, D as ce, e as be, s as ue } from "../props-BKbHJRuR.js";
import { a as ge, f as oe } from "../CodeBlock-Bbv6JfD2.js";
import { B as vt, C as ct, e as bt, I as ut, T as gt } from "../CodeBlock-Bbv6JfD2.js";
import { T as mt } from "../ThemeToggle-Z2Ndc0if.js";
var fe = g('<label class="block text-sm font-medium text-gray-700 mb-1"> </label>'), me = g("<option disabled> </option>"), he = g("<option> </option>"), pe = g("<div><!> <select><!><!></select></div>");
function Qe(m, e) {
  F(e, !0);
  let a = t(e, "value", 7, void 0), o = t(e, "options", 19, () => []), i = t(e, "placeholder", 3, "Select an option"), c = t(e, "label", 3, ""), b = t(e, "disabled", 3, !1), f = t(e, "size", 3, "md"), _ = D(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "options",
    "placeholder",
    "label",
    "disabled",
    "size"
  ]), y = ee(typeof window < "u" ? `select-${Math.random().toString(36).substr(2, 9)}` : `select-ssr-${Date.now()}`), p = M(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), u = M(() => [
    "w-full border border-gray-300 rounded-md bg-white",
    "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    v(p)[f()]
  ].join(" "));
  function n(k) {
    const w = k.target;
    a(w.value);
  }
  var s = pe(), d = r(s);
  {
    var h = (k) => {
      var w = fe(), I = r(w);
      N(() => {
        E(w, "for", y), T(I, c());
      }), l(k, w);
    };
    j(d, (k) => {
      c() && k(h);
    });
  }
  var x = B(d, 2);
  S(x, () => ({
    id: y,
    value: a(),
    disabled: b(),
    class: v(u),
    onchange: n,
    ..._
  }));
  var P = r(x);
  {
    var z = (k) => {
      var w = me(), I = r(w);
      w.value = w.__value = "", N(() => T(I, i())), l(k, w);
    };
    j(P, (k) => {
      i() && !a() && k(z);
    });
  }
  var C = B(P);
  le(C, 17, o, (k) => k.value, (k, w) => {
    var I = he(), V = r(I), q = {};
    N(() => {
      I.disabled = v(w).disabled, T(V, v(w).label), q !== (q = v(w).value) && (I.value = (I.__value = v(w).value) ?? "");
    }), l(k, I);
  }), l(m, s), R();
}
var xe = g('<span class="text-sm font-medium text-gray-700"> </span>'), we = g('<div class="flex items-center gap-3"><button><span></span></button> <!></div>');
function We(m, e) {
  F(e, !0);
  let a = t(e, "checked", 7, !1), o = t(e, "disabled", 3, !1), i = t(e, "label", 3, ""), c = D(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "checked",
    "disabled",
    "label"
  ]), b = M(() => [
    "relative inline-flex w-11 h-6 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent",
    "transition-colors duration-200 ease-in-out",
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    a() ? "bg-blue-600" : "bg-gray-200",
    o() ? "opacity-50 cursor-not-allowed" : ""
  ].join(" ")), f = M(() => [
    "pointer-events-none inline-block w-5 h-5 transform rounded-full bg-white shadow-lg",
    "transition duration-200 ease-in-out",
    a() ? "translate-x-5" : "translate-x-0"
  ].join(" "));
  function _(d) {
    o() || a(!a());
  }
  var y = we(), p = r(y);
  S(p, () => ({
    type: "button",
    role: "switch",
    "aria-checked": a(),
    "aria-label": i() || "Toggle",
    disabled: o(),
    onclick: _,
    class: v(b),
    ...c
  }));
  var u = r(p), n = B(p, 2);
  {
    var s = (d) => {
      var h = xe(), x = r(h);
      N(() => T(x, i())), l(d, h);
    };
    j(n, (d) => {
      i() && d(s);
    });
  }
  N(() => te(u, 1, re(v(f)))), l(m, y), R();
}
var _e = g('<label class="block text-sm font-medium text-gray-700"> </label>'), ye = g('<span class="text-white text-lg">✓</span>'), ze = g("<button><!></button>"), ke = g('<div class="space-y-2"><!> <div></div></div>');
function Ze(m, e) {
  F(e, !0);
  let a = t(e, "value", 7, ""), o = t(e, "label", 3, ""), i = t(e, "disabled", 3, !1), c = D(e, [
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
  var _ = ke(), y = r(_);
  {
    var p = (n) => {
      var s = _e(), d = r(s);
      N(() => {
        E(s, "for", f), T(d, o());
      }), l(n, s);
    };
    j(y, (n) => {
      o() && n(p);
    });
  }
  var u = B(y, 2);
  S(u, () => ({
    id: f,
    class: "grid grid-cols-4 gap-2",
    role: "radiogroup",
    ...c
  })), le(u, 21, () => b, de, (n, s) => {
    var d = ze(), h = () => a(v(s).value);
    S(d, () => ({
      type: "button",
      class: `w-12 h-12 rounded-lg border-2 transition-all ${a() === v(s).value ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300 hover:border-gray-400"}`,
      style: `background-color: ${v(s).value ?? ""};`,
      onclick: h,
      disabled: i(),
      role: "radio",
      "aria-checked": a() === v(s).value,
      "aria-label": v(s).label,
      ...c
    }));
    var x = r(d);
    {
      var P = (z) => {
        var C = ye();
        l(z, C);
      };
      j(x, (z) => {
        a() === v(s).value && z(P);
      });
    }
    l(n, d);
  }), l(m, _), R();
}
var Ce = g('<img class="w-full h-48 object-cover rounded-md mb-4"/>'), Pe = g("<h3> </h3>"), Se = g("<div><!> <!> <!></div>");
function $e(m, e) {
  F(e, !0);
  let a = t(e, "title", 3, ""), o = t(e, "image", 3, ""), i = t(e, "interactive", 3, !1), c = t(e, "variant", 3, "default"), b = t(e, "size", 3, "md"), f = D(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "title",
    "image",
    "interactive",
    "variant",
    "size",
    "children"
  ]), _ = M(() => ({ sm: "p-3", md: "p-4", lg: "p-6" })), y = M(() => ge(c())), p = M(() => [
    "rounded-lg transition-all duration-200",
    "hover:shadow-adaptive-md",
    i() ? "cursor-pointer hover:scale-[1.02]" : "",
    v(_)[b()],
    v(y)
  ].join(" ")), u = M(() => "text-lg font-semibold mb-2 text-primary");
  var n = Se();
  S(n, () => ({ class: v(p), ...f }));
  var s = r(n);
  {
    var d = (z) => {
      var C = Ce();
      N(() => {
        E(C, "src", o()), E(C, "alt", a());
      }), l(z, C);
    };
    j(s, (z) => {
      o() && z(d);
    });
  }
  var h = B(s, 2);
  {
    var x = (z) => {
      var C = Pe();
      te(C, 1, re(v(u)));
      var k = r(C);
      N(() => T(k, a())), l(z, C);
    };
    j(h, (z) => {
      a() && z(x);
    });
  }
  var P = B(h, 2);
  X(P, () => e.children ?? Y), l(m, n), R();
}
var Ne = g('<button><!> <span class="ml-1 text-xs">×</span></button>'), Te = g("<span><!></span>");
function et(m, e) {
  F(e, !0);
  let a = t(e, "variant", 3, "default"), o = t(e, "size", 3, "md"), i = t(e, "closable", 3, !1);
  t(e, "className", 3, "");
  let c = D(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "variant",
    "size",
    "closable",
    "className",
    "children"
  ]);
  function b(d) {
    d.stopPropagation();
  }
  let f = M(() => ({
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  })), _ = M(() => ({
    default: "bg-gray-100 text-gray-800 border-gray-300",
    success: "bg-green-100 text-green-800 border-green-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    error: "bg-red-100 text-red-800 border-red-300",
    info: "bg-blue-100 text-blue-800 border-blue-300"
  })), y = M(() => [
    "inline-flex items-center gap-1 font-medium border rounded-md",
    v(f)[o()],
    v(_)[a()],
    i() ? "cursor-pointer hover:opacity-80" : ""
  ].join(" "));
  var p = G(), u = H(p);
  {
    var n = (d) => {
      var h = Ne();
      S(h, () => ({
        type: "button",
        class: v(y),
        onclick: b,
        ...c
      }));
      var x = r(h);
      X(x, () => e.children ?? Y), l(d, h);
    }, s = (d) => {
      var h = Te();
      S(h, () => ({ class: v(y), ...c }));
      var x = r(h);
      X(x, () => e.children ?? Y), l(d, h);
    };
    j(u, (d) => {
      i() ? d(n) : d(s, !1);
    });
  }
  l(m, p), R();
}
var je = g("<h1> <!></h1>"), Be = g("<h2> <!></h2>"), Ie = g("<h3> <!></h3>"), Me = g("<h4> <!></h4>"), De = g("<h5> <!></h5>"), Xe = g("<h6> <!></h6>");
function tt(m, e) {
  F(e, !0);
  let a = t(e, "level", 3, 1), o = t(e, "text", 3, ""), i = D(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "level",
    "text",
    "children"
  ]), c = M(() => ({
    1: "text-4xl font-bold",
    2: "text-3xl font-bold",
    3: "text-2xl font-semibold",
    4: "text-xl font-semibold",
    5: "text-lg font-medium",
    6: "text-base font-medium"
  })), b = M(() => ["text-gray-900", v(c)[a()]].join(" "));
  var f = G(), _ = H(f);
  {
    var y = (u) => {
      var n = je();
      S(n, () => ({ class: v(b), ...i }));
      var s = r(n), d = B(s);
      X(d, () => e.children ?? Y), N(() => T(s, o())), l(u, n);
    }, p = (u) => {
      var n = G(), s = H(n);
      {
        var d = (x) => {
          var P = Be();
          S(P, () => ({ class: v(b), ...i }));
          var z = r(P), C = B(z);
          X(C, () => e.children ?? Y), N(() => T(z, o())), l(x, P);
        }, h = (x) => {
          var P = G(), z = H(P);
          {
            var C = (w) => {
              var I = Ie();
              S(I, () => ({ class: v(b), ...i }));
              var V = r(I), q = B(V);
              X(q, () => e.children ?? Y), N(() => T(V, o())), l(w, I);
            }, k = (w) => {
              var I = G(), V = H(I);
              {
                var q = (A) => {
                  var J = Me();
                  S(J, () => ({ class: v(b), ...i }));
                  var K = r(J), Q = B(K);
                  X(Q, () => e.children ?? Y), N(() => T(K, o())), l(A, J);
                }, ie = (A) => {
                  var J = G(), K = H(J);
                  {
                    var Q = (O) => {
                      var U = De();
                      S(U, () => ({ class: v(b), ...i }));
                      var L = r(U), W = B(L);
                      X(W, () => e.children ?? Y), N(() => T(L, o())), l(O, U);
                    }, se = (O) => {
                      var U = G(), L = H(U);
                      {
                        var W = (Z) => {
                          var $ = Xe();
                          S($, () => ({ class: v(b), ...i }));
                          var ae = r($), ne = B(ae);
                          X(ne, () => e.children ?? Y), N(() => T(ae, o())), l(Z, $);
                        };
                        j(
                          L,
                          (Z) => {
                            a() === 6 && Z(W);
                          },
                          !0
                        );
                      }
                      l(O, U);
                    };
                    j(
                      K,
                      (O) => {
                        a() === 5 ? O(Q) : O(se, !1);
                      },
                      !0
                    );
                  }
                  l(A, J);
                };
                j(
                  V,
                  (A) => {
                    a() === 4 ? A(q) : A(ie, !1);
                  },
                  !0
                );
              }
              l(w, I);
            };
            j(
              z,
              (w) => {
                a() === 3 ? w(C) : w(k, !1);
              },
              !0
            );
          }
          l(x, P);
        };
        j(
          s,
          (x) => {
            a() === 2 ? x(d) : x(h, !1);
          },
          !0
        );
      }
      l(u, n);
    };
    j(_, (u) => {
      a() === 1 ? u(y) : u(p, !1);
    });
  }
  l(m, f), R();
}
var Ye = g('<div class="flex justify-between items-center mb-2"><label class="text-sm font-medium text-gray-700"> </label> <span class="text-sm text-gray-500"> </span></div>'), Ge = g('<div><!> <div><div class="h-full bg-blue-600 rounded-full"></div></div></div>');
function at(m, e) {
  F(e, !0);
  let a = t(e, "value", 3, 0), o = t(e, "max", 3, 100), i = t(e, "size", 3, "md"), c = t(e, "label", 3, ""), b = D(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "max",
    "size",
    "label"
  ]), f = ee(typeof window < "u" ? `progress-${Math.random().toString(36).substr(2, 9)}` : `progress-ssr-${Date.now()}`), _ = M(() => Math.min(Math.max(a() / o() * 100, 0), 100)), y = M(() => ({ sm: "h-1", md: "h-2", lg: "h-3" }));
  var p = Ge(), u = r(p);
  {
    var n = (h) => {
      var x = Ye(), P = r(x), z = r(P), C = B(P, 2), k = r(C);
      N(
        (w) => {
          E(P, "for", f), T(z, c()), T(k, `${w ?? ""}%`);
        },
        [() => Math.round(v(_))]
      ), l(h, x);
    };
    j(u, (h) => {
      c() && h(n);
    });
  }
  var s = B(u, 2);
  S(s, () => ({
    id: f,
    class: `w-full bg-gray-200 rounded-full overflow-hidden ${v(y)[i()] ?? ""}`,
    role: "progressbar",
    "aria-valuenow": a(),
    "aria-valuemin": "0",
    "aria-valuemax": o(),
    ...b
  }));
  var d = r(s);
  N(() => ve(d, `width: ${v(_) ?? ""}%`)), l(m, p), R();
}
var He = g("<div></div>");
function lt(m, e) {
  let a = t(e, "width", 3, "100%"), o = t(e, "height", 3, "1rem"), i = t(e, "className", 3, ""), c = D(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "width",
    "height",
    "className",
    "children"
  ]);
  var b = He();
  S(b, () => ({
    class: `animate-pulse bg-gray-200 rounded ${i() ?? ""}`,
    style: `width: ${a() ?? ""}; height: ${o() ?? ""};`,
    ...c
  })), l(m, b);
}
function Re(m, e) {
  ue(e, !1);
}
var Fe = g('<button type="button" class="ml-3 text-gray-400 hover:text-gray-600" aria-label="Close notification">×</button>'), Ve = g('<div><div class="flex items-start"><div class="flex-1"><p> </p></div> <!></div></div>');
function rt(m, e) {
  let a = t(e, "message", 3, ""), o = t(e, "type", 3, "info"), i = t(e, "closable", 3, !0), c = D(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "message",
    "type",
    "closable",
    "children"
  ]), b = be(!0);
  const f = {
    success: "bg-green-100 border-green-300 text-green-800",
    error: "bg-red-100 border-red-300 text-red-800",
    warning: "bg-yellow-100 border-yellow-300 text-yellow-800",
    info: "bg-blue-100 border-blue-300 text-blue-800"
  };
  var _ = G(), y = H(_);
  {
    var p = (u) => {
      var n = Ve();
      S(n, () => ({
        class: "fixed top-4 right-4 max-w-sm w-full bg-white border rounded-lg shadow-lg p-4 z-50",
        role: "alert",
        ...c
      }));
      var s = r(n), d = r(s), h = r(d), x = r(h), P = B(d, 2);
      {
        var z = (C) => {
          var k = Fe();
          k.__click = [Re, b], l(C, k);
        };
        j(P, (C) => {
          i() && C(z);
        });
      }
      N(() => {
        te(h, 1, `text-sm ${f[o()] ?? ""}`), T(x, a());
      }), l(u, n);
    };
    j(y, (u) => {
      v(b) && u(p);
    });
  }
  l(m, _);
}
ce(["click"]);
var qe = g('<div class="tooltip group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible svelte-13nzt82" role="tooltip" aria-hidden="true"> </div>'), Ae = g("<div><!> <!></div>");
const Je = {
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
function ot(m, e) {
  oe(m, Je);
  let a = t(e, "content", 3, ""), o = t(e, "placement", 3, "top"), i = t(e, "delay", 3, 0), c = t(e, "disabled", 3, !1), b = D(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "content",
    "placement",
    "delay",
    "disabled",
    "children"
  ]);
  var f = Ae();
  S(
    f,
    () => ({
      class: "tooltip-container group relative inline-block",
      "data-placement": o(),
      "data-delay": i(),
      "data-disabled": c(),
      ...b
    }),
    void 0,
    void 0,
    "svelte-13nzt82"
  );
  var _ = r(f);
  X(_, () => e.children ?? Y);
  var y = B(_, 2);
  {
    var p = (u) => {
      var n = qe(), s = r(n);
      N(() => T(s, a())), l(u, n);
    };
    j(y, (u) => {
      a() && !c() && u(p);
    });
  }
  l(m, f);
}
var Oe = g("<img/>");
function it(m, e) {
  let a = t(e, "alt", 3, ""), o = t(e, "width", 3, "100%"), i = t(e, "height", 3, "auto"), c = t(e, "className", 3, ""), b = D(e, [
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
  var f = Oe();
  S(f, () => ({
    src: e.src,
    alt: a(),
    class: `w-full h-auto object-cover ${c() ?? ""}`,
    style: `width: ${(typeof o() == "number" ? o() + "px" : o()) ?? ""}; height: ${(typeof i() == "number" ? i() + "px" : i()) ?? ""};`,
    loading: "lazy",
    ...b
  })), l(m, f);
}
var Ue = g('<div><div class="flex items-start gap-4"><div class="flex-shrink-0 text-2xl" aria-hidden="true"> </div> <div class="flex-1 min-w-0"><h3 class="text-lg font-semibold text-text mb-2"> </h3> <p class="text-text-secondary leading-relaxed"> </p></div></div></div>');
const Ee = {
  hash: "svelte-ecbnw5",
  code: ".feature-card.svelte-ecbnw5:hover {--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}"
};
function st(m, e) {
  oe(m, Ee);
  let a = t(e, "icon", 3, "✨"), o = t(e, "className", 3, ""), i = D(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "icon",
    "title",
    "description",
    "className"
  ]);
  var c = Ue();
  S(
    c,
    () => ({
      class: `feature-card p-6 rounded-lg bg-surface border border-border hover:border-primary/20 transition-colors duration-200 ${o() ?? ""}`,
      ...i
    }),
    void 0,
    void 0,
    "svelte-ecbnw5"
  );
  var b = r(c), f = r(b), _ = r(f), y = B(f, 2), p = r(y), u = r(p), n = B(p, 2), s = r(n);
  N(() => {
    T(_, a()), T(u, e.title), T(s, e.description);
  }), l(m, c);
}
export {
  et as Badge,
  vt as Button,
  $e as Card,
  ct as Checkbox,
  bt as CodeBlock,
  Ze as ColorPicker,
  st as FeatureCard,
  tt as Heading,
  ut as Input,
  it as OptimizedImage,
  at as Progress,
  Qe as Select,
  lt as Skeleton,
  gt as Textarea,
  mt as ThemeToggle,
  rt as Toast,
  We as Toggle,
  ot as Tooltip
};
