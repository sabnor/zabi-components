import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Rating from "../src/components/atoms/Rating.svelte";
import { radioKeyIndex } from "../src/components/util/radio-keys";
import {
    clampRating,
    defaultRatingFormat,
    starCount,
    starFill,
} from "../src/components/util/rating";
import RatingHarness from "./fixtures/RatingHarness.svelte";

afterEach(cleanup);

const group = () => screen.getByRole("radiogroup");
const stars = () => screen.getAllByRole("radio") as HTMLInputElement[];
const star = (value: number, max = 5) =>
    screen.getByRole("radio", { name: `${value} of ${max} stars` }) as HTMLInputElement;
const checked = () => stars().filter((input) => input.checked).map((input) => input.value);
const bound = () => screen.getByTestId("bound").textContent;
const clearButton = () => screen.queryByRole("button", { name: "Clear rating" });
const fills = () =>
    [...document.querySelectorAll<HTMLElement>(".rating-glyph")].map((glyph) =>
        glyph.style.getPropertyValue("--zabi-rating-fill"),
    );

describe("Rating", () => {
    it("is a radio group named by its label, with one radio per star", () => {
        render(RatingHarness);
        expect(screen.getByRole("radiogroup", { name: "Quiz" })).toBe(group());
        expect(stars().map((input) => input.getAttribute("aria-label"))).toEqual([
            "1 of 5 stars",
            "2 of 5 stars",
            "3 of 5 stars",
            "4 of 5 stars",
            "5 of 5 stars",
        ]);
        expect(stars().every((input) => input.type === "radio")).toBe(true);
        // The label is visible, and it is what names the group.
        expect(screen.getByText("Quiz").id).toBe(group().getAttribute("aria-labelledby"));
    });

    it("starts empty: nothing is checked, and the group is still one Tab stop", async () => {
        const user = userEvent.setup();
        render(RatingHarness);
        expect(checked()).toEqual([]);
        expect(bound()).toBe("null");
        expect(stars().map((input) => input.tabIndex)).toEqual([0, -1, -1, -1, -1]);

        await user.tab();
        expect(document.activeElement).toBe(star(1));
        await user.tab();
        expect(document.activeElement).toBe(screen.getByTestId("reset"));
    });

    it("gives the Tab stop to the selected star", () => {
        render(RatingHarness, { props: { initial: 4 } });
        expect(checked()).toEqual(["4"]);
        expect(stars().map((input) => input.tabIndex)).toEqual([-1, -1, -1, 0, -1]);
    });

    it("marks the stars up to the value as filled", async () => {
        const user = userEvent.setup();
        render(RatingHarness, { props: { initial: 2 } });
        const on = () => stars().map((input) => input.closest("label")!.hasAttribute("data-on"));
        expect(on()).toEqual([true, true, false, false, false]);
        await user.click(star(4));
        expect(on()).toEqual([true, true, true, true, false]);
    });

    it("sets the value on a press, binds it and reports it", async () => {
        const user = userEvent.setup();
        const onchange = vi.fn();
        render(RatingHarness, { props: { onchange } });

        await user.click(star(3));
        expect(checked()).toEqual(["3"]);
        expect(bound()).toBe("3");
        expect(onchange).toHaveBeenCalledTimes(1);
        expect(onchange).toHaveBeenCalledWith(3);

        await user.click(star(5));
        expect(checked()).toEqual(["5"]);
        expect(onchange).toHaveBeenLastCalledWith(5);
    });

    it.each([false, true])(
        "never clears on a repeat press of the selected star (clearable: %s)",
        async (clearable) => {
            const user = userEvent.setup();
            const onchange = vi.fn();
            render(RatingHarness, { props: { initial: 3, clearable, onchange } });

            await user.click(star(3));
            await user.click(star(3));
            star(3).focus();
            await user.keyboard(" ");
            await user.keyboard("{Enter}");

            expect(checked()).toEqual(["3"]);
            expect(bound()).toBe("3");
            expect(onchange).not.toHaveBeenCalled();
        },
    );

    it("moves and selects with the arrow keys, Home and End, and wraps", async () => {
        const user = userEvent.setup();
        const onchange = vi.fn();
        render(RatingHarness, { props: { onchange } });
        await user.tab();

        await user.keyboard("{ArrowRight}");
        expect(bound()).toBe("1");
        expect(document.activeElement).toBe(star(1));

        await user.keyboard("{ArrowRight}{ArrowDown}");
        expect(bound()).toBe("3");
        expect(document.activeElement).toBe(star(3));

        await user.keyboard("{ArrowLeft}");
        expect(bound()).toBe("2");
        await user.keyboard("{ArrowUp}");
        expect(bound()).toBe("1");

        await user.keyboard("{ArrowLeft}");
        expect(bound()).toBe("5");
        expect(document.activeElement).toBe(star(5));
        await user.keyboard("{ArrowRight}");
        expect(bound()).toBe("1");

        await user.keyboard("{End}");
        expect(bound()).toBe("5");
        await user.keyboard("{Home}");
        expect(bound()).toBe("1");
        expect(document.activeElement).toBe(star(1));
        expect(onchange).toHaveBeenLastCalledWith(1);
    });

    it("goes to the last star on Left when nothing is selected", async () => {
        const user = userEvent.setup();
        render(RatingHarness);
        await user.tab();
        await user.keyboard("{ArrowLeft}");
        expect(bound()).toBe("5");
    });

    it("moves from the star that has focus, not from the selected one", async () => {
        // A screen reader's cursor can put focus on a radio that is not checked.
        const user = userEvent.setup();
        render(RatingHarness, { props: { initial: 1 } });

        star(4).focus();
        await user.keyboard("{ArrowLeft}");
        expect(bound()).toBe("3");
        expect(document.activeElement).toBe(star(3));

        star(1).focus();
        await user.keyboard("{ArrowRight}");
        expect(bound()).toBe("2");

        // Wrapping is from the focused star too: Left on the first goes to the last.
        star(1).focus();
        await user.keyboard("{ArrowLeft}");
        expect(bound()).toBe("5");
    });

    it("selects the focused star on a forward key while empty, wherever focus is", async () => {
        const user = userEvent.setup();
        render(RatingHarness);
        star(3).focus();
        await user.keyboard("{ArrowRight}");
        expect(bound()).toBe("3");
        // Now that there is a selection, the same key moves on.
        await user.keyboard("{ArrowRight}");
        expect(bound()).toBe("4");
    });

    it("dims a disabled rating once: the host is dimmed, the clear button is not dimmed again", () => {
        render(RatingHarness, { props: { initial: 3, clearable: true, disabled: true } });
        expect(screen.getByTestId("rating").className).toContain("opacity-50");
        expect(clearButton()!.className).not.toContain("opacity");
    });

    it("selects the focused star with Space", async () => {
        const user = userEvent.setup();
        render(RatingHarness);
        await user.tab();
        await user.keyboard(" ");
        expect(bound()).toBe("1");
    });

    it("has no way to unset without clearable", async () => {
        const user = userEvent.setup();
        const onchange = vi.fn();
        render(RatingHarness, { props: { initial: 3, onchange } });
        expect(clearButton()).toBeNull();
        expect(screen.queryAllByRole("button", { name: /clear/i })).toEqual([]);

        star(3).focus();
        await user.keyboard("{Delete}{Backspace}");
        expect(bound()).toBe("3");
        expect(onchange).not.toHaveBeenCalled();
    });

    it("clears with the clear button when clearable, and hands focus back to the stars", async () => {
        const user = userEvent.setup();
        const onchange = vi.fn();
        render(RatingHarness, { props: { initial: 3, clearable: true, onchange } });

        const button = clearButton() as HTMLButtonElement;
        expect(button).not.toBeNull();
        expect(button.type).toBe("button");
        expect(button.disabled).toBe(false);

        await user.click(button);
        expect(bound()).toBe("null");
        expect(checked()).toEqual([]);
        expect(onchange).toHaveBeenCalledTimes(1);
        expect(onchange).toHaveBeenCalledWith(null);
        expect(document.activeElement).toBe(star(1));
        expect(stars().map((input) => input.tabIndex)).toEqual([0, -1, -1, -1, -1]);

        // Nothing left to clear: the button is out of the way until there is.
        expect(button.disabled).toBe(true);
        expect(button.className).toContain("invisible");
        await user.click(star(2));
        expect(button.disabled).toBe(false);
        expect(button.className).not.toContain("invisible");
    });

    it.each(["{Delete}", "{Backspace}"])("clears with %s when clearable", async (key) => {
        const user = userEvent.setup();
        const onchange = vi.fn();
        render(RatingHarness, { props: { initial: 4, clearable: true, onchange } });

        star(4).focus();
        await user.keyboard(key);
        expect(bound()).toBe("null");
        expect(onchange).toHaveBeenCalledWith(null);
        expect(document.activeElement).toBe(star(1));

        // Already empty: not a change.
        await user.keyboard(key);
        expect(onchange).toHaveBeenCalledTimes(1);
    });

    it("lets the parent unset the value whether or not it is clearable", async () => {
        const user = userEvent.setup();
        render(RatingHarness, { props: { initial: 3 } });
        await user.click(screen.getByTestId("reset"));
        expect(checked()).toEqual([]);
        expect(stars().map((input) => input.tabIndex)).toEqual([0, -1, -1, -1, -1]);
    });

    it("takes its wording from strings", () => {
        render(RatingHarness, {
            props: {
                initial: 2,
                clearable: true,
                strings: {
                    starLabel: (value: string, max: number) => `${value} av ${max} stjärnor`,
                    clearLabel: "Rensa betyg",
                },
            },
        });
        expect(screen.getByRole("radio", { name: "4 av 5 stjärnor" })).toBeTruthy();
        expect(screen.getByRole("button", { name: "Rensa betyg" })).toBeTruthy();
    });

    it("renders max stars", () => {
        render(RatingHarness, { props: { max: 3 } });
        expect(stars()).toHaveLength(3);
        expect(star(3, 3)).toBeTruthy();
    });

    it("submits with a form under its name, and nothing while empty", async () => {
        const user = userEvent.setup();
        render(RatingHarness);
        const data = () => new FormData(screen.getByTestId("form") as HTMLFormElement);
        expect(data().has("quiz")).toBe(false);
        await user.click(star(4));
        expect(data().get("quiz")).toBe("4");
    });

    it("leaves the radios without a name when none is given", () => {
        render(Rating, { props: { label: "Quiz", value: 2 } });
        expect(stars().every((input) => !input.hasAttribute("name"))).toBe(true);
        expect(checked()).toEqual(["2"]);
    });

    it("is named by aria-label or aria-labelledby when there is no label", () => {
        render(Rating, { props: { "aria-label": "Quiz" } });
        expect(screen.getByRole("radiogroup", { name: "Quiz" })).toBeTruthy();
        cleanup();

        render(RatingHarness, { props: { hideLabel: true } });
        expect(screen.getByRole("radiogroup", { name: "Quiz" })).toBeTruthy();
        expect(screen.queryByText("Quiz")).toBeNull();
    });

    it("cannot be changed while disabled", async () => {
        const user = userEvent.setup();
        const onchange = vi.fn();
        render(RatingHarness, { props: { initial: 2, clearable: true, disabled: true, onchange } });
        expect(stars().every((input) => input.disabled)).toBe(true);
        expect(group().getAttribute("aria-disabled")).toBe("true");
        expect((clearButton() as HTMLButtonElement).disabled).toBe(true);

        await user.click(star(5));
        await user.click(clearButton()!);
        expect(bound()).toBe("2");
        expect(onchange).not.toHaveBeenCalled();
    });

    it("shows the number beside the stars only when asked", async () => {
        const user = userEvent.setup();
        const shown = () => document.querySelector("[data-rating-value]")?.textContent?.trim();
        const { unmount } = render(RatingHarness, { props: { initial: 3 } });
        expect(shown()).toBeUndefined();
        unmount();

        render(RatingHarness, { props: { initial: 3, showValue: true } });
        expect(shown()).toBe("3");
        await user.click(star(5));
        expect(shown()).toBe("5");
    });
});

