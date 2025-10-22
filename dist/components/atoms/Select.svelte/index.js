import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
import { generateId as S } from "../../../routes/lib/ssr-safe/index.js";
var k = e.from_html('<label class="block text-sm font-medium text-gray-700 mb-1"> </label>'), P = e.from_html("<option disabled> </option>"), j = e.from_html("<option> </option>"), q = e.from_html("<div><!> <select><!><!></select></div>");
function D(f, r) {
  e.push(r, !0);
  let s = e.prop(r, "value", 7, void 0), _ = e.prop(r, "options", 19, () => []), i = e.prop(r, "placeholder", 3, "Select an option"), n = e.prop(r, "label", 3, ""), m = e.prop(r, "disabled", 3, !1), c = e.prop(r, "size", 3, "md"), g = e.rest_props(r, [
    "$$slots",
    "$$events",
    "$$legacy",
    "value",
    "options",
    "placeholder",
    "label",
    "disabled",
    "size"
  ]);
  const p = S("select"), h = e.derived(() => () => c() === "sm" ? "px-3 py-1.5 text-sm" : c() === "lg" ? "px-5 py-3 text-base" : "px-4 py-2 text-sm"), x = e.derived(() => () => `w-full border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${e.get(h)()}`.trim());
  function y(a) {
    const t = a.target;
    s(t.value);
  }
  var o = q(), v = e.child(o);
  {
    var C = (a) => {
      var t = k(), l = e.child(t, !0);
      e.reset(t), e.template_effect(() => {
        e.set_attribute(t, "for", p), e.set_text(l, n());
      }), e.append(a, t);
    };
    e.if(v, (a) => {
      n() && a(C);
    });
  }
  var d = e.sibling(v, 2);
  e.attribute_effect(
    d,
    (a) => ({
      id: p,
      value: s(),
      disabled: m(),
      class: a,
      onchange: y,
      ...g
    }),
    [() => e.get(x)()]
  );
  var u = e.child(d);
  {
    var z = (a) => {
      var t = P(), l = e.child(t, !0);
      e.reset(t), t.value = t.__value = "", e.template_effect(() => e.set_text(l, i())), e.append(a, t);
    };
    e.if(u, (a) => {
      i() && !s() && a(z);
    });
  }
  var w = e.sibling(u);
  e.each(w, 17, _, (a) => a.value, (a, t) => {
    var l = j(), I = e.child(l, !0);
    e.reset(l);
    var b = {};
    e.template_effect(() => {
      l.disabled = e.get(t).disabled, e.set_text(I, e.get(t).label), b !== (b = e.get(t).value) && (l.value = (l.__value = e.get(t).value) ?? "");
    }), e.append(a, l);
  }), e.reset(d), e.reset(o), e.append(f, o), e.pop();
}
export {
  D as default
};
