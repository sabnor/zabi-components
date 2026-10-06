<script lang="ts">
    import User from "@lucide/svelte/icons/user";
    import { untrack } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { initialsOf, type AvatarSize } from "../util/avatar.js";
    import { cn } from "../util/cn.js";

    /**
     * A round picture of a person, which falls back to their initials.
     *
     * It is one image with one name, the person's: the picture, the initials
     * and the icon inside are presentational. Not interactive: put it in a
     * link or a button of your own.
     *
     * Other attributes (`id`, `data-*`, ...) land on the root element.
     */
    type Props = Omit<HTMLAttributes<HTMLSpanElement>, "class" | "role" | "aria-label"> & {
        /** The person's name: the accessible name, and where the initials come from. */
        name: string;
        /** Address of the picture. Without it, or when it fails to load, the initials show. */
        src?: string;
        /** Diameter: 24, 32 and 48px. It does not grow with the text size. */
        size?: "sm" | "md" | "lg";
        /**
         * Accessible name, when it should differ from `name`. `alt=""` makes
         * the avatar decorative: for a name that is printed beside it.
         */
        alt?: string;
        /**
         * Language the initials are upper-cased in ("tr" turns "i" into "İ").
         * The page's own (`<html lang>`) by default, which the server cannot
         * read: pass it where that matters.
         */
        locale?: string;
        /** Extra classes for the root element. */
        class?: string;
    };

    let {
        name,
        src,
        size = "md",
        alt,
        locale,
        class: className = "",
        ...restProps
    }: Props = $props();

    const pageLocale = typeof document !== "undefined" ? document.documentElement.lang : "";
    const initials = $derived(initialsOf(name, locale || pageLocale));
    const label = $derived(alt ?? name);

    /** The address that did not load. Another address gets its own try. */
    let failedSrc = $state<string>();
    const failed = $derived(!!src && failedSrc === src);

    /** A picture that had already failed before the page hydrated fired its `error` to nobody. */
    function settled(image: HTMLImageElement) {
        if (image.complete && image.naturalWidth === 0) untrack(() => (failedSrc = src));
    }

    // The circle and the type in it are in px: a face in a row of people is
    // the same size whatever the text size is, and the initials stay inside.
    const SIZES: Record<AvatarSize, string> = {
        sm: "size-[24px] text-[10px]",
        md: "size-[32px] text-[12px]",
        lg: "size-[48px] text-[16px]",
    };
</script>

<!-- The subtle primary pair, as a selected pill tab has: held to 4.5:1 in both
themes by scripts/contrast-pairs.js. The border is for forced colours, where
the fill is gone and a transparent border is drawn. -->
<span
    class={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-pill border border-transparent bg-action-primary-subtle align-middle leading-none font-semibold text-link select-none",
        SIZES[size] ?? SIZES.md,
        className,
    )}
    data-avatar
    data-size={size}
    role={label ? "img" : undefined}
    aria-label={label || undefined}
    aria-hidden={label ? undefined : "true"}
    {...restProps}
>
    <!-- Under the picture from the start, in the server's markup too: nothing
    moves when the picture arrives, or when it does not. -->
    {#if initials}
        <span aria-hidden="true" data-avatar-initials>{initials}</span>
    {:else}
        <User class="size-[60%]" aria-hidden="true" />
    {/if}
    {#if src && !failed}
        <img
            {src}
            alt=""
            class="absolute inset-0 size-full object-cover"
            draggable="false"
            onerror={() => (failedSrc = src)}
            {@attach settled}
        />
    {/if}
</span>
