import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { IRIS, applyAccent, tokensFor } from "../src/lib/marketing/brand-accents";

const appCss = fs.readFileSync(
    path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "../src/app.css",
    ),
    "utf-8",
);

/** `@theme` holds the light values; `.dark` restates only what changes. */
function declaredValue(token: string, dark: boolean): string | undefined {
    const themeStart = appCss.indexOf("@theme");
    const darkStart = appCss.indexOf("\n.dark");
    const block = dark
        ? appCss.slice(darkStart)
        : appCss.slice(themeStart, darkStart);
    const match = new RegExp(
        `${token.replace(/[-]/g, "\\-")}:\\s*([^;]+);`,
    ).exec(block);
    return match ? match[1].split(/\s+/).join(" ") : undefined;
}

describe("the Iris map", () => {
    /**
     * Iris is written out rather than left empty, so the RebrandDemo can scope a
     * card back to the default theme even while the switcher has put another
     * accent on `:root`. That only works while these match the stylesheet.
     */
    it.each(Object.entries(IRIS.light))(
        "%s matches the light value in app.css",
        (token, value) => {
            expect(declaredValue(token, false)).toBe(value);
        },
    );

    it.each(Object.entries(IRIS.dark))(
        "%s matches the dark value in app.css",
        (token, value) => {
            expect(declaredValue(token, true)).toBe(value);
        },
    );

    it("resolves to a full set of tokens in both themes", () => {
        for (const dark of [false, true]) {
            const tokens = tokensFor("iris", dark);
            expect(Object.keys(tokens).length).toBe(
                Object.keys(IRIS.light).length,
            );
            expect(tokens["--color-action-primary"]).toBeTruthy();
        }
    });

    it("scopes an accent without inheriting the document's", () => {
        // The bug this exists for: Iris used to be an empty map, so a card
        // scoped to Iris showed whatever the switcher had put on the root.
        const root = document.documentElement;
        applyAccent(root, "pine", false);
        expect(root.style.getPropertyValue("--color-action-primary")).not.toBe(
            "",
        );

        expect(tokensFor("iris", false)["--color-action-primary"]).toBe(
            IRIS.light["--color-action-primary"],
        );

        applyAccent(root, "iris", false);
        // Back to Iris means the stylesheet decides again, not a third blend.
        expect(root.style.getPropertyValue("--color-action-primary")).toBe("");
    });
});
