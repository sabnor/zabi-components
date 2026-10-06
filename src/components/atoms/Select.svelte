<script lang="ts">
    import Dropdown from "../molecules/Dropdown.svelte";
    import Input from "./Input.svelte";
    import ChevronDown from "@lucide/svelte/icons/chevron-down";
    import { onMount } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";
    import {
        DEFAULT_SELECT_STRINGS,
        NATIVE_SELECT_ATTRIBUTE,
        valueBeforeMount,
        type SelectPresentation,
        type SelectStrings,
    } from "../util/select.js";
    import { generateId } from "../util/ssr-safe.js";
    import { cn } from "../util/cn.js";
    import { fieldDescribedBy, fieldMessageState } from "../util/field.js";
    import FieldMessages from "./FieldMessages.svelte";

    /**
     * Other attributes (`data-*`, `aria-*`, `onfocus`, ...) land on the
     * trigger, which is a `<button>`: it is the control that takes focus and
     * that the label names.
     *
     * The server's HTML also carries a native `<select>` with the same
     * options. Until the component has mounted, and for good where there are
     * no scripts, that is the control: it is what is seen, pressed and
     * submitted. Once mounted the trigger and the list take over, and the
     * native select stays, out of sight and out of reach, as the form control
     * (`name`, `required`), kept at the same value. With
     * `presentation="native"` it is the control throughout.
     */
    type Props = Omit<
        HTMLButtonAttributes,
        | "class"
        | "value"
        | "name"
        | "disabled"
        | "type"
        | "onchange"
        | "onclick"
        | "aria-describedby"
        | "children"
    > & {
        /** Extra classes for the host element. */
        class?: string;
        /** Id of the trigger. Omit to auto-generate. */
        id?: string;
        value?: string | number | undefined;
        options?: Array<{
            value: string | number;
            label: string;
            disabled?: boolean;
        }>;
        searchable?: boolean;
        /**
         * The component's own texts, for another language. Whatever is left
         * out keeps its English default. The six older props for single texts
         * (`placeholder`, `searchPlaceholder`, `noResultsText`,
         * `loadingText`, `emptyStateTitle`, `emptyStateDescription`) win
         * over it.
         */
        strings?: Partial<SelectStrings>;
        searchPlaceholder?: string;
        maxMenuHeight?: string;
        menuWidth?: string;
        /**
         * How the list is shown. `auto`: in a BottomSheet on a phone (a touch
         * screen narrower than 640px), under the trigger everywhere else.
         * `popover` and `sheet` are always the one or the other. `native`:
         * only the browser's own `<select>`, styled as the field, with the
         * platform's picker. It shows the options' labels and nothing else:
         * no search field, and none of the loading or empty states.
         */
        presentation?: SelectPresentation;
        noResultsText?: string;
        isLoading?: boolean;
        loadingText?: string;
        emptyStateTitle?: string;
        emptyStateDescription?: string;
        emptyStateActionLabel?: string;
        placeholder?: string;
        label?: string;
        /** The name the chosen value is submitted under, by the native `<select>`. */
        name?: string;
        /**
         * The form is not sent while nothing is chosen. Checked by the
         * browser on the native `<select>`; once mounted, the browser's own
         * message is shown under the field and focus goes to the trigger.
         */
        required?: boolean;
        disabled?: boolean;
        size?: "sm" | "md" | "lg";
        variant?: "default" | "success" | "warning" | "error";
        /** Status text under the field. Shown with a `success`, `warning` or `error` variant; for neutral help, use `hint`. */
        message?: string;
        /** Help text under the field, read out with it. */
        hint?: string;
        /** An error under the field. It marks the field invalid and is announced; it wins over `variant` and `message`. */
        error?: string;
        onchange?: (event: Event) => void;
        onEmptyStateAction?: () => void;
        /** Ids of other elements that describe the field. The hint and the message are added after them. */
        "aria-describedby"?: string | null;
    };

    let {
        class: className = "",
        id: idProp,
        value = $bindable(undefined),
        options = [],
        searchable = true,
        strings,
        searchPlaceholder,
        maxMenuHeight = "60dvh",
        menuWidth = "100%",
        presentation = "auto",
        noResultsText,
        isLoading = false,
        loadingText,
        emptyStateTitle,
        emptyStateDescription,
        emptyStateActionLabel = "",
        placeholder,
        label = "",
        name = "",
        required = false,
        disabled = false,
        size = "md",
        variant = "default",
        message = "",
        hint = "",
        error = "",
        onchange,
        onEmptyStateAction,
        "aria-describedby": describedBy,
        ...restProps
    }: Props = $props();

    /** The defaults, then `strings`, then the older props where they are set. */
    const text = $derived<SelectStrings>({
        ...DEFAULT_SELECT_STRINGS,
        ...strings,
        ...(placeholder !== undefined && { placeholder }),
        ...(searchPlaceholder !== undefined && { searchPlaceholder }),
        ...(noResultsText !== undefined && { noResults: noResultsText }),
        ...(loadingText !== undefined && { loading: loadingText }),
        ...(emptyStateTitle !== undefined && { emptyTitle: emptyStateTitle }),
        ...(emptyStateDescription !== undefined && { emptyDescription: emptyStateDescription }),
    });

    const isNative = $derived(presentation === "native");
    /**
     * False on the server and until the component has mounted: the native
     * select is the control. True after: the trigger is. The two have the
     * same box, so nothing moves when one replaces the other.
     */
    let mounted = $state(false);
    /** Whether the native select is what is seen and pressed. */
    const nativeShown = $derived(isNative || !mounted);

    let nativeElement = $state<HTMLSelectElement | null>(null);
    /** What the browser said was wrong with the hidden native select (`required`), in its own words. */
    let nativeError = $state("");

    const status = $derived(
        fieldMessageState({ variant, message, hint, error: error || nativeError }),
    );

    let isOpen = $state(false);
    let selectContainer: HTMLDivElement;
    let searchQuery = $state("");

    // Same fixed height scale as Button, IconButton and Input (32 / 40 / 48),
    // and the same 16px text below `sm`, so a Select beside an Input matches it.
    const sizeClass = $derived(() => {
        // A minimum height, so a label that wraps makes the trigger taller
        // instead of being cut. One line is exactly 32, 40 or 48px: the
        // padding leaves room for the line and the border inside it, and is
        // a step smaller below `sm`, where the text is 16px on a 24px line. `native` is the same box for the native
        // select, which is always one line.
        if (size === "sm") return { box: "min-h-8 px-3 py-1 max-sm:py-0 pointer-coarse:min-h-11", text: "text-sm max-sm:text-base", native: "h-8 ps-3 pe-9 pointer-coarse:h-11", chevron: "end-3" };
        if (size === "lg") return { box: "min-h-12 px-4 py-2", text: "text-base", native: "h-12 ps-4 pe-10", chevron: "end-4" };
        return { box: "min-h-10 px-3 py-2 max-sm:py-1 pointer-coarse:min-h-11", text: "text-sm max-sm:text-base", native: "h-10 ps-3 pe-9 pointer-coarse:h-11", chevron: "end-3" };
    });

    const variantClass = $derived(() => {
        return status.variant === "success"
            ? "border-success focus-visible:border-success"
            : status.variant === "warning"
              ? "border-warning focus-visible:border-warning"
              : status.variant === "error"
                ? "border-error focus-visible:border-error"
                : "border-input-border enabled:hover:border-input-border-hover";
    });

    /** What the trigger and the visible native select share: the field's surface, edge and states. */
    const fieldSurface =
        "focus-ring w-full min-w-0 cursor-pointer rounded-control border bg-input text-body transition-colors duration-150 hover:bg-input-hover active:bg-input-active focus-visible:bg-input-focus focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-input-disabled disabled:text-action-disabled-text";

    const triggerClasses = $derived(() => {
        const sizeStyles = sizeClass();
        const baseClasses = `${fieldSurface} flex items-center justify-between gap-2`;

        return cn(
            `${baseClasses} ${sizeStyles.box} ${sizeStyles.text} ${variantClass()}`,
            // Until it has mounted the native select stands in its place.
            !mounted && "hidden",
        );
    });

    const nativeClasses = $derived.by(() => {
        const sizeStyles = sizeClass();
        if (!nativeShown) {
            // Mounted, with a list of our own: still the form control, laid
            // over the trigger so the browser's validation has a place to
            // point at, but not seen, pressed or reached. `invisible`
            // (`visibility: hidden`) is what takes it out of the tab order
            // and the accessibility tree for certain; a form still sends and
            // validates it.
            return "pointer-events-none invisible absolute inset-0 h-full w-full";
        }
        return cn(
            `${fieldSurface} block appearance-none truncate ${sizeStyles.native} ${sizeStyles.text} ${variantClass()}`,
            !disabled && isEmpty() && "text-input-placeholder",
        );
    });

    const labelClasses = $derived(
        () => "block text-sm font-medium text-label mb-2",
    );

    const fallbackId = generateId("select");
    const selectId = $derived(idProp ?? fallbackId);

    const isEmpty = $derived(() => {
        return value === undefined || value === null || value === "";
    });

    /** String comparison so `"2"` and `2` match — same rule as Dropdown's `selectedValue`. */
    function isSameValue(
        a: string | number | null | undefined,
        b: string | number | null | undefined,
    ): boolean {
        if (a === undefined || a === null || b === undefined || b === null) {
            return false;
        }
        return String(a) === String(b);
    }

    const selectedOption = $derived.by(() =>
        options.find((opt) => isSameValue(opt.value, value)),
    );

    const hasSearchQuery = $derived(() => {
        return searchQuery.trim().length > 0;
    });

    const filteredOptions = $derived(() => {
        const query = searchQuery.trim().toLowerCase();
        const availableOptions = options;
        if (!searchable || query.length === 0) {
            return availableOptions;
        }
        return availableOptions.filter((option) =>
            option.label.toLowerCase().includes(query),
        );
    });

    $effect(() => {
        if (!isOpen && searchQuery.length > 0) {
            searchQuery = "";
        }
    });

    function handleOptionClick(optionValue: string | number) {
        if (disabled || isLoading) return;
        if (options.find((option) => option.value === optionValue)?.disabled) return;
        isOpen = false;
        choose(optionValue);
    }

    /** Sets the value and tells the app, as a change of a form control does. */
    function choose(optionValue: string | number | undefined) {
        value = optionValue;

        if (onchange) {
            const syntheticEvent = new Event("change", { bubbles: true });
            Object.defineProperty(syntheticEvent, "target", {
                value: { value: optionValue },
                enumerable: true,
            });
            (onchange as (event: Event) => void)(syntheticEvent);
        }
    }

    /**
     * The native select's value as one of the options' own: a number stays a
     * number. The empty first option is "nothing chosen".
     */
    function fromNative(raw: string): string | number | undefined {
        if (raw === "") return undefined;
        return options.find((option) => String(option.value) === raw)?.value ?? raw;
    }

    /** The native select was changed: by the visitor, in `native`, or by the browser restoring a form. */
    function handleNativeChange(event: Event) {
        const raw = (event.currentTarget as HTMLSelectElement).value;
        if (raw === (isEmpty() ? "" : String(value))) return;
        choose(fromNative(raw));
    }

    /**
     * The browser found the hidden native select invalid (`required`, and
     * nothing chosen). Its own bubble would point at a control nobody can
     * see, and focus would go into it: the message is shown under the field
     * instead, in the browser's words, and focus goes to the trigger.
     */
    function handleNativeInvalid(event: Event) {
        if (nativeShown) return;
        event.preventDefault();
        nativeError = (event.currentTarget as HTMLSelectElement).validationMessage;
        document.getElementById(selectId)?.focus();
    }

    $effect(() => {
        // A choice answers it.
        void value;
        nativeError = "";
    });

    onMount(() => {
        // A choice made in the native select before the scripts arrived is
        // the visitor's: it becomes the value, and is reported once.
        const before = nativeElement ? valueBeforeMount(nativeElement) : undefined;
        if (before !== undefined && before !== (isEmpty() ? "" : String(value))) {
            choose(fromNative(before));
        }
        mounted = true;
    });

    function handleTriggerClick(event: MouseEvent) {
        if (disabled || isLoading) return;
        event.stopPropagation();
        isOpen = !isOpen;
    }

    function handleClickOutside(event: MouseEvent) {
        if (!isOpen) return;

        const target = event.target as HTMLElement;
        // The list in a sheet is in `<body>`, not in this container: a press
        // in that sheet (an option, the grip, the search field) is not outside.
        if (target.closest('[role="dialog"]')?.querySelector("[data-dropdown-sheet]")) return;
        const clickedSelectContainer = target.closest(".select-container");

        if (
            !clickedSelectContainer ||
            clickedSelectContainer !== selectContainer
        ) {
            isOpen = false;
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape" && isOpen) {
            isOpen = false;
        }
    }
