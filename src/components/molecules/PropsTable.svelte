<script lang="ts">
    import { zabiStringsFor } from "../util/zabi-strings.js";
    import type { ComponentProp } from "../types/page.types";
    import Table from "../atoms/Table.svelte";
    import { cn } from "../util/cn.js";
    import {
        DEFAULT_PROPS_TABLE_STRINGS,
        type PropsTableStrings,
    } from "../util/ready-made-strings.js";

    interface Props {
        /** Extra classes for the host element. */
        class?: string;
        props: ComponentProp[];
        caption?: string;
        /** The column headings, Yes and No, and the line for an empty table. */
        strings?: Partial<PropsTableStrings>;
    }

    let { class: className = "", props, caption = "Props / API", strings }: Props = $props();

    /** The app-wide words for this component, from a `ZabiStringsProvider` above it, if there is one. */
    const provided = zabiStringsFor("propsTable");
    const text = $derived({ ...DEFAULT_PROPS_TABLE_STRINGS, ...provided(), ...strings });
</script>

{#if props.length === 0}
    <div class={cn("rounded-control border border-border bg-card px-4 py-4 text-sm text-description", className)}>
        {text.empty}
    </div>
{:else}
    <Table caption={caption}>
        <thead>
            <tr class="bg-surface-elevated">
                <th class="border-b border-border px-4 py-3 text-left font-semibold text-headline">
                    {text.name}
                </th>
                <th class="border-b border-border px-4 py-3 text-left font-semibold text-headline">
                    {text.type}
                </th>
                <th class="border-b border-border px-4 py-3 text-left font-semibold text-headline">
                    {text.required}
                </th>
                <th class="border-b border-border px-4 py-3 text-left font-semibold text-headline">
                    {text.default}
                </th>
                <th class="border-b border-border px-4 py-3 text-left font-semibold text-headline">
                    {text.description}
                </th>
            </tr>
        </thead>
        <tbody>
            {#each props as prop}
                <tr class="hover:bg-surface-hover">
                    <td class="border-b border-border px-4 py-3 font-mono text-body">
                        {prop.name}
                    </td>
                    <td class="border-b border-border px-4 py-3 text-description">
                        {prop.type}
                    </td>
                    <td class="border-b border-border px-4 py-3 text-description">
                        {prop.required ? text.yes : text.no}
                    </td>
                    <td class="border-b border-border px-4 py-3 text-description">
                        {prop.defaultValue || "—"}
                    </td>
                    <td class="border-b border-border px-4 py-3 text-description">
                        {prop.description}
                    </td>
                </tr>
            {/each}
        </tbody>
    </Table>
{/if}

