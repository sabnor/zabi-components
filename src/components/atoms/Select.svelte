<script lang="ts">
    import { mergeStrings } from "../util/ready-made-strings.js";
    import { zabiCommonStrings, zabiStringsFor } from "../util/zabi-strings.js";
    import Dropdown from "../molecules/Dropdown.svelte";
    import Input from "./Input.svelte";
    import Check from "@lucide/svelte/icons/check";
    import ChevronDown from "@lucide/svelte/icons/chevron-down";
    import { onMount, tick, untrack } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";
    import {
        DEFAULT_SELECT_STRINGS,
        NATIVE_SELECT_ATTRIBUTE,
        choiceBeforeMount,
        type SelectPresentation,
        type SelectStrings,
    } from "../util/select.js";
    import { generateId } from "../util/ssr-safe.js";
    import { isInsideToastRegion } from "../util/focus-utils.js";
    import { cn } from "../util/cn.js";
    import { FIELD_CONTROL_SURFACE, fieldControlEdge, fieldControlSize } from "../util/field-control.js";
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

    /** The defaults, then a provider's words, then `strings`, then the older props where they are set. */
    const provided = zabiStringsFor("select");
    const common = zabiCommonStrings();
    const text = $derived<SelectStrings>({
        ...mergeStrings(
            {
                ...DEFAULT_SELECT_STRINGS,
                // The sheet's three buttons say what every sheet's do.
                closeLabel: common().close,
                expandLabel: common().expand,
                collapseLabel: common().collapse,
            },
            provided(),
            strings,
        ),
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

    const sizeClass = $derived(() => fieldControlSize(size));

    const variantClass = $derived(() => fieldControlEdge(status.variant));

    /** What the trigger and the visible native select share: the field's surface, edge and states. */
    const fieldSurface = FIELD_CONTROL_SURFACE;

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
        const element = event.currentTarget as HTMLSelectElement;
        nativeError = element.validationMessage;
        // The browser tells every invalid control, and would focus the first.
        // So does this: each Select shows its message, and only the first
        // invalid control of the form takes focus.
        const controls = [...(element.form?.elements ?? [])] as (Element & Partial<HTMLSelectElement>)[];
        const first = controls.find((control) => control.willValidate && control.validity?.valid === false);
        if (!first || first === element) document.getElementById(selectId)?.focus();
    }

    $effect(() => {
        // A choice answers it.
        void value;
        nativeError = "";
    });

    /**
     * The trigger takes over from the native select. If the keyboard was in
     * the native select, which now leaves the tab order, focus goes to the
     * trigger and does not fall to the page.
     */
    function handOver() {
        const hadFocus = !isNative && nativeElement !== null && document.activeElement === nativeElement;
        mounted = true;
        if (hadFocus) void tick().then(() => document.getElementById(selectId)?.focus());
    }

    /** The value the Select was rendered with: what a form reset goes back to. */
    const initialValue = untrack(() => value);

    /**
     * The form around the Select was reset. The native select goes back to
     * what its markup says by itself, which the component would not know of:
     * the value is put back to the one it was rendered with, and that is
     * reported once if it is a change. After the browser has done its own
     * resetting, which is after the event.
     */
    function handleFormReset(event: Event) {
        setTimeout(() => {
            if (event.defaultPrevented) return;
            const initiallyEmpty = initialValue === undefined || initialValue === null || initialValue === "";
            const unchanged = initiallyEmpty ? isEmpty() : isSameValue(value, initialValue);
            if (!unchanged) choose(initiallyEmpty ? undefined : initialValue);
            void tick().then(() => {
                if (nativeElement) nativeElement.value = initiallyEmpty ? "" : String(initialValue);
            });
        });
    }

    /** Whether the browser's own list of the native select is open, where the browser can say (`:open`). */
    function nativePickerOpen(element: HTMLSelectElement): boolean {
        try {
            return element.matches(":open");
        } catch {
            return false;
        }
    }

    onMount(() => {
        // A choice made in the native select before the scripts arrived is
        // the visitor's: it becomes the value, and is reported once. Only a
        // choice: a select nobody touched keeps the value it was given.
        const before = nativeElement ? choiceBeforeMount(nativeElement) : undefined;
        if (before !== undefined && before !== (isEmpty() ? "" : String(value))) {
            choose(fromNative(before));
        }

        const element = nativeElement;
        const form = element?.form ?? null;
        form?.addEventListener("reset", handleFormReset);
        const stopListening = () => form?.removeEventListener("reset", handleFormReset);

        // Someone is choosing in the browser's own list right now: taking the
        // select away would close it under their finger. They keep it until
        // they have chosen or left, and the trigger takes over then.
        if (!isNative && element && document.activeElement === element && nativePickerOpen(element)) {
            const finish = () => {
                element.removeEventListener("change", finish);
                element.removeEventListener("blur", finish);
                handOver();
            };
            element.addEventListener("change", finish);
            element.addEventListener("blur", finish);
            return () => {
                element.removeEventListener("change", finish);
                element.removeEventListener("blur", finish);
                stopListening();
            };
        }
        handOver();
        return stopListening;
    });

    function handleTriggerClick(event: MouseEvent) {
        if (disabled || isLoading) return;
        event.stopPropagation();
        isOpen = !isOpen;
    }

    function handleClickOutside(event: MouseEvent) {
        if (!isOpen) return;

        const target = event.target as HTMLElement;
        if (isInsideToastRegion(target)) return;
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
        aria-label={nativeShown ? restProps["aria-label"] : undefined}
        aria-labelledby={nativeShown ? restProps["aria-labelledby"] : undefined}
        {...{ [NATIVE_SELECT_ATTRIBUTE]: "" }}
        {...isNative ? (restProps as Record<string, unknown>) : {}}
    >
        {#if isEmpty()}
            <option value="" selected>{isLoading ? text.loading : text.placeholder}</option>
        {:else if !selectedOption}
            <!-- The value has no option of its own: its options are still on
            their way, or it is not among them. It is still the value, so the
            select holds it and a form sends it; it is not offered in the list
            where the browser lets an option be hidden. -->
            <option value={String(value)} selected hidden>{isLoading ? text.loading : String(value)}</option>
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
        ariaLabel={strings?.listLabel || label || (restProps["aria-label"] as string | undefined) || text.listLabel}
        ariaLabelledby={strings?.listLabel || label ? undefined : (restProps["aria-labelledby"] as string | undefined)}
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
            <!-- A select-only combobox, as the ARIA practices describe it:
            a button could not say that it is invalid or required
            (`aria-invalid` and `aria-required` are not a button's), so a
            Select with an error was announced like one without. The keys,
            `aria-haspopup="listbox"`, `aria-expanded` and `aria-controls` are
            as they were. -->
            <button
                type="button"
                id={mounted ? selectId : `${selectId}-trigger`}
                class={triggerClasses()}
                {disabled}
                onclick={handleTriggerClick}
                {...restProps}
                {...aria}
                role="combobox"
                aria-invalid={status.variant === "error" ? "true" : undefined}
                aria-required={required ? "true" : undefined}
                aria-busy={isLoading ? "true" : undefined}
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
                    class="shrink-0 text-description transition-transform duration-(--duration-moderate) motion-reduce:transition-none {isOpen
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
            1px rim they put the options 9px from its corner. -->
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
                                    aria-selected={isSameValue(value, option.value)}
                                    class="focus-ring flex w-full items-center justify-start gap-2 rounded-control border-2 px-3 py-2 pointer-coarse:py-3 text-start text-sm font-medium transition-colors focus:outline-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50 {isSameValue(
                                        value,
                                        option.value,
                                    )
                                        ? 'border-transparent bg-surface-overlay-hover text-headline active:bg-surface-active'
                                        : option.disabled
                                          ? 'border-transparent bg-transparent text-body'
                                          : 'border-transparent bg-transparent text-body hover:bg-surface-overlay-hover active:bg-surface-active'}"
                                    aria-disabled={option.disabled ? "true" : undefined}
                                    {...buttonRestProps}
                                    onclick={() =>
                                        handleOptionClick(option.value)}
                                >
                                    <span class="min-w-0 flex-1">{option.label}</span>
                                    <!-- The chosen option's mark: a check and a
                                    fill. It used to be an edge in the action
                                    colour, which is what the focus ring draws:
                                    the chosen and the focused option could
                                    not be told apart. -->
                                    {#if isSameValue(value, option.value)}
                                        <Check size={16} class="shrink-0" aria-hidden="true" />
                                    {/if}
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
