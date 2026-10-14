<script lang="ts">
    import PickerField from "../../src/components/atoms/PickerField.svelte";

    /** PickerField forms for tests/picker-field.test.ts and tests/picker-field-ssr.test.ts. */
    interface Props {
        scenario: "forms" | "bound";
    }

    let { scenario }: Props = $props();
    let element = $state<HTMLButtonElement | HTMLAnchorElement | null>(null);
</script>

{#if scenario === "forms"}
    <PickerField label="Pub" value="The Bishops Arms" name="pub" formValue="42" hint="Where you drank" />
    <PickerField label="Link pub" placeholder="Choose a pub" href="/pubs/choose" />
    <PickerField label="Gone" placeholder="Choose" href="/pubs/choose" disabled />
{:else}
    <PickerField label="Pub" value="Bishops" bind:element />
    <button type="button" onclick={() => element?.focus()}>Return focus</button>
{/if}
