import { cleanup, render, screen, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { groupBinding, resetValueOf } from "../src/components/util/hydration";
import ChoiceHarness from "./fixtures/ChoiceHarness.svelte";

/**
 * The controls that hold a choice bind their native input, so that a choice
 * made before the page hydrated is kept (playwright/hydration-value.spec.ts
 * shows that, with real server markup and held scripts; jsdom cannot hold a
 * page between its markup and its scripts).
 *
 * What can be shown here is that binding did not change anything else: a
 * client-only mount reports nothing, a parent that sets the value later is
 * followed, a user's change is reported once, a repeat press never clears,
 * and a form reset is followed.
 */

afterEach(cleanup);

const state = () => JSON.parse(screen.getByTestId("state").textContent!);
const press = (name: string) => userEvent.click(screen.getByRole("button", { name }));
const answer = () => within(screen.getByRole("group", { name: "Answer" }));
const quiz = () => within(screen.getByRole("radiogroup", { name: "Quiz" }));
const size = () => within(screen.getByRole("radiogroup", { name: "Size" }));
const checkedIn = (group: ReturnType<typeof within>) =>
    (group.getAllByRole("radio") as HTMLInputElement[]).filter((input) => input.checked).map((input) => input.value);

describe("groupBinding", () => {
    it("reads the choice, passes a choice on, and treats nothing chosen as a reset", () => {
        let value: string | undefined = "a";
        const choose = vi.fn((next: string) => (value = next));
        const restore = vi.fn();
        const binding = groupBinding<string>(() => value, choose, restore);
        expect(binding.value).toBe("a");
        binding.value = "b";
        expect(choose).toHaveBeenCalledWith("b");
        expect(binding.value).toBe("b");
        binding.value = null;
        binding.value = undefined;
        expect(restore).toHaveBeenCalledTimes(2);
        expect(choose).toHaveBeenCalledTimes(1);
    });

    it("on a reset goes back to the radio whose checked attribute is set, in the type Svelte kept its value in", () => {
        const one = Object.assign(document.createElement("input"), { type: "radio", __value: 1 });
        const two = Object.assign(document.createElement("input"), { type: "radio", __value: 2 });
        expect(resetValueOf<number>([one, undefined, two])).toBeUndefined();
        // What is checked now is not what a reset goes back to: the browser has not reset yet when this is asked.
        two.checked = true;
        expect(resetValueOf<number>([one, undefined, two])).toBeUndefined();
        one.setAttribute("checked", "");
        expect(resetValueOf<number>([one, undefined, two])).toBe(1);
    });
});

describe("rest attributes reach the host of each group", () => {
    it("Rating: its host; SegmentedControl: the radiogroup; RadioGroup: the fieldset", async () => {
        const { default: Rating } = await import("../src/components/atoms/Rating.svelte");
        const { default: SegmentedControl } = await import("../src/components/molecules/SegmentedControl.svelte");
        const { default: RadioGroup } = await import("../src/components/molecules/RadioGroup.svelte");
        const options = [
            { value: "a", label: "Alpha" },
            { value: "b", label: "Beta" },
        ];
        const rest = { id: "host", "data-testid": "host", "aria-describedby": "elsewhere" };

        // Rating's host is the element around its label and its stars.
        render(Rating, { props: { label: "Quiz", ...rest } });
        expect(screen.getByTestId("host").contains(screen.getByRole("radiogroup"))).toBe(true);
        expect(screen.getByTestId("host").contains(screen.getByText("Quiz"))).toBe(true);
        expect(screen.getByTestId("host").id).toBe("host");
        expect(screen.getByTestId("host").getAttribute("aria-describedby")).toBe("elsewhere");
        cleanup();

        render(SegmentedControl, { props: { label: "Size", options, ...rest } });
        expect(screen.getByTestId("host")).toBe(screen.getByRole("radiogroup"));
        expect(screen.getByTestId("host").getAttribute("aria-describedby")).toBe("elsewhere");
        cleanup();

        render(RadioGroup, { props: { legend: "Answer", options, ...rest } });
        expect(screen.getByTestId("host").tagName).toBe("FIELDSET");
        expect(screen.getByTestId("host")).toBe(screen.getByRole("group", { name: "Answer" }));
        expect(screen.getByTestId("host").getAttribute("aria-describedby")).toBe("elsewhere");
    });
});

describe("mounted in the browser only", () => {
    it("shows the state it is given and reports nothing", async () => {
        const onreport = vi.fn();
        render(ChoiceHarness, { props: { checked: true, radio: true, answer: "b", stars: 3, size: "c", onreport } });
        expect((screen.getByRole("checkbox", { name: "Terms" }) as HTMLInputElement).checked).toBe(true);
        expect((screen.getByRole("radio", { name: "Only" }) as HTMLInputElement).checked).toBe(true);
        expect(checkedIn(answer())).toEqual(["b"]);
        expect(checkedIn(quiz())).toEqual(["3"]);
        expect(checkedIn(size())).toEqual(["c"]);
        // Past the moment a component would report an adopted choice.
        await new Promise((resolve) => setTimeout(resolve, 20));
        expect(onreport).not.toHaveBeenCalled();
        expect(state()).toEqual({ checked: true, radio: true, answer: "b", stars: 3, size: "c" });
    });

    it("starts empty without reporting, and without changing the parent's state", async () => {
        const onreport = vi.fn();
        render(ChoiceHarness, { props: { onreport } });
        await new Promise((resolve) => setTimeout(resolve, 20));
        expect(onreport).not.toHaveBeenCalled();
        expect(state()).toEqual({ checked: false, radio: false, answer: null, stars: null, size: null });
        expect(checkedIn(answer())).toEqual([]);
        expect(checkedIn(quiz())).toEqual([]);
        expect(checkedIn(size())).toEqual([]);
    });
});

describe("a user's change", () => {
    it("is shown, bound and reported once", async () => {
        const onreport = vi.fn();
        render(ChoiceHarness, { props: { onreport } });
        await userEvent.click(screen.getByRole("checkbox", { name: "Terms" }));
        await userEvent.click(screen.getByRole("radio", { name: "Only" }));
        await userEvent.click(answer().getByRole("radio", { name: "Beta" }));
        await userEvent.click(quiz().getByRole("radio", { name: "4 of 5 stars" }));
        await userEvent.click(size().getByRole("radio", { name: "Gamma" }));
        expect(state()).toEqual({ checked: true, radio: true, answer: "b", stars: 4, size: "c" });
        expect(onreport.mock.calls).toEqual([
            ["checkbox", true],
            ["radio", true],
            ["rating", 4],
            ["segmented", "c"],
        ]);
    });

    it("a repeat press on the selected star or segment changes nothing and reports nothing", async () => {
        const onreport = vi.fn();
        render(ChoiceHarness, { props: { stars: 4, size: "b", onreport } });
        await userEvent.click(quiz().getByRole("radio", { name: "4 of 5 stars" }));
        await userEvent.click(size().getByRole("radio", { name: "Beta" }));
        expect(state()).toMatchObject({ stars: 4, size: "b" });
        expect(checkedIn(quiz())).toEqual(["4"]);
        expect(checkedIn(size())).toEqual(["b"]);
        expect(onreport).not.toHaveBeenCalled();
    });

    it("one radio at a time in each group", async () => {
        render(ChoiceHarness, { props: { answer: "a", stars: 1, size: "a" } });
        await userEvent.click(answer().getByRole("radio", { name: "Gamma" }));
        await userEvent.click(quiz().getByRole("radio", { name: "5 of 5 stars" }));
        await userEvent.click(size().getByRole("radio", { name: "Beta" }));
        expect(checkedIn(answer())).toEqual(["c"]);
        expect(checkedIn(quiz())).toEqual(["5"]);
        expect(checkedIn(size())).toEqual(["b"]);
    });
});

describe("a parent that sets the value later", () => {
    it("is followed by every control, and that is not reported as a change", async () => {
        const onreport = vi.fn();
        render(ChoiceHarness, { props: { onreport } });
        await press("Set all");
        expect((screen.getByRole("checkbox", { name: "Terms" }) as HTMLInputElement).checked).toBe(true);
        expect((screen.getByRole("radio", { name: "Only" }) as HTMLInputElement).checked).toBe(true);
        expect(checkedIn(answer())).toEqual(["c"]);
        expect(checkedIn(quiz())).toEqual(["5"]);
        expect(checkedIn(size())).toEqual(["c"]);

        await press("Clear all");
        expect((screen.getByRole("checkbox", { name: "Terms" }) as HTMLInputElement).checked).toBe(false);
        expect((screen.getByRole("radio", { name: "Only" }) as HTMLInputElement).checked).toBe(false);
        expect(checkedIn(answer())).toEqual([]);
        expect(checkedIn(quiz())).toEqual([]);
        expect(checkedIn(size())).toEqual([]);
        expect(onreport).not.toHaveBeenCalled();
    });
});

describe("a form reset", () => {
    it("is followed: what each control shows afterwards is what it reports", async () => {
        render(ChoiceHarness);
        await press("Set all");
        (screen.getByTestId("form") as HTMLFormElement).reset();
        await vi.waitFor(() =>
            expect(state()).toEqual({ checked: false, radio: false, answer: null, stars: null, size: null }),
        );
        expect((screen.getByRole("checkbox", { name: "Terms" }) as HTMLInputElement).checked).toBe(false);
        expect(checkedIn(answer())).toEqual([]);
        expect(checkedIn(quiz())).toEqual([]);
        expect(checkedIn(size())).toEqual([]);

        // And they go on working.
        await userEvent.click(answer().getByRole("radio", { name: "Alpha" }));
        await userEvent.click(quiz().getByRole("radio", { name: "2 of 5 stars" }));
        expect(state()).toMatchObject({ answer: "a", stars: 2 });
    });

    it("leaves a Rating and a SegmentedControl without a name alone: they are not part of the form", async () => {
        render(ChoiceHarness, { props: { named: false, stars: 3, size: "b" } });
        const radios = [...quiz().getAllByRole("radio"), ...size().getAllByRole("radio")] as HTMLInputElement[];
        // One group each all the same, and none of it in the form.
        expect(new Set(radios.map((input) => input.name)).size).toBe(2);
        expect(radios.every((input) => input.name !== "" && input.form === null)).toBe(true);
        expect([...new FormData(screen.getByTestId("form") as HTMLFormElement).keys()]).toEqual([]);

        (screen.getByTestId("form") as HTMLFormElement).reset();
        await new Promise((resolve) => setTimeout(resolve, 20));
        expect(state()).toMatchObject({ stars: 3, size: "b" });
        expect(checkedIn(quiz())).toEqual(["3"]);
        expect(checkedIn(size())).toEqual(["b"]);
    });

    it("submits the named ones under their names", async () => {
        render(ChoiceHarness, { props: { checked: true, answer: "b", stars: 4, size: "c" } });
        const data = new FormData(screen.getByTestId("form") as HTMLFormElement);
        expect(data.get("quiz")).toBe("4");
        expect(data.get("size")).toBe("c");
        expect(data.get("answer")).toBe("b");
    });
});
