import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
import { generateId as k } from "../../../routes/lib/ssr-safe/index.js";
function p(o, t, n) {
  t() || (o.key === " " || o.key === "Enter") && (o.preventDefault(), n(o));
}
var v = e.from_html('<label class="text-sm font-medium text-gray-700 cursor-pointer"> </label>'), x = e.from_html('<div class="flex items-center gap-3"><button type="button" role="switch"><span></span></button> <!></div>');
function C(o, t) {
  e.push(t, !0);
  let n = e.prop(t, "checked", 7, !1), r = e.prop(t, "disabled", 3, !1), i = e.prop(t, "label", 3, "");
  e.rest_props(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "checked",
    "disabled",
    "label",
    "onclick",
    "onchange"
  ]);
  const u = k("toggle");
  function f(s) {
    r() || (n(!n()), t.onclick && t.onclick(s), t.onchange && t.onchange({ checked: n() }));
  }
  const b = e.derived(() => () => {
    const s = "relative inline-flex w-11 h-6 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2", l = n() ? "bg-blue-600" : "bg-gray-200", d = r() ? "opacity-50 cursor-not-allowed" : "";
    return `${s} ${l} ${d}`.trim();
  }), g = e.derived(() => () => {
    const s = "pointer-events-none inline-block w-5 h-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out", l = n() ? "translate-x-5" : "translate-x-0";
    return `${s} ${l}`.trim();
  });
  var c = x(), a = e.child(c);
  a.__click = // Handle keyboard
  f, a.__keydown = [p, r, f];
  var h = e.child(a);
  e.reset(a);
  var m = e.sibling(a, 2);
  {
    var _ = (s) => {
      var l = v(), d = e.child(l, !0);
      e.reset(l), e.template_effect(() => {
        e.set_attribute(l, "for", u), e.set_text(d, i());
      }), e.append(s, l);
    };
    e.if(m, (s) => {
      i() && s(_);
    });
  }
  e.reset(c), e.template_effect(
    (s, l) => {
      e.set_attribute(a, "id", u), e.set_attribute(a, "aria-checked", n()), e.set_attribute(a, "aria-label", i() || "Toggle"), a.disabled = r(), e.set_class(a, 1, s), e.set_class(h, 1, l);
    },
    [
      () => e.clsx(e.get(b)()),
      () => e.clsx(e.get(g)())
    ]
  ), e.append(o, c), e.pop();
}
e.delegate(["click", "keydown"]);
export {
  C as default
};
