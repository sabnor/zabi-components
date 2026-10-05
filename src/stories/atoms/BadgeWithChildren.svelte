<script lang="ts">
    import Badge from '../../components/atoms/Badge.svelte';
    import type { BadgeVariant } from '../../components/types/variants.js';

    interface Props {
        variant?: BadgeVariant;
        showIcon?: boolean;
    }

    let { variant = 'info', showIcon = false }: Props = $props();
</script>

<Badge {variant} {showIcon}>
    Custom content with <strong class="font-semibold">children</strong>
</Badge>
