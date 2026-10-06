<script lang="ts">
    import { tick, untrack, type Snippet } from "svelte";
    import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
    import type { ButtonSize, ButtonVariant } from "../types/variants.js";
    import { cn } from "../util/cn.js";

    /**
     * One type for the button and the link, not a union of the two elements'
     * attributes: that union is too large for TypeScript to carry through a
     * wrapper such as a Storybook `Meta`. Event handlers are typed for the
     * button; on a link they are called with the same event.
     */
    type Props = Omit<HTMLButtonAttributes, "class"> & {
        /**
         * Where the link goes. Makes this an `<a>` that looks the same;
         * without it, it is a `<button>`. A link cannot be disabled: while
         * `disabled` or `loading` it has no `href`, is `aria-disabled` and
         * does nothing when pressed. While `loading` it stays a Tab stop.
         */
        href?: string;
        /** With `href`: where the link opens. */
        target?: HTMLAnchorAttributes["target"];
        /** With `href`: the link's relationship, such as `noopener`. */
        rel?: HTMLAnchorAttributes["rel"];
        /** With `href`: download the address instead of opening it. */
        download?: HTMLAnchorAttributes["download"];
        hreflang?: HTMLAnchorAttributes["hreflang"];
        referrerpolicy?: HTMLAnchorAttributes["referrerpolicy"];
        ping?: HTMLAnchorAttributes["ping"];
        variant?: ButtonVariant;
        /** `xl` is 56px, for a primary action on a phone. It is a Button size only. */
        size?: ButtonSize;
        /**
         * Shows a spinner and makes the button unavailable without taking
         * focus from it: `aria-disabled` and `aria-busy`, still a Tab stop,
         * and a press does nothing. It is not `disabled`: match it in CSS
         * with `[aria-busy="true"]`.
         */
        loading?: boolean;
        text?: string;
        /** Stretch to the width of the container. */
        fullWidth?: boolean;
        /** @deprecated use `fullWidth` — kept so 7.x call sites keep working. */
        isFullWidth?: boolean;
        class?: string;
        children?: Snippet;
    };

    let {
        variant = "primary",
        size = "md",
        disabled = false,
        loading = false,
        type,
        href,
        text = "",
        fullWidth = false,
        isFullWidth = false,
        class: className = "",
        onclick,
        children,
        ...restProps
    }: Props = $props();

    const isDisabled = $derived(!!disabled || loading);
    /**
     * Loading without `disabled`: unavailable, and still where focus is.
     *
     * `disabled` on a button, or no `href` on a link, makes the element
     * unfocusable, and the browser then drops focus on `<body>`: whoever
     * pressed Save with the keyboard was at the top of the page when the
     * save came back. So a loading control says it the ARIA way
     * (`aria-disabled`, `aria-busy`), stays a Tab stop, and swallows the
     * press. `disabled` is the platform's: out of the Tab order.
     */
    const isBusy = $derived(loading && !disabled);
    const isLink = $derived(href !== undefined && href !== null);

    /**
     * A loading link has no `href`, so it is a Tab stop only by `tabindex`.
     * The browser takes focus from an element the moment it stops being
     * focusable, so the two attributes must never both be missing: the
     * `tabindex` goes on before the `href` comes off (their order in the
     * markup), and when loading ends it stays until the `href` is back, one
     * update longer.
     */
    let keepsTabStop = $state(false);
    $effect.pre(() => {
        if (isBusy) {
            keepsTabStop = true;
        } else if (untrack(() => keepsTabStop)) {
            void tick().then(() => (keepsTabStop = false));
        }
    });

    /** A text link in a sentence: `variant="link"` on a real link. */
    const isInlineLink = $derived(isLink && variant === "link");

    /** A disabled link has no `href`, but a pointer can still press it. */
    function handleLinkClick(event: MouseEvent) {
        if (isDisabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        (onclick as ((event: MouseEvent) => void) | null | undefined)?.(event);
    }

    /** A loading button is not `disabled`, so the press reaches it: it ends here, and submits nothing. */
    function handleButtonClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
        if (isBusy) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        onclick?.(event);
    }

    /**
     * One height scale, shared with Input, Select and IconButton, so controls
     * of the same size line up in a row: 32 / 40 / 48px (and 56px, `xl`, which
     * only Button has). It is a minimum
     * height, not a fixed one, so a label that does not fit on one line wraps
     * and the button grows; it used to paint outside the button (a long label
     * at 200% text on a phone). One line of text and the vertical padding are
     * never taller than the minimum, the outline variant's border included,
     * so a label that fits is exactly on the scale:
     * scripts/check-control-geometry.js holds the padding to that.
     *
     * Weight and tracking do NOT change with size: a large button used to drop
     * to font-normal, so the biggest button had the lightest label.
     */
    const sizeClass = $derived.by(() => {
        // sm and md are 44px tall on a coarse pointer, like Input, Select and
        // IconButton, so a row still lines up and the box is the touch target.
        // No minimum width: text and padding make a button wide enough, and one
        // would stop the actions of an ImageUpload shrinking in a narrow space.
        if (size === "sm") {
            return { box: "min-h-8 px-3 py-1 pointer-coarse:min-h-11", text: "text-sm", gap: "gap-2", spinner: "size-3.5" };
        }
        // xl is 56px, like the FloatingActionButton; only Button has it.
        if (size === "xl") {
            return { box: "min-h-14 px-6 py-3", text: "text-base", gap: "gap-2", spinner: "size-5" };
        }
        if (size === "lg") {
            return { box: "min-h-12 px-5 py-2", text: "text-base", gap: "gap-2", spinner: "size-4" };
        }
        return { box: "min-h-10 px-4 py-2 pointer-coarse:min-h-11", text: "text-sm", gap: "gap-2", spinner: "size-4" };
    });

    /**
     * Disabled is deliberately NOT `opacity-50` over the variant colour — that
     * made a disabled primary lighter and more colourful than an enabled
     * secondary. Every variant falls back to the same neutral disabled pair.
     */
    const DISABLED_LINK =
        "bg-(--color-action-disabled) text-action-disabled-text border border-transparent cursor-not-allowed";

    /**
     * A loading button wears the same pair. It is not `:disabled`, so the
     * variant's classes are left out instead of overridden: none of its hover
     * or pressed fills can show. What the variant gives the box is kept (the
     * outline's border, the link's missing side padding), so the button does
     * not change size when it starts loading. It keeps the focus ring: it
     * can be focused.
     */
    const BUSY_BUTTON = "bg-(--color-action-disabled) text-action-disabled-text cursor-not-allowed";

    const disabledClass =
        "disabled:bg-action-disabled disabled:text-action-disabled-text disabled:border-transparent disabled:no-underline disabled:bg-none disabled:inset-shadow-none disabled:shadow-none disabled:cursor-not-allowed disabled:active:scale-100";

    const variantClass = $derived.by(() => {
        // The veil of the solid fills (a top highlight and a darker bottom). A
        // disabled button is the flat neutral pair, so it is left off rather
        // than cleared; `disabledClass` also clears it for a button that is
        // disabled from outside (a `fieldset`).
        const veil = disabled ? "" : "bg-control-gradient ";
        const veilAccent = disabled ? "" : "bg-control-gradient-accent ";
        switch (variant) {
            case "secondary":
                return "bg-action-secondary text-headline hover:bg-action-secondary-hover active:bg-action-secondary-active active:scale-[0.98] motion-reduce:active:scale-100";
            case "tonal":
                return "bg-action-tonal text-action-tonal active:scale-[0.98] motion-reduce:active:scale-100";
            case "danger":
                return `${veil}bg-action-danger text-action-danger-text hover:bg-action-danger-hover active:bg-action-danger-active active:scale-[0.98] motion-reduce:active:scale-100 focus-ring--danger`;
            case "ghost":
                return "bg-transparent text-headline hover:bg-surface-hover active:bg-surface-active active:scale-[0.98] motion-reduce:active:scale-100 focus-ring--muted";
            case "outline":
                return "bg-transparent border border-action-outline text-headline hover:bg-surface-hover hover:border-action-outline-hover active:bg-surface-active active:scale-[0.98] motion-reduce:active:scale-100";
            case "link":
                // A link variant has to look like a link at rest, not only on
                // hover — otherwise it is indistinguishable from `ghost`.
                return "bg-transparent text-link hover:text-link-hover underline underline-offset-4 decoration-1 hover:decoration-2 px-0 focus-ring--muted";
            case "text":
                // A standalone action, not a link in a sentence: no underline,
                // a stronger label, and the box of the other variants. The
                // link role gives the primary colour, and the block's own
                // on-colour inside `.on-brand` / `.on-accent`.
                return "bg-transparent text-link px-2 hover:bg-surface-hover active:bg-surface-active active:scale-[0.98] motion-reduce:active:scale-100 focus-ring--muted";
            case "accent":
                return `${veilAccent}bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-active active:scale-[0.98] motion-reduce:active:scale-100`;
            case "primary":
            default:
                return `${veil}bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active active:scale-[0.98] motion-reduce:active:scale-100`;
        }
    });

    const buttonClasses = $derived.by(() => {
        const s = sizeClass;
        const layout = fullWidth || isFullWidth ? "flex w-full" : "inline-flex";
        if (isInlineLink) {
            // Flows with the sentence it is in: no box, no minimum height, and
            // it breaks across lines as a link does.
            const state = isDisabled
                ? "text-action-disabled-text no-underline cursor-not-allowed"
                : "text-link hover:text-link-hover underline underline-offset-4 decoration-1 hover:decoration-2 cursor-pointer";
            return cn(
                `focus-ring focus-ring--muted inline rounded-button font-button transition-colors duration-(--duration-base) ${s.text} ${state} ${fullWidth || isFullWidth ? "block w-full" : ""} ${className}`,
            );
        }
        // The label wraps when it has to, balanced over its lines; the icon
        // and the spinner stay centred beside it.
        const base = `${layout} focus-ring items-center justify-center rounded-button text-center ${variant === "text" ? "font-button-strong" : "font-button"} text-balance transition-colors duration-(--duration-base) cursor-pointer select-none`;
        // `disabled:` does not match an `<a>`: a disabled link wears the
        // disabled pair itself, in place of its variant.
        const busyBox = variant === "outline" ? "border border-transparent" : variant === "link" ? "px-0" : variant === "text" ? "px-2" : "";
        const state =
            isLink && isDisabled
                ? DISABLED_LINK
                : isBusy
                  ? `${BUSY_BUTTON} ${busyBox}`
                  : `${variantClass} ${disabledClass}`;
        return cn(`${base} ${s.box} ${s.text} ${s.gap} ${state} ${className}`);
    });
