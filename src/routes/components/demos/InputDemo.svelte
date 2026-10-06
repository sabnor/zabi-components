<script lang="ts">
    import Search from "@lucide/svelte/icons/search";
    import X from "@lucide/svelte/icons/x";
    import IconButton from "../../../components/atoms/IconButton.svelte";
    import Input from "../../../components/atoms/Input.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    let email = $state("name@company.com");
    let password = $state("");
    let query = $state("quiz night");
    let weight = $state("72");
    let secret = $state("correct horse");
    const tooShort = $derived(password.length > 0 && password.length < 8);
</script>

{#if exampleIndex === 0}
    <div class="w-full">
        <Input
            label="Email address"
            type="email"
            placeholder="name@company.com"
            bind:value={email}
        />
    </div>
{:else if exampleIndex === 1}
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <Input
            label="Email address"
            type="email"
            placeholder="name@company.com"
            bind:value={email}
        />
        <Input
            variant="error"
            label="Email address"
            type="email"
            placeholder="name@company.com"
            bind:value={email}
        />
    </div>
{:else if exampleIndex === 2}
    <div class="w-full space-y-4">
        <Input
            label="Password"
            type="password"
            autocomplete="new-password"
            hint="At least 8 characters."
            error={tooShort ? "That is fewer than 8 characters." : ""}
            bind:value={password}
            data-testid="input-demo-hint"
        />
        <Input
            label="Display name"
            hint="Shown beside your results."
            data-testid="input-demo-hint-only"
        />
    </div>
{:else if exampleIndex === 3}
    <div class="w-full space-y-4">
        <Input
            label="Password"
            type="password"
            autocomplete="current-password"
            revealable
            bind:value={secret}
            data-testid="input-demo-reveal"
        />
        <Input label="Search" type="search" bind:value={query} data-testid="input-demo-search">
            {#snippet leading()}
                <Search size={16} aria-hidden="true" />
            {/snippet}
            {#snippet trailing()}
                <IconButton
                    variant="ghost"
                    size="sm"
                    label="Clear search"
                    class="rounded-[calc(var(--radius-control)-4px)]"
                    onclick={() => (query = "")}
                    data-testid="input-demo-clear"
                >
                    <X size={16} aria-hidden="true" />
                </IconButton>
            {/snippet}
        </Input>
        <Input
            label="Weight"
            inputmode="decimal"
            bind:value={weight}
            loading
            data-testid="input-demo-unit"
        >
            {#snippet trailing()}
                <span class="text-sm">kg</span>
            {/snippet}
        </Input>
    </div>
{:else}
    <div class="w-full">
        <Input label="Email address" type="email" bind:value={email} />
    </div>
{/if}

