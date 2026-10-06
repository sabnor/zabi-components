import type { Page } from "@playwright/test";

interface Point {
    x: number;
    y: number;
}

/**
 * A finger on the screen, through the DevTools protocol: the browser handles
 * it as real touch input. It hit-tests it, scrolls with it, and delivers
 * pointer and touch events for it, which `dispatchEvent` would not.
 *
 * `duration` is the time the finger takes to travel; `hold` is how long it
 * rests at the end before lifting. A long travel with a hold is a slow drag
 * that ends at a standstill; a short one with no hold is a flick.
 */
export async function touchDrag(
    page: Page,
    from: Point,
    to: Point,
    { duration = 400, hold = 200, steps = 16 }: { duration?: number; hold?: number; steps?: number } = {},
): Promise<void> {
    const cdp = await page.context().newCDPSession(page);
    const at = (point: Point) => [{ x: Math.round(point.x), y: Math.round(point.y), id: 1 }];
    // Each event carries the time the gesture says it happened at, not the
    // time this process got round to sending it: on a loaded machine the
    // sends are late and uneven, and a flick would arrive as a slow drag. A
    // travel of no duration still takes a frame (8ms) a step.
    const began = Date.now();
    const stepMs = Math.max(duration / steps, 8);
    let elapsed = 0;
    const when = () => (began + elapsed) / 1000;
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: at(from), timestamp: when() });
    for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        await page.waitForTimeout(duration / steps);
        elapsed += stepMs;
        await cdp.send("Input.dispatchTouchEvent", {
            type: "touchMove",
            touchPoints: at({
                x: from.x + (to.x - from.x) * progress,
                y: from.y + (to.y - from.y) * progress,
            }),
            timestamp: when(),
        });
    }
    if (hold > 0) {
        // Still on the glass, not moving: the release carries no speed.
        const rests = 4;
        for (let rest = 0; rest < rests; rest += 1) {
            await page.waitForTimeout(hold / rests);
            elapsed += hold / rests;
            await cdp.send("Input.dispatchTouchEvent", {
                type: "touchMove",
                touchPoints: at(to),
                timestamp: when(),
            });
        }
    }
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [], timestamp: when() });
    await cdp.detach();
}

/**
 * One tap of a finger at `point`, through the DevTools protocol: pointer and
 * touch events of type "touch", then the mouse events and the click a browser
 * makes of a tap. `hold` is how long the finger rests on the glass.
 */
export async function touchTap(
    page: Page,
    point: Point,
    { hold = 60 }: { hold?: number } = {},
): Promise<void> {
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [{ x: Math.round(point.x), y: Math.round(point.y), id: 1 }],
    });
    await page.waitForTimeout(hold);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await cdp.detach();
}

/**
 * A finger put down at `point` and left there. `lift` takes it off again;
 * `cancel` is the browser taking the touch for itself. What happens in
 * between is the test's: it moves the page's clock, not this process's.
 * Both events carry a timestamp of their own, `heldFor` ms apart, so the
 * browser never sees a tap however late the second one is sent.
 */
export async function touchHold(
    page: Page,
    point: Point,
): Promise<{ lift: (heldFor?: number) => Promise<void>; cancel: () => Promise<void> }> {
    const cdp = await page.context().newCDPSession(page);
    const began = Date.now();
    await cdp.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [{ x: Math.round(point.x), y: Math.round(point.y), id: 1 }],
        timestamp: began / 1000,
    });
    return {
        async lift(heldFor = 3000) {
            await cdp.send("Input.dispatchTouchEvent", {
                type: "touchEnd",
                touchPoints: [],
                timestamp: (began + heldFor) / 1000,
            });
            await cdp.detach();
        },
        async cancel() {
            await cdp.send("Input.dispatchTouchEvent", { type: "touchCancel", touchPoints: [] });
            await cdp.detach();
        },
    };
}

/**
 * Two fingers on the glass, moved together from one pair of points to
 * another, through the DevTools protocol: a pinch when the pairs differ in
 * how far apart they are, a two-finger drag when they do not. `hold` is how
 * long the fingers rest at the end before both lift.
 */
export async function touchPinch(
    page: Page,
    from: [Point, Point],
    to: [Point, Point],
    { duration = 300, hold = 100, steps = 12 }: { duration?: number; hold?: number; steps?: number } = {},
): Promise<void> {
    const cdp = await page.context().newCDPSession(page);
    const at = (progress: number) =>
        from.map((start, finger) => ({
            x: Math.round(start.x + (to[finger].x - start.x) * progress),
            y: Math.round(start.y + (to[finger].y - start.y) * progress),
            id: finger + 1,
        }));
    // One finger, then the other: as fingers arrive.
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: at(0).slice(0, 1) });
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: at(0) });
    for (let step = 1; step <= steps; step += 1) {
        await page.waitForTimeout(duration / steps);
        await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: at(step / steps) });
    }
    if (hold > 0) await page.waitForTimeout(hold);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await cdp.detach();
}
