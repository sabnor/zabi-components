<script lang="ts">
    import Table, { type TableStacked } from "../../src/components/atoms/Table.svelte";

    interface Props {
        caption?: string;
        captionHidden?: boolean;
        stacked?: TableStacked;
        rows?: string[];
    }

    let { caption = "Members", captionHidden, stacked, rows = ["Ada", "Lin"] }: Props = $props();
</script>

<Table {caption} {captionHidden} {stacked}>
    <thead>
        <tr>
            <th>Name</th>
            <th>Role</th>
        </tr>
    </thead>
    <tbody>
        {#each rows as name (name)}
            <tr>
                <th scope="row" data-label="Name">{name}</th>
                <td data-label="Role">Editor</td>
            </tr>
        {/each}
    </tbody>
</Table>
