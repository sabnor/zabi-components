<script lang="ts" generics="T extends ComboboxItem">
    import { onDestroy, type Snippet } from "svelte";
    import type { HTMLInputAttributes } from "svelte/elements";
    import type { SemanticVariant, SizeVariant } from "../types/variants.js";
    import Input from "../atoms/Input.svelte";
    import { cn } from "../util/cn.js";
    import { DEFAULT_COMBOBOX_STRINGS, type ComboboxItem, type ComboboxStrings } from "../util/combobox.js";
    import { generateId } from "../util/ssr-safe.js";
    import { zabiStringsFor } from "../util/zabi-strings.js";

    /**
     * Other attributes (`autocomplete`, `inputmode`, `enterkeyhint`,
     * `aria-*`, `data-*`, ...) land on the `<input>`.
     */
    type Props = Omit<
        HTMLInputAttributes,
        // `onselect` is also a native event (text selection); ours replaces it.
        "class" | "size" | "value" | "type" | "id" | "name" | "placeholder" | "disabled" | "required" | "oninput" | "onselect" | "children" | "aria-describedby" | "aria-label"
    > & {
        /**
         * Looks up suggestions for the text. Called `debounce` ms after the last
         * key, once the text has `minLength` characters. `signal` is aborted when
         * a newer search starts or the field closes; an older answer is dropped
         * either way. A rejected promise shows the empty state.
         */
        search: (query: string, signal: AbortSignal) => T[] | Promise<T[]>;
        /** The text in the field. Free text is allowed: it stays as typed when nothing is chosen. */
        value?: string;
        /** The chosen suggestion; `null` again once the text is edited. */
        selected?: T | null;
        onselect?: (item: T) => void;
        oninput?: (text: string) => void;
        /** Draws the inside of one option. The default is the label, with the description under it. */
        item?: Snippet<[T]>;
        /** Milliseconds to wait after the last key before searching. */
        debounce?: number;
        /** Fewest characters that start a search. */
        minLength?: number;
        id?: string;
        name?: string;
        class?: string;
        label?: string;
        placeholder?: string;
        disabled?: boolean;
        required?: boolean;
        "aria-label"?: string;
        "aria-describedby"?: string | null;
        size?: SizeVariant;
        variant?: SemanticVariant;
        message?: string;
        hint?: string;
        error?: string;
        strings?: Partial<ComboboxStrings>;
    };

    let {
        search,
        value = $bindable<string | undefined>(),
        selected = $bindable<T | null | undefined>(),
        onselect,
        oninput,
        item: itemSnippet,
        debounce = 250,
        minLength = 1,
        id: idProp,
        name,
        class: className = "",
        label = "",
        placeholder = "",
        disabled = false,
        required = false,
        size = "md",
        variant = "default",
        message = "",
        hint = "",
        error = "",
        strings,
        onkeydown,
        onfocus,
        onblur,
        ...restProps
    }: Props = $props();

    // No fallback on a bindable prop (see Input): applied here instead.
    const applyDefaults = () => {
        if (value === undefined) value = "";
        if (selected === undefined) selected = null;
    };
    applyDefaults();
    $effect.pre(applyDefaults);

    const provided = zabiStringsFor("combobox");
    const words = $derived({ ...DEFAULT_COMBOBOX_STRINGS, ...provided(), ...strings });

    const fallbackId = generateId("combobox");
    const inputId = $derived(idProp ?? fallbackId);
    const listId = $derived(`${inputId}-listbox`);
    const optionId = (index: number) => `${inputId}-option-${index}`;

    let items = $state<T[]>([]);
    let open = $state(false);
    let active = $state(-1);
    let loading = $state(false);
    /** True once a search has answered (or failed) for the text now in the field. */
    let searched = $state(false);
    let focused = $state(false);

    let root: HTMLElement | undefined = $state();
    let listTop = $state(0);
    let timer: ReturnType<typeof setTimeout> | undefined;
    let controller: AbortController | undefined;

    function cancel() {
        clearTimeout(timer);
        timer = undefined;
        controller?.abort();
        controller = undefined;
    }
    onDestroy(cancel);

    function reset() {
        cancel();
        items = [];
        active = -1;
        loading = false;
        searched = false;
        open = false;
    }

    function schedule(text: string) {
        cancel();
        if (text.trim().length < minLength || text.length === 0) {
            reset();
            return;
        }
        loading = true;
        searched = false;
        open = focused;
        active = -1;
        const mine = new AbortController();
        controller = mine;
        timer = setTimeout(async () => {
            let found: T[] = [];
            try {
                found = await search(text, mine.signal);
            } catch {
                found = [];
            }
            if (mine.signal.aborted || controller !== mine) return;
            items = Array.isArray(found) ? found : [];
            active = -1;
            loading = false;
            searched = true;
            open = focused;
        }, debounce);
    }

    function handleInput(event: Event) {
        const text = (event.target as HTMLInputElement).value;
        value = text;
        if (selected && selected.label !== text) selected = null;
        oninput?.(text);
        schedule(text);
    }

    function choose(option: T) {
        if (option.disabled) return;
        cancel();
        value = option.label;
        selected = option;
        items = [];
        active = -1;
        loading = false;
        searched = false;
        open = false;
        onselect?.(option);
    }

    /** The next enabled option from `from` going `step`, wrapping; -1 when none can be chosen. */
    function next(from: number, step: 1 | -1) {
        const count = items.length;
        for (let n = 1; n <= count; n++) {
            const index = (((from + step * n) % count) + count) % count;
            if (!items[index].disabled) return index;
        }
        return -1;
    }

    function handleKeydown(event: KeyboardEvent) {
        onkeydown?.(event as KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement });
        if (event.defaultPrevented) return;
        const hasOptions = items.length > 0;
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            if (!hasOptions) return;
            event.preventDefault();
            const step = event.key === "ArrowDown" ? 1 : -1;
            if (!open) {
                open = true;
                active = next(step === 1 ? -1 : 0, step);
            } else {
                active = next(active === -1 && step === -1 ? 0 : active, step);
            }
        } else if (event.key === "Enter") {
            if (open && active >= 0 && items[active]) {
                event.preventDefault();
                choose(items[active]);
            }
        } else if (event.key === "Escape") {
            if (open) {
                event.preventDefault();
                event.stopPropagation();
                open = false;
                active = -1;
            }
        } else if (event.key === "Tab") {
            open = false;
            active = -1;
        }
    }

    function handleFocus(event: FocusEvent) {
        focused = true;
        onfocus?.(event as FocusEvent & { currentTarget: EventTarget & HTMLInputElement });
    }

    function handleBlur(event: Event) {
        focused = false;
        cancel();
        loading = false;
        open = false;
        active = -1;
        onblur?.(event as FocusEvent & { currentTarget: EventTarget & HTMLInputElement });
    }

    const showList = $derived(open && (loading || searched || items.length > 0));
    const status = $derived(
        !focused
            ? ""
            : loading
              ? words.loading
              : searched
                ? items.length === 0
                  ? words.empty
                  : words.results(items.length)
                : "",
    );

    // The list hangs under the field itself, not under the label above it or
    // the hint below it: measured when it opens, since either may change.
    $effect(() => {
        if (!showList || !root) return;
        const input = root.querySelector("input");
        if (!input) return;
        listTop = input.getBoundingClientRect().bottom - root.getBoundingClientRect().top + 4;
    });
