import { B as H, P as N, H as S, O as z, a as K, S as M, b as B, T as $ } from "../Tooltip-gkAHhbjD.js";
import { B as R, C as U, a as q, b as V, D as G, I as J, S as Q, e as W, c as X, T as Y, d as Z, m as _, k as ee, j as se, f as ae, l as ne, i as te, o as re, q as oe, p as ie, n as ce, g as ue, u as le, h as fe } from "../Toggle-kQ6Z43Ep.js";
import { T as be, a as pe } from "../Toast-1EMgTOM4.js";
import { A as me, C as ve, a as Ie, K as ye, I as he, H as Te, M as ke, S as Ce, T as xe, h as De, f as Ee, c as Oe, i as we, d as Ae, m as Fe, e as Le, l as Pe, g as He, j as Ne, k as Se, t as ze, b as Ke, u as Me } from "../Tabs-DTuXgJQh.js";
import { N as $e, a as je, T as Re } from "../ToastManager-ZcovxilX.js";
const b = (e, s) => {
  const { shouldFocus: a = !1, delay: n = 0 } = s || {};
  function r() {
    a && (n > 0 ? setTimeout(() => e.focus(), n) : e.focus());
  }
  return a && r(), {
    update(t) {
      const { shouldFocus: o = !1, delay: i = 0 } = t || {};
      o && (i > 0 ? setTimeout(() => e.focus(), i) : e.focus());
    }
  };
}, p = (e, s) => {
  function a(n) {
    e.contains(n.target) || s(n);
  }
  return document.addEventListener("click", a, !0), {
    destroy() {
      document.removeEventListener("click", a, !0);
    }
  };
}, g = (e, s) => {
  function a(n) {
    n.key === "Escape" && s(n);
  }
  return e.addEventListener("keydown", a), {
    destroy() {
      e.removeEventListener("keydown", a);
    }
  };
}, m = (e, s) => {
  const a = new ResizeObserver(s);
  return a.observe(e), {
    destroy() {
      a.disconnect();
    }
  };
}, v = (e, { callback: s, options: a = {} }) => {
  const n = new IntersectionObserver(s, a);
  return n.observe(e), {
    destroy() {
      n.disconnect();
    }
  };
}, I = (e) => {
  function s() {
    e.style.height = "auto", e.style.height = `${e.scrollHeight}px`;
  }
  return s(), e.addEventListener("input", s), {
    destroy() {
      e.removeEventListener("input", s);
    }
  };
}, y = (e, { src: s, onLoad: a, onError: n }) => {
  const r = new IntersectionObserver((t) => {
    t.forEach((o) => {
      o.isIntersecting && (e instanceof HTMLImageElement && (e.src = s, e.onload = a, e.onerror = n), r.unobserve(e));
    });
  });
  return r.observe(e), {
    update(t) {
      t != null && t.src && e instanceof HTMLImageElement && (e.src = t.src);
    },
    destroy() {
      r.disconnect();
    }
  };
};
function h(e = "") {
  return {
    isOpen: !1,
    activeItem: e,
    currentFocusIndex: -1,
    isKeyboardNavigation: !1
  };
}
function T(e, s) {
  return { ...e, ...s };
}
const c = {
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
function k(e, s, a = "") {
  return [
    "modern-navigation",
    c.variant[e.variant],
    `nav-${e.orientation}`,
    c.density[e.density],
    e.responsive ? "responsive" : "",
    e.collapsible ? "collapsible" : "",
    s.isOpen ? "open" : "",
    a
  ].filter(Boolean).join(" ");
}
function C(e, s, a, n) {
  return function(t) {
    if (!(!e.isOpen && t.key !== "Enter" && t.key !== " "))
      switch (s({ isKeyboardNavigation: !0 }), t.key) {
        case "Enter":
        case " ":
          t.preventDefault();
          const o = document.activeElement;
          (o == null ? void 0 : o.getAttribute("role")) === "menuitem" && o.click();
          break;
        case "Escape":
          e.isOpen && s({ isOpen: !1 });
          break;
        case "ArrowDown":
          t.preventDefault(), u(e, s, a);
          break;
        case "ArrowUp":
          t.preventDefault(), l(e, s, a);
          break;
        case "ArrowRight":
          t.preventDefault(), e.isOpen && u(e, s, a);
          break;
        case "ArrowLeft":
          t.preventDefault(), l(e, s, a);
          break;
        case "Home":
          t.preventDefault(), f(e, s, a);
          break;
        case "End":
          t.preventDefault(), d(e, s, a);
          break;
      }
  };
}
function u(e, s, a) {
  var t;
  const n = a();
  if (n.length === 0) return;
  const r = (e.currentFocusIndex + 1) % n.length;
  s({ currentFocusIndex: r }), (t = n[r]) == null || t.focus();
}
function l(e, s, a) {
  var t;
  const n = a();
  if (n.length === 0) return;
  const r = e.currentFocusIndex <= 0 ? n.length - 1 : e.currentFocusIndex - 1;
  s({ currentFocusIndex: r }), (t = n[r]) == null || t.focus();
}
function f(e, s, a) {
  var r;
  const n = a();
  n.length !== 0 && (s({ currentFocusIndex: 0 }), (r = n[0]) == null || r.focus());
}
function d(e, s, a) {
  var t;
  const n = a();
  if (n.length === 0) return;
  const r = n.length - 1;
  s({ currentFocusIndex: r }), (t = n[r]) == null || t.focus();
}
function x(e) {
  return Array.from(
    e.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );
}
function D(e, s, a) {
  return {
    toggle: () => {
      const n = !e.isOpen;
      s({ isOpen: n }), n && setTimeout(() => {
        var t;
        const r = a();
        r.length > 0 && (s({ currentFocusIndex: 0 }), (t = r[0]) == null || t.focus());
      }, 100);
    },
    open: () => {
      s({ isOpen: !0 }), setTimeout(() => {
        var r;
        const n = a();
        n.length > 0 && (s({ currentFocusIndex: 0 }), (r = n[0]) == null || r.focus());
      }, 100);
    },
    close: () => {
      s({ isOpen: !1 });
    }
  };
}
function E(e, s, a) {
  return function(r, t) {
    if (r.disabled) {
      t.preventDefault();
      return;
    }
    e({ activeItem: r.id }), a("item-click", { item: r, event: t }), s.collapsible && s.variant !== "tabs" && e({ isOpen: !1 });
  };
}
const O = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280
};
function w(e, s, a, n = "navigation") {
  return {
    "aria-label": s || `${e} navigation`,
    "aria-describedby": a || void 0,
    role: n,
    "data-variant": e
  };
}
function A(e) {
  return {
    "aria-expanded": e,
    "aria-controls": "navigation-menu",
    "aria-haspopup": "menu",
    "aria-label": "Toggle navigation menu"
  };
}
function F(e, s) {
  return {
    id: "navigation-menu",
    role: e === "horizontal" ? "menubar" : "menu",
    "aria-orientation": e,
    "aria-label": `${s} menu`
  };
}
export {
  me as Alert,
  H as Badge,
  R as Button,
  U as Card,
  ve as CardsGrid,
  q as Checkbox,
  V as ColorPicker,
  Ie as ContactForm,
  N as DebugPanel,
  G as Dropdown,
  ye as DynamicForm,
  he as FileUpload,
  S as Heading,
  Te as Hero,
  J as Input,
  ke as Modal,
  $e as Navbar,
  z as OptimizedImage,
  K as Progress,
  M as ScaleDemo,
  Q as Select,
  Ce as SelectedCardInfo,
  B as Skeleton,
  W as SlideUp,
  xe as Tabs,
  X as TextAlignment,
  Y as Textarea,
  be as ThemeToggle,
  pe as Toast,
  je as ToastContainer,
  Re as ToastManager,
  Z as Toggle,
  $ as Tooltip,
  I as autoResize,
  _ as baseInputClasses,
  O as breakpoints,
  p as clickOutside,
  ee as createChangeEventDetail,
  se as createInputEventDetail,
  ae as createInputState,
  E as createItemClickHandler,
  C as createKeyboardNavigation,
  D as createMenuState,
  h as createNavigationState,
  De as createTabClickHandler,
  Ee as createTabsKeyboardNavigation,
  Oe as createTabsState,
  g as escapeKey,
  b as focus,
  we as focusTab,
  ne as formSizeClasses,
  te as generateInputId,
  w as getAccessibilityProps,
  Ae as getContainerClasses,
  re as getDisabledClasses,
  x as getFocusableItems,
  oe as getHelperTextClasses,
  ie as getLabelClasses,
  A as getMenuButtonProps,
  F as getMenuListProps,
  k as getNavigationClasses,
  Fe as getPanelAccessibilityProps,
  Le as getPanelClasses,
  ce as getStateClasses,
  Pe as getTabAccessibilityProps,
  He as getTabClasses,
  Ne as getTabContent,
  v as intersectionObserver,
  Se as isTabActive,
  y as lazyLoad,
  c as navigationClasses,
  m as resizeObserver,
  ze as tabsSizeClasses,
  Ke as tabsVariantClasses,
  ue as updateFocusState,
  le as updateInputState,
  T as updateNavigationState,
  Me as updateTabsState,
  fe as updateValidationState
};
