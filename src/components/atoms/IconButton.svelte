<script lang="ts">
    import { tick, untrack, type Snippet } from "svelte";
    import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
    import type { ButtonVariant, SizeVariant } from "../types/variants.js";
    import { cn } from "../util/cn.js";

    /** The shared scale plus `xs`, which only the icon button has. */
    type IconButtonSize = SizeVariant | "xs";

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
         * does nothing when pressed. A link is not
         * a toggle: `pressed` is ignored.
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
        /**
         * `xs` is a 24px box for dense, pointer-first layouts (card headers,
         * table rows). That is the WCAG 2.2 minimum target size and no more:
         * where the primary input is touch, use `sm` or larger.
         */
        size?: IconButtonSize;
        /**
         * Colour intent for the `ghost` and `outline` variants: `danger` is
         * the quiet destructive button (inline delete). Other variants ignore it.
         */
        tone?: "default" | "danger";
        /**
         * Makes this a toggle button. When defined (true or false) it renders
         * `aria-pressed` and a click flips it; bind it, or pass it one-way and
         * update your own state in `onclick`. Call `event.preventDefault()` in
         * `onclick` to keep the current state: do that whenever the parent
         * updates later (after a request, say) or may refuse the change, or the
         * button shows a state the parent does not have. Leave undefined for a
         * plain button.
         */
        pressed?: boolean;
        loading?: boolean;
        /** Required for icon-only usage (no visible text). */
        label?: string;
        class?: string;
        children?: Snippet;
    };

    let {
        variant = "primary",
        size = "md",
        tone = "default",
        pressed = $bindable(),
        disabled = false,
        loading = false,
        type,
        href,
        label = "",
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
    const isToggle = $derived(pressed !== undefined && !isLink);

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

    /** A disabled link has no `href`, but a pointer can still press it. */
    function handleLinkClick(event: MouseEvent) {
        if (isDisabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        (onclick as ((event: MouseEvent) => void) | null | undefined)?.(event);
    }

    function handleClick(
        event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
    ) {
        // A loading button is not `disabled`, so the press reaches it: it
        // ends here, toggles nothing and submits nothing.
        if (isBusy) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        // Read before the handler runs: a parent that flips its own state in
        // `onclick` has already moved `pressed` by the time it returns.
        const next = !pressed;
        onclick?.(event);
        if (isToggle && !event.defaultPrevented) pressed = next;
    }

    /**
     * Square, on the same height scale as Button / Input / Select, so an icon
     * button sits flush in a toolbar beside a text button of the same size.
     * Previously these were 8–16px shorter than their own Button.
     *
     * On a coarse pointer `sm` and `md` are 44 by 44px, as Button, Input and
     * Select are 44px tall there, so the toolbar still lines up and the box
     * itself is the touch target. `lg` is 48px already.
     *
     * `xs` sits below that scale on purpose: no text control is 24px. Its
     * target is the box itself on every pointer type. An invisible larger hit
     * area was tried and removed: on touch it covered the visible edge of the
     * neighbouring button, so a tap there fired the wrong one.
     */
    const sizeClass = $derived.by(() => {
        if (size === "xs") return { box: "size-6", spinner: "size-3" };
        if (size === "sm") return { box: "size-8 pointer-coarse:min-h-11 pointer-coarse:min-w-11", spinner: "size-3.5" };
        if (size === "lg") return { box: "size-12", spinner: "size-5" };
        return { box: "size-10 pointer-coarse:min-h-11 pointer-coarse:min-w-11", spinner: "size-4" };
    });

    const disabledClass =
        "disabled:bg-action-disabled disabled:text-action-disabled-text disabled:border-transparent disabled:bg-none disabled:inset-shadow-none disabled:shadow-none disabled:cursor-not-allowed disabled:active:scale-100";

    const isDangerTone = $derived(
        tone === "danger" && (variant === "ghost" || variant === "outline"),
    );

    const variantClass = $derived.by(() => {
        // The veil of the solid fills, as on Button. Not when disabled, and
        // not on a toggled-on button (`pressedClass`): that holds the pressed
        // fill flat, with its outline as the shape.
        const veil = disabled || (isToggle && pressed) ? "" : "bg-control-gradient ";
        const veilAccent = disabled || (isToggle && pressed) ? "" : "bg-control-gradient-accent ";
        if (isDangerTone) {
            const fill =
                "text-error hover:bg-action-danger-subtle active:bg-action-danger-subtle-hover active:scale-[0.98] motion-reduce:active:scale-100 focus-ring--danger";
            return variant === "outline"
                ? `bg-transparent border border-error-border hover:border-error ${fill}`
                : `bg-transparent ${fill}`;
        }
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
            case "text":
                return "bg-transparent text-link hover:text-link-hover focus-ring--muted";
            case "accent":
                return `${veilAccent}bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-active active:scale-[0.98] motion-reduce:active:scale-100`;
            case "primary":
            default:
                return `${veil}bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active active:scale-[0.98] motion-reduce:active:scale-100`;
        }
    });

    /**
     * Held down, a toggled-on ghost or danger-tone button goes one step past its
     * hover fill (the `-subtle-active` roles): with a mouse the hover fill is
     * already showing, so the same fill would not show the press. The solid
     * variants have no further step and keep their fill.
     *
     * Pressed holds a fill that hover cannot reach and adds an inset outline in
     * the text colour, so the state is a shape as well as a colour. It is an
     * outline, not a ring: `.focus-ring` owns `box-shadow`, and an outline also
     * survives forced-colors mode.
     */
    const pressedClass = $derived.by(() => {
        if (!pressed) return "";
        const outline = "outline-2 -outline-offset-2 outline-current";
        if (isDangerTone) {
            return `bg-action-danger-subtle hover:bg-action-danger-subtle-hover active:bg-action-danger-subtle-active ${outline}`;
        }
        switch (variant) {
            case "secondary":
                return `bg-action-secondary-active hover:bg-action-secondary-active ${outline}`;
            case "danger":
                return `bg-action-danger-active hover:bg-action-danger-active ${outline}`;
            case "ghost":
            case "outline":
            case "link":
            case "text":
                return `bg-action-primary-subtle text-link hover:bg-action-primary-subtle-hover active:bg-action-primary-subtle-active ${outline}`;
            case "tonal":
                // The tonal fill keeps its own hover and pressed steps; the
                // outline is what shows it is on.
                return outline;
            case "accent":
                return `bg-accent-active hover:bg-accent-active ${outline}`;
            case "primary":
            default:
                return `bg-action-primary-active hover:bg-action-primary-active ${outline}`;
        }
    });

    const buttonClasses = $derived.by(() => {
        const base =
            "inline-flex focus-ring items-center justify-center rounded-control shrink-0 transition-colors duration-(--duration-base) cursor-pointer select-none";
        // `disabled:` does not match an `<a>`: a disabled link wears the
        // disabled pair itself, in place of its variant. So does a loading
        // button, which is not `:disabled` (it keeps focus): with the
        // variant's classes left out, none of its hover or pressed fills can
        // show. The box is a fixed square, so the border changes no size.
        const state =
            isDisabled && (isLink || isBusy)
                ? "bg-(--color-action-disabled) text-action-disabled-text border border-transparent cursor-not-allowed"
                : `${variantClass} ${isLink ? "" : pressedClass} ${disabledClass}`;
        return cn(`${base} ${sizeClass.box} ${state} ${className}`);
    });
</script>

{#snippet content()}
    {#if loading}
        <span
            class="inline-block {sizeClass.spinner} shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent opacity-80 motion-reduce:animate-pulse"
            aria-hidden="true"
        ></span>
    {:else if children}
        {@render children()}
    {/if}
{/snippet}

{#if isLink}
    <!-- A loading link is given its Tab stop back, so focus stays on it:
    `tabindex` is written before `href` is taken away, in that order. -->
    <a
        tabindex={isBusy || keepsTabStop ? 0 : undefined}
        href={isDisabled ? undefined : href}
        class={buttonClasses}
        role={isDisabled ? "link" : undefined}
        aria-disabled={isDisabled ? "true" : undefined}
        aria-busy={loading ? "true" : undefined}
        aria-label={label || undefined}
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
        aria-pressed={pressed}
        onclick={handleClick}
        aria-label={label || undefined}
        {...restProps}
    >
        {@render content()}
    </button>
{/if}
