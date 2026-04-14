import { a1 as attributes, a0 as clsx, Y as attr, X as attr_class, _ as ensure_array_like, Z as stringify } from "./index2.js";
import { S as Sun } from "./sun.js";
import { e as escape_html } from "./context.js";
function ThemeToggle($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      size = "md",
      variant = "default",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button${attributes({
        class: "w-10 h-10 bg-base-50 rounded-lg flex items-center justify-center text-label cursor-pointer",
        "aria-label": "Theme toggle",
        type: "button",
        ...restProps
      })}>`);
      Sun($$renderer2, { size: 20, class: "text-label" });
      $$renderer2.push(`<!----></button>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function TopNavbar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      brand = "",
      brandHref,
      ariaLabel,
      showThemeToggle = true,
      className = "",
      embedded = false,
      items = [],
      navVariant = "header",
      currentPath = "",
      preventNavigation = false,
      onclick,
      nav,
      actions,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    function isNavItemActive(href) {
      if (href.startsWith("http://") || href.startsWith("https://")) {
        return currentPath === href;
      }
      if (href === "/") {
        return currentPath === "/";
      }
      return currentPath === href || currentPath.startsWith(`${href}/`);
    }
    const ulClasses = /* @__PURE__ */ (() => {
      return navVariant === "sidebar" ? "flex flex-col gap-1" : "flex flex-col gap-1 md:flex-row md:items-center md:justify-between";
    })();
    function getNavItemClasses() {
      return "flex flex-col gap-1 grow h-full items-center justify-center min-h-0 min-w-0 relative shrink-0 cursor-pointer w-full md:w-auto";
    }
    function getIconContainerClasses() {
      return "group/nav-item flex flex-col items-center justify-center overflow-clip relative rounded-[20px] shrink-0 text-nav-menu-item transition-colors duration-200 outline-none hover:bg-nav-menu-hover hover:text-nav-menu-item-hover aria-[current=page]:bg-nav-menu-active aria-[current=page]:text-nav-menu-item-active focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus";
    }
    function getStateLayerClasses() {
      return "box-border flex gap-1 h-10 items-center px-4 py-2 relative shrink-0";
    }
    function getLabelClasses() {
      return "font-medium leading-4 relative shrink-0 text-center text-nowrap tracking-[0.5px] whitespace-pre text-xs text-inherit";
    }
    function getIconWrapperClasses() {
      return "overflow-clip relative shrink-0 size-4 text-current";
    }
    function defaultNavList($$renderer3) {
      $$renderer3.push(`<ul${attr_class(`${stringify(ulClasses)} list-none m-0 p-0`)}><!--[-->`);
      const each_array = ensure_array_like(items);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        const isActive = isNavItemActive(item.href);
        $$renderer3.push(`<li${attr_class(clsx(getNavItemClasses()))}><a${attr("href", item.href)}${attr_class(clsx(getIconContainerClasses()))}${attr("aria-current", isActive ? "page" : void 0)}><div${attr_class(clsx(getStateLayerClasses()))}>`);
        if (item.iconFilled && isActive) {
          $$renderer3.push("<!--[-->");
          const Icon = item.iconFilled;
          $$renderer3.push(`<div${attr_class(clsx(getIconWrapperClasses()))}><!---->`);
          Icon($$renderer3, { size: 16, class: "w-4 h-4" });
          $$renderer3.push(`<!----></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
          if (item.icon) {
            $$renderer3.push("<!--[-->");
            const Icon = item.icon;
            $$renderer3.push(`<div${attr_class(clsx(getIconWrapperClasses()))}><!---->`);
            Icon($$renderer3, { size: 16, class: "w-4 h-4" });
            $$renderer3.push(`<!----></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]--> <p${attr_class(clsx(getLabelClasses()))}>${escape_html(item.label)}</p></div></a></li>`);
      }
      $$renderer3.push(`<!--]--></ul>`);
    }
    if (embedded) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<nav${attributes({
        class: clsx(className),
        "aria-label": ariaLabel,
        ...restProps
      })}>`);
      if (nav) {
        $$renderer2.push("<!--[-->");
        nav($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        defaultNavList($$renderer2);
      }
      $$renderer2.push(`<!--]--></nav>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<nav${attributes({
        class: `bg-base-50 border-b border-border sticky top-0 z-50 ${stringify(className)}`,
        "aria-label": ariaLabel,
        ...restProps
      })}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="shrink-0">`);
      if (brandHref) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<a${attr("href", brandHref)} class="text-xl font-bold text-headline hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">${escape_html(brand)}</a>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<span class="text-xl font-bold text-headline">${escape_html(brand)}</span>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="hidden md:block"><div class="ml-10 flex items-baseline space-x-4">`);
      if (nav) {
        $$renderer2.push("<!--[-->");
        nav($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (items.length > 0) {
          $$renderer2.push("<!--[-->");
          defaultNavList($$renderer2);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="hidden md:block"><div class="ml-4 flex items-center space-x-4">`);
      actions?.($$renderer2);
      $$renderer2.push(`<!----> `);
      if (showThemeToggle) {
        $$renderer2.push("<!--[-->");
        ThemeToggle($$renderer2, {});
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div> <div class="md:hidden"><button type="button" class="cursor-pointer text-description hover:text-body" aria-label="Toggle menu"><span class="text-2xl">☰</span></button></div></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></nav>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  TopNavbar as T
};
