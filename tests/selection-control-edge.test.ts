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
