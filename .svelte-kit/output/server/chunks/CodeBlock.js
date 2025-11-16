import { O as attributes, F as attr_class, N as stringify } from "./index.js";
import { h as html } from "./Card.js";
function CodeBlock($$renderer, $$props) {
  let {
    code,
    language = "svelte",
    className = "",
    showCopyButton = true,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$renderer.push(`<div${attributes(
    {
      class: `code-block relative bg-base-900 rounded-lg overflow-hidden ${stringify(className)}`,
      ...restProps
    },
    "svelte-1dmazsz"
  )}><div class="flex items-center justify-between px-4 py-2 bg-base-800 border-b border-base-700"><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-red-500"></div> <div class="w-3 h-3 rounded-full bg-yellow-500"></div> <div class="w-3 h-3 rounded-full bg-green-500"></div></div> `);
  if (showCopyButton) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<button class="flex items-center gap-2 px-3 py-1 text-xs text-base-300 hover:text-white hover:bg-base-700 rounded transition-colors duration-200" aria-label="Copy code to clipboard">`);
    {
      $$renderer.push("<!--[!-->");
      $$renderer.push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> Copy`);
    }
    $$renderer.push(`<!--]--></button>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div> <pre class="p-4 overflow-x-auto text-sm text-base-100 leading-relaxed"><code${attr_class(`language-${stringify(language)}`, "svelte-1dmazsz")}>${html(code)}</code></pre></div>`);
}
export {
  CodeBlock as C
};
