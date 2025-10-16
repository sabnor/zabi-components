import { p as t, P as ee, f as g, i as M, c as S, D as le, d as l, e as H, h as O, k as r, A as D, r as B, g as v, N as Y, z as N, G as q, C as j, F as te, O as re, E as de, y as X, B as I, W as F, V as G, Y as ve, x as ce, j as be, s as ue } from "./ssr-safe-bsWGK4V4.js";
import { b as ge, f as oe } from "./CodeBlock-pT5-FgZd.js";
var fe = g('<label class="block text-sm font-medium text-gray-700 mb-1"> </label>'), me = g("<option disabled> </option>"), he = g("<option> </option>"), pe = g("<div><!> <select><!><!></select></div>");
function Le(m, e) {
  O(e, !0);
  let a = t(e, "value", 7, void 0), o = t(e, "options", 19, () => []), i = t(e, "placeholder", 3, "Select an option"), c = t(e, "label", 3, ""), b = t(e, "disabled", 3, !1), f = t(e, "size", 3, "md"), _ = B(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "options",
    "placeholder",
    "label",
    "disabled",
    "size"
  ]), y = ee(typeof window < "u" ? `select-${Math.random().toString(36).substr(2, 9)}` : `select-ssr-${Date.now()}`), p = Y(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), u = Y(() => [
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
      var w = fe(), T = r(w);
      N(() => {
        q(w, "for", y), j(T, c());
      }), l(k, w);
    };
    M(d, (k) => {
      c() && k(h);
    });
  }
  var x = D(d, 2);
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
      var w = me(), T = r(w);
      w.value = w.__value = "", N(() => j(T, i())), l(k, w);
    };
    M(P, (k) => {
      i() && !a() && k(z);
    });
  }
  var C = D(P);
  le(C, 17, o, (k) => k.value, (k, w) => {
    var T = he(), R = r(T), V = {};
    N(() => {
      T.disabled = v(w).disabled, j(R, v(w).label), V !== (V = v(w).value) && (T.value = (T.__value = v(w).value) ?? "");
    }), l(k, T);
  }), l(m, s), H();
}
var xe = g('<span class="text-sm font-medium text-gray-700"> </span>'), we = g('<div class="flex items-center gap-3"><button><span></span></button> <!></div>');
function Qe(m, e) {
  O(e, !0);
  let a = t(e, "checked", 7, !1), o = t(e, "disabled", 3, !1), i = t(e, "label", 3, ""), c = B(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "checked",
    "disabled",
    "label"
  ]), b = Y(() => [
    "relative inline-flex w-11 h-6 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent",
    "transition-colors duration-200 ease-in-out",
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    a() ? "bg-blue-600" : "bg-gray-200",
    o() ? "opacity-50 cursor-not-allowed" : ""
  ].join(" ")), f = Y(() => [
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
  var u = r(p), n = D(p, 2);
  {
    var s = (d) => {
      var h = xe(), x = r(h);
      N(() => j(x, i())), l(d, h);
    };
    M(n, (d) => {
      i() && d(s);
    });
  }
  N(() => te(u, 1, re(v(f)))), l(m, y), H();
}
var _e = g('<label class="block text-sm font-medium text-gray-700"> </label>'), ye = g('<span class="text-white text-lg">✓</span>'), ze = g("<button><!></button>"), ke = g('<div class="space-y-2"><!> <div></div></div>');
function Ze(m, e) {
  O(e, !0);
  let a = t(e, "value", 7, ""), o = t(e, "label", 3, ""), i = t(e, "disabled", 3, !1), c = B(e, [
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
        q(s, "for", f), j(d, o());
      }), l(n, s);
    };
    M(y, (n) => {
      o() && n(p);
    });
  }
  var u = D(y, 2);
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
      M(x, (z) => {
        a() === v(s).value && z(P);
      });
    }
    l(n, d);
  }), l(m, _), H();
}
var Ce = g('<img class="w-full h-48 object-cover rounded-md mb-4"/>'), Pe = g("<h3> </h3>"), Se = g("<div><!> <!> <!></div>");
function $e(m, e) {
  O(e, !0);
  let a = t(e, "title", 3, ""), o = t(e, "image", 3, ""), i = t(e, "interactive", 3, !1), c = t(e, "variant", 3, "default"), b = t(e, "size", 3, "md"), f = B(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "title",
    "image",
    "interactive",
    "variant",
    "size",
    "children"
  ]), _ = Y(() => ({ sm: "p-3", md: "p-4", lg: "p-6" })), y = Y(() => ge(c())), p = Y(() => [
    "rounded-lg transition-all duration-200",
    "hover:shadow-adaptive-md",
    i() ? "cursor-pointer hover:scale-[1.02]" : "",
    v(_)[b()],
    v(y)
  ].join(" ")), u = Y(() => "text-lg font-semibold mb-2 text-primary");
  var n = Se();
  S(n, () => ({ class: v(p), ...f }));
  var s = r(n);
  {
    var d = (z) => {
      var C = Ce();
      N(() => {
        q(C, "src", o()), q(C, "alt", a());
      }), l(z, C);
    };
    M(s, (z) => {
      o() && z(d);
    });
  }
  var h = D(s, 2);
  {
    var x = (z) => {
      var C = Pe();
      te(C, 1, re(v(u)));
      var k = r(C);
      N(() => j(k, a())), l(z, C);
    };
    M(h, (z) => {
      a() && z(x);
    });
  }
  var P = D(h, 2);
  X(P, () => e.children ?? I), l(m, n), H();
}
var Ne = g('<button><!> <span class="ml-1 text-xs">×</span></button>'), je = g("<span><!></span>");
function et(m, e) {
  O(e, !0);
  let a = t(e, "variant", 3, "default"), o = t(e, "size", 3, "md"), i = t(e, "closable", 3, !1);
  t(e, "className", 3, "");
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
  function b(d) {
    d.stopPropagation();
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
  })), y = Y(() => [
    "inline-flex items-center gap-1 font-medium border rounded-md",
    v(f)[o()],
    v(_)[a()],
    i() ? "cursor-pointer hover:opacity-80" : ""
  ].join(" "));
  var p = F(), u = G(p);
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
      X(x, () => e.children ?? I), l(d, h);
    }, s = (d) => {
      var h = je();
      S(h, () => ({ class: v(y), ...c }));
      var x = r(h);
      X(x, () => e.children ?? I), l(d, h);
    };
    M(u, (d) => {
      i() ? d(n) : d(s, !1);
    });
  }
  l(m, p), H();
}
var Me = g("<h1> <!></h1>"), De = g("<h2> <!></h2>"), Te = g("<h3> <!></h3>"), Ye = g("<h4> <!></h4>"), Be = g("<h5> <!></h5>"), Xe = g("<h6> <!></h6>");
function tt(m, e) {
  O(e, !0);
  let a = t(e, "level", 3, 1), o = t(e, "text", 3, ""), i = B(e, [
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
  })), b = Y(() => ["text-gray-900", v(c)[a()]].join(" "));
  var f = F(), _ = G(f);
  {
    var y = (u) => {
      var n = Me();
      S(n, () => ({ class: v(b), ...i }));
      var s = r(n), d = D(s);
      X(d, () => e.children ?? I), N(() => j(s, o())), l(u, n);
    }, p = (u) => {
      var n = F(), s = G(n);
      {
        var d = (x) => {
          var P = De();
          S(P, () => ({ class: v(b), ...i }));
          var z = r(P), C = D(z);
          X(C, () => e.children ?? I), N(() => j(z, o())), l(x, P);
        }, h = (x) => {
          var P = F(), z = G(P);
          {
            var C = (w) => {
              var T = Te();
              S(T, () => ({ class: v(b), ...i }));
              var R = r(T), V = D(R);
              X(V, () => e.children ?? I), N(() => j(R, o())), l(w, T);
            }, k = (w) => {
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
                            a() === 6 && Z(Q);
                          },
                          !0
                        );
                      }
                      l(U, W);
                    };
                    M(
                      J,
                      (U) => {
                        a() === 5 ? U(L) : U(se, !1);
                      },
                      !0
                    );
                  }
                  l(A, E);
                };
                M(
                  R,
                  (A) => {
                    a() === 4 ? A(V) : A(ie, !1);
                  },
                  !0
                );
              }
              l(w, T);
            };
            M(
              z,
              (w) => {
                a() === 3 ? w(C) : w(k, !1);
              },
              !0
            );
          }
          l(x, P);
        };
        M(
          s,
          (x) => {
            a() === 2 ? x(d) : x(h, !1);
          },
          !0
        );
      }
      l(u, n);
    };
    M(_, (u) => {
      a() === 1 ? u(y) : u(p, !1);
    });
  }
  l(m, f), H();
}
var Ie = g('<div class="flex justify-between items-center mb-2"><label class="text-sm font-medium text-gray-700"> </label> <span class="text-sm text-gray-500"> </span></div>'), Fe = g('<div><!> <div><div class="h-full bg-blue-600 rounded-full"></div></div></div>');
function at(m, e) {
  O(e, !0);
  let a = t(e, "value", 3, 0), o = t(e, "max", 3, 100), i = t(e, "size", 3, "md"), c = t(e, "label", 3, ""), b = B(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "max",
    "size",
    "label"
  ]), f = ee(typeof window < "u" ? `progress-${Math.random().toString(36).substr(2, 9)}` : `progress-ssr-${Date.now()}`), _ = Y(() => Math.min(Math.max(a() / o() * 100, 0), 100)), y = Y(() => ({ sm: "h-1", md: "h-2", lg: "h-3" }));
  var p = Fe(), u = r(p);
  {
    var n = (h) => {
      var x = Ie(), P = r(x), z = r(P), C = D(P, 2), k = r(C);
      N(
        (w) => {
          q(P, "for", f), j(z, c()), j(k, `${w ?? ""}%`);
        },
        [() => Math.round(v(_))]
      ), l(h, x);
    };
    M(u, (h) => {
      c() && h(n);
    });
  }
  var s = D(u, 2);
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
  N(() => ve(d, `width: ${v(_) ?? ""}%`)), l(m, p), H();
}
var Ge = g("<div></div>");
function lt(m, e) {
  let a = t(e, "width", 3, "100%"), o = t(e, "height", 3, "1rem"), i = t(e, "className", 3, ""), c = B(e, [
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
    style: `width: ${a() ?? ""}; height: ${o() ?? ""};`,
    ...c
  })), l(m, b);
}
function He(m, e) {
  ue(e, !1);
}
var Oe = g('<button type="button" class="ml-3 text-gray-400 hover:text-gray-600" aria-label="Close notification">×</button>'), Re = g('<div><div class="flex items-start"><div class="flex-1"><p> </p></div> <!></div></div>');
function rt(m, e) {
  let a = t(e, "message", 3, ""), o = t(e, "type", 3, "info"), i = t(e, "closable", 3, !0), c = B(e, [
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
  var _ = F(), y = G(_);
  {
    var p = (u) => {
      var n = Re();
      S(n, () => ({
        class: "fixed top-4 right-4 max-w-sm w-full bg-white border rounded-lg shadow-lg p-4 z-50",
        role: "alert",
        ...c
      }));
      var s = r(n), d = r(s), h = r(d), x = r(h), P = D(d, 2);
      {
        var z = (C) => {
          var k = Oe();
          k.__click = [He, b], l(C, k);
        };
        M(P, (C) => {
          i() && C(z);
        });
      }
      N(() => {
        te(h, 1, `text-sm ${f[o()] ?? ""}`), j(x, a());
      }), l(u, n);
    };
    M(y, (u) => {
      v(b) && u(p);
    });
  }
  l(m, _);
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
  let a = t(e, "content", 3, ""), o = t(e, "placement", 3, "top"), i = t(e, "delay", 3, 0), c = t(e, "disabled", 3, !1), b = B(e, [
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
  X(_, () => e.children ?? I);
  var y = D(_, 2);
  {
    var p = (u) => {
      var n = Ve(), s = r(n);
      N(() => j(s, a())), l(u, n);
    };
    M(y, (u) => {
      a() && !c() && u(p);
    });
  }
  l(m, f);
}
var Ue = g("<img/>");
function it(m, e) {
  let a = t(e, "alt", 3, ""), o = t(e, "width", 3, "100%"), i = t(e, "height", 3, "auto"), c = t(e, "className", 3, ""), b = B(e, [
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
    alt: a(),
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
  let a = t(e, "icon", 3, "✨"), o = t(e, "className", 3, ""), i = B(e, [
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
  var b = r(c), f = r(b), _ = r(f), y = D(f, 2), p = r(y), u = r(p), n = D(p, 2), s = r(n);
  N(() => {
    j(_, a()), j(u, e.title), j(s, e.description);
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
