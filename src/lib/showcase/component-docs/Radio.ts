import type { ComponentDoc } from "../../../types/page.types";
import { componentsCatalog } from "../components-catalog";
import { makeDoc, demoId } from "./_shared";

const props = componentsCatalog.atoms.find((c) => c.name === "Radio")!.props;

export const doc: ComponentDoc = makeDoc({
    name: "Radio",
    category: "atoms",
    description:
        "Single radio input for mutually exclusive choices. Use `RadioGroup` when you want a fully accessible group with arrow-key navigation and a single bindable value.",
    defaultExample: {
        title: "Default",
        description: "Use a label and a shared `name` to form a native radio group.",
        demoId: demoId("Radio", "default"),
        code: `<Radio name="plan" value="basic" label="Basic plan" />`,
    },
    examples: [
        {
            title: "Group usage",
            description:
                "Use `RadioGroup` for options arrays, a semantic fieldset/legend, and roving focus with arrow keys.",
            demoId: demoId("Radio", "group"),
            code: `<RadioGroup
  legend="Billing cadence"
  options={[
    { value: "monthly", label: "Monthly" },
    { value: "annual", label: "Annual", description: "Save 20% with annual billing" }
  ]}
/>`,
        },
        {
            title: "Disabled state",
            description:
                "Disable either the whole group or individual options to prevent selection.",
            demoId: demoId("Radio", "disabled"),
            code: `<RadioGroup
  legend="Notifications"
  disabled={true}
  options={[
    { value: "all", label: "All activity" },
    { value: "mentions", label: "Mentions only" }
  ]}
/>`,
        },
        {
            title: "Realistic form",
            description:
                "Bind the selected value and use it to drive UI (e.g. helper copy or conditional fields).",
            demoId: demoId("Radio", "realistic"),
            code: `<script lang="ts">
  let billing = $state("annual");
</script>

<RadioGroup
  legend="Choose a plan"
  bind:value={billing}
  options={[
    { value: "starter", label: "Starter", description: "For personal projects" },
    { value: "team", label: "Team", description: "For collaborating with others" },
    { value: "enterprise", label: "Enterprise", description: "Advanced controls and SSO" }
  ]}
/>

<p class="text-sm text-description mt-2">
  Selected: {billing}
</p>`,
        },
    ],
    props,
    guidelines: {
        whenToUse: [
            "Use `Radio` for a single option when you’re composing a custom layout and already have grouping handled.",
            "Use `RadioGroup` for standard forms: it provides a `<fieldset>` and keyboard navigation by default.",
        ],
        whenToAvoid: [
            "Avoid using standalone radios without a clear group label/legend — users need context for what the choices represent.",
        ],
    },
});

