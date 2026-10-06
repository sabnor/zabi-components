import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
// @ts-expect-error - plain JS build script, no type declarations
import { checkStateVariants, NEVER_TOGETHER } from "../scripts/check-state-variants.js";

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * The colour classes in `src/app.css` are outside every cascade layer, so a
 * generated state variant on the same element cannot beat them:
 * `text-description hover:text-headline` compiled and never changed on hover.
 * `scripts/check-state-variants.js` has the rule and the reasoning; this runs
 * it with the unit tests, because nothing else fails when a variant is dead.
 */
describe("state variants of the hand-written colour classes", () => {
    const result = checkStateVariants();

    it("finds pairs to check", () => {
        // 75 while only pairs inside one string were read; the joined lists roughly doubled it.
        expect(result.pairsSeen).toBeGreaterThan(100);
    });

    it("every base/variant pair in src/components has a rule that wins", () => {
        expect(result.errors).toEqual([]);
    });
});

/**
 * The guard is only worth its rule list if deleting a rule fails it. Three
 * deletions used to pass, because of how the source was read:
 *   - Card writes `bg-card` in one string and its hover and pressed variants
 *     in another, joined by `cn()`; only pairs inside one string were seen;
 *   - an apostrophe in a comment in MediaGrid shifted the matching of quotes,
 *     so its class list was read as the gap between two strings.
 */
describe("the guard sees class lists that are written apart", () => {
    const appCss = fs.readFileSync(path.join(projectRoot, "src/app.css"), "utf-8");
    const without = (selector: string): string[] => {
        const start = appCss.indexOf(`${selector} {`);
        expect(start, selector).toBeGreaterThan(-1);
        const rule = appCss.slice(start, appCss.indexOf("}", start) + 1);
        const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "zabi-state-variants-")), "app.css");
        fs.writeFileSync(file, appCss.replace(rule, ""));
        try {
            return checkStateVariants({ cssPath: file }).errors;
        } finally {
            fs.rmSync(path.dirname(file), { recursive: true, force: true });
        }
    };

    it.each([
        [".hover\\:bg-card-hover:hover", "bg-card + hover:bg-card-hover", "Card.svelte"],
        [".active\\:bg-card-active:active", "bg-card + active:bg-card-active", "Card.svelte"],
        [
            ".enabled\\:hover\\:border-border-medium:enabled:hover",
            "border-border + enabled:hover:border-border-medium",
            "MediaGrid.svelte",
        ],
        // The pair the wider reading found: a toggled-on danger-tone IconButton, held down.
        [
            ".active\\:bg-action-danger-subtle-hover:active",
            "bg-action-danger-subtle + active:bg-action-danger-subtle-hover",
            "IconButton.svelte",
        ],
        // And one it always caught, so the wider reading did not cost the narrow one.
        [".hover\\:text-headline:hover", "text-description + hover:text-headline", "Drawer.svelte"],
    ])("deleting %s fails", (selector, pair, file) => {
        const errors = without(selector).join("\n");
        expect(errors).toContain(pair);
        expect(errors).toContain(file);
    });

    it("every NEVER_TOGETHER entry says why", () => {
        expect(NEVER_TOGETHER.size).toBeGreaterThan(0);
        for (const [entry, reason] of NEVER_TOGETHER) {
            expect(reason.length, entry).toBeGreaterThan(40);
        }
        // An entry the reader no longer produces is reported by the guard itself,
        // which the "has a rule that wins" test above holds to no errors.
    });
});
