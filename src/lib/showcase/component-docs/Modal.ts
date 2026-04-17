import type { ComponentDoc } from "../../../types/page.types";
import { componentsCatalog } from "../components-catalog";
import { makeDoc, demoId } from "./_shared";

const props = componentsCatalog.molecules.find((c) => c.name === "Modal")!.props;

export const doc: ComponentDoc = makeDoc({
    name: "Modal",
    category: "molecules",
    description:
        "Dialog overlay for focused tasks that require immediate user attention. Use it for confirmations, short forms, and critical flows that shouldn’t lose context.",
    defaultExample: {
        title: "Default",
        description: "A modal with a title and a clear primary action.",
        demoId: demoId("Modal", "default"),
        code: `<Button onclick={() => (open = true)}>Open modal</Button>

<Modal title="Confirm changes" bind:open>
  <p class="text-description">This change affects all team members.</p>
  <div class="mt-4 flex justify-end gap-2">
    <Button variant="secondary" onclick={() => (open = false)}>Cancel</Button>
    <Button variant="primary" onclick={() => (open = false)}>Confirm</Button>
  </div>
</Modal>`,
    },
    variantsStates: ["default"],
    props,
    guidelines: {
        whenToUse: [
            "Use for confirmations and short, self-contained tasks.",
            "Ensure a clear primary action and an obvious way to cancel/close.",
        ],
        whenToAvoid: [
            "Avoid deep multi-step flows in a modal; use a dedicated page when complexity grows.",
            "Avoid opening modals without moving focus into the dialog.",
        ],
    },
});