describe("Rating, read-only", () => {
    const image = () => screen.getByRole("img");

    it("is one image with one name, not a radio group", () => {
        render(RatingHarness, { props: { initial: 3.5, readonly: true, clearable: true } });
        expect(screen.getByRole("img", { name: "Quiz, 3.5 of 5 stars" })).toBe(image());
        expect(screen.queryByRole("radiogroup")).toBeNull();
        expect(screen.queryAllByRole("radio")).toEqual([]);
        expect(screen.queryAllByRole("button", { name: /clear/i })).toEqual([]);
        expect(image().querySelector("input")).toBeNull();
        expect(image().getAttribute("data-testid")).toBe("rating");
    });

    it("fills each star by the part of the value it holds", () => {
        render(RatingHarness, { props: { initial: 3.5, readonly: true } });
        expect(fills()).toEqual(["1", "1", "1", "0.5", "0"]);
        cleanup();

        render(RatingHarness, { props: { initial: 4.25, readonly: true } });
        expect(fills()).toEqual(["1", "1", "1", "1", "0.25"]);
    });

    it("shows the number beside the stars by default", () => {
        const shown = () => document.querySelector("[data-rating-value]")?.textContent?.trim();
        render(RatingHarness, { props: { initial: 3.5, readonly: true } });
        expect(shown()).toBe("3.5");
        cleanup();

        render(RatingHarness, { props: { initial: 3.5, readonly: true, showValue: false } });
        expect(shown()).toBeUndefined();
        expect(image().getAttribute("aria-label")).toBe("Quiz, 3.5 of 5 stars");
    });

    it("formats the number for a locale, in the text and in the name", () => {
        render(RatingHarness, {
            props: {
                initial: 3.5,
                readonly: true,
                formatValue: (value: number) => value.toFixed(1).replace(".", ","),
                strings: {
                    starLabel: (value: string, max: number) => `${value} av ${max} stjärnor`,
                },
            },
        });
        expect(image().getAttribute("aria-label")).toBe("Quiz, 3,5 av 5 stjärnor");
        expect(document.querySelector("[data-rating-value]")?.textContent?.trim()).toBe("3,5");
    });

    it("rounds a long average to one decimal by default", () => {
        render(RatingHarness, { props: { initial: 11 / 3, readonly: true } });
        expect(image().getAttribute("aria-label")).toBe("Quiz, 3.7 of 5 stars");
    });

    it("holds the value within 0 and max", () => {
        render(RatingHarness, { props: { initial: 7, readonly: true } });
        expect(image().getAttribute("aria-label")).toBe("Quiz, 5 of 5 stars");
        expect(fills()).toEqual(["1", "1", "1", "1", "1"]);
        cleanup();

        render(RatingHarness, { props: { initial: -2, readonly: true } });
        expect(image().getAttribute("aria-label")).toBe("Quiz, 0 of 5 stars");
        expect(fills()).toEqual(["0", "0", "0", "0", "0"]);
    });

    it("shows empty stars and a replaceable text without a value", () => {
        render(RatingHarness, { props: { readonly: true } });
        expect(image().getAttribute("aria-label")).toBe("Quiz, No rating");
        expect(fills()).toEqual(["0", "0", "0", "0", "0"]);
        expect(document.querySelector("[data-rating-value]")?.textContent?.trim()).toBe(
            "No rating",
        );
        cleanup();

        render(RatingHarness, {
            props: { readonly: true, strings: { noRating: "Inget betyg" } },
        });
        expect(image().getAttribute("aria-label")).toBe("Quiz, Inget betyg");
        expect(screen.getByText("Inget betyg")).toBeTruthy();
    });

    it("joins an outside label with its own value when named by aria-labelledby", () => {
        render(Rating, {
            props: { readonly: true, value: 4, "aria-labelledby": "outside" },
        });
        const ids = image().getAttribute("aria-labelledby")!.split(" ");
        expect(ids[0]).toBe("outside");
        expect(document.getElementById(ids[1])?.textContent).toBe("4 of 5 stars");
        expect(image().hasAttribute("aria-label")).toBe(false);
    });
});

