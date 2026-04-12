import { U as head, X as ensure_array_like } from "../../chunks/index2.js";
import { g as goto } from "../../chunks/client.js";
import { B as Badge } from "../../chunks/Badge.js";
import { B as Button, C as Card, a as CardHeader, b as CardContent } from "../../chunks/CardHeader.js";
import { e as escape_html } from "../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const features = [
      {
        title: "TypeScript throughout",
        description: "Props and events are typed so your editor can help you use each component correctly."
      },
      {
        title: "Built for accessibility",
        description: "Sensible defaults for labels, focus, and keyboard use so common patterns work for more people."
      },
      {
        title: "Made for SvelteKit",
        description: "Components render on the server and in the browser, with light and dark styles you can rely on."
      }
    ];
    const highlightedComponents = ["Button", "Input", "Card", "Navbar", "Modal", "Tabs"];
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Zabi Components | Svelte UI components</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Svelte 5 UI components with TypeScript and Tailwind: buttons, forms, navigation, and more."/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-background"><main class="container mx-auto px-4 pb-28 sm:px-6 sm:pb-32 lg:px-8 lg:pb-40"><section class="py-36 sm:py-44 lg:py-52"><div class="mx-auto text-center"><p class="mb-12 inline-flex items-center rounded-full border border-border px-6 py-2.5 text-sm text-description">Svelte 5, TypeScript, and Tailwind</p> <h1 class="mb-12 text-4xl font-bold tracking-tight text-headline sm:text-6xl">UI components for Svelte apps</h1> <p class="mx-auto mb-20 text-xl text-description sm:text-2xl">Buttons, inputs, cards, navigation, dialogs, and other pieces
                    you can drop into a SvelteKit project and adjust with Tailwind
                    classes.</p> <div class="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">`);
    Button($$renderer2, {
      variant: "primary",
      size: "lg",
      text: "Documentation",
      onclick: () => goto()
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      variant: "outline",
      size: "lg",
      text: "Browse all components",
      onclick: () => goto()
    });
    $$renderer2.push(`<!----></div></div></section> <section class="border-t border-border py-32 sm:py-40"><div class="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10"><!--[-->`);
    const each_array = ensure_array_like(features);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let feature = each_array[$$index];
      Card($$renderer2, {
        variant: "flat",
        fullWidth: true,
        children: ($$renderer3) => {
          CardHeader($$renderer3, { title: feature.title });
          $$renderer3.push(`<!----> `);
          CardContent($$renderer3, {
            children: ($$renderer4) => {
              $$renderer4.push(`<p class="text-description">${escape_html(feature.description)}</p>`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
    }
    $$renderer2.push(`<!--]--></div></section> <section class="border-t border-border py-32 sm:py-40"><div class="mx-auto flex flex-col items-center gap-14 text-center sm:gap-16"><div><h2 class="text-3xl font-semibold text-headline sm:text-4xl">A few examples</h2> <p class="mt-6 text-lg text-description sm:text-xl">Here are some of the components in the library. The
                        components page lists everything in one place.</p></div> <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-5"><!--[-->`);
    const each_array_1 = ensure_array_like(highlightedComponents);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let componentName = each_array_1[$$index_1];
      Badge($$renderer2, { variant: "neutral", text: componentName });
    }
    $$renderer2.push(`<!--]--></div> `);
    Button($$renderer2, {
      variant: "outline",
      size: "lg",
      text: "Browse all components",
      onclick: () => goto()
    });
    $$renderer2.push(`<!----></div></section></main> <footer class="border-t border-border py-16 sm:py-20"><div class="container mx-auto px-4 sm:px-6 lg:px-8"><div class="flex flex-col items-center justify-between gap-6 text-sm text-description md:flex-row"><p>© 2026 Zabi Components. Open source MIT.</p> <div class="flex items-center gap-8"><a href="/docs" class="hover:text-headline transition-colors">Docs</a> <a href="/components" class="hover:text-headline transition-colors">Components</a> <a href="https://github.com" class="hover:text-headline transition-colors">GitHub</a></div></div></div></footer></div>`);
  });
}
export {
  _page as default
};
