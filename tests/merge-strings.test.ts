import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import AvatarGroup from "../src/components/molecules/AvatarGroup.svelte";
import { mergeStrings } from "../src/components/util/ready-made-strings.js";

afterEach(cleanup);

describe("mergeStrings", () => {
    const defaults = { a: "A", b: "B", c: "C" } as { a: string; b: string | null; c: string };

    it("skips undefined values", () => {
        expect(mergeStrings(defaults, { a: undefined, b: "x" })).toEqual({ a: "A", b: "x", c: "C" });
    });
    it("keeps null and the empty string", () => {
        expect(mergeStrings(defaults, { a: "", b: null })).toEqual({ a: "", b: null, c: "C" });
    });
    it("lets the later layer win and ignores missing layers", () => {
        expect(mergeStrings(defaults, { a: "1" }, undefined, null, { a: "2" })).toEqual({ a: "2", b: "B", c: "C" });
    });
    it("does not change the defaults object", () => {
        mergeStrings(defaults, { a: "z" });
        expect(defaults.a).toBe("A");
    });
});

describe("strings with an explicit undefined", () => {
    it("AvatarGroup keeps its default words", () => {
        const people = [{ name: "Ada" }, { name: "Bo" }, { name: "Cy" }, { name: "Di" }];
        const base = render(AvatarGroup, { people, max: 2 });
        const before = base.container.innerHTML;
        cleanup();
        const { container } = render(AvatarGroup, {
            people,
            max: 2,
            strings: { more: undefined } as never,
        });
        expect(container.innerHTML).toBe(before);
        expect(screen.queryByText("undefined")).toBeNull();
    });
});
