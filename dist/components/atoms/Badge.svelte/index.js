import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
var v = e.from_html("<span><!></span>");
function _(f, t) {
  e.push(t, !0);
  let n = e.prop(t, "variant", 3, "default"), m = e.prop(t, "className", 3, ""), i = e.prop(t, "text", 3, "");
  const c = e.derived(() => [
    "inline-flex items-center px-3 py-1 text-sm font-medium border rounded-md",
    n() === "success" ? "bg-green-100 text-green-800 border-green-300" : n() === "warning" ? "bg-yellow-100 text-yellow-800 border-yellow-300" : n() === "error" ? "bg-red-100 text-red-800 border-red-300" : n() === "info" ? "bg-blue-100 text-blue-800 border-blue-300" : "bg-gray-100 text-gray-800 border-gray-300",
    m()
  ].filter(Boolean).join(" "));
  var l = v(), p = e.child(l);
  {
    var g = (r) => {
      var a = e.comment(), d = e.first_child(a);
      e.snippet(d, () => t.children), e.append(r, a);
    }, x = (r) => {
      var a = e.comment(), d = e.first_child(a);
      {
        var b = (o) => {
          var s = e.text();
          e.template_effect(() => e.set_text(s, i())), e.append(o, s);
        };
        e.if(
          d,
          (o) => {
            i() && o(b);
          },
          !0
        );
      }
      e.append(r, a);
    };
    e.if(p, (r) => {
      t.children ? r(g) : r(x, !1);
    });
  }
  e.reset(l), e.template_effect(() => e.set_class(l, 1, e.clsx(e.get(c)))), e.append(f, l), e.pop();
}
export {
  _ as default
};
