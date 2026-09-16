<script lang="ts">
    interface Props {
        collapsed?: boolean;
        brandName?: string;
        logoSrc?: string;
        logoAlt?: string;
        class?: string;
        /** @deprecated use `class`. */
        className?: string;
    }

    let {
        collapsed = false,
        brandName = "",
        logoSrc = "",
        logoAlt = "",
        class: classAttr = "",
        className: legacyClass = "",
    }: Props = $props();

    /** `class` is the public prop; `className` is a deprecated alias.
     * Both are merged here so existing call sites keep working. */
    const className = $derived(`${classAttr} ${legacyClass}`.trim());

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
                class="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-container bg-background ring-1 ring-border"
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
                class="flex size-9 shrink-0 items-center justify-center rounded-container bg-action-primary-subtle text-xs font-bold text-headline ring-1 ring-border"
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
