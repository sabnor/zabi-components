import { expect, test, type Page } from "@playwright/test";

import { componentsCatalog } from "../src/lib/showcase/components-catalog";

/**
 * The focus ring survives whatever else is on the element.
 *
 * `.focus-ring` draws its ring as a box-shadow from `@layer components`. A
 * Tailwind `shadow-*` or `ring-*` utility on the same element sets box-shadow
 * from `@layer utilities`, which wins: an interactive Card (`shadow-sm`,
 * `shadow-lg` and also `shadow-none`) and the selected SidebarPanel row
 * (`shadow-sm ring-1`) had no keyboard focus indicator at all, and nothing
 * failed, because the class was there. The ring is now handed to the channel
 * those utilities compose (`--tw-ring-offset-shadow`), and this measures the
 * result: every element on every docs page that carries a focus-ring class is
 * focused from the keyboard and must paint the 2px gap and the 2px ring in its
 * own ring colour, next to whatever shadow it has.
 *
 * It also catches a `focus-ring--*` modifier used without `focus-ring`: the
 * modifier only sets a colour, so alone it leaves the browser's default ring.
 *
 * The pages are read from the catalog, so a new component is covered without
 * being added here. Computed styles need a real browser: jsdom has neither
 * cascade layers nor `:focus-visible`.
 */

const pages = [...componentsCatalog.atoms, ...componentsCatalog.molecules, ...componentsCatalog.organisms].map(
    (entry) => entry.name,
);

interface Finding {
    id: string;
    problem: string;
}

