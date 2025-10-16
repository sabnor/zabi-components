import { V as store_get, W as head, X as unsubscribe_stores } from "../../../chunks/index2.js";
import { L as Layout } from "../../../chunks/Layout.js";
function _page($$renderer) {
  var $$store_subs;
  let selectedCategory = store_get($$store_subs ??= {}, "$state", state)("atoms");
  store_get($$store_subs ??= {}, "$state", state)("button");
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
  store_get($$store_subs ??= {}, "$derived", derived)(components[selectedCategory] || []);
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Components - Zabi Components</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Interactive component showcase and documentation"/>`);
  });
  Layout($$renderer);
  if ($$store_subs) unsubscribe_stores($$store_subs);
}
export {
  _page as default
};
