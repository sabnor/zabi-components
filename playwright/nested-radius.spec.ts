import { expect, test, type Locator, type Page } from "@playwright/test";

import { componentsCatalog } from "../src/lib/showcase/components-catalog";

/**
 * Nested corners are concentric.
 *
 * When a rounded element sits inside a rounded container, close to its
 * corner, the two curves only look parallel if
 *
 *     outer radius = inner radius + the gap between the two edges
 *
 * (the gap is the padding, the container's border included). The library has
 * four role radii, control 8px, container 12px, overlay 16px and pill, so an
 * inner element near a corner takes a radius computed from its container's:
 * `calc(var(--radius-container) - <gap>)`.
 *
 * The rule only applies where the gap is smaller than the outer radius. Past
 * that, the inner element is out of the corner's curve and keeps its own role
 * radius: a Button 24px inside a Card is an 8px button.
 *
 * What is checked, on every component's docs page and in the popups listed
 * below: every painted, rounded element that comes from src/components and
 * whose nearest painted, rounded ancestor is closer than that ancestor's
 * radius. A rounded control counts as painted even when it is transparent at
 * rest: its hover fill, pressed fill and focus ring all draw its shape. A pill or a round mark needs `outer >= inner + gap`; anything else
 * needs the two to be equal. Both within 1px.
 *
 * A square corner is checked as well: it is a radius of 0, and the same rule
 * holds for it. A square element that draws its own box, inside the curve of
 * its container (flush with the edge included) and not clipped by it
 * (`overflow` other than `visible` on the container, or on something rounded
 * in between), is a nested pair like any other, so it fails unless the gap is
 * the whole outer radius. Drawing its own box means a fill, a background
 * image, a border on every side or a shadow at rest, or being a native control
 * (a link, a button, a field), whose hover and pressed fills draw it.
 *
 * Where an element comes from is read from Svelte's dev metadata, so this
 * needs the dev server, which is what the Playwright config starts. Layout
 * needs a real browser: jsdom has none.
 */

const pages = [
    ...componentsCatalog.atoms,
    ...componentsCatalog.molecules,
    ...componentsCatalog.organisms,
].map((entry) => entry.name);

const TOLERANCE = 1;

interface Pair {
    gap: number;
    inner: number;
    outer: number;
    /** The inner radius is half its smaller side: a pill, a circle or a small round mark. */
    innerRound: boolean;
    iFile: string;
    oFile: string | null;
    iCls: string;
    oCls: string;
    iSize: [number, number];
    /** The inner corner is square (a radius of 0) and nothing clips it. */
    square?: boolean;
}

/**
 * Pairs that are allowed to break the rule, and why. `inner` and `outer` are
 * tested against "file|class" of each element.
 */
const EXCEPTIONS: { inner: RegExp; outer: RegExp; why: string }[] = [];

/** Classes from src/app.css that are a rounded shell for library components, wherever they are written. */
const LIBRARY_SHELLS = /(?:^|\s)list-group(?:\s|$)/;

