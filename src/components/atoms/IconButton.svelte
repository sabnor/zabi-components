<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";
    import type { ButtonVariant, SizeVariant } from "../types/variants.js";
    import { cn } from "../util/cn.js";

    /** The shared scale plus `xs`, which only the icon button has. */
    type IconButtonSize = SizeVariant | "xs";

    type Props = Omit<HTMLButtonAttributes, "class"> & {
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
        type = "button",
        label = "",
        class: className = "",
        onclick,
        children,
        ...restProps
    }: Props = $props();

    const isDisabled = $derived(disabled || loading);
    const isToggle = $derived(pressed !== undefined);

    function handleClick(
        event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
    ) {
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
     * `xs` sits below that scale on purpose: no text control is 24px. Its
     * target is the box itself on every pointer type. An invisible larger hit
     * area was tried and removed: on touch it covered the visible edge of the
     * neighbouring button, so a tap there fired the wrong one.
     */
    const sizeClass = $derived.by(() => {
        if (size === "xs") return { box: "size-6", spinner: "size-3" };
        if (size === "sm") return { box: "size-8", spinner: "size-3.5" };
        if (size === "lg") return { box: "size-12", spinner: "size-5" };
        return { box: "size-10", spinner: "size-4" };
    });

    const disabledClass =
        "disabled:bg-action-disabled disabled:text-action-disabled-text disabled:border-transparent disabled:shadow-none disabled:cursor-not-allowed disabled:active:scale-100";

    const isDangerTone = $derived(
        tone === "danger" && (variant === "ghost" || variant === "outline"),
    );

    const variantClass = $derived.by(() => {
        if (isDangerTone) {
            const fill =
                "text-error hover:bg-action-danger-subtle active:bg-action-danger-subtle-hover active:scale-[0.98] focus-ring--danger";
            return variant === "outline"
                ? `bg-transparent border border-error-border hover:border-error ${fill}`
                : `bg-transparent ${fill}`;
        }
        switch (variant) {
            case "secondary":
                return "bg-action-secondary text-headline hover:bg-action-secondary-hover active:bg-action-secondary-active active:scale-[0.98]";
            case "danger":
                return "bg-action-danger text-action-danger-text hover:bg-action-danger-hover active:bg-action-danger-active active:scale-[0.98] focus-ring--danger";
            case "ghost":
                return "bg-transparent text-headline hover:bg-surface-hover active:bg-surface-active active:scale-[0.98] focus-ring--muted";
            case "outline":
                return "bg-transparent border border-border text-headline hover:bg-surface-hover hover:border-border-medium active:bg-surface-active active:scale-[0.98]";
            case "link":
                return "bg-transparent text-link hover:text-link-hover focus-ring--muted";
            case "primary":
            default:
                return "bg-action-primary text-action-primary hover:bg-action-primary-hover active:bg-action-primary-active active:scale-[0.98]";
        }
    });

    /**
     * Pressed holds a fill that hover cannot reach and adds an inset outline in
     * the text colour, so the state is a shape as well as a colour. It is an
     * outline, not a ring: `.focus-ring` owns `box-shadow`, and an outline also
     * survives forced-colors mode.
     */
    const pressedClass = $derived.by(() => {
        if (!pressed) return "";
        const outline = "outline-2 -outline-offset-2 outline-current";
        if (isDangerTone) {
            return `bg-action-danger-subtle hover:bg-action-danger-subtle-hover ${outline}`;
        }
        switch (variant) {
            case "secondary":
                return `bg-action-secondary-active hover:bg-action-secondary-active ${outline}`;
            case "danger":
                return `bg-action-danger-active hover:bg-action-danger-active ${outline}`;
            case "ghost":
            case "outline":
            case "link":
                return `bg-action-primary-subtle text-link hover:bg-action-primary-subtle-hover active:bg-action-primary-subtle-hover ${outline}`;
            case "primary":
            default:
                return `bg-action-primary-active hover:bg-action-primary-active ${outline}`;
        }
    });

    const buttonClasses = $derived.by(() => {
        const base =
            "inline-flex focus-ring items-center justify-center rounded-control shrink-0 transition-colors duration-150 cursor-pointer select-none";
        return cn(
            `${base} ${sizeClass.box} ${variantClass} ${pressedClass} ${disabledClass} ${className}`,
        );
    });
</script>

<button
    {type}
    class={buttonClasses}
    disabled={isDisabled}
    aria-busy={loading ? "true" : undefined}
    aria-pressed={pressed}
    onclick={handleClick}
    aria-label={label || undefined}
    {...restProps}
>
    {#if loading}
        <span
            class="inline-block {sizeClass.spinner} shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent opacity-80"
            aria-hidden="true"
        ></span>
    {:else if children}
        {@render children()}
    {/if}
</button>
