import { $ as spread_props, Z as stringify, Y as attr, X as attr_class, a0 as clsx, a1 as attributes, _ as ensure_array_like, a2 as bind_props, a3 as attr_style, U as head } from "../../../../chunks/index2.js";
import { h as html, I as IconButton, H as Heart, C as CodeBlock, a as Heading } from "../../../../chunks/Heading.js";
import { C as Card, a as CardHeader, b as CardContent, B as Button } from "../../../../chunks/CardHeader.js";
import { g as generateId, d as Circle_alert, e as Circle_check_big, I as Input, f as Search, h as docsListItems, a as Circle, b as Circle_check, S as SidebarNavigation, s as sidebarNavItems, i as sidebarProjectItems, j as selectOptions, k as sampleCode } from "../../../../chunks/components-showcase-constants.js";
import { T as Triangle_alert, X, B as Badge } from "../../../../chunks/Badge.js";
import { a as ssr_context, e as escape_html, g as getContext, s as setContext } from "../../../../chunks/context.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { T as TopNavbar } from "../../../../chunks/TopNavbar.js";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
function Arrow_right($$renderer, $$props) {
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
      ["path", { "d": "M5 12h14" }],
      ["path", { "d": "m12 5 7 7-7 7" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "arrow-right" },
      /**
       * @component @name ArrowRight
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNSAxMmgxNCIgLz4KICA8cGF0aCBkPSJtMTIgNSA3IDctNyA3IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/arrow-right
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
function Chevron_down($$renderer, $$props) {
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
    const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
    Icon($$renderer2, spread_props([
      { name: "chevron-down" },
      /**
       * @component @name ChevronDown
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtNiA5IDYgNiA2LTYiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/chevron-down
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
function Circle_question_mark($$renderer, $$props) {
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
      ["path", { "d": "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }],
      ["path", { "d": "M12 17h.01" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "circle-question-mark" },
      /**
       * @component @name CircleQuestionMark
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8cGF0aCBkPSJNOS4wOSA5YTMgMyAwIDAgMSA1LjgzIDFjMCAyLTMgMy0zIDMiIC8+CiAgPHBhdGggZD0iTTEyIDE3aC4wMSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/circle-question-mark
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
  $$renderer.push(`<div class="relative">`);
  Card($$renderer, spread_props([
    {
      size: "lg",
      fullWidth: true,
      className: `overflow-hidden ${stringify(className)}`
    },
    restProps,
    {
      children: ($$renderer2) => {
        CardHeader($$renderer2, { title, description });
        $$renderer2.push(`<!----> `);
        CardContent($$renderer2, {
          children: ($$renderer3) => {
            $$renderer3.push(`<button class="absolute top-8 right-8 z-10 flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm text-description transition-colors duration-200 hover:bg-base-50 hover:text-body"${attr("aria-label", "Show code")}>`);
            {
              $$renderer3.push("<!--[!-->");
              $$renderer3.push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg> Code`);
            }
            $$renderer3.push(`<!--]--></button> `);
            {
              $$renderer3.push("<!--[!-->");
              $$renderer3.push(`<div class="min-h-[100px] flex items-center justify-center w-full">`);
              children?.($$renderer3);
              $$renderer3.push(`<!----></div>`);
            }
            $$renderer3.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
        $$renderer2.push(`<!---->`);
      },
      $$slots: { default: true }
    }
  ]));
  $$renderer.push(`<!----></div>`);
}
function Textarea($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = "",
      name = "",
      label = "",
      placeholder = "",
      required = false,
      disabled = false,
      rows = 4,
      variant = "default",
      message = "",
      oninput,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const textareaId = generateId("textarea");
    const variantClass = () => {
      return variant === "success" ? "border-success focus:border-success focus:ring-success" : variant === "warning" ? "border-warning focus:border-warning focus:ring-warning" : variant === "error" ? "border-error focus:border-error focus:ring-error" : "border-input-border focus:ring-2 focus:ring-brand-500";
    };
    const textareaClasses = () => {
      const baseClasses = "w-full border bg-input hover:bg-input-hover focus:bg-input-focus disabled:bg-input-disabled rounded-lg transition-all duration-200 placeholder:text-description text-body focus:outline-none focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed resize-y px-4 py-2.5 text-base leading-6";
      return `${baseClasses} ${variantClass()}`.trim();
    };
    const labelClasses = () => "block text-sm font-medium text-label mb-1";
    const messageClasses = () => {
      if (variant === "error") {
        return "text-error text-sm mt-1 flex items-center gap-1.5";
      } else if (variant === "success") {
        return "text-success text-sm mt-1 flex items-center gap-1.5";
      } else if (variant === "warning") {
        return "text-warning text-sm mt-1 flex items-center gap-1.5";
      }
      return "text-description text-sm mt-1 flex items-center gap-1.5";
    };
    const getIcon = () => {
      if (variant === "error") return Circle_alert;
      if (variant === "success") return Circle_check_big;
      if (variant === "warning") return Triangle_alert;
      return null;
    };
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
      required,
      disabled,
      rows,
      class: clsx(textareaClasses()),
      "aria-invalid": variant === "error" ? "true" : void 0,
      "aria-required": required ? "true" : void 0,
      "aria-describedby": message ? `${textareaId}-message` : void 0,
      ...restProps
    })}>`);
    const $$body = escape_html(value);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea> `);
    if (message && variant !== "default") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p${attr("id", `${textareaId}-message`)}${attr_class(clsx(messageClasses()))}${attr("role", variant === "error" ? "alert" : "status")}${attr("aria-live", variant === "error" ? "assertive" : "polite")}>`);
      if (getIcon()) {
        $$renderer2.push("<!--[-->");
        const Icon2 = getIcon();
        $$renderer2.push(`<!---->`);
        Icon2($$renderer2, { size: 14, class: "shrink-0" });
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <span>${escape_html(message)}</span></p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
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
    const visualVariant = variant === "default" ? "info" : variant;
    let alertClasses = {
      info: "text-info border border-info",
      success: "text-success border border-success",
      warning: "text-warning border border-warning",
      error: "text-error border border-error",
      neutral: "text-neutral border border-neutral",
      energetic: "text-energetic border border-energetic"
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
        </svg>`,
      neutral: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM10 9a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
        </svg>`,
      energetic: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3L4 14h6l-1 7 7-11h-6l1-7z" />
        </svg>`
    };
    $$renderer2.push(`<div${attributes({
      class: `relative rounded-md p-4 border ${stringify(alertClasses[visualVariant])} transition-all duration-200 motion-reduce:transition-none ${stringify(className)}`,
      role: alertRole,
      "aria-live": visualVariant === "success" || visualVariant === "info" ? "polite" : "assertive",
      "aria-atomic": "true",
      ...restProps
    })}>`);
    if (closable) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="group absolute right-2 top-2 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-description transition-colors duration-200 hover:text-body motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2" aria-label="Dismiss alert" type="button"><svg class="w-4 h-4 text-current group-hover:scale-110 transition-transform duration-200 motion-reduce:transition-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class(`flex items-start gap-3 ${stringify(closable ? "pr-8" : "")}`)}><div class="shrink-0 mt-0.5">${html(iconSvg[visualVariant])}</div> <div class="flex-1 min-w-0">`);
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
function Checkbox($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      checked = false,
      name = "",
      disabled = false,
      label = "",
      onchange,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const checkboxId = generateId("checkbox");
    const checkboxContainerClasses = () => {
      const baseClasses = "relative inline-flex items-center justify-center w-5 h-5 rounded transition-all duration-200";
      if (disabled) {
        return `${baseClasses} opacity-50 cursor-not-allowed`;
      }
      return `${baseClasses} cursor-pointer`;
    };
    const checkboxBoxClasses = () => {
      if (checked) {
        return disabled ? "border-0 opacity-50 bg-brand-500" : "border-0 bg-brand-500";
      }
      return disabled ? "border-2 border-base-400 bg-transparent" : "border-2 border-base-400 bg-transparent";
    };
    $$renderer2.push(`<div class="flex items-center gap-2"><label${attr("for", checkboxId)}${attr_class(`flex items-center gap-2 cursor-pointer ${stringify(disabled ? "opacity-50 cursor-not-allowed" : "")}`)}><div${attr_class(clsx(checkboxContainerClasses()))}><input${attributes(
      {
        type: "checkbox",
        id: checkboxId,
        name,
        checked,
        disabled,
        class: "sr-only",
        ...restProps
      },
      void 0,
      void 0,
      void 0,
      4
    )}/> <div${attr_class(`absolute inset-0 ${stringify(checkboxBoxClasses())} rounded`)}></div> `);
    if (checked) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<svg class="absolute w-3 h-3 text-base-50 pointer-events-none z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-sm font-medium text-label">${escape_html(label)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></label></div>`);
  });
}
function Dropdown($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      isOpen = false,
      placement = "bottom-start",
      ariaLabel = "Menu",
      selectedValue = null,
      options = [],
      onOptionClick,
      children,
      trigger,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const dropdownId = generateId("dropdown");
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
            bg-input
            rounded-lg
            shadow-lg
            border
            border-input-border
            py-2
            transition-all
            duration-200
            ease-in-out
            ${transformClasses()}
        `.trim().replace(/\s+/g, " ");
    };
    $$renderer2.push(`<div${attributes({
      class: "relative inline-block",
      "data-placement": placement,
      ...restProps
    })}><div>`);
    trigger?.($$renderer2);
    $$renderer2.push(`<!----></div> `);
    if (isOpen) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr("id", dropdownId)}${attr_class(clsx(dropdownContentClasses()))} role="menu"${attr("aria-label", ariaLabel)} tabindex="-1">`);
      if (options.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="px-2 py-2"><!--[-->`);
        const each_array = ensure_array_like(options);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let option = each_array[$$index];
          const buttonRestProps = { "data-value": String(option.value) };
          $$renderer2.push(`<div class="w-full my-0.5">`);
          Button($$renderer2, spread_props([
            {
              variant: selectedValue === option.value ? "outline" : "ghost",
              size: "sm",
              isFullWidth: true,
              disabled: option.disabled,
              onclick: () => onOptionClick?.(option.value)
            },
            buttonRestProps,
            {
              children: ($$renderer3) => {
                $$renderer3.push(`<!---->${escape_html(option.label)}`);
              },
              $$slots: { default: true }
            }
          ]));
          $$renderer2.push(`<!----></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (children) {
          $$renderer2.push("<!--[-->");
          children?.($$renderer2);
          $$renderer2.push(`<!---->`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function Select($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = void 0,
      options = [],
      searchable = true,
      searchPlaceholder = "Search options",
      maxMenuHeight = "60vh",
      menuWidth = "100%",
      noResultsText = "No results found",
      isLoading = false,
      loadingText = "Loading options...",
      emptyStateTitle = "No options available",
      emptyStateDescription = "Add an option to start making selections.",
      emptyStateActionLabel = "",
      placeholder = "Select an option",
      label = "",
      required = false,
      disabled = false,
      size = "md",
      variant = "default",
      message = "",
      onchange,
      onEmptyStateAction,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let isOpen = false;
    let searchQuery = "";
    const sizeClass = () => {
      if (size === "sm") {
        return { padding: "px-4 py-2", text: "text-sm", leading: "leading-5" };
      } else if (size === "lg") {
        return {
          padding: "px-4 py-3",
          text: "text-base",
          leading: "leading-6"
        };
      } else {
        return {
          padding: "px-4 py-2.5",
          text: "text-base",
          leading: "leading-6"
        };
      }
    };
    const variantClass = () => {
      return variant === "success" ? "border-success focus:border-success focus:ring-success" : variant === "warning" ? "border-warning focus:border-warning focus:ring-warning" : variant === "error" ? "border-error focus:border-error focus:ring-error" : "border-input-border focus:ring-2 focus:ring-brand-500";
    };
    const triggerClasses = () => {
      const sizeStyles = sizeClass();
      const baseClasses = "flex w-full cursor-pointer items-center justify-between rounded-lg border bg-input text-body transition-all duration-200 hover:bg-input-hover focus:bg-input-focus focus:outline-none focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-input-disabled disabled:opacity-50";
      return `${baseClasses} ${sizeStyles.padding} ${sizeStyles.text} ${sizeStyles.leading} ${variantClass()}`.trim();
    };
    const labelClasses = () => "block text-sm font-medium text-label mb-1";
    const messageClasses = () => {
      if (variant === "error") {
        return "text-error text-sm mt-1 flex items-center gap-1.5 w-full";
      } else if (variant === "success") {
        return "text-success text-sm mt-1 flex items-center gap-1.5 w-full";
      } else if (variant === "warning") {
        return "text-warning text-sm mt-1 flex items-center gap-1.5 w-full";
      }
      return "text-description text-sm mt-1 flex items-center gap-1.5 w-full";
    };
    const getIcon = () => {
      if (variant === "error") return Circle_alert;
      if (variant === "success") return Circle_check_big;
      if (variant === "warning") return Triangle_alert;
      return null;
    };
    const selectId = generateId("select");
    const isEmpty = () => {
      return value === void 0 || value === null || value === "";
    };
    const normalizedOptions = () => {
      const fallbackOptions = restProps.options;
      return Array.from(options ?? fallbackOptions ?? []);
    };
    const hasSearchQuery = () => {
      return searchQuery.trim().length > 0;
    };
    const filteredOptions = () => {
      const query = searchQuery.trim().toLowerCase();
      const availableOptions = normalizedOptions();
      if (!searchable || query.length === 0) {
        return availableOptions;
      }
      return availableOptions.filter((option) => option.label.toLowerCase().includes(query));
    };
    function handleOptionClick(optionValue) {
      if (disabled || isLoading) return;
      value = optionValue;
      isOpen = false;
      if (onchange) {
        const syntheticEvent = new Event("change", { bubbles: true });
        Object.defineProperty(syntheticEvent, "target", { value: { value: optionValue }, enumerable: true });
        onchange(syntheticEvent);
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="w-full select-container">`);
      if (label) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<label${attr("for", selectId)}${attr_class(clsx(labelClasses()))}>${escape_html(label)}</label>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      {
        let trigger = function($$renderer4) {
          $$renderer4.push(`<button type="button"${attr("id", selectId)}${attr_class(clsx(triggerClasses()))}${attr("disabled", disabled, true)} aria-haspopup="listbox"${attr("aria-expanded", isOpen)}${attr("aria-describedby", message ? `${selectId}-message` : void 0)}><span${attr_class(`text-left flex-1 truncate ${stringify(isLoading ? "text-description" : isEmpty() ? "text-description" : "text-body")}`)}>`);
          if (isLoading) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`${escape_html(loadingText)}`);
          } else {
            $$renderer4.push("<!--[!-->");
            $$renderer4.push(`${escape_html(isEmpty() ? placeholder : options.find((opt) => opt.value === value)?.label || placeholder)}`);
          }
          $$renderer4.push(`<!--]--></span> `);
          Chevron_down($$renderer4, {
            size: 20,
            class: `text-description transition-transform duration-200 ${stringify(isOpen ? "rotate-180" : "")}`
          });
          $$renderer4.push(`<!----></button>`);
        }, children = function($$renderer4) {
          $$renderer4.push(`<div class="px-2 pb-2 pt-1"${attr_style("", { width: menuWidth })}>`);
          if (searchable && !isLoading) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<div class="px-1 pb-2">`);
            Input($$renderer4, {
              type: "text",
              size: "sm",
              class: "min-w-0",
              placeholder: searchPlaceholder,
              "aria-label": searchPlaceholder,
              disabled,
              get value() {
                return searchQuery;
              },
              set value($$value) {
                searchQuery = $$value;
                $$settled = false;
              }
            });
            $$renderer4.push(`<!----></div>`);
          } else {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]--> <div class="overflow-y-auto px-1"${attr_style("", { "max-height": maxMenuHeight })}>`);
          if (isLoading) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<div class="space-y-2 px-2 py-2" role="status" aria-live="polite"><div class="h-8 w-full animate-pulse rounded-md bg-base-200"></div> <div class="h-8 w-full animate-pulse rounded-md bg-base-200"></div> <p class="text-xs text-description">${escape_html(loadingText)}</p></div>`);
          } else {
            $$renderer4.push("<!--[!-->");
            if (filteredOptions().length > 0) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<!--[-->`);
              const each_array = ensure_array_like(filteredOptions());
              for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                let option = each_array[$$index];
                const buttonRestProps = { "data-value": String(option.value) };
                $$renderer4.push(`<div class="w-full my-0.5">`);
                Button($$renderer4, spread_props([
                  {
                    variant: value === option.value ? "outline" : "ghost",
                    size: "sm",
                    isFullWidth: true,
                    disabled: option.disabled,
                    onclick: () => handleOptionClick(option.value)
                  },
                  buttonRestProps,
                  {
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->${escape_html(option.label)}`);
                    },
                    $$slots: { default: true }
                  }
                ]));
                $$renderer4.push(`<!----></div>`);
              }
              $$renderer4.push(`<!--]-->`);
            } else {
              $$renderer4.push("<!--[!-->");
              if (hasSearchQuery()) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<div class="px-3 py-2 text-sm text-description">${escape_html(noResultsText)}</div>`);
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push(`<div class="rounded-md border border-border bg-base-50 px-3 py-3 text-sm"><p class="font-medium text-headline">${escape_html(emptyStateTitle)}</p> <p class="mt-1 text-description">${escape_html(emptyStateDescription)}</p> `);
                if (emptyStateActionLabel && onEmptyStateAction) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<button type="button" class="mt-3 inline-flex min-h-11 cursor-pointer items-center rounded-lg bg-action-primary px-3 py-2 text-sm text-action-primary">${escape_html(emptyStateActionLabel)}</button>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--></div>`);
              }
              $$renderer4.push(`<!--]-->`);
            }
            $$renderer4.push(`<!--]-->`);
          }
          $$renderer4.push(`<!--]--></div></div>`);
        };
        Dropdown($$renderer3, {
          isOpen,
          placement: "bottom-start",
          selectedValue: value,
          onOptionClick: handleOptionClick,
          ariaLabel: "Select options",
          trigger,
          children,
          $$slots: { trigger: true, default: true }
        });
      }
      $$renderer3.push(`<!----> `);
      if (message && variant !== "default") {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<p${attr("id", `${selectId}-message`)}${attr_class(clsx(messageClasses()))}${attr("role", variant === "error" ? "alert" : "status")}${attr("aria-live", variant === "error" ? "assertive" : "polite")}>`);
        if (getIcon()) {
          $$renderer3.push("<!--[-->");
          const Icon2 = getIcon();
          $$renderer3.push(`<!---->`);
          Icon2($$renderer3, { size: 14, class: "shrink-0" });
          $$renderer3.push(`<!---->`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> <span>${escape_html(message)}</span></p>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { value });
  });
}
function CardFooter($$renderer, $$props) {
  let { className = "", children, $$slots, $$events, ...restProps } = $$props;
  $$renderer.push(`<footer${attributes({
    class: `flex items-center p-6 pt-0 ${stringify(className)}`,
    ...restProps
  })}>`);
  if (children) {
    $$renderer.push("<!--[-->");
    children($$renderer);
    $$renderer.push(`<!---->`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></footer>`);
}
function Modal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      isOpen = false,
      title = "",
      description = "",
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
      $$renderer2.push(`<div class="fixed inset-0 z-modal flex cursor-pointer items-end justify-center bg-overlay p-0 md:items-center md:p-4" role="dialog" aria-modal="true"${attr("aria-labelledby", title ? "modal-title" : void 0)} tabindex="-1"><div${attr_class(`flex max-h-[90vh] min-w-[320px] cursor-default flex-col overflow-y-auto rounded-t-3xl bg-card p-0 shadow-xl animate-[slideUp_0.3s_ease-out] md:animate-none md:rounded-3xl ${stringify(sizeClasses)}`)}>`);
      Card($$renderer2, {
        variant: "default",
        fullWidth: false,
        children: ($$renderer3) => {
          if (title || description) {
            $$renderer3.push("<!--[-->");
            CardHeader($$renderer3, {
              description,
              className: "px-6 pt-6 pb-4",
              children: ($$renderer4) => {
                if (title) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<div class="flex items-center justify-between"><h2 id="modal-title" class="text-2xl font-normal leading-8 text-headline tracking-normal">${escape_html(title)}</h2> <button type="button" class="text-description hover:text-headline text-2xl cursor-pointer transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-base-100" aria-label="Close">×</button></div>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]-->`);
              },
              $$slots: { default: true }
            });
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> `);
          if (children) {
            $$renderer3.push("<!--[-->");
            CardContent($$renderer3, {
              className: "flex-1",
              children: ($$renderer4) => {
                children?.($$renderer4);
                $$renderer4.push(`<!---->`);
              },
              $$slots: { default: true }
            });
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> `);
          if (footer) {
            $$renderer3.push("<!--[-->");
            CardFooter($$renderer3, {
              className: "flex justify-end gap-3 pt-4",
              children: ($$renderer4) => {
                footer?.($$renderer4);
                $$renderer4.push(`<!---->`);
              },
              $$slots: { default: true }
            });
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Tabs($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    function createId(prefix) {
      if (typeof window !== "undefined") {
        return `${prefix}-${Math.random().toString(36).slice(2, 11)}`;
      }
      return `${prefix}-ssr-${Date.now()}`;
    }
    let {
      tabs = [],
      activeTab = "",
      variant = "default",
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const tabsBaseId = createId("tabs");
    function getTabId(tabId) {
      return `${tabsBaseId}-tab-${tabId}`;
    }
    function getPanelId(tabId) {
      return `${tabsBaseId}-panel-${tabId}`;
    }
    $$renderer2.push(`<div class="tabs-container"><div class="flex border-b border-base-200" role="tablist" tabindex="0"><!--[-->`);
    const each_array = ensure_array_like(tabs);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button type="button" role="tab"${attr("id", getTabId(tab.id))}${attr_class(`cursor-pointer border-b-2 px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed ${stringify(activeTab === tab.id ? variant === "pills" ? "border-brand-500 bg-brand-100 text-brand-700" : "border-brand-500 text-body" : "border-transparent text-description hover:border-base-300 hover:text-body")}`)}${attr("disabled", tab.disabled, true)}${attr("aria-selected", activeTab === tab.id)}${attr("aria-controls", getPanelId(tab.id))}${attr("tabindex", activeTab === tab.id ? 0 : -1)}>${escape_html(tab.label)}</button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-4" role="tabpanel"${attr("id", getPanelId(activeTab))}${attr("aria-labelledby", getTabId(activeTab))}>`);
    children?.($$renderer2, { activeTab });
    $$renderer2.push(`<!----></div></div>`);
  });
}
function ColorPicker($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
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
    let isOpen = false;
    function isValidHex(hex) {
      const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      return hexPattern.test(hex);
    }
    function hexToHsl(hex) {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      let s = 0;
      const l = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
            break;
          case g:
            h = ((b - r) / d + 2) / 6;
            break;
          case b:
            h = ((r - g) / d + 4) / 6;
            break;
        }
      }
      return [
        Math.round(h * 360),
        Math.round(s * 100),
        Math.round(l * 100)
      ];
    }
    function updateFromHex(hex) {
      if (isValidHex(hex)) {
        hexToHsl(hex);
      }
    }
    const variant = value && !isValidHex(value) ? "error" : "default";
    const message = value && !isValidHex(value) ? "Please enter a valid hex color (e.g., #ff0000 or #f00)" : "";
    function handleInput(event) {
      if (onchange) onchange(event);
      updateFromHex(value);
    }
    function normalizeHexValue(rawValue) {
      let hexValue = rawValue.trim();
      if (hexValue && !hexValue.startsWith("#")) {
        hexValue = "#" + hexValue;
      }
      return hexValue;
    }
    function commitCurrentValue(event) {
      const normalizedHex = normalizeHexValue(value);
      if (normalizedHex === "" || isValidHex(normalizedHex)) {
        value = normalizedHex;
        updateFromHex(normalizedHex);
        if (onchange) onchange(event);
      }
    }
    function handleBlur(event) {
      commitCurrentValue(event);
    }
    function handleColorMapDrag(event) {
    }
    function handleMouseUp() {
    }
    function handleClickOutside(event) {
    }
    onDestroy(() => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleColorMapDrag);
    });
    const displayColor = value && isValidHex(value) ? value : placeholder;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div${attributes({ ...restProps })}><div class="flex items-start gap-2"><div class="flex-1">`);
      Input($$renderer3, {
        label,
        placeholder,
        disabled,
        variant,
        message,
        oninput: handleInput,
        onblur: handleBlur,
        "aria-label": "Hex color input",
        get value() {
          return value;
        },
        set value($$value) {
          value = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div class="relative shrink-0 mt-6"><button type="button"${attr("disabled", disabled, true)} class="w-11 h-11 rounded-lg border-2 border-card shrink-0 cursor-pointer hover:ring-2 hover:ring-brand-500 transition-colors disabled:cursor-not-allowed disabled:opacity-50"${attr_style(`background-color: ${stringify(displayColor)};`)} aria-label="Open color picker"${attr("aria-expanded", isOpen)}></button> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div></div></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
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
        class: `p-6 rounded-lg bg-base-100 border border-base-300 hover:border-base-400 hover:shadow-sm transition-colors duration-200 ${stringify(className)}`,
        ...restProps
      })}><div class="flex items-start gap-4"><div class="shrink-0 text-2xl" aria-hidden="true">${escape_html(icon)}</div> <div class="flex-1 min-w-0"><h3 class="text-lg font-semibold text-headline mb-2">${escape_html(title)}</h3> <p class="text-description leading-relaxed">${escape_html(description)}</p></div></div></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function ListItem($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      item,
      selected = false,
      showArrow = true,
      onclick,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const itemClasses = (() => {
      const baseClasses = "group flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-inset";
      const interactiveClasses = item.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:ring-1 hover:ring-focus focus-visible:bg-base-100";
      const selectedClasses = selected ? "bg-action-primary-subtle border-brand-500" : "";
      return `${baseClasses} ${interactiveClasses} ${selectedClasses}`.trim();
    })();
    const ariaCurrent = item.href && selected ? "page" : void 0;
    const rel = (() => {
      if (item.rel) {
        return item.rel;
      }
      if (item.target === "_blank") {
        return "noopener noreferrer";
      }
      return void 0;
    })();
    if (item.href) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<a${attributes({
        href: item.href,
        target: item.target,
        rel,
        "aria-current": ariaCurrent,
        "aria-disabled": item.disabled ? "true" : void 0,
        tabindex: item.disabled ? -1 : void 0,
        class: clsx(itemClasses),
        ...restProps
      })}>`);
      if (item.icon) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="flex size-5 shrink-0 items-center justify-center text-description" aria-hidden="true"><!---->`);
        item.icon($$renderer2, { size: 16 });
        $$renderer2.push(`<!----></span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <span class="min-w-0 flex-1"><span class="block text-sm font-medium text-headline">${escape_html(item.label)}</span> `);
      if (item.description) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="mt-0.5 block text-sm text-description">${escape_html(item.description)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></span> `);
      if (showArrow) {
        $$renderer2.push("<!--[-->");
        Arrow_right($$renderer2, {
          size: 16,
          class: "shrink-0 text-description transition-transform duration-150 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5",
          "aria-hidden": "true"
        });
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></a>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button${attributes({
        type: "button",
        class: clsx(itemClasses),
        disabled: item.disabled,
        ...restProps
      })}>`);
      if (item.icon) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="flex size-5 shrink-0 items-center justify-center text-description" aria-hidden="true"><!---->`);
        item.icon($$renderer2, { size: 16 });
        $$renderer2.push(`<!----></span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <span class="min-w-0 flex-1"><span class="block text-sm font-medium text-headline">${escape_html(item.label)}</span> `);
      if (item.description) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="mt-0.5 block text-sm text-description">${escape_html(item.description)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></span> `);
      if (showArrow) {
        $$renderer2.push("<!--[-->");
        Arrow_right($$renderer2, {
          size: 16,
          class: "shrink-0 text-description transition-transform duration-150 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5",
          "aria-hidden": "true"
        });
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function List($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      items,
      ariaLabel = "List items",
      selectedId = "",
      showArrow = true,
      className = "",
      onclick,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const listClasses = `space-y-1 overflow-hidden rounded-xl border border-border bg-surface p-1 ${className}`.trim();
    $$renderer2.push(`<ul${attributes({
      class: clsx(listClasses),
      role: "list",
      "aria-label": ariaLabel,
      ...restProps
    })}><!--[-->`);
    const each_array = ensure_array_like(items);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<li>`);
      ListItem($$renderer2, { item, selected: item.id === selectedId, showArrow, onclick });
      $$renderer2.push(`<!----></li>`);
    }
    $$renderer2.push(`<!--]--></ul>`);
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
    "aria-label": ariaLabel = "Loading...",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const classes = `animate-pulse bg-action-secondary rounded${className ? ` ${className}` : ""}`;
  const styles = `width: ${width}; height: ${height};`;
  $$renderer.push(`<div${attributes({
    class: clsx(classes),
    style: styles,
    "aria-busy": "true",
    "aria-label": ariaLabel,
    role: "status",
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
        $$renderer2.push(`<button type="button" class="ml-3 cursor-pointer text-base-400 hover:text-base-600" aria-label="Close notification">×</button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Tooltip($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
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
    const triggerId = generateId("tooltip-trigger");
    const tooltipId = generateId("tooltip");
    let isVisible = false;
    $$renderer2.push(`<div${attributes(
      {
        class: "tooltip-container relative inline-block",
        "data-placement": placement,
        "data-disabled": disabled,
        ...restProps
      },
      "svelte-13nzt82"
    )}><div${attr("id", triggerId)}${attr("aria-describedby", void 0)}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div> `);
    if (content && !disabled) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr("id", tooltipId)} class="tooltip svelte-13nzt82" role="tooltip"${attr("aria-hidden", !isVisible)}${attr("data-visible", isVisible)}${attr("data-placement", placement)}>${escape_html(content)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
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
function ContactForm($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { className = "", onsubmit } = $$props;
    let formData = { name: "", email: "", message: "", subscribe: false };
    let fieldErrors = {};
    let formErrorMessage = "";
    function validate(data) {
      const nextErrors = {};
      if (!data.name.trim()) {
        nextErrors.name = "Please enter your name.";
      }
      if (!data.email.trim()) {
        nextErrors.email = "Please enter your email address.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        nextErrors.email = "Please enter a valid email address.";
      }
      if (!(data.message || "").trim()) {
        nextErrors.message = "Please enter a message.";
      }
      fieldErrors = nextErrors;
      return Object.keys(nextErrors).length === 0;
    }
    function handleFormSubmit(event) {
      const submittedFormData = new FormData(event.target);
      const data = {
        name: submittedFormData.get("name") || "",
        email: submittedFormData.get("email") || "",
        message: submittedFormData.get("message") || "",
        subscribe: submittedFormData.get("subscribe") === "on" || false
      };
      if (!validate(data)) {
        formErrorMessage = "We could not submit your request. Fix the highlighted fields and try again.";
        return;
      }
      formErrorMessage = "";
      if (onsubmit) {
        onsubmit(event);
      }
    }
    $$renderer2.push(`<div${attr_class(clsx(className))}>`);
    Card($$renderer2, {
      size: "md",
      fullWidth: true,
      children: ($$renderer3) => {
        CardHeader($$renderer3, { title: "Get in Touch" });
        $$renderer3.push(`<!----> `);
        CardContent($$renderer3, {
          children: ($$renderer4) => {
            Form($$renderer4, {
              onsubmit: handleFormSubmit,
              className: "space-y-4",
              children: ($$renderer5) => {
                if (formErrorMessage) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<div class="rounded-lg border border-error px-4 py-3 text-sm text-error" role="alert"><p class="font-medium">Something went wrong</p> <p>${escape_html(formErrorMessage)}</p> <p class="mt-1">Recovery action: review your inputs and resubmit.</p></div>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]--> <div class="space-y-4">`);
                Input($$renderer5, {
                  type: "text",
                  name: "name",
                  label: "Name",
                  placeholder: "Enter your name",
                  value: formData.name,
                  oninput: (e) => formData.name = e.target.value,
                  variant: fieldErrors.name ? "error" : "default",
                  message: fieldErrors.name || ""
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  type: "email",
                  name: "email",
                  label: "Email",
                  placeholder: "Enter your email",
                  value: formData.email,
                  oninput: (e) => formData.email = e.target.value,
                  variant: fieldErrors.email ? "error" : "default",
                  message: fieldErrors.email || ""
                });
                $$renderer5.push(`<!----> `);
                Textarea($$renderer5, {
                  name: "message",
                  label: "Message",
                  placeholder: "Enter your message",
                  rows: 4,
                  value: formData.message,
                  oninput: (e) => formData.message = e.target.value,
                  variant: fieldErrors.message ? "error" : "default",
                  message: fieldErrors.message || ""
                });
                $$renderer5.push(`<!----> `);
                Checkbox($$renderer5, {
                  name: "subscribe",
                  label: "Subscribe to updates",
                  checked: formData.subscribe,
                  onchange: (e) => formData.subscribe = e.target.checked
                });
                $$renderer5.push(`<!----></div> <div class="pt-4">`);
                Button($$renderer5, {
                  type: "submit",
                  variant: "primary",
                  size: "md",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Send Message`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div>`);
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div>`);
  });
}
function ImageUpload($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = null,
      disabled = false,
      accept = "image/*",
      placeholder = "No image selected",
      errorMessage = "",
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    function removeImage() {
      if (disabled) return;
      value = null;
    }
    function triggerFileSelect() {
      if (disabled) return;
    }
    onDestroy(() => {
    });
    $$renderer2.push(`<div class="space-y-3">`);
    if (value) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="relative group"><img${attr("src", value)} alt="" class="w-full h-32 min-w-64 object-cover rounded-2xl border-0"/> <div class="absolute inset-0 border border-input-border bg-input min-w-64 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center"><div class="flex gap-2">`);
      Button($$renderer2, {
        variant: "secondary",
        size: "sm",
        onclick: triggerFileSelect,
        disabled,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Change`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      Button($$renderer2, {
        variant: "danger",
        size: "sm",
        onclick: removeImage,
        disabled,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Remove`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div${attr_class(`border-2 border-dashed border-input rounded-2xl min-w-64 p-6 text-center hover:border-brand-500 transition-colors ${stringify(disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer")}`)} role="button"${attr("tabindex", disabled ? -1 : 0)}${attr("aria-disabled", disabled)}><div class="space-y-3"><div class="w-12 h-12 mx-auto bg-action-secondary rounded-lg flex items-center justify-center">`);
      Image($$renderer2, { size: 24, class: "text-description" });
      $$renderer2.push(`<!----></div> <div><p class="font-medium text-headline">${escape_html(placeholder)}</p> <p class="text-sm text-description">Click to choose a file</p></div></div></div>`);
    }
    $$renderer2.push(`<!--]--> <input type="file"${attr("accept", accept)}${attr("disabled", disabled, true)} class="hidden"/> `);
    if (errorMessage) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="rounded-lg border border-error px-3 py-2 text-sm text-error" role="alert"><p class="font-medium">Image upload failed</p> <p>${escape_html(errorMessage)}</p> <p class="mt-1">Recovery action: try another file or retry upload.</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function SlideUp($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      isOpen = false,
      title = "",
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    if (isOpen) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="fixed inset-0 z-modal cursor-pointer bg-overlay" role="dialog" aria-modal="true"${attr("aria-labelledby", title ? "slideup-title" : void 0)} tabindex="-1"><div class="fixed bottom-0 left-0 right-0 z-modal flex max-h-[90vh] cursor-default flex-col overflow-y-auto rounded-t-3xl bg-card shadow-xl animate-[slideUp_0.3s_ease-out]">`);
      if (title) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center justify-between px-6 pt-6 pb-4"><h2 id="slideup-title" class="text-2xl font-normal leading-8 text-headline tracking-normal">${escape_html(title)}</h2> <button type="button" class="text-description hover:text-headline text-2xl cursor-pointer transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-base-100" aria-label="Close">×</button></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="px-6 pb-6 flex-1">`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function NavigationMenuList($$renderer, $$props) {
  let { className = "", children, $$slots, $$events, ...restProps } = $$props;
  $$renderer.push(`<ul${attributes({
    class: `flex flex-row items-center gap-1 list-none m-0 p-0 ${stringify(className)}`,
    role: "menubar",
    "aria-orientation": "horizontal",
    "data-navigation-menu-list": true,
    ...restProps
  })}>`);
  children?.($$renderer);
  $$renderer.push(`<!----></ul>`);
}
const NAVIGATION_MENU_CONTEXT_KEY = Symbol("navigation-menu");
function NavigationMenuItem($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = "",
      className = "",
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const context = getContext(NAVIGATION_MENU_CONTEXT_KEY);
    const isActive = context?.activeItem === value;
    $$renderer2.push(`<li${attributes({
      class: `relative ${stringify(className)}`,
      role: "none",
      "data-navigation-menu-item": true,
      "data-active": isActive,
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></li>`);
  });
}
function NavigationMenuTrigger($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = "",
      className = "",
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const context = getContext(NAVIGATION_MENU_CONTEXT_KEY);
    const isActive = context?.activeItem === value;
    $$renderer2.push(`<button${attributes({
      type: "button",
      class: `inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-transparent px-4 py-2 text-sm font-medium text-nav-menu-item transition-colors duration-150 outline-none hover:bg-nav-menu-hover hover:text-nav-menu-item-hover data-[active=true]:bg-nav-menu-active data-[active=true]:text-nav-menu-item-active focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus ${stringify(className)}`,
      "aria-expanded": isActive ? "true" : "false",
      "aria-haspopup": "true",
      "data-navigation-menu-trigger": true,
      "data-active": isActive,
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----> <svg${attr_class(`ml-1 h-4 w-4 transition-transform ${stringify(isActive ? "rotate-180" : "")}`)} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>`);
  });
}
function NavigationMenuContent($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = "",
      className = "",
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const context = getContext(NAVIGATION_MENU_CONTEXT_KEY);
    const isActive = context?.activeItem === value;
    if (isActive) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attributes({
        class: `absolute left-0 top-full mt-2 bg-input rounded-lg shadow-lg border border-input-border p-4 z-dropdown min-w-[200px] transition-all duration-200 ease-in-out ${stringify(className)}`,
        role: "menu",
        "data-navigation-menu-content": true,
        tabindex: "-1",
        ...restProps
      })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function NavigationMenuLink($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      href = "#",
      asChild = false,
      className = "",
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    getContext(NAVIGATION_MENU_CONTEXT_KEY);
    const linkClasses = "block cursor-pointer rounded-md px-4 py-2 text-sm text-nav-menu-item no-underline transition-colors duration-150 outline-none hover:bg-nav-menu-hover hover:text-nav-menu-item-hover focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus {className}";
    if (asChild) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attributes({
        class: clsx(linkClasses),
        "data-navigation-menu-link": true,
        ...restProps
      })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<a${attributes({
        href,
        class: clsx(linkClasses),
        "data-navigation-menu-link": true,
        ...restProps
      })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></a>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function NavigationMenu($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      viewport = true,
      className = "",
      items = [],
      children,
      listClassName = "",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let activeItem = null;
    let isMobile = false;
    function setActiveItem(item) {
      activeItem = item;
    }
    const context = {
      get activeItem() {
        return activeItem;
      },
      setActiveItem,
      get isMobile() {
        return isMobile;
      }
    };
    setContext(NAVIGATION_MENU_CONTEXT_KEY, context);
    $$renderer2.push(`<nav${attributes({
      class: `relative ${stringify(className)}`,
      "aria-label": "Main navigation",
      ...restProps
    })}>`);
    if (items.length > 0) {
      $$renderer2.push("<!--[-->");
      NavigationMenuList($$renderer2, {
        className: listClassName,
        children: ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          const each_array = ensure_array_like(items);
          for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
            let item = each_array[$$index_1];
            NavigationMenuItem($$renderer3, {
              value: item.value,
              children: ($$renderer4) => {
                if (item.content && item.content.length > 0) {
                  $$renderer4.push("<!--[-->");
                  NavigationMenuTrigger($$renderer4, {
                    value: item.value,
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->${escape_html(item.label)}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer4.push(`<!----> `);
                  NavigationMenuContent($$renderer4, {
                    value: item.value,
                    children: ($$renderer5) => {
                      if (item.children) {
                        $$renderer5.push("<!--[-->");
                        item.children($$renderer5);
                        $$renderer5.push(`<!---->`);
                      } else {
                        $$renderer5.push("<!--[!-->");
                        $$renderer5.push(`<ul class="grid gap-2"><!--[-->`);
                        const each_array_1 = ensure_array_like(item.content);
                        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                          let link = each_array_1[$$index];
                          $$renderer5.push(`<li>`);
                          NavigationMenuLink($$renderer5, {
                            href: link.href,
                            asChild: link.asChild,
                            children: ($$renderer6) => {
                              if (link.children) {
                                $$renderer6.push("<!--[-->");
                                link.children($$renderer6);
                                $$renderer6.push(`<!---->`);
                              } else {
                                $$renderer6.push("<!--[!-->");
                                if (link.label) {
                                  $$renderer6.push("<!--[-->");
                                  $$renderer6.push(`<div class="text-sm font-medium leading-none">${escape_html(link.label)}</div> `);
                                  if (link.description) {
                                    $$renderer6.push("<!--[-->");
                                    $$renderer6.push(`<p class="line-clamp-2 text-sm leading-snug text-description">${escape_html(link.description)}</p>`);
                                  } else {
                                    $$renderer6.push("<!--[!-->");
                                  }
                                  $$renderer6.push(`<!--]-->`);
                                } else {
                                  $$renderer6.push("<!--[!-->");
                                }
                                $$renderer6.push(`<!--]-->`);
                              }
                              $$renderer6.push(`<!--]-->`);
                            },
                            $$slots: { default: true }
                          });
                          $$renderer5.push(`<!----></li>`);
                        }
                        $$renderer5.push(`<!--]--></ul>`);
                      }
                      $$renderer5.push(`<!--]-->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer4.push(`<!---->`);
                } else {
                  $$renderer4.push("<!--[!-->");
                  if (item.href) {
                    $$renderer4.push("<!--[-->");
                    NavigationMenuLink($$renderer4, {
                      href: item.href,
                      children: ($$renderer5) => {
                        $$renderer5.push(`<!---->${escape_html(item.label)}`);
                      },
                      $$slots: { default: true }
                    });
                  } else {
                    $$renderer4.push("<!--[!-->");
                    if (item.children) {
                      $$renderer4.push("<!--[-->");
                      item.children($$renderer4);
                      $$renderer4.push(`<!---->`);
                    } else {
                      $$renderer4.push("<!--[!-->");
                    }
                    $$renderer4.push(`<!--]-->`);
                  }
                  $$renderer4.push(`<!--]-->`);
                }
                $$renderer4.push(`<!--]-->`);
              },
              $$slots: { default: true }
            });
          }
          $$renderer3.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
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
    $$renderer2.push(`<!--]--></nav>`);
  });
}
function SidebarPanel($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      className = "",
      widthClass = "w-80",
      variant = "elevated",
      ariaLabel = "Picker panel",
      title = "Items",
      subtitle = "Choose an item to continue",
      showSearch = true,
      searchPlaceholder = "Search...",
      searchValue = "",
      items = [],
      selectedItemId = "",
      emptyStateTitle = "No matches",
      emptyStateDescription = "Try a different keyword.",
      emptyStateActionLabel = "",
      selectLabel = "Select item",
      closeLabel = "Close panel",
      onSelect,
      onClose,
      onEmptyStateAction,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const normalizedSearchTerm = searchValue.trim().toLowerCase();
    const filteredItems = normalizedSearchTerm ? items.filter((item) => item.label.toLowerCase().includes(normalizedSearchTerm)) : items;
    const isElevated = variant === "elevated";
    const containerClasses = (() => {
      const resolvedWidthClass = widthClass.trim() || "w-80";
      const shell = isElevated ? "rounded-3xl border border-border bg-base-50/95 text-headline shadow-md ring-1 ring-border/50" : "rounded-3xl border border-border bg-background text-headline shadow-sm";
      return `${resolvedWidthClass} shrink-0 p-5 ${shell} ${className}`.trim();
    })();
    function getItemClasses(itemId) {
      const isActive = selectedItemId === itemId;
      const baseClasses = "w-full cursor-pointer rounded-lg px-3 py-2.5 text-left transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus";
      if (isActive) {
        return `${baseClasses} bg-background text-headline shadow-sm ring-1 ring-border/80`;
      }
      return `${baseClasses} text-description hover:bg-background/75 hover:text-headline`;
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<aside${attributes({
        class: clsx(containerClasses),
        "aria-label": ariaLabel,
        ...restProps
      })}><div class="mb-5 flex items-start justify-between gap-3"><div class="min-w-0 pr-1"><h3 class="truncate text-base font-semibold tracking-tight text-headline">${escape_html(title)}</h3> <p class="mt-0.5 text-sm leading-relaxed text-description">${escape_html(subtitle)}</p></div> <button type="button" class="-mr-0.5 -mt-0.5 inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-description transition-colors hover:bg-background/80 hover:text-headline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nav-menu-focus focus-visible:ring-offset-0"${attr("aria-label", closeLabel)}>`);
      X($$renderer3, { size: 18 });
      $$renderer3.push(`<!----></button></div> `);
      if (showSearch) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="relative mb-5"><span class="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-description" aria-hidden="true">`);
        Search($$renderer3, { size: 17 });
        $$renderer3.push(`<!----></span> `);
        Input($$renderer3, {
          type: "search",
          placeholder: searchPlaceholder,
          "aria-label": searchPlaceholder,
          class: `w-full min-w-0 min-h-10 rounded-xl py-2 pl-10 text-sm ring-1 ring-border/60 ring-offset-0 focus:ring-2 focus:ring-nav-menu-focus ${stringify(isElevated ? "border-transparent bg-background/90" : "border-transparent bg-base-50")}`,
          get value() {
            return searchValue;
          },
          set value($$value) {
            searchValue = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (filteredItems.length > 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<ul class="space-y-1" role="listbox"${attr("aria-label", selectLabel)}><!--[-->`);
        const each_array = ensure_array_like(filteredItems);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let item = each_array[$$index];
          $$renderer3.push(`<li role="presentation"><button type="button" role="option"${attr_class(clsx(getItemClasses(item.id)))}${attr("aria-selected", selectedItemId === item.id)}><span class="flex items-center justify-between gap-3"><span class="flex min-w-0 items-start gap-2.5">`);
          if (item.icon) {
            $$renderer3.push("<!--[-->");
            const Icon2 = item.icon;
            $$renderer3.push(`<span class="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center text-current" aria-hidden="true"><!---->`);
            Icon2($$renderer3, { size: 18 });
            $$renderer3.push(`<!----></span>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> <span class="min-w-0"><span class="block truncate text-sm font-medium text-current">${escape_html(item.label)}</span> `);
          if (item.description) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<span class="mt-0.5 block truncate text-xs text-description">${escape_html(item.description)}</span>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></span></span> `);
          if (item.badgeText) {
            $$renderer3.push("<!--[-->");
            Badge($$renderer3, { text: item.badgeText, size: "sm" });
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></span></button></li>`);
        }
        $$renderer3.push(`<!--]--></ul>`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div class="rounded-xl border border-dashed border-border bg-background/70 px-3.5 py-4 ring-1 ring-border/40"><h4 class="text-sm font-semibold text-headline">${escape_html(emptyStateTitle)}</h4> <p class="mt-1 text-sm leading-relaxed text-description">${escape_html(emptyStateDescription)}</p> `);
        if (emptyStateActionLabel.trim() && onEmptyStateAction) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<button type="button" class="mt-3 inline-flex min-h-10 cursor-pointer items-center rounded-lg bg-action-primary px-3 py-2 text-sm font-medium text-action-primary outline-none transition-colors hover:bg-action-primary-hover focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus">${escape_html(emptyStateActionLabel.trim())}</button>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div>`);
      }
      $$renderer3.push(`<!--]--></aside>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { searchValue, selectedItemId });
  });
}
function ComponentShowcaseExampleDemos($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      component,
      modalOpen = false,
      slideUpOpen = false,
      activeTab = "tab1",
      selectValue = void 0,
      sidebarPath = "/revenue",
      sidebarSearchValue = "Revenue",
      sidebarSearchPanelOpen = false,
      sidebarProjectSearch = "",
      selectedProjectId = "proj-zabi-web"
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="space-y-8"><!--[-->`);
      const each_array = ensure_array_like(component.examples);
      for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
        let example = each_array[$$index_1];
        ComponentDemo($$renderer3, {
          title: example.title,
          description: example.description,
          code: example.code,
          language: example.language || "svelte",
          children: ($$renderer4) => {
            if (component.name === "Button") {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<div class="space-y-4"><div class="flex flex-wrap items-center gap-2"><span class="text-sm font-medium text-headline">Variants:</span> <!--[-->`);
              const each_array_1 = ensure_array_like(component.variants);
              for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                let variant = each_array_1[$$index];
                $$renderer4.push(`<span class="rounded-md bg-base-100 px-2 py-1 text-xs text-headline">${escape_html(variant)}</span>`);
              }
              $$renderer4.push(`<!--]--></div> <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">`);
              Button($$renderer4, { variant: "primary", text: "Primary" });
              $$renderer4.push(`<!----> `);
              Button($$renderer4, { variant: "secondary", text: "Secondary" });
              $$renderer4.push(`<!----> `);
              Button($$renderer4, { variant: "outline", text: "Outline" });
              $$renderer4.push(`<!----> `);
              Button($$renderer4, { variant: "ghost", text: "Ghost" });
              $$renderer4.push(`<!----> `);
              Button($$renderer4, { variant: "link", text: "Link" });
              $$renderer4.push(`<!----> `);
              Button($$renderer4, { variant: "danger", text: "Danger" });
              $$renderer4.push(`<!----></div> <div class="flex flex-wrap gap-4 items-center">`);
              Button($$renderer4, { variant: "primary", disabled: true, text: "Disabled Primary" });
              $$renderer4.push(`<!----> `);
              Button($$renderer4, {
                variant: "secondary",
                disabled: true,
                text: "Disabled Secondary"
              });
              $$renderer4.push(`<!----> `);
              Button($$renderer4, { variant: "danger", disabled: true, text: "Disabled Danger" });
              $$renderer4.push(`<!----></div></div>`);
            } else {
              $$renderer4.push("<!--[!-->");
              if (component.name === "IconButton") {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<div class="space-y-4"><div class="flex flex-wrap gap-4 items-center"><div class="flex flex-col items-center gap-1"><span class="text-xs font-medium text-headline">primary</span> `);
                IconButton($$renderer4, {
                  variant: "primary",
                  label: "Favorite",
                  children: ($$renderer5) => {
                    Heart($$renderer5, {});
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!----></div> <div class="flex flex-col items-center gap-1"><span class="text-xs font-medium text-headline">secondary</span> `);
                IconButton($$renderer4, {
                  variant: "secondary",
                  label: "Favorite",
                  children: ($$renderer5) => {
                    Heart($$renderer5, {});
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!----></div> <div class="flex flex-col items-center gap-1"><span class="text-xs font-medium text-headline">ghost</span> `);
                IconButton($$renderer4, {
                  variant: "ghost",
                  label: "Favorite",
                  children: ($$renderer5) => {
                    Heart($$renderer5, {});
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!----></div> <div class="flex flex-col items-center gap-1"><span class="text-xs font-medium text-headline">outline</span> `);
                IconButton($$renderer4, {
                  variant: "outline",
                  label: "Favorite",
                  children: ($$renderer5) => {
                    Heart($$renderer5, {});
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!----></div> <div class="flex flex-col items-center gap-1"><span class="text-xs font-medium text-headline">danger</span> `);
                IconButton($$renderer4, {
                  variant: "danger",
                  label: "Remove",
                  children: ($$renderer5) => {
                    Heart($$renderer5, {});
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!----></div></div> <div class="flex flex-wrap gap-4 items-center">`);
                IconButton($$renderer4, {
                  variant: "primary",
                  disabled: true,
                  label: "Favorite",
                  children: ($$renderer5) => {
                    Heart($$renderer5, {});
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!----> `);
                IconButton($$renderer4, {
                  variant: "secondary",
                  disabled: true,
                  label: "Favorite",
                  children: ($$renderer5) => {
                    Heart($$renderer5, {});
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!----> `);
                IconButton($$renderer4, {
                  variant: "danger",
                  disabled: true,
                  label: "Remove",
                  children: ($$renderer5) => {
                    Heart($$renderer5, {});
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!----></div></div>`);
              } else {
                $$renderer4.push("<!--[!-->");
                if (component.name === "Input") {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<div class="w-full space-y-4">`);
                  Input($$renderer4, {
                    label: "Name",
                    placeholder: "Enter your name",
                    variant: "default"
                  });
                  $$renderer4.push(`<!----> `);
                  Input($$renderer4, {
                    label: "Email",
                    type: "email",
                    placeholder: "Enter your email",
                    variant: "success"
                  });
                  $$renderer4.push(`<!----> `);
                  Input($$renderer4, {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter your password",
                    variant: "warning"
                  });
                  $$renderer4.push(`<!----> `);
                  Input($$renderer4, {
                    label: "Error Field",
                    placeholder: "This field has an error",
                    variant: "error"
                  });
                  $$renderer4.push(`<!----> `);
                  Input($$renderer4, {
                    label: "Disabled Field",
                    placeholder: "This field is disabled",
                    disabled: true
                  });
                  $$renderer4.push(`<!----></div>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                  if (component.name === "Card") {
                    $$renderer4.push("<!--[-->");
                    $$renderer4.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
                    Card($$renderer4, {
                      children: ($$renderer5) => {
                        CardHeader($$renderer5, { title: "Default Card" });
                        $$renderer5.push(`<!----> `);
                        CardContent($$renderer5, {
                          children: ($$renderer6) => {
                            $$renderer6.push(`<p class="text-description">This is a default card with
                                                        clean styling.</p>`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push(`<!---->`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer4.push(`<!----> `);
                    Card($$renderer4, {
                      variant: "elevated",
                      children: ($$renderer5) => {
                        CardHeader($$renderer5, { title: "Elevated Card" });
                        $$renderer5.push(`<!----> `);
                        CardContent($$renderer5, {
                          children: ($$renderer6) => {
                            $$renderer6.push(`<p class="text-description">This card indicates a
                                                        successful action.</p>`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push(`<!---->`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer4.push(`<!----> `);
                    Card($$renderer4, {
                      variant: "outlined",
                      children: ($$renderer5) => {
                        CardHeader($$renderer5, { title: "Outlined Card" });
                        $$renderer5.push(`<!----> `);
                        CardContent($$renderer5, {
                          children: ($$renderer6) => {
                            $$renderer6.push(`<p class="text-description">This card shows a warning
                                                        state.</p>`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push(`<!---->`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer4.push(`<!----> `);
                    Card($$renderer4, {
                      variant: "flat",
                      children: ($$renderer5) => {
                        CardHeader($$renderer5, { title: "Flat Card" });
                        $$renderer5.push(`<!----> `);
                        CardContent($$renderer5, {
                          children: ($$renderer6) => {
                            $$renderer6.push(`<p class="text-description">This card indicates an error
                                                        state.</p>`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push(`<!---->`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer4.push(`<!----> `);
                    Card($$renderer4, {
                      children: ($$renderer5) => {
                        CardHeader($$renderer5, { title: "Info Card" });
                        $$renderer5.push(`<!----> `);
                        CardContent($$renderer5, {
                          children: ($$renderer6) => {
                            $$renderer6.push(`<p class="text-description">This card provides
                                                        informational content.</p>`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer5.push(`<!---->`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer4.push(`<!----></div>`);
                  } else {
                    $$renderer4.push("<!--[!-->");
                    if (component.name === "List") {
                      $$renderer4.push("<!--[-->");
                      $$renderer4.push(`<div class="w-full space-y-4">`);
                      List($$renderer4, {
                        items: docsListItems,
                        selectedId: "billing",
                        ariaLabel: "Account navigation"
                      });
                      $$renderer4.push(`<!----> `);
                      List($$renderer4, {
                        items: docsListItems,
                        showArrow: false,
                        ariaLabel: "Account navigation without arrows"
                      });
                      $$renderer4.push(`<!----></div>`);
                    } else {
                      $$renderer4.push("<!--[!-->");
                      if (component.name === "Alert") {
                        $$renderer4.push("<!--[-->");
                        $$renderer4.push(`<div class="space-y-4">`);
                        Alert($$renderer4, {
                          variant: "info",
                          title: "Info Alert",
                          message: "This is an informational message."
                        });
                        $$renderer4.push(`<!----> `);
                        Alert($$renderer4, {
                          variant: "success",
                          title: "Success!",
                          message: "Your action was completed successfully."
                        });
                        $$renderer4.push(`<!----> `);
                        Alert($$renderer4, {
                          variant: "warning",
                          title: "Warning",
                          message: "Please review your input before proceeding."
                        });
                        $$renderer4.push(`<!----> `);
                        Alert($$renderer4, {
                          variant: "error",
                          title: "Error",
                          message: "Something went wrong. Please try again."
                        });
                        $$renderer4.push(`<!----></div>`);
                      } else {
                        $$renderer4.push("<!--[!-->");
                        if (component.name === "ContactForm") {
                          $$renderer4.push("<!--[-->");
                          $$renderer4.push(`<div class="w-full">`);
                          ContactForm($$renderer4, {});
                          $$renderer4.push(`<!----></div>`);
                        } else {
                          $$renderer4.push("<!--[!-->");
                          if (component.name === "Dropdown") {
                            $$renderer4.push("<!--[-->");
                            $$renderer4.push(`<div class="w-full space-y-4">`);
                            {
                              let trigger = function($$renderer5) {
                                Button($$renderer5, { text: "Select an option" });
                              }, children = function($$renderer5) {
                                $$renderer5.push(`<div class="p-2 space-y-1"><button class="w-full text-left px-3 py-2 hover:bg-base-100 rounded">Option 1</button> <button class="w-full text-left px-3 py-2 hover:bg-base-100 rounded">Option 2</button> <button class="w-full text-left px-3 py-2 hover:bg-base-100 rounded">Option 3</button></div>`);
                              };
                              Dropdown($$renderer4, { trigger, children, $$slots: { trigger: true, default: true } });
                            }
                            $$renderer4.push(`<!----> `);
                            {
                              let trigger = function($$renderer5) {
                                Button($$renderer5, { text: "Choose a color" });
                              }, children = function($$renderer5) {
                                $$renderer5.push(`<div class="p-2 space-y-1"><button class="w-full text-left px-3 py-2 hover:bg-base-100 rounded">Red</button> <button class="w-full text-left px-3 py-2 hover:bg-base-100 rounded">Blue</button> <button class="w-full text-left px-3 py-2 hover:bg-base-100 rounded">Green</button></div>`);
                              };
                              Dropdown($$renderer4, { trigger, children, $$slots: { trigger: true, default: true } });
                            }
                            $$renderer4.push(`<!----></div>`);
                          } else {
                            $$renderer4.push("<!--[!-->");
                            if (component.name === "Form") {
                              $$renderer4.push("<!--[-->");
                              $$renderer4.push(`<div class="w-full">`);
                              Form($$renderer4, {
                                children: ($$renderer5) => {
                                  $$renderer5.push(`<div class="space-y-4">`);
                                  Input($$renderer5, { label: "Name", placeholder: "Enter your name" });
                                  $$renderer5.push(`<!----> `);
                                  Input($$renderer5, {
                                    label: "Email",
                                    type: "email",
                                    placeholder: "Enter your email"
                                  });
                                  $$renderer5.push(`<!----> `);
                                  Textarea($$renderer5, { label: "Message", placeholder: "Enter your message" });
                                  $$renderer5.push(`<!----> `);
                                  Button($$renderer5, { type: "submit", text: "Submit" });
                                  $$renderer5.push(`<!----></div>`);
                                },
                                $$slots: { default: true }
                              });
                              $$renderer4.push(`<!----></div>`);
                            } else {
                              $$renderer4.push("<!--[!-->");
                              if (component.name === "ImageUpload") {
                                $$renderer4.push("<!--[-->");
                                $$renderer4.push(`<div class="w-full">`);
                                ImageUpload($$renderer4, {
                                  accept: "image/jpeg,image/png,image/gif",
                                  placeholder: "Choose an image"
                                });
                                $$renderer4.push(`<!----></div>`);
                              } else {
                                $$renderer4.push("<!--[!-->");
                                if (component.name === "Modal") {
                                  $$renderer4.push("<!--[-->");
                                  $$renderer4.push(`<div class="space-y-4">`);
                                  Button($$renderer4, { onclick: () => modalOpen = true, text: "Open Modal" });
                                  $$renderer4.push(`<!----> `);
                                  Modal($$renderer4, {
                                    isOpen: modalOpen,
                                    onclick: () => modalOpen = false,
                                    title: "Example Modal",
                                    children: ($$renderer5) => {
                                      $$renderer5.push(`<p class="text-description mb-4">This is a modal dialog with
                                                    some content.</p> <div class="flex gap-2 justify-end">`);
                                      Button($$renderer5, {
                                        variant: "secondary",
                                        onclick: () => modalOpen = false,
                                        text: "Cancel"
                                      });
                                      $$renderer5.push(`<!----> `);
                                      Button($$renderer5, { onclick: () => modalOpen = false, text: "Confirm" });
                                      $$renderer5.push(`<!----></div>`);
                                    },
                                    $$slots: { default: true }
                                  });
                                  $$renderer4.push(`<!----></div>`);
                                } else {
                                  $$renderer4.push("<!--[!-->");
                                  if (component.name === "SlideUp") {
                                    $$renderer4.push("<!--[-->");
                                    $$renderer4.push(`<div class="space-y-4">`);
                                    Button($$renderer4, { onclick: () => slideUpOpen = true, text: "Open Slide Up" });
                                    $$renderer4.push(`<!----> `);
                                    SlideUp($$renderer4, {
                                      isOpen: slideUpOpen,
                                      onclick: () => slideUpOpen = false,
                                      title: "Slide Up Panel",
                                      children: ($$renderer5) => {
                                        $$renderer5.push(`<div class="p-6"><h3 class="text-lg font-semibold text-headline mb-4">Slide Up Panel</h3> <p class="text-description mb-4">This is a slide-up panel
                                                        with custom content.</p> `);
                                        Button($$renderer5, { onclick: () => slideUpOpen = false, text: "Close" });
                                        $$renderer5.push(`<!----></div>`);
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$renderer4.push(`<!----></div>`);
                                  } else {
                                    $$renderer4.push("<!--[!-->");
                                    if (component.name === "Tabs") {
                                      $$renderer4.push("<!--[-->");
                                      $$renderer4.push(`<div class="w-full">`);
                                      Tabs($$renderer4, {
                                        tabs: [
                                          { id: "tab1", label: "Overview" },
                                          { id: "tab2", label: "Details" },
                                          { id: "tab3", label: "Settings" }
                                        ],
                                        activeTab: "tab1",
                                        children: ($$renderer5) => {
                                          if (activeTab === "tab1") {
                                            $$renderer5.push("<!--[-->");
                                            $$renderer5.push(`<p>This is the overview tab
                                                        content.</p>`);
                                          } else {
                                            $$renderer5.push("<!--[!-->");
                                            if (activeTab === "tab2") {
                                              $$renderer5.push("<!--[-->");
                                              $$renderer5.push(`<p>This is the details tab
                                                        content.</p>`);
                                            } else {
                                              $$renderer5.push("<!--[!-->");
                                              if (activeTab === "tab3") {
                                                $$renderer5.push("<!--[-->");
                                                $$renderer5.push(`<p>This is the settings tab
                                                        content.</p>`);
                                              } else {
                                                $$renderer5.push("<!--[!-->");
                                              }
                                              $$renderer5.push(`<!--]-->`);
                                            }
                                            $$renderer5.push(`<!--]-->`);
                                          }
                                          $$renderer5.push(`<!--]-->`);
                                        },
                                        $$slots: { default: true }
                                      });
                                      $$renderer4.push(`<!----></div>`);
                                    } else {
                                      $$renderer4.push("<!--[!-->");
                                      if (component.name === "NavigationMenu") {
                                        $$renderer4.push("<!--[-->");
                                        $$renderer4.push(`<div class="space-y-6"><div><h4 class="text-sm font-medium text-headline mb-4">Data-Driven API</h4> `);
                                        NavigationMenu($$renderer4, {
                                          items: [
                                            {
                                              value: "home",
                                              label: "Home",
                                              content: [
                                                {
                                                  href: "/docs",
                                                  label: "Introduction",
                                                  description: "Re-usable components built using Svelte and Tailwind CSS."
                                                },
                                                {
                                                  href: "/docs/installation",
                                                  label: "Installation",
                                                  description: "How to install dependencies and structure your app."
                                                }
                                              ]
                                            },
                                            {
                                              value: "components",
                                              label: "Components",
                                              content: [
                                                {
                                                  href: "/components/button",
                                                  label: "Button",
                                                  description: "A clickable button component with multiple variants."
                                                },
                                                {
                                                  href: "/components/input",
                                                  label: "Input",
                                                  description: "A form input component with validation support."
                                                }
                                              ]
                                            },
                                            { value: "docs", label: "Docs", href: "/docs" }
                                          ]
                                        });
                                        $$renderer4.push(`<!----></div> <div><h4 class="text-sm font-medium text-headline mb-4">Compound Component API</h4> `);
                                        NavigationMenu($$renderer4, {
                                          children: ($$renderer5) => {
                                            NavigationMenuList($$renderer5, {
                                              children: ($$renderer6) => {
                                                NavigationMenuItem($$renderer6, {
                                                  value: "home",
                                                  children: ($$renderer7) => {
                                                    NavigationMenuTrigger($$renderer7, {
                                                      value: "home",
                                                      children: ($$renderer8) => {
                                                        $$renderer8.push(`<!---->Home`);
                                                      },
                                                      $$slots: { default: true }
                                                    });
                                                    $$renderer7.push(`<!----> `);
                                                    NavigationMenuContent($$renderer7, {
                                                      value: "home",
                                                      children: ($$renderer8) => {
                                                        $$renderer8.push(`<ul class="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"><li class="row-span-3">`);
                                                        NavigationMenuLink($$renderer8, {
                                                          asChild: true,
                                                          children: ($$renderer9) => {
                                                            $$renderer9.push(`<a class="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md md:p-6" href="/"><div class="mb-2 text-lg font-medium">zabi-components</div> <p class="text-sm leading-tight text-description">Beautifully
                                                                                    designed
                                                                                    components
                                                                                    built
                                                                                    with
                                                                                    Tailwind
                                                                                    CSS.</p></a>`);
                                                          },
                                                          $$slots: { default: true }
                                                        });
                                                        $$renderer8.push(`<!----></li> `);
                                                        NavigationMenuLink($$renderer8, {
                                                          href: "/docs",
                                                          children: ($$renderer9) => {
                                                            $$renderer9.push(`<div class="text-sm font-medium leading-none">Introduction</div> <p class="line-clamp-2 text-sm leading-snug text-description">Re-usable
                                                                            components
                                                                            built
                                                                            using
                                                                            Svelte
                                                                            and
                                                                            Tailwind
                                                                            CSS.</p>`);
                                                          },
                                                          $$slots: { default: true }
                                                        });
                                                        $$renderer8.push(`<!----> `);
                                                        NavigationMenuLink($$renderer8, {
                                                          href: "/docs/installation",
                                                          children: ($$renderer9) => {
                                                            $$renderer9.push(`<div class="text-sm font-medium leading-none">Installation</div> <p class="line-clamp-2 text-sm leading-snug text-description">How
                                                                            to
                                                                            install
                                                                            dependencies
                                                                            and
                                                                            structure
                                                                            your
                                                                            app.</p>`);
                                                          },
                                                          $$slots: { default: true }
                                                        });
                                                        $$renderer8.push(`<!----> `);
                                                        NavigationMenuLink($$renderer8, {
                                                          href: "/docs/primitives/typography",
                                                          children: ($$renderer9) => {
                                                            $$renderer9.push(`<div class="text-sm font-medium leading-none">Typography</div> <p class="line-clamp-2 text-sm leading-snug text-description">Styles
                                                                            for
                                                                            headings,
                                                                            paragraphs,
                                                                            lists...etc</p>`);
                                                          },
                                                          $$slots: { default: true }
                                                        });
                                                        $$renderer8.push(`<!----></ul>`);
                                                      },
                                                      $$slots: { default: true }
                                                    });
                                                    $$renderer7.push(`<!---->`);
                                                  },
                                                  $$slots: { default: true }
                                                });
                                                $$renderer6.push(`<!----> `);
                                                NavigationMenuItem($$renderer6, {
                                                  value: "components",
                                                  children: ($$renderer7) => {
                                                    NavigationMenuTrigger($$renderer7, {
                                                      value: "components",
                                                      children: ($$renderer8) => {
                                                        $$renderer8.push(`<!---->Components`);
                                                      },
                                                      $$slots: { default: true }
                                                    });
                                                    $$renderer7.push(`<!----> `);
                                                    NavigationMenuContent($$renderer7, {
                                                      value: "components",
                                                      children: ($$renderer8) => {
                                                        $$renderer8.push(`<ul class="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">`);
                                                        NavigationMenuLink($$renderer8, {
                                                          href: "/components/button",
                                                          children: ($$renderer9) => {
                                                            $$renderer9.push(`<div class="text-sm font-medium leading-none">Button</div> <p class="line-clamp-2 text-sm leading-snug text-description">A
                                                                            clickable
                                                                            button
                                                                            component
                                                                            with
                                                                            multiple
                                                                            variants.</p>`);
                                                          },
                                                          $$slots: { default: true }
                                                        });
                                                        $$renderer8.push(`<!----> `);
                                                        NavigationMenuLink($$renderer8, {
                                                          href: "/components/input",
                                                          children: ($$renderer9) => {
                                                            $$renderer9.push(`<div class="text-sm font-medium leading-none">Input</div> <p class="line-clamp-2 text-sm leading-snug text-description">A
                                                                            form
                                                                            input
                                                                            component
                                                                            with
                                                                            validation
                                                                            support.</p>`);
                                                          },
                                                          $$slots: { default: true }
                                                        });
                                                        $$renderer8.push(`<!----> `);
                                                        NavigationMenuLink($$renderer8, {
                                                          href: "/components/card",
                                                          children: ($$renderer9) => {
                                                            $$renderer9.push(`<div class="text-sm font-medium leading-none">Card</div> <p class="line-clamp-2 text-sm leading-snug text-description">A
                                                                            flexible
                                                                            card
                                                                            container
                                                                            with
                                                                            semantic
                                                                            variants.</p>`);
                                                          },
                                                          $$slots: { default: true }
                                                        });
                                                        $$renderer8.push(`<!----> `);
                                                        NavigationMenuLink($$renderer8, {
                                                          href: "/components/modal",
                                                          children: ($$renderer9) => {
                                                            $$renderer9.push(`<div class="text-sm font-medium leading-none">Modal</div> <p class="line-clamp-2 text-sm leading-snug text-description">A
                                                                            modal
                                                                            dialog
                                                                            with
                                                                            backdrop
                                                                            and
                                                                            customizable
                                                                            content.</p>`);
                                                          },
                                                          $$slots: { default: true }
                                                        });
                                                        $$renderer8.push(`<!----></ul>`);
                                                      },
                                                      $$slots: { default: true }
                                                    });
                                                    $$renderer7.push(`<!---->`);
                                                  },
                                                  $$slots: { default: true }
                                                });
                                                $$renderer6.push(`<!----> `);
                                                NavigationMenuItem($$renderer6, {
                                                  value: "docs",
                                                  children: ($$renderer7) => {
                                                    NavigationMenuLink($$renderer7, {
                                                      href: "/docs",
                                                      children: ($$renderer8) => {
                                                        $$renderer8.push(`<!---->Docs`);
                                                      },
                                                      $$slots: { default: true }
                                                    });
                                                  },
                                                  $$slots: { default: true }
                                                });
                                                $$renderer6.push(`<!---->`);
                                              },
                                              $$slots: { default: true }
                                            });
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$renderer4.push(`<!----></div> <div><h4 class="text-sm font-medium text-headline mb-4">With Icons</h4> `);
                                        NavigationMenu($$renderer4, {
                                          children: ($$renderer5) => {
                                            NavigationMenuList($$renderer5, {
                                              children: ($$renderer6) => {
                                                NavigationMenuItem($$renderer6, {
                                                  value: "status",
                                                  children: ($$renderer7) => {
                                                    NavigationMenuTrigger($$renderer7, {
                                                      value: "status",
                                                      children: ($$renderer8) => {
                                                        $$renderer8.push(`<!---->Status`);
                                                      },
                                                      $$slots: { default: true }
                                                    });
                                                    $$renderer7.push(`<!----> `);
                                                    NavigationMenuContent($$renderer7, {
                                                      value: "status",
                                                      children: ($$renderer8) => {
                                                        $$renderer8.push(`<ul class="grid w-[200px] gap-4"><li>`);
                                                        NavigationMenuLink($$renderer8, {
                                                          href: "#",
                                                          className: "flex flex-row items-center gap-2",
                                                          children: ($$renderer9) => {
                                                            Circle_question_mark($$renderer9, { class: "h-4 w-4" });
                                                            $$renderer9.push(`<!----> Backlog`);
                                                          },
                                                          $$slots: { default: true }
                                                        });
                                                        $$renderer8.push(`<!----> `);
                                                        NavigationMenuLink($$renderer8, {
                                                          href: "#",
                                                          className: "flex flex-row items-center gap-2",
                                                          children: ($$renderer9) => {
                                                            Circle($$renderer9, { class: "h-4 w-4" });
                                                            $$renderer9.push(`<!----> To Do`);
                                                          },
                                                          $$slots: { default: true }
                                                        });
                                                        $$renderer8.push(`<!----> `);
                                                        NavigationMenuLink($$renderer8, {
                                                          href: "#",
                                                          className: "flex flex-row items-center gap-2",
                                                          children: ($$renderer9) => {
                                                            Circle_check($$renderer9, { class: "h-4 w-4" });
                                                            $$renderer9.push(`<!----> Done`);
                                                          },
                                                          $$slots: { default: true }
                                                        });
                                                        $$renderer8.push(`<!----></li></ul>`);
                                                      },
                                                      $$slots: { default: true }
                                                    });
                                                    $$renderer7.push(`<!---->`);
                                                  },
                                                  $$slots: { default: true }
                                                });
                                              },
                                              $$slots: { default: true }
                                            });
                                          },
                                          $$slots: { default: true }
                                        });
                                        $$renderer4.push(`<!----></div></div>`);
                                      } else {
                                        $$renderer4.push("<!--[!-->");
                                        if (component.name === "TopNavbar") {
                                          $$renderer4.push("<!--[-->");
                                          $$renderer4.push(`<div class="space-y-6"><div><h4 class="text-sm font-medium text-headline mb-2">Full bar with inline links</h4> `);
                                          TopNavbar($$renderer4, {
                                            brand: "Zabi Components",
                                            brandHref: "/",
                                            showThemeToggle: false,
                                            items: [
                                              { label: "Home", href: "/" },
                                              { label: "Components", href: "/components" },
                                              { label: "Docs", href: "/docs" }
                                            ],
                                            navVariant: "header",
                                            currentPath: "/components"
                                          });
                                          $$renderer4.push(`<!----></div> <div><h4 class="text-sm font-medium text-headline mb-2">Embedded link list</h4> <div class="rounded-lg border border-border bg-base-50 p-4">`);
                                          TopNavbar($$renderer4, {
                                            embedded: true,
                                            ariaLabel: "Demo navigation",
                                            navVariant: "header",
                                            items: [
                                              { label: "Home", href: "/" },
                                              { label: "About", href: "/about" },
                                              { label: "Contact", href: "/contact" }
                                            ],
                                            currentPath: "/about"
                                          });
                                          $$renderer4.push(`<!----></div></div></div>`);
                                        } else {
                                          $$renderer4.push("<!--[!-->");
                                          if (component.name === "SidebarNavigation") {
                                            $$renderer4.push("<!--[-->");
                                            $$renderer4.push(`<div class="space-y-6"><div><h4 class="text-sm font-medium text-headline mb-2">Searchable Input Mode</h4> <div class="inline-block overflow-hidden rounded-2xl border border-border">`);
                                            SidebarNavigation($$renderer4, {
                                              mode: "expanded",
                                              searchMode: "input",
                                              items: sidebarNavItems,
                                              currentPath: sidebarPath,
                                              onNavigate: (item, event) => {
                                                event.preventDefault();
                                                sidebarPath = item.href;
                                              },
                                              get searchValue() {
                                                return sidebarSearchValue;
                                              },
                                              set searchValue($$value) {
                                                sidebarSearchValue = $$value;
                                                $$settled = false;
                                              }
                                            });
                                            $$renderer4.push(`<!----></div></div> <div><h4 class="text-sm font-medium text-headline mb-2">Trigger Button + sidebar panel</h4> <div class="flex flex-wrap items-start gap-4">`);
                                            SidebarNavigation($$renderer4, {
                                              mode: "expanded",
                                              searchMode: "button",
                                              items: sidebarNavItems,
                                              currentPath: sidebarPath,
                                              searchValue: selectedProjectId ? sidebarProjectItems.find((item) => item.id === selectedProjectId)?.label || "Search projects" : "Search projects",
                                              onSearchClick: () => {
                                                sidebarSearchPanelOpen = !sidebarSearchPanelOpen;
                                              },
                                              onNavigate: (item, event) => {
                                                event.preventDefault();
                                                sidebarPath = item.href;
                                              }
                                            });
                                            $$renderer4.push(`<!----> `);
                                            if (sidebarSearchPanelOpen) {
                                              $$renderer4.push("<!--[-->");
                                              SidebarPanel($$renderer4, {
                                                title: "Project picker",
                                                subtitle: "Search and switch projects",
                                                searchPlaceholder: "Search projects...",
                                                ariaLabel: "Project picker panel",
                                                items: sidebarProjectItems,
                                                onClose: () => {
                                                  sidebarSearchPanelOpen = false;
                                                },
                                                get searchValue() {
                                                  return sidebarProjectSearch;
                                                },
                                                set searchValue($$value) {
                                                  sidebarProjectSearch = $$value;
                                                  $$settled = false;
                                                },
                                                get selectedItemId() {
                                                  return selectedProjectId;
                                                },
                                                set selectedItemId($$value) {
                                                  selectedProjectId = $$value;
                                                  $$settled = false;
                                                }
                                              });
                                            } else {
                                              $$renderer4.push("<!--[!-->");
                                            }
                                            $$renderer4.push(`<!--]--></div></div></div>`);
                                          } else {
                                            $$renderer4.push("<!--[!-->");
                                            if (component.name === "SidebarPanel") {
                                              $$renderer4.push("<!--[-->");
                                              $$renderer4.push(`<div class="space-y-6">`);
                                              SidebarPanel($$renderer4, {
                                                title: "Project picker",
                                                subtitle: "Search and switch projects",
                                                searchPlaceholder: "Search projects...",
                                                ariaLabel: "Project picker panel",
                                                items: sidebarProjectItems,
                                                get searchValue() {
                                                  return sidebarProjectSearch;
                                                },
                                                set searchValue($$value) {
                                                  sidebarProjectSearch = $$value;
                                                  $$settled = false;
                                                },
                                                get selectedItemId() {
                                                  return selectedProjectId;
                                                },
                                                set selectedItemId($$value) {
                                                  selectedProjectId = $$value;
                                                  $$settled = false;
                                                }
                                              });
                                              $$renderer4.push(`<!----> `);
                                              SidebarPanel($$renderer4, {
                                                title: "Empty list",
                                                subtitle: "First-time setup state",
                                                searchPlaceholder: "Search...",
                                                ariaLabel: "Empty panel example",
                                                items: [],
                                                emptyStateTitle: "No items yet",
                                                emptyStateDescription: "Create your first item to get started."
                                              });
                                              $$renderer4.push(`<!----></div>`);
                                            } else {
                                              $$renderer4.push("<!--[!-->");
                                              if (component.name === "ColorPicker") {
                                                $$renderer4.push("<!--[-->");
                                                $$renderer4.push(`<div class="w-full space-y-6">`);
                                                ColorPicker($$renderer4, { label: "Choose a color" });
                                                $$renderer4.push(`<!----> `);
                                                ColorPicker($$renderer4, { value: "#3b82f6", label: "Background Color" });
                                                $$renderer4.push(`<!----> `);
                                                ColorPicker($$renderer4, { disabled: true, label: "Disabled Picker" });
                                                $$renderer4.push(`<!----></div>`);
                                              } else {
                                                $$renderer4.push("<!--[!-->");
                                                if (component.name === "Badge") {
                                                  $$renderer4.push("<!--[-->");
                                                  $$renderer4.push(`<div class="flex flex-wrap gap-2 items-center">`);
                                                  Badge($$renderer4, { text: "Default" });
                                                  $$renderer4.push(`<!----> `);
                                                  Badge($$renderer4, { variant: "success", text: "Success" });
                                                  $$renderer4.push(`<!----> `);
                                                  Badge($$renderer4, { variant: "warning", text: "Warning" });
                                                  $$renderer4.push(`<!----> `);
                                                  Badge($$renderer4, { variant: "error", text: "Error" });
                                                  $$renderer4.push(`<!----> `);
                                                  Badge($$renderer4, { variant: "info", text: "Info" });
                                                  $$renderer4.push(`<!----></div>`);
                                                } else {
                                                  $$renderer4.push("<!--[!-->");
                                                  if (component.name === "Checkbox") {
                                                    $$renderer4.push("<!--[-->");
                                                    $$renderer4.push(`<div class="w-full space-y-4">`);
                                                    Checkbox($$renderer4, { label: "Accept terms and conditions" });
                                                    $$renderer4.push(`<!----> `);
                                                    Checkbox($$renderer4, { label: "Email verified", checked: true });
                                                    $$renderer4.push(`<!----> `);
                                                    Checkbox($$renderer4, { label: "Review required" });
                                                    $$renderer4.push(`<!----> `);
                                                    Checkbox($$renderer4, { disabled: true, label: "Disabled option" });
                                                    $$renderer4.push(`<!----></div>`);
                                                  } else {
                                                    $$renderer4.push("<!--[!-->");
                                                    if (component.name === "Select") {
                                                      $$renderer4.push("<!--[-->");
                                                      $$renderer4.push(`<div class="w-full space-y-6">`);
                                                      Select($$renderer4, {
                                                        label: "Default (Searchable)",
                                                        placeholder: "Choose an option",
                                                        searchable: true,
                                                        searchPlaceholder: "Search options",
                                                        maxMenuHeight: "50vh",
                                                        menuWidth: "100%",
                                                        options: selectOptions,
                                                        get value() {
                                                          return selectValue;
                                                        },
                                                        set value($$value) {
                                                          selectValue = $$value;
                                                          $$settled = false;
                                                        }
                                                      });
                                                      $$renderer4.push(`<!----> `);
                                                      Select($$renderer4, {
                                                        label: "Default (No Search)",
                                                        placeholder: "Choose an option",
                                                        searchable: false,
                                                        maxMenuHeight: "50vh",
                                                        menuWidth: "100%",
                                                        options: selectOptions
                                                      });
                                                      $$renderer4.push(`<!----> `);
                                                      Select($$renderer4, {
                                                        label: "Success",
                                                        placeholder: "Choose an option",
                                                        variant: "success",
                                                        message: "Selection looks good",
                                                        searchable: true,
                                                        searchPlaceholder: "Search options",
                                                        maxMenuHeight: "50vh",
                                                        menuWidth: "100%",
                                                        options: selectOptions
                                                      });
                                                      $$renderer4.push(`<!----> `);
                                                      Select($$renderer4, {
                                                        label: "Warning",
                                                        placeholder: "Choose an option",
                                                        variant: "warning",
                                                        message: "Double-check your choice",
                                                        searchable: true,
                                                        searchPlaceholder: "Search options",
                                                        maxMenuHeight: "50vh",
                                                        menuWidth: "100%",
                                                        options: selectOptions
                                                      });
                                                      $$renderer4.push(`<!----> `);
                                                      Select($$renderer4, {
                                                        label: "Error",
                                                        placeholder: "Choose an option",
                                                        variant: "error",
                                                        message: "Please select a valid option",
                                                        searchable: true,
                                                        searchPlaceholder: "Search options",
                                                        maxMenuHeight: "50vh",
                                                        menuWidth: "100%",
                                                        options: selectOptions
                                                      });
                                                      $$renderer4.push(`<!----></div>`);
                                                    } else {
                                                      $$renderer4.push("<!--[!-->");
                                                      if (component.name === "CodeBlock") {
                                                        $$renderer4.push("<!--[-->");
                                                        $$renderer4.push(`<div class="w-full">`);
                                                        CodeBlock($$renderer4, {
                                                          code: sampleCode,
                                                          language: "javascript",
                                                          showLineNumbers: true
                                                        });
                                                        $$renderer4.push(`<!----></div>`);
                                                      } else {
                                                        $$renderer4.push("<!--[!-->");
                                                        if (component.name === "FeatureCard") {
                                                          $$renderer4.push("<!--[-->");
                                                          $$renderer4.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">`);
                                                          FeatureCard($$renderer4, {
                                                            title: "Fast Performance",
                                                            description: "Lightning fast loading times with optimized code"
                                                          });
                                                          $$renderer4.push(`<!----> `);
                                                          FeatureCard($$renderer4, {
                                                            title: "Secure by Default",
                                                            description: "End-to-end encryption and security best practices",
                                                            icon: "shield"
                                                          });
                                                          $$renderer4.push(`<!----> `);
                                                          FeatureCard($$renderer4, {
                                                            title: "Easy to Use",
                                                            description: "Intuitive interface designed for productivity",
                                                            icon: "star"
                                                          });
                                                          $$renderer4.push(`<!----></div>`);
                                                        } else {
                                                          $$renderer4.push("<!--[!-->");
                                                          if (component.name === "Heading") {
                                                            $$renderer4.push("<!--[-->");
                                                            $$renderer4.push(`<div class="space-y-4">`);
                                                            Heading($$renderer4, { level: 1, text: "Display Heading" });
                                                            $$renderer4.push(`<!----> `);
                                                            Heading($$renderer4, { level: 2, text: "Section Heading" });
                                                            $$renderer4.push(`<!----> `);
                                                            Heading($$renderer4, { level: 3, text: "Subtitle Heading" });
                                                            $$renderer4.push(`<!----> `);
                                                            Heading($$renderer4, { level: 4, text: "Subsection" });
                                                            $$renderer4.push(`<!----></div>`);
                                                          } else {
                                                            $$renderer4.push("<!--[!-->");
                                                            if (component.name === "OptimizedImage") {
                                                              $$renderer4.push("<!--[-->");
                                                              $$renderer4.push(`<div class="w-full space-y-4">`);
                                                              OptimizedImage($$renderer4, { src: "/vite.svg", alt: "Vite Logo", width: 200, height: 200 });
                                                              $$renderer4.push(`<!----> `);
                                                              OptimizedImage($$renderer4, {
                                                                src: "/svelte.svg",
                                                                alt: "Svelte Logo",
                                                                width: 150,
                                                                height: 150
                                                              });
                                                              $$renderer4.push(`<!----></div>`);
                                                            } else {
                                                              $$renderer4.push("<!--[!-->");
                                                              if (component.name === "Skeleton") {
                                                                $$renderer4.push("<!--[-->");
                                                                $$renderer4.push(`<div class="w-full space-y-4">`);
                                                                Skeleton($$renderer4, {});
                                                                $$renderer4.push(`<!----> `);
                                                                Skeleton($$renderer4, { width: "200px", height: "100px" });
                                                                $$renderer4.push(`<!----> `);
                                                                Skeleton($$renderer4, { width: "40px", height: "40px" });
                                                                $$renderer4.push(`<!----> <div class="flex space-x-2">`);
                                                                Skeleton($$renderer4, { width: "32px", height: "32px" });
                                                                $$renderer4.push(`<!----> <div class="space-y-2 flex-1">`);
                                                                Skeleton($$renderer4, { width: "80%" });
                                                                $$renderer4.push(`<!----> `);
                                                                Skeleton($$renderer4, { width: "60%" });
                                                                $$renderer4.push(`<!----></div></div></div>`);
                                                              } else {
                                                                $$renderer4.push("<!--[!-->");
                                                                if (component.name === "Toast") {
                                                                  $$renderer4.push("<!--[-->");
                                                                  $$renderer4.push(`<div class="w-full space-y-4">`);
                                                                  Toast($$renderer4, { message: "This is an info toast" });
                                                                  $$renderer4.push(`<!----> `);
                                                                  Toast($$renderer4, { message: "Operation completed successfully!" });
                                                                  $$renderer4.push(`<!----> `);
                                                                  Toast($$renderer4, { message: "Please review your input" });
                                                                  $$renderer4.push(`<!----> `);
                                                                  Toast($$renderer4, { message: "An error occurred" });
                                                                  $$renderer4.push(`<!----></div>`);
                                                                } else {
                                                                  $$renderer4.push("<!--[!-->");
                                                                  if (component.name === "Tooltip") {
                                                                    $$renderer4.push("<!--[-->");
                                                                    $$renderer4.push(`<div class="flex gap-4 items-center">`);
                                                                    Tooltip($$renderer4, {
                                                                      content: "This is a tooltip",
                                                                      children: ($$renderer5) => {
                                                                        Button($$renderer5, { text: "Hover me" });
                                                                      },
                                                                      $$slots: { default: true }
                                                                    });
                                                                    $$renderer4.push(`<!----> `);
                                                                    Tooltip($$renderer4, {
                                                                      content: "Top tooltip",
                                                                      placement: "top",
                                                                      children: ($$renderer5) => {
                                                                        Button($$renderer5, { variant: "secondary", text: "Top" });
                                                                      },
                                                                      $$slots: { default: true }
                                                                    });
                                                                    $$renderer4.push(`<!----> `);
                                                                    Tooltip($$renderer4, {
                                                                      content: "Bottom tooltip",
                                                                      placement: "bottom",
                                                                      children: ($$renderer5) => {
                                                                        Button($$renderer5, { variant: "ghost", text: "Bottom" });
                                                                      },
                                                                      $$slots: { default: true }
                                                                    });
                                                                    $$renderer4.push(`<!----></div>`);
                                                                  } else {
                                                                    $$renderer4.push("<!--[!-->");
                                                                  }
                                                                  $$renderer4.push(`<!--]-->`);
                                                                }
                                                                $$renderer4.push(`<!--]-->`);
                                                              }
                                                              $$renderer4.push(`<!--]-->`);
                                                            }
                                                            $$renderer4.push(`<!--]-->`);
                                                          }
                                                          $$renderer4.push(`<!--]-->`);
                                                        }
                                                        $$renderer4.push(`<!--]-->`);
                                                      }
                                                      $$renderer4.push(`<!--]-->`);
                                                    }
                                                    $$renderer4.push(`<!--]-->`);
                                                  }
                                                  $$renderer4.push(`<!--]-->`);
                                                }
                                                $$renderer4.push(`<!--]-->`);
                                              }
                                              $$renderer4.push(`<!--]-->`);
                                            }
                                            $$renderer4.push(`<!--]-->`);
                                          }
                                          $$renderer4.push(`<!--]-->`);
                                        }
                                        $$renderer4.push(`<!--]-->`);
                                      }
                                      $$renderer4.push(`<!--]-->`);
                                    }
                                    $$renderer4.push(`<!--]-->`);
                                  }
                                  $$renderer4.push(`<!--]-->`);
                                }
                                $$renderer4.push(`<!--]-->`);
                              }
                              $$renderer4.push(`<!--]-->`);
                            }
                            $$renderer4.push(`<!--]-->`);
                          }
                          $$renderer4.push(`<!--]-->`);
                        }
                        $$renderer4.push(`<!--]-->`);
                      }
                      $$renderer4.push(`<!--]-->`);
                    }
                    $$renderer4.push(`<!--]-->`);
                  }
                  $$renderer4.push(`<!--]-->`);
                }
                $$renderer4.push(`<!--]-->`);
              }
              $$renderer4.push(`<!--]-->`);
            }
            $$renderer4.push(`<!--]-->`);
          },
          $$slots: { default: true }
        });
      }
      $$renderer3.push(`<!--]--></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, {
      modalOpen,
      slideUpOpen,
      activeTab,
      selectValue,
      sidebarPath,
      sidebarSearchValue,
      sidebarSearchPanelOpen,
      sidebarProjectSearch,
      selectedProjectId
    });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const component = data.component;
    let modalOpen = false;
    let slideUpOpen = false;
    let activeTab = "tab1";
    let selectValue = void 0;
    let sidebarPath = "/revenue";
    let sidebarSearchValue = "Revenue";
    let sidebarSearchPanelOpen = false;
    let sidebarProjectSearch = "";
    let selectedProjectId = "proj-zabi-web";
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("r00e33", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>${escape_html(component.name)} - Components - Zabi Components</title>`);
        });
        $$renderer4.push(`<meta name="description"${attr("content", component.description)}/>`);
      });
      $$renderer3.push(`<div class="max-w-4xl"><div class="mb-8"><h1 class="mb-2 text-3xl font-bold text-headline">${escape_html(component.name)}</h1> <p class="mb-4 text-lg text-description">${escape_html(component.description)}</p> <div class="flex gap-2">`);
      Badge($$renderer3, { variant: "info", text: component.category });
      $$renderer3.push(`<!----> `);
      if (component.variants) {
        $$renderer3.push("<!--[-->");
        Badge($$renderer3, {
          variant: "info",
          text: `${stringify(component.variants.length)} variants`
        });
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> `);
      if (component.variants?.length) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="mt-3 flex flex-wrap items-center gap-2"><span class="text-sm font-medium text-headline">Variants:</span> <!--[-->`);
        const each_array = ensure_array_like(component.variants);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let variant = each_array[$$index];
          $$renderer3.push(`<span class="rounded-md bg-base-100 px-2 py-1 text-xs text-headline">${escape_html(variant)}</span>`);
        }
        $$renderer3.push(`<!--]--></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> `);
      ComponentShowcaseExampleDemos($$renderer3, {
        component,
        get modalOpen() {
          return modalOpen;
        },
        set modalOpen($$value) {
          modalOpen = $$value;
          $$settled = false;
        },
        get slideUpOpen() {
          return slideUpOpen;
        },
        set slideUpOpen($$value) {
          slideUpOpen = $$value;
          $$settled = false;
        },
        get activeTab() {
          return activeTab;
        },
        set activeTab($$value) {
          activeTab = $$value;
          $$settled = false;
        },
        get selectValue() {
          return selectValue;
        },
        set selectValue($$value) {
          selectValue = $$value;
          $$settled = false;
        },
        get sidebarPath() {
          return sidebarPath;
        },
        set sidebarPath($$value) {
          sidebarPath = $$value;
          $$settled = false;
        },
        get sidebarSearchValue() {
          return sidebarSearchValue;
        },
        set sidebarSearchValue($$value) {
          sidebarSearchValue = $$value;
          $$settled = false;
        },
        get sidebarSearchPanelOpen() {
          return sidebarSearchPanelOpen;
        },
        set sidebarSearchPanelOpen($$value) {
          sidebarSearchPanelOpen = $$value;
          $$settled = false;
        },
        get sidebarProjectSearch() {
          return sidebarProjectSearch;
        },
        set sidebarProjectSearch($$value) {
          sidebarProjectSearch = $$value;
          $$settled = false;
        },
        get selectedProjectId() {
          return selectedProjectId;
        },
        set selectedProjectId($$value) {
          selectedProjectId = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> <div class="mt-12"><h2 class="mb-6 text-2xl font-bold text-headline">Props</h2> <div class="overflow-x-auto"><table class="w-full border-collapse border border-border"><thead><tr class="bg-base-100"><th class="border border-border px-4 py-2 text-left font-semibold text-headline">Name</th><th class="border border-border px-4 py-2 text-left font-semibold text-headline">Type</th><th class="border border-border px-4 py-2 text-left font-semibold text-headline">Required</th><th class="border border-border px-4 py-2 text-left font-semibold text-headline">Default</th><th class="border border-border px-4 py-2 text-left font-semibold text-headline">Description</th></tr></thead><tbody><!--[-->`);
      const each_array_1 = ensure_array_like(component.props);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let prop = each_array_1[$$index_1];
        $$renderer3.push(`<tr><td class="border border-border px-4 py-2 font-mono text-body">${escape_html(prop.name)}</td><td class="border border-border px-4 py-2 text-description">${escape_html(prop.type)}</td><td class="border border-border px-4 py-2 text-description">${escape_html(prop.required ? "Yes" : "No")}</td><td class="border border-border px-4 py-2 text-description">${escape_html(prop.defaultValue || "-")}</td><td class="border border-border px-4 py-2 text-description">${escape_html(prop.description)}</td></tr>`);
      }
      $$renderer3.push(`<!--]--></tbody></table></div></div></div> <footer class="mt-16 -mx-8 border-t border-border bg-base-100 px-8 py-8"><div class="mx-auto max-w-4xl"><div class="flex flex-col items-center justify-between gap-4 md:flex-row"><div class="text-center md:text-left"><p class="mb-2 text-description">Open source · MIT license · Code on GitHub</p> <p class="text-sm text-caption">© 2026 Zabi Components. MIT License.</p></div> <div class="flex gap-6"><a href="/docs" class="text-description transition-colors hover:text-headline">Docs</a> <a href="/components" class="text-description transition-colors hover:text-headline">Components</a> <a href="https://github.com/sabnor/zabi-components" class="text-description transition-colors hover:text-headline">GitHub</a></div></div></div></footer>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
