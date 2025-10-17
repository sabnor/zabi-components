import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
var y = e.from_html('<img class="w-full h-48 object-cover rounded-md mb-4"/>'), C = e.from_html("<h3> </h3>"), z = e.from_html("<div><!> <!> <!></div>");
function M(n, r) {
  e.push(r, !0);
  let l = e.prop(r, "title", 3, ""), d = e.prop(r, "image", 3, ""), v = e.prop(r, "interactive", 3, !1), c = e.prop(r, "variant", 3, "default"), m = e.prop(r, "size", 3, "md"), g = e.rest_props(r, [
    "$$slots",
    "$$events",
    "$$legacy",
    "title",
    "image",
    "interactive",
    "variant",
    "size",
    "children"
  ]), f = e.derived(() => ({ sm: "p-3", md: "p-4", lg: "p-6" })), p = e.derived(() => () => {
    const t = {
      default: "border-gray-200 bg-white",
      success: "border-green-200 bg-green-50",
      warning: "border-yellow-200 bg-yellow-50",
      error: "border-red-200 bg-red-50",
      info: "border-blue-200 bg-blue-50"
    };
    return t[c()] || t.default;
  }), b = e.derived(() => [
    "rounded-lg transition-all duration-200",
    "hover:shadow-adaptive-md",
    v() ? "cursor-pointer hover:scale-[1.02]" : "",
    e.get(f)[m()],
    e.get(p)
  ].join(" ")), u = e.derived(() => "text-lg font-semibold mb-2 text-primary");
  var i = z();
  e.attribute_effect(i, () => ({ class: e.get(b), ...g }));
  var s = e.child(i);
  {
    var h = (t) => {
      var a = y();
      e.template_effect(() => {
        e.set_attribute(a, "src", d()), e.set_attribute(a, "alt", l());
      }), e.append(t, a);
    };
    e.if(s, (t) => {
      d() && t(h);
    });
  }
  var o = e.sibling(s, 2);
  {
    var _ = (t) => {
      var a = C();
      e.set_class(a, 1, e.clsx(e.get(u)));
      var x = e.child(a, !0);
      e.reset(a), e.template_effect(() => e.set_text(x, l())), e.append(t, a);
    };
    e.if(o, (t) => {
      l() && t(_);
    });
  }
  var w = e.sibling(o, 2);
  e.snippet(w, () => r.children ?? e.noop), e.reset(i), e.append(n, i), e.pop();
}
export {
  M as default
};
