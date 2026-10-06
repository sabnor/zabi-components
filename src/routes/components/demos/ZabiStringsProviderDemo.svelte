<script lang="ts">
    import Input from "../../../components/atoms/Input.svelte";
    import Select from "../../../components/atoms/Select.svelte";
    import ZabiStringsProvider from "../../../components/atoms/ZabiStringsProvider.svelte";
    import FormField from "../../../components/molecules/FormField.svelte";
    import type { ZabiStrings } from "../../../components/util/zabi-strings.js";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    /** An app's own words, in its own language. The library ships no translations; this is where an app passes them. */
    const appStrings: ZabiStrings = {
        common: { required: "(needed)", showPassword: "Reveal password", close: "Dismiss" },
        select: {
            placeholder: "Pick an option",
            searchPlaceholder: "Type to filter",
            noResults: "Nothing found",
            listLabel: "Choices",
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
    field, "(needed)" and the password button are the provider's. -->
    <ZabiStringsProvider strings={appStrings}>
        <div class="w-full max-w-lg space-y-4">
            <Select label="Pub" options={pubs} bind:value={pub} />
            <FormField label="Your group" required>
                {#snippet control(field)}
                    <Input {...field} />
                {/snippet}
            </FormField>
            <Input label="Password" type="password" revealable />
        </div>
    </ZabiStringsProvider>
{:else}
    <!-- A component's own `strings` and props still win over the provider. -->
    <ZabiStringsProvider strings={appStrings}>
        <div class="w-full max-w-lg space-y-4">
            <Select label="From the provider" options={pubs} bind:value={pub} />
            <Select
                label="With its own text"
                options={pubs}
                placeholder="Which pub?"
                bind:value={other}
            />
        </div>
    </ZabiStringsProvider>
{/if}
