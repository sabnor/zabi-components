import { componentsCatalog } from "$lib/showcase/components-catalog";
import type { ComponentMetadata } from "../../types/page.types";

export const INSTALL_COMMAND = "npm install zabi-components";
export const GITHUB_URL = "https://github.com/sabnor/zabi-components";
export const NPM_URL = "https://www.npmjs.com/package/zabi-components";

export interface Layer {
    id: ComponentMetadata["category"];
    title: string;
    summary: string;
    names: string[];
}

function namesFor(category: ComponentMetadata["category"]): string[] {
    return (componentsCatalog[category] ?? [])
        .map((component) => component.name)
        .sort((a, b) => a.localeCompare(b));
}

export const layers: Layer[] = [
    {
        id: "atoms",
        title: "Atoms",
        summary:
            "Single controls and text: buttons, inputs, checkboxes, badges, progress bars and tooltips.",
        names: namesFor("atoms"),
    },
    {
        id: "molecules",
        title: "Molecules",
        summary:
            "Atoms combined into patterns: form fields, dropdowns, tabs, modals, alerts and toasts.",
        names: namesFor("molecules"),
    },
    {
        id: "organisms",
        title: "Organisms",
        summary:
            "Whole regions of an app: a top navigation bar and a sidebar with search and an account panel.",
        names: namesFor("organisms"),
    },
];

export const componentCount = layers.reduce(
    (total, layer) => total + layer.names.length,
    0,
);

export interface Guarantee {
    title: string;
    body: string;
}

export const guarantees: Guarantee[] = [
    {
        title: "Labels and messages",
        body: "Input, Textarea and Select connect labels, hints and errors to the control, so screen readers read them together.",
    },
    {
        title: "Keyboard",
        body: "RadioGroup moves with the arrow keys. Dropdown supports arrows, Home, End and Escape.",
    },
    {
        title: "Focus",
        body: "Modal keeps focus inside while open and returns it to the button that opened it, even when modals are nested.",
    },
    {
        title: "Server rendering",
        body: "Components render in SvelteKit on the server. Browser-only APIs are guarded so pages hydrate cleanly.",
    },
    {
        title: "Types",
        body: "Props are typed with TypeScript, so your editor suggests variants, sizes and callbacks as you write.",
    },
    {
        title: "Dark mode",
        body: "Every color token has a dark value. Add the dark class to the html element and the whole interface follows.",
    },
];

export const quickStart = [
    {
        title: "Install the package",
        language: "bash",
        code: INSTALL_COMMAND,
    },
    {
        title: "Import the theme in your global CSS",
        language: "css",
        code: `@import "tailwindcss";
@import "zabi-components/theme-only";
@import "zabi-components/theme-dark-only";`,
    },
    {
        title: "Use a component",
        language: "svelte",
        code: `<script lang="ts">
  import { Button, Input } from "zabi-components";
  let name = $state("");
</script>

<Input label="Name" bind:value={name} />
<Button onclick={() => console.log(name)}>Save</Button>`,
    },
];
