import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
var m = e.from_html("<span> </span>");
function g(o, t) {
  e.push(t, !0);
  let r = e.prop(t, "variant", 3, "default"), l = e.prop(t, "size", 3, "md"), n = e.prop(t, "className", 3, ""), d = e.prop(t, "text", 3, "");
  const x = e.derived(() => () => {
    const a = "inline-flex items-center font-medium border rounded-md", p = l() === "sm" ? "px-2 py-0.5 text-xs" : l() === "lg" ? "px-4 py-2 text-base" : "px-3 py-1 text-sm", b = r() === "success" ? "bg-green-100 text-green-800 border-green-300" : r() === "warning" ? "bg-yellow-100 text-yellow-800 border-yellow-300" : r() === "error" ? "bg-red-100 text-red-800 border-red-300" : r() === "info" ? "bg-blue-100 text-blue-800 border-blue-300" : "bg-gray-100 text-gray-800 border-gray-300";
    return `${a} ${p} ${b} ${n()}`.trim();
  });
  var s = m(), i = e.child(s, !0);
  e.reset(s), e.template_effect(
    (a) => {
      e.set_class(s, 1, a), e.set_text(i, d());
    },
    [() => e.clsx(e.get(x)())]
  ), e.append(o, s), e.pop();
}
export {
  g as default
};
