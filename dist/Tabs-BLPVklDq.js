import { t as I, Q as $e, R as Ce, S as je, T as Me, U as ue, p as T, C as se, D as ye, i as oe, f as k, c as E, s as fe, g as d, h as ie, j as ve, r as _, o as z, n as i, u as r, l as e, m as N, q as ee, v as H, k as h, e as te, B as Z, V as Te, w as re, b as J, d as he, W as ne, P as Ee, E as xe, Y as me, a as Ue, G as qe, Z as _e, x as Be, F as Le, y as De, A as Pe } from "./x-DpVwziig.js";
import { p as Ie, B as le, T as Se, S as Ae, C as Fe, c as Re, a as Oe, b as Ve, I as Ke } from "./Toggle-Dxc1W5Uc.js";
import { createEventDispatcher as ce, onMount as He, onDestroy as Ne } from "svelte";
function We(W, v, n = !1, c = !1, $ = !1) {
  var o = W, L = "";
  I(() => {
    var u = (
      /** @type {Effect} */
      $e
    );
    if (L !== (L = v() ?? "") && (u.nodes_start !== null && (Ce(
      u.nodes_start,
      /** @type {TemplateNode} */
      u.nodes_end
    ), u.nodes_start = u.nodes_end = null), L !== "")) {
      var t = L + "";
      n ? t = `<svg>${t}</svg>` : c && (t = `<math>${t}</math>`);
      var f = je(t);
      if ((n || c) && (f = /** @type {Element} */
      ue(f)), Me(
        /** @type {TemplateNode} */
        ue(f),
        /** @type {TemplateNode} */
        f.lastChild
      ), n || c)
        for (; ue(f); )
          o.before(
            /** @type {Node} */
            ue(f)
          );
      else
        o.before(f);
    }
  });
}
var Ge = k('<button class="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full text-secondary hover:text-primary transition-colors duration-200 motion-reduce:transition-none group focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2" aria-label="Dismiss alert" type="button"><svg class="w-4 h-4 text-current group-hover:scale-110 transition-transform duration-200 motion-reduce:transition-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>'), Qe = k('<h4 class="font-semibold text-sm mb-1"> </h4>'), Ye = k('<p class="text-sm leading-relaxed"> </p>'), Ze = k('<div aria-atomic="true"><!> <div><div class="flex-shrink-0 mt-0.5"><!></div> <div class="flex-1 min-w-0"><!> <!> <!></div></div></div>');
function $t(W, v) {
  ve(v, !1);
  const n = N(), c = N(), $ = N();
  let o = T(v, "variant", 8, "info"), L = T(v, "title", 8, ""), u = T(v, "message", 8, ""), t = T(v, "closable", 8, !1), f = T(v, "className", 8, "");
  const x = ce();
  function F(s) {
    x("close", { event: s });
  }
  se(() => {
  }, () => {
    h(n, {
      info: "bg-[var(--zabi-info-light)] text-[var(--zabi-info-dark)] border border-[var(--zabi-info)]",
      success: "bg-[var(--zabi-success-light)] text-[var(--zabi-success-dark)] border border-[var(--zabi-success)]",
      warning: "bg-[var(--zabi-warning-light)] text-[var(--zabi-warning-dark)] border border-[var(--zabi-warning)]",
      error: "bg-[var(--zabi-error-light)] text-[var(--zabi-error-dark)] border border-[var(--zabi-error)]"
    });
  }), se(() => _(o()), () => {
    h(c, o() === "success" || o() === "info" ? "status" : "alert");
  }), se(() => {
  }, () => {
    h($, {
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
  }), ye(), oe();
  var C = Ze(), D = i(C);
  {
    var O = (s) => {
      var l = Ge();
      te("click", l, Ie(F)), d(s, l);
    };
    E(D, (s) => {
      t() && s(O);
    });
  }
  var G = z(D, 2), w = i(G), y = i(w);
  We(y, () => (e($), _(o()), r(() => e($)[o()])));
  var j = z(w, 2), U = i(j);
  {
    var q = (s) => {
      var l = Qe(), g = i(l);
      I(() => Z(g, L())), d(s, l);
    };
    E(U, (s) => {
      L() && s(q);
    });
  }
  var V = z(U, 2);
  {
    var p = (s) => {
      var l = Ye(), g = i(l);
      I(() => Z(g, u())), d(s, l);
    };
    E(V, (s) => {
      u() && s(p);
    });
  }
  var a = z(V, 2);
  fe(a, v, "default", {}, null), I(() => {
    ee(C, 1, `relative rounded-md p-4 border ${e(n), _(o()), r(() => e(n)[o()]) ?? ""} transition-all duration-200 motion-reduce:transition-none ${f() ?? ""}`), H(C, "role", e(c)), H(C, "aria-live", o() === "success" || o() === "info" ? "polite" : "assertive"), ee(G, 1, `flex items-start gap-3 ${t() ? "pr-8" : ""}`);
  }), d(W, C), ie();
}
var Je = k('<button type="button" class="text-tertiary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1 transition-colors" aria-label="Close dialog"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>'), Xe = k('<div class="flex items-center justify-end gap-3 p-6 border-t border-primary bg-surface-secondary"><!></div>'), et = k('<div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-modal-backdrop flex items-center justify-center p-4" role="presentation" tabindex="-1"><div class="bg-surface-elevated rounded-xl shadow-adaptive-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-primary focus:outline-none" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabindex="-1"><div class="flex items-center justify-between p-6 border-b border-primary"><h2 id="dialog-title" class="text-xl font-semibold text-primary"> </h2> <!></div> <div class="p-6 text-primary"><!></div> <!></div></div>');
function tt(W, v) {
  const n = Te(v);
  ve(v, !1);
  let c = T(v, "isOpen", 12, !1), $ = T(v, "title", 8, ""), o = T(v, "showCloseButton", 8, !0);
  const L = ce();
  let u = N(), t = N(null);
  function f() {
    c(!1), L("close", { event: new Event("close") });
  }
  function x(w) {
    const y = w;
    y.target === y.currentTarget && f();
  }
  function F(w) {
    w.key === "Escape" && f();
  }
  function C(w) {
    var V;
    if (!c()) return;
    const y = w, j = (V = e(u)) == null ? void 0 : V.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!j.length) return;
    const U = j[0], q = j[j.length - 1];
    y.key === "Tab" && (y.shiftKey ? document.activeElement === U && (y.preventDefault(), q.focus()) : document.activeElement === q && (y.preventDefault(), U.focus()));
  }
  He(() => () => {
    e(t) && e(t).focus();
  }), se(() => (_(c()), e(u)), () => {
    c() && (h(t, document.activeElement), setTimeout(
      () => {
        var y;
        const w = (y = e(u)) == null ? void 0 : y.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        w == null || w.focus();
      },
      0
    ));
  }), ye(), oe();
  var D = re(), O = J(D);
  {
    var G = (w) => {
      var y = et(), j = i(y), U = i(j), q = i(U), V = i(q), p = z(q, 2);
      {
        var a = (b) => {
          var m = Je();
          te("click", m, f), d(b, m);
        };
        E(p, (b) => {
          o() && b(a);
        });
      }
      var s = z(U, 2), l = i(s);
      fe(l, v, "default", {}, null);
      var g = z(s, 2);
      {
        var S = (b) => {
          var m = Xe(), B = i(m);
          fe(B, v, "footer", {}, null), d(b, m);
        };
        E(g, (b) => {
          r(() => n.footer) && b(S);
        });
      }
      he(j, (b) => h(u, b), () => e(u)), I(() => Z(V, $())), te("keydown", j, C), te("click", y, x), te("keydown", y, F), d(w, y);
    };
    E(O, (w) => {
      c() && w(G);
    });
  }
  d(W, D), ie();
}
var at = k('<div class="relative group"><img alt="" class="w-full h-32 object-cover rounded-lg border border-stone-600"/> <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"><div class="flex gap-2"><!> <!></div></div></div>'), rt = k('<div class="border-2 border-dashed border-stone-600 rounded-lg p-6 text-center hover:border-stone-500 transition-colors"><div class="space-y-3"><div class="w-12 h-12 mx-auto bg-stone-700 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div> <div><p class="text-stone-300 font-medium"> </p> <p class="text-stone-500 text-sm">Choose a file to upload</p></div> <div class="flex gap-2 justify-center"><!></div></div></div>'), st = k('<div class="space-y-3"><div class="text-sm font-medium text-stone-300">Choose File</div> <input type="file" class="block w-full text-sm text-stone-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-900/30 file:text-blue-300 hover:file:bg-blue-900/50"/> <p class="text-xs text-stone-500"> </p></div>'), nt = k('<img alt="Preview" class="w-full h-48 object-cover rounded-lg border border-stone-600"/>'), lt = k('<div class="w-full h-48 bg-stone-700 rounded-lg border border-stone-600 flex items-center justify-center"><div class="text-center"><svg class="w-12 h-12 text-stone-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> <p class="text-stone-300 text-sm"> </p></div></div>'), ot = k('<div class="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg"><div class="text-center"><div class="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div> <p class="text-white text-sm">Uploading...</p></div></div>'), it = k('<div class="space-y-2"><div class="flex justify-between text-sm text-stone-400"><span>Uploading...</span> <span> </span></div> <div class="w-full bg-stone-700 rounded-full h-2"><div class="bg-blue-500 h-2 rounded-full transition-all duration-300"></div></div></div>'), vt = k('<div class="space-y-4"><div class="relative"><!> <!></div> <!></div>'), ct = k('<div class="space-y-4"><!></div>'), dt = k("<!> <!>", 1), ut = k('<div class="space-y-3"><!> <!></div>');
function Ct(W, v) {
  ve(v, !1);
  let n = T(v, "value", 12, null), c = T(v, "disabled", 8, !1), $ = T(v, "accept", 8, "image/*"), o = T(
    v,
    "maxSize",
    8,
    5 * 1024 * 1024
    // 5MB default
  ), L = T(v, "placeholder", 8, "No image selected");
  const u = ce();
  let t = N(!1), f = N(null), x = N(null), F = N(!1), C = N(0);
  function D(a) {
    const s = a.target;
    if (!s.files || s.files.length === 0) return;
    const l = s.files, g = l[0];
    if (g.size > o()) {
      u("error", {
        message: `File size must be less than ${Math.round(o() / 1024 / 1024)}MB`
      });
      return;
    }
    if ($() !== "*" && !g.type.match($().replace("*", ".*"))) {
      u("error", { message: "Please select a valid file type" });
      return;
    }
    h(f, g), h(x, URL.createObjectURL(g)), u("upload", { files: l });
  }
  async function O() {
    if (!(!e(f) || !e(x))) {
      h(F, !0), h(C, 0);
      try {
        const a = setInterval(
          () => {
            e(C) < 90 && h(C, e(C) + Math.random() * 10);
          },
          200
        );
        await new Promise((s) => setTimeout(s, 1e3)), clearInterval(a), h(C, 100), n(e(x)), u("change", { value: e(x) }), h(t, !1), w();
      } catch (a) {
        u("error", { message: `Upload failed: ${a}` });
      } finally {
        h(F, !1), h(C, 0);
      }
    }
  }
  function G() {
    n(null), u("change", { value: null });
  }
  function w() {
    h(f, null), e(x) && (URL.revokeObjectURL(e(x)), h(x, null)), h(C, 0);
  }
  function y() {
    e(x) && (URL.revokeObjectURL(e(x)), h(x, null));
  }
  Ne(() => {
    y();
  }), oe();
  var j = ut(), U = i(j);
  {
    var q = (a) => {
      var s = at(), l = i(s), g = z(l, 2), S = i(g), b = i(S);
      le(b, {
        variant: "secondary",
        size: "sm",
        get disabled() {
          return c();
        },
        $$events: { click: () => h(t, !0) },
        children: (B, A) => {
          var R = ne("Change");
          d(B, R);
        },
        $$slots: { default: !0 }
      });
      var m = z(b, 2);
      le(m, {
        variant: "danger",
        size: "sm",
        get disabled() {
          return c();
        },
        $$events: { click: G },
        children: (B, A) => {
          var R = ne("Remove");
          d(B, R);
        },
        $$slots: { default: !0 }
      }), I(() => H(l, "src", n())), d(a, s);
    }, V = (a) => {
      var s = rt(), l = i(s), g = z(i(l), 2), S = i(g), b = i(S), m = z(g, 2), B = i(m);
      le(B, {
        variant: "primary",
        size: "sm",
        get disabled() {
          return c();
        },
        $$events: { click: () => h(t, !0) },
        children: (A, R) => {
          var K = ne("Upload File");
          d(A, K);
        },
        $$slots: { default: !0 }
      }), I(() => Z(b, L())), d(a, s);
    };
    E(U, (a) => {
      n() ? a(q) : a(V, !1);
    });
  }
  var p = z(U, 2);
  tt(p, {
    title: "Upload File",
    get isOpen() {
      return e(t);
    },
    set isOpen(a) {
      h(t, a);
    },
    $$events: {
      close: () => {
        h(t, !1), w();
      }
    },
    children: (a, s) => {
      var l = ct(), g = i(l);
      {
        var S = (m) => {
          var B = st(), A = z(i(B), 2), R = z(A, 2), K = i(R);
          I(
            (M) => {
              H(A, "accept", $()), Z(K, `Max size: ${M ?? ""}MB`);
            },
            [
              () => (_(o()), r(() => Math.round(o() / 1024 / 1024)))
            ]
          ), te("change", A, D), d(m, B);
        }, b = (m) => {
          var B = vt(), A = i(B), R = i(A);
          {
            var K = (P) => {
              var Y = nt();
              I(() => H(Y, "src", e(x))), d(P, Y);
            }, M = (P) => {
              var Y = lt(), de = i(Y), ge = z(i(de), 2), be = i(ge);
              I(() => Z(be, (e(f), r(() => e(f).name)))), d(P, Y);
            };
            E(R, (P) => {
              e(f), r(() => e(f).type.startsWith("image/")) ? P(K) : P(M, !1);
            });
          }
          var Q = z(R, 2);
          {
            var ae = (P) => {
              var Y = ot();
              d(P, Y);
            };
            E(Q, (P) => {
              e(F) && P(ae);
            });
          }
          var pe = z(A, 2);
          {
            var X = (P) => {
              var Y = it(), de = i(Y), ge = z(i(de), 2), be = i(ge), ke = z(de, 2), we = i(ke);
              I(
                (ze) => {
                  Z(be, `${ze ?? ""}%`), Ee(we, `width: ${e(C) ?? ""}%`);
                },
                [
                  () => (e(C), r(() => Math.round(e(C))))
                ]
              ), d(P, Y);
            };
            E(pe, (P) => {
              e(F) && P(X);
            });
          }
          d(m, B);
        };
        E(g, (m) => {
          e(f) ? m(b, !1) : m(S);
        });
      }
      d(a, l);
    },
    $$slots: {
      default: !0,
      footer: (a, s) => {
        var l = dt(), g = J(l);
        le(g, {
          variant: "secondary",
          $$events: {
            click: () => {
              h(t, !1), w();
            }
          },
          children: (m, B) => {
            var A = ne("Cancel");
            d(m, A);
          },
          $$slots: { default: !0 }
        });
        var S = z(g, 2);
        {
          var b = (m) => {
            le(m, {
              variant: "primary",
              get disabled() {
                return e(F);
              },
              get loading() {
                return e(F);
              },
              $$events: { click: O },
              children: (B, A) => {
                var R = ne();
                I(() => Z(R, e(F) ? "Uploading..." : "Upload File")), d(B, R);
              },
              $$slots: { default: !0 }
            });
          };
          E(S, (m) => {
            e(f) && m(b);
          });
        }
        d(a, l);
      }
    },
    $$legacy: !0
  }), d(W, j), ie();
}
var ft = k("<div><!></div>"), pt = k('<div class="flex flex-wrap gap-4"></div>');
function jt(W, v) {
  ve(v, !1);
  let n = T(v, "values", 28, () => ({})), c = T(v, "fields", 24, () => []);
  const $ = ce();
  function o(u) {
    var f;
    const t = u.detail;
    if (t && typeof t == "object") {
      const x = ((f = u.target) == null ? void 0 : f.name) || "unknown";
      $("change", {
        field: x,
        value: t,
        event: u.detail.event || new Event("change")
      });
    }
  }
  oe();
  var L = pt();
  xe(L, 5, c, (u) => u.key, (u, t) => {
    var f = ft(), x = i(f);
    {
      var F = (D) => {
        {
          let O = me(() => (e(t), r(() => e(t).rows || 3)));
          Se(D, {
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
            variant: "outlined",
            get value() {
              return n()[e(t).key];
            },
            set value(G) {
              n(n()[e(t).key] = G, !0);
            },
            $$events: { input: o, change: o },
            $$legacy: !0
          });
        }
      }, C = (D) => {
        var O = re(), G = J(O);
        {
          var w = (j) => {
            {
              let U = me(() => (e(t), r(() => e(t).options || [])));
              Ae(j, {
                get options() {
                  return e(U);
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
                variant: "outlined",
                get value() {
                  return n()[e(t).key];
                },
                set value(q) {
                  n(n()[e(t).key] = q, !0);
                },
                $$events: { input: o, change: o },
                $$legacy: !0
              });
            }
          }, y = (j) => {
            var U = re(), q = J(U);
            {
              var V = (a) => {
                Fe(a, {
                  get label() {
                    return e(t), r(() => e(t).label);
                  },
                  get required() {
                    return e(t), r(() => e(t).required);
                  },
                  size: "sm",
                  variant: "outlined",
                  get checked() {
                    return n()[e(t).key];
                  },
                  set checked(s) {
                    n(n()[e(t).key] = s, !0);
                  },
                  $$events: { input: o, change: o },
                  $$legacy: !0
                });
              }, p = (a) => {
                var s = re(), l = J(s);
                {
                  var g = (b) => {
                    Re(b, {
                      get label() {
                        return e(t), r(() => e(t).label);
                      },
                      get checked() {
                        return n()[e(t).key];
                      },
                      set checked(m) {
                        n(n()[e(t).key] = m, !0);
                      },
                      $$events: { input: o, change: o },
                      $$legacy: !0
                    });
                  }, S = (b) => {
                    var m = re(), B = J(m);
                    {
                      var A = (K) => {
                        Oe(K, {
                          get label() {
                            return e(t), r(() => e(t).label);
                          },
                          get required() {
                            return e(t), r(() => e(t).required);
                          },
                          size: "sm",
                          variant: "outlined",
                          get value() {
                            return n()[e(t).key];
                          },
                          set value(M) {
                            n(n()[e(t).key] = M, !0);
                          },
                          $$events: { input: o, change: o },
                          $$legacy: !0
                        });
                      }, R = (K) => {
                        var M = re(), Q = J(M);
                        {
                          var ae = (X) => {
                            Ve(X, {
                              get label() {
                                return e(t), r(() => e(t).label);
                              },
                              get required() {
                                return e(t), r(() => e(t).required);
                              },
                              size: "sm",
                              get value() {
                                return n()[e(t).key];
                              },
                              set value(P) {
                                n(n()[e(t).key] = P, !0);
                              },
                              $$events: { input: o, change: o },
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
                                variant: "default",
                                get value() {
                                  return n()[e(t).key];
                                },
                                set value(Y) {
                                  n(n()[e(t).key] = Y, !0);
                                },
                                $$events: { input: o, change: o },
                                $$legacy: !0
                              });
                            }
                          };
                          E(
                            Q,
                            (X) => {
                              e(t), r(() => e(t).type === "textalignment") ? X(ae) : X(pe, !1);
                            },
                            !0
                          );
                        }
                        d(K, M);
                      };
                      E(
                        B,
                        (K) => {
                          e(t), r(() => e(t).type === "colorpicker") ? K(A) : K(R, !1);
                        },
                        !0
                      );
                    }
                    d(b, m);
                  };
                  E(
                    l,
                    (b) => {
                      e(t), r(() => e(t).type === "toggle") ? b(g) : b(S, !1);
                    },
                    !0
                  );
                }
                d(a, s);
              };
              E(
                q,
                (a) => {
                  e(t), r(() => e(t).type === "checkbox") ? a(V) : a(p, !1);
                },
                !0
              );
            }
            d(j, U);
          };
          E(
            G,
            (j) => {
              e(t), r(() => e(t).type === "select") ? j(w) : j(y, !1);
            },
            !0
          );
        }
        d(D, O);
      };
      E(x, (D) => {
        e(t), r(() => e(t).type === "textarea") ? D(F) : D(C, !1);
      });
    }
    I(() => ee(f, 1, `flex-${e(t), r(() => e(t).flex === "full" ? "none" : e(t).flex || "1") ?? ""} ${e(t), r(() => e(t).type === "textarea" || e(t).key === "title" || e(t).key === "subtitle" || e(t).flex === "full" ? "w-full" : "w-full sm:w-auto sm:flex-1") ?? ""} min-w-0 ${e(t), r(() => e(t).type === "toggle" ? "flex items-center justify-center" : "") ?? ""}`)), d(u, f);
  }), d(W, L), ie();
}
var gt = Be('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" class="svelte-fn6h9a"></path></svg>'), bt = k(`<span class="
                        ml-1 px-1.5 py-0.5 text-xs font-medium
                        bg-primary-100 text-primary-800 rounded-full
                        dark:bg-primary-900 dark:text-primary-200
                     svelte-fn6h9a"> </span>`), mt = k('<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full svelte-fn6h9a"></div>'), ht = k('<button type="button" role="tab"><!> <span class="svelte-fn6h9a"> </span> <!></button> <!>', 1), xt = k('<div role="tabpanel"><!></div>'), yt = k('<div><div role="tablist" tabindex="0"></div> <div class="tab-panels svelte-fn6h9a"></div></div>');
const _t = {
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
function Mt(W, v) {
  ve(v, !1), Ue(W, _t);
  let n = T(v, "tabs", 24, () => []), c = T(v, "activeTab", 12, ""), $ = T(v, "variant", 8, "default"), o = T(v, "size", 8, "md"), L = T(v, "orientation", 8, "horizontal"), u = T(v, "fullWidth", 8, !1), t = T(v, "className", 8, "");
  const f = ce();
  let x = N(), F = N(), C = N(0);
  const D = {
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
  function G(p, a) {
    p.disabled || (c(p.id), f("change", { activeTab: c(), tab: p, event: a }), f("tabClick", { tab: p, event: a }));
  }
  function w(p) {
    if (!e(x)) return;
    const a = Array.from(e(x).querySelectorAll('[role="tab"]')), s = a.findIndex((g) => g === document.activeElement);
    let l = s;
    switch (p.key) {
      case "ArrowRight":
      case "ArrowDown":
        p.preventDefault(), l = (s + 1) % a.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        p.preventDefault(), l = s === 0 ? a.length - 1 : s - 1;
        break;
      case "Home":
        p.preventDefault(), l = 0;
        break;
      case "End":
        p.preventDefault(), l = a.length - 1;
        break;
      case "Enter":
      case " ":
        p.preventDefault();
        const g = a[s];
        g && g.click();
        return;
    }
    l !== s && a[l] && a[l].focus();
  }
  function y(p) {
    var s;
    const a = (s = e(x)) == null ? void 0 : s.querySelector(`[data-tab-id="${p}"]`);
    a == null || a.focus();
  }
  se(() => (_(n()), _(c())), () => {
    n().length > 0 && !c() && c(n()[0].id);
  }), se(() => (_(n()), _(c())), () => {
    h(C, n().findIndex((p) => p.id === c()));
  }), ye();
  var j = { focusTab: y };
  oe();
  var U = yt(), q = i(U);
  xe(q, 5, n, _e, (p, a) => {
    var s = ht(), l = J(s), g = i(l);
    {
      var S = (M) => {
        var Q = gt(), ae = i(Q);
        I(() => {
          ee(
            Q,
            0,
            Le((_(o()), r(() => D[o()].icon))),
            "svelte-fn6h9a"
          ), H(ae, "d", (e(a), r(() => e(a).icon)));
        }), d(M, Q);
      };
      E(g, (M) => {
        e(a), r(() => e(a).icon) && M(S);
      });
    }
    var b = z(g, 2), m = i(b), B = z(b, 2);
    {
      var A = (M) => {
        var Q = bt(), ae = i(Q);
        I(() => Z(ae, (e(a), r(() => e(a).badge)))), d(M, Q);
      };
      E(B, (M) => {
        e(a), r(() => e(a).badge) && M(A);
      });
    }
    var R = z(l, 2);
    {
      var K = (M) => {
        var Q = mt();
        d(M, Q);
      };
      E(R, (M) => {
        _($()), e(a), _(c()), r(() => $() === "underline" && e(a).id === c()) && M(K);
      });
    }
    I(() => {
      H(l, "data-tab-id", (e(a), r(() => e(a).id))), ee(
        l,
        1,
        `
                    ${_(o()), r(() => D[o()].tab) ?? ""}
                    ${_($()), r(() => O[$()].tab) ?? ""}
                    ${e(a), _(c()), _($()), r(() => e(a).id === c() ? O[$()].activeTab : "") ?? ""}
                    ${e(a), r(() => e(a).disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer") ?? ""}
                    ${u() ? "flex-1" : ""}
                    flex items-center justify-center gap-2
                `,
        "svelte-fn6h9a"
      ), H(l, "aria-selected", (e(a), _(c()), r(() => e(a).id === c()))), H(l, "aria-controls", `tabpanel-${e(a), r(() => e(a).id) ?? ""}`), H(l, "aria-disabled", (e(a), r(() => e(a).disabled))), H(l, "tabindex", (e(a), _(c()), r(() => e(a).id === c() ? 0 : -1))), Z(m, (e(a), r(() => e(a).label)));
    }), te("click", l, (M) => G(e(a), M)), d(p, s);
  }), he(q, (p) => h(x, p), () => e(x));
  var V = z(q, 2);
  return xe(V, 5, n, _e, (p, a) => {
    var s = xt(), l = i(s);
    {
      var g = (S) => {
        var b = re(), m = J(b);
        fe(m, v, "content", {}, null), d(S, b);
      };
      E(l, (S) => {
        e(a), _(c()), r(() => e(a).id === c()) && S(g);
      });
    }
    I(() => {
      H(s, "id", `tabpanel-${e(a), r(() => e(a).id) ?? ""}`), H(s, "aria-labelledby", `tab-${e(a), r(() => e(a).id) ?? ""}`), ee(
        s,
        1,
        `
                    ${_(o()), r(() => D[o()].panel) ?? ""}
                    ${_($()), r(() => O[$()].panel) ?? ""}
                    ${e(a), _(c()), r(() => e(a).id === c() ? "block" : "hidden") ?? ""}
                `,
        "svelte-fn6h9a"
      );
    }), De(3, s, () => Pe, () => ({ duration: 200 })), d(p, s);
  }), he(V, (p) => h(F, p), () => e(F)), I(() => {
    ee(U, 1, `tabs-container ${L() === "vertical" ? "flex" : ""} ${t() ?? ""}`, "svelte-fn6h9a"), ee(
      q,
      1,
      `
            ${_($()), r(() => O[$()].container) ?? ""}
            ${L() === "vertical" ? "flex-col space-y-1 mr-4" : ""}
            ${_(u()), _(n()), r(() => u() ? "grid grid-cols-" + n().length : "flex") ?? ""}
        `,
      "svelte-fn6h9a"
    ), H(q, "aria-orientation", L());
  }), te("keydown", q, (p) => w(p)), d(W, U), qe(v, "focusTab", y), ie(j);
}
export {
  $t as A,
  Ct as I,
  jt as K,
  tt as M,
  Mt as T
};