</script>

{#snippet content()}
    {#if loading}
        <span
            class="inline-block {sizeClass.spinner} shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent opacity-80 motion-reduce:animate-pulse"
            aria-hidden="true"
        ></span>
    {/if}
    {#if text}
        {text}
    {:else if children}
        {@render children()}
    {/if}
{/snippet}

{#if isLink}
    <!-- A link that cannot be followed keeps its role and says it is
    unavailable; without an `href` it is not a Tab stop, as a disabled button
    is not. A loading one is given the Tab stop back, so focus stays on it:
    `tabindex` is written before `href` is taken away, in that order (see
    `keepsTabStop`). -->
    <a
        tabindex={isBusy || keepsTabStop ? 0 : undefined}
        href={isDisabled ? undefined : href}
        class={buttonClasses}
        role={isDisabled ? "link" : undefined}
        aria-disabled={isDisabled ? "true" : undefined}
        aria-busy={loading ? "true" : undefined}
        {...(restProps as unknown as HTMLAnchorAttributes)}
        onclick={handleLinkClick}
    >
        {@render content()}
    </a>
{:else}
    <button
        type={type ?? "button"}
        class={buttonClasses}
        disabled={!!disabled}
        aria-disabled={isBusy ? "true" : undefined}
        aria-busy={loading ? "true" : undefined}
        {...restProps}
        onclick={handleButtonClick}
    >
        {@render content()}
    </button>
{/if}
