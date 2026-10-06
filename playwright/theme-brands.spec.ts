import { expect, test, type Page } from "@playwright/test";

import { gotoHydrated, waitForHydration } from "./helpers/hydration";

/**
 * The two-brand proof: real component pages under the default brand and under
 * Amber, in light and dark, at desktop width and at 375px.
 *
 * Amber is not a fixture. It is what `createTheme` returns for the inputs in
 * src/lib/marketing/brand-inputs.ts (a warm brand colour, a warm neutral and a
 * serif heading face), built when the dev server starts and put on the
 * document by `?brand=amber`, the same way the switcher in the top bar does
 * it: as `--zabi-*` ramp overrides on the root element, one set for both
 * modes.
 *
 * Everything is read from computed styles of the components themselves. There
 * are no screenshots: the repo has no baseline workflow, and what is being
 * proved is that the roles follow the ramps, which a colour value says
 * exactly.
 */

const PAGES = [
    "/components/Button",
    "/components/Modal",
    "/components/ConfirmDialog",
    "/components/EmptyState",
    "/theming",
];

const WIDTHS = [
    { name: "desktop", width: 1280, height: 900 },
    { name: "375px", width: 375, height: 812 },
];

type Brand = "default" | "amber";
type Mode = "light" | "dark";

interface Reading {
    /** Background of the first primary button on the page. */
    fill: string;
    /** Its text colour. */
    label: string;
    /** The outer ring of its focus style. */
    focusRing: string;
    /** Background of the first card. */
    card: string;
    /** The page behind it. */
    page: string;
    /** Font family of the first component heading. */
    headingFont: string;
    /** Font family of the first marketing heading (`.display`), where the page has one. */
    displayFont: string | null;
}

type Rgb = [number, number, number];

/** Readings are normalised to `rgb(r, g, b)` in the page; see `read`. */
function parseColour(value: string): Rgb {
    const rgb = /^rgb\((\d+), (\d+), (\d+)\)$/.exec(value);
    if (!rgb) throw new Error(`not a colour: ${value}`);
    return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
}

