import { a0 as wa, u as ne, a1 as ka, a as sa, p as t, C as h, D as Ye, i as Ae, f, _ as za, c as k, s as oa, e as q, g as r, h as Te, j as He, r as l, l as e, m as i, n as o, o as L, k as n, x as ca, w as ke, b as me, t as N, B as ce, M as ia, d as Ue, G as We, q as K, F as ie, v as T, $ as la, P as aa, y as da, z as Ca, I as Je, H as Qe, J as Ze, K as $e, L as ea, A as qa, a2 as ja, X as va, E as ta, a3 as ha, a4 as ma, a5 as ya, N as ua, O as fa, a6 as Ea, Y as xa, a7 as Ba, Z as La } from "./x-DpVwziig.js";
import { createEventDispatcher as Xe, onMount as ba } from "svelte";
function Na(M, a, c = a) {
  wa(M, "change", (d) => {
    var b = d ? M.defaultChecked : M.checked;
    c(b);
  }), // If we are hydrating and the value has since changed,
  // then use the update value from the input instead.
  // If defaultChecked is set, then checked == defaultChecked
  ne(a) == null && c(M.checked), ka(() => {
    var d = a();
    M.checked = !!d;
  });
}
var Ta = ca('<svg class="animate-spin h-4 w-4 svelte-v0x5nl" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>'), Ha = f('<span class="h-4 w-4 flex items-center justify-center"> </span>'), Ma = f('<span class="h-4 w-4 flex items-center justify-center"> </span>'), Sa = f("<button><!> <!> <!> <!></button>");
const Pa = {
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
function lr(M, a) {
  He(a, !1), sa(M, Pa);
  const c = i(), d = i();
  let b = t(a, "variant", 8, "primary"), F = t(a, "size", 8, "md"), v = t(a, "disabled", 8, !1), p = t(a, "loading", 8, !1), O = t(a, "type", 8, "button"), j = t(a, "className", 8, ""), Y = t(a, "iconLeft", 8, null), W = t(a, "iconRight", 8, null), J = t(a, "ariaLabel", 8, ""), E = t(a, "ariaDescribedBy", 8, ""), S = t(a, "ariaExpanded", 8, void 0), Q = t(a, "ariaControls", 8, void 0), B = t(a, "ariaPressed", 8, void 0);
  const m = Xe();
  function y(A) {
    if (v() || p()) {
      A.preventDefault();
      return;
    }
    m("click", { value: !0, event: A });
  }
  function H(A) {
    v() || p() || (A.key === "Enter" || A.key === " ") && (A.preventDefault(), m("click", { value: !0, event: A }));
  }
  const _ = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden", G = {
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
    () => (l(F()), l(v()), l(b()), l(j())),
    () => {
      n(c, [
        _,
        G[F()],
        v() ? X : R[b()],
        j()
      ].filter(Boolean).join(" "));
    }
  ), h(
    () => (l(p()), l(J()), l(E()), l(S()), l(Q()), l(B()), l(v())),
    () => {
      n(d, {
        "aria-busy": p(),
        "aria-label": J() || (p() ? "Loading..." : void 0),
        "aria-describedby": E() || void 0,
        "aria-expanded": S(),
        "aria-controls": Q(),
        "aria-pressed": B(),
        "aria-disabled": v()
      });
    }
  ), Ye(), Ae();
  var $ = Sa();
  za(
    $,
    () => ({
      type: O(),
      class: e(c),
      disabled: v() || p(),
      ...e(d)
    }),
    void 0,
    void 0,
    "svelte-v0x5nl"
  );
  var se = o($);
  {
    var be = (A) => {
      var ue = Ta();
      r(A, ue);
    };
    k(se, (A) => {
      p() && A(be);
    });
  }
  var ve = L(se, 2);
  {
    var oe = (A) => {
      var ue = ke(), P = me(ue);
      {
        var Z = (z) => {
          var C = Ha(), U = o(C);
          N(() => ce(U, Y())), r(z, C);
        }, D = (z) => {
          var C = ke(), U = me(C);
          ia(U, Y, (pe, qe) => {
            qe(pe, { class: "h-4 w-4" });
          }), r(z, C);
        };
        k(P, (z) => {
          typeof Y() == "string" ? z(Z) : z(D, !1);
        });
      }
      r(A, ue);
    };
    k(ve, (A) => {
      Y() && !p() && A(oe);
    });
  }
  var xe = L(ve, 2);
  oa(xe, a, "default", {}, null);
  var ze = L(xe, 2);
  {
    var Ce = (A) => {
      var ue = ke(), P = me(ue);
      {
        var Z = (z) => {
          var C = Ma(), U = o(C);
          N(() => ce(U, W())), r(z, C);
        }, D = (z) => {
          var C = ke(), U = me(C);
          ia(U, W, (pe, qe) => {
            qe(pe, { class: "h-4 w-4" });
          }), r(z, C);
        };
        k(P, (z) => {
          typeof W() == "string" ? z(Z) : z(D, !1);
        });
      }
      r(A, ue);
    };
    k(ze, (A) => {
      W() && !p() && A(Ce);
    });
  }
  q("click", $, (A) => y(A)), q("keydown", $, (A) => H(A)), r(M, $), Te();
}
var Ia = ca('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" class="svelte-1wpeqgu"></path></svg>'), Oa = ca('<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" class="svelte-1wpeqgu"></path></svg>'), Da = f('<span class="text-error ml-1 svelte-1wpeqgu">*</span>'), Fa = f("<label> <!></label>"), Ra = f('<div class="flex items-center gap-1 svelte-1wpeqgu"><svg class="w-3 h-3 flex-shrink-0 svelte-1wpeqgu" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" class="svelte-1wpeqgu"></path></svg> <span class="svelte-1wpeqgu"> </span></div>'), Ka = f('<span class="svelte-1wpeqgu"> </span>'), Wa = f("<div><!></div>"), Aa = f('<div><div class="relative svelte-1wpeqgu"><input type="checkbox" class="sr-only svelte-1wpeqgu"/> <div><!></div> <div></div></div> <div class="flex-1 min-w-0 svelte-1wpeqgu"><!> <!></div></div>');
const Xa = {
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
function ir(M, a) {
  He(a, !1), sa(M, Xa);
  const c = i(), d = i(), b = i(), F = i(), v = i(), p = i(), O = i(), j = i(), Y = i(), W = i();
  let J = t(a, "checked", 12, !1), E = t(a, "disabled", 8, !1), S = t(a, "required", 8, !1), Q = t(a, "label", 8, ""), B = t(a, "helpText", 8, ""), m = t(a, "error", 8, ""), y = t(a, "size", 8, "md"), H = t(a, "variant", 8, "default"), _ = t(a, "indeterminate", 8, !1), G = t(a, "name", 8, void 0), R = t(a, "id", 8, void 0), X = t(a, "value", 8, void 0), $ = t(a, "className", 8, "");
  const se = Xe();
  let be = i(), ve = i(!1);
  function oe(u) {
    const ee = u.target;
    J(ee.checked), se("change", { checked: J() });
  }
  function xe(u) {
    n(ve, !0), se("focus", { event: u });
  }
  function ze(u) {
    n(ve, !1), se("blur", { event: u });
  }
  function Ce() {
    var u;
    (u = e(be)) == null || u.focus();
  }
  function A() {
    var u;
    (u = e(be)) == null || u.blur();
  }
  h(() => l(R()), () => {
    n(c, R() || `checkbox-${Math.random().toString(36).substr(2, 9)}`);
  }), h(() => {
  }, () => {
    n(d, { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" });
  }), h(() => {
  }, () => {
    n(b, {
      default: "bg-surface border border-primary text-primary focus:ring-primary focus:border-transparent",
      outlined: "bg-surface-secondary border border-primary text-primary focus:ring-primary focus:border-transparent",
      filled: "bg-surface-secondary border border-primary text-primary focus:ring-primary focus:border-transparent"
    });
  }), h(() => l(m()), () => {
    n(F, m() ? "focus:ring-error border-error" : "");
  }), h(() => l($()), () => {
    n(v, [
      "relative",
      "flex",
      "items-start",
      "gap-3",
      "group",
      "transition-all",
      "duration-200",
      "ease-in-out",
      $()
    ].join(" "));
  }), h(
    () => (e(d), l(y()), e(b), l(H()), e(F), l(m())),
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
        e(d)[y()],
        e(b)[H()],
        e(F),
        m() ? "grainy-red" : "grainy-texture"
      ].join(" "));
    }
  ), h(() => (l(m()), l(E())), () => {
    n(O, [
      "text-sm",
      "font-medium",
      "cursor-pointer",
      "select-none",
      "transition-colors",
      "duration-200",
      m() ? "text-error" : "text-primary",
      E() ? "opacity-50 cursor-not-allowed" : ""
    ].join(" "));
  }), h(() => l(m()), () => {
    n(j, ["text-xs", "mt-1", m() ? "text-error" : "text-tertiary"].join(" "));
  }), h(() => {
  }, () => {
    n(Y, [
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
  var ue = { focus: Ce, blur: A };
  Ae();
  var P = Aa(), Z = o(P), D = o(Z);
  Ue(D, (u) => n(be, u), () => e(be));
  var z, C = L(D, 2), U = o(C);
  {
    var pe = (u) => {
      var ee = Ia();
      N(() => K(ee, 0, ie(e(Y)), "svelte-1wpeqgu")), r(u, ee);
    }, qe = (u) => {
      var ee = ke(), Ee = me(ee);
      {
        var _e = (de) => {
          var le = Oa();
          N(() => K(le, 0, ie(e(W)), "svelte-1wpeqgu")), r(de, le);
        };
        k(
          Ee,
          (de) => {
            _() && de(_e);
          },
          !0
        );
      }
      r(u, ee);
    };
    k(U, (u) => {
      J() && !_() ? u(pe) : u(qe, !1);
    });
  }
  var Se = L(C, 2), Pe = L(Z, 2), ae = o(Pe);
  {
    var ge = (u) => {
      var ee = Fa(), Ee = o(ee), _e = L(Ee);
      {
        var de = (le) => {
          var Le = Da();
          r(le, Le);
        };
        k(_e, (le) => {
          S() && le(de);
        });
      }
      N(() => {
        T(ee, "for", e(c)), K(ee, 1, ie(e(O)), "svelte-1wpeqgu"), ce(Ee, `${Q() ?? ""} `);
      }), r(u, ee);
    };
    k(ae, (u) => {
      Q() && u(ge);
    });
  }
  var he = L(ae, 2);
  {
    var je = (u) => {
      var ee = Wa(), Ee = o(ee);
      {
        var _e = (le) => {
          var Le = Ra(), fe = L(o(Le), 2), g = o(fe);
          N(() => ce(g, m())), r(le, Le);
        }, de = (le) => {
          var Le = ke(), fe = me(Le);
          {
            var g = (Ie) => {
              var Ke = Ka(), Ge = o(Ke);
              N(() => ce(Ge, B())), r(Ie, Ke);
            };
            k(
              fe,
              (Ie) => {
                B() && Ie(g);
              },
              !0
            );
          }
          r(le, Le);
        };
        k(Ee, (le) => {
          m() ? le(_e) : le(de, !1);
        });
      }
      N(() => {
        T(ee, "id", `${e(c) ?? ""}-help`), K(ee, 1, ie(e(j)), "svelte-1wpeqgu");
      }), r(u, ee);
    };
    k(he, (u) => {
      (m() || B()) && u(je);
    });
  }
  return N(() => {
    K(P, 1, ie(e(v)), "svelte-1wpeqgu"), T(D, "id", e(c)), D.disabled = E(), D.required = S(), T(D, "name", G()), T(D, "aria-invalid", m() ? "true" : "false"), T(D, "aria-describedby", m() || B() ? `${e(c)}-help` : void 0), z !== (z = X()) && (D.value = (D.__value = X()) ?? ""), K(C, 1, ie(e(p)), "svelte-1wpeqgu"), K(Se, 1, `absolute inset-0 rounded pointer-events-none transition-all duration-200 ${e(ve) ? "ring-2 ring-primary" : ""}`, "svelte-1wpeqgu");
  }), Na(D, J), q("change", D, oe), q("focus", D, (u) => xe(u)), q("blur", D, (u) => ze(u)), r(M, P), We(a, "focus", Ce), We(a, "blur", A), Te(ue);
}
var Ga = f('<div role="menu" aria-orientation="vertical"><div class="max-h-full overflow-y-auto"><!></div></div>'), Va = f("<div><!></div> <!>", 1);
function Ya(M, a) {
  He(a, !1);
  let c = t(a, "isOpen", 8, !1), d = t(a, "placement", 8, "bottom-start"), b = t(a, "offset", 8, 8), F = t(a, "maxHeight", 8, "20rem"), v = t(a, "width", 8, "auto"), p = t(a, "zIndex", 8, 50);
  const O = Xe();
  let j = i(), Y = i(), W;
  function J() {
    var be, ve, oe, xe, ze, Ce, A, ue;
    if (!e(Y)) return { top: 0, left: 0 };
    W = e(Y).getBoundingClientRect();
    const _ = window.scrollY, G = window.scrollX;
    let R = W.bottom + _ + b(), X = W.left + G;
    switch (d()) {
      case "bottom-end":
        X = W.right + G - (((be = e(j)) == null ? void 0 : be.offsetWidth) || 0);
        break;
      case "top-start":
        R = W.top + _ - (((ve = e(j)) == null ? void 0 : ve.offsetHeight) || 0) - b();
        break;
      case "top-end":
        R = W.top + _ - (((oe = e(j)) == null ? void 0 : oe.offsetHeight) || 0) - b(), X = W.right + G - (((xe = e(j)) == null ? void 0 : xe.offsetWidth) || 0);
        break;
    }
    const $ = window.innerWidth, se = window.innerHeight;
    return X < 0 && (X = 8), X + (((ze = e(j)) == null ? void 0 : ze.offsetWidth) || 0) > $ && (X = $ - (((Ce = e(j)) == null ? void 0 : Ce.offsetWidth) || 0) - 8), R < 0 && (R = 8), R + (((A = e(j)) == null ? void 0 : A.offsetHeight) || 0) > se + _ && (R = se + _ - (((ue = e(j)) == null ? void 0 : ue.offsetHeight) || 0) - 8), { top: R, left: X };
  }
  function E(_) {
    c() && e(j) && !e(j).contains(_.target) && e(Y) && !e(Y).contains(_.target) && O("close");
  }
  function S(_) {
    _.key === "Escape" && c() && O("close");
  }
  ba(() => (document.addEventListener("click", E), document.addEventListener("keydown", S), () => {
    document.removeEventListener("click", E), document.removeEventListener("keydown", S);
  })), h(
    () => (l(c()), e(Y), e(j)),
    () => {
      c() && e(Y) && requestAnimationFrame(() => {
        const _ = J();
        e(j) && (la(j, e(j).style.top = `${_.top}px`), la(j, e(j).style.left = `${_.left}px`));
      });
    }
  ), Ye(), Ae();
  var Q = Va(), B = me(Q), m = o(B);
  oa(m, a, "trigger", {}, null), Ue(B, (_) => n(Y, _), () => e(Y));
  var y = L(B, 2);
  {
    var H = (_) => {
      var G = Ga(), R = o(G), X = o(R);
      oa(X, a, "default", {}, null), Ue(G, ($) => n(j, $), () => e(j)), N(() => {
        K(G, 1, `fixed z-${p() ?? ""} bg-stone-800 border border-stone-700 rounded-lg shadow-xl`), aa(G, `max-height: ${F() ?? ""}; width: ${v() ?? ""};`);
      }), da(3, G, () => Ca, () => ({ y: -10, duration: 200 })), r(_, G);
    };
    k(y, (_) => {
      c() && _(H);
    });
  }
  r(M, Q), Te();
}
function pa(M, a) {
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
  let c = ea(a, ["$$slots", "$$events", "$$legacy"]);
  const d = [["path", { d: "M20 6 9 17l-5-5" }]];
  Je(M, Qe(
    { name: "check" },
    () => c,
    {
      get iconNode() {
        return d;
      },
      children: (b, F) => {
        var v = ke(), p = me(v);
        Ze(p, () => a.children ?? $e), r(b, v);
      },
      $$slots: { default: !0 }
    }
  )), Te();
}
function Ua(M, a) {
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
  let c = ea(a, ["$$slots", "$$events", "$$legacy"]);
  const d = [["path", { d: "m6 9 6 6 6-6" }]];
  Je(M, Qe(
    { name: "chevron-down" },
    () => c,
    {
      get iconNode() {
        return d;
      },
      children: (b, F) => {
        var v = ke(), p = me(v);
        Ze(p, () => a.children ?? $e), r(b, v);
      },
      $$slots: { default: !0 }
    }
  )), Te();
}
function Ja(M, a) {
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
  let c = ea(a, ["$$slots", "$$events", "$$legacy"]);
  const d = [
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
  Je(M, Qe(
    { name: "eye-off" },
    () => c,
    {
      get iconNode() {
        return d;
      },
      children: (b, F) => {
        var v = ke(), p = me(v);
        Ze(p, () => a.children ?? $e), r(b, v);
      },
      $$slots: { default: !0 }
    }
  )), Te();
}
function Qa(M, a) {
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
  let c = ea(a, ["$$slots", "$$events", "$$legacy"]);
  const d = [
    [
      "path",
      {
        d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "3" }]
  ];
  Je(M, Qe(
    { name: "eye" },
    () => c,
    {
      get iconNode() {
        return d;
      },
      children: (b, F) => {
        var v = ke(), p = me(v);
        Ze(p, () => a.children ?? $e), r(b, v);
      },
      $$slots: { default: !0 }
    }
  )), Te();
}
function Za(M, a) {
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
  let c = ea(a, ["$$slots", "$$events", "$$legacy"]);
  const d = [
    ["path", { d: "M21 5H3" }],
    ["path", { d: "M17 12H7" }],
    ["path", { d: "M19 19H5" }]
  ];
  Je(M, Qe(
    { name: "text-align-center" },
    () => c,
    {
      get iconNode() {
        return d;
      },
      children: (b, F) => {
        var v = ke(), p = me(v);
        Ze(p, () => a.children ?? $e), r(b, v);
      },
      $$slots: { default: !0 }
    }
  )), Te();
}
function $a(M, a) {
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
  let c = ea(a, ["$$slots", "$$events", "$$legacy"]);
  const d = [
    ["path", { d: "M21 5H3" }],
    ["path", { d: "M21 12H9" }],
    ["path", { d: "M21 19H7" }]
  ];
  Je(M, Qe(
    { name: "text-align-end" },
    () => c,
    {
      get iconNode() {
        return d;
      },
      children: (b, F) => {
        var v = ke(), p = me(v);
        Ze(p, () => a.children ?? $e), r(b, v);
      },
      $$slots: { default: !0 }
    }
  )), Te();
}
function et(M, a) {
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
  let c = ea(a, ["$$slots", "$$events", "$$legacy"]);
  const d = [
    ["path", { d: "M21 5H3" }],
    ["path", { d: "M15 12H3" }],
    ["path", { d: "M17 19H3" }]
  ];
  Je(M, Qe(
    { name: "text-align-start" },
    () => c,
    {
      get iconNode() {
        return d;
      },
      children: (b, F) => {
        var v = ke(), p = me(v);
        Ze(p, () => a.children ?? $e), r(b, v);
      },
      $$slots: { default: !0 }
    }
  )), Te();
}
var at = f('<div role="dialog" aria-modal="true" aria-labelledby="slideup-title" tabindex="-1"></div>'), tt = f('<div class="flex items-center justify-between p-4 border-b border-stone-700"><h3 id="slideup-title" class="text-lg font-semibold text-white"> </h3> <button type="button" class="p-2 text-gray-400 hover:text-white transition-colors duration-200" aria-label="Close"><!></button></div>'), rt = f('<div role="dialog" aria-modal="true" aria-labelledby="slideup-title"><!> <div class="max-h-full overflow-y-auto"><!></div></div>'), nt = f("<!> <!>", 1);
function st(M, a) {
  He(a, !1);
  let c = t(a, "isOpen", 8, !1), d = t(a, "title", 8, ""), b = t(a, "maxHeight", 8, "80vh"), F = t(a, "zIndex", 8, 50);
  const v = Xe();
  let p = i(), O = i();
  function j(m) {
    c() && e(O) && m.target === e(O) && v("close");
  }
  function Y(m) {
    m.key === "Escape" && c() && v("close");
  }
  function W(m) {
    typeof document < "u" && (m ? document.body.style.overflow = "hidden" : document.body.style.overflow = "");
  }
  ba(() => (typeof document < "u" && document.addEventListener("keydown", Y), () => {
    typeof document < "u" && (document.removeEventListener("keydown", Y), document.body.style.overflow = "");
  })), h(() => l(c()), () => {
    typeof document < "u" && W(c());
  }), Ye(), Ae();
  var J = nt(), E = me(J);
  {
    var S = (m) => {
      var y = at();
      Ue(y, (H) => n(O, H), () => e(O)), N(() => K(y, 1, `fixed inset-0 z-${F() ?? ""} bg-black/50`)), q("click", y, j), q("keydown", y, (H) => H.key === "Escape" && j(H)), da(3, y, () => qa, () => ({ duration: 200 })), r(m, y);
    };
    k(E, (m) => {
      c() && m(S);
    });
  }
  var Q = L(E, 2);
  {
    var B = (m) => {
      var y = rt(), H = o(y);
      {
        var _ = (X) => {
          var $ = tt(), se = o($), be = o(se), ve = L(se, 2), oe = o(ve);
          va(oe, { size: 20 }), N(() => ce(be, d())), q("click", ve, () => v("close")), r(X, $);
        };
        k(H, (X) => {
          d() && X(_);
        });
      }
      var G = L(H, 2), R = o(G);
      oa(R, a, "default", {}, null), Ue(y, (X) => n(p, X), () => e(p)), N(() => {
        K(y, 1, `fixed bottom-0 left-0 right-0 z-${F() + 1} bg-stone-800 border-t border-stone-700 rounded-t-xl shadow-2xl`), aa(y, `max-height: ${b() ?? ""};`);
      }), da(3, y, () => ja, () => ({ axis: "y", duration: 300 })), r(m, y);
    };
    k(Q, (m) => {
      c() && m(B);
    });
  }
  r(M, J), Te();
}
var ot = f('<span class="text-blood-red-500 ml-1">*</span>'), lt = f("<label> <!></label>"), it = f('<div class="absolute -top-1 -right-1 w-4 h-4 bg-cyber-amber-500 rounded-full flex items-center justify-center"><!></div>'), dt = f('<button type="button"><div></div> <!></button>'), ct = f('<div class="space-y-2"><div class="grid grid-cols-11 gap-3 p-1 bg-stone-800 rounded-lg border border-stone-700"></div></div>'), vt = f('<div class="p-4"><div class="max-h-96 overflow-y-auto space-y-4 pr-2"></div></div>'), ut = f('<div class="w-8 h-8 rounded border border-stone-600 flex-shrink-0"></div>'), ft = f('<div class="w-8 h-8 rounded border border-stone-600 flex-shrink-0 bg-stone-700"></div> <span class="text-gray-400">Select a color</span>', 1), bt = f('<div class="relative"><button type="button"><div class="flex items-center space-x-3"><!></div></button> <div></div></div>'), gt = f('<div class="w-8 h-8 rounded border border-stone-600 flex-shrink-0"></div>'), ht = f('<div class="w-8 h-8 rounded border border-stone-600 flex-shrink-0 bg-stone-700"></div> <span class="text-gray-400">Select a color</span>', 1), mt = f('<div class="absolute -top-1 -right-1 w-4 h-4 bg-cyber-amber-500 rounded-full flex items-center justify-center"><!></div>'), xt = f('<button type="button"><div></div> <!></button>'), pt = f('<div class="space-y-2"><div class="grid grid-cols-8 gap-3 p-1 bg-stone-800 rounded-lg border border-stone-700"></div></div>'), yt = f('<div class="p-4"><div class="max-h-96 overflow-y-auto space-y-4 pr-2"></div></div>'), _t = f('<div class="relative"><button type="button"><div class="flex items-center space-x-3"><!></div></button> <div></div></div> <!>', 1), wt = f('<div class="text-center py-6 text-stone-500 text-sm">No colors available</div>'), kt = f('<div class="space-y-3"><!> <!> <!> <!></div>');
function dr(M, a) {
  He(a, !1);
  const c = i(), d = i(), b = i(), F = i(), v = i(), p = i();
  let O = t(a, "value", 12, ""), j = t(a, "label", 8, ""), Y = t(a, "required", 8, !1), W = t(a, "disabled", 8, !1), J = t(a, "size", 8, "md"), E = t(a, "variant", 8, "outlined"), S = t(a, "colors", 24, () => [
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
  ]), Q = i(!1), B = i(!1), m = i(!1);
  const y = Xe(), H = `color-picker-${Math.random().toString(36).substr(2, 9)}`;
  ba(() => {
    n(m, window.innerWidth < 768);
    const P = () => {
      n(m, window.innerWidth < 768);
    };
    return window.addEventListener("resize", P), () => window.removeEventListener("resize", P);
  });
  function _(P) {
    W() || (O(P.value), n(
      Q,
      !1
      // Collapse after selection
    ), y("change", { value: P.value }));
  }
  function G() {
    W() || n(Q, !e(Q));
  }
  function R() {
    n(B, !0);
  }
  function X() {
    n(B, !1);
  }
  function $() {
    n(Q, !1);
  }
  h(() => {
  }, () => {
    n(c, {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-5 py-3 text-lg"
    });
  }), h(() => {
  }, () => {
    n(d, {
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
    () => (e(c), l(J()), e(d), l(E())),
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
        e(c)[J()],
        e(d)[E()],
        "grainy-texture"
      ].join(" "));
    }
  ), h(() => (l(S()), l(O())), () => {
    n(v, S().find((P) => P.value === O()));
  }), h(() => l(S()), () => {
    n(p, S().reduce(
      (P, Z) => {
        const D = Z.family || "Other";
        return P[D] || (P[D] = []), P[D].push(Z), P;
      },
      {}
    ));
  }), Ye(), Ae();
  var se = kt(), be = o(se);
  {
    var ve = (P) => {
      var Z = lt(), D = o(Z), z = L(D);
      {
        var C = (U) => {
          var pe = ot();
          r(U, pe);
        };
        k(z, (U) => {
          Y() && U(C);
        });
      }
      N(() => {
        T(Z, "for", H), K(Z, 1, ie(e(b))), ce(D, `${j() ?? ""} `);
      }), r(P, Z);
    };
    k(be, (P) => {
      j() && P(ve);
    });
  }
  var oe = L(be, 2);
  {
    var xe = (P) => {
      Ya(P, {
        placement: "bottom-start",
        width: "auto",
        maxHeight: "20rem",
        get isOpen() {
          return e(Q);
        },
        set isOpen(Z) {
          n(Q, Z);
        },
        $$events: { close: $ },
        children: (Z, D) => {
          var z = vt(), C = o(z);
          ta(
            C,
            5,
            () => (e(p), ne(() => Object.entries(e(p)))),
            ([U, pe]) => U,
            (U, pe) => {
              var qe = ha(() => ma(e(pe), 2));
              let Se = () => e(qe)[1];
              var Pe = ct(), ae = o(Pe);
              ta(ae, 5, Se, (ge) => ge.value, (ge, he) => {
                var je = dt(), u = o(je), ee = L(u, 2);
                {
                  var Ee = (_e) => {
                    var de = it(), le = o(de);
                    pa(le, { size: 8, class: "text-stone-900" }), r(_e, de);
                  };
                  k(ee, (_e) => {
                    l(O()), e(he), ne(() => O() === e(he).value) && _e(Ee);
                  });
                }
                N(() => {
                  K(je, 1, `group relative flex flex-col items-center rounded-lg transition-all duration-200 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-cyber-amber-500 focus:ring-opacity-50 ${l(O()), e(he), ne(() => O() === e(he).value ? "bg-cyber-amber-500/20 ring-2 ring-cyber-amber-500" : "") ?? ""} ${W() ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`), je.disabled = W(), K(u, 1, `w-8 h-8 rounded-lg group-hover:scale-110 transition-transform duration-200 ${l(O()), e(he), ne(() => O() === e(he).value ? "border-cyber-amber-500" : "") ?? ""}`), aa(u, `background-color: ${e(he), ne(() => e(he).value) ?? ""}`);
                }), q("click", je, () => _(e(he))), q("keydown", je, (_e) => {
                  _e.key === "Enter" && _(e(he));
                }), r(ge, je);
              }), r(U, Pe);
            }
          ), r(Z, z);
        },
        $$slots: {
          default: !0,
          trigger: (Z, D) => {
            var z = bt(), C = o(z), U = o(C), pe = o(U);
            {
              var qe = (ae) => {
                var ge = ut();
                N(() => aa(ge, `background-color: ${e(v), ne(() => e(v).value) ?? ""}`)), r(ae, ge);
              }, Se = (ae) => {
                var ge = ft();
                r(ae, ge);
              };
              k(pe, (ae) => {
                e(v) ? ae(qe) : ae(Se, !1);
              });
            }
            var Pe = L(C, 2);
            N(() => {
              K(C, 1, ie(e(F))), C.disabled = W(), K(Pe, 1, `absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 ${e(B) ? "ring-2 ring-plasma-red-500/20" : ""}`);
            }), q("click", C, G), q("focus", C, R), q("blur", C, X), r(Z, z);
          }
        },
        $$legacy: !0
      });
    };
    k(oe, (P) => {
      e(m) || P(xe);
    });
  }
  var ze = L(oe, 2);
  {
    var Ce = (P) => {
      var Z = _t(), D = me(Z), z = o(D), C = o(z), U = o(C);
      {
        var pe = (ae) => {
          var ge = gt();
          N(() => aa(ge, `background-color: ${e(v), ne(() => e(v).value) ?? ""}`)), r(ae, ge);
        }, qe = (ae) => {
          var ge = ht();
          r(ae, ge);
        };
        k(U, (ae) => {
          e(v) ? ae(pe) : ae(qe, !1);
        });
      }
      var Se = L(z, 2), Pe = L(D, 2);
      st(Pe, {
        title: "Select Color",
        maxHeight: "80vh",
        get isOpen() {
          return e(Q);
        },
        set isOpen(ae) {
          n(Q, ae);
        },
        $$events: { close: $ },
        children: (ae, ge) => {
          var he = yt(), je = o(he);
          ta(
            je,
            5,
            () => (e(p), ne(() => Object.entries(e(p)))),
            ([u, ee]) => u,
            (u, ee) => {
              var Ee = ha(() => ma(e(ee), 2));
              let _e = () => e(Ee)[1];
              var de = pt(), le = o(de);
              ta(le, 5, _e, (Le) => Le.value, (Le, fe) => {
                var g = xt(), Ie = o(g), Ke = L(Ie, 2);
                {
                  var Ge = (x) => {
                    var s = mt(), V = o(s);
                    pa(V, { size: 8, class: "text-stone-900" }), r(x, s);
                  };
                  k(Ke, (x) => {
                    l(O()), e(fe), ne(() => O() === e(fe).value) && x(Ge);
                  });
                }
                N(() => {
                  K(g, 1, `group relative flex flex-col items-center rounded-lg transition-all duration-200 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-cyber-amber-500 focus:ring-opacity-50 ${l(O()), e(fe), ne(() => O() === e(fe).value ? "bg-cyber-amber-500/20 ring-2 ring-cyber-amber-500" : "") ?? ""} ${W() ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`), g.disabled = W(), K(Ie, 1, `w-8 h-8 rounded-lg group-hover:scale-110 transition-transform duration-200 ${l(O()), e(fe), ne(() => O() === e(fe).value ? "border-cyber-amber-500" : "") ?? ""}`), aa(Ie, `background-color: ${e(fe), ne(() => e(fe).value) ?? ""}`);
                }), q("click", g, () => _(e(fe))), q("keydown", g, (x) => {
                  x.key === "Enter" && _(e(fe));
                }), r(Le, g);
              }), r(u, de);
            }
          ), r(ae, he);
        },
        $$slots: { default: !0 },
        $$legacy: !0
      }), N(() => {
        K(z, 1, ie(e(F))), z.disabled = W(), K(Se, 1, `absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 ${e(B) ? "ring-2 ring-plasma-red-500/20" : ""}`);
      }), q("click", z, G), q("focus", z, R), q("blur", z, X), r(P, Z);
    };
    k(ze, (P) => {
      e(m) && P(Ce);
    });
  }
  var A = L(ze, 2);
  {
    var ue = (P) => {
      var Z = wt();
      r(P, Z);
    };
    k(A, (P) => {
      l(S()), ne(() => !S() || S().length === 0) && P(ue);
    });
  }
  r(M, se), Te();
}
var zt = f('<span class="text-error ml-1 svelte-7hu4vd" aria-label="required">*</span>'), Ct = f("<label> <!></label>"), qt = f('<button type="button" aria-label="Clear input"><!></button>'), jt = f('<button type="button"><!></button>'), Et = f('<div class="flex items-center gap-1 svelte-7hu4vd"><!> <span class="svelte-7hu4vd"> </span></div>'), Bt = f('<div class="flex items-center gap-1 svelte-7hu4vd"><!> <span class="svelte-7hu4vd"> </span></div>'), Lt = f('<span class="svelte-7hu4vd"> </span>'), Nt = f("<div><!></div>"), Tt = f('<div><!> <div class="relative svelte-7hu4vd"><input/> <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 svelte-7hu4vd"><!> <!></div></div> <!></div>');
const Ht = {
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
function cr(M, a) {
  He(a, !1), sa(M, Ht);
  const c = i(), d = i(), b = i(), F = i(), v = i(), p = i(), O = i(), j = i(), Y = i(), W = i(), J = i(), E = i();
  let S = t(a, "value", 12, ""), Q = t(a, "type", 8, "text"), B = t(a, "label", 8, ""), m = t(a, "placeholder", 8, ""), y = t(a, "required", 8, !1), H = t(a, "disabled", 8, !1), _ = t(a, "readonly", 8, !1), G = t(a, "size", 8, "md"), R = t(a, "variant", 8, "default"), X = t(a, "error", 8, ""), $ = t(a, "success", 8, ""), se = t(a, "helpText", 8, ""), be = t(a, "className", 8, ""), ve = t(a, "id", 8, ""), oe = t(a, "name", 8, void 0), xe = t(a, "maxLength", 8, void 0), ze = t(a, "minLength", 8, void 0), Ce = t(a, "pattern", 8, void 0), A = t(a, "autocomplete", 8, void 0), ue = t(a, "showPasswordToggle", 8, !1), P = t(a, "showClearButton", 8, !1), Z = t(a, "ariaLabel", 8, void 0);
  const D = Xe();
  let z = i(), C = i(!1), U = i(!1);
  function pe(w) {
    const I = w.target;
    S(I.value), n(U, S() !== ""), D("input", { value: S(), event: w });
  }
  function qe(w) {
    const I = w.target;
    S(I.value), n(U, S() !== ""), D("change", { value: S(), event: w });
  }
  function Se(w) {
    D("focus", { event: w });
  }
  function Pe(w) {
    D("blur", { event: w });
  }
  function ae(w) {
    D("keydown", { event: w });
  }
  function ge(w) {
    D("keyup", { event: w });
  }
  function he() {
    n(C, !e(C));
  }
  function je(w) {
    var I;
    w.preventDefault(), S(""), n(U, !1), D("clear", { event: w }), (I = e(z)) == null || I.focus();
  }
  function u() {
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
  h(() => l(ve()), () => {
    n(c, ve() || `input-${Math.random().toString(36).substr(2, 9)}`);
  }), h(() => l(S()), () => {
    n(U, S() !== "" && S() !== null && S() !== void 0);
  }), h(() => (l(X()), l(R())), () => {
    n(d, !!X() || R() === "error");
  }), h(() => (l($()), l(R())), () => {
    n(b, !!$() || R() === "success");
  }), h(() => {
  }, () => {
    n(F, {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-sm",
      lg: "px-5 py-3 text-base"
    });
  }), h(
    () => (e(F), l(G()), l(be())),
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
        e(F)[G()],
        be()
      ].join(" "));
    }
  ), h(() => (e(d), e(b)), () => {
    n(p, e(d) ? "border-[var(--zabi-error)] text-[var(--zabi-text)] placeholder-[var(--zabi-text-placeholder)] focus:ring-[var(--zabi-error)] focus:border-[var(--zabi-error)]" : e(b) ? "border-[var(--zabi-success)] text-[var(--zabi-text)] placeholder-[var(--zabi-text-placeholder)] focus:ring-[var(--zabi-success)] focus:border-[var(--zabi-success)]" : "border-[var(--zabi-border)] text-[var(--zabi-text)] placeholder-[var(--zabi-text-placeholder)] focus:ring-[var(--zabi-focus-ring)] focus:border-[var(--zabi-border-focus)]");
  }), h(() => l(H()), () => {
    n(O, H() ? "bg-[var(--zabi-surface-disabled)] text-[var(--zabi-text-disabled)] border-[var(--zabi-border-disabled)] cursor-not-allowed" : "");
  }), h(
    () => (e(v), e(p), e(O)),
    () => {
      n(j, [
        e(v),
        e(p),
        e(O)
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
  }), h(() => (e(d), e(b)), () => {
    n(W, [
      "block",
      "text-sm",
      "font-medium",
      "mb-2",
      "transition-colors",
      "duration-200",
      e(d) ? "text-[var(--zabi-error)]" : e(b) ? "text-[var(--zabi-success)]" : "text-[var(--zabi-text)]"
    ].join(" "));
  }), h(() => (e(d), e(b)), () => {
    n(J, [
      "mt-2",
      "text-xs",
      e(d) ? "text-[var(--zabi-error)]" : e(b) ? "text-[var(--zabi-success)]" : "text-[var(--zabi-text-muted)]"
    ].join(" "));
  }), h(() => {
  }, () => {
    n(E, [
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
  var _e = { focus: u, blur: ee, select: Ee };
  Ae();
  var de = Tt(), le = o(de);
  {
    var Le = (w) => {
      var I = Ct(), te = o(I), ye = L(te);
      {
        var Oe = (re) => {
          var Be = zt();
          r(re, Be);
        };
        k(ye, (re) => {
          y() && re(Oe);
        });
      }
      N(() => {
        T(I, "for", e(c)), K(I, 1, ie(e(W)), "svelte-7hu4vd"), ce(te, `${B() ?? ""} `);
      }), r(w, I);
    };
    k(le, (w) => {
      B() && w(Le);
    });
  }
  var fe = L(le, 2), g = o(fe);
  Ue(g, (w) => n(z, w), () => e(z));
  var Ie = L(g, 2), Ke = o(Ie);
  {
    var Ge = (w) => {
      var I = qt(), te = o(I);
      va(te, { size: 16 }), N(() => K(I, 1, ie(e(E)), "svelte-7hu4vd")), q("click", I, je), q("keydown", I, (ye) => ye.key === "Enter" && je(ye)), r(w, I);
    };
    k(Ke, (w) => {
      P() && e(U) && !H() && !_() && w(Ge);
    });
  }
  var x = L(Ke, 2);
  {
    var s = (w) => {
      var I = jt(), te = o(I);
      {
        var ye = (re) => {
          Ja(re, { size: 16 });
        }, Oe = (re) => {
          Qa(re, { size: 16 });
        };
        k(te, (re) => {
          e(C) ? re(ye) : re(Oe, !1);
        });
      }
      N(() => {
        K(I, 1, ie(e(E)), "svelte-7hu4vd"), T(I, "aria-label", e(C) ? "Hide password" : "Show password");
      }), q("click", I, he), q("keydown", I, (re) => re.key === "Enter" && he()), r(w, I);
    };
    k(x, (w) => {
      ue() && Q() === "password" && w(s);
    });
  }
  var V = L(fe, 2);
  {
    var we = (w) => {
      var I = Nt(), te = o(I);
      {
        var ye = (re) => {
          var Be = Et(), Ne = o(Be);
          ua(Ne, { size: 14, class: "flex-shrink-0" });
          var De = L(Ne, 2), Re = o(De);
          N(() => ce(Re, X())), r(re, Be);
        }, Oe = (re) => {
          var Be = ke(), Ne = me(Be);
          {
            var De = (Me) => {
              var Fe = Bt(), Ve = o(Fe);
              fa(Ve, { size: 14, class: "flex-shrink-0" });
              var ra = L(Ve, 2), na = o(ra);
              N(() => ce(na, $())), r(Me, Fe);
            }, Re = (Me) => {
              var Fe = ke(), Ve = me(Fe);
              {
                var ra = (na) => {
                  var ga = Lt(), _a = o(ga);
                  N(() => ce(_a, se())), r(na, ga);
                };
                k(
                  Ve,
                  (na) => {
                    se() && na(ra);
                  },
                  !0
                );
              }
              r(Me, Fe);
            };
            k(
              Ne,
              (Me) => {
                e(b) ? Me(De) : Me(Re, !1);
              },
              !0
            );
          }
          r(re, Be);
        };
        k(te, (re) => {
          e(d) ? re(ye) : re(Oe, !1);
        });
      }
      N(() => {
        T(I, "id", `${e(c) ?? ""}-help`), K(I, 1, ie(e(J)), "svelte-7hu4vd");
      }), r(w, I);
    };
    k(V, (w) => {
      (e(d) || e(b) || se()) && w(we);
    });
  }
  return N(() => {
    K(de, 1, ie(e(Y)), "svelte-7hu4vd"), T(g, "id", e(c)), T(g, "type", ue() && e(C) ? "text" : Q()), ya(g, S()), T(g, "placeholder", m()), g.disabled = H(), g.required = y(), g.readOnly = _(), T(g, "maxlength", xe()), T(g, "minlength", ze()), T(g, "pattern", Ce()), T(g, "autocomplete", A() || void 0), T(g, "name", oe()), K(g, 1, ie(e(j)), "svelte-7hu4vd"), T(g, "aria-invalid", e(d) ? "true" : "false"), T(g, "aria-describedby", e(d) || e(b) || se() ? `${e(c)}-help` : void 0), T(g, "aria-label", Z() || (B() ? void 0 : "Input field")), T(g, "aria-required", y());
  }), q("input", g, pe), q("change", g, qe), q("focus", g, Se), q("blur", g, Pe), q("keydown", g, ae), q("keyup", g, ge), r(M, de), We(a, "focus", u), We(a, "blur", ee), We(a, "select", Ee), Te(_e);
}
var Mt = f('<span class="text-error ml-1 svelte-1qdann5">*</span>'), St = f("<label> <!></label>"), Pt = f('<option disabled class="svelte-1qdann5"> </option>'), It = f('<option class="bg-dark-800 text-white svelte-1qdann5"> </option>'), Ot = f('<button type="button" tabindex="-1" aria-label="Clear selection"><!></button>'), Dt = f('<div class="flex items-center gap-1 svelte-1qdann5"><!> <span class="svelte-1qdann5"> </span></div>'), Ft = f('<div class="flex items-center gap-1 svelte-1qdann5"><!> <span class="svelte-1qdann5"> </span></div>'), Rt = f('<span class="svelte-1qdann5"> </span>'), Kt = f("<div><!></div>"), Wt = f('<div><!> <div class="relative svelte-1qdann5"><select><!><!></select> <!> <div><!></div> <div></div></div> <!></div>');
const At = {
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
function vr(M, a) {
  He(a, !1), sa(M, At);
  const c = i(), d = i(), b = i(), F = i(), v = i(), p = i(), O = i(), j = i(), Y = i(), W = i(), J = i();
  let E = t(a, "value", 12, void 0), S = t(a, "options", 24, () => []), Q = t(a, "placeholder", 8, "Select an option"), B = t(a, "label", 8, ""), m = t(a, "disabled", 8, !1), y = t(a, "required", 8, !1), H = t(a, "error", 8, ""), _ = t(a, "success", 8, ""), G = t(a, "helpText", 8, ""), R = t(a, "size", 8, "md"), X = t(a, "variant", 8, "outlined"), $ = t(a, "searchable", 8, !1), se = t(a, "clearable", 8, !1), be = t(a, "name", 8, void 0), ve = t(a, "id", 8, void 0), oe = t(a, "className", 8, "");
  const xe = Xe();
  let ze = i(), Ce = i(!1), A = i(""), ue = i([]);
  function P(x) {
    const s = x.target;
    E(s.value), xe("input", { value: String(E()) });
  }
  function Z(x) {
    const s = x.target;
    E(s.value), xe("change", { value: String(E()) });
  }
  function D(x) {
    n(Ce, !0), xe("focus", { event: x });
  }
  function z(x) {
    n(Ce, !1), xe("blur", { event: x });
  }
  function C(x) {
    xe("keydown", { event: x });
  }
  function U(x) {
    xe("keyup", { event: x });
  }
  function pe(x) {
    x.stopPropagation(), E(void 0), xe("clear", { event: x });
  }
  function qe() {
    var x;
    (x = e(ze)) == null || x.focus();
  }
  function Se() {
    var x;
    (x = e(ze)) == null || x.blur();
  }
  h(() => l(ve()), () => {
    n(c, ve() || `select-${Math.random().toString(36).substr(2, 9)}`);
  }), h(
    () => (l($()), e(A), l(S())),
    () => {
      $() && e(A) ? n(ue, S().filter((x) => x.label.toLowerCase().includes(e(A).toLowerCase()))) : n(ue, S());
    }
  ), h(() => (l(S()), l(E())), () => {
    n(d, S().find((x) => x.value === E()));
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
  }), h(() => (l(H()), l(_())), () => {
    n(v, H() ? "focus:ring-error border-error" : _() ? "focus:ring-success border-success" : "");
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
    () => (l(X()), e(b), l(R()), e(F), e(v), l(oe())),
    () => {
      n(O, [
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
        oe()
      ].join(" "));
    }
  ), h(() => (l(H()), l(_())), () => {
    n(j, [
      "block",
      "text-sm",
      "font-medium",
      "mb-2",
      "transition-colors",
      "duration-200",
      H() ? "text-error" : _() ? "text-success" : "text-primary"
    ].join(" "));
  }), h(() => (l(H()), l(_())), () => {
    n(Y, [
      "mt-2",
      "text-xs",
      H() ? "text-error" : _() ? "text-success" : "text-tertiary"
    ].join(" "));
  }), h(() => l(R()), () => {
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
  }), h(() => l(R()), () => {
    n(J, [
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
  var ae = Wt(), ge = o(ae);
  {
    var he = (x) => {
      var s = St(), V = o(s), we = L(V);
      {
        var w = (I) => {
          var te = Mt();
          r(I, te);
        };
        k(we, (I) => {
          y() && I(w);
        });
      }
      N(() => {
        T(s, "for", e(c)), K(s, 1, ie(e(j)), "svelte-1qdann5"), ce(V, `${B() ?? ""} `);
      }), r(x, s);
    };
    k(ge, (x) => {
      B() && x(he);
    });
  }
  var je = L(ge, 2), u = o(je), ee = o(u);
  {
    var Ee = (x) => {
      var s = Pt(), V = o(s);
      s.value = s.__value = "", N(() => ce(V, Q())), r(x, s);
    };
    k(ee, (x) => {
      Q() && !E() && x(Ee);
    });
  }
  var _e = L(ee);
  ta(_e, 1, () => e(ue), (x) => x.value, (x, s) => {
    var V = It(), we = o(V), w = {};
    N(() => {
      V.disabled = (e(s), ne(() => e(s).disabled)), ce(we, (e(s), ne(() => e(s).label))), w !== (w = (e(s), ne(() => e(s).value))) && (V.value = (V.__value = (e(s), ne(() => e(s).value))) ?? "");
    }), r(x, V);
  }), Ue(u, (x) => n(ze, x), () => e(ze));
  var de;
  Ea(u);
  var le = L(u, 2);
  {
    var Le = (x) => {
      var s = Ot(), V = o(s);
      {
        let we = xa(() => R() === "sm" ? 12 : R() === "md" ? 16 : 20);
        va(V, {
          get size() {
            return e(we);
          }
        });
      }
      N(() => K(s, 1, ie(e(J)), "svelte-1qdann5")), q("click", s, pe), q("keydown", s, (we) => we.key === "Enter" && pe(we)), r(x, s);
    };
    k(le, (x) => {
      se() && E() !== void 0 && E() !== "" && x(Le);
    });
  }
  var fe = L(le, 2), g = o(fe);
  {
    let x = xa(() => R() === "sm" ? 16 : R() === "md" ? 20 : 24);
    Ua(g, {
      get size() {
        return e(x);
      }
    });
  }
  var Ie = L(fe, 2), Ke = L(je, 2);
  {
    var Ge = (x) => {
      var s = Kt(), V = o(s);
      {
        var we = (I) => {
          var te = Dt(), ye = o(te);
          ua(ye, { size: 16, class: "flex-shrink-0" });
          var Oe = L(ye, 2), re = o(Oe);
          N(() => ce(re, H())), r(I, te);
        }, w = (I) => {
          var te = ke(), ye = me(te);
          {
            var Oe = (Be) => {
              var Ne = Ft(), De = o(Ne);
              fa(De, { size: 16, class: "flex-shrink-0" });
              var Re = L(De, 2), Me = o(Re);
              N(() => ce(Me, _())), r(Be, Ne);
            }, re = (Be) => {
              var Ne = ke(), De = me(Ne);
              {
                var Re = (Me) => {
                  var Fe = Rt(), Ve = o(Fe);
                  N(() => ce(Ve, G())), r(Me, Fe);
                };
                k(
                  De,
                  (Me) => {
                    G() && Me(Re);
                  },
                  !0
                );
              }
              r(Be, Ne);
            };
            k(
              ye,
              (Be) => {
                _() ? Be(Oe) : Be(re, !1);
              },
              !0
            );
          }
          r(I, te);
        };
        k(V, (I) => {
          H() ? I(we) : I(w, !1);
        });
      }
      N(() => {
        T(s, "id", `${e(c) ?? ""}-help`), K(s, 1, ie(e(Y)), "svelte-1qdann5");
      }), r(x, s);
    };
    k(Ke, (x) => {
      (H() || _() || G()) && x(Ge);
    });
  }
  return N(() => {
    K(ae, 1, ie(e(p)), "svelte-1qdann5"), T(u, "id", e(c)), u.disabled = m(), u.required = y(), T(u, "name", be()), K(u, 1, ie(e(O)), "svelte-1qdann5"), T(u, "aria-invalid", H() ? "true" : "false"), T(u, "aria-describedby", H() || _() || G() ? `${e(c)}-help` : void 0), de !== (de = E()) && (u.value = (u.__value = E()) ?? "", Ba(u, E())), K(fe, 1, ie(e(W)), "svelte-1qdann5"), K(Ie, 1, `absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 ${e(Ce) ? "ring-2 ring-primary" : ""}`, "svelte-1qdann5");
  }), q("input", u, P), q("change", u, Z), q("focus", u, D), q("blur", u, z), q("keydown", u, C), q("keyup", u, U), r(M, ae), We(a, "focus", qe), We(a, "blur", Se), Te(Pe);
}
var Xt = f('<span class="text-error ml-1 svelte-1bsl3nr" aria-label="required">*</span>'), Gt = f("<label> <!></label>"), Vt = f("<div> </div>"), Yt = f('<div class="flex items-center gap-1 svelte-1bsl3nr"><!> <span class="svelte-1bsl3nr"> </span></div>'), Ut = f('<div class="flex items-center gap-1 svelte-1bsl3nr"><!> <span class="svelte-1bsl3nr"> </span></div>'), Jt = f('<span class="svelte-1bsl3nr"> </span>'), Qt = f("<div><!></div>"), Zt = f('<div><!> <div class="relative svelte-1bsl3nr"><textarea></textarea></div> <!> <!></div>');
const $t = {
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
function ur(M, a) {
  He(a, !1), sa(M, $t);
  const c = i(), d = i(), b = i(), F = i(), v = i(), p = i(), O = i(), j = i(), Y = i(), W = i(), J = i(), E = i(), S = i(), Q = i();
  let B = t(a, "value", 12, ""), m = t(a, "label", 8, ""), y = t(a, "placeholder", 8, ""), H = t(a, "helperText", 8, ""), _ = t(a, "disabled", 8, !1), G = t(a, "required", 8, !1), R = t(a, "readonly", 8, !1), X = t(a, "id", 8, void 0), $ = t(a, "name", 8, void 0), se = t(a, "error", 8, ""), be = t(a, "success", 8, ""), ve = t(a, "helpText", 8, ""), oe = t(a, "maxLength", 8, void 0), xe = t(a, "minLength", 8, void 0), ze = t(a, "rows", 8, 4), Ce = t(a, "resize", 8, "vertical"), A = t(a, "autoResize", 8, !1), ue = t(a, "size", 8, "md"), P = t(a, "variant", 8, "outlined"), Z = t(a, "className", 8, ""), D = t(a, "ariaLabel", 8, void 0);
  const z = Xe();
  let C = i(), U = i(!1);
  function pe(s) {
    const V = s.target;
    B(V.value), n(U, B() !== ""), A() && je(), z("input", { value: B() });
  }
  function qe(s) {
    const V = s.target;
    B(V.value), n(U, B() !== ""), z("change", { value: B() });
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
    e(C) && (la(C, e(C).style.height = "auto"), la(C, e(C).style.height = e(C).scrollHeight + "px"));
  }
  function u() {
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
  h(() => l(X()), () => {
    n(c, X() || `textarea-${Math.random().toString(36).substr(2, 9)}`);
  }), h(() => l(B()), () => {
    n(U, B() !== "" && B() !== null && B() !== void 0);
  }), h(() => l(se()), () => {
    n(d, !!se());
  }), h(() => l(be()), () => {
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
    () => (l(P()), e(F), l(ue()), e(v), e(p), l(Ce()), l(Z())),
    () => {
      n(O, [
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
        e(F)[ue()],
        e(v)[P()],
        e(p)[Ce()],
        Z()
      ].join(" "));
    }
  ), h(() => (e(d), e(b)), () => {
    n(j, e(d) ? "border-error text-primary placeholder-placeholder focus:ring-error focus:border-error" : e(b) ? "border-success text-primary placeholder-placeholder focus:ring-success focus:border-success" : "text-primary placeholder-placeholder focus:ring-focus focus:border-focus");
  }), h(() => l(_()), () => {
    n(Y, _() ? "bg-surface-disabled text-disabled border-disabled cursor-not-allowed" : "");
  }), h(
    () => (e(O), e(j), e(Y)),
    () => {
      n(W, [
        e(O),
        e(j),
        e(Y)
      ].join(" "));
    }
  ), h(() => {
  }, () => {
    n(J, [
      "relative",
      "group",
      "transition-all",
      "duration-200",
      "ease-in-out"
    ].join(" "));
  }), h(() => (e(d), e(b)), () => {
    n(E, [
      "block",
      "text-sm",
      "font-medium",
      "mb-2",
      "transition-colors",
      "duration-200",
      e(d) ? "text-error" : e(b) ? "text-success" : "text-primary"
    ].join(" "));
  }), h(() => (e(d), e(b)), () => {
    n(S, [
      "mt-2",
      "text-xs",
      e(d) ? "text-error" : e(b) ? "text-success" : "text-secondary"
    ].join(" "));
  }), h(() => (l(oe()), l(B())), () => {
    n(Q, [
      "text-xs",
      "text-secondary",
      "mt-1",
      "text-right",
      oe() && B().length > oe() * 0.9 ? "text-warning" : "",
      oe() && B().length >= oe() ? "text-error" : ""
    ].join(" "));
  }), Ye();
  var _e = { focus: u, blur: ee, select: Ee };
  Ae();
  var de = Zt(), le = o(de);
  {
    var Le = (s) => {
      var V = Gt(), we = o(V), w = L(we);
      {
        var I = (te) => {
          var ye = Xt();
          r(te, ye);
        };
        k(w, (te) => {
          G() && te(I);
        });
      }
      N(() => {
        T(V, "for", e(c)), K(V, 1, ie(e(E)), "svelte-1bsl3nr"), ce(we, `${m() ?? ""} `);
      }), r(s, V);
    };
    k(le, (s) => {
      m() && s(Le);
    });
  }
  var fe = L(le, 2), g = o(fe);
  Ue(g, (s) => n(C, s), () => e(C));
  var Ie = L(fe, 2);
  {
    var Ke = (s) => {
      var V = Vt(), we = o(V);
      N(() => {
        K(V, 1, ie(e(Q)), "svelte-1bsl3nr"), ce(we, `${l(B()), ne(() => B().length) ?? ""}/${oe() ?? ""}`);
      }), r(s, V);
    };
    k(Ie, (s) => {
      oe() && s(Ke);
    });
  }
  var Ge = L(Ie, 2);
  {
    var x = (s) => {
      var V = Qt(), we = o(V);
      {
        var w = (te) => {
          var ye = Yt(), Oe = o(ye);
          ua(Oe, { size: 14, class: "flex-shrink-0" });
          var re = L(Oe, 2), Be = o(re);
          N(() => ce(Be, se())), r(te, ye);
        }, I = (te) => {
          var ye = ke(), Oe = me(ye);
          {
            var re = (Ne) => {
              var De = Ut(), Re = o(De);
              fa(Re, { size: 14, class: "flex-shrink-0" });
              var Me = L(Re, 2), Fe = o(Me);
              N(() => ce(Fe, be())), r(Ne, De);
            }, Be = (Ne) => {
              var De = ke(), Re = me(De);
              {
                var Me = (Fe) => {
                  var Ve = Jt(), ra = o(Ve);
                  N(() => ce(ra, ve())), r(Fe, Ve);
                };
                k(
                  Re,
                  (Fe) => {
                    ve() && Fe(Me);
                  },
                  !0
                );
              }
              r(Ne, De);
            };
            k(
              Oe,
              (Ne) => {
                e(b) ? Ne(re) : Ne(Be, !1);
              },
              !0
            );
          }
          r(te, ye);
        };
        k(we, (te) => {
          e(d) ? te(w) : te(I, !1);
        });
      }
      N(() => {
        T(V, "id", `${e(c) ?? ""}-help`), K(V, 1, ie(e(S)), "svelte-1bsl3nr");
      }), r(s, V);
    };
    k(Ge, (s) => {
      (e(d) || e(b) || ve()) && s(x);
    });
  }
  return N(() => {
    K(de, 1, ie(e(J)), "svelte-1bsl3nr"), T(g, "id", e(c)), ya(g, B()), T(g, "placeholder", y()), g.disabled = _(), g.required = G(), g.readOnly = R(), T(g, "maxlength", oe()), T(g, "minlength", xe()), T(g, "name", $()), T(g, "rows", ze()), K(g, 1, ie(e(W)), "svelte-1bsl3nr"), T(g, "aria-invalid", e(d) ? "true" : "false"), T(g, "aria-describedby", e(d) || e(b) || H() || oe() ? `${e(c)}-help` : void 0), T(g, "aria-label", D() || (m() ? void 0 : "Textarea field")), T(g, "aria-required", G());
  }), q("input", g, pe), q("change", g, qe), q("focus", g, (s) => Se(s)), q("blur", g, (s) => Pe(s)), q("keydown", g, (s) => ae(s)), q("keyup", g, (s) => ge(s)), q("resize", g, he), r(M, de), We(a, "focus", u), We(a, "blur", ee), We(a, "select", Ee), Te(_e);
}
var er = f('<span class="text-red-400 ml-1">*</span>'), ar = f('<button type="button" role="radio"><!> <span class="hidden sm:inline"> </span></button>'), tr = f('<div class="space-y-2"><label class="block text-sm font-medium text-stone-300"> <!></label> <div class="flex gap-1 p-1 bg-stone-800 rounded-lg border border-stone-700 min-w-48 sm:min-w-56 md:min-w-64 lg:min-w-72" role="radiogroup"></div></div>');
function fr(M, a) {
  He(a, !1);
  let c = t(a, "value", 12, "center"), d = t(a, "label", 8, "Text Alignment"), b = t(a, "required", 8, !1), F = t(a, "size", 8, "sm");
  const v = Xe(), p = `text-alignment-${Math.random().toString(36).substr(2, 9)}`, O = [
    { value: "left", label: "Left", component: et },
    { value: "center", label: "Center", component: Za },
    { value: "right", label: "Right", component: $a }
  ];
  function j(m) {
    c(m), v("change", { value: m });
  }
  const Y = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-2",
    lg: "text-base px-4 py-3"
  };
  Ae();
  var W = tr(), J = o(W), E = o(J), S = L(E);
  {
    var Q = (m) => {
      var y = er();
      r(m, y);
    };
    k(S, (m) => {
      b() && m(Q);
    });
  }
  var B = L(J, 2);
  ta(B, 5, () => O, La, (m, y) => {
    var H = ar(), _ = o(H);
    ia(_, () => e(y).component, (X, $) => {
      $(X, { size: 16 });
    });
    var G = L(_, 2), R = o(G);
    N(() => {
      K(H, 1, `flex-1 flex items-center justify-center gap-2 ${l(F()), ne(() => Y[F()]) ?? ""} rounded-md transition-all duration-200 ${l(c()), e(y), ne(() => c() === e(y).value ? "bg-blue-600 text-white shadow-sm" : "text-stone-400 hover:text-stone-200 hover:bg-stone-700") ?? ""}`), T(H, "aria-checked", (l(c()), e(y), ne(() => c() === e(y).value))), T(H, "aria-label", (e(y), ne(() => e(y).label))), ce(R, (e(y), ne(() => e(y).label)));
    }), q("click", H, () => j(e(y).value)), q("keydown", H, (X) => {
      X.key === "Enter" && j(e(y).value);
    }), r(m, H);
  }), N(() => {
    T(J, "for", p), ce(E, `${d() ?? ""} `), T(B, "id", p), T(B, "aria-label", d());
  }), r(M, W), Te();
}
var rr = f('<button type="button" class="text-sm font-medium text-primary cursor-pointer select-none hover:text-secondary transition-colors"> </button>'), nr = f('<div><button type="button" role="switch"><span></span></button> <!></div>');
function br(M, a) {
  He(a, !1);
  const c = i();
  let d = t(a, "checked", 12, !1), b = t(a, "disabled", 8, !1), F = t(a, "label", 8, ""), v = t(a, "size", 8, "md"), p = t(a, "className", 8, "");
  const O = Xe();
  function j() {
    b() || (d(!d()), O("change", { checked: d() }));
  }
  const Y = { sm: "w-8 h-4", md: "w-11 h-6", lg: "w-14 h-7" }, W = { sm: "w-3 h-3", md: "w-5 h-5", lg: "w-6 h-6" };
  h(() => l(d()), () => {
    n(c, {
      sm: d() ? "translate-x-4" : "translate-x-0",
      md: d() ? "translate-x-5" : "translate-x-0",
      lg: d() ? "translate-x-7" : "translate-x-0"
    });
  }), Ye(), Ae();
  var J = nr(), E = o(J), S = o(E), Q = L(E, 2);
  {
    var B = (m) => {
      var y = rr(), H = o(y);
      N(() => ce(H, F())), q("click", y, j), q("keydown", y, (_) => {
        const G = _;
        (G.key === "Enter" || G.key === " ") && (G.preventDefault(), j());
      }), r(m, y);
    };
    k(Q, (m) => {
      F() && m(B);
    });
  }
  N(() => {
    K(J, 1, `flex items-center space-x-3 min-w-32 sm:min-w-36 md:min-w-40 lg:min-w-44 ${p() ?? ""}`), T(E, "aria-checked", d()), T(E, "aria-label", F() || "Toggle"), E.disabled = b(), K(E, 1, `relative inline-flex ${l(v()), ne(() => Y[v()]) ?? ""} flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${d() ? "bg-primary" : "bg-surface-tertiary"} ${b() ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-80"}`), K(S, 1, `pointer-events-none inline-block ${l(v()), ne(() => W[v()]) ?? ""} transform rounded-full bg-surface shadow-lg ring-0 transition duration-200 ease-in-out ${e(c), l(v()), ne(() => e(c)[v()]) ?? ""}`);
  }), q("click", E, j), q("keydown", E, (m) => {
    const y = m;
    (y.key === "Enter" || y.key === " ") && (y.preventDefault(), j());
  }), r(M, J), Te();
}
export {
  lr as B,
  ir as C,
  Ya as D,
  cr as I,
  vr as S,
  ur as T,
  dr as a,
  fr as b,
  br as c,
  st as d
};
