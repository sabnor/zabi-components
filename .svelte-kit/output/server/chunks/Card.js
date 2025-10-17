import { y as attributes, G as attr_class, K as ensure_array_like, F as attr, z as stringify, J as clsx } from "./index.js";
import { e as escape_html } from "./context.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function Navigation($$renderer, $$props) {
  let {
    variant = "header",
    items = [],
    currentPath = "",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
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
}
function ThemeToggle($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isDark = false, $$slots, $$events, ...restProps } = $$props;
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
  });
}
function Button($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      variant = "primary",
      size = "md",
      disabled = false,
      type = "button",
      className = "",
      onclick,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let sizeClasses = {
      sm: "px-3 py-1.5 text-sm font-medium",
      md: "px-4 py-2 text-sm font-medium",
      lg: "px-6 py-3 text-base font-semibold"
    };
    let variantClasses = {
      primary: "bg-gray-100 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400",
      secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400",
      danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400",
      success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:text-gray-400",
      brand: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400"
    };
    let buttonClasses = [
      "inline-flex items-center justify-center rounded-md transition-all duration-200",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      "active:scale-95 transform-gpu",
      "shadow-sm hover:shadow-md",
      sizeClasses[size],
      variantClasses[variant],
      className
    ].filter(Boolean).join(" ");
    $$renderer2.push(`<button${attributes({ type, class: clsx(buttonClasses), disabled, ...restProps })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></button>`);
  });
}
function Card($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      title = "",
      image = "",
      interactive = false,
      variant = "default",
      size = "md",
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let sizeClasses = { sm: "p-3", md: "p-4", lg: "p-6" };
    let variantClass = () => {
      const variantMap = {
        default: "border-gray-200 bg-white",
        success: "border-green-200 bg-green-50",
        warning: "border-yellow-200 bg-yellow-50",
        error: "border-red-200 bg-red-50",
        info: "border-blue-200 bg-blue-50"
      };
      return variantMap[variant] || variantMap.default;
    };
    let cardClasses = [
      "rounded-lg transition-all duration-200",
      "hover:shadow-adaptive-md",
      interactive ? "cursor-pointer hover:scale-[1.02]" : "",
      sizeClasses[size],
      variantClass
    ].join(" ");
    let titleClasses = "text-lg font-semibold mb-2 text-primary";
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
  });
}
export {
  Button as B,
  Card as C,
  Navigation as N,
  ThemeToggle as T,
  html as h
};
