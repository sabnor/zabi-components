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