</script>

<div bind:this={root} class="relative">
    <Input
        id={inputId}
        {name}
        {label}
        {placeholder}
        {disabled}
        {required}
        {size}
        {variant}
        {message}
        {hint}
        {error}
        class={className}
        value={value}
        autocomplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showList}
        aria-controls={showList ? listId : undefined}
        aria-activedescendant={showList && active >= 0 ? optionId(active) : undefined}
        oninput={handleInput}
        onkeydown={handleKeydown}
        onfocus={handleFocus}
        onblur={handleBlur}
        {...restProps}
    />
    {#if showList}
        <div
            class="absolute inset-x-0 z-20 max-h-64 overflow-y-auto rounded-control border border-border bg-surface-overlay shadow-lg"
            style:top="{listTop}px"
            data-combobox-popup
        >
            <ul id={listId} role="listbox" aria-label={label || undefined} hidden={items.length === 0} class="m-0 list-none p-0">
                {#each items as option, index (option.value)}
                    <li
                        id={optionId(index)}
                        role="option"
                        aria-selected={index === active}
                        aria-disabled={option.disabled ? "true" : undefined}
                        class={cn(
                            "flex min-h-9 pointer-coarse:min-h-11 cursor-pointer flex-col justify-center px-3 py-2 text-sm text-headline",
                            index === active && "bg-surface-overlay-hover",
                            option.disabled && "cursor-not-allowed text-action-disabled-text",
                        )}
                        onpointerdown={(event) => {
                            // Keeps focus in the field: a blur would close the list first.
                            event.preventDefault();
                            choose(option);
                        }}
                    >
                        {#if itemSnippet}
                            {@render itemSnippet(option)}
                        {:else}
                            <span>{option.label}</span>
                            {#if option.description}
                                <span class="text-xs text-description">{option.description}</span>
                            {/if}
                        {/if}
                    </li>
                {/each}
            </ul>
            {#if loading || (searched && items.length === 0)}
                <div class="min-h-9 px-3 py-2 text-sm text-description" data-combobox-status>
                    {loading ? words.loading : words.empty}
                </div>
            {/if}
        </div>
    {/if}
    <span class="sr-only" aria-live="polite" data-combobox-live>{status}</span>
</div>
