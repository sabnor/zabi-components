// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import StringsHarness from "./fixtures/StringsHarness.svelte";

/**
 * Compiled for the server: the app's words are in the first markup it sends,
 * and a sidebar panel with three theme modes does not reach for `document`
 * while rendering. The shared Vitest config resolves `svelte` with the
 * `browser` condition, so the server runtime is named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const render = (props: Record<string, unknown>) => renderOnServer(StringsHarness, { props: props as never }).body;

describe("the app's words, on the server", () => {
    it.each([
        ["FormField", { requiredLabel: "(obligatoriskt)" }, "(obligatoriskt)", "(required)"],
        ["CodeBlock", { copyLabel: "Kopiera koden" }, "Kopiera koden", "Copy code to clipboard"],
        ["ColorPicker", { hexInput: "Hexvärde", open: "Öppna färgväljaren" }, "Öppna färgväljaren", "Open color picker"],
        ["ContactForm", { heading: "Hör av dig", submit: "Skicka" }, "Hör av dig", "Get in Touch"],
        ["PropsTable", { name: "Namn", empty: "Inga egenskaper." }, "Inga egenskaper.", "No documented props."],
        ["ComponentDemo", { code: "Kod", showCode: "Visa kod" }, "Visa kod", "Show code"],
        ["SidebarBrandHeader", { brandAlt: "Logotyp" }, 'alt="Logotyp"', 'alt="Brand"'],
        ["SidebarFooter", { accountAndSettings: "Konto och inställningar" }, "Konto och inställningar", "Account and settings"],
        ["SidebarAccountPanel", { theme: "Tema", signOut: "Logga ut från kontot" }, "Logga ut från kontot", "Sign out of this account"],
        ["SidebarNavigation", { primaryNavigation: "Huvudmeny", noMatchesTitle: "Inga träffar" }, "Inga träffar", "No matching navigation items"],
        ["TopNavbar", { openMenu: "Öppna menyn", opensInNewTab: "(öppnas i ny flik)" }, "(öppnas i ny flik)", "(opens in a new tab)"],
    ])("%s", (kind, words, mine, english) => {
        expect(typeof document).toBe("undefined");
        const translated = render({ kind, words });
        expect(translated).toContain(mine);
        expect(translated).not.toContain(english);
        // And without: what it always said.
        expect(render({ kind })).toContain(english);
    });

    it("SidebarAccountPanel with three theme modes renders without a document", () => {
        const body = render({ kind: "SidebarAccountPanel", themeModes: "three" });
        // The page's mode is not known here: the row is there, and is set right once it runs.
        expect(body).toContain("Theme");
    });

    it("Toggle: the app's aria-label is in the markup, the fallback only without a name", () => {
        expect(render({ kind: "Toggle", words: { ariaLabel: "Mörkt läge" } })).toContain('aria-label="Mörkt läge"');
        expect(render({ kind: "Toggle" })).toContain('aria-label="Toggle"');
        expect(render({ kind: "Toggle", words: { ariaLabelledby: "namn" } })).not.toContain("aria-label=");
    });
});
