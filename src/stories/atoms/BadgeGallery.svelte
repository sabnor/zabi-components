<script lang="ts">
    import Badge from '../../components/atoms/Badge.svelte';
    import type { ExtendedSemanticVariant, SizeVariant } from '../../components/types/variants.js';

    interface Props {
        showIcon?: boolean;
    }

    let { showIcon = true }: Props = $props();

    const variants: ExtendedSemanticVariant[] = [
        'default',
        'success',
        'warning',
        'error',
        'info',
        'neutral',
        'energetic',
    ];
    const sizes: SizeVariant[] = ['sm', 'md', 'lg'];
</script>

<div class="flex flex-col gap-5">
    <div class="flex flex-col gap-2">
        <span class="text-xs font-medium tracking-wide text-caption uppercase">Subtle (default)</span>
        <div class="flex flex-wrap items-center gap-2">
            {#each variants as variant (variant)}
                <Badge {variant} {showIcon} text={variant} />
            {/each}
        </div>
    </div>

    <div class="flex flex-col gap-2">
        <span class="text-xs font-medium tracking-wide text-caption uppercase">Solid</span>
        <div class="flex flex-wrap items-center gap-2">
            {#each variants as variant (variant)}
                <Badge {variant} {showIcon} emphasis="solid" text={variant} />
            {/each}
        </div>
    </div>

    <div class="flex flex-col gap-2">
        <span class="text-xs font-medium tracking-wide text-caption uppercase">Sizes</span>
        <div class="flex flex-wrap items-center gap-2">
            {#each sizes as size (size)}
                <Badge variant="info" {size} {showIcon} text={size} />
            {/each}
        </div>
    </div>
</div>
