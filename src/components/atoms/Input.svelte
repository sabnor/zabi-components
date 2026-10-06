<script lang="ts">
    import Eye from "@lucide/svelte/icons/eye";
    import EyeOff from "@lucide/svelte/icons/eye-off";
    import { tick, type Snippet } from "svelte";
    import type { HTMLInputAttributes } from "svelte/elements";
    import type { SemanticVariant, SizeVariant } from "../types/variants.js";
    import { cn } from "../util/cn.js";
    import { fieldDescribedBy, fieldMessageState } from "../util/field.js";
    import { generateId } from "../util/ssr-safe.js";
    import { TOUCH_HIT_AREA } from "../util/touch-target.js";
    import FieldMessages from "./FieldMessages.svelte";
    import IconButton from "./IconButton.svelte";

    /**
     * Other attributes (`autocomplete`, `inputmode`, `maxlength`,
     * `enterkeyhint`, `data-*`, `onchange`, ...) land on the `<input>`.
     */
    type Props = Omit<
        HTMLInputAttributes,
        | "class"
        | "size"
        | "value"
        | "type"
        | "id"
        | "name"
        | "placeholder"
        | "required"
        | "disabled"
        | "oninput"
        | "onblur"
        | "aria-label"
        | "aria-describedby"
    > & {
        /** Omit to auto-generate; pair with FormField `id` when used inside FormField. */
        id?: string;
        value?: string;
        type?: string;
        name?: string;
        class?: string;
        label?: string;
        /** True when FormField supplies the visible `<label>`. */
        hideLabel?: boolean;
        placeholder?: string;
        required?: boolean;
        disabled?: boolean;
        loading?: boolean;
        size?: SizeVariant;
        variant?: SemanticVariant;
        /** Status text under the field. Shown with a `success`, `warning` or `error` variant; for neutral help, use `hint`. */
        message?: string;
        /** Help text under the field, read out with it. */
        hint?: string;
        /** An error under the field. It marks the field invalid and is announced; it wins over `variant` and `message`. */
        error?: string;
        /**
         * Drawn inside the field, before the text: an icon, a unit. Decoration
         * lets a press through to the field; a button or link in it is pressable.
         */
        leading?: Snippet;
        /** Drawn inside the field, after the text and before the loading spinner's place. */
        trailing?: Snippet;
        /**
         * With `type="password"`: adds a button at the end of the field that
         * shows the password as text, and hides it again. Ignored for other types.
         */
        revealable?: boolean;
        /**
         * Accessible name of that button. It stays the same in both states;
         * the button's pressed state says whether the password is showing.
         */
        revealLabel?: string;
        oninput?: (event: Event) => void;
        onblur?: (event: Event) => void;
        "aria-label"?: string;
        /** Ids of other elements that describe the field. The hint and the message are added after them. */
        "aria-describedby"?: string | null;
    };

    let {
        id: idProp,
        value = $bindable<Exclude<Props["value"], undefined>>(),
        type = "text",
        name = "",
        class: className = "",
        label = "",
        hideLabel = false,
        placeholder = "",
        required = false,
        disabled = false,
        loading = false,
        size = "md",
        variant = "default",
        message = "",
        hint = "",
        error = "",
        leading,
        trailing,
        revealable = false,
        revealLabel = "Show password",
        oninput,
        onblur,
        "aria-describedby": describedBy,
        ...restProps
    }: Props = $props();

    // No fallback on a bindable prop: Svelte refuses `bind:…={undefined}` on
    // one that has a fallback (`props_invalid_value`), and a page that throws
    // while it hydrates never becomes interactive. The default is applied
    // here instead: at once, for the server and the first render, and again
    // whenever a parent hands back `undefined`.
    const applyDefaults = () => {
        if (value === undefined) value = "";
    };
    applyDefaults();
    $effect.pre(applyDefaults);

    const fallbackId = generateId("input");
    const inputId = $derived(idProp ?? fallbackId);
    const isDisabled = $derived(disabled || loading);

    const status = $derived(fieldMessageState({ variant, message, hint, error }));

    /** Only a password can be revealed: on any other type the button would have nothing to do. */
    const canReveal = $derived(revealable && type === "password");
    let revealed = $state(false);
    const shownType = $derived(canReveal && revealed ? "text" : type);

    let input: HTMLInputElement | undefined = $state();

    /**
     * Changing `type` can drop the caret in some browsers. When the field has
     * focus (a mouse or a finger pressed the button: see `keepFocus`), the
     * selection is put back where it was.
     */
    async function restoreCaret() {
        const field = input;
        if (!field || document.activeElement !== field) return;
        const { selectionStart, selectionEnd, selectionDirection } = field;
        if (selectionStart === null || selectionEnd === null) return;
        const restore = () => {
            if (document.activeElement !== field) return;
            try {
                field.setSelectionRange(selectionStart, selectionEnd, selectionDirection ?? undefined);
            } catch {
                // A type without a text selection: nothing to put back.
            }
        };
        await tick();
        restore();
        // Chromium moves the caret to the start once more after the type has
        // changed, so it is put back again when the frame is done.
        requestAnimationFrame(restore);
    }

    /**
     * A press with a pointer does not take focus from the field: on a phone
     * that would close the keyboard in the middle of typing a password. From
     * the keyboard the button has focus and keeps it.
     */
    function keepFocus(event: Event) {
        event.preventDefault();
    }

    /**
     * Same fixed height scale as Button, IconButton and Select (32 / 40 / 48),
     * so a field and its submit button are the same height in a row. These
     * used to be 38 / 46 / 50 while Button was 40 / 48 / 64.
     *
     * Below the `sm` breakpoint the text is 16px at every size: iOS Safari
     * zooms the page when a focused field is smaller. Only the font grows;
     * the box keeps its height.
     */
    const sizeClass = $derived(() => {
        if (size === "sm") {
            return { box: "h-8 px-3 pointer-coarse:min-h-11", text: "text-sm max-sm:text-base", spinner: "size-3.5" };
        } else if (size === "lg") {
            return { box: "h-12 px-4", text: "text-base", spinner: "size-5" };
        } else {
            return { box: "h-10 px-3 pointer-coarse:min-h-11", text: "text-sm max-sm:text-base", spinner: "size-4" };
        }
    });

    /**
     * What stands inside the field at either end sits in a slot 4px in from
     * the field's edge and 8px smaller than the field: 24, 32 and 40px. An
     * icon is centred in it, which puts it where the text's own padding would;
     * a button fills it.
     */
    const SLOT_INSET = 4;
    const SLOTS = {
        sm: { px: 24, min: "min-w-[24px]", reveal: "xs", icon: 14 },
        md: { px: 32, min: "min-w-[32px]", reveal: "sm", icon: 16 },
        lg: { px: 40, min: "min-w-[40px]", reveal: "md", icon: 16 },
    } as const;
    const slot = $derived(SLOTS[size].px);
    const slotClass = $derived(SLOTS[size].min);
    /** The reveal button is one size down from the field, so it fits the slot: 24, 32 and 40px. */
    const revealSize = $derived(SLOTS[size].reveal);

    const hasLeading = $derived(!!leading);
    /** Whether the end of the field holds more than the spinner. */
    const hasTrailing = $derived(!!trailing || canReveal);

    /** Measured once mounted; until then, and on the server, the slots are assumed to be their least size. */
    let leadingWidth = $state(0);
    let trailingWidth = $state(0);

    /**
     * Reports the width of what stands at one end of the field, and again
     * when it changes. Where there is no `ResizeObserver` (an old browser, a
     * test without layout) the assumed size stays.
     */
    function measured(report: (width: number) => void) {
        return (element: HTMLElement) => {
            if (typeof ResizeObserver === "undefined") return;
            const observer = new ResizeObserver(() => report(element.offsetWidth));
            observer.observe(element);
            return () => observer.disconnect();
        };
    }
    const trailingCount = $derived((trailing ? 1 : 0) + (canReveal ? 1 : 0) + (loading ? 1 : 0));
    const leadingPad = $derived(
        hasLeading ? `${(leadingWidth || SLOT_INSET + slot) + SLOT_INSET}px` : undefined,
    );
    const trailingPad = $derived(
        hasTrailing
            ? `${(trailingWidth || SLOT_INSET + trailingCount * slot + (trailingCount - 1) * SLOT_INSET) + SLOT_INSET}px`
            : undefined,
    );

    const variantClass = $derived(() => {
        return status.variant === "success"
            ? "border-success focus-visible:border-success"
            : status.variant === "warning"
              ? "border-warning focus-visible:border-warning"
              : status.variant === "error"
                ? "border-error focus-visible:border-error"
                : "border-input-border enabled:hover:border-input-border-hover focus-visible:border-input-border";
    });

    const inputClasses = $derived(() => {
        const sizeStyles = sizeClass();
        // Room for the spinner alone. With more at the end, the measured width is used instead.
        const spinnerPad = loading && !hasTrailing ? SPINNER_PAD[size] : "";
        /**
         * The field is a raised surface (`bg-input` = white in light, an inset
         * step in dark). It used to be a grey fill on a grey page, which read
         * as disabled. `min-w-48` is gone: it forced a 192px floor on every
         * field regardless of the layout around it.
         */
        const baseClasses =
            "focus-ring w-full border bg-input hover:bg-input-hover focus-visible:bg-input-focus disabled:bg-input-disabled rounded-control transition-colors duration-150 placeholder:text-input-placeholder text-body focus:outline-none focus-visible:outline-none disabled:text-action-disabled-text disabled:cursor-not-allowed";

        return cn(`${baseClasses} ${sizeStyles.box} ${spinnerPad} ${sizeStyles.text} ${variantClass()} ${className}`);
    });

    const labelClasses = $derived(
        () => "block text-sm font-medium text-label mb-2",
    );

    /**
     * Both ends are laid over the field, which stays one box with one focus
     * ring. They let a press through to it, except on something in them that
     * can itself be pressed.
     */
    const SPINNER_PAD = { sm: "pe-9", md: "pe-10", lg: "pe-10" } as const;

    const END_BASE =
        "pointer-events-none absolute inset-y-0 flex items-center gap-[4px] text-description [&_:is(a,button,input,select,textarea,[tabindex])]:pointer-events-auto";

    function handleInput(event: Event) {
        if (oninput) {
            oninput(event);
        }
    }
