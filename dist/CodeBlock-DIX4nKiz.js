import { z as P, H as U, I as W, J as X, K as Y, L as A, M as Z, p as t, f as k, c as V, y as $, d as x, e as F, h as H, r as T, g as n, N as h, B as ee, k as y, s as D, l as K, i as I, j as q, A as N, F as E, O, G, C as J, P as ae, x as te, Q } from "./ssr-safe-bsWGK4V4.js";
import { onMount as R } from "svelte";
function re(r, e, a = !1, o = !1, u = !1) {
  var b = r, c = "";
  P(() => {
    var s = (
      /** @type {Effect} */
      U
    );
    if (c !== (c = e() ?? "") && (s.nodes_start !== null && (W(
      s.nodes_start,
      /** @type {TemplateNode} */
      s.nodes_end
    ), s.nodes_start = s.nodes_end = null), c !== "")) {
      var d = c + "";
      a ? d = `<svg>${d}</svg>` : o && (d = `<math>${d}</math>`);
      var l = X(d);
      if ((a || o) && (l = /** @type {Element} */
      A(l)), Y(
        /** @type {TemplateNode} */
        A(l),
        /** @type {TemplateNode} */
        l.lastChild
      ), a || o)
        for (; A(l); )
          b.before(
            /** @type {Node} */
            A(l)
          );
      else
        b.before(l);
    }
  });
}
function oe(r, e) {
  Z(() => {
    var a = r.getRootNode(), o = (
      /** @type {ShadowRoot} */
      a.host ? (
        /** @type {ShadowRoot} */
        a
      ) : (
        /** @type {Document} */
        a.head ?? /** @type {Document} */
        a.ownerDocument.head
      )
    );
    if (!o.querySelector("#" + e.hash)) {
      const u = document.createElement("style");
      u.id = e.hash, u.textContent = e.code, o.appendChild(u);
    }
  });
}
var se = k("<button><!></button>");
function we(r, e) {
  H(e, !0);
  let a = t(e, "variant", 3, "primary"), o = t(e, "size", 3, "md"), u = t(e, "disabled", 3, !1), b = t(e, "type", 3, "button"), c = t(e, "className", 3, ""), s = T(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "variant",
    "size",
    "disabled",
    "type",
    "className",
    "onclick",
    "children"
  ]), d = h(() => ({
    sm: "px-3 py-1.5 text-sm font-medium",
    md: "px-4 py-2 text-sm font-medium",
    lg: "px-6 py-3 text-base font-semibold"
  })), l = h(() => ({
    primary: "bg-gray-100 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400",
    success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:text-gray-400",
    brand: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400"
  })), p = h(() => [
    "inline-flex items-center justify-center rounded-md transition-all duration-200",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "active:scale-95 transform-gpu",
    "shadow-sm hover:shadow-md",
    n(d)[o()],
    n(l)[a()],
    c()
  ].filter(Boolean).join(" "));
  var g = se();
  V(g, () => ({
    type: b(),
    class: n(p),
    disabled: u(),
    ...s
  }));
  var w = y(g);
  $(w, () => e.children ?? ee), x(r, g), F();
}
var le = k("<label> </label>"), ne = k("<div><!> <input/></div>");
function _e(r, e) {
  H(e, !0);
  let a = t(e, "value", 7, ""), o = t(e, "type", 3, "text"), u = t(e, "name", 3, ""), b = t(e, "label", 3, ""), c = t(e, "placeholder", 3, ""), s = t(e, "disabled", 3, !1), d = t(e, "size", 3, "md"), l = t(e, "variant", 3, "default"), p = T(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "type",
    "name",
    "label",
    "placeholder",
    "disabled",
    "size",
    "variant",
    "oninput"
  ]), g = q("");
  R(() => {
    D(g, K("input"), !0);
  });
  let w = h(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), C = h(() => () => {
    const i = {
      default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
      success: "border-green-300 focus:border-green-500 focus:ring-green-500",
      warning: "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500",
      error: "border-red-300 focus:border-red-500 focus:ring-red-500"
    };
    return i[l()] || i.default;
  }), f = h(() => [
    "w-full rounded-md transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
    n(w)[d()],
    n(C)
  ].join(" ")), v = h(() => "block text-sm font-medium text-primary mb-1");
  function z(i) {
    const m = i.target;
    a(m.value), e.oninput && e.oninput(i);
  }
  var M = ne(), j = y(M);
  {
    var _ = (i) => {
      var m = le();
      E(m, 1, O(n(v)));
      var L = y(m);
      P(() => {
        G(m, "for", n(g)), J(L, b());
      }), x(i, m);
    };
    I(j, (i) => {
      b() && i(_);
    });
  }
  var B = N(j, 2);
  V(
    B,
    () => ({
      id: n(g),
      type: o(),
      name: u(),
      value: a(),
      placeholder: c(),
      disabled: s(),
      class: n(f),
      oninput: z,
      ...p
    }),
    void 0,
    void 0,
    void 0,
    !0
  ), x(r, M), F();
}
function de(r) {
  const e = {
    default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
    success: "border-green-300 focus:border-green-500 focus:ring-green-500",
    warning: "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500",
    error: "border-red-300 focus:border-red-500 focus:ring-red-500",
    info: "border-blue-300 focus:border-blue-500 focus:ring-blue-500"
  };
  return e[r] || e.default;
}
function ke(r) {
  const e = {
    default: "border-gray-200 bg-white",
    success: "border-green-200 bg-green-50",
    warning: "border-yellow-200 bg-yellow-50",
    error: "border-red-200 bg-red-50",
    info: "border-blue-200 bg-blue-50"
  };
  return e[r] || e.default;
}
function S(r, e) {
  var o;
  const a = {
    default: {
      border: "border-gray-300",
      text: "text-gray-900",
      bg: "bg-white"
    },
    success: {
      border: "border-green-300",
      text: "text-green-900",
      bg: "bg-green-50"
    },
    warning: {
      border: "border-yellow-300",
      text: "text-yellow-900",
      bg: "bg-yellow-50"
    },
    error: {
      border: "border-red-300",
      text: "text-red-900",
      bg: "bg-red-50"
    },
    info: {
      border: "border-blue-300",
      text: "text-blue-900",
      bg: "bg-blue-50"
    }
  };
  return ((o = a[r]) == null ? void 0 : o[e]) || a.default[e];
}
function Ce(r) {
  return {
    border: S(r, "border"),
    text: S(r, "text"),
    bg: S(r, "bg")
  };
}
function ze(r, e) {
  return r.reduce((a, o) => (a[o] = `${e}-${o}`, a), {});
}
var ie = k("<label> </label>"), ue = k("<div><!> <textarea></textarea></div>");
function Me(r, e) {
  H(e, !0);
  let a = t(e, "value", 7, ""), o = t(e, "name", 3, ""), u = t(e, "label", 3, ""), b = t(e, "placeholder", 3, ""), c = t(e, "disabled", 3, !1), s = t(e, "rows", 3, 4), d = t(e, "size", 3, "md"), l = t(e, "variant", 3, "default"), p = T(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "name",
    "label",
    "placeholder",
    "disabled",
    "rows",
    "size",
    "variant",
    "oninput"
  ]), g = ae(typeof window < "u" ? `textarea-${Math.random().toString(36).substr(2, 9)}` : `textarea-ssr-${Date.now()}`), w = h(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), C = h(() => de(l())), f = h(() => [
    "w-full rounded-md transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
    "resize-y",
    n(w)[d()],
    n(C)
  ].join(" ")), v = h(() => "block text-sm font-medium text-primary mb-1");
  function z(i) {
    const m = i.target;
    a(m.value), e.oninput && e.oninput(i);
  }
  var M = ue(), j = y(M);
  {
    var _ = (i) => {
      var m = ie();
      E(m, 1, O(n(v)));
      var L = y(m);
      P(() => {
        G(m, "for", g), J(L, u());
      }), x(i, m);
    };
    I(j, (i) => {
      u() && i(_);
    });
  }
  var B = N(j, 2);
  V(B, () => ({
    id: g,
    name: o(),
    value: a(),
    placeholder: b(),
    disabled: c(),
    rows: s(),
    class: n(f),
    oninput: z,
    ...p
  })), x(r, M), F();
}
var ce = k('<label class="text-sm font-medium cursor-pointer"> </label>'), ge = k('<div class="flex items-center gap-2"><input/> <!></div>');
function je(r, e) {
  H(e, !0);
  let a = t(e, "checked", 7, !1), o = t(e, "name", 3, ""), u = t(e, "disabled", 3, !1), b = t(e, "label", 3, ""), c = T(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "checked",
    "name",
    "disabled",
    "label"
  ]), s = q("");
  R(() => {
    D(s, K("checkbox"), !0);
  });
  let d = h(() => [
    "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded",
    "focus:ring-blue-500 focus:ring-2",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  ].join(" "));
  function l(f) {
    const v = f.target;
    a(v.checked);
  }
  var p = ge(), g = y(p);
  V(
    g,
    () => ({
      type: "checkbox",
      id: n(s),
      name: o(),
      checked: a(),
      disabled: u(),
      class: n(d),
      onchange: l,
      ...c
    }),
    void 0,
    void 0,
    void 0,
    !0
  );
  var w = N(g, 2);
  {
    var C = (f) => {
      var v = ce(), z = y(v);
      P(() => {
        G(v, "for", n(s)), J(z, b());
      }), x(f, v);
    };
    I(w, (f) => {
      b() && f(C);
    });
  }
  x(r, p), F();
}
async function be(r, e, a) {
  try {
    await navigator.clipboard.writeText(e.code), D(a, !0), setTimeout(
      () => {
        D(a, !1);
      },
      2e3
    );
  } catch (o) {
    console.error("Failed to copy code:", o);
  }
}
var fe = Q('<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg> Copied!', 1), ve = Q('<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> Copy', 1), me = k('<button class="flex items-center gap-2 px-3 py-1 text-xs text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200" aria-label="Copy code to clipboard"><!></button>'), ye = k('<div><div class="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700"><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-red-500"></div> <div class="w-3 h-3 rounded-full bg-yellow-500"></div> <div class="w-3 h-3 rounded-full bg-green-500"></div></div> <!></div> <pre class="p-4 overflow-x-auto text-sm text-gray-100 leading-relaxed"><code><!></code></pre></div>');
const he = {
  hash: "svelte-1dmazsz",
  code: `.code-block.svelte-1dmazsz {font-family:"Monaco", "Menlo", "Ubuntu Mono", monospace;}

    /* Basic syntax highlighting for common languages */.language-svelte .token.tag,
    .language-html .token.tag {color:#f92672;}.language-svelte .token.attr-name,
    .language-html .token.attr-name {color:#a6e22e;}.language-svelte .token.attr-value,
    .language-html .token.attr-value {color:#e6db74;}.language-javascript .token.keyword,
    .language-typescript .token.keyword {color:#66d9ef;}.language-javascript .token.string,
    .language-typescript .token.string {color:#e6db74;}.language-javascript .token.function,
    .language-typescript .token.function {color:#a6e22e;}`
};
function Be(r, e) {
  oe(r, he);
  let a = t(e, "language", 3, "svelte"), o = t(e, "className", 3, ""), u = t(e, "showCopyButton", 3, !0), b = T(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "code",
    "language",
    "className",
    "showCopyButton"
  ]), c = q(!1);
  var s = ye();
  V(
    s,
    () => ({
      class: `code-block relative bg-gray-900 rounded-lg overflow-hidden ${o() ?? ""}`,
      ...b
    }),
    void 0,
    void 0,
    "svelte-1dmazsz"
  );
  var d = y(s), l = N(y(d), 2);
  {
    var p = (f) => {
      var v = me();
      v.__click = [be, e, c];
      var z = y(v);
      {
        var M = (_) => {
          var B = fe();
          x(_, B);
        }, j = (_) => {
          var B = ve();
          x(_, B);
        };
        I(z, (_) => {
          n(c) ? _(M) : _(j, !1);
        });
      }
      x(f, v);
    };
    I(l, (f) => {
      u() && f(p);
    });
  }
  var g = N(d, 2), w = y(g), C = y(w);
  re(C, () => e.code), P(() => E(w, 1, `language-${a() ?? ""}`, "svelte-1dmazsz")), x(r, s);
}
te(["click"]);
export {
  we as B,
  je as C,
  _e as I,
  Me as T,
  Be as a,
  ke as b,
  S as c,
  Ce as d,
  ze as e,
  oe as f,
  de as g,
  re as h
};
