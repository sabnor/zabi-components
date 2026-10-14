import { cleanup, render, screen } from "@testing-library/svelte";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import Checkbox from "../src/components/atoms/Checkbox.svelte";
import Radio from "../src/components/atoms/Radio.svelte";
import Toggle from "../src/components/atoms/Toggle.svelte";
import RadioGroup from "../src/components/molecules/RadioGroup.svelte";

afterEach(cleanup);

const css = readFileSync(resolve(__dirname, "../src/app.css"), "utf8");
const forcedBlock = css.slice(css.indexOf("SWITCH AND TICK BOXES IN FORCED COLOURS"));
const forced = forcedBlock.slice(0, forcedBlock.indexOf("ACTION UTILITY CLASSES"));

/** Forced colours drop fills and shadows; the state is a pair of system colours (Z-115, Z-116). */
describe("Toggle in forced colours (Z-115)", () => {
    it("carries the hooks the forced-colours rules select", () => {
        render(Toggle, { props: { label: "Notiser", checked: true } });
        const track = screen.getByRole("switch", { name: "Notiser" });
        expect(track.classList.contains("toggle-switch")).toBe(true);
        expect(track.querySelector(".toggle-switch-thumb")).not.toBeNull();
        expect(track.getAttribute("aria-checked")).toBe("true");
    });

    it("draws an edge, tells on from off and disabled from both, in system colours", () => {
        expect(forced).toMatch(/\.toggle-switch \{[^}]*border: 1px solid ButtonText/);
        expect(forced).toMatch(/\.toggle-switch\[aria-checked="true"\] \{[^}]*background-color: Highlight/);
        expect(forced).toMatch(/\.toggle-switch\[aria-checked="true"\] \.toggle-switch-thumb \{[^}]*HighlightText/);
        expect(forced).toMatch(/\.toggle-switch:disabled \{[^}]*GrayText/);
        expect(forced).not.toMatch(/\.toggle-switch[^{]*\{[^}]*(#|rgb|var\()/);
    });
});

describe("Checkbox, Radio and RadioGroup in forced colours (Z-116)", () => {
    it("every ticked box can be selected by the rules", () => {
        const options = [{ value: "a", label: "A" }, { value: "b", label: "B" }];
        const rendered = [
            render(Checkbox, { props: { label: "Emma", checked: true } }).container,
            render(Radio, { props: { label: "Option", name: "o", value: "x" } }).container,
            render(RadioGroup, { props: { legend: "Pick", options } }).container,
        ];
        for (const container of rendered) {
            expect(container.querySelector(".selection-control-shell")).not.toBeNull();
        }
        expect(rendered[0].querySelector(".selection-control-shell > svg")).not.toBeNull();
        expect(rendered[1].querySelector(".selection-control-shell > .selection-control-dot")).not.toBeNull();
        expect(rendered[2].querySelector(".selection-control-shell > .selection-control-dot")).not.toBeNull();
    });

    it("ticked is Highlight with a HighlightText mark, disabled is GrayText", () => {
        expect(forced).toMatch(/\.selection-control-shell:has\(:checked\) \{[^}]*background-color: Highlight/);
        expect(forced).toMatch(/\.selection-control-shell:has\(:checked\) > svg \{[^}]*HighlightText/);
        expect(forced).toMatch(/\.selection-control-shell:has\(:checked\) > \.selection-control-dot \{[^}]*HighlightText/);
        expect(forced).toMatch(/\.selection-control-shell:has\(:disabled\) \{[^}]*GrayText/);
        expect(forced).toMatch(/\.selection-control-shell:has\(:checked\):has\(:disabled\) \{[^}]*background-color: GrayText/);
    });

    it("the focus outline is not overridden", () => {
        expect(forced).not.toMatch(/outline\s*:/);
    });
});
