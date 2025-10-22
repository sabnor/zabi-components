import { G as attributes, z as attr_class, x as ensure_array_like, y as attr, F as stringify, K as clsx } from "./index.js";
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
    $$renderer.push(`<li><a${attr("href", item.href)}${attr_class(`px-3 py-2 text-sm font-medium rounded-md transition-colors ${stringify(currentPath === item.href ? "bg-blue-100 text-body" : "text-description hover:text-body hover:bg-gray-100")}`)}>${escape_html(item.label)}</a></li>`);
  }
  $$renderer.push(`<!--]--></ul></nav>`);
}
function ThemeToggle($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isDark = false, $$slots, $$events, ...restProps } = $$props;
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button${attributes({
        class: "w-10 h-10 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center text-gray-700",
        "aria-label": "Theme toggle",
        ...restProps
      })}><span class="text-lg">🌙</span></button>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Button($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      variant = "primary",
      size = "md",
      disabled = false,
      type = "button",
      text = "",
      onclick,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const sizeClass = () => {
      return size === "sm" ? "px-3 py-1.5 text-sm font-medium" : size === "lg" ? "px-6 py-3 text-base font-semibold" : "px-4 py-2 text-sm font-medium";
    };
    const variantClass = () => {
      return variant === "primary" ? "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400" : variant === "secondary" ? "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-400" : variant === "danger" ? "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400" : variant === "success" ? "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-green-400" : variant === "ghost" ? "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:text-gray-400" : variant === "brand" ? "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-purple-400" : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400";
    };
    const buttonClasses = () => {
      const baseClasses = "inline-flex items-center justify-center rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 transform-gpu shadow-sm hover:shadow-md";
      return `${baseClasses} ${sizeClass()} ${variantClass()}`.trim();
    };
    $$renderer2.push(`<button${attributes({ type, class: clsx(buttonClasses()), disabled, ...restProps })}>`);
    if (text) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`${escape_html(text)}`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (children) {
        $$renderer2.push("<!--[-->");
        children($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></button>`);
  });
}
function Card($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      title = "",
      image = "",
      onclick,
      size = "md",
      fullWidth = false,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const sizeClass = () => {
      return size === "sm" ? "p-3" : size === "lg" ? "p-6" : "p-4";
    };
    const cardClasses = () => {
      const baseClasses = "bg-surface rounded-lg transition-all duration-200 hover:shadow-adaptive-md min-w-64";
      const interactiveClasses = onclick ? "cursor-pointer hover:bg-surface-hover hover:border-focus" : "";
      const widthClasses = fullWidth ? "w-full" : "";
      return `${baseClasses} ${interactiveClasses} ${widthClasses} ${sizeClass()}`.trim();
    };
    const titleClasses = () => "text-lg font-semibold mb-2 text-headline";
    $$renderer2.push(`<div${attributes({ class: clsx(cardClasses()), ...restProps })}>`);
    if (image) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<img${attr("src", image)}${attr("alt", title)} class="w-full h-48 object-cover rounded-md mb-4"/>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (title) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<h3${attr_class(clsx(titleClasses()))}>${escape_html(title)}</h3>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (children) {
      $$renderer2.push("<!--[-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  Button as B,
  Card as C,
  Navigation as N,
  ThemeToggle as T,
  html as h
};
