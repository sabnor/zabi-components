import { t as S, A as ie, B as le, C as de, D as ne, E as W, w as ce, F as ve, u as M, G as fe, S as ue, j as f, i as H, f as y, k as E, e as j, b, p as A, c as I, d as r, h as U, n as Y, x as X, y as re, a as D, v as R, g as w, m as J, s as V, H as F, l as k, I as Q, J as xe, o as O, q as ae, r as oe, K as $ } from "./props-ChfwWtCN.js";
import { p as se, a as G, B as ee, C as be } from "./Card-YmnHW5Dv.js";
import { createEventDispatcher as K } from "svelte";
function me(o, e, a = !1, i = !1, n = !1) {
  var t = o, c = "";
  S(() => {
    var l = (
      /** @type {Effect} */
      ie
    );
    if (c !== (c = e() ?? "") && (l.nodes_start !== null && (le(
      l.nodes_start,
      /** @type {TemplateNode} */
      l.nodes_end
    ), l.nodes_start = l.nodes_end = null), c !== "")) {
      var d = c + "";
      a ? d = `<svg>${d}</svg>` : i && (d = `<math>${d}</math>`);
      var v = de(d);
      if ((a || i) && (v = /** @type {Element} */
      W(v)), ne(
        /** @type {TemplateNode} */
        W(v),
        /** @type {TemplateNode} */
        v.lastChild
      ), a || i)
        for (; W(v); )
          t.before(
            /** @type {Node} */
            W(v)
          );
      else
        t.before(v);
    }
  });
}
function te(o, e) {
  return o === e || (o == null ? void 0 : o[ue]) === e;
}
function pe(o = {}, e, a, i) {
  return ce(() => {
    var n, t;
    return ve(() => {
      n = t, t = [], M(() => {
        o !== a(...t) && (e(o, ...t), n && te(a(...n), o) && e(null, ...n));
      });
    }), () => {
      fe(() => {
        t && te(a(...t), o) && e(null, ...t);
      });
    };
  }), o;
}
var ge = y("<form><!></form>");
function Xe(o, e) {
  I(e, !1);
  let a = f(e, "method", 8, "post"), i = f(e, "action", 8, ""), n = f(e, "className", 8, "");
  const t = K();
  function c(v) {
    const p = new FormData(v.target), u = Object.fromEntries(p.entries());
    t("submit", { data: u, formData: p, event: v });
  }
  H();
  var l = ge(), d = r(l);
  E(d, e, "default", {}), S(() => {
    U(l, "method", a()), U(l, "action", i()), Y(l, 1, `space-y-4 ${n() ?? ""}`);
  }), j("submit", l, se(c)), b(o, l), A();
}
var he = y('<header class="layout-header svelte-wzmt5k"><!></header> <main class="layout-main svelte-wzmt5k"><!></main> <footer class="layout-footer svelte-wzmt5k"><!></footer>', 1), ye = y('<aside class="layout-sidebar svelte-wzmt5k"><!></aside> <main class="layout-main svelte-wzmt5k"><!></main>', 1), we = y('<div class="layout-grid svelte-wzmt5k"><!></div>'), _e = y("<div><!></div>");
const ke = {
  hash: "svelte-wzmt5k",
  code: `.layout.svelte-wzmt5k {min-height:100vh}.layout-main.svelte-wzmt5k {display:flex;flex-direction:column}.layout-sidebar.svelte-wzmt5k {width:16rem;border-right-width:1px;border-color:rgb(var(--color-border));background-color:rgb(var(--color-surface-secondary))}.layout-grid.svelte-wzmt5k {display:grid;grid-template-columns:repeat(1, minmax(0, 1fr))}

    @media (min-width: 768px) {.layout-grid.svelte-wzmt5k {grid-template-columns:repeat(2, minmax(0, 1fr))}
}

    @media (min-width: 1024px) {.layout-grid.svelte-wzmt5k {grid-template-columns:repeat(3, minmax(0, 1fr))}
}.layout-header.svelte-wzmt5k {border-bottom-width:1px;border-color:rgb(var(--color-border));background-color:rgb(var(--color-surface));padding:1rem}.layout-footer.svelte-wzmt5k {margin-top:auto;border-top-width:1px;border-color:rgb(var(--color-border));background-color:rgb(var(--color-surface-secondary));padding:1rem}`
};
function Ze(o, e) {
  I(e, !1), G(o, ke);
  const a = J();
  let i = f(e, "variant", 8, "main"), n = f(e, "gap", 8, "md"), t = f(e, "className", 8, "");
  X(() => R(n()), () => {
    V(a, `gap-${n()}`);
  }), re();
  var c = _e(), l = r(c);
  {
    var d = (p) => {
      var u = he(), s = F(u), m = r(s);
      E(m, e, "header", {});
      var q = k(s, 2), g = r(q);
      E(g, e, "main", {});
      var x = k(q, 2), h = r(x);
      E(h, e, "footer", {}), b(p, u);
    }, v = (p) => {
      var u = Q(), s = F(u);
      {
        var m = (g) => {
          var x = ye(), h = F(x), C = r(h);
          E(C, e, "sidebar", {});
          var _ = k(h, 2), T = r(_);
          E(T, e, "main", {}), b(g, x);
        }, q = (g) => {
          var x = Q(), h = F(x);
          {
            var C = (_) => {
              var T = we(), L = r(T);
              E(L, e, "default", {}), b(_, T);
            };
            D(
              h,
              (_) => {
                i() === "grid" && _(C);
              },
              !0
            );
          }
          b(g, x);
        };
        D(
          s,
          (g) => {
            i() === "sidebar" ? g(m) : g(q, !1);
          },
          !0
        );
      }
      b(p, u);
    };
    D(l, (p) => {
      i() === "main" ? p(d) : p(v, !1);
    });
  }
  S(() => Y(c, 1, `layout layout-${i() ?? ""} ${w(a) ?? ""} ${t() ?? ""}`, "svelte-wzmt5k")), b(o, c), A();
}
var qe = y('<div class="flex justify-end gap-3 p-6 border-t border-gray-200"><!></div>'), ze = y('<div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" role="dialog" aria-modal="true" tabindex="-1"><div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"><div class="flex items-center justify-between p-6 border-b border-gray-200"><h2 class="text-xl font-semibold text-gray-900"> </h2> <button type="button" class="text-gray-400 hover:text-gray-600 text-2xl" aria-label="Close">×</button></div> <div class="p-6"><!></div> <!></div></div>');
function $e(o, e) {
  const a = xe(e);
  I(e, !1);
  let i = f(e, "isOpen", 12, !1), n = f(e, "title", 8, "");
  const t = K();
  function c() {
    i(!1), t("close");
  }
  function l(s) {
    s.target === s.currentTarget && c();
  }
  function d(s) {
    s.key === "Escape" && c();
  }
  H();
  var v = Q(), p = F(v);
  {
    var u = (s) => {
      var m = ze(), q = r(m), g = r(q), x = r(g), h = r(x), C = k(x, 2), _ = k(g, 2), T = r(_);
      E(T, e, "default", {});
      var L = k(_, 2);
      {
        var P = (N) => {
          var z = qe(), B = r(z);
          E(B, e, "footer", {}), b(N, z);
        };
        D(L, (N) => {
          M(() => a.footer) && N(P);
        });
      }
      S(() => O(h, n())), j("click", C, c), j("click", m, l), j("keydown", m, d), b(s, m);
    };
    D(p, (s) => {
      i() && s(u);
    });
  }
  b(o, v), A();
}
var Ce = y('<div class="flex items-center justify-between p-4 border-b border-gray-200"><h3 class="text-lg font-semibold text-gray-900"> </h3> <button type="button" class="text-gray-400 hover:text-gray-600 text-2xl" aria-label="Close">×</button></div>'), Se = y('<div class="fixed inset-0 bg-black/50 z-50" role="dialog" aria-modal="true" tabindex="-1"></div> <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-t-xl shadow-xl z-50 max-h-[80vh] overflow-y-auto" role="dialog" aria-modal="true"><!> <div class="p-4"><!></div></div>', 1);
function et(o, e) {
  I(e, !1);
  let a = f(e, "isOpen", 12, !1), i = f(e, "title", 8, "");
  const n = K();
  function t() {
    a(!1), n("close");
  }
  function c(u) {
    u.target === u.currentTarget && t();
  }
  function l(u) {
    u.key === "Escape" && t();
  }
  H();
  var d = Q(), v = F(d);
  {
    var p = (u) => {
      var s = Se(), m = F(s), q = k(m, 2), g = r(q);
      {
        var x = (_) => {
          var T = Ce(), L = r(T), P = r(L), N = k(L, 2);
          S(() => O(P, i())), j("click", N, t), b(_, T);
        };
        D(g, (_) => {
          i() && _(x);
        });
      }
      var h = k(g, 2), C = r(h);
      E(C, e, "default", {}), j("click", m, c), j("keydown", m, l), b(u, s);
    };
    D(v, (u) => {
      a() && u(p);
    });
  }
  b(o, d), A();
}
var Te = y('<div class="dropdown-content group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible svelte-1o1q13x"><!></div>'), Le = y('<div class="dropdown-container group relative inline-block svelte-1o1q13x"><!> <!></div>');
const Be = {
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
function tt(o, e) {
  G(o, Be);
  let a = f(e, "isOpen", 8, !1), i = f(e, "placement", 8, "bottom-start");
  var n = Le(), t = r(n);
  E(t, e, "trigger", {});
  var c = k(t, 2);
  {
    var l = (d) => {
      var v = Te(), p = r(v);
      E(p, e, "default", {}), b(d, v);
    };
    D(c, (d) => {
      a() && d(l);
    });
  }
  S(() => U(n, "data-placement", i())), b(o, n);
}
var Ee = y('<button type="button" role="tab"> </button>'), je = y('<div class="tabs-container"><div class="flex border-b border-gray-200" role="tablist" tabindex="0"></div> <div class="mt-4"><!></div></div>');
function rt(o, e) {
  I(e, !1);
  let a = f(e, "tabs", 24, () => []), i = f(e, "activeTab", 12, ""), n = f(e, "variant", 8, "default");
  const t = K();
  function c(s) {
    i(s), t("change", { activeTab: s });
  }
  function l(s) {
    if (s.key === "ArrowLeft" || s.key === "ArrowRight") {
      const m = a().findIndex((x) => x.id === i()), q = s.key === "ArrowLeft" ? -1 : 1, g = (m + q + a().length) % a().length;
      c(a()[g].id);
    }
  }
  H();
  var d = je(), v = r(d);
  ae(v, 5, a, oe, (s, m) => {
    var q = Ee(), g = r(q);
    S(() => {
      Y(q, 1, `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${R(i()), w(m), R(n()), M(() => i() === w(m).id ? n() === "pills" ? "bg-blue-100 text-blue-700 border-blue-500" : "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300") ?? ""}`), q.disabled = (w(m), M(() => w(m).disabled)), U(q, "aria-selected", (R(i()), w(m), M(() => i() === w(m).id))), O(g, (w(m), M(() => w(m).label)));
    }), j("click", q, () => c(w(m).id)), b(s, q);
  });
  var p = k(v, 2), u = r(p);
  E(
    u,
    e,
    "default",
    {
      get activeTab() {
        return i();
      }
    }
  ), j("keydown", v, l), b(o, d), A();
}
var De = y('<button class="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full text-text-secondary hover:text-primary transition-colors duration-200 motion-reduce:transition-none group focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2" aria-label="Dismiss alert" type="button"><svg class="w-4 h-4 text-current group-hover:scale-110 transition-transform duration-200 motion-reduce:transition-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>'), Me = y('<h4 class="font-semibold text-sm mb-1" style="color: inherit;"> </h4>'), Ne = y('<p class="text-sm leading-relaxed" style="color: inherit;"> </p>'), Oe = y('<div aria-atomic="true"><!> <div><div class="flex-shrink-0 mt-0.5"><!></div> <div class="flex-1 min-w-0"><!> <!> <!></div></div></div>');
function at(o, e) {
  I(e, !1);
  const a = J(), i = J(), n = J();
  let t = f(e, "variant", 8, "info"), c = f(e, "title", 8, ""), l = f(e, "message", 8, ""), d = f(e, "closable", 8, !1), v = f(e, "className", 8, "");
  const p = K();
  function u(z) {
    p("close", { event: z });
  }
  X(() => {
  }, () => {
    V(a, {
      info: "bg-info-surface text-info-text border border-info",
      success: "bg-success-surface text-success-text border border-success",
      warning: "bg-warning-surface text-warning-text border border-warning",
      error: "bg-error-surface text-error-text border border-error"
    });
  }), X(() => R(t()), () => {
    V(i, t() === "success" || t() === "info" ? "status" : "alert");
  }), X(() => {
  }, () => {
    V(n, {
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
    });
  }), re(), H();
  var s = Oe(), m = r(s);
  {
    var q = (z) => {
      var B = De();
      j("click", B, se(u)), b(z, B);
    };
    D(m, (z) => {
      d() && z(q);
    });
  }
  var g = k(m, 2), x = r(g), h = r(x);
  me(h, () => (w(n), R(t()), M(() => w(n)[t()])));
  var C = k(x, 2), _ = r(C);
  {
    var T = (z) => {
      var B = Me(), Z = r(B);
      S(() => O(Z, c())), b(z, B);
    };
    D(_, (z) => {
      c() && z(T);
    });
  }
  var L = k(_, 2);
  {
    var P = (z) => {
      var B = Ne(), Z = r(B);
      S(() => O(Z, l())), b(z, B);
    };
    D(L, (z) => {
      l() && z(P);
    });
  }
  var N = k(L, 2);
  E(N, e, "default", {}), S(() => {
    Y(s, 1, `relative rounded-md p-4 border ${w(a), R(t()), M(() => w(a)[t()]) ?? ""} transition-all duration-200 motion-reduce:transition-none ${v() ?? ""}`), U(s, "role", w(i)), U(s, "aria-live", t() === "success" || t() === "info" ? "polite" : "assertive"), Y(g, 1, `flex items-start gap-3 ${d() ? "pr-8" : ""}`);
  }), b(o, s), A();
}
var Pe = y('<div class="relative group"><img alt="" class="w-full h-32 object-cover rounded-lg border border-gray-300"/> <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"><div class="flex gap-2"><!> <!></div></div></div>'), Ae = y('<div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer" role="button" tabindex="0"><div class="space-y-3"><div class="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center"><span class="text-2xl">📷</span></div> <div><p class="font-medium text-gray-900"> </p> <p class="text-sm text-gray-500">Click to choose a file</p></div></div></div>'), Ie = y('<div class="space-y-3"><!> <input type="file" class="hidden"/></div>');
function ot(o, e) {
  I(e, !1);
  let a = f(e, "value", 12, null), i = f(e, "disabled", 8, !1), n = f(e, "accept", 8, "image/*"), t = f(e, "placeholder", 8, "No image selected");
  const c = K();
  let l = J();
  function d(x) {
    const h = x.target;
    if (!h.files || h.files.length === 0) return;
    const C = h.files[0], _ = URL.createObjectURL(C);
    a(_), c("change", { value: _ });
  }
  function v() {
    a() && URL.revokeObjectURL(a()), a(null), c("change", { value: null });
  }
  function p() {
    var x;
    (x = w(l)) == null || x.click();
  }
  H();
  var u = Ie(), s = r(u);
  {
    var m = (x) => {
      var h = Pe(), C = r(h), _ = k(C, 2), T = r(_), L = r(T);
      ee(L, {
        variant: "secondary",
        size: "sm",
        get disabled() {
          return i();
        },
        $$events: { click: p },
        children: (N, z) => {
          var B = $("Change");
          b(N, B);
        },
        $$slots: { default: !0 }
      });
      var P = k(L, 2);
      ee(P, {
        variant: "danger",
        size: "sm",
        get disabled() {
          return i();
        },
        $$events: { click: v },
        children: (N, z) => {
          var B = $("Remove");
          b(N, B);
        },
        $$slots: { default: !0 }
      }), S(() => U(C, "src", a())), b(x, h);
    }, q = (x) => {
      var h = Ae(), C = r(h), _ = k(r(C), 2), T = r(_), L = r(T);
      S(() => O(L, t())), j("click", h, p), j("keydown", h, (P) => P.key === "Enter" && p()), b(x, h);
    };
    D(s, (x) => {
      a() ? x(m) : x(q, !1);
    });
  }
  var g = k(s, 2);
  pe(g, (x) => V(l, x), () => w(l)), S(() => U(g, "accept", n())), j("change", g, d), b(o, u), A();
}
var Fe = y('<section><h2 class="text-3xl font-bold text-text"> </h2> <p class="text-lg text-text-secondary max-w-2xl mx-auto"> </p></section>');
const Re = {
  hash: "svelte-1k5lr7e",
  code: ".hero.svelte-1k5lr7e {padding-top:2rem;padding-bottom:2rem}"
};
function st(o, e) {
  G(o, Re);
  let a = f(e, "title", 8), i = f(e, "subtitle", 8), n = f(e, "className", 8, "");
  var t = Fe(), c = r(t), l = r(c), d = k(c, 2), v = r(d);
  S(() => {
    Y(t, 1, `hero text-center space-y-4 ${n() ?? ""}`, "svelte-1k5lr7e"), O(l, a()), O(v, i());
  }), b(o, t);
}
var Ue = y('<section><h3 class="text-xl font-semibold text-text"> </h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div></section>');
const Ye = {
  hash: "svelte-1ko6p3l",
  code: ".cards-grid.svelte-1ko6p3l {padding-top:1.5rem;padding-bottom:1.5rem}"
};
function it(o, e) {
  I(e, !1), G(o, Ye);
  let a = f(e, "title", 8), i = f(e, "cards", 8), n = f(e, "className", 8, "");
  const t = K();
  function c(u) {
    t("cardClick", u.detail);
  }
  H();
  var l = Ue(), d = r(l), v = r(d), p = k(d, 2);
  ae(p, 5, i, oe, (u, s) => {
    be(u, {
      get title() {
        return w(s), M(() => w(s).title);
      },
      get description() {
        return w(s), M(() => w(s).description);
      },
      get image() {
        return w(s), M(() => w(s).image);
      },
      variant: "elevated",
      interactive: !0,
      $$events: { click: c }
    });
  }), S(() => {
    Y(l, 1, `cards-grid space-y-6 ${n() ?? ""}`, "svelte-1ko6p3l"), O(v, a());
  }), b(o, l), A();
}
var He = y('<section class="color-demo p-6 space-y-6 svelte-1rwa5aa"><h2 class="text-2xl font-bold text-text mb-6">Semantic Color System Demo</h2> <div class="space-y-2"><h3 class="text-lg font-semibold text-text">Primary Colors</h3> <div class="flex gap-2 flex-wrap"><div class="bg-primary text-text-inverse px-3 py-2 rounded">Primary</div> <div class="bg-primary-hover text-text-inverse px-3 py-2 rounded">Primary Hover</div> <div class="bg-primary-light text-primary px-3 py-2 rounded">Primary Light</div> <div class="bg-primary-dark text-text-inverse px-3 py-2 rounded">Primary Dark</div></div></div> <div class="space-y-2"><h3 class="text-lg font-semibold text-text">Success Colors</h3> <div class="flex gap-2 flex-wrap"><div class="bg-success text-text-inverse px-3 py-2 rounded">Success</div> <div class="bg-success-surface text-success-text px-3 py-2 rounded">Success Surface</div></div></div> <div class="space-y-2"><h3 class="text-lg font-semibold text-text">Error Colors</h3> <div class="flex gap-2 flex-wrap"><div class="bg-error text-text-inverse px-3 py-2 rounded">Error</div> <div class="bg-error-surface text-error-text px-3 py-2 rounded">Error Surface</div></div></div> <div class="space-y-2"><h3 class="text-lg font-semibold text-text">Surface Colors</h3> <div class="flex gap-2 flex-wrap"><div class="bg-surface border border-border px-3 py-2 rounded">Surface</div> <div class="bg-surface-secondary border border-border px-3 py-2 rounded">Surface Secondary</div> <div class="bg-surface-elevated border border-border px-3 py-2 rounded">Surface Elevated</div></div></div> <div class="space-y-2"><h3 class="text-lg font-semibold text-text">Text Colors</h3> <div class="space-y-1"><p class="text-text">Primary Text</p> <p class="text-text-secondary">Secondary Text</p> <p class="text-text-tertiary">Tertiary Text</p> <p class="text-text-disabled">Disabled Text</p></div></div> <div class="space-y-2"><h3 class="text-lg font-semibold text-text">Border Colors</h3> <div class="space-y-1"><div class="border border-border px-3 py-2 rounded">Border</div> <div class="border border-border-secondary px-3 py-2 rounded">Border Secondary</div> <div class="border border-border-focus px-3 py-2 rounded">Border Focus</div></div></div></section>');
const Ke = {
  hash: "svelte-1rwa5aa",
  code: ".color-demo.svelte-1rwa5aa {background-color:rgb(var(--color-background))}"
};
function lt(o) {
  G(o, Ke);
  var e = He();
  b(o, e);
}
var Ge = y('<section><p class="text-info-text">You clicked: <strong> </strong></p></section>');
const Je = {
  hash: "svelte-17n10vn",
  code: ".selected-card-info.svelte-17n10vn {padding-top:1rem;padding-bottom:1rem}"
};
function dt(o, e) {
  I(e, !1), G(o, Je);
  let a = f(e, "selectedCard", 8), i = f(e, "className", 8, "");
  H();
  var n = Q(), t = F(n);
  {
    var c = (l) => {
      var d = Ge(), v = r(d), p = k(r(v)), u = r(p);
      S(() => {
        Y(d, 1, `selected-card-info text-center p-4 bg-info-surface rounded-lg ${i() ?? ""}`, "svelte-17n10vn"), O(u, (R(a()), M(() => a().title)));
      }), b(l, d);
    };
    D(t, (l) => {
      a() && l(c);
    });
  }
  b(o, n), A();
}
export {
  at as A,
  it as C,
  tt as D,
  Xe as F,
  st as H,
  ot as I,
  Ze as L,
  $e as M,
  dt as S,
  rt as T,
  lt as a,
  et as b
};
