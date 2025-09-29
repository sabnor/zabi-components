import { y as attr, z as attr_class, F as clsx, x as slot, G as bind_props, J as head } from "../../chunks/index.js";
import { j as fallback } from "../../chunks/utils2.js";
import { e as escape_html } from "../../chunks/context.js";
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
    const baseClasses = "transition-all duration-200 inline-flex items-center justify-center gap-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden";
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm md:text-base",
      lg: "px-5 py-3 text-base"
    };
    const variantClasses = {
      brand: "border border-stone-600 bg-stone-800 text-stone-100 hover:bg-stone-700 hover:border-stone-500 active:scale-[0.98] shadow-sm",
      primary: "bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 hover:border-blue-700 active:scale-[0.98] shadow-sm hover:shadow-md",
      secondary: "bg-stone-700 text-stone-100 border border-stone-600 hover:bg-stone-600 hover:border-stone-500 active:scale-[0.98] shadow-sm hover:shadow-md",
      success: "bg-green-600 text-white border border-green-600 hover:bg-green-700 hover:border-green-700 active:scale-[0.98] shadow-sm hover:shadow-md",
      danger: "bg-red-600 text-white border border-red-600 hover:bg-red-700 hover:border-red-700 active:scale-[0.98] shadow-sm hover:shadow-md",
      ghost: "bg-transparent text-stone-300 border border-stone-600 hover:bg-stone-800 hover:border-stone-500 active:scale-[0.98]"
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
    $$renderer2.push(`<button${attr("type", type)}${attr_class(clsx(buttonClasses))}${attr("disabled", disabled || loading, true)}${attr("aria-busy", loading ? "true" : "false")}>`);
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
      grainType
    });
  });
}
function _page($$renderer) {
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Zabi Components</title>`);
    });
    $$renderer2.push(`<meta name="description" content="A collection of reusable Svelte components"/>`);
  });
  $$renderer.push(`<section class="container mx-auto px-4 py-8"><h1 class="text-4xl font-bold text-gray-900 mb-8">Zabi Components</h1> <p class="text-lg text-gray-600 mb-8">A collection of reusable Svelte components built with Tailwind CSS.</p> <div class="space-y-4"><h2 class="text-2xl font-semibold text-gray-800">Components</h2> <div class="flex gap-4">`);
  Button($$renderer, {
    children: ($$renderer2) => {
      $$renderer2.push(`<!---->Primary Button`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----> `);
  Button($$renderer, {
    variant: "secondary",
    children: ($$renderer2) => {
      $$renderer2.push(`<!---->Secondary Button`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></div></div></section>`);
}
export {
  _page as default
};
