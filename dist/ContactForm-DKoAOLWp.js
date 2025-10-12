import { t as T, F as ne, G as ie, H as le, I as de, J as V, w as ce, z as ve, u as B, K as ue, S as fe, j as y, i as P, f as z, k as E, e as j, b as m, p as A, c as R, d as r, h as F, n as H, C as Q, D as re, a as N, v as U, g as w, m as K, s as J, L as I, l as k, M as X, N as me, o as G, q as be, r as ge, O as $, P as W } from "./props-D1U_TNgY.js";
import { e as oe, B as ee, I as te, T as he, C as xe } from "./Checkbox-cOmcN4_d.js";
import { createEventDispatcher as Y } from "svelte";
function pe(n, e, t = !1, i = !1, a = !1) {
  var o = n, v = "";
  T(() => {
    var u = (
      /** @type {Effect} */
      ne
    );
    if (v !== (v = e() ?? "") && (u.nodes_start !== null && (ie(
      u.nodes_start,
      /** @type {TemplateNode} */
      u.nodes_end
    ), u.nodes_start = u.nodes_end = null), v !== "")) {
      var l = v + "";
      t ? l = `<svg>${l}</svg>` : i && (l = `<math>${l}</math>`);
      var f = le(l);
      if ((t || i) && (f = /** @type {Element} */
      V(f)), de(
        /** @type {TemplateNode} */
        V(f),
        /** @type {TemplateNode} */
        f.lastChild
      ), t || i)
        for (; V(f); )
          o.before(
            /** @type {Node} */
            V(f)
          );
      else
        o.before(f);
    }
  });
}
function ae(n, e) {
  return n === e || (n == null ? void 0 : n[fe]) === e;
}
function we(n = {}, e, t, i) {
  return ce(() => {
    var a, o;
    return ve(() => {
      a = o, o = [], B(() => {
        n !== t(...o) && (e(n, ...o), a && ae(t(...a), n) && e(null, ...a));
      });
    }), () => {
      ue(() => {
        o && ae(t(...o), n) && e(null, ...o);
      });
    };
  }), n;
}
function se(n) {
  return function(...e) {
    var t = (
      /** @type {Event} */
      e[0]
    );
    return t.preventDefault(), n == null ? void 0 : n.apply(this, e);
  };
}
var ye = z("<form><!></form>");
function _e(n, e) {
  R(e, !1);
  let t = y(e, "method", 8, "post"), i = y(e, "action", 8, ""), a = y(e, "className", 8, "");
  const o = Y();
  function v(f) {
    const h = new FormData(f.target), b = Object.fromEntries(h.entries());
    o("submit", { data: b, formData: h, event: f });
  }
  P();
  var u = ye(), l = r(u);
  E(l, e, "default", {}), T(() => {
    F(u, "method", t()), F(u, "action", i()), H(u, 1, `space-y-4 ${a() ?? ""}`);
  }), j("submit", u, se(v)), m(n, u), A();
}
var ke = z('<header class="layout-header svelte-wzmt5k"><!></header> <main class="layout-main svelte-wzmt5k"><!></main> <footer class="layout-footer svelte-wzmt5k"><!></footer>', 1), qe = z('<aside class="layout-sidebar svelte-wzmt5k"><!></aside> <main class="layout-main svelte-wzmt5k"><!></main>', 1), ze = z('<div class="layout-grid svelte-wzmt5k"><!></div>'), Ce = z("<div><!></div>");
const Le = {
  hash: "svelte-wzmt5k",
  code: `.layout.svelte-wzmt5k {min-height:100vh}.layout-main.svelte-wzmt5k {display:flex;flex-direction:column}.layout-sidebar.svelte-wzmt5k {width:16rem;border-right-width:1px;border-color:rgb(var(--color-border));background-color:rgb(var(--color-surface-secondary))}.layout-grid.svelte-wzmt5k {display:grid;grid-template-columns:repeat(1, minmax(0, 1fr))}

    @media (min-width: 768px) {.layout-grid.svelte-wzmt5k {grid-template-columns:repeat(2, minmax(0, 1fr))}
}

    @media (min-width: 1024px) {.layout-grid.svelte-wzmt5k {grid-template-columns:repeat(3, minmax(0, 1fr))}
}.layout-header.svelte-wzmt5k {border-bottom-width:1px;border-color:rgb(var(--color-border));background-color:rgb(var(--color-surface));padding:1rem}.layout-footer.svelte-wzmt5k {margin-top:auto;border-top-width:1px;border-color:rgb(var(--color-border));background-color:rgb(var(--color-surface-secondary));padding:1rem}`
};
function We(n, e) {
  R(e, !1), oe(n, Le);
  const t = K();
  let i = y(e, "variant", 8, "main"), a = y(e, "gap", 8, "md"), o = y(e, "className", 8, "");
  Q(() => U(a()), () => {
    J(t, `gap-${a()}`);
  }), re();
  var v = Ce(), u = r(v);
  {
    var l = (h) => {
      var b = ke(), s = I(b), d = r(s);
      E(d, e, "header", {});
      var _ = k(s, 2), g = r(_);
      E(g, e, "main", {});
      var c = k(_, 2), x = r(c);
      E(x, e, "footer", {}), m(h, b);
    }, f = (h) => {
      var b = X(), s = I(b);
      {
        var d = (g) => {
          var c = qe(), x = I(c), p = r(x);
          E(p, e, "sidebar", {});
          var q = k(x, 2), L = r(q);
          E(L, e, "main", {}), m(g, c);
        }, _ = (g) => {
          var c = X(), x = I(c);
          {
            var p = (q) => {
              var L = ze(), M = r(L);
              E(M, e, "default", {}), m(q, L);
            };
            N(
              x,
              (q) => {
                i() === "grid" && q(p);
              },
              !0
            );
          }
          m(g, c);
        };
        N(
          s,
          (g) => {
            i() === "sidebar" ? g(d) : g(_, !1);
          },
          !0
        );
      }
      m(h, b);
    };
    N(u, (h) => {
      i() === "main" ? h(l) : h(f, !1);
    });
  }
  T(() => H(v, 1, `layout layout-${i() ?? ""} ${w(t) ?? ""} ${o() ?? ""}`, "svelte-wzmt5k")), m(n, v), A();
}
var Me = z('<div class="flex justify-end gap-3 p-6 border-t border-gray-200"><!></div>'), Se = z('<div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" role="dialog" aria-modal="true" tabindex="-1"><div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"><div class="flex items-center justify-between p-6 border-b border-gray-200"><h2 class="text-xl font-semibold text-gray-900"> </h2> <button type="button" class="text-gray-400 hover:text-gray-600 text-2xl" aria-label="Close">×</button></div> <div class="p-6"><!></div> <!></div></div>');
function Qe(n, e) {
  const t = me(e);
  R(e, !1);
  let i = y(e, "isOpen", 12, !1), a = y(e, "title", 8, "");
  const o = Y();
  function v() {
    i(!1), o("close");
  }
  function u(s) {
    s.target === s.currentTarget && v();
  }
  function l(s) {
    s.key === "Escape" && v();
  }
  P();
  var f = X(), h = I(f);
  {
    var b = (s) => {
      var d = Se(), _ = r(d), g = r(_), c = r(g), x = r(c), p = k(c, 2), q = k(g, 2), L = r(q);
      E(L, e, "default", {});
      var M = k(q, 2);
      {
        var O = (D) => {
          var C = Me(), S = r(C);
          E(S, e, "footer", {}), m(D, C);
        };
        N(M, (D) => {
          B(() => t.footer) && D(O);
        });
      }
      T(() => G(x, a())), j("click", p, v), j("click", d, u), j("keydown", d, l), m(s, d);
    };
    N(h, (s) => {
      i() && s(b);
    });
  }
  m(n, f), A();
}
var Ee = z('<div class="flex items-center justify-between p-4 border-b border-gray-200"><h3 class="text-lg font-semibold text-gray-900"> </h3> <button type="button" class="text-gray-400 hover:text-gray-600 text-2xl" aria-label="Close">×</button></div>'), Te = z('<div class="fixed inset-0 bg-black/50 z-50" role="dialog" aria-modal="true" tabindex="-1"></div> <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-t-xl shadow-xl z-50 max-h-[80vh] overflow-y-auto" role="dialog" aria-modal="true"><!> <div class="p-4"><!></div></div>', 1);
function Xe(n, e) {
  R(e, !1);
  let t = y(e, "isOpen", 12, !1), i = y(e, "title", 8, "");
  const a = Y();
  function o() {
    t(!1), a("close");
  }
  function v(b) {
    b.target === b.currentTarget && o();
  }
  function u(b) {
    b.key === "Escape" && o();
  }
  P();
  var l = X(), f = I(l);
  {
    var h = (b) => {
      var s = Te(), d = I(s), _ = k(d, 2), g = r(_);
      {
        var c = (q) => {
          var L = Ee(), M = r(L), O = r(M), D = k(M, 2);
          T(() => G(O, i())), j("click", D, o), m(q, L);
        };
        N(g, (q) => {
          i() && q(c);
        });
      }
      var x = k(g, 2), p = r(x);
      E(p, e, "default", {}), j("click", d, v), j("keydown", d, u), m(b, s);
    };
    N(f, (b) => {
      t() && b(h);
    });
  }
  m(n, l), A();
}
var je = z('<div class="dropdown-content group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible svelte-1o1q13x"><!></div>'), Ne = z('<div class="dropdown-container group relative inline-block svelte-1o1q13x"><!> <!></div>');
const De = {
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
function Ze(n, e) {
  oe(n, De);
  let t = y(e, "isOpen", 8, !1), i = y(e, "placement", 8, "bottom-start");
  var a = Ne(), o = r(a);
  E(o, e, "trigger", {});
  var v = k(o, 2);
  {
    var u = (l) => {
      var f = je(), h = r(f);
      E(h, e, "default", {}), m(l, f);
    };
    N(v, (l) => {
      t() && l(u);
    });
  }
  T(() => F(a, "data-placement", i())), m(n, a);
}
var Oe = z('<button type="button" role="tab"> </button>'), Be = z('<div class="tabs-container"><div class="flex border-b border-gray-200" role="tablist" tabindex="0"></div> <div class="mt-4"><!></div></div>');
function $e(n, e) {
  R(e, !1);
  let t = y(e, "tabs", 24, () => []), i = y(e, "activeTab", 12, ""), a = y(e, "variant", 8, "default");
  const o = Y();
  function v(s) {
    i(s), o("change", { activeTab: s });
  }
  function u(s) {
    if (s.key === "ArrowLeft" || s.key === "ArrowRight") {
      const d = t().findIndex((c) => c.id === i()), _ = s.key === "ArrowLeft" ? -1 : 1, g = (d + _ + t().length) % t().length;
      v(t()[g].id);
    }
  }
  P();
  var l = Be(), f = r(l);
  be(f, 5, t, ge, (s, d) => {
    var _ = Oe(), g = r(_);
    T(() => {
      H(_, 1, `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${U(i()), w(d), U(a()), B(() => i() === w(d).id ? a() === "pills" ? "bg-blue-100 text-blue-700 border-blue-500" : "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300") ?? ""}`), _.disabled = (w(d), B(() => w(d).disabled)), F(_, "aria-selected", (U(i()), w(d), B(() => i() === w(d).id))), G(g, (w(d), B(() => w(d).label)));
    }), j("click", _, () => v(w(d).id)), m(s, _);
  });
  var h = k(f, 2), b = r(h);
  E(
    b,
    e,
    "default",
    {
      get activeTab() {
        return i();
      }
    }
  ), j("keydown", f, u), m(n, l), A();
}
var Ie = z('<button class="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full text-text-secondary hover:text-primary transition-colors duration-200 motion-reduce:transition-none group focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2" aria-label="Dismiss alert" type="button"><svg class="w-4 h-4 text-current group-hover:scale-110 transition-transform duration-200 motion-reduce:transition-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>'), Fe = z('<h4 class="font-semibold text-sm mb-1" style="color: inherit;"> </h4>'), Ae = z('<p class="text-sm leading-relaxed" style="color: inherit;"> </p>'), Re = z('<div aria-atomic="true"><!> <div><div class="flex-shrink-0 mt-0.5"><!></div> <div class="flex-1 min-w-0"><!> <!> <!></div></div></div>');
function et(n, e) {
  R(e, !1);
  const t = K(), i = K(), a = K();
  let o = y(e, "variant", 8, "info"), v = y(e, "title", 8, ""), u = y(e, "message", 8, ""), l = y(e, "closable", 8, !1), f = y(e, "className", 8, "");
  const h = Y();
  function b(C) {
    h("close", { event: C });
  }
  Q(() => {
  }, () => {
    J(t, {
      info: "bg-info-surface text-info-text border border-info",
      success: "bg-success-surface text-success-text border border-success",
      warning: "bg-warning-surface text-warning-text border border-warning",
      error: "bg-error-surface text-error-text border border-error"
    });
  }), Q(() => U(o()), () => {
    J(i, o() === "success" || o() === "info" ? "status" : "alert");
  }), Q(() => {
  }, () => {
    J(a, {
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
  }), re(), P();
  var s = Re(), d = r(s);
  {
    var _ = (C) => {
      var S = Ie();
      j("click", S, se(b)), m(C, S);
    };
    N(d, (C) => {
      l() && C(_);
    });
  }
  var g = k(d, 2), c = r(g), x = r(c);
  pe(x, () => (w(a), U(o()), B(() => w(a)[o()])));
  var p = k(c, 2), q = r(p);
  {
    var L = (C) => {
      var S = Fe(), Z = r(S);
      T(() => G(Z, v())), m(C, S);
    };
    N(q, (C) => {
      v() && C(L);
    });
  }
  var M = k(q, 2);
  {
    var O = (C) => {
      var S = Ae(), Z = r(S);
      T(() => G(Z, u())), m(C, S);
    };
    N(M, (C) => {
      u() && C(O);
    });
  }
  var D = k(M, 2);
  E(D, e, "default", {}), T(() => {
    H(s, 1, `relative rounded-md p-4 border ${w(t), U(o()), B(() => w(t)[o()]) ?? ""} transition-all duration-200 motion-reduce:transition-none ${f() ?? ""}`), F(s, "role", w(i)), F(s, "aria-live", o() === "success" || o() === "info" ? "polite" : "assertive"), H(g, 1, `flex items-start gap-3 ${l() ? "pr-8" : ""}`);
  }), m(n, s), A();
}
var Ue = z('<div class="relative group"><img alt="" class="w-full h-32 object-cover rounded-lg border border-gray-300"/> <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"><div class="flex gap-2"><!> <!></div></div></div>'), Pe = z('<div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer" role="button" tabindex="0"><div class="space-y-3"><div class="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center"><span class="text-2xl">📷</span></div> <div><p class="font-medium text-gray-900"> </p> <p class="text-sm text-gray-500">Click to choose a file</p></div></div></div>'), Ye = z('<div class="space-y-3"><!> <input type="file" class="hidden"/></div>');
function tt(n, e) {
  R(e, !1);
  let t = y(e, "value", 12, null), i = y(e, "disabled", 8, !1), a = y(e, "accept", 8, "image/*"), o = y(e, "placeholder", 8, "No image selected");
  const v = Y();
  let u = K();
  function l(c) {
    const x = c.target;
    if (!x.files || x.files.length === 0) return;
    const p = x.files[0], q = URL.createObjectURL(p);
    t(q), v("change", { value: q });
  }
  function f() {
    t() && URL.revokeObjectURL(t()), t(null), v("change", { value: null });
  }
  function h() {
    var c;
    (c = w(u)) == null || c.click();
  }
  P();
  var b = Ye(), s = r(b);
  {
    var d = (c) => {
      var x = Ue(), p = r(x), q = k(p, 2), L = r(q), M = r(L);
      ee(M, {
        variant: "secondary",
        size: "sm",
        get disabled() {
          return i();
        },
        $$events: { click: h },
        children: (D, C) => {
          var S = $("Change");
          m(D, S);
        },
        $$slots: { default: !0 }
      });
      var O = k(M, 2);
      ee(O, {
        variant: "danger",
        size: "sm",
        get disabled() {
          return i();
        },
        $$events: { click: f },
        children: (D, C) => {
          var S = $("Remove");
          m(D, S);
        },
        $$slots: { default: !0 }
      }), T(() => F(p, "src", t())), m(c, x);
    }, _ = (c) => {
      var x = Pe(), p = r(x), q = k(r(p), 2), L = r(q), M = r(L);
      T(() => G(M, o())), j("click", x, h), j("keydown", x, (O) => O.key === "Enter" && h()), m(c, x);
    };
    N(s, (c) => {
      t() ? c(d) : c(_, !1);
    });
  }
  var g = k(s, 2);
  we(g, (c) => J(u, c), () => w(u)), T(() => F(g, "accept", a())), j("change", g, l), m(n, b), A();
}
var Ke = z('<div class="space-y-4"><!> <!> <!> <!></div> <div class="pt-4"><!></div>', 1), He = z(`<div><div class="mb-6"><h2 class="text-2xl font-bold text-text mb-2">Get in Touch</h2> <p class="text-text-secondary">We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.</p></div> <!></div>`);
function at(n, e) {
  R(e, !1);
  let t = y(e, "className", 8, "");
  const i = Y();
  let a = K({ name: "", email: "", message: "", subscribe: !1 });
  function o(l) {
    const f = {
      name: l.detail.data.name || "",
      email: l.detail.data.email || "",
      message: l.detail.data.message || "",
      subscribe: l.detail.data.subscribe || !1
    };
    i("submit", { data: f });
  }
  P();
  var v = He(), u = k(r(v), 2);
  _e(u, {
    className: "space-y-4",
    $$events: { submit: o },
    children: (l, f) => {
      var h = Ke(), b = I(h), s = r(b);
      te(s, {
        type: "text",
        label: "Name",
        placeholder: "Enter your name",
        get value() {
          return w(a).name;
        },
        set value(p) {
          W(a, w(a).name = p);
        },
        $$legacy: !0
      });
      var d = k(s, 2);
      te(d, {
        type: "email",
        label: "Email",
        placeholder: "Enter your email",
        get value() {
          return w(a).email;
        },
        set value(p) {
          W(a, w(a).email = p);
        },
        $$legacy: !0
      });
      var _ = k(d, 2);
      he(_, {
        label: "Message",
        placeholder: "Enter your message",
        rows: 4,
        get value() {
          return w(a).message;
        },
        set value(p) {
          W(a, w(a).message = p);
        },
        $$legacy: !0
      });
      var g = k(_, 2);
      xe(g, {
        label: "Subscribe to updates",
        get checked() {
          return w(a).subscribe;
        },
        set checked(p) {
          W(a, w(a).subscribe = p);
        },
        $$legacy: !0
      });
      var c = k(b, 2), x = r(c);
      ee(x, {
        type: "submit",
        variant: "primary",
        size: "md",
        children: (p, q) => {
          var L = $("Send Message");
          m(p, L);
        },
        $$slots: { default: !0 }
      }), m(l, h);
    },
    $$slots: { default: !0 }
  }), T(() => H(v, 1, `max-w-md mx-auto ${t() ?? ""}`)), m(n, v), A();
}
export {
  et as A,
  at as C,
  Ze as D,
  _e as F,
  tt as I,
  We as L,
  Qe as M,
  Xe as S,
  $e as T
};
