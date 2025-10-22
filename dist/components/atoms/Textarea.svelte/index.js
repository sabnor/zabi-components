import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
import { generateId as k } from "../../../routes/lib/ssr-safe/index.js";
var P = e.from_html("<label> </label>"), T = e.from_html("<div><!> <textarea></textarea></div>");
function A(f, r) {
  e.push(r, !0);
  let l = e.prop(r, "value", 7, ""), b = e.prop(r, "name", 3, ""), d = e.prop(r, "label", 3, ""), m = e.prop(r, "placeholder", 3, ""), p = e.prop(r, "disabled", 3, !1), v = e.prop(r, "rows", 3, 4), i = e.prop(r, "size", 3, "md"), s = e.prop(r, "variant", 3, "default"), g = e.rest_props(r, [
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
  ]);
  const n = k("textarea"), x = e.derived(() => () => i() === "sm" ? "px-3 py-1.5 text-sm" : i() === "lg" ? "px-5 py-3 text-base" : "px-4 py-2 text-sm"), _ = e.derived(() => () => s() === "success" ? "border-green-300 focus:border-green-500 focus:ring-green-500" : s() === "warning" ? "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500" : s() === "error" ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"), h = e.derived(() => () => `w-full rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled resize-y ${e.get(x)()} ${e.get(_)()}`.trim()), y = e.derived(() => () => "block text-sm font-medium text-primary mb-1");
  function w(t) {
    const a = t.target;
    l(a.value), r.oninput && r.oninput(t);
  }
  var o = T(), u = e.child(o);
  {
    var C = (t) => {
      var a = P(), z = e.child(a, !0);
      e.reset(a), e.template_effect(
        (I) => {
          e.set_attribute(a, "for", n), e.set_class(a, 1, I), e.set_text(z, d());
        },
        [() => e.clsx(e.get(y)())]
      ), e.append(t, a);
    };
    e.if(u, (t) => {
      d() && t(C);
    });
  }
  var c = e.sibling(u, 2);
  e.remove_textarea_child(c), e.attribute_effect(
    c,
    (t) => ({
      id: n,
      name: b(),
      value: l(),
      placeholder: m(),
      disabled: p(),
      rows: v(),
      class: t,
      oninput: w,
      ...g
    }),
    [() => e.get(h)()]
  ), e.reset(o), e.append(f, o), e.pop();
}
export {
  A as default
};
