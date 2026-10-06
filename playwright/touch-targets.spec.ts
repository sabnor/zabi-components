import { expect, test, type Locator, type Page } from "@playwright/test";

import { componentsCatalog } from "../src/lib/showcase/components-catalog";

import { waitForHydration } from "./helpers/hydration";

/**
 * Touch targets and pressed states, measured on every component's docs page.
 *
 * On a coarse pointer every control has to take a touch across 44 by 44px,
 * either because it is that big or because an invisible layer around it is.
 * A bounding box cannot see such a layer, so the target is hit-tested: the
 * centre and four points 21px from it must all land on the control. jsdom has
 * no layout and no media queries, so none of this can be a unit test.
 *
 * The pages are read from the catalog, so a new component is measured without
 * being added here.
 */

const MIN_TARGET = 44;
/** A row of flexible items can land a fraction under: four tabs in a 215px card are 43.75px each. */
const TOLERANCE = 0.5;

const pages = [
    ...componentsCatalog.atoms,
    ...componentsCatalog.molecules,
    ...componentsCatalog.organisms,
].map((entry) => entry.name);

/**
 * Every control that is allowed under 44px on a coarse pointer, and why.
 * `match` is tested against "tag|accessible name|class".
 */
const EXCEPTIONS: { page: RegExp; match: RegExp; why: string }[] = [
    {
        page: /^IconButton$/,
        match: /\|[^|]*\bsize-6\b/,
        why: "IconButton xs is a 24px box for dense, pointer-first layouts; its docs say to use sm or larger on touch. An invisible larger target was tried and removed: it covered the edge of the button beside it.",
    },
    {
        page: /./,
        match: /\|[^|]*\bpx-0\b[^|]*\bunderline\b|\|[^|]*\bunderline\b[^|]*\bpx-0\b/,
        why: "Button variant link is a text link: 44px tall, and as wide as its text. A minimum width would stop it lining up with the text around it.",
    },
    {
        page: /^Button$/,
        match: /^a\|[^|]*\|[^|]*\binline\b[^|]*\bunderline\b/,
        why: "Button variant link with href is a text link inside a sentence. It flows and breaks with the words around it, so it has no box to make 44px tall; WCAG 2.5.8 exempts a target in a sentence for that reason.",
    },
    {
        page: /^(BottomTabBar|AppShell)$/,
        match: /^a\|[^|]*\|focus-ring focus-ring--nav flex min-h-14 w-full min-w-0 flex-col/,
        why: "The docs card is 215px wide at this viewport, 172px inside, which is less than four 44px tabs: they share it edge to edge at 43px each, 56px tall, without overlapping. That is the bar's rule for a bar too narrow for its tabs (playwright/bars-text-size.spec.ts). playwright/app-shell.spec.ts measures the tabs at real phone widths, where they are 44px or more with 8px between them.",
    },
];

interface Measured {
    id: string;
    width: number;
    height: number;
    /** False when one of the five sample points lands on something else. */
    hit: boolean;
    /** Height of the control itself, when its class fixes one. */
    fixedHeight: number | null;
}

