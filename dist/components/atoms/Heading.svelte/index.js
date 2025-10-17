import "svelte/internal/disclose-version";
import * as t from "svelte/internal/client";
var E = t.from_html('<h1 class="text-4xl font-bold text-gray-900"> </h1>'), F = t.from_html('<h2 class="text-3xl font-bold text-gray-900"> </h2>'), G = t.from_html('<h3 class="text-2xl font-semibold text-gray-900"> </h3>'), I = t.from_html('<h4 class="text-xl font-semibold text-gray-900"> </h4>'), J = t.from_html('<h5 class="text-lg font-medium text-gray-900"> </h5>'), K = t.from_html('<h6 class="text-base font-medium text-gray-900"> </h6>');
function M(y, u) {
  let i = t.prop(u, "level", 3, 1), a = t.prop(u, "text", 3, "");
  var g = t.comment(), b = t.first_child(g);
  {
    var H = (r) => {
      var l = E(), p = t.child(l, !0);
      t.reset(l), t.template_effect(() => t.set_text(p, a())), t.append(r, l);
    }, j = (r) => {
      var l = t.comment(), p = t.first_child(l);
      {
        var k = (f) => {
          var o = F(), x = t.child(o, !0);
          t.reset(o), t.template_effect(() => t.set_text(x, a())), t.append(f, o);
        }, q = (f) => {
          var o = t.comment(), x = t.first_child(o);
          {
            var w = (s) => {
              var _ = G(), d = t.child(_, !0);
              t.reset(_), t.template_effect(() => t.set_text(d, a())), t.append(s, _);
            }, z = (s) => {
              var _ = t.comment(), d = t.first_child(_);
              {
                var A = (m) => {
                  var v = I(), n = t.child(v, !0);
                  t.reset(v), t.template_effect(() => t.set_text(n, a())), t.append(m, v);
                }, B = (m) => {
                  var v = t.comment(), n = t.first_child(v);
                  {
                    var C = (h) => {
                      var e = J(), c = t.child(e, !0);
                      t.reset(e), t.template_effect(() => t.set_text(c, a())), t.append(h, e);
                    }, D = (h) => {
                      var e = K(), c = t.child(e, !0);
                      t.reset(e), t.template_effect(() => t.set_text(c, a())), t.append(h, e);
                    };
                    t.if(
                      n,
                      (h) => {
                        i() === 5 ? h(C) : h(D, !1);
                      },
                      !0
                    );
                  }
                  t.append(m, v);
                };
                t.if(
                  d,
                  (m) => {
                    i() === 4 ? m(A) : m(B, !1);
                  },
                  !0
                );
              }
              t.append(s, _);
            };
            t.if(
              x,
              (s) => {
                i() === 3 ? s(w) : s(z, !1);
              },
              !0
            );
          }
          t.append(f, o);
        };
        t.if(
          p,
          (f) => {
            i() === 2 ? f(k) : f(q, !1);
          },
          !0
        );
      }
      t.append(r, l);
    };
    t.if(b, (r) => {
      i() === 1 ? r(H) : r(j, !1);
    });
  }
  t.append(y, g);
}
export {
  M as default
};
