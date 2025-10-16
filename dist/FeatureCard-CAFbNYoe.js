import { p as a, P as ee, f as g, i as M, c as S, D as le, d as l, e as H, h as O, k as r, A as D, r as B, g as v, N as Y, z as N, G as q, C as j, F as te, O as re, E as de, y as X, B as I, W as F, V as G, Y as ve, x as ce, j as be, s as ue } from "./ssr-safe-bsWGK4V4.js";
import { f as oe } from "./CodeBlock-DIX4nKiz.js";
var ge = g('<label class="block text-sm font-medium text-gray-700 mb-1"> </label>'), fe = g("<option disabled> </option>"), me = g("<option> </option>"), he = g("<div><!> <select><!><!></select></div>");
function Ke(m, e) {
  O(e, !0);
  let t = a(e, "value", 7, void 0), o = a(e, "options", 19, () => []), i = a(e, "placeholder", 3, "Select an option"), c = a(e, "label", 3, ""), b = a(e, "disabled", 3, !1), f = a(e, "size", 3, "md"), _ = B(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "options",
    "placeholder",
    "label",
    "disabled",
    "size"
  ]), z = ee(typeof window < "u" ? `select-${Math.random().toString(36).substr(2, 9)}` : `select-ssr-${Date.now()}`), x = Y(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), u = Y(() => [
    "w-full border border-gray-300 rounded-md bg-white",
    "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    v(x)[f()]
  ].join(" "));
  function d(k) {
    const y = k.target;
    t(y.value);
  }
  var s = he(), n = r(s);
  {
    var p = (k) => {
      var y = ge(), T = r(y);
      N(() => {
        q(y, "for", z), j(T, c());
      }), l(k, y);
    };
    M(n, (k) => {
      c() && k(p);
    });
  }
  var w = D(n, 2);
  S(w, () => ({
    id: z,
    value: t(),
    disabled: b(),
    class: v(u),
    onchange: d,
    ..._
  }));
  var P = r(w);
  {
    var h = (k) => {
      var y = fe(), T = r(y);
      y.value = y.__value = "", N(() => j(T, i())), l(k, y);
    };
    M(P, (k) => {
      i() && !t() && k(h);
    });
  }
  var C = D(P);
  le(C, 17, o, (k) => k.value, (k, y) => {
    var T = me(), R = r(T), V = {};
    N(() => {
      T.disabled = v(y).disabled, j(R, v(y).label), V !== (V = v(y).value) && (T.value = (T.__value = v(y).value) ?? "");
    }), l(k, T);
  }), l(m, s), H();
}
var pe = g('<span class="text-sm font-medium text-gray-700"> </span>'), xe = g('<div class="flex items-center gap-3"><button><span></span></button> <!></div>');
function Le(m, e) {
  O(e, !0);
  let t = a(e, "checked", 7, !1), o = a(e, "disabled", 3, !1), i = a(e, "label", 3, ""), c = B(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "checked",
    "disabled",
    "label",
    "onclick"
  ]), b = Y(() => [
    "relative inline-flex w-11 h-6 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent",
    "transition-colors duration-200 ease-in-out",
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    t() ? "bg-blue-600" : "bg-gray-200",
    o() ? "opacity-50 cursor-not-allowed" : ""
  ].join(" ")), f = Y(() => [
    "pointer-events-none inline-block w-5 h-5 transform rounded-full bg-white shadow-lg",
    "transition duration-200 ease-in-out",
    t() ? "translate-x-5" : "translate-x-0"
  ].join(" "));
  function _(n) {
    o() || (t(!t()), e.onclick && e.onclick(n));
  }
  var z = xe(), x = r(z);
  S(x, () => ({
    type: "button",
    role: "switch",
    "aria-checked": t(),
    "aria-label": i() || "Toggle",
    disabled: o(),
    onclick: _,
    class: v(b),
    ...c
  }));
  var u = r(x), d = D(x, 2);
  {
    var s = (n) => {
      var p = pe(), w = r(p);
      N(() => j(w, i())), l(n, p);
    };
    M(d, (n) => {
      i() && n(s);
    });
  }
  N(() => te(u, 1, re(v(f)))), l(m, z), H();
}
var we = g('<label class="block text-sm font-medium text-gray-700"> </label>'), ye = g('<span class="text-white text-lg">✓</span>'), _e = g("<button><!></button>"), ze = g('<div class="space-y-2"><!> <div></div></div>');
function Qe(m, e) {
  O(e, !0);
  let t = a(e, "value", 7, ""), o = a(e, "label", 3, ""), i = a(e, "disabled", 3, !1), c = B(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "label",
    "disabled",
    "onclick"
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
  var _ = ze(), z = r(_);
  {
    var x = (d) => {
      var s = we(), n = r(s);
      N(() => {
        q(s, "for", f), j(n, o());
      }), l(d, s);
    };
    M(z, (d) => {
      o() && d(x);
    });
  }
  var u = D(z, 2);
  S(u, () => ({
    id: f,
    class: "grid grid-cols-4 gap-2",
    role: "radiogroup",
    ...c
  })), le(u, 21, () => b, de, (d, s) => {
    var n = _e(), p = (h) => {
      t(v(s).value), e.onclick && e.onclick(h);
    };
    S(n, () => ({
      type: "button",
      class: `w-12 h-12 rounded-lg border-2 transition-all ${t() === v(s).value ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300 hover:border-gray-400"}`,
      style: `background-color: ${v(s).value ?? ""};`,
      onclick: p,
      disabled: i(),
      role: "radio",
      "aria-checked": t() === v(s).value,
      "aria-label": v(s).label,
      ...c
    }));
    var w = r(n);
    {
      var P = (h) => {
        var C = ye();
        l(h, C);
      };
      M(w, (h) => {
        t() === v(s).value && h(P);
      });
    }
    l(d, n);
  }), l(m, _), H();
}
var ke = g('<img class="w-full h-48 object-cover rounded-md mb-4"/>'), Ce = g("<h3> </h3>"), Pe = g("<div><!> <!> <!></div>");
function Ze(m, e) {
  O(e, !0);
  let t = a(e, "title", 3, ""), o = a(e, "image", 3, ""), i = a(e, "interactive", 3, !1), c = a(e, "variant", 3, "default"), b = a(e, "size", 3, "md"), f = B(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "title",
    "image",
    "interactive",
    "variant",
    "size",
    "children"
  ]), _ = Y(() => ({ sm: "p-3", md: "p-4", lg: "p-6" })), z = Y(() => () => {
    const h = {
      default: "border-gray-200 bg-white",
      success: "border-green-200 bg-green-50",
      warning: "border-yellow-200 bg-yellow-50",
      error: "border-red-200 bg-red-50",
      info: "border-blue-200 bg-blue-50"
    };
    return h[c()] || h.default;
  }), x = Y(() => [
    "rounded-lg transition-all duration-200",
    "hover:shadow-adaptive-md",
    i() ? "cursor-pointer hover:scale-[1.02]" : "",
    v(_)[b()],
    v(z)
  ].join(" ")), u = Y(() => "text-lg font-semibold mb-2 text-primary");
  var d = Pe();
  S(d, () => ({ class: v(x), ...f }));
  var s = r(d);
  {
    var n = (h) => {
      var C = ke();
      N(() => {
        q(C, "src", o()), q(C, "alt", t());
      }), l(h, C);
    };
    M(s, (h) => {
      o() && h(n);
    });
  }
  var p = D(s, 2);
  {
    var w = (h) => {
      var C = Ce();
      te(C, 1, re(v(u)));
      var k = r(C);
      N(() => j(k, t())), l(h, C);
    };
    M(p, (h) => {
      t() && h(w);
    });
  }
  var P = D(p, 2);
  X(P, () => e.children ?? I), l(m, d), H();
}
var Se = g('<button><!> <span class="ml-1 text-xs">×</span></button>'), Ne = g("<span><!></span>");
function $e(m, e) {
  O(e, !0);
  let t = a(e, "variant", 3, "default"), o = a(e, "size", 3, "md"), i = a(e, "closable", 3, !1);
  a(e, "className", 3, "");
  let c = B(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "variant",
    "size",
    "closable",
    "className",
    "children"
  ]);
  function b(n) {
    n.stopPropagation();
  }
  let f = Y(() => ({
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  })), _ = Y(() => ({
    default: "bg-gray-100 text-gray-800 border-gray-300",
    success: "bg-green-100 text-green-800 border-green-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    error: "bg-red-100 text-red-800 border-red-300",
    info: "bg-blue-100 text-blue-800 border-blue-300"
  })), z = Y(() => [
    "inline-flex items-center gap-1 font-medium border rounded-md",
    v(f)[o()],
    v(_)[t()],
    i() ? "cursor-pointer hover:opacity-80" : ""
  ].join(" "));
  var x = F(), u = G(x);
  {
    var d = (n) => {
      var p = Se();
      S(p, () => ({
        type: "button",
        class: v(z),
        onclick: b,
        ...c
      }));
      var w = r(p);
      X(w, () => e.children ?? I), l(n, p);
    }, s = (n) => {
      var p = Ne();
      S(p, () => ({ class: v(z), ...c }));
      var w = r(p);
      X(w, () => e.children ?? I), l(n, p);
    };
    M(u, (n) => {
      i() ? n(d) : n(s, !1);
    });
  }
  l(m, x), H();
}
var je = g("<h1> <!></h1>"), Me = g("<h2> <!></h2>"), De = g("<h3> <!></h3>"), Te = g("<h4> <!></h4>"), Ye = g("<h5> <!></h5>"), Be = g("<h6> <!></h6>");
function et(m, e) {
  O(e, !0);
  let t = a(e, "level", 3, 1), o = a(e, "text", 3, ""), i = B(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "level",
    "text",
    "children"
  ]), c = Y(() => ({
    1: "text-4xl font-bold",
    2: "text-3xl font-bold",
    3: "text-2xl font-semibold",
    4: "text-xl font-semibold",
    5: "text-lg font-medium",
    6: "text-base font-medium"
  })), b = Y(() => ["text-gray-900", v(c)[t()]].join(" "));
  var f = F(), _ = G(f);
  {
    var z = (u) => {
      var d = je();
      S(d, () => ({ class: v(b), ...i }));
      var s = r(d), n = D(s);
      X(n, () => e.children ?? I), N(() => j(s, o())), l(u, d);
    }, x = (u) => {
      var d = F(), s = G(d);
      {
        var n = (w) => {
          var P = Me();
          S(P, () => ({ class: v(b), ...i }));
          var h = r(P), C = D(h);
          X(C, () => e.children ?? I), N(() => j(h, o())), l(w, P);
        }, p = (w) => {
          var P = F(), h = G(P);
          {
            var C = (y) => {
              var T = De();
              S(T, () => ({ class: v(b), ...i }));
              var R = r(T), V = D(R);
              X(V, () => e.children ?? I), N(() => j(R, o())), l(y, T);
            }, k = (y) => {
              var T = F(), R = G(T);
              {
                var V = (A) => {
                  var E = Te();
                  S(E, () => ({ class: v(b), ...i }));
                  var J = r(E), L = D(J);
                  X(L, () => e.children ?? I), N(() => j(J, o())), l(A, E);
                }, ie = (A) => {
                  var E = F(), J = G(E);
                  {
                    var L = (U) => {
                      var W = Ye();
                      S(W, () => ({ class: v(b), ...i }));
                      var K = r(W), Q = D(K);
                      X(Q, () => e.children ?? I), N(() => j(K, o())), l(U, W);
                    }, se = (U) => {
                      var W = F(), K = G(W);
                      {
                        var Q = (Z) => {
                          var $ = Be();
                          S($, () => ({ class: v(b), ...i }));
                          var ae = r($), ne = D(ae);
                          X(ne, () => e.children ?? I), N(() => j(ae, o())), l(Z, $);
                        };
                        M(
                          K,
                          (Z) => {
                            t() === 6 && Z(Q);
                          },
                          !0
                        );
                      }
                      l(U, W);
                    };
                    M(
                      J,
                      (U) => {
                        t() === 5 ? U(L) : U(se, !1);
                      },
                      !0
                    );
                  }
                  l(A, E);
                };
                M(
                  R,
                  (A) => {
                    t() === 4 ? A(V) : A(ie, !1);
                  },
                  !0
                );
              }
              l(y, T);
            };
            M(
              h,
              (y) => {
                t() === 3 ? y(C) : y(k, !1);
              },
              !0
            );
          }
          l(w, P);
        };
        M(
          s,
          (w) => {
            t() === 2 ? w(n) : w(p, !1);
          },
          !0
        );
      }
      l(u, d);
    };
    M(_, (u) => {
      t() === 1 ? u(z) : u(x, !1);
    });
  }
  l(m, f), H();
}
var Xe = g('<div class="flex justify-between items-center mb-2"><label class="text-sm font-medium text-gray-700"> </label> <span class="text-sm text-gray-500"> </span></div>'), Ie = g('<div><!> <div><div class="h-full bg-blue-600 rounded-full"></div></div></div>');
function tt(m, e) {
  O(e, !0);
  let t = a(e, "value", 3, 0), o = a(e, "max", 3, 100), i = a(e, "size", 3, "md"), c = a(e, "label", 3, ""), b = B(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "max",
    "size",
    "label"
  ]), f = ee(typeof window < "u" ? `progress-${Math.random().toString(36).substr(2, 9)}` : `progress-ssr-${Date.now()}`), _ = Y(() => Math.min(Math.max(t() / o() * 100, 0), 100)), z = Y(() => ({ sm: "h-1", md: "h-2", lg: "h-3" }));
  var x = Ie(), u = r(x);
  {
    var d = (p) => {
      var w = Xe(), P = r(w), h = r(P), C = D(P, 2), k = r(C);
      N(
        (y) => {
          q(P, "for", f), j(h, c()), j(k, `${y ?? ""}%`);
        },
        [() => Math.round(v(_))]
      ), l(p, w);
    };
    M(u, (p) => {
      c() && p(d);
    });
  }
  var s = D(u, 2);
  S(s, () => ({
    id: f,
    class: `w-full bg-gray-200 rounded-full overflow-hidden ${v(z)[i()] ?? ""}`,
    role: "progressbar",
    "aria-valuenow": t(),
    "aria-valuemin": "0",
    "aria-valuemax": o(),
    ...b
  }));
  var n = r(s);
  N(() => ve(n, `width: ${v(_) ?? ""}%`)), l(m, x), H();
}
var Fe = g("<div></div>");
function at(m, e) {
  let t = a(e, "width", 3, "100%"), o = a(e, "height", 3, "1rem"), i = a(e, "className", 3, ""), c = B(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "width",
    "height",
    "className",
    "children"
  ]);
  var b = Fe();
  S(b, () => ({
    class: `animate-pulse bg-gray-200 rounded ${i() ?? ""}`,
    style: `width: ${t() ?? ""}; height: ${o() ?? ""};`,
    ...c
  })), l(m, b);
}
function Ge(m, e, t) {
  ue(e, !1), t.onclick && t.onclick(m);
}
var He = g('<button type="button" class="ml-3 text-gray-400 hover:text-gray-600" aria-label="Close notification">×</button>'), Oe = g('<div><div class="flex items-start"><div class="flex-1"><p> </p></div> <!></div></div>');
function lt(m, e) {
  O(e, !0);
  let t = a(e, "message", 3, ""), o = a(e, "type", 3, "info"), i = a(e, "closable", 3, !0), c = B(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "message",
    "type",
    "closable",
    "onclick",
    "children"
  ]), b = be(!0);
  const f = {
    success: "bg-green-100 border-green-300 text-green-800",
    error: "bg-red-100 border-red-300 text-red-800",
    warning: "bg-yellow-100 border-yellow-300 text-yellow-800",
    info: "bg-blue-100 border-blue-300 text-blue-800"
  };
  var _ = F(), z = G(_);
  {
    var x = (u) => {
      var d = Oe();
      S(d, () => ({
        class: "fixed top-4 right-4 max-w-sm w-full bg-white border rounded-lg shadow-lg p-4 z-50",
        role: "alert",
        ...c
      }));
      var s = r(d), n = r(s), p = r(n), w = r(p), P = D(n, 2);
      {
        var h = (C) => {
          var k = He();
          k.__click = [Ge, b, e], l(C, k);
        };
        M(P, (C) => {
          i() && C(h);
        });
      }
      N(() => {
        te(p, 1, `text-sm ${f[o()] ?? ""}`), j(w, t());
      }), l(u, d);
    };
    M(z, (u) => {
      v(b) && u(x);
    });
  }
  l(m, _), H();
}
ce(["click"]);
var Re = g('<div class="tooltip group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible svelte-13nzt82" role="tooltip" aria-hidden="true"> </div>'), Ve = g("<div><!> <!></div>");
const Ae = {
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
function rt(m, e) {
  oe(m, Ae);
  let t = a(e, "content", 3, ""), o = a(e, "placement", 3, "top"), i = a(e, "delay", 3, 0), c = a(e, "disabled", 3, !1), b = B(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "content",
    "placement",
    "delay",
    "disabled",
    "children"
  ]);
  var f = Ve();
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
  X(_, () => e.children ?? I);
  var z = D(_, 2);
  {
    var x = (u) => {
      var d = Re(), s = r(d);
      N(() => j(s, t())), l(u, d);
    };
    M(z, (u) => {
      t() && !c() && u(x);
    });
  }
  l(m, f);
}
var Ee = g("<img/>");
function ot(m, e) {
  let t = a(e, "alt", 3, ""), o = a(e, "width", 3, "100%"), i = a(e, "height", 3, "auto"), c = a(e, "className", 3, ""), b = B(e, [
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
  S(f, () => ({
    src: e.src,
    alt: t(),
    class: `w-full h-auto object-cover ${c() ?? ""}`,
    style: `width: ${(typeof o() == "number" ? o() + "px" : o()) ?? ""}; height: ${(typeof i() == "number" ? i() + "px" : i()) ?? ""};`,
    loading: "lazy",
    ...b
  })), l(m, f);
}
var Ue = g('<div><div class="flex items-start gap-4"><div class="flex-shrink-0 text-2xl" aria-hidden="true"> </div> <div class="flex-1 min-w-0"><h3 class="text-lg font-semibold text-text mb-2"> </h3> <p class="text-text-secondary leading-relaxed"> </p></div></div></div>');
const We = {
  hash: "svelte-ecbnw5",
  code: ".feature-card.svelte-ecbnw5:hover {--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}"
};
function it(m, e) {
  oe(m, We);
  let t = a(e, "icon", 3, "✨"), o = a(e, "className", 3, ""), i = B(e, [
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
  var b = r(c), f = r(b), _ = r(f), z = D(f, 2), x = r(z), u = r(x), d = D(x, 2), s = r(d);
  N(() => {
    j(_, t()), j(u, e.title), j(s, e.description);
  }), l(m, c);
}
export {
  $e as B,
  Ze as C,
  it as F,
  et as H,
  ot as O,
  tt as P,
  Ke as S,
  lt as T,
  Qe as a,
  at as b,
  Le as c,
  rt as d
};
