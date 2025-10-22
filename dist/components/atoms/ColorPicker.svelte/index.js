import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
import { generateId as y } from "../../../routes/lib/ssr-safe/index.js";
var C = e.from_html('<label class="block text-sm font-medium text-gray-700"> </label>'), P = e.from_html('<span class="text-white text-lg">✓</span>'), w = e.from_html("<button><!></button>"), B = e.from_html('<div class="space-y-2"><!> <div></div></div>');
function R(c, t) {
  e.push(t, !0);
  let s = e.prop(t, "value", 7, ""), b = e.prop(t, "label", 3, ""), f = e.prop(t, "disabled", 3, !1), n = e.rest_props(t, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "label",
    "disabled",
    "onclick"
  ]);
  const g = [
    { label: "Red", value: "#ef4444" },
    { label: "Blue", value: "#3b82f6" },
    { label: "Green", value: "#10b981" },
    { label: "Yellow", value: "#f59e0b" },
    { label: "Purple", value: "#8b5cf6" },
    { label: "Pink", value: "#ec4899" },
    { label: "Gray", value: "#6b7280" },
    { label: "Black", value: "#000000" }
  ], v = y("color-picker"), p = e.derived(() => () => (r) => {
    const a = "w-12 h-12 rounded-lg border-2 transition-all", l = s() === r ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300 hover:border-gray-400";
    return `${a} ${l}`.trim();
  });
  var i = B(), u = e.child(i);
  {
    var m = (r) => {
      var a = C(), l = e.child(a, !0);
      e.reset(a), e.template_effect(() => {
        e.set_attribute(a, "for", v), e.set_text(l, b());
      }), e.append(r, a);
    };
    e.if(u, (r) => {
      b() && r(m);
    });
  }
  var d = e.sibling(u, 2);
  e.attribute_effect(d, () => ({
    id: v,
    class: "grid grid-cols-4 gap-2",
    role: "radiogroup",
    ...n
  })), e.each(d, 21, () => g, e.index, (r, a) => {
    var l = w(), _ = (o) => {
      s(e.get(a).value), t.onclick && t.onclick(o);
    };
    e.attribute_effect(
      l,
      (o) => ({
        type: "button",
        class: o,
        style: `background-color: ${e.get(a).value ?? ""};`,
        onclick: _,
        disabled: f(),
        role: "radio",
        "aria-checked": s() === e.get(a).value,
        "aria-label": e.get(a).label,
        ...n
      }),
      [() => e.get(p)()(e.get(a).value)]
    );
    var h = e.child(l);
    {
      var k = (o) => {
        var x = P();
        e.append(o, x);
      };
      e.if(h, (o) => {
        s() === e.get(a).value && o(k);
      });
    }
    e.reset(l), e.append(r, l);
  }), e.reset(d), e.reset(i), e.append(c, i), e.pop();
}
export {
  R as default
};
