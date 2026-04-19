function findFlyoutAnchor(root, anchorRole) {
    const el = anchorRole
        ? root.querySelector(`[data-sidebar-flyout-anchor="${anchorRole}"]`)
        : root.querySelector("[data-sidebar-flyout-anchor]");
    return el instanceof HTMLElement ? el : null;
}
function collectScrollParents(el) {
    const list = [window];
    let node = el;
    while (node) {
        const style = getComputedStyle(node);
        if (/(auto|scroll|overlay)/.test(style.overflowX) ||
            /(auto|scroll|overlay)/.test(style.overflowY)) {
            list.push(node);
        }
        node = node.parentElement;
    }
    return list;
}
/**
 * Pins a flyout with `position: fixed` next to the trigger marked with
 * `[data-sidebar-flyout-anchor]` inside `[data-sidebar-flyout-root]` (typically the
 * search or profile button), updating on scroll and resize.
 * While open, the node is moved to `document.body` so `overflow-y: auto` / scroll
 * ancestors cannot clip it (fixed descendants are still painted inside scrollports).
 */
export const fixedSidebarFlyout = (node, initialParams) => {
    let currentParams = initialParams;
    let scrollTargets = [];
    let ro;
    let detachScroll;
    const rootHostEl = node.closest("[data-sidebar-flyout-root]");
    const flyoutRoot = rootHostEl instanceof HTMLElement ? rootHostEl : null;
    let teleportParent = null;
    let teleportNext = null;
    const onScrollOrResize = () => {
        requestAnimationFrame(() => applyPosition());
    };
    function attachToBody() {
        if (node.parentElement === document.body) {
            return;
        }
        teleportParent = node.parentElement;
        teleportNext = node.nextSibling;
        document.body.appendChild(node);
    }
    function restoreFromBody() {
        if (teleportParent &&
            node.parentElement === document.body) {
            teleportParent.insertBefore(node, teleportNext);
        }
        teleportParent = null;
        teleportNext = null;
    }
    function applyPosition() {
        const anchor = flyoutRoot
            ? findFlyoutAnchor(flyoutRoot, currentParams.anchorRole)
            : null;
        if (!anchor || !currentParams.open) {
            return;
        }
        const r = anchor.getBoundingClientRect();
        const gap = currentParams.gap ?? 12;
        node.style.position = "fixed";
        node.style.left = `${Math.round(r.right + gap)}px`;
        node.style.right = "auto";
        if (currentParams.align === "bottom") {
            node.style.top = "auto";
            node.style.bottom = `${Math.round(window.innerHeight - r.bottom)}px`;
        }
        else {
            node.style.bottom = "auto";
            node.style.top = `${Math.round(r.top)}px`;
        }
        /* Above page chrome / sidebar siblings so panels overlay main content */
        node.style.zIndex = "60";
        const maxW = Math.max(200, window.innerWidth - r.right - gap - 16);
        node.style.maxWidth = `${Math.round(maxW)}px`;
    }
    function clearPosition() {
        node.style.removeProperty("position");
        node.style.removeProperty("left");
        node.style.removeProperty("right");
        node.style.removeProperty("top");
        node.style.removeProperty("bottom");
        node.style.removeProperty("z-index");
        node.style.removeProperty("max-width");
    }
    function bindScroll() {
        unbindScroll();
        const anchor = flyoutRoot
            ? findFlyoutAnchor(flyoutRoot, currentParams.anchorRole)
            : null;
        if (!anchor) {
            return;
        }
        scrollTargets = collectScrollParents(anchor);
        for (const t of scrollTargets) {
            t.addEventListener("scroll", onScrollOrResize, {
                passive: true,
                capture: true,
            });
        }
        window.addEventListener("resize", onScrollOrResize);
        ro = new ResizeObserver(onScrollOrResize);
        ro.observe(anchor);
        detachScroll = () => {
            for (const t of scrollTargets) {
                t.removeEventListener("scroll", onScrollOrResize, {
                    capture: true,
                });
            }
            window.removeEventListener("resize", onScrollOrResize);
            ro?.disconnect();
            ro = undefined;
            scrollTargets = [];
        };
    }
    function unbindScroll() {
        detachScroll?.();
        detachScroll = undefined;
    }
    function sync(next) {
        currentParams = next;
        if (!next.open) {
            unbindScroll();
            restoreFromBody();
            clearPosition();
            return;
        }
        queueMicrotask(() => {
            attachToBody();
            applyPosition();
            bindScroll();
        });
    }
    sync(initialParams);
    return {
        update(next) {
            sync(next);
        },
        destroy() {
            unbindScroll();
            restoreFromBody();
            clearPosition();
        },
    };
};
