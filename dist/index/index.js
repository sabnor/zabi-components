import { Button as pe, Heading as me } from "../atoms/index.js";
const h = (e, t) => {
  const { shouldFocus: r = !1, delay: n = 0 } = t || {};
  function o() {
    r && (n > 0 ? setTimeout(() => e.focus(), n) : e.focus());
  }
  return r && o(), {
    update(a) {
      const { shouldFocus: s = !1, delay: i = 0 } = a || {};
      s && (i > 0 ? setTimeout(() => e.focus(), i) : e.focus());
    }
  };
}, g = (e, t) => {
  function r(n) {
    e.contains(n.target) || t(n);
  }
  return document.addEventListener("click", r, !0), {
    destroy() {
      document.removeEventListener("click", r, !0);
    }
  };
}, I = (e, t) => {
  function r(n) {
    n.key === "Escape" && t(n);
  }
  return e.addEventListener("keydown", r), {
    destroy() {
      e.removeEventListener("keydown", r);
    }
  };
}, k = (e, t) => {
  const r = new ResizeObserver(t);
  return r.observe(e), {
    destroy() {
      r.disconnect();
    }
  };
}, w = (e, { callback: t, options: r = {} }) => {
  const n = new IntersectionObserver(t, r);
  return n.observe(e), {
    destroy() {
      n.disconnect();
    }
  };
}, T = (e) => {
  function t() {
    e.style.height = "auto", e.style.height = `${e.scrollHeight}px`;
  }
  return t(), e.addEventListener("input", t), {
    destroy() {
      e.removeEventListener("input", t);
    }
  };
}, C = (e, { src: t, onLoad: r, onError: n }) => {
  const o = new IntersectionObserver((a) => {
    a.forEach((s) => {
      s.isIntersecting && (e instanceof HTMLImageElement && (e.src = t, e.onload = r, e.onerror = n), o.unobserve(e));
    });
  });
  return o.observe(e), {
    update(a) {
      a != null && a.src && e instanceof HTMLImageElement && (e.src = a.src);
    },
    destroy() {
      o.disconnect();
    }
  };
};
function E(e) {
  return {
    value: e.value,
    hasValue: !!(e.value && e.value.trim()),
    isFocused: !1,
    hasError: !!e.error || e.variant === "error",
    hasSuccess: !!e.success || e.variant === "success"
  };
}
function D(e, t) {
  return {
    ...e,
    value: t,
    hasValue: !!(t && t.trim())
  };
}
function A(e, t) {
  return {
    ...e,
    isFocused: t
  };
}
function F(e, t, r, n) {
  return {
    ...e,
    hasError: !!t || n === "error",
    hasSuccess: !!r || n === "success"
  };
}
function L(e) {
  return e || `input-${Math.random().toString(36).substr(2, 9)}`;
}
function B(e, t, r) {
  return { value: e, event: t, field: r };
}
function O(e, t, r, n) {
  return { value: e, event: t, field: r, checked: n };
}
const m = {
  sm: {
    input: "px-3 py-1.5 text-sm",
    label: "text-xs",
    helper: "text-xs"
  },
  md: {
    input: "px-4 py-2.5 text-sm",
    label: "text-sm",
    helper: "text-xs"
  },
  lg: {
    input: "px-5 py-3 text-base",
    label: "text-base",
    helper: "text-sm"
  }
}, z = [
  "w-full",
  "min-w-0",
  "rounded-md",
  "transition-all",
  "duration-200",
  "ease-in-out",
  "focus:outline-none",
  "focus:ring-2",
  "focus:ring-focus-ring",
  "focus:ring-offset-2",
  "disabled:opacity-50",
  "disabled:cursor-not-allowed",
  "read-only:cursor-default",
  "read-only:opacity-75"
].join(" ");
function $(e, t) {
  return e ? "border-error text-text placeholder-text-placeholder focus:ring-error focus:border-error" : t ? "border-success text-text placeholder-text-placeholder focus:ring-success focus:border-success" : "border-border text-text placeholder-text-placeholder focus:ring-focus-ring focus:border-border-focus";
}
function H(e) {
  return e ? "bg-surface-disabled text-text-disabled border-border-disabled cursor-not-allowed" : "";
}
function S(e, t, r) {
  return [
    "block",
    m[r].label,
    "font-medium",
    "mb-2",
    "transition-colors",
    "duration-200",
    e ? "text-error" : t ? "text-success" : "text-text"
  ].join(" ");
}
function j(e, t, r) {
  return [
    "mt-2",
    m[r].helper,
    e ? "text-error" : t ? "text-success" : "text-text-secondary"
  ].join(" ");
}
function K(e = "") {
  return {
    isOpen: !1,
    activeItem: e,
    currentFocusIndex: -1,
    isKeyboardNavigation: !1
  };
}
function N(e, t) {
  return { ...e, ...t };
}
const f = {
  density: {
    compact: "density-compact",
    comfortable: "density-comfortable"
  },
  variant: {
    header: "nav-header",
    sidebar: "nav-sidebar",
    breadcrumb: "nav-breadcrumb",
    tabs: "nav-tabs",
    pagination: "nav-pagination"
  }
};
function P(e, t, r = "") {
  return [
    "modern-navigation",
    f.variant[e.variant],
    `nav-${e.orientation}`,
    f.density[e.density],
    e.responsive ? "responsive" : "",
    e.collapsible ? "collapsible" : "",
    t.isOpen ? "open" : "",
    r
  ].filter(Boolean).join(" ");
}
function M(e, t, r, n) {
  return function(a) {
    if (!(!e.isOpen && a.key !== "Enter" && a.key !== " "))
      switch (t({ isKeyboardNavigation: !0 }), a.key) {
        case "Enter":
        case " ":
          a.preventDefault();
          const s = document.activeElement;
          (s == null ? void 0 : s.getAttribute("role")) === "menuitem" && s.click();
          break;
        case "Escape":
          e.isOpen && t({ isOpen: !1 });
          break;
        case "ArrowDown":
          a.preventDefault(), b(e, t, r);
          break;
        case "ArrowUp":
          a.preventDefault(), p(e, t, r);
          break;
        case "ArrowRight":
          a.preventDefault(), e.isOpen && b(e, t, r);
          break;
        case "ArrowLeft":
          a.preventDefault(), p(e, t, r);
          break;
        case "Home":
          a.preventDefault(), v(e, t, r);
          break;
        case "End":
          a.preventDefault(), y(e, t, r);
          break;
      }
  };
}
function b(e, t, r) {
  var a;
  const n = r();
  if (n.length === 0) return;
  const o = (e.currentFocusIndex + 1) % n.length;
  t({ currentFocusIndex: o }), (a = n[o]) == null || a.focus();
}
function p(e, t, r) {
  var a;
  const n = r();
  if (n.length === 0) return;
  const o = e.currentFocusIndex <= 0 ? n.length - 1 : e.currentFocusIndex - 1;
  t({ currentFocusIndex: o }), (a = n[o]) == null || a.focus();
}
function v(e, t, r) {
  var o;
  const n = r();
  n.length !== 0 && (t({ currentFocusIndex: 0 }), (o = n[0]) == null || o.focus());
}
function y(e, t, r) {
  var a;
  const n = r();
  if (n.length === 0) return;
  const o = n.length - 1;
  t({ currentFocusIndex: o }), (a = n[o]) == null || a.focus();
}
function q(e) {
  return Array.from(
    e.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );
}
function R(e, t, r) {
  return {
    toggle: () => {
      const n = !e.isOpen;
      t({ isOpen: n }), n && setTimeout(() => {
        var a;
        const o = r();
        o.length > 0 && (t({ currentFocusIndex: 0 }), (a = o[0]) == null || a.focus());
      }, 100);
    },
    open: () => {
      t({ isOpen: !0 }), setTimeout(() => {
        var o;
        const n = r();
        n.length > 0 && (t({ currentFocusIndex: 0 }), (o = n[0]) == null || o.focus());
      }, 100);
    },
    close: () => {
      t({ isOpen: !1 });
    }
  };
}
function V(e, t, r) {
  return function(o, a) {
    if (o.disabled) {
      a.preventDefault();
      return;
    }
    e({ activeItem: o.id }), r("item-click", { item: o, event: a }), t.collapsible && t.variant !== "tabs" && e({ isOpen: !1 });
  };
}
const W = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280
};
function U(e, t, r, n = "navigation") {
  return {
    "aria-label": t || `${e} navigation`,
    "aria-describedby": r || void 0,
    role: n,
    "data-variant": e
  };
}
function G(e) {
  return {
    "aria-expanded": e,
    "aria-controls": "navigation-menu",
    "aria-haspopup": "menu",
    "aria-label": "Toggle navigation menu"
  };
}
function J(e, t) {
  return {
    id: "navigation-menu",
    role: e === "horizontal" ? "menubar" : "menu",
    "aria-orientation": e,
    "aria-label": `${t} menu`
  };
}
function Q(e, t) {
  const r = t || (e.length > 0 ? e[0].id : "");
  return {
    activeTab: r,
    activeTabIndex: e.findIndex((n) => n.id === r)
  };
}
function X(e, t, r) {
  return {
    activeTab: r,
    activeTabIndex: t.findIndex((n) => n.id === r)
  };
}
const x = {
  sm: {
    tab: "px-3 py-1.5 text-sm",
    panel: "p-3",
    icon: "w-4 h-4"
  },
  md: {
    tab: "px-4 py-2 text-base",
    panel: "p-4",
    icon: "w-5 h-5"
  },
  lg: {
    tab: "px-6 py-3 text-lg",
    panel: "p-6",
    icon: "w-6 h-6"
  }
}, d = {
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
function Y(e, t, r) {
  const n = x[e.size], o = d[e.variant];
  return [
    n.tab,
    o.tab,
    r ? o.activeTab : "",
    t.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    e.fullWidth ? "flex-1" : "",
    "flex items-center justify-center gap-2"
  ].filter(Boolean).join(" ");
}
function Z(e, t = []) {
  return [
    d[e.variant].container,
    e.orientation === "vertical" ? "flex-col space-y-1 mr-4" : "",
    e.fullWidth ? `grid grid-cols-${t.length || 1}` : "flex"
  ].filter(Boolean).join(" ");
}
function _(e, t) {
  const r = x[e.size], n = d[e.variant];
  return [
    r.panel,
    n.panel,
    t ? "block" : "hidden"
  ].filter(Boolean).join(" ");
}
function ee(e, t, r, n) {
  return function(a) {
    const s = Array.from(
      document.querySelectorAll('[role="tab"]')
    ), i = s.findIndex(
      (l) => l === document.activeElement
    );
    let c = i;
    switch (a.key) {
      case "ArrowRight":
      case "ArrowDown":
        a.preventDefault(), c = (i + 1) % e.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        a.preventDefault(), c = i === 0 ? e.length - 1 : i - 1;
        break;
      case "Home":
        a.preventDefault(), c = 0;
        break;
      case "End":
        a.preventDefault(), c = e.length - 1;
        break;
      case "Enter":
      case " ":
        a.preventDefault();
        const l = s[i];
        l && l.click();
        return;
    }
    c !== i && s[c] && s[c].focus();
  };
}
function te(e, t, r) {
  return function(o, a) {
    o.disabled || (t({ activeTab: o.id }), r("change", { activeTab: o.id, tab: o, event: a }), r("tabClick", { tab: o, event: a }));
  };
}
function re(e, t) {
  const r = t.querySelector(
    `[data-tab-id="${e}"]`
  );
  r == null || r.focus();
}
function ne(e, t) {
  return e.find((r) => r.id === t);
}
function ae(e, t) {
  return e.id === t;
}
function oe(e, t, r) {
  return {
    "aria-selected": t,
    "aria-controls": `tabpanel-${e.id}`,
    "aria-disabled": e.disabled,
    tabindex: t ? 0 : -1
  };
}
function se(e) {
  return {
    id: `tabpanel-${e.id}`,
    role: "tabpanel",
    "aria-labelledby": `tab-${e.id}`
  };
}
function u() {
  return typeof window < "u" && typeof document < "u";
}
function ie() {
  return u() ? window : void 0;
}
function ce() {
  return u() ? document : void 0;
}
function ue(e) {
  return u() ? requestAnimationFrame(e) : void 0;
}
function le(e, t) {
  return u() ? setTimeout(e, t) : void 0;
}
function de(e) {
  u() && e && clearTimeout(e);
}
export {
  pe as Button,
  me as Heading,
  T as autoResize,
  z as baseInputClasses,
  W as breakpoints,
  g as clickOutside,
  O as createChangeEventDetail,
  B as createInputEventDetail,
  E as createInputState,
  V as createItemClickHandler,
  M as createKeyboardNavigation,
  R as createMenuState,
  K as createNavigationState,
  te as createTabClickHandler,
  ee as createTabsKeyboardNavigation,
  Q as createTabsState,
  I as escapeKey,
  h as focus,
  re as focusTab,
  m as formSizeClasses,
  L as generateInputId,
  U as getAccessibilityProps,
  Z as getContainerClasses,
  H as getDisabledClasses,
  q as getFocusableItems,
  j as getHelperTextClasses,
  S as getLabelClasses,
  G as getMenuButtonProps,
  J as getMenuListProps,
  P as getNavigationClasses,
  se as getPanelAccessibilityProps,
  _ as getPanelClasses,
  $ as getStateClasses,
  oe as getTabAccessibilityProps,
  Y as getTabClasses,
  ne as getTabContent,
  w as intersectionObserver,
  u as isBrowser,
  ae as isTabActive,
  C as lazyLoad,
  f as navigationClasses,
  k as resizeObserver,
  de as safeClearTimeout,
  ce as safeDocument,
  ue as safeRequestAnimationFrame,
  le as safeSetTimeout,
  ie as safeWindow,
  x as tabsSizeClasses,
  d as tabsVariantClasses,
  A as updateFocusState,
  D as updateInputState,
  N as updateNavigationState,
  X as updateTabsState,
  F as updateValidationState
};
