import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
var b = e.from_html("<span> </span>");
function m(n, t) {
  e.push(t, !0);
  let r = e.prop(t, "variant", 3, "default"), o = e.prop(t, "size", 3, "md"), l = e.prop(t, "text", 3, "");
  const d = e.derived(() => () => {
    const a = "inline-flex items-center font-medium border rounded-md", i = o() === "sm" ? "px-2 py-0.5 text-xs" : o() === "lg" ? "px-4 py-2 text-base" : "px-3 py-1 text-sm", p = r() === "success" ? "bg-green-100 text-green-800 border-green-300" : r() === "warning" ? "bg-yellow-100 text-yellow-800 border-yellow-300" : r() === "error" ? "bg-red-100 text-red-800 border-red-300" : r() === "info" ? "bg-blue-100 text-blue-800 border-blue-300" : "bg-gray-100 text-gray-800 border-gray-300";
    return `${a} ${i} ${p}`.trim();
  });
  var s = b(), x = e.child(s, !0);
  e.reset(s), e.template_effect(
    (a) => {
      e.set_class(s, 1, a), e.set_text(x, l());
    },
    [() => e.clsx(e.get(d)())]
  ), e.append(n, s), e.pop();
}
export {
  m as default
};
