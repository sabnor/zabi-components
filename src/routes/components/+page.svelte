<script lang="ts">
    import Navigation from "../../components/organisms/Navigation.svelte";
    import ThemeToggle from "../../components/atoms/ThemeToggle.svelte";
    import ComponentDemo from "../../components/molecules/ComponentDemo.svelte";
    import Button from "../../components/atoms/Button.svelte";
    import Card from "../../components/atoms/Card.svelte";
    import Input from "../../components/atoms/Input.svelte";
    import Textarea from "../../components/atoms/Textarea.svelte";
    import Alert from "../../components/molecules/Alert.svelte";
    import Badge from "../../components/atoms/Badge.svelte";
    import Checkbox from "../../components/atoms/Checkbox.svelte";
    import Select from "../../components/atoms/Select.svelte";
    import Toggle from "../../components/atoms/Toggle.svelte";
    import Progress from "../../components/atoms/Progress.svelte";
    import Heading from "../../components/atoms/Heading.svelte";
    import Modal from "../../components/molecules/Modal.svelte";
    import Dropdown from "../../components/molecules/Dropdown.svelte";
    import Tabs from "../../components/molecules/Tabs.svelte";
    import ColorPicker from "../../components/atoms/ColorPicker.svelte";
    import CodeBlock from "../../components/atoms/CodeBlock.svelte";
    import FeatureCard from "../../components/atoms/FeatureCard.svelte";
    import OptimizedImage from "../../components/atoms/OptimizedImage.svelte";
    import Skeleton from "../../components/atoms/Skeleton.svelte";
    import Toast from "../../components/atoms/Toast.svelte";
    import Tooltip from "../../components/atoms/Tooltip.svelte";
    import ContactForm from "../../components/molecules/ContactForm.svelte";
    import Form from "../../components/molecules/Form.svelte";
    import ImageUpload from "../../components/molecules/ImageUpload.svelte";
    import SlideUp from "../../components/molecules/SlideUp.svelte";
    import Navbar from "../../components/organisms/Navbar.svelte";
    import type { NavItem, ComponentMetadata } from "../../types/page.types";

    // Navigation data
    const navItems: NavItem[] = [
        { label: "Home", href: "/" },
        { label: "Components", href: "/components" },
        { label: "Docs", href: "/docs" },
        { label: "GitHub", href: "https://github.com" },
    ];

    // Component categories
    const categories = [
        { id: "atoms", label: "Atoms", description: "Basic building blocks" },
        {
            id: "molecules",
            label: "Molecules",
            description: "Composite components",
        },
        {
            id: "organisms",
            label: "Organisms",
            description: "Complex components",
        },
    ];

    let selectedCategory = $state("atoms");
    let selectedComponent = $state("button");
    let modalOpen = $state(false);
    let slideUpOpen = $state(false);
    let activeTab = $state("tab1");

    // Sample code for CodeBlock demo
    const sampleCode = `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`;

    // Component metadata
    const components: Record<string, ComponentMetadata[]> = {
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
                    "success",
                    "ghost",
                    "brand",
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
                        code: '&lt;Button variant="primary"&gt;Primary&lt;/Button&gt;\n&lt;Button variant="secondary"&gt;Secondary&lt;/Button&gt;\n&lt;Button variant="danger"&gt;Danger&lt;/Button&gt;',
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
                description: "Card component optimized for feature showcases",
                props: [
                    {
                        name: "title",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Feature card title",
                    },
                    {
                        name: "description",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Feature description",
                    },
                    {
                        name: "icon",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Icon name or URL",
                    },
                    {
                        name: "variant",
                        type: "string",
                        required: false,
                        defaultValue: "default",
                        description: "Card variant",
                    },
                ],
                variants: ["default", "highlighted", "minimal"],
                examples: [
                    {
                        title: "Basic Feature Card",
                        description:
                            "Simple feature card with title and description",
                        code: '&lt;FeatureCard title="Fast Performance" description="Lightning fast loading times" /&gt;',
                    },
                    {
                        title: "With Icon",
                        description: "Feature card with icon",
                        code: '&lt;FeatureCard title="Secure" description="End-to-end encryption" icon="shield" /&gt;',
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
                description: "Loading skeleton placeholder component",
                props: [
                    {
                        name: "width",
                        type: "string",
                        required: false,
                        defaultValue: "100%",
                        description: "Skeleton width",
                    },
                    {
                        name: "height",
                        type: "string",
                        required: false,
                        defaultValue: "1rem",
                        description: "Skeleton height",
                    },
                    {
                        name: "variant",
                        type: "string",
                        required: false,
                        defaultValue: "text",
                        description: "Skeleton variant",
                    },
                ],
                variants: ["text", "rectangular", "circular"],
                examples: [
                    {
                        title: "Basic Skeleton",
                        description: "Simple text skeleton",
                        code: "&lt;Skeleton /&gt;",
                    },
                    {
                        title: "Variants",
                        description: "Different skeleton shapes",
                        code: '&lt;Skeleton variant="rectangular" width="200px" height="100px" /&gt;\n&lt;Skeleton variant="circular" width="40px" height="40px" /&gt;',
                    },
                ],
            },
            {
                name: "Toast",
                category: "atoms",
                description:
                    "Notification toast with auto-dismiss functionality",
                props: [
                    {
                        name: "message",
                        type: "string",
                        required: true,
                        defaultValue: "",
                        description: "Toast message",
                    },
                    {
                        name: "variant",
                        type: "string",
                        required: false,
                        defaultValue: "info",
                        description: "Toast variant",
                    },
                    {
                        name: "duration",
                        type: "number",
                        required: false,
                        defaultValue: "5000",
                        description: "Auto-dismiss duration in ms",
                    },
                    {
                        name: "closable",
                        type: "boolean",
                        required: false,
                        defaultValue: "true",
                        description: "Show close button",
                    },
                ],
                variants: ["info", "success", "warning", "error"],
                examples: [
                    {
                        title: "Basic Toast",
                        description: "Simple notification toast",
                        code: '&lt;Toast message="Operation completed" /&gt;',
                    },
                    {
                        title: "Variants",
                        description: "Different toast variants",
                        code: '&lt;Toast variant="success" message="Success!" /&gt;\n&lt;Toast variant="error" message="Error occurred" /&gt;',
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
        ],
        organisms: [
            {
                name: "Navbar",
                category: "organisms",
                description:
                    "Navigation bar with logo, menu items, and responsive design",
                props: [
                    {
                        name: "logo",
                        type: "string",
                        required: false,
                        defaultValue: "",
                        description: "Logo text or URL",
                    },
                    {
                        name: "items",
                        type: "array",
                        required: false,
                        defaultValue: "[]",
                        description: "Navigation items",
                    },
                    {
                        name: "variant",
                        type: "string",
                        required: false,
                        defaultValue: "default",
                        description: "Navbar variant",
                    },
                ],
                variants: ["default", "transparent", "fixed"],
                examples: [
                    {
                        title: "Basic Navbar",
                        description: "Simple navigation bar",
                        code: '&lt;Navbar logo="My App" items={navItems} /&gt;',
                    },
                    {
                        title: "Transparent",
                        description: "Transparent navbar variant",
                        code: '&lt;Navbar variant="transparent" logo="Brand" /&gt;',
                    },
                ],
            },
            {
                name: "Navigation",
                category: "organisms",
                description:
                    "Navigation component with multiple variants and responsive behavior",
                props: [
                    {
                        name: "items",
                        type: "array",
                        required: true,
                        defaultValue: "[]",
                        description: "Navigation items",
                    },
                    {
                        name: "variant",
                        type: "string",
                        required: false,
                        defaultValue: "default",
                        description: "Navigation variant",
                    },
                    {
                        name: "orientation",
                        type: "string",
                        required: false,
                        defaultValue: "horizontal",
                        description: "Navigation orientation",
                    },
                ],
                variants: ["default", "header", "sidebar", "breadcrumb"],
                examples: [
                    {
                        title: "Basic Navigation",
                        description: "Simple navigation menu",
                        code: "&lt;Navigation items={navItems} /&gt;",
                    },
                    {
                        title: "Header Navigation",
                        description: "Navigation for header",
                        code: '&lt;Navigation variant="header" items={items} /&gt;',
                    },
                ],
            },
        ],
    };

    let currentComponents = $derived(components[selectedCategory] || []);
</script>

<svelte:head>
    <title>Components - Zabi Components</title>
    <meta
        name="description"
        content="Interactive component showcase and documentation"
    />
</svelte:head>

<div class="min-h-screen bg-background">
    <header
        class="flex items-center justify-between p-4 bg-surface-level-0 border-b border-border"
    >
        <h1 class="text-xl font-bold text-text">Zabi Components</h1>
        <div class="flex items-center gap-4">
            <Navigation variant="header" items={navItems} />
            <ThemeToggle />
        </div>
    </header>

    <main class="flex min-h-screen">
        <!-- Sidebar -->
        <aside class="w-64 bg-surface-level-1 border-r border-border p-6">
            <h2 class="text-lg font-semibold text-text mb-4">Components</h2>

            <!-- Category Navigation -->
            <nav class="space-y-2 mb-8">
                {#each categories as category}
                    <button
                        onclick={() => (selectedCategory = category.id)}
                        class="w-full text-left px-3 py-2 rounded-md transition-colors duration-200 {selectedCategory ===
                        category.id
                            ? 'bg-primary text-white'
                            : 'text-text-secondary hover:text-text hover:bg-surface-level-0'}"
                    >
                        <div class="font-medium">{category.label}</div>
                        <div class="text-xs opacity-75">
                            {category.description}
                        </div>
                    </button>
                {/each}
            </nav>

            <!-- Component List -->
            <div class="space-y-1">
                {#each currentComponents as component}
                    <button
                        onclick={() =>
                            (selectedComponent = component.name.toLowerCase())}
                        class="w-full text-left px-3 py-2 rounded-md transition-colors duration-200 {selectedComponent ===
                        component.name.toLowerCase()
                            ? 'bg-primary/10 text-primary border-l-2 border-primary'
                            : 'text-text-secondary hover:text-text hover:bg-surface-level-0'}"
                    >
                        {component.name}
                    </button>
                {/each}
            </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 p-8">
            {#each currentComponents as component}
                {#if selectedComponent === component.name.toLowerCase()}
                    <div class="max-w-4xl">
                        <!-- Component Header -->
                        <div class="mb-8">
                            <h1 class="text-3xl font-bold text-text mb-2">
                                {component.name}
                            </h1>
                            <p class="text-lg text-text-secondary mb-4">
                                {component.description}
                            </p>
                            <div class="flex gap-2">
                                <Badge
                                    variant="info"
                                    text={component.category}
                                />
                                {#if component.variants}
                                    <Badge
                                        variant="info"
                                        text="{component.variants
                                            .length} variants"
                                    />
                                {/if}
                            </div>
                        </div>

                        <!-- Examples -->
                        <div class="space-y-8">
                            {#each component.examples as example}
                                <ComponentDemo
                                    title={example.title}
                                    description={example.description}
                                    code={example.code}
                                    language={example.language || "svelte"}
                                >
                                    {#if component.name === "Button"}
                                        <div class="space-y-4">
                                            <div
                                                class="flex flex-wrap gap-4 items-center"
                                            >
                                                <Button
                                                    variant="primary"
                                                    text="Primary"
                                                />
                                                <Button
                                                    variant="secondary"
                                                    text="Secondary"
                                                />
                                                <Button
                                                    variant="danger"
                                                    text="Danger"
                                                />
                                                <Button
                                                    variant="success"
                                                    text="Success"
                                                />
                                                <Button
                                                    variant="ghost"
                                                    text="Ghost"
                                                />
                                                <Button
                                                    variant="brand"
                                                    text="Brand"
                                                />
                                            </div>
                                            <div
                                                class="flex flex-wrap gap-4 items-center"
                                            >
                                                <Button
                                                    variant="primary"
                                                    disabled
                                                    text="Disabled Primary"
                                                />
                                                <Button
                                                    variant="secondary"
                                                    disabled
                                                    text="Disabled Secondary"
                                                />
                                                <Button
                                                    variant="danger"
                                                    disabled
                                                    text="Disabled Danger"
                                                />
                                            </div>
                                        </div>
                                    {:else if component.name === "Input"}
                                        <div class="space-y-4 max-w-md">
                                            <Input
                                                label="Name"
                                                placeholder="Enter your name"
                                                variant="default"
                                            />
                                            <Input
                                                label="Email"
                                                type="email"
                                                placeholder="Enter your email"
                                                variant="success"
                                            />
                                            <Input
                                                label="Password"
                                                type="password"
                                                placeholder="Enter your password"
                                                variant="warning"
                                            />
                                            <Input
                                                label="Error Field"
                                                placeholder="This field has an error"
                                                variant="error"
                                            />
                                            <Input
                                                label="Disabled Field"
                                                placeholder="This field is disabled"
                                                disabled={true}
                                            />
                                        </div>
                                    {:else if component.name === "Card"}
                                        <div
                                            class="grid grid-cols-1 md:grid-cols-2 gap-4"
                                        >
                                            <Card title="Default Card">
                                                <p class="text-text-secondary">
                                                    This is a default card with
                                                    clean styling.
                                                </p>
                                            </Card>
                                            <Card title="Success Card">
                                                <p class="text-text-secondary">
                                                    This card indicates a
                                                    successful action.
                                                </p>
                                            </Card>
                                            <Card title="Warning Card">
                                                <p class="text-text-secondary">
                                                    This card shows a warning
                                                    state.
                                                </p>
                                            </Card>
                                            <Card title="Error Card">
                                                <p class="text-text-secondary">
                                                    This card indicates an error
                                                    state.
                                                </p>
                                            </Card>
                                            <Card title="Info Card">
                                                <p class="text-text-secondary">
                                                    This card provides
                                                    informational content.
                                                </p>
                                            </Card>
                                        </div>
                                    {:else if component.name === "Alert"}
                                        <div class="space-y-4">
                                            <Alert
                                                variant="info"
                                                title="Info Alert"
                                                message="This is an informational message."
                                            />
                                            <Alert
                                                variant="success"
                                                title="Success!"
                                                message="Your action was completed successfully."
                                            />
                                            <Alert
                                                variant="warning"
                                                title="Warning"
                                                message="Please review your input before proceeding."
                                            />
                                            <Alert
                                                variant="error"
                                                title="Error"
                                                message="Something went wrong. Please try again."
                                            />
                                        </div>
                                    {:else if component.name === "ContactForm"}
                                        <div class="max-w-md">
                                            <ContactForm />
                                        </div>
                                    {:else if component.name === "Dropdown"}
                                        <div class="space-y-4 max-w-md">
                                            <Dropdown>
                                                {#snippet trigger()}
                                                    <Button
                                                        text="Select an option"
                                                    />
                                                {/snippet}
                                                {#snippet children()}
                                                    <div class="p-2 space-y-1">
                                                        <button
                                                            class="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                                                            >Option 1</button
                                                        >
                                                        <button
                                                            class="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                                                            >Option 2</button
                                                        >
                                                        <button
                                                            class="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                                                            >Option 3</button
                                                        >
                                                    </div>
                                                {/snippet}
                                            </Dropdown>
                                            <Dropdown>
                                                {#snippet trigger()}
                                                    <Button
                                                        text="Choose a color"
                                                    />
                                                {/snippet}
                                                {#snippet children()}
                                                    <div class="p-2 space-y-1">
                                                        <button
                                                            class="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                                                            >Red</button
                                                        >
                                                        <button
                                                            class="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                                                            >Blue</button
                                                        >
                                                        <button
                                                            class="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                                                            >Green</button
                                                        >
                                                    </div>
                                                {/snippet}
                                            </Dropdown>
                                        </div>
                                    {:else if component.name === "Form"}
                                        <div class="max-w-md">
                                            <Form>
                                                <div class="space-y-4">
                                                    <Input
                                                        label="Name"
                                                        placeholder="Enter your name"
                                                    />
                                                    <Input
                                                        label="Email"
                                                        type="email"
                                                        placeholder="Enter your email"
                                                    />
                                                    <Textarea
                                                        label="Message"
                                                        placeholder="Enter your message"
                                                    />
                                                    <Button
                                                        type="submit"
                                                        text="Submit"
                                                    />
                                                </div>
                                            </Form>
                                        </div>
                                    {:else if component.name === "ImageUpload"}
                                        <div class="max-w-md">
                                            <ImageUpload
                                                accept="image/jpeg,image/png,image/gif"
                                                placeholder="Choose an image"
                                            />
                                        </div>
                                    {:else if component.name === "Modal"}
                                        <div class="space-y-4">
                                            <Button
                                                onclick={() =>
                                                    (modalOpen = true)}
                                                text="Open Modal"
                                            />
                                            <Modal
                                                isOpen={modalOpen}
                                                onclick={() =>
                                                    (modalOpen = false)}
                                                title="Example Modal"
                                            >
                                                <p
                                                    class="text-text-secondary mb-4"
                                                >
                                                    This is a modal dialog with
                                                    some content.
                                                </p>
                                                <div
                                                    class="flex gap-2 justify-end"
                                                >
                                                    <Button
                                                        variant="secondary"
                                                        onclick={() =>
                                                            (modalOpen = false)}
                                                        text="Cancel"
                                                    />
                                                    <Button
                                                        onclick={() =>
                                                            (modalOpen = false)}
                                                        text="Confirm"
                                                    />
                                                </div>
                                            </Modal>
                                        </div>
                                    {:else if component.name === "SlideUp"}
                                        <div class="space-y-4">
                                            <Button
                                                onclick={() =>
                                                    (slideUpOpen = true)}
                                                text="Open Slide Up"
                                            />
                                            <SlideUp
                                                isOpen={slideUpOpen}
                                                onclick={() =>
                                                    (slideUpOpen = false)}
                                                title="Slide Up Panel"
                                            >
                                                <div class="p-6">
                                                    <h3
                                                        class="text-lg font-semibold text-text mb-4"
                                                    >
                                                        Slide Up Panel
                                                    </h3>
                                                    <p
                                                        class="text-text-secondary mb-4"
                                                    >
                                                        This is a slide-up panel
                                                        with custom content.
                                                    </p>
                                                    <Button
                                                        onclick={() =>
                                                            (slideUpOpen = false)}
                                                        text="Close"
                                                    />
                                                </div>
                                            </SlideUp>
                                        </div>
                                    {:else if component.name === "Tabs"}
                                        <div class="max-w-2xl">
                                            <Tabs
                                                tabs={[
                                                    {
                                                        id: "tab1",
                                                        label: "Overview",
                                                    },
                                                    {
                                                        id: "tab2",
                                                        label: "Details",
                                                    },
                                                    {
                                                        id: "tab3",
                                                        label: "Settings",
                                                    },
                                                ]}
                                                activeTab="tab1"
                                            >
                                                {#if activeTab === "tab1"}
                                                    <p>
                                                        This is the overview tab
                                                        content.
                                                    </p>
                                                {:else if activeTab === "tab2"}
                                                    <p>
                                                        This is the details tab
                                                        content.
                                                    </p>
                                                {:else if activeTab === "tab3"}
                                                    <p>
                                                        This is the settings tab
                                                        content.
                                                    </p>
                                                {/if}
                                            </Tabs>
                                        </div>
                                    {:else if component.name === "Navbar"}
                                        <div class="space-y-4">
                                            <Navbar brand="Zabi Components">
                                                {#snippet nav()}
                                                    <Navigation
                                                        items={[
                                                            {
                                                                label: "Home",
                                                                href: "/",
                                                            },
                                                            {
                                                                label: "Components",
                                                                href: "/components",
                                                            },
                                                            {
                                                                label: "Docs",
                                                                href: "/docs",
                                                            },
                                                        ]}
                                                    />
                                                {/snippet}
                                            </Navbar>
                                            <Navbar brand="Brand">
                                                {#snippet nav()}
                                                    <Navigation
                                                        items={[
                                                            {
                                                                label: "About",
                                                                href: "/about",
                                                            },
                                                            {
                                                                label: "Contact",
                                                                href: "/contact",
                                                            },
                                                        ]}
                                                    />
                                                {/snippet}
                                            </Navbar>
                                        </div>
                                    {:else if component.name === "Navigation"}
                                        <div class="space-y-6">
                                            <div>
                                                <h4
                                                    class="text-sm font-medium text-text-secondary mb-2"
                                                >
                                                    Default Navigation
                                                </h4>
                                                <Navigation
                                                    items={[
                                                        {
                                                            label: "Home",
                                                            href: "/",
                                                        },
                                                        {
                                                            label: "About",
                                                            href: "/about",
                                                        },
                                                        {
                                                            label: "Contact",
                                                            href: "/contact",
                                                        },
                                                    ]}
                                                />
                                            </div>
                                            <div>
                                                <h4
                                                    class="text-sm font-medium text-text-secondary mb-2"
                                                >
                                                    Header Navigation
                                                </h4>
                                                <Navigation
                                                    items={[
                                                        {
                                                            label: "Dashboard",
                                                            href: "/dashboard",
                                                        },
                                                        {
                                                            label: "Profile",
                                                            href: "/profile",
                                                        },
                                                        {
                                                            label: "Settings",
                                                            href: "/settings",
                                                        },
                                                    ]}
                                                />
                                            </div>
                                        </div>
                                    {:else if component.name === "ColorPicker"}
                                        <div class="space-y-6 max-w-md">
                                            <ColorPicker
                                                label="Choose a color"
                                            />
                                            <ColorPicker
                                                value="#3b82f6"
                                                label="Background Color"
                                            />
                                            <ColorPicker
                                                disabled={true}
                                                label="Disabled Picker"
                                            />
                                        </div>
                                    {:else if component.name === "Badge"}
                                        <div
                                            class="flex flex-wrap gap-2 items-center"
                                        >
                                            <Badge text="Default" />
                                            <Badge
                                                variant="success"
                                                text="Success"
                                            />
                                            <Badge
                                                variant="warning"
                                                text="Warning"
                                            />
                                            <Badge
                                                variant="error"
                                                text="Error"
                                            />
                                            <Badge variant="info" text="Info" />
                                        </div>
                                    {:else if component.name === "Checkbox"}
                                        <div class="space-y-4 max-w-md">
                                            <Checkbox
                                                label="Accept terms and conditions"
                                            />
                                            <Checkbox
                                                label="Email verified"
                                                checked={true}
                                            />
                                            <Checkbox label="Review required" />
                                            <Checkbox
                                                disabled={true}
                                                label="Disabled option"
                                            />
                                        </div>
                                    {:else if component.name === "CodeBlock"}
                                        <div class="max-w-2xl">
                                            <CodeBlock
                                                code={sampleCode}
                                                language="javascript"
                                                showLineNumbers={true}
                                            />
                                        </div>
                                    {:else if component.name === "FeatureCard"}
                                        <div
                                            class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl"
                                        >
                                            <FeatureCard
                                                title="Fast Performance"
                                                description="Lightning fast loading times with optimized code"
                                            />
                                            <FeatureCard
                                                title="Secure by Default"
                                                description="End-to-end encryption and security best practices"
                                                icon="shield"
                                            />
                                            <FeatureCard
                                                title="Easy to Use"
                                                description="Intuitive interface designed for productivity"
                                                icon="star"
                                            />
                                        </div>
                                    {:else if component.name === "Heading"}
                                        <div class="space-y-4">
                                            <Heading
                                                level={1}
                                                text="Display Heading"
                                            />
                                            <Heading
                                                level={2}
                                                text="Section Heading"
                                            />
                                            <Heading
                                                level={3}
                                                text="Subtitle Heading"
                                            />
                                            <Heading
                                                level={4}
                                                text="Subsection"
                                            />
                                        </div>
                                    {:else if component.name === "OptimizedImage"}
                                        <div class="space-y-4 max-w-md">
                                            <OptimizedImage
                                                src="/vite.svg"
                                                alt="Vite Logo"
                                                width={200}
                                                height={200}
                                            />
                                            <OptimizedImage
                                                src="/svelte.svg"
                                                alt="Svelte Logo"
                                                width={150}
                                                height={150}
                                            />
                                        </div>
                                    {:else if component.name === "Skeleton"}
                                        <div class="space-y-4 max-w-md">
                                            <Skeleton />
                                            <Skeleton
                                                width="200px"
                                                height="100px"
                                            />
                                            <Skeleton
                                                width="40px"
                                                height="40px"
                                            />
                                            <div class="flex space-x-2">
                                                <Skeleton
                                                    width="32px"
                                                    height="32px"
                                                />
                                                <div class="space-y-2 flex-1">
                                                    <Skeleton width="80%" />
                                                    <Skeleton width="60%" />
                                                </div>
                                            </div>
                                        </div>
                                    {:else if component.name === "Toast"}
                                        <div class="space-y-4 max-w-md">
                                            <Toast
                                                message="This is an info toast"
                                            />
                                            <Toast
                                                message="Operation completed successfully!"
                                            />
                                            <Toast
                                                message="Please review your input"
                                            />
                                            <Toast
                                                message="An error occurred"
                                            />
                                        </div>
                                    {:else if component.name === "Tooltip"}
                                        <div class="flex gap-4 items-center">
                                            <Tooltip
                                                content="This is a tooltip"
                                            >
                                                <Button text="Hover me" />
                                            </Tooltip>
                                            <Tooltip
                                                content="Top tooltip"
                                                placement="top"
                                            >
                                                <Button
                                                    variant="secondary"
                                                    text="Top"
                                                />
                                            </Tooltip>
                                            <Tooltip
                                                content="Bottom tooltip"
                                                placement="bottom"
                                            >
                                                <Button
                                                    variant="ghost"
                                                    text="Bottom"
                                                />
                                            </Tooltip>
                                        </div>
                                    {/if}
                                </ComponentDemo>
                            {/each}
                        </div>

                        <!-- Props Table -->
                        <div class="mt-12">
                            <h2 class="text-2xl font-bold text-text mb-6">
                                Props
                            </h2>
                            <div class="overflow-x-auto">
                                <table
                                    class="w-full border-collapse border border-border"
                                >
                                    <thead>
                                        <tr class="bg-surface-level-1">
                                            <th
                                                class="border border-border px-4 py-2 text-left text-text font-semibold"
                                                >Name</th
                                            >
                                            <th
                                                class="border border-border px-4 py-2 text-left text-text font-semibold"
                                                >Type</th
                                            >
                                            <th
                                                class="border border-border px-4 py-2 text-left text-text font-semibold"
                                                >Required</th
                                            >
                                            <th
                                                class="border border-border px-4 py-2 text-left text-text font-semibold"
                                                >Default</th
                                            >
                                            <th
                                                class="border border-border px-4 py-2 text-left text-text font-semibold"
                                                >Description</th
                                            >
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {#each component.props as prop}
                                            <tr>
                                                <td
                                                    class="border border-border px-4 py-2 text-text font-mono"
                                                    >{prop.name}</td
                                                >
                                                <td
                                                    class="border border-border px-4 py-2 text-text-secondary"
                                                    >{prop.type}</td
                                                >
                                                <td
                                                    class="border border-border px-4 py-2 text-text-secondary"
                                                    >{prop.required
                                                        ? "Yes"
                                                        : "No"}</td
                                                >
                                                <td
                                                    class="border border-border px-4 py-2 text-text-secondary"
                                                    >{prop.defaultValue ||
                                                        "-"}</td
                                                >
                                                <td
                                                    class="border border-border px-4 py-2 text-text-secondary"
                                                    >{prop.description}</td
                                                >
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
    </main>

    <footer class="bg-surface-level-1 border-t border-border py-8">
        <div class="container mx-auto px-6">
            <div
                class="flex flex-col md:flex-row justify-between items-center gap-4"
            >
                <div class="text-center md:text-left">
                    <p class="text-text-secondary mb-2">
                        Clean components that just work. Less is more.
                    </p>
                    <p class="text-sm text-text-secondary/80">
                        © 2024 Zabi Components. MIT License.
                    </p>
                </div>
                <div class="flex gap-6">
                    <a
                        href="/docs"
                        class="text-text-secondary hover:text-text transition-colors"
                        >Docs</a
                    >
                    <a
                        href="/components"
                        class="text-text-secondary hover:text-text transition-colors"
                        >Components</a
                    >
                    <a
                        href="https://github.com"
                        class="text-text-secondary hover:text-text transition-colors"
                        >GitHub</a
                    >
                </div>
            </div>
        </div>
    </footer>
</div>
