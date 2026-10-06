<script lang="ts">
    import Input from "../../../components/atoms/Input.svelte";
    import Select from "../../../components/atoms/Select.svelte";
    import ZabiStringsProvider from "../../../components/atoms/ZabiStringsProvider.svelte";
    import FormField from "../../../components/molecules/FormField.svelte";
    import type { ZabiStrings } from "../../../components/util/zabi-strings.js";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    /** An app's own words. The library ships no translations. */
    const sv: ZabiStrings = {
        common: { required: "(obligatoriskt)", showPassword: "Visa lösenordet", close: "Stäng" },
        select: {
            placeholder: "Välj ett alternativ",
            searchPlaceholder: "Sök",
            noResults: "Inga träffar",
            listLabel: "Alternativ",
        },
    };

    const pubs = [
        { value: "akkurat", label: "Akkurat" },
        { value: "kvarnen", label: "Kvarnen" },
    ];
    let pub = $state<string | number | undefined>(undefined);
    let other = $state<string | number | undefined>(undefined);
</script>

{#if exampleIndex === 0}
    <!-- Nothing is set on the components inside: the placeholder, the search
    field, "(obligatoriskt)" and the password button are the provider's. -->
    <ZabiStringsProvider strings={sv}>
        <div class="w-full max-w-lg space-y-4">
            <Select label="Pub" options={pubs} bind:value={pub} />
            <FormField label="Sällskap" required>
                {#snippet control(field)}
                    <Input {...field} />
                {/snippet}
            </FormField>
            <Input label="Lösenord" type="password" revealable />
        </div>
    </ZabiStringsProvider>
{:else}
    <!-- A component's own `strings` and props still win over the provider. -->
    <ZabiStringsProvider strings={sv}>
        <div class="w-full max-w-lg space-y-4">
            <Select label="Från appen" options={pubs} bind:value={pub} />
            <Select
                label="Med egen text"
                options={pubs}
                placeholder="Vilken pub?"
                bind:value={other}
            />
        </div>
    </ZabiStringsProvider>
{/if}