describe("Rating helpers", () => {
    it("fills a star by the part of the value it holds", () => {
        expect([1, 2, 3, 4, 5].map((star) => starFill(3.5, star))).toEqual([1, 1, 1, 0.5, 0]);
        expect(starFill(null, 1)).toBe(0);
    });

    it("clamps and counts", () => {
        expect(clampRating(9, 5)).toBe(5);
        expect(clampRating(-1, 5)).toBe(0);
        expect(clampRating(null, 5)).toBeNull();
        expect(clampRating(Number.NaN, 5)).toBeNull();
        expect(starCount(5)).toBe(5);
        expect(starCount(0)).toBe(1);
        expect(starCount(3.9)).toBe(3);
        expect(defaultRatingFormat(4)).toBe("4");
        expect(defaultRatingFormat(3.66)).toBe("3.7");
    });

    it("maps keys to the next radio, swapping Left and Right when right-to-left", () => {
        expect(radioKeyIndex("ArrowRight", 0, 5)).toBe(1);
        expect(radioKeyIndex("ArrowLeft", 0, 5)).toBe(4);
        expect(radioKeyIndex("ArrowRight", 4, 5)).toBe(0);
        expect(radioKeyIndex("ArrowRight", -1, 5)).toBe(0);
        expect(radioKeyIndex("ArrowLeft", -1, 5)).toBe(4);
        expect(radioKeyIndex("Home", 3, 5)).toBe(0);
        expect(radioKeyIndex("End", 0, 5)).toBe(4);
        expect(radioKeyIndex("a", 0, 5)).toBe(-1);
        expect(radioKeyIndex("ArrowRight", 0, 0)).toBe(-1);

        expect(radioKeyIndex("ArrowRight", 2, 5, true)).toBe(1);
        expect(radioKeyIndex("ArrowLeft", 2, 5, true)).toBe(3);
        expect(radioKeyIndex("ArrowDown", 2, 5, true)).toBe(3);
        expect(radioKeyIndex("ArrowUp", 2, 5, true)).toBe(1);

        // An empty group: a forward key selects the focused option, a backward key still steps.
        expect(radioKeyIndex("ArrowRight", 0, 5, false, false)).toBe(0);
        expect(radioKeyIndex("ArrowDown", 2, 5, false, false)).toBe(2);
        expect(radioKeyIndex("ArrowLeft", 2, 5, true, false)).toBe(2);
        expect(radioKeyIndex("ArrowLeft", 0, 5, false, false)).toBe(4);
        expect(radioKeyIndex("End", 0, 5, false, false)).toBe(4);
    });
});
