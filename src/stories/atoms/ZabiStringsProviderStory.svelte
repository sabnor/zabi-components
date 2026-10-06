<script lang="ts">
    import Input from "../../components/atoms/Input.svelte";
    import Select from "../../components/atoms/Select.svelte";
    import ZabiStringsProvider from "../../components/atoms/ZabiStringsProvider.svelte";
    import AppBar from "../../components/molecules/AppBar.svelte";
    import FormField from "../../components/molecules/FormField.svelte";
    import Stepper from "../../components/molecules/Stepper.svelte";
    import type { ZabiStrings } from "../../components/util/zabi-strings.js";

    interface Props {
        /** Off: the same components with no provider, in the built-in English. */
        swedish?: boolean;
    }
    let { swedish = true }: Props = $props();

    /**
     * An app's words in Swedish, for the components it uses. The library
     * ships no translations: this object is the app's, and only as long as
     * the list of components the app renders.
     */
    const sv: ZabiStrings = {
        common: {
            close: "Stäng",
            back: "Tillbaka",
            expand: "Visa mer",
            collapse: "Visa mindre",
            required: "(obligatoriskt)",
            showPassword: "Visa lösenordet",
            search: "Sök…",
            confirm: "Bekräfta",
            cancel: "Avbryt",
        },
        select: {
            placeholder: "Välj ett alternativ",
            searchPlaceholder: "Sök",
            noResults: "Inga träffar",
            loading: "Hämtar alternativ…",
            emptyTitle: "Inga alternativ",
            emptyDescription: "Lägg till ett alternativ för att kunna välja.",
            listLabel: "Alternativ",
        },
        stepper: {
            position: (step, total) => `Steg ${step} av ${total}`,
            stepLabel: (step, total, label, state) =>
                `Steg ${step} av ${total}: ${label}, ${{ completed: "klart", current: "pågår", upcoming: "kommer" }[state]}`,
            announcement: (step, total, label) => `Steg ${step} av ${total}: ${label}`,
        },
    };

    const pubs = [
        { value: "akkurat", label: "Akkurat" },
        { value: "kvarnen", label: "Kvarnen" },
    ];
    let pub = $state<string | number | undefined>(undefined);
</script>

{#snippet screen()}
    <div class="w-[360px] max-w-full border border-border">
        <AppBar title="Logga besök" onback={() => {}} />
        <div class="space-y-4 p-4">
            <Stepper steps={["Pub", "Betyg", "Klart"]} current={0} />
            <Select label="Pub" options={pubs} bind:value={pub} />
            <FormField label="Sällskap" required>
                {#snippet control(field)}
                    <Input {...field} />
                {/snippet}
            </FormField>
            <Input label="Lösenord" type="password" revealable />
        </div>
    </div>
{/snippet}

{#if swedish}
    <ZabiStringsProvider strings={sv}>
        {@render screen()}
    </ZabiStringsProvider>
{:else}
    {@render screen()}
{/if}
