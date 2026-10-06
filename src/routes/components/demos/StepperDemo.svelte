<script lang="ts">
    import { tick } from "svelte";
    import Button from "../../../components/atoms/Button.svelte";
    import Input from "../../../components/atoms/Input.svelte";
    import Rating from "../../../components/atoms/Rating.svelte";
    import Textarea from "../../../components/atoms/Textarea.svelte";
    import Stepper from "../../../components/molecules/Stepper.svelte";
    import StickyActionBar from "../../../components/molecules/StickyActionBar.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    const steps = ["Details", "Ratings", "Result + notes"];
    const described = [
        { label: "Details", description: "Place and date" },
        { label: "Ratings", description: "Quiz, food and mood" },
        { label: "Result + notes", description: "Score and what happened" },
    ];
    /** An app passes its own words (its translations) through `strings`. */
    const stateWords = { completed: "done", current: "you are here", upcoming: "still to do" };

    let basic = $state(1);
    let back = $state(2);
    let wentBackTo = $state("nothing yet");
    let translated = $state(1);

    /** The three-step form. */
    let formStep = $state(0);
    let heading: HTMLElement | undefined = $state();
    let visit = $state({ place: "The Crown", date: "", quiz: null as number | null, notes: "" });
    let outcome = $state("Nothing saved yet.");

    /** The Stepper reads the step out; putting focus on its heading is the form's part. */
    async function go(to: number) {
        formStep = to;
        await tick();
        heading?.focus();
    }

    function save(event: SubmitEvent) {
        event.preventDefault();
        outcome = `Saved the visit to ${visit.place}.`;
    }
</script>

{#if exampleIndex === 0}
    <div class="w-full space-y-4">
        <div data-testid="stepper-demo-basic-frame">
            <Stepper {steps} bind:current={basic} data-testid="stepper-demo-basic" />
        </div>
        <div class="flex flex-wrap items-center gap-2">
            <Button
                variant="outline"
                disabled={basic === 0}
                onclick={() => (basic -= 1)}
                data-testid="stepper-demo-basic-back"
            >
                Back
            </Button>
            <Button
                disabled={basic === steps.length - 1}
                onclick={() => (basic += 1)}
                data-testid="stepper-demo-basic-next"
            >
                Next
            </Button>
            <span class="text-sm text-description">
                current: <span data-testid="stepper-demo-basic-value">{basic}</span>
            </span>
        </div>
    </div>
{:else if exampleIndex === 1}
    <div class="w-full space-y-3">
        <form
            class="mx-auto flex h-96 flex-col overflow-y-auto rounded-container border border-border sm:w-96"
            onsubmit={save}
            data-testid="stepper-demo-form"
        >
            <div class="flex-1 space-y-4 p-4">
                <Stepper {steps} current={formStep} data-testid="stepper-demo-form-stepper" />
                <h3
                    bind:this={heading}
                    tabindex="-1"
                    class="focus-ring rounded-control text-lg font-semibold text-headline"
                    data-testid="stepper-demo-form-heading"
                >
                    {steps[formStep]}
                </h3>
                {#if formStep === 0}
                    <Input id="stepper-demo-place" label="Place" bind:value={visit.place} />
                    <Input id="stepper-demo-date" label="Date" type="date" bind:value={visit.date} />
                {:else if formStep === 1}
                    <Rating label="Quiz" bind:value={visit.quiz} />
                {:else}
                    <Textarea id="stepper-demo-notes" label="Notes" bind:value={visit.notes} />
                {/if}
            </div>
            <StickyActionBar label="Log visit">
                {#if formStep > 0}
                    <Button
                        variant="ghost"
                        size="lg"
                        onclick={() => go(formStep - 1)}
                        data-testid="stepper-demo-form-back"
                    >
                        Back
                    </Button>
                {/if}
                {#if formStep < steps.length - 1}
                    <Button size="lg" onclick={() => go(formStep + 1)} data-testid="stepper-demo-form-next">
                        Next
                    </Button>
                {:else}
                    <Button type="submit" size="lg">Save visit</Button>
                {/if}
            </StickyActionBar>
        </form>
        <p class="text-sm text-description">{outcome}</p>
    </div>
{:else if exampleIndex === 2}
    <div class="w-full space-y-3">
        <Stepper
            {steps}
            bind:current={back}
            interactive
            onstepchange={(index) => (wentBackTo = steps[index])}
            data-testid="stepper-demo-interactive"
        />
        <p class="text-sm text-description">
            current: <span data-testid="stepper-demo-interactive-value">{back}</span>, went back to:
            <span data-testid="stepper-demo-interactive-event">{wentBackTo}</span>
        </p>
        <Button variant="outline" onclick={() => (back = 2)} data-testid="stepper-demo-interactive-reset">
            To the last step
        </Button>
    </div>
{:else if exampleIndex === 3}
    <!-- Wide enough for the full layout whatever the card is; scrolls inside its own box on a phone. -->
    <div class="w-full space-y-6">
        <div class="overflow-x-auto">
            <div class="min-w-[480px] p-1">
                <Stepper {steps} current={1} layout="full" data-testid="stepper-demo-full" />
            </div>
        </div>
        <Stepper {steps} current={1} layout="compact" data-testid="stepper-demo-compact" />
        <Stepper {steps} current={1} size="sm" data-testid="stepper-demo-sm" />
        <Stepper {steps} current={1} size="lg" data-testid="stepper-demo-lg" />
        <Stepper steps={described} current={1} data-testid="stepper-demo-described" />
    </div>
{:else}
    <div class="w-full space-y-3">
        <Stepper
            {steps}
            bind:current={translated}
            label="Review progress"
            strings={{
                position: (step, total) => `Part ${step} of ${total}`,
                stepLabel: (step, total, label, state) =>
                    `Part ${step} of ${total}: ${label}, ${stateWords[state]}`,
                announcement: (step, total, label) => `Now on part ${step} of ${total}: ${label}`,
            }}
            data-testid="stepper-demo-swedish"
        />
        <div class="flex flex-wrap gap-2">
            <Button variant="outline" disabled={translated === 0} onclick={() => (translated -= 1)}>
                Back
            </Button>
            <Button disabled={translated === steps.length - 1} onclick={() => (translated += 1)}>
                Next
            </Button>
        </div>
    </div>
{/if}
