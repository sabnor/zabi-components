import { a0 as ka, u as le, a1 as za, a as sa, p as t, C as h, D as Ye, i as Ae, f as u, _ as Ca, c as k, s as la, e as q, g as r, h as Te, j as He, r as o, l as e, m as i, n as l, o as N, k as n, x as ca, w as ke, b as me, t as T, B as ve, M as ia, d as Ue, G as We, q as K, F as de, v as H, $ as oa, P as aa, y as da, z as qa, I as Je, H as Qe, J as Ze, K as $e, L as ea, A as ja, a2 as Ea, X as va, E as ta, a3 as ha, a4 as ma, a5 as _a, N as ua, O as fa, a6 as Ba, Y as xa, a7 as La, Z as Na } from "./x-DpVwziig.js";
import { createEventDispatcher as Xe, onMount as ba } from "svelte";
function Ta(j, a, d = a) {
  ka(j, "change", (c) => {
    var b = c ? j.defaultChecked : j.checked;
    d(b);
  }), // If we are hydrating and the value has since changed,
  // then use the update value from the input instead.
  // If defaultChecked is set, then checked == defaultChecked
  le(a) == null && d(j.checked), za(() => {
    var c = a();
    j.checked = !!c;
  });
}
function pa(j) {
  return function(...a) {
    var d = (
      /** @type {Event} */
      a[0]
    );
    return d.preventDefault(), j == null ? void 0 : j.apply(this, a);
  };
}
var Ha = ca('<svg class="animate-spin h-4 w-4 svelte-v0x5nl" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>'), Ma = u('<span class="h-4 w-4 flex items-center justify-center"> </span>'), Sa = u('<span class="h-4 w-4 flex items-center justify-center"> </span>'), Pa = u("<button><!> <!> <!> <!></button>");
const Ia = {
  hash: "svelte-v0x5nl",
  code: `
    /* Ensure proper focus styles for reduced motion users */
    @media (prefers-reduced-motion: reduce) {button.svelte-v0x5nl {transition:none;}
    }

    /* Ensure proper contrast for disabled state */button.svelte-v0x5nl:disabled {opacity:0.6;}

    /* Loading state animation */
    @keyframes svelte-v0x5nl-spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }.animate-spin.svelte-v0x5nl {
        animation: svelte-v0x5nl-spin 1s linear infinite;}`
};
function ir(j, a) {
  He(a, !1), sa(j, Ia);
  const d = i(), c = i();
  let b = t(a, "variant", 8, "primary"), F = t(a, "size", 8, "md"), v = t(a, "disabled", 8, !1), p = t(a, "loading", 8, !1), I = t(a, "type", 8, "button"), E = t(a, "className", 8, ""), V = t(a, "iconLeft", 8, null), W = t(a, "iconRight", 8, null), Y = t(a, "ariaLabel", 8, ""), B = t(a, "ariaDescribedBy", 8, ""), S = t(a, "ariaExpanded", 8, void 0), Q = t(a, "ariaControls", 8, void 0), L = t(a, "ariaPressed", 8, void 0);
  const m = Xe();
  function y($) {
    v() || p() || m("click", { value: !0, event: $ });
  }
  function M($) {
    if (v() || p()) return;
    const re = $;
    (re.key === "Enter" || re.key === " ") && m("click", { value: !0, event: re });
  }
  const _ = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden", A = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-md",
    lg: "px-5 py-3 text-base rounded-lg"
  }, R = {
    primary: [
      "bg-[var(--zabi-primary)] text-[var(--zabi-text-inverse)] border border-[var(--zabi-primary)]",
      "hover:bg-[var(--zabi-primary-hover)] hover:border-[var(--zabi-primary-hover)]",
      "active:bg-[var(--zabi-primary-active)] active:border-[var(--zabi-primary-active)]",
      "focus:ring-2 focus:ring-[var(--zabi-focus-ring)] focus:ring-offset-2",
      "shadow-sm hover:shadow-md"
    ].join(" "),
    secondary: [
      "bg-[var(--zabi-surface)] text-[var(--zabi-text)] border border-[var(--zabi-border)]",
      "hover:bg-[var(--zabi-surface-hover)] hover:border-[var(--zabi-border-hover)]",
      "active:bg-[var(--zabi-surface-active)] active:border-[var(--zabi-border-hover)]",
      "focus:ring-2 focus:ring-[var(--zabi-focus-ring)] focus:ring-offset-2",
      "shadow-sm hover:shadow-md"
    ].join(" "),
    success: [
      "bg-[var(--zabi-success)] text-[var(--zabi-text-inverse)] border border-[var(--zabi-success)]",
      "hover:bg-[var(--zabi-success-hover)] hover:border-[var(--zabi-success-hover)]",
      "active:bg-[var(--zabi-success-active)] active:border-[var(--zabi-success-active)]",
      "focus:ring-2 focus:ring-[var(--zabi-focus-ring)] focus:ring-offset-2",
      "shadow-sm hover:shadow-md"
    ].join(" "),
    warning: [
      "bg-[var(--zabi-warning)] text-[var(--zabi-text-inverse)] border border-[var(--zabi-warning)]",
      "hover:bg-[var(--zabi-warning-hover)] hover:border-[var(--zabi-warning-hover)]",
      "active:bg-[var(--zabi-warning-active)] active:border-[var(--zabi-warning-active)]",
      "focus:ring-2 focus:ring-[var(--zabi-focus-ring)] focus:ring-offset-2",
      "shadow-sm hover:shadow-md"
    ].join(" "),
    danger: [
      "bg-[var(--zabi-error)] text-[var(--zabi-text-inverse)] border border-[var(--zabi-error)]",
      "hover:bg-[var(--zabi-error-hover)] hover:border-[var(--zabi-error-hover)]",
      "active:bg-[var(--zabi-error-active)] active:border-[var(--zabi-error-active)]",
      "focus:ring-2 focus:ring-[var(--zabi-focus-ring)] focus:ring-offset-2",
      "shadow-sm hover:shadow-md"
    ].join(" "),
    info: [
      "bg-[var(--zabi-info)] text-[var(--zabi-text-inverse)] border border-[var(--zabi-info)]",
      "hover:bg-[var(--zabi-info-hover)] hover:border-[var(--zabi-info-hover)]",
      "active:bg-[var(--zabi-info-active)] active:border-[var(--zabi-info-active)]",
      "focus:ring-2 focus:ring-[var(--zabi-focus-ring)] focus:ring-offset-2",
      "shadow-sm hover:shadow-md"
    ].join(" ")
  }, X = v() ? [
    "bg-[var(--zabi-surface-disabled)] text-[var(--zabi-text-disabled)] border-[var(--zabi-border-disabled)]",
    "hover:bg-[var(--zabi-surface-disabled)] hover:text-[var(--zabi-text-disabled)] hover:border-[var(--zabi-border-disabled)]",
    "active:bg-[var(--zabi-surface-disabled)] active:text-[var(--zabi-text-disabled)] active:border-[var(--zabi-border-disabled)]",
    "shadow-none"
  ].join(" ") : "";
  p(), h(
    () => (o(F()), o(v()), o(b()), o(E())),
    () => {
      n(d, [
        _,
        A[F()],
        v() ? X : R[b()],
        E()
      ].filter(Boolean).join(" "));
    }
  ), h(
    () => (o(p()), o(Y()), o(B()), o(S()), o(Q()), o(L()), o(v())),
    () => {
      n(c, {
        "aria-busy": p(),
        "aria-label": Y() || (p() ? "Loading..." : void 0),
        "aria-describedby": B() || void 0,
        "aria-expanded": S(),
        "aria-controls": Q(),
        "aria-pressed": L(),
        "aria-disabled": v()
      });
    }
  ), Ye(), Ae();
  var U = Pa();
  Ca(
    U,
    () => ({
      type: I(),
      class: e(d),
      disabled: v() || p(),
      ...e(c)
    }),
    void 0,
    void 0,
    "svelte-v0x5nl"
  );
  var oe = l(U);
  {
    var be = ($) => {
      var re = Ha();
      r($, re);
    };
    k(oe, ($) => {
      p() && $(be);
    });
  }
  var ue = N(oe, 2);
  {
    var te = ($) => {
      var re = ke(), P = me(re);
      {
        var Z = (z) => {
          var C = Ma(), J = l(C);
          T(() => ve(J, V())), r(z, C);
        }, O = (z) => {
          var C = ke(), J = me(C);
          ia(J, V, (pe, qe) => {
            qe(pe, { class: "h-4 w-4" });
          }), r(z, C);
        };
        k(P, (z) => {
          typeof V() == "string" ? z(Z) : z(O, !1);
        });
      }
      r($, re);
    };
    k(ue, ($) => {
      V() && !p() && $(te);
    });
  }
  var xe = N(ue, 2);
  la(xe, a, "default", {}, null);
  var ze = N(xe, 2);
  {
    var Ce = ($) => {
      var re = ke(), P = me(re);
      {
        var Z = (z) => {
          var C = Sa(), J = l(C);
          T(() => ve(J, W())), r(z, C);
        }, O = (z) => {
          var C = ke(), J = me(C);
          ia(J, W, (pe, qe) => {
            qe(pe, { class: "h-4 w-4" });
          }), r(z, C);
        };
        k(P, (z) => {
          typeof W() == "string" ? z(Z) : z(O, !1);
        });
      }
      r($, re);
    };
    k(ze, ($) => {
      W() && !p() && $(Ce);
    });
  }
  q("click", U, y), q("keydown", U, M), r(j, U), Te();
}
var Oa = ca('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" class="svelte-1wpeqgu"></path></svg>'), Fa = ca('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" class="svelte-1wpeqgu"></path></svg>'), Ra = u('<span class="text-error ml-1 svelte-1wpeqgu">*</span>'), Da = u("<label> <!></label>"), Ka = u('<div class="flex items-center gap-1 svelte-1wpeqgu"><svg class="w-3 h-3 flex-shrink-0 svelte-1wpeqgu" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" class="svelte-1wpeqgu"></path></svg> <span class="svelte-1wpeqgu"> </span></div>'), Wa = u('<span class="svelte-1wpeqgu"> </span>'), Aa = u("<div><!></div>"), Xa = u('<div><div class="relative svelte-1wpeqgu"><input type="checkbox" class="sr-only svelte-1wpeqgu"/> <div><!></div> <div></div></div> <div class="flex-1 min-w-0 svelte-1wpeqgu"><!> <!></div></div>');
const Ga = {
  hash: "svelte-1wpeqgu",
  code: `
    /* Custom focus styles for better accessibility */.checkbox-focus-visible {outline:2px solid var(--color-plasma-red-500);outline-offset:2px;}

    /* Smooth transitions for all interactive elements */.checkbox-input.svelte-1wpeqgu {transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1);}

    /* Hover effects */.checkbox-container.svelte-1wpeqgu:hover .checkbox-visual:where(.svelte-1wpeqgu) {transform:scale(1.05);}.checkbox-container.svelte-1wpeqgu:active .checkbox-visual:where(.svelte-1wpeqgu) {transform:scale(0.95);}

    /* Check animation */.checkbox-check.svelte-1wpeqgu {
        animation: svelte-1wpeqgu-checkbox-check 0.2s ease-out;}

    @keyframes svelte-1wpeqgu-checkbox-check {
        0% {
            opacity: 0;
            transform: scale(0.8);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    /* Indeterminate animation */.checkbox-indeterminate.svelte-1wpeqgu {
        animation: svelte-1wpeqgu-checkbox-indeterminate 0.2s ease-out;}

    @keyframes svelte-1wpeqgu-checkbox-indeterminate {
        0% {
            opacity: 0;
            transform: scaleX(0);
        }
        100% {
            opacity: 1;
            transform: scaleX(1);
        }
    }

    /* Focus ring animation */.checkbox-focus-ring.svelte-1wpeqgu {
        animation: svelte-1wpeqgu-checkbox-focus-ring 0.2s ease-out;}

    @keyframes svelte-1wpeqgu-checkbox-focus-ring {
        0% {
            transform: scale(0.95);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    /* Disabled state styling */.checkbox-disabled.svelte-1wpeqgu {opacity:0.5;cursor:not-allowed;}.checkbox-disabled.svelte-1wpeqgu:hover {transform:none;}

    /* Required indicator styling */.checkbox-required.svelte-1wpeqgu {color:var(--color-blood-red-500);}`
};
function dr(j, a) {
  He(a, !1), sa(j, Ga);
  const d = i(), c = i(), b = i(), F = i(), v = i(), p = i(), I = i(), E = i(), V = i(), W = i();
  let Y = t(a, "checked", 12, !1), B = t(a, "disabled", 8, !1), S = t(a, "required", 8, !1), Q = t(a, "label", 8, ""), L = t(a, "helpText", 8, ""), m = t(a, "error", 8, ""), y = t(a, "size", 8, "md"), M = t(a, "variant", 8, "default"), _ = t(a, "indeterminate", 8, !1), A = t(a, "name", 8, void 0), R = t(a, "id", 8, void 0), X = t(a, "value", 8, void 0), U = t(a, "className", 8, "");
  const oe = Xe();
  let be = i(), ue = i(!1);
  function te(f) {
    const ee = f.target;
    Y(ee.checked), oe("change", { value: Y(), checked: Y(), event: f, field: A() });
  }
  function xe(f) {
    n(ue, !0), oe("focus", { event: f });
  }
  function ze(f) {
    n(ue, !1), oe("blur", { event: f });
  }
  function Ce() {
    var f;
    (f = e(be)) == null || f.focus();
  }
  function $() {
    var f;
    (f = e(be)) == null || f.blur();
  }
  h(() => o(R()), () => {
    n(d, R() || `checkbox-${Math.random().toString(36).substr(2, 9)}`);
  }), h(() => {
  }, () => {
    n(c, { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" });
  }), h(() => {
  }, () => {
    n(b, {
      default: "bg-surface border border-primary text-primary focus:ring-primary focus:border-transparent",
      outlined: "bg-surface-secondary border border-primary text-primary focus:ring-primary focus:border-transparent",
      filled: "bg-surface-secondary border border-primary text-primary focus:ring-primary focus:border-transparent"
    });
  }), h(() => o(m()), () => {
    n(F, m() ? "focus:ring-error border-error" : "");
  }), h(() => o(U()), () => {
    n(v, [
      "relative",
      "flex",
      "items-start",
      "gap-3",
      "group",
      "transition-all",
      "duration-200",
      "ease-in-out",
      U()
    ].join(" "));
  }), h(
    () => (e(c), o(y()), e(b), o(M()), e(F), o(m())),
    () => {
      n(p, [
        "flex-shrink-0",
        "rounded",
        "transition-all",
        "duration-200",
        "ease-in-out",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2",
        "focus:ring-offset-dark-900",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "cursor-pointer",
        e(c)[y()],
        e(b)[M()],
        e(F),
        m() ? "grainy-red" : "grainy-texture"
      ].join(" "));
    }
  ), h(() => (o(m()), o(B())), () => {
    n(I, [
      "text-sm",
      "font-medium",
      "cursor-pointer",
      "select-none",
      "transition-colors",
      "duration-200",
      m() ? "text-error" : "text-primary",
      B() ? "opacity-50 cursor-not-allowed" : ""
    ].join(" "));
  }), h(() => o(m()), () => {
    n(E, ["text-xs", "mt-1", m() ? "text-error" : "text-tertiary"].join(" "));
  }), h(() => {
  }, () => {
    n(V, [
      "w-full",
      "h-full",
      "text-current",
      "transition-all",
      "duration-200",
      "ease-in-out"
    ].join(" "));
  }), h(() => {
  }, () => {
    n(W, [
      "w-full",
      "h-full",
      "text-current",
      "transition-all",
      "duration-200",
      "ease-in-out"
    ].join(" "));
  }), Ye();
  var re = { focus: Ce, blur: $ };
  Ae();
  var P = Xa(), Z = l(P), O = l(Z);
  Ue(O, (f) => n(be, f), () => e(be));
  var z, C = N(O, 2), J = l(C);
  {
    var pe = (f) => {
      var ee = Oa();
      T(() => K(ee, 0, de(e(V)), "svelte-1wpeqgu")), r(f, ee);
    }, qe = (f) => {
      var ee = ke(), Ee = me(ee);
      {
        var _e = (ce) => {
          var ie = Fa();
          T(() => K(ie, 0, de(e(W)), "svelte-1wpeqgu")), r(ce, ie);
        };
        k(
          Ee,
          (ce) => {
            _() && ce(_e);
          },
          !0
        );
      }
      r(f, ee);
    };
    k(J, (f) => {
      Y() && !_() ? f(pe) : f(qe, !1);
    });
  }
  var Se = N(C, 2), Pe = N(Z, 2), ae = l(Pe);
  {
    var ge = (f) => {
      var ee = Da(), Ee = l(ee), _e = N(Ee);
      {
        var ce = (ie) => {
          var Le = Ra();
          r(ie, Le);
        };
        k(_e, (ie) => {
          S() && ie(ce);
        });
      }
      T(() => {
        H(ee, "for", e(d)), K(ee, 1, de(e(I)), "svelte-1wpeqgu"), ve(Ee, `${Q() ?? ""} `);
      }), r(f, ee);
    };
    k(ae, (f) => {
      Q() && f(ge);
    });
  }
  var he = N(ae, 2);
  {
    var je = (f) => {
      var ee = Aa(), Ee = l(ee);
      {
        var _e = (ie) => {
          var Le = Ka(), fe = N(l(Le), 2), g = l(fe);
          T(() => ve(g, m())), r(ie, Le);
        }, ce = (ie) => {
          var Le = ke(), fe = me(Le);
          {
            var g = (Ie) => {
              var Ke = Wa(), Ge = l(Ke);
              T(() => ve(Ge, L())), r(Ie, Ke);
            };
            k(
              fe,
              (Ie) => {
                L() && Ie(g);
              },
              !0
            );
          }
          r(ie, Le);
        };
        k(Ee, (ie) => {
          m() ? ie(_e) : ie(ce, !1);
        });
      }
      T(() => {
        H(ee, "id", `${e(d) ?? ""}-help`), K(ee, 1, de(e(E)), "svelte-1wpeqgu");
      }), r(f, ee);
    };
    k(he, (f) => {
      (m() || L()) && f(je);
    });
  }
  return T(() => {
    K(P, 1, de(e(v)), "svelte-1wpeqgu"), H(O, "id", e(d)), O.disabled = B(), O.required = S(), H(O, "name", A()), H(O, "aria-invalid", m() ? "true" : "false"), H(O, "aria-describedby", m() || L() ? `${e(d)}-help` : void 0), z !== (z = X()) && (O.value = (O.__value = X()) ?? ""), K(C, 1, de(e(p)), "svelte-1wpeqgu"), K(Se, 1, `absolute inset-0 rounded pointer-events-none transition-all duration-200 ${e(ue) ? "ring-2 ring-primary" : ""}`, "svelte-1wpeqgu");
  }), Ta(O, Y), q("change", O, te), q("focus", O, xe), q("blur", O, ze), r(j, P), We(a, "focus", Ce), We(a, "blur", $), Te(re);
}
var Va = u('<div role="menu" aria-orientation="vertical"><div class="max-h-full overflow-y-auto"><!></div></div>'), Ya = u("<div><!></div> <!>", 1);
function Ua(j, a) {
  He(a, !1);
  let d = t(a, "isOpen", 8, !1), c = t(a, "placement", 8, "bottom-start"), b = t(a, "offset", 8, 8), F = t(a, "maxHeight", 8, "20rem"), v = t(a, "width", 8, "auto"), p = t(a, "zIndex", 8, 50);
  const I = Xe();
  let E = i(), V = i(), W;
  function Y() {
    var be, ue, te, xe, ze, Ce, $, re;
    if (!e(V)) return { top: 0, left: 0 };
    W = e(V).getBoundingClientRect();
    const _ = window.scrollY, A = window.scrollX;
    let R = W.bottom + _ + b(), X = W.left + A;
    switch (c()) {
      case "bottom-end":
        X = W.right + A - (((be = e(E)) == null ? void 0 : be.offsetWidth) || 0);
        break;
      case "top-start":
        R = W.top + _ - (((ue = e(E)) == null ? void 0 : ue.offsetHeight) || 0) - b();
        break;
      case "top-end":
        R = W.top + _ - (((te = e(E)) == null ? void 0 : te.offsetHeight) || 0) - b(), X = W.right + A - (((xe = e(E)) == null ? void 0 : xe.offsetWidth) || 0);
        break;
    }
    const U = window.innerWidth, oe = window.innerHeight;
    return X < 0 && (X = 8), X + (((ze = e(E)) == null ? void 0 : ze.offsetWidth) || 0) > U && (X = U - (((Ce = e(E)) == null ? void 0 : Ce.offsetWidth) || 0) - 8), R < 0 && (R = 8), R + ((($ = e(E)) == null ? void 0 : $.offsetHeight) || 0) > oe + _ && (R = oe + _ - (((re = e(E)) == null ? void 0 : re.offsetHeight) || 0) - 8), { top: R, left: X };
  }
  function B(_) {
    d() && e(E) && !e(E).contains(_.target) && e(V) && !e(V).contains(_.target) && I("close");
  }
  function S(_) {
    _.key === "Escape" && d() && I("close");
  }
  ba(() => (document.addEventListener("click", B), document.addEventListener("keydown", S), () => {
    document.removeEventListener("click", B), document.removeEventListener("keydown", S);
  })), h(
    () => (o(d()), e(V), e(E)),
    () => {
      d() && e(V) && requestAnimationFrame(() => {
        const _ = Y();
        e(E) && (oa(E, e(E).style.top = `${_.top}px`), oa(E, e(E).style.left = `${_.left}px`));
      });
    }
  ), Ye(), Ae();
  var Q = Ya(), L = me(Q), m = l(L);
  la(m, a, "trigger", {}, null), Ue(L, (_) => n(V, _), () => e(V));
  var y = N(L, 2);
  {
    var M = (_) => {
      var A = Va(), R = l(A), X = l(R);
      la(X, a, "default", {}, null), Ue(A, (U) => n(E, U), () => e(E)), T(() => {
        K(A, 1, `fixed z-${p() ?? ""} bg-stone-800 border border-stone-700 rounded-lg shadow-xl`), aa(A, `max-height: ${F() ?? ""}; width: ${v() ?? ""};`);
      }), da(3, A, () => qa, () => ({ y: -10, duration: 200 })), r(_, A);
    };
    k(y, (_) => {
      d() && _(M);
    });
  }
  r(j, Q), Te();
}
function ya(j, a) {
  He(a, !0);
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
  let d = ea(a, ["$$slots", "$$events", "$$legacy"]);
  const c = [["path", { d: "M20 6 9 17l-5-5" }]];
  Je(j, Qe(
    { name: "check" },
    () => d,
    {
      get iconNode() {
        return c;
      },
      children: (b, F) => {
        var v = ke(), p = me(v);
        Ze(p, () => a.children ?? $e), r(b, v);
      },
      $$slots: { default: !0 }
    }
  )), Te();
}
function Ja(j, a) {
  He(a, !0);
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
  let d = ea(a, ["$$slots", "$$events", "$$legacy"]);
  const c = [["path", { d: "m6 9 6 6 6-6" }]];
  Je(j, Qe(
    { name: "chevron-down" },
    () => d,
    {
      get iconNode() {
        return c;
      },
      children: (b, F) => {
        var v = ke(), p = me(v);
        Ze(p, () => a.children ?? $e), r(b, v);
      },
      $$slots: { default: !0 }
    }
  )), Te();
}
function Qa(j, a) {
  He(a, !0);
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
  let d = ea(a, ["$$slots", "$$events", "$$legacy"]);
  const c = [
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
  Je(j, Qe(
    { name: "eye-off" },
    () => d,
    {
      get iconNode() {
        return c;
      },
      children: (b, F) => {
        var v = ke(), p = me(v);
        Ze(p, () => a.children ?? $e), r(b, v);
      },
      $$slots: { default: !0 }
    }
  )), Te();
}
function Za(j, a) {
  He(a, !0);
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
  let d = ea(a, ["$$slots", "$$events", "$$legacy"]);
  const c = [
    [
      "path",
      {
        d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "3" }]
  ];
  Je(j, Qe(
    { name: "eye" },
    () => d,
    {
      get iconNode() {
        return c;
      },
      children: (b, F) => {
        var v = ke(), p = me(v);
        Ze(p, () => a.children ?? $e), r(b, v);
      },
      $$slots: { default: !0 }
    }
  )), Te();
}
function $a(j, a) {
  He(a, !0);
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
  let d = ea(a, ["$$slots", "$$events", "$$legacy"]);
  const c = [
    ["path", { d: "M21 5H3" }],
    ["path", { d: "M17 12H7" }],
    ["path", { d: "M19 19H5" }]
  ];
  Je(j, Qe(
    { name: "text-align-center" },
    () => d,
    {
      get iconNode() {
        return c;
      },
      children: (b, F) => {
        var v = ke(), p = me(v);
        Ze(p, () => a.children ?? $e), r(b, v);
      },
      $$slots: { default: !0 }
    }
  )), Te();
}
function et(j, a) {
  He(a, !0);
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
  let d = ea(a, ["$$slots", "$$events", "$$legacy"]);
  const c = [
    ["path", { d: "M21 5H3" }],
    ["path", { d: "M21 12H9" }],
    ["path", { d: "M21 19H7" }]
  ];
  Je(j, Qe(
    { name: "text-align-end" },
    () => d,
    {
      get iconNode() {
        return c;
      },
      children: (b, F) => {
        var v = ke(), p = me(v);
        Ze(p, () => a.children ?? $e), r(b, v);
      },
      $$slots: { default: !0 }
    }
  )), Te();
}
function at(j, a) {
  He(a, !0);
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
  let d = ea(a, ["$$slots", "$$events", "$$legacy"]);
  const c = [
    ["path", { d: "M21 5H3" }],
    ["path", { d: "M15 12H3" }],
    ["path", { d: "M17 19H3" }]
  ];
  Je(j, Qe(
    { name: "text-align-start" },
    () => d,
    {
      get iconNode() {
        return c;
      },
      children: (b, F) => {
        var v = ke(), p = me(v);
        Ze(p, () => a.children ?? $e), r(b, v);
      },
      $$slots: { default: !0 }
    }
  )), Te();
}
var tt = u('<div role="dialog" aria-modal="true" aria-labelledby="slideup-title" tabindex="-1"></div>'), rt = u('<div class="flex items-center justify-between p-4 border-b border-stone-700"><h3 id="slideup-title" class="text-lg font-semibold text-white"> </h3> <button type="button" class="p-2 text-gray-400 hover:text-white transition-colors duration-200" aria-label="Close"><!></button></div>'), nt = u('<div role="dialog" aria-modal="true" aria-labelledby="slideup-title"><!> <div class="max-h-full overflow-y-auto"><!></div></div>'), st = u("<!> <!>", 1);
function lt(j, a) {
  He(a, !1);
  let d = t(a, "isOpen", 8, !1), c = t(a, "title", 8, ""), b = t(a, "maxHeight", 8, "80vh"), F = t(a, "zIndex", 8, 50);
  const v = Xe();
  let p = i(), I = i();
  function E(m) {
    d() && e(I) && m.target === e(I) && v("close");
  }
  function V(m) {
    m.key === "Escape" && d() && v("close");
  }
  function W(m) {
    typeof document < "u" && (m ? document.body.style.overflow = "hidden" : document.body.style.overflow = "");
  }
  ba(() => (typeof document < "u" && document.addEventListener("keydown", V), () => {
    typeof document < "u" && (document.removeEventListener("keydown", V), document.body.style.overflow = "");
  })), h(() => o(d()), () => {
    typeof document < "u" && W(d());
  }), Ye(), Ae();
  var Y = st(), B = me(Y);
  {
    var S = (m) => {
      var y = tt();
      Ue(y, (M) => n(I, M), () => e(I)), T(() => K(y, 1, `fixed inset-0 z-${F() ?? ""} bg-black/50`)), q("click", y, E), q("keydown", y, (M) => M.key === "Escape" && E(M)), da(3, y, () => ja, () => ({ duration: 200 })), r(m, y);
    };
    k(B, (m) => {
      d() && m(S);
    });
  }
  var Q = N(B, 2);
  {
    var L = (m) => {
      var y = nt(), M = l(y);
      {
        var _ = (X) => {
          var U = rt(), oe = l(U), be = l(oe), ue = N(oe, 2), te = l(ue);
          va(te, { size: 20 }), T(() => ve(be, c())), q("click", ue, () => v("close")), r(X, U);
        };
        k(M, (X) => {
          c() && X(_);
        });
      }
      var A = N(M, 2), R = l(A);
      la(R, a, "default", {}, null), Ue(y, (X) => n(p, X), () => e(p)), T(() => {
        K(y, 1, `fixed bottom-0 left-0 right-0 z-${F() + 1} bg-stone-800 border-t border-stone-700 rounded-t-xl shadow-2xl`), aa(y, `max-height: ${b() ?? ""};`);
      }), da(3, y, () => Ea, () => ({ axis: "y", duration: 300 })), r(m, y);
    };
    k(Q, (m) => {
      d() && m(L);
    });
  }
  r(j, Y), Te();
}
var ot = u('<span class="text-blood-red-500 ml-1">*</span>'), it = u("<label> <!></label>"), dt = u('<div class="absolute -top-1 -right-1 w-4 h-4 bg-cyber-amber-500 rounded-full flex items-center justify-center"><!></div>'), ct = u('<button type="button"><div></div> <!></button>'), vt = u('<div class="space-y-2"><div class="grid grid-cols-11 gap-3 p-1 bg-stone-800 rounded-lg border border-stone-700"></div></div>'), ut = u('<div class="p-4"><div class="max-h-96 overflow-y-auto space-y-4 pr-2"></div></div>'), ft = u('<div class="w-8 h-8 rounded border border-stone-600 flex-shrink-0"></div>'), bt = u('<div class="w-8 h-8 rounded border border-stone-600 flex-shrink-0 bg-stone-700"></div> <span class="text-gray-400">Select a color</span>', 1), gt = u('<div class="relative"><button type="button"><div class="flex items-center space-x-3"><!></div></button> <div></div></div>'), ht = u('<div class="w-8 h-8 rounded border border-stone-600 flex-shrink-0"></div>'), mt = u('<div class="w-8 h-8 rounded border border-stone-600 flex-shrink-0 bg-stone-700"></div> <span class="text-gray-400">Select a color</span>', 1), xt = u('<div class="absolute -top-1 -right-1 w-4 h-4 bg-cyber-amber-500 rounded-full flex items-center justify-center"><!></div>'), pt = u('<button type="button"><div></div> <!></button>'), yt = u('<div class="space-y-2"><div class="grid grid-cols-8 gap-3 p-1 bg-stone-800 rounded-lg border border-stone-700"></div></div>'), _t = u('<div class="p-4"><div class="max-h-96 overflow-y-auto space-y-4 pr-2"></div></div>'), wt = u('<div class="relative"><button type="button"><div class="flex items-center space-x-3"><!></div></button> <div></div></div> <!>', 1), kt = u('<div class="text-center py-6 text-stone-500 text-sm">No colors available</div>'), zt = u('<div class="space-y-3"><!> <!> <!> <!></div>');
function cr(j, a) {
  He(a, !1);
  const d = i(), c = i(), b = i(), F = i(), v = i(), p = i();
  let I = t(a, "value", 12, ""), E = t(a, "label", 8, ""), V = t(a, "required", 8, !1), W = t(a, "disabled", 8, !1), Y = t(a, "size", 8, "md"), B = t(a, "variant", 8, "outlined"), S = t(a, "colors", 24, () => [
    // Default color palette - can be customized by parent
    { label: "Red", value: "#ef4444", family: "Basic" },
    { label: "Blue", value: "#3b82f6", family: "Basic" },
    { label: "Green", value: "#10b981", family: "Basic" },
    { label: "Yellow", value: "#f59e0b", family: "Basic" },
    { label: "Purple", value: "#8b5cf6", family: "Basic" },
    { label: "Pink", value: "#ec4899", family: "Basic" },
    { label: "Indigo", value: "#6366f1", family: "Basic" },
    { label: "Gray", value: "#6b7280", family: "Basic" },
    { label: "Black", value: "#000000", family: "Basic" },
    { label: "White", value: "#ffffff", family: "Basic" }
  ]), Q = i(!1), L = i(!1), m = i(!1);
  const y = Xe(), M = `color-picker-${Math.random().toString(36).substr(2, 9)}`;
  ba(() => {
    n(m, window.innerWidth < 768);
    const P = () => {
      n(m, window.innerWidth < 768);
    };
    return window.addEventListener("resize", P), () => window.removeEventListener("resize", P);
  });
  function _(P) {
    W() || (I(P.value), n(
      Q,
      !1
      // Collapse after selection
    ), y("change", { value: P.value }));
  }
  function A() {
    W() || n(Q, !e(Q));
  }
  function R() {
    n(L, !0);
  }
  function X() {
    n(L, !1);
  }
  function U() {
    n(Q, !1);
  }
  h(() => {
  }, () => {
    n(d, {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-5 py-3 text-lg"
    });
  }), h(() => {
  }, () => {
    n(c, {
      default: "bg-dark-700 border-0 text-white placeholder-gray-400 focus:ring-plasma-red-500/20",
      outlined: "bg-dark-600 border-0 text-white placeholder-gray-400 focus:ring-plasma-red-500/20",
      filled: "bg-dark-600 border-0 text-white placeholder-gray-400 focus:ring-plasma-red-500/20",
      ghost: "bg-transparent border-0 text-white placeholder-gray-400 focus:ring-plasma-red-500/20"
    });
  }), h(() => {
  }, () => {
    n(b, [
      "block",
      "text-sm",
      "font-medium",
      "mb-2",
      "transition-colors",
      "duration-200",
      "text-gray-300"
    ].join(" "));
  }), h(
    () => (e(d), o(Y()), e(c), o(B())),
    () => {
      n(F, [
        "w-full",
        "min-w-40 sm:min-w-48 md:min-w-56 lg:min-w-64",
        "rounded-lg",
        "transition-all",
        "duration-200",
        "ease-in-out",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2",
        "focus:ring-offset-dark-900",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        e(d)[Y()],
        e(c)[B()],
        "grainy-texture"
      ].join(" "));
    }
  ), h(() => (o(S()), o(I())), () => {
    n(v, S().find((P) => P.value === I()));
  }), h(() => o(S()), () => {
    n(p, S().reduce(
      (P, Z) => {
        const O = Z.family || "Other";
        return P[O] || (P[O] = []), P[O].push(Z), P;
      },
      {}
    ));
  }), Ye(), Ae();
  var oe = zt(), be = l(oe);
  {
    var ue = (P) => {
      var Z = it(), O = l(Z), z = N(O);
      {
        var C = (J) => {
          var pe = ot();
          r(J, pe);
        };
        k(z, (J) => {
          V() && J(C);
        });
      }
      T(() => {
        H(Z, "for", M), K(Z, 1, de(e(b))), ve(O, `${E() ?? ""} `);
      }), r(P, Z);
    };
    k(be, (P) => {
      E() && P(ue);
    });
  }
  var te = N(be, 2);
  {
    var xe = (P) => {
      Ua(P, {
        placement: "bottom-start",
        width: "auto",
        maxHeight: "20rem",
        get isOpen() {
          return e(Q);
        },
        set isOpen(Z) {
          n(Q, Z);
        },
        $$events: { close: U },
        children: (Z, O) => {
          var z = ut(), C = l(z);
          ta(
            C,
            5,
            () => (e(p), le(() => Object.entries(e(p)))),
            ([J, pe]) => J,
            (J, pe) => {
              var qe = ha(() => ma(e(pe), 2));
              let Se = () => e(qe)[1];
              var Pe = vt(), ae = l(Pe);
              ta(ae, 5, Se, (ge) => ge.value, (ge, he) => {
                var je = ct(), f = l(je), ee = N(f, 2);
                {
                  var Ee = (_e) => {
                    var ce = dt(), ie = l(ce);
                    ya(ie, { size: 8, class: "text-stone-900" }), r(_e, ce);
                  };
                  k(ee, (_e) => {
                    o(I()), e(he), le(() => I() === e(he).value) && _e(Ee);
                  });
                }
                T(() => {
                  K(je, 1, `group relative flex flex-col items-center rounded-lg transition-all duration-200 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-cyber-amber-500 focus:ring-opacity-50 ${o(I()), e(he), le(() => I() === e(he).value ? "bg-cyber-amber-500/20 ring-2 ring-cyber-amber-500" : "") ?? ""} ${W() ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`), je.disabled = W(), K(f, 1, `w-8 h-8 rounded-lg group-hover:scale-110 transition-transform duration-200 ${o(I()), e(he), le(() => I() === e(he).value ? "border-cyber-amber-500" : "") ?? ""}`), aa(f, `background-color: ${e(he), le(() => e(he).value) ?? ""}`);
                }), q("click", je, () => _(e(he))), q("keydown", je, (_e) => {
                  _e.key === "Enter" && _(e(he));
                }), r(ge, je);
              }), r(J, Pe);
            }
          ), r(Z, z);
        },
        $$slots: {
          default: !0,
          trigger: (Z, O) => {
            var z = gt(), C = l(z), J = l(C), pe = l(J);
            {
              var qe = (ae) => {
                var ge = ft();
                T(() => aa(ge, `background-color: ${e(v), le(() => e(v).value) ?? ""}`)), r(ae, ge);
              }, Se = (ae) => {
                var ge = bt();
                r(ae, ge);
              };
              k(pe, (ae) => {
                e(v) ? ae(qe) : ae(Se, !1);
              });
            }
            var Pe = N(C, 2);
            T(() => {
              K(C, 1, de(e(F))), C.disabled = W(), K(Pe, 1, `absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 ${e(L) ? "ring-2 ring-plasma-red-500/20" : ""}`);
            }), q("click", C, A), q("focus", C, R), q("blur", C, X), r(Z, z);
          }
        },
        $$legacy: !0
      });
    };
    k(te, (P) => {
      e(m) || P(xe);
    });
  }
  var ze = N(te, 2);
  {
    var Ce = (P) => {
      var Z = wt(), O = me(Z), z = l(O), C = l(z), J = l(C);
      {
        var pe = (ae) => {
          var ge = ht();
          T(() => aa(ge, `background-color: ${e(v), le(() => e(v).value) ?? ""}`)), r(ae, ge);
        }, qe = (ae) => {
          var ge = mt();
          r(ae, ge);
        };
        k(J, (ae) => {
          e(v) ? ae(pe) : ae(qe, !1);
        });
      }
      var Se = N(z, 2), Pe = N(O, 2);
      lt(Pe, {
        title: "Select Color",
        maxHeight: "80vh",
        get isOpen() {
          return e(Q);
        },
        set isOpen(ae) {
          n(Q, ae);
        },
        $$events: { close: U },
        children: (ae, ge) => {
          var he = _t(), je = l(he);
          ta(
            je,
            5,
            () => (e(p), le(() => Object.entries(e(p)))),
            ([f, ee]) => f,
            (f, ee) => {
              var Ee = ha(() => ma(e(ee), 2));
              let _e = () => e(Ee)[1];
              var ce = yt(), ie = l(ce);
              ta(ie, 5, _e, (Le) => Le.value, (Le, fe) => {
                var g = pt(), Ie = l(g), Ke = N(Ie, 2);
                {
                  var Ge = (x) => {
                    var s = xt(), G = l(s);
                    ya(G, { size: 8, class: "text-stone-900" }), r(x, s);
                  };
                  k(Ke, (x) => {
                    o(I()), e(fe), le(() => I() === e(fe).value) && x(Ge);
                  });
                }
                T(() => {
                  K(g, 1, `group relative flex flex-col items-center rounded-lg transition-all duration-200 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-cyber-amber-500 focus:ring-opacity-50 ${o(I()), e(fe), le(() => I() === e(fe).value ? "bg-cyber-amber-500/20 ring-2 ring-cyber-amber-500" : "") ?? ""} ${W() ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`), g.disabled = W(), K(Ie, 1, `w-8 h-8 rounded-lg group-hover:scale-110 transition-transform duration-200 ${o(I()), e(fe), le(() => I() === e(fe).value ? "border-cyber-amber-500" : "") ?? ""}`), aa(Ie, `background-color: ${e(fe), le(() => e(fe).value) ?? ""}`);
                }), q("click", g, () => _(e(fe))), q("keydown", g, (x) => {
                  x.key === "Enter" && _(e(fe));
                }), r(Le, g);
              }), r(f, ce);
            }
          ), r(ae, he);
        },
        $$slots: { default: !0 },
        $$legacy: !0
      }), T(() => {
        K(z, 1, de(e(F))), z.disabled = W(), K(Se, 1, `absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 ${e(L) ? "ring-2 ring-plasma-red-500/20" : ""}`);
      }), q("click", z, A), q("focus", z, R), q("blur", z, X), r(P, Z);
    };
    k(ze, (P) => {
      e(m) && P(Ce);
    });
  }
  var $ = N(ze, 2);
  {
    var re = (P) => {
      var Z = kt();
      r(P, Z);
    };
    k($, (P) => {
      o(S()), le(() => !S() || S().length === 0) && P(re);
    });
  }
  r(j, oe), Te();
}
var Ct = u('<span class="text-error ml-1 svelte-7hu4vd" aria-label="required">*</span>'), qt = u("<label> <!></label>"), jt = u('<button type="button" aria-label="Clear input"><!></button>'), Et = u('<button type="button"><!></button>'), Bt = u('<div class="flex items-center gap-1 svelte-7hu4vd"><!> <span class="svelte-7hu4vd"> </span></div>'), Lt = u('<div class="flex items-center gap-1 svelte-7hu4vd"><!> <span class="svelte-7hu4vd"> </span></div>'), Nt = u('<span class="svelte-7hu4vd"> </span>'), Tt = u("<div><!></div>"), Ht = u('<div><!> <div class="relative svelte-7hu4vd"><input/> <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 svelte-7hu4vd"><!> <!></div></div> <!></div>');
const Mt = {
  hash: "svelte-7hu4vd",
  code: `
    /* Enhanced focus styles using semantic tokens */.input-focus-visible {outline:2px solid rgb(var(--color-focus-ring));outline-offset:2px;}

    /* Smooth transitions for all interactive elements */input.svelte-7hu4vd {transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1);}

    /* Placeholder styling using semantic tokens */input.svelte-7hu4vd::-moz-placeholder {-moz-transition:color 0.2s ease;transition:color 0.2s ease;color:rgb(var(--color-text-placeholder));}input.svelte-7hu4vd::placeholder {transition:color 0.2s ease;color:rgb(var(--color-text-placeholder));}input.svelte-7hu4vd:focus::-moz-placeholder {color:rgb(var(--color-text-tertiary));}input.svelte-7hu4vd:focus::placeholder {color:rgb(var(--color-text-tertiary));}

    /* Number input spinner styling */input[type="number"].svelte-7hu4vd::-webkit-outer-spin-button,
    input[type="number"].svelte-7hu4vd::-webkit-inner-spin-button {-webkit-appearance:none;margin:0;}input[type="number"].svelte-7hu4vd {-moz-appearance:textfield;-webkit-appearance:textfield;appearance:textfield;}

    /* Search input styling */input[type="search"].svelte-7hu4vd::-webkit-search-cancel-button,
    input[type="search"].svelte-7hu4vd::-webkit-search-decoration {-webkit-appearance:none;}

    /* Action button hover effects */button[aria-label].svelte-7hu4vd {transition:all 0.2s ease;}button[aria-label].svelte-7hu4vd:hover {transform:scale(1.05);}button[aria-label].svelte-7hu4vd:active {transform:scale(0.95);}

    /* Focus ring animation */.focus-ring.svelte-7hu4vd {
        animation: svelte-7hu4vd-focus-ring-pulse 0.2s ease-out;}

    @keyframes svelte-7hu4vd-focus-ring-pulse {
        0% {
            transform: scale(0.95);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }`
};
function vr(j, a) {
  He(a, !1), sa(j, Mt);
  const d = i(), c = i(), b = i(), F = i(), v = i(), p = i(), I = i(), E = i(), V = i(), W = i(), Y = i(), B = i();
  let S = t(a, "value", 12, ""), Q = t(a, "type", 8, "text"), L = t(a, "label", 8, ""), m = t(a, "placeholder", 8, ""), y = t(a, "required", 8, !1), M = t(a, "disabled", 8, !1), _ = t(a, "readonly", 8, !1), A = t(a, "size", 8, "md"), R = t(a, "variant", 8, "default"), X = t(a, "error", 8, ""), U = t(a, "success", 8, ""), oe = t(a, "helpText", 8, ""), be = t(a, "className", 8, ""), ue = t(a, "id", 8, ""), te = t(a, "name", 8, void 0), xe = t(a, "maxLength", 8, void 0), ze = t(a, "minLength", 8, void 0), Ce = t(a, "pattern", 8, void 0), $ = t(a, "autocomplete", 8, void 0), re = t(a, "showPasswordToggle", 8, !1), P = t(a, "showClearButton", 8, !1), Z = t(a, "ariaLabel", 8, void 0);
  const O = Xe();
  let z = i(), C = i(!1), J = i(!1);
  function pe(w) {
    const D = w.target;
    S(D.value), n(J, S() !== ""), O("input", { value: S(), event: w, field: te() });
  }
  function qe(w) {
    const D = w.target;
    S(D.value), n(J, S() !== ""), O("change", { value: S(), event: w, field: te() });
  }
  function Se(w) {
    O("focus", { event: w });
  }
  function Pe(w) {
    O("blur", { event: w });
  }
  function ae(w) {
    O("keydown", { event: w });
  }
  function ge(w) {
    O("keyup", { event: w });
  }
  function he() {
    n(C, !e(C));
  }
  function je() {
    var w;
    S(""), n(J, !1), O("clear", { event: new Event("clear") }), (w = e(z)) == null || w.focus();
  }
  function f() {
    var w;
    (w = e(z)) == null || w.focus();
  }
  function ee() {
    var w;
    (w = e(z)) == null || w.blur();
  }
  function Ee() {
    var w;
    (w = e(z)) == null || w.select();
  }
  h(() => o(ue()), () => {
    n(d, ue() || `input-${Math.random().toString(36).substr(2, 9)}`);
  }), h(() => o(S()), () => {
    n(J, S() !== "" && S() !== null && S() !== void 0);
  }), h(() => (o(X()), o(R())), () => {
    n(c, !!X() || R() === "error");
  }), h(() => (o(U()), o(R())), () => {
    n(b, !!U() || R() === "success");
  }), h(() => {
  }, () => {
    n(F, {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-sm",
      lg: "px-5 py-3 text-base"
    });
  }), h(
    () => (e(F), o(A()), o(be())),
    () => {
      n(v, [
        "w-full",
        "min-w-0",
        "rounded-md",
        "transition-all",
        "duration-200",
        "ease-in-out",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-[var(--zabi-focus-ring)]",
        "focus:ring-offset-2",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "read-only:cursor-default",
        "read-only:opacity-75",
        e(F)[A()],
        be()
      ].join(" "));
    }
  ), h(() => (e(c), e(b)), () => {
    n(p, e(c) ? "border-[var(--zabi-error)] text-[var(--zabi-text)] placeholder-[var(--zabi-text-placeholder)] focus:ring-[var(--zabi-error)] focus:border-[var(--zabi-error)]" : e(b) ? "border-[var(--zabi-success)] text-[var(--zabi-text)] placeholder-[var(--zabi-text-placeholder)] focus:ring-[var(--zabi-success)] focus:border-[var(--zabi-success)]" : "border-[var(--zabi-border)] text-[var(--zabi-text)] placeholder-[var(--zabi-text-placeholder)] focus:ring-[var(--zabi-focus-ring)] focus:border-[var(--zabi-border-focus)]");
  }), h(() => o(M()), () => {
    n(I, M() ? "bg-[var(--zabi-surface-disabled)] text-[var(--zabi-text-disabled)] border-[var(--zabi-border-disabled)] cursor-not-allowed" : "");
  }), h(
    () => (e(v), e(p), e(I)),
    () => {
      n(E, [
        e(v),
        e(p),
        e(I)
      ].join(" "));
    }
  ), h(() => {
  }, () => {
    n(V, [
      "relative",
      "group",
      "transition-all",
      "duration-200",
      "ease-in-out"
    ].join(" "));
  }), h(() => (e(c), e(b)), () => {
    n(W, [
      "block",
      "text-sm",
      "font-medium",
      "mb-2",
      "transition-colors",
      "duration-200",
      e(c) ? "text-[var(--zabi-error)]" : e(b) ? "text-[var(--zabi-success)]" : "text-[var(--zabi-text)]"
    ].join(" "));
  }), h(() => (e(c), e(b)), () => {
    n(Y, [
      "mt-2",
      "text-xs",
      e(c) ? "text-[var(--zabi-error)]" : e(b) ? "text-[var(--zabi-success)]" : "text-[var(--zabi-text-muted)]"
    ].join(" "));
  }), h(() => {
  }, () => {
    n(B, [
      "absolute",
      "right-3",
      "top-1/2",
      "-translate-y-1/2",
      "text-tertiary",
      "hover:text-primary",
      "transition-colors",
      "duration-200",
      "focus:outline-none",
      "focus:text-primary",
      "focus:ring-2",
      "focus:ring-focus",
      "focus:ring-offset-1",
      "rounded-sm",
      "p-1"
    ].join(" "));
  }), Ye();
  var _e = { focus: f, blur: ee, select: Ee };
  Ae();
  var ce = Ht(), ie = l(ce);
  {
    var Le = (w) => {
      var D = qt(), ne = l(D), ye = N(ne);
      {
        var Oe = (se) => {
          var Be = Ct();
          r(se, Be);
        };
        k(ye, (se) => {
          y() && se(Oe);
        });
      }
      T(() => {
        H(D, "for", e(d)), K(D, 1, de(e(W)), "svelte-7hu4vd"), ve(ne, `${L() ?? ""} `);
      }), r(w, D);
    };
    k(ie, (w) => {
      L() && w(Le);
    });
  }
  var fe = N(ie, 2), g = l(fe);
  Ue(g, (w) => n(z, w), () => e(z));
  var Ie = N(g, 2), Ke = l(Ie);
  {
    var Ge = (w) => {
      var D = jt(), ne = l(D);
      va(ne, { size: 16 }), T(() => K(D, 1, de(e(B)), "svelte-7hu4vd")), q("click", D, pa(je)), q("keydown", D, (ye) => ye.key === "Enter" && je()), r(w, D);
    };
    k(Ke, (w) => {
      P() && e(J) && !M() && !_() && w(Ge);
    });
  }
  var x = N(Ke, 2);
  {
    var s = (w) => {
      var D = Et(), ne = l(D);
      {
        var ye = (se) => {
          Qa(se, { size: 16 });
        }, Oe = (se) => {
          Za(se, { size: 16 });
        };
        k(ne, (se) => {
          e(C) ? se(ye) : se(Oe, !1);
        });
      }
      T(() => {
        K(D, 1, de(e(B)), "svelte-7hu4vd"), H(D, "aria-label", e(C) ? "Hide password" : "Show password");
      }), q("click", D, pa(he)), q("keydown", D, (se) => se.key === "Enter" && he()), r(w, D);
    };
    k(x, (w) => {
      re() && Q() === "password" && w(s);
    });
  }
  var G = N(fe, 2);
  {
    var we = (w) => {
      var D = Tt(), ne = l(D);
      {
        var ye = (se) => {
          var Be = Bt(), Ne = l(Be);
          ua(Ne, { size: 14, class: "flex-shrink-0" });
          var Fe = N(Ne, 2), De = l(Fe);
          T(() => ve(De, X())), r(se, Be);
        }, Oe = (se) => {
          var Be = ke(), Ne = me(Be);
          {
            var Fe = (Me) => {
              var Re = Lt(), Ve = l(Re);
              fa(Ve, { size: 14, class: "flex-shrink-0" });
              var ra = N(Ve, 2), na = l(ra);
              T(() => ve(na, U())), r(Me, Re);
            }, De = (Me) => {
              var Re = ke(), Ve = me(Re);
              {
                var ra = (na) => {
                  var ga = Nt(), wa = l(ga);
                  T(() => ve(wa, oe())), r(na, ga);
                };
                k(
                  Ve,
                  (na) => {
                    oe() && na(ra);
                  },
                  !0
                );
              }
              r(Me, Re);
            };
            k(
              Ne,
              (Me) => {
                e(b) ? Me(Fe) : Me(De, !1);
              },
              !0
            );
          }
          r(se, Be);
        };
        k(ne, (se) => {
          e(c) ? se(ye) : se(Oe, !1);
        });
      }
      T(() => {
        H(D, "id", `${e(d) ?? ""}-help`), K(D, 1, de(e(Y)), "svelte-7hu4vd");
      }), r(w, D);
    };
    k(G, (w) => {
      (e(c) || e(b) || oe()) && w(we);
    });
  }
  return T(() => {
    K(ce, 1, de(e(V)), "svelte-7hu4vd"), H(g, "id", e(d)), H(g, "type", re() && e(C) ? "text" : Q()), _a(g, S()), H(g, "placeholder", m()), g.disabled = M(), g.required = y(), g.readOnly = _(), H(g, "maxlength", xe()), H(g, "minlength", ze()), H(g, "pattern", Ce()), H(g, "autocomplete", $() || void 0), H(g, "name", te()), K(g, 1, de(e(E)), "svelte-7hu4vd"), H(g, "aria-invalid", e(c) ? "true" : "false"), H(g, "aria-describedby", e(c) || e(b) || oe() ? `${e(d)}-help` : void 0), H(g, "aria-label", Z() || (L() ? void 0 : "Input field")), H(g, "aria-required", y());
  }), q("input", g, pe), q("change", g, qe), q("focus", g, Se), q("blur", g, Pe), q("keydown", g, ae), q("keyup", g, ge), r(j, ce), We(a, "focus", f), We(a, "blur", ee), We(a, "select", Ee), Te(_e);
}
var St = u('<span class="text-error ml-1 svelte-1qdann5">*</span>'), Pt = u("<label> <!></label>"), It = u('<option disabled class="svelte-1qdann5"> </option>'), Ot = u('<option class="bg-dark-800 text-white svelte-1qdann5"> </option>'), Ft = u('<button type="button" tabindex="-1" aria-label="Clear selection"><!></button>'), Rt = u('<div class="flex items-center gap-1 svelte-1qdann5"><!> <span class="svelte-1qdann5"> </span></div>'), Dt = u('<div class="flex items-center gap-1 svelte-1qdann5"><!> <span class="svelte-1qdann5"> </span></div>'), Kt = u('<span class="svelte-1qdann5"> </span>'), Wt = u("<div><!></div>"), At = u('<div><!> <div class="relative svelte-1qdann5"><select><!><!></select> <!> <div><!></div> <div></div></div> <!></div>');
const Xt = {
  hash: "svelte-1qdann5",
  code: `
    /* Custom focus styles for better accessibility */.select-focus-visible {outline:2px solid var(--color-plasma-red-500);outline-offset:2px;}

    /* Smooth transitions for all interactive elements */select.svelte-1qdann5 {transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1);}

    /* Custom dropdown arrow styling */select.svelte-1qdann5::-ms-expand {display:none;}

    /* Option styling */option.svelte-1qdann5 {background-color:var(--color-dark-800);color:white;padding:0.5rem;}

    /* Hover effects */.select-container.svelte-1qdann5:hover .select-icon:where(.svelte-1qdann5) {transform:scale(1.1);}.select-container.svelte-1qdann5:active .select-icon:where(.svelte-1qdann5) {transform:scale(0.95);}

    /* Clear button hover effects */button[aria-label="Clear selection"].svelte-1qdann5 {transition:all 0.2s ease;}button[aria-label="Clear selection"].svelte-1qdann5:hover {transform:scale(1.1);}button[aria-label="Clear selection"].svelte-1qdann5:active {transform:scale(0.95);}

    /* Focus ring animation */.select-focus-ring.svelte-1qdann5 {
        animation: svelte-1qdann5-select-focus-ring-pulse 0.2s ease-out;}

    @keyframes svelte-1qdann5-select-focus-ring-pulse {
        0% {
            transform: scale(0.95);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    /* Disabled state styling */.select-disabled.svelte-1qdann5 {opacity:0.5;cursor:not-allowed;}.select-disabled.svelte-1qdann5:hover {transform:none;}

    /* Required indicator styling */.select-required.svelte-1qdann5 {color:var(--color-blood-red-500);}`
};
function ur(j, a) {
  He(a, !1), sa(j, Xt);
  const d = i(), c = i(), b = i(), F = i(), v = i(), p = i(), I = i(), E = i(), V = i(), W = i(), Y = i();
  let B = t(a, "value", 12, void 0), S = t(a, "options", 24, () => []), Q = t(a, "placeholder", 8, "Select an option"), L = t(a, "label", 8, ""), m = t(a, "disabled", 8, !1), y = t(a, "required", 8, !1), M = t(a, "error", 8, ""), _ = t(a, "success", 8, ""), A = t(a, "helpText", 8, ""), R = t(a, "size", 8, "md"), X = t(a, "variant", 8, "outlined"), U = t(a, "searchable", 8, !1), oe = t(a, "clearable", 8, !1), be = t(a, "name", 8, void 0), ue = t(a, "id", 8, void 0), te = t(a, "className", 8, "");
  const xe = Xe();
  let ze = i(), Ce = i(!1), $ = i(""), re = i([]);
  function P(x) {
    const s = x.target;
    B(s.value), xe("input", { value: String(B()) });
  }
  function Z(x) {
    const s = x.target;
    B(s.value), xe("change", { value: String(B()) });
  }
  function O(x) {
    n(Ce, !0), xe("focus", { event: x });
  }
  function z(x) {
    n(Ce, !1), xe("blur", { event: x });
  }
  function C(x) {
    xe("keydown", { event: x });
  }
  function J(x) {
    xe("keyup", { event: x });
  }
  function pe(x) {
    x.stopPropagation(), B(void 0), xe("clear", { event: x });
  }
  function qe() {
    var x;
    (x = e(ze)) == null || x.focus();
  }
  function Se() {
    var x;
    (x = e(ze)) == null || x.blur();
  }
  h(() => o(ue()), () => {
    n(d, ue() || `select-${Math.random().toString(36).substr(2, 9)}`);
  }), h(
    () => (o(U()), e($), o(S())),
    () => {
      U() && e($) ? n(re, S().filter((x) => x.label.toLowerCase().includes(e($).toLowerCase()))) : n(re, S());
    }
  ), h(() => (o(S()), o(B())), () => {
    n(c, S().find((x) => x.value === B()));
  }), h(() => {
  }, () => {
    n(b, {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-5 py-3 text-lg"
    });
  }), h(() => {
  }, () => {
    n(F, {
      outlined: "border border-primary bg-surface",
      filled: "border-0 bg-surface-secondary",
      underlined: "border-0 border-b border-primary bg-transparent rounded-none"
    });
  }), h(() => (o(M()), o(_())), () => {
    n(v, M() ? "focus:ring-error border-error" : _() ? "focus:ring-success border-success" : "");
  }), h(() => {
  }, () => {
    n(p, [
      "relative",
      "group",
      "transition-all",
      "duration-200",
      "ease-in-out"
    ].join(" "));
  }), h(
    () => (o(X()), e(b), o(R()), e(F), e(v), o(te())),
    () => {
      n(I, [
        "w-full",
        "min-w-40 sm:min-w-48 md:min-w-56 lg:min-w-64",
        X() === "underlined" ? "rounded-none" : "rounded-lg",
        "transition-all",
        "duration-200",
        "ease-in-out",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-offset-2",
        "focus:ring-offset-dark-900",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "cursor-pointer",
        "appearance-none",
        "pr-10",
        e(b)[R()],
        e(F)[X()],
        e(v),
        te()
      ].join(" "));
    }
  ), h(() => (o(M()), o(_())), () => {
    n(E, [
      "block",
      "text-sm",
      "font-medium",
      "mb-2",
      "transition-colors",
      "duration-200",
      M() ? "text-error" : _() ? "text-success" : "text-primary"
    ].join(" "));
  }), h(() => (o(M()), o(_())), () => {
    n(V, [
      "mt-2",
      "text-xs",
      M() ? "text-error" : _() ? "text-success" : "text-tertiary"
    ].join(" "));
  }), h(() => o(R()), () => {
    n(W, [
      "absolute",
      "right-3",
      "top-1/2",
      "-translate-y-1/2",
      "pointer-events-none",
      "transition-transform",
      "duration-200",
      "",
      R() === "sm" ? "w-4 h-4" : R() === "md" ? "w-5 h-5" : "w-6 h-6"
    ].join(" "));
  }), h(() => o(R()), () => {
    n(Y, [
      "absolute",
      "right-8",
      "top-1/2",
      "-translate-y-1/2",
      "text-gray-400",
      "hover:text-white",
      "transition-colors",
      "duration-200",
      "focus:outline-none",
      "focus:text-white",
      R() === "sm" ? "w-4 h-4" : R() === "md" ? "w-5 h-5" : "w-6 h-6"
    ].join(" "));
  }), Ye();
  var Pe = { focus: qe, blur: Se };
  Ae();
  var ae = At(), ge = l(ae);
  {
    var he = (x) => {
      var s = Pt(), G = l(s), we = N(G);
      {
        var w = (D) => {
          var ne = St();
          r(D, ne);
        };
        k(we, (D) => {
          y() && D(w);
        });
      }
      T(() => {
        H(s, "for", e(d)), K(s, 1, de(e(E)), "svelte-1qdann5"), ve(G, `${L() ?? ""} `);
      }), r(x, s);
    };
    k(ge, (x) => {
      L() && x(he);
    });
  }
  var je = N(ge, 2), f = l(je), ee = l(f);
  {
    var Ee = (x) => {
      var s = It(), G = l(s);
      s.value = s.__value = "", T(() => ve(G, Q())), r(x, s);
    };
    k(ee, (x) => {
      Q() && !B() && x(Ee);
    });
  }
  var _e = N(ee);
  ta(_e, 1, () => e(re), (x) => x.value, (x, s) => {
    var G = Ot(), we = l(G), w = {};
    T(() => {
      G.disabled = (e(s), le(() => e(s).disabled)), ve(we, (e(s), le(() => e(s).label))), w !== (w = (e(s), le(() => e(s).value))) && (G.value = (G.__value = (e(s), le(() => e(s).value))) ?? "");
    }), r(x, G);
  }), Ue(f, (x) => n(ze, x), () => e(ze));
  var ce;
  Ba(f);
  var ie = N(f, 2);
  {
    var Le = (x) => {
      var s = Ft(), G = l(s);
      {
        let we = xa(() => R() === "sm" ? 12 : R() === "md" ? 16 : 20);
        va(G, {
          get size() {
            return e(we);
          }
        });
      }
      T(() => K(s, 1, de(e(Y)), "svelte-1qdann5")), q("click", s, pe), q("keydown", s, (we) => we.key === "Enter" && pe(we)), r(x, s);
    };
    k(ie, (x) => {
      oe() && B() !== void 0 && B() !== "" && x(Le);
    });
  }
  var fe = N(ie, 2), g = l(fe);
  {
    let x = xa(() => R() === "sm" ? 16 : R() === "md" ? 20 : 24);
    Ja(g, {
      get size() {
        return e(x);
      }
    });
  }
  var Ie = N(fe, 2), Ke = N(je, 2);
  {
    var Ge = (x) => {
      var s = Wt(), G = l(s);
      {
        var we = (D) => {
          var ne = Rt(), ye = l(ne);
          ua(ye, { size: 16, class: "flex-shrink-0" });
          var Oe = N(ye, 2), se = l(Oe);
          T(() => ve(se, M())), r(D, ne);
        }, w = (D) => {
          var ne = ke(), ye = me(ne);
          {
            var Oe = (Be) => {
              var Ne = Dt(), Fe = l(Ne);
              fa(Fe, { size: 16, class: "flex-shrink-0" });
              var De = N(Fe, 2), Me = l(De);
              T(() => ve(Me, _())), r(Be, Ne);
            }, se = (Be) => {
              var Ne = ke(), Fe = me(Ne);
              {
                var De = (Me) => {
                  var Re = Kt(), Ve = l(Re);
                  T(() => ve(Ve, A())), r(Me, Re);
                };
                k(
                  Fe,
                  (Me) => {
                    A() && Me(De);
                  },
                  !0
                );
              }
              r(Be, Ne);
            };
            k(
              ye,
              (Be) => {
                _() ? Be(Oe) : Be(se, !1);
              },
              !0
            );
          }
          r(D, ne);
        };
        k(G, (D) => {
          M() ? D(we) : D(w, !1);
        });
      }
      T(() => {
        H(s, "id", `${e(d) ?? ""}-help`), K(s, 1, de(e(V)), "svelte-1qdann5");
      }), r(x, s);
    };
    k(Ke, (x) => {
      (M() || _() || A()) && x(Ge);
    });
  }
  return T(() => {
    K(ae, 1, de(e(p)), "svelte-1qdann5"), H(f, "id", e(d)), f.disabled = m(), f.required = y(), H(f, "name", be()), K(f, 1, de(e(I)), "svelte-1qdann5"), H(f, "aria-invalid", M() ? "true" : "false"), H(f, "aria-describedby", M() || _() || A() ? `${e(d)}-help` : void 0), ce !== (ce = B()) && (f.value = (f.__value = B()) ?? "", La(f, B())), K(fe, 1, de(e(W)), "svelte-1qdann5"), K(Ie, 1, `absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 ${e(Ce) ? "ring-2 ring-primary" : ""}`, "svelte-1qdann5");
  }), q("input", f, P), q("change", f, Z), q("focus", f, O), q("blur", f, z), q("keydown", f, C), q("keyup", f, J), r(j, ae), We(a, "focus", qe), We(a, "blur", Se), Te(Pe);
}
var Gt = u('<span class="text-error ml-1 svelte-1bsl3nr" aria-label="required">*</span>'), Vt = u("<label> <!></label>"), Yt = u("<div> </div>"), Ut = u('<div class="flex items-center gap-1 svelte-1bsl3nr"><!> <span class="svelte-1bsl3nr"> </span></div>'), Jt = u('<div class="flex items-center gap-1 svelte-1bsl3nr"><!> <span class="svelte-1bsl3nr"> </span></div>'), Qt = u('<span class="svelte-1bsl3nr"> </span>'), Zt = u("<div><!></div>"), $t = u('<div><!> <div class="relative svelte-1bsl3nr"><textarea></textarea></div> <!> <!></div>');
const er = {
  hash: "svelte-1bsl3nr",
  code: `
    /* Enhanced focus styles using semantic tokens */.textarea-focus-visible {outline:2px solid rgb(var(--color-focus-ring));outline-offset:2px;}

    /* Smooth transitions for all interactive elements */textarea.svelte-1bsl3nr {transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1);}

    /* Custom scrollbar for textarea using semantic tokens */textarea.svelte-1bsl3nr::-webkit-scrollbar {width:6px;}textarea.svelte-1bsl3nr::-webkit-scrollbar-track {background:transparent;}textarea.svelte-1bsl3nr::-webkit-scrollbar-thumb {background:rgb(var(--color-border-secondary));border-radius:3px;}textarea.svelte-1bsl3nr::-webkit-scrollbar-thumb:hover {background:rgb(var(--color-border-hover));}

    /* Placeholder styling using semantic tokens */textarea.svelte-1bsl3nr::-moz-placeholder {-moz-transition:color 0.2s ease;transition:color 0.2s ease;color:rgb(var(--color-text-placeholder));}textarea.svelte-1bsl3nr::placeholder {transition:color 0.2s ease;color:rgb(var(--color-text-placeholder));}textarea.svelte-1bsl3nr:focus::-moz-placeholder {color:rgb(var(--color-text-tertiary));}textarea.svelte-1bsl3nr:focus::placeholder {color:rgb(var(--color-text-tertiary));}

    /* Character count styling using semantic tokens */.char-count-warning.svelte-1bsl3nr {color:rgb(var(--color-warning));}.char-count-error.svelte-1bsl3nr {color:rgb(var(--color-error));}

    /* Resize handle styling */textarea.svelte-1bsl3nr:not(.resize-none) {resize:both;}textarea.resize-x.svelte-1bsl3nr {resize:horizontal;}textarea.resize-y.svelte-1bsl3nr {resize:vertical;}

    /* Focus ring animation */.focus-ring.svelte-1bsl3nr {
        animation: svelte-1bsl3nr-focus-ring-pulse 0.2s ease-out;}

    @keyframes svelte-1bsl3nr-focus-ring-pulse {
        0% {
            transform: scale(0.95);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }`
};
function fr(j, a) {
  He(a, !1), sa(j, er);
  const d = i(), c = i(), b = i(), F = i(), v = i(), p = i(), I = i(), E = i(), V = i(), W = i(), Y = i(), B = i(), S = i(), Q = i();
  let L = t(a, "value", 12, ""), m = t(a, "label", 8, ""), y = t(a, "placeholder", 8, ""), M = t(a, "helperText", 8, ""), _ = t(a, "disabled", 8, !1), A = t(a, "required", 8, !1), R = t(a, "readonly", 8, !1), X = t(a, "id", 8, void 0), U = t(a, "name", 8, void 0), oe = t(a, "error", 8, ""), be = t(a, "success", 8, ""), ue = t(a, "helpText", 8, ""), te = t(a, "maxLength", 8, void 0), xe = t(a, "minLength", 8, void 0), ze = t(a, "rows", 8, 4), Ce = t(a, "resize", 8, "vertical"), $ = t(a, "autoResize", 8, !1), re = t(a, "size", 8, "md"), P = t(a, "variant", 8, "outlined"), Z = t(a, "className", 8, ""), O = t(a, "ariaLabel", 8, void 0);
  const z = Xe();
  let C = i(), J = i(!1);
  function pe(s) {
    const G = s.target;
    L(G.value), n(J, L() !== ""), $() && je(), z("input", { value: L(), event: s, field: U() });
  }
  function qe(s) {
    const G = s.target;
    L(G.value), n(J, L() !== ""), z("change", { value: L(), event: s, field: U() });
  }
  function Se(s) {
    z("focus", { event: s });
  }
  function Pe(s) {
    z("blur", { event: s });
  }
  function ae(s) {
    z("keydown", { event: s });
  }
  function ge(s) {
    z("keyup", { event: s });
  }
  function he(s) {
    z("resize", { event: s });
  }
  function je() {
    e(C) && (oa(C, e(C).style.height = "auto"), oa(C, e(C).style.height = e(C).scrollHeight + "px"));
  }
  function f() {
    var s;
    (s = e(C)) == null || s.focus();
  }
  function ee() {
    var s;
    (s = e(C)) == null || s.blur();
  }
  function Ee() {
    var s;
    (s = e(C)) == null || s.select();
  }
  h(() => o(X()), () => {
    n(d, X() || `textarea-${Math.random().toString(36).substr(2, 9)}`);
  }), h(() => o(L()), () => {
    n(J, L() !== "" && L() !== null && L() !== void 0);
  }), h(() => o(oe()), () => {
    n(c, !!oe());
  }), h(() => o(be()), () => {
    n(b, !!be());
  }), h(() => {
  }, () => {
    n(F, {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-sm",
      lg: "px-5 py-3 text-base"
    });
  }), h(() => {
  }, () => {
    n(v, {
      outlined: "border border-primary bg-surface",
      filled: "border-0 bg-surface-secondary",
      underlined: "border-0 border-b border-primary bg-transparent rounded-none"
    });
  }), h(() => {
  }, () => {
    n(p, {
      none: "resize-none",
      both: "resize",
      horizontal: "resize-x",
      vertical: "resize-y"
    });
  }), h(
    () => (o(P()), e(F), o(re()), e(v), e(p), o(Ce()), o(Z())),
    () => {
      n(I, [
        "w-full",
        "min-w-0",
        P() === "underlined" ? "rounded-none" : "rounded-md",
        "transition-all",
        "duration-200",
        "ease-in-out",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-focus",
        "focus:ring-offset-2",
        "focus:ring-offset-surface",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
        "read-only:cursor-default",
        "read-only:opacity-75",
        "overflow-hidden",
        e(F)[re()],
        e(v)[P()],
        e(p)[Ce()],
        Z()
      ].join(" "));
    }
  ), h(() => (e(c), e(b)), () => {
    n(E, e(c) ? "border-error text-primary placeholder-placeholder focus:ring-error focus:border-error" : e(b) ? "border-success text-primary placeholder-placeholder focus:ring-success focus:border-success" : "text-primary placeholder-placeholder focus:ring-focus focus:border-focus");
  }), h(() => o(_()), () => {
    n(V, _() ? "bg-surface-disabled text-disabled border-disabled cursor-not-allowed" : "");
  }), h(
    () => (e(I), e(E), e(V)),
    () => {
      n(W, [
        e(I),
        e(E),
        e(V)
      ].join(" "));
    }
  ), h(() => {
  }, () => {
    n(Y, [
      "relative",
      "group",
      "transition-all",
      "duration-200",
      "ease-in-out"
    ].join(" "));
  }), h(() => (e(c), e(b)), () => {
    n(B, [
      "block",
      "text-sm",
      "font-medium",
      "mb-2",
      "transition-colors",
      "duration-200",
      e(c) ? "text-error" : e(b) ? "text-success" : "text-primary"
    ].join(" "));
  }), h(() => (e(c), e(b)), () => {
    n(S, [
      "mt-2",
      "text-xs",
      e(c) ? "text-error" : e(b) ? "text-success" : "text-secondary"
    ].join(" "));
  }), h(() => (o(te()), o(L())), () => {
    n(Q, [
      "text-xs",
      "text-secondary",
      "mt-1",
      "text-right",
      te() && L().length > te() * 0.9 ? "text-warning" : "",
      te() && L().length >= te() ? "text-error" : ""
    ].join(" "));
  }), Ye();
  var _e = { focus: f, blur: ee, select: Ee };
  Ae();
  var ce = $t(), ie = l(ce);
  {
    var Le = (s) => {
      var G = Vt(), we = l(G), w = N(we);
      {
        var D = (ne) => {
          var ye = Gt();
          r(ne, ye);
        };
        k(w, (ne) => {
          A() && ne(D);
        });
      }
      T(() => {
        H(G, "for", e(d)), K(G, 1, de(e(B)), "svelte-1bsl3nr"), ve(we, `${m() ?? ""} `);
      }), r(s, G);
    };
    k(ie, (s) => {
      m() && s(Le);
    });
  }
  var fe = N(ie, 2), g = l(fe);
  Ue(g, (s) => n(C, s), () => e(C));
  var Ie = N(fe, 2);
  {
    var Ke = (s) => {
      var G = Yt(), we = l(G);
      T(() => {
        K(G, 1, de(e(Q)), "svelte-1bsl3nr"), ve(we, `${o(L()), le(() => L().length) ?? ""}/${te() ?? ""}`);
      }), r(s, G);
    };
    k(Ie, (s) => {
      te() && s(Ke);
    });
  }
  var Ge = N(Ie, 2);
  {
    var x = (s) => {
      var G = Zt(), we = l(G);
      {
        var w = (ne) => {
          var ye = Ut(), Oe = l(ye);
          ua(Oe, { size: 14, class: "flex-shrink-0" });
          var se = N(Oe, 2), Be = l(se);
          T(() => ve(Be, oe())), r(ne, ye);
        }, D = (ne) => {
          var ye = ke(), Oe = me(ye);
          {
            var se = (Ne) => {
              var Fe = Jt(), De = l(Fe);
              fa(De, { size: 14, class: "flex-shrink-0" });
              var Me = N(De, 2), Re = l(Me);
              T(() => ve(Re, be())), r(Ne, Fe);
            }, Be = (Ne) => {
              var Fe = ke(), De = me(Fe);
              {
                var Me = (Re) => {
                  var Ve = Qt(), ra = l(Ve);
                  T(() => ve(ra, ue())), r(Re, Ve);
                };
                k(
                  De,
                  (Re) => {
                    ue() && Re(Me);
                  },
                  !0
                );
              }
              r(Ne, Fe);
            };
            k(
              Oe,
              (Ne) => {
                e(b) ? Ne(se) : Ne(Be, !1);
              },
              !0
            );
          }
          r(ne, ye);
        };
        k(we, (ne) => {
          e(c) ? ne(w) : ne(D, !1);
        });
      }
      T(() => {
        H(G, "id", `${e(d) ?? ""}-help`), K(G, 1, de(e(S)), "svelte-1bsl3nr");
      }), r(s, G);
    };
    k(Ge, (s) => {
      (e(c) || e(b) || ue()) && s(x);
    });
  }
  return T(() => {
    K(ce, 1, de(e(Y)), "svelte-1bsl3nr"), H(g, "id", e(d)), _a(g, L()), H(g, "placeholder", y()), g.disabled = _(), g.required = A(), g.readOnly = R(), H(g, "maxlength", te()), H(g, "minlength", xe()), H(g, "name", U()), H(g, "rows", ze()), K(g, 1, de(e(W)), "svelte-1bsl3nr"), H(g, "aria-invalid", e(c) ? "true" : "false"), H(g, "aria-describedby", e(c) || e(b) || M() || te() ? `${e(d)}-help` : void 0), H(g, "aria-label", O() || (m() ? void 0 : "Textarea field")), H(g, "aria-required", A());
  }), q("input", g, pe), q("change", g, qe), q("focus", g, (s) => Se(s)), q("blur", g, (s) => Pe(s)), q("keydown", g, (s) => ae(s)), q("keyup", g, (s) => ge(s)), q("resize", g, he), r(j, ce), We(a, "focus", f), We(a, "blur", ee), We(a, "select", Ee), Te(_e);
}
var ar = u('<span class="text-red-400 ml-1">*</span>'), tr = u('<button type="button" role="radio"><!> <span class="hidden sm:inline"> </span></button>'), rr = u('<div class="space-y-2"><label class="block text-sm font-medium text-stone-300"> <!></label> <div class="flex gap-1 p-1 bg-stone-800 rounded-lg border border-stone-700 min-w-48 sm:min-w-56 md:min-w-64 lg:min-w-72" role="radiogroup"></div></div>');
function br(j, a) {
  He(a, !1);
  let d = t(a, "value", 12, "center"), c = t(a, "label", 8, "Text Alignment"), b = t(a, "required", 8, !1), F = t(a, "size", 8, "sm");
  const v = Xe(), p = `text-alignment-${Math.random().toString(36).substr(2, 9)}`, I = [
    { value: "left", label: "Left", component: at },
    { value: "center", label: "Center", component: $a },
    { value: "right", label: "Right", component: et }
  ];
  function E(m) {
    d(m), v("change", { value: m });
  }
  const V = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-2",
    lg: "text-base px-4 py-3"
  };
  Ae();
  var W = rr(), Y = l(W), B = l(Y), S = N(B);
  {
    var Q = (m) => {
      var y = ar();
      r(m, y);
    };
    k(S, (m) => {
      b() && m(Q);
    });
  }
  var L = N(Y, 2);
  ta(L, 5, () => I, Na, (m, y) => {
    var M = tr(), _ = l(M);
    ia(_, () => e(y).component, (X, U) => {
      U(X, { size: 16 });
    });
    var A = N(_, 2), R = l(A);
    T(() => {
      K(M, 1, `flex-1 flex items-center justify-center gap-2 ${o(F()), le(() => V[F()]) ?? ""} rounded-md transition-all duration-200 ${o(d()), e(y), le(() => d() === e(y).value ? "bg-blue-600 text-white shadow-sm" : "text-stone-400 hover:text-stone-200 hover:bg-stone-700") ?? ""}`), H(M, "aria-checked", (o(d()), e(y), le(() => d() === e(y).value))), H(M, "aria-label", (e(y), le(() => e(y).label))), ve(R, (e(y), le(() => e(y).label)));
    }), q("click", M, () => E(e(y).value)), q("keydown", M, (X) => {
      X.key === "Enter" && E(e(y).value);
    }), r(m, M);
  }), T(() => {
    H(Y, "for", p), ve(B, `${c() ?? ""} `), H(L, "id", p), H(L, "aria-label", c());
  }), r(j, W), Te();
}
var nr = u('<button type="button" class="text-sm font-medium text-primary cursor-pointer select-none hover:text-secondary transition-colors"> </button>'), sr = u('<div><button type="button" role="switch"><span></span></button> <!></div>');
function gr(j, a) {
  He(a, !1);
  const d = i();
  let c = t(a, "checked", 12, !1), b = t(a, "disabled", 8, !1), F = t(a, "label", 8, ""), v = t(a, "size", 8, "md"), p = t(a, "className", 8, "");
  const I = Xe();
  function E() {
    b() || (c(!c()), I("change", { checked: c() }));
  }
  const V = { sm: "w-8 h-4", md: "w-11 h-6", lg: "w-14 h-7" }, W = { sm: "w-3 h-3", md: "w-5 h-5", lg: "w-6 h-6" };
  h(() => o(c()), () => {
    n(d, {
      sm: c() ? "translate-x-4" : "translate-x-0",
      md: c() ? "translate-x-5" : "translate-x-0",
      lg: c() ? "translate-x-7" : "translate-x-0"
    });
  }), Ye(), Ae();
  var Y = sr(), B = l(Y), S = l(B), Q = N(B, 2);
  {
    var L = (m) => {
      var y = nr(), M = l(y);
      T(() => ve(M, F())), q("click", y, E), q("keydown", y, (_) => {
        const A = _;
        (A.key === "Enter" || A.key === " ") && (A.preventDefault(), E());
      }), r(m, y);
    };
    k(Q, (m) => {
      F() && m(L);
    });
  }
  T(() => {
    K(Y, 1, `flex items-center space-x-3 min-w-32 sm:min-w-36 md:min-w-40 lg:min-w-44 ${p() ?? ""}`), H(B, "aria-checked", c()), H(B, "aria-label", F() || "Toggle"), B.disabled = b(), K(B, 1, `relative inline-flex ${o(v()), le(() => V[v()]) ?? ""} flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${c() ? "bg-primary" : "bg-surface-tertiary"} ${b() ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-80"}`), K(S, 1, `pointer-events-none inline-block ${o(v()), le(() => W[v()]) ?? ""} transform rounded-full bg-surface shadow-lg ring-0 transition duration-200 ease-in-out ${e(d), o(v()), le(() => e(d)[v()]) ?? ""}`);
  }), q("click", B, E), q("keydown", B, (m) => {
    const y = m;
    (y.key === "Enter" || y.key === " ") && (y.preventDefault(), E());
  }), r(j, Y), Te();
}
export {
  ir as B,
  dr as C,
  Ua as D,
  vr as I,
  ur as S,
  fr as T,
  cr as a,
  br as b,
  gr as c,
  lt as d,
  pa as p
};
