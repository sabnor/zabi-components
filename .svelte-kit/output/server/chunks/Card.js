import { O as attributes, x as ensure_array_like, F as attr_class, z as attr, G as clsx, N as stringify, J as element, y as spread_props } from "./index.js";
import { e as escape_html } from "./context.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function Navigation($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      variant = "header",
      items = [],
      currentPath = "",
      onclick,
      className = "",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const ulClasses = () => {
      return variant === "sidebar" ? "flex flex-col gap-1" : "flex items-center justify-between gap-1";
    };
    function getNavItemClasses(itemHref) {
      const baseClasses = "flex flex-col gap-1 grow h-full items-center justify-center min-h-0 min-w-0 relative shrink-0 cursor-pointer";
      return baseClasses;
    }
    function getIconContainerClasses(itemHref) {
      const isActive = currentPath === itemHref;
      const baseClasses = "flex flex-col items-center justify-center overflow-clip relative rounded-[20px] shrink-0 transition-colors duration-200";
      if (isActive) {
        return `${baseClasses} bg-action-primary-subtle-hover`;
      }
      return `${baseClasses}`;
    }
    function getStateLayerClasses() {
      return "box-border flex gap-1 h-10 items-center px-4 py-2 relative shrink-0";
    }
    function getLabelClasses(itemHref) {
      const isActive = currentPath === itemHref;
      const baseClasses = "font-medium leading-4 relative shrink-0 text-center text-nowrap tracking-[0.5px] whitespace-pre text-xs";
      if (isActive) {
        return `${baseClasses} text-link`;
      }
      return `${baseClasses} text-description`;
    }
    function getIconClasses(itemHref) {
      const isActive = currentPath === itemHref;
      if (isActive) {
        return "text-link";
      }
      return "text-description";
    }
    $$renderer2.push(`<ul${attributes({
      class: `${stringify(ulClasses())} ${stringify(className)}`,
      ...restProps
    })}><!--[-->`);
    const each_array = ensure_array_like(items);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      const isActive = currentPath === item.href;
      const navItemClasses = getNavItemClasses(item.href);
      const iconContainerClasses = getIconContainerClasses(item.href);
      const labelClasses = getLabelClasses(item.href);
      $$renderer2.push(`<li${attr_class(clsx(navItemClasses))}><a${attr("href", item.href)}${attr_class(clsx(iconContainerClasses))} role="button"${attr("aria-current", isActive ? "page" : void 0)}><div${attr_class(clsx(getStateLayerClasses()))}>`);
      if (item.iconFilled && isActive) {
        $$renderer2.push("<!--[-->");
        const iconClasses = getIconClasses(item.href);
        const Icon2 = item.iconFilled;
        $$renderer2.push(`<div${attr_class(`overflow-clip relative shrink-0 size-4 ${stringify(iconClasses)}`)}><!---->`);
        Icon2($$renderer2, { size: 16, class: "w-4 h-4" });
        $$renderer2.push(`<!----></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (item.icon) {
          $$renderer2.push("<!--[-->");
          const iconClasses = getIconClasses(item.href);
          const Icon2 = item.icon;
          $$renderer2.push(`<div${attr_class(`overflow-clip relative shrink-0 size-4 ${stringify(iconClasses)}`)}><!---->`);
          Icon2($$renderer2, { size: 16, class: "w-4 h-4" });
          $$renderer2.push(`<!----></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--> <p${attr_class(clsx(labelClasses))}>${escape_html(item.label)}</p></div></a></li>`);
    }
    $$renderer2.push(`<!--]--></ul>`);
  });
}
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
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function Icon($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const {
      name,
      color = "currentColor",
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth = false,
      iconNode = [],
      children,
      $$slots,
      $$events,
      ...props
    } = $$props;
    $$renderer2.push(`<svg${attributes(
      {
        ...defaultAttributes,
        ...props,
        width: size,
        height: size,
        stroke: color,
        "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        class: clsx(["lucide-icon lucide", name && `lucide-${name}`, props.class])
      },
      void 0,
      void 0,
      void 0,
      3
    )}><!--[-->`);
    const each_array = ensure_array_like(iconNode);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [tag, attrs] = each_array[$$index];
      element($$renderer2, tag, () => {
        $$renderer2.push(`${attributes({ ...attrs }, void 0, void 0, void 0, 3)}`);
      });
    }
    $$renderer2.push(`<!--]-->`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></svg>`);
  });
}
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
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button${attributes({
        class: "w-10 h-10 bg-surface-elevated rounded-lg flex items-center justify-center text-label cursor-pointer",
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
          padding: "px-12 py-8",
          text: "text-2xl",
          font: "font-normal",
          leading: "leading-8",
          tracking: "tracking-normal",
          radius: "rounded-2xl",
          gap: "gap-3"
        };
      } else {
        return {
          padding: "px-6 py-4",
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
      return variant === "primary" ? "bg-action-primary text-inverse hover:bg-action-primary-hover active:bg-action-primary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2" : variant === "secondary" ? "bg-brand-100 text-brand-800 hover:bg-brand-200 active:bg-brand-300 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2" : variant === "danger" ? "bg-action-danger text-inverse hover:bg-action-danger-hover active:bg-action-danger-active focus:ring-2 focus:ring-red-500 focus:ring-offset-2" : variant === "ghost" ? "bg-transparent text-headline hover:bg-surface-hover active:bg-surface-active focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 disabled:text-disabled" : "bg-action-primary text-inverse hover:bg-action-primary-hover active:bg-action-primary-active focus:ring-2 focus:ring-brand-500 focus:ring-offset-2";
    };
    const buttonClasses = () => {
      const sizeStyles = sizeClass();
      const baseClasses = "inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none focus:outline-none";
      return `${baseClasses} ${sizeStyles.padding} ${sizeStyles.text} ${sizeStyles.font} ${sizeStyles.leading} ${sizeStyles.tracking} ${sizeStyles.radius} ${sizeStyles.gap} ${variantClass()}`.trim();
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
      description = "",
      image = "",
      onclick,
      size = "md",
      fullWidth = true,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const sizeClass = () => {
      return size === "sm" ? "p-4" : size === "lg" ? "p-8" : "p-6";
    };
    const cardClasses = () => {
      const baseClasses = "rounded-lg transition-all duration-200 min-w-64 bg-surface-elevated shadow-sm";
      const interactiveClasses = onclick ? "cursor-pointer hover:shadow-lg hover:bg-surface-hover" : "";
      const widthClasses = fullWidth ? "w-full" : "";
      return `${baseClasses} ${interactiveClasses} ${widthClasses} ${sizeClass()}`.trim();
    };
    const titleClasses = () => {
      if (size === "sm") {
        return "text-lg font-medium mb-2 text-headline";
      } else if (size === "lg") {
        return "text-2xl font-medium mb-4 text-headline";
      } else {
        return "text-xl font-medium mb-3 text-headline";
      }
    };
    const descriptionClasses = () => {
      if (size === "sm") {
        return "text-xs text-description mb-3";
      } else if (size === "lg") {
        return "text-base text-description mb-5";
      } else {
        return "text-sm text-description mb-4";
      }
    };
    $$renderer2.push(`<div${attributes({ class: clsx(cardClasses()), ...restProps })}>`);
    if (image) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<img${attr("src", image)}${attr("alt", title)} class="w-full h-48 object-cover rounded-lg mb-4"/>`);
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
    if (description) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p${attr_class(clsx(descriptionClasses()))}>${escape_html(description)}</p>`);
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
  Icon as I,
  Navigation as N,
  ThemeToggle as T,
  html as h
};
