/**
 * Where a key moves the selection in a radio group laid out in a row, as
 * Rating and SegmentedControl are. Kept out of the components so it can be
 * tested without a DOM.
 *
 * It is the native radio contract: Right and Down go to the next option, Left
 * and Up to the previous one, both wrap, and Left and Right swap in a
 * right-to-left layout.
 *
 * `current` is the option that has focus, which is not always the selected
 * one: a screen reader's cursor can put focus on any radio, and the keys then
 * move from where the user is. It is -1 when focus is on none of them: the
 * next option is then the first, and the previous one the last.
 *
 * `hasSelection` is false while the group is empty. A forward key then selects
 * the focused option itself instead of stepping over it, so Right on an empty
 * rating gives one star, not two.
 *
 * Returns -1 for a key that is not a navigation key, or when there is nothing
 * to move to.
 */
export function radioKeyIndex(
    key: string,
    current: number,
    count: number,
    rtl = false,
    hasSelection = true,
): number {
    if (count <= 0) return -1;
    if (key === "Home") return 0;
    if (key === "End") return count - 1;

    let delta = 0;
    if (key === "ArrowDown") delta = 1;
    else if (key === "ArrowUp") delta = -1;
    else if (key === "ArrowRight") delta = rtl ? -1 : 1;
    else if (key === "ArrowLeft") delta = rtl ? 1 : -1;
    if (delta === 0) return -1;

    if (current < 0 || current >= count) return delta > 0 ? 0 : count - 1;
    if (!hasSelection && delta > 0) return current;
    return (current + delta + count) % count;
}

/** Whether `node` is laid out right to left. */
export function isRtl(node: Element): boolean {
    return getComputedStyle(node).direction === "rtl";
}
