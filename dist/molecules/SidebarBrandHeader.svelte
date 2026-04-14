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
        class={`flex w-full min-w-0 items-center gap-3 px-2 ${className}`.trim()}
    >
        {#if showLogo}
            <span
                class="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-background ring-1 ring-border"
            >
                <img
                    src={logoSrc}
                    alt={logoAlt || trimmedName || "Brand"}
                    class="size-full object-cover"
                    width="40"
                    height="40"
                />
            </span>
        {:else if showMonogram}
            <span
                class="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-action-primary-subtle text-sm font-bold text-headline ring-1 ring-border"
                aria-hidden="true"
            >
                {monogram}
            </span>
        {/if}
        {#if showWordmark}
            <span
                class="truncate text-lg font-semibold tracking-tight text-headline"
            >
                {trimmedName}
            </span>
        {/if}
    </div>
{/if}
