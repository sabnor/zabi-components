<script lang="ts">
    import Checkbox from "../../src/components/atoms/Checkbox.svelte";
    import Radio from "../../src/components/atoms/Radio.svelte";
    import Toggle from "../../src/components/atoms/Toggle.svelte";

    let { control, label = "Anna" }: { control: "checkbox" | "radio" | "toggle"; label?: string } = $props();
</script>

{#snippet leading()}
    <span data-testid="leading" aria-hidden="true" style="width:24px;height:24px"></span>
{/snippet}

{#if control === "checkbox"}
    <Checkbox {label} {leading} />
{:else if control === "radio"}
    <Radio name="who" value="anna" {label} {leading} />
{:else}
    <Toggle {label} {leading} />
{/if}