async function openPage(page: Page, name: string) {
    await page.goto(`/components/${name}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("main h1").first()).toBeVisible();
    await page.waitForLoadState("networkidle");
}

/** Focuses every ring-carrying element under `main` and reads what it paints. Runs in the page. */
function audit(page: Page): Promise<{ checked: number; findings: Finding[] }> {
    return page.evaluate(() => {
        const probe = document.createElement("div");
        document.body.append(probe);
        const rgb = (value: string) => {
            probe.style.color = "";
            probe.style.color = value;
            return getComputedStyle(probe).color;
        };
        const describe = (element: Element) =>
            `${element.tagName.toLowerCase()}|${(element.getAttribute("aria-label") || element.textContent || "")
                .trim()
                .replace(/\s+/g, " ")
                .slice(0, 30)}|${String(element.getAttribute("class") ?? "").slice(0, 140)}`;

        const findings: { id: string; problem: string }[] = [];
        for (const element of document.querySelectorAll('main [class*="focus-ring--"]:not(.focus-ring)')) {
            findings.push({ id: describe(element), problem: "a focus-ring-- modifier without the focus-ring class" });
        }

        let checked = 0;
        for (const element of document.querySelectorAll<HTMLElement>("main .focus-ring, main .focus-brand, main .focus-nav")) {
            const style = getComputedStyle(element);
            if (style.visibility === "hidden" || style.display === "none") continue;
            if (element.getBoundingClientRect().width === 0) continue;
            if (element.matches(":disabled, [aria-disabled='true']")) continue;
            element.focus({ preventScroll: true });
            // Not focusable (a plain container given the class): nothing to show.
            if (document.activeElement !== element) continue;
            if (!element.matches(":focus-visible")) {
                findings.push({ id: describe(element), problem: "focused from the keyboard but not :focus-visible" });
                continue;
            }
            checked += 1;
            const focused = getComputedStyle(element);
            const shadow = focused.boxShadow;
            const ring = rgb(focused.getPropertyValue("--zabi-focus-ring-color"));
            const gap = rgb(focused.getPropertyValue("--zabi-focus-ring-offset-color"));
            if (!shadow.includes(`${ring} 0px 0px 0px 4px`)) {
                findings.push({ id: describe(element), problem: `no 4px ring in ${ring}; box-shadow is "${shadow}"` });
            } else if (!shadow.includes(`${gap} 0px 0px 0px 2px`)) {
                findings.push({ id: describe(element), problem: `no 2px gap in ${gap}; box-shadow is "${shadow}"` });
            }
            element.blur();
        }
        probe.remove();
        return { checked, findings };
    });
}

test.describe("the focus ring is painted wherever the class is", () => {
    for (const name of pages) {
        test(`${name}: every focus-ring element shows its ring from the keyboard`, async ({ page }) => {
            await openPage(page, name);
            // A row with `transition-all` is still fading its shadow in when it is read.
            await page.addStyleTag({ content: "*, *::before, *::after { transition: none !important; }" });
            // Puts the page in keyboard modality, so a scripted focus() is :focus-visible.
            await page.keyboard.press("Tab");
            const { findings } = await audit(page);
            expect(findings.map((finding) => `${finding.id} — ${finding.problem}`)).toEqual([]);
        });
    }

    /**
     * The class lists an interactive Card and a selected SidebarPanel row end
     * up with, on bare buttons: the docs pages have no interactive Card, and
     * the rule has to hold for combinations no demo happens to show. Every
     * class here is one a component already uses, so the stylesheet has it.
     */
    const COMBINATIONS: { classes: string; elevation: boolean; edge: boolean }[] = [
        { classes: "focus-ring", elevation: false, edge: false },
        { classes: "focus-ring bg-card shadow-sm", elevation: true, edge: false },
        { classes: "focus-ring bg-card shadow-sm hover:shadow-lg", elevation: true, edge: false },
        { classes: "focus-ring bg-card-elevated shadow-lg", elevation: true, edge: false },
        { classes: "focus-ring bg-card border border-border shadow-none", elevation: false, edge: false },
        { classes: "focus-ring ring-1 ring-border", elevation: false, edge: true },
        { classes: "focus-ring focus-ring--nav shadow-sm ring-1 ring-border", elevation: true, edge: true },
        { classes: "focus-ring focus-ring--muted shadow-lg", elevation: true, edge: false },
        { classes: "focus-ring focus-ring--danger shadow-sm", elevation: true, edge: false },
        { classes: "focus-brand shadow-sm", elevation: true, edge: false },
        { classes: "focus-nav shadow-sm", elevation: true, edge: false },
    ];

    for (const dark of [false, true]) {
        test(`a shadow or ring utility composes with the focus ring, ${dark ? "dark" : "light"}`, async ({ page }) => {
            await openPage(page, "Card");
            await page.evaluate((on) => document.documentElement.classList.toggle("dark", on), dark);
            await page.addStyleTag({ content: "*, *::before, *::after { transition: none !important; }" });
            await page.keyboard.press("Tab");
            const results = await page.evaluate((combinations) => {
                const host = document.createElement("div");
                host.style.cssText = "display:grid;gap:24px;padding:24px";
                document.querySelector("main")!.append(host);
                const probe = document.createElement("div");
                host.append(probe);
                const rgb = (value: string) => {
                    probe.style.color = "";
                    probe.style.color = value;
                    return getComputedStyle(probe).color;
                };
                return combinations.map(({ classes }) => {
                    const button = document.createElement("button");
                    button.className = classes;
                    button.textContent = classes;
                    host.append(button);
                    const rest = getComputedStyle(button).boxShadow;
                    button.focus({ preventScroll: true });
                    const style = getComputedStyle(button);
                    return {
                        classes,
                        rest,
                        focused: style.boxShadow,
                        visible: button.matches(":focus-visible"),
                        ring: rgb(style.getPropertyValue("--zabi-focus-ring-color")),
                        gap: rgb(style.getPropertyValue("--zabi-focus-ring-offset-color")),
                    };
                });
            }, COMBINATIONS);

            for (const [index, result] of results.entries()) {
                const { elevation, edge } = COMBINATIONS[index];
                expect(result.visible, result.classes).toBe(true);
                expect(result.rest, `${result.classes}: no ring at rest`).not.toContain("0px 0px 0px 4px");
                // Today's geometry: a 2px gap in the offset colour, then 2px of ring.
                expect(result.focused, result.classes).toContain(`${result.gap} 0px 0px 0px 2px`);
                expect(result.focused, result.classes).toContain(`${result.ring} 0px 0px 0px 4px`);
                // The gap is listed before the ring, so it is painted over it.
                expect(result.focused.indexOf("0px 0px 0px 2px"), result.classes).toBeLessThan(
                    result.focused.indexOf("0px 0px 0px 4px"),
                );
                // An elevation shadow has a blur, the third length after the colour; the ring, its gap and a 1px edge do not.
                expect(/\) -?\d+px -?\d+px [1-9]\d*px/.test(result.focused), `${result.classes}: elevation kept`).toBe(elevation);
                expect(result.focused.includes("0px 0px 0px 1px"), `${result.classes}: 1px edge kept`).toBe(edge);
            }
            // The three variants are three colours, and none is the default ring.
            const ringOf = (classes: string) => results.find((result) => result.classes === classes)!.ring;
            expect(
                new Set([
                    ringOf("focus-ring"),
                    ringOf("focus-ring focus-ring--muted shadow-lg"),
                    ringOf("focus-ring focus-ring--danger shadow-sm"),
                ]).size,
            ).toBe(3);
        });
    }

    test("a forced-colours focus is an outline, with or without a shadow utility", async ({ page }) => {
        await page.emulateMedia({ forcedColors: "active" });
        await openPage(page, "Card");
        await page.keyboard.press("Tab");
        const outlines = await page.evaluate(() =>
            ["focus-ring", "focus-ring bg-card shadow-sm", "focus-ring ring-1 ring-border"].map((classes) => {
                const button = document.createElement("button");
                button.className = classes;
                button.textContent = classes;
                document.querySelector("main")!.append(button);
                button.focus({ preventScroll: true });
                const style = getComputedStyle(button);
                return { classes, outline: style.outlineStyle, width: style.outlineWidth, offset: style.outlineOffset };
            }),
        );
        for (const outline of outlines) {
            expect(outline).toEqual({ classes: outline.classes, outline: "solid", width: "2px", offset: "2px" });
        }
    });
});
