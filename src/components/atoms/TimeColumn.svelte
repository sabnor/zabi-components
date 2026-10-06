<script lang="ts">
    import { onMount } from "svelte";
    import { cn } from "../util/cn.js";
    import type { TimeChoice } from "../util/temporal-field.js";

    /**
     * One scrollable column of the time picker in TimeField: the hours, or the
     * minutes. Internal: it is not exported from the package.
     *
     * A listbox of 44px rows. One row is the Tab stop (the chosen one, else
     * the first); Up and Down, Home and End move between rows, Enter and
     * Space choose the focused one, and typing digits jumps to a row. A row
     * that is out of range stays focusable and says `aria-disabled`.
     */
    interface Props {
        /** Accessible name of the listbox. */
        label: string;
        options: TimeChoice[];
        /** The `value` of the chosen option, or `""`. */
        selected: string;
        onselect: (value: string) => void;
    }

    let { label, options, selected, onselect }: Props = $props();

    let box: HTMLDivElement | undefined = $state();
    /** The row that takes Tab: where the keyboard was last, else the chosen one, else the first. */
    let focusedValue = $state<string | null>(null);

    const tabStop = $derived(
        options.some((option) => option.value === focusedValue)
            ? focusedValue
            : options.some((option) => option.value === selected)
              ? selected
              : (options[0]?.value ?? null),
    );

    /**
     * The chosen row is put in the middle of the column as it opens. Set
     * straight on `scrollTop`: nothing here scrolls smoothly, so there is no
     * motion for `prefers-reduced-motion` to remove.
     */
    onMount(() => {
        const column = box;
        const row = column?.querySelector<HTMLElement>('[aria-selected="true"]');
        if (!column || !row) return;
        column.scrollTop = row.offsetTop - column.clientHeight / 2 + row.offsetHeight / 2;
    });

    const rows = () => [...(box?.querySelectorAll<HTMLElement>('[role="option"]') ?? [])];

    function focusRow(value: string | undefined) {
        if (value === undefined) return;
        focusedValue = value;
        const row = rows().find((element) => element.dataset.value === value);
        row?.focus();
        row?.scrollIntoView?.({ block: "nearest" });
    }

    let typed = "";
    let typedTimer: ReturnType<typeof setTimeout> | undefined;

    function handleKeydown(event: KeyboardEvent) {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        const values = options.map((option) => option.value);
        const current = values.indexOf((event.target as HTMLElement | null)?.closest<HTMLElement>("[data-value]")?.dataset.value ?? "");
        if (event.key === "ArrowDown") {
            event.preventDefault();
            focusRow(values[Math.min(current + 1, values.length - 1)]);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            focusRow(values[Math.max(current - 1, 0)]);
        } else if (event.key === "Home") {
            event.preventDefault();
            focusRow(values[0]);
        } else if (event.key === "End") {
            event.preventDefault();
            focusRow(values[values.length - 1]);
        } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            const option = options[current];
            if (option && !option.disabled) onselect(option.value);
        } else if (/^[0-9]$/.test(event.key)) {
            event.preventDefault();
            typed += event.key;
            clearTimeout(typedTimer);
            typedTimer = setTimeout(() => (typed = ""), 800);
            // "7" is 07, "30" is 30, "1" then "9" is 19. The value is the 24-hour one, whatever the label says.
            const hit =
                options.find((option) => option.value.startsWith(typed)) ??
                options.find((option) => Number(option.value) === Number(typed)) ??
                options.find((option) => option.value.startsWith(typed.slice(-1)));
            if (hit) focusRow(hit.value);
        }
    }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
    bind:this={box}
    role="listbox"
    aria-label={label}
    tabindex="-1"
    data-time-column
    class="h-44 min-w-0 flex-1 overflow-y-auto overscroll-contain rounded-control border border-input-border bg-input p-1"
    onkeydown={handleKeydown}
>
    {#each options as option (option.value)}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div
            role="option"
            data-value={option.value}
            aria-selected={option.value === selected}
            aria-disabled={option.disabled ? "true" : undefined}
            tabindex={option.value === tabStop ? 0 : -1}
            class={cn(
                "focus-ring flex h-11 shrink-0 cursor-pointer items-center justify-center rounded-control text-base text-body transition-colors duration-(--duration-base) motion-reduce:transition-none focus:outline-none focus-visible:outline-none",
                "hover:bg-input-hover aria-selected:bg-action-primary aria-selected:text-action-primary",
                "aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:hover:bg-transparent",
            )}
            onfocus={() => (focusedValue = option.value)}
            onclick={() => !option.disabled && onselect(option.value)}
        >
            {option.label}
        </div>
    {/each}
</div>
