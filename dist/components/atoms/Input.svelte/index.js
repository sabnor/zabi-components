import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
import { generateId as I } from "../../../routes/lib/ssr-safe/index.js";
var j = e.from_html("<label> </label>"), k = e.from_html("<div><!> <input/></div>");
function q(n, t) {
  e.push(t, !0);
  let o = e.prop(t, "value", 7, ""), u = e.prop(t, "type", 3, "text"), f = e.prop(t, "name", 3, ""), i = e.prop(t, "label", 3, ""), p = e.prop(t, "placeholder", 3, ""), c = e.prop(t, "disabled", 3, !1), b = e.prop(t, "size", 3, "md"), v = e.prop(t, "variant", 3, "default"), m = e.rest_props(t, [
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
  ]), d = e.proxy(I("input")), g = e.derived(() => () => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), y = e.derived(() => () => {
    const r = {
      default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
      success: "border-green-300 focus:border-green-500 focus:ring-green-500",
      warning: "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500",
      error: "border-red-300 focus:border-red-500 focus:ring-red-500"
    };
    return r[v()] || r.default;
  }), x = e.derived(() => () => [
    "w-full rounded-md transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
    e.get(g)()[b()],
    e.get(y)()
  ].join(" ")), h = e.derived(() => () => "block text-sm font-medium text-primary mb-1");
  function _(r) {
    const a = r.target;
    o(a.value), t.oninput && t.oninput(r);
  }
  var l = k(), s = e.child(l);
  {
    var w = (r) => {
      var a = j(), C = e.child(a, !0);
      e.reset(a), e.template_effect(() => {
        e.set_attribute(a, "for", d), e.set_class(a, 1, e.clsx(e.get(h))), e.set_text(C, i());
      }), e.append(r, a);
    };
    e.if(s, (r) => {
      i() && r(w);
    });
  }
  var z = e.sibling(s, 2);
  e.attribute_effect(
    z,
    () => ({
      id: d,
      type: u(),
      name: f(),
      value: o(),
      placeholder: p(),
      disabled: c(),
      class: e.get(x),
      oninput: _,
      ...m
    }),
    void 0,
    void 0,
    void 0,
    !0
  ), e.reset(l), e.append(n, l), e.pop();
}
export {
  q as default
};
