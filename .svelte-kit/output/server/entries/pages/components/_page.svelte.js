import { x as head, K as ensure_array_like, G as attr_class, z as stringify } from "../../../chunks/index.js";
import { N as Navigation, T as ThemeToggle, B as Button, C as Card } from "../../../chunks/Card.js";
import { B as Badge, C as ComponentDemo, I as Input, A as Alert } from "../../../chunks/Badge.js";
import { e as escape_html } from "../../../chunks/context.js";
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
      }
    ],
    organisms: []
  };
  let currentComponents = components[selectedCategory] || [];
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Components - Zabi Components</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Interactive component showcase and documentation"/>`);
  });
  $$renderer.push(`<div class="min-h-screen bg-background"><header class="flex items-center justify-between p-4 bg-surface border-b border-border"><h1 class="text-xl font-bold text-text">Zabi Components</h1> <div class="flex items-center gap-4">`);
  Navigation($$renderer, { variant: "header", items: navItems });
  $$renderer.push(`<!----> `);
  ThemeToggle($$renderer, {});
  $$renderer.push(`<!----></div></header> <main class="flex min-h-screen"><aside class="w-64 bg-surface-secondary border-r border-border p-6"><h2 class="text-lg font-semibold text-text mb-4">Components</h2> <nav class="space-y-2 mb-8"><!--[-->`);
  const each_array = ensure_array_like(categories);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let category = each_array[$$index];
    $$renderer.push(`<button${attr_class(`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${stringify(selectedCategory === category.id ? "bg-primary text-white" : "text-text-secondary hover:text-text hover:bg-surface")}`)}><div class="font-medium">${escape_html(category.label)}</div> <div class="text-xs opacity-75">${escape_html(category.description)}</div></button>`);
  }
  $$renderer.push(`<!--]--></nav> <div class="space-y-1"><!--[-->`);
  const each_array_1 = ensure_array_like(currentComponents);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let component = each_array_1[$$index_1];
    $$renderer.push(`<button${attr_class(`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${stringify(selectedComponent === component.name.toLowerCase() ? "bg-primary/10 text-primary border-l-2 border-primary" : "text-text-secondary hover:text-text hover:bg-surface")}`)}>${escape_html(component.name)}</button>`);
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
              $$renderer2.push(`<div class="flex flex-wrap gap-4 items-center">`);
              Button($$renderer2, {
                variant: "primary",
                children: ($$renderer3) => {
                  $$renderer3.push(`<!---->Primary`);
                },
                $$slots: { default: true }
              });
              $$renderer2.push(`<!----> `);
              Button($$renderer2, {
                variant: "secondary",
                children: ($$renderer3) => {
                  $$renderer3.push(`<!---->Secondary`);
                },
                $$slots: { default: true }
              });
              $$renderer2.push(`<!----> `);
              Button($$renderer2, {
                variant: "danger",
                children: ($$renderer3) => {
                  $$renderer3.push(`<!---->Danger`);
                },
                $$slots: { default: true }
              });
              $$renderer2.push(`<!----> `);
              Button($$renderer2, {
                variant: "success",
                children: ($$renderer3) => {
                  $$renderer3.push(`<!---->Success`);
                },
                $$slots: { default: true }
              });
              $$renderer2.push(`<!----> `);
              Button($$renderer2, {
                variant: "ghost",
                children: ($$renderer3) => {
                  $$renderer3.push(`<!---->Ghost`);
                },
                $$slots: { default: true }
              });
              $$renderer2.push(`<!----> `);
              Button($$renderer2, {
                variant: "brand",
                children: ($$renderer3) => {
                  $$renderer3.push(`<!---->Brand`);
                },
                $$slots: { default: true }
              });
              $$renderer2.push(`<!----></div>`);
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
                $$renderer2.push(`<!----></div>`);
              } else {
                $$renderer2.push("<!--[!-->");
                if (component.name === "Card") {
                  $$renderer2.push("<!--[-->");
                  $$renderer2.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
                  Card($$renderer2, {
                    title: "Default Card",
                    variant: "default",
                    children: ($$renderer3) => {
                      $$renderer3.push(`<p class="text-text-secondary">This is a default card with
                                                    clean styling.</p>`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer2.push(`<!----> `);
                  Card($$renderer2, {
                    title: "Success Card",
                    variant: "success",
                    children: ($$renderer3) => {
                      $$renderer3.push(`<p class="text-text-secondary">This card indicates a
                                                    successful action.</p>`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer2.push(`<!----> `);
                  Card($$renderer2, {
                    title: "Warning Card",
                    variant: "warning",
                    children: ($$renderer3) => {
                      $$renderer3.push(`<p class="text-text-secondary">This card shows a warning
                                                    state.</p>`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer2.push(`<!----> `);
                  Card($$renderer2, {
                    title: "Error Card",
                    variant: "error",
                    children: ($$renderer3) => {
                      $$renderer3.push(`<p class="text-text-secondary">This card indicates an error
                                                    state.</p>`);
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
      $$renderer.push(`<!--]--></div> <div class="mt-12"><h2 class="text-2xl font-bold text-text mb-6">Props</h2> <div class="overflow-x-auto"><table class="w-full border-collapse border border-border"><thead><tr class="bg-surface-secondary"><th class="border border-border px-4 py-2 text-left text-text font-semibold">Name</th><th class="border border-border px-4 py-2 text-left text-text font-semibold">Type</th><th class="border border-border px-4 py-2 text-left text-text font-semibold">Required</th><th class="border border-border px-4 py-2 text-left text-text font-semibold">Default</th><th class="border border-border px-4 py-2 text-left text-text font-semibold">Description</th></tr></thead><tbody><!--[-->`);
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
  $$renderer.push(`<!--]--></div></main> <footer class="bg-surface-secondary border-t border-border py-8"><div class="container mx-auto px-6"><div class="flex flex-col md:flex-row justify-between items-center gap-4"><div class="text-center md:text-left"><p class="text-text-secondary mb-2">Clean components that just work. Less is more.</p> <p class="text-sm text-text-secondary/80">© 2024 Zabi Components. MIT License.</p></div> <div class="flex gap-6"><a href="/docs" class="text-text-secondary hover:text-text transition-colors">Docs</a> <a href="/components" class="text-text-secondary hover:text-text transition-colors">Components</a> <a href="https://github.com" class="text-text-secondary hover:text-text transition-colors">GitHub</a></div></div></div></footer></div>`);
}
export {
  _page as default
};
