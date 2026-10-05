// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import Select from "../src/components/atoms/Select.svelte";
import DropdownOptionsHarness from "./fixtures/DropdownOptionsHarness.svelte";

/**
 * Compiled for the server, with no `document` and no `matchMedia`. Whether a
 * menu opens in a sheet is decided in the browser when it opens, so what the
 * server renders does not depend on `presentation`: the browser's first
 * render has to match it. The shared Vitest config resolves `svelte` with the
 * `browser` condition, so the server runtime is named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

/** Ids are generated per render: take them out before comparing. */
const neutral = (body: string) => body.replace(/(id|for|aria-controls|aria-labelledby|aria-describedby)="[^"]*"/g, '$1=""');

describe("Dropdown and Select presentation on the server", () => {
    it("a closed Select renders the same markup whatever its presentation", () => {
        expect(typeof document).toBe("undefined");
        const options = [{ value: "a", label: "Alpha" }];
        const render = (presentation?: "auto" | "popover" | "sheet") =>
            neutral(renderOnServer(Select, { props: { label: "Team", options, presentation } }).body);
        expect(render("auto")).toBe(render("popover"));
        expect(render("sheet")).toBe(render("popover"));
        expect(render()).toBe(render("popover"));
        expect(render()).not.toContain('role="dialog"');
        expect(render()).not.toContain('role="listbox"');
    });

    it("a Dropdown rendered open is a pop-over on the server, for sheet and auto too", () => {
        const render = (presentation?: "auto" | "popover" | "sheet") =>
            neutral(renderOnServer(DropdownOptionsHarness, { props: { initialOpen: true, presentation } }).body);
        const popover = render("popover");
        expect(popover).toContain('role="menu"');
        expect(popover).not.toContain('role="dialog"');
        expect(render("sheet")).toBe(popover);
        expect(render("auto")).toBe(popover);
    });
});
