import { G as attributes, F as stringify, y as attr, z as attr_class, K as clsx, x as ensure_array_like, N as element, O as spread_props } from "./index.js";
import { e as escape_html } from "./context.js";
import { B as Button, h as html } from "./Card.js";
function Form($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      method = "post",
      action = "",
      className = "",
      onsubmit,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<form${attributes({
      method,
      action,
      class: `space-y-4 ${stringify(className)}`,
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></form>`);
  });
}
function Input($$renderer, $$props) {
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
      type = "text",
      name = "",
      label = "",
      placeholder = "",
      disabled = false,
      size = "md",
      variant = "default",
      oninput,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const inputId = generateId("input");
    const sizeClass = () => {
      return size === "sm" ? "px-3 py-1.5 text-sm" : size === "lg" ? "px-5 py-3 text-base" : "px-4 py-2 text-sm";
    };
    const variantClass = () => {
      return variant === "success" ? "border-green-300 focus:border-green-500 focus:ring-green-500" : variant === "warning" ? "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500" : variant === "error" ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500";
    };
    const inputClasses = () => {
      const baseClasses = "w-full rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled";
      return `${baseClasses} ${sizeClass()} ${variantClass()}`.trim();
    };
    const labelClasses = () => "block text-sm font-medium text-label mb-1";
    $$renderer2.push(`<div>`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", inputId)}${attr_class(clsx(labelClasses()))}>${escape_html(label)}</label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <input${attributes(
      {
        id: inputId,
        type,
        name,
        value,
        placeholder,
        disabled,
        class: clsx(inputClasses()),
        ...restProps
      },
      void 0,
      void 0,
      void 0,
      4
    )}/></div>`);
  });
}
function Textarea($$renderer, $$props) {
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
      name = "",
      label = "",
      placeholder = "",
      disabled = false,
      rows = 4,
      size = "md",
      variant = "default",
      oninput,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const textareaId = generateId("textarea");
    const sizeClass = () => {
      return size === "sm" ? "px-3 py-1.5 text-sm" : size === "lg" ? "px-5 py-3 text-base" : "px-4 py-2 text-sm";
    };
    const variantClass = () => {
      return variant === "success" ? "border-green-300 focus:border-green-500 focus:ring-green-500" : variant === "warning" ? "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500" : variant === "error" ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500";
    };
    const textareaClasses = () => {
      const baseClasses = "w-full rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-disabled resize-y";
      return `${baseClasses} ${sizeClass()} ${variantClass()}`.trim();
    };
    const labelClasses = () => "block text-sm font-medium text-label mb-1";
    $$renderer2.push(`<div>`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", textareaId)}${attr_class(clsx(labelClasses()))}>${escape_html(label)}</label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <textarea${attributes({
      id: textareaId,
      name,
      placeholder,
      disabled,
      rows,
      class: clsx(textareaClasses()),
      ...restProps
    })}>`);
    const $$body = escape_html(value);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div>`);
  });
}
function Checkbox($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    function generateId(prefix = "id") {
      if (typeof window !== "undefined") {
        return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
      } else {
        return `${prefix}-ssr-${Date.now()}`;
      }
    }
    let {
      checked = false,
      name = "",
      disabled = false,
      label = "",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const checkboxId = generateId("checkbox");
    const checkboxClasses = () => "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed";
    $$renderer2.push(`<div class="flex items-center gap-2"><input${attributes(
      {
        type: "checkbox",
        id: checkboxId,
        name,
        checked,
        disabled,
        class: clsx(checkboxClasses()),
        ...restProps
      },
      void 0,
      void 0,
      void 0,
      4
    )}/> `);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", checkboxId)} class="text-sm font-medium cursor-pointer text-label">${escape_html(label)}</label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function ContactForm($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { className = "", children, $$slots, $$events, ...restProps } = $$props;
    let formData = { name: "", email: "", message: "", subscribe: false };
    function handleFormSubmit(event) {
      const formData2 = new FormData(event.target);
      const data = {
        name: formData2.get("name") || "",
        email: formData2.get("email") || "",
        message: formData2.get("message") || "",
        subscribe: formData2.get("subscribe") === "on" || false
      };
      console.log("Form submitted with data:", data);
    }
    $$renderer2.push(`<div${attr_class(`max-w-md mx-auto ${stringify(className)}`)}><div class="mb-6"><h2 class="text-2xl font-bold text-headline mb-2">Get in Touch</h2> <p class="text-description">We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.</p></div> `);
    Form($$renderer2, {
      onsubmit: handleFormSubmit,
      className: "space-y-4",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="space-y-4">`);
        Input($$renderer3, {
          type: "text",
          name: "name",
          label: "Name",
          placeholder: "Enter your name",
          value: formData.name,
          oninput: (e) => formData.name = e.target.value
        });
        $$renderer3.push(`<!----> `);
        Input($$renderer3, {
          type: "email",
          name: "email",
          label: "Email",
          placeholder: "Enter your email",
          value: formData.email,
          oninput: (e) => formData.email = e.target.value
        });
        $$renderer3.push(`<!----> `);
        Textarea($$renderer3, {
          name: "message",
          label: "Message",
          placeholder: "Enter your message",
          rows: 4,
          value: formData.message,
          oninput: (e) => formData.message = e.target.value
        });
        $$renderer3.push(`<!----> `);
        Checkbox($$renderer3, {
          name: "subscribe",
          label: "Subscribe to updates",
          checked: formData.subscribe,
          onchange: (e) => formData.subscribe = e.target.checked
        });
        $$renderer3.push(`<!----></div> <div class="pt-4">`);
        Button($$renderer3, {
          type: "submit",
          variant: "primary",
          size: "md",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Send Message`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div>`);
  });
}
function FeatureCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      icon = "✨",
      title,
      description,
      className = "",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div${attributes({
        class: `p-6 rounded-lg bg-gray-100 border border-gray-300 hover:border-gray-400 hover:shadow-sm transition-colors duration-200 ${stringify(className)}`,
        ...restProps
      })}><div class="flex items-start gap-4"><div class="shrink-0 text-2xl" aria-hidden="true">${escape_html(icon)}</div> <div class="flex-1 min-w-0"><h3 class="text-lg font-semibold text-headline mb-2">${escape_html(title)}</h3> <p class="text-description leading-relaxed">${escape_html(description)}</p></div></div></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function ComponentDemo($$renderer, $$props) {
  let {
    title,
    description = "",
    code,
    language = "svelte",
    className = "",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$renderer.push(`<div${attributes({
    class: `component-demo bg-surface border border-border rounded-lg overflow-hidden ${stringify(className)}`,
    ...restProps
  })}><div class="px-6 py-4 border-b border-border bg-surface-secondary"><div class="flex items-center justify-between"><div><h3 class="text-lg font-semibold text-text">${escape_html(title)}</h3> `);
  if (description) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<p class="text-sm text-text-secondary mt-1">${escape_html(description)}</p>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div> <button class="flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text hover:bg-surface rounded-md transition-colors duration-200"${attr("aria-label", "Show code")}>`);
  {
    $$renderer.push("<!--[!-->");
    $$renderer.push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg> Code`);
  }
  $$renderer.push(`<!--]--></button></div></div> <div class="p-6">`);
  {
    $$renderer.push("<!--[!-->");
    $$renderer.push(`<div class="min-h-[100px] flex items-center justify-center">`);
    children?.($$renderer);
    $$renderer.push(`<!----></div>`);
  }
  $$renderer.push(`<!--]--></div></div>`);
}
function Alert($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      variant = "info",
      title = "",
      message = "",
      closable = false,
      className = "",
      onclick,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let alertClasses = {
      info: "bg-info-surface text-body border border-info",
      success: "bg-success-surface text-success border border-success",
      warning: "bg-warning-surface text-warning border border-warning",
      error: "bg-error-surface text-error border border-error"
    };
    let alertRole = variant === "success" || variant === "info" ? "status" : "alert";
    let iconSvg = {
      info: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>`,
      success: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>`,
      warning: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>`,
      error: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>`
    };
    $$renderer2.push(`<div${attributes({
      class: `relative rounded-md p-4 border ${stringify(alertClasses[variant])} transition-all duration-200 motion-reduce:transition-none ${stringify(className)}`,
      role: alertRole,
      "aria-live": variant === "success" || variant === "info" ? "polite" : "assertive",
      "aria-atomic": "true",
      ...restProps
    })}>`);
    if (closable) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full text-description hover:text-body transition-colors duration-200 motion-reduce:transition-none group focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2" aria-label="Dismiss alert" type="button"><svg class="w-4 h-4 text-current group-hover:scale-110 transition-transform duration-200 motion-reduce:transition-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class(`flex items-start gap-3 ${stringify(closable ? "pr-8" : "")}`)}><div class="shrink-0 mt-0.5">${html(iconSvg[variant])}</div> <div class="flex-1 min-w-0">`);
    if (title) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<h4 class="font-semibold text-sm mb-1 text-headline">${escape_html(title)}</h4>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (message) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-sm leading-relaxed text-body">${escape_html(message)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div></div></div>`);
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
function Check($$renderer, $$props) {
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
    const iconNode = [["path", { "d": "M20 6 9 17l-5-5" }]];
    Icon($$renderer2, spread_props([
      { name: "check" },
      /**
       * @component @name Check
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjAgNiA5IDE3bC01LTUiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/check
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
function Info($$renderer, $$props) {
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
      ["circle", { "cx": "12", "cy": "12", "r": "10" }],
      ["path", { "d": "M12 16v-4" }],
      ["path", { "d": "M12 8h.01" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "info" },
      /**
       * @component @name Info
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8cGF0aCBkPSJNMTIgMTZ2LTQiIC8+CiAgPHBhdGggZD0iTTEyIDhoLjAxIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/info
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
function Triangle_alert($$renderer, $$props) {
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
        "path",
        {
          "d": "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
        }
      ],
      ["path", { "d": "M12 9v4" }],
      ["path", { "d": "M12 17h.01" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "triangle-alert" },
      /**
       * @component @name TriangleAlert
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMjEuNzMgMTgtOC0xNGEyIDIgMCAwIDAtMy40OCAwbC04IDE0QTIgMiAwIDAgMCA0IDIxaDE2YTIgMiAwIDAgMCAxLjczLTMiIC8+CiAgPHBhdGggZD0iTTEyIDl2NCIgLz4KICA8cGF0aCBkPSJNMTIgMTdoLjAxIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/triangle-alert
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
function X($$renderer, $$props) {
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
      ["path", { "d": "M18 6 6 18" }],
      ["path", { "d": "m6 6 12 12" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "x" },
      /**
       * @component @name X
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTggNiA2IDE4IiAvPgogIDxwYXRoIGQ9Im02IDYgMTIgMTIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/x
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
function Badge($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { variant = "default", size = "md", text = "", showIcon = true } = $$props;
    const classes = () => {
      const baseClasses = "inline-flex items-center font-medium border rounded-md";
      const sizeClass = size === "sm" ? "px-2 py-0.5 text-xs" : size === "lg" ? "px-4 py-2 text-base" : "px-3 py-1 text-sm";
      const variantClass = variant === "success" ? "bg-surface-secondary border-secondary text-success" : variant === "warning" ? "bg-surface-secondary border-secondary text-warning" : variant === "error" ? "bg-surface-secondary border-secondary text-error" : variant === "info" ? "bg-surface-secondary border-secondary text-body" : "bg-surface-secondary border-secondary text-body";
      return `${baseClasses} ${sizeClass} ${variantClass}`.trim();
    };
    const iconSize = () => {
      return size === "sm" ? 12 : size === "lg" ? 20 : 16;
    };
    const iconSpacingClass = () => {
      return size === "sm" ? "mr-1" : size === "lg" ? "mr-2" : "mr-1.5";
    };
    $$renderer2.push(`<span${attr_class(clsx(classes()))}>`);
    if (showIcon) {
      $$renderer2.push("<!--[-->");
      if (variant === "success") {
        $$renderer2.push("<!--[-->");
        Check($$renderer2, { size: iconSize(), class: iconSpacingClass() });
      } else {
        $$renderer2.push("<!--[!-->");
        if (variant === "warning") {
          $$renderer2.push("<!--[-->");
          Triangle_alert($$renderer2, { size: iconSize(), class: iconSpacingClass() });
        } else {
          $$renderer2.push("<!--[!-->");
          if (variant === "error") {
            $$renderer2.push("<!--[-->");
            X($$renderer2, { size: iconSize(), class: iconSpacingClass() });
          } else {
            $$renderer2.push("<!--[!-->");
            if (variant === "info") {
              $$renderer2.push("<!--[-->");
              Info($$renderer2, { size: iconSize(), class: iconSpacingClass() });
            } else {
              $$renderer2.push("<!--[!-->");
              Info($$renderer2, { size: iconSize(), class: iconSpacingClass() });
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> ${escape_html(text)}</span>`);
  });
}
export {
  Alert as A,
  Badge as B,
  ComponentDemo as C,
  FeatureCard as F,
  Input as I,
  Textarea as T,
  ContactForm as a,
  Form as b,
  Checkbox as c
};
