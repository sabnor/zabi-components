import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
var C = e.from_html("<button><!></button>");
function k(f, t) {
  e.push(t, !0);
  let s = e.prop(t, "variant", 3, "primary"), o = e.prop(t, "size", 3, "md"), c = e.prop(t, "disabled", 3, !1), l = e.prop(t, "type", 3, "button"), g = e.prop(t, "text", 3, ""), u = e.rest_props(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "variant",
    "size",
    "disabled",
    "type",
    "text",
    "onclick",
    "children"
  ]);
  const b = e.derived(() => () => o() === "sm" ? "px-3 py-1.5 text-sm font-medium" : o() === "lg" ? "px-6 py-3 text-base font-semibold" : "px-4 py-2 text-sm font-medium"), p = e.derived(() => () => s() === "primary" ? "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400" : s() === "secondary" ? "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400" : s() === "danger" ? "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400" : s() === "success" ? "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400" : s() === "ghost" ? "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:text-gray-400" : s() === "brand" ? "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400" : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"), v = e.derived(() => () => `inline-flex items-center justify-center rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 transform-gpu shadow-sm hover:shadow-md ${e.get(b)()} ${e.get(p)()}`.trim());
  var a = C();
  e.attribute_effect(
    a,
    (r) => ({
      type: l(),
      class: r,
      disabled: c(),
      onclick: t.onclick,
      ...u
    }),
    [() => e.get(v)()]
  );
  var m = e.child(a);
  {
    var h = (r) => {
      var i = e.text();
      e.template_effect(() => e.set_text(i, g())), e.append(r, i);
    }, y = (r) => {
      var i = e.comment(), x = e.first_child(i);
      {
        var _ = (n) => {
          var d = e.comment(), w = e.first_child(d);
          e.snippet(w, () => t.children), e.append(n, d);
        };
        e.if(
          x,
          (n) => {
            t.children && n(_);
          },
          !0
        );
      }
      e.append(r, i);
    };
    e.if(m, (r) => {
      g() ? r(h) : r(y, !1);
    });
  }
  e.reset(a), e.append(f, a), e.pop();
}
export {
  k as default
};
