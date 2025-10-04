import { t as I, Q as $e, R as Ce, S as je, T as Me, U as ue, p as j, C as se, D as ye, i as ie, f as _, c as M, s as fe, g as d, h as oe, j as ve, r as y, o as k, n as o, u as r, l as e, m as K, q as ee, v as H, k as x, e as te, B as Z, V as Te, w as re, b as J, d as he, W as le, P as Ue, E as xe, Y as me, a as qe, G as Be, Z as _e, x as Le, F as De, y as Ee, A as Pe } from "./x-DpVwziig.js";
import { createEventDispatcher as ce, onMount as Ie, onDestroy as Se } from "svelte";
import { B as ne, T as Ae, S as Fe, C as Re, c as Oe, a as Ve, b as He, I as Ke } from "./Toggle-BOVUeQPL.js";
function Ne(N, v, l = !1, c = !1, w = !1) {
  var i = N, D = "";
  I(() => {
    var g = (
      /** @type {Effect} */
      $e
    );
    if (D !== (D = v() ?? "") && (g.nodes_start !== null && (Ce(
      g.nodes_start,
      /** @type {TemplateNode} */
      g.nodes_end
    ), g.nodes_start = g.nodes_end = null), D !== "")) {
      var t = D + "";
      l ? t = `<svg>${t}</svg>` : c && (t = `<math>${t}</math>`);
      var m = je(t);
      if ((l || c) && (m = /** @type {Element} */
      ue(m)), Me(
        /** @type {TemplateNode} */
        ue(m),
        /** @type {TemplateNode} */
        m.lastChild
      ), l || c)
        for (; ue(m); )
          i.before(
            /** @type {Node} */
            ue(m)
          );
      else
        i.before(m);
    }
  });
}
var We = _('<button class="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full text-secondary hover:text-primary transition-colors duration-200 motion-reduce:transition-none group focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2" aria-label="Dismiss alert" type="button"><svg class="w-4 h-4 text-current group-hover:scale-110 transition-transform duration-200 motion-reduce:transition-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>'), Ge = _('<h4 class="font-semibold text-sm mb-1"> </h4>'), Qe = _('<p class="text-sm leading-relaxed"> </p>'), Ye = _('<div aria-atomic="true"><!> <div><div class="flex-shrink-0 mt-0.5"><!></div> <div class="flex-1 min-w-0"><!> <!> <!></div></div></div>');
function zt(N, v) {
  ve(v, !1);
  const l = K(), c = K(), w = K();
  let i = j(v, "variant", 8, "info"), D = j(v, "title", 8, ""), g = j(v, "message", 8, ""), t = j(v, "closable", 8, !1), m = j(v, "className", 8, "");
  const z = ce();
  function F(s) {
    z("close", { event: s });
  }
  se(() => {
  }, () => {
    x(l, {
      info: "bg-[var(--zabi-info-light)] text-[var(--zabi-info-dark)] border border-[var(--zabi-info)]",
      success: "bg-[var(--zabi-success-light)] text-[var(--zabi-success-dark)] border border-[var(--zabi-success)]",
      warning: "bg-[var(--zabi-warning-light)] text-[var(--zabi-warning-dark)] border border-[var(--zabi-warning)]",
      error: "bg-[var(--zabi-error-light)] text-[var(--zabi-error-dark)] border border-[var(--zabi-error)]"
    });
  }), se(() => y(i()), () => {
    x(c, i() === "success" || i() === "info" ? "status" : "alert");
  }), se(() => {
  }, () => {
    x(w, {
      info: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>`,
      success: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>`,
      warning: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>`,
      error: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>`
    });
  }), ye(), ie();
  var $ = Ye(), E = o($);
  {
    var O = (s) => {
      var n = We();
      te("click", n, F), d(s, n);
    };
    M(E, (s) => {
      t() && s(O);
    });
  }
  var W = k(E, 2), h = o(W), T = o(h);
  Ne(T, () => (e(w), y(i()), r(() => e(w)[i()])));
  var U = k(h, 2), q = o(U);
  {
    var B = (s) => {
      var n = Ge(), p = o(n);
      I(() => Z(p, D())), d(s, n);
    };
    M(q, (s) => {
      D() && s(B);
    });
  }
  var Y = k(q, 2);
  {
    var f = (s) => {
      var n = Qe(), p = o(n);
      I(() => Z(p, g())), d(s, n);
    };
    M(Y, (s) => {
      g() && s(f);
    });
  }
  var a = k(Y, 2);
  fe(a, v, "default", {}, null), I(() => {
    ee($, 1, `relative rounded-md p-4 border ${e(l), y(i()), r(() => e(l)[i()]) ?? ""} transition-all duration-200 motion-reduce:transition-none ${m() ?? ""}`), H($, "role", e(c)), H($, "aria-live", i() === "success" || i() === "info" ? "polite" : "assertive"), ee(W, 1, `flex items-start gap-3 ${t() ? "pr-8" : ""}`);
  }), d(N, $), oe();
}
var Ze = _('<button type="button" class="text-tertiary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1 transition-colors" aria-label="Close dialog"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>'), Je = _('<div class="flex items-center justify-end gap-3 p-6 border-t border-primary bg-surface-secondary"><!></div>'), Xe = _('<div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-modal-backdrop flex items-center justify-center p-4" role="presentation" tabindex="-1"><div class="bg-surface-elevated rounded-xl shadow-adaptive-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-primary focus:outline-none" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabindex="-1"><div class="flex items-center justify-between p-6 border-b border-primary"><h2 id="dialog-title" class="text-xl font-semibold text-primary"> </h2> <!></div> <div class="p-6 text-primary"><!></div> <!></div></div>');
function et(N, v) {
  const l = Te(v);
  ve(v, !1);
  let c = j(v, "isOpen", 12, !1), w = j(v, "title", 8, ""), i = j(v, "showCloseButton", 8, !0);
  const D = ce();
  let g = K(), t = K(null);
  function m() {
    c(!1), D("close");
  }
  function z(h) {
    h.target === h.currentTarget && m();
  }
  function F(h) {
    h.key === "Escape" && m();
  }
  function $(h) {
    var B;
    if (!c()) return;
    const T = (B = e(g)) == null ? void 0 : B.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!T.length) return;
    const U = T[0], q = T[T.length - 1];
    h.key === "Tab" && (h.shiftKey ? document.activeElement === U && (h.preventDefault(), q.focus()) : document.activeElement === q && (h.preventDefault(), U.focus()));
  }
  Ie(() => () => {
    e(t) && e(t).focus();
  }), se(() => (y(c()), e(g)), () => {
    c() && (x(t, document.activeElement), setTimeout(
      () => {
        var T;
        const h = (T = e(g)) == null ? void 0 : T.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        h == null || h.focus();
      },
      0
    ));
  }), ye(), ie();
  var E = re(), O = J(E);
  {
    var W = (h) => {
      var T = Xe(), U = o(T), q = o(U), B = o(q), Y = o(B), f = k(B, 2);
      {
        var a = (u) => {
          var b = Ze();
          te("click", b, m), d(u, b);
        };
        M(f, (u) => {
          i() && u(a);
        });
      }
      var s = k(q, 2), n = o(s);
      fe(n, v, "default", {}, null);
      var p = k(s, 2);
      {
        var S = (u) => {
          var b = Je(), L = o(b);
          fe(L, v, "footer", {}, null), d(u, b);
        };
        M(p, (u) => {
          r(() => l.footer) && u(S);
        });
      }
      he(U, (u) => x(g, u), () => e(g)), I(() => Z(Y, w())), te("keydown", U, (u) => $(u)), te("click", T, z), te("keydown", T, (u) => F(u)), d(h, T);
    };
    M(O, (h) => {
      c() && h(W);
    });
  }
  d(N, E), oe();
}
var tt = _('<div class="relative group"><img alt="" class="w-full h-32 object-cover rounded-lg border border-stone-600"/> <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"><div class="flex gap-2"><!> <!></div></div></div>'), at = _('<div class="border-2 border-dashed border-stone-600 rounded-lg p-6 text-center hover:border-stone-500 transition-colors"><div class="space-y-3"><div class="w-12 h-12 mx-auto bg-stone-700 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div> <div><p class="text-stone-300 font-medium"> </p> <p class="text-stone-500 text-sm">Choose a file to upload</p></div> <div class="flex gap-2 justify-center"><!></div></div></div>'), rt = _('<div class="space-y-3"><div class="text-sm font-medium text-stone-300">Choose File</div> <input type="file" class="block w-full text-sm text-stone-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-900/30 file:text-blue-300 hover:file:bg-blue-900/50"/> <p class="text-xs text-stone-500"> </p></div>'), st = _('<img alt="Preview" class="w-full h-48 object-cover rounded-lg border border-stone-600"/>'), lt = _('<div class="w-full h-48 bg-stone-700 rounded-lg border border-stone-600 flex items-center justify-center"><div class="text-center"><svg class="w-12 h-12 text-stone-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> <p class="text-stone-300 text-sm"> </p></div></div>'), nt = _('<div class="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg"><div class="text-center"><div class="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div> <p class="text-white text-sm">Uploading...</p></div></div>'), it = _('<div class="space-y-2"><div class="flex justify-between text-sm text-stone-400"><span>Uploading...</span> <span> </span></div> <div class="w-full bg-stone-700 rounded-full h-2"><div class="bg-blue-500 h-2 rounded-full transition-all duration-300"></div></div></div>'), ot = _('<div class="space-y-4"><div class="relative"><!> <!></div> <!></div>'), vt = _('<div class="space-y-4"><!></div>'), ct = _("<!> <!>", 1), dt = _('<div class="space-y-3"><!> <!></div>');
function $t(N, v) {
  ve(v, !1);
  let l = j(v, "value", 12, null), c = j(v, "disabled", 8, !1), w = j(v, "accept", 8, "image/*"), i = j(
    v,
    "maxSize",
    8,
    5 * 1024 * 1024
    // 5MB default
  ), D = j(v, "placeholder", 8, "No image selected");
  const g = ce();
  let t = K(!1), m = K(null), z = K(null), F = K(!1), $ = K(0);
  function E(a) {
    const s = a.target;
    if (!s.files || s.files.length === 0) return;
    const n = s.files, p = n[0];
    if (p.size > i()) {
      g("error", {
        message: `File size must be less than ${Math.round(i() / 1024 / 1024)}MB`
      });
      return;
    }
    if (w() !== "*" && !p.type.match(w().replace("*", ".*"))) {
      g("error", { message: "Please select a valid file type" });
      return;
    }
    x(m, p), x(z, URL.createObjectURL(p)), g("upload", { files: n });
  }
  async function O() {
    if (!(!e(m) || !e(z))) {
      x(F, !0), x($, 0);
      try {
        const a = setInterval(
          () => {
            e($) < 90 && x($, e($) + Math.random() * 10);
          },
          200
        );
        await new Promise((s) => setTimeout(s, 1e3)), clearInterval(a), x($, 100), l(e(z)), g("change", { value: e(z) }), x(t, !1), h();
      } catch (a) {
        g("error", { message: `Upload failed: ${a}` });
      } finally {
        x(F, !1), x($, 0);
      }
    }
  }
  function W() {
    l(null), g("change", { value: null });
  }
  function h() {
    x(m, null), e(z) && (URL.revokeObjectURL(e(z)), x(z, null)), x($, 0);
  }
  function T() {
    e(z) && (URL.revokeObjectURL(e(z)), x(z, null));
  }
  Se(() => {
    T();
  }), ie();
  var U = dt(), q = o(U);
  {
    var B = (a) => {
      var s = tt(), n = o(s), p = k(n, 2), S = o(p), u = o(S);
      ne(u, {
        variant: "secondary",
        size: "sm",
        get disabled() {
          return c();
        },
        $$events: { click: () => x(t, !0) },
        children: (L, A) => {
          var R = le("Change");
          d(L, R);
        },
        $$slots: { default: !0 }
      });
      var b = k(u, 2);
      ne(b, {
        variant: "danger",
        size: "sm",
        get disabled() {
          return c();
        },
        $$events: { click: W },
        children: (L, A) => {
          var R = le("Remove");
          d(L, R);
        },
        $$slots: { default: !0 }
      }), I(() => H(n, "src", l())), d(a, s);
    }, Y = (a) => {
      var s = at(), n = o(s), p = k(o(n), 2), S = o(p), u = o(S), b = k(p, 2), L = o(b);
      ne(L, {
        variant: "primary",
        size: "sm",
        get disabled() {
          return c();
        },
        $$events: { click: () => x(t, !0) },
        children: (A, R) => {
          var V = le("Upload File");
          d(A, V);
        },
        $$slots: { default: !0 }
      }), I(() => Z(u, D())), d(a, s);
    };
    M(q, (a) => {
      l() ? a(B) : a(Y, !1);
    });
  }
  var f = k(q, 2);
  et(f, {
    title: "Upload File",
    get isOpen() {
      return e(t);
    },
    set isOpen(a) {
      x(t, a);
    },
    $$events: {
      close: () => {
        x(t, !1), h();
      }
    },
    children: (a, s) => {
      var n = vt(), p = o(n);
      {
        var S = (b) => {
          var L = rt(), A = k(o(L), 2), R = k(A, 2), V = o(R);
          I(
            (C) => {
              H(A, "accept", w()), Z(V, `Max size: ${C ?? ""}MB`);
            },
            [
              () => (y(i()), r(() => Math.round(i() / 1024 / 1024)))
            ]
          ), te("change", A, E), d(b, L);
        }, u = (b) => {
          var L = ot(), A = o(L), R = o(A);
          {
            var V = (P) => {
              var Q = st();
              I(() => H(Q, "src", e(z))), d(P, Q);
            }, C = (P) => {
              var Q = lt(), de = o(Q), ge = k(o(de), 2), be = o(ge);
              I(() => Z(be, (e(m), r(() => e(m).name)))), d(P, Q);
            };
            M(R, (P) => {
              e(m), r(() => e(m).type.startsWith("image/")) ? P(V) : P(C, !1);
            });
          }
          var G = k(R, 2);
          {
            var ae = (P) => {
              var Q = nt();
              d(P, Q);
            };
            M(G, (P) => {
              e(F) && P(ae);
            });
          }
          var pe = k(A, 2);
          {
            var X = (P) => {
              var Q = it(), de = o(Q), ge = k(o(de), 2), be = o(ge), ke = k(de, 2), we = o(ke);
              I(
                (ze) => {
                  Z(be, `${ze ?? ""}%`), Ue(we, `width: ${e($) ?? ""}%`);
                },
                [
                  () => (e($), r(() => Math.round(e($))))
                ]
              ), d(P, Q);
            };
            M(pe, (P) => {
              e(F) && P(X);
            });
          }
          d(b, L);
        };
        M(p, (b) => {
          e(m) ? b(u, !1) : b(S);
        });
      }
      d(a, n);
    },
    $$slots: {
      default: !0,
      footer: (a, s) => {
        var n = ct(), p = J(n);
        ne(p, {
          variant: "secondary",
          $$events: {
            click: () => {
              x(t, !1), h();
            }
          },
          children: (b, L) => {
            var A = le("Cancel");
            d(b, A);
          },
          $$slots: { default: !0 }
        });
        var S = k(p, 2);
        {
          var u = (b) => {
            ne(b, {
              variant: "primary",
              get disabled() {
                return e(F);
              },
              get loading() {
                return e(F);
              },
              $$events: { click: O },
              children: (L, A) => {
                var R = le();
                I(() => Z(R, e(F) ? "Uploading..." : "Upload File")), d(L, R);
              },
              $$slots: { default: !0 }
            });
          };
          M(S, (b) => {
            e(m) && b(u);
          });
        }
        d(a, n);
      }
    },
    $$legacy: !0
  }), d(N, U), oe();
}
var ut = _("<div><!></div>"), ft = _('<div class="flex flex-wrap gap-4"></div>');
function Ct(N, v) {
  ve(v, !1);
  let l = j(v, "values", 28, () => ({})), c = j(v, "fields", 24, () => []);
  const w = ce();
  function i(g) {
    const t = g.detail;
    t && typeof t == "object" && w("input", { value: t });
  }
  ie();
  var D = ft();
  xe(D, 5, c, (g) => g.key, (g, t) => {
    var m = ut(), z = o(m);
    {
      var F = (E) => {
        {
          let O = me(() => (e(t), r(() => e(t).rows || 3)));
          Ae(E, {
            get label() {
              return e(t), r(() => e(t).label);
            },
            get placeholder() {
              return e(t), r(() => e(t).placeholder);
            },
            get rows() {
              return e(O);
            },
            get required() {
              return e(t), r(() => e(t).required);
            },
            size: "sm",
            variant: "filled",
            get value() {
              return l()[e(t).key];
            },
            set value(W) {
              l(l()[e(t).key] = W, !0);
            },
            $$events: { input: i, change: i },
            $$legacy: !0
          });
        }
      }, $ = (E) => {
        var O = re(), W = J(O);
        {
          var h = (U) => {
            {
              let q = me(() => (e(t), r(() => e(t).options || [])));
              Fe(U, {
                get options() {
                  return e(q);
                },
                get label() {
                  return e(t), r(() => e(t).label);
                },
                get placeholder() {
                  return e(t), r(() => e(t).placeholder);
                },
                get required() {
                  return e(t), r(() => e(t).required);
                },
                size: "sm",
                variant: "filled",
                get value() {
                  return l()[e(t).key];
                },
                set value(B) {
                  l(l()[e(t).key] = B, !0);
                },
                $$events: { input: i, change: i },
                $$legacy: !0
              });
            }
          }, T = (U) => {
            var q = re(), B = J(q);
            {
              var Y = (a) => {
                Re(a, {
                  get label() {
                    return e(t), r(() => e(t).label);
                  },
                  get required() {
                    return e(t), r(() => e(t).required);
                  },
                  size: "sm",
                  variant: "filled",
                  get checked() {
                    return l()[e(t).key];
                  },
                  set checked(s) {
                    l(l()[e(t).key] = s, !0);
                  },
                  $$events: { input: i, change: i },
                  $$legacy: !0
                });
              }, f = (a) => {
                var s = re(), n = J(s);
                {
                  var p = (u) => {
                    Oe(u, {
                      get label() {
                        return e(t), r(() => e(t).label);
                      },
                      get checked() {
                        return l()[e(t).key];
                      },
                      set checked(b) {
                        l(l()[e(t).key] = b, !0);
                      },
                      $$events: { input: i, change: i },
                      $$legacy: !0
                    });
                  }, S = (u) => {
                    var b = re(), L = J(b);
                    {
                      var A = (V) => {
                        Ve(V, {
                          get label() {
                            return e(t), r(() => e(t).label);
                          },
                          get required() {
                            return e(t), r(() => e(t).required);
                          },
                          size: "sm",
                          variant: "filled",
                          get value() {
                            return l()[e(t).key];
                          },
                          set value(C) {
                            l(l()[e(t).key] = C, !0);
                          },
                          $$events: { input: i, change: i },
                          $$legacy: !0
                        });
                      }, R = (V) => {
                        var C = re(), G = J(C);
                        {
                          var ae = (X) => {
                            He(X, {
                              get label() {
                                return e(t), r(() => e(t).label);
                              },
                              get required() {
                                return e(t), r(() => e(t).required);
                              },
                              size: "sm",
                              get value() {
                                return l()[e(t).key];
                              },
                              set value(P) {
                                l(l()[e(t).key] = P, !0);
                              },
                              $$events: { input: i, change: i },
                              $$legacy: !0
                            });
                          }, pe = (X) => {
                            {
                              let P = me(() => (e(t), r(() => e(t).type || "text")));
                              Ke(X, {
                                get type() {
                                  return e(P);
                                },
                                get label() {
                                  return e(t), r(() => e(t).label);
                                },
                                get placeholder() {
                                  return e(t), r(() => e(t).placeholder);
                                },
                                get required() {
                                  return e(t), r(() => e(t).required);
                                },
                                size: "sm",
                                variant: "filled",
                                get value() {
                                  return l()[e(t).key];
                                },
                                set value(Q) {
                                  l(l()[e(t).key] = Q, !0);
                                },
                                $$events: { input: i, change: i },
                                $$legacy: !0
                              });
                            }
                          };
                          M(
                            G,
                            (X) => {
                              e(t), r(() => e(t).type === "textalignment") ? X(ae) : X(pe, !1);
                            },
                            !0
                          );
                        }
                        d(V, C);
                      };
                      M(
                        L,
                        (V) => {
                          e(t), r(() => e(t).type === "colorpicker") ? V(A) : V(R, !1);
                        },
                        !0
                      );
                    }
                    d(u, b);
                  };
                  M(
                    n,
                    (u) => {
                      e(t), r(() => e(t).type === "toggle") ? u(p) : u(S, !1);
                    },
                    !0
                  );
                }
                d(a, s);
              };
              M(
                B,
                (a) => {
                  e(t), r(() => e(t).type === "checkbox") ? a(Y) : a(f, !1);
                },
                !0
              );
            }
            d(U, q);
          };
          M(
            W,
            (U) => {
              e(t), r(() => e(t).type === "select") ? U(h) : U(T, !1);
            },
            !0
          );
        }
        d(E, O);
      };
      M(z, (E) => {
        e(t), r(() => e(t).type === "textarea") ? E(F) : E($, !1);
      });
    }
    I(() => ee(m, 1, `flex-${e(t), r(() => e(t).flex === "full" ? "none" : e(t).flex || "1") ?? ""} ${e(t), r(() => e(t).type === "textarea" || e(t).key === "title" || e(t).key === "subtitle" || e(t).flex === "full" ? "w-full" : "w-full sm:w-auto sm:flex-1") ?? ""} min-w-0 ${e(t), r(() => e(t).type === "toggle" ? "flex items-center justify-center" : "") ?? ""}`)), d(g, m);
  }), d(N, D), oe();
}
var pt = Le('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" class="svelte-fn6h9a"></path></svg>'), gt = _(`<span class="
                        ml-1 px-1.5 py-0.5 text-xs font-medium
                        bg-primary-100 text-primary-800 rounded-full
                        dark:bg-primary-900 dark:text-primary-200
                     svelte-fn6h9a"> </span>`), bt = _('<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full svelte-fn6h9a"></div>'), mt = _('<button type="button" role="tab"><!> <span class="svelte-fn6h9a"> </span> <!></button> <!>', 1), ht = _('<div role="tabpanel"><!></div>'), xt = _('<div><div role="tablist" tabindex="0"></div> <div class="tab-panels svelte-fn6h9a"></div></div>');
