import { y as attr, z as attr_class, F as clsx, x as slot, G as bind_props, J as stringify, K as attributes, N as attr_style, O as ensure_array_like, P as element, Q as spread_props, T as sanitize_slots, V as head } from "../../chunks/index.js";
import { l as ssr_context, m as fallback, k as escape_html } from "../../chunks/context.js";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
function Button($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let shouldApplyGrain, grainClasses, buttonClasses;
    let text = fallback($$props["text"], "");
    let onClick = fallback($$props["onClick"], () => {
    });
    let variant = fallback($$props["variant"], "brand");
    let size = fallback($$props["size"], "md");
    let disabled = fallback($$props["disabled"], false);
    let loading = fallback($$props["loading"], false);
    let fullWidth = fallback($$props["fullWidth"], false);
    let type = fallback($$props["type"], "button");
    let className = fallback($$props["className"], "");
    let uppercased = fallback($$props["uppercased"], variant === "brand");
    let grain = fallback($$props["grain"], "auto");
    let grainType = fallback($$props["grainType"], "paper");
    let ariaLabel = fallback($$props["ariaLabel"], "");
    let ariaDescribedBy = fallback($$props["ariaDescribedBy"], "");
    let ariaExpanded = fallback($$props["ariaExpanded"], void 0);
    let ariaControls = fallback($$props["ariaControls"], void 0);
    let ariaPressed = fallback($$props["ariaPressed"], void 0);
    const baseClasses = "transition-all duration-200 inline-flex items-center justify-center gap-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden";
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm md:text-base",
      lg: "px-5 py-3 text-base"
    };
    const variantClasses = {
      brand: "border border-primary text-primary bg-surface hover:bg-surface-secondary hover:border-primary-hover active:scale-[0.98] shadow-adaptive-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
      primary: "bg-primary text-inverse border border-primary hover:bg-primary-hover hover:border-primary-hover active:scale-[0.98] shadow-adaptive-sm hover:shadow-adaptive-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
      secondary: "bg-surface-secondary text-primary border border-primary hover:bg-surface-tertiary hover:border-primary-hover active:scale-[0.98] shadow-adaptive-sm hover:shadow-adaptive-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
      success: "bg-success text-inverse border border-success hover:bg-success-hover hover:border-success-hover active:scale-[0.98] shadow-adaptive-sm hover:shadow-adaptive-md focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2",
      danger: "bg-error text-inverse border border-error hover:bg-error-hover hover:border-error-hover active:scale-[0.98] shadow-adaptive-sm hover:shadow-adaptive-md focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2",
      ghost: "bg-transparent text-secondary border border-primary hover:bg-surface-secondary hover:border-primary-hover active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    };
    shouldApplyGrain = grain === true || grain === "auto" && variant !== "ghost";
    grainClasses = shouldApplyGrain ? [
      "btn-grain",
      grainType !== "paper" ? `btn-grain-${grainType}` : "",
      variant === "brand" && grainType === "paper" ? "btn-grain-cyber" : ""
    ].filter(Boolean).join(" ") : "";
    buttonClasses = [
      baseClasses,
      sizeClasses[size],
      variantClasses[variant],
      fullWidth ? "w-full" : "",
      uppercased ? "uppercase tracking-wide font-title font-bold" : "",
      grainClasses,
      className
    ].filter(Boolean).join(" ");
    $$renderer2.push(`<button${attr("type", type)}${attr_class(clsx(buttonClasses))}${attr("disabled", disabled || loading, true)}${attr("aria-busy", loading ? "true" : "false")}${attr("aria-label", ariaLabel || (loading ? "Loading..." : void 0))}${attr("aria-describedby", ariaDescribedBy || void 0)}${attr("aria-expanded", ariaExpanded)}${attr("aria-controls", ariaControls)}${attr("aria-pressed", ariaPressed)}>`);
    if (shouldApplyGrain) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="absolute inset-0 rounded-lg pointer-events-none" style="background-image: repeating-radial-gradient(circle at center, rgba(0,0,0,0.1) 0 1px, transparent 1px 100%), repeating-radial-gradient(circle at center, rgba(255,255,255,0.05) 0 1px, transparent 1px 100%); mix-blend-mode: overlay; opacity: 0.6;"></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (loading) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    slot($$renderer2, $$props, "default", {}, () => {
      $$renderer2.push(`${escape_html(text)}`);
    });
    $$renderer2.push(`<!--]--></button>`);
    bind_props($$props, {
      text,
      onClick,
      variant,
      size,
      disabled,
      loading,
      fullWidth,
      type,
      className,
      uppercased,
      grain,
      grainType,
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
  code: ".card-header.svelte-1qx5g6b:empty {display:none;}.card-content.svelte-1qx5g6b:empty {display:none;}.card-footer.svelte-1qx5g6b:empty {display:none;}"
};
function Card($$renderer, $$props) {
  $$renderer.global.css.add($$css$4);
  $$renderer.component(($$renderer2) => {
    let baseClasses, accessibilityProps;
    let variant = fallback($$props["variant"], "default");
    let density = fallback($$props["density"], "comfortable");
    let disabled = fallback($$props["disabled"], false);
    let loading = fallback($$props["loading"], false);
    let className = fallback($$props["className"], "");
    let ariaLabel = fallback($$props["ariaLabel"], "");
    let ariaDescribedBy = fallback($$props["ariaDescribedBy"], "");
    const densityClasses = {
      compact: "p-3 sm:p-4 rounded-md shadow-sm",
      comfortable: "p-4 sm:p-6 rounded-lg shadow-sm sm:shadow-md",
      spacious: "p-6 sm:p-8 rounded-xl shadow-md sm:shadow-lg"
    };
    const variantClasses = {
      default: "bg-card border border-primary",
      interactive: "bg-card border border-primary hover:bg-card-hover hover:border-primary-hover focus:bg-card-active focus:border-primary-hover focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 cursor-pointer"
    };
    baseClasses = [
      "transition-all duration-200",
      variantClasses[variant],
      densityClasses[density],
      disabled ? "opacity-50 cursor-not-allowed" : "",
      loading ? "animate-pulse" : "",
      className
    ].filter(Boolean).join(" ");
    accessibilityProps = {
      role: variant === "interactive" ? "button" : "presentation",
      tabindex: variant === "interactive" ? disabled ? -1 : 0 : void 0,
      "aria-disabled": variant === "interactive" ? disabled : void 0,
      "aria-busy": loading,
      "aria-label": ariaLabel || void 0,
      "aria-describedby": ariaDescribedBy || void 0
    };
    $$renderer2.push(`<div${attributes({ class: clsx(baseClasses), ...accessibilityProps }, "svelte-1qx5g6b")}><div class="card-header svelte-1qx5g6b"><!--[-->`);
    slot($$renderer2, $$props, "header", {}, null);
    $$renderer2.push(`<!--]--></div> <div class="card-content svelte-1qx5g6b"><!--[-->`);
    slot($$renderer2, $$props, "default", {}, null);
    $$renderer2.push(`<!--]--></div> <div class="card-footer svelte-1qx5g6b"><!--[-->`);
    slot($$renderer2, $$props, "footer", {}, null);
    $$renderer2.push(`<!--]--></div> `);
    if (loading) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="absolute inset-0 bg-surface/50 rounded-lg flex items-center justify-center" aria-hidden="true"><div class="animate-spin rounded-full h-6 w-6 border-2 border-tertiary border-t-transparent"></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, {
      variant,
      density,
      disabled,
      loading,
      className,
      ariaLabel,
      ariaDescribedBy
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
      "ease-in-out"
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
  code: '\n    /* Custom focus styles for better accessibility */.input-focus-visible {outline:2px solid var(--color-plasma-red-500);outline-offset:2px;}\n\n    /* Smooth transitions for all interactive elements */input.svelte-7hu4vd {transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1);}\n\n    /* Custom scrollbar for textarea-like inputs */input.svelte-7hu4vd::-webkit-scrollbar {width:4px;}input.svelte-7hu4vd::-webkit-scrollbar-track {background:transparent;}input.svelte-7hu4vd::-webkit-scrollbar-thumb {background:var(--color-dark-600);border-radius:2px;}input.svelte-7hu4vd::-webkit-scrollbar-thumb:hover {background:var(--color-dark-500);}\n\n    /* Placeholder styling */input.svelte-7hu4vd::-moz-placeholder {-moz-transition:color 0.2s ease;transition:color 0.2s ease;}input.svelte-7hu4vd::placeholder {transition:color 0.2s ease;}input.svelte-7hu4vd:focus::-moz-placeholder {color:var(--color-gray-300);}input.svelte-7hu4vd:focus::placeholder {color:var(--color-gray-300);}\n\n    /* Number input spinner styling */input[type="number"].svelte-7hu4vd::-webkit-outer-spin-button,\n    input[type="number"].svelte-7hu4vd::-webkit-inner-spin-button {-webkit-appearance:none;margin:0;}input[type="number"].svelte-7hu4vd {-moz-appearance:textfield;-webkit-appearance:textfield;appearance:textfield;}\n\n    /* Search input styling */input[type="search"].svelte-7hu4vd::-webkit-search-cancel-button,\n    input[type="search"].svelte-7hu4vd::-webkit-search-decoration {-webkit-appearance:none;}\n\n    /* Password toggle button hover effects */button[aria-label].svelte-7hu4vd {transition:all 0.2s ease;}button[aria-label].svelte-7hu4vd:hover {transform:scale(1.1);}button[aria-label].svelte-7hu4vd:active {transform:scale(0.95);}'
};
function Input($$renderer, $$props) {
  $$renderer.global.css.add($$css$2);
  $$renderer.component(($$renderer2) => {
    let inputId, sizeClasses, variantClasses, stateClasses, containerClasses, inputClasses, labelClasses, helpTextClasses;
    let value = fallback($$props["value"], "");
    let type = fallback($$props["type"], "text");
    let placeholder = fallback($$props["placeholder"], "");
    let label = fallback($$props["label"], "");
    let disabled = fallback($$props["disabled"], false);
    let required = fallback($$props["required"], false);
    let readonly = fallback($$props["readonly"], false);
    let error = fallback($$props["error"], "");
    let success = fallback($$props["success"], "");
    let helpText = fallback($$props["helpText"], "");
    let size = fallback($$props["size"], "md");
    let variant = fallback($$props["variant"], "default");
    let showPasswordToggle = fallback($$props["showPasswordToggle"], false);
    let maxLength = fallback($$props["maxLength"], void 0);
    let minLength = fallback($$props["minLength"], void 0);
    let pattern = fallback($$props["pattern"], void 0);
    let autocomplete = fallback($$props["autocomplete"], void 0);
    let name = fallback($$props["name"], void 0);
    let id = fallback($$props["id"], void 0);
    function focus() {
    }
    function blur() {
    }
    function select() {
    }
    inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-5 py-3 text-lg"
    };
    variantClasses = {
      default: "bg-surface border border-primary text-primary placeholder-text-placeholder focus:ring-primary focus:border-transparent",
      outlined: "bg-surface-secondary border border-primary text-primary placeholder-text-placeholder focus:ring-primary focus:border-transparent",
      filled: "bg-surface-secondary border border-primary text-primary placeholder-text-placeholder focus:ring-primary focus:border-transparent",
      ghost: "bg-transparent border border-primary text-primary placeholder-text-placeholder focus:ring-primary focus:border-transparent"
    };
    stateClasses = error ? "focus:ring-error border-error" : success ? "focus:ring-success border-success" : "";
    containerClasses = [
      "relative",
      "group",
      "transition-all",
      "duration-200",
      "ease-in-out"
    ].join(" ");
    inputClasses = [
      "w-full",
      "min-w-0",
      // Allow input to shrink below minimum width
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
      "read-only:cursor-default",
      "read-only:opacity-75",
      sizeClasses[size],
      variantClasses[variant],
      stateClasses,
      error ? "grainy-red" : success ? "grainy-green" : "grainy-texture"
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
    $$renderer2.push(`<div${attr_class(clsx(containerClasses))}>`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", inputId)}${attr_class(clsx(labelClasses))}>${escape_html(label)} `);
      if (required) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-error ml-1">*</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="relative"><input${attr("id", inputId)}${attr("type", type)}${attr("value", value)}${attr("placeholder", placeholder)}${attr("disabled", disabled, true)}${attr("required", required, true)}${attr("readonly", readonly, true)}${attr("maxlength", maxLength)}${attr("minlength", minLength)}${attr("pattern", pattern)}${attr("autocomplete", autocomplete || void 0)}${attr("name", name)}${attr_class(clsx(inputClasses), "svelte-7hu4vd")}${attr("aria-invalid", error ? "true" : "false")}${attr("aria-describedby", error || success || helpText ? `${inputId}-help` : void 0)}/> `);
    if (showPasswordToggle && type === "password") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:text-white svelte-7hu4vd" tabindex="-1"${attr("aria-label", "Show password")}>`);
      {
        $$renderer2.push("<!--[!-->");
        Eye($$renderer2, { size: 20 });
      }
      $$renderer2.push(`<!--]--></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class(`absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 ${stringify("")}`)}></div></div> `);
    if (error || success || helpText) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr("id", `${stringify(inputId)}-help`)}${attr_class(clsx(helpTextClasses))}>`);
      if (error) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center gap-1">`);
        Circle_alert($$renderer2, { size: 16, class: "flex-shrink-0" });
        $$renderer2.push(`<!----> <span>${escape_html(error)}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (success) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center gap-1">`);
          Circle_check_big($$renderer2, { size: 16, class: "flex-shrink-0" });
          $$renderer2.push(`<!----> <span>${escape_html(success)}</span></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (helpText) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<span>${escape_html(helpText)}</span>`);
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
      placeholder,
      label,
      disabled,
      required,
      readonly,
      error,
      success,
      helpText,
      size,
      variant,
      showPasswordToggle,
      maxLength,
      minLength,
      pattern,
      autocomplete,
      name,
      id,
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
    let variant = fallback($$props["variant"], "default");
    let searchable = fallback($$props["searchable"], false);
    let clearable = fallback($$props["clearable"], false);
    let name = fallback($$props["name"], void 0);
    let id = fallback($$props["id"], void 0);
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
      default: "bg-surface border border-primary text-primary placeholder-text-placeholder focus:ring-primary focus:border-transparent",
      outlined: "bg-surface-secondary border border-primary text-primary placeholder-text-placeholder focus:ring-primary focus:border-transparent",
      filled: "bg-surface-secondary border border-primary text-primary placeholder-text-placeholder focus:ring-primary focus:border-transparent",
      ghost: "bg-transparent border border-primary text-primary placeholder-text-placeholder focus:ring-primary focus:border-transparent"
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
      "cursor-pointer",
      "appearance-none",
      "pr-10",
      sizeClasses[size],
      variantClasses[variant],
      stateClasses,
      error ? "grainy-red" : success ? "grainy-green" : "grainy-texture"
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
  code: "\n    /* Custom focus styles for better accessibility */.textarea-focus-visible {outline:2px solid var(--color-plasma-red-500);outline-offset:2px;}\n\n    /* Smooth transitions for all interactive elements */textarea.svelte-1bsl3nr {transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1);}\n\n    /* Custom scrollbar for textarea */textarea.svelte-1bsl3nr::-webkit-scrollbar {width:6px;}textarea.svelte-1bsl3nr::-webkit-scrollbar-track {background:transparent;}textarea.svelte-1bsl3nr::-webkit-scrollbar-thumb {background:var(--color-dark-600);border-radius:3px;}textarea.svelte-1bsl3nr::-webkit-scrollbar-thumb:hover {background:var(--color-dark-500);}\n\n    /* Placeholder styling */textarea.svelte-1bsl3nr::-moz-placeholder {-moz-transition:color 0.2s ease;transition:color 0.2s ease;}textarea.svelte-1bsl3nr::placeholder {transition:color 0.2s ease;}textarea.svelte-1bsl3nr:focus::-moz-placeholder {color:var(--color-gray-300);}textarea.svelte-1bsl3nr:focus::placeholder {color:var(--color-gray-300);}\n\n    /* Character count styling */.char-count-warning.svelte-1bsl3nr {color:var(--color-cyber-amber-400);}.char-count-error.svelte-1bsl3nr {color:var(--color-blood-red-400);}\n\n    /* Resize handle styling */textarea.svelte-1bsl3nr:not(.resize-none) {resize:both;}textarea.resize-x.svelte-1bsl3nr {resize:horizontal;}textarea.resize-y.svelte-1bsl3nr {resize:vertical;}\n\n    /* Focus ring animation */.focus-ring.svelte-1bsl3nr {\n        animation: svelte-1bsl3nr-focus-ring-pulse 0.2s ease-out;}\n\n    @keyframes svelte-1bsl3nr-focus-ring-pulse {\n        0% {\n            transform: scale(0.95);\n            opacity: 0;\n        }\n        100% {\n            transform: scale(1);\n            opacity: 1;\n        }\n    }"
};
function Textarea($$renderer, $$props) {
  $$renderer.global.css.add($$css);
  $$renderer.component(($$renderer2) => {
    let textareaId, sizeClasses, variantClasses, stateClasses, resizeClasses, containerClasses, textareaClasses, labelClasses, helpTextClasses, charCountClasses;
    let value = fallback($$props["value"], "");
    let placeholder = fallback($$props["placeholder"], "");
    let label = fallback($$props["label"], "");
    let disabled = fallback($$props["disabled"], false);
    let required = fallback($$props["required"], false);
    let readonly = fallback($$props["readonly"], false);
    let error = fallback($$props["error"], "");
    let success = fallback($$props["success"], "");
    let helpText = fallback($$props["helpText"], "");
    let size = fallback($$props["size"], "md");
    let variant = fallback($$props["variant"], "default");
    let rows = fallback($$props["rows"], 4);
    let maxLength = fallback($$props["maxLength"], void 0);
    let minLength = fallback($$props["minLength"], void 0);
    const pattern = void 0;
    let name = fallback($$props["name"], void 0);
    let id = fallback($$props["id"], void 0);
    let resize = fallback($$props["resize"], "vertical");
    let autoResize = fallback($$props["autoResize"], false);
    function focus() {
    }
    function blur() {
    }
    function select() {
    }
    textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-5 py-3 text-lg"
    };
    variantClasses = {
      default: "bg-surface border border-primary text-primary placeholder-text-placeholder focus:ring-primary focus:border-transparent",
      outlined: "bg-surface-secondary border border-primary text-primary placeholder-text-placeholder focus:ring-primary focus:border-transparent",
      filled: "bg-surface-secondary border border-primary text-primary placeholder-text-placeholder focus:ring-primary focus:border-transparent",
      ghost: "bg-transparent border border-primary text-primary placeholder-text-placeholder focus:ring-primary focus:border-transparent"
    };
    stateClasses = error ? "focus:ring-error border-error" : success ? "focus:ring-success border-success" : "";
    resizeClasses = {
      none: "resize-none",
      both: "resize",
      horizontal: "resize-x",
      vertical: "resize-y"
    };
    containerClasses = [
      "relative",
      "group",
      "transition-all",
      "duration-200",
      "ease-in-out"
    ].join(" ");
    textareaClasses = [
      "w-full",
      "min-w-0",
      // Allow textarea to shrink below minimum width
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
      "read-only:cursor-default",
      "read-only:opacity-75",
      "overflow-hidden",
      sizeClasses[size],
      variantClasses[variant],
      stateClasses,
      resizeClasses[resize],
      error ? "grainy-red" : success ? "grainy-green" : "grainy-texture"
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
    charCountClasses = [
      "text-xs",
      "text-tertiary",
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
        $$renderer2.push(`<span class="text-error ml-1 svelte-1bsl3nr">*</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="relative svelte-1bsl3nr"><textarea${attr("id", textareaId)}${attr("placeholder", placeholder)}${attr("disabled", disabled, true)}${attr("required", required, true)}${attr("readonly", readonly, true)}${attr("maxlength", maxLength)}${attr("minlength", minLength)}${attr("name", name)}${attr("rows", rows)}${attr_class(clsx(textareaClasses), "svelte-1bsl3nr")}${attr("aria-invalid", error ? "true" : "false")}${attr("aria-describedby", error || success || helpText || maxLength ? `${textareaId}-help` : void 0)}>`);
    const $$body = escape_html(value);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea> <div${attr_class(`absolute inset-0 rounded-lg pointer-events-none transition-all duration-200 ${stringify("")}`, "svelte-1bsl3nr")}></div></div> `);
    if (maxLength) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(clsx(charCountClasses), "svelte-1bsl3nr")}>${escape_html(value.length)}/${escape_html(maxLength)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (error || success || helpText) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr("id", `${stringify(textareaId)}-help`)}${attr_class(clsx(helpTextClasses), "svelte-1bsl3nr")}>`);
      if (error) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center gap-1 svelte-1bsl3nr">`);
        Circle_alert($$renderer2, { size: 16, class: "flex-shrink-0" });
        $$renderer2.push(`<!----> <span class="svelte-1bsl3nr">${escape_html(error)}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (success) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="flex items-center gap-1 svelte-1bsl3nr">`);
          Circle_check_big($$renderer2, { size: 16, class: "flex-shrink-0" });
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
      placeholder,
      label,
      disabled,
      required,
      readonly,
      error,
      success,
      helpText,
      size,
      variant,
      rows,
      maxLength,
      minLength,
      name,
      id,
      resize,
      autoResize,
      pattern,
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
    const sizeClasses = { sm: "w-8 h-4", md: "w-11 h-6", lg: "w-14 h-7" };
    const thumbSizeClasses = { sm: "w-3 h-3", md: "w-5 h-5", lg: "w-6 h-6" };
    translateClasses = {
      sm: checked ? "translate-x-4" : "translate-x-0",
      md: checked ? "translate-x-5" : "translate-x-0",
      lg: checked ? "translate-x-7" : "translate-x-0"
    };
    $$renderer2.push(`<div class="flex items-center space-x-3 min-w-32 sm:min-w-36 md:min-w-40 lg:min-w-44"><button type="button" role="switch"${attr("aria-checked", checked)}${attr("aria-label", label || "Toggle")}${attr("disabled", disabled, true)}${attr_class(`relative inline-flex ${stringify(sizeClasses[size])} flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${stringify(checked ? "bg-primary" : "bg-surface-tertiary")} ${stringify(disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-80")}`)}><span${attr_class(`pointer-events-none inline-block ${stringify(thumbSizeClasses[size])} transform rounded-full bg-surface shadow-lg ring-0 transition duration-200 ease-in-out ${stringify(translateClasses[size])}`)}></span></button> `);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button type="button" class="text-sm font-medium text-primary cursor-pointer select-none hover:text-secondary transition-colors">${escape_html(label)}</button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { checked, disabled, label, size });
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
    let alertClasses, iconEmojis, isGameStyle;
    let type = fallback($$props["type"], "info");
    let title = fallback($$props["title"], "");
    let message = fallback($$props["message"], "");
    let dismissible = fallback($$props["dismissible"], true);
    let onDismiss = fallback($$props["onDismiss"], null);
    alertClasses = {
      error: "bg-error-surface text-error-text border border-error/20",
      warning: "bg-warning-surface text-warning-text border border-warning/20",
      success: "bg-success-surface text-success-text border border-success/20",
      info: "bg-info-surface text-info-text border border-info/20",
      "game-error": "bg-gradient-to-br from-error-900 via-error-800 to-error-900 text-error-text transform shadow-2xl border border-error/30"
    };
    iconEmojis = {
      error: "🚫",
      warning: "⚠️",
      success: "✅",
      info: "ℹ️",
      "game-error": "🚫"
    };
    isGameStyle = type === "game-error";
    $$renderer2.push(`<div${attr_class(`relative rounded-xl p-4 shadow-lg ${stringify(alertClasses[type])}`)} role="alert">`);
    if (dismissible) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="absolute top-3 right-3 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 transition-all duration-200 group" aria-label="Dismiss alert" type="button"><svg class="w-4 h-4 text-current group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="pr-8">`);
    if (isGameStyle) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center"><div class="flex items-center justify-center gap-3 mb-4"><div class="text-4xl">${escape_html(iconEmojis[type])}</div> `);
      if (title) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<h3 class="text-xl font-bold">${escape_html(title)}</h3>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> `);
      if (type === "game-error") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="bg-black bg-opacity-50 rounded-lg p-3 mb-4"><p class="text-sm font-mono">> AUTHENTICATION FAILED</p></div>`);
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
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="flex items-start gap-3"><div class="text-lg flex-shrink-0 mt-0.5">${escape_html(iconEmojis[type])}</div> <div class="flex-1 min-w-0">`);
      if (title) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<h4 class="font-semibold text-sm mb-1">${escape_html(title)}</h4>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (message) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-sm">${escape_html(message)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <!--[-->`);
    slot($$renderer2, $$props, "default", {}, null);
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { type, title, message, dismissible, onDismiss });
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
            variant: "outlined",
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
              variant: "outlined",
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
                variant: "outlined",
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
                    variant: "outlined",
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
                      variant: "outlined",
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
function _page($$renderer) {
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
  function $$render_inner($$renderer2) {
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Zabi Components</title>`);
      });
      $$renderer3.push(`<meta name="description" content="A collection of reusable Svelte components"/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-page"><section class="container mx-auto px-4 py-8"><div class="flex justify-between items-center mb-8"><div><h1 class="text-4xl font-bold text-primary mb-2">Zabi Components</h1> <p class="text-lg text-secondary">A collection of reusable Svelte components built with
                    Tailwind CSS and TypeScript, featuring comprehensive scales
                    with light and dark mode support.</p></div> `);
    ThemeToggle($$renderer2, { size: "lg", variant: "outline" });
    $$renderer2.push(`<!----></div> <div class="space-y-8 mb-12"><div class="flex justify-between items-center">`);
    Heading($$renderer2, {
      level: "2",
      class: "text-2xl font-semibold text-primary",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Design System Scales`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      variant: "outline",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->View Scale Demo`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> <p class="text-secondary">Comprehensive Tailwind scales supporting both light and dark
                modes. Includes color palettes, typography, spacing, shadows,
                animations, and more.</p> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="card p-4"><h3 class="text-lg font-semibold text-primary mb-2">Color Scales</h3> <p class="text-secondary text-sm mb-3">Primary, secondary, neutral, and semantic color palettes
                        with 11 shades each.</p> <div class="flex space-x-1"><div class="w-4 h-4 bg-primary rounded"></div> <div class="w-4 h-4 bg-secondary rounded"></div> <div class="w-4 h-4 bg-success rounded"></div> <div class="w-4 h-4 bg-warning rounded"></div> <div class="w-4 h-4 bg-error rounded"></div></div></div> <div class="card p-4"><h3 class="text-lg font-semibold text-primary mb-2">Typography</h3> <p class="text-secondary text-sm mb-3">Extended typography scale from 2xs to 9xl with proper
                        line heights.</p> <div class="space-y-1"><p class="text-sm text-primary">Small text</p> <p class="text-base text-primary">Base text</p> <p class="text-lg text-primary">Large text</p></div></div> <div class="card p-4"><h3 class="text-lg font-semibold text-primary mb-2">Adaptive Design</h3> <p class="text-secondary text-sm mb-3">Automatic light/dark mode support with CSS custom
                        properties.</p> <div class="flex items-center space-x-2"><div class="w-3 h-3 bg-primary rounded-full"></div> <span class="text-sm text-secondary">Theme-aware colors</span></div></div></div></div> <div class="space-y-8 mb-12">`);
    Heading($$renderer2, {
      level: "2",
      class: "text-2xl font-semibold text-primary",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Atomic Components`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> <div class="space-y-4"><h3 class="text-lg font-medium text-primary">Buttons</h3> <div class="flex flex-wrap gap-4">`);
    Button($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Primary Button`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      variant: "secondary",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Secondary Button`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      variant: "outline",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Outline Button`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      variant: "ghost",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Ghost Button`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      size: "sm",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Small Button`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      size: "lg",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Large Button`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></div> <div class="space-y-4"><h3 class="text-lg font-medium text-primary">Badges</h3> <div class="flex flex-wrap gap-4">`);
    Badge($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Default`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Badge($$renderer2, {
      variant: "success",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Success`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Badge($$renderer2, {
      variant: "warning",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Warning`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Badge($$renderer2, {
      variant: "error",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Error`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Badge($$renderer2, {
      variant: "info",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Info`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></div> <div class="space-y-4"><h3 class="text-lg font-medium text-primary">Cards</h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`);
    Card($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<h4 class="font-semibold mb-2">Basic Card</h4> <p class="text-gray-600">This is a basic card component.</p>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      variant: "elevated",
      children: ($$renderer3) => {
        $$renderer3.push(`<h4 class="font-semibold mb-2">Elevated Card</h4> <p class="text-gray-600">This card has elevation.</p>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      variant: "outlined",
      children: ($$renderer3) => {
        $$renderer3.push(`<h4 class="font-semibold mb-2">Outlined Card</h4> <p class="text-gray-600">This card has a border.</p>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></div> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-700">Form Controls</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-4">`);
    Input($$renderer2, {
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
    $$renderer2.push(`<!----> `);
    Textarea($$renderer2, {
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
    $$renderer2.push(`<!----> `);
    Select($$renderer2, {
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
    $$renderer2.push(`<!----> `);
    ColorPicker($$renderer2, {
      label: "Color Picker",
      get value() {
        return colorValue;
      },
      set value($$value) {
        colorValue = $$value;
        $$settled = false;
      }
    });
    $$renderer2.push(`<!----> `);
    TextAlignment($$renderer2, {
      label: "Text Alignment",
      get value() {
        return textAlignValue;
      },
      set value($$value) {
        textAlignValue = $$value;
        $$settled = false;
      }
    });
    $$renderer2.push(`<!----></div> <div class="space-y-4">`);
    Checkbox($$renderer2, {
      label: "Checkbox Option",
      get checked() {
        return checkboxValue;
      },
      set checked($$value) {
        checkboxValue = $$value;
        $$settled = false;
      }
    });
    $$renderer2.push(`<!----> `);
    Toggle($$renderer2, {
      label: "Toggle Switch",
      get checked() {
        return toggleValue;
      },
      set checked($$value) {
        toggleValue = $$value;
        $$settled = false;
      }
    });
    $$renderer2.push(`<!----> <div class="p-4 border rounded-lg"><h4 class="font-medium mb-2">Selected Values:</h4> <p class="text-sm text-gray-600">Input: ${escape_html(inputValue)}</p> <p class="text-sm text-gray-600">Textarea: ${escape_html(textareaValue)}</p> <p class="text-sm text-gray-600">Select: ${escape_html(selectValue)}</p> <p class="text-sm text-gray-600">Color: ${escape_html(colorValue)}</p> <p class="text-sm text-gray-600">Alignment: ${escape_html(textAlignValue)}</p> <p class="text-sm text-gray-600">Checkbox: ${escape_html(checkboxValue)}</p> <p class="text-sm text-gray-600">Toggle: ${escape_html(toggleValue)}</p></div></div></div></div> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-700">Skeleton Loading</h3> <div class="space-y-2">`);
    Skeleton($$renderer2, { height: "h-4", width: "w-3/4" });
    $$renderer2.push(`<!----> `);
    Skeleton($$renderer2, { height: "h-4", width: "w-1/2" });
    $$renderer2.push(`<!----> `);
    Skeleton($$renderer2, { height: "h-20", width: "w-full" });
    $$renderer2.push(`<!----></div></div> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-700">Optimized Image</h3> `);
    OptimizedImage($$renderer2, {
      src: "/vite.svg",
      alt: "Vite Logo",
      width: "100",
      height: "100",
      class: "rounded-lg"
    });
    $$renderer2.push(`<!----></div></div> <div class="space-y-8 mb-12">`);
    Heading($$renderer2, {
      level: "2",
      class: "text-2xl font-semibold text-gray-800",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Molecular Components`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-700">Alerts</h3> <div class="space-y-2">`);
    Alert($$renderer2, {
      variant: "info",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->This is an info alert`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Alert($$renderer2, {
      variant: "success",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->This is a success alert`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Alert($$renderer2, {
      variant: "warning",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->This is a warning alert`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Alert($$renderer2, {
      variant: "error",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->This is an error alert`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></div> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-700">Modal</h3> `);
    Button($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Open Modal`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Modal($$renderer2, {
      title: "Example Modal",
      get isOpen() {
        return showModal;
      },
      set isOpen($$value) {
        showModal = $$value;
        $$settled = false;
      },
      children: ($$renderer3) => {
        $$renderer3.push(`<p class="mb-4">This is a modal dialog example.</p> <div class="flex gap-2">`);
        Button($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Close`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, {
          variant: "secondary",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Cancel`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-700">Slide Up</h3> `);
    Button($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Open Slide Up`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    SlideUp($$renderer2, {
      title: "Slide Up Panel",
      get isOpen() {
        return showSlideUp;
      },
      set isOpen($$value) {
        showSlideUp = $$value;
        $$settled = false;
      },
      children: ($$renderer3) => {
        $$renderer3.push(`<p class="mb-4">This is a slide-up panel example.</p> `);
        Button($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Close`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-700">Dropdown</h3> `);
    Dropdown($$renderer2, {
      $$slots: {
        trigger: ($$renderer3) => {
          Button($$renderer3, {
            slot: "trigger",
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->Dropdown Menu`);
            },
            $$slots: { default: true }
          });
        },
        content: ($$renderer3) => {
          $$renderer3.push(`<div slot="content" class="p-2"><button class="block w-full text-left px-4 py-2 text-sm hover:bg-surface-secondary rounded">Option 1</button> <button class="block w-full text-left px-4 py-2 text-sm hover:bg-surface-secondary rounded">Option 2</button> <button class="block w-full text-left px-4 py-2 text-sm hover:bg-surface-secondary rounded">Option 3</button></div>`);
        }
      }
    });
    $$renderer2.push(`<!----></div> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-700">Image Upload</h3> `);
    ImageUpload($$renderer2, {
      accept: "image/*",
      maxSize: 5 * 1024 * 1024,
      onUpload: (files) => console.log("Uploaded files:", files)
    });
    $$renderer2.push(`<!----></div> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-700">Dynamic Form</h3> `);
    KeyValueForm($$renderer2, {
      config: formConfig,
      get data() {
        return formData;
      },
      set data($$value) {
        formData = $$value;
        $$settled = false;
      }
    });
    $$renderer2.push(`<!----></div></div> <div class="space-y-8 mb-12">`);
    Heading($$renderer2, {
      level: "2",
      class: "text-2xl font-semibold text-gray-800",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Organism Components`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> <div class="space-y-4"><h3 class="text-lg font-medium text-gray-700">Notification Manager</h3> `);
    Button($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->Show Toast Notification`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    NotificationManager($$renderer2, {});
    $$renderer2.push(`<!----></div></div> <div class="space-y-4"><h3 class="text-lg font-medium text-primary">Performance Monitor</h3> `);
    PerformanceMonitor($$renderer2, {});
    $$renderer2.push(`<!----></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></section></div>`);
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
