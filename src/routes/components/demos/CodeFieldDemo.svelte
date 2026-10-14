<script lang="ts">
    import CodeField from "../../../components/atoms/CodeField.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();
    let code = $state("");
    let letters = $state("");
</script>

<div class="w-full max-w-xs">
    {#if exampleIndex === 0}
        <CodeField bind:value={code} name="code" hint="From the email we sent you" />
    {:else if exampleIndex === 1}
        <CodeField name="code" error="That code is not right." value="123456" />
    {:else if exampleIndex === 2}
        <CodeField name="code" length={8} groups={4} size="sm" />
    {:else}
        <CodeField bind:value={letters} length={4} mode="alphanumeric" label="Invite code" />
    {/if}
</div>