function luminance([r, g, b]: Rgb): number {
    const [lr, lg, lb] = [r, g, b].map((channel) => {
        const v = channel / 255;
        return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

function contrast(a: string, b: string): number {
    const [hi, lo] = [luminance(parseColour(a)), luminance(parseColour(b))].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
}

/** Largest channel difference, so "changed" means visibly, not by rounding. */
function distance(a: string, b: string): number {
    const [x, y] = [parseColour(a), parseColour(b)];
    return Math.max(...x.map((channel, i) => Math.abs(channel - y[i])));
}

async function open(page: Page, path: string, brand: Brand, mode: Mode): Promise<void> {
    // The site's own boot script reads this and puts the `dark` class on <html>.
    await page.addInitScript((theme) => localStorage.setItem("theme", theme), mode);
    await page.goto(brand === "amber" ? `${path}?brand=amber` : path, {
        waitUntil: "domcontentloaded",
    });
    // Three things have to be over before a colour is read, and each says so:
    // the page has hydrated; the switcher in the top bar has put the brand on
    // the root element, which it does after hydrating and reports in
    // `data-brand` (the default brand is "iris"); and the colours have
    // arrived, see `settled`.
    await waitForHydration(page);
    await expect(page.locator("html")).toHaveAttribute("data-brand", brand === "amber" ? "amber" : "iris");
    expect(
        await page.evaluate(() => document.documentElement.style.getPropertyValue("--zabi-brand-600") !== ""),
        "The ramps are on the root element for a generated brand, and only then",
    ).toBe(brand === "amber");
    await expect
        .poll(() => page.evaluate(() => document.documentElement.classList.contains("dark")))
        .toBe(mode === "dark");
    await settled(page);
}

/**
 * Resolves once every colour that is on its way to another has arrived.
 *
 * Buttons, fields and links change colour over 150 to 200ms. When the brand
 * goes on, or focus arrives, a computed colour read straight away is the old
 * one, or one in between: a primary fill read as the brand went on was the
 * default brand's, and "the two brands differ" failed with a difference of 0.
 *
 * It takes the transitions that are running when it is called and looks at
 * them once a frame until none of those is running. Not their `finished`
 * promises: with the brand going on, one transition on the theming page ends
 * (`playState` "finished") with that promise never settled.
 */
async function settled(page: Page): Promise<void> {
    await page.evaluate(async () => {
        const easing = document.getAnimations().filter((animation) => animation instanceof CSSTransition);
        while (easing.some((animation) => animation.playState === "running" || animation.pending)) {
            await new Promise(requestAnimationFrame);
        }
    });
}

async function read(page: Page): Promise<Reading> {
    const primary = page.locator("main .bg-action-primary:visible").first();
    await expect(primary).toBeVisible();
    // A key press first, so the focus that follows counts as keyboard focus
    // and the ring is drawn.
    //
    // `open` has waited for hydration, which puts new elements in place of
    // some that the server sent (EmptyState's root is a `<svelte:element>`,
    // and its preview is built again): a button focused before that was gone,
    // with focus back on `<body>`. Focused after it, the button keeps it.
    await page.keyboard.press("Shift");
    await primary.focus();
    await expect(primary, "The primary button must hold focus").toBeFocused();
    await settled(page);
    return readFocused(page);
}

function readFocused(page: Page): Promise<Reading> {
    return page.evaluate(() => {
        const visible = (el: Element) => {
            const box = el.getBoundingClientRect();
            return box.width > 0 && box.height > 0 && getComputedStyle(el).visibility !== "hidden";
        };
        // A computed colour is `rgb()`, `color(srgb …)` for a `color-mix()`
        // surface, or `oklab()` for a Tailwind opacity modifier. Painting it
        // gives the sRGB bytes whichever it is.
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        const context = canvas.getContext("2d", { willReadFrequently: true })!;
        const pixel = (colour: string) => {
            context.clearRect(0, 0, 1, 1);
            context.fillStyle = colour;
            context.fillRect(0, 0, 1, 1);
            return context.getImageData(0, 0, 1, 1).data;
        };
        const rgb = (colour: string) => {
            const [r, g, b] = pixel(colour);
            return `rgb(${r}, ${g}, ${b})`;
        };
        const opaque = (el: Element) => pixel(getComputedStyle(el).backgroundColor)[3] === 255;
        const first = (selector: string) => {
            const found = [...document.querySelectorAll(selector)].find(
                (el) => visible(el) && opaque(el),
            );
            if (!found) throw new Error(`nothing visible and opaque matches ${selector}`);
            return found;
        };
        const button = document.activeElement as HTMLElement;
        const style = getComputedStyle(button);
        // `… <gap> 0 0 0 2px, <ring> 0 0 0 4px, …`: the ring is the shadow with the
        // 4px spread. It is no longer the last one: the list also carries the
        // element's own shadow utilities, empty or not.
        const ring = style.boxShadow.match(/((?:rgba?|color)\([^)]+\)) 0px 0px 0px 4px/)?.[1];
        // Both kinds of heading take --font-family-heading: a component
        // heading through the base layer, a marketing heading (`.display`)
        // through the site's own rule.
        const headings = [...document.querySelectorAll("main h1, main h2, main h3")].filter(visible);
        const heading = headings.find((el) => !el.classList.contains("display"));
        const display = headings.find((el) => el.classList.contains("display"));
        if (!heading) throw new Error("no component heading on the page");
        if (!ring) throw new Error(`no focus ring on the primary button: ${style.boxShadow}`);
        return {
            fill: rgb(style.backgroundColor),
            label: rgb(style.color),
            focusRing: rgb(ring),
            card: rgb(getComputedStyle(first("main .bg-card, main .bg-surface-raised")).backgroundColor),
            page: rgb(getComputedStyle(first(".bg-background, .bg-surface-base")).backgroundColor),
            headingFont: getComputedStyle(heading).fontFamily,
            displayFont: display ? getComputedStyle(display).fontFamily : null,
        };
    });
}

for (const viewport of WIDTHS) {
    test.describe(`two brands, ${viewport.name}`, () => {
        test.use({ viewport: { width: viewport.width, height: viewport.height } });

        for (const path of PAGES) {
            test(`${path} follows the brand in light and dark`, async ({ page }) => {
                const readings = {} as Record<Mode, Record<Brand, Reading>>;
                for (const mode of ["light", "dark"] as const) {
                    readings[mode] = {} as Record<Brand, Reading>;
                    for (const brand of ["default", "amber"] as const) {
                        await open(page, path, brand, mode);
                        readings[mode][brand] = await read(page);
                    }
                }

                for (const mode of ["light", "dark"] as const) {
                    const { default: base, amber } = readings[mode];
                    const where = `${path}, ${mode}`;

                    // The label on the primary fill, in all four combinations.
                    for (const [brand, reading] of Object.entries(readings[mode])) {
                        expect(
                            contrast(reading.label, reading.fill),
                            `${where}, ${brand}: ${reading.label} on ${reading.fill}`,
                        ).toBeGreaterThanOrEqual(4.5);
                        expect(
                            contrast(reading.focusRing, reading.page),
                            `${where}, ${brand}: focus ring ${reading.focusRing} on ${reading.page}`,
                        ).toBeGreaterThanOrEqual(3);
                    }

                    expect(distance(base.fill, amber.fill), `${where}: primary fill`).toBeGreaterThan(40);
                    expect(distance(base.focusRing, amber.focusRing), `${where}: focus ring`).toBeGreaterThan(40);
                    // The neutrals are a tint, so the page moves a little, but it moves.
                    expect(distance(base.page, amber.page), `${where}: page surface`).toBeGreaterThan(1);
                    expect(amber.headingFont, `${where}: heading font`).not.toBe(base.headingFont);
                    expect(amber.headingFont).toContain("Georgia");
                    // The site's own display face is its value for the same
                    // token, so the marketing headings follow the brand too.
                    expect(base.headingFont, `${where}: default heading font`).toContain("Familjen Grotesk");
                    if (path === "/theming") {
                        expect(base.displayFont, `${where}: default marketing heading`).toContain("Familjen Grotesk");
                        expect(amber.displayFont, `${where}: marketing heading`).toContain("Georgia");
                    } else {
                        expect(base.displayFont).toBeNull();
                    }
                }

                // Two roles are the same in light whatever the brand: a raised
                // card is white, and the generator keeps a white label wherever
                // white reaches 4.5:1. Both come from the ramps in dark.
                expect(readings.light.amber.card).toBe(readings.light.default.card);
                expect(
                    distance(readings.dark.default.card, readings.dark.amber.card),
                    `${path}: dark card surface`,
                ).toBeGreaterThan(1);
                expect(
                    distance(readings.dark.default.label, readings.dark.amber.label),
                    `${path}: dark label on the primary fill`,
                ).toBeGreaterThan(10);

                // And the mode itself changed something, so "dark" was dark.
                expect(distance(readings.light.amber.page, readings.dark.amber.page)).toBeGreaterThan(100);
            });
        }
    });
}

test.describe("data-theme on the dev site", () => {
    /**
     * The published files carry the dark tokens under `[data-theme]` as well as
     * `.dark`. The dev site reads src/app.css, which has only `.dark`;
     * postcss.config.cjs adds the same selectors.
     */
    const tokens = () =>
        ["--color-surface-base", "--color-brand-600", "--color-on-brand", "--color-headline"].map(
            (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
        );

    async function withRoot(
        page: Page,
        root: { darkClass?: boolean; dataTheme?: string },
    ): Promise<string[]> {
        // Hydrated, so the stylesheets are in: read as soon as the document
        // was parsed, every token was the empty string now and then.
        await gotoHydrated(page, "/components/Button");
        await page.evaluate(({ darkClass, dataTheme }) => {
            const html = document.documentElement;
            html.classList.toggle("dark", !!darkClass);
            if (dataTheme) html.dataset.theme = dataTheme;
            else html.removeAttribute("data-theme");
        }, root);
        return page.evaluate(tokens);
    }

    test('data-theme="dark" resolves the same tokens as the dark class', async ({ page }) => {
        await page.emulateMedia({ colorScheme: "light" });
        const light = await withRoot(page, {});
        const byClass = await withRoot(page, { darkClass: true });
        const byAttribute = await withRoot(page, { dataTheme: "dark" });
        expect(byAttribute).toEqual(byClass);
        expect(byAttribute).not.toEqual(light);
    });

    test('data-theme="auto" follows the system, and nothing else does', async ({ page }) => {
        await page.emulateMedia({ colorScheme: "dark" });
        const dark = await withRoot(page, { darkClass: true });
        const bare = await withRoot(page, {});
        expect(await withRoot(page, { dataTheme: "auto" })).toEqual(dark);
        expect(await withRoot(page, { dataTheme: "light" })).toEqual(bare);
        expect(bare).not.toEqual(dark);

        await page.emulateMedia({ colorScheme: "light" });
        expect(await withRoot(page, { dataTheme: "auto" })).toEqual(bare);
    });

    /**
     * `color-scheme` is what turns the browser's own parts dark: a date
     * picker, a scrollbar, autofill. The dark class did not set it, so a page
     * switched with `.dark` kept light ones on dark surfaces. It now comes
     * with the dark tokens, under every selector they are published under.
     */
    test("color-scheme goes wherever the dark tokens go", async ({ page }) => {
        const scheme = async (root: { darkClass?: boolean; dataTheme?: string }) => {
            await withRoot(page, root);
            return page.evaluate(() => {
                // The dev site's own inline style, set before first paint (src/app.html).
                document.documentElement.style.colorScheme = "";
                const html = getComputedStyle(document.documentElement).colorScheme;
                // What a native control resolves: `light dark` means "follow the system".
                const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const used = html === "light dark" ? (dark ? "dark" : "light") : html;
                const page = getComputedStyle(document.documentElement).getPropertyValue("--color-surface-base").trim();
                return { used, page };
            });
        };

        await page.emulateMedia({ colorScheme: "light" });
        const light = await scheme({ dataTheme: "light" });
        const dark = await scheme({ darkClass: true });
        expect(light.used).toBe("light");
        expect(dark.used).toBe("dark");
        expect((await scheme({ dataTheme: "dark" })).used).toBe("dark");
        expect((await scheme({ dataTheme: "auto" })).used).toBe("light");
        // Both at once: the class brings the dark tokens, so it brings the dark scheme.
        for (const dataTheme of ["light", "auto"]) {
            const both = await scheme({ darkClass: true, dataTheme });
            expect(both.page, dataTheme).toBe(dark.page);
            expect(both.used, dataTheme).toBe("dark");
        }

        await page.emulateMedia({ colorScheme: "dark" });
        expect((await scheme({ dataTheme: "auto" })).used).toBe("dark");
        // Asking for light holds on a dark system.
        const forced = await scheme({ dataTheme: "light" });
        expect(forced.used).toBe("light");
        expect(forced.page).toBe(light.page);
    });
});

/**
 * Placeholder text against the value text of the same kind of field.
 *
 * `--color-input-placeholder` is held to 4.5:1 on every fill of a field, which
 * made it stronger than the text of a disabled field
 * (`--color-action-disabled-text`): an empty disabled field then read as the
 * filled one. And Select wrote its placeholder in `text-description`, which
 * in dark is 1.16:1 from the value text.
 */
test.describe("placeholder against value", () => {
    const PREVIEWS = "main .min-h-\\[100px\\]";

    for (const mode of ["light", "dark"] as const) {
        test(`${mode}: a disabled field's placeholder is the disabled text colour`, async ({ page }) => {
            // The disabled example has a hex field with a placeholder and no value.
            await open(page, "/components/ColorPicker", "default", mode);
            const field = page.locator(`${PREVIEWS} input[type="text"]:disabled`).first();
            await expect(field).toBeVisible();
            const colours = await field.evaluate((input) => {
                // What a token resolves to here, in the form computed styles are given in.
                const token = (host: Element, name: string) => {
                    const probe = document.createElement("span");
                    probe.style.color = `var(${name})`;
                    host.append(probe);
                    const colour = getComputedStyle(probe).color;
                    probe.remove();
                    return colour;
                };
                return {
                    text: (input as HTMLInputElement).placeholder,
                    value: (input as HTMLInputElement).value,
                    placeholder: getComputedStyle(input, "::placeholder").color,
                    field: getComputedStyle(input).color,
                    disabled: token(input.parentElement!, "--color-action-disabled-text"),
                    enabled: token(input.parentElement!, "--color-input-placeholder"),
                };
            });
            expect(colours.text).not.toBe("");
            expect(colours.value).toBe("");
            expect(colours.placeholder).toBe(colours.disabled);
            // The colour a value would have in this field.
            expect(colours.placeholder).toBe(colours.field);
            expect(colours.placeholder).not.toBe(colours.enabled);
        });

        test(`${mode}: an empty Select shows its placeholder in the placeholder colour`, async ({ page }) => {
            await open(page, "/components/Select", "default", mode);
            const trigger = page.locator(`${PREVIEWS} button[aria-haspopup="listbox"]`).first();
            await expect(trigger).toHaveText("Choose an option");
            const colours = await trigger.evaluate((button) => {
                const token = (host: Element, name: string) => {
                    const probe = document.createElement("span");
                    probe.style.color = `var(${name})`;
                    host.append(probe);
                    const colour = getComputedStyle(probe).color;
                    probe.remove();
                    return colour;
                };
                return {
                    shown: getComputedStyle(button.querySelector("span")!).color,
                    placeholder: token(button.parentElement!, "--color-input-placeholder"),
                    value: token(button.parentElement!, "--color-body"),
                };
            });
            expect(colours.shown).toBe(colours.placeholder);
            expect(colours.shown).not.toBe(colours.value);
        });
    }
});

/**
 * The docs site itself, which is switched by the `dark` class. Its start-up
 * script used to write an inline `color-scheme` on `<html>` and the page
 * carried `<meta name="color-scheme" content="light dark">`, both to make the
 * browser's own parts agree with the tokens. The theme now says the scheme in
 * both directions (`:root` light, `.dark` dark), so the script only adds the
 * class and the meta tag is gone.
 */
test.describe("the docs site: native controls match the theme, and the first paint is right", () => {
    const cases: { name: string; system: "light" | "dark"; stored: string | null; dark: boolean }[] = [
        { name: "a dark system, light chosen", system: "dark", stored: "light", dark: false },
        { name: "a light system, dark chosen", system: "light", stored: "dark", dark: true },
        { name: "a dark system, nothing chosen", system: "dark", stored: null, dark: true },
        { name: "a light system, nothing chosen", system: "light", stored: null, dark: false },
    ];

    for (const { name, system, stored, dark } of cases) {
        test(`${name}: ${dark ? "dark" : "light"} tokens and a ${dark ? "dark" : "light"} scheme, from the first paint`, async ({ page }) => {
            await page.emulateMedia({ colorScheme: system });
            if (stored) await page.addInitScript((value) => localStorage.setItem("theme", value), stored);
            // Records what the page is the moment <body> starts: before any
            // component, and before anything could have been painted.
            await page.route("**/components/DateField", async (route) => {
                const response = await route.fetch();
                const html = await response.text();
                expect(html).toContain("<body");
                await route.fulfill({
                    response,
                    body: html.replace(
                        /<body([^>]*)>/,
                        `<body$1><script>window.__atBody = {
                            dark: document.documentElement.classList.contains("dark"),
                            scheme: getComputedStyle(document.documentElement).colorScheme,
                            page: getComputedStyle(document.documentElement).getPropertyValue("--color-surface-base").trim(),
                        };</script>`,
                    ),
                });
            });
            await page.goto("/components/DateField", { waitUntil: "domcontentloaded" });
            await expect(page.locator("main h1").first()).toBeVisible();

            const now = await page.evaluate(() => ({
                dark: document.documentElement.classList.contains("dark"),
                scheme: getComputedStyle(document.documentElement).colorScheme,
                page: getComputedStyle(document.documentElement).getPropertyValue("--color-surface-base").trim(),
                inline: document.documentElement.style.colorScheme,
                meta: document.querySelector('meta[name="color-scheme"]')?.getAttribute("content") ?? null,
                // What a native date field inside the page resolves.
                field: getComputedStyle(document.querySelector('main input[type="date"]')!).colorScheme,
                atBody: (window as unknown as { __atBody: { dark: boolean; scheme: string; page: string } }).__atBody,
            }));

            expect(now.dark).toBe(dark);
            expect(now.scheme).toBe(dark ? "dark" : "light");
            expect(now.field).toBe(dark ? "dark" : "light");
            // Nothing but the stylesheet says so.
            expect(now.inline).toBe("");
            expect(now.meta).toBeNull();
            // And it said so before <body>: same class, same scheme, same page colour.
            expect(now.atBody).toEqual({ dark: now.dark, scheme: now.scheme, page: now.page });
            expect(now.page).not.toBe("");
        });
    }

    test("the app adding or removing the dark class itself moves the scheme with the tokens, also after the toggle was pressed", async ({ page }) => {
        await page.emulateMedia({ colorScheme: "light" });
        await gotoHydrated(page, "/components/ThemeToggle");
        const toggle = page.locator("main .min-h-\\[100px\\]").getByRole("button", { name: "Dark mode", exact: true }).first();
        await toggle.click();
        await toggle.click();
        await expect(toggle).toHaveAttribute("aria-pressed", "false");
        const scheme = () => page.evaluate(() => getComputedStyle(document.documentElement).colorScheme);
        expect(await scheme()).toBe("light");
        // The press used to leave an inline "light" behind, which then outranked `.dark`.
        await page.evaluate(() => document.documentElement.classList.add("dark"));
        expect(await scheme()).toBe("dark");
        await expect(toggle).toHaveAttribute("aria-pressed", "true");
        await page.evaluate(() => document.documentElement.classList.remove("dark"));
        expect(await scheme()).toBe("light");
    });
});
