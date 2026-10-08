<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";
    import type { SemanticVariant } from "../types/variants.js";
    import { cn } from "../util/cn.js";
    import {
        activePlace,
        caretAfterSanitise,
        codeLength,
        DEFAULT_CODE_FIELD_STRINGS,
        isCodeChar,
        pasteInto,
        replaceAt,
        sanitiseCode,
        type CodeFieldMode,
        type CodeFieldStrings,
    } from "../util/code-field.js";
    import { fieldDescribedBy, fieldMessageState } from "../util/field.js";
    import { mergeStrings } from "../util/ready-made-strings.js";
    import { generateId } from "../util/ssr-safe.js";
    import { zabiStringsFor } from "../util/zabi-strings.js";
    import FieldMessages from "./FieldMessages.svelte";

    /**
     * A field for a one-time or verification code. One real `<input>` holds
     * the code, so autofill from a message, paste, the numeric keyboard, form
     * posting by `name` and a single accessible name all work as on `Input`;
     * the boxes are drawn under it and hidden from assistive technology.
     * Other attributes (`autocomplete`, `inputmode`, `data-*`, ...) land on
     * the `<input>`.
     */
    type Props = Omit<
        HTMLInputAttributes,
        | "class"
        | "size"
        | "value"
        | "type"
        | "id"
        | "name"
        | "required"
        | "disabled"
        | "readonly"
        | "maxlength"
        | "oninput"
        | "onblur"
        | "aria-label"
        | "aria-describedby"
    > & {
        /** Omit to auto-generate. */
        id?: string;
        /** The code typed so far. Bindable. */
        value?: string;
        /** The name the code is posted under, with or without scripts. */
        name?: string;
        class?: string;
        /** Places in the code. A whole number from 1 to 12. */
        length?: number;
        /** `numeric` (default): digits only. `alphanumeric` also takes letters. */
        mode?: CodeFieldMode;
        /** Names the field. Defaults to the provider's `codeField.label`, then "Verification code". */
        label?: string;
        /** Keeps the label for assistive technology and takes it off the screen. */
        labelHidden?: boolean;
        required?: boolean;
        disabled?: boolean;
        readonly?: boolean;
        variant?: SemanticVariant;
        /** Status text under the field. Shown with a `success`, `warning` or `error` variant; for neutral help, use `hint`. */
        message?: string;
        /** Help text under the field, read out with it. */
        hint?: string;
        /** An error under the field. It marks the field invalid and is announced; it wins over `variant` and `message`. */
        error?: string;
        /** Called with the code when the last place is filled by typing, pasting or autofill. It does not submit anything. */
        oncomplete?: (value: string) => void;
        /** Overrides for the built-in strings: label, description. */
        strings?: Partial<CodeFieldStrings>;
        oninput?: (event: Event) => void;
        onblur?: (event: Event) => void;
        "aria-label"?: string;
        /** Ids of other elements that describe the field. The length, the hint and the message are added after them. */
        "aria-describedby"?: string | null;
    };

    /** An event on the input, as Svelte types the handlers of an element. */
    type OnInput<E extends Event> = E & { currentTarget: EventTarget & HTMLInputElement };

    let {
        id: idProp,
        value = $bindable<Exclude<Props["value"], undefined>>(),
        name = "",
        class: className = "",
        length: lengthProp = 6,
        mode = "numeric",
        label,
        labelHidden = false,
        required = false,
        disabled = false,
        readonly = false,
        variant = "default",
        message = "",
        hint = "",
        error = "",
        oncomplete,
        strings,
        oninput,
        onblur,
        "aria-label": ariaLabel,
        "aria-describedby": describedBy,
        ...restProps
    }: Props = $props();

    // No fallback on a bindable prop (see Input): the default is applied here,
    // at once and whenever a parent hands back `undefined`.
    const applyDefaults = () => {
        if (value === undefined) value = "";
    };
    applyDefaults();
    $effect.pre(applyDefaults);

    const length = $derived(codeLength(lengthProp));
    const provided = zabiStringsFor("codeField");
    const text = $derived(mergeStrings(DEFAULT_CODE_FIELD_STRINGS, provided(), strings));
    const shownLabel = $derived(label || text.label);

    const fallbackId = generateId("code");
    const inputId = $derived(idProp ?? fallbackId);
    const lengthId = $derived(`${inputId}-length`);
    const status = $derived(fieldMessageState({ variant, message, hint, error }));

    let input: HTMLInputElement | undefined = $state();
    let cells: HTMLElement | undefined = $state();
    let focused = $state(false);
    let caret = $state(0);

    /**
     * Without scripts the input is a plain bordered field showing what is
     * typed, which posts like any other. Once the page is interactive it
     * becomes the invisible layer over the boxes.
     */
    let enhanced = $state(false);
    $effect(() => {
        enhanced = true;
    });

    const places = $derived(Array.from({ length }, (_, index) => value?.[index] ?? ""));
    const active = $derived(enhanced && focused && !disabled && !readonly ? activePlace(caret, length) : -1);

    const variantClass = $derived(
        status.variant === "success"
            ? "border-success"
            : status.variant === "warning"
              ? "border-warning"
              : status.variant === "error"
                ? "border-error"
                : "border-input-border",
    );

    /** The focus ring of `.focus-ring`, drawn on the box the caret is in. */
    const RING = "shadow-[0_0_0_2px_var(--color-focus-ring-offset),0_0_0_4px_var(--color-focus-ring)]";

    let complete = "";

    /** Sets the code, and calls `oncomplete` when this makes it whole. */
    function commit(next: string, caretAt: number) {
        const previous = value ?? "";
        if (next !== previous) value = next;
        if (input) {
            if (input.value !== next) input.value = next;
            try {
                input.setSelectionRange(caretAt, caretAt);
            } catch {
                // A browser that cannot place the caret: typing still works.
            }
        }
        caret = caretAt;
        if (next.length === length) {
            if (next !== complete) {
                complete = next;
                oncomplete?.(next);
            }
        } else {
            complete = "";
        }
    }

    function syncCaret() {
        if (input) caret = input.selectionStart ?? input.value.length;
    }

    function handleInput(event: OnInput<Event>) {
        oninput?.(event);
        const field = event.currentTarget;
        const raw = field.value;
        const clean = sanitiseCode(raw, mode, length);
        const at = caretAfterSanitise(raw, field.selectionStart ?? raw.length, mode, length);
        commit(clean, Math.min(at, clean.length));
    }

    /**
     * A character typed over a filled place replaces it; one typed at the end
     * is added. A character that does not belong never gets in.
     */
    function handleKeydown(event: OnInput<KeyboardEvent>) {
        restProps.onkeydown?.(event);
        if (event.defaultPrevented || readonly || disabled) return;
        if (event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) return;
        const field = event.currentTarget;
        if (!isCodeChar(event.key, mode)) {
            event.preventDefault();
            return;
        }
        const start = field.selectionStart ?? 0;
        const end = field.selectionEnd ?? start;
        if (start === end && start < field.value.length) {
            event.preventDefault();
            commit(replaceAt(field.value, start, event.key), start + 1);
        } else if (start === end && field.value.length >= length) {
            event.preventDefault();
        }
    }

    /** Takes the whole code from the clipboard, wherever the caret is; "123 456" and "123-456" are 123456. */
    function handlePaste(event: OnInput<ClipboardEvent>) {
        restProps.onpaste?.(event);
        if (event.defaultPrevented || readonly || disabled) return;
        const field = event.currentTarget;
        event.preventDefault();
        const pasted = event.clipboardData?.getData("text") ?? "";
        const start = field.selectionStart ?? field.value.length;
        const end = field.selectionEnd ?? start;
        const next = pasteInto(field.value, start, end, pasted, mode, length);
        if (next === field.value && sanitiseCode(pasted, mode, length) === "") return;
        commit(next, next.length === length ? length : Math.min(next.length, start + sanitiseCode(pasted, mode, length).length));
    }

    /** A tap on a box puts the caret there, or at the end of the code when that box is still empty. */
    function handleClick(event: OnInput<MouseEvent>) {
        restProps.onclick?.(event);
        if (!input || !cells) return;
        const boxes = Array.from(cells.querySelectorAll<HTMLElement>("[data-code-cell]"));
        let index = boxes.findIndex((box) => {
            const rect = box.getBoundingClientRect();
            return event.clientX >= rect.left && event.clientX <= rect.right;
        });
        if (index < 0) return syncCaret();
        index = Math.min(index, input.value.length);
        try {
            input.setSelectionRange(index, index);
        } catch {
            // Nothing to place.
        }
        syncCaret();
    }

    const fieldClass = $derived(
        enhanced
            ? "absolute inset-0 size-full min-w-0 cursor-text border-0 bg-transparent p-0 text-base text-transparent caret-transparent outline-none selection:bg-transparent disabled:cursor-not-allowed"
            : cn(
                  "h-12 w-full rounded-control border bg-input px-3 text-center text-xl font-medium tracking-[0.35em] text-body tabular-nums hover:bg-input-hover disabled:cursor-not-allowed disabled:bg-input-disabled disabled:text-action-disabled-text focus-ring",
                  variantClass,
              ),
    );
