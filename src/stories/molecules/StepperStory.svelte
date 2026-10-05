<script lang="ts">
    import Button from "../../components/atoms/Button.svelte";
    import Stepper from "../../components/molecules/Stepper.svelte";

    interface Props {
        /** Number of steps, taken from the start of a seven-step list. */
        count?: number;
        /** The step to start at, counted from 0. */
        start?: number;
        size?: "sm" | "md" | "lg";
        layout?: "auto" | "full" | "compact";
        interactive?: boolean;
        /** A line under each label. */
        descriptions?: boolean;
        /** Swedish labels and strings. */
        swedish?: boolean;
        /** Width of the box around the Stepper, in px. The layout follows this, not the screen. */
        frameWidth?: number;
    }

    let {
        count = 3,
        start = 1,
        size = "md",
        layout = "auto",
        interactive = false,
        descriptions = false,
        swedish = false,
        frameWidth = 640,
    }: Props = $props();

    const english = [
        { label: "Details", description: "Place and date" },
        { label: "Ratings", description: "Quiz, food and mood" },
        { label: "Result + notes", description: "Score and what happened" },
        { label: "Photos", description: "From the night" },
        { label: "Team", description: "Who was there" },
        { label: "Share", description: "With the league" },
        { label: "Done", description: "All saved" },
    ];
    const translated = [
        { label: "Detaljer", description: "Plats och datum" },
        { label: "Betyg", description: "Quiz, mat och stämning" },
        { label: "Resultat + anteckningar", description: "Poäng och vad som hände" },
        { label: "Foton", description: "Från kvällen" },
        { label: "Lag", description: "Vilka som var med" },
        { label: "Dela", description: "Med ligan" },
        { label: "Klart", description: "Allt sparat" },
    ];
    const stateWords = { completed: "klart", current: "aktuellt", upcoming: "kommande" };

    const steps = $derived(
        (swedish ? translated : english)
            .slice(0, count)
            .map((step) => (descriptions ? step : step.label)),
    );

    // svelte-ignore state_referenced_locally
    let current = $state(start);
</script>

<div class="space-y-4" style:width="min(100%, {frameWidth}px)">
    <Stepper
        {steps}
        bind:current
        {size}
        {layout}
        {interactive}
        label={swedish ? "Förlopp" : undefined}
        strings={swedish
            ? {
                  position: (step, total) => `Steg ${step} av ${total}`,
                  stepLabel: (step, total, label, state) =>
                      `Steg ${step} av ${total}: ${label}, ${stateWords[state]}`,
                  announcement: (step, total, label) => `Steg ${step} av ${total}: ${label}`,
              }
            : undefined}
    />
    <div class="flex flex-wrap gap-2">
        <Button variant="outline" disabled={current <= 0} onclick={() => (current -= 1)}>
            {swedish ? "Tillbaka" : "Back"}
        </Button>
        <Button disabled={current >= steps.length - 1} onclick={() => (current += 1)}>
            {swedish ? "Nästa" : "Next"}
        </Button>
    </div>
</div>
