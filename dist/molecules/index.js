import { t as S, F as ie, G as le, H as de, I as ce, J, y as ve, K as ue, w as T, L as fe, S as me, l as A, p as w, i as te, f as k, a as Q, s as L, e as N, c as b, d as H, g as G, h as a, z as Y, A as ae, b as j, x as R, k as m, m as I, o as P, D, j as _, C as W, M as be, n as U, v as K, q as ge, r as he, u as re, N as Z, O as V } from "../props-B4BdFk2B.js";
import { e as ne, B as ee, I as oe, T as xe } from "../Textarea-DP1BihDh.js";
function pe(n, e, s = !1, t = !1, c = !1) {
  var r = n, h = "";
  S(() => {
    var o = (
      /** @type {Effect} */
      ie
    );
    if (h !== (h = e() ?? "") && (o.nodes_start !== null && (le(
      o.nodes_start,
      /** @type {TemplateNode} */
      o.nodes_end
    ), o.nodes_start = o.nodes_end = null), h !== "")) {
      var i = h + "";
      s ? i = `<svg>${i}</svg>` : t && (i = `<math>${i}</math>`);
      var u = de(i);
      if ((s || t) && (u = /** @type {Element} */
      J(u)), ce(
        /** @type {TemplateNode} */
        J(u),
        /** @type {TemplateNode} */
        u.lastChild
      ), s || t)
        for (; J(u); )
          r.before(
            /** @type {Node} */
            J(u)
          );
      else
        r.before(u);
    }
  });
}
function se(n, e) {
  return n === e || (n == null ? void 0 : n[me]) === e;
}
function we(n = {}, e, s, t) {
  return ve(() => {
    var c, r;
    return ue(() => {
      c = r, r = [], T(() => {
        n !== s(...r) && (e(n, ...r), c && se(s(...c), n) && e(null, ...c));
      });
    }), () => {
      fe(() => {
        r && se(s(...r), n) && e(null, ...r);
      });
    };
  }), n;
}
function ye(n) {
  return function(...e) {
    var s = (
      /** @type {Event} */
      e[0]
    );
    return s.preventDefault(), n == null ? void 0 : n.apply(this, e);
  };
}
var _e = k("<form><!></form>");
function ke(n, e) {
  const s = A(e, ["children", "$$slots", "$$events", "$$legacy"]), t = A(s, ["method", "action", "className"]);
  G(e, !1);
  let c = w(e, "method", 8, "post"), r = w(e, "action", 8, ""), h = w(e, "className", 8, "");
  function o(g) {
    const d = new FormData(g.target);
    Object.fromEntries(d.entries());
  }
  te();
  var i = _e();
  Q(i, () => ({
    method: c(),
    action: r(),
    class: `space-y-4 ${h() ?? ""}`,
    ...t
  }));
  var u = a(i);
  L(u, e, "default", {}), N("submit", i, ye(o)), b(n, i), H();
}
var ze = k('<header class="layout-header svelte-wzmt5k"><!></header> <main class="layout-main svelte-wzmt5k"><!></main> <footer class="layout-footer svelte-wzmt5k"><!></footer>', 1), qe = k('<aside class="layout-sidebar svelte-wzmt5k"><!></aside> <main class="layout-main svelte-wzmt5k"><!></main>', 1), Ce = k('<div class="layout-grid svelte-wzmt5k"><!></div>'), $e = k("<div><!></div>");
const Me = {
  hash: "svelte-wzmt5k",
  code: `.layout.svelte-wzmt5k {min-height:100vh}.layout-main.svelte-wzmt5k {display:flex;flex-direction:column}.layout-sidebar.svelte-wzmt5k {width:16rem;border-right-width:1px;border-color:rgb(var(--color-border));background-color:rgb(var(--color-surface-secondary))}.layout-grid.svelte-wzmt5k {display:grid;grid-template-columns:repeat(1, minmax(0, 1fr))}

    @media (min-width: 768px) {.layout-grid.svelte-wzmt5k {grid-template-columns:repeat(2, minmax(0, 1fr))}
}

    @media (min-width: 1024px) {.layout-grid.svelte-wzmt5k {grid-template-columns:repeat(3, minmax(0, 1fr))}
}.layout-header.svelte-wzmt5k {border-bottom-width:1px;border-color:rgb(var(--color-border));background-color:rgb(var(--color-surface));padding:1rem}.layout-footer.svelte-wzmt5k {margin-top:auto;border-top-width:1px;border-color:rgb(var(--color-border));background-color:rgb(var(--color-surface-secondary));padding:1rem}`
};
function Xe(n, e) {
  const s = A(e, ["children", "$$slots", "$$events", "$$legacy"]), t = A(s, ["variant", "gap", "className"]);
  G(e, !1), ne(n, Me);
  const c = I();
  let r = w(e, "variant", 8, "main"), h = w(e, "gap", 8, "md"), o = w(e, "className", 8, "");
  Y(() => R(h()), () => {
    P(c, `gap-${h()}`);
  }), ae();
  var i = $e();
  Q(
    i,
    () => ({
      class: `layout layout-${r() ?? ""} ${m(c) ?? ""} ${o() ?? ""}`,
      ...t
    }),
    void 0,
    void 0,
    "svelte-wzmt5k"
  );
  var u = a(i);
  {
    var g = (l) => {
      var x = ze(), p = D(x), v = a(p);
      L(v, e, "header", {});
      var y = _(p, 2), f = a(y);
      L(f, e, "main", {});
      var z = _(y, 2), q = a(z);
      L(q, e, "footer", {}), b(l, x);
    }, d = (l) => {
      var x = W(), p = D(x);
      {
        var v = (f) => {
          var z = qe(), q = D(z), $ = a(q);
          L($, e, "sidebar", {});
          var M = _(q, 2), C = a(M);
          L(C, e, "main", {}), b(f, z);
        }, y = (f) => {
          var z = W(), q = D(z);
          {
            var $ = (M) => {
              var C = Ce(), O = a(C);
              L(O, e, "default", {}), b(M, C);
            };
            j(
              q,
              (M) => {
                r() === "grid" && M($);
              },
              !0
            );
          }
          b(f, z);
        };
        j(
          p,
          (f) => {
            r() === "sidebar" ? f(v) : f(y, !1);
          },
          !0
        );
      }
      b(l, x);
    };
    j(u, (l) => {
      r() === "main" ? l(g) : l(d, !1);
    });
  }
  b(n, i), H();
}
var Le = k('<div class="flex justify-end gap-3 p-6 border-t border-gray-200"><!></div>'), Ne = k('<div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" role="dialog" aria-modal="true" tabindex="-1"><div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"><div class="flex items-center justify-between p-6 border-b border-gray-200"><h2 class="text-xl font-semibold text-gray-900"> </h2> <button type="button" class="text-gray-400 hover:text-gray-600 text-2xl" aria-label="Close">×</button></div> <div class="p-6"><!></div> <!></div></div>');
function Ze(n, e) {
  const s = be(e);
  let t = w(e, "isOpen", 12, !1), c = w(e, "title", 8, "");
  function r() {
    t(!1);
  }
  function h(d) {
    d.target === d.currentTarget && r();
  }
  function o(d) {
    d.key === "Escape" && r();
  }
  var i = W(), u = D(i);
  {
    var g = (d) => {
      var l = Ne(), x = a(l), p = a(x), v = a(p), y = a(v), f = _(v, 2), z = _(p, 2), q = a(z);
      L(q, e, "default", {});
      var $ = _(z, 2);
      {
        var M = (C) => {
          var O = Le(), F = a(O);
          L(F, e, "footer", {}), b(C, O);
        };
        j($, (C) => {
          T(() => s.footer) && C(M);
        });
      }
      S(() => U(y, c())), N("click", f, r), N("click", l, h), N("keydown", l, o), b(d, l);
    };
    j(u, (d) => {
      t() && d(g);
    });
  }
  b(n, i);
}
var Se = k('<div class="flex items-center justify-between p-4 border-b border-gray-200"><h3 class="text-lg font-semibold text-gray-900"> </h3> <button type="button" class="text-gray-400 hover:text-gray-600 text-2xl" aria-label="Close">×</button></div>'), je = k('<div class="fixed inset-0 bg-black/50 z-50" role="dialog" aria-modal="true" tabindex="-1"></div> <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 rounded-t-xl shadow-xl z-50 max-h-[80vh] overflow-y-auto" role="dialog" aria-modal="true"><!> <div class="p-4"><!></div></div>', 1);
function et(n, e) {
  let s = w(e, "isOpen", 12, !1), t = w(e, "title", 8, "");
  function c() {
    s(!1);
  }
  function r(g) {
    g.target === g.currentTarget && c();
  }
  function h(g) {
    g.key === "Escape" && c();
  }
  var o = W(), i = D(o);
  {
    var u = (g) => {
      var d = je(), l = D(d), x = _(l, 2), p = a(x);
      {
        var v = (z) => {
          var q = Se(), $ = a(q), M = a($), C = _($, 2);
          S(() => U(M, t())), N("click", C, c), b(z, q);
        };
        j(p, (z) => {
          t() && z(v);
        });
      }
      var y = _(p, 2), f = a(y);
      L(f, e, "default", {}), N("click", l, r), N("keydown", l, h), b(g, d);
    };
    j(i, (g) => {
      s() && g(u);
    });
  }
  b(n, o);
}
var Ee = k('<div class="dropdown-content group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible svelte-1o1q13x"><!></div>'), Te = k('<div class="dropdown-container group relative inline-block svelte-1o1q13x"><!> <!></div>');
const Oe = {
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
function tt(n, e) {
  ne(n, Oe);
  let s = w(e, "isOpen", 8, !1), t = w(e, "placement", 8, "bottom-start");
  var c = Te(), r = a(c);
  L(r, e, "trigger", {});
  var h = _(r, 2);
  {
    var o = (i) => {
      var u = Ee(), g = a(u);
      L(g, e, "default", {}), b(i, u);
    };
    j(h, (i) => {
      s() && i(o);
    });
  }
  S(() => K(c, "data-placement", t())), b(n, c);
}
var Be = k('<button type="button" role="tab"> </button>'), De = k('<div class="tabs-container"><div class="flex border-b border-gray-200" role="tablist" tabindex="0"></div> <div class="mt-4"><!></div></div>');
function at(n, e) {
  G(e, !1);
  let s = w(e, "tabs", 24, () => []), t = w(e, "activeTab", 12, ""), c = w(e, "variant", 8, "default");
  function r(d) {
    t(d);
  }
  function h(d) {
    if (d.key === "ArrowLeft" || d.key === "ArrowRight") {
      const l = s().findIndex((v) => v.id === t()), x = d.key === "ArrowLeft" ? -1 : 1, p = (l + x + s().length) % s().length;
      r(s()[p].id);
    }
  }
  te();
  var o = De(), i = a(o);
  ge(i, 5, s, he, (d, l) => {
    var x = Be(), p = a(x);
    S(() => {
      re(x, 1, `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${R(t()), m(l), R(c()), T(() => t() === m(l).id ? c() === "pills" ? "bg-blue-100 text-blue-700 border-blue-500" : "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300") ?? ""}`), x.disabled = (m(l), T(() => m(l).disabled)), K(x, "aria-selected", (R(t()), m(l), T(() => t() === m(l).id))), U(p, (m(l), T(() => m(l).label)));
    }), N("click", x, () => r(m(l).id)), b(d, x);
  });
  var u = _(i, 2), g = a(u);
  L(
    g,
    e,
    "default",
    {
      get activeTab() {
        return t();
      }
    }
  ), N("keydown", i, h), b(n, o), H();
}
var Ie = k('<button class="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full text-text-secondary hover:text-primary transition-colors duration-200 motion-reduce:transition-none group focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2" aria-label="Dismiss alert" type="button"><svg class="w-4 h-4 text-current group-hover:scale-110 transition-transform duration-200 motion-reduce:transition-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>'), Pe = k('<h4 class="font-semibold text-sm mb-1" style="color: inherit;"> </h4>'), Ae = k('<p class="text-sm leading-relaxed" style="color: inherit;"> </p>'), Fe = k('<div><!> <div><div class="flex-shrink-0 mt-0.5"><!></div> <div class="flex-1 min-w-0"><!> <!> <!></div></div></div>');
function rt(n, e) {
  const s = A(e, ["children", "$$slots", "$$events", "$$legacy"]), t = A(s, ["variant", "title", "message", "closable", "className"]);
  G(e, !1);
  const c = I(), r = I(), h = I();
  let o = w(e, "variant", 8, "info"), i = w(e, "title", 8, ""), u = w(e, "message", 8, ""), g = w(e, "closable", 8, !1), d = w(e, "className", 8, "");
  function l(E) {
  }
  Y(() => {
  }, () => {
    P(c, {
      info: "bg-info-surface text-info-text border border-info",
      success: "bg-success-surface text-success-text border border-success",
      warning: "bg-warning-surface text-warning-text border border-warning",
      error: "bg-error-surface text-error-text border border-error"
    });
  }), Y(() => R(o()), () => {
    P(r, o() === "success" || o() === "info" ? "status" : "alert");
  }), Y(() => {
  }, () => {
    P(h, {
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
  }), ae();
  var x = Fe();
  Q(x, () => ({
    class: `relative rounded-md p-4 border ${m(c), R(o()), T(() => m(c)[o()]) ?? ""} transition-all duration-200 motion-reduce:transition-none ${d() ?? ""}`,
    role: m(r),
    "aria-live": o() === "success" || o() === "info" ? "polite" : "assertive",
    "aria-atomic": "true",
    ...t
  }));
  var p = a(x);
  {
    var v = (E) => {
      var B = Ie();
      N("click", B, l), b(E, B);
    };
    j(p, (E) => {
      g() && E(v);
    });
  }
  var y = _(p, 2), f = a(y), z = a(f);
  pe(z, () => (m(h), R(o()), T(() => m(h)[o()])));
  var q = _(f, 2), $ = a(q);
  {
    var M = (E) => {
      var B = Pe(), X = a(B);
      S(() => U(X, i())), b(E, B);
    };
    j($, (E) => {
      i() && E(M);
    });
  }
  var C = _($, 2);
  {
    var O = (E) => {
      var B = Ae(), X = a(B);
      S(() => U(X, u())), b(E, B);
    };
    j(C, (E) => {
      u() && E(O);
    });
  }
  var F = _(C, 2);
  L(F, e, "default", {}), S(() => re(y, 1, `flex items-start gap-3 ${g() ? "pr-8" : ""}`)), b(n, x), H();
}
var Re = k('<div class="relative group"><img alt="" class="w-full h-32 object-cover rounded-lg border border-gray-300"/> <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"><div class="flex gap-2"><!> <!></div></div></div>'), Ue = k('<div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer" role="button" tabindex="0"><div class="space-y-3"><div class="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center"><span class="text-2xl">📷</span></div> <div><p class="font-medium text-gray-900"> </p> <p class="text-sm text-gray-500">Click to choose a file</p></div></div></div>'), Ye = k('<div class="space-y-3"><!> <input type="file" class="hidden"/></div>');
function ot(n, e) {
  let s = w(e, "value", 12, null), t = w(e, "disabled", 8, !1), c = w(e, "accept", 8, "image/*"), r = w(e, "placeholder", 8, "No image selected"), h = I();
  function o(v) {
    const y = v.target;
    if (!y.files || y.files.length === 0) return;
    const f = y.files[0], z = URL.createObjectURL(f);
    s(z);
  }
  function i() {
    s() && URL.revokeObjectURL(s()), s(null);
  }
  function u() {
    var v;
    (v = m(h)) == null || v.click();
  }
  var g = Ye(), d = a(g);
  {
    var l = (v) => {
      var y = Re(), f = a(y), z = _(f, 2), q = a(z), $ = a(q);
      ee($, {
        variant: "secondary",
        size: "sm",
        get disabled() {
          return t();
        },
        $$events: { click: u },
        children: (C, O) => {
          var F = Z("Change");
          b(C, F);
        },
        $$slots: { default: !0 }
      });
      var M = _($, 2);
      ee(M, {
        variant: "danger",
        size: "sm",
        get disabled() {
          return t();
        },
        $$events: { click: i },
        children: (C, O) => {
          var F = Z("Remove");
          b(C, F);
        },
        $$slots: { default: !0 }
      }), S(() => K(f, "src", s())), b(v, y);
    }, x = (v) => {
      var y = Ue(), f = a(y), z = _(a(f), 2), q = a(z), $ = a(q);
      S(() => U($, r())), N("click", y, u), N("keydown", y, (M) => M.key === "Enter" && u()), b(v, y);
    };
    j(d, (v) => {
      s() ? v(l) : v(x, !1);
    });
  }
  var p = _(d, 2);
  we(p, (v) => P(h, v), () => m(h)), S(() => K(p, "accept", c())), N("change", p, o), b(n, g);
}
var Ke = k('<label class="text-sm font-medium cursor-pointer"> </label>'), He = k('<div class="flex items-center gap-2"><input/> <!></div>');
function Ge(n, e) {
  const s = A(e, ["children", "$$slots", "$$events", "$$legacy"]), t = A(s, ["checked", "disabled", "label"]);
  G(e, !1);
  const c = I();
  let r = w(e, "checked", 12, !1), h = w(e, "disabled", 8, !1), o = w(e, "label", 8, ""), i = I();
  typeof window < "u" ? P(i, `checkbox-${Math.random().toString(36).substr(2, 9)}`) : P(i, `checkbox-ssr-${Date.now()}`);
  function u(p) {
    const v = p.target;
    r(v.checked);
  }
  Y(() => {
  }, () => {
    P(c, [
      "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded",
      "focus:ring-blue-500 focus:ring-2",
      "disabled:opacity-50 disabled:cursor-not-allowed"
    ].join(" "));
  }), ae(), te();
  var g = He(), d = a(g);
  Q(
    d,
    () => ({
      type: "checkbox",
      id: m(i),
      checked: r(),
      disabled: h(),
      class: m(c),
      ...t
    }),
    void 0,
    void 0,
    void 0,
    !0
  );
  var l = _(d, 2);
  {
    var x = (p) => {
      var v = Ke(), y = a(v);
      S(() => {
        K(v, "for", m(i)), U(y, o());
      }), b(p, v);
    };
    j(l, (p) => {
      o() && p(x);
    });
  }
  N("change", d, u), b(n, g), H();
}
var Je = k('<div class="space-y-4"><!> <!> <!> <!></div> <div class="pt-4"><!></div>', 1), Ve = k(`<div><div class="mb-6"><h2 class="text-2xl font-bold text-text mb-2">Get in Touch</h2> <p class="text-text-secondary">We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.</p></div> <!></div>`);
function st(n, e) {
  let s = w(e, "className", 8, ""), t = I({ name: "", email: "", message: "", subscribe: !1 });
  function c(o) {
    o.detail.data.name, o.detail.data.email, o.detail.data.message, o.detail.data.subscribe;
  }
  var r = Ve(), h = _(a(r), 2);
  ke(h, {
    className: "space-y-4",
    $$events: { submit: c },
    children: (o, i) => {
      var u = Je(), g = D(u), d = a(g);
      oe(d, {
        type: "text",
        label: "Name",
        placeholder: "Enter your name",
        get value() {
          return m(t), T(() => m(t).name);
        },
        $$events: {
          input: (f) => V(t, m(t).name = f.target.value)
        }
      });
      var l = _(d, 2);
      oe(l, {
        type: "email",
        label: "Email",
        placeholder: "Enter your email",
        get value() {
          return m(t), T(() => m(t).email);
        },
        $$events: {
          input: (f) => V(t, m(t).email = f.target.value)
        }
      });
      var x = _(l, 2);
      xe(x, {
        label: "Message",
        placeholder: "Enter your message",
        rows: 4,
        get value() {
          return m(t), T(() => m(t).message);
        },
        $$events: {
          input: (f) => V(t, m(t).message = f.target.value)
        }
      });
      var p = _(x, 2);
      Ge(p, {
        label: "Subscribe to updates",
        get checked() {
          return m(t), T(() => m(t).subscribe);
        },
        $$events: {
          change: (f) => V(t, m(t).subscribe = f.target.checked)
        }
      });
      var v = _(g, 2), y = a(v);
      ee(y, {
        type: "submit",
        variant: "primary",
        size: "md",
        children: (f, z) => {
          var q = Z("Send Message");
          b(f, q);
        },
        $$slots: { default: !0 }
      }), b(o, u);
    },
    $$slots: { default: !0 }
  }), S(() => re(r, 1, `max-w-md mx-auto ${s() ?? ""}`)), b(n, r);
}
export {
  rt as Alert,
  st as ContactForm,
  tt as Dropdown,
  ke as Form,
  ot as ImageUpload,
  Xe as Layout,
  Ze as Modal,
  et as SlideUp,
  at as Tabs
};
