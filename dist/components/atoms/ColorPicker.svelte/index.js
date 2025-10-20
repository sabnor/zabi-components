import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
import { onMount as y } from "svelte";
var w = e.from_html('<label class="block text-sm font-medium text-gray-700"> </label>'), P = e.from_html('<span class="text-white text-lg">✓</span>'), B = e.from_html("<button><!></button>"), G = e.from_html('<div class="space-y-2"><!> <div></div></div>');
function D(c, l) {
  e.push(l, !0);
  let i = e.prop(l, "value", 7, ""), u = e.prop(l, "label", 3, ""), f = e.prop(l, "disabled", 3, !1), n = e.rest_props(l, [
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
  ];
  let s = e.state(`color-picker-ssr-${Date.now()}`), p = e.state(!1);
  y(() => {
    e.set(p, !0), e.set(s, `color-picker-${Math.random().toString(36).substr(2, 9)}`);
  });
  var d = G(), v = e.child(d);
  {
    var m = (r) => {
      var a = w(), t = e.child(a, !0);
      e.reset(a), e.template_effect(() => {
        e.set_attribute(a, "for", e.get(s)), e.set_text(t, u());
      }), e.append(r, a);
    };
    e.if(v, (r) => {
      u() && r(m);
    });
  }
  var b = e.sibling(v, 2);
  e.attribute_effect(b, () => ({
    id: e.get(s),
    class: "grid grid-cols-4 gap-2",
    role: "radiogroup",
    ...n
  })), e.each(b, 21, () => g, e.index, (r, a) => {
    var t = B(), _ = (o) => {
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
      ...n
    }));
    var h = e.child(t);
    {
      var k = (o) => {
        var x = P();
        e.append(o, x);
      };
      e.if(h, (o) => {
        i() === e.get(a).value && o(k);
      });
    }
    e.reset(t), e.append(r, t);
  }), e.reset(b), e.reset(d), e.append(c, d), e.pop();
}
export {
  D as default
};
