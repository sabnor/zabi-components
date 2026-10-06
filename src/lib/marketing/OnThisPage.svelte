<script lang="ts">
    import ChevronDown from "@lucide/svelte/icons/chevron-down";

    /**
     * The "On this page" list of a guide: links to the page's sections, with
     * the section being read marked as current.
     *
     * Each entry is a plain `<a href="#id">`, so the list works before the
     * page runs and without JavaScript. What the script adds is the mark:
     * `aria-current="location"` on one link, in both copies of the list (the
     * sticky column from `lg` up, the disclosure below it).
     *
     * Which section is current
     *   - The line that decides it is where a section lands when its link is
     *     followed: the section's own `scroll-margin-top`, below the sticky
     *     header. The current section is the last one whose top has reached
     *     that line, so of two short sections in view the upper one wins
     *     until the lower one's heading gets there.
     *   - Above the first section, the first entry is current. The server
     *     renders that too, so nothing changes when the page starts.
     *   - At the bottom of the page the last entry is current: a short last
     *     section can never be scrolled up to the line.
     *   - Following an entry (a click, Enter, a link elsewhere on the page,
     *     an address with a hash, back and forward) marks that entry at once
     *     and keeps it until the reader scrolls again. Without that, an entry
     *     near the end would hand the mark to the last one as soon as the
     *     page stopped at the bottom.
     *   - "The reader scrolls" means a scroll that follows something the
     *     reader did: a wheel, a touch, a key or a press (which is what a
     *     scrollbar drag starts with). The jump to a followed entry scrolls
     *     too, and so does a late layout change while the page loads; those
     *     come with no such input and leave the mark where it is.
     *
     * An IntersectionObserver with a one-pixel root at the line reports each
     * section crossing it; a passive scroll listener covers the two things a
     * crossing cannot say, the bottom of the page and the reader scrolling
     * away from a followed entry. Both are set up again on resize, because
     * the line moves when the header changes height.
     *
     * The mark is not colour alone. It matches the catalog sidebar's active
     * item: the same leading bar (`bg-nav-menu-item-active`), with heavier,
     * headline-coloured text in the column and the sidebar's own fill and text
     * colour in the disclosure. Classes are chosen here instead of with an
     * `aria-[current]:` variant, because the site's hand-written colour
     * classes are outside every cascade layer and would win over the variant.
     */

    export interface PageSection {
        /** The `id` of a `<section>` on the page. */
        id: string;
        label: string;
    }

    interface Props {
        sections: PageSection[];
        /** Heading of the list and name of the landmark. */
        title?: string;
        class?: string;
    }

    let { sections, title = "On this page", class: className = "" }: Props = $props();

    /** Set once the page runs; until then the first entry is current. */
    let tracked = $state<string | null>(null);
    const current = $derived(tracked ?? sections[0]?.id ?? null);
    /** True once the tracking below is running: says so on the element, for tests. */
    let tracking = $state(false);

    /** A followed entry, held as current until the reader scrolls away. */
    let followed: string | null = null;
    /** When the reader last did something that scrolls, in `performance.now()` time. */
    let lastInput = 0;
    /** A scroll this soon after an input is the reader's. Momentum only has to start within it. */
    const INPUT_WINDOW = 1000;

    /** Set by the effect below; does nothing until the page runs. */
    let follow: (id: string) => void = () => {};

    $effect(() => {
        const ids = sections.map((section) => section.id);
        const elements = () =>
            ids
                .map((id) => document.getElementById(id))
                .filter((element): element is HTMLElement => element !== null);

        /** Where a followed section's top comes to rest, from the viewport's top. */
        const lineOf = (element: HTMLElement) =>
            parseFloat(getComputedStyle(element).scrollMarginTop) || 0;

        function atBottom(): boolean {
            const page = document.documentElement;
            return window.innerHeight + window.scrollY >= page.scrollHeight - 2;
        }

        function compute() {
            if (followed) {
                tracked = followed;
                return;
            }
            const found = elements();
            if (found.length === 0) return;
            if (atBottom() && window.scrollY > 0) {
                tracked = found[found.length - 1].id;
                return;
            }
            let reached = found[0];
            for (const element of found) {
                // One pixel of slack: a followed section rests on the line,
                // give or take a rounded fraction.
                if (element.getBoundingClientRect().top <= lineOf(element) + 1) reached = element;
            }
            tracked = reached.id;
        }

        follow = (id: string) => {
            if (!ids.includes(id)) return;
            followed = id;
            tracked = id;
            // The press or the key that followed the entry is not a scroll by
            // the reader; the jump it causes must not release the mark.
            lastInput = 0;
        };

        function onInput() {
            lastInput = performance.now();
        }

        function onScroll() {
            if (followed) {
                if (performance.now() - lastInput > INPUT_WINDOW) return;
                followed = null;
            }
            compute();
        }

        const fromHash = () => follow(decodeURIComponent(window.location.hash.slice(1)));

        let observer: IntersectionObserver | undefined;
        function observe() {
            observer?.disconnect();
            const found = elements();
            if (found.length === 0 || !("IntersectionObserver" in window)) return;
            const line = Math.round(lineOf(found[0]));
            const below = Math.max(0, window.innerHeight - line - 1);
            observer = new IntersectionObserver(() => onScroll(), {
                rootMargin: `-${line}px 0px -${below}px 0px`,
            });
            for (const element of found) observer.observe(element);
        }
        function onResize() {
            observe();
            onScroll();
        }

        if (window.location.hash) fromHash();
        else compute();
        observe();
        tracking = true;

        const INPUTS = ["wheel", "touchmove", "keydown", "pointerdown"] as const;
        for (const type of INPUTS) {
            window.addEventListener(type, onInput, { passive: true, capture: true });
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        window.addEventListener("hashchange", fromHash);
        return () => {
            observer?.disconnect();
            for (const type of INPUTS) {
                window.removeEventListener(type, onInput, { capture: true });
            }
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("hashchange", fromHash);
            followed = null;
            follow = () => {};
            tracking = false;
        };
    });

    /**
     * Marked from the click itself, not only from `hashchange`: that event
     * comes after the jump has scrolled, and does not come at all when the
     * address already has this hash. A click that opens the link somewhere
     * else (a new tab) leaves this page where it is.
     */
    function onFollow(event: MouseEvent, id: string) {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        follow(id);
    }

    const BAR = "absolute top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-pill bg-nav-menu-item-active";

    const columnLink = (isCurrent: boolean) =>
        "focus-ring relative -ml-px block rounded-sm border-l py-1 pl-4 text-sm transition-colors " +
        (isCurrent
            ? "border-transparent font-semibold text-headline"
            : "border-transparent text-description hover:border-border-strong hover:text-headline");

    const disclosureLink = (isCurrent: boolean) =>
        "focus-ring relative flex min-h-11 items-center rounded-xl px-3 text-sm transition-colors " +
        (isCurrent
            ? "bg-nav-menu-active font-semibold text-nav-menu-item-active"
            : "text-description hover:bg-surface-hover hover:text-headline");
</script>

<nav class={className} aria-label={title} data-on-this-page data-tracking={tracking ? "" : undefined}>
    <!-- Below lg there is no column for the sticky list, so the same links
    fold into a disclosure ahead of the first section. -->
    <details class="group rounded-2xl border border-border bg-card shadow-sm lg:hidden">
        <summary
            class="focus-ring flex h-12 cursor-pointer list-none items-center justify-between rounded-2xl px-5 text-sm font-semibold text-headline [&::-webkit-details-marker]:hidden"
        >
            {title}
            <ChevronDown
                size={16}
                class="shrink-0 text-description transition-transform group-open:rotate-180"
                aria-hidden="true"
            />
        </summary>
        <ul class="border-t border-border p-2 sm:grid sm:grid-cols-2">
            {#each sections as section (section.id)}
                {@const isCurrent = section.id === current}
                <li>
                    <a
                        href={`#${section.id}`}
                        class={disclosureLink(isCurrent)}
                        aria-current={isCurrent ? "location" : undefined}
                        onclick={(event) => onFollow(event, section.id)}
                    >
                        {#if isCurrent}
                            <span class="{BAR} left-0" aria-hidden="true"></span>
                        {/if}
                        {section.label}
                    </a>
                </li>
            {/each}
        </ul>
    </details>
    <div class="sticky top-28 hidden lg:block">
        <p class="text-sm font-semibold text-headline">{title}</p>
        <ul class="mt-4 space-y-1 border-l border-border">
            {#each sections as section (section.id)}
                {@const isCurrent = section.id === current}
                <li>
                    <a
                        href={`#${section.id}`}
                        class={columnLink(isCurrent)}
                        aria-current={isCurrent ? "location" : undefined}
                        onclick={(event) => onFollow(event, section.id)}
                    >
                        {#if isCurrent}
                            <!-- On the rail: one pixel left of the link's own edge. -->
                            <span class="{BAR} -left-px" aria-hidden="true"></span>
                        {/if}
                        {section.label}
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</nav>
