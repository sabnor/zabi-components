import { expect, test, type Locator, type Page } from "@playwright/test";

import { gotoHydrated, holdScripts, waitForHydration } from "./helpers/hydration";

/**
 * A value chosen before hydration survives it.
 *
 * A server-rendered page can be used before its scripts arrive: a checkbox
 * can be ticked, a star chosen, a name typed. A native input that Svelte
 * binds keeps that through hydration, because the binding reads the input
 * when it finds it changed. Checkbox, Radio, RadioGroup, Rating and
 * SegmentedControl set `checked` from their own state instead and listened
 * for `change`, so hydration wrote the page's (still empty) state over the
 * visitor's choice: focus stayed, the tick did not.
 *
 * Each test here holds the page's scripts, changes a control in the server
 * markup, releases the scripts and waits for hydration. The choice must still
 * be shown, be the bound value, have been reported once to the change
 * callback, and the control must go on working.
 *
 * The lab pages are /chaos-lab/hydration-value and /chaos-lab/hydration-undefined.
 */

const LAB = "/chaos-lab/hydration-value";

const lab = (page: Page, name: string) => page.locator(`[data-lab="${name}"]`);
const value = (page: Page, name: string) => page.getByTestId(`${name}-value`);
const calls = (page: Page, name: string) => page.getByTestId(`${name}-calls`);

/** Opens the lab with its scripts held. The markup is there, and nothing answers yet. */
async function openUnhydrated(page: Page, url = LAB) {
    const release = await holdScripts(page);
    await page.goto(url, { waitUntil: "commit" });
    await expect(page.locator("main h1")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.dataset.zabiHydrated)).toBeUndefined();
    return async () => {
        await release();
        await waitForHydration(page);
    };
}

const star = (group: Locator, stars: number) => group.getByRole("radio", { name: `${stars} of 5 stars` });
/** A star's radio is visually hidden; the label around it is what a pointer hits. */
const starTarget = (group: Locator, stars: number) => group.locator(".rating-star").nth(stars - 1);

