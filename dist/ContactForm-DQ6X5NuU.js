import { M as te, R as ae, S as re, T as oe, U as ne, p as b, f as _, c as K, y as j, d as l, e as F, h as I, r as G, B as M, k as r, i as S, g as N, N as A, V as R, A as x, W as Y, x as D, z as E, C as T, G as P, D as ie, E as se, F as W, X as H, j as Z, s as $, Q as ee, P as le } from "./ssr-safe-bsWGK4V4.js";
import { f as Q, h as de, B as V, a as ce, I as X, T as ve, C as ue } from "./CodeBlock-BbB7jhcz.js";
function J(t, e) {
  return t === e || (t == null ? void 0 : t[ne]) === e;
}
function me(t = {}, e, a, o) {
  return te(() => {
    var i, n;
    return ae(() => {
      i = n, n = [], oe(() => {
        t !== a(...n) && (e(t, ...n), i && J(a(...i), t) && e(null, ...i));
      });
    }), () => {
      re(() => {
        n && J(a(...n), t) && e(null, ...n);
      });
    };
  }), t;
}
var fe = _("<form><!></form>");
function be(t, e) {
  I(e, !0);
  let a = b(e, "method", 3, "post"), o = b(e, "action", 3, ""), i = b(e, "className", 3, ""), n = G(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "method",
    "action",
    "className",
    "onsubmit",
    "children"
  ]);
  function g(u) {
    const h = new FormData(u.target);
    Object.fromEntries(h.entries()), e.onsubmit && e.onsubmit(u);
  }
  var c = fe();
  K(c, () => ({
    method: a(),
    action: o(),
    class: `space-y-4 ${i() ?? ""}`,
    onsubmit: g,
    ...n
  }));
  var s = r(c);
  j(s, () => e.children ?? M), l(t, c), F();
}
var ge = _('<header class="layout-header svelte-wzmt5k"><!></header> <main class="layout-main svelte-wzmt5k"><!></main> <footer class="layout-footer svelte-wzmt5k"><!></footer>', 1), xe = _('<aside class="layout-sidebar svelte-wzmt5k"><!></aside> <main class="layout-main svelte-wzmt5k"><!></main>', 1), he = _('<div class="layout-grid svelte-wzmt5k"><!></div>'), pe = _("<div><!></div>");
const we = {
  hash: "svelte-wzmt5k",
  code: `.layout.svelte-wzmt5k {min-height:100vh}.layout-main.svelte-wzmt5k {display:flex;flex-direction:column}.layout-sidebar.svelte-wzmt5k {width:16rem;border-right-width:1px;border-color:rgb(var(--color-border));background-color:rgb(var(--color-surface-secondary))}.layout-grid.svelte-wzmt5k {display:grid;grid-template-columns:repeat(1, minmax(0, 1fr))}

    @media (min-width: 768px) {.layout-grid.svelte-wzmt5k {grid-template-columns:repeat(2, minmax(0, 1fr))}
}

    @media (min-width: 1024px) {.layout-grid.svelte-wzmt5k {grid-template-columns:repeat(3, minmax(0, 1fr))}
}.layout-header.svelte-wzmt5k {border-bottom-width:1px;border-color:rgb(var(--color-border));background-color:rgb(var(--color-surface));padding:1rem}.layout-footer.svelte-wzmt5k {margin-top:auto;border-top-width:1px;border-color:rgb(var(--color-border));background-color:rgb(var(--color-surface-secondary));padding:1rem}`
};
function rt(t, e) {
  Q(t, we);
  let a = b(e, "variant", 3, "main"), o = b(e, "gap", 3, "md"), i = b(e, "className", 3, ""), n = G(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "variant",
    "gap",
    "className",
    "children",
    "header",
    "main",
    "footer",
    "sidebar"
  ]), g = A(() => `gap-${o()}`);
  var c = pe();
  K(
    c,
    () => ({
      class: `layout layout-${a() ?? ""} ${N(g) ?? ""} ${i() ?? ""}`,
      ...n
    }),
    void 0,
    void 0,
    "svelte-wzmt5k"
  );
  var s = r(c);
  {
    var u = (m) => {
      var f = ge(), k = R(f), p = r(k);
      j(p, () => e.header ?? M);
      var w = x(k, 2), y = r(w);
      j(y, () => e.main ?? M);
      var v = x(w, 2), q = r(v);
      j(q, () => e.footer ?? M), l(m, f);
    }, h = (m) => {
      var f = Y(), k = R(f);
      {
        var p = (y) => {
          var v = xe(), q = R(v), z = r(q);
          j(z, () => e.sidebar ?? M);
          var L = x(q, 2), B = r(L);
          j(B, () => e.main ?? M), l(y, v);
        }, w = (y) => {
          var v = Y(), q = R(v);
          {
            var z = (L) => {
              var B = he(), U = r(B);
              j(U, () => e.children ?? M), l(L, B);
            };
            S(
              q,
              (L) => {
                a() === "grid" && L(z);
              },
              !0
            );
          }
          l(y, v);
        };
        S(
          k,
          (y) => {
            a() === "sidebar" ? y(p) : y(w, !1);
          },
          !0
        );
      }
      l(m, f);
    };
    S(s, (m) => {
      a() === "main" ? m(u) : m(h, !1);
    });
  }
  l(t, c);
}
function ye(t, e) {
  t.target === t.currentTarget && e(t);
}
function _e(t, e, a) {
  t.key === "Escape" && e(t), a.onkeydown && a.onkeydown(t);
}
var ke = _('<div class="flex justify-end gap-3 p-6 border-t border-gray-200"><!></div>'), qe = _('<div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" role="dialog" aria-modal="true" tabindex="-1"><div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"><div class="flex items-center justify-between p-6 border-b border-gray-200"><h2 class="text-xl font-semibold text-gray-900"> </h2> <button type="button" class="text-gray-400 hover:text-gray-600 text-2xl" aria-label="Close">×</button></div> <div class="p-6"><!></div> <!></div></div>');
function ot(t, e) {
  I(e, !0);
  let a = b(e, "isOpen", 7, !1), o = b(e, "title", 3, "");
  function i(s) {
    a(!1), e.onclick && s && e.onclick(s);
  }
  var n = Y(), g = R(n);
  {
    var c = (s) => {
      var u = qe();
      u.__click = [ye, i], u.__keydown = [_e, i, e];
      var h = r(u), m = r(h), f = r(m), k = r(f), p = x(f, 2);
      p.__click = i;
      var w = x(m, 2), y = r(w);
      j(y, () => e.children ?? M);
      var v = x(w, 2);
      {
        var q = (z) => {
          var L = ke(), B = r(L);
          j(B, () => e.footer ?? M), l(z, L);
        };
        S(v, (z) => {
          e.footer && z(q);
        });
      }
      E(() => T(k, o())), l(s, u);
    };
    S(g, (s) => {
      a() && s(c);
    });
  }
  l(t, n), F();
}
D(["click", "keydown"]);
function ze(t, e) {
  t.target === t.currentTarget && e();
}
function Ce(t, e) {
  t.key === "Escape" && e();
}
var Le = _('<div class="flex items-center justify-between p-4 border-b border-gray-200"><h3 class="text-lg font-semibold text-gray-900"> </h3> <button type="button" class="text-gray-400 hover:text-gray-600 text-2xl" aria-label="Close">×</button></div>'), je = _('<div class="fixed inset-0 bg-black/50 z-50" role="dialog" aria-modal="true" tabindex="-1"></div> <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-t-xl shadow-xl z-50 max-h-[80vh] overflow-y-auto" role="dialog" aria-modal="true"><!> <div class="p-4"><!></div></div>', 1);
function nt(t, e) {
  let a = b(e, "isOpen", 7, !1), o = b(e, "title", 3, "");
  function i() {
    a(!1);
  }
  var n = Y(), g = R(n);
  {
    var c = (s) => {
      var u = je(), h = R(u);
      h.__click = [ze, i], h.__keydown = [Ce, i];
      var m = x(h, 2), f = r(m);
      {
        var k = (y) => {
          var v = Le(), q = r(v), z = r(q), L = x(q, 2);
          L.__click = i, E(() => T(z, o())), l(y, v);
        };
        S(f, (y) => {
          o() && y(k);
        });
      }
      var p = x(f, 2), w = r(p);
      j(w, () => e.children ?? M), l(s, u);
    };
    S(g, (s) => {
      a() && s(c);
    });
  }
  l(t, n);
}
D(["click", "keydown"]);
var Me = _('<div class="dropdown-content opacity-100 visible transform-none group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible svelte-1o1q13x"><!></div>'), Ne = _('<div class="dropdown-container group relative inline-block svelte-1o1q13x"><!> <!></div>');
const Se = {
  hash: "svelte-1o1q13x",
  code: `.dropdown-container.svelte-1o1q13x {position:relative;display:inline-block;}.dropdown-content.svelte-1o1q13x {position:absolute;z-index:50;background-color:white;border:1px solid #e5e7eb;border-radius:0.5rem;box-shadow:0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);min-width:12rem;opacity:0;visibility:hidden;transition:opacity 0.2s ease-in-out,
            visibility 0.2s ease-in-out,
            transform 0.2s ease-in-out;}

    /* Positioning based on data-placement */.dropdown-container[data-placement="bottom-start"].svelte-1o1q13x .dropdown-content:where(.svelte-1o1q13x) {top:calc(100% + 8px);left:0;transform:translateY(4px);}.dropdown-container[data-placement="bottom-end"].svelte-1o1q13x .dropdown-content:where(.svelte-1o1q13x) {top:calc(100% + 8px);right:0;transform:translateY(4px);}.dropdown-container[data-placement="top-start"].svelte-1o1q13x .dropdown-content:where(.svelte-1o1q13x) {bottom:calc(100% + 8px);left:0;transform:translateY(-4px);}.dropdown-container[data-placement="top-end"].svelte-1o1q13x .dropdown-content:where(.svelte-1o1q13x) {bottom:calc(100% + 8px);right:0;transform:translateY(-4px);}

    /* Show on hover/focus */.dropdown-container.svelte-1o1q13x:hover .dropdown-content:where(.svelte-1o1q13x),
    .dropdown-container.svelte-1o1q13x:focus-within .dropdown-content:where(.svelte-1o1q13x) {opacity:1;visibility:visible;transform:translateY(0);}

    /* Arrow styling */.dropdown-content.svelte-1o1q13x::before {content:"";position:absolute;width:0;height:0;border-style:solid;border-width:6px;border-color:transparent;}.dropdown-container[data-placement="bottom-start"].svelte-1o1q13x
        .dropdown-content:where(.svelte-1o1q13x)::before,
    .dropdown-container[data-placement="bottom-end"].svelte-1o1q13x .dropdown-content:where(.svelte-1o1q13x)::before {top:-6px;border-bottom-color:white;}.dropdown-container[data-placement="top-start"].svelte-1o1q13x .dropdown-content:where(.svelte-1o1q13x)::before,
    .dropdown-container[data-placement="top-end"].svelte-1o1q13x .dropdown-content:where(.svelte-1o1q13x)::before {bottom:-6px;border-top-color:white;}.dropdown-container[data-placement="bottom-start"].svelte-1o1q13x
        .dropdown-content:where(.svelte-1o1q13x)::before {left:1rem;}.dropdown-container[data-placement="bottom-end"].svelte-1o1q13x .dropdown-content:where(.svelte-1o1q13x)::before {right:1rem;}.dropdown-container[data-placement="top-start"].svelte-1o1q13x .dropdown-content:where(.svelte-1o1q13x)::before {left:1rem;}.dropdown-container[data-placement="top-end"].svelte-1o1q13x .dropdown-content:where(.svelte-1o1q13x)::before {right:1rem;}`
};
function it(t, e) {
  Q(t, Se);
  let a = b(e, "isOpen", 3, !1), o = b(e, "placement", 3, "bottom-start");
  var i = Ne(), n = r(i);
  j(n, () => e.trigger ?? M);
  var g = x(n, 2);
  {
    var c = (s) => {
      var u = Me(), h = r(u);
      j(h, () => e.children ?? M), l(s, u);
    };
    S(g, (s) => {
      a() && s(c);
    });
  }
  E(() => P(i, "data-placement", o())), l(t, i);
}
function Be(t, e, a, o) {
  if (t.key === "ArrowLeft" || t.key === "ArrowRight") {
    const i = e().findIndex((c) => c.id === a()), n = t.key === "ArrowLeft" ? -1 : 1, g = (i + n + e().length) % e().length;
    o(e()[g].id);
  }
}
var Ee = (t, e, a) => e(N(a).id), Re = _('<button type="button" role="tab"> </button>'), Te = _('<div class="tabs-container"><div class="flex border-b border-gray-200" role="tablist" tabindex="0"></div> <div class="mt-4"><!></div></div>');
function st(t, e) {
  I(e, !0);
  let a = b(e, "tabs", 19, () => []), o = b(e, "activeTab", 7, ""), i = b(e, "variant", 3, "default");
  function n(h) {
    o(h);
  }
  var g = Te(), c = r(g);
  c.__keydown = [Be, a, o, n], ie(c, 21, a, se, (h, m) => {
    var f = Re();
    f.__click = [Ee, n, m];
    var k = r(f);
    E(() => {
      W(f, 1, `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${o() === N(m).id ? i() === "pills" ? "bg-blue-100 text-blue-700 border-blue-500" : "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`), f.disabled = N(m).disabled, P(f, "aria-selected", o() === N(m).id), T(k, N(m).label);
    }), l(h, f);
  });
  var s = x(c, 2), u = r(s);
  j(u, () => e.children ?? M, () => ({ activeTab: o() })), l(t, g), F();
}
D(["keydown", "click"]);
function Ue(t, e) {
  e.onclick && e.onclick(t);
}
var Oe = _('<button class="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full text-text-secondary hover:text-primary transition-colors duration-200 motion-reduce:transition-none group focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2" aria-label="Dismiss alert" type="button"><svg class="w-4 h-4 text-current group-hover:scale-110 transition-transform duration-200 motion-reduce:transition-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>'), De = _('<h4 class="font-semibold text-sm mb-1 text-inherit"> </h4>'), Pe = _('<p class="text-sm leading-relaxed text-inherit"> </p>'), Fe = _('<div><!> <div><div class="flex-shrink-0 mt-0.5"><!></div> <div class="flex-1 min-w-0"><!> <!> <!></div></div></div>');
function lt(t, e) {
  I(e, !0);
  let a = b(e, "variant", 3, "info"), o = b(e, "title", 3, ""), i = b(e, "message", 3, ""), n = b(e, "closable", 3, !1), g = b(e, "className", 3, ""), c = G(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "variant",
    "title",
    "message",
    "closable",
    "className",
    "onclick",
    "children"
  ]), s = A(() => ({
    info: "bg-info-surface text-info-text border border-info",
    success: "bg-success-surface text-success-text border border-success",
    warning: "bg-warning-surface text-warning-text border border-warning",
    error: "bg-error-surface text-error-text border border-error"
  })), u = A(() => a() === "success" || a() === "info" ? "status" : "alert"), h = A(() => ({
    info: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>`,
    success: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>`,
    warning: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>`,
    error: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>`
  }));
  var m = Fe();
  K(m, () => ({
    class: `relative rounded-md p-4 border ${N(s)[a()] ?? ""} transition-all duration-200 motion-reduce:transition-none ${g() ?? ""}`,
    role: N(u),
    "aria-live": a() === "success" || a() === "info" ? "polite" : "assertive",
    "aria-atomic": "true",
    ...c
  }));
  var f = r(m);
  {
    var k = (d) => {
      var C = Oe();
      C.__click = [Ue, e], l(d, C);
    };
    S(f, (d) => {
      n() && d(k);
    });
  }
  var p = x(f, 2), w = r(p), y = r(w);
  de(y, () => N(h)[a()]);
  var v = x(w, 2), q = r(v);
  {
    var z = (d) => {
      var C = De(), O = r(C);
      E(() => T(O, o())), l(d, C);
    };
    S(q, (d) => {
      o() && d(z);
    });
  }
  var L = x(q, 2);
  {
    var B = (d) => {
      var C = Pe(), O = r(C);
      E(() => T(O, i())), l(d, C);
    };
    S(L, (d) => {
      i() && d(B);
    });
  }
  var U = x(L, 2);
  j(U, () => e.children ?? M), E(() => W(p, 1, `flex items-start gap-3 ${n() ? "pr-8" : ""}`)), l(t, m), F();
}
D(["click"]);
function Ie(t, e) {
  const a = t.target;
  if (!a.files || a.files.length === 0) return;
  const o = a.files[0];
  if (typeof URL < "u" && URL.createObjectURL) {
    const i = URL.createObjectURL(o);
    e(i);
  }
}
var Ae = _('<div class="relative group"><img alt="" class="w-full h-32 object-cover rounded-lg border border-gray-300"/> <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"><div class="flex gap-2"><!> <!></div></div></div>'), Ye = (t, e) => t.key === "Enter" && e(), Ke = _('<div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer" role="button" tabindex="0"><div class="space-y-3"><div class="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center"><span class="text-2xl">📷</span></div> <div><p class="font-medium text-gray-900"> </p> <p class="text-sm text-gray-500">Click to choose a file</p></div></div></div>'), Ge = _('<div class="space-y-3"><!> <input type="file" class="hidden"/></div>');
function dt(t, e) {
  let a = b(e, "value", 7, null), o = b(e, "disabled", 3, !1), i = b(e, "accept", 3, "image/*"), n = b(e, "placeholder", 3, "No image selected"), g = Z(void 0);
  function c() {
    a() && typeof URL < "u" && URL.revokeObjectURL && URL.revokeObjectURL(a()), a(null);
  }
  function s() {
    var p;
    (p = N(g)) == null || p.click();
  }
  var u = Ge(), h = r(u);
  {
    var m = (p) => {
      var w = Ae(), y = r(w), v = x(y, 2), q = r(v), z = r(q);
      V(z, {
        variant: "secondary",
        size: "sm",
        onclick: s,
        get disabled() {
          return o();
        },
        children: (B, U) => {
          var d = H("Change");
          l(B, d);
        },
        $$slots: { default: !0 }
      });
      var L = x(z, 2);
      V(L, {
        variant: "danger",
        size: "sm",
        onclick: c,
        get disabled() {
          return o();
        },
        children: (B, U) => {
          var d = H("Remove");
          l(B, d);
        },
        $$slots: { default: !0 }
      }), E(() => P(y, "src", a())), l(p, w);
    }, f = (p) => {
      var w = Ke();
      w.__click = s, w.__keydown = [Ye, s];
      var y = r(w), v = x(r(y), 2), q = r(v), z = r(q);
      E(() => T(z, n())), l(p, w);
    };
    S(h, (p) => {
      a() ? p(m) : p(f, !1);
    });
  }
  var k = x(h, 2);
  k.__change = [Ie, a], me(k, (p) => $(g, p), () => N(g)), E(() => P(k, "accept", i())), l(t, u);
}
D(["click", "keydown", "change"]);
var He = _('<p class="text-sm text-text-secondary mt-1"> </p>'), Ve = (t, e) => $(e, !N(e)), We = ee('<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg> Preview', 1), Qe = ee('<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg> Code', 1), Xe = _('<div class="component-preview svelte-1uavm9q"><!></div>'), Je = _('<div><div class="px-6 py-4 border-b border-border bg-surface-secondary"><div class="flex items-center justify-between"><div><h3 class="text-lg font-semibold text-text"> </h3> <!></div> <button class="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text hover:bg-surface rounded-md transition-colors duration-200"><!></button></div></div> <div class="p-6"><!></div></div>');
const Ze = {
  hash: "svelte-1uavm9q",
  code: ".component-preview.svelte-1uavm9q {display:flex;min-height:100px;align-items:center;justify-content:center}"
};
function ct(t, e) {
  Q(t, Ze);
  let a = b(e, "description", 3, ""), o = b(e, "language", 3, "svelte"), i = b(e, "className", 3, ""), n = G(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "title",
    "description",
    "code",
    "language",
    "className",
    "children"
  ]), g = Z(!1);
  var c = Je();
  K(
    c,
    () => ({
      class: `component-demo bg-surface border border-border rounded-lg overflow-hidden ${i() ?? ""}`,
      ...n
    }),
    void 0,
    void 0,
    "svelte-1uavm9q"
  );
  var s = r(c), u = r(s), h = r(u), m = r(h), f = r(m), k = x(m, 2);
  {
    var p = (d) => {
      var C = He(), O = r(C);
      E(() => T(O, a())), l(d, C);
    };
    S(k, (d) => {
      a() && d(p);
    });
  }
  var w = x(h, 2);
  w.__click = [Ve, g];
  var y = r(w);
  {
    var v = (d) => {
      var C = We();
      l(d, C);
    }, q = (d) => {
      var C = Qe();
      l(d, C);
    };
    S(y, (d) => {
      N(g) ? d(v) : d(q, !1);
    });
  }
  var z = x(s, 2), L = r(z);
  {
    var B = (d) => {
      ce(d, {
        get code() {
          return e.code;
        },
        get language() {
          return o();
        }
      });
    }, U = (d) => {
      var C = Xe(), O = r(C);
      j(O, () => e.children ?? M), l(d, C);
    };
    S(L, (d) => {
      N(g) ? d(B) : d(U, !1);
    });
  }
  E(() => {
    T(f, e.title), P(w, "aria-label", N(g) ? "Show preview" : "Show code");
  }), l(t, c);
}
D(["click"]);
var $e = _('<div class="space-y-4"><!> <!> <!> <!></div> <div class="pt-4"><!></div>', 1), et = _(`<div><div class="mb-6"><h2 class="text-2xl font-bold text-text mb-2">Get in Touch</h2> <p class="text-text-secondary">We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.</p></div> <!></div>`);
function vt(t, e) {
  I(e, !0);
  let a = b(e, "className", 3, ""), o = le({ name: "", email: "", message: "", subscribe: !1 });
  function i(c) {
    const s = new FormData(c.target), u = {
      name: s.get("name") || "",
      email: s.get("email") || "",
      message: s.get("message") || "",
      subscribe: s.get("subscribe") === "on" || !1
    };
    console.log("Form submitted with data:", u);
  }
  var n = et(), g = x(r(n), 2);
  be(g, {
    onsubmit: i,
    className: "space-y-4",
    children: (c, s) => {
      var u = $e(), h = R(u), m = r(h);
      X(m, {
        type: "text",
        name: "name",
        label: "Name",
        placeholder: "Enter your name",
        get value() {
          return o.name;
        },
        oninput: (v) => o.name = v.target.value
      });
      var f = x(m, 2);
      X(f, {
        type: "email",
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        get value() {
          return o.email;
        },
        oninput: (v) => o.email = v.target.value
      });
      var k = x(f, 2);
      ve(k, {
        name: "message",
        label: "Message",
        placeholder: "Enter your message",
        rows: 4,
        get value() {
          return o.message;
        },
        oninput: (v) => o.message = v.target.value
      });
      var p = x(k, 2);
      ue(p, {
        name: "subscribe",
        label: "Subscribe to updates",
        get checked() {
          return o.subscribe;
        },
        onchange: (v) => o.subscribe = v.target.checked
      });
      var w = x(h, 2), y = r(w);
      V(y, {
        type: "submit",
        variant: "primary",
        size: "md",
        children: (v, q) => {
          var z = H("Send Message");
          l(v, z);
        },
        $$slots: { default: !0 }
      }), l(c, u);
    },
    $$slots: { default: !0 }
  }), E(() => W(n, 1, `max-w-md mx-auto ${a() ?? ""}`)), l(t, n), F();
}
export {
  lt as A,
  ct as C,
  it as D,
  be as F,
  dt as I,
  rt as L,
  ot as M,
  nt as S,
  st as T,
  vt as a
};
