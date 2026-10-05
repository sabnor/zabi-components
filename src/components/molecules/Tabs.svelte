<script lang="ts">
    import type { Snippet } from "svelte";
    import { generateId } from "../util/ssr-safe.js";
    import { cn } from "../util/cn.js";

    interface Props {
        /** Extra classes for the host element. */
        class?: string;
        tabs?: Array<{
            id: string;
            label: string;
            disabled?: boolean;
        }>;
        /** Selected tab id; supports `bind:activeTab`. */
        activeTab?: string;
        variant?: "default" | "pills";
        /**
         * The tabs share the row equally. Meant for two or three tabs on a
         * phone. A label too long for its share wraps between words; when a
         * word does not fit, the tabs keep their words whole and the row
         * scrolls sideways instead.
         */
        fullWidth?: boolean;
        onclick?: (event: Event) => void;
        onkeydown?: (event: Event) => void;
        children?: Snippet<[{ activeTab: string }]>;
    }

    let {
        class: className = "",
        tabs = [],
        activeTab = $bindable(""),
        variant = "default",
        fullWidth = false,
        children,
        ...restProps
    }: Props = $props();

    const tabsBaseId = generateId("tabs");

    /** Button refs keyed by tab id — roving tabindex needs focus to follow selection. */
    const tabElements: Record<string, HTMLButtonElement | undefined> = {};

    function selectTab(tabId: string, moveFocus = false) {
        activeTab = tabId;
        if (moveFocus) {
            // The list brings the tab into view itself (`handleFocusIn`), with
            // room for the fade; the browser's own jump would come first.
            tabElements[tabId]?.focus({ preventScroll: true });
        }
    }

    /**
     * When the tabs do not fit, the list scrolls sideways. It used to do
     * neither that nor wrap: in a 160px card the third tab ended 94px outside
     * it. Each edge with more tabs beyond it fades out, so a cut-off label
     * reads as "there is more" and not as a mistake.
     */
    let listElement = $state<HTMLDivElement | null>(null);
    /** Physical sides, since a mask is drawn in physical directions. */
    let fadeLeft = $state(false);
    let fadeRight = $state(false);

    /** Room kept between a revealed tab and the edge: the fade, and the tab's focus ring. */
    const REVEAL_MARGIN = 32;

    function updateFades() {
        const list = listElement;
        if (!list) return;
        const hidden = list.scrollWidth - list.clientWidth;
        if (hidden <= 1) {
            fadeLeft = false;
            fadeRight = false;
            return;
        }
        // Right to left, `scrollLeft` runs from 0 down to minus the hidden width.
        const rtl = getComputedStyle(list).direction === "rtl";
        const fromLeft = rtl ? hidden + list.scrollLeft : list.scrollLeft;
        fadeLeft = fromLeft > 1;
        fadeRight = fromLeft < hidden - 1;
    }

    /** Scrolls the list, and only the list, until `tab` is clear of both edges. */
    function reveal(tab: HTMLElement | undefined, animate: boolean) {
        const list = listElement;
        if (!list || !tab || list.scrollWidth - list.clientWidth <= 1) return;
        const box = list.getBoundingClientRect();
        const item = tab.getBoundingClientRect();
        let delta = 0;
        if (item.left < box.left + REVEAL_MARGIN) {
            delta = item.left - box.left - REVEAL_MARGIN;
        } else if (item.right > box.right - REVEAL_MARGIN) {
            delta = item.right - box.right + REVEAL_MARGIN;
        }
        if (delta === 0) return;
        const still =
            !animate ||
            (typeof window.matchMedia === "function" &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches);
        // `scrollBy` with a behaviour is missing from older engines and from jsdom.
        if (typeof list.scrollBy === "function") {
            list.scrollBy({ left: delta, behavior: still ? "instant" : "smooth" });
        } else {
            list.scrollLeft += delta;
        }
    }

    // The selected tab is brought into view when the list mounts and when the
    // selection changes: at once the first time, so the page does not open on
    // a moving list.
    let revealedOnce = false;
    $effect(() => {
        const tab = tabElements[activeTab];
        if (!listElement) return;
        reveal(tab, revealedOnce);
        revealedOnce = true;
        updateFades();
    });

    // The fades follow the list's own size and the number of tabs.
    $effect(() => {
        const list = listElement;
        void tabs.length;
        if (!list) return;
        updateFades();
        if (typeof ResizeObserver === "undefined") return;
        const observer = new ResizeObserver(updateFades);
        observer.observe(list);
        return () => observer.disconnect();
    });

    /**
     * Arrow keys and Tab move focus to a tab that may be out of view. Keyboard
     * focus only: a press focuses the tab on the way down, and moving the list
     * then would take the tab from under the pointer before the click lands.
     * A pressed tab is revealed once it is selected, by the effect above.
     */
    function handleFocusIn(event: FocusEvent) {
        const tab = (event.target as HTMLElement | null)?.closest<HTMLElement>('[role="tab"]');
        if (!tab) return;
        let fromKeyboard = true;
        try {
            fromKeyboard = tab.matches(":focus-visible");
        } catch {
            // An engine without `:focus-visible`: treat every focus as the keyboard's.
        }
        if (fromKeyboard) reveal(tab, true);
    }

    function getEnabledTabs() {
        return tabs.filter((tab) => !tab.disabled);
    }

    function getTabId(tabId: string) {
        return `${tabsBaseId}-tab-${tabId}`;
    }

    function getPanelId(tabId: string) {
        return `${tabsBaseId}-panel-${tabId}`;
    }

    $effect(() => {
        if (tabs.length === 0) {
            return;
        }

        const activeExists = tabs.some((tab) => tab.id === activeTab && !tab.disabled);
        if (!activeExists) {
            const firstEnabledTab = tabs.find((tab) => !tab.disabled);
            if (firstEnabledTab) {
                activeTab = firstEnabledTab.id;
            }
        }
    });

    function handleKeydown(event: KeyboardEvent) {
        const enabledTabs = getEnabledTabs();
        if (enabledTabs.length === 0) {
            return;
        }

        const currentIndex = enabledTabs.findIndex((tab) => tab.id === activeTab);
        const fallbackIndex = currentIndex === -1 ? 0 : currentIndex;

        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            const direction = event.key === "ArrowLeft" ? -1 : 1;
            const nextIndex =
                (fallbackIndex + direction + enabledTabs.length) %
                enabledTabs.length;
            selectTab(enabledTabs[nextIndex].id, true);
        } else if (event.key === "Home") {
            event.preventDefault();
            selectTab(enabledTabs[0].id, true);
        } else if (event.key === "End") {
            event.preventDefault();
            selectTab(enabledTabs[enabledTabs.length - 1].id, true);
        }
        // Enter/Space: native <button> click already selects the tab.
    }

    const TAB_BASE =
        "focus-ring cursor-pointer border-b-2 px-4 py-2 pointer-coarse:min-h-11 text-sm font-medium transition-colors focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed";
    // A tab keeps its width and the list scrolls; sharing the row, it may shrink and its label wrap.
    const TAB_NATURAL = "shrink-0 whitespace-nowrap";
    // `min-w-min` is the tab's longest word: a label wraps between words, never
    // inside one, and when the words do not fit the shares the row scrolls like
    // any other.
    const TAB_SHARED = "min-w-min flex-1 basis-0 text-center";
    // A disabled tab is never the selected one, so only this arm carries the disabled state.
    const TAB_IDLE =
        "border-transparent text-description hover:border-border-medium hover:text-body active:bg-surface-active disabled:opacity-50 disabled:hover:border-transparent disabled:hover:text-description disabled:active:bg-transparent";
    const TAB_SELECTED = "border-brand-500 text-body active:bg-surface-active";
    // The pill has a fill of its own, so its pressed state is a further step of
    // that fill; a translucent tint in its place would be a weaker fill, not a
    // stronger one. It is the pressed role, not the hover step: the hover step
    // is 1.24:1 from the resting fill in light, under the 1.25:1 a pressed fill
    // is held to. The label darkens with it (`.text-link:active` in app.css)
    // and keeps 4.89:1 on the pressed fill.
    const TAB_SELECTED_PILL =
        "border-brand-500 bg-action-primary-subtle text-link active:bg-action-primary-subtle-active";

    function tabClasses(tabId: string): string {
        const base = `${TAB_BASE} ${fullWidth ? TAB_SHARED : TAB_NATURAL}`;
        if (activeTab !== tabId) return `${base} ${TAB_IDLE}`;
        return `${base} ${variant === "pills" ? TAB_SELECTED_PILL : TAB_SELECTED}`;
    }
