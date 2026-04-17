import type { ComponentMetadata } from "../../types/page.types";

export const componentsCatalog: Record<string, ComponentMetadata[]> = {
        atoms: [
            {
                name: "Button",
                category: "atoms",
                description:
                    "Clean, accessible buttons with multiple variants and sizes",
                props: [
                    {
                        name: "variant",
                        type: "string",
                        required: false,
                        defaultValue: "primary",
                        description: "Button style variant",
                    },
                    {
                        name: "size",
                        type: "string",
                        required: false,
                        defaultValue: "md",
                        description: "Button size",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Disable the button",
                    },
                    {
                        name: "type",
                        type: "string",
                        required: false,
                        defaultValue: "button",
                        description: "HTML button type",
                    },
                ],
                variants: [
                    "primary",
                    "secondary",
                    "danger",
                    "ghost",
                    "outline",
                    "link",
                ],
                examples: [
                    {
                        title: "Basic Usage",
                        description: "Simple button with default styling",
                        code: "&lt;Button&gt;Click me&lt;/Button&gt;",
                    },
                    {
                        title: "Variants",
                        description: "Different button variants",
                        code: '&lt;Button variant="primary"&gt;Primary&lt;/Button&gt;\n&lt;Button variant="secondary"&gt;Secondary&lt;/Button&gt;\n&lt;Button variant="outline"&gt;Outline&lt;/Button&gt;\n&lt;Button variant="ghost"&gt;Ghost&lt;/Button&gt;\n&lt;Button variant="link"&gt;Link&lt;/Button&gt;\n&lt;Button variant="danger"&gt;Danger&lt;/Button&gt;',
                    },
                ],
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
                        description: "Icon button style variant",
                    },
                    {
                        name: "size",
                        type: "string",
                        required: false,
                        defaultValue: "md",
                        description: "Icon button size",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Disable the icon button",
                    },
                    {
                        name: "type",
                        type: "string",
                        required: false,
                        defaultValue: "button",
                        description: "HTML button type",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Accessible label for icon-only buttons",
                    },
                ],
                variants: [
                    "primary",
                    "secondary",
                    "danger",
                    "ghost",
                    "outline",
                    "link",
                ],
                examples: [
                    {
                        title: "Basic Usage",
                        description: "Icon-only button with accessible label",
                        code: "&lt;IconButton label=&quot;Favorite&quot;&gt;\n  &lt;Heart /&gt;\n&lt;/IconButton&gt;",
                    },
                    {
                        title: "Variants",
                        description: "Different icon button variants",
                        code: '&lt;IconButton variant="primary" label="Favorite"&gt;\n  &lt;Heart /&gt;\n&lt;/IconButton&gt;\n&lt;IconButton variant="ghost" label="Favorite"&gt;\n  &lt;Heart /&gt;\n&lt;/IconButton&gt;',
                    },
                ],
            },
            {
                name: "Input",
                category: "atoms",
                description:
                    "Form inputs with labels, variants, and accessibility features",
                props: [
                    {
                        name: "value",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Input value",
                    },
                    {
                        name: "type",
                        type: "string",
                        required: false,
                        defaultValue: "text",
                        description: "Input type",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Input label",
                    },
                    {
                        name: "placeholder",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Input placeholder",
                    },
                    {
                        name: "variant",
                        type: "string",
                        required: false,
                        defaultValue: "default",
                        description: "Input variant",
                    },
                ],
                variants: ["default", "success", "warning", "error"],
                examples: [
                    {
                        title: "Basic Input",
                        description: "Simple input with label",
                        code: '&lt;Input label="Name" placeholder="Enter your name" /&gt;',
                    },
                    {
                        title: "Variants",
                        description: "Input with different variants",
                        code: `<Input variant="success" label="Email" />
<Input variant="warning" label="Password" />`,
                    },
                ],
            },
            {
                name: "Card",
                category: "atoms",
                description:
                    "Flexible card containers with semantic color variants",
                props: [
                    {
                        name: "title",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Card title",
                    },
                    {
                        name: "variant",
                        type: "string",
                        required: false,
                        defaultValue: "default",
                        description: "Card variant",
                    },
                    {
                        name: "interactive",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Make card clickable",
                    },
                ],
                variants: ["default", "success", "warning", "error", "info"],
                examples: [
                    {
                        title: "Basic Card",
                        description: "Simple card with title and content",
                        code: `<Card title="Card Title">
  <p>Card content goes here</p>
</Card>`,
                    },
                ],
            },
            {
                name: "ColorPicker",
                category: "atoms",
                description:
                    "Color picker with predefined colors and custom hex input",
                props: [
                    {
                        name: "value",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Selected color value (hex code)",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Color picker label",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Disable the color picker",
                    },
                    {
                        name: "onclick",
                        type: "function",
                        required: false,
                        defaultValue: "undefined",
                        description: "Click event handler",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Basic Color Picker",
                        description:
                            "Color picker with predefined colors and hex input",
                        code: '&lt;ColorPicker label="Choose a color" /&gt;',
                    },
                    {
                        title: "With Initial Value",
                        description: "Color picker with pre-selected color",
                        code: '&lt;ColorPicker value="#3b82f6" label="Background Color" /&gt;',
                    },
                    {
                        title: "Disabled State",
                        description: "Disabled color picker",
                        code: '&lt;ColorPicker disabled={true} label="Disabled Picker" /&gt;',
                    },
                ],
            },
            {
                name: "List",
                category: "atoms",
                description:
                    "Interactive list rows with hover states and right-arrow affordances",
                props: [
                    {
                        name: "items",
                        type: "ListItem[]",
                        required: true,
                        defaultValue: "[]",
                        description:
                            "Array of list items with label, id, and optional link metadata",
                    },
                    {
                        name: "ariaLabel",
                        type: "string",
                        required: false,
                        defaultValue: "List items",
                        description: "Accessible label for the list container",
                    },
                    {
                        name: "selectedId",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Current selected item id for active styling",
                    },
                    {
                        name: "showArrow",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description: "Toggle the right arrow icon visibility",
                    },
                    {
                        name: "onclick",
                        type: "(item, event) => void",
                        required: false,
                        defaultValue: "undefined",
                        description: "Callback fired when an item is clicked",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "List with links",
                        description:
                            "Hoverable rows with optional descriptions and right-arrow affordance",
                        code: `<List
  items={items}
  selectedId="billing"
  ariaLabel="Account navigation"
/>`,
                    },
                    {
                        title: "Arrow hidden",
                        description: "Use a cleaner list style without right-arrow icons",
                        code: `<List
  items={items}
  showArrow={false}
/>`,
                    },
                ],
            },
            {
                name: "Badge",
                category: "atoms",
                description:
                    "Small status indicators with semantic color variants",
                props: [
                    {
                        name: "text",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Badge text content",
                    },
                    {
                        name: "variant",
                        type: "string",
                        required: false,
                        defaultValue: "default",
                        description: "Badge color variant",
                    },
                    {
                        name: "size",
                        type: "string",
                        required: false,
                        defaultValue: "md",
                        description: "Badge size",
                    },
                ],
                variants: ["default", "success", "warning", "error", "info"],
                examples: [
                    {
                        title: "Basic Badge",
                        description: "Simple badge with text",
                        code: '&lt;Badge text="New" /&gt;',
                    },
                    {
                        title: "Variants",
                        description: "Different badge variants",
                        code: '&lt;Badge variant="success" text="Active" /&gt;\n&lt;Badge variant="warning" text="Pending" /&gt;\n&lt;Badge variant="error" text="Error" /&gt;',
                    },
                ],
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
                        description: "Checkbox checked state",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Checkbox label",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Disable the checkbox",
                    },
                    {
                        name: "variant",
                        type: "string",
                        required: false,
                        defaultValue: "default",
                        description: "Checkbox variant",
                    },
                ],
                variants: ["default", "success", "warning", "error"],
                examples: [
                    {
                        title: "Basic Checkbox",
                        description: "Simple checkbox with label",
                        code: '&lt;Checkbox label="Accept terms" /&gt;',
                    },
                    {
                        title: "Variants",
                        description: "Checkbox with different variants",
                        code: '&lt;Checkbox variant="success" label="Verified" checked={true} /&gt;\n&lt;Checkbox variant="warning" label="Review needed" /&gt;',
                    },
                ],
            },
            {
                name: "Select",
                category: "atoms",
                description:
                    "Select dropdown with search, scrollable options, and variants",
                props: [
                    {
                        name: "options",
                        type: "array",
                        required: true,
                        defaultValue: "[]",
                        description: "Select options",
                    },
                    {
                        name: "value",
                        type: "string | number",
                        required: false,
                        defaultValue: "",
                        description: "Selected value",
                    },
                    {
                        name: "placeholder",
                        type: "string",
                        required: false,
                        defaultValue: "Select an option",
                        description: "Placeholder text",
                    },
                    {
                        name: "searchable",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description: "Enable search input",
                    },
                    {
                        name: "searchPlaceholder",
                        type: "string",
                        required: false,
                        defaultValue: "Search options",
                        description: "Search input placeholder",
                    },
                    {
                        name: "maxMenuHeight",
                        type: "string",
                        required: false,
                        defaultValue: "60vh",
                        description: "Max height for the options list",
                    },
                ],
                variants: ["default", "success", "warning", "error"],
                examples: [
                    {
                        title: "Searchable Select",
                        description:
                            "Select with search and scrollable options list",
                        code: '&lt;Select label="Select a value" searchable={true} maxMenuHeight="50vh" options={options} /&gt;',
                    },
                ],
            },
            {
                name: "CodeBlock",
                category: "atoms",
                description:
                    "Syntax-highlighted code blocks with copy functionality",
                props: [
                    {
                        name: "code",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Code content to display",
                    },
                    {
                        name: "language",
                        type: "string",
                        required: false,
                        defaultValue: "javascript",
                        description:
                            "Programming language for syntax highlighting",
                    },
                    {
                        name: "showLineNumbers",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Show line numbers",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Basic Code Block",
                        description:
                            "Simple code block with syntax highlighting",
                        code: '&lt;CodeBlock code="console.log(\'Hello World\');" language="javascript" /&gt;',
                    },
                    {
                        title: "With Line Numbers",
                        description: "Code block with line numbers",
                        code: '&lt;CodeBlock code="function example() {\n  return \'Hello\';\n}" language="javascript" showLineNumbers={true} /&gt;',
                    },
                ],
            },
            {
                name: "FeatureCard",
                category: "atoms",
                description:
                    "Minimal, Stripe-inspired card for marketing and overview sections. Composable via snippets.",
                props: [
                    {
                        name: "title",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Feature title (kept short — one line).",
                    },
                    {
                        name: "description",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Supporting copy. Optional.",
                    },
                    {
                        name: "icon",
                        type: "Component<{ size?: number; class?: string }>",
                        required: false,
                        defaultValue: "",
                        description:
                            "Icon component rendered in the top slot. Pass a Lucide icon directly, e.g. `icon={ShieldCheck}`.",
                    },
                    {
                        name: "children",
                        type: "Snippet",
                        required: false,
                        defaultValue: "",
                        description:
                            "Optional footer content, e.g. a learn-more link or CTA.",
                    },
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Extra classes forwarded to the root element.",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Basic Feature Card",
                        description:
                            "Simple feature card with title and description",
                        code: '&lt;FeatureCard title="Fast performance" description="Lightning fast loading times." /&gt;',
                    },
                    {
                        title: "With Lucide Icon",
                        description:
                            "Pass a Lucide icon component directly via the `icon` prop",
                        code: 'import { ShieldCheck } from "@lucide/svelte";\n\n&lt;FeatureCard icon={ShieldCheck} title="Secure" description="End-to-end encryption." /&gt;',
                    },
                ],
            },
            {
                name: "Heading",
                category: "atoms",
                description:
                    "Semantic heading component with consistent styling",
                props: [
                    {
                        name: "level",
                        type: "number",
                        required: false,
                        defaultValue: "1",
                        description: "Heading level (1-6)",
                    },
                    {
                        name: "variant",
                        type: "string",
                        required: false,
                        defaultValue: "default",
                        description: "Heading variant",
                    },
                    {
                        name: "color",
                        type: "string",
                        required: false,
                        defaultValue: "inherit",
                        description: "Text color",
                    },
                ],
                variants: ["default", "display", "subtitle"],
                examples: [
                    {
                        title: "Basic Heading",
                        description: "Simple heading component",
                        code: "&lt;Heading level={1}&gt;Main Title&lt;/Heading&gt;",
                    },
                    {
                        title: "Variants",
                        description: "Different heading variants",
                        code: '&lt;Heading level={1} variant="display"&gt;Display Heading&lt;/Heading&gt;\n&lt;Heading level={2} variant="subtitle"&gt;Subtitle&lt;/Heading&gt;',
                    },
                ],
            },
            {
                name: "OptimizedImage",
                category: "atoms",
                description:
                    "Image component with lazy loading and optimization",
                props: [
                    {
                        name: "src",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Image source URL",
                    },
                    {
                        name: "alt",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Image alt text",
                    },
                    {
                        name: "width",
                        type: "number",
                        required: false,
                        defaultValue: "undefined",
                        description: "Image width",
                    },
                    {
                        name: "height",
                        type: "number",
                        required: false,
                        defaultValue: "undefined",
                        description: "Image height",
                    },
                    {
                        name: "lazy",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description: "Enable lazy loading",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Basic Image",
                        description: "Simple optimized image",
                        code: '&lt;OptimizedImage src="/image.jpg" alt="Description" /&gt;',
                    },
                    {
                        title: "With Dimensions",
                        description: "Image with specific dimensions",
                        code: '&lt;OptimizedImage src="/image.jpg" alt="Description" width={300} height={200} /&gt;',
                    },
                ],
            },
            {
                name: "Skeleton",
                category: "atoms",
                description:
                    "Neutral placeholder that mirrors the shape of content while it loads. Reach for it whenever a view depends on data fetching and the layout is predictable — it preserves the eventual structure and reduces perceived latency compared with a spinner. Compose the three variants (`text`, `circle`, `block`) to match the real UI: text lines for paragraphs and labels, circles for avatars or icon buttons, blocks for media, cards, and hero regions.",
                props: [
                    {
                        name: "variant",
                        type: "'text' | 'circle' | 'block'",
                        required: false,
                        defaultValue: "'text'",
                        description:
                            "Shape preset. `text` is a short rounded bar for lines of copy, `circle` is a square with full rounding for avatars and icon placeholders, `block` is a taller rectangle for media, cards, and hero regions.",
                    },
                    {
                        name: "width",
                        type: "string | number",
                        required: false,
                        defaultValue: "fills parent (circle: 2.5rem)",
                        description:
                            "Explicit width as a CSS length (e.g. `'50%'`, `'12rem'`) or pixel number. Omit to fill the parent, or pass a fixed Tailwind width via `class` (e.g. `w-64`).",
                    },
                    {
                        name: "height",
                        type: "string | number",
                        required: false,
                        defaultValue: "preset per variant",
                        description:
                            "Explicit height as a CSS length or pixel number. Defaults: text ≈ 0.75rem, circle matches width, block ≈ 8rem.",
                    },
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: "''",
                        description:
                            "Extra classes forwarded to the root element. Useful for fixed Tailwind widths, rounding overrides, or margins.",
                    },
                    {
                        name: "aria-label",
                        type: "string",
                        required: false,
                        defaultValue: "'Loading…'",
                        description:
                            "Label announced by assistive tech. Keep the default for generic loading, or set to something more specific (e.g. `'Loading profile'`) when the skeleton stands in for a named region.",
                    },
                ],
                variants: ["text", "circle", "block"],
                examples: [
                    {
                        title: "Text line",
                        description:
                            "Default variant. Fills the parent width and stands in for a single line of copy.",
                        code: "&lt;Skeleton /&gt;",
                    },
                    {
                        title: "Avatar",
                        description:
                            "Circle variant — a perfect square with full rounding, sized for avatars and icon buttons.",
                        code: '&lt;Skeleton variant="circle" /&gt;',
                    },
                    {
                        title: "Media block",
                        description:
                            "Block variant for images, video thumbnails, cover art, and card headers. Fills the parent by default.",
                        code: '&lt;Skeleton variant="block" /&gt;',
                    },
                    {
                        title: "Custom size",
                        description:
                            "Use the `width` / `height` props for CSS lengths or pixel values, or `class` for a fixed Tailwind utility.",
                        code: '&lt;Skeleton width="50%" /&gt;\n&lt;Skeleton width={240} height={8} /&gt;\n&lt;Skeleton variant="block" class="w-64" /&gt;',
                    },
                    {
                        title: "User row",
                        description:
                            "Classic list-row pattern: avatar beside two stacked text lines of varying length. Wrap the text column in `flex-1` so it adapts to the row width.",
                        code: '&lt;div class="flex items-center gap-3"&gt;\n  &lt;Skeleton variant="circle" /&gt;\n  &lt;div class="flex-1 space-y-2"&gt;\n    &lt;Skeleton variant="text" width="60%" /&gt;\n    &lt;Skeleton variant="text" width="40%" /&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',
                    },
                    {
                        title: "Article card",
                        description:
                            "Media block above a title and description — a drop-in placeholder for feed cards, blog previews, and product tiles.",
                        code: '&lt;article class="space-y-3"&gt;\n  &lt;Skeleton variant="block" /&gt;\n  &lt;Skeleton variant="text" width="70%" height={16} /&gt;\n  &lt;div class="space-y-2"&gt;\n    &lt;Skeleton variant="text" /&gt;\n    &lt;Skeleton variant="text" width="85%" /&gt;\n  &lt;/div&gt;\n&lt;/article&gt;',
                    },
                ],
            },
            {
                name: "Toast",
                category: "atoms",
                description:
                    "Toast atom for a single surface; use the Toaster molecule plus pushToast() for stacked app notifications with countdown and expandable detail.",
                props: [
                    {
                        name: "message",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Toast message",
                    },
                    {
                        name: "type",
                        type: "'success' | 'error' | 'warning' | 'info'",
                        required: false,
                        defaultValue: "info",
                        description: "Semantic style",
                    },
                    {
                        name: "closable",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description: "Show close button",
                    },
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Extra classes on the toast container",
                    },
                    {
                        name: "onclick",
                        type: "(event: Event) => void",
                        required: false,
                        defaultValue: "",
                        description: "Called when the toast is closed",
                    },
                    {
                        name: "layout",
                        type: "'viewport' | 'inline'",
                        required: false,
                        defaultValue: "viewport",
                        description:
                            "viewport: fixed corner toast; inline: block width up to max (for demos inside a sized parent)",
                    },
                ],
                variants: ["info", "success", "warning", "error"],
                examples: [
                    {
                        title: "Toaster (recommended)",
                        description:
                            "Mount once in the app shell; pushToast() queues notifications shown here (bottom-right).",
                        code: "import { Toaster, pushToast } from 'zabi-components';\n\npushToast({ title: 'Changes saved', message: '…', type: 'success' });\n&lt;Toaster /&gt;",
                    },
                    {
                        title: "Toast atom — inline",
                        description:
                            "Use layout=\"inline\" for docs and embedded UI; default layout=\"viewport\" pins a single toast to the corner.",
                        code: '&lt;div class="max-w-md"&gt;\n  &lt;Toast layout="inline" type="success" message="Operation completed" /&gt;\n&lt;/div&gt;',
                    },
                    {
                        title: "Semantic types",
                        description:
                            "type sets border and text: success, error, warning, or info.",
                        code: '&lt;Toast type="success" message="Success!" /&gt;\n&lt;Toast type="error" message="Error occurred" /&gt;',
                    },
                ],
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
                        description: "Tooltip content",
                    },
                    {
                        name: "position",
                        type: "string",
                        required: false,
                        defaultValue: "top",
                        description: "Tooltip position",
                    },
                    {
                        name: "trigger",
                        type: "string",
                        required: false,
                        defaultValue: "hover",
                        description: "Tooltip trigger",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Basic Tooltip",
                        description: "Simple tooltip on hover",
                        code: '&lt;Tooltip content="This is a tooltip"&gt;\n  &lt;Button&gt;Hover me&lt;/Button&gt;\n&lt;/Tooltip&gt;',
                    },
                    {
                        title: "Positions",
                        description: "Tooltip with different positions",
                        code: '&lt;Tooltip content="Top tooltip" position="top"&gt;\n  &lt;Button&gt;Top&lt;/Button&gt;\n&lt;/Tooltip&gt;',
                    },
                ],
            },
        ],
        molecules: [
            {
                name: "Alert",
                category: "molecules",
                description:
                    "Contextual alerts with different variants and optional close functionality",
                props: [
                    {
                        name: "variant",
                        type: "string",
                        required: false,
                        defaultValue: "info",
                        description: "Alert variant",
                    },
                    {
                        name: "title",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Alert title",
                    },
                    {
                        name: "message",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Alert message",
                    },
                    {
                        name: "closable",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Show close button",
                    },
                ],
                variants: ["info", "success", "warning", "error"],
                examples: [
                    {
                        title: "Basic Alert",
                        description: "Simple alert with message",
                        code: '&lt;Alert variant="info" message="This is an info alert" /&gt;',
                    },
                ],
            },
            {
                name: "ContactForm",
                category: "molecules",
                description:
                    "Complete contact form with validation and submission handling",
                props: [
                    {
                        name: "onSubmit",
                        type: "function",
                        required: false,
                        defaultValue: "undefined",
                        description: "Form submission handler",
                    },
                    {
                        name: "fields",
                        type: "array",
                        required: false,
                        defaultValue: "[]",
                        description: "Custom form fields",
                    },
                    {
                        name: "variant",
                        type: "string",
                        required: false,
                        defaultValue: "default",
                        description: "Form variant",
                    },
                ],
                variants: ["default", "minimal", "detailed"],
                examples: [
                    {
                        title: "Basic Contact Form",
                        description: "Simple contact form with standard fields",
                        code: "&lt;ContactForm /&gt;",
                    },
                    {
                        title: "With Custom Handler",
                        description:
                            "Contact form with custom submission handler",
                        code: "&lt;ContactForm onSubmit={handleSubmit} /&gt;",
                    },
                ],
            },
            {
                name: "Dropdown",
                category: "molecules",
                description:
                    "Dropdown menu with customizable options and positioning",
                props: [
                    {
                        name: "options",
                        type: "array",
                        required: true,
                        defaultValue: "[]",
                        description: "Dropdown options",
                    },
                    {
                        name: "value",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Selected value",
                    },
                    {
                        name: "placeholder",
                        type: "string",
                        required: false,
                        defaultValue: "Select an option",
                        description: "Placeholder text",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Disable the dropdown",
                    },
                ],
                variants: ["default", "searchable", "multi-select"],
                examples: [
                    {
                        title: "Basic Dropdown",
                        description: "Simple dropdown with options",
                        code: '&lt;Dropdown options={[{value: "1", label: "Option 1"}]} /&gt;',
                    },
                    {
                        title: "With Placeholder",
                        description: "Dropdown with custom placeholder",
                        code: '&lt;Dropdown placeholder="Choose..." options={options} /&gt;',
                    },
                ],
            },
            {
                name: "Form",
                category: "molecules",
                description:
                    "Flexible form component with validation and field management",
                props: [
                    {
                        name: "fields",
                        type: "array",
                        required: true,
                        defaultValue: "[]",
                        description: "Form field definitions",
                    },
                    {
                        name: "onSubmit",
                        type: "function",
                        required: false,
                        defaultValue: "undefined",
                        description: "Form submission handler",
                    },
                    {
                        name: "validation",
                        type: "object",
                        required: false,
                        defaultValue: "{}",
                        description: "Validation rules",
                    },
                ],
                variants: ["default", "inline", "wizard"],
                examples: [
                    {
                        title: "Basic Form",
                        description: "Simple form with fields",
                        code: "&lt;Form fields={formFields} onSubmit={handleSubmit} /&gt;",
                    },
                    {
                        title: "With Validation",
                        description: "Form with validation rules",
                        code: "&lt;Form fields={fields} validation={rules} /&gt;",
                    },
                ],
            },
            {
                name: "ImageUpload",
                category: "molecules",
                description:
                    "Image upload component with preview and drag-and-drop",
                props: [
                    {
                        name: "onUpload",
                        type: "function",
                        required: false,
                        defaultValue: "undefined",
                        description: "Upload handler",
                    },
                    {
                        name: "maxSize",
                        type: "number",
                        required: false,
                        defaultValue: "5242880",
                        description: "Max file size in bytes",
                    },
                    {
                        name: "acceptedTypes",
                        type: "array",
                        required: false,
                        defaultValue: "['image/*']",
                        description: "Accepted file types",
                    },
                    {
                        name: "multiple",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Allow multiple files",
                    },
                ],
                variants: ["default", "drag-drop", "preview"],
                examples: [
                    {
                        title: "Basic Upload",
                        description: "Simple image upload",
                        code: "&lt;ImageUpload onUpload={handleUpload} /&gt;",
                    },
                    {
                        title: "With Restrictions",
                        description: "Upload with size and type restrictions",
                        code: '&lt;ImageUpload maxSize={2097152} acceptedTypes={["image/jpeg", "image/png"]} /&gt;',
                    },
                ],
            },
            {
                name: "Modal",
                category: "molecules",
                description:
                    "Modal dialog with backdrop and customizable content",
                props: [
                    {
                        name: "isOpen",
                        type: "boolean",
                        required: true,
                        defaultValue: "false",
                        description: "Modal open state",
                    },
                    {
                        name: "onClose",
                        type: "function",
                        required: false,
                        defaultValue: "undefined",
                        description: "Close handler",
                    },
                    {
                        name: "title",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Modal title",
                    },
                    {
                        name: "size",
                        type: "string",
                        required: false,
                        defaultValue: "md",
                        description: "Modal size",
                    },
                ],
                variants: ["default", "large", "small", "fullscreen"],
                examples: [
                    {
                        title: "Basic Modal",
                        description: "Simple modal dialog",
                        code: "&lt;Modal isOpen={isOpen} onClose={() => isOpen = false}&gt;\n  &lt;p&gt;Modal content&lt;/p&gt;\n&lt;/Modal&gt;",
                    },
                    {
                        title: "With Title",
                        description: "Modal with title and close button",
                        code: '&lt;Modal isOpen={isOpen} title="Confirm Action" onClose={handleClose}&gt;\n  &lt;p&gt;Are you sure?&lt;/p&gt;\n&lt;/Modal&gt;',
                    },
                ],
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
                        description: "Panel open state",
                    },
                    {
                        name: "onClose",
                        type: "function",
                        required: false,
                        defaultValue: "undefined",
                        description: "Close handler",
                    },
                    {
                        name: "height",
                        type: "string",
                        required: false,
                        defaultValue: "50vh",
                        description: "Panel height",
                    },
                ],
                variants: ["default", "full", "half"],
                examples: [
                    {
                        title: "Basic SlideUp",
                        description: "Simple slide-up panel",
                        code: "&lt;SlideUp isOpen={isOpen} onClose={() => isOpen = false}&gt;\n  &lt;p&gt;Panel content&lt;/p&gt;\n&lt;/SlideUp&gt;",
                    },
                    {
                        title: "Custom Height",
                        description: "Slide-up with custom height",
                        code: '&lt;SlideUp isOpen={isOpen} height="75vh"&gt;\n  &lt;p&gt;Tall panel&lt;/p&gt;\n&lt;/SlideUp&gt;',
                    },
                ],
            },
            {
                name: "Tabs",
                category: "molecules",
                description:
                    "Tabbed interface with customizable tabs and content",
                props: [
                    {
                        name: "tabs",
                        type: "array",
                        required: true,
                        defaultValue: "[]",
                        description: "Tab definitions",
                    },
                    {
                        name: "activeTab",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Active tab ID",
                    },
                    {
                        name: "onTabChange",
                        type: "function",
                        required: false,
                        defaultValue: "undefined",
                        description: "Tab change handler",
                    },
                ],
                variants: ["default", "pills", "underline"],
                examples: [
                    {
                        title: "Basic Tabs",
                        description: "Simple tabbed interface",
                        code: '&lt;Tabs tabs={[{id: "tab1", label: "Tab 1", content: "Content 1"}]} /&gt;',
                    },
                    {
                        title: "With Handler",
                        description: "Tabs with change handler",
                        code: "&lt;Tabs tabs={tabs} onTabChange={handleTabChange} /&gt;",
                    },
                ],
            },
            {
                name: "NavigationMenu",
                category: "molecules",
                description:
                    "Navigation menu component with dropdowns, rich content, and keyboard navigation. Supports both data-driven and compound component APIs.",
                props: [
                    {
                        name: "items",
                        type: "NavigationMenuItemData[]",
                        required: false,
                        defaultValue: "[]",
                        description: "Array of menu items (data-driven API)",
                    },
                    {
                        name: "viewport",
                        type: "boolean | string",
                        required: false,
                        defaultValue: "true",
                        description:
                            "Enable viewport for mobile responsiveness",
                    },
                    {
                        name: "className",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Additional CSS classes",
                    },
                    {
                        name: "listClassName",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Additional CSS classes for the menu list",
                    },
                ],
                variants: [
                    "default",
                    "simple",
                    "with-icons",
                    "with-descriptions",
                ],
                examples: [
                    {
                        title: "Data-Driven API",
                        description: "Simple navigation menu using items prop",
                        code: '&lt;NavigationMenu items={[\n  { value: "home", label: "Home", content: [{ href: "/docs", label: "Introduction" }] },\n  { value: "docs", label: "Docs", href: "/docs" }\n]} /&gt;',
                    },
                    {
                        title: "Compound Component API",
                        description:
                            "Navigation menu using sub-components for maximum flexibility",
                        code: '&lt;NavigationMenu&gt;\n  &lt;NavigationMenuList&gt;\n    &lt;NavigationMenuItem value="home"&gt;\n      &lt;NavigationMenuTrigger value="home"&gt;Home&lt;/NavigationMenuTrigger&gt;\n      &lt;NavigationMenuContent value="home"&gt;\n        &lt;NavigationMenuLink href="/docs"&gt;Introduction&lt;/NavigationMenuLink&gt;\n      &lt;/NavigationMenuContent&gt;\n    &lt;/NavigationMenuItem&gt;\n  &lt;/NavigationMenuList&gt;\n&lt;/NavigationMenu&gt;',
                    },
                ],
            },
        ],
        organisms: [
            {
                name: "TopNavbar",
                category: "organisms",
                description:
                    "Top navigation bar with brand, optional built-in link list, theme toggle, and responsive mobile menu. Use `embedded` for a link-only strip inside a custom header.",
                props: [
                    {
                        name: "brand",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Brand text shown beside the logo area",
                    },
                    {
                        name: "brandHref",
                        type: "string",
                        required: false,
                        defaultValue: "undefined",
                        description: "When set, the brand is a link",
                    },
                    {
                        name: "items",
                        type: "TopNavbarNavItem[]",
                        required: false,
                        defaultValue: "[]",
                        description: "Built-in nav links (ignored when a `nav` snippet is provided)",
                    },
                    {
                        name: "navVariant",
                        type: '"header" | "sidebar"',
                        required: false,
                        defaultValue: '"header"',
                        description: "Layout for built-in link list",
                    },
                    {
                        name: "embedded",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Render only the link list (or `nav` snippet) inside a `nav` landmark",
                    },
                    {
                        name: "currentPath",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Active route for built-in links",
                    },
                ],
                variants: ["chrome", "embedded"],
                examples: [
                    {
                        title: "TopNavbar with inline links",
                        description: "Full bar with items prop",
                        code: '&lt;TopNavbar brand="App" brandHref="/" items={navItems} navVariant="header" currentPath="/" /&gt;',
                    },
                    {
                        title: "Embedded link list",
                        description: "Link row inside your own header layout",
                        code: '&lt;TopNavbar embedded ariaLabel="Primary" navVariant="header" items={navItems} /&gt;',
                    },
                ],
            },
            {
                name: "SidebarNavigation",
                category: "organisms",
                description:
                    "Sidebar navigation with optional Daybridge-style card layout, section labels, brand row, collapsed/expanded modes, grouped links, badges, and utility controls.",
                props: [
                    {
                        name: "mode",
                        type: '"expanded" | "collapsed"',
                        required: false,
                        defaultValue: '"expanded"',
                        description: "Sidebar display mode",
                    },
                    {
                        name: "layout",
                        type: '"rail" | "card"',
                        required: false,
                        defaultValue: '"rail"',
                        description:
                            "Rail attaches to the viewport edge; card is a rounded floating panel on a soft surface",
                    },
                    {
                        name: "items",
                        type: "SidebarNavigationItem[]",
                        required: false,
                        defaultValue: "[]",
                        description:
                            "Primary and secondary sidebar items; optional `section` groups primary rows under headings",
                    },
                    {
                        name: "currentPath",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Active route path used for selected styling",
                    },
                    {
                        name: "brandName",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Optional product name beside the logo",
                    },
                    {
                        name: "logoSrc",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Optional logo image URL",
                    },
                    {
                        name: "logoAlt",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Accessible label for the logo image",
                    },
                ],
                variants: ["expanded", "collapsed"],
                examples: [
                    {
                        title: "Searchable Input Mode",
                        description:
                            "Search input filters visible navigation items while preserving grouped structure.",
                        code: "&lt;SidebarNavigation mode=&quot;expanded&quot; searchMode=&quot;input&quot; items={sidebarNavItems} currentPath=&quot;/revenue&quot; /&gt;",
                    },
                    {
                        title: "Trigger Button Mode",
                        description:
                            "Use a search trigger button to open an adjacent picker panel.",
                        code: "&lt;SidebarNavigation mode=&quot;expanded&quot; searchMode=&quot;button&quot; onSearchClick={() =&gt; (panelOpen = true)} /&gt;",
                    },
                ],
            },
            {
                name: "SidebarPanel",
                category: "organisms",
                description:
                    "Companion panel for sidebar search-trigger flows: searchable list, selection, badges, and close control; elevated variant matches card sidebars.",
                props: [
                    {
                        name: "variant",
                        type: '"plain" | "elevated"',
                        required: false,
                        defaultValue: '"elevated"',
                        description: "Visual weight of the panel shell",
                    },
                    {
                        name: "items",
                        type: "SidebarPanelItem[]",
                        required: false,
                        defaultValue: "[]",
                        description: "Selectable panel items with optional descriptions and badges",
                    },
                    {
                        name: "searchValue",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Controlled search value for filtering panel items",
                    },
                    {
                        name: "selectedItemId",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Currently selected item id",
                    },
                ],
                variants: ["default", "empty state"],
                examples: [
                    {
                        title: "Picker panel",
                        description:
                            "Search and select from a dedicated side panel.",
                        code: "&lt;SidebarPanel items={panelItems} bind:selectedItemId bind:searchValue /&gt;",
                    },
                ],
            },
        ],
};