test.describe("a choice made before hydration is kept", () => {
    test("a native bound checkbox, for comparison", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        await page.getByTestId("native").click();
        await hydrate();
        await expect(page.getByTestId("native")).toBeChecked();
        await expect(value(page, "native")).toHaveText("true");
    });

    test("Checkbox: ticked before hydration", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        const box = lab(page, "checkbox").getByRole("checkbox");
        await box.click();
        await expect(box).toBeChecked();
        await hydrate();

        await expect(box).toBeChecked();
        await expect(value(page, "checkbox")).toHaveText("true");
        await expect(calls(page, "checkbox")).toHaveText("1");
        // And it goes on working.
        await box.click();
        await expect(box).not.toBeChecked();
        await expect(value(page, "checkbox")).toHaveText("false");
        await expect(calls(page, "checkbox")).toHaveText("2");
    });

    test("Checkbox: unticked before hydration", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        const box = lab(page, "checkbox-on").getByRole("checkbox");
        await expect(box).toBeChecked();
        await box.click();
        await hydrate();

        await expect(box).not.toBeChecked();
        await expect(value(page, "checkbox-on")).toHaveText("false");
        await expect(calls(page, "checkbox-on")).toHaveText("1");
    });

    test("Checkbox: a parent that only listens learns of the choice", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        const box = lab(page, "checkbox-listened").getByRole("checkbox");
        await box.click();
        await hydrate();

        await expect(box).toBeChecked();
        await expect(value(page, "checkbox-listened")).toHaveText("true");
        await expect(calls(page, "checkbox-listened")).toHaveText("1");
    });

    test("Checkbox: left alone, nothing is reported", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        await hydrate();
        for (const name of ["checkbox", "checkbox-on", "checkbox-listened", "radio", "rating", "rating-preset", "segmented", "segmented-preset"]) {
            await expect(calls(page, name), name).toHaveText("0");
        }
        await expect(value(page, "checkbox")).toHaveText("false");
        await expect(value(page, "checkbox-on")).toHaveText("true");
        await expect(value(page, "rating-preset")).toHaveText("2");
        await expect(value(page, "segmented-preset")).toHaveText("s");
        await expect(value(page, "radio-group-preset")).toHaveText("no");
    });

    test("Radio: chosen before hydration", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        const b = lab(page, "radio").getByRole("radio", { name: "Option B" });
        const a = lab(page, "radio").getByRole("radio", { name: "Option A" });
        await b.click();
        await hydrate();

        await expect(b).toBeChecked();
        await expect(value(page, "radio")).toHaveText("b");
        await expect(calls(page, "radio")).toHaveText("1");
        await a.click();
        await expect(a).toBeChecked();
        await expect(b).not.toBeChecked();
    });

    test("RadioGroup: chosen before hydration", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        const group = lab(page, "radio-group");
        await group.getByRole("radio", { name: "No" }).click();
        await hydrate();

        await expect(group.getByRole("radio", { name: "No" })).toBeChecked();
        await expect(value(page, "radio-group")).toHaveText("no");
        // The chosen radio is the group's Tab stop, and the arrows go on from it.
        await expect(group.getByRole("radio", { name: "No" })).toHaveAttribute("tabindex", "0");
        await group.getByRole("radio", { name: "No" }).focus();
        await page.keyboard.press("ArrowDown");
        await expect(group.getByRole("radio", { name: "Maybe" })).toBeChecked();
        await expect(value(page, "radio-group")).toHaveText("maybe");
    });

    test("RadioGroup: another choice than the one the page came with", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        const group = lab(page, "radio-group-preset");
        await expect(group.getByRole("radio", { name: "No" })).toBeChecked();
        await group.getByRole("radio", { name: "Yes" }).click();
        await hydrate();

        await expect(group.getByRole("radio", { name: "Yes" })).toBeChecked();
        await expect(group.getByRole("radio", { name: "No" })).not.toBeChecked();
        await expect(value(page, "radio-group-preset")).toHaveText("yes");
    });

    test("Rating: stars given before hydration, and a repeat press never clears them", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        const group = lab(page, "rating");
        await starTarget(group, 4).click();
        await expect(star(group, 4)).toBeChecked();
        await hydrate();

        await expect(star(group, 4)).toBeChecked();
        await expect(value(page, "rating")).toHaveText("4");
        await expect(calls(page, "rating")).toHaveText("1");
        // The first four stars are drawn filled.
        expect(await group.locator(".rating-star[data-on]").count()).toBe(4);

        await starTarget(group, 4).click();
        await expect(value(page, "rating")).toHaveText("4");
        await expect(calls(page, "rating")).toHaveText("1");
        await starTarget(group, 2).click();
        await expect(value(page, "rating")).toHaveText("2");
        await expect(calls(page, "rating")).toHaveText("2");
    });

    test("Rating: another score than the one the page came with", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        const group = lab(page, "rating-preset");
        await expect(star(group, 2)).toBeChecked();
        await starTarget(group, 5).click();
        await hydrate();

        await expect(star(group, 5)).toBeChecked();
        await expect(value(page, "rating-preset")).toHaveText("5");
        await expect(calls(page, "rating-preset")).toHaveText("1");
    });

    test("Rating: a parent that only listens learns of the score", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        const group = lab(page, "rating-listened");
        await starTarget(group, 3).click();
        await hydrate();

        await expect(star(group, 3)).toBeChecked();
        await expect(value(page, "rating-listened")).toHaveText("3");
        await expect(calls(page, "rating-listened")).toHaveText("1");
    });

    test("SegmentedControl: chosen before hydration, and a repeat press never clears it", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        const group = lab(page, "segmented");
        await group.getByText("Medium", { exact: true }).click();
        await hydrate();

        await expect(group.getByRole("radio", { name: "Medium" })).toBeChecked();
        await expect(value(page, "segmented")).toHaveText("m");
        await expect(calls(page, "segmented")).toHaveText("1");
        await expect(group.getByRole("radio", { name: "Medium" })).toHaveAttribute("tabindex", "0");

        await group.getByText("Medium", { exact: true }).click();
        await expect(value(page, "segmented")).toHaveText("m");
        await expect(calls(page, "segmented")).toHaveText("1");
        await group.getByText("Large", { exact: true }).click();
        await expect(value(page, "segmented")).toHaveText("l");
        await expect(calls(page, "segmented")).toHaveText("2");
    });

    test("SegmentedControl: another segment than the one the page came with", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        const group = lab(page, "segmented-preset");
        await expect(group.getByRole("radio", { name: "Small" })).toBeChecked();
        await group.getByText("Large", { exact: true }).click();
        await hydrate();

        await expect(group.getByRole("radio", { name: "Large" })).toBeChecked();
        await expect(group.getByRole("radio", { name: "Small" })).not.toBeChecked();
        await expect(value(page, "segmented-preset")).toHaveText("l");
        await expect(calls(page, "segmented-preset")).toHaveText("1");
    });

    test("without a name the radios are still one group: a second choice replaces the first, before hydration too", async ({
        page,
    }) => {
        const hydrate = await openUnhydrated(page);
        const segments = lab(page, "segmented-loose");
        const stars = lab(page, "rating-loose");
        await segments.getByText("Large", { exact: true }).click();
        await starTarget(stars, 5).click();
        // In the server markup already: one checked radio in each, not two.
        await expect(segments.getByRole("radio", { checked: true })).toHaveCount(1);
        await expect(stars.getByRole("radio", { checked: true })).toHaveCount(1);
        await hydrate();

        await expect(segments.getByRole("radio", { name: "Large" })).toBeChecked();
        await expect(value(page, "segmented-loose")).toHaveText("l");
        await expect(star(stars, 5)).toBeChecked();
        await expect(value(page, "rating-loose")).toHaveText("5");

        // Not submitted: the name is the component's own, and it is kept out of the form.
        // The same goes for a RadioGroup without a name.
        await lab(page, "radio-group").getByRole("radio", { name: "Yes" }).click();
        const fields = await page.getByTestId("lab-form").evaluate((form: HTMLFormElement) => [...new FormData(form).keys()]);
        expect(fields).toEqual(expect.arrayContaining(["food", "preset-size", "preset-answer"]));
        expect(fields.some((key) => /^(rating|segmented|radiogroup)-/.test(key))).toBe(false);
    });

    test("everything at once: each choice is kept beside the others", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        await lab(page, "checkbox").getByRole("checkbox").click();
        await lab(page, "radio").getByRole("radio", { name: "Option A" }).click();
        await lab(page, "radio-group").getByRole("radio", { name: "Maybe" }).click();
        await starTarget(lab(page, "rating"), 5).click();
        await lab(page, "segmented").getByText("Small", { exact: true }).click();
        await hydrate();

        await expect(value(page, "checkbox")).toHaveText("true");
        await expect(value(page, "radio")).toHaveText("a");
        await expect(value(page, "radio-group")).toHaveText("maybe");
        await expect(value(page, "rating")).toHaveText("5");
        await expect(value(page, "segmented")).toHaveText("s");
    });
});

