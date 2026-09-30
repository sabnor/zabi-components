import type { Action } from "svelte/action";

/**
 * Where to render the node: `true` for `document.body`, an element, or a
 * selector. `false` leaves the node where the template put it.
 */
export type PortalTarget = boolean | HTMLElement | string;

function resolveTarget(target: PortalTarget): HTMLElement | null {
    if (target === false) return null;
    if (target === true) return document.body;
    if (typeof target === "string") {
        return document.querySelector<HTMLElement>(target);
    }
    return target;
}

/**
 * Moves an overlay out of its ancestors so none of them can trap it: a
 * `transform`, `filter` or `contain` ancestor becomes the containing block of a
 * `position: fixed` child, and an `overflow: hidden` one then clips it.
 *
 * SSR-safe by construction: actions never run on the server, so the markup is
 * rendered in place and moved on mount. The node is removed on destroy, and
 * Svelte's own teardown of a node that has already gone is a no-op.
 *
 * Put it on the single root element of an `{#if}` block. The theme is a `.dark`
 * class on an ancestor, so a node portalled to `body` keeps it only when the
 * class sits on `<html>` or `<body>`.
 *
 * Usage: `<div use:portal>` or `<div use:portal={enabled}>`.
 */
export const portal: Action<HTMLElement, PortalTarget | undefined> = (
    node,
    target = true,
) => {
    const home = node.parentNode;
    const homeNext = node.nextSibling;

    function place(next: PortalTarget) {
        const destination = resolveTarget(next);
        if (destination) {
            if (node.parentNode !== destination) destination.appendChild(node);
        } else if (next === false && home && node.parentNode !== home) {
            // Back to where the template put it, if that place still exists.
            home.insertBefore(
                node,
                homeNext?.parentNode === home ? homeNext : null,
            );
        }
    }

    place(target);

    return {
        update(next = true) {
            place(next);
        },
        destroy() {
            if (node.parentNode !== home) node.remove();
        },
    };
};
