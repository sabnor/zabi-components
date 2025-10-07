import { y as attr_class, x as slot, z as bind_props, F as stringify, G as ensure_array_like, J as attr, K as clsx, N as head } from "../../chunks/index.js";
import { j as fallback } from "../../chunks/utils2.js";
import { e as escape_html } from "../../chunks/context.js";
const $$css = {
  hash: "svelte-wzmt5k",
  code: ".layout.svelte-wzmt5k {min-height:100vh}.layout-main.svelte-wzmt5k {display:flex;flex-direction:column}.layout-sidebar.svelte-wzmt5k {width:16rem;border-right-width:1px;border-color:rgb(var(--color-border));background-color:rgb(var(--color-surface-secondary))}.layout-grid.svelte-wzmt5k {display:grid;grid-template-columns:repeat(1, minmax(0, 1fr))}\n\n    @media (min-width: 768px) {.layout-grid.svelte-wzmt5k {grid-template-columns:repeat(2, minmax(0, 1fr))}\n}\n\n    @media (min-width: 1024px) {.layout-grid.svelte-wzmt5k {grid-template-columns:repeat(3, minmax(0, 1fr))}\n}.layout-header.svelte-wzmt5k {border-bottom-width:1px;border-color:rgb(var(--color-border));background-color:rgb(var(--color-surface));padding:1rem}.layout-footer.svelte-wzmt5k {margin-top:auto;border-top-width:1px;border-color:rgb(var(--color-border));background-color:rgb(var(--color-surface-secondary));padding:1rem}"
};
function Layout($$renderer, $$props) {
  $$renderer.global.css.add($$css);
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
function Navigation($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let variant = fallback($$props["variant"], "header");
    let items = fallback($$props["items"], () => [], true);
    let currentPath = fallback($$props["currentPath"], "");
    $$renderer2.push(`<nav${attr_class(`navigation navigation-${stringify(variant)}`)}><ul${attr_class(`flex ${stringify(variant === "sidebar" ? "flex-col space-y-2" : "space-x-6")}`)}><!--[-->`);
    const each_array = ensure_array_like(items);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<li><a${attr("href", item.href)}${attr_class(`px-3 py-2 text-sm font-medium rounded-md transition-colors ${stringify(currentPath === item.href ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100")}`)}>${escape_html(item.label)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></nav>`);
    bind_props($$props, { variant, items, currentPath });
  });
}
function ThemeToggle($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<button class="w-10 h-10 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"${attr("aria-label", "Switch to dark mode")}>`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<span class="text-lg">🌙</span>`);
    }
    $$renderer2.push(`<!--]--></button>`);
  });
}
function Form($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let method = fallback($$props["method"], "post");
    let action = fallback($$props["action"], "");
    let className = fallback($$props["className"], "");
    $$renderer2.push(`<form${attr("method", method)}${attr("action", action)}${attr_class(`space-y-4 ${stringify(className)}`)}><!--[-->`);
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
  $$renderer.component(($$renderer2) => {
    let sizeClasses, variantClass, inputClasses, labelClasses;
    let value = fallback($$props["value"], "");
    let type = fallback($$props["type"], "text");
    let label = fallback($$props["label"], "");
    let placeholder = fallback($$props["placeholder"], "");
    let disabled = fallback($$props["disabled"], false);
    let size = fallback($$props["size"], "md");
    let variant = fallback($$props["variant"], "default");
    const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
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
    $$renderer2.push(`<!--]--> <input${attr("id", inputId)}${attr("type", type)}${attr("value", value)}${attr("placeholder", placeholder)}${attr("disabled", disabled, true)}${attr_class(clsx(inputClasses))}/></div>`);
    bind_props($$props, { value, type, label, placeholder, disabled, size, variant });
  });
}
function Textarea($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let sizeClasses, variantClass, textareaClasses, labelClasses;
    let value = fallback($$props["value"], "");
    let label = fallback($$props["label"], "");
    let placeholder = fallback($$props["placeholder"], "");
    let disabled = fallback($$props["disabled"], false);
    let rows = fallback($$props["rows"], 4);
    let size = fallback($$props["size"], "md");
    let variant = fallback($$props["variant"], "default");
    const textareaId = `textarea-${Math.random().toString(36).substr(2, 9)}`;
    sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-3 text-base"
    };
    variantClass = getInputVariantClasses(variant);
    textareaClasses = [
      "w-full rounded-md transition-colors duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled",
      "resize-y",
      sizeClasses[size],
      variantClass
    ].join(" ");
    labelClasses = "block text-sm font-medium text-primary mb-1";
    $$renderer2.push(`<div>`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", textareaId)}${attr_class(clsx(labelClasses))}>${escape_html(label)}</label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <textarea${attr("id", textareaId)}${attr("placeholder", placeholder)}${attr("disabled", disabled, true)}${attr("rows", rows)}${attr_class(clsx(textareaClasses))}>`);
    const $$body = escape_html(value);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div>`);
    bind_props($$props, { value, label, placeholder, disabled, rows, size, variant });
  });
}
function Checkbox($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let checkboxClasses;
    let checked = fallback($$props["checked"], false);
    let disabled = fallback($$props["disabled"], false);
    let label = fallback($$props["label"], "");
    const checkboxId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    checkboxClasses = [
      "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded",
      "focus:ring-blue-500 focus:ring-2",
      "disabled:opacity-50 disabled:cursor-not-allowed"
    ].join(" ");
    $$renderer2.push(`<div class="flex items-center gap-2"><input type="checkbox"${attr("id", checkboxId)}${attr("checked", checked, true)}${attr("disabled", disabled, true)}${attr_class(clsx(checkboxClasses))}/> `);
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
  $$renderer.component(($$renderer2) => {
    let sizeClasses, variantClasses, buttonClasses;
    let variant = fallback($$props["variant"], "primary");
    let size = fallback($$props["size"], "md");
    let disabled = fallback($$props["disabled"], false);
    let type = fallback($$props["type"], "button");
    sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-3 text-base"
    };
    variantClasses = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-600 text-white hover:bg-gray-700",
      danger: "bg-red-600 text-white hover:bg-red-700"
    };
    buttonClasses = [
      "inline-flex items-center justify-center font-medium rounded-md",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      sizeClasses[size],
      variantClasses[variant]
    ].join(" ");
    $$renderer2.push(`<button${attr("type", type)}${attr_class(clsx(buttonClasses))}${attr("disabled", disabled, true)}><!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></button>`);
    bind_props($$props, { variant, size, disabled, type });
  });
}
function ContactForm($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let className = fallback($$props["className"], "");
    let formData = { name: "", email: "", message: "", subscribe: false };
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div${attr_class(`max-w-md mx-auto ${stringify(className)}`)}><div class="mb-6"><h2 class="text-2xl font-bold text-text mb-2">Get in Touch</h2> <p class="text-text-secondary">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p></div> `);
      Form($$renderer3, {
        className: "space-y-4",
        children: ($$renderer4) => {
          $$renderer4.push(`<div class="space-y-4">`);
          Input($$renderer4, {
            type: "text",
            label: "Name",
            placeholder: "Enter your name",
            get value() {
              return formData.name;
            },
            set value($$value) {
              formData.name = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----> `);
          Input($$renderer4, {
            type: "email",
            label: "Email",
            placeholder: "Enter your email",
            get value() {
              return formData.email;
            },
            set value($$value) {
              formData.email = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----> `);
          Textarea($$renderer4, {
            label: "Message",
            placeholder: "Enter your message",
            rows: 4,
            get value() {
              return formData.message;
            },
            set value($$value) {
              formData.message = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----> `);
          Checkbox($$renderer4, {
            label: "Subscribe to updates",
            get checked() {
              return formData.subscribe;
            },
            set checked($$value) {
              formData.subscribe = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----></div> <div class="pt-4">`);
          Button($$renderer4, {
            type: "submit",
            variant: "primary",
            size: "md",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Send Message`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----></div>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { className });
  });
}
function _page($$renderer) {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Docs", href: "/docs" },
    { label: "GitHub", href: "https://github.com" }
  ];
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Zabi Components - Clean &amp; Simple</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Clean, minimal Svelte components that just work"/>`);
  });
  Layout($$renderer, {
    variant: "main",
    className: "min-h-screen bg-background",
    $$slots: {
      header: ($$renderer2) => {
        $$renderer2.push(`<div slot="header" class="flex items-center justify-between p-4 bg-surface border-b border-border"><h1 class="text-xl font-bold text-text">Zabi Components</h1> <div class="flex items-center gap-4">`);
        Navigation($$renderer2, { variant: "header", items: navItems });
        $$renderer2.push(`<!----> `);
        ThemeToggle($$renderer2);
        $$renderer2.push(`<!----></div></div>`);
      },
      main: ($$renderer2) => {
        $$renderer2.push(`<div slot="main" class="container mx-auto p-6 space-y-8"><section class="py-20 px-4 text-center"><div class="max-w-4xl mx-auto"><h1 class="text-5xl md:text-6xl font-bold text-text mb-6">Zabi Components</h1> <p class="text-xl md:text-2xl text-text-secondary mb-8">Clean, minimal Svelte components that just work</p> <p class="text-lg text-text-secondary/80 max-w-2xl mx-auto">Build beautiful, accessible user interfaces with our carefully crafted component library.</p></div></section> `);
        ContactForm($$renderer2, {});
        $$renderer2.push(`<!----></div>`);
      },
      footer: ($$renderer2) => {
        $$renderer2.push(`<div slot="footer" class="text-center p-4 text-text-secondary"><p>Clean components that just work. Less is more.</p></div>`);
      }
    }
  });
}
export {
  _page as default
};
