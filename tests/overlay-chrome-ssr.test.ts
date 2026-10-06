// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import OverlayChromeHarness from "./fixtures/OverlayChromeHarness.svelte";
import {
    OVERLAY_CHROME,
    OVERLAY_TITLE_2XL,
    OVERLAY_TITLE_HYPHENS,
    OVERLAY_TITLE_WRAP,
    OVERLAY_TITLE_XL,
    textIsEnlarged,
} from "../src/components/util/overlay-chrome";

/**
 * The node environment makes Vite compile the components for the server. The
 * shared Vitest config resolves `svelte` with the `browser` condition, so the
 * server runtime is named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const decode = (markup: string) => markup.replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">");

describe("overlay chrome on the server", () => {
    it.each([
        ["sheet", OVERLAY_TITLE_XL],
        ["modal", OVERLAY_TITLE_2XL],
        ["modal-full", OVERLAY_TITLE_2XL],
        ["drawer", OVERLAY_TITLE_2XL],
        ["slide", OVERLAY_TITLE_2XL],
    ] as const)("%s is served with its chrome capped, so nothing jumps on hydration", (kind, step) => {
        expect(typeof document).toBe("undefined");
        const body = decode(renderOnServer(OverlayChromeHarness, { props: { kind } }).body);

        const heading = /<h2[^>]*class="([^"]*)"[^>]*>\s*Lägg till på hemskärmen/.exec(body);
        expect(heading, "The title is rendered").toBeTruthy();
        for (const name of [...step.split(" "), ...OVERLAY_TITLE_WRAP.split(" ")]) {
            expect(heading![1].split(/\s+/)).toContain(name);
        }
        // The text setting is the reader's and is not known here: served as at the default size.
        expect(textIsEnlarged()).toBe(false);
        expect(heading![1].split(/\s+/)).not.toContain(OVERLAY_TITLE_HYPHENS);
        expect(body).toContain(OVERLAY_CHROME);
        expect(body).toMatch(/role="dialog"/);
        expect(body).toContain('lang="sv"');
    });
});
