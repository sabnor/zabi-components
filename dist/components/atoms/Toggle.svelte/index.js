import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
import { createEventDispatcher as _ } from "svelte";
import { generateId as k } from "../../../routes/lib/ssr-safe/index.js";
function v(l, a, r) {
  a() || (l.key === " " || l.key === "Enter") && (l.preventDefault(), r(l));
}
var x = e.from_html('<label class="text-sm font-medium text-gray-700 cursor-pointer"> </label>'), y = e.from_html('<div><button type="button" role="switch"><span></span></button> <!></div>');
function E(l, a) {
  e.push(a, !0);
  let r = e.prop(a, "checked", 7, !1), s = e.prop(a, "disabled", 3, !1), c = e.prop(a, "label", 3, ""), b = e.prop(a, "className", 3, "");
  e.rest_props(a, [
    "$$slots",
    "$$events",
    "$$legacy",
    "checked",
    "disabled",
    "label",
    "className"
  ]);
  const d = _();
  let u = k("toggle");
  function f(o) {
    s() || (r(!r()), d("click", o), d("change", { checked: r() }));
  }
  var i = y(), t = e.child(i);
  t.__click = // Handle keyboard
  f, t.__keydown = [v, s, f];
  var p = e.child(t);
  e.reset(t);
  var g = e.sibling(t, 2);
  {
    var h = (o) => {
      var n = x(), m = e.child(n, !0);
      e.reset(n), e.template_effect(() => {
        e.set_attribute(n, "for", u), e.set_text(m, c());
      }), e.append(o, n);
    };
    e.if(g, (o) => {
      c() && o(h);
    });
  }
  e.reset(i), e.template_effect(() => {
    e.set_class(i, 1, `flex items-center gap-3 ${b() ?? ""}`), e.set_attribute(t, "id", u), e.set_attribute(t, "aria-checked", r()), e.set_attribute(t, "aria-label", c() || "Toggle"), t.disabled = s(), e.set_class(t, 1, `relative inline-flex w-11 h-6 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${r() ? "bg-blue-600" : "bg-gray-200"} ${s() ? "opacity-50 cursor-not-allowed" : ""}`), e.set_class(p, 1, `pointer-events-none inline-block w-5 h-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out ${r() ? "translate-x-5" : "translate-x-0"}`);
  }), e.append(l, i), e.pop();
}
e.delegate(["click", "keydown"]);
export {
  E as default
};