</script>

<div class={cn("tabs-container", className)}>
    <!-- The tablist keeps the line under the tabs, and the tabs scroll in a
    box of their own inside it, so the line stays put. That box is
    presentational: the tabs are still the tablist's tabs. -->
    <!-- `flow-root`: the inner box's negative margin stays inside this one,
    so the row is as tall as its tabs and its line, as it was. -->
    <div
        class="flow-root border-b border-border"
        role="tablist"
        tabindex="-1"
        onkeydown={handleKeydown}
    >
    <!-- `tabindex="-1"`: a scrolling box is otherwise a Tab stop of its own. -->
    <div
        bind:this={listElement}
        class="tabs-list flex"
        role="presentation"
        tabindex="-1"
        data-fade-left={fadeLeft ? "" : undefined}
        data-fade-right={fadeRight ? "" : undefined}
        onfocusin={handleFocusIn}
        onscroll={updateFades}
    >
        {#each tabs as tab (tab.id)}
            <button
                bind:this={tabElements[tab.id]}
                type="button"
                role="tab"
                id={getTabId(tab.id)}
                class={tabClasses(tab.id)}
                onclick={() => selectTab(tab.id)}
                disabled={tab.disabled}
                aria-selected={activeTab === tab.id}
                aria-controls={getPanelId(tab.id)}
                tabindex={activeTab === tab.id ? 0 : -1}
            >
                {tab.label}
            </button>
        {/each}
    </div>
    </div>

    <div
        class="mt-4"
        role="tabpanel"
        id={getPanelId(activeTab)}
        aria-labelledby={getTabId(activeTab)}
    >
        {@render children?.({ activeTab })}
    </div>
</div>

<style>
    /*
     * The list scrolls sideways when its tabs do not fit, with no scrollbar:
     * the fade says there is more. A scroll container clips what is outside
     * it, and a tab's focus ring is 4px outside the tab, so the list is 4px
     * larger on every side than the row it fills and pulled back by the same
     * amount. A list that fits looks exactly as it did.
     */
    .tabs-list {
        --tabs-ring-room: 4px;
        margin: calc(var(--tabs-ring-room) * -1);
        padding: var(--tabs-ring-room);
        overflow-x: auto;
        overflow-y: hidden;
        overscroll-behavior-x: contain;
        scrollbar-width: none;
    }

    .tabs-list::-webkit-scrollbar {
        display: none;
    }

    /*
     * A mask, not a gradient laid over the tabs: it fades them into whatever
     * surface is behind, and nothing sits on top of a tab or its focus ring.
     * Only an edge with more tabs beyond it fades, and a list that fits has no
     * mask at all. Left and right are physical here; the script works out
     * which is which in a right-to-left layout.
     */
    .tabs-list[data-fade-left],
    .tabs-list[data-fade-right] {
        --tabs-fade-left: 0px;
        --tabs-fade-right: 0px;
        -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black var(--tabs-fade-left),
            black calc(100% - var(--tabs-fade-right)),
            transparent
        );
        mask-image: linear-gradient(
            to right,
            transparent,
            black var(--tabs-fade-left),
            black calc(100% - var(--tabs-fade-right)),
            transparent
        );
    }

    .tabs-list[data-fade-left] {
        --tabs-fade-left: 1.5rem;
    }

    .tabs-list[data-fade-right] {
        --tabs-fade-right: 1.5rem;
    }

    /* Forced colours: a half-transparent label is harder to read than a cut-off one. */
    @media (forced-colors: active) {
        .tabs-list[data-fade-left],
        .tabs-list[data-fade-right] {
            -webkit-mask-image: none;
            mask-image: none;
        }
    }
</style>
