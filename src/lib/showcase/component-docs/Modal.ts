import type { ComponentDoc } from "../../../types/page.types";
import { componentsCatalog } from "../components-catalog";
import { makeDoc, demoId } from "./_shared";

const props = componentsCatalog.molecules.find((c) => c.name === "Modal")!.props;

export const doc: ComponentDoc = makeDoc({
    name: "Modal",
    category: "molecules",
    description:
        "Dialog overlay for focused tasks. Use it for confirmations, short forms, and critical flows that should not lose context.",
    defaultExample: {
        title: "Default",
        description: "A modal with a title and a clear primary action.",
        demoId: demoId("Modal", "default"),
        code: `<Button onclick={() => (open = true)}>Open modal</Button>

<Modal title="Confirm changes" bind:isOpen={open}>
  <p class="text-description">This change affects all team members.</p>
  <div class="mt-4 flex justify-end gap-2">
    <Button variant="secondary" onclick={() => (open = false)}>Cancel</Button>
    <Button variant="primary" onclick={() => (open = false)}>Confirm</Button>
  </div>
</Modal>`,
    },
    examples: [
        {
            title: "Close reason",
            description:
                "The onclose callback reports whether Escape, the backdrop or the close button closed the modal.",
            demoId: demoId("Modal", "onclose"),
            code: `<Modal
  title="Confirm changes"
  bind:isOpen={open}
  onclose={({ reason }) => (lastClose = reason)}
>
  <p class="text-description">Close me with Escape, the backdrop or the close button.</p>
</Modal>`,
        },
        {
            title: "Portalled, and locked while saving",
            description:
                "With portal the overlay renders in document.body. While dismissible is false nothing the user does closes it.",
            demoId: demoId("Modal", "portal"),
            code: `<Modal
  portal
  title="Delete project"
  bind:isOpen={open}
  dismissible={!saving}
>
  <p class="text-description">This cannot be undone.</p>
  {#snippet footer()}
    <Button variant="secondary" disabled={saving} onclick={() => (open = false)}>Cancel</Button>
    <Button variant="danger" loading={saving} onclick={remove}>Delete</Button>
  {/snippet}
</Modal>`,
        },
    ],
    variantsStates: ["sm", "md", "lg", "portal", "dismissible"],
    props,
    guidelines: {
        whenToUse: [
            "Use for confirmations and short, self-contained tasks.",
            "Ensure a clear primary action and an obvious way to cancel/close.",
            "Set `portal` when an ancestor has a transform, a filter or clipped overflow: a modal rendered in place is positioned and clipped by that ancestor.",
            "Use `onclose` to learn why the modal closed. `onclick` still fires on close for older code, but is deprecated for that purpose.",
            "Set `role=\"alertdialog\"` when the dialog interrupts to ask for a response; for a plain confirmation, use `ConfirmDialog`, which does this for you.",
            "Translate the close button with `closeLabel`.",
            "Set `dismissible={false}` while an action is pending, so the dialog cannot be closed from under it. Keep a visible sign of progress in the dialog.",
        ],
        whenToAvoid: [
            "Avoid deep multi-step flows in a modal; use a dedicated page when complexity grows.",
            "Avoid opening modals without moving focus into the dialog.",
            "Avoid setting the theme class (`.dark`) on an element below `<body>`: put it on `<html>` or `<body>`. A portalled modal is outside such a subtree, and a modal rendered in place inside one does not get a consistent theme either.",
            "Avoid leaving a modal non-dismissible with no action inside that can end it.",
        ],
    },
});

