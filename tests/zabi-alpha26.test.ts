import { cleanup, render, screen } from "@testing-library/svelte";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import Card from "../src/components/atoms/Card.svelte";
import Toggle from "../src/components/atoms/Toggle.svelte";

afterEach(cleanup);

const css = readFileSync(resolve(__dirname, "../src/app.css"), "utf8");
const toasterToast = readFileSync(resolve(__dirname, "../src/components/molecules/ToasterToast.svelte"), "utf8");

describe("Toggle default knob (Z-121, D240)", () => {
    const thumbOf = () => screen.getByRole("switch").querySelector(".toggle-switch-thumb")!;

    it("off wears the thumb class, on the checked class", () => {
        render(Toggle, { props: { label: "A" } });
        expect(thumbOf().classList.contains("bg-toggle-thumb")).toBe(true);
        expect(thumbOf().classList.contains("bg-toggle-thumb-checked")).toBe(false);
        cleanup();
        render(Toggle, { props: { label: "A", checked: true } });
        expect(thumbOf().classList.contains("bg-toggle-thumb-checked")).toBe(true);
        expect(thumbOf().classList.contains("bg-toggle-thumb")).toBe(false);
    });

    it("the consumer's tokens come first, then the default knob", () => {
        expect(css).toMatch(
            /\.bg-toggle-thumb-checked \{\s*background-color: var\(--color-toggle-thumb-checked, var\(--color-toggle-thumb, var\(--color-toggle-knob-checked\)\)\);/,
        );
        expect(css).toMatch(/^\s*--color-toggle-knob: var\(--color-base-500\);/m);
        expect(css).toMatch(/^\s*--color-toggle-knob: var\(--color-base-700\);/m);
    });

    it("both classes sit before the forced-colours thumb rule", () => {
        const forcedThumb = css.indexOf(".toggle-switch-thumb {\n    top: 1px");
        expect(css.indexOf(".bg-toggle-thumb-checked {")).toBeLessThan(forcedThumb);
    });
});

describe("busy Card and toast track in forced colours (D242)", () => {
    it("a busy button card carries GrayText text and a dashed GrayText edge, only under forced colours", () => {
        render(Card, { props: { type: "button", loading: true } });
        const names = screen.getByRole("button").className.split(/\s+/);
        expect(names).toContain("forced-colors:text-[color:GrayText]");
        expect(names).toContain("forced-colors:outline-dashed");
        expect(names).toContain("forced-colors:outline-[color:GrayText]");
        expect(names.filter((n) => /outline/.test(n)).every((n) => n.startsWith("forced-colors:"))).toBe(true);
    });

    it("a card that is not busy has none of it", () => {
        render(Card, { props: { type: "button" } });
        expect(screen.getByRole("button").className).not.toContain("GrayText");
    });

    it("the toast time bar's track has a CanvasText edge in forced colours", () => {
        expect(toasterToast).toContain("forced-colors:outline-[color:CanvasText]");
    });
});
