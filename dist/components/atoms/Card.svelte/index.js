import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
var C = e.from_html('<img class="w-full h-48 object-cover rounded-md mb-4"/>'), z = e.from_html("<h3> </h3>"), j = e.from_html("<div><!> <!> <!></div>");
function P(v, a) {
  e.push(a, !0);
  let l = e.prop(a, "title", 3, ""), s = e.prop(a, "image", 3, ""), c = e.prop(a, "interactive", 3, !1), m = e.prop(a, "variant", 3, "default"), f = e.prop(a, "size", 3, "md"), g = e.rest_props(a, [
    "$$slots",
    "$$events",
    "$$legacy",
    "title",
    "image",
    "interactive",
    "variant",
    "size",
    "children"
  ]), p = e.derived(() => ({ sm: "p-3", md: "p-4", lg: "p-6" })), b = e.derived(() => () => {
    const t = {
      default: "border-gray-200 bg-white",
      success: "border-green-200 bg-green-50",
      warning: "border-yellow-200 bg-yellow-50",
      error: "border-red-200 bg-red-50",
      info: "border-blue-200 bg-blue-50"
    };
    return t[m()] || t.default;
  }), u = e.derived(() => [
    "rounded-lg transition-all duration-200",
    "hover:shadow-adaptive-md",
    c() ? "cursor-pointer hover:scale-[1.02]" : "",
    e.get(p)[f()],
    e.get(b)
  ].join(" ")), h = e.derived(() => "text-lg font-semibold mb-2 text-primary");
  var i = j();
  e.attribute_effect(i, () => ({ class: e.get(u), ...g }));
  var o = e.child(i);
  {
    var _ = (t) => {
      var r = C();
      e.template_effect(() => {
        e.set_attribute(r, "src", s()), e.set_attribute(r, "alt", l());
      }), e.append(t, r);
    };
    e.if(o, (t) => {
      s() && t(_);
    });
  }
  var n = e.sibling(o, 2);
  {
    var w = (t) => {
      var r = z();
      e.set_class(r, 1, e.clsx(e.get(h)));
      var d = e.child(r, !0);
      e.reset(r), e.template_effect(() => e.set_text(d, l())), e.append(t, r);
    };
    e.if(n, (t) => {
      l() && t(w);
    });
  }
  var x = e.sibling(n, 2);
  {
    var y = (t) => {
      var r = e.comment(), d = e.first_child(r);
      e.snippet(d, () => a.children), e.append(t, r);
    };
    e.if(x, (t) => {
      a.children && t(y);
    });
  }
  e.reset(i), e.append(v, i), e.pop();
}
export {
  P as default
};
