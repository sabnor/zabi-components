import { t as V, j as O, k as Q, l as W, m as X, n as T, o as Y, p as t, f as k, a as D, q as Z, b as x, c as S, d as q, r as P, g as m, v as y, w as $, h, x as F, i as I, y as N, z as H, A as G, B as L, C as R, D as ee, e as ae, s as U, E as J } from "./props-BKbHJRuR.js";
function te(r, e, a = !1, o = !1, i = !1) {
  var u = r, d = "";
  V(() => {
    var s = (
      /** @type {Effect} */
      O
    );
    if (d !== (d = e() ?? "") && (s.nodes_start !== null && (Q(
      s.nodes_start,
      /** @type {TemplateNode} */
      s.nodes_end
    ), s.nodes_start = s.nodes_end = null), d !== "")) {
      var n = d + "";
      a ? n = `<svg>${n}</svg>` : o && (n = `<math>${n}</math>`);
      var l = W(n);
      if ((a || o) && (l = /** @type {Element} */
      T(l)), X(
        /** @type {TemplateNode} */
        T(l),
        /** @type {TemplateNode} */
        l.lastChild
      ), a || o)
        for (; T(l); )
          u.before(
            /** @type {Node} */
            T(l)
          );
      else
        u.before(l);
    }
  });
}
function re(r, e) {
  Y(() => {
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
      const i = document.createElement("style");
      i.id = e.hash, i.textContent = e.code, o.appendChild(i);
    }
  });
}
var oe = k("<button><!></button>");
function ye(r, e) {
  q(e, !0);
  let a = t(e, "variant", 3, "primary"), o = t(e, "size", 3, "md"), i = t(e, "disabled", 3, !1), u = t(e, "type", 3, "button"), d = t(e, "className", 3, ""), s = P(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "variant",
    "size",
    "disabled",
    "type",
    "className",
    "children"
  ]), n = y(() => ({
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
    m(n)[o()],
    m(l)[a()],
    d()
  ].filter(Boolean).join(" "));
  var c = oe();
  D(c, () => ({
    type: u(),
    class: m(p),
    disabled: i(),
    ...s
  }));
  var w = h(c);
  Z(w, () => e.children ?? $), x(r, c), S();
}
function K(r) {
  const e = {
    default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
    success: "border-green-300 focus:border-green-500 focus:ring-green-500",
    warning: "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500",
    error: "border-red-300 focus:border-red-500 focus:ring-red-500",
    info: "border-blue-300 focus:border-blue-500 focus:ring-blue-500"
  };
  return e[r] || e.default;
}
function xe(r) {
  const e = {
    default: "border-gray-200 bg-white",
    success: "border-green-200 bg-green-50",
    warning: "border-yellow-200 bg-yellow-50",
    error: "border-red-200 bg-red-50",
    info: "border-blue-200 bg-blue-50"
  };
  return e[r] || e.default;
}
function E(r, e) {
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
function pe(r) {
  return {
    border: E(r, "border"),
    text: E(r, "text"),
    bg: E(r, "bg")
  };
}
function we(r, e) {
  return r.reduce((a, o) => (a[o] = `${e}-${o}`, a), {});
}
var se = k("<label> </label>"), le = k("<div><!> <input/></div>");
function _e(r, e) {
  q(e, !0);
  let a = t(e, "value", 7, ""), o = t(e, "type", 3, "text"), i = t(e, "name", 3, ""), u = t(e, "label", 3, ""), d = t(e, "placeholder", 3, ""), s = t(e, "disabled", 3, !1), n = t(e, "size", 3, "md"), l = t(e, "variant", 3, "default"), p = P(e, [
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
  ]), c = F(typeof window < "u" ? `input-${Math.random().toString(36).substr(2, 9)}` : `input-ssr-${Date.now()}`), w = y(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), C = y(() => K(l())), g = y(() => [
    "w-full rounded-md transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
    m(w)[n()],
    m(C)
  ].join(" ")), b = y(() => "block text-sm font-medium text-primary mb-1");
  function z(f) {
    const v = f.target;
    a(v.value), e.oninput && e.oninput(f);
  }
  var M = le(), j = h(M);
  {
    var _ = (f) => {
      var v = se();
      H(v, 1, G(m(b)));
      var A = h(v);
      V(() => {
        L(v, "for", c), R(A, u());
      }), x(f, v);
    };
    I(j, (f) => {
      u() && f(_);
    });
  }
  var B = N(j, 2);
  D(
    B,
    () => ({
      id: c,
      type: o(),
      name: i(),
      value: a(),
      placeholder: d(),
      disabled: s(),
      class: m(g),
      oninput: z,
      ...p
    }),
    void 0,
    void 0,
    void 0,
    !0
  ), x(r, M), S();
}
var ne = k("<label> </label>"), ie = k("<div><!> <textarea></textarea></div>");
function ke(r, e) {
  q(e, !0);
  let a = t(e, "value", 7, ""), o = t(e, "name", 3, ""), i = t(e, "label", 3, ""), u = t(e, "placeholder", 3, ""), d = t(e, "disabled", 3, !1), s = t(e, "rows", 3, 4), n = t(e, "size", 3, "md"), l = t(e, "variant", 3, "default"), p = P(e, [
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
  ]), c = F(typeof window < "u" ? `textarea-${Math.random().toString(36).substr(2, 9)}` : `textarea-ssr-${Date.now()}`), w = y(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), C = y(() => K(l())), g = y(() => [
    "w-full rounded-md transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
    "resize-y",
    m(w)[n()],
    m(C)
  ].join(" ")), b = y(() => "block text-sm font-medium text-primary mb-1");
  function z(f) {
    const v = f.target;
    a(v.value), e.oninput && e.oninput(f);
  }
  var M = ie(), j = h(M);
  {
    var _ = (f) => {
      var v = ne();
      H(v, 1, G(m(b)));
      var A = h(v);
      V(() => {
        L(v, "for", c), R(A, i());
      }), x(f, v);
    };
    I(j, (f) => {
      i() && f(_);
    });
  }
  var B = N(j, 2);
  D(B, () => ({
    id: c,
    name: o(),
    value: a(),
    placeholder: u(),
    disabled: d(),
    rows: s(),
    class: m(g),
    oninput: z,
    ...p
  })), x(r, M), S();
}
var de = k('<label class="text-sm font-medium cursor-pointer"> </label>'), ue = k('<div class="flex items-center gap-2"><input/> <!></div>');
function Ce(r, e) {
  q(e, !0);
  let a = t(e, "checked", 7, !1), o = t(e, "name", 3, ""), i = t(e, "disabled", 3, !1), u = t(e, "label", 3, ""), d = P(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "checked",
    "name",
    "disabled",
    "label"
  ]), s = F(typeof window < "u" ? `checkbox-${Math.random().toString(36).substr(2, 9)}` : `checkbox-ssr-${Date.now()}`), n = y(() => [
    "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded",
    "focus:ring-blue-500 focus:ring-2",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  ].join(" "));
  function l(g) {
    const b = g.target;
    a(b.checked);
  }
  var p = ue(), c = h(p);
  D(
    c,
    () => ({
      type: "checkbox",
      id: s,
      name: o(),
      checked: a(),
      disabled: i(),
      class: m(n),
      onchange: l,
      ...d
    }),
    void 0,
    void 0,
    void 0,
    !0
  );
  var w = N(c, 2);
  {
    var C = (g) => {
      var b = de(), z = h(b);
      V(() => {
        L(b, "for", s), R(z, u());
      }), x(g, b);
    };
    I(w, (g) => {
      u() && g(C);
    });
  }
  x(r, p), S();
}
async function ce(r, e, a) {
  try {
    await navigator.clipboard.writeText(e.code), U(a, !0), setTimeout(
      () => {
        U(a, !1);
      },
      2e3
    );
  } catch (o) {
    console.error("Failed to copy code:", o);
  }
}
var ge = J('<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg> Copied!', 1), be = J('<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> Copy', 1), fe = k('<button class="flex items-center gap-2 px-3 py-1 text-xs text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200" aria-label="Copy code to clipboard"><!></button>'), ve = k('<div><div class="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700"><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-red-500"></div> <div class="w-3 h-3 rounded-full bg-yellow-500"></div> <div class="w-3 h-3 rounded-full bg-green-500"></div></div> <!></div> <pre class="p-4 overflow-x-auto text-sm text-gray-100 leading-relaxed"><code><!></code></pre></div>');
const me = {
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
function ze(r, e) {
  re(r, me);
  let a = t(e, "language", 3, "svelte"), o = t(e, "className", 3, ""), i = t(e, "showCopyButton", 3, !0), u = P(e, [
    "$$slots",
    "$$events",
    "$$legacy",
    "code",
    "language",
    "className",
    "showCopyButton"
  ]), d = ae(!1);
  var s = ve();
  D(
    s,
    () => ({
      class: `code-block relative bg-gray-900 rounded-lg overflow-hidden ${o() ?? ""}`,
      ...u
    }),
    void 0,
    void 0,
    "svelte-1dmazsz"
  );
  var n = h(s), l = N(h(n), 2);
  {
    var p = (g) => {
      var b = fe();
      b.__click = [ce, e, d];
      var z = h(b);
      {
        var M = (_) => {
          var B = ge();
          x(_, B);
        }, j = (_) => {
          var B = be();
          x(_, B);
        };
        I(z, (_) => {
          m(d) ? _(M) : _(j, !1);
        });
      }
      x(g, b);
    };
    I(l, (g) => {
      i() && g(p);
    });
  }
  var c = N(n, 2), w = h(c), C = h(w);
  te(C, () => e.code), V(() => H(w, 1, `language-${a() ?? ""}`, "svelte-1dmazsz")), x(r, s);
}
ee(["click"]);
export {
  ye as B,
  Ce as C,
  _e as I,
  ke as T,
  xe as a,
  E as b,
  pe as c,
  we as d,
  ze as e,
  re as f,
  K as g,
  te as h
};