test.describe("text, range, date and time typed before hydration are the bound value", () => {
    test("Input and Textarea", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        await page.getByTestId("input").fill("Ada Lovelace");
        await page.getByTestId("textarea").fill("Two lines\nof notes");
        await hydrate();

        await expect(page.getByTestId("input")).toHaveValue("Ada Lovelace");
        await expect(value(page, "input")).toHaveText("Ada Lovelace");
        await expect(page.getByTestId("textarea")).toHaveValue("Two lines\nof notes");
        await expect(value(page, "textarea")).toHaveText("Two lines of notes");
        // And typing goes on from there.
        await page.getByTestId("input").evaluate((field: HTMLInputElement) => {
            field.focus();
            field.setSelectionRange(field.value.length, field.value.length);
        });
        await page.keyboard.type("!");
        await expect(value(page, "input")).toHaveText("Ada Lovelace!");
    });

    test("Select: an option picked in the native select of the server markup", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        const native = lab(page, "select").locator("select");
        await expect(native).toBeVisible();
        await native.selectOption("no");
        await hydrate();

        await expect(value(page, "select")).toHaveText("no");
        await expect(lab(page, "select")).toContainText("No");
    });

    test("Slider", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        const slider = page.getByTestId("slider");
        await slider.focus();
        for (let step = 0; step < 5; step += 1) await page.keyboard.press("ArrowRight");
        await expect(slider).toHaveValue("25");
        await hydrate();

        await expect(slider).toHaveValue("25");
        await expect(value(page, "slider")).toHaveText("25");
        await page.keyboard.press("ArrowRight");
        await expect(value(page, "slider")).toHaveText("26");
    });

    test("DateField and TimeField", async ({ page }) => {
        const hydrate = await openUnhydrated(page);
        await page.getByTestId("date").fill("2026-10-06");
        await page.getByTestId("time").fill("19:30");
        await hydrate();

        await expect(page.getByTestId("date")).toHaveValue("2026-10-06");
        await expect(value(page, "date")).toHaveText("2026-10-06");
        await expect(page.getByTestId("time")).toHaveValue("19:30");
        await expect(value(page, "time")).toHaveText("19:30");
    });
});

