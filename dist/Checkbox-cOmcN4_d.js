import { w as X, x as L, y as Y, u as O, z as P, A as B, B as Z, j as n, C as u, D as A, i as D, f as M, k as $, t as k, b as p, p as T, c as q, v as S, g as i, m as f, d as z, h as x, n as j, E as I, s as v, a as H, l as J, o as K } from "./props-D1U_TNgY.js";
function de(a, e) {
  X(() => {
    var t = a.getRootNode(), s = (
      /** @type {ShadowRoot} */
      t.host ? (
        /** @type {ShadowRoot} */
        t
      ) : (
        /** @type {Document} */
        t.head ?? /** @type {Document} */
        t.ownerDocument.head
      )
    );
    if (!s.querySelector("#" + e.hash)) {
      const r = document.createElement("style");
      r.id = e.hash, r.textContent = e.code, s.appendChild(r);
    }
  });
}
function Q(a, e, t = e) {
  var s = /* @__PURE__ */ new WeakSet();
  L(a, "input", async (r) => {
    var l = r ? a.defaultValue : a.value;
    if (l = W(a) ? F(l) : l, t(l), B !== null && s.add(B), await Y(), l !== (l = e())) {
      var b = a.selectionStart, d = a.selectionEnd;
      a.value = l ?? "", d !== null && (a.selectionStart = b, a.selectionEnd = Math.min(d, a.value.length));
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  O(e) == null && a.value && (t(W(a) ? F(a.value) : a.value), B !== null && s.add(B)), P(() => {
    var r = e();
    if (a === document.activeElement) {
      var l = (
        /** @type {Batch} */
        Z ?? B
      );
      if (s.has(l))
        return;
    }
    W(a) && r === F(a.value) || a.type === "date" && !r && !a.value || r !== a.value && (a.value = r ?? "");
  });
}
function ee(a, e, t = e) {
  L(a, "change", (s) => {
    var r = s ? a.defaultChecked : a.checked;
    t(r);
  }), // If we are hydrating and the value has since changed,
  // then use the update value from the input instead.
  // If defaultChecked is set, then checked == defaultChecked
  O(e) == null && t(a.checked), P(() => {
    var s = e();
    a.checked = !!s;
  });
}
function W(a) {
  var e = a.type;
  return e === "number" || e === "range";
}
function F(a) {
  return a === "" ? null : +a;
}
var ae = M("<button><!></button>");
function ce(a, e) {
  q(e, !1);
  const t = f(), s = f(), r = f();
  let l = n(e, "variant", 8, "primary"), b = n(e, "size", 8, "md"), d = n(e, "disabled", 8, !1), c = n(e, "type", 8, "button");
  u(() => {
  }, () => {
    v(t, {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-3 text-base"
    });
  }), u(() => {
  }, () => {
    v(s, {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-600 text-white hover:bg-gray-700",
      danger: "bg-red-600 text-white hover:bg-red-700"
    });
  }), u(
    () => (i(t), S(b()), i(s), S(l())),
    () => {
      v(r, [
        "inline-flex items-center justify-center font-medium rounded-md",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        i(t)[b()],
        i(s)[l()]
      ].join(" "));
    }
  ), A(), D();
  var m = ae(), _ = z(m);
  $(_, e, "default", {}), k(() => {
    x(m, "type", c()), j(m, 1, I(i(r))), m.disabled = d();
  }), p(a, m), T();
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
function ue(a) {
  const e = {
    default: "card-variant-default",
    success: "card-variant-success",
    warning: "card-variant-warning",
    error: "card-variant-error",
    info: "card-variant-info"
  };
  return e[a] || e.default;
}
function G(a, e) {
  const t = {
    default: `variant-${e}-default`,
    success: `variant-${e}-success`,
    warning: `variant-${e}-warning`,
    error: `variant-${e}-error`,
    info: `variant-${e}-info`
  };
  return t[a] || t.default;
}
function fe(a) {
  return {
    border: G(a, "border"),
    text: G(a, "text"),
    bg: G(a, "bg")
  };
}
function ve(a, e) {
  return a.reduce((t, s) => (t[s] = `${e}-${s}`, t), {});
}
var te = M("<label> </label>"), se = M("<div><!> <input/></div>");
function be(a, e) {
  q(e, !1);
  const t = f(), s = f(), r = f(), l = f();
  let b = n(e, "value", 12, ""), d = n(e, "type", 8, "text"), c = n(e, "label", 8, ""), m = n(e, "placeholder", 8, ""), _ = n(e, "disabled", 8, !1), g = n(e, "size", 8, "md"), h = n(e, "variant", 8, "default");
  const C = `input-${Math.random().toString(36).substr(2, 9)}`;
  u(() => {
  }, () => {
    v(t, {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-3 text-base"
    });
  }), u(() => S(h()), () => {
    v(s, U(h()));
  }), u(
    () => (i(t), S(g()), i(s)),
    () => {
      v(r, [
        "w-full rounded-md transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
        i(t)[g()],
        i(s)
      ].join(" "));
    }
  ), u(() => {
  }, () => {
    v(l, "block text-sm font-medium text-primary mb-1");
  }), A(), D();
  var V = se(), E = z(V);
  {
    var N = (w) => {
      var y = te(), R = z(y);
      k(() => {
        x(y, "for", C), j(y, 1, I(i(l))), K(R, c());
      }), p(w, y);
    };
    H(E, (w) => {
      c() && w(N);
    });
  }
  var o = J(E, 2);
  k(() => {
    x(o, "id", C), x(o, "type", d()), x(o, "placeholder", m()), o.disabled = _(), j(o, 1, I(i(r)));
  }), Q(o, b), p(a, V), T();
}
var re = M("<label> </label>"), le = M("<div><!> <textarea></textarea></div>");
function me(a, e) {
  q(e, !1);
  const t = f(), s = f(), r = f(), l = f();
  let b = n(e, "value", 12, ""), d = n(e, "label", 8, ""), c = n(e, "placeholder", 8, ""), m = n(e, "disabled", 8, !1), _ = n(e, "rows", 8, 4), g = n(e, "size", 8, "md"), h = n(e, "variant", 8, "default");
  const C = `textarea-${Math.random().toString(36).substr(2, 9)}`;
  u(() => {
  }, () => {
    v(t, {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-3 text-base"
    });
  }), u(() => S(h()), () => {
    v(s, U(h()));
  }), u(
    () => (i(t), S(g()), i(s)),
    () => {
      v(r, [
        "w-full rounded-md transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
        "resize-y",
        i(t)[g()],
        i(s)
      ].join(" "));
    }
  ), u(() => {
  }, () => {
    v(l, "block text-sm font-medium text-primary mb-1");
  }), A(), D();
  var V = le(), E = z(V);
  {
    var N = (w) => {
      var y = re(), R = z(y);
      k(() => {
        x(y, "for", C), j(y, 1, I(i(l))), K(R, d());
      }), p(w, y);
    };
    H(E, (w) => {
      d() && w(N);
    });
  }
  var o = J(E, 2);
  k(() => {
    x(o, "id", C), x(o, "placeholder", c()), o.disabled = m(), x(o, "rows", _()), j(o, 1, I(i(r)));
  }), Q(o, b), p(a, V), T();
}
var ne = M('<label class="text-sm font-medium cursor-pointer"> </label>'), ie = M('<div class="flex items-center gap-2"><input type="checkbox"/> <!></div>');
function xe(a, e) {
  q(e, !1);
  const t = f();
  let s = n(e, "checked", 12, !1), r = n(e, "disabled", 8, !1), l = n(e, "label", 8, "");
  const b = `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  u(() => {
  }, () => {
    v(t, [
      "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded",
      "focus:ring-blue-500 focus:ring-2",
      "disabled:opacity-50 disabled:cursor-not-allowed"
    ].join(" "));
  }), A(), D();
  var d = ie(), c = z(d), m = J(c, 2);
  {
    var _ = (g) => {
      var h = ne(), C = z(h);
      k(() => {
        x(h, "for", b), K(C, l());
      }), p(g, h);
    };
    H(m, (g) => {
      l() && g(_);
    });
  }
  k(() => {
    x(c, "id", b), c.disabled = r(), j(c, 1, I(i(t)));
  }), ee(c, s), p(a, d), T();
}
export {
  ce as B,
  xe as C,
  be as I,
  me as T,
  ue as a,
  G as b,
  fe as c,
  ve as d,
  de as e,
  U as g
};
