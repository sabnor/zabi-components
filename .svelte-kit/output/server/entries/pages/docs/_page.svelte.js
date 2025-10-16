import { V as store_get, Y as attributes, _ as attr_class, $ as ensure_array_like, a0 as attr, Z as stringify, X as unsubscribe_stores, a1 as clsx, W as head } from "../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { e as escape_html, f as fallback } from "../../../chunks/context.js";
function Navigation($$renderer) {
  var $$store_subs;
  let {
    variant = "header",
    items = [],
    currentPath = "",
    children,
    ...restProps
  } = store_get($$store_subs ??= {}, "$props", props)();
  $$renderer.push(`<nav${attributes({
    class: `navigation navigation-${stringify(variant)}`,
    ...restProps
  })}><ul${attr_class(`flex ${stringify(variant === "sidebar" ? "flex-col space-y-2" : "space-x-6")}`)}><!--[-->`);
  const each_array = ensure_array_like(items);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$renderer.push(`<li><a${attr("href", item.href)}${attr_class(`px-3 py-2 text-sm font-medium rounded-md transition-colors ${stringify(currentPath === item.href ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100")}`)}>${escape_html(item.label)}</a></li>`);
  }
  $$renderer.push(`<!--]--></ul></nav>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
}
function ThemeToggle($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let tmp = store_get($$store_subs ??= {}, "$props", props)(), isDark = fallback(tmp.isDark, false), restProps = (void 0)(tmp, ["isDark"]);
    store_get($$store_subs ??= {}, "$state", state)(false);
    $$renderer2.push(`<button${attributes({
      class: "w-10 h-10 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg flex items-center justify-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
      "aria-label": isDark ? "Switch to light mode" : "Switch to dark mode",
      ...restProps
    })}>`);
    if (isDark) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-lg">☀️</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<span class="text-lg">🌙</span>`);
    }
    $$renderer2.push(`<!--]--></button>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Card($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let {
      title = "",
      image = "",
      interactive = false,
      variant = "default",
      size = "md",
      children,
      ...restProps
    } = store_get($$store_subs ??= {}, "$props", props)();
    let sizeClasses = store_get($$store_subs ??= {}, "$derived", derived)({ sm: "p-3", md: "p-4", lg: "p-6" });
    let variantClass = store_get($$store_subs ??= {}, "$derived", derived)(() => {
      const variantMap = {
        default: "border-gray-200 bg-white",
        success: "border-green-200 bg-green-50",
        warning: "border-yellow-200 bg-yellow-50",
        error: "border-red-200 bg-red-50",
        info: "border-blue-200 bg-blue-50"
      };
      return variantMap[variant] || variantMap.default;
    });
    let cardClasses = store_get($$store_subs ??= {}, "$derived", derived)([
      "rounded-lg transition-all duration-200",
      "hover:shadow-adaptive-md",
      interactive ? "cursor-pointer hover:scale-[1.02]" : "",
      sizeClasses[size],
      variantClass
    ].join(" "));
    let titleClasses = store_get($$store_subs ??= {}, "$derived", derived)("text-lg font-semibold mb-2 text-primary");
    $$renderer2.push(`<div${attributes({ class: clsx(cardClasses), ...restProps })}>`);
    if (image) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<img${attr("src", image)}${attr("alt", title)} class="w-full h-48 object-cover rounded-md mb-4"/>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (title) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<h3${attr_class(clsx(titleClasses))}>${escape_html(title)}</h3>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Documentation - Zabi Components</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Getting started guide and API reference for Zabi Components"/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-background"><div class="flex items-center justify-between p-4 bg-surface border-b border-border"><h1 class="text-xl font-bold text-text">Zabi Components</h1> <div class="flex items-center gap-4">`);
    Navigation($$renderer2);
    $$renderer2.push(`<!----> `);
    ThemeToggle($$renderer2);
    $$renderer2.push(`<!----></div></div> <div class="container mx-auto p-6 max-w-4xl"><div class="mb-12 text-center"><h1 class="text-4xl font-bold text-text mb-4">Documentation</h1> <p class="text-lg text-text-secondary">Get started with Zabi Components in minutes</p></div> <section class="mb-16"><div class="text-center mb-8"><h2 class="text-3xl font-bold text-text mb-4">Quick Start</h2> <p class="text-text-secondary">Install and start using components right away</p></div> <div class="space-y-8">`);
    Card($$renderer2);
    $$renderer2.push(`<!----> `);
    Card($$renderer2);
    $$renderer2.push(`<!----></div></section> <section class="mb-16"><div class="text-center mb-8"><h2 class="text-3xl font-bold text-text mb-4">Why Zabi Components?</h2></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`);
    Card($$renderer2);
    $$renderer2.push(`<!----> `);
    Card($$renderer2);
    $$renderer2.push(`<!----> `);
    Card($$renderer2);
    $$renderer2.push(`<!----> `);
    Card($$renderer2);
    $$renderer2.push(`<!----> `);
    Card($$renderer2);
    $$renderer2.push(`<!----> `);
    Card($$renderer2);
    $$renderer2.push(`<!----></div></section> <section class="mb-16"><div class="text-center mb-8"><h2 class="text-3xl font-bold text-text mb-4">Ready to Start?</h2></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6">`);
    Card($$renderer2);
    $$renderer2.push(`<!----> `);
    Card($$renderer2);
    $$renderer2.push(`<!----></div></section></div> <div class="bg-surface-secondary border-t border-border py-8"><div class="container mx-auto px-6 text-center"><p class="text-text-secondary mb-2">Clean components that just work. Less is more.</p> <p class="text-sm text-text-secondary/80">© 2024 Zabi Components. MIT License.</p></div></div></div>`);
  });
}
export {
  _page as default
};
