<script lang="ts">
    import Table, { type TableStacked } from '../../components/atoms/Table.svelte';

    interface Props {
        caption?: string;
        captionHidden?: boolean;
        stacked?: TableStacked;
    }

    let { caption = 'Workspace members', captionHidden = false, stacked = false }: Props = $props();
</script>

<!-- `data-label` repeats the column header on each cell; the stacked layout shows it beside the value. -->
<Table {caption} {captionHidden} {stacked}>
    <thead>
        <tr class="border-b border-border bg-surface-elevated">
            <th class="px-4 py-3 text-left font-medium text-headline">Name</th>
            <th class="px-4 py-3 text-left font-medium text-headline">Role</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-border">
        <tr class="hover:bg-surface-hover">
            <td class="px-4 py-3" data-label="Name">Ada</td>
            <td class="px-4 py-3 text-description" data-label="Role">Admin</td>
        </tr>
        <tr class="hover:bg-surface-hover">
            <td class="px-4 py-3" data-label="Name">Lin</td>
            <td class="px-4 py-3 text-description" data-label="Role">Editor</td>
        </tr>
        <tr class="hover:bg-surface-hover">
            <td class="px-4 py-3" data-label="Name">Noor</td>
            <td class="px-4 py-3 text-description" data-label="Role">Viewer</td>
        </tr>
    </tbody>
</Table>
