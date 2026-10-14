// @vitest-environment node
import { createRawSnippet } from "svelte";
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import SpeechBubble from "../src/components/atoms/SpeechBubble.svelte";

vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("SpeechBubble (server render)", () => {
    it("renders the caption, then the quotation, with the decoration hidden", () => {
        const children = createRawSnippet(() => ({ render: () => "<p>Hej, vi vill boka bord.</p>" }));
        const { body } = renderOnServer(SpeechBubble, { props: { label: "Säg så här", children } });
        expect(body).toMatch(/<figure[^>]*data-side="end"[^>]*data-tone="ink"/);
        expect(body.indexOf("<figcaption")).toBeGreaterThan(-1);
        expect(body.indexOf("<figcaption")).toBeLessThan(body.indexOf("<blockquote"));
        expect(body).toContain("Säg så här");
        expect(body).toContain("Hej, vi vill boka bord.");
        expect(body).toMatch(/<span[^>]*aria-hidden="true"[^>]*>(?:<!--.*?-->)*<span[^>]*class="fill/);
    });
});
