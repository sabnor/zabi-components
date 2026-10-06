import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { tick } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import Select from "../src/components/atoms/Select.svelte";
import SelectHandoverHarness from "./fixtures/SelectHandoverHarness.svelte";
import { NATIVE_SELECT_ATTRIBUTE } from "../src/components/util/select";

/**
 * The handover from the server's native `<select>` to the trigger, as far as
 * jsdom can show it. The real thing (server HTML, held scripts, a choice or
 * focus in the native select, then hydration) is in
 * playwright/select-hydration.spec.ts.
 */

afterEach(() => {
    cleanup();
    document.body.innerHTML = "";
    vi.restoreAllMocks();
});

const options = [
    { value: "a", label: "Alfa" },
    { value: "b", label: "Beta" },
    { value: "c", label: "Gamma" },
];

const native = () => document.querySelector("select") as HTMLSelectElement;

/** A native select as the server would have sent it, in the page before the module that watches for choices loads. */
function serverSelect(markup: string): HTMLSelectElement {
    document.body.innerHTML = `<select ${NATIVE_SELECT_ATTRIBUTE}>${markup}</select>`;
    return document.querySelector("select")!;
}

/** The module notes every native select when it loads, so each case loads it afresh. */
async function freshModule() {
    vi.resetModules();
    return import("../src/components/util/select");
}

describe("choiceBeforeMount", () => {
    it("is nothing for a select nobody touched, whatever it shows", async () => {
        const selected = serverSelect('<option value="a">A</option><option value="b" selected>B</option>');
        const { choiceBeforeMount } = await freshModule();
        expect(choiceBeforeMount(selected)).toBeUndefined();

        // No option selected in the markup: the browser shows the first. That is not a choice either.
        const first = serverSelect('<option value="a">A</option><option value="b">B</option>');
        expect((await freshModule()).choiceBeforeMount(first)).toBeUndefined();

        // No options at all: the value is "", and nobody chose that.
        const empty = serverSelect("");
        expect((await freshModule()).choiceBeforeMount(empty)).toBeUndefined();
    });

    it("is the value a visitor chose before the module loaded", async () => {
        const element = serverSelect('<option value="a">A</option><option value="b" selected>B</option><option value="c">C</option>');
        element.value = "c";
        const { choiceBeforeMount } = await freshModule();
        expect(choiceBeforeMount(element)).toBe("c");
    });

    it("is the value chosen after the module loaded and before the component mounted", async () => {
        const element = serverSelect('<option value="" selected>Choose</option><option value="a">A</option>');
        const { choiceBeforeMount } = await freshModule();
        element.value = "a";
        element.dispatchEvent(new Event("change", { bubbles: true }));
        expect(choiceBeforeMount(element)).toBe("a");
    });

    it("is nothing again when the visitor went back to what the server rendered", async () => {
        const element = serverSelect('<option value="a">A</option><option value="b" selected>B</option>');
        const { choiceBeforeMount } = await freshModule();
        element.value = "a";
        element.dispatchEvent(new Event("change", { bubbles: true }));
        element.value = "b";
        element.dispatchEvent(new Event("change", { bubbles: true }));
        expect(choiceBeforeMount(element)).toBeUndefined();
    });

    it("knows nothing of an element it never saw", async () => {
        const { choiceBeforeMount } = await freshModule();
        const later = document.createElement("select");
        later.setAttribute(NATIVE_SELECT_ATTRIBUTE, "");
        document.body.append(later);
        expect(choiceBeforeMount(later)).toBeUndefined();
    });
});

describe("a value with no option of its own", () => {
    it("is held by the native select as a hidden, selected option, so a form sends it", () => {
        const onchange = vi.fn();
        render(Select, { props: { name: "team", options, value: "zzz", onchange } });
        expect(native().value).toBe("zzz");
        const own = native().querySelector('option[value="zzz"]') as HTMLOptionElement;
        expect(own.hidden).toBe(true);
        expect(own.selected).toBe(true);
        expect(native().querySelectorAll("option")).toHaveLength(4);
        expect(onchange).not.toHaveBeenCalled();
    });

    it("stands in while the options are loading, and gives way when they arrive", async () => {
        const onchange = vi.fn();
        const { rerender } = render(Select, { props: { name: "team", options: [], isLoading: true, value: "b", onchange } });
        expect(native().value).toBe("b");
        expect(native().querySelectorAll("option")).toHaveLength(1);

        await rerender({ options, isLoading: false });
        expect(native().value).toBe("b");
        expect(native().querySelectorAll('option[value="b"]')).toHaveLength(1);
        expect(native().querySelector("option[hidden]")).toBeNull();
        expect((native().querySelector('option[value="b"]') as HTMLOptionElement).textContent?.trim()).toBe("Beta");
        expect(onchange).not.toHaveBeenCalled();
    });

    it("is not there for an empty value, which has the placeholder, nor for a value that has its option", () => {
        render(Select, { props: { options } });
        expect(native().querySelector("option[hidden]")).toBeNull();
        expect(native().value).toBe("");
        cleanup();
        render(Select, { props: { options, value: "b" } });
        expect(native().querySelector("option[hidden]")).toBeNull();
        expect(native().querySelectorAll("option")).toHaveLength(3);
    });

    it("keeps a number a number in the markup", () => {
        render(Select, { props: { name: "n", options: [{ value: 1, label: "One" }], value: 7 } });
        expect(native().value).toBe("7");
    });
});

