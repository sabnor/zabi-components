import { $ as spread_props, Z as stringify, Y as attr, X as attr_class, a0 as attributes, a1 as clsx, a2 as bind_props, _ as ensure_array_like, a3 as attr_style, a4 as element, V as store_get, W as unsubscribe_stores, U as head } from "../../../../chunks/index2.js";
import { H as Heading, a as Heart, C as CodeBlock } from "../../../../chunks/Heading.js";
import { C as Card, a as CardHeader, b as CardContent } from "../../../../chunks/CardHeader.js";
import "clsx";
import { B as Button } from "../../../../chunks/Button.js";
import { I as Input, d as Search, S as SidebarNavigation, s as sidebarNavItems, e as sidebarProjectItems, f as Circle_alert, g as Circle_check_big, B as Bell, a as Circle, b as Circle_check, h as sidebarAppShellDemoItems, i as selectOptions, j as sampleCode, k as SidebarBrandHeader, l as SidebarFooter, m as SidebarNavSection } from "../../../../chunks/components-showcase-constants.js";
import { M as Modal, S as SELECTION_CONTROL_LABEL_ROW, s as selectionControlShellClasses, a as selectionControlRingOverlayClasses, b as RADIO_CHECKED_DOT_CLASSES, R as RadioGroup, o as onDestroy, N as NavigationMenu, c as NavigationMenuList, d as NavigationMenuItem, e as NavigationMenuTrigger, f as NavigationMenuContent, g as NavigationMenuLink, C as CardFooter, T as Tooltip } from "../../../../chunks/RadioGroup.js";
import { e as escape_html } from "../../../../chunks/context.js";
import { g as generateId } from "../../../../chunks/ssr-safe.js";
import { X, B as Badge, T as Triangle_alert, I as Info } from "../../../../chunks/Badge.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { I as IconButton } from "../../../../chunks/IconButton.js";
import { w as writable } from "../../../../chunks/index.js";
import { S as Sun, T as TopNavbar, a as ThemeToggle } from "../../../../chunks/TopNavbar.js";
import { A as ActionPanel } from "../../../../chunks/ActionPanel.js";
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
function Credit_card($$renderer, $$props) {
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
        { "width": "20", "height": "14", "x": "2", "y": "5", "rx": "2" }
      ],
      ["line", { "x1": "2", "x2": "22", "y1": "10", "y2": "10" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "credit-card" },
      /**
       * @component @name CreditCard
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHg9IjIiIHk9IjUiIHJ4PSIyIiAvPgogIDxsaW5lIHgxPSIyIiB4Mj0iMjIiIHkxPSIxMCIgeTI9IjEwIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/credit-card
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
function Log_out($$renderer, $$props) {
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
      ["path", { "d": "m16 17 5-5-5-5" }],
      ["path", { "d": "M21 12H9" }],
      ["path", { "d": "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "log-out" },
      /**
       * @component @name LogOut
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTYgMTcgNS01LTUtNSIgLz4KICA8cGF0aCBkPSJNMjEgMTJIOSIgLz4KICA8cGF0aCBkPSJNOSAyMUg1YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDQiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/log-out
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
function Moon($$renderer, $$props) {
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
          "d": "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
        }
      ]
    ];
    Icon($$renderer2, spread_props([
      { name: "moon" },
      /**
       * @component @name Moon
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjAuOTg1IDEyLjQ4NmE5IDkgMCAxIDEtOS40NzMtOS40NzJjLjQwNS0uMDIyLjYxNy40Ni40MDIuODAzYTYgNiAwIDAgMCA4LjI2OCA4LjI2OGMuMzQ0LS4yMTUuODI1LS4wMDQuODAzLjQwMSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/moon
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
function Shield_check($$renderer, $$props) {
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
          "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
        }
      ],
      ["path", { "d": "m9 12 2 2 4-4" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "shield-check" },
      /**
       * @component @name ShieldCheck
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjAgMTNjMCA1LTMuNSA3LjUtNy42NiA4Ljk1YTEgMSAwIDAgMS0uNjctLjAxQzcuNSAyMC41IDQgMTggNCAxM1Y2YTEgMSAwIDAgMSAxLTFjMiAwIDQuNS0xLjIgNi4yNC0yLjcyYTEuMTcgMS4xNyAwIDAgMSAxLjUyIDBDMTQuNTEgMy44MSAxNyA1IDE5IDVhMSAxIDAgMCAxIDEgMXoiIC8+CiAgPHBhdGggZD0ibTkgMTIgMiAyIDQtNCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/shield-check
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
function Shield($$renderer, $$props) {
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
          "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
        }
      ]
    ];
    Icon($$renderer2, spread_props([
      { name: "shield" },
      /**
       * @component @name Shield
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjAgMTNjMCA1LTMuNSA3LjUtNy42NiA4Ljk1YTEgMSAwIDAgMS0uNjctLjAxQzcuNSAyMC41IDQgMTggNCAxM1Y2YTEgMSAwIDAgMSAxLTFjMiAwIDQuNS0xLjIgNi4yNC0yLjcyYTEuMTcgMS4xNyAwIDAgMSAxLjUyIDBDMTQuNTEgMy44MSAxNyA1IDE5IDVhMSAxIDAgMCAxIDEgMXoiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/shield
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
function Sparkles($$renderer, $$props) {
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
          "d": "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
        }
      ],
      ["path", { "d": "M20 2v4" }],
      ["path", { "d": "M22 4h-4" }],
      ["circle", { "cx": "4", "cy": "20", "r": "2" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "sparkles" },
      /**
       * @component @name Sparkles
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTEuMDE3IDIuODE0YTEgMSAwIDAgMSAxLjk2NiAwbDEuMDUxIDUuNTU4YTIgMiAwIDAgMCAxLjU5NCAxLjU5NGw1LjU1OCAxLjA1MWExIDEgMCAwIDEgMCAxLjk2NmwtNS41NTggMS4wNTFhMiAyIDAgMCAwLTEuNTk0IDEuNTk0bC0xLjA1MSA1LjU1OGExIDEgMCAwIDEtMS45NjYgMGwtMS4wNTEtNS41NThhMiAyIDAgMCAwLTEuNTk0LTEuNTk0bC01LjU1OC0xLjA1MWExIDEgMCAwIDEgMC0xLjk2Nmw1LjU1OC0xLjA1MWEyIDIgMCAwIDAgMS41OTQtMS41OTR6IiAvPgogIDxwYXRoIGQ9Ik0yMCAydjQiIC8+CiAgPHBhdGggZD0iTTIyIDRoLTQiIC8+CiAgPGNpcmNsZSBjeD0iNCIgY3k9IjIwIiByPSIyIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/sparkles
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
function User($$renderer, $$props) {
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
      ["path", { "d": "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }],
      ["circle", { "cx": "12", "cy": "7", "r": "4" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "user" },
      /**
       * @component @name User
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTkgMjF2LTJhNCA0IDAgMCAwLTQtNEg5YTQgNCAwIDAgMC00IDR2MiIgLz4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/user
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
function Zap($$renderer, $$props) {
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
          "d": "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
        }
      ]
    ];
    Icon($$renderer2, spread_props([
      { name: "zap" },
      /**
       * @component @name Zap
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNCAxNGExIDEgMCAwIDEtLjc4LTEuNjNsOS45LTEwLjJhLjUuNSAwIDAgMSAuODYuNDZsLTEuOTIgNi4wMkExIDEgMCAwIDAgMTMgMTBoN2ExIDEgMCAwIDEgLjc4IDEuNjNsLTkuOSAxMC4yYS41LjUgMCAwIDEtLjg2LS40NmwxLjkyLTYuMDJBMSAxIDAgMCAwIDExIDE0eiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/zap
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
      className: `overflow-visible ${stringify(className)}`
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
              $$renderer3.push(`<div class="min-h-[100px] w-full min-w-0 py-4">`);
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
function ButtonDemo($$renderer, $$props) {
  let { exampleIndex } = $$props;
  if (exampleIndex === 0) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="w-full">`);
    Button($$renderer, {
      children: ($$renderer2) => {
        $$renderer2.push(`<!---->Save changes`);
      },
      $$slots: { default: true }
    });
    $$renderer.push(`<!----></div>`);
  } else {
    $$renderer.push("<!--[!-->");
    if (exampleIndex === 1) {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<div class="flex flex-wrap items-center gap-2">`);
      Button($$renderer, {
        variant: "primary",
        children: ($$renderer2) => {
          $$renderer2.push(`<!---->Primary`);
        },
        $$slots: { default: true }
      });
      $$renderer.push(`<!----> `);
      Button($$renderer, {
        variant: "secondary",
        children: ($$renderer2) => {
          $$renderer2.push(`<!---->Secondary`);
        },
        $$slots: { default: true }
      });
      $$renderer.push(`<!----> `);
      Button($$renderer, {
        variant: "outline",
        children: ($$renderer2) => {
          $$renderer2.push(`<!---->Outline`);
        },
        $$slots: { default: true }
      });
      $$renderer.push(`<!----> `);
      Button($$renderer, {
        variant: "ghost",
        children: ($$renderer2) => {
          $$renderer2.push(`<!---->Ghost`);
        },
        $$slots: { default: true }
      });
      $$renderer.push(`<!----> `);
      Button($$renderer, {
        variant: "link",
        children: ($$renderer2) => {
          $$renderer2.push(`<!---->Link`);
        },
        $$slots: { default: true }
      });
      $$renderer.push(`<!----> `);
      Button($$renderer, {
        variant: "danger",
        children: ($$renderer2) => {
          $$renderer2.push(`<!---->Delete`);
        },
        $$slots: { default: true }
      });
      $$renderer.push(`<!----></div>`);
    } else {
      $$renderer.push("<!--[!-->");
      if (exampleIndex === 2) {
        $$renderer.push("<!--[-->");
        $$renderer.push(`<div class="flex flex-wrap items-center gap-2">`);
        Button($$renderer, {
          disabled: true,
          children: ($$renderer2) => {
            $$renderer2.push(`<!---->Saving…`);
          },
          $$slots: { default: true }
        });
        $$renderer.push(`<!----> `);
        Button($$renderer, {
          variant: "secondary",
          disabled: true,
          children: ($$renderer2) => {
            $$renderer2.push(`<!---->Cancel`);
          },
          $$slots: { default: true }
        });
        $$renderer.push(`<!----></div>`);
      } else {
        $$renderer.push("<!--[!-->");
        $$renderer.push(`<div class="flex flex-wrap items-center gap-2">`);
        Button($$renderer, {
          children: ($$renderer2) => {
            $$renderer2.push(`<!---->Button`);
          },
          $$slots: { default: true }
        });
        $$renderer.push(`<!----></div>`);
      }
      $$renderer.push(`<!--]-->`);
    }
    $$renderer.push(`<!--]-->`);
  }
  $$renderer.push(`<!--]-->`);
}
function InputDemo($$renderer, $$props) {
  let { exampleIndex } = $$props;
  let email = "name@company.com";
  let $$settled = true;
  let $$inner_renderer;
  function $$render_inner($$renderer2) {
    if (exampleIndex === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="w-full">`);
      Input($$renderer2, {
        label: "Email address",
        type: "email",
        placeholder: "name@company.com",
        get value() {
          return email;
        },
        set value($$value) {
          email = $$value;
          $$settled = false;
        }
      });
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (exampleIndex === 1) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">`);
        Input($$renderer2, {
          label: "Email address",
          type: "email",
          placeholder: "name@company.com",
          get value() {
            return email;
          },
          set value($$value) {
            email = $$value;
            $$settled = false;
          }
        });
        $$renderer2.push(`<!----> `);
        Input($$renderer2, {
          variant: "error",
          label: "Email address",
          type: "email",
          placeholder: "name@company.com",
          get value() {
            return email;
          },
          set value($$value) {
            email = $$value;
            $$settled = false;
          }
        });
        $$renderer2.push(`<!----></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="w-full">`);
        Input($$renderer2, {
          label: "Email address",
          type: "email",
          get value() {
            return email;
          },
          set value($$value) {
            email = $$value;
            $$settled = false;
          }
        });
        $$renderer2.push(`<!----></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
  }
  do {
    $$settled = true;
    $$inner_renderer = $$renderer.copy();
    $$render_inner($$inner_renderer);
  } while (!$$settled);
  $$renderer.subsume($$inner_renderer);
}
function ModalDemo($$renderer, $$props) {
  let { exampleIndex } = $$props;
  let modalOpen = false;
  let $$settled = true;
  let $$inner_renderer;
  function $$render_inner($$renderer2) {
    if (exampleIndex === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="w-full">`);
      Button($$renderer2, {
        onclick: () => modalOpen = true,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Open modal`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      Modal($$renderer2, {
        title: "Confirm changes",
        get isOpen() {
          return modalOpen;
        },
        set isOpen($$value) {
          modalOpen = $$value;
          $$settled = false;
        },
        children: ($$renderer3) => {
          $$renderer3.push(`<p class="text-description">This change affects all team members.</p> <div class="mt-4 flex justify-end gap-2">`);
          Button($$renderer3, {
            variant: "secondary",
            onclick: () => modalOpen = false,
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->Cancel`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> `);
          Button($$renderer3, {
            variant: "primary",
            onclick: () => modalOpen = false,
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->Confirm`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----></div>`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="w-full">`);
      Button($$renderer2, {
        onclick: () => modalOpen = true,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->Open modal`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      Modal($$renderer2, {
        title: "Confirm changes",
        get isOpen() {
          return modalOpen;
        },
        set isOpen($$value) {
          modalOpen = $$value;
          $$settled = false;
        },
        children: ($$renderer3) => {
          $$renderer3.push(`<p class="text-description">Modal content</p>`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  }
  do {
    $$settled = true;
    $$inner_renderer = $$renderer.copy();
    $$render_inner($$inner_renderer);
  } while (!$$settled);
  $$renderer.subsume($$inner_renderer);
}
function SelectionControl($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id: idProp,
      type,
      shape,
      name = "",
      value = "",
      label = "",
      disabled = false,
      loading = false,
      defaultChecked = false,
      checked = defaultChecked,
      onChange,
      onchange,
      mark: mark2,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const fallbackId = generateId("selection-control");
    const controlId = idProp ?? fallbackId;
    const isDisabled = disabled || loading;
    const labelWrapperClasses = SELECTION_CONTROL_LABEL_ROW;
    const controlContainerClasses = selectionControlShellClasses(shape);
    const controlRingClasses = selectionControlRingOverlayClasses(shape);
    $$renderer2.push(`<div class="flex items-center gap-2"><label${attr("for", controlId)}${attr_class(clsx(labelWrapperClasses))}><span${attr_class(clsx(controlContainerClasses))}><input${attributes(
      {
        type,
        id: controlId,
        name,
        value,
        checked,
        disabled: isDisabled,
        class: "sr-only",
        "aria-busy": loading ? "true" : void 0,
        ...restProps
      },
      void 0,
      void 0,
      void 0,
      4
    )}/> <span${attr_class(clsx(controlRingClasses))}></span> `);
    if (mark2) {
      $$renderer2.push("<!--[-->");
      mark2($$renderer2, { checked, loading, disabled: isDisabled });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></span> `);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-sm font-medium text-label">${escape_html(label)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></label></div>`);
    bind_props($$props, { checked });
  });
}
function mark$1($$renderer, _props) {
  $$renderer.push(`<span${attr_class(clsx(RADIO_CHECKED_DOT_CLASSES))} aria-hidden="true"></span>`);
}
function Radio($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id,
      name = "",
      value = "",
      label = "",
      disabled = false,
      defaultChecked = false,
      checked = defaultChecked,
      onChange,
      onchange,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      SelectionControl($$renderer3, spread_props([
        {
          type: "radio",
          shape: "circle",
          id,
          name,
          value,
          label,
          disabled,
          defaultChecked,
          onChange,
          onchange,
          mark: mark$1
        },
        restProps,
        {
          get checked() {
            return checked;
          },
          set checked($$value) {
            checked = $$value;
            $$settled = false;
          }
        }
      ]));
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { checked });
  });
}
function RadioDemo($$renderer, $$props) {
  let { exampleIndex } = $$props;
  let plan = "basic";
  let cadence = "annual";
  let notifications = "all";
  let selectedPlan = "team";
  let $$settled = true;
  let $$inner_renderer;
  function $$render_inner($$renderer2) {
    if (exampleIndex === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="w-full space-y-3"><p class="text-sm text-description">Pick a plan (native grouping via shared name).</p> <div class="space-y-2">`);
      Radio($$renderer2, {
        name: "plan-demo",
        value: "basic",
        label: "Basic plan",
        checked: plan === "basic",
        onChange: () => plan = "basic"
      });
      $$renderer2.push(`<!----> `);
      Radio($$renderer2, {
        name: "plan-demo",
        value: "pro",
        label: "Pro plan",
        checked: plan === "pro",
        onChange: () => plan = "pro"
      });
      $$renderer2.push(`<!----></div> <p class="text-sm text-description">Selected: ${escape_html(plan)}</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (exampleIndex === 1) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="w-full">`);
        RadioGroup($$renderer2, {
          legend: "Billing cadence",
          options: [
            { value: "monthly", label: "Monthly" },
            {
              value: "annual",
              label: "Annual",
              description: "Save 20% with annual billing"
            }
          ],
          get value() {
            return cadence;
          },
          set value($$value) {
            cadence = $$value;
            $$settled = false;
          }
        });
        $$renderer2.push(`<!----></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (exampleIndex === 2) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="w-full space-y-4">`);
          RadioGroup($$renderer2, {
            legend: "Notifications (disabled group)",
            disabled: true,
            options: [
              { value: "all", label: "All activity" },
              { value: "mentions", label: "Mentions only" }
            ],
            get value() {
              return notifications;
            },
            set value($$value) {
              notifications = $$value;
              $$settled = false;
            }
          });
          $$renderer2.push(`<!----> `);
          RadioGroup($$renderer2, {
            legend: "Notifications (disabled option)",
            options: [
              { value: "all", label: "All activity" },
              {
                value: "mentions",
                label: "Mentions only",
                disabled: true,
                description: "Unavailable on your current plan"
              }
            ],
            get value() {
              return notifications;
            },
            set value($$value) {
              notifications = $$value;
              $$settled = false;
            }
          });
          $$renderer2.push(`<!----></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (exampleIndex === 3) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="w-full space-y-3">`);
            RadioGroup($$renderer2, {
              legend: "Choose a plan",
              options: [
                {
                  value: "starter",
                  label: "Starter",
                  description: "For personal projects"
                },
                {
                  value: "team",
                  label: "Team",
                  description: "For collaborating with others"
                },
                {
                  value: "enterprise",
                  label: "Enterprise",
                  description: "Advanced controls and SSO"
                }
              ],
              get value() {
                return selectedPlan;
              },
              set value($$value) {
                selectedPlan = $$value;
                $$settled = false;
              }
            });
            $$renderer2.push(`<!----> <div class="rounded-lg border border-base-200 bg-base-50 p-3"><p class="text-sm font-medium text-label">Summary</p> <p class="text-sm text-description mt-1">Selected plan: <span class="text-body">${escape_html(selectedPlan)}</span></p></div></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<div class="w-full">`);
            RadioGroup($$renderer2, {
              legend: "Example",
              options: [
                { value: "a", label: "Option A" },
                { value: "b", label: "Option B" }
              ]
            });
            $$renderer2.push(`<!----></div>`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
  }
  do {
    $$settled = true;
    $$inner_renderer = $$renderer.copy();
    $$render_inner($$inner_renderer);
  } while (!$$settled);
  $$renderer.subsume($$inner_renderer);
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
      const shell = isElevated ? "rounded-3xl border border-border bg-card text-headline shadow-md ring-1 ring-border/50" : "rounded-3xl border border-border bg-card text-headline shadow-sm";
      return `${resolvedWidthClass} shrink-0 p-5 ${shell} ${className}`.trim();
    })();
    function getItemClasses(itemId) {
      const isActive = selectedItemId === itemId;
      const baseClasses = "focus-ring focus-ring--nav w-full cursor-pointer rounded-lg px-3 py-2.5 text-left transition-colors duration-150";
      if (isActive) {
        return `${baseClasses} bg-nav-menu-active text-inherit shadow-sm ring-1 ring-border/80`;
      }
      return `${baseClasses} text-nav-menu-item hover:bg-nav-menu-hover hover:text-nav-menu-item-hover active:bg-base-200`;
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<aside${attributes({
        class: clsx(containerClasses),
        "aria-label": ariaLabel,
        ...restProps
      })}><div class="mb-5 flex items-start justify-between gap-3"><div class="min-w-0 pr-1"><h3 class="truncate text-base font-semibold tracking-tight text-headline">${escape_html(title)}</h3> <p class="mt-0.5 text-sm leading-relaxed text-description">${escape_html(subtitle)}</p></div> <button type="button" class="-mr-0.5 -mt-0.5 inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-nav-menu-item transition-colors hover:bg-nav-menu-hover hover:text-nav-menu-item-hover focus-ring focus-ring--nav"${attr("aria-label", closeLabel)}>`);
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
          class: "w-full min-w-0 min-h-10 rounded-xl border-transparent !bg-transparent py-2 pl-10 text-sm ring-1 ring-border/60 hover:!bg-nav-menu-hover focus:!bg-transparent focus-ring focus-ring--nav",
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
        $$renderer3.push(`<div class="rounded-xl border border-dashed border-border bg-transparent px-3.5 py-4 ring-1 ring-border/40"><h4 class="text-sm font-semibold text-headline">${escape_html(emptyStateTitle)}</h4> <p class="mt-1 text-sm leading-relaxed text-description">${escape_html(emptyStateDescription)}</p> `);
        if (emptyStateActionLabel.trim() && onEmptyStateAction) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<button type="button" class="mt-3 inline-flex min-h-10 cursor-pointer items-center rounded-lg bg-action-primary px-3 py-2 text-sm font-medium text-action-primary transition-colors hover:bg-action-primary-hover focus-ring focus-ring--nav">${escape_html(emptyStateActionLabel.trim())}</button>`);
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
function SidebarNavigationDemo($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      exampleIndex,
      sidebarPath = "/revenue",
      sidebarSearchValue = "Revenue",
      sidebarSearchPanelOpen = false,
      sidebarProjectSearch = "",
      selectedProjectId = "proj-zabi-web"
    } = $$props;
    function handleNavigate(item, event) {
      event.preventDefault();
      sidebarPath = item.href;
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (exampleIndex === 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="w-full max-w-md">`);
        SidebarNavigation($$renderer3, {
          mode: "expanded",
          items: sidebarNavItems,
          currentPath: sidebarPath,
          onNavigate: handleNavigate,
          onSearchClick: () => {
            sidebarSearchPanelOpen = !sidebarSearchPanelOpen;
          },
          get searchValue() {
            return sidebarSearchValue;
          },
          set searchValue($$value) {
            sidebarSearchValue = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
        if (exampleIndex === 1) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="flex w-full flex-col gap-4 md:flex-row"><div class="w-full max-w-md">`);
          SidebarNavigation($$renderer3, {
            mode: "expanded",
            searchMode: "button",
            items: sidebarNavItems,
            currentPath: sidebarPath,
            searchValue: selectedProjectId ? sidebarProjectItems.find((item) => item.id === selectedProjectId)?.label || "Search projects" : "Search projects",
            onNavigate: handleNavigate,
            onSearchClick: () => {
              sidebarSearchPanelOpen = !sidebarSearchPanelOpen;
            }
          });
          $$renderer3.push(`<!----></div> `);
          if (sidebarSearchPanelOpen) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="w-full max-w-md">`);
            SidebarPanel($$renderer3, {
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
            $$renderer3.push(`<!----></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<div class="w-full max-w-md">`);
          SidebarNavigation($$renderer3, {
            mode: "expanded",
            items: sidebarNavItems,
            currentPath: sidebarPath,
            onNavigate: handleNavigate
          });
          $$renderer3.push(`<!----></div>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]-->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
function Skeleton($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      variant = "text",
      width,
      height,
      class: className = "",
      "aria-label": ariaLabel = "Loading…"
    } = $$props;
    const radius = {
      text: "rounded-md",
      circle: "rounded-full",
      block: "rounded-lg"
    };
    const defaultShape = {
      text: "w-full h-3",
      circle: "w-10 aspect-square",
      block: "w-full h-32"
    };
    function toSize(value) {
      return typeof value === "number" ? `${value}px` : value;
    }
    const inlineStyle = [
      width !== void 0 ? `width: ${toSize(width)}` : null,
      height !== void 0 ? `height: ${toSize(height)}` : null
    ].filter(Boolean).join("; ");
    $$renderer2.push(`<div${attr_class(`animate-pulse bg-surface-2 ${stringify(defaultShape[variant])} ${stringify(radius[variant])} ${stringify(className)}`)}${attr_style(inlineStyle || void 0)} role="status" aria-busy="true"${attr("aria-label", ariaLabel)}></div>`);
  });
}
function SkeletonDemo($$renderer, $$props) {
  let { exampleIndex } = $$props;
  if (exampleIndex === 0) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="w-full">`);
    Skeleton($$renderer, {});
    $$renderer.push(`<!----></div>`);
  } else {
    $$renderer.push("<!--[!-->");
    if (exampleIndex === 1) {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<div class="w-full">`);
      Skeleton($$renderer, { variant: "circle" });
      $$renderer.push(`<!----></div>`);
    } else {
      $$renderer.push("<!--[!-->");
      if (exampleIndex === 2) {
        $$renderer.push("<!--[-->");
        $$renderer.push(`<div class="w-full">`);
        Skeleton($$renderer, { variant: "block" });
        $$renderer.push(`<!----></div>`);
      } else {
        $$renderer.push("<!--[!-->");
        if (exampleIndex === 3) {
          $$renderer.push("<!--[-->");
          $$renderer.push(`<div class="w-full space-y-3">`);
          Skeleton($$renderer, { width: "50%" });
          $$renderer.push(`<!----> `);
          Skeleton($$renderer, { width: 240, height: 8 });
          $$renderer.push(`<!----> `);
          Skeleton($$renderer, { variant: "block", class: "w-64" });
          $$renderer.push(`<!----></div>`);
        } else {
          $$renderer.push("<!--[!-->");
          if (exampleIndex === 4) {
            $$renderer.push("<!--[-->");
            $$renderer.push(`<div class="flex w-full items-center gap-3">`);
            Skeleton($$renderer, { variant: "circle" });
            $$renderer.push(`<!----> <div class="flex-1 space-y-2">`);
            Skeleton($$renderer, { width: "60%" });
            $$renderer.push(`<!----> `);
            Skeleton($$renderer, { width: "40%" });
            $$renderer.push(`<!----></div></div>`);
          } else {
            $$renderer.push("<!--[!-->");
            if (exampleIndex === 5) {
              $$renderer.push("<!--[-->");
              $$renderer.push(`<article class="w-full space-y-3">`);
              Skeleton($$renderer, { variant: "block" });
              $$renderer.push(`<!----> `);
              Skeleton($$renderer, { width: "70%", height: 16 });
              $$renderer.push(`<!----> <div class="space-y-2">`);
              Skeleton($$renderer, {});
              $$renderer.push(`<!----> `);
              Skeleton($$renderer, { width: "85%" });
              $$renderer.push(`<!----></div></article>`);
            } else {
              $$renderer.push("<!--[!-->");
              $$renderer.push(`<div class="w-full">`);
              Skeleton($$renderer, {});
              $$renderer.push(`<!----></div>`);
            }
            $$renderer.push(`<!--]-->`);
          }
          $$renderer.push(`<!--]-->`);
        }
        $$renderer.push(`<!--]-->`);
      }
      $$renderer.push(`<!--]-->`);
    }
    $$renderer.push(`<!--]-->`);
  }
  $$renderer.push(`<!--]-->`);
}
function ListItemLeading($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className = "", children } = $$props;
    const roundingClass = className.trim() ? className.trim() : "rounded-md";
    $$renderer2.push(`<span${attr_class(`flex size-[length:var(--spacing-xl)] shrink-0 select-none items-center justify-center overflow-hidden text-description ${stringify(roundingClass)}`)}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></span>`);
  });
}
function ListItem($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      item,
      selected = false,
      showArrow = true,
      trailing,
      onclick,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const itemClasses = (() => {
      const baseClasses = "group focus-ring flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 pr-5 text-left transition-all duration-150";
      const interactiveClasses = item.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer focus-visible:bg-base-100";
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
    function rowContent($$renderer3) {
      if (item.avatar) {
        $$renderer3.push("<!--[-->");
        ListItemLeading($$renderer3, {
          class: "rounded-full",
          children: ($$renderer4) => {
            $$renderer4.push(`<img${attr("src", item.avatar)}${attr("alt", item.avatarAlt ?? "")} class="block size-full min-h-0 min-w-0 object-cover" loading="lazy" decoding="async"/>`);
          }
        });
      } else {
        $$renderer3.push("<!--[!-->");
        if (item.icon) {
          $$renderer3.push("<!--[-->");
          ListItemLeading($$renderer3, {
            children: ($$renderer4) => {
              $$renderer4.push(`<span aria-hidden="true"><!---->`);
              item.icon($$renderer4, { size: 16 });
              $$renderer4.push(`<!----></span>`);
            }
          });
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]--> <span class="min-w-0 flex-1"><span class="block text-sm font-medium text-headline">${escape_html(item.label)}</span> `);
      if (item.description) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<span class="mt-0.5 block text-sm text-description">${escape_html(item.description)}</span>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></span> `);
      if (trailing) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<span class="flex shrink-0 items-center gap-2 text-sm text-description">`);
        trailing($$renderer3);
        $$renderer3.push(`<!----></span>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (showArrow) {
        $$renderer3.push("<!--[-->");
        Arrow_right($$renderer3, {
          size: 16,
          class: "shrink-0 text-description transition-transform duration-150 group-hover:translate-x-1 group-focus-visible:translate-x-1",
          "aria-hidden": "true"
        });
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]-->`);
    }
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
      rowContent($$renderer2);
      $$renderer2.push(`<!----></a>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button${attributes({
        type: "button",
        class: clsx(itemClasses),
        disabled: item.disabled,
        ...restProps
      })}>`);
      rowContent($$renderer2);
      $$renderer2.push(`<!----></button>`);
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
    const listClasses = `space-y-1 overflow-hidden rounded-xl ${className}`.trim();
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
function Toggle($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      checked = false,
      disabled = false,
      loading = false,
      label = "",
      onclick,
      onchange,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const toggleId = generateId("toggle");
    const isDisabled = disabled || loading;
    const toggleButtonClasses = () => {
      const base = "focus-ring relative inline-flex w-10 h-6 flex-shrink-0 rounded-full border-0 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:outline-none";
      const colorClass = checked ? "bg-action-primary hover:bg-action-primary-hover active:bg-action-primary-active" : "bg-base-400 hover:bg-base-500 active:bg-base-500";
      const stateClass = isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
      return `${base} ${colorClass} ${stateClass}`;
    };
    const toggleThumbClasses = () => {
      const base = "pointer-events-none absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform duration-200 ease-in-out flex items-center justify-center";
      const positionClasses = checked ? "translate-x-4" : "translate-x-0";
      return `${base} ${positionClasses}`;
    };
    $$renderer2.push(`<div class="flex items-center gap-3"><button${attributes({
      type: "button",
      role: "switch",
      id: toggleId,
      "aria-checked": checked,
      "aria-label": label ? void 0 : "Toggle",
      "aria-busy": loading ? "true" : void 0,
      disabled: isDisabled,
      class: clsx(toggleButtonClasses()),
      ...restProps
    })}><span${attr_class(clsx(toggleThumbClasses()))}>`);
    if (loading) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="inline-block size-3 shrink-0 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" aria-hidden="true"></span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></span></button> `);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", toggleId)}${attr_class(`text-sm font-medium text-label ${stringify(isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer")}`)}>${escape_html(label)}</label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { checked });
  });
}
function Textarea($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id: idProp,
      value = "",
      name = "",
      class: className = "",
      label = "",
      hideLabel = false,
      placeholder = "",
      required = false,
      disabled = false,
      loading = false,
      rows = 4,
      size = "md",
      variant = "default",
      message = "",
      oninput,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const fallbackId = generateId("textarea");
    const textareaId = idProp ?? fallbackId;
    const isDisabled = disabled || loading;
    const variantClass = () => {
      return variant === "success" ? "border-success focus-visible:border-success" : variant === "warning" ? "border-warning focus-visible:border-warning" : variant === "error" ? "border-error focus-visible:border-error" : "border-input-border";
    };
    const textareaClasses = () => {
      const baseClasses = "focus-ring w-full border bg-input hover:bg-input-hover focus-visible:bg-input-focus disabled:bg-input-disabled rounded-lg transition-all duration-200 placeholder:text-description text-body focus:outline-none focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed resize-y px-4 py-2.5 text-base leading-6";
      return `${baseClasses} ${variantClass()} ${className}`.trim();
    };
    const labelClasses = () => "mb-1 block text-sm font-medium text-label";
    const messageClasses = () => {
      if (variant === "error") {
        return "mt-1 flex items-center gap-1.5 text-sm text-error";
      } else if (variant === "success") {
        return "mt-1 flex items-center gap-1.5 text-sm text-success";
      } else if (variant === "warning") {
        return "mt-1 flex items-center gap-1.5 text-sm text-warning";
      }
      return "mt-1 flex items-center gap-1.5 text-sm text-description";
    };
    const getIcon = () => {
      if (variant === "error") return Circle_alert;
      if (variant === "success") return Circle_check_big;
      if (variant === "warning") return Triangle_alert;
      return null;
    };
    $$renderer2.push(`<div>`);
    if (label && !hideLabel) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<label${attr("for", textareaId)}${attr_class(clsx(labelClasses()))}>${escape_html(label)}</label>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="relative"><textarea${attributes({
      id: textareaId,
      name,
      placeholder,
      required,
      disabled: isDisabled,
      rows,
      class: clsx(textareaClasses()),
      "aria-invalid": variant === "error" ? "true" : void 0,
      "aria-required": required ? "true" : void 0,
      "aria-busy": loading ? "true" : void 0,
      "aria-describedby": message ? `${textareaId}-message` : void 0,
      ...restProps
    })}>`);
    const $$body = escape_html(value);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea> `);
    if (loading) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="pointer-events-none absolute top-3 right-3 flex items-center text-description" aria-hidden="true"><span class="inline-block size-5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70"></span></span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
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
    bind_props($$props, { value });
  });
}
function Dropdown($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      isOpen = false,
      placement = "bottom-start",
      ariaLabel = "Menu",
      menuRole = "menu",
      selectedValue = null,
      options = [],
      onOptionClick,
      trigger,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const menuId = generateId("dropdown-menu");
    const triggerAria = {
      "aria-expanded": isOpen,
      "aria-haspopup": menuRole === "listbox" ? "listbox" : "menu",
      "aria-controls": menuId
    };
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
        return `invisible opacity-0 ${hiddenTransform[placement]}`;
      }
      return "visible translate-y-0 opacity-100";
    };
    const dropdownContentClasses = () => {
      return [
        placementClasses(),
        "rounded-lg border border-border bg-card py-2 shadow-lg transition-all duration-200 ease-in-out",
        transformClasses()
      ].join(" ").replace(/\s+/g, " ").trim();
    };
    const itemRole = menuRole === "listbox" ? "option" : "menuitem";
    const optionClasses = "focus-ring flex w-full items-center justify-start rounded-md px-3 py-2 text-left text-sm text-body transition-colors hover:bg-base-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";
    $$renderer2.push(`<div${attributes({
      class: "relative inline-block",
      "data-placement": placement,
      ...restProps
    })}>`);
    trigger($$renderer2, triggerAria);
    $$renderer2.push(`<!----> `);
    if (isOpen) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr("id", menuId)}${attr_class(clsx(dropdownContentClasses()))}${attr("role", menuRole === "listbox" ? "listbox" : "menu")}${attr("aria-label", ariaLabel)}>`);
      if (options.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="px-2 py-1"><!--[-->`);
        const each_array = ensure_array_like(options);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let option = each_array[$$index];
          $$renderer2.push(`<button type="button"${attr("role", itemRole)}${attr("aria-selected", menuRole === "listbox" && selectedValue !== null && String(selectedValue) === String(option.value) ? true : void 0)}${attr("data-value", String(option.value))}${attr("disabled", option.disabled, true)}${attr_class(clsx(optionClasses))}>${escape_html(option.label)}</button>`);
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
    bind_props($$props, { isOpen });
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
      return variant === "success" ? "border-success focus-visible:border-success" : variant === "warning" ? "border-warning focus-visible:border-warning" : variant === "error" ? "border-error focus-visible:border-error" : "border-input-border";
    };
    const triggerClasses = () => {
      const sizeStyles = sizeClass();
      const baseClasses = "focus-ring flex w-full cursor-pointer items-center justify-between rounded-lg border bg-input text-body transition-all duration-200 hover:bg-input-hover active:bg-input-focus focus-visible:bg-input-focus focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-input-disabled disabled:opacity-50";
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
        let trigger = function($$renderer4, aria) {
          $$renderer4.push(`<button${attributes({
            type: "button",
            id: selectId,
            class: clsx(triggerClasses()),
            disabled,
            ...aria,
            "aria-describedby": message ? `${selectId}-message` : void 0
          })}><span${attr_class(`text-left flex-1 truncate ${stringify(isLoading ? "text-description" : isEmpty() ? "text-description" : "text-body")}`)}>`);
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
                $$renderer4.push(`<div class="w-full my-0.5"><button${attributes({
                  type: "button",
                  role: "option",
                  "aria-selected": value === option.value ? true : void 0,
                  class: `focus-ring flex w-full items-center justify-start rounded-md border-2 px-3 py-2 text-left text-sm font-medium transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${stringify(value === option.value ? "border-action-primary bg-transparent text-headline" : "border-transparent bg-transparent text-body hover:bg-base-100")}`,
                  disabled: option.disabled,
                  ...buttonRestProps
                })}>${escape_html(option.label)}</button></div>`);
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
          placement: "bottom-start",
          selectedValue: value,
          onOptionClick: handleOptionClick,
          ariaLabel: "Select options",
          menuRole: "listbox",
          get isOpen() {
            return isOpen;
          },
          set isOpen($$value) {
            isOpen = $$value;
            $$settled = false;
          },
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
      $$renderer3.push(`<!----></div> <div class="relative shrink-0 mt-6"><button type="button"${attr("disabled", disabled, true)} class="focus-ring w-11 h-11 rounded-lg border-2 border-card shrink-0 cursor-pointer hover:ring-2 hover:ring-border transition-colors disabled:cursor-not-allowed disabled:opacity-50"${attr_style(`background-color: ${stringify(displayColor)};`)} aria-label="Open color picker"${attr("aria-expanded", isOpen)}></button> `);
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
function Divider($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      orientation = "horizontal",
      label,
      inset = false,
      class: className = "",
      labelClass = "",
      decorative = true
    } = $$props;
    const isVertical = orientation === "vertical";
    const lineClasses = [
      "bg-border",
      isVertical ? "h-full w-px flex-1" : "h-px w-full flex-1",
      inset ? isVertical ? "my-2" : "mx-2" : void 0
    ].filter(Boolean).join(" ");
    $$renderer2.push(`<div${attr_class(clsx([
      "flex items-center text-description",
      isVertical ? "h-full min-h-[1rem] flex-col" : "w-full flex-row",
      className
    ].filter(Boolean).join(" ")))}><div${attr("aria-hidden", decorative ? "true" : void 0)}${attr("role", decorative ? "presentation" : "separator")}${attr("aria-orientation", decorative ? void 0 : orientation)}${attr_class(clsx(lineClasses))}></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span${attr_class(clsx([
        "shrink-0 px-3 text-xs font-medium text-description",
        labelClass
      ].filter(Boolean).join(" ")))}>${escape_html(label)}</span> <div${attr("aria-hidden", decorative ? "true" : void 0)}${attr("role", decorative ? "presentation" : "separator")}${attr("aria-orientation", decorative ? void 0 : orientation)}${attr_class(clsx(lineClasses))}></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function Container($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      as: Tag = "div",
      maxWidth = "xl",
      padded = true,
      class: className = "",
      children
    } = $$props;
    const maxClass = {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      full: "max-w-full"
    };
    element(
      $$renderer2,
      Tag,
      () => {
        $$renderer2.push(`${attr_class(clsx([
          "mx-auto w-full",
          maxClass[maxWidth],
          padded ? "px-4 sm:px-6" : "",
          className
        ].filter(Boolean).join(" ")))}`);
      },
      () => {
        if (children) {
          $$renderer2.push("<!--[-->");
          children($$renderer2);
          $$renderer2.push(`<!---->`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
    );
  });
}
function Text($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      as: Tag = "p",
      tone = "body",
      size = "md",
      class: className = "",
      children
    } = $$props;
    const toneClass = {
      body: "text-body",
      description: "text-description",
      caption: "text-caption",
      headline: "text-headline",
      label: "text-label",
      error: "text-error"
    };
    const sizeClass = { sm: "text-sm", md: "text-base", lg: "text-lg" };
    element(
      $$renderer2,
      Tag,
      () => {
        $$renderer2.push(`${attr_class(clsx([toneClass[tone], sizeClass[size], className].filter(Boolean).join(" ")))}`);
      },
      () => {
        if (children) {
          $$renderer2.push("<!--[-->");
          children($$renderer2);
          $$renderer2.push(`<!---->`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
    );
  });
}
function Table($$renderer, $$props) {
  let { caption, class: className = "", children } = $$props;
  $$renderer.push(`<div${attr_class(`overflow-x-auto rounded-lg border border-border shadow-sm ${stringify(className)}`)}><table class="w-full min-w-[20rem] border-collapse text-left text-sm text-body">`);
  if (caption) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<caption class="border-b border-border bg-base-50 px-4 py-3 text-left text-headline">${escape_html(caption)}</caption>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]-->`);
  if (children) {
    $$renderer.push("<!--[-->");
    children($$renderer);
    $$renderer.push(`<!---->`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></table></div>`);
}
function ListDemo($$renderer, $$props) {
  let { exampleIndex } = $$props;
  const basicItems = [
    { id: "notifications", label: "Notifications" },
    { id: "privacy", label: "Privacy" },
    { id: "language", label: "Language" }
  ];
  const iconMixItems = [
    {
      id: "notify",
      label: "Push notifications",
      description: "Alerts on this device",
      href: "/settings/notifications",
      icon: Bell
    },
    {
      id: "security",
      label: "Security keys",
      description: "Passkeys and backup codes",
      href: "/settings/security",
      icon: Shield
    },
    { id: "privacy", label: "Privacy", href: "/settings/privacy" }
  ];
  const avatarItems = [
    {
      id: "alex",
      label: "Alex Rivera",
      description: "Product design",
      href: "/people/alex",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      avatarAlt: ""
    },
    {
      id: "sam",
      label: "Sam Lee",
      description: "Engineering",
      href: "/people/sam",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
      avatarAlt: ""
    }
  ];
  const accountItems = [
    {
      id: "profile",
      label: "Profile",
      description: "Photo, name, and contact details",
      href: "/settings/profile"
    },
    {
      id: "security",
      label: "Security",
      description: "Password, 2FA, and sessions",
      href: "/settings/security"
    }
  ];
  const planItem = {
    id: "team",
    label: "Team plan",
    description: "Shared workspace for up to 8 people"
  };
  const invoiceItem = {
    id: "inv-1042",
    label: "Invoice #1042",
    description: "Acme Corp · Net 30",
    href: "/billing/invoices/1042",
    icon: Credit_card
  };
  const selectedChromeItems = [
    {
      id: "notify",
      label: "Notifications",
      icon: Bell,
      href: "/settings/notifications"
    },
    {
      id: "security",
      label: "Security",
      icon: Shield,
      href: "/settings/security"
    }
  ];
  if (exampleIndex === 0) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="w-full"><div class="list-group">`);
    List($$renderer, { items: basicItems, ariaLabel: "Quick settings" });
    $$renderer.push(`<!----></div></div>`);
  } else {
    $$renderer.push("<!--[!-->");
    if (exampleIndex === 1) {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<div class="w-full"><div class="list-group">`);
      List($$renderer, { items: iconMixItems, ariaLabel: "Security and notifications" });
      $$renderer.push(`<!----></div></div>`);
    } else {
      $$renderer.push("<!--[!-->");
      if (exampleIndex === 2) {
        $$renderer.push("<!--[-->");
        $$renderer.push(`<div class="w-full"><div class="list-group">`);
        List($$renderer, { items: avatarItems, ariaLabel: "People" });
        $$renderer.push(`<!----></div></div>`);
      } else {
        $$renderer.push("<!--[!-->");
        if (exampleIndex === 3) {
          $$renderer.push("<!--[-->");
          $$renderer.push(`<div class="w-full"><div class="list-group">`);
          List($$renderer, { items: accountItems, ariaLabel: "Account settings" });
          $$renderer.push(`<!----></div></div>`);
        } else {
          $$renderer.push("<!--[!-->");
          if (exampleIndex === 4) {
            $$renderer.push("<!--[-->");
            $$renderer.push(`<ul class="list-group" role="list" aria-label="Plans"><li>`);
            {
              let trailing = function($$renderer2) {
                Badge($$renderer2, { variant: "success", text: "Current" });
              };
              ListItem($$renderer, { item: planItem, trailing, $$slots: { trailing: true } });
            }
            $$renderer.push(`<!----></li></ul>`);
          } else {
            $$renderer.push("<!--[!-->");
            if (exampleIndex === 5) {
              $$renderer.push("<!--[-->");
              $$renderer.push(`<ul class="list-group" role="list" aria-label="Recent invoices"><li>`);
              {
                let trailing = function($$renderer2) {
                  $$renderer2.push(`<span class="text-sm font-medium tabular-nums text-headline">$240.00</span>`);
                };
                ListItem($$renderer, { item: invoiceItem, trailing, $$slots: { trailing: true } });
              }
              $$renderer.push(`<!----></li></ul>`);
            } else {
              $$renderer.push("<!--[!-->");
              if (exampleIndex === 6) {
                $$renderer.push("<!--[-->");
                $$renderer.push(`<div class="w-full"><div class="list-group">`);
                List($$renderer, {
                  items: selectedChromeItems,
                  selectedId: "security",
                  ariaLabel: "Settings sections"
                });
                $$renderer.push(`<!----></div></div>`);
              } else {
                $$renderer.push("<!--[!-->");
                $$renderer.push(`<div class="w-full"><div class="list-group">`);
                List($$renderer, { items: basicItems, ariaLabel: "Quick settings" });
                $$renderer.push(`<!----></div></div>`);
              }
              $$renderer.push(`<!--]-->`);
            }
            $$renderer.push(`<!--]-->`);
          }
          $$renderer.push(`<!--]-->`);
        }
        $$renderer.push(`<!--]-->`);
      }
      $$renderer.push(`<!--]-->`);
    }
    $$renderer.push(`<!--]-->`);
  }
  $$renderer.push(`<!--]-->`);
}
const registry = {
  Button: ButtonDemo,
  Input: InputDemo,
  Radio: RadioDemo,
  Skeleton: SkeletonDemo,
  Modal: ModalDemo,
  SidebarNavigation: SidebarNavigationDemo,
  List: ListDemo
};
function getComponentDemo(componentName) {
  return registry[componentName];
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
    function icon($$renderer3) {
      if (visualVariant === "info") {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>`);
      } else {
        $$renderer3.push("<!--[!-->");
        if (visualVariant === "success") {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`);
        } else {
          $$renderer3.push("<!--[!-->");
          if (visualVariant === "warning") {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>`);
          } else {
            $$renderer3.push("<!--[!-->");
            if (visualVariant === "error") {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>`);
            } else {
              $$renderer3.push("<!--[!-->");
              if (visualVariant === "neutral") {
                $$renderer3.push("<!--[-->");
                $$renderer3.push(`<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM10 9a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>`);
              } else {
                $$renderer3.push("<!--[!-->");
                $$renderer3.push(`<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3L4 14h6l-1 7 7-11h-6l1-7z"></path></svg>`);
              }
              $$renderer3.push(`<!--]-->`);
            }
            $$renderer3.push(`<!--]-->`);
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]-->`);
    }
    $$renderer2.push(`<div${attributes({
      class: `relative rounded-md p-4 border ${stringify(alertClasses[visualVariant])} transition-all duration-200 motion-reduce:transition-none ${stringify(className)}`,
      role: alertRole,
      "aria-live": visualVariant === "success" || visualVariant === "info" ? "polite" : "assertive",
      "aria-atomic": "true",
      ...restProps
    })}>`);
    if (closable) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="group absolute right-2 top-2 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-description transition-colors duration-200 hover:text-body motion-reduce:transition-none focus-ring" aria-label="Dismiss alert" type="button"><svg class="w-4 h-4 text-current group-hover:scale-110 transition-transform duration-200 motion-reduce:transition-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class(`flex items-start gap-3 ${stringify(closable ? "pr-8" : "")}`)}><div class="shrink-0 mt-0.5">`);
    icon($$renderer2);
    $$renderer2.push(`<!----></div> <div class="flex-1 min-w-0">`);
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
function mark($$renderer, props) {
  $$renderer.push(`<span class="pointer-events-none absolute inline-block size-3 shrink-0 animate-spin rounded-full border-2 border-brand-500 border-t-transparent z-10 opacity-0 group-has-[aria-busy=true]/control:opacity-100 group-has-checked/control:border-base-50" aria-hidden="true"></span> <svg class="absolute w-3 h-3 text-base-50 pointer-events-none z-10 opacity-0 group-has-checked/control:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>`);
}
function Checkbox($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id,
      value = "",
      name = "",
      disabled = false,
      loading = false,
      label = "",
      defaultChecked = false,
      checked = defaultChecked,
      onChange,
      onchange,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      SelectionControl($$renderer3, spread_props([
        {
          type: "checkbox",
          shape: "square",
          id,
          name,
          value,
          label,
          disabled,
          loading,
          defaultChecked,
          onChange,
          onchange,
          mark
        },
        restProps,
        {
          get checked() {
            return checked;
          },
          set checked($$value) {
            checked = $$value;
            $$settled = false;
          }
        }
      ]));
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { checked });
  });
}
function Progress($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = 0,
      max = 100,
      size = "md",
      label = "",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const progressId = generateId("progress");
    let percentage = Math.min(Math.max(value / max * 100, 0), 100);
    let sizeClasses = { sm: "h-1", md: "h-2", lg: "h-3" };
    $$renderer2.push(`<div>`);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex justify-between items-center mb-2"><label${attr("for", progressId)} class="text-sm font-medium text-label">${escape_html(label)}</label> <span class="text-sm text-caption">${escape_html(Math.round(percentage))}%</span></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div${attributes({
      id: progressId,
      class: `w-full border border-input-border bg-input rounded-full overflow-hidden ${stringify(sizeClasses[size])}`,
      role: "progressbar",
      "aria-valuenow": value,
      "aria-valuemin": "0",
      "aria-valuemax": max,
      ...restProps
    })}><div class="h-full bg-brand-600 rounded-full"${attr_style(`width: ${stringify(percentage)}%`)}></div></div></div>`);
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
    const tabsBaseId = generateId("tabs");
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
      $$renderer2.push(`<button type="button" role="tab"${attr("id", getTabId(tab.id))}${attr_class(`focus-ring cursor-pointer border-b-2 px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:outline-none active:bg-base-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-transparent disabled:hover:text-description ${stringify(activeTab === tab.id ? variant === "pills" ? "border-brand-500 bg-brand-100 text-brand-700" : "border-brand-500 text-body" : "border-transparent text-description hover:border-base-300 hover:text-body")}`)}${attr("disabled", tab.disabled, true)}${attr("aria-selected", activeTab === tab.id)}${attr("aria-controls", getPanelId(tab.id))}${attr("tabindex", activeTab === tab.id ? 0 : -1)}>${escape_html(tab.label)}</button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-4" role="tabpanel"${attr("id", getPanelId(activeTab))}${attr("aria-labelledby", getTabId(activeTab))}>`);
    children?.($$renderer2, { activeTab });
    $$renderer2.push(`<!----></div></div>`);
  });
}
function FeatureCard($$renderer, $$props) {
  let {
    title,
    description,
    icon: Icon2,
    children,
    class: className = ""
  } = $$props;
  $$renderer.push(`<article${attr_class(`flex flex-col gap-3 p-6 rounded-2xl bg-surface-1 border border-base-200 transition-colors duration-200 hover:border-base-300 ${stringify(className)}`)}>`);
  if (Icon2) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<span class="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-50 text-brand-600" aria-hidden="true"><!---->`);
    Icon2($$renderer, { size: 20 });
    $$renderer.push(`<!----></span>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> <div class="flex flex-col gap-1.5"><h3 class="text-base font-semibold leading-snug text-headline">${escape_html(title)}</h3> `);
  if (description) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<p class="text-sm leading-relaxed text-description">${escape_html(description)}</p>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div> `);
  if (children) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="mt-2">`);
    children($$renderer);
    $$renderer.push(`<!----></div>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></article>`);
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
      class: className = "",
      layout = "viewport",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const typeClasses = {
      success: "border-success bg-card text-success",
      error: "border-error bg-card text-error",
      warning: "border-warning bg-card text-warning",
      info: "border-border bg-card text-body"
    };
    const cardClasses = "box-border w-full min-w-[18rem] max-w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-lg border p-4 shadow-lg";
    function toastBody($$renderer3) {
      $$renderer3.push(`<div class="flex min-w-0 items-start gap-3"><div class="min-w-0 max-w-full flex-1 basis-0"><p class="text-sm break-words [overflow-wrap:anywhere]">${escape_html(message)}</p></div> `);
      if (closable) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<button type="button" class="focus-ring shrink-0 cursor-pointer rounded-md text-description hover:text-headline focus:outline-none" aria-label="Close notification">×</button>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div>`);
    }
    {
      $$renderer2.push("<!--[-->");
      if (layout === "viewport") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="pointer-events-none fixed top-4 right-4 left-4 z-toast flex justify-end sm:left-auto"><div${attributes({
          class: `pointer-events-auto ${stringify(cardClasses)} ${stringify(typeClasses[type])} ${stringify(className)}`,
          role: "alert",
          ...restProps
        })}>`);
        toastBody($$renderer2);
        $$renderer2.push(`<!----></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div${attributes({
          class: `relative z-toast mx-auto ${stringify(cardClasses)} ${stringify(typeClasses[type])} ${stringify(className)}`,
          role: "alert",
          ...restProps
        })}>`);
        toastBody($$renderer2);
        $$renderer2.push(`<!----></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function createToastStore() {
  const { subscribe, update } = writable([]);
  function dismiss(id) {
    update((list) => list.filter((t) => t.id !== id));
  }
  return {
    subscribe,
    push(options) {
      const id = options.id ?? `toast-${Math.random().toString(36).slice(2, 11)}`;
      const item = {
        id,
        message: options.message,
        type: options.type ?? "info",
        duration: options.duration,
        title: options.title,
        detail: options.detail
      };
      update((list) => [...list, item]);
      return id;
    },
    dismiss,
    clear() {
      update(() => []);
    }
  };
}
const toastStore = createToastStore();
function pushToast(options) {
  return toastStore.push(options);
}
function ToasterToast($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { toast } = $$props;
    function autoDismissSeconds(duration) {
      if (duration === void 0) return 14;
      if (duration <= 0) return 0;
      return Math.max(1, Math.ceil(duration / 1e3));
    }
    autoDismissSeconds(toast.duration);
    let isExpanded = false;
    const expandableText = (toast.detail ?? toast.message).trim();
    const hasExpandable = expandableText.length > 0;
    const headerTitle = (() => {
      const t = toast.title?.trim();
      if (t) return t;
      switch (toast.type) {
        case "success":
          return "Changes saved";
        case "error":
          return "Something went wrong";
        case "warning":
          return "Please review";
        default:
          return "Notice";
      }
    })();
    const statusIconClass = toast.type === "success" ? "text-success" : toast.type === "error" ? "text-error" : toast.type === "warning" ? "text-warning" : "text-info";
    toast.type === "success" ? "bg-success" : toast.type === "error" ? "bg-error" : toast.type === "warning" ? "bg-warning" : "bg-info";
    $$renderer2.push(`<div class="pointer-events-auto relative w-full min-w-[18rem] overflow-hidden rounded-2xl border border-border bg-surface-1 shadow-xl"${attr("role", toast.type === "error" ? "alert" : "status")}><div class="p-4"><div class="flex items-start gap-3"><div class="shrink-0 pt-0.5">`);
    if (toast.type === "success") {
      $$renderer2.push("<!--[-->");
      Circle_check_big($$renderer2, {
        class: `size-5 ${stringify(statusIconClass)}`,
        "aria-hidden": "true"
      });
    } else {
      $$renderer2.push("<!--[!-->");
      if (toast.type === "error") {
        $$renderer2.push("<!--[-->");
        Circle_alert($$renderer2, {
          class: `size-5 ${stringify(statusIconClass)}`,
          "aria-hidden": "true"
        });
      } else {
        $$renderer2.push("<!--[!-->");
        if (toast.type === "warning") {
          $$renderer2.push("<!--[-->");
          Triangle_alert($$renderer2, {
            class: `size-5 ${stringify(statusIconClass)}`,
            "aria-hidden": "true"
          });
        } else {
          $$renderer2.push("<!--[!-->");
          Info($$renderer2, {
            class: `size-5 ${stringify(statusIconClass)}`,
            "aria-hidden": "true"
          });
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div> <h4 class="min-w-0 flex-1 text-base font-semibold text-headline">${escape_html(headerTitle)}</h4> <div class="flex shrink-0 items-center gap-0.5">`);
    if (hasExpandable) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button type="button" class="focus-ring cursor-pointer rounded-md p-1 text-description transition-colors hover:bg-base-100 hover:text-headline focus:outline-none"${attr("aria-expanded", isExpanded)}${attr("aria-controls", `toaster-expand-${stringify(toast.id)}`)}${attr("aria-label", "Expand details")}>`);
      Chevron_down($$renderer2, {
        class: `size-5 transition-transform duration-200 ${stringify("")}`,
        "aria-hidden": "true"
      });
      $$renderer2.push(`<!----></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <button type="button" class="focus-ring cursor-pointer rounded-md p-1 text-description transition-colors hover:bg-base-100 hover:text-headline focus:outline-none" aria-label="Dismiss notification">`);
    X($$renderer2, { class: "size-5", "aria-hidden": "true" });
    $$renderer2.push(`<!----></button></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function Toaster($$renderer, $$props) {
  var $$store_subs;
  let { class: className = "" } = $$props;
  $$renderer.push(`<div${attr_class(`pointer-events-none fixed bottom-4 right-4 z-toast flex min-w-0 w-[min(24rem,calc(100vw-2rem))] flex-col gap-2 p-4 ${stringify(className)}`)} role="region" aria-label="Notifications" aria-live="polite"><!--[-->`);
  const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$toastStore", toastStore));
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let toast = each_array[$$index];
    ToasterToast($$renderer, { toast });
  }
  $$renderer.push(`<!--]--></div>`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
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
      onclick,
      onkeydown,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const slideTitleId = generateId("slideup-title");
    if (isOpen) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attributes({
        class: "fixed inset-0 z-modal cursor-pointer bg-overlay",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": title ? slideTitleId : void 0,
        tabindex: "-1",
        ...restProps
      })}><div class="fixed bottom-0 left-0 right-0 z-modal flex max-h-[90vh] cursor-default flex-col overflow-y-auto rounded-t-3xl bg-card shadow-xl animate-[slideUp_0.3s_ease-out]">`);
      if (title) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center justify-between px-6 pb-4 pt-6"><h2${attr("id", slideTitleId)} class="text-2xl font-normal leading-8 tracking-normal text-headline">${escape_html(title)}</h2> <button type="button" class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-2xl text-description transition-colors hover:bg-base-100 hover:text-headline" aria-label="Close">×</button></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="flex-1 px-6 pb-6">`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { isOpen });
  });
}
function SidebarAccountPanel($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      panelId = generateId("account-panel"),
      style = "",
      profileName = "Account",
      profileEmail = "",
      logoutLabel = "Log out",
      showThemeToggle = true,
      showLogout = true,
      isLightMode = false,
      onThemeToggle,
      onLogout,
      onAccount,
      onClose,
      widthClass = "w-[320px]",
      variant = "plain",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let selectedItemId = "";
    const items = (() => {
      const list = [
        {
          id: "account",
          label: "Account",
          description: profileName,
          icon: User
        }
      ];
      if (showThemeToggle) {
        list.push({
          id: "theme",
          label: "Theme",
          description: isLightMode ? "Light mode" : "Dark mode",
          badgeText: isLightMode ? "Light" : "Dark",
          icon: isLightMode ? Sun : Moon
        });
      }
      if (showLogout) {
        list.push({
          id: "logout",
          label: logoutLabel,
          description: "Sign out of this account",
          icon: Log_out
        });
      }
      return list;
    })();
    function toggleTheme() {
      isLightMode = !isLightMode;
      onThemeToggle?.(isLightMode);
    }
    function handleSelect(item) {
      if (item.id === "theme") {
        toggleTheme();
      } else if (item.id === "logout") {
        onLogout?.();
      } else if (item.id === "account") {
        onAccount?.();
      }
      onClose?.();
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div${attributes({
        id: panelId,
        style,
        role: "dialog",
        "aria-modal": "false",
        "aria-label": "Account panel",
        ...restProps
      })}>`);
      SidebarPanel($$renderer3, {
        title: "Account",
        subtitle: profileEmail,
        ariaLabel: "Account panel",
        closeLabel: "Close account panel",
        widthClass,
        variant,
        showSearch: false,
        items,
        onSelect: handleSelect,
        onClose,
        get selectedItemId() {
          return selectedItemId;
        },
        set selectedItemId($$value) {
          selectedItemId = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { isLightMode });
  });
}
function FormField($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      id: idProp,
      label,
      description,
      error,
      required = false,
      disabled = false,
      class: className = "",
      labelClass = "",
      control,
      meta
    } = $$props;
    const fallbackId = generateId("field");
    const fieldId = idProp ?? fallbackId;
    const descriptionId = `${fieldId}-description`;
    const errorId = error ? `${fieldId}-error` : void 0;
    const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || void 0;
    $$renderer2.push(`<div${attr_class(clsx(["space-y-1.5", className].filter(Boolean).join(" ")))}><div class="flex items-baseline justify-between gap-3"><label${attr_class(clsx([
      "text-sm font-medium text-label",
      disabled ? "opacity-60" : "",
      labelClass
    ].filter(Boolean).join(" ")))}${attr("for", fieldId)}>${escape_html(label)} `);
    if (required) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="ml-1 text-error" aria-hidden="true">*</span> <span class="sr-only">(required)</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></label> `);
    if (meta) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-xs text-description">`);
      meta($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    control($$renderer2, {
      id: fieldId,
      "aria-describedby": describedBy,
      "aria-invalid": error ? "true" : void 0,
      disabled,
      required
    });
    $$renderer2.push(`<!----> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p${attr("id", descriptionId)} class="text-xs text-description">${escape_html(description)}</p>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p${attr("id", errorId)} class="text-xs text-error" role="alert">${escape_html(error)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function Header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { title, description, category, variantsStates } = $$props;
    $$renderer2.push(`<header class="space-y-4"><div class="space-y-2">`);
    Heading($$renderer2, { level: 1, text: title });
    $$renderer2.push(`<!----> <p class="text-lg whitespace-pre-line text-description">${escape_html(description)}</p></div> <div class="flex flex-wrap items-center gap-2">`);
    Badge($$renderer2, { variant: "info", text: category });
    $$renderer2.push(`<!----> `);
    if (variantsStates?.length) {
      $$renderer2.push("<!--[-->");
      Badge($$renderer2, {
        variant: "info",
        text: `${stringify(variantsStates.length)} variants`
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (variantsStates?.length) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex flex-wrap items-center gap-2"><span class="text-sm font-medium text-headline">Variants / states:</span> <!--[-->`);
      const each_array = ensure_array_like(variantsStates);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let v = each_array[$$index];
        $$renderer2.push(`<span class="rounded-md bg-base-100 px-2 py-1 text-xs text-headline">${escape_html(v)}</span>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></header>`);
  });
}
function EmptyState($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { title, description, class: className = "", action, media } = $$props;
    const titleId = generateId("empty-state-title");
    $$renderer2.push(`<section${attr_class(`mx-auto flex max-w-lg flex-col items-center justify-center gap-4 px-6 py-12 text-center ${stringify(className)}`)}${attr("aria-labelledby", titleId)}>`);
    if (media) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-description" aria-hidden="true">`);
      media($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="space-y-2"><h2${attr("id", titleId)} class="text-lg font-semibold text-headline">${escape_html(title)}</h2> <p class="text-sm text-description">${escape_html(description)}</p></div> `);
    if (action) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="mt-2 flex flex-wrap items-center justify-center gap-2">`);
      action($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></section>`);
  });
}
function Page($$renderer, $$props) {
  let { children, className = "" } = $$props;
  $$renderer.push(`<div${attr_class(`mx-auto w-full max-w-4xl space-y-10 ${stringify(className)}`)}>`);
  if (children) {
    $$renderer.push("<!--[-->");
    children($$renderer);
    $$renderer.push(`<!---->`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div>`);
}
function Section($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      title = "",
      description = "",
      headingLevel = 2,
      size = "md",
      maxWidth = "xl",
      background = "default",
      padding = "lg",
      centered = false,
      className = "",
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const sizeClasses = (() => {
      switch (size) {
        case "sm":
          return "text-sm";
        case "lg":
          return "text-lg";
        default:
          return "text-base";
      }
    })();
    const maxWidthClasses = (() => {
      switch (maxWidth) {
        case "sm":
          return "max-w-screen-sm";
        case "md":
          return "max-w-screen-md";
        case "lg":
          return "max-w-screen-lg";
        case "xl":
          return "max-w-screen-xl";
        case "2xl":
          return "max-w-screen-2xl";
        case "full":
          return "max-w-full";
        case "none":
          return "";
        default:
          return "max-w-screen-xl";
      }
    })();
    const backgroundClasses = (() => {
      switch (background) {
        case "muted":
          return "bg-base-50";
        case "accent":
          return "bg-brand-50 dark:bg-brand-950";
        case "transparent":
          return "bg-transparent";
        default:
          return "bg-background";
      }
    })();
    const paddingClasses = (() => {
      switch (padding) {
        case "none":
          return "";
        case "sm":
          return "py-8 sm:py-12";
        case "md":
          return "py-12 sm:py-16";
        case "lg":
          return "py-16 sm:py-24";
        case "xl":
          return "py-24 sm:py-32";
        default:
          return "py-16 sm:py-24";
      }
    })();
    const containerClasses = (() => {
      const base = "w-full";
      const maxWidthClass = maxWidthClasses;
      const centeredClass = centered ? "mx-auto" : "";
      return `${base} ${maxWidthClass} ${centeredClass}`.trim();
    })();
    const contentClasses = (() => {
      const base = "px-4 sm:px-6 lg:px-8";
      const centeredClass = centered ? "text-center" : "";
      return `${base} ${centeredClass}`.trim();
    })();
    $$renderer2.push(`<section${attributes(
      {
        class: `section ${stringify(backgroundClasses)} ${stringify(paddingClasses)} ${stringify(className)}`,
        ...restProps
      },
      "svelte-tut8l"
    )}><div${attr_class(clsx(containerClasses), "svelte-tut8l")}><div${attr_class(clsx(contentClasses), "svelte-tut8l")}>`);
    if (title) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(`mb-6 ${stringify(centered ? "mx-auto" : "")}`)}>`);
      Heading($$renderer2, { level: headingLevel, text: title });
      $$renderer2.push(`<!----> `);
      if (description) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p${attr_class(`mt-4 ${stringify(sizeClasses)} text-description ${stringify(centered ? "mx-auto" : "")}`, "svelte-tut8l")}>${escape_html(description)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (children) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(`section-content ${stringify(centered ? "mx-auto" : "")}`, "svelte-tut8l")}>`);
      children($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></section>`);
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
    let appShellPath = "/workspace/overview";
    let appShellLightMode = false;
    let appShellSearchValue = "";
    const sidebarAccountPanelId = "sidebar-account-panel";
    let sidebarAccountPanelOpen = false;
    let sidebarAccountLightMode = false;
    const appShellAccountPanelId = "app-shell-account-panel";
    let appShellAccountPanelOpen = false;
    let appShellAccountLightMode = false;
    let dropdownDemoAOpen = false;
    let dropdownDemoBOpen = false;
    let formFieldDemoEmail = "";
    let radioGroupDemoValue = "basic";
    const radioGroupDemoOptions = [
      {
        value: "basic",
        label: "Basic",
        description: "Core features for small teams"
      },
      {
        value: "pro",
        label: "Pro",
        description: "Advanced controls and support"
      }
    ];
    function toggleSidebarAccountPanel() {
      sidebarAccountPanelOpen = !sidebarAccountPanelOpen;
    }
    function toggleAppShellAccountPanel() {
      appShellAccountPanelOpen = !appShellAccountPanelOpen;
    }
    function appShellLeafTitle(path) {
      const segments = path.split("/").filter(Boolean);
      const leaf = segments[segments.length - 1] ?? "overview";
      return leaf.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    }
    const appShellMainTitle = appShellLeafTitle(appShellPath);
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="space-y-8"><!--[-->`);
      const each_array = ensure_array_like(component.examples);
      for (let exampleIndex = 0, $$length = each_array.length; exampleIndex < $$length; exampleIndex++) {
        let example = each_array[exampleIndex];
        ComponentDemo($$renderer3, {
          title: example.title,
          description: example.description,
          code: example.code,
          language: example.language || "svelte",
          children: ($$renderer4) => {
            const Demo = getComponentDemo(component.name);
            if (Demo) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<!---->`);
              Demo($$renderer4, {
                exampleIndex,
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
              $$renderer4.push(`<!---->`);
            } else {
              $$renderer4.push("<!--[!-->");
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
                              let trigger = function($$renderer5, aria) {
                                Button($$renderer5, spread_props([{ text: "Select an option" }, aria]));
                              }, children = function($$renderer5) {
                                $$renderer5.push(`<div class="space-y-1 p-2"><button type="button" role="menuitem" class="w-full rounded px-3 py-2 text-left hover:bg-base-100">Option 1</button> <button type="button" role="menuitem" class="w-full rounded px-3 py-2 text-left hover:bg-base-100">Option 2</button> <button type="button" role="menuitem" class="w-full rounded px-3 py-2 text-left hover:bg-base-100">Option 3</button></div>`);
                              };
                              Dropdown($$renderer4, {
                                get isOpen() {
                                  return dropdownDemoAOpen;
                                },
                                set isOpen($$value) {
                                  dropdownDemoAOpen = $$value;
                                  $$settled = false;
                                },
                                trigger,
                                children,
                                $$slots: { trigger: true, default: true }
                              });
                            }
                            $$renderer4.push(`<!----> `);
                            {
                              let trigger = function($$renderer5, aria) {
                                Button($$renderer5, spread_props([{ text: "Choose a color" }, aria]));
                              }, children = function($$renderer5) {
                                $$renderer5.push(`<div class="space-y-1 p-2"><button type="button" role="menuitem" class="w-full rounded px-3 py-2 text-left hover:bg-base-100">Red</button> <button type="button" role="menuitem" class="w-full rounded px-3 py-2 text-left hover:bg-base-100">Blue</button> <button type="button" role="menuitem" class="w-full rounded px-3 py-2 text-left hover:bg-base-100">Green</button></div>`);
                              };
                              Dropdown($$renderer4, {
                                get isOpen() {
                                  return dropdownDemoBOpen;
                                },
                                set isOpen($$value) {
                                  dropdownDemoBOpen = $$value;
                                  $$settled = false;
                                },
                                trigger,
                                children,
                                $$slots: { trigger: true, default: true }
                              });
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
                                    title: "Example Modal",
                                    get isOpen() {
                                      return modalOpen;
                                    },
                                    set isOpen($$value) {
                                      modalOpen = $$value;
                                      $$settled = false;
                                    },
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
                                      title: "Slide Up Panel",
                                      get isOpen() {
                                        return slideUpOpen;
                                      },
                                      set isOpen($$value) {
                                        slideUpOpen = $$value;
                                        $$settled = false;
                                      },
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
                                                            $$renderer9.push(`<a class="flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md md:p-6" href="/"><div class="mb-2 text-lg font-medium">zabi-components</div> <p class="text-sm leading-tight text-description">Beautifully
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
                                            let appShellProfilePanel = function($$renderer5) {
                                              SidebarAccountPanel($$renderer5, {
                                                panelId: appShellAccountPanelId,
                                                profileName: "Alex Rivera",
                                                profileEmail: "alex@northwind.app",
                                                onThemeToggle: (next) => appShellAccountLightMode = next,
                                                onLogout: () => appShellAccountPanelOpen = false,
                                                onAccount: () => appShellAccountPanelOpen = false,
                                                onClose: () => appShellAccountPanelOpen = false,
                                                variant: "elevated",
                                                get isLightMode() {
                                                  return appShellAccountLightMode;
                                                },
                                                set isLightMode($$value) {
                                                  appShellAccountLightMode = $$value;
                                                  $$settled = false;
                                                }
                                              });
                                            }, sidebarProfilePanel = function($$renderer5) {
                                              SidebarAccountPanel($$renderer5, {
                                                panelId: sidebarAccountPanelId,
                                                profileName: "Jane Doe",
                                                profileEmail: "jane@example.com",
                                                onThemeToggle: (next) => sidebarAccountLightMode = next,
                                                onLogout: () => sidebarAccountPanelOpen = false,
                                                onAccount: () => sidebarAccountPanelOpen = false,
                                                onClose: () => sidebarAccountPanelOpen = false,
                                                variant: "plain",
                                                get isLightMode() {
                                                  return sidebarAccountLightMode;
                                                },
                                                set isLightMode($$value) {
                                                  sidebarAccountLightMode = $$value;
                                                  $$settled = false;
                                                }
                                              });
                                            };
                                            $$renderer4.push("<!--[-->");
                                            $$renderer4.push(`<div class="space-y-10"><section class="rounded-xl border border-border bg-base-50/70 p-5 ring-1 ring-border/40" aria-labelledby="sn-built-from"><h4 id="sn-built-from" class="mb-2 text-sm font-semibold text-headline">What <code class="rounded bg-base-100 px-1 font-mono text-xs">SidebarNavigation</code> is built from</h4> <p class="mb-3 text-sm leading-relaxed text-description">The organism composes smaller pieces from this library
                                                    plus icons. Section headings and grouped lists come from <strong class="text-headline">SidebarNavSection</strong>;
                                                    optional logo + wordmark from <strong class="text-headline">SidebarBrandHeader</strong>.
                                                    Row badges use <a href="/components/Badge" class="text-link font-medium underline-offset-2 hover:underline">Badge</a>, search uses <a href="/components/Input" class="text-link font-medium underline-offset-2 hover:underline">Input</a> (or a search trigger button). For “pick a workspace” flows,
                                                    pair the rail with <a href="/components/SidebarPanel" class="text-link font-medium underline-offset-2 hover:underline">SidebarPanel</a> (see the second example below).</p> <ul class="list-disc space-y-1.5 pl-5 text-sm text-description"><li><span class="font-medium text-headline">Molecules</span> — <code class="text-xs font-mono">SidebarBrandHeader</code>, <code class="text-xs font-mono">SidebarNavSection</code></li> <li><span class="font-medium text-headline">Atoms</span> — <code class="text-xs font-mono">Badge</code>, <code class="text-xs font-mono">Input</code></li> <li><span class="font-medium text-headline">Icons</span> — <code class="text-xs font-mono">@lucide/svelte</code> (e.g.
                                                        Search, LogOut, Sun, Moon)</li></ul></section> <div><h4 class="mb-1 text-sm font-medium text-headline">Realistic app shell</h4> <p class="mb-4 max-w-3xl text-sm leading-relaxed text-description">A compact product layout: floating sidebar rail
                                                    (<code class="font-mono text-xs">layout="card"</code>),
                                                    brand row, grouped primary nav, footer profile + logout +
                                                    theme, and a main column where your routed page content
                                                    would render.</p> <div class="flex max-w-5xl flex-col overflow-visible rounded-2xl border border-border bg-base-100 shadow-sm md:min-h-[min(520px,65vh)] md:flex-row">`);
                                            SidebarNavigation($$renderer4, {
                                              layout: "card",
                                              className: "min-h-[min(480px,60vh)] shrink-0 md:min-h-0 md:max-w-[280px]",
                                              brandName: "Northwind",
                                              logoSrc: "/favicon.png",
                                              logoAlt: "Northwind",
                                              items: sidebarAppShellDemoItems,
                                              currentPath: appShellPath,
                                              searchMode: "input",
                                              searchPlaceholder: "Search workspace…",
                                              profileName: "Alex Rivera",
                                              profileEmail: "alex@northwind.app",
                                              profileInitials: "AR",
                                              onProfileClick: toggleAppShellAccountPanel,
                                              profilePanelOpen: appShellAccountPanelOpen,
                                              profilePanelControlsId: appShellAccountPanelId,
                                              profilePanel: appShellProfilePanel,
                                              onNavigate: (item, event) => {
                                                event.preventDefault();
                                                appShellPath = item.href;
                                              },
                                              get searchValue() {
                                                return appShellSearchValue;
                                              },
                                              set searchValue($$value) {
                                                appShellSearchValue = $$value;
                                                $$settled = false;
                                              },
                                              get isLightMode() {
                                                return appShellLightMode;
                                              },
                                              set isLightMode($$value) {
                                                appShellLightMode = $$value;
                                                $$settled = false;
                                              }
                                            });
                                            $$renderer4.push(`<!----> <div class="flex min-h-0 min-w-0 flex-1 flex-col gap-4 border-t border-border p-5 md:border-l md:border-t-0"><header class="flex flex-wrap items-end justify-between gap-2 border-b border-border pb-3"><div><p class="text-xs font-medium uppercase tracking-wide text-description">Main content (your app route)</p> <h3 class="text-xl font-semibold text-headline">${escape_html(appShellMainTitle)}</h3></div> `);
                                            Badge($$renderer4, { variant: "info", text: "Demo preview" });
                                            $$renderer4.push(`<!----></header> <div class="grid flex-1 gap-3 sm:grid-cols-2">`);
                                            Card($$renderer4, {
                                              children: ($$renderer5) => {
                                                CardHeader($$renderer5, { title: "Pipeline" });
                                                $$renderer5.push(`<!----> `);
                                                CardContent($$renderer5, {
                                                  children: ($$renderer6) => {
                                                    $$renderer6.push(`<p class="text-sm text-description">Cards, tables, or charts would live
                                                                        here—whatever the selected nav item
                                                                        loads in a real SvelteKit <code class="font-mono text-xs">+page.svelte</code>.</p>`);
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
                                                CardHeader($$renderer5, { title: "Activity" });
                                                $$renderer5.push(`<!----> `);
                                                CardContent($$renderer5, {
                                                  children: ($$renderer6) => {
                                                    $$renderer6.push(`<ul class="space-y-2 text-sm text-description"><li>Design review · 2:00 PM</li> <li>Deploy preview #412 · passed</li> <li>New comment on PR #88</li></ul>`);
                                                  },
                                                  $$slots: { default: true }
                                                });
                                                $$renderer5.push(`<!---->`);
                                              },
                                              $$slots: { default: true }
                                            });
                                            $$renderer4.push(`<!----></div></div></div></div> <div><h4 class="text-sm font-medium text-headline mb-2">Searchable Input Mode</h4> <div class="inline-block overflow-visible rounded-2xl border border-border">`);
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
                                              },
                                              onProfileClick: toggleSidebarAccountPanel,
                                              profilePanelOpen: sidebarAccountPanelOpen,
                                              profilePanelControlsId: sidebarAccountPanelId,
                                              profilePanel: sidebarProfilePanel
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
                                                            icon: Zap,
                                                            title: "Fast performance",
                                                            description: "Lightning fast loading times with optimised code."
                                                          });
                                                          $$renderer4.push(`<!----> `);
                                                          FeatureCard($$renderer4, {
                                                            icon: Shield_check,
                                                            title: "Secure by default",
                                                            description: "End-to-end encryption and security best practices."
                                                          });
                                                          $$renderer4.push(`<!----> `);
                                                          FeatureCard($$renderer4, {
                                                            icon: Sparkles,
                                                            title: "Easy to use",
                                                            description: "Intuitive interface designed for productivity."
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
                                                                if (exampleIndex === 0) {
                                                                  $$renderer4.push("<!--[-->");
                                                                  $$renderer4.push(`<div class="w-full">`);
                                                                  Skeleton($$renderer4, {});
                                                                  $$renderer4.push(`<!----></div>`);
                                                                } else {
                                                                  $$renderer4.push("<!--[!-->");
                                                                  if (exampleIndex === 1) {
                                                                    $$renderer4.push("<!--[-->");
                                                                    $$renderer4.push(`<div class="w-full">`);
                                                                    Skeleton($$renderer4, { variant: "circle" });
                                                                    $$renderer4.push(`<!----></div>`);
                                                                  } else {
                                                                    $$renderer4.push("<!--[!-->");
                                                                    if (exampleIndex === 2) {
                                                                      $$renderer4.push("<!--[-->");
                                                                      $$renderer4.push(`<div class="w-full">`);
                                                                      Skeleton($$renderer4, { variant: "block" });
                                                                      $$renderer4.push(`<!----></div>`);
                                                                    } else {
                                                                      $$renderer4.push("<!--[!-->");
                                                                      if (exampleIndex === 3) {
                                                                        $$renderer4.push("<!--[-->");
                                                                        $$renderer4.push(`<div class="w-full space-y-3">`);
                                                                        Skeleton($$renderer4, { width: "50%" });
                                                                        $$renderer4.push(`<!----> `);
                                                                        Skeleton($$renderer4, { width: 240, height: 8 });
                                                                        $$renderer4.push(`<!----> `);
                                                                        Skeleton($$renderer4, { variant: "block", class: "w-64" });
                                                                        $$renderer4.push(`<!----></div>`);
                                                                      } else {
                                                                        $$renderer4.push("<!--[!-->");
                                                                        if (exampleIndex === 4) {
                                                                          $$renderer4.push("<!--[-->");
                                                                          $$renderer4.push(`<div class="flex w-full items-center gap-3">`);
                                                                          Skeleton($$renderer4, { variant: "circle" });
                                                                          $$renderer4.push(`<!----> <div class="flex-1 space-y-2">`);
                                                                          Skeleton($$renderer4, { variant: "text", width: "60%" });
                                                                          $$renderer4.push(`<!----> `);
                                                                          Skeleton($$renderer4, { variant: "text", width: "40%" });
                                                                          $$renderer4.push(`<!----></div></div>`);
                                                                        } else {
                                                                          $$renderer4.push("<!--[!-->");
                                                                          if (exampleIndex === 5) {
                                                                            $$renderer4.push("<!--[-->");
                                                                            $$renderer4.push(`<article class="w-full space-y-3">`);
                                                                            Skeleton($$renderer4, { variant: "block" });
                                                                            $$renderer4.push(`<!----> `);
                                                                            Skeleton($$renderer4, { variant: "text", width: "70%", height: 16 });
                                                                            $$renderer4.push(`<!----> <div class="space-y-2">`);
                                                                            Skeleton($$renderer4, { variant: "text" });
                                                                            $$renderer4.push(`<!----> `);
                                                                            Skeleton($$renderer4, { variant: "text", width: "85%" });
                                                                            $$renderer4.push(`<!----></div></article>`);
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
                                                              } else {
                                                                $$renderer4.push("<!--[!-->");
                                                                if (component.name === "Toast") {
                                                                  $$renderer4.push("<!--[-->");
                                                                  if (exampleIndex === 0) {
                                                                    $$renderer4.push("<!--[-->");
                                                                    $$renderer4.push(`<div class="w-full space-y-4"><p class="text-sm text-description">Triggers below call <code class="rounded bg-base-100 px-1 py-0.5 font-mono text-xs">pushToast()</code>. The live region is fixed bottom-right (same as a real app).</p> <div class="flex flex-wrap gap-2">`);
                                                                    Button($$renderer4, {
                                                                      text: "Success",
                                                                      onclick: () => pushToast({
                                                                        title: "Changes saved",
                                                                        message: "Some settings may take a few minutes to apply across your workspace.",
                                                                        type: "success"
                                                                      })
                                                                    });
                                                                    $$renderer4.push(`<!----> `);
                                                                    Button($$renderer4, {
                                                                      variant: "secondary",
                                                                      text: "Error",
                                                                      onclick: () => pushToast({
                                                                        title: "Something went wrong",
                                                                        message: "Try again or contact support if this persists.",
                                                                        type: "error"
                                                                      })
                                                                    });
                                                                    $$renderer4.push(`<!----> `);
                                                                    Button($$renderer4, {
                                                                      variant: "outline",
                                                                      text: "Warning",
                                                                      onclick: () => pushToast({
                                                                        title: "Please review",
                                                                        message: "Your draft has not been published yet.",
                                                                        type: "warning"
                                                                      })
                                                                    });
                                                                    $$renderer4.push(`<!----> `);
                                                                    Button($$renderer4, {
                                                                      variant: "ghost",
                                                                      text: "Info",
                                                                      onclick: () => pushToast({ message: "Tip: use keyboard shortcuts.", type: "info" })
                                                                    });
                                                                    $$renderer4.push(`<!----></div> `);
                                                                    Toaster($$renderer4, {});
                                                                    $$renderer4.push(`<!----></div>`);
                                                                  } else {
                                                                    $$renderer4.push("<!--[!-->");
                                                                    if (exampleIndex === 1) {
                                                                      $$renderer4.push("<!--[-->");
                                                                      $$renderer4.push(`<div class="w-full space-y-4"><p class="text-sm text-description">Same surface as viewport toasts, but <code class="rounded bg-base-100 px-1 py-0.5 font-mono text-xs">layout="inline"</code> keeps it in the document flow for docs and previews.</p> <div class="mx-auto flex w-full max-w-md flex-col gap-4">`);
                                                                      Toast($$renderer4, {
                                                                        layout: "inline",
                                                                        message: "This is an info toast",
                                                                        type: "info"
                                                                      });
                                                                      $$renderer4.push(`<!----> `);
                                                                      Toast($$renderer4, {
                                                                        layout: "inline",
                                                                        message: "Operation completed successfully!",
                                                                        type: "success"
                                                                      });
                                                                      $$renderer4.push(`<!----> `);
                                                                      Toast($$renderer4, {
                                                                        layout: "inline",
                                                                        message: "Please review your input",
                                                                        type: "warning"
                                                                      });
                                                                      $$renderer4.push(`<!----> `);
                                                                      Toast($$renderer4, {
                                                                        layout: "inline",
                                                                        message: "An error occurred",
                                                                        type: "error"
                                                                      });
                                                                      $$renderer4.push(`<!----></div></div>`);
                                                                    } else {
                                                                      $$renderer4.push("<!--[!-->");
                                                                      if (exampleIndex === 2) {
                                                                        $$renderer4.push("<!--[-->");
                                                                        $$renderer4.push(`<div class="w-full space-y-4"><p class="text-sm text-description">The <code class="rounded bg-base-100 px-1 py-0.5 font-mono text-xs">type</code> prop maps to semantic border and text colors.</p> <div class="grid w-full min-w-0 grid-cols-1 gap-3 md:grid-cols-2">`);
                                                                        Toast($$renderer4, { layout: "inline", message: "Success", type: "success" });
                                                                        $$renderer4.push(`<!----> `);
                                                                        Toast($$renderer4, { layout: "inline", message: "Error", type: "error" });
                                                                        $$renderer4.push(`<!----> `);
                                                                        Toast($$renderer4, { layout: "inline", message: "Warning", type: "warning" });
                                                                        $$renderer4.push(`<!----> `);
                                                                        Toast($$renderer4, { layout: "inline", message: "Info", type: "info" });
                                                                        $$renderer4.push(`<!----></div></div>`);
                                                                      } else {
                                                                        $$renderer4.push("<!--[!-->");
                                                                      }
                                                                      $$renderer4.push(`<!--]-->`);
                                                                    }
                                                                    $$renderer4.push(`<!--]-->`);
                                                                  }
                                                                  $$renderer4.push(`<!--]-->`);
                                                                } else {
                                                                  $$renderer4.push("<!--[!-->");
                                                                  if (component.name === "Table") {
                                                                    $$renderer4.push("<!--[-->");
                                                                    Table($$renderer4, {
                                                                      caption: "Q1 results",
                                                                      children: ($$renderer5) => {
                                                                        $$renderer5.push(`<thead class="border-b border-border bg-base-50"><tr><th class="px-4 py-3 font-medium text-headline">Region</th><th class="px-4 py-3 font-medium text-headline">Revenue</th></tr></thead> <tbody class="divide-y divide-border"><tr><td class="px-4 py-3 text-body">North</td><td class="px-4 py-3 text-body">$12,400</td></tr><tr><td class="px-4 py-3 text-body">South</td><td class="px-4 py-3 text-body">$9,200</td></tr></tbody>`);
                                                                      }
                                                                    });
                                                                  } else {
                                                                    $$renderer4.push("<!--[!-->");
                                                                    if (component.name === "Toggle") {
                                                                      $$renderer4.push("<!--[-->");
                                                                      $$renderer4.push(`<div class="flex flex-wrap items-center gap-6">`);
                                                                      Toggle($$renderer4, { label: "Email alerts" });
                                                                      $$renderer4.push(`<!----> `);
                                                                      Toggle($$renderer4, { label: "Disabled", disabled: true });
                                                                      $$renderer4.push(`<!----></div>`);
                                                                    } else {
                                                                      $$renderer4.push("<!--[!-->");
                                                                      if (component.name === "Textarea") {
                                                                        $$renderer4.push("<!--[-->");
                                                                        $$renderer4.push(`<div class="max-w-md space-y-3">`);
                                                                        Textarea($$renderer4, {
                                                                          label: "Project notes",
                                                                          placeholder: "Add context for your team…",
                                                                          rows: 4
                                                                        });
                                                                        $$renderer4.push(`<!----></div>`);
                                                                      } else {
                                                                        $$renderer4.push("<!--[!-->");
                                                                        if (component.name === "Progress") {
                                                                          $$renderer4.push("<!--[-->");
                                                                          $$renderer4.push(`<div class="max-w-md space-y-4">`);
                                                                          Progress($$renderer4, { value: 62, max: 100, label: "Storage used" });
                                                                          $$renderer4.push(`<!----> `);
                                                                          Progress($$renderer4, { value: 20, max: 100, size: "sm" });
                                                                          $$renderer4.push(`<!----></div>`);
                                                                        } else {
                                                                          $$renderer4.push("<!--[!-->");
                                                                          if (component.name === "CardHeader" || component.name === "CardContent" || component.name === "CardFooter") {
                                                                            $$renderer4.push("<!--[-->");
                                                                            $$renderer4.push(`<div class="max-w-lg">`);
                                                                            Card($$renderer4, {
                                                                              children: ($$renderer5) => {
                                                                                CardHeader($$renderer5, { title: "Team", subtitle: "People and access" });
                                                                                $$renderer5.push(`<!----> `);
                                                                                CardContent($$renderer5, {
                                                                                  children: ($$renderer6) => {
                                                                                    $$renderer6.push(`<p class="text-sm text-description">Invite colleagues and assign
                                                        roles.</p>`);
                                                                                  },
                                                                                  $$slots: { default: true }
                                                                                });
                                                                                $$renderer5.push(`<!----> `);
                                                                                CardFooter($$renderer5, {
                                                                                  children: ($$renderer6) => {
                                                                                    Button($$renderer6, { variant: "outline", text: "Manage members" });
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
                                                                            if (component.name === "ThemeToggle") {
                                                                              $$renderer4.push("<!--[-->");
                                                                              $$renderer4.push(`<div class="flex items-center gap-3">`);
                                                                              ThemeToggle($$renderer4, {});
                                                                              $$renderer4.push(`<!----> `);
                                                                              Text($$renderer4, {
                                                                                tone: "description",
                                                                                size: "sm",
                                                                                children: ($$renderer5) => {
                                                                                  $$renderer5.push(`<!---->Syncs with the site theme.`);
                                                                                }
                                                                              });
                                                                              $$renderer4.push(`<!----></div>`);
                                                                            } else {
                                                                              $$renderer4.push("<!--[!-->");
                                                                              if (component.name === "Divider") {
                                                                                $$renderer4.push("<!--[-->");
                                                                                $$renderer4.push(`<div class="max-w-md space-y-4"><p class="text-sm text-body">Section A</p> `);
                                                                                Divider($$renderer4, { label: "Or" });
                                                                                $$renderer4.push(`<!----> <p class="text-sm text-body">Section B</p></div>`);
                                                                              } else {
                                                                                $$renderer4.push("<!--[!-->");
                                                                                if (component.name === "Container") {
                                                                                  $$renderer4.push("<!--[-->");
                                                                                  Container($$renderer4, {
                                                                                    maxWidth: "md",
                                                                                    class: "rounded-lg border border-border bg-base-50 py-4 text-center",
                                                                                    children: ($$renderer5) => {
                                                                                      Text($$renderer5, {
                                                                                        tone: "caption",
                                                                                        children: ($$renderer6) => {
                                                                                          $$renderer6.push(`<!---->Centered max-width container`);
                                                                                        }
                                                                                      });
                                                                                    }
                                                                                  });
                                                                                } else {
                                                                                  $$renderer4.push("<!--[!-->");
                                                                                  if (component.name === "Text") {
                                                                                    $$renderer4.push("<!--[-->");
                                                                                    $$renderer4.push(`<div class="space-y-2">`);
                                                                                    Text($$renderer4, {
                                                                                      tone: "headline",
                                                                                      size: "lg",
                                                                                      children: ($$renderer5) => {
                                                                                        $$renderer5.push(`<!---->Headline style`);
                                                                                      }
                                                                                    });
                                                                                    $$renderer4.push(`<!----> `);
                                                                                    Text($$renderer4, {
                                                                                      tone: "description",
                                                                                      children: ($$renderer5) => {
                                                                                        $$renderer5.push(`<!---->Supporting body copy uses the
                                                description tone.`);
                                                                                      }
                                                                                    });
                                                                                    $$renderer4.push(`<!----></div>`);
                                                                                  } else {
                                                                                    $$renderer4.push("<!--[!-->");
                                                                                    if (component.name === "ActionPanel") {
                                                                                      $$renderer4.push("<!--[-->");
                                                                                      $$renderer4.push(`<div class="max-w-md">`);
                                                                                      ActionPanel($$renderer4, {
                                                                                        title: "Webhooks",
                                                                                        description: "Send events to your server when data changes.",
                                                                                        href: "/docs/webhooks",
                                                                                        badgeText: "New"
                                                                                      });
                                                                                      $$renderer4.push(`<!----></div>`);
                                                                                    } else {
                                                                                      $$renderer4.push("<!--[!-->");
                                                                                      if (component.name === "Toaster") {
                                                                                        $$renderer4.push("<!--[-->");
                                                                                        $$renderer4.push(`<div class="space-y-4">`);
                                                                                        Toaster($$renderer4, {});
                                                                                        $$renderer4.push(`<!----> `);
                                                                                        Button($$renderer4, {
                                                                                          text: "Push sample toast",
                                                                                          onclick: () => pushToast({
                                                                                            message: "Your changes were saved.",
                                                                                            type: "success",
                                                                                            title: "Saved"
                                                                                          })
                                                                                        });
                                                                                        $$renderer4.push(`<!----></div>`);
                                                                                      } else {
                                                                                        $$renderer4.push("<!--[!-->");
                                                                                        if (component.name === "RadioGroup") {
                                                                                          $$renderer4.push("<!--[-->");
                                                                                          $$renderer4.push(`<div class="max-w-md">`);
                                                                                          RadioGroup($$renderer4, {
                                                                                            legend: "Billing plan",
                                                                                            name: "showcase-plan",
                                                                                            options: radioGroupDemoOptions,
                                                                                            get value() {
                                                                                              return radioGroupDemoValue;
                                                                                            },
                                                                                            set value($$value) {
                                                                                              radioGroupDemoValue = $$value;
                                                                                              $$settled = false;
                                                                                            }
                                                                                          });
                                                                                          $$renderer4.push(`<!----> <p class="mt-2 text-xs text-description">Selected: ${escape_html(radioGroupDemoValue)}</p></div>`);
                                                                                        } else {
                                                                                          $$renderer4.push("<!--[!-->");
                                                                                          if (component.name === "FormField") {
                                                                                            $$renderer4.push("<!--[-->");
                                                                                            $$renderer4.push(`<div class="max-w-md">`);
                                                                                            {
                                                                                              let control = function($$renderer5, props) {
                                                                                                Input($$renderer5, spread_props([
                                                                                                  props,
                                                                                                  {
                                                                                                    type: "email",
                                                                                                    hideLabel: true,
                                                                                                    label: "Work email",
                                                                                                    placeholder: "you@company.com",
                                                                                                    get value() {
                                                                                                      return formFieldDemoEmail;
                                                                                                    },
                                                                                                    set value($$value) {
                                                                                                      formFieldDemoEmail = $$value;
                                                                                                      $$settled = false;
                                                                                                    }
                                                                                                  }
                                                                                                ]));
                                                                                              };
                                                                                              FormField($$renderer4, {
                                                                                                label: "Work email",
                                                                                                description: "Used for invoices and alerts.",
                                                                                                error: formFieldDemoEmail && !formFieldDemoEmail.includes("@") ? "Enter a valid email address." : "",
                                                                                                control
                                                                                              });
                                                                                            }
                                                                                            $$renderer4.push(`<!----></div>`);
                                                                                          } else {
                                                                                            $$renderer4.push("<!--[!-->");
                                                                                            if (component.name === "Header") {
                                                                                              $$renderer4.push("<!--[-->");
                                                                                              Header($$renderer4, {
                                                                                                title: "Button",
                                                                                                description: "Primary and secondary actions for forms and toolbars.",
                                                                                                category: "atoms",
                                                                                                variantsStates: ["primary", "secondary", "outline", "ghost"]
                                                                                              });
                                                                                            } else {
                                                                                              $$renderer4.push("<!--[!-->");
                                                                                              if (component.name === "EmptyState") {
                                                                                                $$renderer4.push("<!--[-->");
                                                                                                {
                                                                                                  let action = function($$renderer5) {
                                                                                                    Button($$renderer5, { variant: "primary", text: "Create report" });
                                                                                                  };
                                                                                                  EmptyState($$renderer4, {
                                                                                                    title: "No reports yet",
                                                                                                    description: "Create a report to see data here.",
                                                                                                    action
                                                                                                  });
                                                                                                }
                                                                                              } else {
                                                                                                $$renderer4.push("<!--[!-->");
                                                                                                if (component.name === "Page") {
                                                                                                  $$renderer4.push("<!--[-->");
                                                                                                  Page($$renderer4, {
                                                                                                    children: ($$renderer5) => {
                                                                                                      $$renderer5.push(`<p class="text-sm text-description">Page constrains width for long-form
                                                documentation.</p>`);
                                                                                                    }
                                                                                                  });
                                                                                                } else {
                                                                                                  $$renderer4.push("<!--[!-->");
                                                                                                  if (component.name === "Section") {
                                                                                                    $$renderer4.push("<!--[-->");
                                                                                                    Section($$renderer4, {
                                                                                                      title: "Highlights",
                                                                                                      background: "muted",
                                                                                                      padding: "md",
                                                                                                      children: ($$renderer5) => {
                                                                                                        $$renderer5.push(`<p class="text-sm text-body">Section provides titled bands with
                                                background and spacing presets.</p>`);
                                                                                                      },
                                                                                                      $$slots: { default: true }
                                                                                                    });
                                                                                                  } else {
                                                                                                    $$renderer4.push("<!--[!-->");
                                                                                                    if ([
                                                                                                      "NavigationMenuList",
                                                                                                      "NavigationMenuItem",
                                                                                                      "NavigationMenuTrigger",
                                                                                                      "NavigationMenuContent",
                                                                                                      "NavigationMenuLink"
                                                                                                    ].includes(component.name)) {
                                                                                                      $$renderer4.push("<!--[-->");
                                                                                                      $$renderer4.push(`<div class="min-w-0 overflow-x-auto py-2">`);
                                                                                                      NavigationMenu($$renderer4, {
                                                                                                        viewport: false,
                                                                                                        menuId: "showcase-compound-nav",
                                                                                                        children: ($$renderer5) => {
                                                                                                          NavigationMenuList($$renderer5, {
                                                                                                            children: ($$renderer6) => {
                                                                                                              NavigationMenuItem($$renderer6, {
                                                                                                                value: "docs",
                                                                                                                children: ($$renderer7) => {
                                                                                                                  NavigationMenuTrigger($$renderer7, {
                                                                                                                    value: "docs",
                                                                                                                    children: ($$renderer8) => {
                                                                                                                      $$renderer8.push(`<!---->Docs`);
                                                                                                                    },
                                                                                                                    $$slots: { default: true }
                                                                                                                  });
                                                                                                                  $$renderer7.push(`<!----> `);
                                                                                                                  NavigationMenuContent($$renderer7, {
                                                                                                                    value: "docs",
                                                                                                                    children: ($$renderer8) => {
                                                                                                                      $$renderer8.push(`<ul class="grid min-w-[12rem] gap-2 p-3"><li>`);
                                                                                                                      NavigationMenuLink($$renderer8, {
                                                                                                                        href: "/guide",
                                                                                                                        children: ($$renderer9) => {
                                                                                                                          $$renderer9.push(`<!---->Guide`);
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
                                                                                                      $$renderer4.push(`<!----></div>`);
                                                                                                    } else {
                                                                                                      $$renderer4.push("<!--[!-->");
                                                                                                      if (component.name === "SidebarBrandHeader") {
                                                                                                        $$renderer4.push("<!--[-->");
                                                                                                        $$renderer4.push(`<div class="w-64 rounded-xl border border-border bg-card p-3">`);
                                                                                                        SidebarBrandHeader($$renderer4, { brandName: "Zabi" });
                                                                                                        $$renderer4.push(`<!----></div>`);
                                                                                                      } else {
                                                                                                        $$renderer4.push("<!--[!-->");
                                                                                                        if (component.name === "SidebarFooter") {
                                                                                                          $$renderer4.push("<!--[-->");
                                                                                                          $$renderer4.push(`<div class="w-64 rounded-xl border border-border bg-card">`);
                                                                                                          SidebarFooter($$renderer4, { collapsed: false, profileName: "Alex Rivera" });
                                                                                                          $$renderer4.push(`<!----></div>`);
                                                                                                        } else {
                                                                                                          $$renderer4.push("<!--[!-->");
                                                                                                          if (component.name === "SidebarNavSection") {
                                                                                                            $$renderer4.push("<!--[-->");
                                                                                                            $$renderer4.push(`<div class="w-64 rounded-xl border border-border bg-card p-2">`);
                                                                                                            SidebarNavSection($$renderer4, {
                                                                                                              title: "Workspace",
                                                                                                              listAriaLabel: "Workspace navigation",
                                                                                                              children: ($$renderer5) => {
                                                                                                                $$renderer5.push(`<li class="rounded-md px-2 py-1.5 text-sm text-body">Overview</li> <li class="rounded-md px-2 py-1.5 text-sm text-body">Settings</li>`);
                                                                                                              }
                                                                                                            });
                                                                                                            $$renderer4.push(`<!----></div>`);
                                                                                                          } else {
                                                                                                            $$renderer4.push("<!--[!-->");
                                                                                                            if (component.name === "ComponentDemo") {
                                                                                                              $$renderer4.push("<!--[-->");
                                                                                                              $$renderer4.push(`<div class="rounded-lg border border-dashed border-border bg-base-50 p-4"><p class="mb-3 text-sm text-description">This site wraps each example in
                                                ComponentDemo: title, preview, and
                                                a code toggle.</p> `);
                                                                                                              Badge($$renderer4, { text: "Preview area" });
                                                                                                              $$renderer4.push(`<!----></div>`);
                                                                                                            } else {
                                                                                                              $$renderer4.push("<!--[!-->");
                                                                                                              if (component.name === "SidebarAccountPanel") {
                                                                                                                $$renderer4.push("<!--[-->");
                                                                                                                $$renderer4.push(`<div class="max-h-[22rem] overflow-auto rounded-xl border border-border bg-card p-2">`);
                                                                                                                SidebarAccountPanel($$renderer4, {
                                                                                                                  profileName: "Alex Rivera",
                                                                                                                  profileEmail: "alex@example.com",
                                                                                                                  variant: "elevated"
                                                                                                                });
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
function PropsTable($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { props, caption = "Props / API" } = $$props;
    if (props.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="rounded-lg border border-border bg-base-50 px-4 py-4 text-sm text-description">No documented props.</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      Table($$renderer2, {
        caption,
        children: ($$renderer3) => {
          $$renderer3.push(`<thead><tr class="bg-base-50"><th class="border-b border-border px-4 py-3 text-left font-semibold text-headline">Name</th><th class="border-b border-border px-4 py-3 text-left font-semibold text-headline">Type</th><th class="border-b border-border px-4 py-3 text-left font-semibold text-headline">Required</th><th class="border-b border-border px-4 py-3 text-left font-semibold text-headline">Default</th><th class="border-b border-border px-4 py-3 text-left font-semibold text-headline">Description</th></tr></thead> <tbody><!--[-->`);
          const each_array = ensure_array_like(props);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let prop = each_array[$$index];
            $$renderer3.push(`<tr class="hover:bg-base-50/70"><td class="border-b border-border px-4 py-3 font-mono text-body">${escape_html(prop.name)}</td><td class="border-b border-border px-4 py-3 text-description">${escape_html(prop.type)}</td><td class="border-b border-border px-4 py-3 text-description">${escape_html(prop.required ? "Yes" : "No")}</td><td class="border-b border-border px-4 py-3 text-description">${escape_html(prop.defaultValue || "—")}</td><td class="border-b border-border px-4 py-3 text-description">${escape_html(prop.description)}</td></tr>`);
          }
          $$renderer3.push(`<!--]--></tbody>`);
        }
      });
    }
    $$renderer2.push(`<!--]-->`);
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
      Page($$renderer3, {
        children: ($$renderer4) => {
          Header($$renderer4, {
            title: component.name,
            description: component.description,
            category: component.category,
            variantsStates: component.variants
          });
          $$renderer4.push(`<!----> `);
          Section($$renderer4, {
            title: "Live example",
            description: "Default usage you can copy and adapt.",
            padding: "none",
            background: "transparent",
            maxWidth: "none",
            className: "pt-2",
            children: ($$renderer5) => {
              ComponentShowcaseExampleDemos($$renderer5, {
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
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> `);
          Section($$renderer4, {
            title: "Props / API",
            description: "Minimal API reference for the exported component.",
            padding: "none",
            background: "transparent",
            maxWidth: "none",
            children: ($$renderer5) => {
              PropsTable($$renderer5, { props: component.props });
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        }
      });
      $$renderer3.push(`<!----> <footer class="mt-16 -mx-8 border-t border-border bg-base-100 px-8 py-8"><div class="mx-auto max-w-4xl"><div class="flex flex-col items-center justify-between gap-4 md:flex-row"><div class="text-center md:text-left"><p class="mb-2 text-description">Open source · MIT license · Code on GitHub</p> <p class="text-sm text-caption">© 2026 Zabi Components. MIT License.</p></div> <div class="flex gap-6"><a href="/docs" class="text-description transition-colors hover:text-headline">Docs</a> <a href="/components" class="text-description transition-colors hover:text-headline">Components</a> <a href="https://github.com/sabnor/zabi-components" class="text-description transition-colors hover:text-headline">GitHub</a></div></div></div></footer>`);
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
