<script lang="ts">
    import type { ComponentProp } from "../../types/page.types";
    import Table from "../atoms/Table.svelte";

    interface Props {
        props: ComponentProp[];
        caption?: string;
    }

    let { props, caption = "Props / API" }: Props = $props();
</script>

{#if props.length === 0}
    <div class="rounded-lg border border-border bg-base-50 px-4 py-4 text-sm text-description">
        No documented props.
    </div>
{:else}
    <Table caption={caption}>
        <thead>
            <tr class="bg-base-50">
                <th class="border-b border-border px-4 py-3 text-left font-semibold text-headline">
                    Name
                </th>
                <th class="border-b border-border px-4 py-3 text-left font-semibold text-headline">
                    Type
                </th>
                <th class="border-b border-border px-4 py-3 text-left font-semibold text-headline">
                    Required
                </th>
                <th class="border-b border-border px-4 py-3 text-left font-semibold text-headline">
                    Default
                </th>
                <th class="border-b border-border px-4 py-3 text-left font-semibold text-headline">
                    Description
                </th>
            </tr>
        </thead>
        <tbody>
            {#each props as prop}
                <tr class="hover:bg-base-50/70">
                    <td class="border-b border-border px-4 py-3 font-mono text-body">
                        {prop.name}
                    </td>
                    <td class="border-b border-border px-4 py-3 text-description">
                        {prop.type}
                    </td>
                    <td class="border-b border-border px-4 py-3 text-description">
                        {prop.required ? "Yes" : "No"}
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

