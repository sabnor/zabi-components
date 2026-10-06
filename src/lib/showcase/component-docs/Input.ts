import type { ComponentDoc } from "../../../types/page.types";
import { componentsCatalog } from "../components-catalog";
import { makeDoc, demoId } from "./_shared";

const props = componentsCatalog.atoms.find((c) => c.name === "Input")!.props;

export const doc: ComponentDoc = makeDoc({
    name: "Input",
    category: "atoms",
    description:
        "Labeled form input with visual variants for validation states. Use it for structured data entry in forms and settings.",
    defaultExample: {
        title: "Default",
        description: "Use a clear label and an appropriate input type.",
        demoId: demoId("Input", "default"),
        code: `<Input label="Email address" type="email" placeholder="name@company.com" />`,
    },
    examples: [
        {
            title: "Validation states",
            description:
                "Use variants to reflect validation state with accompanying messaging in your form.",
            demoId: demoId("Input", "states"),
            code: `<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
  <Input label="Email address" type="email" placeholder="name@company.com" />
  <Input variant="error" label="Email address" type="email" placeholder="name@company.com" />
</div>`,
        },
        {
            title: "Hint and error",
            description:
                "A hint is help that is always there; an error marks the field invalid and is announced. Both are tied to the field, hint first.",
            demoId: demoId("Input", "hint"),
            code: `<Input
  label="Password"
  type="password"
  autocomplete="new-password"
  hint="At least 8 characters."
  error={tooShort ? "That is fewer than 8 characters." : ""}
  bind:value={password}
/>`,
        },
        {
            title: "Inside the field",
            description:
                "A password that can be shown, and leading and trailing content: an icon, a button, a unit. The field makes room for what is in it.",
            demoId: demoId("Input", "inside"),
            code: `<Input label="Password" type="password" autocomplete="current-password" revealable bind:value={secret} />

<Input label="Search" type="search" bind:value={query}>
  {#snippet leading()}
    <Search size={16} aria-hidden="true" />
  {/snippet}
  {#snippet trailing()}
    <IconButton
      variant="ghost"
      size="sm"
      label="Clear search"
      class="rounded-[calc(var(--radius-control)-4px)]"
      onclick={() => (query = "")}
    >
      <X size={16} aria-hidden="true" />
    </IconButton>
  {/snippet}
</Input>

<Input label="Weight" inputmode="decimal" bind:value={weight}>
  {#snippet trailing()}
    <span class="text-sm">kg</span>
  {/snippet}
</Input>`,
        },
    ],
    variantsStates: ["default", "success", "warning", "error"],
    props,
    guidelines: {
        whenToUse: [
            "Use for single-line text input with a visible label (forms, filters, settings).",
            "Prefer the correct `type` (email, tel, number, password) to improve UX and mobile keyboards.",
        ],
        whenToAvoid: [
            "Avoid placeholder-only fields — keep labels visible for accessibility and clarity.",
            "Avoid using validation colors alone; include clear error text near the field.",
        ],
    },
});

