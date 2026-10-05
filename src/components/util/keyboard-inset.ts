/**
 * How much of the bottom of the page the on-screen keyboard covers.
 *
 * Browsers disagree on what a keyboard does. Some shrink the layout viewport,
 * and everything pinned to the bottom moves up by itself. Others (iOS Safari,
 * and Chrome on Android by default) leave the layout alone and only shrink
 * the *visual* viewport, so a bar pinned to the bottom ends up behind the
 * keyboard. The difference between the two viewports is the part to lift a
 * bar by; where the layout has already shrunk, it is 0.
 */

/** The covered height in px, or 0 where it cannot be told (the server, an old browser). */
export function readKeyboardInset(): number {
    if (typeof window === "undefined") return 0;
    const viewport = window.visualViewport;
    if (!viewport) return 0;
    // Pinch zoom shrinks the visual viewport too, and is not a keyboard.
    if (Math.abs(viewport.scale - 1) > 0.01) return 0;
    const layoutHeight = document.documentElement.clientHeight;
    const inset = layoutHeight - viewport.height - viewport.offsetTop;
    // A pixel of rounding is not a keyboard either.
    return inset > 1 ? Math.round(inset) : 0;
}

/**
 * Calls `onChange` with the inset now, and again whenever it changes. Call it
 * in the browser; the returned function stops it.
 */
export function watchKeyboardInset(onChange: (inset: number) => void): () => void {
    if (typeof window === "undefined") return () => {};
    const viewport = window.visualViewport;
    let last = -1;
    const update = () => {
        const next = readKeyboardInset();
        if (next === last) return;
        last = next;
        onChange(next);
    };
    update();
    if (!viewport) return () => {};
    viewport.addEventListener("resize", update);
    viewport.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
        viewport.removeEventListener("resize", update);
        viewport.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
    };
}
