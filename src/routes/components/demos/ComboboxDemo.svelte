<script lang="ts">
    import Combobox from "../../../components/molecules/Combobox.svelte";
    import type { ComboboxItem } from "../../../components/util/combobox";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    const places: ComboboxItem[] = [
        { value: "stockholm", label: "Stockholm", description: "Stockholms län" },
        { value: "goteborg", label: "Göteborg", description: "Västra Götalands län" },
        { value: "malmo", label: "Malmö", description: "Skåne län" },
        { value: "uppsala", label: "Uppsala", description: "Uppsala län" },
        { value: "vasteras", label: "Västerås", description: "Västmanlands län" },
        { value: "orebro", label: "Örebro", description: "Örebro län" },
        { value: "linkoping", label: "Linköping", description: "Östergötlands län" },
        { value: "helsingborg", label: "Helsingborg", description: "Skåne län" },
        { value: "jonkoping", label: "Jönköping", description: "Jönköpings län" },
        { value: "norrkoping", label: "Norrköping", description: "Östergötlands län" },
        { value: "lund", label: "Lund", description: "Skåne län" },
        { value: "umea", label: "Umeå", description: "Västerbottens län" },
    ];

    // A short delay, so the searching state shows before the answer.
    const search = (query: string, signal: AbortSignal) =>
        new Promise<ComboboxItem[]>((resolve, reject) => {
            const timer = setTimeout(() => {
                const text = query.trim().toLowerCase();
                resolve(places.filter((place) => place.label.toLowerCase().includes(text)));
            }, 400);
            signal.addEventListener("abort", () => {
                clearTimeout(timer);
                reject(new DOMException("Aborted", "AbortError"));
            });
        });

    let place = $state("");
    let chosen = $state<ComboboxItem | null>(null);
    let ort = $state("");
    let vald = $state<ComboboxItem | null>(null);
</script>

{#if exampleIndex === 0}
    <div class="w-full max-w-xs">
        <Combobox
            label="Place"
            placeholder="Search a city"
            {search}
            bind:value={place}
            bind:selected={chosen}
            data-testid="combobox-demo-place"
        />
        <p class="mt-2 text-sm text-description">
            Chosen: <span data-testid="combobox-demo-place-chosen">{chosen?.label ?? "none"}</span>
        </p>
    </div>
{:else if exampleIndex === 1}
    <div class="w-full max-w-xs">
        <Combobox
            label="Ort"
            placeholder="Sök ort"
            {search}
            bind:value={ort}
            bind:selected={vald}
            strings={{
                loading: "Söker…",
                empty: "Inga träffar",
                results: (count) => (count === 1 ? "1 träff" : `${count} träffar`),
            }}
            data-testid="combobox-demo-sv"
        />
        <p class="mt-2 text-sm text-description">
            Vald ort: <span data-testid="combobox-demo-sv-chosen">{vald?.label ?? "ingen"}</span>
        </p>
    </div>
{/if}