/** Runs in the page: every rounded element near the corner of a rounded, painted ancestor. */
function scan(): Pair[] {
    const alpha = (colour: string) => {
        const match = colour.match(/rgba?\(([^)]+)\)/);
        if (!match) return colour === "transparent" ? 0 : 1;
        const parts = match[1].split(/[,/ ]+/).filter(Boolean);
        return parts.length > 3 ? parseFloat(parts[3]) : 1;
    };
    interface Described {
        box: DOMRect;
        radii: number[];
        round: boolean[];
        painted: boolean;
        /** Draws its own box whatever its radius: something at rest, or a native control's states. */
        paintsBox: boolean;
        /** Cuts its content off at its own (rounded) edge. */
        clips: boolean;
        file: string | null;
        cls: string;
    }
    const cache = new Map<Element, Described | null>();
    function describe(element: Element): Described | null {
        if (cache.has(element)) return cache.get(element)!;
        const style = getComputedStyle(element);
        const box = element.getBoundingClientRect();
        let described: Described | null = null;
        if (box.width > 0 && box.height > 0 && style.visibility !== "hidden" && style.display !== "contents") {
            const half = Math.min(box.width, box.height) / 2;
            const raw = [
                style.borderTopLeftRadius,
                style.borderTopRightRadius,
                style.borderBottomRightRadius,
                style.borderBottomLeftRadius,
            ].map((value) => {
                const first = value.split(" ")[0];
                return first.endsWith("%") ? (parseFloat(first) / 100) * Math.min(box.width, box.height) : parseFloat(first) || 0;
            });
            const everyBorder = ["top", "right", "bottom", "left"].every(
                (side) =>
                    parseFloat(style.getPropertyValue(`border-${side}-width`)) > 0 &&
                    alpha(style.getPropertyValue(`border-${side}-color`)) > 0,
            );
            const border = ["Top", "Right", "Bottom", "Left"].some(
                (side) =>
                    parseFloat(style.getPropertyValue(`border-${side.toLowerCase()}-width`)) > 0 &&
                    alpha(style.getPropertyValue(`border-${side.toLowerCase()}-color`)) > 0,
            );
            const meta = (element as unknown as { __svelte_meta?: { loc?: { file: string } } }).__svelte_meta?.loc;
            described = {
                box,
                // A radius larger than half the box is drawn as half the box.
                radii: raw.map((value) => Math.min(value, half)),
                round: raw.map((value) => value >= half - 0.5),
                // A rounded control shows its shape as soon as it is hovered,
                // pressed or focused, whatever it paints at rest.
                painted:
                    alpha(style.backgroundColor) > 0 ||
                    style.backgroundImage !== "none" ||
                    border ||
                    style.boxShadow !== "none" ||
                    (raw.some((value) => value > 0) &&
                        element.matches("a, button, input, select, textarea, label, [role], [tabindex]")),
                paintsBox:
                    parseFloat(style.opacity) > 0 &&
                    // A visually hidden input (1 by 1px, clipped away) draws nothing.
                    box.width > 2 &&
                    box.height > 2 &&
                    (alpha(style.backgroundColor) > 0 ||
                        style.backgroundImage !== "none" ||
                        everyBorder ||
                        style.boxShadow !== "none" ||
                        element.matches("a[href], button, input, select, textarea")),
                clips: style.overflowX !== "visible" || style.overflowY !== "visible",
                file: meta ? meta.file.replace(/^.*?src\//, "src/") : null,
                cls: (typeof element.className === "string" ? element.className : "").slice(0, 140),
            };
        }
        cache.set(element, described);
        return described;
    }

    const pairs: Pair[] = [];
    for (const element of document.querySelectorAll("body *")) {
        const inner = describe(element);
        if (!inner || !inner.file || !inner.file.startsWith("src/components/")) continue;
        const rounded = inner.radii.some((radius) => radius > 0);
        const square = inner.radii.some((radius) => radius === 0) && inner.paintsBox;
        if (!(inner.painted && rounded) && !square) continue;

        let ancestor = element.parentElement;
        let outer: Described | null = null;
        // Something rounded between the two, or the outer element itself, cuts the inner one off.
        let clipped = false;
        while (ancestor && ancestor !== document.documentElement) {
            const candidate = describe(ancestor);
            if (candidate && candidate.clips && candidate.radii.some((radius) => radius > 0)) clipped = true;
            if (candidate && candidate.painted) {
                outer = candidate;
                break;
            }
            ancestor = ancestor.parentElement;
        }
        if (!outer || !outer.radii.some((radius) => radius > 0)) continue;

        if (square && !clipped) {
            const squareCorners: [number, number, number][] = [
                [inner.box.left - outer.box.left, inner.box.top - outer.box.top, 0],
                [outer.box.right - inner.box.right, inner.box.top - outer.box.top, 1],
                [outer.box.right - inner.box.right, outer.box.bottom - inner.box.bottom, 2],
                [inner.box.left - outer.box.left, outer.box.bottom - inner.box.bottom, 3],
            ];
            for (const [dx, dy, index] of squareCorners) {
                const radius = outer.radii[index];
                if (radius <= 0 || inner.radii[index] !== 0) continue;
                // Outside the outer box, or past where its curve has cut in.
                if (dx < -0.5 || dy < -0.5 || dx >= radius || dy >= radius) continue;
                pairs.push({
                    gap: Math.round(Math.max(0, Math.min(dx, dy)) * 10) / 10,
                    inner: 0,
                    outer: Math.round(radius * 10) / 10,
                    innerRound: false,
                    iFile: inner.file,
                    oFile: outer.file,
                    iCls: inner.cls,
                    oCls: outer.cls,
                    iSize: [Math.round(inner.box.width), Math.round(inner.box.height)],
                    square: true,
                });
            }
        }
        if (!(inner.painted && rounded)) continue;

        const corners: [number, number, number][] = [
            [inner.box.left - outer.box.left, inner.box.top - outer.box.top, 0],
            [outer.box.right - inner.box.right, inner.box.top - outer.box.top, 1],
            [outer.box.right - inner.box.right, outer.box.bottom - inner.box.bottom, 2],
            [inner.box.left - outer.box.left, outer.box.bottom - inner.box.bottom, 3],
        ];
        for (const [dx, dy, index] of corners) {
            if (outer.radii[index] <= 0 || inner.radii[index] <= 0) continue;
            // Flush with the edge, or outside it: not nested at this corner.
            if (dx < 0.5 || dy < 0.5) continue;
            const gap = Math.min(dx, dy);
            // Out of the corner's curve: the inner element keeps its own radius.
            if (Math.max(dx, dy) >= outer.radii[index]) continue;
            pairs.push({
                gap: Math.round(gap * 10) / 10,
                inner: Math.round(inner.radii[index] * 10) / 10,
                outer: Math.round(outer.radii[index] * 10) / 10,
                innerRound: inner.round[index],
                iFile: inner.file,
                oFile: outer.file,
                iCls: inner.cls,
                oCls: outer.cls,
                iSize: [Math.round(inner.box.width), Math.round(inner.box.height)],
            });
        }
    }
    return pairs;
}