test.describe("after hydration", () => {
    test("a form reset empties every control that is part of the form, as it does a bound native input, and the bound values follow", async ({
        page,
    }) => {
        // Svelte takes the `checked` and `value` attributes off a bound input once
        // it has hydrated, so a reset clears it and does not go back to what the
        // server sent. The library's controls follow that, and what they report
        // matches what they show. A Rating or SegmentedControl without a `name`
        // is not part of the form and is left alone.
        await gotoHydrated(page, LAB);
        await lab(page, "checkbox").getByRole("checkbox").click();
        await lab(page, "checkbox-on").getByRole("checkbox").click();
        await lab(page, "radio-group-preset").getByRole("radio", { name: "Yes" }).click();
        await starTarget(lab(page, "rating-preset"), 5).click();
        await starTarget(lab(page, "rating"), 3).click();
        await lab(page, "segmented-preset").getByText("Large", { exact: true }).click();
        await lab(page, "segmented").getByText("Medium", { exact: true }).click();
        await expect(value(page, "segmented-preset")).toHaveText("l");
        await expect(value(page, "rating-preset")).toHaveText("5");

        await page.getByTestId("native").check();
        await page.getByTestId("lab-reset").click();

        await expect(page.getByTestId("native")).not.toBeChecked();
        await expect(value(page, "native")).toHaveText("false");
        for (const name of ["checkbox", "checkbox-on"]) {
            await expect(lab(page, name).getByRole("checkbox"), name).not.toBeChecked();
            await expect(value(page, name), name).toHaveText("false");
        }
        for (const name of ["radio-group-preset", "rating-preset", "segmented-preset"]) {
            await expect(lab(page, name).getByRole("radio", { checked: true }), name).toHaveCount(0);
            await expect(value(page, name), name).toHaveText("none");
        }
        // Not named, so not in the form.
        await expect(value(page, "rating")).toHaveText("3");
        await expect(star(lab(page, "rating"), 3)).toBeChecked();
        await expect(value(page, "segmented")).toHaveText("m");
        await expect(lab(page, "segmented").getByRole("radio", { name: "Medium" })).toBeChecked();

        // And each goes on working after the reset.
        await lab(page, "checkbox").getByRole("checkbox").click();
        await expect(value(page, "checkbox")).toHaveText("true");
        await starTarget(lab(page, "rating-preset"), 4).click();
        await expect(value(page, "rating-preset")).toHaveText("4");
        await lab(page, "segmented-preset").getByText("Medium", { exact: true }).click();
        await expect(value(page, "segmented-preset")).toHaveText("m");
        await lab(page, "radio-group-preset").getByRole("radio", { name: "Maybe" }).click();
        await expect(value(page, "radio-group-preset")).toHaveText("maybe");
    });
});

test.describe("RadioGroup bound to undefined", () => {
    const UNDEFINED_LAB = "/chaos-lab/hydration-undefined";

    test("hydrates without throwing, and the page is interactive", async ({ page }) => {
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.goto(UNDEFINED_LAB, { waitUntil: "domcontentloaded" });
        await expect(async () => {
            expect(await page.evaluate(() => document.documentElement.dataset.zabiHydrated)).toBe("true");
        }).toPass({ timeout: 30_000 });
        expect(errors).toEqual([]);

        await page.getByTestId("alive").click();
        await expect(page.getByTestId("alive")).toHaveText("Pressed 1");

        const group = lab(page, "undefined");
        await expect(group.getByRole("radio", { checked: true })).toHaveCount(0);
        await expect(page.getByTestId("undefined-value")).toHaveText("none");
        await group.getByRole("radio", { name: "Yes" }).click();
        await expect(page.getByTestId("undefined-value")).toHaveText("yes");
    });

    test("defaultValue applies once when the bound value starts undefined, in the server markup too", async ({ page }) => {
        const hydrate = await openUnhydrated(page, UNDEFINED_LAB);
        const group = lab(page, "default");
        // Already checked in the markup the server sent.
        await expect(group.getByRole("radio", { name: "No" })).toBeChecked();
        await hydrate();
        await expect(group.getByRole("radio", { name: "No" })).toBeChecked();
        await expect(page.getByTestId("default-value")).toHaveText("no");
    });

    test("a choice made before hydration is not overwritten by defaultValue", async ({ page }) => {
        const hydrate = await openUnhydrated(page, UNDEFINED_LAB);
        const group = lab(page, "default");
        await group.getByRole("radio", { name: "Yes" }).click();
        await hydrate();
        await expect(group.getByRole("radio", { name: "Yes" })).toBeChecked();
        await expect(page.getByTestId("default-value")).toHaveText("yes");
    });
});
