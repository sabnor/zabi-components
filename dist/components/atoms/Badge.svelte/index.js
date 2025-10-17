import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
var s = e.from_html("<span><!></span>");
function b(o, r) {
  e.push(r, !0);
  let t = e.prop(r, "variant", 3, "default"), l = e.prop(r, "className", 3, "");
  const n = e.derived(() => [
    "inline-flex items-center px-3 py-1 text-sm font-medium border rounded-md",
    t() === "success" ? "bg-green-100 text-green-800 border-green-300" : t() === "warning" ? "bg-yellow-100 text-yellow-800 border-yellow-300" : t() === "error" ? "bg-red-100 text-red-800 border-red-300" : t() === "info" ? "bg-blue-100 text-blue-800 border-blue-300" : "bg-gray-100 text-gray-800 border-gray-300",
    l()
  ].filter(Boolean).join(" "));
  var a = s(), d = e.child(a);
  e.snippet(d, () => r.children), e.reset(a), e.template_effect(() => e.set_class(a, 1, e.clsx(e.get(n)))), e.append(o, a), e.pop();
}
export {
  b as default
};
