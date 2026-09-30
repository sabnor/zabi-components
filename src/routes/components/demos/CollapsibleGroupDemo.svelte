<script lang="ts">
    import Collapsible from "../../../components/molecules/Collapsible.svelte";
    import CollapsibleGroup from "../../../components/molecules/CollapsibleGroup.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    const questions = [
        {
            id: "invoice",
            title: "When is the invoice sent?",
            answer: "On the first working day of each month, to the billing contact of the account.",
        },
        {
            id: "seats",
            title: "Can seats be added during a period?",
            answer: "Yes. New seats are charged for the days that remain in the period.",
        },
        {
            id: "cancel",
            title: "How does cancelling work?",
            answer: "The plan runs until the end of the paid period and is not renewed.",
        },
    ];
</script>

<div class="w-full rounded-container border border-border bg-surface-raised p-1">
    <CollapsibleGroup multiple={exampleIndex === 1} class="gap-1">
        {#each questions as question, index (question.id)}
            <Collapsible
                title={question.title}
                headingLevel={3}
                open={exampleIndex === 1 && index < 2}
            >
                <p class="text-sm text-description">{question.answer}</p>
            </Collapsible>
        {/each}
    </CollapsibleGroup>
</div>