</script>

<div>
    {#if label && !hideLabel}
        <label for={inputId} class={labelClasses()}>{label}</label>
    {/if}
    <div class="relative">
        <input
            bind:this={input}
            id={inputId}
            type={shownType}
            {name}
            bind:value
            {placeholder}
            {required}
            disabled={isDisabled}
            class={inputClasses()}
            style:padding-inline-start={leadingPad}
            style:padding-inline-end={trailingPad}
            oninput={handleInput}
            {onblur}
            aria-invalid={status.variant === "error" ? "true" : undefined}
            aria-required={required ? "true" : undefined}
            aria-busy={loading ? "true" : undefined}
            aria-describedby={fieldDescribedBy(inputId, status, describedBy)}
            {...restProps}
        />
        {#if leading}
            <span
                class={cn(END_BASE, "start-0 ps-[4px]")}
                {@attach measured((width) => (leadingWidth = width))}
                data-input-leading
            >
                <span class={cn("flex items-center justify-center", slotClass)}>
                    {@render leading()}
                </span>
            </span>
        {/if}
        {#if loading || hasTrailing}
            <span
                class={cn(END_BASE, "end-0 pe-[4px]")}
                {@attach measured((width) => (trailingWidth = width))}
                data-input-trailing
            >
                {#if trailing}
                    <span class={cn("flex items-center justify-center", slotClass)}>
                        {@render trailing()}
                    </span>
                {/if}
                {#if canReveal}
                    <!-- A toggle with one name: "Show password", pressed or not.
                    A name that changed with the state would read as "Hide
                    password, pressed". The visible box is 4px inside the field
                    at every size, so its corners are the field's less 4px; on a
                    touch screen the layer around it is the 44px target. -->
                    <IconButton
                        variant="ghost"
                        size={revealSize}
                        bind:pressed={revealed}
                        label={revealLabel}
                        disabled={isDisabled}
                        class={cn(
                            "rounded-[calc(var(--radius-control)-4px)] pointer-coarse:relative pointer-coarse:min-h-0 pointer-coarse:min-w-0",
                            TOUCH_HIT_AREA,
                        )}
                        onmousedown={keepFocus}
                        onclick={restoreCaret}
                        data-input-reveal
                    >
                        {#if revealed}
                            <EyeOff size={SLOTS[size].icon} aria-hidden="true" />
                        {:else}
                            <Eye size={SLOTS[size].icon} aria-hidden="true" />
                        {/if}
                    </IconButton>
                {/if}
                {#if loading}
                    <!-- 12px from the field's edge, where it has always been. -->
                    <span class="flex items-center ps-[4px] pe-[8px]" aria-hidden="true">
                        <span
                            class="inline-block {sizeClass()
                                .spinner} shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70 motion-reduce:animate-pulse"
                        ></span>
                    </span>
                {/if}
            </span>
        {/if}
    </div>
    <FieldMessages fieldId={inputId} {status} {hint} />
</div>
