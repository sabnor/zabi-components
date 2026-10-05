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
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: at(from) });
    for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        await page.waitForTimeout(duration / steps);
        await cdp.send("Input.dispatchTouchEvent", {
            type: "touchMove",
            touchPoints: at({
                x: from.x + (to.x - from.x) * progress,
                y: from.y + (to.y - from.y) * progress,
            }),
        });
    }
    if (hold > 0) {
        // Still on the glass, not moving: the release carries no speed.
        const rests = 4;
        for (let rest = 0; rest < rests; rest += 1) {
            await page.waitForTimeout(hold / rests);
            await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: at(to) });
        }
    }
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
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
