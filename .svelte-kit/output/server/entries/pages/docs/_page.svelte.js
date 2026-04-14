import { U as head } from "../../../chunks/index2.js";
import { g as goto } from "../../../chunks/client.js";
import { a as Heading, C as CodeBlock, I as IconButton, H as Heart } from "../../../chunks/Heading.js";
import { C as Card, a as CardHeader, b as CardContent, B as Button } from "../../../chunks/CardHeader.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const quickStartCode = `import { Button, Card, CardHeader, CardContent, Input } from "zabi-components";

let name = $state("");

<Card>
  <CardHeader title="Welcome" />
  <CardContent>
    <Input 
      label="Your Name" 
      value={name} 
      oninput={(e) => name = e.target.value}
    />
    <Button onclick={() => console.log("Hello!")}>
      Say Hello
    </Button>
  </CardContent>
</Card>`;
    const installCode = `npm install zabi-components`;
    const auditFilesCode = `docs/AUDIT_RUNBOOK.md
docs/AUDIT_SCORECARD_TEMPLATE.md
docs/AUDIT_SCORECARD_2026-03-15.md
docs/DESIGN_SYSTEM_REMEDIATION_TRACKER.md`;
    const qualityChecksCode = `npm run check
npm run check:tokens
npm run build
npm run build-storybook`;
    head("1xmjmrw", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Documentation - Zabi Components</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Getting started guide and API reference for Zabi Components"/>`);
    });
    $$renderer2.push(`<div class="min-h-screen bg-background"><div class="container mx-auto p-6 max-w-4xl"><div class="mb-12 text-center"><div class="mb-4">`);
    Heading($$renderer2, { level: 1, text: "Documentation" });
    $$renderer2.push(`<!----></div> <p class="text-lg text-secondary">Build, audit, and ship accessible UI with confidence</p></div> <section class="mb-16"><div class="text-center mb-8"><div class="mb-4">`);
    Heading($$renderer2, { level: 2, text: "Quick Start" });
    $$renderer2.push(`<!----></div> <p class="text-secondary">Install and start using components right away</p></div> <div class="space-y-8">`);
    Card($$renderer2, {
      children: ($$renderer3) => {
        CardHeader($$renderer3, { title: "Installation" });
        $$renderer3.push(`<!----> `);
        CardContent($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-secondary mb-4">Install Zabi Components using npm:</p> `);
            CodeBlock($$renderer4, { code: installCode, language: "bash" });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        CardHeader($$renderer3, { title: "Basic Usage" });
        $$renderer3.push(`<!----> `);
        CardContent($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-secondary mb-4">Import and use components in your Svelte 5 app:</p> `);
            CodeBlock($$renderer4, { code: quickStartCode, language: "svelte" });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></section> <section class="mb-16"><div class="text-center mb-8"><div class="mb-4">`);
    Heading($$renderer2, { level: 2, text: "Design System Quality" });
    $$renderer2.push(`<!----></div> <p class="text-secondary">Run the audit framework and remediation workflow end-to-end</p></div> <div class="space-y-8">`);
    Card($$renderer2, {
      children: ($$renderer3) => {
        CardHeader($$renderer3, { title: "Audit Framework Files" });
        $$renderer3.push(`<!----> `);
        CardContent($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-secondary mb-4">Use these files to run repeatable audits, track issues,
                            and publish scorecards.</p> `);
            CodeBlock($$renderer4, { code: auditFilesCode, language: "bash" });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        CardHeader($$renderer3, { title: "Quality Gates" });
        $$renderer3.push(`<!----> `);
        CardContent($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-secondary mb-4">Run these checks before publishing updates to the
                            component library.</p> `);
            CodeBlock($$renderer4, { code: qualityChecksCode, language: "bash" });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        CardHeader($$renderer3, { title: "Current Status" });
        $$renderer3.push(`<!----> `);
        CardContent($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-secondary mb-4">Latest remediation cycle completed all planned phases,
                        including accessibility, token compliance, state
                        coverage, and Storybook/doc updates.</p> <div class="grid grid-cols-1 gap-3 md:grid-cols-2"><div class="rounded-lg border border-border p-3"><p class="text-sm font-medium text-text">Health Score</p> <p class="text-secondary">84 / 100</p></div> <div class="rounded-lg border border-border p-3"><p class="text-sm font-medium text-text">Validation</p> <p class="text-secondary">\`check\`, \`build\`, and Storybook build passing</p></div></div>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></section> <section class="mb-16"><div class="text-center mb-8"><div class="mb-4">`);
    Heading($$renderer2, { level: 2, text: "Why Zabi Components?" });
    $$renderer2.push(`<!----></div></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`);
    Card($$renderer2, {
      children: ($$renderer3) => {
        CardHeader($$renderer3, { title: "Svelte 5 Ready" });
        $$renderer3.push(`<!----> `);
        CardContent($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-secondary">Built with Svelte 5 runes and modern patterns</p>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        CardHeader($$renderer3, { title: "TypeScript First" });
        $$renderer3.push(`<!----> `);
        CardContent($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-secondary">Full TypeScript support with proper type definitions</p>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        CardHeader($$renderer3, { title: "Accessible" });
        $$renderer3.push(`<!----> `);
        CardContent($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-secondary">WCAG compliant with keyboard navigation and screen
                            reader support</p>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        CardHeader($$renderer3, { title: "Customizable" });
        $$renderer3.push(`<!----> `);
        CardContent($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-secondary">Easy theming with CSS custom properties</p>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        CardHeader($$renderer3, { title: "Lightweight" });
        $$renderer3.push(`<!----> `);
        CardContent($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-secondary">Tree-shakeable with minimal bundle impact</p>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        CardHeader($$renderer3, { title: "Easy to theme" });
        $$renderer3.push(`<!----> `);
        CardContent($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-secondary">Tweak colors and type with CSS variables—no need to
                            fork everything</p>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></section> <section class="mb-16"><div class="text-center mb-8"><div class="mb-4">`);
    Heading($$renderer2, { level: 2, text: "Button Variants" });
    $$renderer2.push(`<!----></div> <p class="text-secondary">Explore different button styles and variants</p></div> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        CardHeader($$renderer3, { title: "Available Variants" });
        $$renderer3.push(`<!----> `);
        CardContent($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-secondary mb-6">Zabi Components provides multiple button variants for
                    different use cases:</p> <div class="flex flex-wrap gap-4 items-center justify-center mb-6">`);
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
            $$renderer4.push(`<!----></div> `);
            CodeBlock($$renderer4, {
              code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="danger">Danger</Button>`,
              language: "svelte"
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></section> <section class="mb-16"><div class="text-center mb-8"><div class="mb-4">`);
    Heading($$renderer2, { level: 2, text: "Icon Buttons" });
    $$renderer2.push(`<!----></div> <p class="text-secondary">Use icon-only buttons for compact actions and toolbars</p></div> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        CardHeader($$renderer3, { title: "IconButton" });
        $$renderer3.push(`<!----> `);
        CardContent($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-secondary mb-6">Provide an accessible label for icon-only buttons.</p> <div class="flex flex-wrap gap-4 items-center justify-center mb-6">`);
            IconButton($$renderer4, {
              variant: "primary",
              label: "Favorite",
              children: ($$renderer5) => {
                Heart($$renderer5, {});
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            IconButton($$renderer4, {
              variant: "secondary",
              label: "Favorite",
              children: ($$renderer5) => {
                Heart($$renderer5, {});
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            IconButton($$renderer4, {
              variant: "ghost",
              label: "Favorite",
              children: ($$renderer5) => {
                Heart($$renderer5, {});
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            IconButton($$renderer4, {
              variant: "outline",
              label: "Favorite",
              children: ($$renderer5) => {
                Heart($$renderer5, {});
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----></div> `);
            CodeBlock($$renderer4, {
              code: `<IconButton label="Favorite">
  <Heart />
</IconButton>`,
              language: "svelte"
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></section> <section class="mb-16"><div class="text-center mb-8"><div class="mb-4">`);
    Heading($$renderer2, { level: 2, text: "Ready to Start?" });
    $$renderer2.push(`<!----></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6">`);
    Card($$renderer2, {
      children: ($$renderer3) => {
        CardHeader($$renderer3, { title: "Explore Components" });
        $$renderer3.push(`<!----> `);
        CardContent($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-secondary mb-4">Browse the interactive showcase: category sidebar, live demos, props tables, and a short guide on the components page.</p> `);
            Button($$renderer4, {
              onclick: () => goto(),
              variant: "primary",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->View Components`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      children: ($$renderer3) => {
        CardHeader($$renderer3, { title: "Get Support" });
        $$renderer3.push(`<!----> `);
        CardContent($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<p class="text-secondary mb-4">Check out our GitHub repository for help</p> `);
            Button($$renderer4, {
              onclick: () => goto(),
              variant: "outline",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Visit GitHub`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div></section></div> <div class="bg-base-100 border-t border-border py-8"><div class="container mx-auto px-6 text-center"><p class="text-secondary mb-2">Questions? Ask on GitHub — we're happy to help.</p> <p class="text-sm text-secondary/80">© 2026 Zabi Components. MIT License.</p></div></div></div>`);
  });
}
export {
  _page as default
};
