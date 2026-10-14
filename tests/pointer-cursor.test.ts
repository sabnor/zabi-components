import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * A `<button>` has the default arrow in Tailwind 4, so each thing that can be
 * pressed names its own cursor. Two were missed: an option in `Select`'s list
 * and `ActionPanel` as a button. jsdom has no cursor to read, so this reads
 * the class where it is written.
 */
const read = (path: string) => readFileSync(join(__dirname, "..", "src", "components", path), "utf8");

describe("pointer cursor on things that can be pressed", () => {
    it("a Select option has it, and a disabled one says it cannot be chosen", () => {
        const option = /role="option"[\s\S]*?class="([^"]*)"/.exec(read("atoms/Select.svelte"))?.[1] ?? "";
        expect(option).toMatch(/(?:^|\s)cursor-pointer(?:\s|$)/);
        expect(option).toContain("aria-disabled:cursor-not-allowed");
    });

    it("an ActionPanel that can be pressed has it", () => {
        const interactive = /const interactiveClasses =\s*"([^"]*)"/.exec(read("atoms/ActionPanel.svelte"))?.[1] ?? "";
        expect(interactive).toMatch(/(?:^|\s)cursor-pointer(?:\s|$)/);
    });

    it("a DropdownItem has it", () => {
        expect(read("molecules/DropdownItem.svelte")).toContain("cursor-pointer hover:bg-surface-overlay-hover");
    });
});