const yt = {
  hash: "svelte-fn6h9a",
  code: `
    /* Focus styles for better accessibility */[role="tab"].svelte-fn6h9a:focus {outline:2px solid var(--color-primary-500);outline-offset:2px;}

    /* Smooth transitions */[role="tab"].svelte-fn6h9a {transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1);}

    /* Underline animation */.underline-indicator.svelte-fn6h9a {transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);}

    /* Badge animation */.tab-badge.svelte-fn6h9a {
        animation: svelte-fn6h9a-badge-pulse 2s infinite;}

    @keyframes svelte-fn6h9a-badge-pulse {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }

    /* Vertical tabs specific styles */.tabs-container.vertical.svelte-fn6h9a {align-items:flex-start;}.tabs-container.vertical.svelte-fn6h9a [role="tablist"]:where(.svelte-fn6h9a) {min-width:200px;}.tabs-container.vertical.svelte-fn6h9a [role="tab"]:where(.svelte-fn6h9a) {justify-content:flex-start;text-align:left;}`
};
function jt(N, v) {
  ve(v, !1), qe(N, yt);
  let l = j(v, "tabs", 24, () => []), c = j(v, "activeTab", 12, ""), w = j(v, "variant", 8, "default"), i = j(v, "size", 8, "md"), D = j(v, "orientation", 8, "horizontal"), g = j(v, "fullWidth", 8, !1), t = j(v, "className", 8, "");
  const m = ce();
  let z = K(), F = K(), $ = K(0);
  const E = {
    sm: { tab: "px-3 py-1.5 text-sm", panel: "p-3", icon: "w-4 h-4" },
    md: { tab: "px-4 py-2 text-base", panel: "p-4", icon: "w-5 h-5" },
    lg: { tab: "px-6 py-3 text-lg", panel: "p-6", icon: "w-6 h-6" }
  }, O = {
    default: {
      container: "border-b border-primary",
      tab: "border-b-2 border-transparent text-secondary hover:text-primary hover:border-primary-hover transition-colors",
      activeTab: "border-primary text-primary",
      panel: "mt-4"
    },
    pills: {
      container: "bg-surface-secondary p-1 rounded-lg",
      tab: "rounded-md text-secondary hover:text-primary hover:bg-surface-tertiary transition-colors",
      activeTab: "bg-surface text-primary shadow-adaptive-sm",
      panel: "mt-4"
    },
    underline: {
      container: "border-b border-primary",
      tab: "relative text-secondary hover:text-primary transition-colors",
      activeTab: "text-primary",
      panel: "mt-4"
    },
    cards: {
      container: "space-y-2",
      tab: "border border-primary rounded-lg text-secondary hover:text-primary hover:bg-surface-secondary transition-colors",
      activeTab: "bg-surface text-primary shadow-adaptive-sm border-primary",
      panel: "mt-4"
    }
  };
  function W(f, a) {
    if (f.disabled) {
      a.preventDefault();
      return;
    }
    c(f.id), m("change", { activeTab: c(), tab: f }), m("tabClick", { tab: f, event: a });
  }
  function h(f) {
    if (!e(z)) return;
    const a = Array.from(e(z).querySelectorAll('[role="tab"]')), s = a.findIndex((p) => p === document.activeElement);
    let n = s;
    switch (f.key) {
      case "ArrowRight":
      case "ArrowDown":
        f.preventDefault(), n = (s + 1) % a.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        f.preventDefault(), n = s === 0 ? a.length - 1 : s - 1;
        break;
      case "Home":
        f.preventDefault(), n = 0;
        break;
      case "End":
        f.preventDefault(), n = a.length - 1;
        break;
      case "Enter":
      case " ":
        f.preventDefault();
        const p = a[s];
        p && p.click();
        return;
    }
    n !== s && a[n] && a[n].focus();
  }
  function T(f) {
    var s;
    const a = (s = e(z)) == null ? void 0 : s.querySelector(`[data-tab-id="${f}"]`);
    a == null || a.focus();
  }
  se(() => (y(l()), y(c())), () => {
    l().length > 0 && !c() && c(l()[0].id);
  }), se(() => (y(l()), y(c())), () => {
    x($, l().findIndex((f) => f.id === c()));
  }), ye();
  var U = { focusTab: T };
  ie();
  var q = xt(), B = o(q);
  xe(B, 5, l, _e, (f, a) => {
    var s = mt(), n = J(s), p = o(n);
    {
      var S = (C) => {
        var G = pt(), ae = o(G);
        I(() => {
          ee(
            G,
            0,
            De((y(i()), r(() => E[i()].icon))),
            "svelte-fn6h9a"
          ), H(ae, "d", (e(a), r(() => e(a).icon)));
        }), d(C, G);
      };
      M(p, (C) => {
        e(a), r(() => e(a).icon) && C(S);
      });
    }
    var u = k(p, 2), b = o(u), L = k(u, 2);
    {
      var A = (C) => {
        var G = gt(), ae = o(G);
        I(() => Z(ae, (e(a), r(() => e(a).badge)))), d(C, G);
      };
      M(L, (C) => {
        e(a), r(() => e(a).badge) && C(A);
      });
    }
    var R = k(n, 2);
    {
      var V = (C) => {
        var G = bt();
        d(C, G);
      };
      M(R, (C) => {
        y(w()), e(a), y(c()), r(() => w() === "underline" && e(a).id === c()) && C(V);
      });
    }
    I(() => {
      H(n, "data-tab-id", (e(a), r(() => e(a).id))), ee(
        n,
        1,
        `
                    ${y(i()), r(() => E[i()].tab) ?? ""}
                    ${y(w()), r(() => O[w()].tab) ?? ""}
                    ${e(a), y(c()), y(w()), r(() => e(a).id === c() ? O[w()].activeTab : "") ?? ""}
                    ${e(a), r(() => e(a).disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer") ?? ""}
                    ${g() ? "flex-1" : ""}
                    flex items-center justify-center gap-2
                `,
        "svelte-fn6h9a"
      ), H(n, "aria-selected", (e(a), y(c()), r(() => e(a).id === c()))), H(n, "aria-controls", `tabpanel-${e(a), r(() => e(a).id) ?? ""}`), H(n, "aria-disabled", (e(a), r(() => e(a).disabled))), H(n, "tabindex", (e(a), y(c()), r(() => e(a).id === c() ? 0 : -1))), Z(b, (e(a), r(() => e(a).label)));
    }), te("click", n, (C) => W(e(a), C)), d(f, s);
  }), he(B, (f) => x(z, f), () => e(z));
  var Y = k(B, 2);
  return xe(Y, 5, l, _e, (f, a) => {
    var s = ht(), n = o(s);
    {
      var p = (S) => {
        var u = re(), b = J(u);
        fe(b, v, "content", {}, null), d(S, u);
      };
      M(n, (S) => {
        e(a), y(c()), r(() => e(a).id === c()) && S(p);
      });
    }
    I(() => {
      H(s, "id", `tabpanel-${e(a), r(() => e(a).id) ?? ""}`), H(s, "aria-labelledby", `tab-${e(a), r(() => e(a).id) ?? ""}`), ee(
        s,
        1,
        `
                    ${y(i()), r(() => E[i()].panel) ?? ""}
                    ${y(w()), r(() => O[w()].panel) ?? ""}
                    ${e(a), y(c()), r(() => e(a).id === c() ? "block" : "hidden") ?? ""}
                `,
        "svelte-fn6h9a"
      );
    }), Ee(3, s, () => Pe, () => ({ duration: 200 })), d(f, s);
  }), he(Y, (f) => x(F, f), () => e(F)), I(() => {
    ee(q, 1, `tabs-container ${D() === "vertical" ? "flex" : ""} ${t() ?? ""}`, "svelte-fn6h9a"), ee(
      B,
      1,
      `
            ${y(w()), r(() => O[w()].container) ?? ""}
            ${D() === "vertical" ? "flex-col space-y-1 mr-4" : ""}
            ${y(g()), y(l()), r(() => g() ? "grid grid-cols-" + l().length : "flex") ?? ""}
        `,
      "svelte-fn6h9a"
    ), H(B, "aria-orientation", D());
  }), te("keydown", B, (f) => h(f)), d(N, q), Be(v, "focusTab", T), oe(U);
}
export {
  zt as A,
  $t as I,
  Ct as K,
  et as M,
  jt as T
};
