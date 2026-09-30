import { describe, expect, it } from "vitest";
// @ts-expect-error - plain JS build script, no type declarations
import { checkStateVariants } from "../scripts/check-state-variants.js";

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
        expect(result.pairsSeen).toBeGreaterThan(20);
    });

    it("every base/variant pair in src/components has a rule that wins", () => {
        expect(result.errors).toEqual([]);
    });
});
