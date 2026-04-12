import { Y as spread_props, Z as attr, _ as attr_class, $ as clsx, a0 as attributes, a1 as bind_props, X as ensure_array_like, a2 as stringify, a3 as attr_style, a4 as element, U as head } from "../../../chunks/index2.js";
import { T as Triangle_alert, B as Badge, X } from "../../../chunks/Badge.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { a as ssr_context, e as escape_html, g as getContext, s as setContext } from "../../../chunks/context.js";
import { S as Sun, N as Navbar } from "../../../chunks/Navbar.js";
import { h as html, I as IconButton, H as Heart, C as CodeBlock } from "../../../chunks/IconButton.js";
import { C as Card, a as CardHeader, b as CardContent, B as Button } from "../../../chunks/CardHeader.js";
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
function Bell($$renderer, $$props) {
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
      ["path", { "d": "M10.268 21a2 2 0 0 0 3.464 0" }],
      [
        "path",
        {
          "d": "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
        }
      ]
    ];
    Icon($$renderer2, spread_props([
      { name: "bell" },
      /**
       * @component @name Bell
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTAuMjY4IDIxYTIgMiAwIDAgMCAzLjQ2NCAwIiAvPgogIDxwYXRoIGQ9Ik0zLjI2MiAxNS4zMjZBMSAxIDAgMCAwIDQgMTdoMTZhMSAxIDAgMCAwIC43NC0xLjY3M0MxOS40MSAxMy45NTYgMTggMTIuNDk5IDE4IDhBNiA2IDAgMCAwIDYgOGMwIDQuNDk5LTEuNDExIDUuOTU2LTIuNzM4IDcuMzI2IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/bell
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
function Chart_column($$renderer, $$props) {
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
      ["path", { "d": "M3 3v16a2 2 0 0 0 2 2h16" }],
      ["path", { "d": "M18 17V9" }],
      ["path", { "d": "M13 17V5" }],
      ["path", { "d": "M8 17v-3" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "chart-column" },
      /**
       * @component @name ChartColumn
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMyAzdjE2YTIgMiAwIDAgMCAyIDJoMTYiIC8+CiAgPHBhdGggZD0iTTE4IDE3VjkiIC8+CiAgPHBhdGggZD0iTTEzIDE3VjUiIC8+CiAgPHBhdGggZD0iTTggMTd2LTMiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/chart-column
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
function Chart_pie($$renderer, $$props) {
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
          "d": "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"
        }
      ],
      ["path", { "d": "M21.21 15.89A10 10 0 1 1 8 2.83" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "chart-pie" },
      /**
       * @component @name ChartPie
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEgMTJjLjU1MiAwIDEuMDA1LS40NDkuOTUtLjk5OGExMCAxMCAwIDAgMC04Ljk1My04Ljk1MWMtLjU1LS4wNTUtLjk5OC4zOTgtLjk5OC45NXY4YTEgMSAwIDAgMCAxIDF6IiAvPgogIDxwYXRoIGQ9Ik0yMS4yMSAxNS44OUExMCAxMCAwIDEgMSA4IDIuODMiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/chart-pie
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
function Circle_alert($$renderer, $$props) {
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
      ["line", { "x1": "12", "x2": "12", "y1": "8", "y2": "12" }],
      [
        "line",
        { "x1": "12", "x2": "12.01", "y1": "16", "y2": "16" }
      ]
    ];
    Icon($$renderer2, spread_props([
      { name: "circle-alert" },
      /**
       * @component @name CircleAlert
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8bGluZSB4MT0iMTIiIHgyPSIxMiIgeTE9IjgiIHkyPSIxMiIgLz4KICA8bGluZSB4MT0iMTIiIHgyPSIxMi4wMSIgeTE9IjE2IiB5Mj0iMTYiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/circle-alert
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
function Circle_check_big($$renderer, $$props) {
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
      ["path", { "d": "M21.801 10A10 10 0 1 1 17 3.335" }],
      ["path", { "d": "m9 11 3 3L22 4" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "circle-check-big" },
      /**
       * @component @name CircleCheckBig
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEuODAxIDEwQTEwIDEwIDAgMSAxIDE3IDMuMzM1IiAvPgogIDxwYXRoIGQ9Im05IDExIDMgM0wyMiA0IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/circle-check-big
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
function House($$renderer, $$props) {
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
        { "d": "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" }
      ],
      [
        "path",
        {
          "d": "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        }
      ]
    ];
    Icon($$renderer2, spread_props([
      { name: "house" },
      /**
       * @component @name House
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTUgMjF2LThhMSAxIDAgMCAwLTEtMWgtNGExIDEgMCAwIDAtMSAxdjgiIC8+CiAgPHBhdGggZD0iTTMgMTBhMiAyIDAgMCAxIC43MDktMS41MjhsNy02YTIgMiAwIDAgMSAyLjU4MiAwbDcgNkEyIDIgMCAwIDEgMjEgMTB2OWEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMnoiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/house
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
function Package($$renderer, $$props) {
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
          "d": "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"
        }
      ],
      ["path", { "d": "M12 22V12" }],
      ["polyline", { "points": "3.29 7 12 12 20.71 7" }],
      ["path", { "d": "m7.5 4.27 9 5.15" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "package" },
      /**
       * @component @name Package
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTEgMjEuNzNhMiAyIDAgMCAwIDIgMGw3LTRBMiAyIDAgMCAwIDIxIDE2VjhhMiAyIDAgMCAwLTEtMS43M2wtNy00YTIgMiAwIDAgMC0yIDBsLTcgNEEyIDIgMCAwIDAgMyA4djhhMiAyIDAgMCAwIDEgMS43M3oiIC8+CiAgPHBhdGggZD0iTTEyIDIyVjEyIiAvPgogIDxwb2x5bGluZSBwb2ludHM9IjMuMjkgNyAxMiAxMiAyMC43MSA3IiAvPgogIDxwYXRoIGQ9Im03LjUgNC4yNyA5IDUuMTUiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/package
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
function Search($$renderer, $$props) {
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
      ["path", { "d": "m21 21-4.34-4.34" }],
      ["circle", { "cx": "11", "cy": "11", "r": "8" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "search" },
      /**
       * @component @name Search
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMjEgMjEtNC4zNC00LjM0IiAvPgogIDxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjgiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/search
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
function Settings($$renderer, $$props) {
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
          "d": "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"
        }
      ],
      ["circle", { "cx": "12", "cy": "12", "r": "3" }]
    ];
    Icon($$renderer2, spread_props([
      { name: "settings" },
      /**
       * @component @name Settings
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNOS42NzEgNC4xMzZhMi4zNCAyLjM0IDAgMCAxIDQuNjU5IDAgMi4zNCAyLjM0IDAgMCAwIDMuMzE5IDEuOTE1IDIuMzQgMi4zNCAwIDAgMSAyLjMzIDQuMDMzIDIuMzQgMi4zNCAwIDAgMCAwIDMuODMxIDIuMzQgMi4zNCAwIDAgMS0yLjMzIDQuMDMzIDIuMzQgMi4zNCAwIDAgMC0zLjMxOSAxLjkxNSAyLjM0IDIuMzQgMCAwIDEtNC42NTkgMCAyLjM0IDIuMzQgMCAwIDAtMy4zMi0xLjkxNSAyLjM0IDIuMzQgMCAwIDEtMi4zMy00LjAzMyAyLjM0IDIuMzQgMCAwIDAgMC0zLjgzMUEyLjM0IDIuMzQgMCAwIDEgNi4zNSA2LjA1MWEyLjM0IDIuMzQgMCAwIDAgMy4zMTktMS45MTUiIC8+CiAgPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/settings
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
function isBrowser() {
  return typeof window !== "undefined";
}
let idCounter = 0;
function generateId(prefix = "id") {
  if (isBrowser()) {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  } else {
    return `${prefix}-ssr-${++idCounter}`;
  }
}
function Input($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      value = "",
      type = "text",
      name = "",
      class: className = "",
      label = "",
      placeholder = "",
      required = false,
      disabled = false,
      size = "md",
      variant = "default",
      message = "",
      oninput,
      onblur,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const inputId = generateId("input");
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
      return variant === "success" ? "border-success focus:border-success focus:ring-success" : variant === "warning" ? "border-warning focus:border-warning focus:ring-warning" : variant === "error" ? "border-error focus:border-error focus:ring-error" : "border-input-border focus:border-input-border focus:ring-2 focus:ring-brand-500";
    };
    const inputClasses = () => {
      const sizeStyles = sizeClass();
      const baseClasses = "w-full min-w-48 border bg-input hover:bg-input-hover focus:bg-input-focus disabled:bg-input-disabled rounded-lg transition-all duration-200 placeholder:text-description text-body focus:outline-none focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed";
      return `${baseClasses} ${sizeStyles.padding} ${sizeStyles.text} ${sizeStyles.leading} ${variantClass()} ${className}`.trim();
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
        required,
        disabled,
        class: clsx(inputClasses()),
        "aria-invalid": variant === "error" ? "true" : void 0,
        "aria-required": required ? "true" : void 0,
        "aria-describedby": message ? `${inputId}-message` : void 0,
        ...restProps
      },
      void 0,
      void 0,
      void 0,
      4
    )}/> `);
    if (message && variant !== "default") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p${attr("id", `${inputId}-message`)}${attr_class(clsx(messageClasses()))}${attr("role", variant === "error" ? "alert" : "status")}${attr("aria-live", variant === "error" ? "assertive" : "polite")}>`);
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
function SidebarNavigation($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      mode = "expanded",
      items = [],
      currentPath = "",
      ariaLabel = "Sidebar navigation",
      className = "",
      showProfile = true,
      profileName = "Zabi",
      profileEmail = "hello@zabi.dev",
      profileInitials = "ZA",
      showSearch = true,
      searchMode = "input",
      searchPlaceholder = "Search...",
      searchValue = "",
      showLogout = true,
      logoutLabel = "Logout",
      showThemeToggle = true,
      lightModeLabel = "Light mode",
      isLightMode = false,
      emptyStateTitle = "Create your first navigation item",
      emptyStateDescription = "Add your first sidebar item so users can start navigating your product.",
      emptyStateActionLabel = "Add navigation item",
      onNavigate,
      onSearchClick,
      onLogout,
      onThemeToggle,
      onEmptyStateAction,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const isCollapsed = mode === "collapsed";
    const normalizedSearchTerm = searchValue.trim().toLowerCase();
    const primaryItems = items.filter((item) => item.group !== "secondary");
    const secondaryItems = items.filter((item) => item.group === "secondary");
    const filteredPrimaryItems = searchMode === "input" && normalizedSearchTerm ? primaryItems.filter((item) => item.label.toLowerCase().includes(normalizedSearchTerm)) : primaryItems;
    const filteredSecondaryItems = searchMode === "input" && normalizedSearchTerm ? secondaryItems.filter((item) => item.label.toLowerCase().includes(normalizedSearchTerm)) : secondaryItems;
    const hasFilteredItems = filteredPrimaryItems.length + filteredSecondaryItems.length > 0;
    const containerClasses = (() => {
      const widthClass = isCollapsed ? "w-[104px]" : "w-[266px]";
      const surfaceClasses = "bg-background border-border text-headline";
      const baseClasses = "flex h-full min-h-0 max-h-full flex-col overflow-hidden border-r py-6";
      return `${baseClasses} ${widthClass} ${surfaceClasses} ${className}`.trim();
    })();
    const avatarClasses = "size-14 rounded-2xl bg-action-primary text-action-primary flex items-center justify-center font-semibold text-base shrink-0";
    const searchControlStates = "text-nav-menu-item outline-none transition-colors duration-150 hover:bg-nav-menu-hover hover:text-nav-menu-item-hover active:bg-base-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus";
    const searchButtonClasses = `flex min-h-11 w-full cursor-pointer items-center justify-center rounded-2xl border border-input-border bg-input px-0 py-2.5 ${searchControlStates}`;
    const searchTriggerClasses = (() => {
      return isCollapsed ? searchButtonClasses : `flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-2xl border border-input-border bg-input px-4 py-2.5 text-left ${searchControlStates}`;
    })();
    const iconContainerClasses = "flex size-6 shrink-0 items-center justify-center leading-none text-current";
    const shouldRenderSearchButton = isCollapsed || searchMode === "button" || Boolean(onSearchClick);
    function getTextToneClass(isMuted = false) {
      return isMuted ? "text-description" : "text-headline";
    }
    function getNavItemClasses(item) {
      const isActive = currentPath === item.href;
      const layoutClasses = isCollapsed ? "flex min-h-11 items-center justify-center px-0 py-2.5" : "flex min-h-11 items-center gap-3 px-4 py-2.5";
      const structural = "w-full cursor-pointer rounded-lg no-underline transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus";
      if (isActive) {
        return `${structural} ${layoutClasses} bg-nav-menu-active text-nav-menu-item-active hover:bg-nav-menu-active hover:text-nav-menu-item-active active:opacity-90`;
      }
      return `${structural} ${layoutClasses} text-nav-menu-item hover:bg-nav-menu-hover hover:text-nav-menu-item-hover active:bg-base-200`;
    }
    function getControlButtonClasses() {
      const baseClasses = "w-full cursor-pointer rounded-lg text-nav-menu-item transition-colors duration-150 outline-none hover:bg-nav-menu-hover hover:text-nav-menu-item-hover active:bg-base-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus";
      const layoutClasses = isCollapsed ? "flex min-h-11 items-center justify-center px-0 py-2.5" : "flex min-h-11 items-center gap-3 px-4 py-2.5";
      return `${baseClasses} ${layoutClasses}`;
    }
    const themeToggleContainerClasses = isCollapsed ? "flex w-full justify-center py-1" : "flex w-full justify-start py-1";
    function getItemBadgeText(item) {
      if (item.badgeText !== void 0) {
        return String(item.badgeText);
      }
      if (item.badgeCount !== void 0) {
        return String(item.badgeCount);
      }
      return null;
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<nav${attributes({
        class: clsx(containerClasses),
        "aria-label": ariaLabel,
        ...restProps
      })}><div class="flex w-full shrink-0 flex-col gap-6">`);
      if (showProfile) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="flex w-full items-center gap-3"><div${attr_class(clsx(avatarClasses))} aria-hidden="true">${escape_html(profileInitials)}</div> `);
        if (!isCollapsed) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="min-w-0"><p${attr_class(`truncate text-base font-bold ${stringify(getTextToneClass())}`)}>${escape_html(profileName)}</p> <p${attr_class(`truncate text-sm ${stringify(getTextToneClass(true))}`)}>${escape_html(profileEmail)}</p></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (showSearch) {
        $$renderer3.push("<!--[-->");
        if (shouldRenderSearchButton) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<button type="button"${attr_class(clsx(searchTriggerClasses))}${attr("aria-label", searchPlaceholder)}><span class="truncate text-base text-inherit transition-colors">${escape_html(searchValue || searchPlaceholder)}</span></button>`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<div class="relative w-full"><span class="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2" aria-hidden="true">`);
          Search($$renderer3, { size: 20, class: getTextToneClass(true) });
          $$renderer3.push(`<!----></span> `);
          Input($$renderer3, {
            type: "search",
            placeholder: searchPlaceholder,
            "aria-label": searchPlaceholder,
            class: "w-full min-w-0 rounded-2xl pl-12",
            get value() {
              return searchValue;
            },
            set value($$value) {
              searchValue = $$value;
              $$settled = false;
            }
          });
          $$renderer3.push(`<!----></div>`);
        }
        $$renderer3.push(`<!--]-->`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> <div class="flex min-h-0 flex-1 w-full flex-col gap-6 overflow-y-auto overflow-x-hidden overscroll-y-contain py-1" role="region" aria-label="Navigation links">`);
      if (hasFilteredItems) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<ul class="flex w-full flex-col gap-2 px-2" aria-label="Primary navigation"><!--[-->`);
        const each_array = ensure_array_like(filteredPrimaryItems);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let item = each_array[$$index];
          const Icon2 = item.icon;
          $$renderer3.push(`<li><a${attr("href", item.href)}${attr_class(clsx(getNavItemClasses(item)))}${attr("aria-current", currentPath === item.href ? "page" : void 0)}${attr("aria-label", isCollapsed ? item.label : void 0)}>`);
          if (Icon2) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<span${attr_class(clsx(iconContainerClasses))} aria-hidden="true"><!---->`);
            Icon2($$renderer3, { size: 20 });
            $$renderer3.push(`<!----></span>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> `);
          if (!isCollapsed) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<span class="text-base leading-snug text-inherit">${escape_html(item.label)}</span>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> `);
          if (!isCollapsed && getItemBadgeText(item) !== null) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<span class="ml-auto">`);
            Badge($$renderer3, {
              variant: "default",
              size: "sm",
              text: getItemBadgeText(item) ?? ""
            });
            $$renderer3.push(`<!----></span>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></a></li>`);
        }
        $$renderer3.push(`<!--]--></ul> `);
        if (filteredSecondaryItems.length > 0) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<ul class="flex w-full flex-col gap-3 px-2" aria-label="Secondary navigation"><!--[-->`);
          const each_array_1 = ensure_array_like(filteredSecondaryItems);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let item = each_array_1[$$index_1];
            const Icon2 = item.icon;
            $$renderer3.push(`<li><a${attr("href", item.href)}${attr_class(clsx(getNavItemClasses(item)))}${attr("aria-current", currentPath === item.href ? "page" : void 0)}${attr("aria-label", isCollapsed ? item.label : void 0)}>`);
            if (Icon2) {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`<span${attr_class(clsx(iconContainerClasses))} aria-hidden="true"><!---->`);
              Icon2($$renderer3, { size: 20 });
              $$renderer3.push(`<!----></span>`);
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--> `);
            if (!isCollapsed) {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`<span class="text-base leading-snug text-inherit">${escape_html(item.label)}</span>`);
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--></a></li>`);
          }
          $$renderer3.push(`<!--]--></ul>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div class="rounded-2xl border border-border border-dashed bg-base-50 px-4 py-5"><h3${attr_class(`text-base font-semibold ${stringify(getTextToneClass())}`)}>${escape_html(normalizedSearchTerm && searchMode === "input" ? "No matching navigation items" : emptyStateTitle)}</h3> <p${attr_class(`mt-1 text-sm ${stringify(getTextToneClass(true))}`)}>${escape_html(normalizedSearchTerm && searchMode === "input" ? `No results found for "${searchValue}". Try another keyword.` : emptyStateDescription)}</p> `);
        if (!(normalizedSearchTerm && searchMode === "input")) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<button type="button" class="mt-4 inline-flex min-h-11 cursor-pointer items-center rounded-lg bg-action-primary px-3 py-2 text-sm text-action-primary outline-none transition-colors hover:bg-action-primary-hover focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus">${escape_html(emptyStateActionLabel)}</button>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div>`);
      }
      $$renderer3.push(`<!--]--></div> `);
      if (showLogout || showThemeToggle) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="flex w-full shrink-0 flex-col gap-2 border-t border-border pt-4">`);
        if (showLogout) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<button type="button"${attr_class(clsx(getControlButtonClasses()))}><span${attr_class(clsx(iconContainerClasses))} aria-hidden="true">`);
          Log_out($$renderer3, { size: 20 });
          $$renderer3.push(`<!----></span> `);
          if (!isCollapsed) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<span class="text-base text-inherit">${escape_html(logoutLabel)}</span>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></button>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> `);
        if (showThemeToggle) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div${attr_class(clsx(themeToggleContainerClasses))}><button type="button"${attr_class(`inline-flex h-8 w-14 cursor-pointer items-center rounded-2xl p-1 outline-none transition-colors duration-150 hover:opacity-95 active:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-nav-menu-focus ${stringify(isLightMode ? "bg-action-primary" : "bg-base-200")}`)} role="switch"${attr("aria-checked", isLightMode)}${attr("title", lightModeLabel)}${attr("aria-label", isLightMode ? "Switch to dark mode" : "Switch to light mode")}><span${attr_class(`flex h-6 w-6 items-center justify-center rounded-xl leading-none shadow-sm transition-transform duration-150 active:scale-95 ${stringify(isLightMode ? "translate-x-6 bg-base-900 text-action-primary" : "translate-x-0 bg-base-900 text-base-50")}`)}>`);
          if (isLightMode) {
            $$renderer3.push("<!--[-->");
            Sun($$renderer3, { size: 14 });
          } else {
            $$renderer3.push("<!--[!-->");
            Moon($$renderer3, { size: 14 });
          }
          $$renderer3.push(`<!--]--></span></button></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></nav>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { searchValue, isLightMode });
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
      selectLabel = "Select item",
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
      const baseClasses = "w-full cursor-pointer rounded-xl px-3 py-3 text-left transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-0";
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
      })}><div class="mb-4 flex items-start justify-between gap-3"><div class="min-w-0"><h3 class="truncate text-base font-semibold text-headline">${escape_html(title)}</h3> <p class="mt-1 text-sm text-description">${escape_html(subtitle)}</p></div> <button type="button" class="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-description hover:bg-base-50 hover:text-headline focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-0"${attr("aria-label", closeLabel)}>`);
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
const categories = [
  {
    id: "all",
    label: "All",
    description: "All component categories"
  },
  { id: "atoms", label: "Atoms", description: "Basic building blocks" },
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
const sampleCode = `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`;
const selectOptions = Array.from({ length: 16 }, (_, index) => ({
  value: `option-${index + 1}`,
  label: `Option ${index + 1}`
}));
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
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: House },
  { id: "revenue", label: "Revenue", href: "/revenue", icon: Chart_column },
  {
    id: "notifications",
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
    badgeCount: 2
  },
  { id: "analytics", label: "Analytics", href: "/analytics", icon: Chart_pie },
  { id: "inventory", label: "Inventory", href: "/inventory", icon: Package },
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
                                        if (component.name === "Navbar") {
                                          $$renderer4.push("<!--[-->");
                                          $$renderer4.push(`<div class="space-y-6"><div><h4 class="text-sm font-medium text-headline mb-2">Full bar with inline links</h4> `);
                                          Navbar($$renderer4, {
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
                                          Navbar($$renderer4, {
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
const componentsCatalog = {
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
        "ghost",
        "outline",
        "link"
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
      variants: [
        "primary",
        "secondary",
        "danger",
        "ghost",
        "outline",
        "link"
      ],
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
      variants: [
        "default",
        "simple",
        "with-icons",
        "with-descriptions"
      ],
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
      description: "Top navigation bar with brand, optional built-in link list, theme toggle, and responsive mobile menu. Use `embedded` for a link-only strip inside a custom header.",
      props: [
        {
          name: "brand",
          type: "string",
          required: false,
          defaultValue: '""',
          description: "Brand text shown beside the logo area"
        },
        {
          name: "brandHref",
          type: "string",
          required: false,
          defaultValue: "undefined",
          description: "When set, the brand is a link"
        },
        {
          name: "items",
          type: "NavbarNavItem[]",
          required: false,
          defaultValue: "[]",
          description: "Built-in nav links (ignored when a `nav` snippet is provided)"
        },
        {
          name: "navVariant",
          type: '"header" | "sidebar"',
          required: false,
          defaultValue: '"header"',
          description: "Layout for built-in link list"
        },
        {
          name: "embedded",
          type: "boolean",
          required: false,
          defaultValue: "false",
          description: "Render only the link list (or `nav` snippet) inside a `nav` landmark"
        },
        {
          name: "currentPath",
          type: "string",
          required: false,
          defaultValue: '""',
          description: "Active route for built-in links"
        }
      ],
      variants: ["chrome", "embedded"],
      examples: [
        {
          title: "Navbar with inline links",
          description: "Full bar with items prop",
          code: '&lt;Navbar brand="App" brandHref="/" items={navItems} navVariant="header" currentPath="/" /&gt;'
        },
        {
          title: "Embedded link list",
          description: "Link row inside your own header layout",
          code: '&lt;Navbar embedded ariaLabel="Primary" navVariant="header" items={navItems} /&gt;'
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
      name: "SidebarPanel",
      category: "organisms",
      description: "Companion panel for sidebar search-trigger flows: searchable list, selection, badges, and close control.",
      props: [
        {
          name: "items",
          type: "SidebarPanelItem[]",
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
          title: "Picker panel",
          description: "Search and select from a dedicated side panel.",
          code: "&lt;SidebarPanel items={panelItems} bind:selectedItemId bind:searchValue /&gt;"
        }
      ]
    }
  ]
};
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
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let selectedCategory = "atoms";
    let selectedComponent = "button";
    let modalOpen = false;
    let slideUpOpen = false;
    let activeTab = "tab1";
    let sidebarOpen = false;
    let selectValue = void 0;
    let sidebarPath = "/revenue";
    let sidebarSearchValue = "Revenue";
    let sidebarSearchPanelOpen = false;
    let sidebarProjectSearch = "";
    let selectedProjectId = "proj-zabi-web";
    let componentsNavSearch = "";
    let currentComponents = (() => {
      if (selectedCategory === "all") {
        return [
          ...componentsCatalog.atoms,
          ...componentsCatalog.molecules,
          ...componentsCatalog.organisms
        ];
      }
      return componentsCatalog[selectedCategory] || [];
    })();
    const docsSidebarCurrentPath = selectedComponent ? `component:${selectedComponent}` : `category:${selectedCategory}`;
    const docsSidebarItems = (() => {
      const categoryItems = categories.map((category) => ({
        id: `category-${category.id}`,
        label: category.label,
        href: `category:${category.id}`,
        icon: getDocsCategoryIcon(category.id),
        badgeText: category.id === "all" ? componentsCatalog.atoms.length + componentsCatalog.molecules.length + componentsCatalog.organisms.length : componentsCatalog[category.id]?.length,
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
          ...componentsCatalog.atoms,
          ...componentsCatalog.molecules,
          ...componentsCatalog.organisms
        ][0] : componentsCatalog[targetValue]?.[0];
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
      $$renderer3.push(`<div class="bg-background"><main class="flex h-[calc(100dvh-4rem)] min-h-0 w-full max-w-screen">`);
      if (sidebarOpen) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<button type="button" class="fixed inset-x-0 bottom-0 top-16 z-20 bg-black/30 md:hidden" aria-label="Close components sidebar"></button>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <div${attr_class(`fixed left-0 top-16 z-30 flex h-[calc(100dvh-4rem)] min-h-0 w-[min(100vw-1rem,266px)] max-w-[266px] flex-col transform bg-background transition-transform duration-200 md:static md:z-0 md:h-full md:w-auto md:max-w-none md:min-h-0 md:shrink-0 md:translate-x-0 ${stringify(sidebarOpen ? "translate-x-0" : "-translate-x-full")}`)}>`);
      SidebarNavigation($$renderer3, {
        className: "min-h-0 flex-1",
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
      $$renderer3.push(`<!----></div> <div class="flex min-h-0 min-w-0 flex-1 flex-col"><div class="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain p-8"><div class="mb-6 flex items-center gap-3 md:hidden"><button type="button" class="text-description hover:text-headline text-2xl cursor-pointer transition-colors" aria-label="Toggle component sidebar"${attr("aria-expanded", sidebarOpen)}>☰</button> <span class="text-sm font-semibold text-headline">Browse components</span></div> <!--[-->`);
      const each_array = ensure_array_like(currentComponents);
      for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
        let component = each_array[$$index_2];
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
          $$renderer3.push(`<!----> <div class="mt-12"><h2 class="text-2xl font-bold text-headline mb-6">Props</h2> <div class="overflow-x-auto"><table class="w-full border-collapse border border-border"><thead><tr class="bg-base-100"><th class="border border-border px-4 py-2 text-left text-headline font-semibold">Name</th><th class="border border-border px-4 py-2 text-left text-headline font-semibold">Type</th><th class="border border-border px-4 py-2 text-left text-headline font-semibold">Required</th><th class="border border-border px-4 py-2 text-left text-headline font-semibold">Default</th><th class="border border-border px-4 py-2 text-left text-headline font-semibold">Description</th></tr></thead><tbody><!--[-->`);
          const each_array_2 = ensure_array_like(component.props);
          for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
            let prop = each_array_2[$$index_1];
            $$renderer3.push(`<tr><td class="border border-border px-4 py-2 text-body font-mono">${escape_html(prop.name)}</td><td class="border border-border px-4 py-2 text-description">${escape_html(prop.type)}</td><td class="border border-border px-4 py-2 text-description">${escape_html(prop.required ? "Yes" : "No")}</td><td class="border border-border px-4 py-2 text-description">${escape_html(prop.defaultValue || "-")}</td><td class="border border-border px-4 py-2 text-description">${escape_html(prop.description)}</td></tr>`);
          }
          $$renderer3.push(`<!--]--></tbody></table></div></div></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]--> <footer class="mt-16 bg-base-100 border-t border-border py-8 -mx-8 px-8"><div class="mx-auto max-w-4xl"><div class="flex flex-col items-center justify-between gap-4 md:flex-row"><div class="text-center md:text-left"><p class="text-description mb-2">Open source · MIT license · Code on GitHub</p> <p class="text-sm text-caption">© 2026 Zabi Components. MIT License.</p></div> <div class="flex gap-6"><a href="/docs" class="text-description hover:text-headline transition-colors">Docs</a> <a href="/components" class="text-description hover:text-headline transition-colors">Components</a> <a href="https://github.com/sabnor/zabi-components" class="text-description hover:text-headline transition-colors">GitHub</a></div></div></div></footer></div></div></main></div>`);
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
