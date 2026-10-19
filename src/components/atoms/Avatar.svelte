<script lang="ts">
    import User from "@lucide/svelte/icons/user";
    import { untrack, type Snippet } from "svelte";
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
     * A picture that is not an address (an inline drawing that reads the
     * page's tokens) goes in as children and fills the circle in place of the
     * initials and `src`.
     *
     * Other attributes (`id`, `data-*`, ...) land on the root element.
     */
    type Props = Omit<HTMLAttributes<HTMLSpanElement>, "class" | "role" | "aria-label"> & {
        /** The person's name: the accessible name, and where the initials come from. */
        name: string;
        /** Address of the picture. Without it, or when it fails to load, the initials show. */
        src?: string;
        /** Diameter: 24, 32 and 48px at the default text size. */
        size?: "sm" | "md" | "lg";
        /**
         * `fixed` keeps the circle and the initials in px, the same whatever
         * the text size. `text` sets them in rem (1.5, 2 and 3rem), so the
         * avatar grows with the text, as a picture beside a line of text
         * should. Default `fixed`.
         */
        scale?: "fixed" | "text";
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
        /**
         * The picture, drawn inside the circle at the avatar's size: an inline
         * SVG, say. It takes the place of `src` and the initials, is
         * presentational (the name is still `name`), and is clipped to the
         * circle.
         */
        children?: Snippet;
        /** Extra classes for the root element. */
        class?: string;
    };

    let {
        name,
        src,
        size = "md",
        scale = "fixed",
        alt,
        locale,
        children,
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
    // With `scale="text"` the same, in rem: the initials keep their share of the circle.
    const TEXT_SIZES: Record<AvatarSize, string> = {
        sm: "size-[1.5rem] text-[0.625rem]",
        md: "size-[2rem] text-[0.75rem]",
        lg: "size-[3rem] text-[1rem]",
    };
    const sizes = $derived(scale === "text" ? TEXT_SIZES : SIZES);
</script>

<!-- The subtle primary pair, as a selected pill tab has: held to 4.5:1 in both
themes by scripts/contrast-pairs.js. The border is for forced colours, where
the fill is gone and a transparent border is drawn. -->
<span
    class={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-pill border border-transparent bg-action-primary-subtle align-middle leading-none font-semibold text-link select-none",
        sizes[size] ?? sizes.md,
        className,
    )}
    data-avatar
    data-size={size}
    data-scale={scale}
    role={label ? "img" : undefined}
    aria-label={label || undefined}
    aria-hidden={label ? undefined : "true"}
    {...restProps}
>
    <!-- Under the picture from the start, in the server's markup too: nothing
    moves when the picture arrives, or when it does not. -->
    {#if children}
        <span class="absolute inset-0 flex items-center justify-center" aria-hidden="true" data-avatar-picture>
            {@render children()}
        </span>
    {:else if initials}
        <span aria-hidden="true" data-avatar-initials>{initials}</span>
    {:else}
        <User class="size-[60%]" aria-hidden="true" />
    {/if}
    {#if !children && src && !failed}
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