</script>

<div class={cn("w-full", className)}>
    <label for={inputId} class={cn("mb-2 block text-sm font-medium text-label", labelHidden && "sr-only")}>
        {shownLabel}
    </label>
    <div
        class="relative"
        style:max-inline-size="calc({length} * 3rem + {length - 1} * 0.5rem)"
        bind:this={cells}
    >
        {#if enhanced}
            <div class="flex gap-2" aria-hidden="true" data-code-cells>
                {#each places as place, index (index)}
                    <span
                        data-code-cell
                        data-active={index === active ? "" : undefined}
                        style:max-inline-size="3rem"
                        class={cn(
                            "flex h-12 min-w-0 flex-1 items-center justify-center rounded-control border bg-input text-xl font-medium text-body tabular-nums transition-colors duration-150",
                            variantClass,
                            disabled && "cursor-not-allowed bg-input-disabled text-action-disabled-text",
                            index === active && RING,
                        )}
                    >
                        {place}
                    </span>
                {/each}
            </div>
        {/if}
        <input
            bind:this={input}
            id={inputId}
            type="text"
            {name}
            bind:value
            {required}
            {disabled}
            {readonly}
            inputmode={mode === "numeric" ? "numeric" : "text"}
            autocomplete="one-time-code"
            autocapitalize="off"
            autocorrect="off"
            spellcheck={false}
            class={fieldClass}
            aria-label={ariaLabel}
            aria-invalid={status.variant === "error" ? "true" : undefined}
            aria-required={required ? "true" : undefined}
            aria-describedby={fieldDescribedBy(inputId, status, [describedBy, lengthId].filter(Boolean).join(" "))}
            {...restProps}
            oninput={handleInput}
            onkeydown={handleKeydown}
            onpaste={handlePaste}
            onclick={handleClick}
            onkeyup={syncCaret}
            onselect={syncCaret}
            onfocus={(event) => {
                focused = true;
                syncCaret();
                restProps.onfocus?.(event);
            }}
            onblur={(event) => {
                focused = false;
                onblur?.(event);
            }}
        />
    </div>
    <span id={lengthId} class="sr-only">{text.description(length, mode)}</span>
    <FieldMessages fieldId={inputId} {status} {hint} />
</div>
