<script lang="ts">
    /**
     * Optional product mark + wordmark for sidebar shells (e.g. Daybridge-style rails).
     */
    interface Props {
        /** When true, only the logo (or monogram) is shown. */
        collapsed?: boolean;
        /** Product or company name beside the logo. */
        brandName?: string;
        /** Optional logo image URL. */
        logoSrc?: string;
        /** Accessible name for the logo image. */
        logoAlt?: string;
        className?: string;
    }

    let {
        collapsed = false,
        brandName = "",
        logoSrc = "",
        logoAlt = "",
        className = "",
    }: Props = $props();

    const trimmedName = $derived(brandName.trim());
    const monogram = $derived(
        trimmedName
            ? trimmedName
                  .split(/\s+/)
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
            : "",
    );
    const showLogo = $derived(Boolean(logoSrc));
    const showWordmark = $derived(Boolean(trimmedName) && !collapsed);
    const showMonogram = $derived(
        collapsed && !showLogo && Boolean(monogram),
    );
</script>

{#if showLogo || trimmedName}
    <div
        class={`flex w-full min-w-0 items-center gap-2.5 ${className}`.trim()}
    >
        {#if showLogo}
            <span
                class="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-background ring-1 ring-border"
            >
                <img
                    src={logoSrc}
                    alt={logoAlt || trimmedName || "Brand"}
                    class="size-full object-cover"
                    width="36"
                    height="36"
                />
            </span>
        {:else if showMonogram}
            <span
                class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-action-primary-subtle text-xs font-bold text-headline ring-1 ring-border"
                aria-hidden="true"
            >
                {monogram}
            </span>
        {/if}
        {#if showWordmark}
            <span
                class="truncate text-base font-semibold tracking-tight text-headline"
            >
                {trimmedName}
            </span>
        {/if}
    </div>
{/if}
