import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
var y = e.from_html('<label class="block text-sm font-medium text-gray-700"> </label>'), x = e.from_html('<span class="text-white text-lg">✓</span>'), w = e.from_html("<button><!></button>"), P = e.from_html('<div class="space-y-2"><!> <div></div></div>');
function G(c, l) {
  e.push(l, !0);
  let i = e.prop(l, "value", 7, ""), n = e.prop(l, "label", 3, ""), f = e.prop(l, "disabled", 3, !1), s = e.rest_props(l, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "label",
    "disabled",
    "onclick"
  ]);
  const p = [
    { label: "Red", value: "#ef4444" },
    { label: "Blue", value: "#3b82f6" },
    { label: "Green", value: "#10b981" },
    { label: "Yellow", value: "#f59e0b" },
    { label: "Purple", value: "#8b5cf6" },
    { label: "Pink", value: "#ec4899" },
    { label: "Gray", value: "#6b7280" },
    { label: "Black", value: "#000000" }
  ];
  let v = e.proxy(typeof window < "u" ? `color-picker-${Math.random().toString(36).substr(2, 9)}` : `color-picker-ssr-${Date.now()}`);
  var d = P(), u = e.child(d);
  {
    var g = (r) => {
      var a = y(), t = e.child(a, !0);
      e.reset(a), e.template_effect(() => {
        e.set_attribute(a, "for", v), e.set_text(t, n());
      }), e.append(r, a);
    };
    e.if(u, (r) => {
      n() && r(g);
    });
  }
  var b = e.sibling(u, 2);
  e.attribute_effect(b, () => ({
    id: v,
    class: "grid grid-cols-4 gap-2",
    role: "radiogroup",
    ...s
  })), e.each(b, 21, () => p, e.index, (r, a) => {
    var t = w(), _ = (o) => {
      i(e.get(a).value), l.onclick && l.onclick(o);
    };
    e.attribute_effect(t, () => ({
      type: "button",
      class: `w-12 h-12 rounded-lg border-2 transition-all ${i() === e.get(a).value ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300 hover:border-gray-400"}`,
      style: `background-color: ${e.get(a).value ?? ""};`,
      onclick: _,
      disabled: f(),
      role: "radio",
      "aria-checked": i() === e.get(a).value,
      "aria-label": e.get(a).label,
      ...s
    }));
    var m = e.child(t);
    {
      var h = (o) => {
        var k = x();
        e.append(o, k);
      };
      e.if(m, (o) => {
        i() === e.get(a).value && o(h);
      });
    }
    e.reset(t), e.append(r, t);
  }), e.reset(b), e.reset(d), e.append(c, d), e.pop();
}
export {
  G as default
};
