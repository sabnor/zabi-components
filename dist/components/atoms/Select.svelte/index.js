import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
var j = e.from_html('<label class="block text-sm font-medium text-gray-700 mb-1"> </label>'), k = e.from_html("<option disabled> </option>"), D = e.from_html("<option> </option>"), I = e.from_html("<div><!> <select><!><!></select></div>");
function P(f, r) {
  e.push(r, !0);
  let o = e.prop(r, "value", 7, void 0), b = e.prop(r, "options", 19, () => []), i = e.prop(r, "placeholder", 3, "Select an option"), n = e.prop(r, "label", 3, ""), _ = e.prop(r, "disabled", 3, !1), m = e.prop(r, "size", 3, "md"), g = e.rest_props(r, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "options",
    "placeholder",
    "label",
    "disabled",
    "size"
  ]), p = e.proxy(typeof window < "u" ? `select-${Math.random().toString(36).substr(2, 9)}` : `select-ssr-${Date.now()}`), h = e.derived(() => ({
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base"
  })), x = e.derived(() => [
    "w-full border border-gray-300 rounded-md bg-white",
    "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    e.get(h)[m()]
  ].join(" "));
  function y(l) {
    const t = l.target;
    o(t.value);
  }
  var s = I(), v = e.child(s);
  {
    var w = (l) => {
      var t = j(), a = e.child(t, !0);
      e.reset(t), e.template_effect(() => {
        e.set_attribute(t, "for", p), e.set_text(a, n());
      }), e.append(l, t);
    };
    e.if(v, (l) => {
      n() && l(w);
    });
  }
  var d = e.sibling(v, 2);
  e.attribute_effect(d, () => ({
    id: p,
    value: o(),
    disabled: _(),
    class: e.get(x),
    onchange: y,
    ...g
  }));
  var c = e.child(d);
  {
    var z = (l) => {
      var t = k(), a = e.child(t, !0);
      e.reset(t), t.value = t.__value = "", e.template_effect(() => e.set_text(a, i())), e.append(l, t);
    };
    e.if(c, (l) => {
      i() && !o() && l(z);
    });
  }
  var C = e.sibling(c);
  e.each(C, 17, b, (l) => l.value, (l, t) => {
    var a = D(), S = e.child(a, !0);
    e.reset(a);
    var u = {};
    e.template_effect(() => {
      a.disabled = e.get(t).disabled, e.set_text(S, e.get(t).label), u !== (u = e.get(t).value) && (a.value = (a.__value = e.get(t).value) ?? "");
    }), e.append(l, a);
  }), e.reset(d), e.reset(s), e.append(f, s), e.pop();
}
export {
  P as default
};
