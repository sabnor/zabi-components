import { cleanup, render } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Checkbox from "../src/components/atoms/Checkbox.svelte";
import Radio from "../src/components/atoms/Radio.svelte";
import {
    RADIO_GROUP_CONTROL_SHELL,
    SELECTION_CONTROL_SHELL_STATE,
} from "../src/components/atoms/selection-control.styles";
import RadioGroup from "../src/components/molecules/RadioGroup.svelte";

afterEach(cleanup);

/** The unticked edge is the control boundary, held to 3:1 by `scripts/check-contrast.js` (Z-114). */
describe("the edge of an unticked box (Z-114)", () => {
    it("the shell reads the control boundary and no fixed ramp step", () => {
        for (const shell of [SELECTION_CONTROL_SHELL_STATE, RADIO_GROUP_CONTROL_SHELL]) {
            const classes = shell.split(/\s+/);
            expect(classes).toContain("border-control-border");
            expect(classes.some((name) => /^border-base-\d+$/.test(name))).toBe(false);
        }
    });

    it("Checkbox, Radio and RadioGroup draw that shell", () => {
        const options = [{ value: "a", label: "A" }, { value: "b", label: "B" }];
        const rendered = [
            render(Checkbox, { props: { label: "Remember me" } }).container,
            render(Radio, { props: { label: "Option", name: "o", value: "x" } }).container,
            render(RadioGroup, { props: { legend: "Pick", options } }).container,
        ];
        for (const container of rendered) {
            const shells = container.querySelectorAll(".border-control-border");
            expect(shells.length).toBeGreaterThan(0);
            expect(container.querySelector("[class~='border-base-400']")).toBeNull();
        }
    });
});

/** A flex item does not shrink below its longest word unless it may (Z-153). */
describe("a long label wraps inside its host (Z-153)", () => {
    it("the label row and the label text may shrink, with the box at the start or the end, with or without a description", () => {
        const label = "Alex Långnamnsson-Testperson";
        for (const props of [
            { label },
            { label, controlPosition: "end" as const },
            { label, description: "Kom med" },
            { label, description: "Kom med", controlPosition: "end" as const },
        ]) {
            for (const component of [Checkbox, Radio]) {
                const { container } = render(component, { props: { ...props, name: "n", value: "v" } });
                const row = container.querySelector("label")!;
                expect(row.className.split(/\s+/)).toContain("min-w-0");
                const text = Array.from(row.children).at(-1) as HTMLElement;
                expect(text.className.split(/\s+/)).toContain("min-w-0");
                expect(text.className.split(/\s+/)).toContain("wrap-break-word");
                cleanup();
            }
        }
    });
});
