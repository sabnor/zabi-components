import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
var k = e.from_html("<button><!></button>");
function N(g, t) {
  e.push(t, !0);
  let d = e.prop(t, "variant", 3, "primary"), l = e.prop(t, "size", 3, "md"), f = e.prop(t, "disabled", 3, !1), c = e.prop(t, "type", 3, "button"), u = e.prop(t, "className", 3, ""), n = e.prop(t, "text", 3, ""), b = e.rest_props(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "variant",
    "size",
    "disabled",
    "type",
    "className",
    "text",
    "onclick",
    "children"
  ]), p = e.derived(() => ({
    sm: "px-3 py-1.5 text-sm font-medium",
    md: "px-4 py-2 text-sm font-medium",
    lg: "px-6 py-3 text-base font-semibold"
  })), v = e.derived(() => ({
    primary: "bg-gray-100 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400",
    success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:text-gray-400",
    brand: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400"
  })), m = e.derived(() => [
    "inline-flex items-center justify-center rounded-md transition-all duration-200",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "active:scale-95 transform-gpu",
    "shadow-sm hover:shadow-md",
    e.get(p)[l()],
    e.get(v)[d()],
    u()
  ].filter(Boolean).join(" "));
  var a = k();
  e.attribute_effect(a, () => ({
    type: c(),
    class: e.get(m),
    disabled: f(),
    onclick: t.onclick,
    ...b
  }));
  var y = e.child(a);
  {
    var h = (r) => {
      var i = e.text();
      e.template_effect(() => e.set_text(i, n())), e.append(r, i);
    }, x = (r) => {
      var i = e.comment(), _ = e.first_child(i);
      {
        var w = (s) => {
          var o = e.comment(), z = e.first_child(o);
          e.snippet(z, () => t.children), e.append(s, o);
        };
        e.if(
          _,
          (s) => {
            t.children && s(w);
          },
          !0
        );
      }
      e.append(r, i);
    };
    e.if(y, (r) => {
      n() ? r(h) : r(x, !1);
    });
  }
  e.reset(a), e.append(g, a), e.pop();
}
export {
  N as default
};
