import { y as spread_props, z as attr, F as attr_class, G as clsx, J as element, K as attr_style, N as stringify, x as ensure_array_like, O as attributes, w as head } from "../../../chunks/index.js";
import { I as Icon, B as Button, T as ThemeToggle, N as Navigation, C as Card } from "../../../chunks/Card.js";
import { B as Badge, C as ComponentDemo, I as Input, A as Alert, a as ContactForm, b as Form, T as Textarea, c as Checkbox, F as FeatureCard } from "../../../chunks/Badge.js";
import { e as escape_html } from "../../../chunks/context.js";
import { C as CodeBlock } from "../../../chunks/CodeBlock.js";
function Image($$renderer, $$props) {
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
      [
        "rect",
        {
          "width": "18",
          "height": "18",
          "x": "3",
          "y": "3",
          "rx": "2",
          "ry": "2"
        }
      ],
      ["circle", { "cx": "9", "cy": "9", "r": "2" }],
      ["path", { "d": "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "image" },
      /**
       * @component @name Image
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiByeT0iMiIgLz4KICA8Y2lyY2xlIGN4PSI5IiBjeT0iOSIgcj0iMiIgLz4KICA8cGF0aCBkPSJtMjEgMTUtMy4wODYtMy4wODZhMiAyIDAgMCAwLTIuODI4IDBMNiAyMSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/image
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
function Dropdown($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      isOpen = false,
      placement = "bottom-start",
      children,
      trigger,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const placementClasses = () => {
      const base = "absolute z-dropdown min-w-[12rem]";
      const positioning = {
        "bottom-start": "top-full left-0 mt-2",
        "bottom-end": "top-full right-0 mt-2",
        "top-start": "bottom-full left-0 mb-2",
        "top-end": "bottom-full right-0 mb-2"
      };
      return `${base} ${positioning[placement]}`;
    };
    const transformClasses = () => {
      if (!isOpen) {
        const hiddenTransform = {
          "bottom-start": "translate-y-1",
          "bottom-end": "translate-y-1",
          "top-start": "-translate-y-1",
          "top-end": "-translate-y-1"
        };
        return `opacity-0 invisible ${hiddenTransform[placement]}`;
      }
      return "opacity-100 visible translate-y-0";
    };
    const dropdownContentClasses = () => {
      return `
            ${placementClasses()}
            bg-brand-100
            rounded-lg
            shadow-lg
            border-0
            py-2
            transition-all
            duration-200
            ease-in-out
            ${transformClasses()}
        `.trim().replace(/\s+/g, " ");
    };
    $$renderer2.push(`<div class="relative inline-block"${attr("data-placement", placement)}>`);
    trigger?.($$renderer2);
    $$renderer2.push(`<!----> `);
    if (isOpen) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(clsx(dropdownContentClasses()))}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function Heading($$renderer, $$props) {
  let { level = 1, text } = $$props;
  const fontWeight = level <= 2 ? "700" : "500";
  const Tag = `h${level}`;
  const sizeClasses = {
    1: "text-4xl",
    2: "text-3xl",
    3: "text-2xl",
    4: "text-xl",
    5: "text-lg",
    6: "text-base"
  };
  const sizeClass = sizeClasses[level] || "text-base";
  element(
    $$renderer,
    Tag,
    () => {
      $$renderer.push(`${attr_class(`text-headline font-nunito ${stringify(sizeClass)}`, "svelte-1mn08on")}${attr_style(`font-weight: ${stringify(fontWeight)};`)}`);
    },
    () => {
      $$renderer.push(`${escape_html(text)}`);
    }
  );
}
function Modal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      isOpen = false,
      title = "",
      size = "md",
      onclick,
      onkeydown,
      children,
      footer,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const sizeClasses = {
      sm: "w-full md:w-[24rem]",
      md: "w-full md:w-[28rem]",
      lg: "w-full md:w-[42rem]"
    }[size] || "w-full md:w-[28rem]";
    if (isOpen) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-end md:items-center justify-center p-0 md:p-4 z-modal" role="dialog" aria-modal="true"${attr("aria-labelledby", title ? "modal-title" : void 0)} tabindex="-1"><div${attr_class(`bg-surface-elevated rounded-t-3xl md:rounded-3xl shadow-xl min-w-[320px] ${stringify(sizeClasses)} max-h-[90vh] overflow-y-auto animate-[slideUp_0.3s_ease-out] md:animate-none flex flex-col`)}>`);
      if (title) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center justify-between px-6 pt-6 pb-4"><h2 id="modal-title" class="text-2xl font-normal leading-8 text-headline tracking-normal">${escape_html(title)}</h2> <button type="button" class="text-description hover:text-headline text-2xl cursor-pointer transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-hover" aria-label="Close">×</button></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="px-6 pb-6 flex-1">`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div> `);
      if (footer) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex justify-end gap-3 px-6 pb-6 pt-4">`);
        footer?.($$renderer2);
        $$renderer2.push(`<!----></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Tabs($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      tabs = [],
      activeTab = "",
      variant = "default",
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<div class="tabs-container"><div class="flex border-b border-base-200" role="tablist" tabindex="0"><!--[-->`);
    const each_array = ensure_array_like(tabs);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button type="button" role="tab"${attr_class(`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${stringify(activeTab === tab.id ? variant === "pills" ? "bg-brand-100 text-brand-700 border-brand-500" : "border-brand-500 text-body" : "border-transparent text-description hover:text-body hover:border-base-300")}`)}${attr("disabled", tab.disabled, true)}${attr("aria-selected", activeTab === tab.id)}>${escape_html(tab.label)}</button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-4">`);
    children?.($$renderer2, { activeTab });
    $$renderer2.push(`<!----></div></div>`);
  });
}
function ColorPicker($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    function generateId(prefix = "id") {
      if (typeof window !== "undefined") {
        return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
      } else {
        return `${prefix}-ssr-${Date.now()}`;
      }
    }
    let {
      value = "",
      label = "",
      disabled = false,
      placeholder = "#000000",
      onchange,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const inputId = generateId("color-picker");
    function isValidHex(hex) {
      const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      return hexPattern.test(hex);
    }
    const inputClasses = () => {
      const baseClasses = "w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-200";
      const stateClasses = isValidHex(value) || value === "" ? "border-base-300 focus:border-brand-500" : "border-red-300 focus:border-red-500 focus:ring-red-200";
      return `${baseClasses} ${stateClasses}`.trim();
    };
    $$renderer2.push(`<div${attributes({ class: "space-y-2", ...restProps })}>`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", inputId)} class="block text-sm font-medium text-label">${escape_html(label)}</label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="flex items-center space-x-2"><input${attr("id", inputId)} type="text"${attr("placeholder", placeholder)}${attr("value", value)}${attr("disabled", disabled, true)}${attr_class(clsx(inputClasses()))} aria-label="Hex color input"/> `);
    if (value && isValidHex(value)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="w-8 h-8 rounded border-2 border-base-300 shrink-0"${attr_style(`background-color: ${stringify(value)};`)} aria-label="Color preview"></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (value && !isValidHex(value)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-xs text-red-500">Please enter a valid hex color (e.g., #ff0000 or #f00)</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function OptimizedImage($$renderer, $$props) {
  let {
    src,
    alt = "",
    width = "100%",
    height = "auto",
    className = "",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$renderer.push(`<img${attributes({
    src,
    alt,
    class: `w-full h-auto object-cover ${stringify(className)}`,
    style: `width: ${stringify(typeof width === "number" ? width + "px" : width)}; height: ${stringify(typeof height === "number" ? height + "px" : height)};`,
    loading: "lazy",
    ...restProps
  })} onload="this.__e=event" onerror="this.__e=event"/>`);
}
function Skeleton($$renderer, $$props) {
  let {
    width = "100%",
    height = "1rem",
    className = "",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$renderer.push(`<div${attributes({
    class: `animate-pulse bg-base-200 rounded ${stringify(className)}`,
    style: `width: ${stringify(width)}; height: ${stringify(height)};`,
    ...restProps
  })}></div>`);
}
function Toast($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      message = "",
      type = "info",
      closable = true,
      onclick,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const typeClasses = {
      success: "bg-green-100 border-green-300 text-success",
      error: "bg-red-100 border-red-300 text-error",
      warning: "bg-yellow-100 border-yellow-300 text-warning",
      info: "bg-iris-100 border-iris-300 text-body"
    };
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attributes({
        class: "fixed top-4 right-4 max-w-sm w-full bg-white border rounded-lg shadow-lg p-4 z-50",
        role: "alert",
        ...restProps
      })}><div class="flex items-start"><div class="flex-1"><p${attr_class(`text-sm ${stringify(typeClasses[type])}`)}>${escape_html(message)}</p></div> `);
      if (closable) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button type="button" class="ml-3 text-base-400 hover:text-base-600" aria-label="Close notification">×</button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Tooltip($$renderer, $$props) {
  let {
    content = "",
    placement = "top",
    delay = 0,
    disabled = false,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$renderer.push(`<div${attributes(
    {
      class: "tooltip-container group relative inline-block",
      "data-placement": placement,
      "data-delay": delay,
      "data-disabled": disabled,
      ...restProps
    },
    "svelte-13nzt82"
  )}>`);
  children?.($$renderer);
  $$renderer.push(`<!----> `);
  if (content && !disabled) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="tooltip group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible svelte-13nzt82" role="tooltip" aria-hidden="true">${escape_html(content)}</div>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div>`);
}
function ImageUpload($$renderer, $$props) {
  let {
    value = null,
    disabled = false,
    accept = "image/*",
    placeholder = "No image selected",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  function removeImage() {
    if (disabled) return;
    if (value && typeof URL !== "undefined" && URL.revokeObjectURL) {
      URL.revokeObjectURL(value);
    }
    value = null;
  }
  function triggerFileSelect() {
    if (disabled) return;
  }
  $$renderer.push(`<div class="space-y-3">`);
  if (value) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="relative group"><img${attr("src", value)} alt="" class="w-full h-32 object-cover rounded-lg border-0"/> <div class="absolute inset-0 bg-black/50 dark:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"><div class="flex gap-2">`);
    Button($$renderer, {
      variant: "secondary",
      size: "sm",
      onclick: triggerFileSelect,
      disabled,
      children: ($$renderer2) => {
        $$renderer2.push(`<!---->Change`);
      },
      $$slots: { default: true }
    });
    $$renderer.push(`<!----> `);
    Button($$renderer, {
      variant: "danger",
      size: "sm",
      onclick: removeImage,
      disabled,
      children: ($$renderer2) => {
        $$renderer2.push(`<!---->Remove`);
      },
      $$slots: { default: true }
    });
    $$renderer.push(`<!----></div></div></div>`);
  } else {
    $$renderer.push("<!--[!-->");
    $$renderer.push(`<div${attr_class(`border-2 border-dashed border-base-200 rounded-lg p-6 text-center hover:border-brand-500 transition-colors ${stringify(disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer")}`)} role="button"${attr("tabindex", disabled ? -1 : 0)}${attr("aria-disabled", disabled)}><div class="space-y-3"><div class="w-12 h-12 mx-auto bg-surface-level-1 rounded-lg flex items-center justify-center">`);
    Image($$renderer, { size: 24, class: "text-description" });
    $$renderer.push(`<!----></div> <div><p class="font-medium text-headline">${escape_html(placeholder)}</p> <p class="text-sm text-description">Click to choose a file</p></div></div></div>`);
  }
  $$renderer.push(`<!--]--> <input type="file"${attr("accept", accept)}${attr("disabled", disabled, true)} class="hidden"/></div>`);
}
function SlideUp($$renderer, $$props) {
  let {
    isOpen = false,
    title = "",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (isOpen) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="fixed inset-0 bg-black/50 dark:bg-black/70 z-modal" role="dialog" aria-modal="true"${attr("aria-labelledby", title ? "slideup-title" : void 0)} tabindex="-1"><div class="fixed bottom-0 left-0 right-0 bg-surface-elevated rounded-t-3xl shadow-xl z-modal max-h-[90vh] overflow-y-auto animate-[slideUp_0.3s_ease-out] flex flex-col">`);
    if (title) {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<div class="flex items-center justify-between px-6 pt-6 pb-4"><h2 id="slideup-title" class="text-2xl font-normal leading-8 text-headline tracking-normal">${escape_html(title)}</h2> <button type="button" class="text-description hover:text-headline text-2xl cursor-pointer transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-hover" aria-label="Close">×</button></div>`);
    } else {
      $$renderer.push("<!--[!-->");
    }
    $$renderer.push(`<!--]--> <div class="px-6 pb-6 flex-1">`);
    children?.($$renderer);
    $$renderer.push(`<!----></div></div></div>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]-->`);
}
function Navbar($$renderer, $$props) {
  let {
    brand = "",
    showThemeToggle = true,
    className = "",
    children,
    nav,
    actions,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$renderer.push(`<nav${attributes({
    class: `bg-surface-elevated border-b border-border sticky top-0 z-50 ${stringify(className)}`,
    ...restProps
  })}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="shrink-0"><button type="button" class="text-xl font-bold text-headline">${escape_html(brand)}</button></div> <div class="hidden md:block"><div class="ml-10 flex items-baseline space-x-4">`);
  nav?.($$renderer);
  $$renderer.push(`<!----></div></div> <div class="hidden md:block"><div class="ml-4 flex items-center space-x-4">`);
  actions?.($$renderer);
  $$renderer.push(`<!----> `);
  if (showThemeToggle) {
    $$renderer.push("<!--[-->");
    ThemeToggle($$renderer, {});
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div></div> <div class="md:hidden"><button type="button" class="text-description hover:text-body" aria-label="Toggle menu"><span class="text-2xl">☰</span></button></div></div> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div></nav>`);
}
function _page($$renderer) {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Docs", href: "/docs" },
    { label: "GitHub", href: "https://github.com" }
  ];
  const categories = [
    {
      id: "atoms",
      label: "Atoms",
      description: "Basic building blocks"
    },
    {
      id: "molecules",
      label: "Molecules",
      description: "Composite components"
    },
    {
      id: "organisms",
      label: "Organisms",
      description: "Complex components"
    }
  ];
  let selectedCategory = "atoms";
  let selectedComponent = "button";
  let modalOpen = false;
  let slideUpOpen = false;
  const sampleCode = `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`;
  const components = {
    atoms: [
      {
        name: "Button",
        category: "atoms",
        description: "Clean, accessible buttons with multiple variants and sizes",
        props: [
          {
            name: "variant",
            type: "string",
            required: false,
            defaultValue: "primary",
            description: "Button style variant"
          },
          {
            name: "size",
            type: "string",
            required: false,
            defaultValue: "md",
            description: "Button size"
          },
          {
            name: "disabled",
            type: "boolean",
            required: false,
            defaultValue: "false",
            description: "Disable the button"
          },
          {
            name: "type",
            type: "string",
            required: false,
            defaultValue: "button",
            description: "HTML button type"
          }
        ],
        variants: [
          "primary",
          "secondary",
          "danger",
          "success",
          "ghost",
          "brand"
        ],
        examples: [
          {
            title: "Basic Usage",
            description: "Simple button with default styling",
            code: "&lt;Button&gt;Click me&lt;/Button&gt;"
          },
          {
            title: "Variants",
            description: "Different button variants",
            code: '&lt;Button variant="primary"&gt;Primary&lt;/Button&gt;\n&lt;Button variant="secondary"&gt;Secondary&lt;/Button&gt;\n&lt;Button variant="danger"&gt;Danger&lt;/Button&gt;'
          }
        ]
      },
      {
        name: "Input",
        category: "atoms",
        description: "Form inputs with labels, variants, and accessibility features",
        props: [
          {
            name: "value",
            type: "string",
            required: false,
            defaultValue: "",
            description: "Input value"
          },
          {
            name: "type",
            type: "string",
            required: false,
            defaultValue: "text",
            description: "Input type"
          },
          {
            name: "label",
            type: "string",
            required: false,
            defaultValue: "",
            description: "Input label"
          },
          {
            name: "placeholder",
            type: "string",
            required: false,
            defaultValue: "",
            description: "Input placeholder"
          },
          {
            name: "variant",
            type: "string",
            required: false,
            defaultValue: "default",
            description: "Input variant"
          }
        ],
        variants: ["default", "success", "warning", "error"],
        examples: [
          {
            title: "Basic Input",
            description: "Simple input with label",
            code: '&lt;Input label="Name" placeholder="Enter your name" /&gt;'
          },
          {
            title: "Variants",
            description: "Input with different variants",
            code: `<Input variant="success" label="Email" />
<Input variant="warning" label="Password" />`
          }
        ]
      },
      {
        name: "Card",
        category: "atoms",
        description: "Flexible card containers with semantic color variants",
        props: [
          {
            name: "title",
            type: "string",
            required: false,
            defaultValue: "",
            description: "Card title"
          },
          {
            name: "variant",
            type: "string",
            required: false,
            defaultValue: "default",
            description: "Card variant"
          },
          {
            name: "interactive",
            type: "boolean",
            required: false,
            defaultValue: "false",
            description: "Make card clickable"
          }
        ],
        variants: ["default", "success", "warning", "error", "info"],
        examples: [
          {
            title: "Basic Card",
            description: "Simple card with title and content",
            code: `<Card title="Card Title">
  <p>Card content goes here</p>
</Card>`
          }
        ]
      },
      {
        name: "ColorPicker",
        category: "atoms",
        description: "Color picker with predefined colors and custom hex input",
        props: [
          {
            name: "value",
            type: "string",
            required: false,
            defaultValue: "",
            description: "Selected color value (hex code)"
          },
          {
            name: "label",
            type: "string",
            required: false,
            defaultValue: "",
            description: "Color picker label"
          },
          {
            name: "disabled",
            type: "boolean",
            required: false,
            defaultValue: "false",
            description: "Disable the color picker"
          },
          {
            name: "onclick",
            type: "function",
            required: false,
            defaultValue: "undefined",
            description: "Click event handler"
          }
        ],
        variants: [],
        examples: [
          {
            title: "Basic Color Picker",
            description: "Color picker with predefined colors and hex input",
            code: '&lt;ColorPicker label="Choose a color" /&gt;'
          },
          {
            title: "With Initial Value",
            description: "Color picker with pre-selected color",
            code: '&lt;ColorPicker value="#3b82f6" label="Background Color" /&gt;'
          },
          {
            title: "Disabled State",
            description: "Disabled color picker",
            code: '&lt;ColorPicker disabled={true} label="Disabled Picker" /&gt;'
          }
        ]
      },
      {
        name: "Badge",
        category: "atoms",
        description: "Small status indicators with semantic color variants",
        props: [
          {
            name: "text",
            type: "string",
            required: true,
            defaultValue: "",
            description: "Badge text content"
          },
          {
            name: "variant",
            type: "string",
            required: false,
            defaultValue: "default",
            description: "Badge color variant"
          },
          {
            name: "size",
            type: "string",
            required: false,
            defaultValue: "md",
            description: "Badge size"
          }
        ],
        variants: ["default", "success", "warning", "error", "info"],
        examples: [
          {
            title: "Basic Badge",
            description: "Simple badge with text",
            code: '&lt;Badge text="New" /&gt;'
          },
          {
            title: "Variants",
            description: "Different badge variants",
            code: '&lt;Badge variant="success" text="Active" /&gt;\n&lt;Badge variant="warning" text="Pending" /&gt;\n&lt;Badge variant="error" text="Error" /&gt;'
          }
        ]
      },
      {
        name: "Checkbox",
        category: "atoms",
        description: "Form checkbox with label and validation states",
        props: [
          {
            name: "checked",
            type: "boolean",
            required: false,
            defaultValue: "false",
            description: "Checkbox checked state"
          },
          {
            name: "label",
            type: "string",
            required: false,
            defaultValue: "",
            description: "Checkbox label"
          },
          {
            name: "disabled",
            type: "boolean",
            required: false,
            defaultValue: "false",
            description: "Disable the checkbox"
          },
          {
            name: "variant",
            type: "string",
            required: false,
            defaultValue: "default",
            description: "Checkbox variant"
          }
        ],
        variants: ["default", "success", "warning", "error"],
        examples: [
          {
            title: "Basic Checkbox",
            description: "Simple checkbox with label",
            code: '&lt;Checkbox label="Accept terms" /&gt;'
          },
          {
            title: "Variants",
            description: "Checkbox with different variants",
            code: '&lt;Checkbox variant="success" label="Verified" checked={true} /&gt;\n&lt;Checkbox variant="warning" label="Review needed" /&gt;'
          }
        ]
      },
      {
        name: "CodeBlock",
        category: "atoms",
        description: "Syntax-highlighted code blocks with copy functionality",
        props: [
          {
            name: "code",
            type: "string",
            required: true,
            defaultValue: "",
            description: "Code content to display"
          },
          {
            name: "language",
            type: "string",
            required: false,
            defaultValue: "javascript",
            description: "Programming language for syntax highlighting"
          },
          {
            name: "showLineNumbers",
            type: "boolean",
            required: false,
            defaultValue: "false",
            description: "Show line numbers"
          }
        ],
        variants: [],
        examples: [
          {
            title: "Basic Code Block",
            description: "Simple code block with syntax highlighting",
            code: `&lt;CodeBlock code="console.log('Hello World');" language="javascript" /&gt;`
          },
          {
            title: "With Line Numbers",
            description: "Code block with line numbers",
            code: `&lt;CodeBlock code="function example() {
  return 'Hello';
}" language="javascript" showLineNumbers={true} /&gt;`
          }
        ]
      },
      {
        name: "FeatureCard",
        category: "atoms",
        description: "Card component optimized for feature showcases",
        props: [
          {
            name: "title",
            type: "string",
            required: true,
            defaultValue: "",
            description: "Feature card title"
          },
          {
            name: "description",
            type: "string",
            required: false,
            defaultValue: "",
            description: "Feature description"
          },
          {
            name: "icon",
            type: "string",
            required: false,
            defaultValue: "",
            description: "Icon name or URL"
          },
          {
            name: "variant",
            type: "string",
            required: false,
            defaultValue: "default",
            description: "Card variant"
          }
        ],
        variants: ["default", "highlighted", "minimal"],
        examples: [
          {
            title: "Basic Feature Card",
            description: "Simple feature card with title and description",
            code: '&lt;FeatureCard title="Fast Performance" description="Lightning fast loading times" /&gt;'
          },
          {
            title: "With Icon",
            description: "Feature card with icon",
            code: '&lt;FeatureCard title="Secure" description="End-to-end encryption" icon="shield" /&gt;'
          }
        ]
      },
      {
        name: "Heading",
        category: "atoms",
        description: "Semantic heading component with consistent styling",
        props: [
          {
            name: "level",
            type: "number",
            required: false,
            defaultValue: "1",
            description: "Heading level (1-6)"
          },
          {
            name: "variant",
            type: "string",
            required: false,
            defaultValue: "default",
            description: "Heading variant"
          },
          {
            name: "color",
            type: "string",
            required: false,
            defaultValue: "inherit",
            description: "Text color"
          }
        ],
        variants: ["default", "display", "subtitle"],
        examples: [
          {
            title: "Basic Heading",
            description: "Simple heading component",
            code: "&lt;Heading level={1}&gt;Main Title&lt;/Heading&gt;"
          },
          {
            title: "Variants",
            description: "Different heading variants",
            code: '&lt;Heading level={1} variant="display"&gt;Display Heading&lt;/Heading&gt;\n&lt;Heading level={2} variant="subtitle"&gt;Subtitle&lt;/Heading&gt;'
          }
        ]
      },
      {
        name: "OptimizedImage",
        category: "atoms",
        description: "Image component with lazy loading and optimization",
        props: [
          {
            name: "src",
            type: "string",
            required: true,
            defaultValue: "",
            description: "Image source URL"
          },
          {
            name: "alt",
            type: "string",
            required: true,
            defaultValue: "",
            description: "Image alt text"
          },
          {
            name: "width",
            type: "number",
            required: false,
            defaultValue: "undefined",
            description: "Image width"
          },
          {
            name: "height",
            type: "number",
            required: false,
            defaultValue: "undefined",
            description: "Image height"
          },
          {
            name: "lazy",
            type: "boolean",
            required: false,
            defaultValue: "true",
            description: "Enable lazy loading"
          }
        ],
        variants: [],
        examples: [
          {
            title: "Basic Image",
            description: "Simple optimized image",
            code: '&lt;OptimizedImage src="/image.jpg" alt="Description" /&gt;'
          },
          {
            title: "With Dimensions",
            description: "Image with specific dimensions",
            code: '&lt;OptimizedImage src="/image.jpg" alt="Description" width={300} height={200} /&gt;'
          }
        ]
      },
      {
        name: "Skeleton",
        category: "atoms",
        description: "Loading skeleton placeholder component",
        props: [
          {
            name: "width",
            type: "string",
            required: false,
            defaultValue: "100%",
            description: "Skeleton width"
          },
          {
            name: "height",
            type: "string",
            required: false,
            defaultValue: "1rem",
            description: "Skeleton height"
          },
          {
            name: "variant",
            type: "string",
            required: false,
            defaultValue: "text",
            description: "Skeleton variant"
          }
        ],
        variants: ["text", "rectangular", "circular"],
        examples: [
          {
            title: "Basic Skeleton",
            description: "Simple text skeleton",
            code: "&lt;Skeleton /&gt;"
          },
          {
            title: "Variants",
            description: "Different skeleton shapes",
            code: '&lt;Skeleton variant="rectangular" width="200px" height="100px" /&gt;\n&lt;Skeleton variant="circular" width="40px" height="40px" /&gt;'
          }
        ]
      },
      {
        name: "Toast",
        category: "atoms",
        description: "Notification toast with auto-dismiss functionality",
        props: [
          {
            name: "message",
            type: "string",
            required: true,
            defaultValue: "",
            description: "Toast message"
          },
          {
            name: "variant",
            type: "string",
            required: false,
            defaultValue: "info",
            description: "Toast variant"
          },
          {
            name: "duration",
            type: "number",
            required: false,
            defaultValue: "5000",
            description: "Auto-dismiss duration in ms"
          },
          {
            name: "closable",
            type: "boolean",
            required: false,
            defaultValue: "true",
            description: "Show close button"
          }
        ],
        variants: ["info", "success", "warning", "error"],
        examples: [
          {
            title: "Basic Toast",
            description: "Simple notification toast",
            code: '&lt;Toast message="Operation completed" /&gt;'
          },
          {
            title: "Variants",
            description: "Different toast variants",
            code: '&lt;Toast variant="success" message="Success!" /&gt;\n&lt;Toast variant="error" message="Error occurred" /&gt;'
          }
        ]
      },
      {
        name: "Tooltip",
        category: "atoms",
        description: "Contextual tooltip with positioning options",
        props: [
          {
            name: "content",
            type: "string",
            required: true,
            defaultValue: "",
            description: "Tooltip content"
          },
          {
            name: "position",
            type: "string",
            required: false,
            defaultValue: "top",
            description: "Tooltip position"
          },
          {
            name: "trigger",
            type: "string",
            required: false,
            defaultValue: "hover",
            description: "Tooltip trigger"
          }
        ],
        variants: [],
        examples: [
          {
            title: "Basic Tooltip",
            description: "Simple tooltip on hover",
            code: '&lt;Tooltip content="This is a tooltip"&gt;\n  &lt;Button&gt;Hover me&lt;/Button&gt;\n&lt;/Tooltip&gt;'
          },
          {
            title: "Positions",
            description: "Tooltip with different positions",
            code: '&lt;Tooltip content="Top tooltip" position="top"&gt;\n  &lt;Button&gt;Top&lt;/Button&gt;\n&lt;/Tooltip&gt;'
          }
        ]
      }
    ],
    molecules: [
      {
        name: "Alert",
        category: "molecules",
        description: "Contextual alerts with different variants and optional close functionality",
        props: [
          {
            name: "variant",
            type: "string",
            required: false,
            defaultValue: "info",
            description: "Alert variant"
          },
          {
            name: "title",
            type: "string",
            required: false,
            defaultValue: "",
            description: "Alert title"
          },
          {
            name: "message",
            type: "string",
            required: false,
            defaultValue: "",
            description: "Alert message"
          },
          {
            name: "closable",
            type: "boolean",
            required: false,
            defaultValue: "false",
            description: "Show close button"
          }
        ],
        variants: ["info", "success", "warning", "error"],
        examples: [
          {
            title: "Basic Alert",
            description: "Simple alert with message",
            code: '&lt;Alert variant="info" message="This is an info alert" /&gt;'
          }
        ]
      },
      {
        name: "ContactForm",
        category: "molecules",
        description: "Complete contact form with validation and submission handling",
        props: [
          {
            name: "onSubmit",
            type: "function",
            required: false,
            defaultValue: "undefined",
            description: "Form submission handler"
          },
          {
            name: "fields",
            type: "array",
            required: false,
            defaultValue: "[]",
            description: "Custom form fields"
          },
          {
            name: "variant",
            type: "string",
            required: false,
            defaultValue: "default",
            description: "Form variant"
          }
        ],
        variants: ["default", "minimal", "detailed"],
        examples: [
          {
            title: "Basic Contact Form",
            description: "Simple contact form with standard fields",
            code: "&lt;ContactForm /&gt;"
          },
          {
            title: "With Custom Handler",
            description: "Contact form with custom submission handler",
            code: "&lt;ContactForm onSubmit={handleSubmit} /&gt;"
          }
        ]
      },
      {
        name: "Dropdown",
        category: "molecules",
        description: "Dropdown menu with customizable options and positioning",
        props: [
          {
            name: "options",
            type: "array",
            required: true,
            defaultValue: "[]",
            description: "Dropdown options"
          },
          {
            name: "value",
            type: "string",
            required: false,
            defaultValue: "",
            description: "Selected value"
          },
          {
            name: "placeholder",
            type: "string",
            required: false,
            defaultValue: "Select an option",
            description: "Placeholder text"
          },
          {
            name: "disabled",
            type: "boolean",
            required: false,
            defaultValue: "false",
            description: "Disable the dropdown"
          }
        ],
        variants: ["default", "searchable", "multi-select"],
        examples: [
          {
            title: "Basic Dropdown",
            description: "Simple dropdown with options",
            code: '&lt;Dropdown options={[{value: "1", label: "Option 1"}]} /&gt;'
          },
          {
            title: "With Placeholder",
            description: "Dropdown with custom placeholder",
            code: '&lt;Dropdown placeholder="Choose..." options={options} /&gt;'
          }
        ]
      },
      {
        name: "Form",
        category: "molecules",
        description: "Flexible form component with validation and field management",
        props: [
          {
            name: "fields",
            type: "array",
            required: true,
            defaultValue: "[]",
            description: "Form field definitions"
          },
          {
            name: "onSubmit",
            type: "function",
            required: false,
            defaultValue: "undefined",
            description: "Form submission handler"
          },
          {
            name: "validation",
            type: "object",
            required: false,
            defaultValue: "{}",
            description: "Validation rules"
          }
        ],
        variants: ["default", "inline", "wizard"],
        examples: [
          {
            title: "Basic Form",
            description: "Simple form with fields",
            code: "&lt;Form fields={formFields} onSubmit={handleSubmit} /&gt;"
          },
          {
            title: "With Validation",
            description: "Form with validation rules",
            code: "&lt;Form fields={fields} validation={rules} /&gt;"
          }
        ]
      },
      {
        name: "ImageUpload",
        category: "molecules",
        description: "Image upload component with preview and drag-and-drop",
        props: [
          {
            name: "onUpload",
            type: "function",
            required: false,
            defaultValue: "undefined",
            description: "Upload handler"
          },
          {
            name: "maxSize",
            type: "number",
            required: false,
            defaultValue: "5242880",
            description: "Max file size in bytes"
          },
          {
            name: "acceptedTypes",
            type: "array",
            required: false,
            defaultValue: "['image/*']",
            description: "Accepted file types"
          },
          {
            name: "multiple",
            type: "boolean",
            required: false,
            defaultValue: "false",
            description: "Allow multiple files"
          }
        ],
        variants: ["default", "drag-drop", "preview"],
        examples: [
          {
            title: "Basic Upload",
            description: "Simple image upload",
            code: "&lt;ImageUpload onUpload={handleUpload} /&gt;"
          },
          {
            title: "With Restrictions",
            description: "Upload with size and type restrictions",
            code: '&lt;ImageUpload maxSize={2097152} acceptedTypes={["image/jpeg", "image/png"]} /&gt;'
          }
        ]
      },
      {
        name: "Modal",
        category: "molecules",
        description: "Modal dialog with backdrop and customizable content",
        props: [
          {
            name: "isOpen",
            type: "boolean",
            required: true,
            defaultValue: "false",
            description: "Modal open state"
          },
          {
            name: "onClose",
            type: "function",
            required: false,
            defaultValue: "undefined",
            description: "Close handler"
          },
          {
            name: "title",
            type: "string",
            required: false,
            defaultValue: "",
            description: "Modal title"
          },
          {
            name: "size",
            type: "string",
            required: false,
            defaultValue: "md",
            description: "Modal size"
          }
        ],
        variants: ["default", "large", "small", "fullscreen"],
        examples: [
          {
            title: "Basic Modal",
            description: "Simple modal dialog",
            code: "&lt;Modal isOpen={isOpen} onClose={() => isOpen = false}&gt;\n  &lt;p&gt;Modal content&lt;/p&gt;\n&lt;/Modal&gt;"
          },
          {
            title: "With Title",
            description: "Modal with title and close button",
            code: '&lt;Modal isOpen={isOpen} title="Confirm Action" onClose={handleClose}&gt;\n  &lt;p&gt;Are you sure?&lt;/p&gt;\n&lt;/Modal&gt;'
          }
        ]
      },
      {
        name: "SlideUp",
        category: "molecules",
        description: "Slide-up panel component with smooth animations",
        props: [
          {
            name: "isOpen",
            type: "boolean",
            required: true,
            defaultValue: "false",
            description: "Panel open state"
          },
          {
            name: "onClose",
            type: "function",
            required: false,
            defaultValue: "undefined",
            description: "Close handler"
          },
          {
            name: "height",
            type: "string",
            required: false,
            defaultValue: "50vh",
            description: "Panel height"
          }
        ],
        variants: ["default", "full", "half"],
        examples: [
          {
            title: "Basic SlideUp",
            description: "Simple slide-up panel",
            code: "&lt;SlideUp isOpen={isOpen} onClose={() => isOpen = false}&gt;\n  &lt;p&gt;Panel content&lt;/p&gt;\n&lt;/SlideUp&gt;"
          },
          {
            title: "Custom Height",
            description: "Slide-up with custom height",
            code: '&lt;SlideUp isOpen={isOpen} height="75vh"&gt;\n  &lt;p&gt;Tall panel&lt;/p&gt;\n&lt;/SlideUp&gt;'
          }
        ]
      },
      {
        name: "Tabs",
        category: "molecules",
        description: "Tabbed interface with customizable tabs and content",
        props: [
          {
            name: "tabs",
            type: "array",
            required: true,
            defaultValue: "[]",
            description: "Tab definitions"
          },
          {
            name: "activeTab",
            type: "string",
            required: false,
            defaultValue: "",
            description: "Active tab ID"
          },
          {
            name: "onTabChange",
            type: "function",
            required: false,
            defaultValue: "undefined",
            description: "Tab change handler"
          }
        ],
        variants: ["default", "pills", "underline"],
        examples: [
          {
            title: "Basic Tabs",
            description: "Simple tabbed interface",
            code: '&lt;Tabs tabs={[{id: "tab1", label: "Tab 1", content: "Content 1"}]} /&gt;'
          },
          {
            title: "With Handler",
            description: "Tabs with change handler",
            code: "&lt;Tabs tabs={tabs} onTabChange={handleTabChange} /&gt;"
          }
        ]
      }
    ],
    organisms: [
      {
        name: "Navbar",
        category: "organisms",
        description: "Navigation bar with logo, menu items, and responsive design",
        props: [
          {
            name: "logo",
            type: "string",
            required: false,
            defaultValue: "",
            description: "Logo text or URL"
          },
          {
            name: "items",
            type: "array",
            required: false,
            defaultValue: "[]",
            description: "Navigation items"
          },
          {
            name: "variant",
            type: "string",
            required: false,
            defaultValue: "default",
            description: "Navbar variant"
          }
        ],
        variants: ["default", "transparent", "fixed"],
        examples: [
          {
            title: "Basic Navbar",
            description: "Simple navigation bar",
            code: '&lt;Navbar logo="My App" items={navItems} /&gt;'
          },
          {
            title: "Transparent",
            description: "Transparent navbar variant",
            code: '&lt;Navbar variant="transparent" logo="Brand" /&gt;'
          }
        ]
      },
      {
        name: "Navigation",
        category: "organisms",
        description: "Navigation component with multiple variants and responsive behavior",
        props: [
          {
            name: "items",
            type: "array",
            required: true,
            defaultValue: "[]",
            description: "Navigation items"
          },
          {
            name: "variant",
            type: "string",
            required: false,
            defaultValue: "default",
            description: "Navigation variant"
          },
          {
            name: "orientation",
            type: "string",
            required: false,
            defaultValue: "horizontal",
            description: "Navigation orientation"
          }
        ],
        variants: ["default", "header", "sidebar", "breadcrumb"],
        examples: [
          {
            title: "Basic Navigation",
            description: "Simple navigation menu",
            code: "&lt;Navigation items={navItems} /&gt;"
          },
          {
            title: "Header Navigation",
            description: "Navigation for header",
            code: '&lt;Navigation variant="header" items={items} /&gt;'
          }
        ]
      }
    ]
  };
  let currentComponents = components[selectedCategory] || [];
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Components - Zabi Components</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Interactive component showcase and documentation"/>`);
  });
  $$renderer.push(`<div class="min-h-screen bg-background"><header class="flex items-center justify-between p-4 bg-surface-level-0 border-b border-border"><h1 class="text-xl font-bold text-text">Zabi Components</h1> <div class="flex items-center gap-4">`);
  Navigation($$renderer, { variant: "header", items: navItems });
  $$renderer.push(`<!----> `);
  ThemeToggle($$renderer, {});
  $$renderer.push(`<!----></div></header> <main class="flex min-h-screen"><aside class="w-64 bg-surface-level-1 border-r border-border p-6"><h2 class="text-lg font-semibold text-text mb-4">Components</h2> <nav class="space-y-2 mb-8"><!--[-->`);
  const each_array = ensure_array_like(categories);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let category = each_array[$$index];
    $$renderer.push(`<button${attr_class(`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${stringify(selectedCategory === category.id ? "bg-primary text-white" : "text-text-secondary hover:text-text hover:bg-surface-level-0")}`)}><div class="font-medium">${escape_html(category.label)}</div> <div class="text-xs opacity-75">${escape_html(category.description)}</div></button>`);
  }
  $$renderer.push(`<!--]--></nav> <div class="space-y-1"><!--[-->`);
  const each_array_1 = ensure_array_like(currentComponents);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let component = each_array_1[$$index_1];
    $$renderer.push(`<button${attr_class(`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${stringify(selectedComponent === component.name.toLowerCase() ? "bg-primary/10 text-primary border-l-2 border-primary" : "text-text-secondary hover:text-text hover:bg-surface-level-0")}`)}>${escape_html(component.name)}</button>`);
  }
  $$renderer.push(`<!--]--></div></aside> <div class="flex-1 p-8"><!--[-->`);
  const each_array_2 = ensure_array_like(currentComponents);
  for (let $$index_4 = 0, $$length = each_array_2.length; $$index_4 < $$length; $$index_4++) {
    let component = each_array_2[$$index_4];
    if (selectedComponent === component.name.toLowerCase()) {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<div class="max-w-4xl"><div class="mb-8"><h1 class="text-3xl font-bold text-text mb-2">${escape_html(component.name)}</h1> <p class="text-lg text-text-secondary mb-4">${escape_html(component.description)}</p> <div class="flex gap-2">`);
      Badge($$renderer, { variant: "info", text: component.category });
      $$renderer.push(`<!----> `);
      if (component.variants) {
        $$renderer.push("<!--[-->");
        Badge($$renderer, {
          variant: "info",
          text: `${stringify(component.variants.length)} variants`
        });
      } else {
        $$renderer.push("<!--[!-->");
      }
      $$renderer.push(`<!--]--></div></div> <div class="space-y-8"><!--[-->`);
      const each_array_3 = ensure_array_like(component.examples);
      for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
        let example = each_array_3[$$index_2];
        ComponentDemo($$renderer, {
          title: example.title,
          description: example.description,
          code: example.code,
          language: example.language || "svelte",
          children: ($$renderer2) => {
            if (component.name === "Button") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<div class="space-y-4"><div class="flex flex-wrap gap-4 items-center">`);
              Button($$renderer2, { variant: "primary", text: "Primary" });
              $$renderer2.push(`<!----> `);
              Button($$renderer2, { variant: "secondary", text: "Secondary" });
              $$renderer2.push(`<!----> `);
              Button($$renderer2, { variant: "danger", text: "Danger" });
              $$renderer2.push(`<!----> `);
              Button($$renderer2, { variant: "secondary", text: "Secondary" });
              $$renderer2.push(`<!----> `);
              Button($$renderer2, { variant: "ghost", text: "Ghost" });
              $$renderer2.push(`<!----> `);
              Button($$renderer2, { variant: "primary", text: "Primary" });
              $$renderer2.push(`<!----></div> <div class="flex flex-wrap gap-4 items-center">`);
              Button($$renderer2, { variant: "primary", disabled: true, text: "Disabled Primary" });
              $$renderer2.push(`<!----> `);
              Button($$renderer2, {
                variant: "secondary",
                disabled: true,
                text: "Disabled Secondary"
              });
              $$renderer2.push(`<!----> `);
              Button($$renderer2, { variant: "danger", disabled: true, text: "Disabled Danger" });
              $$renderer2.push(`<!----></div></div>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (component.name === "Input") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<div class="space-y-4 max-w-md">`);
                Input($$renderer2, {
                  label: "Name",
                  placeholder: "Enter your name",
                  variant: "default"
                });
                $$renderer2.push(`<!----> `);
                Input($$renderer2, {
                  label: "Email",
                  type: "email",
                  placeholder: "Enter your email",
                  variant: "success"
                });
                $$renderer2.push(`<!----> `);
                Input($$renderer2, {
                  label: "Password",
                  type: "password",
                  placeholder: "Enter your password",
                  variant: "warning"
                });
                $$renderer2.push(`<!----> `);
                Input($$renderer2, {
                  label: "Error Field",
                  placeholder: "This field has an error",
                  variant: "error"
                });
                $$renderer2.push(`<!----> `);
                Input($$renderer2, {
                  label: "Disabled Field",
                  placeholder: "This field is disabled",
                  disabled: true
                });
                $$renderer2.push(`<!----></div>`);
              } else {
                $$renderer2.push("<!--[!-->");
                if (component.name === "Card") {
                  $$renderer2.push("<!--[-->");
                  $$renderer2.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
                  Card($$renderer2, {
                    title: "Default Card",
                    children: ($$renderer3) => {
                      $$renderer3.push(`<p class="text-text-secondary">This is a default card with
                                                    clean styling.</p>`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer2.push(`<!----> `);
                  Card($$renderer2, {
                    title: "Success Card",
                    children: ($$renderer3) => {
                      $$renderer3.push(`<p class="text-text-secondary">This card indicates a
                                                    successful action.</p>`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer2.push(`<!----> `);
                  Card($$renderer2, {
                    title: "Warning Card",
                    children: ($$renderer3) => {
                      $$renderer3.push(`<p class="text-text-secondary">This card shows a warning
                                                    state.</p>`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer2.push(`<!----> `);
                  Card($$renderer2, {
                    title: "Error Card",
                    children: ($$renderer3) => {
                      $$renderer3.push(`<p class="text-text-secondary">This card indicates an error
                                                    state.</p>`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer2.push(`<!----> `);
                  Card($$renderer2, {
                    title: "Info Card",
                    children: ($$renderer3) => {
                      $$renderer3.push(`<p class="text-text-secondary">This card provides
                                                    informational content.</p>`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer2.push(`<!----></div>`);
                } else {
                  $$renderer2.push("<!--[!-->");
                  if (component.name === "Alert") {
                    $$renderer2.push("<!--[-->");
                    $$renderer2.push(`<div class="space-y-4">`);
                    Alert($$renderer2, {
                      variant: "info",
                      title: "Info Alert",
                      message: "This is an informational message."
                    });
                    $$renderer2.push(`<!----> `);
                    Alert($$renderer2, {
                      variant: "success",
                      title: "Success!",
                      message: "Your action was completed successfully."
                    });
                    $$renderer2.push(`<!----> `);
                    Alert($$renderer2, {
                      variant: "warning",
                      title: "Warning",
                      message: "Please review your input before proceeding."
                    });
                    $$renderer2.push(`<!----> `);
                    Alert($$renderer2, {
                      variant: "error",
                      title: "Error",
                      message: "Something went wrong. Please try again."
                    });
                    $$renderer2.push(`<!----></div>`);
                  } else {
                    $$renderer2.push("<!--[!-->");
                    if (component.name === "ContactForm") {
                      $$renderer2.push("<!--[-->");
                      $$renderer2.push(`<div class="max-w-md">`);
                      ContactForm($$renderer2, {});
                      $$renderer2.push(`<!----></div>`);
                    } else {
                      $$renderer2.push("<!--[!-->");
                      if (component.name === "Dropdown") {
                        $$renderer2.push("<!--[-->");
                        $$renderer2.push(`<div class="space-y-4 max-w-md">`);
                        {
                          let trigger = function($$renderer3) {
                            Button($$renderer3, { text: "Select an option" });
                          }, children = function($$renderer3) {
                            $$renderer3.push(`<div class="p-2 space-y-1"><button class="w-full text-left px-3 py-2 hover:bg-base-100 rounded">Option 1</button> <button class="w-full text-left px-3 py-2 hover:bg-base-100 rounded">Option 2</button> <button class="w-full text-left px-3 py-2 hover:bg-base-100 rounded">Option 3</button></div>`);
                          };
                          Dropdown($$renderer2, { trigger, children, $$slots: { trigger: true, default: true } });
                        }
                        $$renderer2.push(`<!----> `);
                        {
                          let trigger = function($$renderer3) {
                            Button($$renderer3, { text: "Choose a color" });
                          }, children = function($$renderer3) {
                            $$renderer3.push(`<div class="p-2 space-y-1"><button class="w-full text-left px-3 py-2 hover:bg-base-100 rounded">Red</button> <button class="w-full text-left px-3 py-2 hover:bg-base-100 rounded">Blue</button> <button class="w-full text-left px-3 py-2 hover:bg-base-100 rounded">Green</button></div>`);
                          };
                          Dropdown($$renderer2, { trigger, children, $$slots: { trigger: true, default: true } });
                        }
                        $$renderer2.push(`<!----></div>`);
                      } else {
                        $$renderer2.push("<!--[!-->");
                        if (component.name === "Form") {
                          $$renderer2.push("<!--[-->");
                          $$renderer2.push(`<div class="max-w-md">`);
                          Form($$renderer2, {
                            children: ($$renderer3) => {
                              $$renderer3.push(`<div class="space-y-4">`);
                              Input($$renderer3, { label: "Name", placeholder: "Enter your name" });
                              $$renderer3.push(`<!----> `);
                              Input($$renderer3, {
                                label: "Email",
                                type: "email",
                                placeholder: "Enter your email"
                              });
                              $$renderer3.push(`<!----> `);
                              Textarea($$renderer3, { label: "Message", placeholder: "Enter your message" });
                              $$renderer3.push(`<!----> `);
                              Button($$renderer3, { type: "submit", text: "Submit" });
                              $$renderer3.push(`<!----></div>`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer2.push(`<!----></div>`);
                        } else {
                          $$renderer2.push("<!--[!-->");
                          if (component.name === "ImageUpload") {
                            $$renderer2.push("<!--[-->");
                            $$renderer2.push(`<div class="max-w-md">`);
                            ImageUpload($$renderer2, {
                              accept: "image/jpeg,image/png,image/gif",
                              placeholder: "Choose an image"
                            });
                            $$renderer2.push(`<!----></div>`);
                          } else {
                            $$renderer2.push("<!--[!-->");
                            if (component.name === "Modal") {
                              $$renderer2.push("<!--[-->");
                              $$renderer2.push(`<div class="space-y-4">`);
                              Button($$renderer2, { onclick: () => modalOpen = true, text: "Open Modal" });
                              $$renderer2.push(`<!----> `);
                              Modal($$renderer2, {
                                isOpen: modalOpen,
                                onclick: () => modalOpen = false,
                                title: "Example Modal",
                                children: ($$renderer3) => {
                                  $$renderer3.push(`<p class="text-text-secondary mb-4">This is a modal dialog with
                                                    some content.</p> <div class="flex gap-2 justify-end">`);
                                  Button($$renderer3, {
                                    variant: "secondary",
                                    onclick: () => modalOpen = false,
                                    text: "Cancel"
                                  });
                                  $$renderer3.push(`<!----> `);
                                  Button($$renderer3, { onclick: () => modalOpen = false, text: "Confirm" });
                                  $$renderer3.push(`<!----></div>`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer2.push(`<!----></div>`);
                            } else {
                              $$renderer2.push("<!--[!-->");
                              if (component.name === "SlideUp") {
                                $$renderer2.push("<!--[-->");
                                $$renderer2.push(`<div class="space-y-4">`);
                                Button($$renderer2, { onclick: () => slideUpOpen = true, text: "Open Slide Up" });
                                $$renderer2.push(`<!----> `);
                                SlideUp($$renderer2, {
                                  isOpen: slideUpOpen,
                                  onclick: () => slideUpOpen = false,
                                  title: "Slide Up Panel",
                                  children: ($$renderer3) => {
                                    $$renderer3.push(`<div class="p-6"><h3 class="text-lg font-semibold text-text mb-4">Slide Up Panel</h3> <p class="text-text-secondary mb-4">This is a slide-up panel
                                                        with custom content.</p> `);
                                    Button($$renderer3, { onclick: () => slideUpOpen = false, text: "Close" });
                                    $$renderer3.push(`<!----></div>`);
                                  },
                                  $$slots: { default: true }
                                });
                                $$renderer2.push(`<!----></div>`);
                              } else {
                                $$renderer2.push("<!--[!-->");
                                if (component.name === "Tabs") {
                                  $$renderer2.push("<!--[-->");
                                  $$renderer2.push(`<div class="max-w-2xl">`);
                                  Tabs($$renderer2, {
                                    tabs: [
                                      { id: "tab1", label: "Overview" },
                                      { id: "tab2", label: "Details" },
                                      { id: "tab3", label: "Settings" }
                                    ],
                                    activeTab: "tab1",
                                    children: ($$renderer3) => {
                                      {
                                        $$renderer3.push("<!--[-->");
                                        $$renderer3.push(`<p>This is the overview tab
                                                        content.</p>`);
                                      }
                                      $$renderer3.push(`<!--]-->`);
                                    },
                                    $$slots: { default: true }
                                  });
                                  $$renderer2.push(`<!----></div>`);
                                } else {
                                  $$renderer2.push("<!--[!-->");
                                  if (component.name === "Navbar") {
                                    $$renderer2.push("<!--[-->");
                                    $$renderer2.push(`<div class="space-y-4">`);
                                    {
                                      let nav = function($$renderer3) {
                                        Navigation($$renderer3, {
                                          items: [
                                            { label: "Home", href: "/" },
                                            { label: "Components", href: "/components" },
                                            { label: "Docs", href: "/docs" }
                                          ]
                                        });
                                      };
                                      Navbar($$renderer2, { brand: "Zabi Components", nav, $$slots: { nav: true } });
                                    }
                                    $$renderer2.push(`<!----> `);
                                    {
                                      let nav = function($$renderer3) {
                                        Navigation($$renderer3, {
                                          items: [
                                            { label: "About", href: "/about" },
                                            { label: "Contact", href: "/contact" }
                                          ]
                                        });
                                      };
                                      Navbar($$renderer2, { brand: "Brand", nav, $$slots: { nav: true } });
                                    }
                                    $$renderer2.push(`<!----></div>`);
                                  } else {
                                    $$renderer2.push("<!--[!-->");
                                    if (component.name === "Navigation") {
                                      $$renderer2.push("<!--[-->");
                                      $$renderer2.push(`<div class="space-y-6"><div><h4 class="text-sm font-medium text-text-secondary mb-2">Default Navigation</h4> `);
                                      Navigation($$renderer2, {
                                        items: [
                                          { label: "Home", href: "/" },
                                          { label: "About", href: "/about" },
                                          { label: "Contact", href: "/contact" }
                                        ]
                                      });
                                      $$renderer2.push(`<!----></div> <div><h4 class="text-sm font-medium text-text-secondary mb-2">Header Navigation</h4> `);
                                      Navigation($$renderer2, {
                                        items: [
                                          { label: "Dashboard", href: "/dashboard" },
                                          { label: "Profile", href: "/profile" },
                                          { label: "Settings", href: "/settings" }
                                        ]
                                      });
                                      $$renderer2.push(`<!----></div></div>`);
                                    } else {
                                      $$renderer2.push("<!--[!-->");
                                      if (component.name === "ColorPicker") {
                                        $$renderer2.push("<!--[-->");
                                        $$renderer2.push(`<div class="space-y-6 max-w-md">`);
                                        ColorPicker($$renderer2, { label: "Choose a color" });
                                        $$renderer2.push(`<!----> `);
                                        ColorPicker($$renderer2, { value: "#3b82f6", label: "Background Color" });
                                        $$renderer2.push(`<!----> `);
                                        ColorPicker($$renderer2, { disabled: true, label: "Disabled Picker" });
                                        $$renderer2.push(`<!----></div>`);
                                      } else {
                                        $$renderer2.push("<!--[!-->");
                                        if (component.name === "Badge") {
                                          $$renderer2.push("<!--[-->");
                                          $$renderer2.push(`<div class="flex flex-wrap gap-2 items-center">`);
                                          Badge($$renderer2, { text: "Default" });
                                          $$renderer2.push(`<!----> `);
                                          Badge($$renderer2, { variant: "success", text: "Success" });
                                          $$renderer2.push(`<!----> `);
                                          Badge($$renderer2, { variant: "warning", text: "Warning" });
                                          $$renderer2.push(`<!----> `);
                                          Badge($$renderer2, { variant: "error", text: "Error" });
                                          $$renderer2.push(`<!----> `);
                                          Badge($$renderer2, { variant: "info", text: "Info" });
                                          $$renderer2.push(`<!----></div>`);
                                        } else {
                                          $$renderer2.push("<!--[!-->");
                                          if (component.name === "Checkbox") {
                                            $$renderer2.push("<!--[-->");
                                            $$renderer2.push(`<div class="space-y-4 max-w-md">`);
                                            Checkbox($$renderer2, { label: "Accept terms and conditions" });
                                            $$renderer2.push(`<!----> `);
                                            Checkbox($$renderer2, { label: "Email verified", checked: true });
                                            $$renderer2.push(`<!----> `);
                                            Checkbox($$renderer2, { label: "Review required" });
                                            $$renderer2.push(`<!----> `);
                                            Checkbox($$renderer2, { disabled: true, label: "Disabled option" });
                                            $$renderer2.push(`<!----></div>`);
                                          } else {
                                            $$renderer2.push("<!--[!-->");
                                            if (component.name === "CodeBlock") {
                                              $$renderer2.push("<!--[-->");
                                              $$renderer2.push(`<div class="max-w-2xl">`);
                                              CodeBlock($$renderer2, {
                                                code: sampleCode,
                                                language: "javascript",
                                                showLineNumbers: true
                                              });
                                              $$renderer2.push(`<!----></div>`);
                                            } else {
                                              $$renderer2.push("<!--[!-->");
                                              if (component.name === "FeatureCard") {
                                                $$renderer2.push("<!--[-->");
                                                $$renderer2.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">`);
                                                FeatureCard($$renderer2, {
                                                  title: "Fast Performance",
                                                  description: "Lightning fast loading times with optimized code"
                                                });
                                                $$renderer2.push(`<!----> `);
                                                FeatureCard($$renderer2, {
                                                  title: "Secure by Default",
                                                  description: "End-to-end encryption and security best practices",
                                                  icon: "shield"
                                                });
                                                $$renderer2.push(`<!----> `);
                                                FeatureCard($$renderer2, {
                                                  title: "Easy to Use",
                                                  description: "Intuitive interface designed for productivity",
                                                  icon: "star"
                                                });
                                                $$renderer2.push(`<!----></div>`);
                                              } else {
                                                $$renderer2.push("<!--[!-->");
                                                if (component.name === "Heading") {
                                                  $$renderer2.push("<!--[-->");
                                                  $$renderer2.push(`<div class="space-y-4">`);
                                                  Heading($$renderer2, { level: 1, text: "Display Heading" });
                                                  $$renderer2.push(`<!----> `);
                                                  Heading($$renderer2, { level: 2, text: "Section Heading" });
                                                  $$renderer2.push(`<!----> `);
                                                  Heading($$renderer2, { level: 3, text: "Subtitle Heading" });
                                                  $$renderer2.push(`<!----> `);
                                                  Heading($$renderer2, { level: 4, text: "Subsection" });
                                                  $$renderer2.push(`<!----></div>`);
                                                } else {
                                                  $$renderer2.push("<!--[!-->");
                                                  if (component.name === "OptimizedImage") {
                                                    $$renderer2.push("<!--[-->");
                                                    $$renderer2.push(`<div class="space-y-4 max-w-md">`);
                                                    OptimizedImage($$renderer2, { src: "/vite.svg", alt: "Vite Logo", width: 200, height: 200 });
                                                    $$renderer2.push(`<!----> `);
                                                    OptimizedImage($$renderer2, {
                                                      src: "/svelte.svg",
                                                      alt: "Svelte Logo",
                                                      width: 150,
                                                      height: 150
                                                    });
                                                    $$renderer2.push(`<!----></div>`);
                                                  } else {
                                                    $$renderer2.push("<!--[!-->");
                                                    if (component.name === "Skeleton") {
                                                      $$renderer2.push("<!--[-->");
                                                      $$renderer2.push(`<div class="space-y-4 max-w-md">`);
                                                      Skeleton($$renderer2, {});
                                                      $$renderer2.push(`<!----> `);
                                                      Skeleton($$renderer2, { width: "200px", height: "100px" });
                                                      $$renderer2.push(`<!----> `);
                                                      Skeleton($$renderer2, { width: "40px", height: "40px" });
                                                      $$renderer2.push(`<!----> <div class="flex space-x-2">`);
                                                      Skeleton($$renderer2, { width: "32px", height: "32px" });
                                                      $$renderer2.push(`<!----> <div class="space-y-2 flex-1">`);
                                                      Skeleton($$renderer2, { width: "80%" });
                                                      $$renderer2.push(`<!----> `);
                                                      Skeleton($$renderer2, { width: "60%" });
                                                      $$renderer2.push(`<!----></div></div></div>`);
                                                    } else {
                                                      $$renderer2.push("<!--[!-->");
                                                      if (component.name === "Toast") {
                                                        $$renderer2.push("<!--[-->");
                                                        $$renderer2.push(`<div class="space-y-4 max-w-md">`);
                                                        Toast($$renderer2, { message: "This is an info toast" });
                                                        $$renderer2.push(`<!----> `);
                                                        Toast($$renderer2, { message: "Operation completed successfully!" });
                                                        $$renderer2.push(`<!----> `);
                                                        Toast($$renderer2, { message: "Please review your input" });
                                                        $$renderer2.push(`<!----> `);
                                                        Toast($$renderer2, { message: "An error occurred" });
                                                        $$renderer2.push(`<!----></div>`);
                                                      } else {
                                                        $$renderer2.push("<!--[!-->");
                                                        if (component.name === "Tooltip") {
                                                          $$renderer2.push("<!--[-->");
                                                          $$renderer2.push(`<div class="flex gap-4 items-center">`);
                                                          Tooltip($$renderer2, {
                                                            content: "This is a tooltip",
                                                            children: ($$renderer3) => {
                                                              Button($$renderer3, { text: "Hover me" });
                                                            },
                                                            $$slots: { default: true }
                                                          });
                                                          $$renderer2.push(`<!----> `);
                                                          Tooltip($$renderer2, {
                                                            content: "Top tooltip",
                                                            placement: "top",
                                                            children: ($$renderer3) => {
                                                              Button($$renderer3, { variant: "secondary", text: "Top" });
                                                            },
                                                            $$slots: { default: true }
                                                          });
                                                          $$renderer2.push(`<!----> `);
                                                          Tooltip($$renderer2, {
                                                            content: "Bottom tooltip",
                                                            placement: "bottom",
                                                            children: ($$renderer3) => {
                                                              Button($$renderer3, { variant: "ghost", text: "Bottom" });
                                                            },
                                                            $$slots: { default: true }
                                                          });
                                                          $$renderer2.push(`<!----></div>`);
                                                        } else {
                                                          $$renderer2.push("<!--[!-->");
                                                        }
                                                        $$renderer2.push(`<!--]-->`);
                                                      }
                                                      $$renderer2.push(`<!--]-->`);
                                                    }
                                                    $$renderer2.push(`<!--]-->`);
                                                  }
                                                  $$renderer2.push(`<!--]-->`);
                                                }
                                                $$renderer2.push(`<!--]-->`);
                                              }
                                              $$renderer2.push(`<!--]-->`);
                                            }
                                            $$renderer2.push(`<!--]-->`);
                                          }
                                          $$renderer2.push(`<!--]-->`);
                                        }
                                        $$renderer2.push(`<!--]-->`);
                                      }
                                      $$renderer2.push(`<!--]-->`);
                                    }
                                    $$renderer2.push(`<!--]-->`);
                                  }
                                  $$renderer2.push(`<!--]-->`);
                                }
                                $$renderer2.push(`<!--]-->`);
                              }
                              $$renderer2.push(`<!--]-->`);
                            }
                            $$renderer2.push(`<!--]-->`);
                          }
                          $$renderer2.push(`<!--]-->`);
                        }
                        $$renderer2.push(`<!--]-->`);
                      }
                      $$renderer2.push(`<!--]-->`);
                    }
                    $$renderer2.push(`<!--]-->`);
                  }
                  $$renderer2.push(`<!--]-->`);
                }
                $$renderer2.push(`<!--]-->`);
              }
              $$renderer2.push(`<!--]-->`);
            }
            $$renderer2.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
      }
      $$renderer.push(`<!--]--></div> <div class="mt-12"><h2 class="text-2xl font-bold text-text mb-6">Props</h2> <div class="overflow-x-auto"><table class="w-full border-collapse border border-border"><thead><tr class="bg-surface-level-1"><th class="border border-border px-4 py-2 text-left text-text font-semibold">Name</th><th class="border border-border px-4 py-2 text-left text-text font-semibold">Type</th><th class="border border-border px-4 py-2 text-left text-text font-semibold">Required</th><th class="border border-border px-4 py-2 text-left text-text font-semibold">Default</th><th class="border border-border px-4 py-2 text-left text-text font-semibold">Description</th></tr></thead><tbody><!--[-->`);
      const each_array_4 = ensure_array_like(component.props);
      for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
        let prop = each_array_4[$$index_3];
        $$renderer.push(`<tr><td class="border border-border px-4 py-2 text-text font-mono">${escape_html(prop.name)}</td><td class="border border-border px-4 py-2 text-text-secondary">${escape_html(prop.type)}</td><td class="border border-border px-4 py-2 text-text-secondary">${escape_html(prop.required ? "Yes" : "No")}</td><td class="border border-border px-4 py-2 text-text-secondary">${escape_html(prop.defaultValue || "-")}</td><td class="border border-border px-4 py-2 text-text-secondary">${escape_html(prop.description)}</td></tr>`);
      }
      $$renderer.push(`<!--]--></tbody></table></div></div></div>`);
    } else {
      $$renderer.push("<!--[!-->");
    }
    $$renderer.push(`<!--]-->`);
  }
  $$renderer.push(`<!--]--></div></main> <footer class="bg-surface-level-1 border-t border-border py-8"><div class="container mx-auto px-6"><div class="flex flex-col md:flex-row justify-between items-center gap-4"><div class="text-center md:text-left"><p class="text-text-secondary mb-2">Clean components that just work. Less is more.</p> <p class="text-sm text-text-secondary/80">© 2024 Zabi Components. MIT License.</p></div> <div class="flex gap-6"><a href="/docs" class="text-text-secondary hover:text-text transition-colors">Docs</a> <a href="/components" class="text-text-secondary hover:text-text transition-colors">Components</a> <a href="https://github.com" class="text-text-secondary hover:text-text transition-colors">GitHub</a></div></div></div></footer></div>`);
}
export {
  _page as default
};