</script>

<svelte:window onclick={handleClickOutside} onkeydown={handleKeydown} />

<div bind:this={selectContainer} class={cn("w-full min-w-0 select-container", className)}>
    {#if label}
        <label for={selectId} class={labelClasses()}>{label}</label>
    {/if}

    <div class="relative w-full min-w-0">
    <!-- The native select. While it is the control it has the field's id, so
    the label and the messages are its; once the trigger has taken over it is
    hidden from assistive technology and out of the tab order, and only the
    form talks to it. A disabled Select has always sent its value, so the
    hidden one is not disabled; what is not sent is its `required`. -->
    <select
        bind:this={nativeElement}
        id={nativeShown ? selectId : `${selectId}-native`}
        name={name || undefined}
        class={nativeClasses}
        required={required && (nativeShown || !(disabled || isLoading))}
        disabled={nativeShown && (disabled || isLoading)}
        tabindex={nativeShown ? undefined : -1}
        aria-hidden={nativeShown ? undefined : "true"}
        aria-invalid={nativeShown && status.variant === "error" ? "true" : undefined}
        aria-describedby={nativeShown ? fieldDescribedBy(selectId, status, describedBy) : undefined}
        onchange={handleNativeChange}
        oninvalid={handleNativeInvalid}
        {...{ [NATIVE_SELECT_ATTRIBUTE]: "" }}
        {...isNative ? (restProps as Record<string, unknown>) : {}}
    >
        {#if isEmpty()}
            <option value="" selected>{isLoading ? text.loading : text.placeholder}</option>
        {/if}
        {#each options as option (option.value)}
            <option
                value={String(option.value)}
                disabled={option.disabled}
                selected={isSameValue(value, option.value)}
            >
                {option.label}
            </option>
        {/each}
    </select>
    {#if nativeShown}
        <!-- `appearance-none` takes the browser's arrow away with its chrome. -->
        <span
            class={cn(
                "pointer-events-none absolute top-1/2 me-px flex -translate-y-1/2 text-description",
                sizeClass().chevron,
            )}
            aria-hidden="true"
        >
            <ChevronDown size={20} />
        </span>
    {/if}

    {#if !isNative}
    <Dropdown
        bind:isOpen={isOpen}
        placement="bottom-start"
        selectedValue={value}
        onOptionClick={handleOptionClick}
        ariaLabel={text.listLabel}
        menuRole="listbox"
        fullWidth
        presentation={presentation === "native" ? "popover" : presentation}
        sheetTitle={label || text.placeholder}
        sheetCloseLabel={text.closeLabel}
        sheetExpandLabel={text.expandLabel}
        sheetCollapseLabel={text.collapseLabel}
        sheetSnap={searchable && options.length > 6 ? "full" : "half"}
    >
        {#snippet trigger(aria)}
            <button
                type="button"
                id={mounted ? selectId : `${selectId}-trigger`}
                class={triggerClasses()}
                {disabled}
                onclick={handleTriggerClick}
                {...restProps}
                {...aria}
                aria-describedby={fieldDescribedBy(selectId, status, describedBy)}
            >
                <!-- An empty trigger shows its placeholder in the placeholder
                colour, as Input does. A value has no colour class of its own,
                and a disabled trigger none at all: the button's `text-body`
                and its disabled colour are inherited. A colour class here
                beat the button's `disabled:` one, and a disabled Select read
                as enabled. -->
                <!-- The label wraps: cut off, there was nowhere on the closed
                control to read the rest. The chevron stays in the middle of
                the box, however many lines there are. -->
                <span
                    class="min-w-0 flex-1 text-start [overflow-wrap:anywhere] {disabled
                        ? ''
                        : isLoading
                          ? 'text-description'
                          : isEmpty()
                            ? 'text-input-placeholder'
                            : ''}"
                >
                    {#if isLoading}
                        {text.loading}
                    {:else}
                        {isEmpty()
                        ? text.placeholder
                        : selectedOption?.label || text.placeholder}
                    {/if}
                </span>
                <ChevronDown
                    size={20}
                    class="shrink-0 text-description transition-transform duration-200 {isOpen
                        ? 'rotate-180'
                        : ''}"
                />
            </button>
        {/snippet}
        {#snippet header()}
            {#if searchable && !isLoading}
                <!-- Outside role="listbox": a textbox is not a valid listbox child. -->
                <!-- 0.5rem and the panel's 1px border from the corner, as the
                options below and a Dropdown's items are: an 8px field 9px
                inside the panel's 16px corner is concentric with it. -->
                <div class="px-2 pb-2 pt-1" style:width={menuWidth} data-menu-width>
                    <Input
                        type="text"
                        size="sm"
                        class="min-w-0"
                        placeholder={text.searchPlaceholder}
                        bind:value={searchQuery}
                        aria-label={text.searchPlaceholder}
                        {disabled}
                    />
                </div>
            {/if}
        {/snippet}
        {#snippet children()}
            <!-- `px-1` twice: the inner one is room for an option's focus
            ring inside the scrolling box, and together with the panel's
            border they put the options 9px from its corner. -->
            <div class="px-1 pb-2 pt-1" style:width={menuWidth} data-menu-width>
                <div
                    class="overflow-y-auto px-1"
                    data-menu-scroll
                    style:max-height={maxMenuHeight}
                >
                    {#if isLoading}
                        <div class="space-y-2 px-2 py-2" role="status" aria-live="polite">
                            <div class="h-8 w-full animate-pulse rounded-control bg-base-200"></div>
                            <div class="h-8 w-full animate-pulse rounded-control bg-base-200"></div>
                            <p class="text-xs text-description">{text.loading}</p>
                        </div>
                    {:else if filteredOptions().length > 0}
                        {#each filteredOptions() as option (option.value)}
                            {@const buttonRestProps = {
                                "data-value": String(option.value),
                            } as Record<string, string>}
                            <div class="w-full my-1">
                                <!-- `aria-disabled`, not `disabled`: a natively disabled button cannot take focus, so the arrow keys stopped at the option before it. The click is refused in `handleOptionClick`. -->
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={isSameValue(value, option.value)
                                        ? true
                                        : undefined}
                                    class="focus-ring flex w-full items-center justify-start rounded-control border-2 px-3 py-2 pointer-coarse:py-3 text-left text-sm font-medium transition-colors focus:outline-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50 {isSameValue(
                                        value,
                                        option.value,
                                    )
                                        ? 'border-action-primary bg-transparent text-headline'
                                        : option.disabled
                                          ? 'border-transparent bg-transparent text-body'
                                          : 'border-transparent bg-transparent text-body hover:bg-surface-overlay-hover active:bg-surface-active'}"
                                    aria-disabled={option.disabled ? "true" : undefined}
                                    {...buttonRestProps}
                                    onclick={() =>
                                        handleOptionClick(option.value)}
                                >
                                    {option.label}
                                </button>
                            </div>
                        {/each}
                    {:else if hasSearchQuery()}
                        <div class="px-3 py-2 text-sm text-description">
                            {text.noResults}
                        </div>
                    {:else}
                        <div class="rounded-control border border-border bg-surface-overlay-hover px-3 py-3 text-sm">
                            <p class="font-medium text-headline">{text.emptyTitle}</p>
                            <p class="mt-1 text-description">{text.emptyDescription}</p>
                            {#if emptyStateActionLabel && onEmptyStateAction}
                                <button
                                    type="button"
                                    class="mt-3 inline-flex min-h-11 cursor-pointer items-center rounded-control bg-action-primary px-3 py-2 text-sm text-action-primary"
                                    onclick={onEmptyStateAction}
                                >
                                    {emptyStateActionLabel}
                                </button>
                            {/if}
                        </div>
                    {/if}
                </div>
            </div>
        {/snippet}
    </Dropdown>
    {/if}
    </div>
    <FieldMessages fieldId={selectId} {status} {hint} gap="mt-1" messageClass="w-full" />
</div>
