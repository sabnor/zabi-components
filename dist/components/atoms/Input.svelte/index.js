import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
import { generateId as k } from "../../../routes/lib/ssr-safe/index.js";
var P = e.from_html("<label> </label>"), j = e.from_html("<div><!> <input/></div>");
function B(c, t) {
  e.push(t, !0);
  let o = e.prop(t, "value", 7, ""), f = e.prop(t, "type", 3, "text"), p = e.prop(t, "name", 3, ""), i = e.prop(t, "label", 3, ""), b = e.prop(t, "placeholder", 3, ""), v = e.prop(t, "disabled", 3, !1), n = e.prop(t, "size", 3, "md"), s = e.prop(t, "variant", 3, "default"), m = e.rest_props(t, [
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
  ]);
  const d = k("input"), g = e.derived(() => () => n() === "sm" ? "px-3 py-1.5 text-sm" : n() === "lg" ? "px-5 py-3 text-base" : "px-4 py-2 text-sm"), y = e.derived(() => () => s() === "success" ? "border-green-300 focus:border-green-500 focus:ring-green-500" : s() === "warning" ? "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500" : s() === "error" ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"), x = e.derived(() => () => `w-full rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled ${e.get(g)()} ${e.get(y)()}`.trim()), h = e.derived(() => () => "block text-sm font-medium text-primary mb-1");
  function _(r) {
    const a = r.target;
    o(a.value), t.oninput && t.oninput(r);
  }
  var l = j(), u = e.child(l);
  {
    var w = (r) => {
      var a = P(), z = e.child(a, !0);
      e.reset(a), e.template_effect(
        (I) => {
          e.set_attribute(a, "for", d), e.set_class(a, 1, I), e.set_text(z, i());
        },
        [() => e.clsx(e.get(h)())]
      ), e.append(r, a);
    };
    e.if(u, (r) => {
      i() && r(w);
    });
  }
  var C = e.sibling(u, 2);
  e.attribute_effect(
    C,
    (r) => ({
      id: d,
      type: f(),
      name: p(),
      value: o(),
      placeholder: b(),
      disabled: v(),
      class: r,
      oninput: _,
      ...m
    }),
    [() => e.get(x)()],
    void 0,
    void 0,
    !0
  ), e.reset(l), e.append(c, l), e.pop();
}
export {
  B as default
};
