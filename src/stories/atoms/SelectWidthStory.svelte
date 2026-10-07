<script lang="ts">
    import Select from '../../components/atoms/Select.svelte';

    const options = [
        { value: 'daily', label: 'Every day' },
        { value: 'weekly', label: 'Every week' }
    ];
</script>

<div class="w-32 outline outline-1 outline-dashed">
    <Select label="Frequency" class="w-48" {options} />
</div>
