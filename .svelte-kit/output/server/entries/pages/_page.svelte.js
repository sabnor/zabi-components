import { W as sanitize_props, X as rest_props, Y as attributes, V as slot, Z as bind_props, _ as stringify, $ as attr_class, a0 as ensure_array_like, a1 as attr, a2 as clsx, a3 as store_get, a4 as unsubscribe_stores, a5 as head } from "../../chunks/index.js";
import { f as fallback, e as escape_html } from "../../chunks/context.js";
const $$css = {
  hash: "svelte-wzmt5k",
  code: ".layout.svelte-wzmt5k {min-height:100vh}.layout-main.svelte-wzmt5k {display:flex;flex-direction:column}.layout-sidebar.svelte-wzmt5k {width:16rem;border-right-width:1px;border-color:rgb(var(--color-border));background-color:rgb(var(--color-surface-secondary))}.layout-grid.svelte-wzmt5k {display:grid;grid-template-columns:repeat(1, minmax(0, 1fr))}\n\n    @media (min-width: 768px) {.layout-grid.svelte-wzmt5k {grid-template-columns:repeat(2, minmax(0, 1fr))}\n}\n\n    @media (min-width: 1024px) {.layout-grid.svelte-wzmt5k {grid-template-columns:repeat(3, minmax(0, 1fr))}\n}.layout-header.svelte-wzmt5k {border-bottom-width:1px;border-color:rgb(var(--color-border));padding:1rem;background-color:rgb(var(--color-surface))}.layout-footer.svelte-wzmt5k {margin-top:auto;border-top-width:1px;border-color:rgb(var(--color-border));padding:1rem;background-color:rgb(var(--color-surface-secondary))}"
};
function Layout($$renderer, $$props) {
  $$renderer.global.css.add($$css);
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["variant", "gap", "className"]);
  let gapClass;
  let variant = fallback($$props["variant"], "main");
  let gap = fallback($$props["gap"], "md");
  let className = fallback($$props["className"], "");
  gapClass = `gap-${gap}`;
  $$renderer.push(`<div${attributes(
    {
      class: `layout layout-${stringify(variant)} ${stringify(gapClass)} ${stringify(className)}`,
      ...$$restProps
    },
    "svelte-wzmt5k"
  )}>`);
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
function Navigation($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["variant", "items", "currentPath"]);
  let variant = fallback($$props["variant"], "header");
  let items = fallback($$props["items"], () => [], true);
  let currentPath = fallback($$props["currentPath"], "");
  $$renderer.push(`<nav${attributes({
    class: `navigation navigation-${stringify(variant)}`,
    ...$$restProps
  })}><ul${attr_class(`flex ${stringify(variant === "sidebar" ? "flex-col space-y-2" : "space-x-6")}`)}><!--[-->`);
  const each_array = ensure_array_like(items);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$renderer.push(`<li><a${attr("href", item.href)}${attr_class(`px-3 py-2 text-sm font-medium rounded-md transition-colors ${stringify(currentPath === item.href ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100")}`)}>${escape_html(item.label)}</a></li>`);
  }
  $$renderer.push(`<!--]--></ul></nav>`);
  bind_props($$props, { variant, items, currentPath });
}
function ThemeToggle($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["isDark"]);
  $$renderer.component(($$renderer2) => {
    let isDark = fallback($$props["isDark"], false);
    $$renderer2.push(`<button${attributes({
      class: "w-10 h-10 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
      "aria-label": isDark ? "Switch to light mode" : "Switch to dark mode",
      ...$$restProps
    })}>`);
    if (isDark) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-lg">☀️</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<span class="text-lg">🌙</span>`);
    }
    $$renderer2.push(`<!--]--></button>`);
    bind_props($$props, { isDark });
  });
}
function Form($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["method", "action", "className"]);
  $$renderer.component(($$renderer2) => {
    let method = fallback($$props["method"], "post");
    let action = fallback($$props["action"], "");
    let className = fallback($$props["className"], "");
    $$renderer2.push(`<form${attributes({
      method,
      action,
      class: `space-y-4 ${stringify(className)}`,
      ...$$restProps
    })}><!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></form>`);
    bind_props($$props, { method, action, className });
  });
}
function getInputVariantClasses(variant) {
  const variantMap = {
    default: "input-variant-default",
    success: "input-variant-success",
    warning: "input-variant-warning",
    error: "input-variant-error",
    info: "input-variant-info"
  };
  return variantMap[variant] || variantMap.default;
}
function Input($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "value",
    "type",
    "label",
    "placeholder",
    "disabled",
    "size",
    "variant"
  ]);
  $$renderer.component(($$renderer2) => {
    let sizeClasses, variantClass, inputClasses, labelClasses;
    let value = fallback($$props["value"], "");
    let type = fallback($$props["type"], "text");
    let label = fallback($$props["label"], "");
    let placeholder = fallback($$props["placeholder"], "");
    let disabled = fallback($$props["disabled"], false);
    let size = fallback($$props["size"], "md");
    let variant = fallback($$props["variant"], "default");
    let inputId;
    if (typeof window !== "undefined") {
      inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
    } else {
      inputId = `input-ssr-${Date.now()}`;
    }
    sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-3 text-base"
    };
    variantClass = getInputVariantClasses(variant);
    inputClasses = [
      "w-full rounded-md transition-colors duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
      sizeClasses[size],
      variantClass
    ].join(" ");
    labelClasses = "block text-sm font-medium text-primary mb-1";
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
        value,
        placeholder,
        disabled,
        class: clsx(inputClasses),
        ...$$restProps
      },
      void 0,
      void 0,
      void 0,
      4
    )}/></div>`);
    bind_props($$props, { value, type, label, placeholder, disabled, size, variant });
  });
}
function Textarea($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let tmp = store_get($$store_subs ??= {}, "$props", props)(), value = fallback(tmp.value, ""), label = fallback(tmp.label, ""), placeholder = fallback(tmp.placeholder, ""), disabled = fallback(tmp.disabled, false), rows = fallback(tmp.rows, 4), size = fallback(tmp.size, "md"), variant = fallback(tmp.variant, "default"), restProps = (void 0)(tmp, [
      "value",
      "label",
      "placeholder",
      "disabled",
      "rows",
      "size",
      "variant"
    ]);
    let textareaId;
    if (typeof window !== "undefined") {
      textareaId = `textarea-${Math.random().toString(36).substr(2, 9)}`;
    } else {
      textareaId = `textarea-ssr-${Date.now()}`;
    }
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-3 text-base"
    };
    const variantClass = getInputVariantClasses(variant);
    const textareaClasses = [
      "w-full rounded-md transition-colors duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
      "resize-y",
      sizeClasses[size],
      variantClass
    ].join(" ");
    const labelClasses = "block text-sm font-medium text-primary mb-1";
    $$renderer2.push(`<div>`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", textareaId)}${attr_class(clsx(labelClasses))}>${escape_html(label)}</label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <textarea${attributes({
      id: textareaId,
      placeholder,
      disabled,
      rows,
      class: clsx(textareaClasses),
      ...restProps
    })}>`);
    const $$body = escape_html(value);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Checkbox($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["checked", "disabled", "label"]);
  $$renderer.component(($$renderer2) => {
    let checkboxClasses;
    let checked = fallback($$props["checked"], false);
    let disabled = fallback($$props["disabled"], false);
    let label = fallback($$props["label"], "");
    let checkboxId;
    if (typeof window !== "undefined") {
      checkboxId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    } else {
      checkboxId = `checkbox-ssr-${Date.now()}`;
    }
    checkboxClasses = [
      "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded",
      "focus:ring-blue-500 focus:ring-2",
      "disabled:opacity-50 disabled:cursor-not-allowed"
    ].join(" ");
    $$renderer2.push(`<div class="flex items-center gap-2"><input${attributes(
      {
        type: "checkbox",
        id: checkboxId,
        checked,
        disabled,
        class: clsx(checkboxClasses),
        ...$$restProps
      },
      void 0,
      void 0,
      void 0,
      4
    )}/> `);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", checkboxId)} class="text-sm font-medium cursor-pointer">${escape_html(label)}</label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { checked, disabled, label });
  });
}
function Button($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["variant", "size", "disabled", "type", "className"]);
  $$renderer.component(($$renderer2) => {
    let sizeClasses, variantClasses, buttonClasses;
    let variant = fallback($$props["variant"], "primary");
    let size = fallback($$props["size"], "md");
    let disabled = fallback($$props["disabled"], false);
    let type = fallback($$props["type"], "button");
    let className = fallback($$props["className"], "");
    sizeClasses = {
      sm: "px-3 py-1.5 text-sm font-medium",
      md: "px-4 py-2 text-sm font-medium",
      lg: "px-6 py-3 text-base font-semibold"
    };
    variantClasses = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400",
      secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400",
      danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400",
      success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:text-gray-400",
      brand: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400"
    };
    buttonClasses = [
      "inline-flex items-center justify-center rounded-md transition-all duration-200",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      "active:scale-95 transform-gpu",
      "shadow-sm hover:shadow-md",
      sizeClasses[size],
      variantClasses[variant],
      className
    ].filter(Boolean).join(" ");
    $$renderer2.push(`<button${attributes({ type, class: clsx(buttonClasses), disabled, ...$$restProps })}><!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></button>`);
    bind_props($$props, { variant, size, disabled, type, className });
  });
}
function ContactForm($$renderer, $$props) {
  let className = fallback($$props["className"], "");
  let formData = { name: "", email: "", subscribe: false };
  $$renderer.push(`<div${attr_class(`max-w-md mx-auto ${stringify(className)}`)}><div class="mb-6"><h2 class="text-2xl font-bold text-text mb-2">Get in Touch</h2> <p class="text-text-secondary">We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.</p></div> `);
  Form($$renderer, {
    className: "space-y-4",
    children: ($$renderer2) => {
      $$renderer2.push(`<div class="space-y-4">`);
      Input($$renderer2, {
        type: "text",
        label: "Name",
        placeholder: "Enter your name",
        value: formData.name
      });
      $$renderer2.push(`<!----> `);
      Input($$renderer2, {
        type: "email",
        label: "Email",
        placeholder: "Enter your email",
        value: formData.email
      });
      $$renderer2.push(`<!----> `);
      Textarea($$renderer2);
      $$renderer2.push(`<!----> `);
      Checkbox($$renderer2, { label: "Subscribe to updates", checked: formData.subscribe });
      $$renderer2.push(`<!----></div> <div class="pt-4">`);
      Button($$renderer2, {
        type: "submit",
        variant: "primary",
        size: "md",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Send Message`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div>`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></div>`);
  bind_props($$props, { className });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const navItems = [
      { label: "Home", href: "/" },
      { label: "Components", href: "/components" },
      { label: "Docs", href: "/docs" },
      { label: "GitHub", href: "https://github.com" }
    ];
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Zabi Components - Clean &amp; Simple</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Clean, minimal Svelte components that just work"/>`);
    });
    Layout($$renderer2, {
      variant: "main",
      className: "min-h-screen bg-background",
      $$slots: {
        header: ($$renderer3) => {
          $$renderer3.push(`<div slot="header" class="flex items-center justify-between p-4 bg-surface border-b border-border"><h1 class="text-xl font-bold text-text">Zabi Components</h1> <div class="flex items-center gap-4">`);
          Navigation($$renderer3, { variant: "header", items: navItems });
          $$renderer3.push(`<!----> `);
          ThemeToggle($$renderer3, {});
          $$renderer3.push(`<!----></div></div>`);
        },
        main: ($$renderer3) => {
          $$renderer3.push(`<div slot="main" class="container mx-auto p-6 space-y-8"><section class="py-20 px-4 text-center"><div class="max-w-4xl mx-auto"><h1 class="text-5xl md:text-6xl font-bold text-text mb-6">Zabi Components</h1> <p class="text-xl md:text-2xl text-text-secondary mb-8">Clean, minimal Svelte components that just work</p> <p class="text-lg text-text-secondary/80 max-w-2xl mx-auto">Build beautiful, accessible user interfaces with our
                    carefully crafted component library.</p></div></section> `);
          ContactForm($$renderer3, {});
          $$renderer3.push(`<!----></div>`);
        },
        footer: ($$renderer3) => {
          $$renderer3.push(`<div slot="footer" class="text-center p-4 text-text-secondary"><p>Clean components that just work. Less is more.</p></div>`);
        }
      }
    });
  });
}
export {
  _page as default
};
