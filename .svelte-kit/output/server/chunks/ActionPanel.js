import { a0 as attributes, a1 as clsx } from "./index2.js";
import { B as Badge } from "./Badge.js";
import { e as escape_html } from "./context.js";
function ActionPanel($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      title,
      description,
      href,
      onclick,
      disabled = false,
      loading = false,
      badgeText,
      badgeVariant = "neutral",
      ariaLabel,
      className = "",
      target,
      rel,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const isDisabled = disabled || loading;
    const computedAriaLabel = ariaLabel ?? (href ? `Open ${title}` : title);
    const baseClasses = "group focus-ring focus-ring--muted block rounded-2xl border border-base-200 bg-base-0 p-6 text-left transition-all duration-200 hover:border-headline/30 hover:bg-base-50 active:scale-[0.99] active:bg-base-100";
    const disabledClasses = "opacity-50 cursor-not-allowed pointer-events-none hover:border-base-200 hover:bg-base-0 active:scale-100";
    const panelClasses = [baseClasses, isDisabled ? disabledClasses : "", className].filter(Boolean).join(" ").trim();
    function body($$renderer3) {
      $$renderer3.push(`<div class="flex items-start justify-between gap-4"><div class="min-w-0"><h3 class="truncate text-lg font-semibold text-headline transition-colors group-hover:text-headline/90">${escape_html(title)}</h3> <p class="mt-3 line-clamp-2 text-description">${escape_html(description)}</p></div> <div class="flex shrink-0 items-center gap-3">`);
      if (badgeText) {
        $$renderer3.push("<!--[-->");
        Badge($$renderer3, { variant: badgeVariant, text: badgeText });
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (loading) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<span class="inline-block size-5 shrink-0 animate-spin rounded-full border-2 border-description border-t-transparent opacity-70" aria-hidden="true"></span>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div></div>`);
    }
    if (href) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<a${attributes({
        class: clsx(panelClasses),
        href: isDisabled ? void 0 : href,
        "aria-label": computedAriaLabel,
        "aria-disabled": isDisabled ? "true" : void 0,
        "aria-busy": loading ? "true" : void 0,
        tabindex: isDisabled ? -1 : void 0,
        target,
        rel,
        ...restProps
      })}>`);
      body($$renderer2);
      $$renderer2.push(`<!----></a>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button${attributes({
        type: "button",
        class: clsx(panelClasses),
        "aria-label": computedAriaLabel,
        "aria-busy": loading ? "true" : void 0,
        disabled: isDisabled,
        ...restProps
      })}>`);
      body($$renderer2);
      $$renderer2.push(`<!----></button>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  ActionPanel as A
};
