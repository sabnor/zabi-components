import { w as F, j as l, x as b, y as D, i as k, f as y, k as B, t as m, b as f, p as q, c as E, v as x, g as c, m as h, d as w, h as C, n as N, z as R, s as g, a as j, l as z, o as G } from "./props-ChfwWtCN.js";
function M(s, e) {
  F(() => {
    var t = s.getRootNode(), a = (
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
    if (!a.querySelector("#" + e.hash)) {
      const r = document.createElement("style");
      r.id = e.hash, r.textContent = e.code, a.appendChild(r);
    }
  });
}
function O(s) {
  return function(...e) {
    var t = (
      /** @type {Event} */
      e[0]
    );
    return t.preventDefault(), s == null ? void 0 : s.apply(this, e);
  };
}
var H = y("<button><!></button>");
function P(s, e) {
  E(e, !1);
  const t = h(), a = h(), r = h();
  let v = l(e, "variant", 8, "primary"), n = l(e, "size", 8, "md"), u = l(e, "disabled", 8, !1), p = l(e, "type", 8, "button");
  b(() => {
  }, () => {
    g(t, {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-3 text-base"
    });
  }), b(() => {
  }, () => {
    g(a, {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-600 text-white hover:bg-gray-700",
      danger: "bg-red-600 text-white hover:bg-red-700"
    });
  }), b(
    () => (c(t), x(n()), c(a), x(v())),
    () => {
      g(r, [
        "inline-flex items-center justify-center font-medium rounded-md",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        c(t)[n()],
        c(a)[v()]
      ].join(" "));
    }
  ), D(), k();
  var o = H(), _ = w(o);
  B(_, e, "default", {}), m(() => {
    C(o, "type", p()), N(o, 1, R(c(r))), o.disabled = u();
  }), f(s, o), q();
}
var I = y('<img class="w-full h-48 object-cover rounded-md mb-4"/>'), J = y('<h3 class="text-lg font-semibold mb-2"> </h3>'), K = y("<div><!> <!> <!></div>");
function Q(s, e) {
  E(e, !1);
  const t = h();
  let a = l(e, "title", 8, ""), r = l(e, "image", 8, ""), v = l(e, "interactive", 8, !1);
  b(() => x(v()), () => {
    g(t, [
      "bg-white border border-gray-200 rounded-lg p-4",
      v() ? "cursor-pointer hover:shadow-md" : ""
    ].join(" "));
  }), D(), k();
  var n = K(), u = w(n);
  {
    var p = (i) => {
      var d = I();
      m(() => {
        C(d, "src", r()), C(d, "alt", a());
      }), f(i, d);
    };
    j(u, (i) => {
      r() && i(p);
    });
  }
  var o = z(u, 2);
  {
    var _ = (i) => {
      var d = J(), A = w(d);
      m(() => G(A, a())), f(i, d);
    };
    j(o, (i) => {
      a() && i(_);
    });
  }
  var S = z(o, 2);
  B(S, e, "default", {}), m(() => N(n, 1, R(c(t)))), f(s, n), q();
}
export {
  P as B,
  Q as C,
  M as a,
  O as p
};