describe("the handover", () => {
    it("leaves focus alone when the native select did not have it", async () => {
        const before = document.createElement("button");
        document.body.append(before);
        before.focus();
        render(Select, { props: { label: "Team", options, value: "a" } });
        await tick();
        await tick();
        expect(document.activeElement).toBe(before);
    });

    it("once mounted, the trigger is the labelled control and the native select is out of the way", async () => {
        render(Select, { props: { label: "Team", options, value: "a" } });
        await tick();
        expect(screen.getByLabelText("Team").tagName).toBe("BUTTON");
        expect(native().getAttribute("aria-hidden")).toBe("true");
        expect(native().getAttribute("tabindex")).toBe("-1");
        expect(native().hasAttribute("aria-label")).toBe(false);
    });

    it("an aria-label names the trigger once mounted, and the native select in the native presentation", async () => {
        render(Select, { props: { "aria-label": "Team", options, value: "a" } });
        await tick();
        expect(screen.getByRole("combobox", { name: "Team" })).toBeTruthy();
        expect(native().hasAttribute("aria-label")).toBe(false);
        cleanup();

        render(Select, { props: { "aria-label": "Team", presentation: "native", options, value: "a" } });
        await tick();
        expect(native().getAttribute("aria-label")).toBe("Team");
        cleanup();

        render(Select, { props: { "aria-labelledby": "elsewhere", presentation: "native", options, value: "a" } });
        await tick();
        expect(native().getAttribute("aria-labelledby")).toBe("elsewhere");
    });
});

describe("several empty required Selects in one form", () => {
    const form = () => screen.getByTestId("form") as HTMLFormElement;
    const triggerOf = (label: string) => screen.getByLabelText(label);

    it("each says what is wrong, and only the first takes focus", async () => {
        render(SelectHandoverHarness);
        await tick();
        expect(form().checkValidity()).toBe(false);
        await tick();
        expect(screen.getAllByRole("alert")).toHaveLength(2);
        expect(document.activeElement).toBe(triggerOf("First"));
    });

    it("with the first answered, the second takes focus", async () => {
        render(SelectHandoverHarness);
        await tick();
        await userEvent.click(screen.getByRole("button", { name: "Set c" }));
        expect(form().checkValidity()).toBe(false);
        await tick();
        expect(screen.getAllByRole("alert")).toHaveLength(1);
        expect(document.activeElement).toBe(triggerOf("Second"));
    });

    it("an invalid field before them is the form's first: no Select takes focus from it", async () => {
        render(SelectHandoverHarness, { props: { inputFirst: true } });
        await tick();
        const before = document.activeElement;
        expect(form().checkValidity()).toBe(false);
        await tick();
        // Both still say what is wrong; focus is left to the browser, which puts it in the field.
        expect(screen.getAllByRole("alert")).toHaveLength(2);
        expect(document.activeElement).toBe(before);
    });
});

describe("a form reset", () => {
    const form = () => screen.getByTestId("form") as HTMLFormElement;
    const state = () => JSON.parse(screen.getByTestId("state").textContent!);
    const selects = () => [...form().querySelectorAll("select")] as HTMLSelectElement[];
    const settled = () => new Promise((resolve) => setTimeout(resolve, 20));

    it("puts each Select back to the value it was rendered with, in the native presentation too, and reports each change once", async () => {
        const onreport = vi.fn();
        render(SelectHandoverHarness, { props: { onreport } });
        await tick();
        await userEvent.click(screen.getByRole("button", { name: "Set c" }));
        expect(state()).toEqual({ first: "c", second: null, preset: "c", native: "c" });
        expect(onreport).not.toHaveBeenCalled();

        form().reset();
        await settled();

        expect(state()).toEqual({ first: null, second: null, preset: "b", native: "a" });
        expect(selects().map((select) => select.value)).toEqual(["", "", "b", "a"]);
        expect(screen.getByLabelText("Preset").textContent).toContain("Beta");
        expect(onreport.mock.calls.map(([which]) => which).sort()).toEqual(["first", "native", "preset"]);
        expect(Object.fromEntries(new FormData(form()))).toMatchObject({ preset: "b", native: "a" });
    });

    it("that changes nothing reports nothing", async () => {
        const onreport = vi.fn();
        render(SelectHandoverHarness, { props: { onreport } });
        await tick();
        form().reset();
        await settled();
        expect(onreport).not.toHaveBeenCalled();
        expect(state()).toEqual({ first: null, second: null, preset: "b", native: "a" });
        expect(selects().map((select) => select.value)).toEqual(["", "", "b", "a"]);
    });

    it("that is cancelled is not followed", async () => {
        render(SelectHandoverHarness);
        await tick();
        await userEvent.click(screen.getByRole("button", { name: "Set c" }));
        form().addEventListener("reset", (event) => event.preventDefault());
        form().dispatchEvent(new Event("reset", { bubbles: true, cancelable: true }));
        await settled();
        expect(state()).toMatchObject({ first: "c", preset: "c", native: "c" });
    });

    it("stops listening when the Select is gone", async () => {
        const onreport = vi.fn();
        const { unmount } = render(SelectHandoverHarness, { props: { onreport } });
        await tick();
        const kept = form();
        document.body.append(kept.cloneNode(false));
        unmount();
        kept.dispatchEvent(new Event("reset", { bubbles: true, cancelable: true }));
        await settled();
        expect(onreport).not.toHaveBeenCalled();
    });
});
