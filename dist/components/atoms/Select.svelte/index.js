import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
import { generateId as S } from "../../../routes/lib/ssr-safe/index.js";
var j = e.from_html('<label class="block text-sm font-medium text-gray-700 mb-1"> </label>'), k = e.from_html("<option disabled> </option>"), P = e.from_html("<option> </option>"), q = e.from_html("<div><!> <select><!><!></select></div>");
function D(f, r) {
  e.push(r, !0);
  let o = e.prop(r, "value", 7, void 0), b = e.prop(r, "options", 19, () => []), i = e.prop(r, "placeholder", 3, "Select an option"), p = e.prop(r, "label", 3, ""), _ = e.prop(r, "disabled", 3, !1), m = e.prop(r, "size", 3, "md"), g = e.rest_props(r, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "options",
    "placeholder",
    "label",
    "disabled",
    "size"
  ]), n = e.proxy(S("select")), h = e.derived(() => ({
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
  var d = q(), v = e.child(d);
  {
    var z = (l) => {
      var t = j(), a = e.child(t, !0);
      e.reset(t), e.template_effect(() => {
        e.set_attribute(t, "for", n), e.set_text(a, p());
      }), e.append(l, t);
    };
    e.if(v, (l) => {
      p() && l(z);
    });
  }
  var s = e.sibling(v, 2);
  e.attribute_effect(s, () => ({
    id: n,
    value: o(),
    disabled: _(),
    class: e.get(x),
    onchange: y,
    ...g
  }));
  var c = e.child(s);
  {
    var w = (l) => {
      var t = k(), a = e.child(t, !0);
      e.reset(t), t.value = t.__value = "", e.template_effect(() => e.set_text(a, i())), e.append(l, t);
    };
    e.if(c, (l) => {
      i() && !o() && l(w);
    });
  }
  var C = e.sibling(c);
  e.each(C, 17, b, (l) => l.value, (l, t) => {
    var a = P(), I = e.child(a, !0);
    e.reset(a);
    var u = {};
    e.template_effect(() => {
      a.disabled = e.get(t).disabled, e.set_text(I, e.get(t).label), u !== (u = e.get(t).value) && (a.value = (a.__value = e.get(t).value) ?? "");
    }), e.append(l, a);
  }), e.reset(s), e.reset(d), e.append(f, d), e.pop();
}
export {
  D as default
};
