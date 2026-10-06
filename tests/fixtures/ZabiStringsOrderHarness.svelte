<script lang="ts">
    import type { Component } from "svelte";
    import ZabiStringsProvider from "../../src/components/atoms/ZabiStringsProvider.svelte";

    /**
     * The order the words are resolved in, on one text: the provider's, then
     * the instance's `strings`, then the instance's single-text prop.
     */
    interface Props {
        // Select, passed in so the test names what it renders.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component: Component<any>;
    }
    let { component: Field }: Props = $props();
</script>

<ZabiStringsProvider strings={{ select: { placeholder: "Från appen" } }}>
    <Field label="Ett" options={[]} />
    <Field label="Två" options={[]} strings={{ placeholder: "Från instansen" }} />
    <Field label="Tre" options={[]} strings={{ placeholder: "Från instansen" }} placeholder="Från propen" />
</ZabiStringsProvider>
