import { a0 as attributes, a1 as clsx, X as attr_class, Z as stringify } from "./index2.js";
function IconButton($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      type = "button",
      label = "",
      class: className = "",
      onclick,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const isDisabled = disabled || loading;
    const sizeClass = (() => {
      if (size === "sm") {
        return { padding: "p-2", radius: "rounded-md", spinner: "size-4" };
      } else if (size === "lg") {
        return { padding: "p-3", radius: "rounded-xl", spinner: "size-6" };
      } else {
        return { padding: "p-2.5", radius: "rounded-lg", spinner: "size-5" };
      }
    })();
    const variantClass = /* @__PURE__ */ (() => {
      return variant === "primary" ? "bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active active:scale-[0.98]" : variant === "secondary" ? "bg-action-secondary text-headline hover:bg-action-secondary-hover active:bg-action-secondary-active active:scale-[0.98]" : variant === "danger" ? "bg-action-danger text-inverse hover:bg-action-danger-hover active:bg-action-danger-active active:scale-[0.98] focus-ring--danger" : variant === "ghost" ? "bg-transparent text-headline hover:bg-base-100 active:bg-base-200 active:scale-[0.98] focus-ring--muted disabled:text-disabled" : variant === "outline" ? "bg-transparent border-2 border-action-primary text-headline hover:bg-action-secondary hover:text-action-primary active:bg-action-primary-active active:text-action-primary active:scale-[0.98] disabled:border-disabled disabled:text-disabled" : variant === "link" ? "text-brand-700 active:text-brand-700 hover:underline disabled:text-disabled disabled:no-underline" : "bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active active:scale-[0.98]";
    })();
    const buttonClasses = (() => {
      const sizeStyles = sizeClass;
      const baseClasses = "inline-flex focus-ring items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
      return `${baseClasses} ${sizeStyles.padding} ${sizeStyles.radius} ${variantClass} ${className}`.trim();
    })();
    $$renderer2.push(`<button${attributes({
      type,
      class: clsx(buttonClasses),
      disabled: isDisabled,
      "aria-busy": loading ? "true" : void 0,
      "aria-label": label || void 0,
      ...restProps
    })}>`);
    if (loading) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span${attr_class(`inline-block ${stringify(sizeClass.spinner)} shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent opacity-80`)} aria-hidden="true"></span>`);
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
export {
  IconButton as I
};
