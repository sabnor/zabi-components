<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAnchorAttributes, HTMLAttributes } from "svelte/elements";
    import type { CardVariant, SizeVariant, SurfaceTone } from "../types/variants.js";

    import { cn } from "../util/cn.js";
    import { toneSurface } from "../util/tone-surface.js";
    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class"> & {
        onclick?: (event: MouseEvent) => void | Promise<void>;
        size?: SizeVariant;
        /** The look of a `neutral` card. With a `tone` or a `fill` the fill is the edge: no border, and a shadow only for `elevated`. */
        variant?: CardVariant;
        /**
         * What the card is filled with: `neutral` (the default, the card surface),
         * `tint` (the brand tint), `brand` or `accent`. On `brand` and `accent`
         * the text, links, controls and focus rings inside take the fill's label
         * colour; a Card, field or Alert inside is a surface again.
         */
        tone?: SurfaceTone;
        /**
         * A fill the app chooses, any CSS colour (`var(--group-colour)`). Wins
         * over `tone`. Set `onFill`, the label colour on it. The library cannot
         * check that pair's contrast: the app must hold it to 4.5:1.
         */
        fill?: string;
        /** The label colour on `fill`, any CSS colour. */
        onFill?: string;
        /**
         * With `href` the card itself is an `<a>`: the whole card is the link,
         * and it works without scripts. A link card must not contain other
         * interactive elements (a link or a button in a link is invalid and
         * unreachable); a card with actions inside takes `onclick` or none.
         * With `onclick` too, it is a link and `onclick` runs on activation.
         */
        href?: string;
        /** With `href`: where the link opens. */
        target?: HTMLAnchorAttributes["target"];
        /** With `href`: the link's relationship, such as `noopener`. */
        rel?: string;
        /**
         * The card itself is a `<button>`: the whole card is the control, and
         * `submit` posts the form around it without scripts. With `href`
         * the card is a link and this is ignored. Like a link card it must not
         * contain other interactive elements. `onclick`
         * runs on a press, as on any button.
         */
        type?: "submit" | "button" | "reset";
        /** With `type`: the name the button submits under. */
        name?: string;
        /** With `type`: what the button submits. */
        value?: string;
        /** With `type`: the id of the form it belongs to, when it is not inside one. */
        form?: string;
        /** With `type`: the card cannot be pressed, is dimmed, and is skipped by the keyboard. */
        disabled?: boolean;
        /**
         * With `type`: the card's action is on its way, as `Button`'s and
         * `Chip`'s `loading`. `aria-busy` and `aria-disabled` (not `disabled`),
         * the press swallowed (it submits nothing and does not reach
         * `onclick`), the pressed look held, the size and the Tab stop kept.
         * No spinner. Ignored by a link card and a plain card.
         */
        loading?: boolean;
        fullWidth?: boolean;
        class?: string;
        /** @deprecated use `class` — kept so 7.x call sites keep working. */
        className?: string;
        /** Names the card when it is interactive and its content does not (the content names a link well enough in most cases). */
        ariaLabel?: string;
        children?: Snippet;
    };

    let {
        onclick,
        size = "md",
        variant = "default",
        tone = "neutral",
        fill,
        onFill,
        href,
        target,
        rel,
        type: buttonType,
        name,
        value,
        form,
        disabled = false,
        loading = false,
        fullWidth = true,
        class: classProp = "",
        className = "",
        ariaLabel,
        style: styleProp,
        children,
        ...restProps
    }: Props = $props();

    /** Size changes the padding. It does NOT change the corner — see
     * `--radius-container`. A large card is a bigger box, not a rounder one. */
    const sizeClass = $derived(
        size === "sm" ? "p-4" : size === "lg" ? "p-8" : "p-6",
    );

    const surface = $derived(toneSurface({ tone, fill, onFill }));

    const isLink = $derived(href !== undefined && href !== null);
    const isButton = $derived(!isLink && buttonType !== undefined);

    const variantClasses = $derived(
        surface.filled
            ? // The fill is the edge: no border, flat unless the variant lifts it.
              `${surface.classes} ${variant === "elevated" ? "shadow-lg" : "shadow-none"}`
            : variant === "elevated"
              ? "bg-card-elevated shadow-lg"
              : variant === "flat"
                ? "bg-card-flat shadow-none border-none"
                : "bg-card border border-border shadow-none",
    );

    /**
     * Hover and pressed on a fill the card does not know: a veil of the card's
     * own text colour (`bg-current`), so it reads on a tint, the brand, the
     * accent and any colour an app passes. The card is `relative` for it.
     */
    const STATE_LAYER =
        "relative after:absolute after:inset-0 after:rounded-[inherit] after:bg-current after:opacity-0 after:pointer-events-none after:transition-opacity after:duration-(--duration-base) motion-reduce:after:transition-none hover:after:opacity-8 active:after:opacity-12";

    /** Loading without `disabled`: unavailable, and still where focus is (see Button). */
    const isBusy = $derived(isButton && loading && !disabled);

    const interactive = $derived(!!onclick || isLink || isButton);

    const interactiveClasses = $derived.by(() => {
        if (!interactive) return "";
        if (isBusy) {
            // The pressed look, held: no hover or pressed rule is left to change it.
            const held = "cursor-progress focus-ring";
            if (surface.filled) return `${held} relative after:absolute after:inset-0 after:rounded-[inherit] after:bg-current after:opacity-12 after:pointer-events-none`;
            switch (variant) {
                case "elevated":
                    return `${held} bg-card-active`;
                case "flat":
                    return `${held} bg-card-flat-active`;
                default:
                    return `${held} border-border-medium bg-card-active`;
            }
        }
        const shared = "cursor-pointer focus-ring";
        if (surface.filled) return `${shared} ${STATE_LAYER}`;
        switch (variant) {
            case "elevated":
                return `${shared} hover:bg-card-hover active:bg-card-active`;
            case "flat":
                return `${shared} hover:bg-card-flat-hover active:bg-card-flat-active`;
            default:
                return `${shared} hover:border-border-medium hover:bg-card-hover active:bg-card-active`;
        }
    });

    /** A link card keeps the body colour (its whole content is not link-coloured); a scoped fill sets its own. */
    const linkClasses = $derived(
        isLink
            ? `block no-underline min-h-11 ${surface.scoped ? "" : "text-body"}`
            : isButton
              ? `block text-start min-h-11 ${surface.scoped ? "" : "text-body"} ${disabled ? "cursor-not-allowed opacity-50 pointer-events-none" : ""}`
              : "",
    );

    const cardClasses = $derived(
        cn(
            "rounded-container transition-all duration-150",
            variantClasses,
            interactiveClasses,
            linkClasses,
            fullWidth ? "w-full" : "",
            sizeClass,
            classProp,
            className,
        ),
    );

    const cardStyle = $derived(
        [surface.style, typeof styleProp === "string" ? styleProp : undefined].filter(Boolean).join("; ") || undefined,
    );

    /** A busy card is not `disabled`, so the press reaches it: it ends here, and submits nothing. */
    function handleButtonClick(event: MouseEvent) {
        if (isBusy) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        onclick?.(event);
    }

    function handleKeydown(event: KeyboardEvent) {
        if (onclick && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            onclick(event as unknown as MouseEvent);
        }
    }

    const cardRole = $derived(onclick ? "button" : undefined);
</script>

{#if isLink}
    <a
        class={cardClasses}
        style={cardStyle}
        {href}
        {target}
        {rel}
        {onclick}
        aria-label={ariaLabel}
        {...restProps as HTMLAnchorAttributes}
    >
        {@render children?.()}
    </a>
{:else if isButton}
    <button
        type={buttonType}
        {name}
        {value}
        {form}
        {disabled}
        class={cardClasses}
        style={cardStyle}
        aria-label={ariaLabel}
        aria-busy={isBusy ? "true" : undefined}
        aria-disabled={isBusy ? "true" : undefined}
        {...restProps as HTMLAttributes<HTMLButtonElement>}
        onclick={handleButtonClick}
    >
        {@render children?.()}
    </button>
{:else}
    <div
        class={cardClasses}
        style={cardStyle}
        {onclick}
        role={cardRole}
        {...onclick ? { tabindex: 0 } : {}}
        aria-label={ariaLabel}
        onkeydown={onclick ? handleKeydown : undefined}
        {...restProps}
    >
        {@render children?.()}
    </div>
{/if}