function broken(pair: Pair): boolean {
    const wanted = pair.inner + pair.gap;
    return pair.innerRound
        ? pair.outer < wanted - TOLERANCE
        : Math.abs(pair.outer - wanted) > TOLERANCE;
}

const excepted = (pair: Pair) =>
    EXCEPTIONS.some(
        (entry) =>
            entry.inner.test(`${pair.iFile}|${pair.iCls}`) && entry.outer.test(`${pair.oFile}|${pair.oCls}`),
    );

/** One line per distinct broken pair, readable in a failure. */
function report(pairs: Pair[]): string[] {
    const lines = new Set<string>();
    for (const pair of pairs) {
        // A frame of the docs site around a demo is not the library's nesting,
        // unless the frame is one of the shells the library ships as a class.
        const libraryOuter =
            pair.oFile?.startsWith("src/components/") || LIBRARY_SHELLS.test(pair.oCls);
        if (!libraryOuter) continue;
        if (!broken(pair) || excepted(pair)) continue;
        const file = (path: string) => path.replace("src/components/", "");
        if (pair.square) {
            lines.add(
                `${file(pair.iFile)} (square, ${pair.iSize.join("x")}) in ${file(pair.oFile ?? "a library shell")} (${pair.outer}px) at ${pair.gap}px: ` +
                    `a square corner inside the curve that nothing clips, needs ${Math.round((pair.outer - pair.gap) * 10) / 10}px` +
                    ` | ${pair.iCls.slice(0, 70)} | ${pair.oCls.slice(0, 50)}`,
            );
            continue;
        }
        lines.add(
            `${file(pair.iFile)} (${pair.inner}px${pair.innerRound ? ", round" : ""}, ${pair.iSize.join("x")}) in ${file(pair.oFile ?? "a library shell")} (${pair.outer}px) at ${pair.gap}px: ` +
                `needs ${pair.innerRound ? "at most" : ""} ${Math.round((pair.outer - pair.gap) * 10) / 10}px inside` +
                ` | ${pair.iCls.slice(0, 70)} | ${pair.oCls.slice(0, 50)}`,
        );
    }
    return [...lines];
}

