import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
var z = e.from_html('<img class="w-full h-48 object-cover rounded-md mb-4"/>'), W = e.from_html("<h3> </h3>"), y = e.from_html("<div><!> <!> <!></div>");
function P(v, i) {
  e.push(i, !0);
  let l = e.prop(i, "title", 3, ""), o = e.prop(i, "image", 3, ""), f = e.prop(i, "interactive", 3, !1), d = e.prop(i, "size", 3, "md"), m = e.prop(i, "fullWidth", 3, !1), h = e.rest_props(i, [
    "$$slots",
    "$$events",
    "$$legacy",
    "title",
    "image",
    "interactive",
    "size",
    "fullWidth",
    "children"
  ]);
  const u = e.derived(() => () => d() === "sm" ? "p-3" : d() === "lg" ? "p-6" : "p-4"), p = e.derived(() => () => {
    const t = "bg-surface rounded-lg transition-all duration-200 hover:shadow-adaptive-md", r = f() ? "cursor-pointer hover:bg-surface-hover hover:border-focus" : "", a = m() ? "w-full" : "";
    return `${t} ${r} ${a} ${e.get(u)()}`.trim();
  }), g = e.derived(() => () => "text-lg font-semibold mb-2 text-primary");
  var s = y();
  e.attribute_effect(s, (t) => ({ class: t, ...h }), [() => e.get(p)()]);
  var n = e.child(s);
  {
    var _ = (t) => {
      var r = z();
      e.template_effect(() => {
        e.set_attribute(r, "src", o()), e.set_attribute(r, "alt", l());
      }), e.append(t, r);
    };
    e.if(n, (t) => {
      o() && t(_);
    });
  }
  var c = e.sibling(n, 2);
  {
    var b = (t) => {
      var r = W(), a = e.child(r, !0);
      e.reset(r), e.template_effect(
        (w) => {
          e.set_class(r, 1, w), e.set_text(a, l());
        },
        [() => e.clsx(e.get(g)())]
      ), e.append(t, r);
    };
    e.if(c, (t) => {
      l() && t(b);
    });
  }
  var C = e.sibling(c, 2);
  {
    var x = (t) => {
      var r = e.comment(), a = e.first_child(r);
      e.snippet(a, () => i.children), e.append(t, r);
    };
    e.if(C, (t) => {
      i.children && t(x);
    });
  }
  e.reset(s), e.append(v, s), e.pop();
}
export {
  P as default
};
