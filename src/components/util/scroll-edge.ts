/**
 * Whether content is under a bar (D123): the one thing a bar needs to know to
 * choose between flush with the page and glass.
 *
 * Pure DOM, no Svelte. `AppShell` uses it on its scroller and shares the
 * result with the bars inside it; a bar on its own uses it on its nearest
 * scroll parent, or on the window.
 */

/** `scrollEdge` on a bar: follow the scroll position, or force the glass on or off. */
export type ScrollEdgeMode = "auto" | "always" | "never";

export interface ScrollEdge {
    /** Scrolled away from the start: content is under a bar at the top. */
    top: boolean;
    /** Not at the end: content is under a bar at the bottom. */
    bottom: boolean;
}

/** Less than this from the end counts as being at the end (fractional scroll positions). */
const END_TOLERANCE = 1;

/** The edges for a scroll position, clamped against rubber-banding past either end. */
export function measureScrollEdge(position: number, scrollable: number): ScrollEdge {
    const end = Math.max(0, scrollable);
    const at = Math.min(Math.max(0, position), end);
    return { top: at > 0, bottom: end - at > END_TOLERANCE };
}

/** The value a bar writes as `data-scrolled-under`: the mode, or what the scroll position says. */
export function resolveScrolledUnder(mode: ScrollEdgeMode | undefined, auto: boolean): boolean {
    if (mode === "always") return true;
    if (mode === "never") return false;
    return auto;
}

/**
 * Reports `{ top, bottom }` for `container` (null for the window): once on
 * start, then whenever either changes. It listens to `scroll` (passive) and,
 * where `ResizeObserver` exists, to the size of the container and of what is
 * in it, since content that grows or shrinks moves the end. Returns the
 * cleanup. Call it in the browser.
 */
export function watchScrollEdge(
    container: HTMLElement | null,
    onChange: (edge: ScrollEdge) => void,
): () => void {
    const target: HTMLElement | Window = container ?? window;
    let last: ScrollEdge | undefined;

    const measure = () => {
        const root = document.documentElement;
        const edge = container
            ? measureScrollEdge(container.scrollTop, container.scrollHeight - container.clientHeight)
            : measureScrollEdge(window.scrollY, root.scrollHeight - window.innerHeight);
        if (last && last.top === edge.top && last.bottom === edge.bottom) return;
        last = edge;
        onChange(edge);
    };

    target.addEventListener("scroll", measure, { passive: true });
    measure();

    let sizes: ResizeObserver | undefined;
    let nodes: MutationObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
        const sized = new ResizeObserver(measure);
        sizes = sized;
        const watch = () => {
            sized.disconnect();
            if (container) {
                sized.observe(container);
                for (const child of container.children) sized.observe(child);
            } else {
                sized.observe(document.documentElement);
                sized.observe(document.body);
            }
        };
        watch();
        // What is inside a scroller comes and goes: follow it.
        if (container && typeof MutationObserver !== "undefined") {
            nodes = new MutationObserver(() => {
                watch();
                measure();
            });
            nodes.observe(container, { childList: true });
        }
    }
    if (!container) window.addEventListener("resize", measure);

    return () => {
        target.removeEventListener("scroll", measure);
        if (!container) window.removeEventListener("resize", measure);
        sizes?.disconnect();
        nodes?.disconnect();
    };
}
