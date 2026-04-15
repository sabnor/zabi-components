<script lang="ts">
    import Table from '../../components/atoms/Table.svelte';
</script>

<Table caption="Example data">
    <thead>
        <tr class="border-b border-border bg-base-50">
            <th class="px-4 py-3 text-left font-medium text-headline">Name</th>
            <th class="px-4 py-3 text-left font-medium text-headline">Role</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-border">
        <tr class="hover:bg-base-50/80">
            <td class="px-4 py-3">Ada</td>
            <td class="px-4 py-3 text-description">Admin</td>
        </tr>
        <tr class="hover:bg-base-50/80">
            <td class="px-4 py-3">Lin</td>
            <td class="px-4 py-3 text-description">Editor</td>
        </tr>
    </tbody>
</Table>
