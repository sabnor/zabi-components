import { L as ye, M as we, N as ke, O as oe, P as ze, Q as je, D as Ie, R as Ee, A as Be, T as Ae, U as Ve, V as Ce, W as Re, u as E, F as Se, X as le, Y as Xe, j as d, x as G, y as U, i as L, f as p, a as j, t as w, b, p as O, c as W, v as A, g as i, l as T, m as V, d as c, h as P, n as I, z as X, s as R, o as M, q as J, Z as Ye, _ as De, e as Q, r as te, $ as de, I as Y, H as D, k as K, a0 as se, a1 as Ge, a2 as _e, a3 as ne, a4 as He, a5 as Le, a6 as ve } from "./props-ChfwWtCN.js";
import { createEventDispatcher as Te } from "svelte";
import { a as Oe, p as pe } from "./Card-YmnHW5Dv.js";
import { T as We } from "./ThemeToggle-Dt8hE3_o.js";
function ce(a, e, ...r) {
  var o = a, t = oe, l;
  ye(() => {
    t !== (t = e()) && (l && (ze(l), l = null), l = ke(() => (
      /** @type {SnippetFn} */
      t(o, ...r)
    )));
  }, we);
}
function Fe(a, e, r, o, t, l) {
  var u, v, n = null, _ = (
    /** @type {TemplateNode} */
    a
  ), h;
  ye(() => {
    const f = e() || null;
    var s = je;
    f !== u && (h && (f === null ? Ae(h, () => {
      h = null, v = null;
    }) : f === v ? Ve(h) : ze(h)), f && f !== v && (h = ke(() => {
      if (n = document.createElementNS(s, f), Ie(n, n), o) {
        var m = (
          /** @type {TemplateNode} */
          n.appendChild(Ee())
        );
        o(n, m);
      }
      Be.nodes_end = n, _.before(n);
    })), u = f, u && (v = u));
  }, we);
}
function Pe(a, e, r = e) {
  var o = /* @__PURE__ */ new WeakSet();
  Ce(a, "input", async (t) => {
    var l = t ? a.defaultValue : a.value;
    if (l = me(a) ? he(l) : l, r(l), le !== null && o.add(le), await Re(), l !== (l = e())) {
      var u = a.selectionStart, v = a.selectionEnd;
      a.value = l ?? "", v !== null && (a.selectionStart = u, a.selectionEnd = Math.min(v, a.value.length));
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  E(e) == null && a.value && (r(me(a) ? he(a.value) : a.value), le !== null && o.add(le)), Se(() => {
    var t = e();
    if (a === document.activeElement) {
      var l = (
        /** @type {Batch} */
        Xe ?? le
      );
      if (o.has(l))
        return;
    }
    me(a) && t === he(a.value) || a.type === "date" && !t && !a.value || t !== a.value && (a.value = t ?? "");
  });
}
function qe(a, e, r = e) {
  Ce(a, "change", (o) => {
    var t = o ? a.defaultChecked : a.checked;
    r(t);
  }), // If we are hydrating and the value has since changed,
  // then use the update value from the input instead.
  // If defaultChecked is set, then checked == defaultChecked
  E(e) == null && r(a.checked), Se(() => {
    var o = e();
    a.checked = !!o;
  });
}
function me(a) {
  var e = a.type;
  return e === "number" || e === "range";
}
function he(a) {
  return a === "" ? null : +a;
}
var Ke = p('<label class="block text-sm font-medium text-gray-700 mb-1"> </label>'), Qe = p("<div><!> <input/></div>");
function Zt(a, e) {
  W(e, !1);
  const r = V(), o = V();
  let t = d(e, "value", 12, ""), l = d(e, "type", 8, "text"), u = d(e, "label", 8, ""), v = d(e, "placeholder", 8, ""), n = d(e, "disabled", 8, !1), _ = d(e, "size", 8, "md");
  const h = `input-${Math.random().toString(36).substr(2, 9)}`;
  G(() => {
  }, () => {
    R(r, {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-3 text-base"
    });
  }), G(() => (i(r), A(_())), () => {
    R(o, [
      "w-full border border-gray-300 rounded-md",
      "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      i(r)[_()]
    ].join(" "));
  }), U(), L();
  var f = Qe(), s = c(f);
  {
    var m = (x) => {
      var y = Ke(), k = c(y);
      w(() => {
        P(y, "for", h), M(k, u());
      }), b(x, y);
    };
    j(s, (x) => {
      u() && x(m);
    });
  }
  var g = T(s, 2);
  w(() => {
    P(g, "id", h), P(g, "type", l()), P(g, "placeholder", v()), g.disabled = n(), I(g, 1, X(i(o)));
  }), Pe(g, t), b(a, f), O();
}
var Ue = p('<label class="block text-sm font-medium text-gray-700 mb-1"> </label>'), Ze = p("<div><!> <textarea></textarea></div>");
function Jt(a, e) {
  W(e, !1);
  const r = V(), o = V();
  let t = d(e, "value", 12, ""), l = d(e, "label", 8, ""), u = d(e, "placeholder", 8, ""), v = d(e, "disabled", 8, !1), n = d(e, "rows", 8, 4), _ = d(e, "size", 8, "md");
  const h = `textarea-${Math.random().toString(36).substr(2, 9)}`;
  G(() => {
  }, () => {
    R(r, {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-3 text-base"
    });
  }), G(() => (i(r), A(_())), () => {
    R(o, [
      "w-full border border-gray-300 rounded-md",
      "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "resize-y",
      i(r)[_()]
    ].join(" "));
  }), U(), L();
  var f = Ze(), s = c(f);
  {
    var m = (x) => {
      var y = Ue(), k = c(y);
      w(() => {
        P(y, "for", h), M(k, l());
      }), b(x, y);
    };
    j(s, (x) => {
      l() && x(m);
    });
  }
  var g = T(s, 2);
  w(() => {
    P(g, "id", h), P(g, "placeholder", u()), g.disabled = v(), P(g, "rows", n()), I(g, 1, X(i(o)));
  }), Pe(g, t), b(a, f), O();
}
var Je = p('<label class="block text-sm font-medium text-gray-700 mb-1"> </label>'), $e = p("<option disabled> </option>"), et = p("<option> </option>"), tt = p("<div><!> <select><!><!></select></div>");
function $t(a, e) {
  W(e, !1);
  const r = V(), o = V();
  let t = d(e, "value", 12, void 0), l = d(e, "options", 24, () => []), u = d(e, "placeholder", 8, "Select an option"), v = d(e, "label", 8, ""), n = d(e, "disabled", 8, !1), _ = d(e, "size", 8, "md");
  const h = `select-${Math.random().toString(36).substr(2, 9)}`;
  G(() => {
  }, () => {
    R(r, {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-3 text-base"
    });
  }), G(() => (i(r), A(_())), () => {
    R(o, [
      "w-full border border-gray-300 rounded-md bg-white",
      "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      i(r)[_()]
    ].join(" "));
  }), U(), L();
  var f = tt(), s = c(f);
  {
    var m = (z) => {
      var S = Je(), C = c(S);
      w(() => {
        P(S, "for", h), M(C, v());
      }), b(z, S);
    };
    j(s, (z) => {
      v() && z(m);
    });
  }
  var g = T(s, 2);
  w(() => {
    t(), De(() => {
      n(), i(o), u(), l();
    });
  });
  var x = c(g);
  {
    var y = (z) => {
      var S = $e(), C = c(S);
      S.value = S.__value = "", w(() => M(C, u())), b(z, S);
    };
    j(x, (z) => {
      u() && !t() && z(y);
    });
  }
  var k = T(x);
  J(k, 1, l, (z) => z.value, (z, S) => {
    var C = et(), B = c(C), N = {};
    w(() => {
      C.disabled = (i(S), E(() => i(S).disabled)), M(B, (i(S), E(() => i(S).label))), N !== (N = (i(S), E(() => i(S).value))) && (C.value = (C.__value = (i(S), E(() => i(S).value))) ?? "");
    }), b(z, C);
  }), w(() => {
    P(g, "id", h), g.disabled = n(), I(g, 1, X(i(o)));
  }), Ye(g, t), b(a, f), O();
}
var at = p('<label class="text-sm font-medium cursor-pointer"> </label>'), rt = p('<div class="flex items-center gap-2"><input type="checkbox"/> <!></div>');
function ea(a, e) {
  W(e, !1);
  const r = V();
  let o = d(e, "checked", 12, !1), t = d(e, "disabled", 8, !1), l = d(e, "label", 8, "");
  const u = `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  G(() => {
  }, () => {
    R(r, [
      "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded",
      "focus:ring-blue-500 focus:ring-2",
      "disabled:opacity-50 disabled:cursor-not-allowed"
    ].join(" "));
  }), U(), L();
  var v = rt(), n = c(v), _ = T(n, 2);
  {
    var h = (f) => {
      var s = at(), m = c(s);
      w(() => {
        P(s, "for", u), M(m, l());
      }), b(f, s);
    };
    j(_, (f) => {
      l() && f(h);
    });
  }
  w(() => {
    P(n, "id", u), n.disabled = t(), I(n, 1, X(i(r)));
  }), qe(n, o), b(a, v), O();
}
var lt = p('<span class="text-sm font-medium text-gray-700"> </span>'), ot = p('<div class="flex items-center gap-3"><button type="button" role="switch"><span></span></button> <!></div>');
function ta(a, e) {
  W(e, !1);
  const r = V(), o = V();
  let t = d(e, "checked", 12, !1), l = d(e, "disabled", 8, !1), u = d(e, "label", 8, "");
  G(() => (A(t()), A(l())), () => {
    R(r, [
      "relative inline-flex w-11 h-6 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent",
      "transition-colors duration-200 ease-in-out",
      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
      t() ? "bg-blue-600" : "bg-gray-200",
      l() ? "opacity-50 cursor-not-allowed" : ""
    ].join(" "));
  }), G(() => A(t()), () => {
    R(o, [
      "pointer-events-none inline-block w-5 h-5 transform rounded-full bg-white shadow-lg",
      "transition duration-200 ease-in-out",
      t() ? "translate-x-5" : "translate-x-0"
    ].join(" "));
  }), U(), L();
  var v = ot(), n = c(v), _ = c(n), h = T(n, 2);
  {
    var f = (s) => {
      var m = lt(), g = c(m);
      w(() => M(g, u())), b(s, m);
    };
    j(h, (s) => {
      u() && s(f);
    });
  }
  w(() => {
    P(n, "aria-checked", t()), P(n, "aria-label", u() || "Toggle"), n.disabled = l(), I(n, 1, X(i(r))), I(_, 1, X(i(o)));
  }), Q("click", n, () => t(!t())), b(a, v), O();
}
var st = p('<label class="block text-sm font-medium text-gray-700"> </label>'), nt = p('<span class="text-white text-lg">✓</span>'), it = p('<button type="button" role="radio"><!></button>'), dt = p('<div class="space-y-2"><!> <div class="grid grid-cols-4 gap-2" role="radiogroup"></div></div>');
function aa(a, e) {
  W(e, !1);
  let r = d(e, "value", 12, ""), o = d(e, "label", 8, ""), t = d(e, "disabled", 8, !1);
  const l = [
    { label: "Red", value: "#ef4444" },
    { label: "Blue", value: "#3b82f6" },
    { label: "Green", value: "#10b981" },
    { label: "Yellow", value: "#f59e0b" },
    { label: "Purple", value: "#8b5cf6" },
    { label: "Pink", value: "#ec4899" },
    { label: "Gray", value: "#6b7280" },
    { label: "Black", value: "#000000" }
  ], u = `color-picker-${Math.random().toString(36).substr(2, 9)}`;
  L();
  var v = dt(), n = c(v);
  {
    var _ = (f) => {
      var s = st(), m = c(s);
      w(() => {
        P(s, "for", u), M(m, o());
      }), b(f, s);
    };
    j(n, (f) => {
      o() && f(_);
    });
  }
  var h = T(n, 2);
  J(h, 5, () => l, te, (f, s) => {
    var m = it(), g = c(m);
    {
      var x = (y) => {
        var k = nt();
        b(y, k);
      };
      j(g, (y) => {
        A(r()), i(s), E(() => r() === i(s).value) && y(x);
      });
    }
    w(() => {
      I(m, 1, `w-12 h-12 rounded-lg border-2 transition-all ${A(r()), i(s), E(() => r() === i(s).value ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300 hover:border-gray-400") ?? ""}`), de(m, `background-color: ${i(s), E(() => i(s).value) ?? ""};`), m.disabled = t(), P(m, "aria-checked", (A(r()), i(s), E(() => r() === i(s).value))), P(m, "aria-label", (i(s), E(() => i(s).label)));
    }), Q("click", m, () => r(i(s).value)), b(f, m);
  }), w(() => P(h, "id", u)), b(a, v), O();
}
var vt = p('<button type="button" role="radio"><span class="text-lg"> </span> <span class="text-sm"> </span></button>'), ct = p('<div class="space-y-2"><label class="block text-sm font-medium text-gray-700"> </label> <div class="flex gap-1 p-1 bg-gray-100 rounded-lg" role="radiogroup"></div></div>');
function ra(a, e) {
  W(e, !1);
  let r = d(e, "value", 12, "center"), o = d(e, "label", 8, "Text Alignment");
  const t = [
    { value: "left", label: "Left", icon: "⬅" },
    { value: "center", label: "Center", icon: "↔" },
    { value: "right", label: "Right", icon: "➡" }
  ], l = `text-alignment-${Math.random().toString(36).substr(2, 9)}`;
  L();
  var u = ct(), v = c(u), n = c(v), _ = T(v, 2);
  J(_, 5, () => t, te, (h, f) => {
    var s = vt(), m = c(s), g = c(m), x = T(m, 2), y = c(x);
    w(() => {
      I(s, 1, `flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-colors ${A(r()), i(f), E(() => r() === i(f).value ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-200") ?? ""}`), P(s, "aria-checked", (A(r()), i(f), E(() => r() === i(f).value))), P(s, "aria-label", (i(f), E(() => i(f).label))), M(g, (i(f), E(() => i(f).icon))), M(y, (i(f), E(() => i(f).label)));
    }), Q("click", s, () => r(i(f).value)), b(h, s);
  }), w(() => {
    P(v, "for", l), M(n, o()), P(_, "id", l);
  }), b(a, u), O();
}
var ut = p('<button type="button"><!> <span class="ml-1 text-xs">×</span></button>'), ft = p("<span><!></span>");
function la(a, e) {
  W(e, !1);
  const r = V(), o = V(), t = V();
  let l = d(e, "variant", 8, "default"), u = d(e, "size", 8, "md"), v = d(e, "closable", 8, !1);
  const n = Te();
  function _(g) {
    g.stopPropagation(), n("close", { event: g });
  }
  G(() => {
  }, () => {
    R(r, {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base"
    });
  }), G(() => {
  }, () => {
    R(o, {
      default: "bg-gray-100 text-gray-800 border-gray-300",
      success: "bg-green-100 text-green-800 border-green-300",
      warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
      error: "bg-red-100 text-red-800 border-red-300",
      info: "bg-blue-100 text-blue-800 border-blue-300"
    });
  }), G(
    () => (i(r), A(u()), i(o), A(l()), A(v())),
    () => {
      R(t, [
        "inline-flex items-center gap-1 font-medium border rounded-md",
        i(r)[u()],
        i(o)[l()],
        v() ? "cursor-pointer hover:opacity-80" : ""
      ].join(" "));
    }
  ), U(), L();
  var h = Y(), f = D(h);
  {
    var s = (g) => {
      var x = ut(), y = c(x);
      K(y, e, "default", {}), w(() => I(x, 1, X(i(t)))), Q("click", x, _), b(g, x);
    }, m = (g) => {
      var x = ft(), y = c(x);
      K(y, e, "default", {}), w(() => I(x, 1, X(i(t)))), b(g, x);
    };
    j(f, (g) => {
      v() ? g(s) : g(m, !1);
    });
  }
  b(a, h), O();
}
var bt = p("<h1> <!></h1>"), gt = p("<h2> <!></h2>"), mt = p("<h3> <!></h3>"), ht = p("<h4> <!></h4>"), xt = p("<h5> <!></h5>"), _t = p("<h6> <!></h6>");
function oa(a, e) {
  W(e, !1);
  const r = V(), o = V();
  let t = d(e, "level", 8, 1), l = d(e, "text", 8, "");
  G(() => {
  }, () => {
    R(r, {
      1: "text-4xl font-bold",
      2: "text-3xl font-bold",
      3: "text-2xl font-semibold",
      4: "text-xl font-semibold",
      5: "text-lg font-medium",
      6: "text-base font-medium"
    });
  }), G(() => (i(r), A(t())), () => {
    R(o, ["text-gray-900", i(r)[t()]].join(" "));
  }), U(), L();
  var u = Y(), v = D(u);
  {
    var n = (h) => {
      var f = bt(), s = c(f), m = T(s);
      K(m, e, "default", {}), w(() => {
        I(f, 1, X(i(o))), M(s, l());
      }), b(h, f);
    }, _ = (h) => {
      var f = Y(), s = D(f);
      {
        var m = (x) => {
          var y = gt(), k = c(y), z = T(k);
          K(z, e, "default", {}), w(() => {
            I(y, 1, X(i(o))), M(k, l());
          }), b(x, y);
        }, g = (x) => {
          var y = Y(), k = D(y);
          {
            var z = (C) => {
              var B = mt(), N = c(B), H = T(N);
              K(H, e, "default", {}), w(() => {
                I(B, 1, X(i(o))), M(N, l());
              }), b(C, B);
            }, S = (C) => {
              var B = Y(), N = D(B);
              {
                var H = (F) => {
                  var q = ht(), Z = c(q), re = T(Z);
                  K(re, e, "default", {}), w(() => {
                    I(q, 1, X(i(o))), M(Z, l());
                  }), b(F, q);
                }, ae = (F) => {
                  var q = Y(), Z = D(q);
                  {
                    var re = ($) => {
                      var ee = xt(), ie = c(ee), fe = T(ie);
                      K(fe, e, "default", {}), w(() => {
                        I(ee, 1, X(i(o))), M(ie, l());
                      }), b($, ee);
                    }, Me = ($) => {
                      var ee = Y(), ie = D(ee);
                      {
                        var fe = (be) => {
                          var ge = _t(), xe = c(ge), Ne = T(xe);
                          K(Ne, e, "default", {}), w(() => {
                            I(ge, 1, X(i(o))), M(xe, l());
                          }), b(be, ge);
                        };
                        j(
                          ie,
                          (be) => {
                            t() === 6 && be(fe);
                          },
                          !0
                        );
                      }
                      b($, ee);
                    };
                    j(
                      Z,
                      ($) => {
                        t() === 5 ? $(re) : $(Me, !1);
                      },
                      !0
                    );
                  }
                  b(F, q);
                };
                j(
                  N,
                  (F) => {
                    t() === 4 ? F(H) : F(ae, !1);
                  },
                  !0
                );
              }
              b(C, B);
            };
            j(
              k,
              (C) => {
                t() === 3 ? C(z) : C(S, !1);
              },
              !0
            );
          }
          b(x, y);
        };
        j(
          s,
          (x) => {
            t() === 2 ? x(m) : x(g, !1);
          },
          !0
        );
      }
      b(h, f);
    };
    j(v, (h) => {
      t() === 1 ? h(n) : h(_, !1);
    });
  }
  b(a, u), O();
}
var pt = p('<div class="flex justify-between items-center mb-2"><label class="text-sm font-medium text-gray-700"> </label> <span class="text-sm text-gray-500"> </span></div>'), yt = p('<div><!> <div role="progressbar" aria-valuemin="0"><div class="h-full bg-blue-600 rounded-full"></div></div></div>');
function sa(a, e) {
  W(e, !1);
  const r = V(), o = V();
  let t = d(e, "value", 8, 0), l = d(e, "max", 8, 100), u = d(e, "size", 8, "md"), v = d(e, "label", 8, "");
  const n = `progress-${Math.random().toString(36).substr(2, 9)}`;
  G(() => (A(t()), A(l())), () => {
    R(r, Math.min(Math.max(t() / l() * 100, 0), 100));
  }), G(() => {
  }, () => {
    R(o, { sm: "h-1", md: "h-2", lg: "h-3" });
  }), U(), L();
  var _ = yt(), h = c(_);
  {
    var f = (g) => {
      var x = pt(), y = c(x), k = c(y), z = T(y, 2), S = c(z);
      w(
        (C) => {
          P(y, "for", n), M(k, v()), M(S, `${C ?? ""}%`);
        },
        [
          () => (i(r), E(() => Math.round(i(r))))
        ]
      ), b(g, x);
    };
    j(h, (g) => {
      v() && g(f);
    });
  }
  var s = T(h, 2), m = c(s);
  w(() => {
    P(s, "id", n), I(s, 1, `w-full bg-gray-200 rounded-full overflow-hidden ${i(o), A(u()), E(() => i(o)[u()]) ?? ""}`), P(s, "aria-valuenow", t()), P(s, "aria-valuemax", l()), de(m, `width: ${i(r) ?? ""}%`);
  }), b(a, _), O();
}
var wt = p("<div></div>");
function na(a, e) {
  let r = d(e, "width", 8, "100%"), o = d(e, "height", 8, "1rem"), t = d(e, "className", 8, "");
  var l = wt();
  w(() => {
    I(l, 1, `animate-pulse bg-gray-200 rounded ${t() ?? ""}`), de(l, `width: ${r() ?? ""}; height: ${o() ?? ""};`);
  }), b(a, l);
}
var kt = p('<button type="button" class="ml-3 text-gray-400 hover:text-gray-600" aria-label="Close notification">×</button>'), zt = p('<div class="fixed top-4 right-4 max-w-sm w-full bg-white border rounded-lg shadow-lg p-4 z-50" role="alert"><div class="flex items-start"><div class="flex-1"><p> </p></div> <!></div></div>');
function ia(a, e) {
  W(e, !1);
  let r = d(e, "message", 8, ""), o = d(e, "type", 8, "info"), t = d(e, "closable", 8, !0);
  const l = Te();
  let u = V(!0);
  const v = {
    success: "bg-green-100 border-green-300 text-green-800",
    error: "bg-red-100 border-red-300 text-red-800",
    warning: "bg-yellow-100 border-yellow-300 text-yellow-800",
    info: "bg-blue-100 border-blue-300 text-blue-800"
  };
  function n() {
    R(u, !1), l("close");
  }
  L();
  var _ = Y(), h = D(_);
  {
    var f = (s) => {
      var m = zt(), g = c(m), x = c(g), y = c(x), k = c(y), z = T(x, 2);
      {
        var S = (C) => {
          var B = kt();
          Q("click", B, n), b(C, B);
        };
        j(z, (C) => {
          t() && C(S);
        });
      }
      w(() => {
        I(y, 1, `text-sm ${A(o()), E(() => v[o()]) ?? ""}`), M(k, r());
      }), b(s, m);
    };
    j(h, (s) => {
      i(u) && s(f);
    });
  }
  b(a, _), O();
}
var Ct = p('<div class="tooltip group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible svelte-13nzt82"> </div>'), St = p('<div class="tooltip-container group relative inline-block svelte-13nzt82"><!> <!></div>');
const Tt = {
  hash: "svelte-13nzt82",
  code: `.tooltip-container.svelte-13nzt82 {position:relative;display:inline-block;}.tooltip.svelte-13nzt82 {position:absolute;z-index:50;padding:0.5rem 0.75rem;background-color:#1f2937;color:white;border-radius:0.375rem;font-size:0.875rem;line-height:1.25rem;white-space:nowrap;opacity:0;visibility:hidden;transition:opacity 0.2s ease-in-out,
            visibility 0.2s ease-in-out;pointer-events:none;max-width:200px;word-wrap:break-word;white-space:normal;}

    /* Top placement */.tooltip-container[data-placement="top"].svelte-13nzt82 .tooltip:where(.svelte-13nzt82) {bottom:100%;left:50%;transform:translateX(-50%);margin-bottom:0.5rem;}

    /* Bottom placement */.tooltip-container[data-placement="bottom"].svelte-13nzt82 .tooltip:where(.svelte-13nzt82) {top:100%;left:50%;transform:translateX(-50%);margin-top:0.5rem;}

    /* Left placement */.tooltip-container[data-placement="left"].svelte-13nzt82 .tooltip:where(.svelte-13nzt82) {right:100%;top:50%;transform:translateY(-50%);margin-right:0.5rem;}

    /* Right placement */.tooltip-container[data-placement="right"].svelte-13nzt82 .tooltip:where(.svelte-13nzt82) {left:100%;top:50%;transform:translateY(-50%);margin-left:0.5rem;}

    /* Arrow styles using CSS pseudo-elements */.tooltip.svelte-13nzt82::before {content:"";position:absolute;width:0;height:0;border:4px solid transparent;}

    /* Top arrow */.tooltip-container[data-placement="top"].svelte-13nzt82 .tooltip:where(.svelte-13nzt82)::before {top:100%;left:50%;transform:translateX(-50%);border-top-color:#1f2937;}

    /* Bottom arrow */.tooltip-container[data-placement="bottom"].svelte-13nzt82 .tooltip:where(.svelte-13nzt82)::before {bottom:100%;left:50%;transform:translateX(-50%);border-bottom-color:#1f2937;}

    /* Left arrow */.tooltip-container[data-placement="left"].svelte-13nzt82 .tooltip:where(.svelte-13nzt82)::before {left:100%;top:50%;transform:translateY(-50%);border-left-color:#1f2937;}

    /* Right arrow */.tooltip-container[data-placement="right"].svelte-13nzt82 .tooltip:where(.svelte-13nzt82)::before {right:100%;top:50%;transform:translateY(-50%);border-right-color:#1f2937;}

    /* Responsive adjustments */
    @media (max-width: 640px) {.tooltip.svelte-13nzt82 {max-width:calc(100vw - 2rem);left:50% !important;right:auto !important;transform:translateX(-50%) !important;margin:0.5rem 0 !important;}.tooltip.svelte-13nzt82::before {display:none;}
    }`
};
function da(a, e) {
  Oe(a, Tt);
  let r = d(e, "content", 8, ""), o = d(e, "placement", 8, "top");
  var t = St(), l = c(t);
  K(l, e, "default", {});
  var u = T(l, 2);
  {
    var v = (n) => {
      var _ = Ct(), h = c(_);
      w(() => M(h, r())), b(n, _);
    };
    j(u, (n) => {
      r() && n(v);
    });
  }
  w(() => P(t, "data-placement", o())), b(a, t);
}
var Pt = p('<img loading="lazy"/>');
function va(a, e) {
  let r = d(e, "src", 8), o = d(e, "alt", 8, ""), t = d(e, "width", 8, "100%"), l = d(e, "height", 8, "auto"), u = d(e, "className", 8, "");
  var v = Pt();
  w(() => {
    P(v, "src", r()), P(v, "alt", o()), I(v, 1, `w-full h-auto object-cover ${u() ?? ""}`), de(v, `width: ${(typeof t() == "number" ? t() + "px" : t()) ?? ""}; height: ${(typeof l() == "number" ? l() + "px" : l()) ?? ""};`);
  }), b(a, v);
}
/**
 * @license @lucide/svelte v0.544.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The MIT License (MIT) (for portions derived from Feather)
 * 
 * Copyright (c) 2013-2023 Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */
const Mt = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
var Nt = Ge("<svg><!><!></svg>");
function ue(a) {
  const e = () => se(f, "$props", r), [r, o] = ne(), {
    name: t,
    color: l = "currentColor",
    size: u = 24,
    strokeWidth: v = 2,
    absoluteStrokeWidth: n = !1,
    iconNode: _ = [],
    children: h,
    ...f
  } = e()();
  var s = Nt();
  _e(
    s,
    (x) => ({
      ...Mt,
      ...f,
      width: u,
      height: u,
      stroke: l,
      "stroke-width": x,
      class: E(() => ["lucide-icon lucide", t && `lucide-${t}`, f.class])
    }),
    [
      () => E(() => n ? Number(v) * 24 / Number(u) : v)
    ]
  );
  var m = c(s);
  J(m, 1, () => _, te, (x, y) => {
    var k = He(() => Le(i(y), 2));
    let z = () => i(k)[0], S = () => i(k)[1];
    var C = Y(), B = D(C);
    Fe(B, z, !0, (N, H) => {
      _e(N, () => ({ ...S() }));
    }), b(x, C);
  });
  var g = T(m);
  h == null || h(g), b(a, s), o();
}
function jt(a) {
  const e = () => se(t, "$props", r), [r, o] = ne();
  /**
   * @license @lucide/svelte v0.544.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * ---
   *
   * The MIT License (MIT) (for portions derived from Feather)
   *
   * Copyright (c) 2013-2023 Cole Bemis
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   */
  let t = e()();
  const l = [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12" }],
    [
      "line",
      { x1: "12", x2: "12.01", y1: "16", y2: "16" }
    ]
  ];
  ue(a, ve(
    { name: "circle-alert" },
    () => t,
    {
      get iconNode() {
        return l;
      },
      children: (u, v) => {
        var n = Y(), _ = D(n);
        ce(_, () => E(() => t.children) ?? oe), b(u, n);
      },
      $$slots: { default: !0 }
    }
  )), o();
}
function It(a) {
  const e = () => se(t, "$props", r), [r, o] = ne();
  /**
   * @license @lucide/svelte v0.544.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * ---
   *
   * The MIT License (MIT) (for portions derived from Feather)
   *
   * Copyright (c) 2013-2023 Cole Bemis
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   */
  let t = e()();
  const l = [
    [
      "path",
      {
        d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"
      }
    ],
    ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242" }],
    [
      "path",
      {
        d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"
      }
    ],
    ["path", { d: "m2 2 20 20" }]
  ];
  ue(a, ve(
    { name: "eye-off" },
    () => t,
    {
      get iconNode() {
        return l;
      },
      children: (u, v) => {
        var n = Y(), _ = D(n);
        ce(_, () => E(() => t.children) ?? oe), b(u, n);
      },
      $$slots: { default: !0 }
    }
  )), o();
}
function Et(a) {
  const e = () => se(t, "$props", r), [r, o] = ne();
  /**
   * @license @lucide/svelte v0.544.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * ---
   *
   * The MIT License (MIT) (for portions derived from Feather)
   *
   * Copyright (c) 2013-2023 Cole Bemis
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   */
  let t = e()();
  const l = [
    [
      "path",
      {
        d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "3" }]
  ];
  ue(a, ve(
    { name: "eye" },
    () => t,
    {
      get iconNode() {
        return l;
      },
      children: (u, v) => {
        var n = Y(), _ = D(n);
        ce(_, () => E(() => t.children) ?? oe), b(u, n);
      },
      $$slots: { default: !0 }
    }
  )), o();
}
function Bt(a) {
  const e = () => se(t, "$props", r), [r, o] = ne();
  /**
   * @license @lucide/svelte v0.544.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * ---
   *
   * The MIT License (MIT) (for portions derived from Feather)
   *
   * Copyright (c) 2013-2023 Cole Bemis
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *
   */
  let t = e()();
  const l = [
    ["path", { d: "M18 6 6 18" }],
    ["path", { d: "m6 6 12 12" }]
  ];
  ue(a, ve(
    { name: "x" },
    () => t,
    {
      get iconNode() {
        return l;
      },
      children: (u, v) => {
        var n = Y(), _ = D(n);
        ce(_, () => E(() => t.children) ?? oe), b(u, n);
      },
      $$slots: { default: !0 }
    }
  )), o();
}
var At = p('<button type="button" aria-label="Clear input"><!></button>'), Vt = p('<button type="button"><!></button>'), Rt = p('<div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1"><!> <!></div>');
function ca(a, e) {
  W(e, !1);
  let r = d(e, "showPasswordToggle", 8, !1), o = d(e, "showClearButton", 8, !1), t = d(e, "hasValue", 8, !1), l = d(e, "disabled", 8, !1), u = d(e, "readonly", 8, !1), v = d(e, "showPassword", 8, !1), n = d(e, "onTogglePassword", 8, () => {
  }), _ = d(e, "onClear", 8, () => {
  });
  const h = [
    "absolute",
    "right-3",
    "top-1/2",
    "-translate-y-1/2",
    "text-text-tertiary",
    "hover:text-primary",
    "transition-colors",
    "duration-200",
    "focus:outline-none",
    "focus:text-primary",
    "focus:ring-2",
    "focus:ring-focus-ring",
    "focus:ring-offset-1",
    "rounded-sm",
    "p-1"
  ].join(" ");
  function f(k, z) {
    k.key === "Enter" && z();
  }
  L();
  var s = Rt(), m = c(s);
  {
    var g = (k) => {
      var z = At(), S = c(z);
      Bt(S), w(() => I(z, 1, X(h))), Q("click", z, pe(function(...C) {
        var B;
        (B = _()) == null || B.apply(this, C);
      })), Q("keydown", z, (C) => f(C, _())), b(k, z);
    };
    j(m, (k) => {
      o() && t() && !l() && !u() && k(g);
    });
  }
  var x = T(m, 2);
  {
    var y = (k) => {
      var z = Vt(), S = c(z);
      {
        var C = (N) => {
          It(N);
        }, B = (N) => {
          Et(N);
        };
        j(S, (N) => {
          v() ? N(C) : N(B, !1);
        });
      }
      w(() => {
        I(z, 1, X(h)), P(z, "aria-label", v() ? "Hide password" : "Show password");
      }), Q("click", z, pe(function(...N) {
        var H;
        (H = n()) == null || H.apply(this, N);
      })), Q("keydown", z, (N) => f(N, n())), b(k, z);
    };
    j(x, (k) => {
      r() && k(y);
    });
  }
  b(a, s), O();
}
var Xt = p('<div class="flex items-center gap-1"><!> <span> </span></div>'), Yt = p('<div class="flex items-center gap-1"><span class="text-green-600">✓</span> <span> </span></div>'), Dt = p("<span> </span>"), Gt = p("<div><!></div>");
function ua(a, e) {
  W(e, !1);
  const r = V();
  let o = d(e, "hasError", 8, !1), t = d(e, "hasSuccess", 8, !1), l = d(e, "error", 8, ""), u = d(e, "success", 8, ""), v = d(e, "helpText", 8, ""), n = d(e, "inputId", 8, "");
  G(
    () => (A(o()), A(t())),
    () => {
      R(r, [
        "mt-2",
        "text-xs",
        o() ? "text-red-600" : t() ? "text-green-600" : "text-gray-500"
      ].join(" "));
    }
  ), U(), L();
  var _ = Y(), h = D(_);
  {
    var f = (s) => {
      var m = Gt(), g = c(m);
      {
        var x = (k) => {
          var z = Xt(), S = c(z);
          jt(S);
          var C = T(S, 2), B = c(C);
          w(() => M(B, l())), b(k, z);
        }, y = (k) => {
          var z = Y(), S = D(z);
          {
            var C = (N) => {
              var H = Yt(), ae = T(c(H), 2), F = c(ae);
              w(() => M(F, u())), b(N, H);
            }, B = (N) => {
              var H = Y(), ae = D(H);
              {
                var F = (q) => {
                  var Z = Dt(), re = c(Z);
                  w(() => M(re, v())), b(q, Z);
                };
                j(
                  ae,
                  (q) => {
                    v() && q(F);
                  },
                  !0
                );
              }
              b(N, H);
            };
            j(
              S,
              (N) => {
                t() ? N(C) : N(B, !1);
              },
              !0
            );
          }
          b(k, z);
        };
        j(g, (k) => {
          o() ? k(x) : k(y, !1);
        });
      }
      w(() => {
        P(m, "id", `${n() ?? ""}-help`), I(m, 1, X(i(r)));
      }), b(s, m);
    };
    j(h, (s) => {
      (o() || t() || v()) && s(f);
    });
  }
  b(a, _), O();
}
var Ht = p('<div class="text-center"><div></div> <p class="text-xs text-gray-600"> </p></div>'), Lt = p('<div class="text-center"><div></div> <p class="text-xs text-gray-600"> </p></div>'), Ot = p('<div class="text-center"><div></div> <p class="text-xs text-gray-600"> </p></div>'), Wt = p('<div class="min-h-screen bg-gray-50 p-8"><div class="max-w-4xl mx-auto space-y-8"><div class="flex justify-between items-center mb-8"><div><h1 class="text-4xl font-bold text-gray-900 mb-2">Color Scale Demo</h1> <p class="text-lg text-gray-600">Simple color scales for light and dark modes</p></div> <!></div> <section class="space-y-6"><h2 class="text-2xl font-semibold text-gray-900 mb-4">Basic Colors</h2> <div class="space-y-3"><h3 class="text-lg font-medium text-gray-700">Gray Scale</h3> <div class="grid grid-cols-11 gap-2"></div></div> <div class="space-y-3"><h3 class="text-lg font-medium text-gray-700">Blue Scale</h3> <div class="grid grid-cols-11 gap-2"></div></div> <div class="space-y-3"><h3 class="text-lg font-medium text-gray-700">Green Scale</h3> <div class="grid grid-cols-11 gap-2"></div></div></section></div></div>');
function fa(a) {
  var e = Wt(), r = c(e), o = c(r), t = T(c(o), 2);
  We(t, {});
  var l = T(o, 2), u = T(c(l), 2), v = T(c(u), 2);
  J(v, 4, () => [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], te, (s, m) => {
    var g = Ht(), x = c(g), y = T(x, 2), k = c(y);
    w(() => {
      I(x, 1, `w-16 h-16 rounded-lg bg-gray-${m ?? ""} border border-gray-300 mb-2`), M(k, m);
    }), b(s, g);
  });
  var n = T(u, 2), _ = T(c(n), 2);
  J(_, 4, () => [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], te, (s, m) => {
    var g = Lt(), x = c(g), y = T(x, 2), k = c(y);
    w(() => {
      I(x, 1, `w-16 h-16 rounded-lg bg-blue-${m ?? ""} border border-gray-300 mb-2`), M(k, m);
    }), b(s, g);
  });
  var h = T(n, 2), f = T(c(h), 2);
  J(f, 4, () => [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], te, (s, m) => {
    var g = Ot(), x = c(g), y = T(x, 2), k = c(y);
    w(() => {
      I(x, 1, `w-16 h-16 rounded-lg bg-green-${m ?? ""} border border-gray-300 mb-2`), M(k, m);
    }), b(s, g);
  }), b(a, e);
}
var Ft = p('<div class="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 max-w-sm"><h3 class="text-sm font-semibold text-gray-900 mb-2"> </h3> <div class="space-y-1 text-xs text-gray-600"><div>Performance monitoring is active</div> <div>Check browser dev tools for detailed metrics</div></div></div>');
function ba(a, e) {
  let r = d(e, "isVisible", 8, !1), o = d(e, "title", 8, "Performance Monitor");
  var t = Y(), l = D(t);
  {
    var u = (v) => {
      var n = Ft(), _ = c(n), h = c(_);
      w(() => M(h, o())), b(v, n);
    };
    j(l, (v) => {
      r() && v(u);
    });
  }
  b(a, t);
}
export {
  la as B,
  ea as C,
  oa as H,
  Zt as I,
  va as O,
  ba as P,
  fa as S,
  ra as T,
  aa as a,
  ca as b,
  ua as c,
  sa as d,
  $t as e,
  na as f,
  Jt as g,
  ia as h,
  ta as i,
  da as j
};
