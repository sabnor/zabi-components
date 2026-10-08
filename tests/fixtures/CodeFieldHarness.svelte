<script lang="ts">
    import CodeField from "../../src/components/atoms/CodeField.svelte";
    import ZabiStringsProvider from "../../src/components/atoms/ZabiStringsProvider.svelte";

    let {
        initial = "",
        oncomplete,
        provider = false,
    }: { initial?: string; oncomplete?: (value: string) => void; provider?: boolean } = $props();
    // svelte-ignore state_referenced_locally
    let code = $state(initial);
</script>

{#if provider}
    <ZabiStringsProvider
        strings={{ codeField: { label: "Verifieringskod", description: (n: number) => `${n} siffror` } }}
    >
        <CodeField bind:value={code} name="code" />
    </ZabiStringsProvider>
{:else}
    <CodeField bind:value={code} {oncomplete} name="code" />
    <button type="button" onclick={() => (code = "654321")}>Set</button>
    <output data-testid="bound">{code}</output>
{/if}
