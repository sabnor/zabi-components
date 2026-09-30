<script lang="ts">
    import Table, { type TableStacked } from '../../components/atoms/Table.svelte';
    import Button from '../../components/atoms/Button.svelte';

    interface Props {
        caption?: string;
        captionHidden?: boolean;
        stacked?: TableStacked;
    }

    let { caption = 'Workspace members', captionHidden = false, stacked = false }: Props = $props();
</script>

<!-- `data-label` repeats the column header on each cell; the stacked layout shows it beside the value.
     The actions cell has none, so its buttons sit on the value side with no label. -->
<Table {caption} {captionHidden} {stacked}>
    <thead>
        <tr class="border-b border-border bg-surface-elevated">
            <th class="px-4 py-3 text-left font-medium text-headline">Name</th>
            <th class="px-4 py-3 text-left font-medium text-headline">Role</th>
            <th class="px-4 py-3 text-left font-medium text-headline"><span class="sr-only">Actions</span></th>
        </tr>
    </thead>
    <tbody class="divide-y divide-border">
        <tr class="hover:bg-surface-hover">
            <td class="px-4 py-3" data-label="Name">Ada</td>
            <td class="px-4 py-3 text-description" data-label="Role">Admin</td>
            <td class="px-4 py-3">
                <Button variant="link" size="sm" text="Edit" aria-label="Edit Ada" />
                <Button variant="link" size="sm" text="Remove" aria-label="Remove Ada" />
            </td>
        </tr>
        <tr class="hover:bg-surface-hover">
            <td class="px-4 py-3" data-label="Name">Lin</td>
            <td class="px-4 py-3 text-description" data-label="Role">Editor</td>
            <td class="px-4 py-3">
                <Button variant="link" size="sm" text="Edit" aria-label="Edit Lin" />
                <Button variant="link" size="sm" text="Remove" aria-label="Remove Lin" />
            </td>
        </tr>
        <tr class="hover:bg-surface-hover">
            <td class="px-4 py-3" data-label="Name">Noor</td>
            <td class="px-4 py-3 text-description" data-label="Role">Viewer</td>
            <td class="px-4 py-3">
                <Button variant="link" size="sm" text="Edit" aria-label="Edit Noor" />
                <Button variant="link" size="sm" text="Remove" aria-label="Remove Noor" />
            </td>
        </tr>
    </tbody>
</Table>
