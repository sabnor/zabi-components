import { y as attributes, z as clsx, x as slot, F as bind_props, G as attr_class, J as stringify, K as attr, N as attr_style, O as ensure_array_like, P as element, Q as spread_props, T as sanitize_slots, V as head } from "../../chunks/index.js";
import { l as ssr_context, m as fallback, k as escape_html } from "../../chunks/context.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
const $$css$6 = {
  hash: "svelte-v0x5nl",
  code: "\n    /* Ensure proper focus styles for reduced motion users */\n    @media (prefers-reduced-motion: reduce) {button.svelte-v0x5nl {transition:none;}\n    }\n\n    /* Ensure proper contrast for disabled state */button.svelte-v0x5nl:disabled {opacity:0.6;}\n\n    /* Loading state animation */\n    @keyframes svelte-v0x5nl-spin {\n        from {\n            transform: rotate(0deg);\n        }\n        to {\n            transform: rotate(360deg);\n        }\n    }.animate-spin.svelte-v0x5nl {\n        animation: svelte-v0x5nl-spin 1s linear infinite;}"
};
function Button($$renderer, $$props) {
  $$renderer.global.css.add($$css$6);
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
    slot($$renderer2, $$props, "default", {}, null);
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
const $$css$5 = {
  hash: "svelte-14njway",
  code: "\n    /* Hover effects for closable badges */.badge-closable.svelte-14njway:hover {transform:translateY(-1px);box-shadow:0 4px 8px rgba(0, 0, 0, 0.2);}.badge-closable.svelte-14njway:active {transform:translateY(0);}\n\n    /* Focus styles for accessibility */.badge-closable.svelte-14njway:focus {outline:2px solid var(--color-plasma-red-500);outline-offset:2px;}\n\n    /* Animation for badge appearance */\n    @keyframes svelte-14njway-badge-enter {\n        0% {\n            opacity: 0;\n            transform: scale(0.8);\n        }\n        100% {\n            opacity: 1;\n            transform: scale(1);\n        }\n    }.badge-enter.svelte-14njway {\n        animation: svelte-14njway-badge-enter 0.2s ease-out;}\n\n    /* Animation for badge removal */\n    @keyframes svelte-14njway-badge-exit {\n        0% {\n            opacity: 1;\n            transform: scale(1);\n        }\n        100% {\n            opacity: 0;\n            transform: scale(0.8);\n        }\n    }.badge-exit.svelte-14njway {\n        animation: svelte-14njway-badge-exit 0.2s ease-in;}\n\n    /* Dot animation */.badge-dot.svelte-14njway {\n        animation: svelte-14njway-badge-dot-pulse 2s infinite;}\n\n    @keyframes svelte-14njway-badge-dot-pulse {\n        0%,\n        100% {\n            opacity: 1;\n        }\n        50% {\n            opacity: 0.5;\n        }\n    }\n\n    /* Icon rotation for loading states */.badge-icon-loading.svelte-14njway {\n        animation: svelte-14njway-badge-icon-spin 1s linear infinite;}\n\n    @keyframes svelte-14njway-badge-icon-spin {\n        from {\n            transform: rotate(0deg);\n        }\n        to {\n            transform: rotate(360deg);\n        }\n    }"
};
function Badge($$renderer, $$props) {
  $$renderer.global.css.add($$css$5);
  $$renderer.component(($$renderer2) => {
    let sizeClasses, variantClasses, shapeClasses, dotClasses, badgeClasses, iconClasses, closeButtonClasses;
    let variant = fallback($$props["variant"], "default");
    let size = fallback($$props["size"], "md");
    let shape = fallback($$props["shape"], "rounded");
    let dot = fallback($$props["dot"], false);
    let closable = fallback($$props["closable"], false);
    let icon = fallback($$props["icon"], void 0);
    let iconPosition = fallback($$props["iconPosition"], "left");
    sizeClasses = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base"
    };
    variantClasses = {
      default: "bg-surface-secondary text-primary border border-primary",
      success: "bg-success-surface text-success-text border border-success/30",
      warning: "bg-warning-surface text-warning-text border border-warning/30",
      error: "bg-error-surface text-error-text border border-error/30",
      info: "bg-info-surface text-info-text border border-info/30",
      neutral: "bg-surface-tertiary text-secondary border border-secondary"
    };
    shapeClasses = {
      rounded: "rounded-md",
      pill: "rounded-full",
      square: "rounded-none"
    };
    dotClasses = { sm: "w-1.5 h-1.5", md: "w-2 h-2", lg: "w-2.5 h-2.5" };
    badgeClasses = [
      "inline-flex",
      "items-center",
      "gap-1.5",
      "font-medium",
      "border",
      "transition-all",
      "duration-200",
      "ease-in-out",
      "select-none",
      "cursor-default",
      sizeClasses[size],
      variantClasses[variant],
      shapeClasses[shape],
      closable ? "cursor-pointer hover:opacity-80" : ""
    ].join(" ");
    iconClasses = [
      "flex-shrink-0",
      size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-5 h-5"
    ].join(" ");
    closeButtonClasses = [
      "flex-shrink-0",
      "ml-1",
      "hover:bg-white/10",
      "rounded-full",
      "p-0.5",
      "transition-colors",
      "duration-150",
      "ease-in-out",
      size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-5 h-5"
    ].join(" ");
    $$renderer2.push(`<div class="inline-flex items-center gap-1 svelte-14njway">`);
    if (closable) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button type="button"${attr_class(clsx(badgeClasses), "svelte-14njway")}>`);
      if (dot) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div${attr_class(`w-2 h-2 rounded-full bg-current ${stringify(dotClasses[size])}`, "svelte-14njway")}></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (icon && iconPosition === "left") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<svg${attr_class(clsx(iconClasses), "svelte-14njway")} fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd"${attr("d", icon)} clip-rule="evenodd" class="svelte-14njway"></path></svg>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <!--[-->`);
      slot($$renderer2, $$props, "default", {}, null);
      $$renderer2.push(`<!--]--> `);
      if (icon && iconPosition === "right") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<svg${attr_class(clsx(iconClasses), "svelte-14njway")} fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd"${attr("d", icon)} clip-rule="evenodd" class="svelte-14njway"></path></svg>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button> <button type="button"${attr_class(clsx(closeButtonClasses), "svelte-14njway")} aria-label="Close badge"><svg class="w-full h-full svelte-14njway" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" class="svelte-14njway"></path></svg></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<span${attr_class(clsx(badgeClasses), "svelte-14njway")}>`);
      if (dot) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div${attr_class(`w-2 h-2 rounded-full bg-current ${stringify(dotClasses[size])}`, "svelte-14njway")}></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (icon && iconPosition === "left") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<svg${attr_class(clsx(iconClasses), "svelte-14njway")} fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd"${attr("d", icon)} clip-rule="evenodd" class="svelte-14njway"></path></svg>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <!--[-->`);
      slot($$renderer2, $$props, "default", {}, null);
      $$renderer2.push(`<!--]--> `);
      if (icon && iconPosition === "right") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<svg${attr_class(clsx(iconClasses), "svelte-14njway")} fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd"${attr("d", icon)} clip-rule="evenodd" class="svelte-14njway"></path></svg>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></span>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { variant, size, shape, dot, closable, icon, iconPosition });
  });
}
const $$css$4 = {
  hash: "svelte-1qx5g6b",
  code: ".card.svelte-1qx5g6b {overflow:hidden;border-radius:var(--radius-lg);border-width:1px;--tw-border-opacity: 1;border-color:rgb(229 231 235 / var(--tw-border-opacity, 1));--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}.card-elevated.svelte-1qx5g6b {--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.interactive.svelte-1qx5g6b {cursor:pointer;transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:200ms}.interactive.svelte-1qx5g6b:hover {--tw-translate-y: -0.25rem;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.card-image.svelte-1qx5g6b {aspect-ratio:16 / 9;overflow:hidden}.card-image.svelte-1qx5g6b img:where(.svelte-1qx5g6b) {height:100%;width:100%;-o-object-fit:cover;object-fit:cover}.card-content.svelte-1qx5g6b > :where(.svelte-1qx5g6b):not([hidden]) ~ :where(.svelte-1qx5g6b):not([hidden]) {--tw-space-y-reverse: 0;margin-top:calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.5rem * var(--tw-space-y-reverse))}.card-content.svelte-1qx5g6b {padding:1rem}.card-title.svelte-1qx5g6b {font-size:1.125rem;line-height:1.75rem;font-weight:600;--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity, 1))}.card-subtitle.svelte-1qx5g6b {font-size:0.875rem;line-height:1.25rem;font-weight:500;--tw-text-opacity: 1;color:rgb(75 85 99 / var(--tw-text-opacity, 1))}.card-description.svelte-1qx5g6b {font-size:0.875rem;line-height:1.25rem;--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity, 1))}"
};
function Card($$renderer, $$props) {
  $$renderer.global.css.add($$css$4);
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
    slot($$renderer2, $$props, "default", {}, null);
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
const $$css$3 = {
  hash: "svelte-1wpeqgu",
  code: "\n    /* Custom focus styles for better accessibility */.checkbox-focus-visible {outline:2px solid var(--color-plasma-red-500);outline-offset:2px;}\n\n    /* Smooth transitions for all interactive elements */.checkbox-input.svelte-1wpeqgu {transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1);}\n\n    /* Hover effects */.checkbox-container.svelte-1wpeqgu:hover .checkbox-visual:where(.svelte-1wpeqgu) {transform:scale(1.05);}.checkbox-container.svelte-1wpeqgu:active .checkbox-visual:where(.svelte-1wpeqgu) {transform:scale(0.95);}\n\n    /* Check animation */.checkbox-check.svelte-1wpeqgu {\n        animation: svelte-1wpeqgu-checkbox-check 0.2s ease-out;}\n\n    @keyframes svelte-1wpeqgu-checkbox-check {\n        0% {\n            opacity: 0;\n            transform: scale(0.8);\n        }\n        100% {\n            opacity: 1;\n            transform: scale(1);\n        }\n    }\n\n    /* Indeterminate animation */.checkbox-indeterminate.svelte-1wpeqgu {\n        animation: svelte-1wpeqgu-checkbox-indeterminate 0.2s ease-out;}\n\n    @keyframes svelte-1wpeqgu-checkbox-indeterminate {\n        0% {\n            opacity: 0;\n            transform: scaleX(0);\n        }\n        100% {\n            opacity: 1;\n            transform: scaleX(1);\n        }\n    }\n\n    /* Focus ring animation */.checkbox-focus-ring.svelte-1wpeqgu {\n        animation: svelte-1wpeqgu-checkbox-focus-ring 0.2s ease-out;}\n\n    @keyframes svelte-1wpeqgu-checkbox-focus-ring {\n        0% {\n            transform: scale(0.95);\n            opacity: 0;\n        }\n        100% {\n            transform: scale(1);\n            opacity: 1;\n        }\n    }\n\n    /* Disabled state styling */.checkbox-disabled.svelte-1wpeqgu {opacity:0.5;cursor:not-allowed;}.checkbox-disabled.svelte-1wpeqgu:hover {transform:none;}\n\n    /* Required indicator styling */.checkbox-required.svelte-1wpeqgu {color:var(--color-blood-red-500);}"
};
function Checkbox($$renderer, $$props) {
  $$renderer.global.css.add($$css$3);
  $$renderer.component(($$renderer2) => {
    let checkboxId, sizeClasses, variantClasses, stateClasses, containerClasses, checkboxClasses, labelClasses, helpTextClasses, checkIconClasses, indeterminateIconClasses;
    let checked = fallback($$props["checked"], false);
    let disabled = fallback($$props["disabled"], false);
    let required = fallback($$props["required"], false);
    let label = fallback($$props["label"], "");
    let helpText = fallback($$props["helpText"], "");
    let error = fallback($$props["error"], "");
    let size = fallback($$props["size"], "md");
    let variant = fallback($$props["variant"], "default");
    let indeterminate = fallback($$props["indeterminate"], false);
    let name = fallback($$props["name"], void 0);
    let id = fallback($$props["id"], void 0);
    let value = fallback($$props["value"], void 0);
    let className = fallback($$props["className"], "");
    function focus() {
    }
    function blur() {
    }
    checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    sizeClasses = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" };
    variantClasses = {
      default: "bg-surface border border-primary text-primary focus:ring-primary focus:border-transparent",
      outlined: "bg-surface-secondary border border-primary text-primary focus:ring-primary focus:border-transparent",
      filled: "bg-surface-secondary border border-primary text-primary focus:ring-primary focus:border-transparent"
    };
    stateClasses = error ? "focus:ring-error border-error" : "";
    containerClasses = [
      "relative",
      "flex",
      "items-start",
      "gap-3",
      "group",
      "transition-all",
      "duration-200",
      "ease-in-out",
      className
    ].join(" ");
    checkboxClasses = [
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
      sizeClasses[size],
      variantClasses[variant],
      stateClasses,
      error ? "grainy-red" : "grainy-texture"
    ].join(" ");
    labelClasses = [
      "text-sm",
      "font-medium",
      "cursor-pointer",
      "select-none",
      "transition-colors",
      "duration-200",
      error ? "text-error" : "text-primary",
      disabled ? "opacity-50 cursor-not-allowed" : ""
    ].join(" ");
    helpTextClasses = ["text-xs", "mt-1", error ? "text-error" : "text-tertiary"].join(" ");
    checkIconClasses = [
      "w-full",
      "h-full",
      "text-current",
      "transition-all",
      "duration-200",
      "ease-in-out"
    ].join(" ");
    indeterminateIconClasses = [
      "w-full",
      "h-full",
      "text-current",
      "transition-all",
      "duration-200",
      "ease-in-out"
    ].join(" ");
    $$renderer2.push(`<div${attr_class(clsx(containerClasses), "svelte-1wpeqgu")}><div class="relative svelte-1wpeqgu"><input type="checkbox"${attr("id", checkboxId)}${attr("checked", checked, true)}${attr("disabled", disabled, true)}${attr("required", required, true)}${attr("name", name)}${attr("value", value)} class="sr-only svelte-1wpeqgu"${attr("aria-invalid", error ? "true" : "false")}${attr("aria-describedby", error || helpText ? `${checkboxId}-help` : void 0)}/> <div${attr_class(clsx(checkboxClasses), "svelte-1wpeqgu")}>`);
    if (checked && !indeterminate) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<svg${attr_class(clsx(checkIconClasses), "svelte-1wpeqgu")} fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" class="svelte-1wpeqgu"></path></svg>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (indeterminate) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<svg${attr_class(clsx(indeterminateIconClasses), "svelte-1wpeqgu")} fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" class="svelte-1wpeqgu"></path></svg>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div> <div${attr_class(`absolute inset-0 rounded pointer-events-none transition-all duration-200 ${stringify("")}`, "svelte-1wpeqgu")}></div></div> <div class="flex-1 min-w-0 svelte-1wpeqgu">`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", checkboxId)}${attr_class(clsx(labelClasses), "svelte-1wpeqgu")}>${escape_html(label)} `);
      if (required) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-error ml-1 svelte-1wpeqgu">*</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (error || helpText) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr("id", `${stringify(checkboxId)}-help`)}${attr_class(clsx(helpTextClasses), "svelte-1wpeqgu")}>`);
      if (error) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center gap-1 svelte-1wpeqgu"><svg class="w-3 h-3 flex-shrink-0 svelte-1wpeqgu" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" class="svelte-1wpeqgu"></path></svg> <span class="svelte-1wpeqgu">${escape_html(error)}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (helpText) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="svelte-1wpeqgu">${escape_html(helpText)}</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
    bind_props($$props, {
      checked,
      disabled,
      required,
      label,
      helpText,
      error,
      size,
      variant,
      indeterminate,
      name,
      id,
      value,
      className,
      focus,
      blur
    });
  });
}
function Dropdown($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isOpen = fallback($$props["isOpen"], false);
    let placement = fallback($$props["placement"], "bottom-start");
    let offset = fallback($$props["offset"], 8);
    let maxHeight = fallback($$props["maxHeight"], "20rem");
    let width = fallback($$props["width"], "auto");
    let zIndex = fallback($$props["zIndex"], 50);
    $$renderer2.push(`<div><!--[-->`);
    slot($$renderer2, $$props, "trigger", {}, null);
    $$renderer2.push(`<!--]--></div> `);
    if (isOpen) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(`fixed z-${stringify(zIndex)} bg-stone-800 border border-stone-700 rounded-lg shadow-xl`)}${attr_style(`max-height: ${stringify(maxHeight)}; width: ${stringify(width)};`)} role="menu" aria-orientation="vertical"><div class="max-h-full overflow-y-auto"><!--[-->`);
      slot($$renderer2, $$props, "default", {}, null);
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { isOpen, placement, offset, maxHeight, width, zIndex });
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
function Check($$renderer, $$props) {
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
    const iconNode = [["path", { "d": "M20 6 9 17l-5-5" }]];
    Icon($$renderer2, spread_props([
      { name: "check" },
      /**
       * @component @name Check
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjAgNiA5IDE3bC01LTUiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/check
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
function Chevron_down($$renderer, $$props) {
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
    const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
    Icon($$renderer2, spread_props([
      { name: "chevron-down" },
      /**
       * @component @name ChevronDown
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtNiA5IDYgNiA2LTYiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/chevron-down
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
function Text_align_center($$renderer, $$props) {
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
      ["path", { "d": "M21 5H3" }],
      ["path", { "d": "M17 12H7" }],
      ["path", { "d": "M19 19H5" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "text-align-center" },
      /**
       * @component @name TextAlignCenter
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEgNUgzIiAvPgogIDxwYXRoIGQ9Ik0xNyAxMkg3IiAvPgogIDxwYXRoIGQ9Ik0xOSAxOUg1IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/text-align-center
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
function Text_align_end($$renderer, $$props) {
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
      ["path", { "d": "M21 5H3" }],
      ["path", { "d": "M21 12H9" }],
      ["path", { "d": "M21 19H7" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "text-align-end" },
      /**
       * @component @name TextAlignEnd
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEgNUgzIiAvPgogIDxwYXRoIGQ9Ik0yMSAxMkg5IiAvPgogIDxwYXRoIGQ9Ik0yMSAxOUg3IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/text-align-end
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
function Text_align_start($$renderer, $$props) {
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
      ["path", { "d": "M21 5H3" }],
      ["path", { "d": "M15 12H3" }],
      ["path", { "d": "M17 19H3" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "text-align-start" },
      /**
       * @component @name TextAlignStart
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEgNUgzIiAvPgogIDxwYXRoIGQ9Ik0xNSAxMkgzIiAvPgogIDxwYXRoIGQ9Ik0xNyAxOUgzIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/text-align-start
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
function SlideUp($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isOpen = fallback($$props["isOpen"], false);
    let title = fallback($$props["title"], "");
    let maxHeight = fallback($$props["maxHeight"], "80vh");
    let zIndex = fallback($$props["zIndex"], 50);
    function toggleBodyScroll(open) {
      if (typeof document !== "undefined") {
        if (open) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
      }
    }
    if (typeof document !== "undefined") {
      toggleBodyScroll(isOpen);
    }
    if (isOpen) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(`fixed inset-0 z-${stringify(zIndex)} bg-black/50`)} role="dialog" aria-modal="true" aria-labelledby="slideup-title" tabindex="-1"></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (isOpen) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(`fixed bottom-0 left-0 right-0 z-${stringify(zIndex + 1)} bg-stone-800 border-t border-stone-700 rounded-t-xl shadow-2xl`)}${attr_style(`max-height: ${stringify(maxHeight)};`)} role="dialog" aria-modal="true" aria-labelledby="slideup-title">`);
      if (title) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center justify-between p-4 border-b border-stone-700"><h3 id="slideup-title" class="text-lg font-semibold text-white">${escape_html(title)}</h3> <button type="button" class="p-2 text-gray-400 hover:text-white transition-colors duration-200" aria-label="Close">`);
        X($$renderer2, { size: 20 });
        $$renderer2.push(`<!----></button></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="max-h-full overflow-y-auto"><!--[-->`);
      slot($$renderer2, $$props, "default", {}, null);
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { isOpen, title, maxHeight, zIndex });
  });
}
function ColorPicker($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let sizeClasses, variantClasses, labelClasses, buttonClasses, selectedColor, colorGroups;
    let value = fallback($$props["value"], "");
    let label = fallback($$props["label"], "");
    let required = fallback($$props["required"], false);
    let disabled = fallback($$props["disabled"], false);
    let size = fallback($$props["size"], "md");
    let variant = fallback($$props["variant"], "outlined");
    let colors = fallback(
      $$props["colors"],
      () => [
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
      ],
      true
    );
    let isExpanded = false;
    const componentId = `color-picker-${Math.random().toString(36).substr(2, 9)}`;
    sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-5 py-3 text-lg"
    };
    variantClasses = {
      default: "bg-dark-700 border-0 text-white placeholder-gray-400 focus:ring-plasma-red-500/20",
      outlined: "bg-dark-600 border-0 text-white placeholder-gray-400 focus:ring-plasma-red-500/20",
      filled: "bg-dark-600 border-0 text-white placeholder-gray-400 focus:ring-plasma-red-500/20",
      ghost: "bg-transparent border-0 text-white placeholder-gray-400 focus:ring-plasma-red-500/20"
    };
    labelClasses = [
      "block",
      "text-sm",
      "font-medium",
      "mb-2",
      "transition-colors",
      "duration-200",
      "text-gray-300"
    ].join(" ");
    buttonClasses = [
      "w-full",
      "min-w-40 sm:min-w-48 md:min-w-56 lg:min-w-64",
      // Responsive minimum width for color picker
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
      sizeClasses[size],
      variantClasses[variant],
      "grainy-texture"
    ].join(" ");
    selectedColor = colors.find((c) => c.value === value);
    colorGroups = colors.reduce(
      (groups, color) => {
        const family = color.family || "Other";
        if (!groups[family]) {
          groups[family] = [];
        }
        groups[family].push(color);
        return groups;
      },
      {}
    );
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="space-y-3">`);
      if (label) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<label${attr("for", componentId)}${attr_class(clsx(labelClasses))}>${escape_html(label)} `);
        if (required) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<span class="text-blood-red-500 ml-1">*</span>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></label>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[-->");
        Dropdown($$renderer3, {
          placement: "bottom-start",
          width: "auto",
          maxHeight: "20rem",
          get isOpen() {
            return isExpanded;
          },
          set isOpen($$value) {
            isExpanded = $$value;
            $$settled = false;
          },
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="p-4"><div class="max-h-96 overflow-y-auto space-y-4 pr-2"><!--[-->`);
            const each_array = ensure_array_like(Object.entries(colorGroups));
            for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
              let [familyName, familyColors] = each_array[$$index_1];
              $$renderer4.push(`<div class="space-y-2"><div class="grid grid-cols-11 gap-3 p-1 bg-stone-800 rounded-lg border border-stone-700"><!--[-->`);
              const each_array_1 = ensure_array_like(familyColors);
              for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                let color = each_array_1[$$index];
                $$renderer4.push(`<button type="button"${attr_class(`group relative flex flex-col items-center rounded-lg transition-all duration-200 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-cyber-amber-500 focus:ring-opacity-50 ${stringify(value === color.value ? "bg-cyber-amber-500/20 ring-2 ring-cyber-amber-500" : "")} ${stringify(disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer")}`)}${attr("disabled", disabled, true)}><div${attr_class(`w-8 h-8 rounded-lg group-hover:scale-110 transition-transform duration-200 ${stringify(value === color.value ? "border-cyber-amber-500" : "")}`)}${attr_style(`background-color: ${stringify(color.value)}`)}></div> `);
                if (value === color.value) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<div class="absolute -top-1 -right-1 w-4 h-4 bg-cyber-amber-500 rounded-full flex items-center justify-center">`);
                  Check($$renderer4, { size: 8, class: "text-stone-900" });
                  $$renderer4.push(`<!----></div>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--></button>`);
              }
              $$renderer4.push(`<!--]--></div></div>`);
            }
            $$renderer4.push(`<!--]--></div></div>`);
          },
          $$slots: {
            default: true,
            trigger: ($$renderer4) => {
              {
                $$renderer4.push(`<div class="relative"><button type="button"${attr_class(clsx(buttonClasses))}${attr("disabled", disabled, true)}><div class="flex items-center space-x-3">`);
                if (selectedColor) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<div class="w-8 h-8 rounded border border-stone-600 flex-shrink-0"${attr_style(`background-color: ${stringify(selectedColor.value)}`)}></div>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                  $$renderer4.push(`<div class="w-8 h-8 rounded border border-stone-600 flex-shrink-0 bg-stone-700"></div> <span class="text-gray-400">Select a color</span>`);
                }
                $$renderer4.push(`<!--]--></div></button> <div${attr_class(`absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 ${stringify("")}`)}></div></div>`);
              }
            }
          }
        });
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (!colors || colors.length === 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="text-center py-6 text-stone-500 text-sm">No colors available</div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { value, label, required, disabled, size, variant, colors });
  });
}
function Heading($$renderer, $$props) {
  let headingClasses;
  let level = fallback($$props["level"], 1);
  let text = fallback($$props["text"], "");
  let color = fallback($$props["color"], "text-white");
  let spacing = fallback($$props["spacing"], "normal");
  const levelStyles = {
    1: "!text-6xl md:!text-7xl font-bold leading-tight block",
    2: "!text-4xl md:!text-5xl font-bold leading-tight block",
    3: "!text-3xl md:!text-4xl font-semibold leading-snug block",
    4: "!text-2xl md:!text-3xl font-semibold leading-snug block",
    5: "!text-xl md:!text-2xl font-medium leading-normal block",
    6: "!text-lg md:!text-xl font-medium leading-normal block"
  };
  const spacingClasses = {
    tight: {
      1: "mb-2",
      2: "mb-3",
      3: "mb-2",
      4: "mb-2",
      5: "mb-1",
      6: "mb-1"
    },
    normal: {
      1: "mb-4",
      2: "mb-4",
      3: "mb-3",
      4: "mb-3",
      5: "mb-2",
      6: "mb-2"
    },
    loose: {
      1: "mb-6",
      2: "mb-6",
      3: "mb-4",
      4: "mb-4",
      5: "mb-3",
      6: "mb-3"
    }
  };
  headingClasses = `${levelStyles[level]} font-title ${color} ${spacingClasses[spacing][level]}`;
  if (level === 1) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<h1${attr_class(clsx(headingClasses))}><!--[-->`);
    slot($$renderer, $$props, "default", {}, () => {
      $$renderer.push(`${escape_html(text)}`);
    });
    $$renderer.push(`<!--]--></h1>`);
  } else {
    $$renderer.push("<!--[!-->");
    if (level === 2) {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<h2${attr_class(clsx(headingClasses))}><!--[-->`);
      slot($$renderer, $$props, "default", {}, () => {
        $$renderer.push(`${escape_html(text)}`);
      });
      $$renderer.push(`<!--]--></h2>`);
    } else {
      $$renderer.push("<!--[!-->");
      if (level === 3) {
        $$renderer.push("<!--[-->");
        $$renderer.push(`<h3${attr_class(clsx(headingClasses))}><!--[-->`);
        slot($$renderer, $$props, "default", {}, () => {
          $$renderer.push(`${escape_html(text)}`);
        });
        $$renderer.push(`<!--]--></h3>`);
      } else {
        $$renderer.push("<!--[!-->");
        if (level === 4) {
          $$renderer.push("<!--[-->");
          $$renderer.push(`<h4${attr_class(clsx(headingClasses))}><!--[-->`);
          slot($$renderer, $$props, "default", {}, () => {
            $$renderer.push(`${escape_html(text)}`);
          });
          $$renderer.push(`<!--]--></h4>`);
        } else {
          $$renderer.push("<!--[!-->");
          if (level === 5) {
            $$renderer.push("<!--[-->");
            $$renderer.push(`<h5${attr_class(clsx(headingClasses))}><!--[-->`);
            slot($$renderer, $$props, "default", {}, () => {
              $$renderer.push(`${escape_html(text)}`);
            });
            $$renderer.push(`<!--]--></h5>`);
          } else {
            $$renderer.push("<!--[!-->");
            if (level === 6) {
              $$renderer.push("<!--[-->");
              $$renderer.push(`<h6${attr_class(clsx(headingClasses))}><!--[-->`);
              slot($$renderer, $$props, "default", {}, () => {
                $$renderer.push(`${escape_html(text)}`);
              });
              $$renderer.push(`<!--]--></h6>`);
            } else {
              $$renderer.push("<!--[!-->");
            }
            $$renderer.push(`<!--]-->`);
          }
          $$renderer.push(`<!--]-->`);
        }
        $$renderer.push(`<!--]-->`);
      }
      $$renderer.push(`<!--]-->`);
    }
    $$renderer.push(`<!--]-->`);
  }
  $$renderer.push(`<!--]-->`);
  bind_props($$props, { level, text, color, spacing });
}
const $$css$2 = {
  hash: "svelte-7hu4vd",
  code: '\n    /* Enhanced focus styles using semantic tokens */.input-focus-visible {outline:2px solid rgb(var(--color-focus-ring));outline-offset:2px;}\n\n    /* Smooth transitions for all interactive elements */input.svelte-7hu4vd {transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1);}\n\n    /* Placeholder styling using semantic tokens */input.svelte-7hu4vd::-moz-placeholder {-moz-transition:color 0.2s ease;transition:color 0.2s ease;color:rgb(var(--color-text-placeholder));}input.svelte-7hu4vd::placeholder {transition:color 0.2s ease;color:rgb(var(--color-text-placeholder));}input.svelte-7hu4vd:focus::-moz-placeholder {color:rgb(var(--color-text-tertiary));}input.svelte-7hu4vd:focus::placeholder {color:rgb(var(--color-text-tertiary));}\n\n    /* Number input spinner styling */input[type="number"].svelte-7hu4vd::-webkit-outer-spin-button,\n    input[type="number"].svelte-7hu4vd::-webkit-inner-spin-button {-webkit-appearance:none;margin:0;}input[type="number"].svelte-7hu4vd {-moz-appearance:textfield;-webkit-appearance:textfield;appearance:textfield;}\n\n    /* Search input styling */input[type="search"].svelte-7hu4vd::-webkit-search-cancel-button,\n    input[type="search"].svelte-7hu4vd::-webkit-search-decoration {-webkit-appearance:none;}\n\n    /* Action button hover effects */button[aria-label].svelte-7hu4vd {transition:all 0.2s ease;}button[aria-label].svelte-7hu4vd:hover {transform:scale(1.05);}button[aria-label].svelte-7hu4vd:active {transform:scale(0.95);}\n\n    /* Focus ring animation */.focus-ring.svelte-7hu4vd {\n        animation: svelte-7hu4vd-focus-ring-pulse 0.2s ease-out;}\n\n    @keyframes svelte-7hu4vd-focus-ring-pulse {\n        0% {\n            transform: scale(0.95);\n            opacity: 0;\n        }\n        100% {\n            transform: scale(1);\n            opacity: 1;\n        }\n    }'
};
function Input($$renderer, $$props) {
  $$renderer.global.css.add($$css$2);
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
function OptimizedImage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let src = $$props["src"];
    let alt = fallback($$props["alt"], "");
    let width = fallback($$props["width"], "100%");
    let height = fallback($$props["height"], "auto");
    let loading = fallback($$props["loading"], "lazy");
    let className = fallback($$props["className"], "");
    let placeholder = fallback($$props["placeholder"], "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+");
    $$renderer2.push(`<div${attr_class(`relative overflow-hidden ${stringify(className)}`)}${attr_style(`width: ${stringify(typeof width === "number" ? width + "px" : width)}; height: ${stringify(typeof height === "number" ? height + "px" : height)};`)}>`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<img${attr("src", placeholder)} alt="" class="absolute inset-0 w-full h-full object-cover animate-pulse"/>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { src, alt, width, height, loading, className, placeholder });
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
const $$css$1 = {
  hash: "svelte-1qdann5",
  code: '\n    /* Custom focus styles for better accessibility */.select-focus-visible {outline:2px solid var(--color-plasma-red-500);outline-offset:2px;}\n\n    /* Smooth transitions for all interactive elements */select.svelte-1qdann5 {transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1);}\n\n    /* Custom dropdown arrow styling */select.svelte-1qdann5::-ms-expand {display:none;}\n\n    /* Option styling */option.svelte-1qdann5 {background-color:var(--color-dark-800);color:white;padding:0.5rem;}\n\n    /* Hover effects */.select-container.svelte-1qdann5:hover .select-icon:where(.svelte-1qdann5) {transform:scale(1.1);}.select-container.svelte-1qdann5:active .select-icon:where(.svelte-1qdann5) {transform:scale(0.95);}\n\n    /* Clear button hover effects */button[aria-label="Clear selection"].svelte-1qdann5 {transition:all 0.2s ease;}button[aria-label="Clear selection"].svelte-1qdann5:hover {transform:scale(1.1);}button[aria-label="Clear selection"].svelte-1qdann5:active {transform:scale(0.95);}\n\n    /* Focus ring animation */.select-focus-ring.svelte-1qdann5 {\n        animation: svelte-1qdann5-select-focus-ring-pulse 0.2s ease-out;}\n\n    @keyframes svelte-1qdann5-select-focus-ring-pulse {\n        0% {\n            transform: scale(0.95);\n            opacity: 0;\n        }\n        100% {\n            transform: scale(1);\n            opacity: 1;\n        }\n    }\n\n    /* Disabled state styling */.select-disabled.svelte-1qdann5 {opacity:0.5;cursor:not-allowed;}.select-disabled.svelte-1qdann5:hover {transform:none;}\n\n    /* Required indicator styling */.select-required.svelte-1qdann5 {color:var(--color-blood-red-500);}'
};
function Select($$renderer, $$props) {
  $$renderer.global.css.add($$css$1);
  $$renderer.component(($$renderer2) => {
    let selectId, sizeClasses, variantClasses, stateClasses, containerClasses, selectClasses, labelClasses, helpTextClasses, iconClasses, clearButtonClasses;
    let value = fallback($$props["value"], void 0);
    let options = fallback($$props["options"], () => [], true);
    let placeholder = fallback($$props["placeholder"], "Select an option");
    let label = fallback($$props["label"], "");
    let disabled = fallback($$props["disabled"], false);
    let required = fallback($$props["required"], false);
    let error = fallback($$props["error"], "");
    let success = fallback($$props["success"], "");
    let helpText = fallback($$props["helpText"], "");
    let size = fallback($$props["size"], "md");
    let variant = fallback($$props["variant"], "outlined");
    let searchable = fallback($$props["searchable"], false);
    let clearable = fallback($$props["clearable"], false);
    let name = fallback($$props["name"], void 0);
    let id = fallback($$props["id"], void 0);
    let className = fallback($$props["className"], "");
    let selectElement;
    let filteredOptions = [];
    function focus() {
    }
    function blur() {
    }
    selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    {
      {
        filteredOptions = options;
      }
    }
    options.find((option) => option.value === value);
    sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-5 py-3 text-lg"
    };
    variantClasses = {
      outlined: "border border-primary bg-surface",
      filled: "border-0 bg-surface-secondary",
      underlined: "border-0 border-b border-primary bg-transparent rounded-none"
    };
    stateClasses = error ? "focus:ring-error border-error" : success ? "focus:ring-success border-success" : "";
    containerClasses = [
      "relative",
      "group",
      "transition-all",
      "duration-200",
      "ease-in-out"
    ].join(" ");
    selectClasses = [
      "w-full",
      "min-w-40 sm:min-w-48 md:min-w-56 lg:min-w-64",
      // Responsive minimum width for selects
      variant === "underlined" ? "rounded-none" : "rounded-lg",
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
      sizeClasses[size],
      variantClasses[variant],
      stateClasses,
      className
    ].join(" ");
    labelClasses = [
      "block",
      "text-sm",
      "font-medium",
      "mb-2",
      "transition-colors",
      "duration-200",
      error ? "text-error" : success ? "text-success" : "text-primary"
    ].join(" ");
    helpTextClasses = [
      "mt-2",
      "text-xs",
      error ? "text-error" : success ? "text-success" : "text-tertiary"
    ].join(" ");
    iconClasses = [
      "absolute",
      "right-3",
      "top-1/2",
      "-translate-y-1/2",
      "pointer-events-none",
      "transition-transform",
      "duration-200",
      "",
      size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6"
    ].join(" ");
    clearButtonClasses = [
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
      size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6"
    ].join(" ");
    $$renderer2.push(`<div${attr_class(clsx(containerClasses), "svelte-1qdann5")}>`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", selectId)}${attr_class(clsx(labelClasses), "svelte-1qdann5")}>${escape_html(label)} `);
      if (required) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-error ml-1 svelte-1qdann5">*</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="relative svelte-1qdann5">`);
    $$renderer2.select(
      {
        this: selectElement,
        id: selectId,
        value,
        disabled,
        required,
        name,
        class: selectClasses,
        "aria-invalid": error ? "true" : "false",
        "aria-describedby": error || success || helpText ? `${selectId}-help` : void 0
      },
      ($$renderer3) => {
        if (placeholder && !value) {
          $$renderer3.push("<!--[-->");
          $$renderer3.option(
            { value: "", disabled: true, class: "" },
            ($$renderer4) => {
              $$renderer4.push(`${escape_html(placeholder)}`);
            },
            "svelte-1qdann5"
          );
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--><!--[-->`);
        const each_array = ensure_array_like(filteredOptions);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let option = each_array[$$index];
          $$renderer3.option(
            {
              value: option.value,
              disabled: option.disabled,
              class: "bg-dark-800 text-white"
            },
            ($$renderer4) => {
              $$renderer4.push(`${escape_html(option.label)}`);
            },
            "svelte-1qdann5"
          );
        }
        $$renderer3.push(`<!--]-->`);
      },
      "svelte-1qdann5"
    );
    $$renderer2.push(` `);
    if (clearable && value !== void 0 && value !== "") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button type="button"${attr_class(clsx(clearButtonClasses), "svelte-1qdann5")} tabindex="-1" aria-label="Clear selection">`);
      X($$renderer2, { size: size === "sm" ? 12 : size === "md" ? 16 : 20 });
      $$renderer2.push(`<!----></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class(clsx(iconClasses), "svelte-1qdann5")}>`);
    Chevron_down($$renderer2, { size: size === "sm" ? 16 : size === "md" ? 20 : 24 });
    $$renderer2.push(`<!----></div> <div${attr_class(`absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 ${stringify("")}`, "svelte-1qdann5")}></div></div> `);
    if (error || success || helpText) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr("id", `${stringify(selectId)}-help`)}${attr_class(clsx(helpTextClasses), "svelte-1qdann5")}>`);
      if (error) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center gap-1 svelte-1qdann5">`);
        Circle_alert($$renderer2, { size: 16, class: "flex-shrink-0" });
        $$renderer2.push(`<!----> <span class="svelte-1qdann5">${escape_html(error)}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (success) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center gap-1 svelte-1qdann5">`);
          Circle_check_big($$renderer2, { size: 16, class: "flex-shrink-0" });
          $$renderer2.push(`<!----> <span class="svelte-1qdann5">${escape_html(success)}</span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (helpText) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<span class="svelte-1qdann5">${escape_html(helpText)}</span>`);
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
      options,
      placeholder,
      label,
      disabled,
      required,
      error,
      success,
      helpText,
      size,
      variant,
      searchable,
      clearable,
      name,
      id,
      className,
      focus,
      blur
    });
  });
}
function Skeleton($$renderer, $$props) {
  let width = fallback($$props["width"], "100%");
  let height = fallback($$props["height"], "1rem");
  let borderRadius = fallback($$props["borderRadius"], "0.5rem");
  let className = fallback($$props["className"], "");
  $$renderer.push(`<div${attr_class(`animate-pulse bg-stone-800 ${stringify(className)}`)}${attr_style(`width: ${stringify(width)}; height: ${stringify(height)}; border-radius: ${stringify(borderRadius)};`)}></div>`);
  bind_props($$props, { width, height, borderRadius, className });
}
const $$css = {
  hash: "svelte-1bsl3nr",
  code: "\n    /* Enhanced focus styles using semantic tokens */.textarea-focus-visible {outline:2px solid rgb(var(--color-focus-ring));outline-offset:2px;}\n\n    /* Smooth transitions for all interactive elements */textarea.svelte-1bsl3nr {transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1);}\n\n    /* Custom scrollbar for textarea using semantic tokens */textarea.svelte-1bsl3nr::-webkit-scrollbar {width:6px;}textarea.svelte-1bsl3nr::-webkit-scrollbar-track {background:transparent;}textarea.svelte-1bsl3nr::-webkit-scrollbar-thumb {background:rgb(var(--color-border-secondary));border-radius:3px;}textarea.svelte-1bsl3nr::-webkit-scrollbar-thumb:hover {background:rgb(var(--color-border-hover));}\n\n    /* Placeholder styling using semantic tokens */textarea.svelte-1bsl3nr::-moz-placeholder {-moz-transition:color 0.2s ease;transition:color 0.2s ease;color:rgb(var(--color-text-placeholder));}textarea.svelte-1bsl3nr::placeholder {transition:color 0.2s ease;color:rgb(var(--color-text-placeholder));}textarea.svelte-1bsl3nr:focus::-moz-placeholder {color:rgb(var(--color-text-tertiary));}textarea.svelte-1bsl3nr:focus::placeholder {color:rgb(var(--color-text-tertiary));}\n\n    /* Character count styling using semantic tokens */.char-count-warning.svelte-1bsl3nr {color:rgb(var(--color-warning));}.char-count-error.svelte-1bsl3nr {color:rgb(var(--color-error));}\n\n    /* Resize handle styling */textarea.svelte-1bsl3nr:not(.resize-none) {resize:both;}textarea.resize-x.svelte-1bsl3nr {resize:horizontal;}textarea.resize-y.svelte-1bsl3nr {resize:vertical;}\n\n    /* Focus ring animation */.focus-ring.svelte-1bsl3nr {\n        animation: svelte-1bsl3nr-focus-ring-pulse 0.2s ease-out;}\n\n    @keyframes svelte-1bsl3nr-focus-ring-pulse {\n        0% {\n            transform: scale(0.95);\n            opacity: 0;\n        }\n        100% {\n            transform: scale(1);\n            opacity: 1;\n        }\n    }"
};
function Textarea($$renderer, $$props) {
  $$renderer.global.css.add($$css);
  $$renderer.component(($$renderer2) => {
    let textareaId, hasError, hasSuccess, sizeClasses, variantClasses, resizeClasses, baseTextareaClasses, stateClasses, disabledClasses, textareaClasses, containerClasses, labelClasses, helperTextClasses, charCountClasses;
    let value = fallback($$props["value"], "");
    let label = fallback($$props["label"], "");
    let placeholder = fallback($$props["placeholder"], "");
    let helperText = fallback($$props["helperText"], "");
    let disabled = fallback($$props["disabled"], false);
    let required = fallback($$props["required"], false);
    let readonly = fallback($$props["readonly"], false);
    let id = fallback($$props["id"], void 0);
    let name = fallback($$props["name"], void 0);
    let error = fallback($$props["error"], "");
    let success = fallback($$props["success"], "");
    let helpText = fallback($$props["helpText"], "");
    let maxLength = fallback($$props["maxLength"], void 0);
    let minLength = fallback($$props["minLength"], void 0);
    let rows = fallback($$props["rows"], 4);
    let resize = fallback($$props["resize"], "vertical");
    let autoResize = fallback($$props["autoResize"], false);
    let size = fallback($$props["size"], "md");
    let variant = fallback($$props["variant"], "outlined");
    let className = fallback($$props["className"], "");
    let ariaLabel = fallback($$props["ariaLabel"], void 0);
    function focus() {
    }
    function blur() {
    }
    function select() {
    }
    textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    hasError = Boolean(error);
    hasSuccess = Boolean(success);
    sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-sm",
      lg: "px-5 py-3 text-base"
    };
    variantClasses = {
      outlined: "border border-primary bg-surface",
      filled: "border-0 bg-surface-secondary",
      underlined: "border-0 border-b border-primary bg-transparent rounded-none"
    };
    resizeClasses = {
      none: "resize-none",
      both: "resize",
      horizontal: "resize-x",
      vertical: "resize-y"
    };
    baseTextareaClasses = [
      "w-full",
      "min-w-0",
      variant === "underlined" ? "rounded-none" : "rounded-md",
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
      sizeClasses[size],
      variantClasses[variant],
      resizeClasses[resize],
      className
    ].join(" ");
    stateClasses = hasError ? "border-error text-primary placeholder-placeholder focus:ring-error focus:border-error" : hasSuccess ? "border-success text-primary placeholder-placeholder focus:ring-success focus:border-success" : "text-primary placeholder-placeholder focus:ring-focus focus:border-focus";
    disabledClasses = disabled ? "bg-surface-disabled text-disabled border-disabled cursor-not-allowed" : "";
    textareaClasses = [baseTextareaClasses, stateClasses, disabledClasses].join(" ");
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
      hasError ? "text-error" : hasSuccess ? "text-success" : "text-primary"
    ].join(" ");
    helperTextClasses = [
      "mt-2",
      "text-xs",
      hasError ? "text-error" : hasSuccess ? "text-success" : "text-secondary"
    ].join(" ");
    charCountClasses = [
      "text-xs",
      "text-secondary",
      "mt-1",
      "text-right",
      maxLength && value.length > maxLength * 0.9 ? "text-warning" : "",
      maxLength && value.length >= maxLength ? "text-error" : ""
    ].join(" ");
    $$renderer2.push(`<div${attr_class(clsx(containerClasses), "svelte-1bsl3nr")}>`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", textareaId)}${attr_class(clsx(labelClasses), "svelte-1bsl3nr")}>${escape_html(label)} `);
      if (required) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-error ml-1 svelte-1bsl3nr" aria-label="required">*</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="relative svelte-1bsl3nr"><textarea${attr("id", textareaId)}${attr("placeholder", placeholder)}${attr("disabled", disabled, true)}${attr("required", required, true)}${attr("readonly", readonly, true)}${attr("maxlength", maxLength)}${attr("minlength", minLength)}${attr("name", name)}${attr("rows", rows)}${attr_class(clsx(textareaClasses), "svelte-1bsl3nr")}${attr("aria-invalid", hasError ? "true" : "false")}${attr("aria-describedby", hasError || hasSuccess || helperText || maxLength ? `${textareaId}-help` : void 0)}${attr("aria-label", ariaLabel || (label ? void 0 : "Textarea field"))}${attr("aria-required", required)}>`);
    const $$body = escape_html(value);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> `);
    if (maxLength) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(clsx(charCountClasses), "svelte-1bsl3nr")}>${escape_html(value.length)}/${escape_html(maxLength)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (hasError || hasSuccess || helpText) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr("id", `${stringify(textareaId)}-help`)}${attr_class(clsx(helperTextClasses), "svelte-1bsl3nr")}>`);
      if (hasError) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center gap-1 svelte-1bsl3nr">`);
        Circle_alert($$renderer2, { size: 14, class: "flex-shrink-0" });
        $$renderer2.push(`<!----> <span class="svelte-1bsl3nr">${escape_html(error)}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (hasSuccess) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center gap-1 svelte-1bsl3nr">`);
          Circle_check_big($$renderer2, { size: 14, class: "flex-shrink-0" });
          $$renderer2.push(`<!----> <span class="svelte-1bsl3nr">${escape_html(success)}</span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (helpText) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<span class="svelte-1bsl3nr">${escape_html(helpText)}</span>`);
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
      label,
      placeholder,
      helperText,
      disabled,
      required,
      readonly,
      id,
      name,
      error,
      success,
      helpText,
      maxLength,
      minLength,
      rows,
      resize,
      autoResize,
      size,
      variant,
      className,
      ariaLabel,
      focus,
      blur,
      select
    });
  });
}
function TextAlignment($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let value = fallback($$props["value"], "center");
    let label = fallback($$props["label"], "Text Alignment");
    let required = fallback($$props["required"], false);
    let size = fallback($$props["size"], "sm");
    const componentId = `text-alignment-${Math.random().toString(36).substr(2, 9)}`;
    const alignmentOptions = [
      { value: "left", label: "Left", component: Text_align_start },
      { value: "center", label: "Center", component: Text_align_center },
      { value: "right", label: "Right", component: Text_align_end }
    ];
    const buttonSizeClasses = {
      sm: "text-xs px-2 py-1",
      md: "text-sm px-3 py-2",
      lg: "text-base px-4 py-3"
    };
    $$renderer2.push(`<div class="space-y-2"><label${attr("for", componentId)} class="block text-sm font-medium text-stone-300">${escape_html(label)} `);
    if (required) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-red-400 ml-1">*</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></label> <div${attr("id", componentId)} class="flex gap-1 p-1 bg-stone-800 rounded-lg border border-stone-700 min-w-48 sm:min-w-56 md:min-w-64 lg:min-w-72" role="radiogroup"${attr("aria-label", label)}><!--[-->`);
    const each_array = ensure_array_like(alignmentOptions);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let option = each_array[$$index];
      $$renderer2.push(`<button type="button"${attr_class(`flex-1 flex items-center justify-center gap-2 ${stringify(buttonSizeClasses[size])} rounded-md transition-all duration-200 ${stringify(value === option.value ? "bg-blue-600 text-white shadow-sm" : "text-stone-400 hover:text-stone-200 hover:bg-stone-700")}`)} role="radio"${attr("aria-checked", value === option.value)}${attr("aria-label", option.label)}><!---->`);
      option.component?.($$renderer2, { size: 16 });
      $$renderer2.push(`<!----> <span class="hidden sm:inline">${escape_html(option.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    bind_props($$props, { value, label, required, size });
  });
}
function Toggle($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let translateClasses;
    let checked = fallback($$props["checked"], false);
    let disabled = fallback($$props["disabled"], false);
    let label = fallback($$props["label"], "");
    let size = fallback($$props["size"], "md");
    let className = fallback($$props["className"], "");
    const sizeClasses = { sm: "w-8 h-4", md: "w-11 h-6", lg: "w-14 h-7" };
    const thumbSizeClasses = { sm: "w-3 h-3", md: "w-5 h-5", lg: "w-6 h-6" };
    translateClasses = {
      sm: checked ? "translate-x-4" : "translate-x-0",
      md: checked ? "translate-x-5" : "translate-x-0",
      lg: checked ? "translate-x-7" : "translate-x-0"
    };
    $$renderer2.push(`<div${attr_class(`flex items-center space-x-3 min-w-32 sm:min-w-36 md:min-w-40 lg:min-w-44 ${stringify(className)}`)}><button type="button" role="switch"${attr("aria-checked", checked)}${attr("aria-label", label || "Toggle")}${attr("disabled", disabled, true)}${attr_class(`relative inline-flex ${stringify(sizeClasses[size])} flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${stringify(checked ? "bg-primary" : "bg-surface-tertiary")} ${stringify(disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-80")}`)}><span${attr_class(`pointer-events-none inline-block ${stringify(thumbSizeClasses[size])} transform rounded-full bg-surface shadow-lg ring-0 transition duration-200 ease-in-out ${stringify(translateClasses[size])}`)}></span></button> `);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button type="button" class="text-sm font-medium text-primary cursor-pointer select-none hover:text-secondary transition-colors">${escape_html(label)}</button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { checked, disabled, label, size, className });
  });
}
function PerformanceMonitor($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isVisible = fallback($$props["isVisible"], false);
    let showInDev = fallback($$props["showInDev"], true);
    let title = fallback($$props["title"], "Debug Panel");
    let metrics = {
      loadComplete: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      cumulativeLayoutShift: 0
    };
    function formatTime(ms) {
      return `${Math.round(ms)}ms`;
    }
    function getPerformanceScore() {
      return "🟢 Excellent";
    }
    if (isVisible) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="fixed bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs"><div class="flex items-center justify-between mb-2"><h3 class="font-bold">${escape_html(title)}</h3> <button class="text-gray-400 hover:text-white">×</button></div> <div class="space-y-1"><div>FCP: ${escape_html(formatTime(metrics.firstContentfulPaint))}</div> <div>LCP: ${escape_html(formatTime(metrics.largestContentfulPaint))}</div> <div>CLS: ${escape_html(metrics.cumulativeLayoutShift.toFixed(3))}</div> <div>Load: ${escape_html(formatTime(metrics.loadComplete))}</div> <div class="pt-1 border-t border-gray-600"><div class="font-semibold">${escape_html(getPerformanceScore())}</div></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { isVisible, showInDev, title });
  });
}
function Alert($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let alertClasses, alertRole, iconSvg;
    let variant = fallback($$props["variant"], "info");
    let title = fallback($$props["title"], "");
    let message = fallback($$props["message"], "");
    let closable = fallback($$props["closable"], false);
    let className = fallback($$props["className"], "");
    alertClasses = {
      info: "bg-[var(--zabi-info-light)] text-[var(--zabi-info-dark)] border border-[var(--zabi-info)]",
      success: "bg-[var(--zabi-success-light)] text-[var(--zabi-success-dark)] border border-[var(--zabi-success)]",
      warning: "bg-[var(--zabi-warning-light)] text-[var(--zabi-warning-dark)] border border-[var(--zabi-warning)]",
      error: "bg-[var(--zabi-error-light)] text-[var(--zabi-error-dark)] border border-[var(--zabi-error)]"
    };
    alertRole = variant === "success" || variant === "info" ? "status" : "alert";
    iconSvg = {
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
    };
    $$renderer2.push(`<div${attr_class(`relative rounded-md p-4 border ${stringify(alertClasses[variant])} transition-all duration-200 motion-reduce:transition-none ${stringify(className)}`)}${attr("role", alertRole)}${attr("aria-live", variant === "success" || variant === "info" ? "polite" : "assertive")} aria-atomic="true">`);
    if (closable) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full text-secondary hover:text-primary transition-colors duration-200 motion-reduce:transition-none group focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2" aria-label="Dismiss alert" type="button"><svg class="w-4 h-4 text-current group-hover:scale-110 transition-transform duration-200 motion-reduce:transition-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class(`flex items-start gap-3 ${stringify(closable ? "pr-8" : "")}`)}><div class="flex-shrink-0 mt-0.5">${html(iconSvg[variant])}</div> <div class="flex-1 min-w-0">`);
    if (title) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<h4 class="font-semibold text-sm mb-1">${escape_html(title)}</h4>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (message) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-sm leading-relaxed">${escape_html(message)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    slot($$renderer2, $$props, "default", {}, null);
    $$renderer2.push(`<!--]--></div></div></div>`);
    bind_props($$props, { variant, title, message, closable, className });
  });
}
function Modal($$renderer, $$props) {
  const $$slots = sanitize_slots($$props);
  $$renderer.component(($$renderer2) => {
    let isOpen = fallback($$props["isOpen"], false);
    let title = fallback($$props["title"], "");
    let showCloseButton = fallback($$props["showCloseButton"], true);
    if (isOpen) {
      setTimeout(
        () => {
        },
        0
      );
    }
    if (isOpen) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-modal-backdrop flex items-center justify-center p-4" role="presentation" tabindex="-1"><div class="bg-surface-elevated rounded-xl shadow-adaptive-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-primary focus:outline-none" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabindex="-1"><div class="flex items-center justify-between p-6 border-b border-primary"><h2 id="dialog-title" class="text-xl font-semibold text-primary">${escape_html(title)}</h2> `);
      if (showCloseButton) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button type="button" class="text-tertiary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1 transition-colors" aria-label="Close dialog"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <div class="p-6 text-primary"><!--[-->`);
      slot($$renderer2, $$props, "default", {}, null);
      $$renderer2.push(`<!--]--></div> `);
      if ($$slots.footer) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center justify-end gap-3 p-6 border-t border-primary bg-surface-secondary"><!--[-->`);
        slot($$renderer2, $$props, "footer", {}, null);
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { isOpen, title, showCloseButton });
  });
}
function ImageUpload($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let value = fallback($$props["value"], null);
    let disabled = fallback($$props["disabled"], false);
    let accept = fallback($$props["accept"], "image/*");
    let maxSize = fallback(
      $$props["maxSize"],
      5 * 1024 * 1024
      // 5MB default
    );
    let placeholder = fallback($$props["placeholder"], "No image selected");
    let showUploadDialog = false;
    onDestroy(() => {
    });
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="space-y-3">`);
      if (value) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="relative group"><img${attr("src", value)} alt="" class="w-full h-32 object-cover rounded-lg border border-stone-600"/> <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"><div class="flex gap-2">`);
        Button($$renderer3, {
          variant: "secondary",
          size: "sm",
          disabled,
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Change`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, {
          variant: "danger",
          size: "sm",
          disabled,
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Remove`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div></div></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div class="border-2 border-dashed border-stone-600 rounded-lg p-6 text-center hover:border-stone-500 transition-colors"><div class="space-y-3"><div class="w-12 h-12 mx-auto bg-stone-700 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div> <div><p class="text-stone-300 font-medium">${escape_html(placeholder)}</p> <p class="text-stone-500 text-sm">Choose a file to upload</p></div> <div class="flex gap-2 justify-center">`);
        Button($$renderer3, {
          variant: "primary",
          size: "sm",
          disabled,
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Upload File`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div></div></div>`);
      }
      $$renderer3.push(`<!--]--> `);
      Modal($$renderer3, {
        title: "Upload File",
        get isOpen() {
          return showUploadDialog;
        },
        set isOpen($$value) {
          showUploadDialog = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<div class="space-y-4">`);
          {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<div class="space-y-3"><div class="text-sm font-medium text-stone-300">Choose File</div> <input type="file"${attr("accept", accept)} class="block w-full text-sm text-stone-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-900/30 file:text-blue-300 hover:file:bg-blue-900/50"/> <p class="text-xs text-stone-500">Max size: ${escape_html(Math.round(maxSize / 1024 / 1024))}MB</p></div>`);
          }
          $$renderer4.push(`<!--]--></div>`);
        },
        $$slots: {
          default: true,
          footer: ($$renderer4) => {
            {
              Button($$renderer4, {
                variant: "secondary",
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Cancel`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]-->`);
            }
          }
        }
      });
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { value, disabled, accept, maxSize, placeholder });
  });
}
function KeyValueForm($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let values = fallback($$props["values"], () => ({}), true);
    let fields = fallback($$props["fields"], () => [], true);
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="flex flex-wrap gap-4"><!--[-->`);
      const each_array = ensure_array_like(fields);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let field = each_array[$$index];
        $$renderer3.push(`<div${attr_class(`flex-${stringify(field.flex === "full" ? "none" : field.flex || "1")} ${stringify(field.type === "textarea" || field.key === "title" || field.key === "subtitle" || field.flex === "full" ? "w-full" : "w-full sm:w-auto sm:flex-1")} min-w-0 ${stringify(field.type === "toggle" ? "flex items-center justify-center" : "")}`)}>`);
        if (field.type === "textarea") {
          $$renderer3.push("<!--[-->");
          Textarea($$renderer3, {
            label: field.label,
            placeholder: field.placeholder,
            rows: field.rows || 3,
            required: field.required,
            size: "sm",
            variant: "default",
            get value() {
              return values[field.key];
            },
            set value($$value) {
              values[field.key] = $$value;
              $$settled = false;
            }
          });
        } else {
          $$renderer3.push("<!--[!-->");
          if (field.type === "select") {
            $$renderer3.push("<!--[-->");
            Select($$renderer3, {
              options: field.options || [],
              label: field.label,
              placeholder: field.placeholder,
              required: field.required,
              size: "sm",
              variant: "default",
              get value() {
                return values[field.key];
              },
              set value($$value) {
                values[field.key] = $$value;
                $$settled = false;
              }
            });
          } else {
            $$renderer3.push("<!--[!-->");
            if (field.type === "checkbox") {
              $$renderer3.push("<!--[-->");
              Checkbox($$renderer3, {
                label: field.label,
                required: field.required,
                size: "sm",
                variant: "default",
                get checked() {
                  return values[field.key];
                },
                set checked($$value) {
                  values[field.key] = $$value;
                  $$settled = false;
                }
              });
            } else {
              $$renderer3.push("<!--[!-->");
              if (field.type === "toggle") {
                $$renderer3.push("<!--[-->");
                Toggle($$renderer3, {
                  label: field.label,
                  get checked() {
                    return values[field.key];
                  },
                  set checked($$value) {
                    values[field.key] = $$value;
                    $$settled = false;
                  }
                });
              } else {
                $$renderer3.push("<!--[!-->");
                if (field.type === "colorpicker") {
                  $$renderer3.push("<!--[-->");
                  ColorPicker($$renderer3, {
                    label: field.label,
                    required: field.required,
                    size: "sm",
                    variant: "default",
                    get value() {
                      return values[field.key];
                    },
                    set value($$value) {
                      values[field.key] = $$value;
                      $$settled = false;
                    }
                  });
                } else {
                  $$renderer3.push("<!--[!-->");
                  if (field.type === "textalignment") {
                    $$renderer3.push("<!--[-->");
                    TextAlignment($$renderer3, {
                      label: field.label,
                      required: field.required,
                      size: "sm",
                      get value() {
                        return values[field.key];
                      },
                      set value($$value) {
                        values[field.key] = $$value;
                        $$settled = false;
                      }
                    });
                  } else {
                    $$renderer3.push("<!--[!-->");
                    Input($$renderer3, {
                      type: field.type || "text",
                      label: field.label,
                      placeholder: field.placeholder,
                      required: field.required,
                      size: "sm",
                      variant: "default",
                      get value() {
                        return values[field.key];
                      },
                      set value($$value) {
                        values[field.key] = $$value;
                        $$settled = false;
                      }
                    });
                  }
                  $$renderer3.push(`<!--]-->`);
                }
                $$renderer3.push(`<!--]-->`);
              }
              $$renderer3.push(`<!--]-->`);
            }
            $$renderer3.push(`<!--]-->`);
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]--></div>`);
      }
      $$renderer3.push(`<!--]--></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { values, fields });
  });
}
function NotificationManager($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let notifications = fallback($$props["notifications"], () => [], true);
    let position = fallback($$props["position"], "top-right");
    let maxNotifications = fallback($$props["maxNotifications"], 5);
    const baseClasses = "px-4 py-3 rounded-md border flex items-center justify-between mb-3 shadow-lg";
    const typeClasses = {
      success: "bg-green-100 border-green-400 text-green-700",
      error: "bg-red-100 border-red-400 text-red-700",
      warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
      info: "bg-blue-100 border-blue-400 text-blue-700",
      default: "bg-gray-100 border-gray-400 text-gray-700"
    };
    const iconPaths = {
      success: "M5 13l4 4L19 7",
      error: "M6 18L18 6M6 6l12 12",
      warning: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16c-.77.833.192 2.5 1.732 2.5z",
      info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      default: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    };
    const positionClasses = {
      "top-right": "fixed top-4 right-4",
      "top-left": "fixed top-4 left-4",
      "bottom-right": "fixed bottom-4 right-4",
      "bottom-left": "fixed bottom-4 left-4"
    };
    function getNotificationClasses(type) {
      return `${baseClasses} ${typeClasses[type] || typeClasses.default}`;
    }
    function getIcon(type) {
      return iconPaths[type] || iconPaths.default;
    }
    function removeNotification(id) {
    }
    if (notifications.length > maxNotifications) {
      notifications = notifications.slice(-maxNotifications);
    }
    if (notifications.length > 0) {
      notifications.forEach((notification) => {
        if (notification.duration && notification.duration > 0) {
          setTimeout(
            () => {
              removeNotification(notification.id);
            },
            notification.duration
          );
        }
      });
    }
    if (
      // Limit number of notifications
      notifications.length > 0
    ) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(`${stringify(positionClasses[position])} z-50 max-w-sm w-full space-y-2`)}><!--[-->`);
      const each_array = ensure_array_like(notifications);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let notification = each_array[$$index];
        $$renderer2.push(`<div${attr_class(clsx(getNotificationClasses(notification.type)))}><div class="flex items-center"><svg class="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${attr("d", getIcon(notification.type))}></path></svg> <span class="text-sm font-medium flex-1">${escape_html(notification.message)}</span></div> <button class="ml-3 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity" aria-label="Close notification"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { notifications, position, maxNotifications });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let showModal = false;
    let showSlideUp = false;
    let checkboxValue = false;
    let toggleValue = false;
    let inputValue = "";
    let textareaValue = "";
    let selectValue = "";
    let colorValue = "#3B82F6";
    let textAlignValue = "left";
    let formData = {};
    let isSaving = false;
    let isDeleting = false;
    let isPressed = false;
    const selectOptions = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" }
    ];
    const formConfig = [
      { key: "name", type: "text", label: "Name", required: true },
      { key: "email", type: "email", label: "Email", required: true },
      { key: "message", type: "textarea", label: "Message", rows: 4 }
    ];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head($$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Zabi Components</title>`);
        });
        $$renderer4.push(`<meta name="description" content="A collection of reusable Svelte components"/>`);
      });
      $$renderer3.push(`<div class="min-h-screen bg-page"><section class="container mx-auto px-4 py-8"><div class="flex justify-between items-center mb-8"><div><h1 class="text-4xl font-bold text-primary mb-2">Zabi Components</h1> <p class="text-lg text-secondary">A collection of reusable Svelte components built with
                    Tailwind CSS and TypeScript, featuring comprehensive scales
                    with light and dark mode support. Now with enhanced Button
                    component featuring 7 variants, full accessibility, and
                    semantic tokens.</p></div> `);
      ThemeToggle($$renderer3, { size: "lg" });
      $$renderer3.push(`<!----></div> <div class="space-y-8 mb-12"><div class="flex justify-between items-center">`);
      Heading($$renderer3, {
        level: "2",
        class: "text-2xl font-semibold text-primary",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Design System Scales`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        variant: "secondary",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->View Scale Demo`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> <p class="text-secondary">Comprehensive Tailwind scales supporting both light and dark
                modes. Includes color palettes, typography, spacing, shadows,
                animations, and more.</p> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="card p-4"><h3 class="text-lg font-semibold text-primary mb-2">Color Scales</h3> <p class="text-secondary text-sm mb-3">Primary, secondary, neutral, and semantic color palettes
                        with 11 shades each.</p> <div class="flex space-x-1"><div class="w-4 h-4 bg-primary rounded"></div> <div class="w-4 h-4 bg-secondary rounded"></div> <div class="w-4 h-4 bg-success rounded"></div> <div class="w-4 h-4 bg-warning rounded"></div> <div class="w-4 h-4 bg-error rounded"></div></div></div> <div class="card p-4"><h3 class="text-lg font-semibold text-primary mb-2">Typography</h3> <p class="text-secondary text-sm mb-3">Extended typography scale from 2xs to 9xl with proper
                        line heights.</p> <div class="space-y-1"><p class="text-sm text-primary">Small text</p> <p class="text-base text-primary">Base text</p> <p class="text-lg text-primary">Large text</p></div></div> <div class="card p-4"><h3 class="text-lg font-semibold text-primary mb-2">Adaptive Design</h3> <p class="text-secondary text-sm mb-3">Automatic light/dark mode support with CSS custom
                        properties.</p> <div class="flex items-center space-x-2"><div class="w-3 h-3 bg-primary rounded-full"></div> <span class="text-sm text-secondary">Theme-aware colors</span></div></div></div></div> <div class="space-y-8 mb-12">`);
      Heading($$renderer3, {
        level: "2",
        class: "text-2xl font-semibold text-primary",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Atomic Components`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div class="space-y-8"><div class="flex justify-between items-center"><h3 class="text-lg font-medium text-primary">Button Component</h3> `);
      Badge($$renderer3, {
        variant: "success",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->New &amp; Improved`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> <div class="space-y-4"><h4 class="text-md font-medium text-secondary">All Variants</h4> <div class="grid grid-cols-2 md:grid-cols-4 gap-4">`);
      Button($$renderer3, {
        variant: "primary",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Primary`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        variant: "secondary",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Secondary`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        variant: "success",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Success`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        variant: "warning",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Warning`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        variant: "danger",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Danger`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        variant: "ghost",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Ghost`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        variant: "link",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Link`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        variant: "primary",
        loading: true,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Loading`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> <div class="space-y-4"><h4 class="text-md font-medium text-secondary">Sizes</h4> <div class="flex items-center gap-4">`);
      Button($$renderer3, {
        size: "sm",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Small`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        size: "md",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Medium`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        size: "lg",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Large`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> <div class="space-y-4"><h4 class="text-md font-medium text-secondary">States</h4> <div class="flex flex-wrap gap-4">`);
      Button($$renderer3, {
        variant: "primary",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Normal`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        variant: "primary",
        loading: true,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Loading`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        variant: "primary",
        disabled: true,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Disabled`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        variant: "primary",
        fullWidth: true,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Full Width`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> <div class="space-y-4"><h4 class="text-md font-medium text-secondary">Interactive Examples</h4> <div class="flex flex-wrap gap-4">`);
      Button($$renderer3, {
        variant: "primary",
        loading: isSaving,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->${escape_html("Save Changes")}`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        variant: "danger",
        loading: isDeleting,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->${escape_html("Delete Item")}`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        variant: "secondary",
        ariaPressed: isPressed,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->${escape_html("Toggle")}`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        variant: "ghost",
        ariaLabel: "Settings",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->⚙️`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> <div class="space-y-4"><h4 class="text-md font-medium text-secondary">With Icons</h4> <div class="flex flex-wrap gap-4">`);
      Button($$renderer3, {
        variant: "primary",
        iconLeft: "🔍",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Search`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        variant: "success",
        iconRight: "✓",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Confirm`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        variant: "warning",
        iconLeft: "⚠️",
        iconRight: "→",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Proceed`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        variant: "ghost",
        iconLeft: "📁",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Open`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> <div class="space-y-4"><h4 class="text-md font-medium text-secondary">Accessibility Features</h4> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="card p-4"><h5 class="font-medium text-primary mb-2">ARIA Support</h5> <div class="space-y-2">`);
      Button($$renderer3, {
        ariaLabel: "Close dialog",
        variant: "ghost",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->×`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        ariaPressed: isPressed,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Toggle Button`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> <div class="card p-4"><h5 class="font-medium text-primary mb-2">Keyboard Navigation</h5> <p class="text-sm text-secondary">All buttons support Tab navigation, Enter/Space
                                activation, and proper focus indicators.</p></div></div></div> <div class="space-y-4"><h4 class="text-md font-medium text-secondary">Semantic Token Usage</h4> <div class="card p-4"><p class="text-sm text-secondary mb-3">All button variants use semantic design tokens for
                            consistent theming and automatic light/dark mode
                            support.</p> <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs"><div class="flex items-center gap-2"><div class="w-3 h-3 bg-primary rounded"></div> <span>Primary</span></div> <div class="flex items-center gap-2"><div class="w-3 h-3 bg-success rounded"></div> <span>Success</span></div> <div class="flex items-center gap-2"><div class="w-3 h-3 bg-warning rounded"></div> <span>Warning</span></div> <div class="flex items-center gap-2"><div class="w-3 h-3 bg-error rounded"></div> <span>Danger</span></div></div></div></div></div> <div class="space-y-4"><h3 class="text-lg font-medium text-primary">Badges</h3> <div class="flex flex-wrap gap-4">`);
      Badge($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Default`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Badge($$renderer3, {
        variant: "success",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Success`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Badge($$renderer3, {
        variant: "warning",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Warning`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Badge($$renderer3, {
        variant: "error",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Error`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Badge($$renderer3, {
        variant: "info",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Info`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> <div class="space-y-4"><h3 class="text-lg font-medium text-primary">Cards</h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`);
      Card($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<h4 class="font-semibold mb-2">Basic Card</h4> <p class="text-gray-600">This is a basic card component.</p>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        variant: "elevated",
        children: ($$renderer4) => {
          $$renderer4.push(`<h4 class="font-semibold mb-2">Elevated Card</h4> <p class="text-gray-600">This card has elevation.</p>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        variant: "outlined",
        children: ($$renderer4) => {
          $$renderer4.push(`<h4 class="font-semibold mb-2">Outlined Card</h4> <p class="text-gray-600">This card has a border.</p>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-700">Form Controls</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-4">`);
      Input($$renderer3, {
        placeholder: "Enter text...",
        label: "Text Input",
        get value() {
          return inputValue;
        },
        set value($$value) {
          inputValue = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      Textarea($$renderer3, {
        placeholder: "Enter message...",
        label: "Textarea",
        rows: "3",
        get value() {
          return textareaValue;
        },
        set value($$value) {
          textareaValue = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      Select($$renderer3, {
        options: selectOptions,
        label: "Select Option",
        get value() {
          return selectValue;
        },
        set value($$value) {
          selectValue = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      ColorPicker($$renderer3, {
        label: "Color Picker",
        get value() {
          return colorValue;
        },
        set value($$value) {
          colorValue = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      TextAlignment($$renderer3, {
        label: "Text Alignment",
        get value() {
          return textAlignValue;
        },
        set value($$value) {
          textAlignValue = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div class="space-y-4">`);
      Checkbox($$renderer3, {
        label: "Checkbox Option",
        get checked() {
          return checkboxValue;
        },
        set checked($$value) {
          checkboxValue = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      Toggle($$renderer3, {
        label: "Toggle Switch",
        get checked() {
          return toggleValue;
        },
        set checked($$value) {
          toggleValue = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> <div class="p-4 border rounded-lg"><h4 class="font-medium mb-2">Selected Values:</h4> <p class="text-sm text-gray-600">Input: ${escape_html(inputValue)}</p> <p class="text-sm text-gray-600">Textarea: ${escape_html(textareaValue)}</p> <p class="text-sm text-gray-600">Select: ${escape_html(selectValue)}</p> <p class="text-sm text-gray-600">Color: ${escape_html(colorValue)}</p> <p class="text-sm text-gray-600">Alignment: ${escape_html(textAlignValue)}</p> <p class="text-sm text-gray-600">Checkbox: ${escape_html(checkboxValue)}</p> <p class="text-sm text-gray-600">Toggle: ${escape_html(toggleValue)}</p></div></div></div></div> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-700">Skeleton Loading</h3> <div class="space-y-2">`);
      Skeleton($$renderer3, { height: "h-4", width: "w-3/4" });
      $$renderer3.push(`<!----> `);
      Skeleton($$renderer3, { height: "h-4", width: "w-1/2" });
      $$renderer3.push(`<!----> `);
      Skeleton($$renderer3, { height: "h-20", width: "w-full" });
      $$renderer3.push(`<!----></div></div> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-700">Optimized Image</h3> `);
      OptimizedImage($$renderer3, {
        src: "/vite.svg",
        alt: "Vite Logo",
        width: "100",
        height: "100",
        class: "rounded-lg"
      });
      $$renderer3.push(`<!----></div></div> <div class="space-y-8 mb-12">`);
      Heading($$renderer3, {
        level: "2",
        class: "text-2xl font-semibold text-gray-800",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Molecular Components`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-700">Alerts</h3> <div class="space-y-2">`);
      Alert($$renderer3, {
        variant: "info",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->This is an info alert`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Alert($$renderer3, {
        variant: "success",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->This is a success alert`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Alert($$renderer3, {
        variant: "warning",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->This is a warning alert`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Alert($$renderer3, {
        variant: "error",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->This is an error alert`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div></div> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-700">Modal</h3> `);
      Button($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Open Modal`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Modal($$renderer3, {
        title: "Example Modal",
        get isOpen() {
          return showModal;
        },
        set isOpen($$value) {
          showModal = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<p class="mb-4">This is a modal dialog example.</p> <div class="flex gap-2">`);
          Button($$renderer4, {
            variant: "primary",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Close`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Button($$renderer4, {
            variant: "secondary",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Cancel`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----></div>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-700">Slide Up</h3> `);
      Button($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Open Slide Up`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      SlideUp($$renderer3, {
        title: "Slide Up Panel",
        get isOpen() {
          return showSlideUp;
        },
        set isOpen($$value) {
          showSlideUp = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<p class="mb-4">This is a slide-up panel example.</p> `);
          Button($$renderer4, {
            variant: "primary",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Close`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-700">Dropdown</h3> `);
      Dropdown($$renderer3, {
        $$slots: {
          trigger: ($$renderer4) => {
            Button($$renderer4, {
              slot: "trigger",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Dropdown Menu`);
              },
              $$slots: { default: true }
            });
          },
          content: ($$renderer4) => {
            $$renderer4.push(`<div slot="content" class="p-2"><button class="block w-full text-left px-4 py-2 text-sm hover:bg-surface-secondary rounded">Option 1</button> <button class="block w-full text-left px-4 py-2 text-sm hover:bg-surface-secondary rounded">Option 2</button> <button class="block w-full text-left px-4 py-2 text-sm hover:bg-surface-secondary rounded">Option 3</button></div>`);
          }
        }
      });
      $$renderer3.push(`<!----></div> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-700">Image Upload</h3> `);
      ImageUpload($$renderer3, {
        accept: "image/*",
        maxSize: 5 * 1024 * 1024,
        onUpload: (files) => {
        }
      });
      $$renderer3.push(`<!----></div> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-700">Dynamic Form</h3> `);
      KeyValueForm($$renderer3, {
        config: formConfig,
        get data() {
          return formData;
        },
        set data($$value) {
          formData = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div></div> <div class="space-y-8 mb-12">`);
      Heading($$renderer3, {
        level: "2",
        class: "text-2xl font-semibold text-gray-800",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Organism Components`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-700">Notification Manager</h3> `);
      Button($$renderer3, {
        variant: "primary",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Show Toast Notification`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      NotificationManager($$renderer3, {});
      $$renderer3.push(`<!----></div></div> <div class="space-y-4"><h3 class="text-lg font-medium text-primary">Performance Monitor</h3> `);
      PerformanceMonitor($$renderer3, {});
      $$renderer3.push(`<!----></div> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></section></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
