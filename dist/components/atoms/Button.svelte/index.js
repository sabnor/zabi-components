import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
var c = e.from_html("<button><!></button>");
function v(s, t) {
  e.push(t, !0);
  let i = e.prop(t, "variant", 3, "primary"), o = e.prop(t, "size", 3, "md"), a = e.prop(t, "disabled", 3, !1), n = e.prop(t, "type", 3, "button"), g = e.prop(t, "className", 3, ""), d = e.rest_props(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "variant",
    "size",
    "disabled",
    "type",
    "className",
    "onclick",
    "children"
  ]), l = e.derived(() => ({
    sm: "px-3 py-1.5 text-sm font-medium",
    md: "px-4 py-2 text-sm font-medium",
    lg: "px-6 py-3 text-base font-semibold"
  })), u = e.derived(() => ({
    primary: "bg-gray-100 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400",
    success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:text-gray-400",
    brand: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400"
  })), b = e.derived(() => [
    "inline-flex items-center justify-center rounded-md transition-all duration-200",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "active:scale-95 transform-gpu",
    "shadow-sm hover:shadow-md",
    e.get(l)[o()],
    e.get(u)[i()],
    g()
  ].filter(Boolean).join(" "));
  var r = c();
  e.attribute_effect(r, () => ({
    type: n(),
    class: e.get(b),
    disabled: a(),
    ...d
  }));
  var f = e.child(r);
  e.snippet(f, () => t.children ?? e.noop), e.reset(r), e.append(s, r), e.pop();
}
export {
  v as default
};
