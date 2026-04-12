import { K as spread_props, N as bind_props, x as attributes, w as attr, G as clsx, J as ensure_array_like, F as attr_class, O as element, y as attr_style, z as stringify, v as head } from "../../../chunks/index.js";
import { I as Icon, B as Button, T as ThemeToggle, N as Navigation, C as Card, a as CardHeader, b as CardContent } from "../../../chunks/CodeBlock.svelte_svelte_type_style_lang.js";
import { X, l as Search, I as Input, B as Badge, H as House, i as Chart_pie, P as Package, h as Bell, e as SidebarNavigation, C as ComponentDemo, A as Alert, k as ContactForm, D as Dropdown, F as Form, T as Textarea, M as Modal, b as Tabs, f as Chart_column, j as Settings, a as Checkbox, S as Select, d as Skeleton, c as Tooltip } from "../../../chunks/SidebarNavigation.js";
import { a as ssr_context, e as escape_html, g as getContext, s as setContext } from "../../../chunks/context.js";
import { I as IconButton, H as Heart, C as CodeBlock } from "../../../chunks/IconButton.js";
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
function Circle_check($$renderer, $$props) {
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
      ["path", { "d": "m9 12 2 2 4-4" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "circle-check" },
      /**
       * @component @name CircleCheck
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8cGF0aCBkPSJtOSAxMiAyIDIgNC00IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/circle-check
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
function Circle($$renderer, $$props) {
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
    const iconNode = [["circle", { "cx": "12", "cy": "12", "r": "10" }]];
    Icon($$renderer2, spread_props([
      { name: "circle" },
      /**
       * @component @name Circle
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/circle
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
function SidebarProjectPanel($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      className = "",
      widthClass = "w-80",
      ariaLabel = "Project picker panel",
      title = "Projects",
      subtitle = "Choose a project to continue",
      showSearch = true,
      searchPlaceholder = "Search projects...",
      searchValue = "",
      items = [],
      selectedItemId = "",
      emptyStateTitle = "No projects found",
      emptyStateDescription = "Try a different keyword or create a new project.",
      selectLabel = "Select project",
      closeLabel = "Close panel",
      onSelect,
      onClose,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const normalizedSearchTerm = searchValue.trim().toLowerCase();
    const filteredItems = normalizedSearchTerm ? items.filter((item) => item.label.toLowerCase().includes(normalizedSearchTerm)) : items;
    const containerClasses = (() => {
      const resolvedWidthClass = widthClass.trim() || "w-80";
      return `${resolvedWidthClass} shrink-0 rounded-2xl border border-border bg-background p-4 ${className}`.trim();
    })();
    function getItemClasses(itemId) {
      const isActive = selectedItemId === itemId;
      const baseClasses = "w-full rounded-xl px-3 py-3 text-left transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-0";
      if (isActive) {
        return `${baseClasses} bg-action-primary-subtle text-headline`;
      }
      return `${baseClasses} hover:bg-base-50 text-description`;
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<aside${attributes({
        class: clsx(containerClasses),
        "aria-label": ariaLabel,
        ...restProps
      })}><div class="mb-4 flex items-start justify-between gap-3"><div class="min-w-0"><h3 class="truncate text-base font-semibold text-headline">${escape_html(title)}</h3> <p class="mt-1 text-sm text-description">${escape_html(subtitle)}</p></div> <button type="button" class="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-description hover:bg-base-50 hover:text-headline focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-0"${attr("aria-label", closeLabel)}>`);
      X($$renderer3, { size: 16 });
      $$renderer3.push(`<!----></button></div> `);
      if (showSearch) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="relative mb-3"><span class="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-description" aria-hidden="true">`);
        Search($$renderer3, { size: 18 });
        $$renderer3.push(`<!----></span> `);
        Input($$renderer3, {
          type: "search",
          placeholder: searchPlaceholder,
          "aria-label": searchPlaceholder,
          class: "w-full min-w-0 rounded-xl pl-11",
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
        $$renderer3.push(`<ul class="space-y-2"${attr("aria-label", selectLabel)}><!--[-->`);
        const each_array = ensure_array_like(filteredItems);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let item = each_array[$$index];
          $$renderer3.push(`<li><button type="button"${attr_class(clsx(getItemClasses(item.id)))}${attr("aria-pressed", selectedItemId === item.id)}><span class="flex items-center justify-between gap-3"><span class="flex min-w-0 items-start gap-2">`);
          if (item.icon) {
            $$renderer3.push("<!--[-->");
            const Icon2 = item.icon;
            $$renderer3.push(`<span class="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center text-current" aria-hidden="true"><!---->`);
            Icon2($$renderer3, { size: 16 });
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
        $$renderer3.push(`<div class="rounded-xl border border-dashed border-border bg-base-50 p-4"><h4 class="text-sm font-semibold text-headline">${escape_html(emptyStateTitle)}</h4> <p class="mt-1 text-sm text-description">${escape_html(emptyStateDescription)}</p></div>`);
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
      $$renderer2.push(`<div class="relative group"><img${attr("src", value)} alt="" class="w-full h-32 min-w-64 object-cover rounded-2xl border-0"/> <div class="absolute inset-0 bg-input min-w-64 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center"><div class="flex gap-2">`);
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
      $$renderer2.push(`<div class="fixed inset-0 bg-overlay z-modal" role="dialog" aria-modal="true"${attr("aria-labelledby", title ? "slideup-title" : void 0)} tabindex="-1"><div class="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-xl z-modal max-h-[90vh] overflow-y-auto animate-[slideUp_0.3s_ease-out] flex flex-col">`);
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
      class: `inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-headline bg-transparent hover:bg-base-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${stringify(className)}`,
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
        class: `absolute left-0 top-full mt-2 bg-input rounded-lg shadow-lg border border-border p-4 z-dropdown min-w-[200px] transition-all duration-200 ease-in-out ${stringify(className)}`,
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
    const linkClasses = "block px-4 py-2 text-sm text-headline hover:bg-base-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 no-underline {className}";
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
    class: `bg-base-50 border-b border-border sticky top-0 z-50 ${stringify(className)}`,
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
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const navItems = [
      { label: "Home", href: "/" },
      { label: "Components", href: "/components" },
      { label: "Docs", href: "/docs" },
      { label: "GitHub", href: "https://github.com" }
    ];
    const categories = [
      {
        id: "all",
        label: "All",
        description: "All component categories"
      },
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
    let sidebarOpen = false;
    let navMenuOpen = false;
    let selectValue = void 0;
    let sidebarPath = "/revenue";
    let sidebarSearchValue = "Revenue";
    let sidebarSearchPanelOpen = false;
    let sidebarProjectSearch = "";
    let selectedProjectId = "proj-zabi-web";
    let componentsNavSearch = "";
    const sampleCode = `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`;
    const selectOptions = Array.from({ length: 16 }, (_, index) => ({ value: `option-${index + 1}`, label: `Option ${index + 1}` }));
    const docsListItems = [
      {
        id: "profile",
        label: "Profile",
        description: "Manage your account preferences",
        href: "/profile"
      },
      {
        id: "billing",
        label: "Billing",
        description: "Update payment methods and invoices",
        href: "/billing"
      },
      {
        id: "team",
        label: "Team members",
        description: "Invite teammates and assign roles"
      },
      {
        id: "security",
        label: "Security settings",
        description: "Configure login and access policies",
        href: "/security",
        disabled: true
      }
    ];
    const sidebarNavItems = [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        icon: House
      },
      {
        id: "revenue",
        label: "Revenue",
        href: "/revenue",
        icon: Chart_column
      },
      {
        id: "notifications",
        label: "Notifications",
        href: "/notifications",
        icon: Bell,
        badgeCount: 2
      },
      {
        id: "analytics",
        label: "Analytics",
        href: "/analytics",
        icon: Chart_pie
      },
      {
        id: "inventory",
        label: "Inventory",
        href: "/inventory",
        icon: Package
      },
      {
        id: "settings",
        label: "Settings",
        href: "/settings",
        icon: Settings,
        group: "secondary"
      }
    ];
    const sidebarProjectItems = [
      {
        id: "proj-zabi-web",
        label: "Zabi Web App",
        description: "Production workspace",
        badgeText: "Active"
      },
      {
        id: "proj-design-system",
        label: "Design System",
        description: "Component library",
        badgeText: "New"
      },
      {
        id: "proj-marketing",
        label: "Marketing Site",
        description: "Landing and docs"
      },
      {
        id: "proj-analytics",
        label: "Analytics Dashboard",
        description: "Internal reports"
      }
    ];
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
          variants: ["primary", "secondary", "danger", "ghost", "outline", "link"],
          examples: [
            {
              title: "Basic Usage",
              description: "Simple button with default styling",
              code: "&lt;Button&gt;Click me&lt;/Button&gt;"
            },
            {
              title: "Variants",
              description: "Different button variants",
              code: '&lt;Button variant="primary"&gt;Primary&lt;/Button&gt;\n&lt;Button variant="secondary"&gt;Secondary&lt;/Button&gt;\n&lt;Button variant="outline"&gt;Outline&lt;/Button&gt;\n&lt;Button variant="ghost"&gt;Ghost&lt;/Button&gt;\n&lt;Button variant="link"&gt;Link&lt;/Button&gt;\n&lt;Button variant="danger"&gt;Danger&lt;/Button&gt;'
            }
          ]
        },
        {
          name: "IconButton",
          category: "atoms",
          description: "Icon-only button for compact actions and toolbars",
          props: [
            {
              name: "variant",
              type: "string",
              required: false,
              defaultValue: "primary",
              description: "Icon button style variant"
            },
            {
              name: "size",
              type: "string",
              required: false,
              defaultValue: "md",
              description: "Icon button size"
            },
            {
              name: "disabled",
              type: "boolean",
              required: false,
              defaultValue: "false",
              description: "Disable the icon button"
            },
            {
              name: "type",
              type: "string",
              required: false,
              defaultValue: "button",
              description: "HTML button type"
            },
            {
              name: "label",
              type: "string",
              required: false,
              defaultValue: "",
              description: "Accessible label for icon-only buttons"
            }
          ],
          variants: ["primary", "secondary", "danger", "ghost", "outline", "link"],
          examples: [
            {
              title: "Basic Usage",
              description: "Icon-only button with accessible label",
              code: "&lt;IconButton label=&quot;Favorite&quot;&gt;\n  &lt;Heart /&gt;\n&lt;/IconButton&gt;"
            },
            {
              title: "Variants",
              description: "Different icon button variants",
              code: '&lt;IconButton variant="primary" label="Favorite"&gt;\n  &lt;Heart /&gt;\n&lt;/IconButton&gt;\n&lt;IconButton variant="ghost" label="Favorite"&gt;\n  &lt;Heart /&gt;\n&lt;/IconButton&gt;'
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
          name: "List",
          category: "atoms",
          description: "Interactive list rows with hover states and right-arrow affordances",
          props: [
            {
              name: "items",
              type: "ListItem[]",
              required: true,
              defaultValue: "[]",
              description: "Array of list items with label, id, and optional link metadata"
            },
            {
              name: "ariaLabel",
              type: "string",
              required: false,
              defaultValue: "List items",
              description: "Accessible label for the list container"
            },
            {
              name: "selectedId",
              type: "string",
              required: false,
              defaultValue: "",
              description: "Current selected item id for active styling"
            },
            {
              name: "showArrow",
              type: "boolean",
              required: false,
              defaultValue: "true",
              description: "Toggle the right arrow icon visibility"
            },
            {
              name: "onclick",
              type: "(item, event) => void",
              required: false,
              defaultValue: "undefined",
              description: "Callback fired when an item is clicked"
            }
          ],
          variants: [],
          examples: [
            {
              title: "List with links",
              description: "Hoverable rows with optional descriptions and right-arrow affordance",
              code: `<List
  items={items}
  selectedId="billing"
  ariaLabel="Account navigation"
/>`
            },
            {
              title: "Arrow hidden",
              description: "Use a cleaner list style without right-arrow icons",
              code: `<List
  items={items}
  showArrow={false}
/>`
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
          name: "Select",
          category: "atoms",
          description: "Select dropdown with search, scrollable options, and variants",
          props: [
            {
              name: "options",
              type: "array",
              required: true,
              defaultValue: "[]",
              description: "Select options"
            },
            {
              name: "value",
              type: "string | number",
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
              name: "searchable",
              type: "boolean",
              required: false,
              defaultValue: "true",
              description: "Enable search input"
            },
            {
              name: "searchPlaceholder",
              type: "string",
              required: false,
              defaultValue: "Search options",
              description: "Search input placeholder"
            },
            {
              name: "maxMenuHeight",
              type: "string",
              required: false,
              defaultValue: "60vh",
              description: "Max height for the options list"
            }
          ],
          variants: ["default", "success", "warning", "error"],
          examples: [
            {
              title: "Searchable Select",
              description: "Select with search and scrollable options list",
              code: '&lt;Select label="Select a value" searchable={true} maxMenuHeight="50vh" options={options} /&gt;'
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
            }
          ],
          variants: [],
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
        },
        {
          name: "NavigationMenu",
          category: "molecules",
          description: "Navigation menu component with dropdowns, rich content, and keyboard navigation. Supports both data-driven and compound component APIs.",
          props: [
            {
              name: "items",
              type: "NavigationMenuItemData[]",
              required: false,
              defaultValue: "[]",
              description: "Array of menu items (data-driven API)"
            },
            {
              name: "viewport",
              type: "boolean | string",
              required: false,
              defaultValue: "true",
              description: "Enable viewport for mobile responsiveness"
            },
            {
              name: "className",
              type: "string",
              required: false,
              defaultValue: "",
              description: "Additional CSS classes"
            },
            {
              name: "listClassName",
              type: "string",
              required: false,
              defaultValue: "",
              description: "Additional CSS classes for the menu list"
            }
          ],
          variants: ["default", "simple", "with-icons", "with-descriptions"],
          examples: [
            {
              title: "Data-Driven API",
              description: "Simple navigation menu using items prop",
              code: '&lt;NavigationMenu items={[\n  { value: "home", label: "Home", content: [{ href: "/docs", label: "Introduction" }] },\n  { value: "docs", label: "Docs", href: "/docs" }\n]} /&gt;'
            },
            {
              title: "Compound Component API",
              description: "Navigation menu using sub-components for maximum flexibility",
              code: '&lt;NavigationMenu&gt;\n  &lt;NavigationMenuList&gt;\n    &lt;NavigationMenuItem value="home"&gt;\n      &lt;NavigationMenuTrigger value="home"&gt;Home&lt;/NavigationMenuTrigger&gt;\n      &lt;NavigationMenuContent value="home"&gt;\n        &lt;NavigationMenuLink href="/docs"&gt;Introduction&lt;/NavigationMenuLink&gt;\n      &lt;/NavigationMenuContent&gt;\n    &lt;/NavigationMenuItem&gt;\n  &lt;/NavigationMenuList&gt;\n&lt;/NavigationMenu&gt;'
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
        },
        {
          name: "SidebarNavigation",
          category: "organisms",
          description: "Sidebar navigation with collapsed and expanded modes, grouped links, badges, and utility controls.",
          props: [
            {
              name: "mode",
              type: '"expanded" | "collapsed"',
              required: false,
              defaultValue: '"expanded"',
              description: "Sidebar display mode"
            },
            {
              name: "items",
              type: "SidebarNavigationItem[]",
              required: false,
              defaultValue: "[]",
              description: "Primary and secondary sidebar items"
            },
            {
              name: "currentPath",
              type: "string",
              required: false,
              defaultValue: '""',
              description: "Active route path used for selected styling"
            }
          ],
          variants: ["expanded", "collapsed"],
          examples: [
            {
              title: "Searchable Input Mode",
              description: "Search input filters visible navigation items while preserving grouped structure.",
              code: "&lt;SidebarNavigation mode=&quot;expanded&quot; searchMode=&quot;input&quot; items={sidebarNavItems} currentPath=&quot;/revenue&quot; /&gt;"
            },
            {
              title: "Trigger Button Mode",
              description: "Use a search trigger button to open an adjacent picker panel.",
              code: "&lt;SidebarNavigation mode=&quot;expanded&quot; searchMode=&quot;button&quot; onSearchClick={() =&gt; (panelOpen = true)} /&gt;"
            }
          ]
        },
        {
          name: "SidebarProjectPanel",
          category: "organisms",
          description: "Companion panel for sidebar search-trigger flows, designed for project picking and quick context switching.",
          props: [
            {
              name: "items",
              type: "SidebarProjectPanelItem[]",
              required: false,
              defaultValue: "[]",
              description: "Selectable panel items with optional descriptions and badges"
            },
            {
              name: "searchValue",
              type: "string",
              required: false,
              defaultValue: '""',
              description: "Controlled search value for filtering panel items"
            },
            {
              name: "selectedItemId",
              type: "string",
              required: false,
              defaultValue: '""',
              description: "Currently selected item id"
            }
          ],
          variants: ["default", "empty state"],
          examples: [
            {
              title: "Project Picker",
              description: "Search and select a project from a dedicated side panel.",
              code: "&lt;SidebarProjectPanel items={projectItems} bind:selectedItemId bind:searchValue /&gt;"
            }
          ]
        }
      ]
    };
    let currentComponents = (() => {
      if (selectedCategory === "all") {
        return [
          ...components.atoms,
          ...components.molecules,
          ...components.organisms
        ];
      }
      return components[selectedCategory] || [];
    })();
    const docsSidebarCurrentPath = selectedComponent ? `component:${selectedComponent}` : `category:${selectedCategory}`;
    function getDocsCategoryIcon(categoryId) {
      if (categoryId === "all") return House;
      if (categoryId === "molecules") return Chart_pie;
      if (categoryId === "organisms") return Package;
      return Circle;
    }
    function getDocsComponentIcon(componentName, componentCategory) {
      if (componentName.includes("Navigation")) return House;
      if (componentName.includes("Form") || componentName === "Input" || componentName === "Textarea" || componentName === "Select" || componentName === "Checkbox" || componentName === "Toggle") {
        return Circle_check;
      }
      if (componentName === "Alert" || componentName === "Toast") return Bell;
      if (componentCategory === "molecules") return Chart_pie;
      if (componentCategory === "organisms") return Package;
      return Circle;
    }
    const docsSidebarItems = (() => {
      const categoryItems = categories.map((category) => ({
        id: `category-${category.id}`,
        label: category.label,
        href: `category:${category.id}`,
        icon: getDocsCategoryIcon(category.id),
        badgeText: category.id === "all" ? components.atoms.length + components.molecules.length + components.organisms.length : components[category.id]?.length,
        group: "primary"
      }));
      const componentItems = currentComponents.map((component) => ({
        id: `component-${component.name.toLowerCase()}`,
        label: component.name,
        href: `component:${component.name.toLowerCase()}`,
        icon: getDocsComponentIcon(component.name, component.category),
        group: "secondary"
      }));
      return [...categoryItems, ...componentItems];
    })();
    function handleDocsSidebarNavigate(item, event) {
      event.preventDefault();
      const [targetType, targetValue] = item.href.split(":");
      if (!targetValue) {
        return;
      }
      if (targetType === "category") {
        selectedCategory = targetValue;
        const firstComponent = targetValue === "all" ? [
          ...components.atoms,
          ...components.molecules,
          ...components.organisms
        ][0] : components[targetValue]?.[0];
        selectedComponent = firstComponent ? firstComponent.name.toLowerCase() : "";
      } else if (targetType === "component") {
        selectedComponent = targetValue;
      }
      sidebarOpen = false;
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("136c6pl", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Components - Zabi Components</title>`);
        });
        $$renderer4.push(`<meta name="description" content="Interactive component showcase and documentation"/>`);
      });
      $$renderer3.push(`<div class="min-h-screen bg-background"><header class="flex items-center justify-between p-4 bg-base-50 border-b border-border"><div class="flex items-center gap-4"><button type="button" class="md:hidden text-description hover:text-headline text-2xl cursor-pointer transition-colors" aria-label="Toggle sidebar">☰</button> <h1 class="text-xl font-bold text-headline">Zabi Components</h1></div> <div class="hidden md:flex items-center gap-4">`);
      Navigation($$renderer3, { variant: "header", items: navItems });
      $$renderer3.push(`<!----> `);
      ThemeToggle($$renderer3, {});
      $$renderer3.push(`<!----></div> <button type="button" class="md:hidden text-description hover:text-headline text-2xl cursor-pointer transition-colors" aria-label="Toggle navigation" aria-controls="mobile-navigation"${attr("aria-expanded", navMenuOpen)}>☰</button></header> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <main class="flex min-h-screen">`);
      if (sidebarOpen) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<button type="button" class="fixed inset-0 z-20 bg-black/30 md:hidden" aria-label="Close components sidebar"></button>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <div${attr_class(`fixed left-0 top-0 z-30 h-screen transform bg-background transition-transform duration-200 md:static md:z-0 md:h-auto ${stringify(sidebarOpen ? "translate-x-0" : "-translate-x-full")} md:translate-x-0`)}>`);
      SidebarNavigation($$renderer3, {
        mode: "expanded",
        items: docsSidebarItems,
        currentPath: docsSidebarCurrentPath,
        searchMode: "input",
        showProfile: false,
        showThemeToggle: false,
        showLogout: false,
        emptyStateTitle: "No navigation matches",
        emptyStateDescription: "Try another term to find categories or components.",
        onNavigate: handleDocsSidebarNavigate,
        get searchValue() {
          return componentsNavSearch;
        },
        set searchValue($$value) {
          componentsNavSearch = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div class="flex-1 p-8"><!--[-->`);
      const each_array = ensure_array_like(currentComponents);
      for (let $$index_4 = 0, $$length = each_array.length; $$index_4 < $$length; $$index_4++) {
        let component = each_array[$$index_4];
        if (selectedComponent === component.name.toLowerCase()) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="max-w-4xl"><div class="mb-8"><h1 class="text-3xl font-bold text-headline mb-2">${escape_html(component.name)}</h1> <p class="text-lg text-description mb-4">${escape_html(component.description)}</p> <div class="flex gap-2">`);
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
            const each_array_1 = ensure_array_like(component.variants);
            for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
              let variant = each_array_1[$$index];
              $$renderer3.push(`<span class="rounded-md bg-base-100 px-2 py-1 text-xs text-headline">${escape_html(variant)}</span>`);
            }
            $$renderer3.push(`<!--]--></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div> <div class="space-y-8"><!--[-->`);
          const each_array_2 = ensure_array_like(component.examples);
          for (let $$index_2 = 0, $$length2 = each_array_2.length; $$index_2 < $$length2; $$index_2++) {
            let example = each_array_2[$$index_2];
            ComponentDemo($$renderer3, {
              title: example.title,
              description: example.description,
              code: example.code,
              language: example.language || "svelte",
              children: ($$renderer4) => {
                if (component.name === "Button") {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<div class="space-y-4"><div class="flex flex-wrap items-center gap-2"><span class="text-sm font-medium text-headline">Variants:</span> <!--[-->`);
                  const each_array_3 = ensure_array_like(component.variants);
                  for (let $$index_1 = 0, $$length3 = each_array_3.length; $$index_1 < $$length3; $$index_1++) {
                    let variant = each_array_3[$$index_1];
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
                      $$renderer4.push(`<div class="space-y-4 max-w-md">`);
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
                          $$renderer4.push(`<div class="max-w-xl space-y-4">`);
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
                              $$renderer4.push(`<div class="max-w-md">`);
                              ContactForm($$renderer4, {});
                              $$renderer4.push(`<!----></div>`);
                            } else {
                              $$renderer4.push("<!--[!-->");
                              if (component.name === "Dropdown") {
                                $$renderer4.push("<!--[-->");
                                $$renderer4.push(`<div class="space-y-4 max-w-md">`);
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
                                  $$renderer4.push(`<div class="max-w-md">`);
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
                                    $$renderer4.push(`<div class="max-w-md">`);
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
                                          $$renderer4.push(`<div class="max-w-2xl">`);
                                          Tabs($$renderer4, {
                                            tabs: [
                                              { id: "tab1", label: "Overview" },
                                              { id: "tab2", label: "Details" },
                                              { id: "tab3", label: "Settings" }
                                            ],
                                            activeTab: "tab1",
                                            children: ($$renderer5) => {
                                              {
                                                $$renderer5.push("<!--[-->");
                                                $$renderer5.push(`<p>This is the overview tab
                                                        content.</p>`);
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
                                            if (component.name === "Navbar") {
                                              $$renderer4.push("<!--[-->");
                                              $$renderer4.push(`<div class="space-y-4">`);
                                              {
                                                let nav = function($$renderer5) {
                                                  Navigation($$renderer5, {
                                                    items: [
                                                      { label: "Home", href: "/" },
                                                      { label: "Components", href: "/components" },
                                                      { label: "Docs", href: "/docs" }
                                                    ]
                                                  });
                                                };
                                                Navbar($$renderer4, { brand: "Zabi Components", nav, $$slots: { nav: true } });
                                              }
                                              $$renderer4.push(`<!----> `);
                                              {
                                                let nav = function($$renderer5) {
                                                  Navigation($$renderer5, {
                                                    items: [
                                                      { label: "About", href: "/about" },
                                                      { label: "Contact", href: "/contact" }
                                                    ]
                                                  });
                                                };
                                                Navbar($$renderer4, { brand: "Brand", nav, $$slots: { nav: true } });
                                              }
                                              $$renderer4.push(`<!----></div>`);
                                            } else {
                                              $$renderer4.push("<!--[!-->");
                                              if (component.name === "Navigation") {
                                                $$renderer4.push("<!--[-->");
                                                $$renderer4.push(`<div class="space-y-6"><div><h4 class="text-sm font-medium text-headline mb-2">Default Navigation</h4> `);
                                                Navigation($$renderer4, {
                                                  items: [
                                                    { label: "Home", href: "/" },
                                                    { label: "About", href: "/about" },
                                                    { label: "Contact", href: "/contact" }
                                                  ]
                                                });
                                                $$renderer4.push(`<!----></div> <div><h4 class="text-sm font-medium text-headline mb-2">Header Navigation</h4> `);
                                                Navigation($$renderer4, {
                                                  items: [
                                                    { label: "Dashboard", href: "/dashboard" },
                                                    { label: "Profile", href: "/profile" },
                                                    { label: "Settings", href: "/settings" }
                                                  ]
                                                });
                                                $$renderer4.push(`<!----></div></div>`);
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
                                                  $$renderer4.push(`<!----></div></div> <div><h4 class="text-sm font-medium text-headline mb-2">Trigger Button + Project Panel</h4> <div class="flex flex-wrap items-start gap-4">`);
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
                                                    SidebarProjectPanel($$renderer4, {
                                                      title: "Project picker",
                                                      subtitle: "Search and switch projects",
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
                                                  if (component.name === "SidebarProjectPanel") {
                                                    $$renderer4.push("<!--[-->");
                                                    $$renderer4.push(`<div class="space-y-6">`);
                                                    SidebarProjectPanel($$renderer4, {
                                                      title: "Project picker",
                                                      subtitle: "Search and switch projects",
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
                                                    SidebarProjectPanel($$renderer4, {
                                                      title: "Empty projects",
                                                      subtitle: "First-time setup state",
                                                      items: [],
                                                      emptyStateTitle: "No projects yet",
                                                      emptyStateDescription: "Create your first project to get started."
                                                    });
                                                    $$renderer4.push(`<!----></div>`);
                                                  } else {
                                                    $$renderer4.push("<!--[!-->");
                                                    if (component.name === "ColorPicker") {
                                                      $$renderer4.push("<!--[-->");
                                                      $$renderer4.push(`<div class="space-y-6 max-w-md">`);
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
                                                          $$renderer4.push(`<div class="space-y-4 max-w-md">`);
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
                                                            $$renderer4.push(`<div class="space-y-6 w-full max-w-md">`);
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
                                                              $$renderer4.push(`<div class="max-w-2xl">`);
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
                                                                    $$renderer4.push(`<div class="space-y-4 max-w-md">`);
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
                                                                      $$renderer4.push(`<div class="space-y-4 max-w-md">`);
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
                                                                        $$renderer4.push(`<div class="space-y-4 max-w-md">`);
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
                }
                $$renderer4.push(`<!--]-->`);
              },
              $$slots: { default: true }
            });
          }
          $$renderer3.push(`<!--]--></div> <div class="mt-12"><h2 class="text-2xl font-bold text-headline mb-6">Props</h2> <div class="overflow-x-auto"><table class="w-full border-collapse border border-border"><thead><tr class="bg-base-100"><th class="border border-border px-4 py-2 text-left text-headline font-semibold">Name</th><th class="border border-border px-4 py-2 text-left text-headline font-semibold">Type</th><th class="border border-border px-4 py-2 text-left text-headline font-semibold">Required</th><th class="border border-border px-4 py-2 text-left text-headline font-semibold">Default</th><th class="border border-border px-4 py-2 text-left text-headline font-semibold">Description</th></tr></thead><tbody><!--[-->`);
          const each_array_4 = ensure_array_like(component.props);
          for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
            let prop = each_array_4[$$index_3];
            $$renderer3.push(`<tr><td class="border border-border px-4 py-2 text-body font-mono">${escape_html(prop.name)}</td><td class="border border-border px-4 py-2 text-description">${escape_html(prop.type)}</td><td class="border border-border px-4 py-2 text-description">${escape_html(prop.required ? "Yes" : "No")}</td><td class="border border-border px-4 py-2 text-description">${escape_html(prop.defaultValue || "-")}</td><td class="border border-border px-4 py-2 text-description">${escape_html(prop.description)}</td></tr>`);
          }
          $$renderer3.push(`<!--]--></tbody></table></div></div></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]--></div></main> <footer class="bg-base-100 border-t border-border py-8"><div class="container mx-auto px-6"><div class="flex flex-col md:flex-row justify-between items-center gap-4"><div class="text-center md:text-left"><p class="text-description mb-2">Clean components that just work. Less is more.</p> <p class="text-sm text-caption">© 2024 Zabi Components. MIT License.</p></div> <div class="flex gap-6"><a href="/docs" class="text-description hover:text-headline transition-colors">Docs</a> <a href="/components" class="text-description hover:text-headline transition-colors">Components</a> <a href="https://github.com" class="text-description hover:text-headline transition-colors">GitHub</a></div></div></div></footer></div>`);
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
