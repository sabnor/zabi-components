<script lang="ts">
    import Input from "../../../components/atoms/Input.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    let email = $state("name@company.com");
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
{:else}
    <div class="w-full">
        <Input label="Email address" type="email" bind:value={email} />
    </div>
{/if}

