<script lang="ts">
    import Divider from '../../components/atoms/Divider.svelte';

    interface Props {
        decorative?: boolean;
    }

    let { decorative = true }: Props = $props();
</script>

<div class="flex h-6 items-center gap-4 text-sm text-body">
    <span>Overview</span>
    <Divider orientation="vertical" {decorative} />
    <span>Activity</span>
    <Divider orientation="vertical" {decorative} />
    <span>Settings</span>
</div>
