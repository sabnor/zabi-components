import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
import { getInputVariantClasses as I } from "../../../routes/lib/variant-utils/index.js";
import { generateId as j } from "../../../routes/lib/ssr-safe/index.js";
var k = e.from_html("<label> </label>"), P = e.from_html("<div><!> <textarea></textarea></div>");
function A(u, t) {
  e.push(t, !0);
  let s = e.prop(t, "value", 7, ""), f = e.prop(t, "name", 3, ""), i = e.prop(t, "label", 3, ""), p = e.prop(t, "placeholder", 3, ""), m = e.prop(t, "disabled", 3, !1), c = e.prop(t, "rows", 3, 4), v = e.prop(t, "size", 3, "md"), b = e.prop(t, "variant", 3, "default"), x = e.rest_props(t, [
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
  ]), o = e.proxy(j("textarea")), g = e.derived(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), _ = e.derived(() => I(b())), h = e.derived(() => [
    "w-full rounded-md transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
    "resize-y",
    e.get(g)[v()],
    e.get(_)
  ].join(" ")), y = e.derived(() => "block text-sm font-medium text-primary mb-1");
  function w(r) {
    const a = r.target;
    s(a.value), t.oninput && t.oninput(r);
  }
  var l = P(), d = e.child(l);
  {
    var z = (r) => {
      var a = k();
      e.set_class(a, 1, e.clsx(e.get(y)));
      var C = e.child(a, !0);
      e.reset(a), e.template_effect(() => {
        e.set_attribute(a, "for", o), e.set_text(C, i());
      }), e.append(r, a);
    };
    e.if(d, (r) => {
      i() && r(z);
    });
  }
  var n = e.sibling(d, 2);
  e.remove_textarea_child(n), e.attribute_effect(n, () => ({
    id: o,
    name: f(),
    value: s(),
    placeholder: p(),
    disabled: m(),
    rows: c(),
    class: e.get(h),
    oninput: w,
    ...x
  })), e.reset(l), e.append(u, l), e.pop();
}
export {
  A as default
};
