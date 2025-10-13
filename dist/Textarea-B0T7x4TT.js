import { z as W, l as C, p as s, A as f, B as A, i as T, f as B, a as q, s as X, c as V, d as E, g as R, y, k as t, m as o, h as k, o as i, b as F, e as G, j as H, t as J, w as K, v as L, C as O, n as Q } from "./props-DyILkQVH.js";
function se(a, e) {
  W(() => {
    var r = a.getRootNode(), d = (
      /** @type {ShadowRoot} */
      r.host ? (
        /** @type {ShadowRoot} */
        r
      ) : (
        /** @type {Document} */
        r.head ?? /** @type {Document} */
        r.ownerDocument.head
      )
    );
    if (!d.querySelector("#" + e.hash)) {
      const n = document.createElement("style");
      n.id = e.hash, n.textContent = e.code, d.appendChild(n);
    }
  });
}
var Y = B("<button><!></button>");
function re(a, e) {
  const r = C(e, ["children", "$$slots", "$$events", "$$legacy"]), d = C(r, ["variant", "size", "disabled", "type", "className"]);
  R(e, !1);
  const n = o(), u = o(), b = o();
  let v = s(e, "variant", 8, "primary"), p = s(e, "size", 8, "md"), h = s(e, "disabled", 8, !1), w = s(e, "type", 8, "button"), _ = s(e, "className", 8, "");
  f(() => {
  }, () => {
    i(n, {
      sm: "px-3 py-1.5 text-sm font-medium",
      md: "px-4 py-2 text-sm font-medium",
      lg: "px-6 py-3 text-base font-semibold"
    });
  }), f(() => {
  }, () => {
    i(u, {
      primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400",
      secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400",
      danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400",
      success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:text-gray-400",
      brand: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400"
    });
  }), f(
    () => (t(n), y(p()), t(u), y(v()), y(_())),
    () => {
      i(b, [
        "inline-flex items-center justify-center rounded-md transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "active:scale-95 transform-gpu",
        "shadow-sm hover:shadow-md",
        t(n)[p()],
        t(u)[v()],
        _()
      ].filter(Boolean).join(" "));
    }
  ), A(), T();
  var m = Y();
  q(m, () => ({
    type: w(),
    class: t(b),
    disabled: h(),
    ...d
  }));
  var x = k(m);
  X(x, e, "default", {}), V(a, m), E();
}
function U(a) {
  const e = {
    default: "input-variant-default",
    success: "input-variant-success",
    warning: "input-variant-warning",
    error: "input-variant-error",
    info: "input-variant-info"
  };
  return e[a] || e.default;
}
function ne(a) {
  const e = {
    default: "card-variant-default",
    success: "card-variant-success",
    warning: "card-variant-warning",
    error: "card-variant-error",
    info: "card-variant-info"
  };
  return e[a] || e.default;
}
function S(a, e) {
  const r = {
    default: `variant-${e}-default`,
    success: `variant-${e}-success`,
    warning: `variant-${e}-warning`,
    error: `variant-${e}-error`,
    info: `variant-${e}-info`
  };
  return r[a] || r.default;
}
function ie(a) {
  return {
    border: S(a, "border"),
    text: S(a, "text"),
    bg: S(a, "bg")
  };
}
function le(a, e) {
  return a.reduce((r, d) => (r[d] = `${e}-${d}`, r), {});
}
var Z = B("<label> </label>"), $ = B("<div><!> <input/></div>");
function oe(a, e) {
  const r = C(e, ["children", "$$slots", "$$events", "$$legacy"]), d = C(r, [
    "value",
    "type",
    "label",
    "placeholder",
    "disabled",
    "size",
    "variant"
  ]);
  R(e, !1);
  const n = o(), u = o(), b = o(), v = o();
  let p = s(e, "value", 12, ""), h = s(e, "type", 8, "text"), w = s(e, "label", 8, ""), _ = s(e, "placeholder", 8, ""), m = s(e, "disabled", 8, !1), x = s(e, "size", 8, "md"), z = s(e, "variant", 8, "default"), g = o();
  typeof window < "u" ? i(g, `input-${Math.random().toString(36).substr(2, 9)}`) : i(g, `input-ssr-${Date.now()}`);
  function N(c) {
    const l = c.target;
    p(l.value);
  }
  f(() => {
  }, () => {
    i(n, {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-3 text-base"
    });
  }), f(() => y(z()), () => {
    i(u, U(z()));
  }), f(
    () => (t(n), y(x()), t(u)),
    () => {
      i(b, [
        "w-full rounded-md transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
        t(n)[x()],
        t(u)
      ].join(" "));
    }
  ), f(() => {
  }, () => {
    i(v, "block text-sm font-medium text-primary mb-1");
  }), A(), T();
  var I = $(), M = k(I);
  {
    var D = (c) => {
      var l = Z(), P = k(l);
      J(() => {
        K(l, "for", t(g)), L(l, 1, O(t(v))), Q(P, w());
      }), V(c, l);
    };
    F(M, (c) => {
      w() && c(D);
    });
  }
  var j = H(M, 2);
  q(
    j,
    () => ({
      id: t(g),
      type: h(),
      value: p(),
      placeholder: _(),
      disabled: m(),
      class: t(b),
      ...d
    }),
    void 0,
    void 0,
    void 0,
    !0
  ), G("input", j, N), V(a, I), E();
}
var ee = B("<label> </label>"), te = B("<div><!> <textarea></textarea></div>");
function de(a, e) {
  const r = C(e, ["children", "$$slots", "$$events", "$$legacy"]), d = C(r, [
    "value",
    "label",
    "placeholder",
    "disabled",
    "rows",
    "size",
    "variant"
  ]);
  R(e, !1);
  const n = o(), u = o(), b = o(), v = o();
  let p = s(e, "value", 12, ""), h = s(e, "label", 8, ""), w = s(e, "placeholder", 8, ""), _ = s(e, "disabled", 8, !1), m = s(e, "rows", 8, 4), x = s(e, "size", 8, "md"), z = s(e, "variant", 8, "default"), g = o();
  typeof window < "u" ? i(g, `textarea-${Math.random().toString(36).substr(2, 9)}`) : i(g, `textarea-ssr-${Date.now()}`);
  function N(c) {
    const l = c.target;
    p(l.value);
  }
  f(() => {
  }, () => {
    i(n, {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-3 text-base"
    });
  }), f(() => y(z()), () => {
    i(u, U(z()));
  }), f(
    () => (t(n), y(x()), t(u)),
    () => {
      i(b, [
        "w-full rounded-md transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
        "resize-y",
        t(n)[x()],
        t(u)
      ].join(" "));
    }
  ), f(() => {
  }, () => {
    i(v, "block text-sm font-medium text-primary mb-1");
  }), A(), T();
  var I = te(), M = k(I);
  {
    var D = (c) => {
      var l = ee(), P = k(l);
      J(() => {
        K(l, "for", t(g)), L(l, 1, O(t(v))), Q(P, h());
      }), V(c, l);
    };
    F(M, (c) => {
      h() && c(D);
    });
  }
  var j = H(M, 2);
  q(j, () => ({
    id: t(g),
    value: p(),
    placeholder: w(),
    disabled: _(),
    rows: m(),
    class: t(b),
    ...d
  })), G("input", j, N), V(a, I), E();
}
export {
  re as B,
  oe as I,
  de as T,
  ne as a,
  S as b,
  ie as c,
  le as d,
  se as e,
  U as g
};
