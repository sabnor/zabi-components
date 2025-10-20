import "svelte/internal/disclose-version";
import * as e from "svelte/internal/client";
var o = e.from_html('<div class="text-primary" role="heading"> </div>');
function d(a, r) {
  let l = e.prop(r, "level", 3, 1);
  var t = o(), i = e.child(t, !0);
  e.reset(t), e.template_effect(() => {
    e.set_attribute(t, "aria-level", l()), e.set_text(i, r.text);
  }), e.append(a, t);
}
export {
  d as default
};