/** Measures every control under `rootSelector`. Runs in the page. */
function measure(page: Page, rootSelector: string, topmostOnly = false): Promise<Measured[]> {
    return page.evaluate(
        async ({ rootSelector, reach, topmostOnly }) => {
            const selector =
                'button, a[href], input:not([type="hidden"]), select, textarea, summary, [role="button"], [role="tab"], [role="switch"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]';
            const roots = [...document.querySelectorAll(rootSelector)];
            const controls = (topmostOnly ? roots.slice(-1) : roots).flatMap((root) => [
                ...root.querySelectorAll<HTMLElement>(selector),
            ]);
            const out: Measured[] = [];
            for (const control of new Set(controls)) {
                const style = getComputedStyle(control);
                if (style.visibility === "hidden" || style.display === "none") continue;
                // A visually hidden input is operated through its label.
                let target: HTMLElement = control;
                if (control.matches("input") && control.getBoundingClientRect().width <= 2) {
                    const label =
                        control.closest("label") ??
                        (control.id ? document.querySelector<HTMLElement>(`label[for="${control.id}"]`) : null);
                    if (!label) continue;
                    target = label;
                }
                if (target.getBoundingClientRect().width === 0) continue;
                // Instant: a smooth scroll would still be moving when the box is read.
                target.scrollIntoView({ block: "center", inline: "center", behavior: "instant" });
                await new Promise((resolve) => requestAnimationFrame(resolve));
                const box = target.getBoundingClientRect();
                const cx = box.left + box.width / 2;
                const cy = box.top + box.height / 2;
                const lands = (x: number, y: number) => {
                    const hit = document.elementFromPoint(x, y);
                    return (
                        !!hit &&
                        (hit === target || target.contains(hit) || hit === control || control.contains(hit))
                    );
                };
                const hit =
                    lands(cx, cy) &&
                    lands(cx - reach, cy) &&
                    lands(cx + reach, cy) &&
                    lands(cx, cy - reach) &&
                    lands(cx, cy + reach);
                const name = (
                    control.getAttribute("aria-label") ||
                    control.textContent ||
                    control.getAttribute("placeholder") ||
                    ""
                )
                    .trim()
                    .replace(/\s+/g, " ")
                    .slice(0, 30);
                const className = String(control.getAttribute("class") ?? "");
                const fixed = /(?:^|\s)(?:h|size)-(\d+)(?=\s|$)/.exec(className);
                out.push({
                    id: `${control.tagName.toLowerCase()}|${name}|${className}`,
                    width: box.width,
                    height: box.height,
                    hit,
                    fixedHeight: fixed ? Number(fixed[1]) * 4 : null,
                });
            }
            return out;
        },
        // 21px from the centre: inside a 44px target with a pixel to spare for rounding.
        { rootSelector, reach: MIN_TARGET / 2 - 1, topmostOnly },
    );
}

/** The live examples of a docs page; the page chrome around them is the site's, not the library's. */
const PREVIEWS = "main .min-h-\\[100px\\]";

function tooSmall(name: string, controls: Measured[]): string[] {
    return controls
        .filter((control) => {
            if (EXCEPTIONS.some((entry) => entry.page.test(name) && entry.match.test(control.id))) {
                return false;
            }
            return !control.hit;
        })
        .map(
            (control) =>
                `${control.id.slice(0, 110)} (${Math.round(control.width)}x${Math.round(control.height)})`,
        );
}

