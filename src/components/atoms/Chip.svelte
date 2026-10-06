<script lang="ts">
    import { getContext, onMount, tick, type Snippet } from "svelte";
    import type { HTMLAnchorAttributes, HTMLButtonAttributes, HTMLInputAttributes } from "svelte/elements";
    import Check from "@lucide/svelte/icons/check";
    import { cn } from "../util/cn.js";
    import { groupBinding } from "../util/hydration.js";
    import { CHIP_GROUP_CONTEXT_KEY, type ChipGroupContext } from "../util/chip.js";
    import { TOUCH_HIT_AREA } from "../util/touch-target.js";

    /**
     * One type for the four forms, as Button has one for the button and the
     * link: a union of the elements' attributes is too large to carry through
     * a wrapper. Other attributes land on the element that is the control: the
     * `<a>`, the `<button>` or the `<input>`; `class` is always the chip's.
     */
    type Props = Omit<HTMLButtonAttributes, "class" | "type" | "value" | "onchange" | "children"> & {
        /** Makes the chip a link to this address, which works without scripts. */
        href?: string;
        target?: HTMLAnchorAttributes["target"];
        rel?: HTMLAnchorAttributes["rel"];
        download?: HTMLAnchorAttributes["download"];
        hreflang?: HTMLAnchorAttributes["hreflang"];
        /** With `href`: what `aria-current` says while `selected`. */
        current?: "page" | "true" | "step" | "location" | "date" | "time";
        /**
         * `checkbox` or `radio`: a real input under the chip, which submits in
         * a form without scripts. Without it (and without `href`) the chip is a
         * toggle button. Inside a ChipGroup with a `type`, the group's.
         */
        type?: "checkbox" | "radio";
        /** Name the input is submitted under. Inside a ChipGroup with a `name`, the group's. */
        name?: string;
        /** What the input submits, and what a ChipGroup's `value` holds when it is chosen. */
        value?: string;
        /** The chip is chosen. Bindable; the one prop for `checked`, `aria-pressed` and `aria-current`. */
        selected?: boolean;
        required?: boolean;
        form?: string;
        /** 28, 32 or 40px tall. On a coarse pointer the touch target reaches 44px; the box does not grow. */
        size?: "sm" | "md" | "lg";
        /** An icon or an avatar before the label. */
        leading?: Snippet;
        /** A check icon before the label while selected. On for a checkbox and a toggle button, off for a link and a radio. */
        checkmark?: boolean;
        /** Called with the new `selected` when a person changes it. */
        onchange?: (selected: boolean) => void;
        class?: string;
        children?: Snippet;
    };

    let {
        href,
        target,
        rel,
        download,
        hreflang,
        current = "true",
        type: typeProp,
        name: nameProp,
        value,
        selected = $bindable<Exclude<Props["selected"], undefined>>(),
        disabled = false,
        required,
        form,
        size = "md",
        leading,
        checkmark,
        onchange,
        onclick,
        class: className = "",
        children,
        ...restProps
    }: Props = $props();

    // No fallback on a bindable prop: Svelte refuses `bind:…={undefined}` on
    // one that has a fallback (`props_invalid_value`), and a page that throws
    // while it hydrates never becomes interactive. The default is applied
    // here instead: at once, for the server and the first render, and again
    // whenever a parent hands back `undefined`.
    const applyDefaults = () => {
        if (selected === undefined) selected = false;
    };
    applyDefaults();
    $effect.pre(applyDefaults);

    const group = getContext<ChipGroupContext | undefined>(CHIP_GROUP_CONTEXT_KEY);
    /** Inside a group that has a `type`, the group decides what is chosen. */
    const grouped = $derived(group?.type !== undefined && typeProp === undefined && href === undefined);
    const type = $derived(grouped ? group?.type : typeProp);
    const name = $derived(nameProp ?? (grouped ? group?.name : undefined));
    const isLink = $derived(href !== undefined && href !== null);
    const isInput = $derived(!isLink && (type === "checkbox" || type === "radio"));
    const isDisabled = $derived(!!disabled || (grouped && !!group?.disabled));
    const chosen = $derived(grouped ? !!group?.isSelected(value ?? "") : !!selected);
    const showCheckmark = $derived(checkmark ?? (!isLink && type !== "radio"));

    function setChosen(next: boolean, report: boolean) {
        if (grouped) group?.change(value ?? "", next, report);
        else selected = next;
    }

    let input: HTMLInputElement | undefined = $state();

    /**
     * The input is bound, so a choice made before the page hydrated is kept:
     * Svelte's binding finds the input changed and hands its state over here
     * instead of overwriting it (see util/hydration.ts). A choice adopted that
     * way came without a `change` event that anything heard, so it is reported
     * once, with a real `change` on the input, when the component has settled:
     * the callbacks and a form around it hear it as they hear a press.
     */
    let settling = true;
    let adopted = false;

    function take(next: boolean) {
        if (next === chosen) return;
        setChosen(next, false);
        if (settling) adopted = true;
    }

    const NOT_CHOSEN = {};
    /** A radio on its own: its own value while it is checked. */
    const aloneBinding = groupBinding<unknown>(
        () => (selected ? value : NOT_CHOSEN),
        (picked) => take(picked === value),
        () => take(false),
    );
    /** A radio in a group: the group's value. */
    const groupedBinding = groupBinding<string>(
        () => group?.radioValue,
        (picked) => {
            if (group?.radioValue === picked) return;
            group?.change(picked, true, false);
            if (settling) adopted = true;
        },
        () => group?.restore(),
    );

    onMount(() => {
        // The bindings adopt in a microtask of their own, queued before this one.
        void tick().then(() => {
            settling = false;
            if (adopted) input?.dispatchEvent(new Event("change", { bubbles: true }));
        });
    });

    function handleInputChange(event: Event) {
        if (isDisabled) return;
        // A real change is its own report: nothing is left to tell.
        adopted = false;
        const checked = (event.currentTarget as HTMLInputElement).checked;
        setChosen(checked, true);
        onchange?.(checked);
    }

    function handleButtonClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
        onclick?.(event);
        if (event.defaultPrevented || isDisabled) return;
        selected = !selected;
        onchange?.(selected);
    }

    /** A disabled link has no `href`, but a pointer can still press it. */
    function handleLinkClick(event: MouseEvent) {
        if (isDisabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        (onclick as ((event: MouseEvent) => void) | null | undefined)?.(event);
    }

    /**
     * 28 / 32 / 40px, a fixed height: a chip never wraps its label, so one
     * line is all it ever holds. The padding is 10 / 12 / 16px.
     */
    const SIZE = { sm: "h-7 px-[10px]", md: "h-8 px-3", lg: "h-10 px-4" } as const;
    const FORCED = "forced-colors:outline-2 forced-colors:-outline-offset-2 forced-colors:outline-[color:Highlight]";

    const base = $derived(
        `group/chip relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-[6px] whitespace-nowrap rounded-pill text-sm transition-colors duration-(--duration-base) motion-reduce:transition-none ${SIZE[size] ?? SIZE.md} ${TOUCH_HIT_AREA} ${isDisabled ? "pointer-events-none cursor-not-allowed opacity-50" : ""}`,
    );

    /**
     * A link and a button read `selected`. The hand-written chip colours are
     * outside every layer, so they cannot be overridden by a variant of
     * another colour: the two states are two class lists, never both.
     */
    const elementClasses = $derived(
        cn(
            base,
            "focus-ring",
            chosen
                ? `bg-chip-selected hover:bg-chip-selected-hover active:bg-chip-selected-active text-chip-selected-text font-semibold ${FORCED}`
                : "bg-chip hover:bg-chip-hover active:bg-chip-active text-chip-text font-medium",
            className,
        ),
    );

    /**
     * An input is chosen by the browser, and the look follows its `:checked`
     * (not `selected`), so a choice made before hydration shows at once.
     * Every colour is a `has-` or `not-has-` variant: with the plain
     * hand-written class on the label, the unlayered rule would win over the
     * selected variant.
     */
    const labelClasses = $derived(
        cn(
            base,
            "focus-ring font-medium not-has-[:checked]:bg-chip not-has-[:checked]:text-chip-text not-has-[:checked]:hover:bg-chip-hover not-has-[:checked]:active:bg-chip-active has-[:checked]:bg-chip-selected has-[:checked]:text-chip-selected-text has-[:checked]:font-semibold has-[:checked]:hover:bg-chip-selected-hover has-[:checked]:active:bg-chip-selected-active",
            "has-[:checked]:forced-colors:outline-2 has-[:checked]:forced-colors:-outline-offset-2 has-[:checked]:forced-colors:outline-[color:Highlight]",
            "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus-ring",
            className,
        ),
    );

    /** The real input, stretched over the chip and transparent, so a press lands on it. */
    const INPUT_CLASSES = "absolute inset-0 m-0 size-full cursor-pointer appearance-none rounded-pill opacity-0 outline-none disabled:cursor-not-allowed";
</script>

{#snippet inner(checkClass: string)}
    {#if showCheckmark}
        <Check class="size-3.5 shrink-0 {checkClass}" aria-hidden="true" />
    {/if}
    {#if leading}
        <span class="inline-flex shrink-0 items-center">{@render leading()}</span>
    {/if}
    {#if children}
        <span class="min-w-0 truncate">{@render children()}</span>
    {/if}
{/snippet}

{#if isLink}
    <!-- A link that cannot be followed keeps its role and says it is unavailable, as Button's does. -->
    <a
        href={isDisabled ? undefined : href}
        {target}
        {rel}
        {download}
        {hreflang}
        class={elementClasses}
        role={isDisabled ? "link" : undefined}
        aria-disabled={isDisabled ? "true" : undefined}
        aria-current={chosen ? current : undefined}
        {...restProps as unknown as HTMLAnchorAttributes}
        onclick={handleLinkClick}
    >
        {@render inner(chosen ? "" : "hidden")}
    </a>
{:else if isInput}
    <label class={labelClasses} data-chip-form={type}>
        <!-- One branch per type: a binding needs a type it can read. -->
        {#if type === "checkbox"}
            <input
                bind:this={input}
                type="checkbox"
                {name}
                {value}
                {required}
                {form}
                bind:checked={() => chosen, take}
                disabled={isDisabled}
                class={INPUT_CLASSES}
                onchange={handleInputChange}
                {...restProps as unknown as HTMLInputAttributes}
            />
        {:else if grouped}
            <input
                bind:this={input}
                type="radio"
                {name}
                {value}
                {required}
                {form}
                bind:group={groupedBinding.value}
                disabled={isDisabled}
                class={INPUT_CLASSES}
                onchange={handleInputChange}
                {...restProps as unknown as HTMLInputAttributes}
            />
        {:else}
            <input
                bind:this={input}
                type="radio"
                {name}
                {value}
                {required}
                {form}
                bind:group={aloneBinding.value}
                disabled={isDisabled}
                class={INPUT_CLASSES}
                onchange={handleInputChange}
                {...restProps as unknown as HTMLInputAttributes}
            />
        {/if}
        {@render inner("hidden group-has-checked/chip:block")}
    </label>
{:else}
    <button
        type="button"
        {name}
        {value}
        {form}
        class={elementClasses}
        {disabled}
        aria-pressed={chosen}
        {...restProps}
        onclick={handleButtonClick}
    >
        {@render inner(chosen ? "" : "hidden")}
    </button>
{/if}
