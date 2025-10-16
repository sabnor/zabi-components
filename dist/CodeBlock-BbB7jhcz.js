import { z as P, H as W, I as X, J as Y, K as Z, L as A, M as $, p as t, f as k, c as V, y as ee, d as x, e as F, h as H, r as T, g as n, N as y, B as ae, k as h, s as D, l as K, i as I, j as q, A as N, F as E, O, G, C as J, P as te, x as re, Q } from "./ssr-safe-bsWGK4V4.js";
import { onMount as R } from "svelte";
function oe(r, e, a = !1, o = !1, d = !1) {
  var g = r, c = "";
  P(() => {
    var s = (
      /** @type {Effect} */
      W
    );
    if (c !== (c = e() ?? "") && (s.nodes_start !== null && (X(
      s.nodes_start,
      /** @type {TemplateNode} */
      s.nodes_end
    ), s.nodes_start = s.nodes_end = null), c !== "")) {
      var i = c + "";
      a ? i = `<svg>${i}</svg>` : o && (i = `<math>${i}</math>`);
      var l = Y(i);
      if ((a || o) && (l = /** @type {Element} */
      A(l)), Z(
        /** @type {TemplateNode} */
        A(l),
        /** @type {TemplateNode} */
        l.lastChild
      ), a || o)
        for (; A(l); )
          g.before(
            /** @type {Node} */
            A(l)
          );
      else
        g.before(l);
    }
  });
}
function se(r, e) {
  $(() => {
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
      const d = document.createElement("style");
      d.id = e.hash, d.textContent = e.code, o.appendChild(d);
    }
  });
}
var le = k("<button><!></button>");
function we(r, e) {
  H(e, !0);
  let a = t(e, "variant", 3, "primary"), o = t(e, "size", 3, "md"), d = t(e, "disabled", 3, !1), g = t(e, "type", 3, "button"), c = t(e, "className", 3, ""), s = T(e, [
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
  ]), i = y(() => ({
    sm: "px-3 py-1.5 text-sm font-medium",
    md: "px-4 py-2 text-sm font-medium",
    lg: "px-6 py-3 text-base font-semibold"
  })), l = y(() => ({
    primary: "bg-gray-100 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400",
    success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:text-gray-400",
    brand: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400"
  })), p = y(() => [
    "inline-flex items-center justify-center rounded-md transition-all duration-200",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "active:scale-95 transform-gpu",
    "shadow-sm hover:shadow-md",
    n(i)[o()],
    n(l)[a()],
    c()
  ].filter(Boolean).join(" "));
  var u = le();
  V(u, () => ({
    type: g(),
    class: n(p),
    disabled: d(),
    ...s
  }));
  var w = h(u);
  ee(w, () => e.children ?? ae), x(r, u), F();
}
function U(r) {
  const e = {
    default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
    success: "border-green-300 focus:border-green-500 focus:ring-green-500",
    warning: "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500",
    error: "border-red-300 focus:border-red-500 focus:ring-red-500",
    info: "border-blue-300 focus:border-blue-500 focus:ring-blue-500"
  };
  return e[r] || e.default;
}
function _e(r) {
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
function ke(r) {
  return {
    border: S(r, "border"),
    text: S(r, "text"),
    bg: S(r, "bg")
  };
}
function Ce(r, e) {
  return r.reduce((a, o) => (a[o] = `${e}-${o}`, a), {});
}
var ne = k("<label> </label>"), ie = k("<div><!> <input/></div>");
function ze(r, e) {
  H(e, !0);
  let a = t(e, "value", 7, ""), o = t(e, "type", 3, "text"), d = t(e, "name", 3, ""), g = t(e, "label", 3, ""), c = t(e, "placeholder", 3, ""), s = t(e, "disabled", 3, !1), i = t(e, "size", 3, "md"), l = t(e, "variant", 3, "default"), p = T(e, [
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
  ]), u = q("");
  R(() => {
    D(u, K("input"), !0);
  });
  let w = y(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), C = y(() => U(l())), b = y(() => [
    "w-full rounded-md transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
    n(w)[i()],
    n(C)
  ].join(" ")), f = y(() => "block text-sm font-medium text-primary mb-1");
  function z(v) {
    const m = v.target;
    a(m.value), e.oninput && e.oninput(v);
  }
  var M = ie(), j = h(M);
  {
    var _ = (v) => {
      var m = ne();
      E(m, 1, O(n(f)));
      var L = h(m);
      P(() => {
        G(m, "for", n(u)), J(L, g());
      }), x(v, m);
    };
    I(j, (v) => {
      g() && v(_);
    });
  }
  var B = N(j, 2);
  V(
    B,
    () => ({
      id: n(u),
      type: o(),
      name: d(),
      value: a(),
      placeholder: c(),
      disabled: s(),
      class: n(b),
      oninput: z,
      ...p
    }),
    void 0,
    void 0,
    void 0,
    !0
  ), x(r, M), F();
}
var de = k("<label> </label>"), ce = k("<div><!> <textarea></textarea></div>");
function Me(r, e) {
  H(e, !0);
  let a = t(e, "value", 7, ""), o = t(e, "name", 3, ""), d = t(e, "label", 3, ""), g = t(e, "placeholder", 3, ""), c = t(e, "disabled", 3, !1), s = t(e, "rows", 3, 4), i = t(e, "size", 3, "md"), l = t(e, "variant", 3, "default"), p = T(e, [
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
  ]), u = te(typeof window < "u" ? `textarea-${Math.random().toString(36).substr(2, 9)}` : `textarea-ssr-${Date.now()}`), w = y(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), C = y(() => U(l())), b = y(() => [
    "w-full rounded-md transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
    "resize-y",
    n(w)[i()],
    n(C)
  ].join(" ")), f = y(() => "block text-sm font-medium text-primary mb-1");
  function z(v) {
    const m = v.target;
    a(m.value), e.oninput && e.oninput(v);
  }
  var M = ce(), j = h(M);
  {
    var _ = (v) => {
      var m = de();
      E(m, 1, O(n(f)));
      var L = h(m);
      P(() => {
        G(m, "for", u), J(L, d());
      }), x(v, m);
    };
    I(j, (v) => {
      d() && v(_);
    });
  }
  var B = N(j, 2);
  V(B, () => ({
    id: u,
    name: o(),
    value: a(),
    placeholder: g(),
    disabled: c(),
    rows: s(),
    class: n(b),
    oninput: z,
    ...p
  })), x(r, M), F();
}
var ue = k('<label class="text-sm font-medium cursor-pointer"> </label>'), ge = k('<div class="flex items-center gap-2"><input/> <!></div>');
function je(r, e) {
  H(e, !0);
  let a = t(e, "checked", 7, !1), o = t(e, "name", 3, ""), d = t(e, "disabled", 3, !1), g = t(e, "label", 3, ""), c = T(e, [
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
  let i = y(() => [
    "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded",
    "focus:ring-blue-500 focus:ring-2",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  ].join(" "));
  function l(b) {
    const f = b.target;
    a(f.checked);
  }
  var p = ge(), u = h(p);
  V(
    u,
    () => ({
      type: "checkbox",
      id: n(s),
      name: o(),
      checked: a(),
      disabled: d(),
      class: n(i),
      onchange: l,
      ...c
    }),
    void 0,
    void 0,
    void 0,
    !0
  );
  var w = N(u, 2);
  {
    var C = (b) => {
      var f = ue(), z = h(f);
      P(() => {
        G(f, "for", n(s)), J(z, g());
      }), x(b, f);
    };
    I(w, (b) => {
      g() && b(C);
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
var fe = Q('<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg> Copied!', 1), ve = Q('<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> Copy', 1), me = k('<button class="flex items-center gap-2 px-3 py-1 text-xs text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200" aria-label="Copy code to clipboard"><!></button>'), he = k('<div><div class="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700"><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-red-500"></div> <div class="w-3 h-3 rounded-full bg-yellow-500"></div> <div class="w-3 h-3 rounded-full bg-green-500"></div></div> <!></div> <pre class="p-4 overflow-x-auto text-sm text-gray-100 leading-relaxed"><code><!></code></pre></div>');
const ye = {
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
  se(r, ye);
  let a = t(e, "language", 3, "svelte"), o = t(e, "className", 3, ""), d = t(e, "showCopyButton", 3, !0), g = T(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "code",
    "language",
    "className",
    "showCopyButton"
  ]), c = q(!1);
  var s = he();
  V(
    s,
    () => ({
      class: `code-block relative bg-gray-900 rounded-lg overflow-hidden ${o() ?? ""}`,
      ...g
    }),
    void 0,
    void 0,
    "svelte-1dmazsz"
  );
  var i = h(s), l = N(h(i), 2);
  {
    var p = (b) => {
      var f = me();
      f.__click = [be, e, c];
      var z = h(f);
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
      x(b, f);
    };
    I(l, (b) => {
      d() && b(p);
    });
  }
  var u = N(i, 2), w = h(u), C = h(w);
  oe(C, () => e.code), P(() => E(w, 1, `language-${a() ?? ""}`, "svelte-1dmazsz")), x(r, s);
}
re(["click"]);
export {
  we as B,
  je as C,
  ze as I,
  Me as T,
  Be as a,
  _e as b,
  S as c,
  ke as d,
  Ce as e,
  se as f,
  U as g,
  oe as h
};