async function openPage(page: Page, name: string) {
    await page.goto(`/components/${name}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("main h1").first()).toBeVisible();
    await page.waitForLoadState("networkidle");
}

const PREVIEWS = "main .min-h-\\[100px\\]";

test.describe("nested corner radii", () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test("the scan sees where elements come from, and finds nested pairs", async ({ page }) => {
        // Guards the guard: without Svelte's dev metadata every element would be skipped.
        await openPage(page, "SegmentedControl");
        const pairs = await page.evaluate(scan);
        const segments = pairs.filter(
            (pair) =>
                !pair.square &&
                pair.iFile.endsWith("SegmentedControl.svelte") &&
                pair.oFile?.endsWith("SegmentedControl.svelte"),
        );
        expect(segments.length).toBeGreaterThan(0);
        // The pair the rule was first written down for: 5px in 8px at 3px.
        expect(segments[0]).toMatchObject({ gap: 3, inner: 5, outer: 8 });
        expect(report(segments)).toEqual([]);
    });

    test("the rule itself", () => {
        const pair = (gap: number, inner: number, outer: number, innerRound = false): Pair => ({
            gap, inner, outer, innerRound, iFile: "src/components/a", oFile: "src/components/b", iCls: "", oCls: "", iSize: [0, 0],
        });
        expect(broken(pair(3, 5, 8))).toBe(false);
        expect(broken(pair(1, 15, 16))).toBe(false);
        // Within a pixel either way.
        expect(broken(pair(9, 8, 16))).toBe(false);
        expect(broken(pair(1, 12, 16))).toBe(true);
        expect(broken(pair(9, 8, 12))).toBe(true);
        // Too small an inner radius is as wrong as too large a one.
        expect(broken(pair(2, 2, 12))).toBe(true);
        // A pill only has to fit inside the curve.
        expect(broken(pair(6, 12, 12, true))).toBe(true);
        expect(broken(pair(4, 4, 12, true))).toBe(false);
        expect(broken(pair(4, 8, 12, true))).toBe(false);
        // A square corner is a radius of 0: wrong anywhere inside the curve.
        expect(broken(pair(0, 0, 12))).toBe(true);
        expect(broken(pair(5, 0, 12))).toBe(true);
        expect(broken(pair(11.5, 0, 12))).toBe(false);
    });

    test("a square, painted corner in a library curve is seen, unless the curve clips it", async ({
        page,
    }) => {
        // Guards the guard. Rows with `rounded-none` inside the 12px group used to pass:
        // an element without a radius was skipped altogether.
        // The segments of a SegmentedControl sit 3px inside its 8px corner.
        await openPage(page, "SegmentedControl");
        expect(report(await page.evaluate(scan))).toEqual([]);
        const squared = await page.evaluate(() => {
            const segments = [...document.querySelectorAll<HTMLElement>("main [role='radiogroup'] .segment-face")];
            for (const segment of segments) {
                segment.style.borderRadius = "0";
                // Every face, not only the selected one, draws its box.
                segment.style.backgroundColor = "rgb(128, 128, 128)";
            }
            return segments.length;
        });
        expect(squared).toBeGreaterThan(0);
        const found = report(await page.evaluate(scan));
        expect(found.length).toBeGreaterThan(0);
        expect(found.join("\n")).toContain("SegmentedControl.svelte (square");

        // With the control clipping its content, the same corners are cut at the curve: nothing to report.
        await page.evaluate(() => {
            for (const group of document.querySelectorAll<HTMLElement>("main [role='radiogroup']")) {
                group.style.overflow = "hidden";
            }
        });
        expect(report(await page.evaluate(scan))).toEqual([]);
    });

    for (const name of pages) {
        test(`${name}: nested corners are concentric`, async ({ page }) => {
            await openPage(page, name);
            expect(report(await page.evaluate(scan))).toEqual([]);
        });
    }

    /** Popups and states that only exist once something is opened or chosen. */
    const opened: { name: string; page: string; open: (page: Page) => Locator; root: string }[] = [
        { name: "Modal with a Card inside", page: "Modal", open: (page) => page.locator(PREVIEWS).getByRole("button", { name: "Open modal" }), root: '[role="dialog"]' },
        { name: "ConfirmDialog", page: "ConfirmDialog", open: (page) => page.locator(PREVIEWS).getByRole("button", { name: "Delete project" }), root: '[role="alertdialog"], [role="dialog"]' },
        { name: "Drawer", page: "Drawer", open: (page) => page.locator(PREVIEWS).getByRole("button", { name: "Choose project" }), root: '[role="dialog"]' },
        { name: "SlideUp", page: "SlideUp", open: (page) => page.locator(PREVIEWS).getByRole("button", { name: "Open Slide Up" }), root: '[role="dialog"]' },
        { name: "MediaGrid in a Modal", page: "MediaGrid", open: (page) => page.locator(PREVIEWS).getByRole("button", { name: "Choose from library" }), root: '[role="dialog"]' },
        { name: "Select list", page: "Select", open: (page) => page.locator(PREVIEWS).locator('button[aria-haspopup="listbox"]'), root: '[role="listbox"]' },
        // The last example has a search field above its options: both sit in the panel's corner.
        { name: "Select list with search", page: "Select", open: (page) => page.locator(PREVIEWS).locator('button[aria-haspopup="listbox"]').last(), root: '[role="listbox"]' },
        { name: "Dropdown menu", page: "Dropdown", open: (page) => page.locator(PREVIEWS).getByRole("button", { name: "Project actions" }), root: '[role="menu"]' },
        { name: "NavigationMenu panel", page: "NavigationMenu", open: (page) => page.locator(PREVIEWS).locator("[data-navigation-menu-trigger]", { hasText: "Components" }), root: "[data-navigation-menu-content]" },
        { name: "ColorPicker popover", page: "ColorPicker", open: (page) => page.locator(PREVIEWS).locator("button.w-11").first(), root: '[role="dialog"]' },
        { name: "Toaster toast", page: "Toaster", open: (page) => page.locator(PREVIEWS).getByRole("button", { name: "Push toast with Undo" }), root: "[data-toast-id]" },
    ];

    for (const entry of opened) {
        test(`${entry.name}: nested corners are concentric once open`, async ({ page }) => {
            await openPage(page, entry.page);
            const opener = entry.open(page).first();
            const root = page.locator(entry.root).first();
            // The page is usable before it hydrates, and a second click would close it again.
            await expect(async () => {
                if (!(await root.isVisible())) await opener.click();
                await expect(root).toBeVisible({ timeout: 1_500 });
            }).toPass({ timeout: 30_000 });
            // An entry animation scales or moves the panel: measure it at rest.
            await page.waitForTimeout(500);
            expect(report(await page.evaluate(scan))).toEqual([]);
        });
    }

    /**
     * A row fills its list edge to edge, and in a `.list-group` it is the
     * shell's padding from the shell's edge. Its focus ring is drawn outside
     * the row, so anything on the way out that clips has to leave room for
     * it: the list used to be `overflow-hidden` and left none, and the ring
     * of the first row showed only in the gap under it.
     */
    test("List: a row's focus ring is not cut by the list or its group", async ({ page }) => {
        await openPage(page, "List");
        const group = page.locator(PREVIEWS).locator(".list-group").first();
        const rows = group.locator(".focus-ring");
        expect(await rows.count()).toBeGreaterThan(1);
        for (const row of [rows.first(), rows.last()]) {
            const room = await row.evaluate((element) => {
                const box = element.getBoundingClientRect();
                let least = Infinity;
                for (let ancestor = element.parentElement; ancestor && ancestor !== document.body; ancestor = ancestor.parentElement) {
                    const style = getComputedStyle(ancestor);
                    if (style.overflowX === "visible" && style.overflowY === "visible") continue;
                    const outer = ancestor.getBoundingClientRect();
                    const border = parseFloat(style.borderTopWidth) || 0;
                    least = Math.min(
                        least,
                        box.left - outer.left - border,
                        box.top - outer.top - border,
                        outer.right - border - box.right,
                        outer.bottom - border - box.bottom,
                    );
                }
                return { least };
            });
            // `.focus-ring` is 2px of offset and 2px of ring.
            expect(room.least).toBeGreaterThanOrEqual(4);
        }
    });
});
