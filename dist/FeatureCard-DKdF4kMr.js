import { p as a, P as ee, f as g, i as M, c as S, D as le, d as l, e as H, h as O, k as r, A as D, r as B, g as v, N as Y, z as N, G as q, C as j, F as te, O as re, E as de, y as X, B as I, W as F, V as G, Y as ve, x as ce, j as be, s as ue } from "./ssr-safe-bsWGK4V4.js";
import { b as ge, f as oe } from "./CodeBlock-BbB7jhcz.js";
var fe = g('<label class="block text-sm font-medium text-gray-700 mb-1"> </label>'), me = g("<option disabled> </option>"), he = g("<option> </option>"), pe = g("<div><!> <select><!><!></select></div>");
function Le(m, e) {
  O(e, !0);
  let t = a(e, "value", 7, void 0), o = a(e, "options", 19, () => []), i = a(e, "placeholder", 3, "Select an option"), c = a(e, "label", 3, ""), b = a(e, "disabled", 3, !1), f = a(e, "size", 3, "md"), y = B(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "options",
    "placeholder",
    "label",
    "disabled",
    "size"
  ]), z = ee(typeof window < "u" ? `select-${Math.random().toString(36).substr(2, 9)}` : `select-ssr-${Date.now()}`), p = Y(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), u = Y(() => [
    "w-full border border-gray-300 rounded-md bg-white",
    "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    v(p)[f()]
  ].join(" "));
  function d(k) {
    const _ = k.target;
    t(_.value);
  }
  var s = pe(), n = r(s);
  {
    var h = (k) => {
      var _ = fe(), T = r(_);
      N(() => {
        q(_, "for", z), j(T, c());
      }), l(k, _);
    };
    M(n, (k) => {
      c() && k(h);
    });
  }
  var x = D(n, 2);
  S(x, () => ({
    id: z,
    value: t(),
    disabled: b(),
    class: v(u),
    onchange: d,
    ...y
  }));
  var P = r(x);
  {
    var w = (k) => {
      var _ = me(), T = r(_);
      _.value = _.__value = "", N(() => j(T, i())), l(k, _);
    };
    M(P, (k) => {
      i() && !t() && k(w);
    });
  }
  var C = D(P);
  le(C, 17, o, (k) => k.value, (k, _) => {
    var T = he(), R = r(T), V = {};
    N(() => {
      T.disabled = v(_).disabled, j(R, v(_).label), V !== (V = v(_).value) && (T.value = (T.__value = v(_).value) ?? "");
    }), l(k, T);
  }), l(m, s), H();
}
var xe = g('<span class="text-sm font-medium text-gray-700"> </span>'), we = g('<div class="flex items-center gap-3"><button><span></span></button> <!></div>');
function Qe(m, e) {
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
  function y(n) {
    o() || (t(!t()), e.onclick && e.onclick(n));
  }
  var z = we(), p = r(z);
  S(p, () => ({
    type: "button",
    role: "switch",
    "aria-checked": t(),
    "aria-label": i() || "Toggle",
    disabled: o(),
    onclick: y,
    class: v(b),
    ...c
  }));
  var u = r(p), d = D(p, 2);
  {
    var s = (n) => {
      var h = xe(), x = r(h);
      N(() => j(x, i())), l(n, h);
    };
    M(d, (n) => {
      i() && n(s);
    });
  }
  N(() => te(u, 1, re(v(f)))), l(m, z), H();
}
var _e = g('<label class="block text-sm font-medium text-gray-700"> </label>'), ye = g('<span class="text-white text-lg">✓</span>'), ze = g("<button><!></button>"), ke = g('<div class="space-y-2"><!> <div></div></div>');
function Ze(m, e) {
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
  var y = ke(), z = r(y);
  {
    var p = (d) => {
      var s = _e(), n = r(s);
      N(() => {
        q(s, "for", f), j(n, o());
      }), l(d, s);
    };
    M(z, (d) => {
      o() && d(p);
    });
  }
  var u = D(z, 2);
  S(u, () => ({
    id: f,
    class: "grid grid-cols-4 gap-2",
    role: "radiogroup",
    ...c
  })), le(u, 21, () => b, de, (d, s) => {
    var n = ze(), h = (w) => {
      t(v(s).value), e.onclick && e.onclick(w);
    };
    S(n, () => ({
      type: "button",
      class: `w-12 h-12 rounded-lg border-2 transition-all ${t() === v(s).value ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300 hover:border-gray-400"}`,
      style: `background-color: ${v(s).value ?? ""};`,
      onclick: h,
      disabled: i(),
      role: "radio",
      "aria-checked": t() === v(s).value,
      "aria-label": v(s).label,
      ...c
    }));
    var x = r(n);
    {
      var P = (w) => {
        var C = ye();
        l(w, C);
      };
      M(x, (w) => {
        t() === v(s).value && w(P);
      });
    }
    l(d, n);
  }), l(m, y), H();
}
var Ce = g('<img class="w-full h-48 object-cover rounded-md mb-4"/>'), Pe = g("<h3> </h3>"), Se = g("<div><!> <!> <!></div>");
function $e(m, e) {
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
  ]), y = Y(() => ({ sm: "p-3", md: "p-4", lg: "p-6" })), z = Y(() => ge(c())), p = Y(() => [
    "rounded-lg transition-all duration-200",
    "hover:shadow-adaptive-md",
    i() ? "cursor-pointer hover:scale-[1.02]" : "",
    v(y)[b()],
    v(z)
  ].join(" ")), u = Y(() => "text-lg font-semibold mb-2 text-primary");
  var d = Se();
  S(d, () => ({ class: v(p), ...f }));
  var s = r(d);
  {
    var n = (w) => {
      var C = Ce();
      N(() => {
        q(C, "src", o()), q(C, "alt", t());
      }), l(w, C);
    };
    M(s, (w) => {
      o() && w(n);
    });
  }
  var h = D(s, 2);
  {
    var x = (w) => {
      var C = Pe();
      te(C, 1, re(v(u)));
      var k = r(C);
      N(() => j(k, t())), l(w, C);
    };
    M(h, (w) => {
      t() && w(x);
    });
  }
  var P = D(h, 2);
  X(P, () => e.children ?? I), l(m, d), H();
}
var Ne = g('<button><!> <span class="ml-1 text-xs">×</span></button>'), je = g("<span><!></span>");
function et(m, e) {
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
  })), y = Y(() => ({
    default: "bg-gray-100 text-gray-800 border-gray-300",
    success: "bg-green-100 text-green-800 border-green-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    error: "bg-red-100 text-red-800 border-red-300",
    info: "bg-blue-100 text-blue-800 border-blue-300"
  })), z = Y(() => [
    "inline-flex items-center gap-1 font-medium border rounded-md",
    v(f)[o()],
    v(y)[t()],
    i() ? "cursor-pointer hover:opacity-80" : ""
  ].join(" "));
  var p = F(), u = G(p);
  {
    var d = (n) => {
      var h = Ne();
      S(h, () => ({
        type: "button",
        class: v(z),
        onclick: b,
        ...c
      }));
      var x = r(h);
      X(x, () => e.children ?? I), l(n, h);
    }, s = (n) => {
      var h = je();
      S(h, () => ({ class: v(z), ...c }));
      var x = r(h);
      X(x, () => e.children ?? I), l(n, h);
    };
    M(u, (n) => {
      i() ? n(d) : n(s, !1);
    });
  }
  l(m, p), H();
}
var Me = g("<h1> <!></h1>"), De = g("<h2> <!></h2>"), Te = g("<h3> <!></h3>"), Ye = g("<h4> <!></h4>"), Be = g("<h5> <!></h5>"), Xe = g("<h6> <!></h6>");
function tt(m, e) {
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
  var f = F(), y = G(f);
  {
    var z = (u) => {
      var d = Me();
      S(d, () => ({ class: v(b), ...i }));
      var s = r(d), n = D(s);
      X(n, () => e.children ?? I), N(() => j(s, o())), l(u, d);
    }, p = (u) => {
      var d = F(), s = G(d);
      {
        var n = (x) => {
          var P = De();
          S(P, () => ({ class: v(b), ...i }));
          var w = r(P), C = D(w);
          X(C, () => e.children ?? I), N(() => j(w, o())), l(x, P);
        }, h = (x) => {
          var P = F(), w = G(P);
          {
            var C = (_) => {
              var T = Te();
              S(T, () => ({ class: v(b), ...i }));
              var R = r(T), V = D(R);
              X(V, () => e.children ?? I), N(() => j(R, o())), l(_, T);
            }, k = (_) => {
              var T = F(), R = G(T);
              {
                var V = (A) => {
                  var E = Ye();
                  S(E, () => ({ class: v(b), ...i }));
                  var J = r(E), L = D(J);
                  X(L, () => e.children ?? I), N(() => j(J, o())), l(A, E);
                }, ie = (A) => {
                  var E = F(), J = G(E);
                  {
                    var L = (U) => {
                      var W = Be();
                      S(W, () => ({ class: v(b), ...i }));
                      var K = r(W), Q = D(K);
                      X(Q, () => e.children ?? I), N(() => j(K, o())), l(U, W);
                    }, se = (U) => {
                      var W = F(), K = G(W);
                      {
                        var Q = (Z) => {
                          var $ = Xe();
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
              l(_, T);
            };
            M(
              w,
              (_) => {
                t() === 3 ? _(C) : _(k, !1);
              },
              !0
            );
          }
          l(x, P);
        };
        M(
          s,
          (x) => {
            t() === 2 ? x(n) : x(h, !1);
          },
          !0
        );
      }
      l(u, d);
    };
    M(y, (u) => {
      t() === 1 ? u(z) : u(p, !1);
    });
  }
  l(m, f), H();
}
var Ie = g('<div class="flex justify-between items-center mb-2"><label class="text-sm font-medium text-gray-700"> </label> <span class="text-sm text-gray-500"> </span></div>'), Fe = g('<div><!> <div><div class="h-full bg-blue-600 rounded-full"></div></div></div>');
function at(m, e) {
  O(e, !0);
  let t = a(e, "value", 3, 0), o = a(e, "max", 3, 100), i = a(e, "size", 3, "md"), c = a(e, "label", 3, ""), b = B(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "max",
    "size",
    "label"
  ]), f = ee(typeof window < "u" ? `progress-${Math.random().toString(36).substr(2, 9)}` : `progress-ssr-${Date.now()}`), y = Y(() => Math.min(Math.max(t() / o() * 100, 0), 100)), z = Y(() => ({ sm: "h-1", md: "h-2", lg: "h-3" }));
  var p = Fe(), u = r(p);
  {
    var d = (h) => {
      var x = Ie(), P = r(x), w = r(P), C = D(P, 2), k = r(C);
      N(
        (_) => {
          q(P, "for", f), j(w, c()), j(k, `${_ ?? ""}%`);
        },
        [() => Math.round(v(y))]
      ), l(h, x);
    };
    M(u, (h) => {
      c() && h(d);
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
  N(() => ve(n, `width: ${v(y) ?? ""}%`)), l(m, p), H();
}
var Ge = g("<div></div>");
function lt(m, e) {
  let t = a(e, "width", 3, "100%"), o = a(e, "height", 3, "1rem"), i = a(e, "className", 3, ""), c = B(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "width",
    "height",
    "className",
    "children"
  ]);
  var b = Ge();
  S(b, () => ({
    class: `animate-pulse bg-gray-200 rounded ${i() ?? ""}`,
    style: `width: ${t() ?? ""}; height: ${o() ?? ""};`,
    ...c
  })), l(m, b);
}
function He(m, e, t) {
  ue(e, !1), t.onclick && t.onclick(m);
}
var Oe = g('<button type="button" class="ml-3 text-gray-400 hover:text-gray-600" aria-label="Close notification">×</button>'), Re = g('<div><div class="flex items-start"><div class="flex-1"><p> </p></div> <!></div></div>');
function rt(m, e) {
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
  var y = F(), z = G(y);
  {
    var p = (u) => {
      var d = Re();
      S(d, () => ({
        class: "fixed top-4 right-4 max-w-sm w-full bg-white border rounded-lg shadow-lg p-4 z-50",
        role: "alert",
        ...c
      }));
      var s = r(d), n = r(s), h = r(n), x = r(h), P = D(n, 2);
      {
        var w = (C) => {
          var k = Oe();
          k.__click = [He, b, e], l(C, k);
        };
        M(P, (C) => {
          i() && C(w);
        });
      }
      N(() => {
        te(h, 1, `text-sm ${f[o()] ?? ""}`), j(x, t());
      }), l(u, d);
    };
    M(z, (u) => {
      v(b) && u(p);
    });
  }
  l(m, y), H();
}
ce(["click"]);
var Ve = g('<div class="tooltip group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible svelte-13nzt82" role="tooltip" aria-hidden="true"> </div>'), Ae = g("<div><!> <!></div>");
const Ee = {
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
  oe(m, Ee);
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
  var y = r(f);
  X(y, () => e.children ?? I);
  var z = D(y, 2);
  {
    var p = (u) => {
      var d = Ve(), s = r(d);
      N(() => j(s, t())), l(u, d);
    };
    M(z, (u) => {
      t() && !c() && u(p);
    });
  }
  l(m, f);
}
var Ue = g("<img/>");
function it(m, e) {
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
  var f = Ue();
  S(f, () => ({
    src: e.src,
    alt: t(),
    class: `w-full h-auto object-cover ${c() ?? ""}`,
    style: `width: ${(typeof o() == "number" ? o() + "px" : o()) ?? ""}; height: ${(typeof i() == "number" ? i() + "px" : i()) ?? ""};`,
    loading: "lazy",
    ...b
  })), l(m, f);
}
var We = g('<div><div class="flex items-start gap-4"><div class="flex-shrink-0 text-2xl" aria-hidden="true"> </div> <div class="flex-1 min-w-0"><h3 class="text-lg font-semibold text-text mb-2"> </h3> <p class="text-text-secondary leading-relaxed"> </p></div></div></div>');
const qe = {
  hash: "svelte-ecbnw5",
  code: ".feature-card.svelte-ecbnw5:hover {--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}"
};
function st(m, e) {
  oe(m, qe);
  let t = a(e, "icon", 3, "✨"), o = a(e, "className", 3, ""), i = B(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "icon",
    "title",
    "description",
    "className"
  ]);
  var c = We();
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
  var b = r(c), f = r(b), y = r(f), z = D(f, 2), p = r(z), u = r(p), d = D(p, 2), s = r(d);
  N(() => {
    j(y, t()), j(u, e.title), j(s, e.description);
  }), l(m, c);
}
export {
  et as B,
  $e as C,
  st as F,
  tt as H,
  it as O,
  at as P,
  Le as S,
  rt as T,
  Ze as a,
  lt as b,
  Qe as c,
  ot as d
};
