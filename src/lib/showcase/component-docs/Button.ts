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
  <Button variant="accent">Accent</Button>
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
        {
            title: "Links",
            description:
                "With href it is a real link that looks like a button. A disabled link has no address and cannot be followed. variant link on a link is a text link that flows with its sentence.",
            demoId: demoId("Button", "links"),
            code: `<Button href="/login">Log in</Button>
<Button href="/docs" variant="outline" target="_blank" rel="noopener">Open the docs</Button>
<Button href="/login" disabled>Not yet</Button>

<p>
  No account yet? You can
  <Button href="/register" variant="link">create one with your e-mail address</Button>
  and log in straight away.
</p>`,
        },
        {
            title: "Long labels",
            description:
                "A label that does not fit on one line wraps and the button grows; one that fits is 32, 40 or 48px tall as before.",
            demoId: demoId("Button", "long"),
            code: `<Button size="lg" fullWidth>Mejla mig en inloggningslänk</Button>`,
        },
    ],
    variantsStates: ["primary", "secondary", "outline", "ghost", "link", "danger", "accent", "disabled"],
    props,
    guidelines: {
        whenToUse: [
            "Use for actions that change state (submit, save, delete, open dialog).",
            "Prefer one primary button per view to keep the main action obvious.",
            "Use size lg (48px) for the main action on a phone. sm and md are 44px tall on a touch screen and 32 and 40px with a mouse.",
        ],
        whenToAvoid: [
            "Avoid a button with an onclick that navigates — pass `href`, and it is a link.",
            "Avoid icon-only buttons without an accessible label (use `IconButton`).",
        ],
    },
});

