import { x as attributes, F as attr_class, y as stringify, w as head } from "../../../chunks/index.js";
import { g as goto } from "../../../chunks/client.js";
import { h as html, N as Navigation, T as ThemeToggle, C as Card, B as Button } from "../../../chunks/Card.js";
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
      class: `code-block relative bg-gray-900 rounded-lg overflow-hidden ${stringify(className)}`,
      ...restProps
    },
    "svelte-1dmazsz"
  )}><div class="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700"><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-red-500"></div> <div class="w-3 h-3 rounded-full bg-yellow-500"></div> <div class="w-3 h-3 rounded-full bg-green-500"></div></div> `);
  if (showCopyButton) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<button class="flex items-center gap-2 px-3 py-1 text-xs text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200" aria-label="Copy code to clipboard">`);
    {
      $$renderer.push("<!--[!-->");
      $$renderer.push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> Copy`);
    }
    $$renderer.push(`<!--]--></button>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div> <pre class="p-4 overflow-x-auto text-sm text-gray-100 leading-relaxed"><code${attr_class(`language-${stringify(language)}`, "svelte-1dmazsz")}>${html(code)}</code></pre></div>`);
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const navItems = [
      { label: "Home", href: "/" },
      { label: "Components", href: "/components" },
      { label: "Docs", href: "/docs" },
      { label: "GitHub", href: "https://github.com" }
    ];
    const quickStartCode = `import { Button, Card, Input } from "zabi-components";

let name = $state("");

<Card title="Welcome">
  <Input 
    label="Your Name" 
    value={name} 
    oninput={(e) => name = e.target.value}
  />
  <Button onclick={() => console.log("Hello!")}>
    Say Hello
  </Button>
</Card>`;
    const installCode = `npm install zabi-components`;
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Documentation - Zabi Components</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Getting started guide and API reference for Zabi Components"/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-background"><div class="flex items-center justify-between p-4 bg-surface border-b border-border"><h1 class="text-xl font-bold text-text">Zabi Components</h1> <div class="flex items-center gap-4">`);
    Navigation($$renderer2, { variant: "header", items: navItems });
    $$renderer2.push(`<!----> `);
    ThemeToggle($$renderer2, {});
    $$renderer2.push(`<!----></div></div> <div class="container mx-auto p-6 max-w-4xl"><div class="mb-12 text-center"><h1 class="text-4xl font-bold text-text mb-4">Documentation</h1> <p class="text-lg text-text-secondary">Get started with Zabi Components in minutes</p></div> <section class="mb-16"><div class="text-center mb-8"><h2 class="text-3xl font-bold text-text mb-4">Quick Start</h2> <p class="text-text-secondary">Install and start using components right away</p></div> <div class="space-y-8">`);
    Card($$renderer2, {
      title: "Installation",
      children: ($$renderer3) => {
        $$renderer3.push(`<p class="text-text-secondary mb-4">Install Zabi Components using npm:</p> `);
        CodeBlock($$renderer3, { code: installCode, language: "bash" });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      title: "Basic Usage",
      children: ($$renderer3) => {
        $$renderer3.push(`<p class="text-text-secondary mb-4">Import and use components in your Svelte 5 app:</p> `);
        CodeBlock($$renderer3, { code: quickStartCode, language: "svelte" });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></section> <section class="mb-16"><div class="text-center mb-8"><h2 class="text-3xl font-bold text-text mb-4">Why Zabi Components?</h2></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`);
    Card($$renderer2, {
      title: "Svelte 5 Ready",
      children: ($$renderer3) => {
        $$renderer3.push(`<p class="text-text-secondary">Built with Svelte 5 runes and modern patterns</p>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      title: "TypeScript First",
      children: ($$renderer3) => {
        $$renderer3.push(`<p class="text-text-secondary">Full TypeScript support with proper type definitions</p>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      title: "Accessible",
      children: ($$renderer3) => {
        $$renderer3.push(`<p class="text-text-secondary">WCAG compliant with keyboard navigation and screen
                        reader support</p>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      title: "Customizable",
      children: ($$renderer3) => {
        $$renderer3.push(`<p class="text-text-secondary">Easy theming with CSS custom properties</p>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      title: "Lightweight",
      children: ($$renderer3) => {
        $$renderer3.push(`<p class="text-text-secondary">Tree-shakeable with minimal bundle impact</p>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      title: "Modern",
      children: ($$renderer3) => {
        $$renderer3.push(`<p class="text-text-secondary">Clean, minimal design that just works</p>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></section> <section class="mb-16"><div class="text-center mb-8"><h2 class="text-3xl font-bold text-text mb-4">Ready to Start?</h2></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6">`);
    Card($$renderer2, {
      title: "Explore Components",
      children: ($$renderer3) => {
        $$renderer3.push(`<p class="text-text-secondary mb-4">Browse our interactive component showcase</p> `);
        Button($$renderer3, {
          onclick: () => goto(),
          variant: "primary",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->View Components`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      title: "Get Support",
      children: ($$renderer3) => {
        $$renderer3.push(`<p class="text-text-secondary mb-4">Check out our GitHub repository for help</p> `);
        Button($$renderer3, {
          onclick: () => goto(),
          variant: "secondary",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Visit GitHub`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></section></div> <div class="bg-surface-secondary border-t border-border py-8"><div class="container mx-auto px-6 text-center"><p class="text-text-secondary mb-2">Clean components that just work. Less is more.</p> <p class="text-sm text-text-secondary/80">© 2024 Zabi Components. MIT License.</p></div></div></div>`);
  });
}
export {
  _page as default
};
