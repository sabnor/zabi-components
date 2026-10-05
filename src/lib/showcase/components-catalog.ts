import type { ComponentMetadata } from "../../types/page.types";

export const componentsCatalog: Record<string, ComponentMetadata[]> = {
        atoms: [
            {
                name: "Button",
                category: "atoms",
                description:
                    "Six variants from primary to link, three sizes, with loading and disabled states.",
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
                        description:
                            "sm, md or lg: 32, 40 or 48px tall. On a touch screen sm and md are 44px tall, so a row of controls still lines up. Use lg for the main action on a phone.",
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
                description:
                    "Icon-only button for compact actions and toolbars.",
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
                        description:
                            "Icon button size: xs (24px), sm (32px), md (40px) or lg (48px). On a touch screen sm and md are 44 by 44px. xs stays 24px on every pointer: it is for dense pointer-first layouts, so use sm or larger where the primary input is touch",
                    },
                    {
                        name: "tone",
                        type: "string",
                        required: false,
                        defaultValue: "default",
                        description:
                            "Colour intent for the ghost and outline variants: default or danger (quiet destructive action)",
                    },
                    {
                        name: "pressed",
                        type: "boolean",
                        required: false,
                        description:
                            "Makes a toggle button: when set it renders aria-pressed and an active style, and a click flips it (bindable). Passed one-way, call preventDefault() in onclick when the parent updates later or may refuse the change. Leave undefined for a plain button",
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
                    {
                        title: "Toolbar toggle",
                        description:
                            "A pressed state announced through aria-pressed",
                        code: '&lt;IconButton variant="ghost" size="sm" label="Bold" bind:pressed={bold}&gt;\n  &lt;Bold size={16} /&gt;\n&lt;/IconButton&gt;',
                    },
                    {
                        title: "Inline delete",
                        description:
                            "A ghost danger button at the xs size for a dense card header",
                        code: '&lt;IconButton variant="ghost" tone="danger" size="xs" label="Delete"&gt;\n  &lt;Trash2 size={14} /&gt;\n&lt;/IconButton&gt;',
                    },
                ],
            },
            {
                name: "Input",
                category: "atoms",
                description:
                    "Text input whose label, hint and error message are wired to the control for screen readers.",
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
                    {
                        name: "size",
                        type: "'sm' | 'md' | 'lg'",
                        required: false,
                        defaultValue: "md",
                        description:
                            "32, 40 or 48px tall, as Button and Select. On a touch screen sm and md are 44px tall, so a row of controls still lines up.",
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
                    "Container with four surface treatments, a padding step, and an optional clickable mode.",
                props: [
                    {
                        name: "variant",
                        type: "CardVariant",
                        required: false,
                        defaultValue: "default",
                        description:
                            "Surface treatment: default, elevated, outlined or flat.",
                    },
                    {
                        name: "size",
                        type: "SizeVariant",
                        required: false,
                        defaultValue: "md",
                        description:
                            "Padding step. The corner radius does not change with it.",
                    },
                    {
                        name: "fullWidth",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description:
                            "Fill the container's width.",
                    },
                    {
                        name: "onclick",
                        type: "(event: MouseEvent) => void",
                        required: false,
                        description:
                            "Makes the card clickable. Pair it with ariaLabel.",
                    },
                    {
                        name: "ariaLabel",
                        type: "string",
                        required: false,
                        description:
                            "Accessible name. Required when onclick is set.",
                    },
                ],
                variants: [
                    "default",
                    "elevated",
                    "outlined",
                    "flat",
                ],
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
                    "Saturation canvas with a hue slider and a hex field.",
                props: [
                    {
                        name: "value",
                        type: "string",
                        required: false,
                        description:
                            "Hex value. Bindable.",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        description:
                            "Field label.",
                    },
                    {
                        name: "placeholder",
                        type: "string",
                        required: false,
                        defaultValue: "#000000",
                        description:
                            "Placeholder for the hex input.",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Disable the field.",
                    },
                    {
                        name: "onchange",
                        type: "(event: Event) => void",
                        required: false,
                        description:
                            "Runs when the value changes.",
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
                    "Semantic ul built from an items array, with optional icon, avatar, description, href and selection. Use ListItem with a trailing snippet for badges.",
                props: [
                    {
                        name: "items",
                        type: "ListItem[]",
                        required: true,
                        defaultValue: "[]",
                        description:
                            "Array of ListItemData: id, label, optional description, href, icon, avatar, avatarAlt, disabled, link target / rel",
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
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description:
                            "Additional Tailwind classes on the <ul> (e.g. border, padding, background)",
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
                        title: "List with links and selection",
                        description:
                            "Pass selectedId to highlight the active row (e.g. current settings section)",
                        code: `<List
  items={items}
  selectedId="billing"
  ariaLabel="Account navigation"
/>`,
                    },
                    {
                        title: "Icons on items",
                        description:
                            "Optional icon per ListItemData entry (Lucide or compatible component)",
                        code: `<script lang="ts">
  import { User, CreditCard } from "@lucide/svelte";
  const items = [
    { id: "profile", label: "Profile", icon: User, href: "/profile" },
    { id: "billing", label: "Billing", icon: CreditCard, href: "/billing" },
  ];
</script>

<List items={items} ariaLabel="Account" />`,
                    },
                    {
                        title: "Arrow hidden",
                        description:
                            "Set showArrow={false} for compact rows without a chevron",
                        code: `<List
  items={items}
  showArrow={false}
  ariaLabel="Options"
/>`,
                    },
                ],
            },
            {
                name: "Badge",
                category: "atoms",
                description:
                    "Small status label in the semantic tones, plus neutral and energetic.",
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
                description:
                    "Checkbox input with label, focus ring, and controlled/uncontrolled checked state.",
                props: [
                    {
                        name: "id",
                        type: "string",
                        required: false,
                        defaultValue: "generated",
                        description: "Stable id; generated when omitted",
                    },
                    {
                        name: "checked",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Controlled checked state (supports bind:checked)",
                    },
                    {
                        name: "defaultChecked",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Initial checked state for uncontrolled usage",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Checkbox label",
                    },
                    {
                        name: "name",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Input name submitted with forms",
                    },
                    {
                        name: "value",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Input value submitted with forms",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Disable the checkbox",
                    },
                    {
                        name: "loading",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Shows a spinner in place of the tick and disables interaction while true",
                    },
                    {
                        name: "onChange",
                        type: "(event: Event) => void",
                        required: false,
                        defaultValue: "undefined",
                        description: "Change handler (alias: onchange)",
                    },
                    {
                        name: "onchange",
                        type: "(event: Event) => void",
                        required: false,
                        defaultValue: "undefined",
                        description: "Alias for onChange",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Basic Checkbox",
                        description: "Simple checkbox with label",
                        code: '&lt;Checkbox label="Accept terms" /&gt;',
                    },
                    {
                        title: "Loading state",
                        description: "Disable and show a spinner while submitting.",
                        code: '&lt;Checkbox loading label="Saving…" checked={true} /&gt;',
                    },
                ],
            },
            {
                name: "Radio",
                category: "atoms",
                description:
                    "Single radio input with label, focus ring, and controlled or uncontrolled checked state.",
                props: [
                    {
                        name: "id",
                        type: "string",
                        required: false,
                        defaultValue: "generated",
                        description: "Stable id; generated when omitted",
                    },
                    {
                        name: "name",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Radio group name (native HTML grouping)",
                    },
                    {
                        name: "value",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Radio value submitted with forms",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Visible label text",
                    },
                    {
                        name: "checked",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Controlled checked state (supports bind:checked)",
                    },
                    {
                        name: "defaultChecked",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Initial checked state for uncontrolled usage",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Disable the radio",
                    },
                    {
                        name: "onChange",
                        type: "(event: Event) => void",
                        required: false,
                        defaultValue: "undefined",
                        description: "Change handler (alias: onchange)",
                    },
                    {
                        name: "onchange",
                        type: "(event: Event) => void",
                        required: false,
                        defaultValue: "undefined",
                        description: "Alias for onChange",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Basic Radio",
                        description: "Simple radio with label",
                        code: '&lt;Radio name="plan" value="basic" label="Basic" /&gt;',
                    },
                    {
                        title: "Controlled",
                        description: "Bind checked state from parent",
                        code: '&lt;Radio name="plan" value="pro" label="Pro" bind:checked /&gt;',
                    },
                ],
            },
            {
                name: "Select",
                category: "atoms",
                description:
                    "Dropdown with type-ahead search, scrollable options and validation states.",
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
                        name: "size",
                        type: "'sm' | 'md' | 'lg'",
                        required: false,
                        defaultValue: "md",
                        description:
                            "Height of the trigger: 32, 40 or 48px, as Button and Input. On a touch screen sm and md are 44px tall, so a row of controls still lines up. The options are 44px rows there too.",
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
                name: "Slider",
                category: "atoms",
                description:
                    "Native range input in the library's colours, with a label, an optional formatted value, helper text and three sizes.",
                props: [
                    {
                        name: "value",
                        type: "number",
                        required: false,
                        description:
                            "Current value. Bindable. Starts at min when not given.",
                    },
                    {
                        name: "min",
                        type: "number",
                        required: false,
                        defaultValue: "0",
                        description:
                            "Lowest value.",
                    },
                    {
                        name: "max",
                        type: "number",
                        required: false,
                        defaultValue: "100",
                        description:
                            "Highest value.",
                    },
                    {
                        name: "step",
                        type: "number",
                        required: false,
                        defaultValue: "1",
                        description:
                            "Distance between values.",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Visible label, associated with the input.",
                    },
                    {
                        name: "hideLabel",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Leaves the label out when FormField supplies it.",
                    },
                    {
                        name: "showValue",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Shows the current value beside the label.",
                    },
                    {
                        name: "formatValue",
                        type: "(value: number) => string",
                        required: false,
                        description:
                            "Turns the value into text with a unit. Used for the shown value and read by assistive technology.",
                    },
                    {
                        name: "size",
                        type: "'sm' | 'md' | 'lg'",
                        required: false,
                        defaultValue: "md",
                        description:
                            "Height of the row, on the scale Input and Button use. The thumb takes a touch across 44px at every size.",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Disables the input.",
                    },
                    {
                        name: "message",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Helper or error text below the slider.",
                    },
                    {
                        name: "variant",
                        type: "'default' | 'success' | 'warning' | 'error' | 'info'",
                        required: false,
                        defaultValue: "default",
                        description:
                            "Colours the message; error also marks the input invalid.",
                    },
                    {
                        name: "name",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Name the value is submitted under in a form.",
                    },
                    {
                        name: "id",
                        type: "string",
                        required: false,
                        description:
                            "Id of the input; generated when omitted.",
                    },
                    {
                        name: "oninput",
                        type: "(event: Event) => void",
                        required: false,
                        description:
                            "Native input event: fires while the thumb moves.",
                    },
                    {
                        name: "onchange",
                        type: "(event: Event) => void",
                        required: false,
                        description:
                            "Native change event: fires when the thumb is released.",
                    },
                ],
                variants: [
                    "sm",
                    "md",
                    "lg",
                    "disabled",
                    "error",
                ],
                examples: [
                    {
                        title: "Basic slider",
                        description: "A labelled slider from 0 to 100 bound to a number",
                        code: '<Slider label="Volume" bind:value={volume} />',
                    },
                    {
                        title: "With a shown value and a unit",
                        description:
                            "formatValue adds the unit for the display and for screen readers",
                        code: `<Slider
    label="Image quality"
    bind:value={quality}
    min={10}
    max={100}
    step={10}
    showValue
    formatValue={(value) => \`\${value} %\`}
    message="Lower quality makes smaller files."
/>`,
                    },
                    {
                        title: "Sizes",
                        description: "Rows of 32, 40 and 48px, as Input and Button",
                        code: `<Slider label="Small" size="sm" bind:value={small} showValue />
<Slider label="Medium" bind:value={medium} showValue />
<Slider label="Large" size="lg" bind:value={large} showValue />`,
                    },
                    {
                        title: "Disabled and error",
                        description: "A disabled slider, and one whose message turns into an error",
                        code: `<Slider label="Locked by your plan" value={30} showValue disabled />
<Slider
    label="Zoom"
    bind:value={zoom}
    min={1}
    max={10}
    showValue
    variant={zoom > 6 ? "error" : "default"}
    message={zoom > 6 ? "Above 6x the image is too blurred to print." : "Up to 6x prints sharply."}
/>`,
                    },
                ],
            },
            {
                name: "Rating",
                category: "atoms",
                description:
                    "Star rating from 1 to 5 that can be left empty, with a read-only mode that shows averages with half stars.",
                props: [
                    {
                        name: "value",
                        type: "number | null",
                        required: false,
                        defaultValue: "null",
                        description:
                            "Stars given, or null for no rating. Bindable.",
                    },
                    {
                        name: "max",
                        type: "number",
                        required: false,
                        defaultValue: "5",
                        description:
                            "Number of stars.",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Names the rating. Shown above the stars unless hideLabel is set.",
                    },
                    {
                        name: "hideLabel",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Keeps the label as the accessible name only.",
                    },
                    {
                        name: "size",
                        type: "'sm' | 'md' | 'lg'",
                        required: false,
                        defaultValue: "md",
                        description:
                            "Size of a star. An interactive star is a 44px target at every size. The empty star's outline is drawn in --color-control-border, 3:1 or better on every surface level in light and dark.",
                    },
                    {
                        name: "readonly",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Shows a score as one image with one name; a star can be partly filled. A read-only rating has no inputs, so it submits nothing, even with name.",
                    },
                    {
                        name: "clearable",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Adds a clear button beside the stars, because pressing the selected star again never clears; Delete or Backspace clears too. Without it a rating can be changed but not removed.",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Disables every star and the clear button.",
                    },
                    {
                        name: "name",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Name the value is submitted under in a form. Nothing is submitted without a rating, or when readonly.",
                    },
                    {
                        name: "showValue",
                        type: "boolean",
                        required: false,
                        description:
                            "Shows the number beside the stars. On by default when readonly.",
                    },
                    {
                        name: "formatValue",
                        type: "(value: number) => string",
                        required: false,
                        description:
                            "Turns the value into text for a locale. At most one decimal by default.",
                    },
                    {
                        name: "strings",
                        type: "Partial<RatingStrings>",
                        required: false,
                        description:
                            "Overrides for the built-in strings: starLabel, clearLabel and noRating.",
                    },
                    {
                        name: "aria-label",
                        type: "string",
                        required: false,
                        description:
                            "Names the rating when there is no label.",
                    },
                    {
                        name: "aria-labelledby",
                        type: "string",
                        required: false,
                        description:
                            "Id of the element that names the rating, when there is no label.",
                    },
                    {
                        name: "onchange",
                        type: "(value: number | null) => void",
                        required: false,
                        description:
                            "Called when the user changes the rating; null when it was cleared.",
                    },
                ],
                variants: [
                    "sm",
                    "md",
                    "lg",
                    "readonly",
                    "clearable",
                    "disabled",
                ],
                examples: [
                    {
                        title: "Basic rating",
                        description:
                            "Starts empty; a tap or the arrow keys give a rating. Place it on a page, card or inset surface",
                        code: `<Rating label="Quiz" bind:value={quiz} name="quiz" />`,
                    },
                    {
                        title: "Clearable",
                        description:
                            "A repeat press on the selected star never clears, so clearable adds a clear button beside the stars",
                        code: `<Rating label="Food" bind:value={food} clearable />`,
                    },
                    {
                        title: "Read-only",
                        description:
                            "Half stars and the number beside them, formatted for a locale, and a score that is missing; a read-only rating submits nothing",
                        code: `<Rating label="Pub score" value={3.5} readonly />
<Rating
    label="Snitt"
    value={4.3}
    readonly
    formatValue={(value) => value.toFixed(1).replace(".", ",")}
    strings={{ starLabel: (value, max) => \`\${value} av \${max} stjärnor\` }}
/>
<Rating label="Not rated yet" value={null} readonly />`,
                    },
                    {
                        title: "Sizes",
                        description:
                            "Stars of 20, 24 and 32px; the tap target stays at 44px or more",
                        code: `<Rating label="Small" size="sm" bind:value={small} />
<Rating label="Medium" bind:value={medium} />
<Rating label="Large" size="lg" bind:value={large} />`,
                    },
                    {
                        title: "Translated",
                        description:
                            "A disabled rating, and one with Swedish names for the stars and the clear button",
                        code: `<Rating label="Locked" value={3} disabled />
<Rating
    label="Stämning"
    bind:value={mood}
    clearable
    strings={{
        starLabel: (value, max) => \`\${value} av \${max} stjärnor\`,
        clearLabel: "Rensa betyg",
    }}
/>`,
                    },
                ],
            },
            {
                name: "CodeBlock",
                category: "atoms",
                description:
                    "Syntax-highlighted code block with a copy button.",
                props: [
                    {
                        name: "code",
                        type: "string",
                        required: true,
                        description:
                            "Source to display.",
                    },
                    {
                        name: "language",
                        type: "string",
                        required: false,
                        defaultValue: "svelte",
                        description:
                            "Language label for the header.",
                    },
                    {
                        name: "showCopyButton",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description:
                            "Show the copy button.",
                    },
                    {
                        name: "trustHtml",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Render the code as HTML. Only for trusted, sanitised input.",
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
                    {
                        title: "Pre-highlighted HTML",
                        description:
                            "Pass trustHtml when code contains markup from your highlighter",
                        code: '&lt;CodeBlock trustHtml code={highlightedHtml} language="typescript" /&gt;',
                    },
                ],
            },
            {
                name: "FeatureCard",
                category: "atoms",
                description:
                    "Card for marketing and overview sections, composed from snippets.",
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
                            "Icon component rendered in the top slot. Pass a Lucide icon directly, e.g. icon={ShieldCheck}.",
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
                            "Pass a Lucide icon component directly via the icon prop",
                        code: 'import { ShieldCheck } from "@lucide/svelte";\n\n&lt;FeatureCard icon={ShieldCheck} title="Secure" description="End-to-end encryption." /&gt;',
                    },
                ],
            },
            {
                name: "Heading",
                category: "atoms",
                description:
                    "Renders h1-h6, with an optional visual size that differs from the semantic level.",
                props: [
                    {
                        name: "level",
                        type: "1 | 2 | 3 | 4 | 5 | 6",
                        required: false,
                        defaultValue: "1",
                        description:
                            "Semantic heading level, and the default visual size.",
                    },
                    {
                        name: "size",
                        type: "1 | 2 | 3 | 4 | 5 | 6",
                        required: false,
                        description:
                            "Visual size, when it should differ from the level.",
                    },
                    {
                        name: "text",
                        type: "string",
                        required: false,
                        description:
                            "Heading text. Ignored when children are provided.",
                    },
                ],

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
                    "Image with explicit width and height that always loads lazily.",
                props: [
                    {
                        name: "src",
                        type: "string",
                        required: true,
                        description:
                            "Image source.",
                    },
                    {
                        name: "alt",
                        type: "string",
                        required: false,
                        description:
                            "Alternative text.",
                    },
                    {
                        name: "width",
                        type: "number | string",
                        required: false,
                        defaultValue: "100%",
                        description:
                            "Rendered width.",
                    },
                    {
                        name: "height",
                        type: "number | string",
                        required: false,
                        defaultValue: "auto",
                        description:
                            "Rendered height.",
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
                    "Placeholder in the shape of the content it replaces: text lines, circles and blocks. Use it where the layout is predictable, in place of a spinner.",
                props: [
                    {
                        name: "variant",
                        type: "'text' | 'circle' | 'block'",
                        required: false,
                        defaultValue: "'text'",
                        description:
                            "Shape preset. text is a short rounded bar for lines of copy, circle is a square with full rounding for avatars and icon placeholders, block is a taller rectangle for media, cards, and hero regions.",
                    },
                    {
                        name: "width",
                        type: "string | number",
                        required: false,
                        defaultValue: "fills parent (circle: 2.5rem)",
                        description:
                            "Explicit width as a CSS length (e.g. '50%', '12rem') or pixel number. Omit to fill the parent, or pass a fixed Tailwind width via class (e.g. w-64).",
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
                            "Label announced by assistive tech. Keep the default for generic loading, or set to something more specific (e.g. 'Loading profile') when the skeleton stands in for a named region.",
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
                            "Use the width / height props for CSS lengths or pixel values, or class for a fixed Tailwind utility.",
                        code: '&lt;Skeleton width="50%" /&gt;\n&lt;Skeleton width={240} height={8} /&gt;\n&lt;Skeleton variant="block" class="w-64" /&gt;',
                    },
                    {
                        title: "User row",
                        description:
                            "Classic list-row pattern: avatar beside two stacked text lines of varying length. Wrap the text column in flex-1 so it adapts to the row width.",
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
                        code: '&lt;div class="max-w-lg"&gt;\n  &lt;Toast layout="inline" type="success" message="Operation completed" /&gt;\n&lt;/div&gt;',
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
                description:
                    "Tooltip on hover, focus or tap, on any of four sides and kept on screen. A hint only: on touch it is easy to miss, so never essential information.",
                props: [
                    {
                        name: "content",
                        type: "string",
                        required: false,
                        description:
                            "Tooltip text.",
                    },
                    {
                        name: "placement",
                        type: "'top' | 'bottom' | 'left' | 'right'",
                        required: false,
                        defaultValue: "top",
                        description:
                            "Side the bubble appears on.",
                    },
                    {
                        name: "delay",
                        type: "number",
                        required: false,
                        defaultValue: "0",
                        description:
                            "Milliseconds before it opens.",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Suppress the tooltip.",
                    },
                    {
                        name: "block",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Lay the trigger out as a block instead of an inline-block.",
                    },
                    {
                        name: "fixed",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Position against the viewport, to escape a scrolling ancestor.",
                    },
                    {
                        name: "touchDuration",
                        type: "number",
                        required: false,
                        defaultValue: "2500",
                        description:
                            "On a touch screen a tap on the trigger opens the tooltip and the trigger still acts. Milliseconds it then stays; a second tap, a tap elsewhere, Escape or scrolling closes it sooner. 0 keeps it open until then, for a trigger that does nothing else, such as an info icon. A mouse and a keyboard are not affected.",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Basic Tooltip",
                        description:
                            "Shown on hover, on keyboard focus and, on a touch screen, on a tap: the button still acts, and the tooltip goes again after a moment. It opens on another side or moves along its side when it would leave the screen. Say anything the user must know in the page itself",
                        code: '&lt;Tooltip content="This is a tooltip"&gt;\n  &lt;Button&gt;Hover me&lt;/Button&gt;\n&lt;/Tooltip&gt;',
                    },
                    {
                        title: "Positions",
                        description: "Tooltip with different positions",
                        code: '&lt;Tooltip content="Top tooltip" placement="top"&gt;\n  &lt;Button&gt;Top&lt;/Button&gt;\n&lt;/Tooltip&gt;',
                    },
                ],
            },
            {
                name: "Table",
                category: "atoms",
                description:
                    "Scrollable table shell with an optional caption; pass thead and tbody as children. Can stack rows on small screens.",
                props: [
                    {
                        name: "caption",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Table caption, and its accessible name",
                    },
                    {
                        name: "captionHidden",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Hide the caption from view; it still names the table for screen readers",
                    },
                    {
                        name: "stacked",
                        type: 'boolean | "sm" | "md" | "lg"',
                        required: false,
                        defaultValue: "false",
                        description:
                            "Lay each row out as label and value pairs instead of scrolling sideways: always (true) or below a breakpoint. Each cell's label is its data-label attribute; a cell without one shows its content on the value side with no label, and an empty cell takes no room",
                    },
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Extra classes on the wrapper",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Basic table",
                        description: "Caption plus header and body rows",
                        code: `<Table caption="Team">
  <thead>…</thead>
  <tbody>…</tbody>
</Table>`,
                    },
                    {
                        title: "Stacked on small screens",
                        description:
                            "Below 640px each row is a block of pairs; data-label supplies the label",
                        code: `<Table caption="Team" stacked="sm">
  <thead>
    <tr><th>Name</th><th>Role</th></tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Name">Ada</td>
      <td data-label="Role">Admin</td>
    </tr>
  </tbody>
</Table>`,
                    },
                ],
            },
            {
                name: "Toggle",
                category: "atoms",
                description:
                    "Accessible switch-style toggle with optional label and loading state.",
                props: [
                    {
                        name: "checked",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Controlled state (bind:checked)",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Visible label",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Disable interaction",
                    },
                    {
                        name: "loading",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Show loading state",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Basic toggle",
                        description: "Label and bindable checked state",
                        code: '<Toggle label="Notifications" bind:checked />',
                    },
                ],
            },
            {
                name: "Textarea",
                category: "atoms",
                description:
                    "Multi-line field with label, semantic variants, and validation message slot.",
                props: [
                    {
                        name: "value",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Value (bind:value)",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Field label",
                    },
                    {
                        name: "variant",
                        type: "string",
                        required: false,
                        defaultValue: "default",
                        description: "default | success | warning | error",
                    },
                    {
                        name: "rows",
                        type: "number",
                        required: false,
                        defaultValue: "4",
                        description: "Visible rows",
                    },
                ],
                variants: ["default", "success", "warning", "error"],
                examples: [
                    {
                        title: "Basic textarea",
                        description: "Label and placeholder",
                        code: '<Textarea label="Notes" placeholder="…" />',
                    },
                ],
            },
            {
                name: "Progress",
                category: "atoms",
                description:
                    "Determinate progress bar with optional label and percentage readout.",
                props: [
                    {
                        name: "value",
                        type: "number",
                        required: false,
                        defaultValue: "0",
                        description: "Current value",
                    },
                    {
                        name: "max",
                        type: "number",
                        required: false,
                        defaultValue: "100",
                        description: "Maximum value",
                    },
                    {
                        name: "size",
                        type: "'sm' | 'md' | 'lg'",
                        required: false,
                        defaultValue: "md",
                        description: "Bar height",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Optional label",
                    },
                ],
                variants: ["sm", "md", "lg"],
                examples: [
                    {
                        title: "Progress",
                        description: "Value relative to max",
                        code: '<Progress value={40} max={100} label="Upload" />',
                    },
                ],
            },
            {
                name: "CardHeader",
                category: "atoms",
                description:
                    "Card header with title, subtitle, description, and optional snippet content.",
                props: [
                    {
                        name: "title",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Heading text",
                    },
                    {
                        name: "subtitle",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Subtitle line",
                    },
                    {
                        name: "level",
                        type: "1 | … | 6",
                        required: false,
                        defaultValue: "3",
                        description: "Heading level for title",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Card header",
                        description: "Use inside Card",
                        code: '<CardHeader title="Billing" subtitle="Manage payment methods" />',
                    },
                ],
            },
            {
                name: "CardContent",
                category: "atoms",
                description: "Card body region; optional hero image above children.",
                props: [
                    {
                        name: "image",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Optional image URL",
                    },
                    {
                        name: "imageAlt",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Alt text for image",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Card content",
                        description: "Wrap main card content",
                        code: "<CardContent>…</CardContent>",
                    },
                ],
            },
            {
                name: "CardFooter",
                category: "atoms",
                description: "Footer actions or metadata inside a Card.",
                props: [
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Extra classes, merged last so they win",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Card footer",
                        description: "Place actions at the bottom of a card",
                        code: "<CardFooter>…</CardFooter>",
                    },
                ],
            },
            {
                name: "ThemeToggle",
                category: "atoms",
                description:
                    "Sun and moon control that syncs the dark class on the document element with storage.",
                props: [
                    {
                        name: "size",
                        type: "'sm' | 'md' | 'lg'",
                        required: false,
                        defaultValue: "md",
                        description: "Control size",
                    },
                    {
                        name: "variant",
                        type: "'default' | 'ghost' | 'outline'",
                        required: false,
                        defaultValue: "default",
                        description: "Visual style",
                    },
                ],
                variants: ["default", "ghost", "outline"],
                examples: [
                    {
                        title: "Theme toggle",
                        description: "Toggles light/dark theme",
                        code: "<ThemeToggle />",
                    },
                ],
            },
            {
                name: "Divider",
                category: "atoms",
                description:
                    "Horizontal or vertical separator; optional inset and label.",
                props: [
                    {
                        name: "orientation",
                        type: "'horizontal' | 'vertical'",
                        required: false,
                        defaultValue: "horizontal",
                        description: "Layout axis",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        defaultValue: "undefined",
                        description: "Centered text between lines",
                    },
                    {
                        name: "decorative",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description: "When true, omit separator role",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Divider",
                        description: "Separate sections",
                        code: '<Divider label="Or" />',
                    },
                ],
            },
            {
                name: "Container",
                category: "atoms",
                description:
                    "Centered max-width wrapper with optional horizontal padding.",
                props: [
                    {
                        name: "as",
                        type: "'div' | 'section' | 'main' | 'article'",
                        required: false,
                        defaultValue: "div",
                        description: "Root element",
                    },
                    {
                        name: "maxWidth",
                        type: "string",
                        required: false,
                        defaultValue: "xl",
                        description: "sm | md | lg | xl | 2xl | full",
                    },
                    {
                        name: "padded",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description: "Apply horizontal padding",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Container",
                        description: "Page-level width constraint",
                        code: '<Container maxWidth="lg">…</Container>',
                    },
                ],
            },
            {
                name: "Text",
                category: "atoms",
                description:
                    "Typography primitive with tone and size tokens, rendered as p, span or div.",
                props: [
                    {
                        name: "as",
                        type: "'p' | 'span' | 'div'",
                        required: false,
                        defaultValue: "p",
                        description: "Element tag",
                    },
                    {
                        name: "tone",
                        type: "string",
                        required: false,
                        defaultValue: "body",
                        description: "body | description | caption | headline | label | error",
                    },
                    {
                        name: "size",
                        type: "'xs' | 'sm' | 'md' | 'lg'",
                        required: false,
                        defaultValue: "md",
                        description:
                            "Text size — the bottom of the scale Heading sits on (md matches h6, lg matches h5)",
                    },
                    {
                        name: "weight",
                        type: "'normal' | 'medium' | 'semibold' | 'bold'",
                        required: false,
                        defaultValue: "normal (medium for tone=\"label\")",
                        description: "Font weight; overrides the weight the tone implies",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Text",
                        description: "Semantic body copy",
                        code: '<Text tone="description">Supporting copy.</Text>',
                    },
                ],
            },
            {
                name: "ActionPanel",
                category: "atoms",
                description:
                    "Clickable or link card for primary actions with optional badge.",
                props: [
                    {
                        name: "title",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Panel title",
                    },
                    {
                        name: "description",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Supporting text",
                    },
                    {
                        name: "href",
                        type: "string",
                        required: false,
                        defaultValue: "undefined",
                        description: "When set, renders as a link",
                    },
                    {
                        name: "badgeText",
                        type: "string",
                        required: false,
                        defaultValue: "undefined",
                        description: "Optional badge",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Action panel",
                        description: "Marketing or settings shortcut",
                        code: '<ActionPanel title="API keys" description="Create and rotate keys." href="/keys" />',
                    },
                ],
            },
            {
                name: "Spinner",
                category: "atoms",
                description:
                    "Loading ring in the text colour, decorative by default and announced as a status when given a label.",
                props: [
                    {
                        name: "size",
                        type: "'xs' | 'sm' | 'md' | 'lg'",
                        required: false,
                        defaultValue: "md",
                        description:
                            "Diameter: 12, 14, 16 or 20px, as the built-in loading states use. Pass a size utility through class for anything else.",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "What is loading. With a label the spinner is a status and the label is read out; without one it is hidden from assistive technology.",
                    },
                ],
                variants: [
                    "xs",
                    "sm",
                    "md",
                    "lg",
                ],
                examples: [
                    {
                        title: "Beside text",
                        description: "Decorative: the text says what is happening",
                        code: `<div class="flex items-center gap-2 text-sm">
    <Spinner />
    Saving changes
</div>`,
                    },
                    {
                        title: "Sizes",
                        description: "The four sizes, and a custom one through class",
                        code: `<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner class="size-8" />`,
                    },
                    {
                        title: "On its own",
                        description: "A label makes it a status that screen readers announce",
                        code: '<Spinner label="Loading projects" size="lg" class="text-link" />',
                    },
                ],
            },
            {
                name: "FloatingActionButton",
                category: "atoms",
                description:
                    "Round primary button that floats over the content, above the tab bar: the one main action of a screen.",
                props: [
                    {
                        name: "label",
                        type: "string",
                        required: true,
                        description:
                            "What the button does. Its accessible name, and its text when extended.",
                    },
                    {
                        name: "icon",
                        type: "Component",
                        required: false,
                        defaultValue: "Plus",
                        description:
                            "An icon component, such as a lucide icon, drawn at 24px.",
                    },
                    {
                        name: "extended",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Shows the label as text beside the icon. The button grows sideways, and the label wraps before the button is wider than the screen.",
                    },
                    {
                        name: "href",
                        type: "string",
                        required: false,
                        description:
                            "Makes it a link to this address. Without it, it is a button: pass onclick.",
                    },
                    {
                        name: "position",
                        type: "'bottom-end' | 'bottom-start' | 'bottom-center'",
                        required: false,
                        defaultValue: "bottom-end",
                        description:
                            "The bottom corner it sits in, 16px from the edges. bottom-end is the right in a left-to-right page and the left in a right-to-left one.",
                    },
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Extra classes. Inside AppShell the button is placed against the shell, above --app-shell-bottom-inset; on its own it is fixed above the home indicator. Set --fab-bottom-offset (on the button or an ancestor) to lift it over something else fixed to the bottom, such as a BottomTabBar on its own.",
                    },
                ],
                variants: [
                    "extended",
                    "bottom-end",
                    "bottom-start",
                    "bottom-center",
                ],
                examples: [
                    {
                        title: "Above the tab bar",
                        description:
                            "56px round at any text size, 16px above the tab bar and from the edge. It stays put while the content scrolls; the list has padding at the end so its last row can scroll clear",
                        code: `<script lang="ts">
    import { AppShell, BottomTabBar, FloatingActionButton } from "zabi-components";
</script>

<AppShell>
    <!-- pb-24: room for the last row to scroll clear of the button. -->
    <ul class="p-4 pb-24">…</ul>

    <FloatingActionButton label="New quiz" onclick={newQuiz} />

    {#snippet footer()}
        <BottomTabBar {items} active={page.url.pathname} />
    {/snippet}
</AppShell>`,
                    },
                    {
                        title: "Extended, centred, with its own icon",
                        description:
                            "The label is shown beside the icon. Without a shell the button is fixed to the screen; lift it over a tab bar of your own with --fab-bottom-offset",
                        code: `<FloatingActionButton
    label="Write a question"
    icon={Pencil}
    extended
    position="bottom-center"
    onclick={write}
/>

<!-- Outside AppShell, over a fixed BottomTabBar: -->
<FloatingActionButton
    label="New quiz"
    href="/quiz/new"
    style="--fab-bottom-offset: calc(4rem + 1px)"
/>`,
                    },
                ],
            },
            {
                name: "DateField",
                category: "atoms",
                description:
                    "Date field that opens the device's own date picker, styled like Input; the value is an ISO date.",
                props: [
                    {
                        name: "value",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "The date as YYYY-MM-DD, or an empty string while empty. Bindable. It is this format whatever the field shows.",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Label above the field.",
                    },
                    {
                        name: "hint",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Help text under the field, read out with it.",
                    },
                    {
                        name: "error",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "An error under the field. It marks the field invalid and is announced.",
                    },
                    {
                        name: "min",
                        type: "string",
                        required: false,
                        description:
                            "Earliest date that can be picked, as YYYY-MM-DD. Enforced by the browser's picker and its validation.",
                    },
                    {
                        name: "max",
                        type: "string",
                        required: false,
                        description:
                            "Latest date that can be picked, as YYYY-MM-DD.",
                    },
                    {
                        name: "step",
                        type: "number | 'any'",
                        required: false,
                        description:
                            "Steps between dates that can be picked, in days.",
                    },
                    {
                        name: "required",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "The field must be filled in.",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Cannot be changed, and is not submitted.",
                    },
                    {
                        name: "readonly",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Shows the value without letting it be changed; it is still submitted.",
                    },
                    {
                        name: "size",
                        type: "'sm' | 'md' | 'lg'",
                        required: false,
                        defaultValue: "md",
                        description:
                            "Height, on the scale Input and Button use: 32, 40 and 48px, and at least 44px on a touch screen.",
                    },
                    {
                        name: "name",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Name the value is submitted under in a form.",
                    },
                    {
                        name: "id",
                        type: "string",
                        required: false,
                        defaultValue: "generated",
                        description:
                            "Id of the input. Inside FormField, spread the props it hands to its control.",
                    },
                    {
                        name: "hideLabel",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "True when FormField supplies the visible label.",
                    },
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Extra classes for the input. Other attributes land on the input too.",
                    },
                ],
                variants: [
                    "sm",
                    "md",
                    "lg",
                    "disabled",
                    "readonly",
                ],
                examples: [
                    {
                        title: "The device's picker, and the value as text",
                        description:
                            "The field shows the date in the format of the browser or device, not of the page: no attribute changes that. formatDate turns the value into text in the language you name, for the places that only show it",
                        code: `<script lang="ts">
    import { DateField, formatDate } from "zabi-components";

    let value = $state("2026-10-06");
</script>

<DateField label="Quiz date" name="date" bind:value required />

<!-- 6 okt. 2026 -->
<p>{formatDate(value, "sv")}</p>`,
                    },
                    {
                        title: "Limits, a hint, an error, and inside FormField",
                        description:
                            "min and max are the browser's to enforce. The hint and the error are read out with the field. In a FormField, hide the field's own label and spread the props the FormField hands over",
                        code: `<DateField
    label="Last day to sign up"
    hint="Teams can join until the end of this day."
    error={error}
    min="2026-10-01"
    max="2026-12-31"
    bind:value
/>

<FormField label="Played on" required>
    {#snippet control(props)}
        <DateField hideLabel bind:value {...props} />
    {/snippet}
</FormField>`,
                    },
                    {
                        title: "Sizes and states",
                        description:
                            "The three sizes of Input, read only and disabled. On a touch screen sm and md are both 44px tall",
                        code: `<DateField label="Small" size="sm" bind:value />
<DateField label="Medium" size="md" bind:value />
<DateField label="Large" size="lg" bind:value />
<DateField label="Read only" readonly bind:value />
<DateField label="Disabled" disabled bind:value />`,
                    },
                ],
            },
            {
                name: "TimeField",
                category: "atoms",
                description:
                    "Time field that opens the device's own time picker, styled like Input; the value is 24-hour HH:mm.",
                props: [
                    {
                        name: "value",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "The time as HH:mm, or an empty string while empty. Bindable. It is this format whatever the field shows.",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Label above the field.",
                    },
                    {
                        name: "hint",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Help text under the field, read out with it.",
                    },
                    {
                        name: "error",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "An error under the field. It marks the field invalid and is announced.",
                    },
                    {
                        name: "min",
                        type: "string",
                        required: false,
                        description:
                            "Earliest time that can be picked, as HH:mm. Enforced by the browser's picker and its validation.",
                    },
                    {
                        name: "max",
                        type: "string",
                        required: false,
                        description:
                            "Latest time that can be picked, as HH:mm.",
                    },
                    {
                        name: "step",
                        type: "number | 'any'",
                        required: false,
                        description:
                            "Steps between times that can be picked, in seconds: 300 for five minutes, 1 to ask for seconds.",
                    },
                    {
                        name: "required",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "The field must be filled in.",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Cannot be changed, and is not submitted.",
                    },
                    {
                        name: "readonly",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Shows the value without letting it be changed; it is still submitted.",
                    },
                    {
                        name: "size",
                        type: "'sm' | 'md' | 'lg'",
                        required: false,
                        defaultValue: "md",
                        description:
                            "Height, on the scale Input and Button use: 32, 40 and 48px, and at least 44px on a touch screen.",
                    },
                    {
                        name: "name",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Name the value is submitted under in a form.",
                    },
                    {
                        name: "id",
                        type: "string",
                        required: false,
                        defaultValue: "generated",
                        description:
                            "Id of the input. Inside FormField, spread the props it hands to its control.",
                    },
                    {
                        name: "hideLabel",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "True when FormField supplies the visible label.",
                    },
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Extra classes for the input. Other attributes land on the input too.",
                    },
                ],
                variants: [
                    "sm",
                    "md",
                    "lg",
                    "disabled",
                    "readonly",
                ],
                examples: [
                    {
                        title: "The device's picker, and the value as text",
                        description:
                            "The field shows the time in the format of the browser or device, not of the page: no attribute changes that. formatTime turns the value into text in the language you name, for the places that only show it",
                        code: `<script lang="ts">
    import { TimeField, formatTime } from "zabi-components";

    let value = $state("19:00");
</script>

<TimeField label="Starts" name="time" bind:value required />

<!-- 19:00 -->
<p>{formatTime(value, "sv")}</p>`,
                    },
                    {
                        title: "Limits, a hint, an error, and inside FormField",
                        description:
                            "min and max are the browser's to enforce. The hint and the error are read out with the field. In a FormField, hide the field's own label and spread the props the FormField hands over",
                        code: `<TimeField
    label="Doors open"
    hint="In steps of 15 minutes."
    error={error}
    min="17:00"
    max="23:00"
    step={900}
    bind:value
/>

<FormField label="First question" required>
    {#snippet control(props)}
        <TimeField hideLabel bind:value {...props} />
    {/snippet}
</FormField>`,
                    },
                    {
                        title: "Sizes and states",
                        description:
                            "The three sizes of Input, read only and disabled. On a touch screen sm and md are both 44px tall",
                        code: `<TimeField label="Small" size="sm" bind:value />
<TimeField label="Medium" size="md" bind:value />
<TimeField label="Large" size="lg" bind:value />
<TimeField label="Read only" readonly bind:value />
<TimeField label="Disabled" disabled bind:value />`,
                    },
                ],
            },
        ],
        molecules: [
            {
                name: "Alert",
                category: "molecules",
                description:
                    "Info, success, warning and error messages, with an optional close button.",
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
                    "Name, email, message and a subscribe checkbox, ready to wire up with onsubmit.",
                props: [
                    {
                        name: "onsubmit",
                        type: "(event: SubmitEvent) => void",
                        required: false,
                        description:
                            "Runs on submit. The fields are markup, not a prop.",
                    },
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        description:
                            "Extra classes for the form element.",
                    },
                ],

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
                    "Menu anchored to your own trigger snippet, with arrow-key focus and four placements.",
                props: [
                    {
                        name: "trigger",
                        type: "Snippet<[DropdownTriggerProps]>",
                        required: true,
                        description:
                            "The control that opens the menu. Spread the ARIA props it receives onto your button.",
                    },
                    {
                        name: "options",
                        type: "DropdownOption[] ({ value, label, disabled?, icon?, tone?, description? })",
                        required: false,
                        defaultValue: "[]",
                        description:
                            "Menu items, when not supplying children. icon is a component such as a lucide icon, tone is default or danger, and description is a second line under the label. A disabled item stays focusable (aria-disabled) so its description can be read, but cannot be chosen.",
                    },
                    {
                        name: "isOpen",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Open state. Bindable.",
                    },
                    {
                        name: "menuRole",
                        type: "'menu' | 'listbox'",
                        required: false,
                        defaultValue: "menu",
                        description:
                            "Role for the popup; listbox for Select-style pickers.",
                    },
                    {
                        name: "placement",
                        type: "'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'",
                        required: false,
                        defaultValue: "bottom-start",
                        description:
                            "The side the menu opens on when it fits there. Near an edge of the screen it flips to the other side, and is narrowed or scrolls inside when neither side has room.",
                    },
                    {
                        name: "onOptionClick",
                        type: "(value: string | number) => void",
                        required: false,
                        description:
                            "Runs when an option is chosen.",
                    },
                ],

                examples: [
                    {
                        title: "Basic Dropdown",
                        description: "Simple dropdown with options",
                        code: '&lt;Dropdown bind:isOpen options={[{ value: "1", label: "Option 1" }]} onOptionClick={choose}&gt;\n  {#snippet trigger(aria)}\n    &lt;Button text="Open" onclick={() => (isOpen = !isOpen)} {...aria} /&gt;\n  {/snippet}\n&lt;/Dropdown&gt;',
                    },
                    {
                        title: "Icons, a danger item and a disabled reason",
                        description:
                            "Options with an icon, a danger tone, and a description that explains a disabled item",
                        code: 'const options = [\n  { value: "edit", label: "Edit", icon: Pencil },\n  { value: "archive", label: "Archive", icon: Archive, disabled: true, description: "Only an owner can archive a project." },\n  { value: "delete", label: "Delete", icon: Trash2, tone: "danger" },\n];\n\n&lt;Dropdown bind:isOpen {options} onOptionClick={choose}&gt;\n  {#snippet trigger(aria)}\n    &lt;Button text="Project actions" onclick={() => (isOpen = !isOpen)} {...aria} /&gt;\n  {/snippet}\n&lt;/Dropdown&gt;',
                    },
                ],
            },
            {
                name: "DropdownItem",
                category: "molecules",
                description:
                    "One menu item for custom Dropdown children, with an icon, a danger tone and a description; it joins the arrow-key order.",
                props: [
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        description:
                            "The item's text and accessible name. Use children for custom content instead.",
                    },
                    {
                        name: "description",
                        type: "string",
                        required: false,
                        description:
                            "Second line under the label, linked as the item's description; use it to say why an item is disabled.",
                    },
                    {
                        name: "icon",
                        type: "Component<{ size?: number; class?: string }>",
                        required: false,
                        description:
                            "Icon component rendered before the label at 16px. Decorative.",
                    },
                    {
                        name: "tone",
                        type: "'default' | 'danger'",
                        required: false,
                        defaultValue: "default",
                        description:
                            "danger for a destructive action such as Delete.",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Rendered as aria-disabled: the item stays focusable so its description can be read, but a click does nothing.",
                    },
                    {
                        name: "selected",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Marks the chosen option inside a listbox Dropdown (aria-selected).",
                    },
                    {
                        name: "role",
                        type: "string",
                        required: false,
                        description:
                            "Defaults to the role the surrounding Dropdown needs (menuitem, or option in a listbox); set menuitemradio or menuitemcheckbox yourself.",
                    },
                    {
                        name: "onclick",
                        type: "(event: MouseEvent) => void",
                        required: false,
                        description:
                            "Runs when the item is chosen. Not called while disabled. The Dropdown does not close itself; set isOpen.",
                    },
                ],
                variants: ["default", "danger"],
                examples: [
                    {
                        title: "Custom children",
                        description:
                            "DropdownItem inside the children snippet of a Dropdown",
                        code: '&lt;Dropdown bind:isOpen ariaLabel="Project actions"&gt;\n  {#snippet trigger(aria)}\n    &lt;Button text="Project actions" onclick={() => (isOpen = !isOpen)} {...aria} /&gt;\n  {/snippet}\n  {#snippet children()}\n    &lt;DropdownItem label="Edit" icon={Pencil} onclick={edit} /&gt;\n    &lt;DropdownItem label="Delete" icon={Trash2} tone="danger" onclick={remove} /&gt;\n  {/snippet}\n&lt;/Dropdown&gt;',
                    },
                ],
            },
            {
                name: "Form",
                category: "molecules",
                description:
                    "Form element with method, action and native validation you can switch off.",
                props: [
                    {
                        name: "method",
                        type: "'get' | 'post'",
                        required: false,
                        defaultValue: "post",
                        description:
                            "Form method.",
                    },
                    {
                        name: "action",
                        type: "string",
                        required: false,
                        description:
                            "Form action.",
                    },
                    {
                        name: "novalidate",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Skip the browser's own validation.",
                    },
                    {
                        name: "onsubmit",
                        type: "(event: SubmitEvent) => void",
                        required: false,
                        description:
                            "Runs on submit.",
                    },
                ],

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
                    "File input with an image or video preview, an accept filter, drag and drop and a clear control.",
                props: [
                    {
                        name: "value",
                        type: "string | null",
                        required: false,
                        defaultValue: "null",
                        description:
                            "Preview URL: a stored URL or the object URL of a picked file. Bindable.",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        description:
                            "Visible label that names the dropzone and its actions.",
                    },
                    {
                        name: "id",
                        type: "string",
                        required: false,
                        description:
                            "Id of the control the label points at. Generated when omitted.",
                    },
                    {
                        name: "accept",
                        type: "string",
                        required: false,
                        defaultValue: "image/*",
                        description:
                            "File types the chooser offers and a drop accepts.",
                    },
                    {
                        name: "placeholder",
                        type: "string",
                        required: false,
                        defaultValue: "No image selected",
                        description:
                            "Text shown before a file is chosen.",
                    },
                    {
                        name: "browseText",
                        type: "string",
                        required: false,
                        defaultValue: "Click to choose a file",
                        description:
                            "Second line of the dropzone.",
                    },
                    {
                        name: "changeText",
                        type: "string",
                        required: false,
                        defaultValue: "Change",
                        description:
                            "Text of the Change action.",
                    },
                    {
                        name: "removeText",
                        type: "string",
                        required: false,
                        defaultValue: "Remove",
                        description:
                            "Text of the Remove action.",
                    },
                    {
                        name: "changeLabel",
                        type: "string",
                        required: false,
                        description:
                            "Accessible name of the Change action. Defaults to changeText followed by label.",
                    },
                    {
                        name: "removeLabel",
                        type: "string",
                        required: false,
                        description:
                            "Accessible name of the Remove action. Defaults to removeText followed by label.",
                    },
                    {
                        name: "alt",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Text alternative for the preview.",
                    },
                    {
                        name: "previewType",
                        type: '"image" | "video"',
                        required: false,
                        description:
                            "Forces the preview kind. By default a video file or a URL with a video extension previews as a video.",
                    },
                    {
                        name: "preview",
                        type: "Snippet<[ImageUploadPreviewDetail]>",
                        required: false,
                        description:
                            "Replaces the built-in preview. Receives the url, type and alt.",
                    },
                    {
                        name: "actionsPlacement",
                        type: '"overlay" | "strip"',
                        required: false,
                        description:
                            "Where Change and Remove sit over the preview. Defaults to strip for a video and on touch, overlay otherwise.",
                    },
                    {
                        name: "selectedText",
                        type: "string",
                        required: false,
                        defaultValue: "Image selected",
                        description:
                            "Announced to screen readers when a file or URL is set.",
                    },
                    {
                        name: "removedText",
                        type: "string",
                        required: false,
                        defaultValue: "Image removed",
                        description:
                            "Announced to screen readers when the value is cleared.",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Disable choosing, dropping and clearing.",
                    },
                    {
                        name: "errorMessage",
                        type: "string",
                        required: false,
                        description:
                            "Message shown beneath the preview.",
                    },
                    {
                        name: "errorTitle",
                        type: "string",
                        required: false,
                        defaultValue: "Image upload failed",
                        description:
                            "Heading of the error block.",
                    },
                    {
                        name: "errorRecovery",
                        type: "string | false",
                        required: false,
                        defaultValue: "Recovery action: try another file or retry upload.",
                        description:
                            "Closing line of the error block. Pass false to leave it out.",
                    },
                    {
                        name: "onclick",
                        type: "(event: Event) => void",
                        required: false,
                        description:
                            "Runs before the file chooser opens. Call event.preventDefault() to keep it closed.",
                    },
                    {
                        name: "onbrowse",
                        type: "(event: Event) => void",
                        required: false,
                        description:
                            "Replaces the native file chooser, for a media library or another source.",
                    },
                    {
                        name: "onchange",
                        type: "(event: Event) => void",
                        required: false,
                        description:
                            "Native change event from the file input.",
                    },
                    {
                        name: "onfileselect",
                        type: "(detail: ImageUploadFileDetail) => void",
                        required: false,
                        description:
                            "Runs with the picked or dropped file and its preview URL, and with nulls on remove.",
                    },
                    {
                        name: "onfilereject",
                        type: "(file: File) => void",
                        required: false,
                        description:
                            "Runs with a dropped file that accept does not allow.",
                    },
                ],

                examples: [
                    {
                        title: "Basic Upload",
                        description: "Labelled upload that reports the chosen file",
                        code: '&lt;ImageUpload label="Logo" bind:value onfileselect={handleFile} /&gt;',
                    },
                    {
                        title: "Media Library",
                        description: "Open your own picker and accept video",
                        code: '&lt;ImageUpload label="Hero" accept="image/*,video/*" bind:value onbrowse={openLibrary} /&gt;',
                    },
                ],
            },
            {
                name: "MediaGrid",
                category: "molecules",
                description:
                    "Grid of selectable image and video thumbnails with per-item delete, loading placeholders and an empty state.",
                props: [
                    {
                        name: "items",
                        type: "T[]",
                        required: true,
                        description:
                            "The images and videos to show.",
                    },
                    {
                        name: "getKey",
                        type: "(item: T) => string | number",
                        required: true,
                        description:
                            "Stable identity of an item. Selection is stored as keys.",
                    },
                    {
                        name: "getLabel",
                        type: "(item: T) => string",
                        required: true,
                        description:
                            "Name of an item: the image's alt, and part of the delete button's name.",
                    },
                    {
                        name: "getUrl",
                        type: "(item: T) => string",
                        required: true,
                        description:
                            "Address of the image or video.",
                    },
                    {
                        name: "getType",
                        type: "(item: T) => 'image' | 'video' | undefined",
                        required: false,
                        description:
                            "Whether an item is a video. Without it, the URL's extension decides.",
                    },
                    {
                        name: "getPoster",
                        type: "(item: T) => string | undefined",
                        required: false,
                        description:
                            "A still image for a video, shown instead of loading the video's first frame.",
                    },
                    {
                        name: "selected",
                        type: "string | number | null",
                        required: false,
                        defaultValue: "null",
                        description:
                            "Key of the selected item. Bindable. Used unless multiple.",
                    },
                    {
                        name: "multiple",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Lets any number of items be selected; the keys are in selectedKeys.",
                    },
                    {
                        name: "selectedKeys",
                        type: "(string | number)[]",
                        required: false,
                        defaultValue: "[]",
                        description:
                            "Keys of the selected items. Bindable. Used when multiple.",
                    },
                    {
                        name: "onselect",
                        type: "(detail: { item: T; selected: boolean; keys: (string | number)[] }) => void",
                        required: false,
                        description:
                            "Runs when an item is selected, or, with multiple, when its selection is cleared. Pressing the one selected item again does nothing.",
                    },
                    {
                        name: "ondelete",
                        type: "(item: T) => void",
                        required: false,
                        description:
                            "Shows a delete button on each item and reports the one activated. The grid neither confirms nor removes: confirm, then take the item out of items.",
                    },
                    {
                        name: "isItemDeletable",
                        type: "(item: T) => boolean",
                        required: false,
                        description:
                            "Leaves the delete button off one item.",
                    },
                    {
                        name: "loading",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Adds placeholder tiles after the items, for a first load or a next page.",
                    },
                    {
                        name: "loadingCount",
                        type: "number",
                        required: false,
                        defaultValue: "8",
                        description:
                            "How many placeholder tiles loading shows.",
                    },
                    {
                        name: "empty",
                        type: "Snippet",
                        required: false,
                        description:
                            "Replaces the built-in empty state.",
                    },
                    {
                        name: "emptyHeadingLevel",
                        type: "2 | 3 | 4 | 5 | 6",
                        required: false,
                        defaultValue: "3",
                        description:
                            "Heading element of the built-in empty state's title, to fit under the Modal or section title above the grid.",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Disables selecting and deleting.",
                    },
                    {
                        name: "minTileSize",
                        type: "number | string",
                        required: false,
                        defaultValue: "96",
                        description:
                            "Smallest tile edge, as px or any CSS length. The grid fits as many columns as that allows.",
                    },
                    {
                        name: "strings",
                        type: "Partial<MediaGridStrings>",
                        required: false,
                        description:
                            "Overrides for the built-in strings: deleteLabel, videoLabel, loading, emptyTitle, emptyDescription and keyboardHint.",
                    },
                    {
                        name: "aria-label",
                        type: "string",
                        required: false,
                        description:
                            "Accessible name of the list. Use this or aria-labelledby.",
                    },
                    {
                        name: "aria-labelledby",
                        type: "string",
                        required: false,
                        description:
                            "Id of the element that names the list.",
                    },
                ],
                variants: [
                    "multiple",
                    "loading",
                    "disabled",
                ],
                examples: [
                    {
                        title: "Library with delete",
                        description:
                            "Pick one item. Delete asks first, and an item in use has no delete button",
                        code: `<script lang="ts">
    import { ConfirmDialog, MediaGrid } from "zabi-components";

    let items = $state(await loadMedia());
    let selected = $state(null);
    let toDelete = $state(null);
    let confirmOpen = $state(false);
</script>

<MediaGrid
    {items}
    getKey={(item) => item.id}
    getLabel={(item) => item.name}
    getUrl={(item) => item.url}
    bind:selected
    ondelete={(item) => {
        toDelete = item;
        confirmOpen = true;
    }}
    isItemDeletable={(item) => !item.inUse}
    aria-label="Media library"
/>

<ConfirmDialog
    bind:open={confirmOpen}
    variant="danger"
    title="Delete this file?"
    confirmLabel="Delete"
    onconfirm={() => (items = items.filter((item) => item.id !== toDelete.id))}
/>`,
                    },
                    {
                        title: "Multiple, loading and empty",
                        description:
                            "Several items selected at once, placeholder tiles for a next page, and the empty state",
                        code: `<MediaGrid
    {items}
    getKey={(item) => item.id}
    getLabel={(item) => item.name}
    getUrl={(item) => item.url}
    multiple
    bind:selectedKeys
    {loading}
    loadingCount={4}
    minTileSize={72}
    aria-label="Attachments"
/>`,
                    },
                    {
                        title: "Picker in a Modal",
                        description:
                            "The grid as the body of a Modal, closing on the first choice",
                        code: `<Modal bind:isOpen={pickerOpen} title="Media library">
    <MediaGrid
        {items}
        getKey={(item) => item.id}
        getLabel={(item) => item.name}
        getUrl={(item) => item.url}
        selected={value}
        onselect={({ item }) => {
            value = item.id;
            pickerOpen = false;
        }}
        aria-label="Media library"
    />
</Modal>`,
                    },
                ],
            },
            {
                name: "Modal",
                category: "molecules",
                description:
                    "Dialog that keeps focus inside while open and returns it to the trigger, in three widths.",
                props: [
                    {
                        name: "isOpen",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Open state. Bindable.",
                    },
                    {
                        name: "title",
                        type: "string",
                        required: false,
                        description:
                            "Dialog title.",
                    },
                    {
                        name: "description",
                        type: "string",
                        required: false,
                        description:
                            "Text below the title, linked as the dialog's description.",
                    },
                    {
                        name: "size",
                        type: "'sm' | 'md' | 'lg'",
                        required: false,
                        defaultValue: "md",
                        description:
                            "Panel width.",
                    },
                    {
                        name: "showClose",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description:
                            "Show the close button.",
                    },
                    {
                        name: "closeLabel",
                        type: "string",
                        required: false,
                        defaultValue: "Close",
                        description:
                            "Accessible name of the close button, for translation.",
                    },
                    {
                        name: "initialFocus",
                        type: "string",
                        required: false,
                        description:
                            "CSS selector, looked up inside the panel, of the control that takes focus on open. Without it, or with no match, the first control does.",
                    },
                    {
                        name: "role",
                        type: "'dialog' | 'alertdialog'",
                        required: false,
                        defaultValue: "dialog",
                        description:
                            "Use alertdialog for a dialog that interrupts to ask for a response, such as a confirmation. Focus handling is the same for both. Other attributes (aria-describedby, aria-busy, data-*, id) are passed to the dialog panel.",
                    },
                    {
                        name: "portal",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Render the overlay in document.body, so an ancestor with a transform, filter or clipped overflow cannot trap it. The theme class belongs on html or body; set lower, it does not reach a portalled modal.",
                    },
                    {
                        name: "dismissible",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description:
                            "When false, Escape, a backdrop click and the close button do not close the modal; the close button stays focusable and is marked aria-disabled. Setting isOpen yourself still closes it.",
                    },
                    {
                        name: "fullScreen",
                        type: "boolean | 'mobile'",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Fills the screen (100dvh, no rounding) for a long form on a phone: true at every width, 'mobile' below 768px with the usual dialog from there up. The title and close button stay at the top and the footer at the bottom, inside the safe areas, and the content scrolls between them.",
                    },
                    {
                        name: "onclose",
                        type: "(detail: { reason: 'escape' | 'backdrop' | 'close-button' }) => void",
                        required: false,
                        description:
                            "Called when the modal closes itself, with what the user did.",
                    },
                    {
                        name: "onclick",
                        type: "(event: Event) => void",
                        required: false,
                        description:
                            "Deprecated for close reporting; use onclose. Still called with the event on Escape, a backdrop click and the close button.",
                    },
                ],
                variants: [
                    "sm",
                    "md",
                    "lg",
                ],
                examples: [
                    {
                        title: "Basic Modal",
                        description: "Simple modal dialog",
                        code: "&lt;Modal bind:isOpen={isOpen}&gt;\n  &lt;p&gt;Modal content&lt;/p&gt;\n&lt;/Modal&gt;",
                    },
                    {
                        title: "With Title",
                        description: "Modal with title and close button",
                        code: '&lt;Modal bind:isOpen={isOpen} title="Confirm Action" onclose={({ reason }) => handleClose(reason)}&gt;\n  &lt;p&gt;Are you sure?&lt;/p&gt;\n&lt;/Modal&gt;',
                    },
                ],
            },
            {
                name: "SlideUp",
                category: "molecules",
                description:
                    "Panel that slides up from the bottom edge, with a title and close control.",
                props: [
                    {
                        name: "isOpen",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Open state. Bindable.",
                    },
                    {
                        name: "title",
                        type: "string",
                        required: false,
                        description:
                            "Panel heading.",
                    },
                    {
                        name: "closeLabel",
                        type: "string",
                        required: false,
                        defaultValue: "Close",
                        description:
                            "Accessible name of the close button, for translation.",
                    },
                    {
                        name: "initialFocus",
                        type: "string",
                        required: false,
                        description:
                            "CSS selector, looked up inside the sheet, of the control that takes focus on open. Without it, or with no match, the first control does.",
                    },
                    {
                        name: "swipeToClose",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Adds a grip at the top and lets a swipe down close the sheet. A swipe on the content closes only when the content is at its top. The close button, the backdrop and Escape stay.",
                    },
                    {
                        name: "onclick",
                        type: "(event: Event) => void",
                        required: false,
                        description:
                            "Runs when the sheet closes itself, with the event that closed it: the click on the close button or the backdrop, the Escape keydown, or the end of a swipe.",
                    },
                ],

                examples: [
                    {
                        title: "Basic SlideUp",
                        description: "Simple slide-up panel",
                        code: '&lt;SlideUp bind:isOpen title="Filters"&gt;\n  &lt;p&gt;Panel content&lt;/p&gt;\n&lt;/SlideUp&gt;',
                    },
                    {
                        title: "Translated close button and first focus",
                        description:
                            "A close label for the reader's language, and focus starting on a field",
                        code: '&lt;SlideUp bind:isOpen title="Filter" closeLabel="Stäng" initialFocus="#filter-search"&gt;\n  &lt;Input id="filter-search" label="Sök" /&gt;\n&lt;/SlideUp&gt;',
                    },
                    {
                        title: "Swipe down to close",
                        description:
                            "A grip at the top; drag it down, or swipe down on the content while it is at its top. The sheet keeps clear of the home indicator",
                        code: `<SlideUp bind:isOpen title="Release notes" swipeToClose>
    …
</SlideUp>`,
                    },
                ],
            },
            {
                name: "Tabs",
                category: "molecules",
                description:
                    "Tab list driven by a tabs array, in default or pills style.",
                props: [
                    {
                        name: "tabs",
                        type: "Array<{ id, label, disabled? }>",
                        required: false,
                        defaultValue: "[]",
                        description:
                            "Tab definitions.",
                    },
                    {
                        name: "activeTab",
                        type: "string",
                        required: false,
                        description:
                            "Id of the open tab. Bindable.",
                    },
                    {
                        name: "variant",
                        type: "'default' | 'pills'",
                        required: false,
                        defaultValue: "default",
                        description:
                            "Tab styling.",
                    },
                    {
                        name: "fullWidth",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "The tabs share the row equally; meant for two or three tabs on a phone. Without it a tab is as wide as its label, and a row that does not fit scrolls sideways with a fade at the edge that has more.",
                    },
                    {
                        name: "onclick",
                        type: "(event: Event) => void",
                        required: false,
                        description:
                            "Runs when a tab is clicked.",
                    },
                ],
                variants: [
                    "default",
                    "pills",
                ],
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
                            "Sets isMobile on the menu context for your own children to read (true under 768px, or always with 'mobile'). It changes nothing by itself: the list wraps and a panel stays on screen at every width.",
                    },
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Extra classes, merged last so they win",
                    },
                    {
                        name: "listClassName",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Additional CSS classes for the menu list",
                    },
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
            {
                name: "Toaster",
                category: "molecules",
                description:
                    "Fixed notification region for pushToast; mount once near the app root. On a phone it spans the width, clear of the home indicator and a tab bar.",
                props: [
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Extra classes on the region. Other attributes are passed to it too: set --toaster-bottom-offset in style (or on any ancestor) to the height of a bar of your own that is fixed to the bottom.",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Toaster",
                        description:
                            "Stacked toasts, bottom-right from 640px up and across the width below that. Inside an AppShell the stack sits above the tab bar by itself. For a BottomTabBar on its own, a StickyActionBar or a FloatingActionButton, give its height in --toaster-bottom-offset. The safe-area insets are zero until the page sets viewport-fit=cover",
                        code: "import { Toaster, pushToast } from 'zabi-components';\n\n<Toaster />\npushToast({ message: 'Saved', type: 'success' });\n\n<!-- Above a BottomTabBar that is not in an AppShell -->\n<Toaster style=\"--toaster-bottom-offset: calc(4rem + 1px)\" />",
                    },
                    {
                        title: "Toast with an action",
                        description:
                            "pushToast takes an optional action ({ label, onclick, dismissOnClick? }) that renders as a button and closes the toast after it runs. A toast with an action stays until it is dismissed, unless you pass a duration. Call focusToasts() from a shortcut of your own to move keyboard focus to the newest toast; focus returns to where it was when the toast is dismissed. Offer the same action elsewhere in the page as well.",
                        code: "import { pushToast, focusToasts } from 'zabi-components';\n\npushToast({\n  message: 'Project archived',\n  type: 'success',\n  action: { label: 'Undo', onclick: () => restore(project) },\n});\n\n// e.g. on Alt+T\nfocusToasts();",
                    },
                ],
            },
            {
                name: "RadioGroup",
                category: "molecules",
                description:
                    "Fieldset-based radio group with an optional legend; uses native radios with a shared name.",
                props: [
                    {
                        name: "options",
                        type: "RadioGroupOption[]",
                        required: true,
                        defaultValue: "[]",
                        description: "value, label, optional description/disabled",
                    },
                    {
                        name: "value",
                        type: "string | undefined",
                        required: false,
                        defaultValue: "undefined",
                        description: "Selected value (bind:value)",
                    },
                    {
                        name: "legend",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Accessible group label",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Radio group",
                        description: "Choose one option",
                        code: `<RadioGroup
  legend="Plan"
  options={[{ value: 'a', label: 'Basic' }, { value: 'b', label: 'Pro' }]}
  bind:value
/>`,
                    },
                ],
            },
            {
                name: "FormField",
                category: "molecules",
                description:
                    "Accessible field wrapper: label, description, error, and a control snippet for the input.",
                props: [
                    {
                        name: "label",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Visible label",
                    },
                    {
                        name: "error",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Validation message",
                    },
                    {
                        name: "control",
                        type: "Snippet",
                        required: true,
                        defaultValue: "",
                        description: "Render prop for the control with id/aria props",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Form field",
                        description: "Compose with Input or Select",
                        code: `<FormField label="Email" error={err}>
  {#snippet control(props)}
    <Input {...props} bind:value />
  {/snippet}
</FormField>`,
                    },
                ],
            },
            {
                name: "Header",
                category: "molecules",
                description:
                    "Documentation-style page header: title, description, category badge, and variant chips.",
                props: [
                    {
                        name: "title",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Page title",
                    },
                    {
                        name: "description",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Lead paragraph",
                    },
                    {
                        name: "category",
                        type: "string",
                        required: true,
                        defaultValue: "atoms",
                        description: "atoms | molecules | organisms",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Header",
                        description: "Use at the top of component docs",
                        code: '<Header title="Button" description="…" category="atoms" />',
                    },
                ],
            },
            {
                name: "SegmentedControl",
                category: "molecules",
                description:
                    "Two to four choices in one row, such as List and Month; a radio group, so one is selected and the arrow keys move between them.",
                props: [
                    {
                        name: "options",
                        type: "SegmentedControlOption[]",
                        required: true,
                        description:
                            "Two to four choices, each with a value, a label and optionally an icon and disabled.",
                    },
                    {
                        name: "value",
                        type: "string",
                        required: false,
                        description:
                            "Selected value. Bindable. Undefined for no selection.",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Accessible name of the group. Not shown.",
                    },
                    {
                        name: "aria-label",
                        type: "string",
                        required: false,
                        description:
                            "Accessible name of the group, the same as label.",
                    },
                    {
                        name: "aria-labelledby",
                        type: "string",
                        required: false,
                        description:
                            "Id of a visible element that names the group, in place of label.",
                    },
                    {
                        name: "size",
                        type: "'sm' | 'md' | 'lg'",
                        required: false,
                        defaultValue: "md",
                        description:
                            "Height, on the scale Input and Button use. At least 44px on a touch screen.",
                    },
                    {
                        name: "fullWidth",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description:
                            "Equal-width segments that fill the row. Off: each segment is as wide as its label.",
                    },
                    {
                        name: "name",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Name the value is submitted under in a form.",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Disables every segment.",
                    },
                    {
                        name: "onchange",
                        type: "(value: string) => void",
                        required: false,
                        description:
                            "Called with the new value when the user picks another segment.",
                    },
                ],
                variants: [
                    "sm",
                    "md",
                    "lg",
                    "fullWidth",
                    "disabled",
                ],
                examples: [
                    {
                        title: "View switch",
                        description:
                            "Two segments bound to a value; pressing the selected one again changes nothing",
                        code: `<SegmentedControl
    label="View"
    options={[
        { value: "list", label: "List" },
        { value: "month", label: "Month" },
    ]}
    bind:value={view}
/>`,
                    },
                    {
                        title: "Answer",
                        description:
                            "Starts with nothing selected, is named by the visible question and submits with a form",
                        code: `<p id="answer-label">Are you coming on Thursday?</p>
<SegmentedControl
    aria-labelledby="answer-label"
    name="answer"
    options={[
        { value: "going", label: "Going" },
        { value: "maybe", label: "Maybe" },
        { value: "no", label: "Can't" },
    ]}
    bind:value={answer}
/>`,
                    },
                    {
                        title: "Four options",
                        description:
                            "Four segments still share one row on a phone; an icon sits before its label",
                        code: `<SegmentedControl
    label="Period"
    options={[
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
        { value: "year", label: "This year" },
    ]}
    bind:value={period}
/>
<SegmentedControl
    label="View"
    options={[
        { value: "list", label: "List", icon: List },
        { value: "month", label: "Month", icon: CalendarDays },
    ]}
    bind:value={view}
/>`,
                    },
                    {
                        title: "Sizes",
                        description:
                            "32, 40 and 48px tall, as Input and Button; never under 44px on a touch screen",
                        code: `<SegmentedControl label="Small" size="sm" options={views} bind:value={small} />
<SegmentedControl label="Medium" options={views} bind:value={medium} />
<SegmentedControl label="Large" size="lg" options={views} bind:value={large} />`,
                    },
                    {
                        title: "Content width",
                        description:
                            "Segments as wide as their labels, one disabled option, and a disabled control",
                        code: `<SegmentedControl label="View" fullWidth={false} options={views} bind:value={view} />
<SegmentedControl
    label="Plan"
    options={[
        { value: "free", label: "Free" },
        { value: "team", label: "Team" },
        { value: "enterprise", label: "Enterprise", disabled: true },
    ]}
    bind:value={plan}
/>
<SegmentedControl label="View" options={views} value="month" disabled />`,
                    },
                ],
            },
            {
                name: "EmptyState",
                category: "molecules",
                description:
                    "Centered empty state with title, description, and optional action/media snippets.",
                props: [
                    {
                        name: "title",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Heading",
                    },
                    {
                        name: "description",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Supporting copy",
                    },
                    {
                        name: "headingLevel",
                        type: "1 | 2 | 3 | 4 | 5 | 6",
                        required: false,
                        defaultValue: "2",
                        description: "Heading element of the title",
                    },
                    {
                        name: "size",
                        type: '"default" | "compact"',
                        required: false,
                        defaultValue: '"default"',
                        description:
                            "compact tightens padding and the title, for use inside a card, and is a plain div where the default is a named region",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Empty state",
                        description: "Zero-results or onboarding",
                        code: '<EmptyState title="No projects" description="Create one to get started." />',
                    },
                    {
                        title: "Compact, inside a card",
                        description: "Tighter spacing and a heading level that fits the card",
                        code: '<EmptyState size="compact" headingLevel={3} title="No comments" description="Comments will show up here." />',
                    },
                ],
            },
            {
                name: "Page",
                category: "molecules",
                description:
                    "Vertical stack for doc-style pages; set the reading width via class (max-w-4xl). Keeps clear of a phone's notch and home indicator.",
                props: [
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Extra classes — include max-w-* here; Page does not set a default width. Padding of your own on a side replaces the safe-area padding there: write it as max(), for example pl-[max(1rem,env(safe-area-inset-left))], or put it on a child.",
                    },
                    {
                        name: "safeArea",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description:
                            "Pads the left, right and bottom by the safe-area insets, which are zero on a screen without them and until the page sets viewport-fit=cover. Inside an AppShell the page adds nothing, because the shell has done it. Set it to false when your own layout already keeps clear.",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Page",
                        description:
                            'Wrap main doc content. For the safe areas to have a size, the app\'s viewport meta tag needs viewport-fit=cover: content="width=device-width, initial-scale=1, viewport-fit=cover"',
                        code: '<Page class="max-w-4xl">…</Page>',
                    },
                ],
            },
            {
                name: "Section",
                category: "molecules",
                description:
                    "Section with optional title, background, padding, and max-width for marketing layouts.",
                props: [
                    {
                        name: "title",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Section heading",
                    },
                    {
                        name: "background",
                        type: "string",
                        required: false,
                        defaultValue: "default",
                        description: "default | muted | accent | transparent",
                    },
                    {
                        name: "padding",
                        type: "string",
                        required: false,
                        defaultValue: "lg",
                        description: "none | sm | md | lg | xl",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Section",
                        description: "Landing page band",
                        code: '<Section title="Features" background="muted">…</Section>',
                    },
                ],
            },
            {
                name: "NavigationMenuList",
                category: "molecules",
                description:
                    "Horizontal menubar list; use it inside NavigationMenu with items and triggers.",
                props: [
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Extra classes on the <ul>, merged last so they win",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "NavigationMenuList",
                        description: "Compound NavigationMenu API",
                        code: "<NavigationMenuList>…</NavigationMenuList>",
                    },
                ],
            },
            {
                name: "NavigationMenuItem",
                category: "molecules",
                description: "Wraps a trigger and optional dropdown content for one top-level nav item.",
                props: [
                    {
                        name: "value",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Stable id for open state",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "NavigationMenuItem",
                        description: "Child of NavigationMenuList",
                        code: '<NavigationMenuItem value="docs">…</NavigationMenuItem>',
                    },
                ],
            },
            {
                name: "NavigationMenuTrigger",
                category: "molecules",
                description:
                    "Button that toggles the matching NavigationMenuContent.",
                props: [
                    {
                        name: "value",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Matches parent item value",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "NavigationMenuTrigger",
                        description: "Opens the panel for this item",
                        code: '<NavigationMenuTrigger value="docs">Docs</NavigationMenuTrigger>',
                    },
                ],
            },
            {
                name: "NavigationMenuContent",
                category: "molecules",
                description: "Dropdown panel for a menu item; contains links or custom content.",
                props: [
                    {
                        name: "value",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Matches NavigationMenuItem value",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "NavigationMenuContent",
                        description: "Panel body",
                        code: '<NavigationMenuContent value="docs">…</NavigationMenuContent>',
                    },
                ],
            },
            {
                name: "NavigationMenuLink",
                category: "molecules",
                description: "Link styled for inside navigation menu content.",
                props: [
                    {
                        name: "href",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Destination URL",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "NavigationMenuLink",
                        description: "In-content navigation link",
                        code: '<NavigationMenuLink href="/guide">Guide</NavigationMenuLink>',
                    },
                ],
            },
            {
                name: "SidebarBrandHeader",
                category: "molecules",
                description:
                    "Brand row for sidebars: logo, wordmark, or collapsed monogram.",
                props: [
                    {
                        name: "brandName",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Product name",
                    },
                    {
                        name: "logoSrc",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Logo image URL",
                    },
                    {
                        name: "collapsed",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Icon/monogram mode",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Sidebar brand",
                        description: "Top of SidebarNavigation",
                        code: '<SidebarBrandHeader brandName="Zabi" />',
                    },
                ],
            },
            {
                name: "SidebarFooter",
                category: "molecules",
                description:
                    "Sidebar footer with profile chip, theme toggle, and logout; wires optional account panel.",
                props: [
                    {
                        name: "profileName",
                        type: "string",
                        required: false,
                        defaultValue: "Zabi",
                        description: "Display name",
                    },
                    {
                        name: "collapsed",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Compact layout",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Sidebar footer",
                        description: "Bottom utilities on a rail",
                        code: "<SidebarFooter />",
                    },
                ],
            },
            {
                name: "SidebarNavSection",
                category: "molecules",
                description:
                    "Grouped list section with optional heading and required list aria-label.",
                props: [
                    {
                        name: "title",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Section heading",
                    },
                    {
                        name: "listAriaLabel",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Accessible name for the <ul>",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Sidebar section",
                        description: "Group primary nav links",
                        code: '<SidebarNavSection title="Workspace" listAriaLabel="Workspace">…</SidebarNavSection>',
                    },
                ],
            },
            {
                name: "ComponentDemo",
                category: "molecules",
                description:
                    "Doc helper: Card with title, preview/code toggle, and syntax-highlighted snippet.",
                props: [
                    {
                        name: "title",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Example title",
                    },
                    {
                        name: "code",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Source shown in code view",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Component demo",
                        description: "Used throughout this docs site",
                        code: "<ComponentDemo title=\"…\" code=\"…\">preview</ComponentDemo>",
                    },
                ],
            },
            {
                name: "SortableList",
                category: "molecules",
                description:
                    "Reorderable list with a drag handle, arrow-key and button reordering, and a live announcement of each move.",
                props: [
                    {
                        name: "items",
                        type: "T[]",
                        required: true,
                        description:
                            "The items, in order. Bindable.",
                    },
                    {
                        name: "getKey",
                        type: "(item: T) => string | number",
                        required: true,
                        description:
                            "Stable identity of an item. Rows are keyed by it.",
                    },
                    {
                        name: "getLabel",
                        type: "(item: T) => string",
                        required: true,
                        description:
                            "Name of an item, used in the button names and the announcements.",
                    },
                    {
                        name: "item",
                        type: "Snippet<[T, SortableListRow]>",
                        required: true,
                        description:
                            "Content of one row. The second argument carries index, dragging, disabled, and the handle and moveButtons snippets.",
                    },
                    {
                        name: "onreorder",
                        type: "(detail: { item: T; from: number; to: number; items: T[] }) => void",
                        required: false,
                        description:
                            "Runs once per move, after items has the new order.",
                    },
                    {
                        name: "controls",
                        type: "'auto' | 'manual'",
                        required: false,
                        defaultValue: "auto",
                        description:
                            "auto lays out handle, content and move buttons in a row. manual renders only your snippet, which places row.handle and row.moveButtons itself. Put them beside a header toggle, never inside another button or link. Their clicks do not bubble, so a clickable header around them is not toggled.",
                    },
                    {
                        name: "showMoveButtons",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description:
                            "Shows the move up and move down buttons when controls is auto.",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Disables every handle and move button.",
                    },
                    {
                        name: "isItemDisabled",
                        type: "(item: T) => boolean",
                        required: false,
                        description:
                            "Disables one item's own controls. Other items can still move past it.",
                    },
                    {
                        name: "strings",
                        type: "Partial<SortableListStrings>",
                        required: false,
                        description:
                            "Overrides for the built-in strings: handleLabel, handleDescription, moveUp, moveDown, moved, cancelled, atStart and atEnd.",
                    },
                    {
                        name: "listClass",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Extra classes for the ul, for example a different gap.",
                    },
                    {
                        name: "aria-label",
                        type: "string",
                        required: false,
                        description:
                            "Accessible name of the list. Use this or aria-labelledby.",
                    },
                    {
                        name: "aria-labelledby",
                        type: "string",
                        required: false,
                        description:
                            "Id of the element that names the list.",
                    },
                ],
                variants: [
                    "auto",
                    "manual",
                    "disabled",
                ],
                examples: [
                    {
                        title: "Basic list",
                        description:
                            "Drag the handle, press the arrow keys on it, or use the move buttons",
                        code: `<script lang="ts">
    import { SortableList } from "zabi-components";

    let steps = $state([
        { id: "details", title: "Your details" },
        { id: "plan", title: "Choose a plan" },
        { id: "payment", title: "Payment" },
    ]);
</script>

<SortableList
    bind:items={steps}
    getKey={(step) => step.id}
    getLabel={(step) => step.title}
    aria-label="Checkout steps"
>
    {#snippet item(step, row)}
        <div class="rounded-control border border-border bg-surface-raised px-3 py-1 text-sm">
            {row.index + 1}. {step.title}
        </div>
    {/snippet}
</SortableList>`,
                    },
                    {
                        title: "Cards with the handle in the header",
                        description:
                            "Manual controls, a disabled item, and the reorder callback",
                        code: `<SortableList
    bind:items={sections}
    getKey={(section) => section.id}
    getLabel={(section) => section.title}
    isItemDisabled={(section) => section.locked}
    onreorder={({ item, from, to }) => save(item.id, from, to)}
    controls="manual"
    listClass="gap-3"
    aria-label="Page sections"
>
    {#snippet item(section, row)}
        <Card fullWidth={true}>
            <div class="flex items-center gap-2">
                {@render row.handle()}
                <p class="flex-1 text-sm font-medium">{section.title}</p>
                {@render row.moveButtons()}
            </div>
            <p class="mt-2 text-sm text-description">{section.summary}</p>
        </Card>
    {/snippet}
</SortableList>`,
                    },
                ],
            },
            {
                name: "Collapsible",
                category: "molecules",
                description:
                    "A trigger wired to a panel it shows and hides, with a built-in header button or your own, alone or as an accordion.",
                props: [
                    {
                        name: "open",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Whether the panel is shown. Bindable.",
                    },
                    {
                        name: "onopenchange",
                        type: "(open: boolean) => void",
                        required: false,
                        description:
                            "Runs when the user toggles the panel, or when a group closes it.",
                    },
                    {
                        name: "title",
                        type: "string",
                        required: false,
                        description:
                            "Text of the default trigger, a full-width header button with a chevron.",
                    },
                    {
                        name: "trigger",
                        type: "Snippet<[CollapsibleTriggerProps, CollapsibleTriggerState]>",
                        required: false,
                        description:
                            "Your own header in place of the default trigger. Spread the first argument on a button; the second carries open and disabled.",
                    },
                    {
                        name: "headingLevel",
                        type: "1 | 2 | 3 | 4 | 5 | 6",
                        required: false,
                        description:
                            "Wraps the default trigger in a heading of that level. No heading when omitted.",
                    },
                    {
                        name: "disabled",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "The trigger cannot be activated. The panel keeps its current state, and a group does not close it.",
                    },
                    {
                        name: "unmountOnClose",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Removes the content while closed. By default it stays in the DOM, hidden, so a form inside keeps its values.",
                    },
                    {
                        name: "region",
                        type: "boolean",
                        required: false,
                        description:
                            "Makes the panel a landmark region. Defaults to true only inside a single-open CollapsibleGroup; otherwise the panel is a named group.",
                    },
                    {
                        name: "triggerClass",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Extra classes for the default trigger button.",
                    },
                    {
                        name: "panelClass",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Extra classes for the panel.",
                    },
                ],
                variants: [
                    "open",
                    "disabled",
                    "trigger",
                    "unmountOnClose",
                ],
                examples: [
                    {
                        title: "Default trigger",
                        description:
                            "A title gives a full-width header button with a chevron, here inside an h3",
                        code: `<script lang="ts">
    import { Collapsible } from "zabi-components";

    let open = $state(false);
</script>

<Collapsible bind:open title="Delivery notes" headingLevel={3}>
    <p class="text-sm text-description">
        Leave parcels with the front desk. The loading bay is closed on weekends.
    </p>
</Collapsible>`,
                    },
                    {
                        title: "Your own header",
                        description:
                            "The trigger snippet puts the wiring on your button, next to the other controls of a section card",
                        code: `<Card fullWidth={true}>
    <Collapsible bind:open panelClass="pt-4">
        {#snippet trigger(props, state)}
            <div class="flex items-center gap-2">
                <h3 class="flex-1 text-sm font-medium">Billing details</h3>
                <Badge text="Draft" />
                <Button variant="outline" size="sm" text="Preview" />
                <button {...props} class="focus-ring size-8 pointer-coarse:min-h-11 pointer-coarse:min-w-11 rounded-control" aria-label="Billing details">
                    <ChevronDown size={16} aria-hidden="true" class={state.open ? "rotate-180" : ""} />
                </button>
            </div>
        {/snippet}
        <Input label="Invoice reference" placeholder="PO-2041" />
        <!-- Closing from inside the panel moves focus to the trigger. -->
        <Button size="sm" onclick={() => (open = false)}>Save and close</Button>
    </Collapsible>
</Card>`,
                    },
                    {
                        title: "Error details",
                        description:
                            "A small text trigger for the details of an error, with the content removed while closed",
                        code: `<p class="text-sm font-medium">The import stopped at row 214.</p>
<Collapsible unmountOnClose>
    {#snippet trigger(props, state)}
        <Button {...props} variant="link" size="sm">
            Details
            <ChevronDown size={16} aria-hidden="true" class={state.open ? "rotate-180" : ""} />
        </Button>
    {/snippet}
    <pre class="text-sm text-description">{error.detail}</pre>
</Collapsible>`,
                    },
                ],
            },
            {
                name: "CollapsibleGroup",
                category: "molecules",
                description:
                    "Coordinates the Collapsibles inside it as an accordion: one open at a time, or several, with arrow keys between the headers.",
                props: [
                    {
                        name: "multiple",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Lets several panels be open at once. By default opening one closes the others, except a disabled panel, which keeps its state.",
                    },
                ],
                variants: ["multiple"],
                examples: [
                    {
                        title: "Accordion",
                        description:
                            "Opening one panel closes the others, and the arrow keys move between the headers",
                        code: `<script lang="ts">
    import { Collapsible, CollapsibleGroup } from "zabi-components";
</script>

<CollapsibleGroup class="gap-1">
    {#each questions as question (question.id)}
        <Collapsible title={question.title} headingLevel={3}>
            <p class="text-sm text-description">{question.answer}</p>
        </Collapsible>
    {/each}
</CollapsibleGroup>`,
                    },
                    {
                        title: "Several open at once",
                        description:
                            "With multiple the panels are independent, and two of them start open",
                        code: `<CollapsibleGroup multiple class="gap-1">
    {#each questions as question, index (question.id)}
        <Collapsible title={question.title} headingLevel={3} open={index < 2}>
            <p class="text-sm text-description">{question.answer}</p>
        </Collapsible>
    {/each}
</CollapsibleGroup>`,
                    },
                ],
            },
            {
                name: "ConfirmDialog",
                category: "molecules",
                description:
                    "A modal that asks before an action, with danger, warning and info variants and a loading state that blocks closing.",
                props: [
                    {
                        name: "open",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Whether the dialog is shown. Bindable.",
                    },
                    {
                        name: "title",
                        type: "string",
                        required: true,
                        description:
                            "The question, as the dialog's heading and accessible name.",
                    },
                    {
                        name: "message",
                        type: "string",
                        required: false,
                        description:
                            "What will happen. It is the dialog's accessible description. Use children for richer content below it.",
                    },
                    {
                        name: "variant",
                        type: "'danger' | 'warning' | 'info'",
                        required: false,
                        defaultValue: "info",
                        description:
                            "danger makes the confirm button the danger button. Each variant has its own icon.",
                    },
                    {
                        name: "confirmLabel",
                        type: "string",
                        required: false,
                        defaultValue: "Confirm",
                        description: "Text of the confirm button. Name the action.",
                    },
                    {
                        name: "cancelLabel",
                        type: "string",
                        required: false,
                        defaultValue: "Cancel",
                        description: "Text of the cancel button.",
                    },
                    {
                        name: "onconfirm",
                        type: "() => void | boolean | Promise<void | boolean>",
                        required: false,
                        description:
                            "Runs on confirm. The dialog then closes, unless this returns or resolves to false, throws or rejects. A promise shows the loading state until it settles.",
                    },
                    {
                        name: "oncancel",
                        type: "(detail: { reason: 'cancel-button' | 'escape' | 'backdrop' | 'close-button' }) => void",
                        required: false,
                        description:
                            "Runs when the user backs out, with how they did it.",
                    },
                    {
                        name: "onerror",
                        type: "(error: unknown) => void",
                        required: false,
                        description:
                            "Runs when the promise from onconfirm rejects; the dialog stays open. Without it the error goes to the global error handler.",
                    },
                    {
                        name: "loading",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Shows the confirm button's loading state, disables cancel and blocks Escape and the backdrop. Set by the dialog itself while a promise is pending.",
                    },
                    {
                        name: "loadingLabel",
                        type: "string",
                        required: false,
                        defaultValue: "Working…",
                        description:
                            "Announced to assistive technology once when loading starts. It is not shown; the spinner is the visual.",
                    },
                    {
                        name: "portal",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description:
                            "Renders in document.body so a transformed or clipped ancestor cannot trap the dialog. Pass false to render in place. The theme class belongs on html or body; set lower, it does not reach a portalled dialog.",
                    },
                ],
                variants: ["danger", "warning", "info", "loading"],
                examples: [
                    {
                        title: "Destructive action",
                        description:
                            "The handler returns a promise, so the dialog shows its loading state and closes when the request is done",
                        code: `<script lang="ts">
    import { Button, ConfirmDialog } from "zabi-components";

    let open = $state(false);
</script>

<Button variant="danger" onclick={() => (open = true)}>Delete project</Button>

<ConfirmDialog
    bind:open
    variant="danger"
    title="Delete this project?"
    message="The project and its files are removed for everyone. This cannot be undone."
    confirmLabel="Delete"
    onconfirm={() => api.deleteProject(project.id)}
/>`,
                    },
                    {
                        title: "Plain confirmation",
                        description:
                            "The info variant with its own labels and a line of extra content",
                        code: `<ConfirmDialog
    bind:open
    title="Publish this page?"
    message="It becomes visible to everyone with the link."
    confirmLabel="Publish"
    cancelLabel="Not now"
    onconfirm={() => publish(page)}
>
    <p class="text-description">You can unpublish it again at any time.</p>
</ConfirmDialog>`,
                    },
                    {
                        title: "A request that fails",
                        description:
                            "When the promise rejects the dialog stays open and onerror receives the error to show inside it",
                        code: `<ConfirmDialog
    bind:open
    variant="warning"
    title="Transfer ownership?"
    message="You keep access as a member, and only the new owner can undo this."
    confirmLabel="Transfer"
    onconfirm={transferOwnership}
    onerror={(error) => (failure = error.message)}
    oncancel={() => (failure = "")}
>
    {#if failure}
        <Alert variant="error" message={failure} />
    {/if}
</ConfirmDialog>`,
                    },
                ],
            },
            {
                name: "Drawer",
                category: "molecules",
                description:
                    "A modal panel that slides in from the left or right edge, with a focus trap and the scroll lock shared with Modal and SlideUp.",
                props: [
                    {
                        name: "isOpen",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Whether the drawer is shown. Bindable.",
                    },
                    {
                        name: "title",
                        type: "string",
                        required: true,
                        description: "Heading of the drawer, and its accessible name.",
                    },
                    {
                        name: "description",
                        type: "string",
                        required: false,
                        description:
                            "A line under the title. It is the dialog's accessible description.",
                    },
                    {
                        name: "side",
                        type: "'left' | 'right' | 'start' | 'end'",
                        required: false,
                        defaultValue: "right",
                        description:
                            "The edge the drawer slides in from. left and right are physical; start and end follow the writing direction.",
                    },
                    {
                        name: "size",
                        type: "'sm' | 'md' | 'lg'",
                        required: false,
                        defaultValue: "md",
                        description:
                            "Panel width: 20rem, 28rem or 42rem. Never wider than the screen.",
                    },
                    {
                        name: "footer",
                        type: "Snippet",
                        required: false,
                        description:
                            "Pinned to the bottom of the panel, below the scrolling content.",
                    },
                    {
                        name: "portal",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description:
                            "Renders in document.body so a transformed or clipped ancestor cannot trap the drawer. Pass false to render in place. The theme class belongs on html or body; set lower, it does not reach a portalled drawer.",
                    },
                    {
                        name: "dismissible",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description:
                            "When false, Escape, a backdrop click and the close button do not close the drawer. Setting isOpen yourself still does.",
                    },
                    {
                        name: "onclose",
                        type: "(detail: { reason: 'escape' | 'backdrop' | 'close-button' }) => void",
                        required: false,
                        description:
                            "Runs when the drawer closes itself, with what the user did.",
                    },
                    {
                        name: "closeLabel",
                        type: "string",
                        required: false,
                        defaultValue: "Close",
                        description: "Accessible name of the close button.",
                    },
                    {
                        name: "initialFocus",
                        type: "string",
                        required: false,
                        description:
                            "CSS selector, inside the panel, of the control that takes focus on open. Without a match the first control does: the close button.",
                    },
                    {
                        name: "onkeydown",
                        type: "(event: KeyboardEvent) => void",
                        required: false,
                        description:
                            "Hears every keydown in the drawer, after the drawer has handled Escape. The Tab cycle is kept either way.",
                    },
                ],
                variants: ["left", "right", "start", "end", "sm", "md", "lg"],
                examples: [
                    {
                        title: "Project picker",
                        description:
                            "From the right edge, with the search field taking the initial focus through initialFocus",
                        code: `<script lang="ts">
    import { Button, Drawer, Input } from "zabi-components";

    let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Choose project</Button>

<Drawer
    bind:isOpen={open}
    title="Choose a project"
    description="The page moves to the project you pick."
    initialFocus="#project-search"
    onclose={({ reason }) => console.log(reason)}
>
    <Input id="project-search" label="Search projects" bind:value={search} />
    <ProjectList {search} onpick={() => (open = false)} />
    {#snippet footer()}
        <Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
    {/snippet}
</Drawer>`,
                    },
                    {
                        title: "From the start edge",
                        description:
                            "A narrow drawer on the side where reading starts: the left, or the right in a right-to-left page",
                        code: `<Drawer bind:isOpen={open} title="Filters" side="start" size="sm">
    <Checkbox label="Published" checked />
    <Checkbox label="Drafts" />
    <Checkbox label="Archived" />
    {#snippet footer()}
        <Button onclick={() => (open = false)}>Show results</Button>
    {/snippet}
</Drawer>`,
                    },
                    {
                        title: "With other overlays",
                        description:
                            "Opened from a modal, and opening a modal of its own: Escape closes the topmost one and focus goes back a step at a time",
                        code: `<Modal bind:isOpen={editOpen} title="Edit page" portal>
    <Button onclick={() => (pickerOpen = true)}>Move to project</Button>
</Modal>

<Drawer bind:isOpen={pickerOpen} title="Choose a project">
    <ProjectList />
    <Button variant="outline" onclick={() => (newOpen = true)}>New project</Button>
    <Modal bind:isOpen={newOpen} title="New project" portal>
        <Input label="Project name" />
    </Modal>
</Drawer>`,
                    },
                    {
                        title: "Text that scrolls",
                        description:
                            "With nothing to focus in the content, the scrolling area itself takes focus so the arrow keys can scroll it",
                        code: `<Drawer bind:isOpen={open} title="Release notes" size="sm">
    {#each notes as note (note.version)}
        <h3 class="mt-4 text-sm font-medium text-headline">{note.version}</h3>
        <p class="mt-1 text-sm text-description">{note.text}</p>
    {/each}
</Drawer>`,
                    },
                ],
            },
            {
                name: "UnsavedChangesBar",
                category: "molecules",
                description:
                    "Sticky bar shown while a form has unsaved changes, with Save and Discard and a saving state.",
                props: [
                    {
                        name: "dirty",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Shows the bar. Set it while the form differs from what is saved.",
                    },
                    {
                        name: "message",
                        type: "string",
                        required: false,
                        defaultValue: "You have unsaved changes",
                        description:
                            "Shown in the bar, and announced once when it appears.",
                    },
                    {
                        name: "saveLabel",
                        type: "string",
                        required: false,
                        defaultValue: "Save",
                        description:
                            "Text of the save button.",
                    },
                    {
                        name: "discardLabel",
                        type: "string",
                        required: false,
                        defaultValue: "Discard",
                        description:
                            "Text of the discard button.",
                    },
                    {
                        name: "onsave",
                        type: "() => void | Promise<unknown>",
                        required: false,
                        description:
                            "Runs when Save is activated. Return a promise to keep the saving state until it settles. The bar does not hide itself: clear dirty once the save has gone through.",
                    },
                    {
                        name: "ondiscard",
                        type: "() => void",
                        required: false,
                        description:
                            "Runs when Discard is activated.",
                    },
                    {
                        name: "saving",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Save shows its loading state and Discard is disabled. Set by the bar itself while a promise from onsave is pending.",
                    },
                    {
                        name: "onerror",
                        type: "(error: unknown) => void",
                        required: false,
                        description:
                            "Runs when the promise from onsave rejects; the bar stays. Without it the error goes to the global error handler.",
                    },
                    {
                        name: "position",
                        type: "'bottom' | 'top'",
                        required: false,
                        defaultValue: "bottom",
                        description:
                            "Which edge of its scroll container the bar sticks to. It is sticky, not fixed: put it after the last field, or before the first.",
                    },
                    {
                        name: "actions",
                        type: "Snippet",
                        required: false,
                        description:
                            "Extra buttons, placed before Discard.",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        defaultValue: "Unsaved changes",
                        description:
                            "Accessible name of the bar as a landmark.",
                    },
                ],
                variants: [
                    "bottom",
                    "top",
                    "saving",
                ],
                examples: [
                    {
                        title: "After a form",
                        description:
                            "Change a field to bring the bar in. Save waits for the request; Discard restores",
                        code: `<script lang="ts">
    import { Input, UnsavedChangesBar } from "zabi-components";

    let saved = $state({ name: "Ada Lovelace" });
    let draft = $state({ ...saved });
    const dirty = $derived(JSON.stringify(draft) !== JSON.stringify(saved));

    async function save() {
        await api.save(draft);
        saved = { ...draft };
    }
</script>

<form>
    <Input label="Name" bind:value={draft.name} />
    <UnsavedChangesBar
        {dirty}
        onsave={save}
        ondiscard={() => (draft = { ...saved })}
    />
</form>`,
                    },
                    {
                        title: "At the top, with an extra action and a failing save",
                        description:
                            "A rejected save keeps the bar and reports through onerror",
                        code: `<UnsavedChangesBar
    dirty={title !== savedTitle}
    position="top"
    message="This page has changes that are not published"
    saveLabel="Publish"
    onsave={publish}
    ondiscard={() => (title = savedTitle)}
    onerror={(error) => (failure = error.message)}
>
    {#snippet actions()}
        <Button variant="secondary" onclick={saveDraft}>Save as draft</Button>
    {/snippet}
</UnsavedChangesBar>`,
                    },
                ],
            },
            {
                name: "AppBar",
                category: "molecules",
                description:
                    "Top bar for a phone screen with a title, a back control and up to two actions; can hide while the page scrolls.",
                props: [
                    {
                        name: "title",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "The name of the screen, rendered as a heading. Wraps to two lines before it is cut.",
                    },
                    {
                        name: "headingLevel",
                        type: "1 | 2 | 3 | 4 | 5 | 6",
                        required: false,
                        defaultValue: "1",
                        description:
                            "Heading level of the title. 1 when the bar names the page.",
                    },
                    {
                        name: "backHref",
                        type: "string",
                        required: false,
                        description:
                            "Shows the back control as a link to this address.",
                    },
                    {
                        name: "onback",
                        type: "(event: MouseEvent) => void",
                        required: false,
                        description:
                            "Runs when the back control is activated. On its own it makes the control a button; with backHref it runs before the link is followed, and event.preventDefault() stops that.",
                    },
                    {
                        name: "backLabel",
                        type: "string",
                        required: false,
                        defaultValue: "Back",
                        description:
                            "Accessible name of the back control.",
                    },
                    {
                        name: "collapseOnScroll",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description:
                            "Hides the bar while the page scrolls down and brings it back when it scrolls up. Follows the nearest scrolling ancestor (the one in AppShell) or the window. Never hides while keyboard focus is inside it, and keyboard focus brings it back; focus left by a tap or click does not hold it. No animation under reduced motion.",
                    },
                    {
                        name: "actions",
                        type: "Snippet",
                        required: false,
                        description:
                            "After the title. At most two icon buttons, at size lg so each is a 48px target; put anything more in a menu. The limit is not enforced.",
                    },
                    {
                        name: "leading",
                        type: "Snippet",
                        required: false,
                        description:
                            "Before the title, after the back control: a logo or an avatar.",
                    },
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Extra classes for the header element. The bar is sticky at the top; pass static to let it scroll with the page.",
                    },
                ],
                variants: [
                    "collapseOnScroll",
                ],
                examples: [
                    {
                        title: "Title, back and two actions",
                        description:
                            "A header landmark with the title as a heading. The back control and each action are 48px targets",
                        code: `<script lang="ts">
    import { AppBar, IconButton } from "zabi-components";
    import { EllipsisVertical, Share2 } from "@lucide/svelte";
</script>

<AppBar title="Round 3" backHref="/quiz">
    {#snippet actions()}
        <IconButton variant="ghost" size="lg" label="Share" onclick={share}>
            <Share2 size={20} />
        </IconButton>
        <IconButton variant="ghost" size="lg" label="More" onclick={openMenu}>
            <EllipsisVertical size={20} />
        </IconButton>
    {/snippet}
</AppBar>`,
                    },
                    {
                        title: "Collapses on scroll",
                        description:
                            "Scroll down and the bar slides away; scroll up a little and it is back. Tab to the back control and it returns too",
                        code: `<AppBar title="Questions" backHref="/quiz" collapseOnScroll />`,
                    },
                ],
            },
            {
                name: "BottomTabBar",
                category: "molecules",
                description:
                    "Navigation bar at the bottom of a phone screen: three to five links, each an icon over a short label, with optional counts.",
                props: [
                    {
                        name: "items",
                        type: "BottomTabBarItem[]",
                        required: true,
                        description:
                            "Three to five destinations, each { href, label, icon, badge? }. icon is a component such as a lucide icon; badge is a count. A development build warns outside three to five.",
                    },
                    {
                        name: "active",
                        type: "string",
                        required: false,
                        defaultValue: "the current page",
                        description:
                            "The href of the active tab, or the path of the current page: the tab for that page or the closest one above it gets aria-current. Left out, the bar reads the address in the browser; in SvelteKit pass page.url.pathname so the server marks it too.",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        defaultValue: "Main",
                        description:
                            "Accessible name of the navigation landmark.",
                    },
                    {
                        name: "badgeLabel",
                        type: "(count: number, item: BottomTabBarItem) => string",
                        required: false,
                        defaultValue: "(count) => `${count} new`",
                        description:
                            "What a badge adds to the tab's accessible name, after the label and a comma: Inbox, 3 new. Replace it to translate or to say what is counted.",
                    },
                    {
                        name: "badgeMax",
                        type: "number",
                        required: false,
                        defaultValue: "99",
                        description:
                            "Counts above this show as 99+. The accessible name keeps the real count.",
                    },
                    {
                        name: "position",
                        type: "'fixed' | 'static'",
                        required: false,
                        defaultValue: "fixed (static inside AppShell)",
                        description:
                            "fixed pins the bar to the bottom of the screen; static leaves it where it is in the page. AppShell places the bar itself. A fixed bar on its own lies over the page: give the page padding-bottom and scroll-padding-bottom of the bar's height, calc(4rem + 1px + env(safe-area-inset-bottom)) by default, so the last content and a focused field are not under it.",
                    },
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Extra classes for the nav element, for example md:hidden to show the bar on phones only.",
                    },
                ],
                variants: [
                    "fixed",
                    "static",
                ],
                examples: [
                    {
                        title: "Marks the current page",
                        description:
                            "With no active tab passed, the bar marks the section this page is in. A page below a tab keeps that tab marked",
                        code: `<script lang="ts">
    import { BottomTabBar } from "zabi-components";
    import { BookOpen, House, LayoutGrid } from "@lucide/svelte";
    import { page } from "$app/state";

    const items = [
        { href: "/", label: "Home", icon: House },
        { href: "/components", label: "Components", icon: LayoutGrid },
        { href: "/docs", label: "Docs", icon: BookOpen },
    ];
</script>

<!-- In SvelteKit, pass the path so the server marks the tab too. -->
<BottomTabBar {items} active={page.url.pathname} />`,
                    },
                    {
                        title: "Five tabs with counts",
                        description:
                            "A count is part of the name of its link, in words you choose. Pressing the active tab changes nothing",
                        code: `<BottomTabBar
    items={[
        { href: "/home", label: "Home", icon: House },
        { href: "/quiz", label: "Quiz", icon: Trophy },
        { href: "/teams", label: "Teams", icon: Users },
        { href: "/inbox", label: "Inbox", icon: Bell, badge: 3 },
        { href: "/me", label: "Me", icon: User, badge: 120 },
    ]}
    active={page.url.pathname}
    badgeLabel={(count) => (count === 1 ? "1 unread" : \`\${count} unread\`)}
/>`,
                    },
                ],
            },
            {
                name: "BottomSheet",
                category: "molecules",
                description:
                    "Modal panel that slides up from the bottom for pickers, filters and short forms, and rests at half or full height.",
                props: [
                    {
                        name: "isOpen",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Open state. Bindable.",
                    },
                    {
                        name: "title",
                        type: "string",
                        required: true,
                        description:
                            "Heading of the sheet, and its accessible name.",
                    },
                    {
                        name: "description",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Shown under the title and read out with the dialog.",
                    },
                    {
                        name: "snapPoints",
                        type: "Array<'half' | 'full'>",
                        required: false,
                        defaultValue: "['half', 'full']",
                        description:
                            "The heights the sheet can rest at: half of the screen, or full, down from the status bar. With one, the grip only drags.",
                    },
                    {
                        name: "snap",
                        type: "'half' | 'full'",
                        required: false,
                        defaultValue: "the lowest snap point",
                        description:
                            "The snap point the sheet is at. Bindable: it follows a drag and the grip, and you can set it.",
                    },
                    {
                        name: "dismissible",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description:
                            "When false, Escape, the backdrop, the close button and a swipe down do not close the sheet. The grip still moves it between snap points, and setting isOpen yourself still closes it.",
                    },
                    {
                        name: "onclose",
                        type: "({ reason }) => void",
                        required: false,
                        description:
                            "Runs when the sheet closes itself. reason is escape, backdrop, close-button or swipe.",
                    },
                    {
                        name: "portal",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description:
                            "Renders the overlay in document.body, so an ancestor with a transform or clipped overflow cannot trap it. Pass false to render in place.",
                    },
                    {
                        name: "initialFocus",
                        type: "string",
                        required: false,
                        description:
                            "CSS selector, looked up inside the sheet, of the control that takes focus on open. Without it, or with no match, the first control does: the grip, or the close button. For a form or a picker, point it at the first field.",
                    },
                    {
                        name: "closeLabel",
                        type: "string",
                        required: false,
                        defaultValue: "Close",
                        description:
                            "Accessible name of the close button, for translation.",
                    },
                    {
                        name: "expandLabel",
                        type: "string",
                        required: false,
                        defaultValue: "Expand",
                        description:
                            "Accessible name of the grip while pressing it takes the sheet up a step.",
                    },
                    {
                        name: "collapseLabel",
                        type: "string",
                        required: false,
                        defaultValue: "Collapse",
                        description:
                            "Accessible name of the grip while pressing it takes the sheet down a step.",
                    },
                    {
                        name: "footer",
                        type: "Snippet",
                        required: false,
                        description:
                            "Pinned to the bottom of the sheet, below the scrolling content: the buttons of a form or a picker. The sheet does not follow the on-screen keyboard: at half height a real keyboard may cover the footer (not verified on a device), so open a sheet with fields at full height.",
                    },
                    {
                        name: "onkeydown",
                        type: "(event: KeyboardEvent) => void",
                        required: false,
                        description:
                            "Hears every keydown in the sheet, after the sheet has handled Escape. The Tab cycle is kept either way.",
                    },
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Extra classes for the dialog panel. From the md breakpoint up the panel stays attached to the bottom edge, centred and at most 40rem wide.",
                    },
                ],
                variants: [
                    "snapPoints",
                    "dismissible",
                ],
                examples: [
                    {
                        title: "A picker with two heights",
                        description:
                            "Drag the grip between half and full, or press it. Drag or flick it down past half to close. A swipe on the list scrolls the list, and moves the sheet only from the top of the list",
                        code: `<script lang="ts">
    import { BottomSheet, Button } from "zabi-components";

    let open = $state(false);
    let snap = $state<"half" | "full">("half");
</script>

<Button onclick={() => (open = true)}>Choose a team</Button>

<BottomSheet
    bind:isOpen={open}
    bind:snap
    title="Choose a team"
    onclose={({ reason }) => console.log(reason)}
>
    <ul>…</ul>
    {#snippet footer()}
        <Button onclick={() => (open = false)}>Done</Button>
    {/snippet}
</BottomSheet>`,
                    },
                    {
                        title: "A short form at one height",
                        description:
                            "One snap point, so the grip only drags. Focus starts in the field, and the buttons stay pinned under it",
                        code: `<BottomSheet
    bind:isOpen={open}
    title="Rename team"
    snapPoints={["half"]}
    initialFocus="#team-name"
    closeLabel="Cancel"
>
    <Input id="team-name" label="Team name" bind:value={name} />
    {#snippet footer()}
        <Button variant="ghost" onclick={() => (open = false)}>Cancel</Button>
        <Button onclick={save}>Save</Button>
    {/snippet}
</BottomSheet>`,
                    },
                ],
            },
            {
                name: "StickyActionBar",
                category: "molecules",
                description:
                    "Bar that keeps a form's main button at the bottom of the screen and above the on-screen keyboard.",
                props: [
                    {
                        name: "children",
                        type: "Snippet",
                        required: false,
                        description:
                            "The main action, and at most one or two beside it. They are laid out at the end of the bar and wrap when they do not fit.",
                    },
                    {
                        name: "label",
                        type: "string",
                        required: false,
                        description:
                            "Accessible name. With it the bar is a group, so a screen reader says what the buttons belong to.",
                    },
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Extra classes. The bar is sticky at the bottom of its scrolling ancestor: put it after the last field, and make a short form a full-height column (flex min-h-full flex-col) so the bar is at the bottom of the screen. While mounted it sets scroll-padding-bottom on that ancestor, so a focused field is not left under it. Use one bar per scrolling box.",
                    },
                    {
                        name: "style",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Added after the bottom offset and margin the bar sets while the keyboard is up. Where the keyboard covers the page (iOS Safari, Chrome on Android) the bar rises by the part of its scrolling box that the keyboard covers, read from window.visualViewport, never out of that box, and the content gains that much room to scroll.",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "After a form",
                        description:
                            "The button stays in view while the form scrolls, and the last field can be scrolled clear of it. On a phone it rides above the keyboard",
                        code: `<script lang="ts">
    import { Button, Input, StickyActionBar } from "zabi-components";
</script>

<!-- A column as tall as the screen: the bar is at the bottom of it even
     when the fields end sooner. -->
<form class="flex min-h-full flex-col" onsubmit={save}>
    <div class="space-y-4 p-4">
        <Input label="Place" bind:value={visit.place} />
        <Input label="Team" bind:value={visit.team} />
        …
    </div>
    <StickyActionBar>
        <Button type="submit" size="lg" fullWidth>Save visit</Button>
    </StickyActionBar>
</form>`,
                    },
                    {
                        title: "A form screen in AppShell",
                        description:
                            "A form is a task of its own: leave the tab bar out and let the action bar be the bottom of the screen. UnsavedChangesBar is the bar to use when Save should appear only once something has changed",
                        code: `<AppShell>
    {#snippet header()}
        <AppBar title="New visit" backHref="/visits" />
    {/snippet}

    <form class="flex min-h-full flex-col" onsubmit={save}>
        <div class="space-y-4 p-4">…</div>
        <StickyActionBar label="Visit">
            <Button variant="ghost" size="lg" onclick={saveDraft}>Save draft</Button>
            <Button type="submit" size="lg">Save visit</Button>
        </StickyActionBar>
    </form>
</AppShell>`,
                    },
                    {
                        title: "In a scrolling box of its own",
                        description:
                            "The bar belongs to the nearest box that scrolls, here the content of a sheet, and stays inside it: with the keyboard up it rises only by the part of that box the keyboard covers. Use one bar per scrolling box. For a sheet's own buttons its footer is simpler",
                        code: `<BottomSheet bind:isOpen={open} title="Add a visit" snapPoints={["half"]}>
    <form class="flex min-h-full flex-col" onsubmit={save}>
        <div class="space-y-4 pb-4">…</div>
        <!-- The negative side margins undo the sheet's padding. -->
        <StickyActionBar class="-mx-4">
            <Button type="submit" size="lg" fullWidth>Save visit</Button>
        </StickyActionBar>
    </form>
</BottomSheet>`,
                    },
                ],
            },
            {
                name: "Calendar",
                category: "molecules",
                description:
                    "Month grid that marks today and the days with events, for picking a day and listing what happens on it.",
                props: [
                    {
                        name: "month",
                        type: "string",
                        required: false,
                        defaultValue: "the month of selected, or of today",
                        description:
                            "The month shown, as YYYY-MM. Bindable. On the server, with neither month nor selected, it is the current month in UTC: pass month to decide it yourself.",
                    },
                    {
                        name: "selected",
                        type: "string | null",
                        required: false,
                        defaultValue: "null",
                        description:
                            "The selected day, as YYYY-MM-DD, or null. Bindable. Pressing the selected day again changes nothing.",
                    },
                    {
                        name: "events",
                        type: "Array<{ date, label, tone? }>",
                        required: false,
                        defaultValue: "[]",
                        description:
                            "What happens on which day: date as YYYY-MM-DD, a label, and a tone of default, success, warning, danger or accent for the dot. A day shows a dot per event, three at most; its name counts and lists them all.",
                    },
                    {
                        name: "weekStartsOn",
                        type: "number",
                        required: false,
                        defaultValue: "1",
                        description:
                            "First day of the week: 0 for Sunday to 6 for Saturday.",
                    },
                    {
                        name: "locale",
                        type: "string",
                        required: false,
                        defaultValue: "the page's language",
                        description:
                            "Language of the month and day names, as a BCP 47 tag such as sv or en-GB. Left out, it is the lang of the html element, then the browser's; on the server it is English, so pass it when you render on the server.",
                    },
                    {
                        name: "min",
                        type: "string",
                        required: false,
                        description:
                            "Earliest day that can be selected, as YYYY-MM-DD. Earlier days are unavailable and earlier months cannot be reached.",
                    },
                    {
                        name: "max",
                        type: "string",
                        required: false,
                        description:
                            "Latest day that can be selected, as YYYY-MM-DD.",
                    },
                    {
                        name: "isDateDisabled",
                        type: "(date: string) => boolean",
                        required: false,
                        description:
                            "Return true for a day that cannot be selected. It can still be focused and read.",
                    },
                    {
                        name: "strings",
                        type: "Partial<CalendarStrings>",
                        required: false,
                        description:
                            "The words the calendar says: previousMonth, nextMonth, today, selected, unavailable, and events, a function from a day's events to the text read out for them.",
                    },
                    {
                        name: "onselect",
                        type: "(date: string) => void",
                        required: false,
                        description:
                            "Runs with the day when the user selects another one.",
                    },
                    {
                        name: "onmonthchange",
                        type: "(month: string) => void",
                        required: false,
                        description:
                            "Runs with the month when the user moves to another one, with the buttons or the keyboard.",
                    },
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Extra classes for the host element. The calendar is as wide as its container: give it a width where the container is wide.",
                    },
                ],
                variants: [
                    "selected",
                    "events",
                    "min",
                    "max",
                ],
                examples: [
                    {
                        title: "Days with events, and the selected day's list",
                        description:
                            "In Swedish, weeks from Monday. A day shows a dot per event, three at most. Press a day and its events are listed below; press it again and nothing changes. The arrow keys move between days and on into the next month",
                        code: `<script lang="ts">
    import { Calendar, type CalendarEvent } from "zabi-components";

    const events: CalendarEvent[] = [
        { date: "2026-10-06", label: "Quiz på The Crown" },
        { date: "2026-10-06", label: "Musikquiz", tone: "accent" },
        { date: "2026-10-10", label: "Lagträff", tone: "success" },
    ];

    let month = $state("2026-10");
    let selected = $state<string | null>("2026-10-06");
    const dayEvents = $derived(events.filter((event) => event.date === selected));
</script>

<Calendar
    bind:month
    bind:selected
    {events}
    locale="sv"
    strings={{
        previousMonth: "Föregående månad",
        nextMonth: "Nästa månad",
        today: "i dag",
        selected: "vald",
        events: (list) => \`\${list.length} händelser: \${list.map((event) => event.label).join(", ")}\`,
    }}
/>

<ul>
    {#each dayEvents as event}
        <li>{event.label}</li>
    {/each}
</ul>`,
                    },
                    {
                        title: "Limits, closed days and weeks from Sunday",
                        description:
                            "Days before min and after max are unavailable and the months beyond them cannot be reached; isDateDisabled closes single days, here every Monday. Unavailable days can still be focused and read",
                        code: `<Calendar
    bind:selected
    locale="en-GB"
    weekStartsOn={0}
    min="2026-10-05"
    max="2026-11-20"
    isDateDisabled={(date) => new Date(\`\${date}T00:00:00Z\`).getUTCDay() === 1}
    onselect={(date) => book(date)}
/>`,
                    },
                ],
            },
        ],
        organisms: [
            {
                name: "TopNavbar",
                category: "organisms",
                description:
                    "Top bar with brand, optional link list, theme toggle and a responsive mobile menu. Use embedded for a link-only strip inside your own header.",
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
                        description:
                            "Built-in nav links (ignored when a nav snippet is provided). Absolute URLs open in a new tab and are marked; set external on an item to force or prevent that.",
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
                        description: "Render only the link list (or nav snippet) inside a nav landmark",
                    },
                    {
                        name: "currentPath",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Active route for built-in links. The phone menu closes when it changes.",
                    },
                    {
                        name: "collapseAt",
                        type: "'sm' | 'md' | 'lg' | 'xl'",
                        required: false,
                        defaultValue: "md",
                        description:
                            "Breakpoint at which the links move from the phone menu into the bar. Raise it when the row has more items than fit at 768px.",
                    },
                ],
                variants: [
                    "header",
                    "sidebar",
                    "embedded",
                ],
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
                    "Sidebar rail with brand row, grouped links, section labels, badges, collapsed and expanded modes, and an optional card layout.",
                props: [
                    {
                        name: "mode",
                        type: "'expanded' | 'collapsed'",
                        required: false,
                        defaultValue: "expanded",
                        description: "Sidebar display mode",
                    },
                    {
                        name: "layout",
                        type: "'rail' | 'card'",
                        required: false,
                        defaultValue: "rail",
                        description: "Rail attaches to the viewport edge; card is a rounded floating panel on a soft surface",
                    },
                    {
                        name: "items",
                        type: "SidebarNavigationItem[]",
                        required: false,
                        defaultValue: "[]",
                        description: "Primary and secondary sidebar items; optional section groups primary rows under headings",
                    },
                    {
                        name: "currentPath",
                        type: "string",
                        required: false,
                        defaultValue: "\u2014",
                        description: "Active route path used for selected styling",
                    },
                    {
                        name: "activePrimaryHref",
                        type: "string",
                        required: false,
                        defaultValue: "\u2014",
                        description: "Parent nav href to highlight when currentPath is a deeper leaf",
                    },
                    {
                        name: "ariaLabel",
                        type: "string",
                        required: false,
                        defaultValue: "Sidebar navigation",
                        description: "Accessible name for the nav landmark",
                    },
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: "\u2014",
                        description: "Extra classes, merged last so they win",
                    },
                    {
                        name: "className",
                        type: "string",
                        required: false,
                        defaultValue: "\u2014",
                        description: "Deprecated alias for class",
                    },
                    {
                        name: "logoSrc",
                        type: "string",
                        required: false,
                        defaultValue: "\u2014",
                        description: "Optional logo image URL",
                    },
                    {
                        name: "logoAlt",
                        type: "string",
                        required: false,
                        defaultValue: "\u2014",
                        description: "Accessible label for the logo image",
                    },
                    {
                        name: "brandName",
                        type: "string",
                        required: false,
                        defaultValue: "\u2014",
                        description: "Optional product name beside the logo",
                    },
                    {
                        name: "showProfile",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description: "Render the account row in the footer",
                    },
                    {
                        name: "profileName",
                        type: "string",
                        required: false,
                        defaultValue: "Zabi",
                        description: "Account display name",
                    },
                    {
                        name: "profileEmail",
                        type: "string",
                        required: false,
                        defaultValue: "hello@zabi.dev",
                        description: "Account secondary line",
                    },
                    {
                        name: "profileInitials",
                        type: "string",
                        required: false,
                        defaultValue: "ZA",
                        description: "Avatar initials fallback",
                    },
                    {
                        name: "showSearch",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description: "Render the search affordance",
                    },
                    {
                        name: "searchMode",
                        type: "'input' | 'button'",
                        required: false,
                        defaultValue: "input",
                        description: "Inline input, or a button that opens your own panel",
                    },
                    {
                        name: "searchPlaceholder",
                        type: "string",
                        required: false,
                        defaultValue: "Search...",
                        description: "Placeholder, and the button label in trigger mode",
                    },
                    {
                        name: "searchValue",
                        type: "string",
                        required: false,
                        defaultValue: "\u2014",
                        description: "Bindable search term; filters items in input mode",
                    },
                    {
                        name: "searchTriggerIcon",
                        type: "Component",
                        required: false,
                        defaultValue: "Command",
                        description: "Trigger icon in button mode or when collapsed",
                    },
                    {
                        name: "searchTriggerVariant",
                        type: "ButtonVariant",
                        required: false,
                        defaultValue: "outline",
                        description: "Button variant for the search trigger",
                    },
                    {
                        name: "searchTriggerSize",
                        type: "SizeVariant",
                        required: false,
                        defaultValue: "sm",
                        description: "Button size for the search trigger",
                    },
                    {
                        name: "showLogout",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description: "Render the logout row",
                    },
                    {
                        name: "logoutLabel",
                        type: "string",
                        required: false,
                        defaultValue: "Logout",
                        description: "Logout row label",
                    },
                    {
                        name: "showThemeToggle",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description: "Render the light/dark toggle",
                    },
                    {
                        name: "lightModeLabel",
                        type: "string",
                        required: false,
                        defaultValue: "Light mode",
                        description: "Theme toggle label",
                    },
                    {
                        name: "isLightMode",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Bindable theme toggle state",
                    },
                    {
                        name: "emptyStateTitle",
                        type: "string",
                        required: false,
                        defaultValue: "Create your first navigation item",
                        description: "Heading when there are no items",
                    },
                    {
                        name: "emptyStateDescription",
                        type: "string",
                        required: false,
                        defaultValue: "Add your first sidebar item so users can start navigating your product.",
                        description: "Body copy when there are no items",
                    },
                    {
                        name: "emptyStateActionLabel",
                        type: "string",
                        required: false,
                        defaultValue: "Add navigation item",
                        description: "Call to action when there are no items",
                    },
                    {
                        name: "onNavigate",
                        type: "(item, event) => void",
                        required: false,
                        defaultValue: "\u2014",
                        description: "Fires on item click; call preventDefault for client routing",
                    },
                    {
                        name: "onSearchClick",
                        type: "() => void",
                        required: false,
                        defaultValue: "\u2014",
                        description: "Fires when the search trigger is pressed (button mode)",
                    },
                    {
                        name: "onLogout",
                        type: "() => void",
                        required: false,
                        defaultValue: "\u2014",
                        description: "Fires when logout is pressed",
                    },
                    {
                        name: "onThemeToggle",
                        type: "(next: boolean) => void",
                        required: false,
                        defaultValue: "\u2014",
                        description: "Fires with the next light-mode value",
                    },
                    {
                        name: "onEmptyStateAction",
                        type: "() => void",
                        required: false,
                        defaultValue: "\u2014",
                        description: "Fires when the empty-state action is pressed",
                    },
                    {
                        name: "onProfileClick",
                        type: "(event?) => void",
                        required: false,
                        defaultValue: "\u2014",
                        description: "Fires when the account row is pressed",
                    },
                    {
                        name: "profilePanelOpen",
                        type: "boolean",
                        required: false,
                        defaultValue: "false",
                        description: "Whether your account panel is open (drives aria-expanded)",
                    },
                    {
                        name: "profilePanelControlsId",
                        type: "string",
                        required: false,
                        defaultValue: "\u2014",
                        description: "Id of your account panel, for aria-controls",
                    },
                    {
                        name: "profilePanel",
                        type: "Snippet",
                        required: false,
                        defaultValue: "\u2014",
                        description: "Snippet rendered as the account panel",
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
                name: "SidebarShell",
                category: "organisms",
                description:
                    "The chrome of a sidebar with the regions left open: width, surface, collapse behaviour and a scrolling middle. Compose the sidebar molecules into it.",
                props: [
                    {
                        name: "mode",
                        type: "'expanded' | 'collapsed'",
                        required: false,
                        defaultValue: "expanded",
                        description: "Sidebar display mode; passed to every region as collapsed",
                    },
                    {
                        name: "layout",
                        type: "'rail' | 'card'",
                        required: false,
                        defaultValue: "rail",
                        description: "Rail attaches to the viewport edge; card is a rounded floating panel",
                    },
                    {
                        name: "ariaLabel",
                        type: "string",
                        required: false,
                        defaultValue: "Sidebar navigation",
                        description: "Accessible name for the nav landmark",
                    },
                    {
                        name: "header",
                        type: "Snippet<[{ collapsed, insetX }]>",
                        required: false,
                        defaultValue: "—",
                        description: "Brand row, search — anything above the scrolling nav area",
                    },
                    {
                        name: "children",
                        type: "Snippet<[{ collapsed, insetX }]>",
                        required: false,
                        defaultValue: "—",
                        description: "The scrolling middle",
                    },
                    {
                        name: "footer",
                        type: "Snippet<[{ collapsed, insetX }]>",
                        required: false,
                        defaultValue: "—",
                        description: "Account row, logout, theme toggle — outside the scroll container",
                    },
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: "—",
                        description: "Extra classes, merged last so they win",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Composed sidebar",
                        description:
                            "Each region is a snippet handed { collapsed, insetX }, so it matches the shell without re-deriving them.",
                        code: `<SidebarShell mode="collapsed">
  {#snippet header({ collapsed })}
    <SidebarBrandHeader {collapsed} brandName="Zabi" />
  {/snippet}

  <SidebarNavSection title="Main" sectionKey="main" {collapsed}>
    <li><a href="/">Dashboard</a></li>
  </SidebarNavSection>

  {#snippet footer({ collapsed, insetX })}
    <SidebarFooter {collapsed} class={insetX} />
  {/snippet}
</SidebarShell>`,
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
                variants: [
                    "plain",
                    "elevated",
                ],
                examples: [
                    {
                        title: "Picker panel",
                        description:
                            "Search and select from a dedicated side panel.",
                        code: "&lt;SidebarPanel items={panelItems} bind:selectedItemId bind:searchValue /&gt;",
                    },
                ],
            },
            {
                name: "SidebarAccountPanel",
                category: "organisms",
                description:
                    "Account picker panel: profile, theme row, and logout; composes SidebarPanel with fixed actions.",
                props: [
                    {
                        name: "profileName",
                        type: "string",
                        required: false,
                        defaultValue: "Account",
                        description: "Primary line in profile row",
                    },
                    {
                        name: "profileEmail",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description: "Subtitle / email",
                    },
                    {
                        name: "panelId",
                        type: "string",
                        required: false,
                        defaultValue: "generated",
                        description: "Stable id for aria-controls from the sidebar",
                    },
                    {
                        name: "variant",
                        type: "'plain' | 'elevated'",
                        required: false,
                        defaultValue: "plain",
                        description: "Panel chrome",
                    },
                ],
                variants: ["plain", "elevated"],
                examples: [
                    {
                        title: "Account panel",
                        description:
                            "Opens from SidebarNavigation profile control",
                        code: "<SidebarAccountPanel profileName=\"Alex\" profileEmail=\"alex@example.com\" />",
                    },
                ],
            },
            {
                name: "AppShell",
                category: "organisms",
                description:
                    "Phone app layout: a top bar, content that scrolls and a bottom tab bar, as tall as the screen and clear of the safe areas.",
                props: [
                    {
                        name: "header",
                        type: "Snippet",
                        required: false,
                        description:
                            "The top bar, an AppBar. It stays at the top of the scrolling area and handles the safe area above it.",
                    },
                    {
                        name: "children",
                        type: "Snippet",
                        required: false,
                        description:
                            "The scrolling content, rendered in the element contentElement names.",
                    },
                    {
                        name: "contentElement",
                        type: "'main' | 'div'",
                        required: false,
                        defaultValue: "main",
                        description:
                            "The element around the content. main when the shell is the page. A page has one main element: use div for a shell that sits inside another one.",
                    },
                    {
                        name: "footer",
                        type: "Snippet",
                        required: false,
                        description:
                            "The bottom bar, a BottomTabBar. It sits below the scrolling area and handles the safe area below it.",
                    },
                    {
                        name: "class",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Extra classes for the host. It is 100dvh tall; pass a height class to put the shell in a frame.",
                    },
                    {
                        name: "style",
                        type: "string",
                        required: false,
                        defaultValue: '""',
                        description:
                            "Added after the two custom properties the host sets: --app-shell-top-inset and --app-shell-bottom-inset, the heights of the header and the footer with their safe areas. While the shell is mounted both are also set on the html element, so an overlay moved to the body can read them.",
                    },
                ],
                variants: [],
                examples: [
                    {
                        title: "Phone layout",
                        description:
                            "Only the middle scrolls. Scroll down and the top bar slides away; the tab bar and the floating button stay. Open it full screen on a phone to try it at size. The safe areas have a size only when the page's viewport meta tag has viewport-fit=cover",
                        code: `<script lang="ts">
    import {
        AppBar,
        AppShell,
        BottomTabBar,
        FloatingActionButton,
        IconButton,
    } from "zabi-components";
    import { Bell, House, Search, Trophy } from "@lucide/svelte";
    import { page } from "$app/state";

    const items = [
        { href: "/", label: "Home", icon: House },
        { href: "/quiz", label: "Quiz", icon: Trophy },
        { href: "/inbox", label: "Inbox", icon: Bell, badge: 3 },
    ];
</script>

<AppShell>
    {#snippet header()}
        <AppBar title="Quiz" collapseOnScroll>
            {#snippet actions()}
                <IconButton variant="ghost" size="lg" label="Search" onclick={search}>
                    <Search size={20} />
                </IconButton>
            {/snippet}
        </AppBar>
    {/snippet}

    <!-- pb-24: room for the last row to scroll clear of the floating button. -->
    <div class="p-4 pb-24">…</div>

    <!-- Places itself against the shell, 16px above the tab bar. -->
    <FloatingActionButton label="New quiz" onclick={newQuiz} />

    {#snippet footer()}
        <BottomTabBar {items} active={page.url.pathname} />
    {/snippet}
</AppShell>`,
                    },
                ],
            },
        ],
};
