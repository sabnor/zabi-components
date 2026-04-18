import { a0 as attributes, a1 as clsx, Y as attr, a4 as element, X as attr_class } from "./index2.js";
import { e as escape_html } from "./context.js";
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
    const radiusClass = size === "sm" ? "rounded-xl" : size === "lg" ? "rounded-3xl" : "rounded-2xl";
    const variantClasses = variant === "elevated" ? "bg-card shadow-lg" : variant === "outlined" ? "bg-card border-2 border-base-200 shadow-none" : variant === "flat" ? "bg-card shadow-none border-none" : "bg-card shadow-sm";
    const cardClasses = [
      radiusClass,
      "transition-all duration-200",
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
      subtitleId,
      descriptionId,
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
      $$renderer2.push(`<p${attr("id", subtitleId)} class="text-sm text-description">${escape_html(subtitle)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (description) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p${attr("id", descriptionId)} class="text-sm text-description">${escape_html(description)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></header>`);
  });
}
export {
  Card as C,
  CardHeader as a,
  CardContent as b
};
