<script lang="ts">
    import Radio from "../../../components/atoms/Radio.svelte";
    import RadioGroup from "../../../components/molecules/RadioGroup.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    let plan = $state("basic");
    let cadence = $state("annual");
    let notifications = $state("all");
    let selectedPlan = $state("team");
</script>

{#if exampleIndex === 0}
    <div class="w-full space-y-3">
        <p class="text-sm text-description">
            Pick a plan (native grouping via shared name).
        </p>
        <div class="space-y-2">
            <Radio
                name="plan-demo"
                value="basic"
                label="Basic plan"
                checked={plan === "basic"}
                onChange={() => (plan = "basic")}
            />
            <Radio
                name="plan-demo"
                value="pro"
                label="Pro plan"
                checked={plan === "pro"}
                onChange={() => (plan = "pro")}
            />
        </div>
        <p class="text-sm text-description">Selected: {plan}</p>
    </div>
{:else if exampleIndex === 1}
    <div class="w-full">
        <RadioGroup
            legend="Billing cadence"
            bind:value={cadence}
            options={[
                { value: "monthly", label: "Monthly" },
                {
                    value: "annual",
                    label: "Annual",
                    description: "Save 20% with annual billing",
                },
            ]}
        />
    </div>
{:else if exampleIndex === 2}
    <div class="w-full space-y-4">
        <RadioGroup
            legend="Notifications (disabled group)"
            disabled={true}
            bind:value={notifications}
            options={[
                { value: "all", label: "All activity" },
                { value: "mentions", label: "Mentions only" },
            ]}
        />
        <RadioGroup
            legend="Notifications (disabled option)"
            bind:value={notifications}
            options={[
                { value: "all", label: "All activity" },
                {
                    value: "mentions",
                    label: "Mentions only",
                    disabled: true,
                    description: "Unavailable on your current plan",
                },
            ]}
        />
    </div>
{:else if exampleIndex === 3}
    <div class="w-full space-y-3">
        <RadioGroup
            legend="Choose a plan"
            bind:value={selectedPlan}
            options={[
                {
                    value: "starter",
                    label: "Starter",
                    description: "For personal projects",
                },
                {
                    value: "team",
                    label: "Team",
                    description: "For collaborating with others",
                },
                {
                    value: "enterprise",
                    label: "Enterprise",
                    description: "Advanced controls and SSO",
                },
            ]}
        />
        <div class="rounded-lg border border-base-200 bg-base-50 p-3">
            <p class="text-sm font-medium text-label">Summary</p>
            <p class="text-sm text-description mt-1">
                Selected plan: <span class="text-body">{selectedPlan}</span>
            </p>
        </div>
    </div>
{:else}
    <div class="w-full">
        <RadioGroup
            legend="Example"
            options={[
                { value: "a", label: "Option A" },
                { value: "b", label: "Option B" },
            ]}
        />
    </div>
{/if}

