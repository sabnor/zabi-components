import { y as attributes, z as attr, x as slot, F as bind_props, G as stringify, J as attr_class, K as ensure_array_like, N as clsx, O as element, P as spread_props, Q as head } from "../../chunks/index.js";
import { l as fallback, k as escape_html } from "../../chunks/context.js";
const $$css$6 = {
  hash: "svelte-1qx5g6b",
  code: ".card.svelte-1qx5g6b {overflow:hidden;border-radius:var(--radius-lg);border-width:1px;--tw-border-opacity: 1;border-color:rgb(229 231 235 / var(--tw-border-opacity, 1));--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}.card-elevated.svelte-1qx5g6b {--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.interactive.svelte-1qx5g6b {cursor:pointer;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:200ms}.interactive.svelte-1qx5g6b:hover {--tw-translate-y: -0.25rem;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.card-image.svelte-1qx5g6b {aspect-ratio:16 / 9;overflow:hidden}.card-image.svelte-1qx5g6b img:where(.svelte-1qx5g6b) {height:100%;width:100%;-o-object-fit:cover;object-fit:cover}.card-content.svelte-1qx5g6b > :where(.svelte-1qx5g6b):not([hidden]) ~ :where(.svelte-1qx5g6b):not([hidden]) {--tw-space-y-reverse: 0;margin-top:calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.5rem * var(--tw-space-y-reverse))}.card-content.svelte-1qx5g6b {padding:1rem}.card-title.svelte-1qx5g6b {font-size:1.125rem;line-height:1.75rem;font-weight:600;--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity, 1))}.card-subtitle.svelte-1qx5g6b {font-size:0.875rem;line-height:1.25rem;font-weight:500;--tw-text-opacity: 1;color:rgb(75 85 99 / var(--tw-text-opacity, 1))}.card-description.svelte-1qx5g6b {font-size:0.875rem;line-height:1.25rem;--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity, 1))}"
};
function Card($$renderer, $$props) {
  $$renderer.global.css.add($$css$6);
  $$renderer.component(($$renderer2) => {
    let title = fallback($$props["title"], "");
    let subtitle = fallback($$props["subtitle"], "");
    let description = fallback($$props["description"], "");
    let image = fallback($$props["image"], "");
    let variant = fallback($$props["variant"], "default");
    let interactive = fallback($$props["interactive"], false);
    let className = fallback($$props["className"], "");
    $$renderer2.push(`<article${attributes(
      {
        class: `card card-${stringify(variant)} ${stringify(interactive ? "interactive" : "")} ${stringify(className)}`,
        role: interactive ? "button" : void 0,
        ...interactive ? { tabindex: 0 } : {}
      },
      "svelte-1qx5g6b"
    )}>`);
    if (image) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card-image svelte-1qx5g6b"><img${attr("src", image)}${attr("alt", title)} class="svelte-1qx5g6b"/></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="card-content svelte-1qx5g6b">`);
    if (title) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<h3 class="card-title svelte-1qx5g6b">${escape_html(title)}</h3>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (subtitle) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="card-subtitle svelte-1qx5g6b">${escape_html(subtitle)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (description) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="card-description svelte-1qx5g6b">${escape_html(description)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></div></article>`);
    bind_props($$props, {
      title,
      subtitle,
      description,
      image,
      variant,
      interactive,
      className
    });
  });
}
const $$css$5 = {
  hash: "svelte-8wahy8",
  code: ".form .form-label {display:block;font-size:0.875rem;line-height:1.25rem;font-weight:500;--tw-text-opacity: 1;color:rgb(55 65 81 / var(--tw-text-opacity, 1))}.form .form-input {width:100%;border-radius:var(--radius-md);border-width:1px;--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity, 1));padding-left:0.75rem;padding-right:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem}.form .form-input:focus {outline:2px solid transparent;outline-offset:2px;--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);--tw-ring-opacity: 1;--tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity, 1))}.form .form-actions {display:flex;gap:0.75rem;padding-top:1rem}"
};
function Form($$renderer, $$props) {
  $$renderer.global.css.add($$css$5);
  $$renderer.component(($$renderer2) => {
    let method = fallback($$props["method"], "post");
    let action = fallback($$props["action"], "");
    let className = fallback($$props["className"], "");
    $$renderer2.push(`<form${attr("method", method)}${attr("action", action)}${attr_class(`form ${stringify(className)}`)}><!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></form>`);
    bind_props($$props, { method, action, className });
  });
}
const $$css$4 = {
  hash: "svelte-wzmt5k",
  code: ".layout.svelte-wzmt5k {min-height:100vh}.layout-main.svelte-wzmt5k {display:flex;flex-direction:column}.layout-sidebar.svelte-wzmt5k {width:16rem;border-right-width:1px;--tw-border-opacity: 1;border-color:rgb(229 231 235 / var(--tw-border-opacity, 1));--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity, 1))}.layout-grid.svelte-wzmt5k {display:grid;grid-template-columns:repeat(1, minmax(0, 1fr))}\n\n    @media (min-width: 768px) {.layout-grid.svelte-wzmt5k {grid-template-columns:repeat(2, minmax(0, 1fr))}\n}\n\n    @media (min-width: 1024px) {.layout-grid.svelte-wzmt5k {grid-template-columns:repeat(3, minmax(0, 1fr))}\n}.layout-header.svelte-wzmt5k {border-bottom-width:1px;--tw-border-opacity: 1;border-color:rgb(229 231 235 / var(--tw-border-opacity, 1));--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1));padding:1rem}.layout-footer.svelte-wzmt5k {margin-top:auto;border-top-width:1px;--tw-border-opacity: 1;border-color:rgb(229 231 235 / var(--tw-border-opacity, 1));--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity, 1));padding:1rem}"
};
function Layout($$renderer, $$props) {
  $$renderer.global.css.add($$css$4);
  let gapClass;
  let variant = fallback($$props["variant"], "main");
  let gap = fallback($$props["gap"], "md");
  let className = fallback($$props["className"], "");
  gapClass = `gap-${gap}`;
  $$renderer.push(`<div${attr_class(`layout layout-${stringify(variant)} ${stringify(gapClass)} ${stringify(className)}`, "svelte-wzmt5k")}>`);
  if (variant === "main") {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<header class="layout-header svelte-wzmt5k"><!--[-->`);
    slot($$renderer, $$props, "header", {});
    $$renderer.push(`<!--]--></header> <main class="layout-main svelte-wzmt5k"><!--[-->`);
    slot($$renderer, $$props, "main", {});
    $$renderer.push(`<!--]--></main> <footer class="layout-footer svelte-wzmt5k"><!--[-->`);
    slot($$renderer, $$props, "footer", {});
    $$renderer.push(`<!--]--></footer>`);
  } else {
    $$renderer.push("<!--[!-->");
    if (variant === "sidebar") {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<aside class="layout-sidebar svelte-wzmt5k"><!--[-->`);
      slot($$renderer, $$props, "sidebar", {});
      $$renderer.push(`<!--]--></aside> <main class="layout-main svelte-wzmt5k"><!--[-->`);
      slot($$renderer, $$props, "main", {});
      $$renderer.push(`<!--]--></main>`);
    } else {
      $$renderer.push("<!--[!-->");
      if (variant === "grid") {
        $$renderer.push("<!--[-->");
        $$renderer.push(`<div class="layout-grid svelte-wzmt5k"><!--[-->`);
        slot($$renderer, $$props, "default", {});
        $$renderer.push(`<!--]--></div>`);
      } else {
        $$renderer.push("<!--[!-->");
      }
      $$renderer.push(`<!--]-->`);
    }
    $$renderer.push(`<!--]-->`);
  }
  $$renderer.push(`<!--]--></div>`);
  bind_props($$props, { variant, gap, className });
}
const $$css$3 = {
  hash: "svelte-1kthbow",
  code: ".nav.svelte-1kthbow {display:flex;align-items:center}.nav-header.svelte-1kthbow {justify-content:space-between}.nav-sidebar.svelte-1kthbow {flex-direction:column}.nav-list.svelte-1kthbow {display:flex}.nav-list.svelte-1kthbow > :where(.svelte-1kthbow):not([hidden]) ~ :where(.svelte-1kthbow):not([hidden]) {--tw-space-x-reverse: 0;margin-right:calc(1rem * var(--tw-space-x-reverse));margin-left:calc(1rem * calc(1 - var(--tw-space-x-reverse)))}.nav-vertical.svelte-1kthbow {flex-direction:column}.nav-vertical.svelte-1kthbow > :where(.svelte-1kthbow):not([hidden]) ~ :where(.svelte-1kthbow):not([hidden]) {--tw-space-x-reverse: 0;margin-right:calc(0px * var(--tw-space-x-reverse));margin-left:calc(0px * calc(1 - var(--tw-space-x-reverse)));--tw-space-y-reverse: 0;margin-top:calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.25rem * var(--tw-space-y-reverse))}.nav-link.svelte-1kthbow {display:flex;align-items:center;gap:0.5rem;border-radius:var(--radius-md);padding-left:0.75rem;padding-right:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem;font-size:0.875rem;line-height:1.25rem;font-weight:500;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;--tw-text-opacity: 1;color:rgb(75 85 99 / var(--tw-text-opacity, 1))}.nav-link.svelte-1kthbow:hover {--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity, 1));--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity, 1))}.nav-link.active.svelte-1kthbow {--tw-bg-opacity: 1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1));--tw-text-opacity: 1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}.nav-icon.svelte-1kthbow {height:1rem;width:1rem}"
};
function Navigation($$renderer, $$props) {
  $$renderer.global.css.add($$css$3);
  $$renderer.component(($$renderer2) => {
    let variant = fallback($$props["variant"], "header");
    let items = fallback($$props["items"], () => [], true);
    let currentPath = fallback($$props["currentPath"], "");
    let className = fallback($$props["className"], "");
    $$renderer2.push(`<nav${attr_class(`nav nav-${stringify(variant)} ${stringify(className)}`, "svelte-1kthbow")} role="navigation">`);
    if (variant === "header") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<ul class="nav-list svelte-1kthbow"><!--[-->`);
      const each_array = ensure_array_like(items);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        $$renderer2.push(`<li class="nav-item svelte-1kthbow"><a${attr("href", item.href)}${attr_class("nav-link svelte-1kthbow", void 0, { "active": currentPath === item.href })}>`);
        if (item.icon) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<!---->`);
          item.icon?.($$renderer2, { class: "nav-icon" });
          $$renderer2.push(`<!---->`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> ${escape_html(item.label)}</a></li>`);
      }
      $$renderer2.push(`<!--]--></ul>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<ul class="nav-list nav-vertical svelte-1kthbow"><!--[-->`);
      const each_array_1 = ensure_array_like(items);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let item = each_array_1[$$index_1];
        $$renderer2.push(`<li class="nav-item svelte-1kthbow"><a${attr("href", item.href)}${attr_class("nav-link svelte-1kthbow", void 0, { "active": currentPath === item.href })}>`);
        if (item.icon) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<!---->`);
          item.icon?.($$renderer2, { class: "nav-icon" });
          $$renderer2.push(`<!---->`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> ${escape_html(item.label)}</a></li>`);
      }
      $$renderer2.push(`<!--]--></ul>`);
    }
    $$renderer2.push(`<!--]--></nav>`);
    bind_props($$props, { variant, items, currentPath, className });
  });
}
const $$css$2 = {
  hash: "svelte-v0x5nl",
  code: "\n    /* Ensure proper focus styles for reduced motion users */\n    @media (prefers-reduced-motion: reduce) {button.svelte-v0x5nl {transition:none;}\n    }\n\n    /* Ensure proper contrast for disabled state */button.svelte-v0x5nl:disabled {opacity:0.6;}\n\n    /* Loading state animation */\n    @keyframes svelte-v0x5nl-spin {\n        from {\n            transform: rotate(0deg);\n        }\n        to {\n            transform: rotate(360deg);\n        }\n    }.animate-spin.svelte-v0x5nl {\n        animation: svelte-v0x5nl-spin 1s linear infinite;}"
};
function Button($$renderer, $$props) {
  $$renderer.global.css.add($$css$2);
  $$renderer.component(($$renderer2) => {
    let buttonClasses, accessibilityProps;
    let variant = fallback($$props["variant"], "primary");
    let size = fallback($$props["size"], "md");
    let disabled = fallback($$props["disabled"], false);
    let loading = fallback($$props["loading"], false);
    let type = fallback($$props["type"], "button");
    let className = fallback($$props["className"], "");
    let iconLeft = fallback($$props["iconLeft"], null);
    let iconRight = fallback($$props["iconRight"], null);
    let ariaLabel = fallback($$props["ariaLabel"], "");
    let ariaDescribedBy = fallback($$props["ariaDescribedBy"], "");
    let ariaExpanded = fallback($$props["ariaExpanded"], void 0);
    let ariaControls = fallback($$props["ariaControls"], void 0);
    let ariaPressed = fallback($$props["ariaPressed"], void 0);
    const baseClasses = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden";
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm rounded-md",
      md: "px-4 py-2 text-sm rounded-md",
      lg: "px-5 py-3 text-base rounded-lg"
    };
    const variantClasses = {
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
    };
    const disabledClasses = disabled ? [
      "bg-[var(--zabi-surface-disabled)] text-[var(--zabi-text-disabled)] border-[var(--zabi-border-disabled)]",
      "hover:bg-[var(--zabi-surface-disabled)] hover:text-[var(--zabi-text-disabled)] hover:border-[var(--zabi-border-disabled)]",
      "active:bg-[var(--zabi-surface-disabled)] active:text-[var(--zabi-text-disabled)] active:border-[var(--zabi-border-disabled)]",
      "shadow-none"
    ].join(" ") : "";
    buttonClasses = [
      baseClasses,
      sizeClasses[size],
      disabled ? disabledClasses : variantClasses[variant],
      className
    ].filter(Boolean).join(" ");
    accessibilityProps = {
      "aria-busy": loading,
      "aria-label": ariaLabel || (loading ? "Loading..." : void 0),
      "aria-describedby": ariaDescribedBy || void 0,
      "aria-expanded": ariaExpanded,
      "aria-controls": ariaControls,
      "aria-pressed": ariaPressed,
      "aria-disabled": disabled
    };
    $$renderer2.push(`<button${attributes(
      {
        type,
        class: clsx(buttonClasses),
        disabled: disabled || loading,
        ...accessibilityProps
      },
      "svelte-v0x5nl"
    )}>`);
    if (loading) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<svg class="animate-spin h-4 w-4 svelte-v0x5nl" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (iconLeft && !loading) {
      $$renderer2.push("<!--[-->");
      if (typeof iconLeft === "string") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="h-4 w-4 flex items-center justify-center">${escape_html(iconLeft)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<!---->`);
        iconLeft?.($$renderer2, { class: "h-4 w-4" });
        $$renderer2.push(`<!---->`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--> `);
    if (iconRight && !loading) {
      $$renderer2.push("<!--[-->");
      if (typeof iconRight === "string") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="h-4 w-4 flex items-center justify-center">${escape_html(iconRight)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<!---->`);
        iconRight?.($$renderer2, { class: "h-4 w-4" });
        $$renderer2.push(`<!---->`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></button>`);
    bind_props($$props, {
      variant,
      size,
      disabled,
      loading,
      type,
      className,
      iconLeft,
      iconRight,
      ariaLabel,
      ariaDescribedBy,
      ariaExpanded,
      ariaControls,
      ariaPressed
    });
  });
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
const defaultAttributes = {
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
function Icon($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const {
      name,
      color = "currentColor",
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth = false,
      iconNode = [],
      children,
      $$slots,
      $$events,
      ...props
    } = $$props;
    $$renderer2.push(`<svg${attributes(
      {
        ...defaultAttributes,
        ...props,
        width: size,
        height: size,
        stroke: color,
        "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        class: clsx(["lucide-icon lucide", name && `lucide-${name}`, props.class])
      },
      void 0,
      void 0,
      void 0,
      3
    )}><!--[-->`);
    const each_array = ensure_array_like(iconNode);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [tag, attrs] = each_array[$$index];
      element($$renderer2, tag, () => {
        $$renderer2.push(`${attributes({ ...attrs }, void 0, void 0, void 0, 3)}`);
      });
    }
    $$renderer2.push(`<!--]-->`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></svg>`);
  });
}
function Circle_alert($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
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
    let { $$slots, $$events, ...props } = $$props;
    const iconNode = [
      ["circle", { "cx": "12", "cy": "12", "r": "10" }],
      ["line", { "x1": "12", "x2": "12", "y1": "8", "y2": "12" }],
      [
        "line",
        { "x1": "12", "x2": "12.01", "y1": "16", "y2": "16" }
      ]
    ];
    Icon($$renderer2, spread_props([
      { name: "circle-alert" },
      /**
       * @component @name CircleAlert
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8bGluZSB4MT0iMTIiIHgyPSIxMiIgeTE9IjgiIHkyPSIxMiIgLz4KICA8bGluZSB4MT0iMTIiIHgyPSIxMi4wMSIgeTE9IjE2IiB5Mj0iMTYiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/circle-alert
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      props,
      {
        iconNode,
        children: ($$renderer3) => {
          props.children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      }
    ]));
  });
}
function Circle_check_big($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
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
    let { $$slots, $$events, ...props } = $$props;
    const iconNode = [
      ["path", { "d": "M21.801 10A10 10 0 1 1 17 3.335" }],
      ["path", { "d": "m9 11 3 3L22 4" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "circle-check-big" },
      /**
       * @component @name CircleCheckBig
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEuODAxIDEwQTEwIDEwIDAgMSAxIDE3IDMuMzM1IiAvPgogIDxwYXRoIGQ9Im05IDExIDMgM0wyMiA0IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/circle-check-big
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      props,
      {
        iconNode,
        children: ($$renderer3) => {
          props.children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      }
    ]));
  });
}
function Eye($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
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
    let { $$slots, $$events, ...props } = $$props;
    const iconNode = [
      [
        "path",
        {
          "d": "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
        }
      ],
      ["circle", { "cx": "12", "cy": "12", "r": "3" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "eye" },
      /**
       * @component @name Eye
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMi4wNjIgMTIuMzQ4YTEgMSAwIDAgMSAwLS42OTYgMTAuNzUgMTAuNzUgMCAwIDEgMTkuODc2IDAgMSAxIDAgMCAxIDAgLjY5NiAxMC43NSAxMC43NSAwIDAgMS0xOS44NzYgMCIgLz4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIzIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/eye
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      props,
      {
        iconNode,
        children: ($$renderer3) => {
          props.children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      }
    ]));
  });
}
function X($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
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
    let { $$slots, $$events, ...props } = $$props;
    const iconNode = [
      ["path", { "d": "M18 6 6 18" }],
      ["path", { "d": "m6 6 12 12" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "x" },
      /**
       * @component @name X
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTggNiA2IDE4IiAvPgogIDxwYXRoIGQ9Im02IDYgMTIgMTIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/x
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      props,
      {
        iconNode,
        children: ($$renderer3) => {
          props.children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      }
    ]));
  });
}
const $$css$1 = {
  hash: "svelte-7hu4vd",
  code: '\n    /* Enhanced focus styles using semantic tokens */.input-focus-visible {outline:2px solid rgb(var(--color-focus-ring));outline-offset:2px;}\n\n    /* Smooth transitions for all interactive elements */input.svelte-7hu4vd {transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1);}\n\n    /* Placeholder styling using semantic tokens */input.svelte-7hu4vd::-moz-placeholder {-moz-transition:color 0.2s ease;transition:color 0.2s ease;color:rgb(var(--color-text-placeholder));}input.svelte-7hu4vd::placeholder {transition:color 0.2s ease;color:rgb(var(--color-text-placeholder));}input.svelte-7hu4vd:focus::-moz-placeholder {color:rgb(var(--color-text-tertiary));}input.svelte-7hu4vd:focus::placeholder {color:rgb(var(--color-text-tertiary));}\n\n    /* Number input spinner styling */input[type="number"].svelte-7hu4vd::-webkit-outer-spin-button,\n    input[type="number"].svelte-7hu4vd::-webkit-inner-spin-button {-webkit-appearance:none;margin:0;}input[type="number"].svelte-7hu4vd {-moz-appearance:textfield;-webkit-appearance:textfield;appearance:textfield;}\n\n    /* Search input styling */input[type="search"].svelte-7hu4vd::-webkit-search-cancel-button,\n    input[type="search"].svelte-7hu4vd::-webkit-search-decoration {-webkit-appearance:none;}\n\n    /* Action button hover effects */button[aria-label].svelte-7hu4vd {transition:all 0.2s ease;}button[aria-label].svelte-7hu4vd:hover {transform:scale(1.05);}button[aria-label].svelte-7hu4vd:active {transform:scale(0.95);}\n\n    /* Focus ring animation */.focus-ring.svelte-7hu4vd {\n        animation: svelte-7hu4vd-focus-ring-pulse 0.2s ease-out;}\n\n    @keyframes svelte-7hu4vd-focus-ring-pulse {\n        0% {\n            transform: scale(0.95);\n            opacity: 0;\n        }\n        100% {\n            transform: scale(1);\n            opacity: 1;\n        }\n    }'
};
function Input($$renderer, $$props) {
  $$renderer.global.css.add($$css$1);
  $$renderer.component(($$renderer2) => {
    let inputId, hasError, hasSuccess, sizeClasses, baseInputClasses, stateClasses, disabledClasses, inputClasses, containerClasses, labelClasses, helperTextClasses, buttonClasses;
    let value = fallback($$props["value"], "");
    let type = fallback($$props["type"], "text");
    let label = fallback($$props["label"], "");
    let placeholder = fallback($$props["placeholder"], "");
    let required = fallback($$props["required"], false);
    let disabled = fallback($$props["disabled"], false);
    let readonly = fallback($$props["readonly"], false);
    let size = fallback($$props["size"], "md");
    let variant = fallback($$props["variant"], "default");
    let error = fallback($$props["error"], "");
    let success = fallback($$props["success"], "");
    let helpText = fallback($$props["helpText"], "");
    let className = fallback($$props["className"], "");
    let id = fallback($$props["id"], "");
    let name = fallback($$props["name"], void 0);
    let maxLength = fallback($$props["maxLength"], void 0);
    let minLength = fallback($$props["minLength"], void 0);
    let pattern = fallback($$props["pattern"], void 0);
    let autocomplete = fallback($$props["autocomplete"], void 0);
    let showPasswordToggle = fallback($$props["showPasswordToggle"], false);
    let showClearButton = fallback($$props["showClearButton"], false);
    let ariaLabel = fallback($$props["ariaLabel"], void 0);
    let hasValue = false;
    function focus() {
    }
    function blur() {
    }
    function select() {
    }
    inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    hasValue = value !== "" && value !== null && value !== void 0;
    hasError = Boolean(error) || variant === "error";
    hasSuccess = Boolean(success) || variant === "success";
    sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-sm",
      lg: "px-5 py-3 text-base"
    };
    baseInputClasses = [
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
      sizeClasses[size],
      className
    ].join(" ");
    stateClasses = hasError ? "border-[var(--zabi-error)] text-[var(--zabi-text)] placeholder-[var(--zabi-text-placeholder)] focus:ring-[var(--zabi-error)] focus:border-[var(--zabi-error)]" : hasSuccess ? "border-[var(--zabi-success)] text-[var(--zabi-text)] placeholder-[var(--zabi-text-placeholder)] focus:ring-[var(--zabi-success)] focus:border-[var(--zabi-success)]" : "border-[var(--zabi-border)] text-[var(--zabi-text)] placeholder-[var(--zabi-text-placeholder)] focus:ring-[var(--zabi-focus-ring)] focus:border-[var(--zabi-border-focus)]";
    disabledClasses = disabled ? "bg-[var(--zabi-surface-disabled)] text-[var(--zabi-text-disabled)] border-[var(--zabi-border-disabled)] cursor-not-allowed" : "";
    inputClasses = [baseInputClasses, stateClasses, disabledClasses].join(" ");
    containerClasses = [
      "relative",
      "group",
      "transition-all",
      "duration-200",
      "ease-in-out"
    ].join(" ");
    labelClasses = [
      "block",
      "text-sm",
      "font-medium",
      "mb-2",
      "transition-colors",
      "duration-200",
      hasError ? "text-[var(--zabi-error)]" : hasSuccess ? "text-[var(--zabi-success)]" : "text-[var(--zabi-text)]"
    ].join(" ");
    helperTextClasses = [
      "mt-2",
      "text-xs",
      hasError ? "text-[var(--zabi-error)]" : hasSuccess ? "text-[var(--zabi-success)]" : "text-[var(--zabi-text-muted)]"
    ].join(" ");
    buttonClasses = [
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
    ].join(" ");
    $$renderer2.push(`<div${attr_class(clsx(containerClasses), "svelte-7hu4vd")}>`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", inputId)}${attr_class(clsx(labelClasses), "svelte-7hu4vd")}>${escape_html(label)} `);
      if (required) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-error ml-1 svelte-7hu4vd" aria-label="required">*</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="relative svelte-7hu4vd"><input${attr("id", inputId)}${attr("type", type)}${attr("value", value)}${attr("placeholder", placeholder)}${attr("disabled", disabled, true)}${attr("required", required, true)}${attr("readonly", readonly, true)}${attr("maxlength", maxLength)}${attr("minlength", minLength)}${attr("pattern", pattern)}${attr("autocomplete", autocomplete || void 0)}${attr("name", name)}${attr_class(clsx(inputClasses), "svelte-7hu4vd")}${attr("aria-invalid", hasError ? "true" : "false")}${attr("aria-describedby", hasError || hasSuccess || helpText ? `${inputId}-help` : void 0)}${attr("aria-label", ariaLabel || (label ? void 0 : "Input field"))}${attr("aria-required", required)}/> <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 svelte-7hu4vd">`);
    if (showClearButton && hasValue && !disabled && !readonly) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button type="button"${attr_class(clsx(buttonClasses), "svelte-7hu4vd")} aria-label="Clear input">`);
      X($$renderer2, { size: 16 });
      $$renderer2.push(`<!----></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (showPasswordToggle && type === "password") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button type="button"${attr_class(clsx(buttonClasses), "svelte-7hu4vd")}${attr("aria-label", "Show password")}>`);
      {
        $$renderer2.push("<!--[!-->");
        Eye($$renderer2, { size: 16 });
      }
      $$renderer2.push(`<!--]--></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div> `);
    if (hasError || hasSuccess || helpText) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr("id", `${stringify(inputId)}-help`)}${attr_class(clsx(helperTextClasses), "svelte-7hu4vd")}>`);
      if (hasError) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center gap-1 svelte-7hu4vd">`);
        Circle_alert($$renderer2, { size: 14, class: "flex-shrink-0" });
        $$renderer2.push(`<!----> <span class="svelte-7hu4vd">${escape_html(error)}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (hasSuccess) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center gap-1 svelte-7hu4vd">`);
          Circle_check_big($$renderer2, { size: 14, class: "flex-shrink-0" });
          $$renderer2.push(`<!----> <span class="svelte-7hu4vd">${escape_html(success)}</span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (helpText) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<span class="svelte-7hu4vd">${escape_html(helpText)}</span>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, {
      value,
      type,
      label,
      placeholder,
      required,
      disabled,
      readonly,
      size,
      variant,
      error,
      success,
      helpText,
      className,
      id,
      name,
      maxLength,
      minLength,
      pattern,
      autocomplete,
      showPasswordToggle,
      showClearButton,
      ariaLabel,
      focus,
      blur,
      select
    });
  });
}
function ThemeToggle($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let size = fallback($$props["size"], "md");
    let variant = fallback($$props["variant"], "default");
    const sizeClasses = {
      sm: "w-8 h-8 text-sm",
      md: "w-10 h-10 text-base",
      lg: "w-12 h-12 text-lg"
    };
    const variantClasses = {
      default: "bg-surface-primary hover:bg-surface-secondary border border-primary shadow-adaptive-sm",
      minimal: "bg-transparent hover:bg-surface-secondary",
      outline: "bg-transparent border border-primary hover:bg-surface-secondary"
    };
    $$renderer2.push(`<button${attr_class(` ${stringify(sizeClasses[size])} ${stringify(variantClasses[variant])} rounded-lg transition-all duration-200 flex items-center justify-center text-primary hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-surface-primary `)}${attr("aria-label", "Switch to dark mode")}${attr("title", "Switch to dark mode")}>`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`);
    }
    $$renderer2.push(`<!--]--></button>`);
    bind_props($$props, { size, variant });
  });
}
const $$css = {
  hash: "svelte-1uha8ag",
  code: "/* Simple, minimal CSS - Less is More */:root {\n  /* Colors */--primary: #3b82f6;--primary-hover: #2563eb;--secondary: #6b7280;--success: #10b981;--warning: #f59e0b;--error: #ef4444;\n  \n  /* Spacing */--space-xs: 0.25rem;--space-sm: 0.5rem;--space-md: 1rem;--space-lg: 1.5rem;--space-xl: 2rem;\n  \n  /* Border radius */--radius-sm: 0.25rem;--radius-md: 0.375rem;--radius-lg: 0.5rem;\n  \n  /* Shadows */--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);}\n\n/* Dark mode */\n\n@media (prefers-color-scheme: dark) {:root {--primary: #60a5fa;--secondary: #9ca3af;}\n}\n\n/* Base styles */.svelte-1uha8ag {box-sizing:border-box;}\n\n/* Utilities */.container.svelte-1uha8ag {max-width:1200px;margin:0 auto;padding:0 var(--space-md);}.flex.svelte-1uha8ag {display:flex;}.items-center.svelte-1uha8ag {align-items:center;}.justify-between.svelte-1uha8ag {justify-content:space-between;}.space-y-4.svelte-1uha8ag > :where(.svelte-1uha8ag) + :where(.svelte-1uha8ag) {margin-top:var(--space-md);}.gap-4.svelte-1uha8ag {gap:var(--space-md);}.gap-6.svelte-1uha8ag {gap:var(--space-lg);}\n\n/* Text */.text-lg.svelte-1uha8ag {font-size:1.125rem;}.text-xl.svelte-1uha8ag {font-size:1.25rem;}.font-semibold.svelte-1uha8ag {font-weight:600;}.font-bold.svelte-1uha8ag {font-weight:700;}\n\n/* Colors */.text-primary.svelte-1uha8ag {color:var(--primary);}.text-gray-600.svelte-1uha8ag {color:#4b5563;}.text-gray-900.svelte-1uha8ag {color:#111827;}.bg-white.svelte-1uha8ag {background-color:#ffffff;}\n\n/* Borders */.rounded-lg.svelte-1uha8ag {border-radius:var(--radius-lg);}\n\n/* Shadows */\n\n/* Spacing */.p-4.svelte-1uha8ag {padding:var(--space-md);}.p-6.svelte-1uha8ag {padding:var(--space-lg);}\n\n/* Transitions */\n\n/* Hover states */\n\n/* Focus states */\n\n/* Responsive */\n\n@media (min-width: 768px) {.md\\:grid-cols-2.svelte-1uha8ag {grid-template-columns:repeat(2, minmax(0, 1fr));}\n}\n\n@media (min-width: 1024px) {.lg\\:grid-cols-3.svelte-1uha8ag {grid-template-columns:repeat(3, minmax(0, 1fr));}\n}"
};
function _page($$renderer) {
  $$renderer.global.css.add($$css);
  let formData = { name: "", email: "" };
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Docs", href: "/docs" },
    { label: "GitHub", href: "https://github.com" }
  ];
  const cards = [
    {
      title: "Clean Design",
      description: "Minimal, focused components that just work",
      image: "/vite.svg"
    },
    {
      title: "TypeScript First",
      description: "Full type safety and excellent developer experience",
      image: "/vite.svg"
    },
    {
      title: "Accessible",
      description: "Built with accessibility and usability in mind",
      image: "/vite.svg"
    }
  ];
  let $$settled = true;
  let $$inner_renderer;
  function $$render_inner($$renderer2) {
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Zabi Components - Clean &amp; Simple</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Clean, minimal Svelte components that just work" class="svelte-1uha8ag"/>`);
    });
    Layout($$renderer2, {
      variant: "main",
      className: "min-h-screen bg-gray-50",
      children: ($$renderer3) => {
        $$renderer3.push(`<main class="container mx-auto p-6 space-y-8 svelte-1uha8ag"><section class="text-center space-y-4 svelte-1uha8ag"><h2 class="text-3xl font-bold text-gray-900 svelte-1uha8ag">Less is More</h2> <p class="text-lg text-gray-600 max-w-2xl mx-auto svelte-1uha8ag">Clean, minimal components that focus on what matters most. No
                unnecessary complexity, just simple solutions that work.</p></section> <section class="space-y-6 svelte-1uha8ag"><h3 class="text-xl font-semibold text-gray-900 svelte-1uha8ag">Components</h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 svelte-1uha8ag"><!--[-->`);
        const each_array = ensure_array_like(cards);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let card = each_array[$$index];
          Card($$renderer3, {
            title: card.title,
            description: card.description,
            image: card.image,
            variant: "elevated",
            interactive: true
          });
        }
        $$renderer3.push(`<!--]--></div></section> <section class="max-w-md mx-auto space-y-6 svelte-1uha8ag"><h3 class="text-xl font-semibold text-gray-900 text-center svelte-1uha8ag">Contact Form</h3> `);
        Form($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="form-field svelte-1uha8ag"><label for="name" class="form-label svelte-1uha8ag">Name</label> `);
            Input($$renderer4, {
              id: "name",
              name: "name",
              placeholder: "Enter your name",
              get value() {
                return formData.name;
              },
              set value($$value) {
                formData.name = $$value;
                $$settled = false;
              }
            });
            $$renderer4.push(`<!----></div> <div class="form-field svelte-1uha8ag"><label for="email" class="form-label svelte-1uha8ag">Email</label> `);
            Input($$renderer4, {
              id: "email",
              name: "email",
              type: "email",
              placeholder: "Enter your email",
              get value() {
                return formData.email;
              },
              set value($$value) {
                formData.email = $$value;
                $$settled = false;
              }
            });
            $$renderer4.push(`<!----></div> <div class="form-actions svelte-1uha8ag">`);
            Button($$renderer4, {
              type: "submit",
              variant: "primary",
              className: "flex-1",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Submit`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----></div>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></section> `);
        {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></main>`);
      },
      $$slots: {
        default: true,
        header: ($$renderer3) => {
          $$renderer3.push(`<div slot="header" class="flex items-center justify-between p-4 bg-white border-b svelte-1uha8ag"><h1 class="text-xl font-bold text-primary svelte-1uha8ag">Zabi Components</h1> <div class="flex items-center gap-4 svelte-1uha8ag">`);
          Navigation($$renderer3, { variant: "header", items: navItems });
          $$renderer3.push(`<!----> `);
          ThemeToggle($$renderer3, { size: "md" });
          $$renderer3.push(`<!----></div></div>`);
        },
        footer: ($$renderer3) => {
          $$renderer3.push(`<div slot="footer" class="text-center p-4 text-gray-600 svelte-1uha8ag"><p class="svelte-1uha8ag">Clean components that just work. Less is more.</p></div>`);
        }
      }
    });
  }
  do {
    $$settled = true;
    $$inner_renderer = $$renderer.copy();
    $$render_inner($$inner_renderer);
  } while (!$$settled);
  $$renderer.subsume($$inner_renderer);
}
export {
  _page as default
};
