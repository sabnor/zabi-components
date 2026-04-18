import { $ as spread_props, a0 as attributes, a1 as clsx, Y as attr, X as attr_class, _ as ensure_array_like, Z as stringify } from "./index2.js";
import { I as Icon } from "./Icon.js";
import { e as escape_html } from "./context.js";
function Sun($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    /**
     * @license @lucide/svelte v0.544.0 - ISC
     *
     * ISC License
     *
     * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
     *
     * Permission to use, copy, modify, and/or distribute this software for any
     * purpose with or without fee is hereby granted, provided that the above
     * copyright notice and this permission notice appear in all copies.
     *
     * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
     * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
     * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
     * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
     * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
     * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
     * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
     *
     * ---
     *
     * The MIT License (MIT) (for portions derived from Feather)
     *
     * Copyright (c) 2013-2023 Cole Bemis
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     *
     */
    let { $$slots, $$events, ...props } = $$props;
    const iconNode = [
      ["circle", { "cx": "12", "cy": "12", "r": "4" }],
      ["path", { "d": "M12 2v2" }],
      ["path", { "d": "M12 20v2" }],
      ["path", { "d": "m4.93 4.93 1.41 1.41" }],
      ["path", { "d": "m17.66 17.66 1.41 1.41" }],
      ["path", { "d": "M2 12h2" }],
      ["path", { "d": "M20 12h2" }],
      ["path", { "d": "m6.34 17.66-1.41 1.41" }],
      ["path", { "d": "m19.07 4.93-1.41 1.41" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "sun" },
      /**
       * @component @name Sun
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI0IiAvPgogIDxwYXRoIGQ9Ik0xMiAydjIiIC8+CiAgPHBhdGggZD0iTTEyIDIwdjIiIC8+CiAgPHBhdGggZD0ibTQuOTMgNC45MyAxLjQxIDEuNDEiIC8+CiAgPHBhdGggZD0ibTE3LjY2IDE3LjY2IDEuNDEgMS40MSIgLz4KICA8cGF0aCBkPSJNMiAxMmgyIiAvPgogIDxwYXRoIGQ9Ik0yMCAxMmgyIiAvPgogIDxwYXRoIGQ9Im02LjM0IDE3LjY2LTEuNDEgMS40MSIgLz4KICA8cGF0aCBkPSJtMTkuMDcgNC45My0xLjQxIDEuNDEiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/sun
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      props,
      {
        iconNode,
        children: ($$renderer3) => {
          props.children?.($$renderer3);
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      }
    ]));
  });
}
function ThemeToggle($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      size = "md",
      variant = "default",
      disabled = false,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button${attributes({
        class: "w-10 h-10 bg-base-50 rounded-lg flex items-center justify-center text-label cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        "aria-label": "Theme toggle",
        type: "button",
        disabled,
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
      return "focus-ring focus-ring--nav group/nav-item flex flex-col items-center justify-center overflow-clip relative rounded-[20px] shrink-0 text-nav-menu-item transition-colors duration-200 outline-none hover:bg-nav-menu-hover hover:text-nav-menu-item-hover aria-[current=page]:bg-nav-menu-active aria-[current=page]:text-nav-menu-item-active";
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
          const Icon2 = item.iconFilled;
          $$renderer3.push(`<div${attr_class(clsx(getIconWrapperClasses()))}><!---->`);
          Icon2($$renderer3, { size: 16, class: "w-4 h-4" });
          $$renderer3.push(`<!----></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
          if (item.icon) {
            $$renderer3.push("<!--[-->");
            const Icon2 = item.icon;
            $$renderer3.push(`<div${attr_class(clsx(getIconWrapperClasses()))}><!---->`);
            Icon2($$renderer3, { size: 16, class: "w-4 h-4" });
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
        class: `border-b border-border bg-background sticky top-0 z-50 ${stringify(className)}`,
        "aria-label": ariaLabel,
        ...restProps
      })}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="shrink-0">`);
      if (brandHref) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<a${attr("href", brandHref)} class="focus-ring text-xl font-bold text-headline hover:opacity-90">${escape_html(brand)}</a>`);
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
  Sun as S,
  TopNavbar as T,
  ThemeToggle as a
};
