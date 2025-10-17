import { y as attributes, z as stringify, F as attr, G as attr_class, J as clsx } from "./index.js";
import { e as escape_html } from "./context.js";
import { h as html } from "./Card.js";
const $$css$1 = {
  hash: "svelte-wzmt5k",
  code: ".layout.svelte-wzmt5k {min-height:100vh}.layout-main.svelte-wzmt5k {display:flex;flex-direction:column}.layout-sidebar.svelte-wzmt5k {width:16rem;border-right-width:1px;border-color:rgb(var(--color-border));background-color:rgb(var(--color-surface-secondary))}.layout-grid.svelte-wzmt5k {display:grid;grid-template-columns:repeat(1, minmax(0, 1fr))}\n\n    @media (min-width: 768px) {.layout-grid.svelte-wzmt5k {grid-template-columns:repeat(2, minmax(0, 1fr))}\n}\n\n    @media (min-width: 1024px) {.layout-grid.svelte-wzmt5k {grid-template-columns:repeat(3, minmax(0, 1fr))}\n}.layout-header.svelte-wzmt5k {border-bottom-width:1px;border-color:rgb(var(--color-border));padding:1rem;background-color:rgb(var(--color-surface))}.layout-footer.svelte-wzmt5k {margin-top:auto;border-top-width:1px;border-color:rgb(var(--color-border));padding:1rem;background-color:rgb(var(--color-surface-secondary))}"
};
function Layout($$renderer, $$props) {
  $$renderer.global.css.add($$css$1);
  let {
    variant = "main",
    gap = "md",
    className = "",
    children,
    header,
    main,
    footer,
    sidebar,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let gapClass = `gap-${gap}`;
  $$renderer.push(`<div${attributes(
    {
      class: `layout layout-${stringify(variant)} ${stringify(gapClass)} ${stringify(className)}`,
      ...restProps
    },
    "svelte-wzmt5k"
  )}>`);
  if (variant === "main") {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<header class="layout-header svelte-wzmt5k">`);
    header?.($$renderer);
    $$renderer.push(`<!----></header> <main class="layout-main svelte-wzmt5k">`);
    main?.($$renderer);
    $$renderer.push(`<!----></main> <footer class="layout-footer svelte-wzmt5k">`);
    footer?.($$renderer);
    $$renderer.push(`<!----></footer>`);
  } else {
    $$renderer.push("<!--[!-->");
    if (variant === "sidebar") {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<aside class="layout-sidebar svelte-wzmt5k">`);
      sidebar?.($$renderer);
      $$renderer.push(`<!----></aside> <main class="layout-main svelte-wzmt5k">`);
      main?.($$renderer);
      $$renderer.push(`<!----></main>`);
    } else {
      $$renderer.push("<!--[!-->");
      if (variant === "grid") {
        $$renderer.push("<!--[-->");
        $$renderer.push(`<div class="layout-grid svelte-wzmt5k">`);
        children?.($$renderer);
        $$renderer.push(`<!----></div>`);
      } else {
        $$renderer.push("<!--[!-->");
      }
      $$renderer.push(`<!--]-->`);
    }
    $$renderer.push(`<!--]-->`);
  }
  $$renderer.push(`<!--]--></div>`);
}
function Input($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = "",
      type = "text",
      name = "",
      label = "",
      placeholder = "",
      disabled = false,
      size = "md",
      variant = "default",
      oninput,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let inputId = "";
    let sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-3 text-base"
    };
    let variantClass = () => {
      const variantMap = {
        default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
        success: "border-green-300 focus:border-green-500 focus:ring-green-500",
        warning: "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500",
        error: "border-red-300 focus:border-red-500 focus:ring-red-500"
      };
      return variantMap[variant] || variantMap.default;
    };
    let inputClasses = [
      "w-full rounded-md transition-colors duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
      sizeClasses[size],
      variantClass
    ].join(" ");
    let labelClasses = "block text-sm font-medium text-primary mb-1";
    $$renderer2.push(`<div>`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", inputId)}${attr_class(clsx(labelClasses))}>${escape_html(label)}</label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <input${attributes(
      {
        id: inputId,
        type,
        name,
        value,
        placeholder,
        disabled,
        class: clsx(inputClasses),
        ...restProps
      },
      void 0,
      void 0,
      void 0,
      4
    )}/></div>`);
  });
}
const $$css = {
  hash: "svelte-1uavm9q",
  code: ".component-preview.svelte-1uavm9q {display:flex;min-height:100px;align-items:center;justify-content:center}"
};
function ComponentDemo($$renderer, $$props) {
  $$renderer.global.css.add($$css);
  let {
    title,
    description = "",
    code,
    language = "svelte",
    className = "",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$renderer.push(`<div${attributes(
    {
      class: `component-demo bg-surface border border-border rounded-lg overflow-hidden ${stringify(className)}`,
      ...restProps
    },
    "svelte-1uavm9q"
  )}><div class="px-6 py-4 border-b border-border bg-surface-secondary"><div class="flex items-center justify-between"><div><h3 class="text-lg font-semibold text-text">${escape_html(title)}</h3> `);
  if (description) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<p class="text-sm text-text-secondary mt-1">${escape_html(description)}</p>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div> <button class="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text hover:bg-surface rounded-md transition-colors duration-200"${attr("aria-label", "Show code")}>`);
  {
    $$renderer.push("<!--[!-->");
    $$renderer.push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg> Code`);
  }
  $$renderer.push(`<!--]--></button></div></div> <div class="p-6">`);
  {
    $$renderer.push("<!--[!-->");
    $$renderer.push(`<div class="component-preview svelte-1uavm9q">`);
    children?.($$renderer);
    $$renderer.push(`<!----></div>`);
  }
  $$renderer.push(`<!--]--></div></div>`);
}
function Alert($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      variant = "info",
      title = "",
      message = "",
      closable = false,
      className = "",
      onclick,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let alertClasses = {
      info: "bg-info-surface text-info-text border border-info",
      success: "bg-success-surface text-success-text border border-success",
      warning: "bg-warning-surface text-warning-text border border-warning",
      error: "bg-error-surface text-error-text border border-error"
    };
    let alertRole = variant === "success" || variant === "info" ? "status" : "alert";
    let iconSvg = {
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
    $$renderer2.push(`<div${attributes({
      class: `relative rounded-md p-4 border ${stringify(alertClasses[variant])} transition-all duration-200 motion-reduce:transition-none ${stringify(className)}`,
      role: alertRole,
      "aria-live": variant === "success" || variant === "info" ? "polite" : "assertive",
      "aria-atomic": "true",
      ...restProps
    })}>`);
    if (closable) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full text-text-secondary hover:text-primary transition-colors duration-200 motion-reduce:transition-none group focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2" aria-label="Dismiss alert" type="button"><svg class="w-4 h-4 text-current group-hover:scale-110 transition-transform duration-200 motion-reduce:transition-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class(`flex items-start gap-3 ${stringify(closable ? "pr-8" : "")}`)}><div class="flex-shrink-0 mt-0.5">${html(iconSvg[variant])}</div> <div class="flex-1 min-w-0">`);
    if (title) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<h4 class="font-semibold text-sm mb-1 text-inherit">${escape_html(title)}</h4>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (message) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-sm leading-relaxed text-inherit">${escape_html(message)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div></div></div>`);
  });
}
function Badge($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { variant = "default", className = "", children } = $$props;
    const classes = [
      "inline-flex items-center px-3 py-1 text-sm font-medium border rounded-md",
      variant === "success" ? "bg-green-100 text-green-800 border-green-300" : variant === "warning" ? "bg-yellow-100 text-yellow-800 border-yellow-300" : variant === "error" ? "bg-red-100 text-red-800 border-red-300" : variant === "info" ? "bg-blue-100 text-blue-800 border-blue-300" : "bg-gray-100 text-gray-800 border-gray-300",
      className
    ].filter(Boolean).join(" ");
    $$renderer2.push(`<span${attr_class(clsx(classes))}>`);
    children($$renderer2);
    $$renderer2.push(`<!----></span>`);
  });
}
export {
  Alert as A,
  Badge as B,
  ComponentDemo as C,
  Input as I,
  Layout as L
};