async function openPage(page: Page, name: string) {
    await page.goto(`/components/${name}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("main h1").first()).toBeVisible();
    await page.waitForLoadState("networkidle");
}

test.describe("touch targets on a coarse pointer", () => {
    test.use({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });

    test("the context is a touch screen without hover", async ({ page }) => {
        await openPage(page, "Button");
        expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches)).toBe(true);
        expect(await page.evaluate(() => matchMedia("(hover: none)").matches)).toBe(true);
    });

    test("the exceptions are still needed", async ({ page }) => {
        // An exception that no longer matches anything hides the next regression behind it.
        await openPage(page, "IconButton");
        const iconButtons = await measure(page, PREVIEWS);
        expect(iconButtons.some((control) => EXCEPTIONS[0].match.test(control.id) && !control.hit)).toBe(
            true,
        );
        await openPage(page, "Button");
        const buttons = await measure(page, PREVIEWS);
        expect(buttons.some((control) => EXCEPTIONS[1].match.test(control.id) && !control.hit)).toBe(true);
    });

    for (const name of pages) {
        test(`${name}: every control in the examples takes a touch across 44 by 44px`, async ({ page }) => {
            await openPage(page, name);
            const controls = await measure(page, PREVIEWS);
            expect(tooSmall(name, controls)).toEqual([]);
            // And is that tall, give or take a fraction, whatever layer extends it.
            for (const control of controls) {
                if (control.hit) {
                    expect(
                        Math.max(control.height, MIN_TARGET),
                        control.id.slice(0, 80),
                    ).toBeGreaterThanOrEqual(MIN_TARGET - TOLERANCE);
                }
            }
        });
    }

    /** Controls that only exist once something is opened. */
    const opened: {
        name: string;
        page: string;
        open: (page: Page) => Locator;
        root: string;
        expectAtLeast: number;
    }[] = [
        { name: "Modal close button", page: "Modal", open: (page) => page.locator(PREVIEWS).getByRole("button", { name: "Open modal" }), root: '[role="dialog"]', expectAtLeast: 1 },
        { name: "Drawer close button and rows", page: "Drawer", open: (page) => page.locator(PREVIEWS).getByRole("button", { name: "Choose project" }), root: '[role="dialog"]', expectAtLeast: 2 },
        { name: "SlideUp close button", page: "SlideUp", open: (page) => page.locator(PREVIEWS).getByRole("button", { name: "Open Slide Up" }), root: '[role="dialog"]', expectAtLeast: 1 },
        { name: "Select options", page: "Select", open: (page) => page.locator(PREVIEWS).locator('button[aria-haspopup="listbox"]'), root: '[role="listbox"]', expectAtLeast: 2 },
        { name: "Dropdown items", page: "Dropdown", open: (page) => page.locator(PREVIEWS).getByRole("button", { name: "Project actions" }), root: '[role="menu"]', expectAtLeast: 2 },
        { name: "Toaster buttons", page: "Toaster", open: (page) => page.locator(PREVIEWS).getByRole("button", { name: "Push toast with Undo" }), root: "[data-toast-id]", expectAtLeast: 2 },
    ];

    for (const entry of opened) {
        test(`${entry.name}: 44 by 44px once open`, async ({ page }) => {
            await openPage(page, entry.page);
            const opener = entry.open(page).first();
            const root = page.locator(entry.root).first();
            // The page is usable before it hydrates, and a second click would close it again.
            await waitForHydration(page);
            if (!(await root.isVisible())) await opener.click();
            await expect(root).toBeVisible();
            // Let an entry animation finish: a control is hit-tested where it is drawn.
            await page.waitForTimeout(500);
            // The showcase renders an example once per card with one shared open state, so
            // two copies of an overlay can lie on top of each other: measure the one on top.
            const controls = await measure(page, entry.root, true);
            expect(controls.length).toBeGreaterThanOrEqual(entry.expectAtLeast);
            expect(tooSmall(entry.page, controls)).toEqual([]);
        });
    }

    test("switches stacked 8px apart do not take each other's taps", async ({ page }) => {
        // A settings list. The hit area reaches 10px past a 24px switch, so without room of
        // its own in the layout the layer of one switch lay over the edge of the one above.
        await openPage(page, "Toggle");
        const result = await page.evaluate(() => {
            const first = document.querySelector<HTMLElement>('main .min-h-\\[100px\\] [role="switch"]')!;
            const row = first.parentElement!;
            const list = document.createElement("div");
            list.style.cssText = "display:flex; flex-direction:column; gap:8px; padding:16px;";
            const rows = [0, 1, 2].map(() => row.cloneNode(true) as HTMLElement);
            list.append(...rows);
            row.parentElement!.append(list);
            list.scrollIntoView({ block: "center", behavior: "instant" });
            const switches = rows.map((clone) => clone.querySelector<HTMLElement>('[role="switch"]')!);
            const owner = (x: number, y: number) =>
                switches.findIndex((element) => element.contains(document.elementFromPoint(x, y)));
            const boxes = switches.map((element) => element.getBoundingClientRect());
            const middle = boxes[1];
            const cx = middle.left + middle.width / 2;
            return {
                rowHeight: rows[1].getBoundingClientRect().height,
                // The visible edges of the middle switch, and the far edges of its hit area.
                topEdge: owner(cx, middle.top + 1),
                bottomEdge: owner(cx, middle.bottom - 1),
                above: owner(cx, middle.top + middle.height / 2 - 21),
                below: owner(cx, middle.top + middle.height / 2 + 21),
                // And the neighbours keep theirs.
                firstBottomEdge: owner(cx, boxes[0].bottom - 1),
                lastTopEdge: owner(cx, boxes[2].top + 1),
            };
        });
        expect(result.rowHeight).toBeGreaterThanOrEqual(MIN_TARGET);
        expect(result).toMatchObject({
            topEdge: 1,
            bottomEdge: 1,
            above: 1,
            below: 1,
            firstBottomEdge: 0,
            lastTopEdge: 2,
        });
    });

    test("a disabled switch shows no pressed state", async ({ page }) => {
        // `:active` still matches a disabled button, and there is no hover rule here to undo it.
        await openPage(page, "Toggle");
        await page.addStyleTag({ content: "*, *::before, *::after { transition: none !important; }" });
        const toggle = page.locator(PREVIEWS).locator('[role="switch"]:disabled').first();
        await toggle.scrollIntoViewIfNeeded();
        const read = () => toggle.evaluate((node) => getComputedStyle(node).backgroundColor);
        const rest = await read();
        const box = (await toggle.boundingBox())!;
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        try {
            expect(await toggle.evaluate((node) => node.matches(":active"))).toBe(true);
            expect(await read()).toBe(rest);
        } finally {
            await page.mouse.up();
        }
    });

    for (const name of ["Checkbox", "Radio", "RadioGroup"]) {
        test(`${name}: a disabled row shows no pressed fill, and an enabled one does`, async ({ page }) => {
            // The row is a label: `:active` matches it around a disabled input,
            // and without hover the rule that undid the hover fill never applied.
            await openPage(page, name);
            await page.addStyleTag({ content: "*, *::before, *::after { transition: none !important; }" });
            const rows = page.locator(PREVIEWS).locator(".selection-control-label-row-interaction");
            const pressed = async (row: Locator) => {
                await row.scrollIntoViewIfNeeded();
                const read = () => row.evaluate((node) => getComputedStyle(node).backgroundColor);
                const rest = await read();
                const box = (await row.boundingBox())!;
                await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
                await page.mouse.down();
                try {
                    expect(await row.evaluate((node) => node.matches(":active"))).toBe(true);
                    return { rest, held: await read() };
                } finally {
                    // Released off the row, so an enabled control is not toggled.
                    await page.mouse.move(0, 0);
                    await page.mouse.up();
                }
            };
            // The RadioGroup examples have no disabled option; the rule is the
            // stylesheet's (`:has(:disabled)`), so disabling one here tests the same thing.
            if ((await rows.filter({ has: page.locator("input:disabled") }).count()) === 0) {
                await rows.last().locator("input").evaluate((input: HTMLInputElement) => (input.disabled = true));
            }
            const disabled = await pressed(rows.filter({ has: page.locator("input:disabled") }).first());
            expect(disabled.held).toBe(disabled.rest);
            const enabled = await pressed(rows.filter({ hasNot: page.locator("input:disabled") }).first());
            expect(enabled.held).not.toBe(enabled.rest);
        });
    }

    test("rows of same-size controls still line up", async ({ page }) => {
        // sm and md are both 44px here; what matters is that a Button, an Input and a Select agree.
        const heightOf = async (name: string, selector: string) => {
            await openPage(page, name);
            return (await page.locator(PREVIEWS).locator(selector).first().boundingBox())!.height;
        };
        const button = await heightOf("Button", "button");
        const input = await heightOf("Input", "input");
        const select = await heightOf("Select", "button");
        expect(button).toBe(MIN_TARGET);
        expect(input).toBe(MIN_TARGET);
        expect(select).toBe(MIN_TARGET);

        await openPage(page, "IconButton");
        const sizes = await page
            .locator(PREVIEWS)
            .locator("button")
            .evaluateAll((buttons) =>
                buttons.map((button) => ({
                    height: button.getBoundingClientRect().height,
                    width: button.getBoundingClientRect().width,
                    xs: button.classList.contains("size-6"),
                    lg: button.classList.contains("size-12"),
                })),
            );
        for (const size of sizes) {
            // xs stays 24, sm and md are 44 and square, lg stays 48.
            expect(size.height).toBe(size.xs ? 24 : size.lg ? 48 : MIN_TARGET);
            expect(size.width).toBe(size.height);
        }
    });

    test("a hover style does not stay on after a tap", async ({ page }) => {
        await openPage(page, "Button");
        const samples = ["Primary", "Secondary", "Outline", "Ghost", "Delete"];
        for (const label of samples) {
            const button = page.locator(PREVIEWS).getByRole("button", { name: label, exact: true }).first();
            await button.scrollIntoViewIfNeeded();
            const look = () =>
                button.evaluate((element) => {
                    const style = getComputedStyle(element);
                    return `${style.backgroundColor} ${style.borderColor} ${style.color}`;
                });
            const rest = await look();
            await button.tap();
            // The browser leaves `:hover` on the tapped element; no rule may act on it here.
            await expect(async () => {
                expect(await button.evaluate((element) => element.matches(":active"))).toBe(false);
                expect(await look()).toBe(rest);
            }).toPass({ timeout: 5_000 });
            expect(await button.evaluate((element) => element.matches(":hover")), label).toBe(true);
        }
    });

    /** Pressed, with no hover to lean on: `(hover: none)` holds in this context. */
    const pressed: { page: string; name: string; locate: (page: Page) => Locator; property: string }[] = [
        { page: "Button", name: "primary Button", locate: (page) => page.locator(PREVIEWS).getByRole("button", { name: "Primary", exact: true }).first(), property: "backgroundColor" },
        { page: "Button", name: "ghost Button", locate: (page) => page.locator(PREVIEWS).getByRole("button", { name: "Ghost", exact: true }).first(), property: "backgroundColor" },
        { page: "Button", name: "link Button", locate: (page) => page.locator(PREVIEWS).getByRole("button", { name: "Link", exact: true }).first(), property: "color" },
        { page: "IconButton", name: "IconButton", locate: (page) => page.locator(PREVIEWS).locator("button.size-10").first(), property: "backgroundColor" },
        { page: "Checkbox", name: "Checkbox row", locate: (page) => page.locator(PREVIEWS).locator("label").first(), property: "backgroundColor" },
        { page: "Toggle", name: "Toggle", locate: (page) => page.locator(PREVIEWS).getByRole("switch").first(), property: "backgroundColor" },
        { page: "Tabs", name: "unselected tab", locate: (page) => page.locator(PREVIEWS).getByRole("tab", { selected: false }).first(), property: "backgroundColor" },
        { page: "Collapsible", name: "Collapsible trigger", locate: (page) => page.locator(PREVIEWS).locator("button[aria-expanded]").first(), property: "backgroundColor" },
        { page: "NavigationMenu", name: "NavigationMenu trigger", locate: (page) => page.locator(PREVIEWS).getByRole("button", { name: "Components" }).first(), property: "backgroundColor" },
        { page: "SortableList", name: "SortableList handle", locate: (page) => page.locator(PREVIEWS).locator("button.size-8").first(), property: "backgroundColor" },
        { page: "SegmentedControl", name: "unselected segment", locate: (page) => page.locator(PREVIEWS).locator(".segment:has(input:not(:checked)) .segment-face").first(), property: "backgroundColor" },
        { page: "Select", name: "Select trigger", locate: (page) => page.locator(PREVIEWS).locator("button").first(), property: "backgroundColor" },
    ];

    for (const sample of pressed) {
        test(`pressed: ${sample.name} changes while it is held`, async ({ page }) => {
            await openPage(page, sample.page);
            // Colour transitions would have the reading chase the animation.
            await page.addStyleTag({ content: "*, *::before, *::after { transition: none !important; }" });
            const element = sample.locate(page);
            await element.scrollIntoViewIfNeeded();
            const read = () =>
                element.evaluate(
                    (node, property) => getComputedStyle(node)[property as "color"],
                    sample.property,
                );
            const rest = await read();
            const box = (await element.boundingBox())!;
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
            try {
                await expect.poll(read, { timeout: 5_000 }).not.toBe(rest);
            } finally {
                await page.mouse.up();
            }
        });
    }

    for (const dark of [false, true]) {
        test(`pressed: the Select trigger is 1.25:1 or more against its resting fill, ${dark ? "dark" : "light"}`, async ({
            page,
        }) => {
            // "Changes" was true at 1.10:1, the hover step, which nobody could see under a thumb.
            await openPage(page, "Select");
            await page.evaluate((on) => document.documentElement.classList.toggle("dark", on), dark);
            await page.addStyleTag({ content: "*, *::before, *::after { transition: none !important; }" });
            const trigger = page.locator(PREVIEWS).locator("button").first();
            await trigger.scrollIntoViewIfNeeded();
            const read = () =>
                trigger.evaluate((node) => {
                    const canvas = document.createElement("canvas");
                    canvas.width = canvas.height = 1;
                    const context = canvas.getContext("2d", { willReadFrequently: true })!;
                    const luminance = (colour: string) => {
                        context.clearRect(0, 0, 1, 1);
                        context.fillStyle = colour;
                        context.fillRect(0, 0, 1, 1);
                        const [r, g, b] = [...context.getImageData(0, 0, 1, 1).data].slice(0, 3).map((channel) => {
                            const value = channel / 255;
                            return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
                        });
                        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
                    };
                    const style = getComputedStyle(node);
                    return { fill: luminance(style.backgroundColor), text: luminance(style.color) };
                });
            const ratio = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
            const rest = await read();
            const box = (await trigger.boundingBox())!;
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
            try {
                const held = await read();
                expect(ratio(held.fill, rest.fill)).toBeGreaterThanOrEqual(1.25);
                expect(ratio(held.text, held.fill)).toBeGreaterThanOrEqual(4.5);
            } finally {
                await page.mouse.move(0, 0);
                await page.mouse.up();
            }
        });
    }
});

test.describe("the same pages on a fine pointer", () => {
    test("the context has a mouse", async ({ page }) => {
        await openPage(page, "Button");
        expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches)).toBe(false);
    });

    for (const name of pages) {
        test(`${name}: controls keep the size their class gives them`, async ({ page }) => {
            await openPage(page, name);
            const controls = await measure(page, PREVIEWS);
            // `h-10` is 40px, `size-8` 32px, and so on: no coarse-pointer minimum may leak in.
            const drifted = controls
                .filter((control) => control.fixedHeight !== null && control.height !== control.fixedHeight)
                .map((control) => `${control.id.slice(0, 100)}: ${control.height}, expected ${control.fixedHeight}`);
            expect(drifted).toEqual([]);
        });
    }

    test("the shared scale is 32, 40 and 48px, and other controls are as they were", async ({ page }) => {
        const first = async (name: string, selector: string) => {
            await openPage(page, name);
            return (await page.locator(PREVIEWS).locator(selector).first().boundingBox())!;
        };
        expect((await first("Button", "button")).height).toBe(40);
        expect((await first("Input", "input")).height).toBe(40);
        expect((await first("Select", "button")).height).toBe(40);
        expect((await first("Tabs", '[role="tab"]')).height).toBe(38);
        expect((await first("Checkbox", "label")).height).toBe(36);
        expect((await first("NavigationMenu", "button")).height).toBe(36);
        expect((await first("Collapsible", "button[aria-expanded]")).height).toBe(36);
        const toggle = await first("Toggle", '[role="switch"]');
        expect([toggle.width, toggle.height]).toEqual([40, 24]);
        expect((await first("ThemeToggle", "button")).height).toBe(40);

        await openPage(page, "IconButton");
        const heights = await page
            .locator(PREVIEWS)
            .locator("button")
            .evaluateAll((buttons) => [...new Set(buttons.map((button) => button.getBoundingClientRect().height))]);
        expect(heights.sort((a, b) => a - b)).toEqual([24, 32, 40, 48]);

        // No invisible layer on a fine pointer: the switch takes the pointer on its own box only.
        await openPage(page, "Toggle");
        const layer = await page
            .locator(PREVIEWS)
            .getByRole("switch")
            .first()
            .evaluate((element) => getComputedStyle(element, "::before").content);
        expect(layer).toBe("none");
    });

    test("a close button is positioned for its hit area on a coarse pointer only", async ({ page }) => {
        await openPage(page, "Toast");
        const position = await page
            .locator(PREVIEWS)
            .getByRole("button", { name: "Close notification" })
            .first()
            .evaluate((element) => getComputedStyle(element).position);
        expect(position).toBe("static");
    });
});

/**
 * A toggled-on IconButton, held down with a mouse. The pointer is already over
 * the button, so the hover fill is showing; the pressed fill used to be that
 * same fill, and the press showed nothing. It is now one step past it, and far
 * enough from the resting fill to read on touch too, where there is no hover.
 */
test.describe("a toggled-on IconButton shows the press", () => {
    for (const dark of [false, true]) {
        test(`ghost, ${dark ? "dark" : "light"}: held is past hover, and 1.25:1 or more from resting`, async ({ page }) => {
            await openPage(page, "IconButton");
            await page.evaluate((on) => document.documentElement.classList.toggle("dark", on), dark);
            await page.addStyleTag({ content: "*, *::before, *::after { transition: none !important; }" });
            const bold = page.locator(PREVIEWS).getByRole("button", { name: "Bold" }).first();
            await bold.scrollIntoViewIfNeeded();
            if ((await bold.getAttribute("aria-pressed")) !== "true") await bold.click();
            await expect(bold).toHaveAttribute("aria-pressed", "true");

            const read = () =>
                bold.evaluate((node) => {
                    const canvas = document.createElement("canvas");
                    canvas.width = canvas.height = 1;
                    const context = canvas.getContext("2d", { willReadFrequently: true })!;
                    const luminance = (colour: string) => {
                        context.clearRect(0, 0, 1, 1);
                        context.fillStyle = colour;
                        context.fillRect(0, 0, 1, 1);
                        const [r, g, b] = [...context.getImageData(0, 0, 1, 1).data].slice(0, 3).map((channel) => {
                            const value = channel / 255;
                            return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
                        });
                        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
                    };
                    const style = getComputedStyle(node);
                    return { fill: luminance(style.backgroundColor), icon: luminance(style.color), raw: style.backgroundColor };
                });
            const ratio = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

            await page.mouse.move(0, 0);
            const resting = await read();
            const box = (await bold.boundingBox())!;
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            const hovered = await read();
            expect(hovered.raw).not.toBe(resting.raw);
            await page.mouse.down();
            try {
                const held = await read();
                expect(held.raw, "held is not the hover fill").not.toBe(hovered.raw);
                expect(ratio(held.fill, resting.fill)).toBeGreaterThanOrEqual(1.25);
                // The icon is all there is on the button: 3:1 on the fill it is drawn on.
                expect(ratio(held.icon, held.fill)).toBeGreaterThanOrEqual(3);
            } finally {
                // Released off the button, so it stays toggled on.
                await page.mouse.move(0, 0);
                await page.mouse.up();
            }
        });
    }
});
