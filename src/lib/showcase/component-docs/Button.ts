import type { ComponentDoc } from "../../../types/page.types";
import { componentsCatalog } from "../components-catalog";
import { makeDoc, demoId } from "./_shared";

const props = componentsCatalog.atoms.find((c) => c.name === "Button")!.props;

export const doc: ComponentDoc = makeDoc({
    name: "Button",
    category: "atoms",
    description:
        "Accessible button with a small set of visual variants and sizes. Use it for primary and secondary actions across forms, dialogs, and toolbars.",
    defaultExample: {
        title: "Default",
        description: "Primary action button with a clear label.",
        demoId: demoId("Button", "default"),
        code: `<Button>Save changes</Button>`,
    },
    examples: [
        {
            title: "Variants",
            description:
                "Use variants to communicate intent. Keep the page to one clear primary action.",
            demoId: demoId("Button", "variants"),
            code: `<div class="flex flex-wrap items-center gap-2">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
  <Button variant="danger">Delete</Button>
</div>`,
        },
        {
            title: "Disabled",
            description:
                "Disable actions while submitting or when prerequisites aren’t met.",
            demoId: demoId("Button", "disabled"),
            code: `<div class="flex flex-wrap items-center gap-2">
  <Button disabled>Saving…</Button>
  <Button variant="secondary" disabled>Cancel</Button>
</div>`,
        },
    ],
    variantsStates: ["primary", "secondary", "outline", "ghost", "link", "danger", "disabled"],
    props,
    guidelines: {
        whenToUse: [
            "Use for actions that change state (submit, save, delete, open dialog).",
            "Prefer one primary button per view to keep the main action obvious.",
        ],
        whenToAvoid: [
            "Avoid using buttons for navigation — use links for route changes.",
            "Avoid icon-only buttons without an accessible label (use `IconButton`).",
        ],
    },
});

