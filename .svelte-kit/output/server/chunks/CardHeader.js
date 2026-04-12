import { a0 as attributes, $ as clsx, Z as attr, a4 as element, _ as attr_class } from "./index2.js";
import { e as escape_html } from "./context.js";
function Button($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      variant = "primary",
      size = "md",
      disabled = false,
      type = "button",
      text = "",
      isFullWidth = false,
      onclick,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const sizeClass = () => {
      if (size === "sm") {
        return {
          padding: "px-4 py-2.5",
          text: "text-sm",
          font: "font-medium",
          leading: "leading-5",
          tracking: "tracking-[0.1px]",
          radius: "rounded-lg",
          gap: "gap-2"
        };
      } else if (size === "lg") {
        return {
          padding: "px-8 py-4",
          text: "text-lg",
          font: "font-normal",
          leading: "leading-8",
          tracking: "tracking-normal",
          radius: "rounded-xl",
          gap: "gap-3"
        };
      } else {
        return {
          padding: "px-5 py-3",
          text: "text-base",
          font: "font-medium",
          leading: "leading-6",
          tracking: "tracking-[0.15px]",
          radius: "rounded-lg",
          gap: "gap-2"
        };
      }
    };
    const variantClass = () => {
      return variant === "primary" ? "bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2" : variant === "secondary" ? "bg-action-secondary text-headline hover:bg-action-secondary-hover active:bg-action-secondary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2" : variant === "danger" ? "bg-action-danger text-inverse hover:bg-action-danger-hover active:bg-action-danger-active focus:ring-2 focus:ring-red-500 focus:ring-offset-2" : variant === "ghost" ? "bg-transparent text-headline hover:bg-base-100 active:bg-base-200 focus:ring-2 focus:ring-base-500 focus:ring-offset-2 disabled:text-disabled" : variant === "outline" ? "bg-transparent border-2 border-action-primary text-headline hover:bg-action-secondary hover:text-action-primary active:bg-action-primary-active active:text-action-primary focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:border-disabled disabled:text-disabled" : variant === "link" ? "text-brand-700 active:text-brand-700 underline-offset-4 hover:underline focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:text-disabled disabled:no-underline" : "bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2";
    };
    const buttonClasses = () => {
      const sizeStyles = sizeClass();
      const flexClass = isFullWidth ? "flex" : "inline-flex";
      const widthClass = isFullWidth ? "w-full" : "";
      const baseClasses = `${flexClass} items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none`;
      return `${baseClasses} ${widthClass} ${sizeStyles.padding} ${sizeStyles.text} ${sizeStyles.font} ${sizeStyles.leading} ${sizeStyles.tracking} ${sizeStyles.radius} ${sizeStyles.gap} ${variantClass()}`.trim();
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
      onclick,
      size = "md",
      variant = "default",
      fullWidth = true,
      className = "",
      ariaLabel,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const sizeClass = size === "sm" ? "p-4" : size === "lg" ? "p-8" : "p-6";
    const variantClasses = variant === "elevated" ? "bg-card shadow-lg" : variant === "outlined" ? "bg-card border-2 border-base-200 shadow-none" : variant === "flat" ? "bg-card shadow-none border-none" : "bg-card shadow-sm";
    const cardClasses = [
      "rounded-lg transition-all duration-200",
      variantClasses,
      onclick ? variant === "elevated" ? "cursor-pointer hover:shadow-xl hover:bg-card-hover" : variant === "outlined" ? "cursor-pointer hover:border-brand-500 hover:bg-card-hover" : variant === "flat" ? "cursor-pointer hover:bg-card-hover" : "cursor-pointer hover:shadow-lg hover:bg-card-hover" : "",
      fullWidth ? "w-full" : "",
      sizeClass,
      className
    ].filter(Boolean).join(" ").trim();
    const cardRole = onclick ? "button" : void 0;
    $$renderer2.push(`<div${attributes({
      class: clsx(cardClasses),
      role: cardRole,
      ...onclick ? { tabindex: 0 } : {},
      "aria-label": ariaLabel,
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
function CardContent($$renderer, $$props) {
  let {
    image = "",
    imageAlt = "",
    className = "",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$renderer.push(`<div${attributes({ class: clsx(className), ...restProps })}>`);
  if (image) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<img${attr("src", image)}${attr("alt", imageAlt)} class="w-full h-48 object-cover rounded-lg mb-4"/>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  if (children) {
    $$renderer.push("<!--[-->");
    children($$renderer);
    $$renderer.push(`<!---->`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div>`);
}
function CardHeader($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      title = "",
      subtitle = "",
      description = "",
      level = 3,
      className = "",
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const headingTag = `h${level}`;
    const headingClasses = () => {
      return "text-2xl font-semibold leading-none tracking-tight text-headline";
    };
    $$renderer2.push(`<header${attributes({
      class: clsx(`flex flex-col space-y-1.5 pb-4 ${className}`.trim()),
      ...restProps
    })}>`);
    if (title) {
      $$renderer2.push("<!--[-->");
      element(
        $$renderer2,
        headingTag,
        () => {
          $$renderer2.push(`${attr_class(clsx(headingClasses()))}`);
        },
        () => {
          $$renderer2.push(`${escape_html(title)}`);
        }
      );
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
    $$renderer2.push(`<!--]--> `);
    if (subtitle) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-sm text-description">${escape_html(subtitle)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (description) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-sm text-description">${escape_html(description)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></header>`);
  });
}
export {
  Button as B,
  Card as C,
  CardHeader as a,
  CardContent as b
};
