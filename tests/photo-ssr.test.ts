// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import GalleryHarness from "./fixtures/GalleryHarness.svelte";

/**
 * Compiled for the server, with no `document`, `window` or `ResizeObserver`:
 * a portal, a scroll lock, a pointer listener or a measurement that reached
 * for one while rendering would throw. The shared Vitest config resolves
 * `svelte` with the `browser` condition, so the server runtime is named by
 * path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const render = (props: Record<string, unknown>) => renderOnServer(GalleryHarness, { props }).body;

describe("PhotoGrid on the server", () => {
    it("renders a named list of named tiles, each with a lazy thumbnail under a placeholder", () => {
        expect(typeof document).toBe("undefined");
        const body = render({ withViewer: false });
        expect(body).toMatch(/<ul[^>]*role="list"[^>]*aria-label="Quiz night photos"/);
        expect(body.match(/data-photo-key="/g)).toHaveLength(6);
        expect(body).toMatch(/<button[^>]*aria-label="The bar"[^>]*data-photo-key="p3"/);
        expect(body.match(/loading="lazy"/g)).toHaveLength(6);
        // Nothing has loaded on the server: every tile shows its placeholder.
        expect(body.match(/data-photo-grid-skeleton/g)).toHaveLength(6);
        expect(body).toContain("#thumb-1");
        expect(body).not.toContain("#full-1");
    });

    it("has one Tab stop from the first byte, and the hint wired to it", () => {
        const body = render({ withViewer: false });
        const stops = [...body.matchAll(/<button[^>]*data-photo-grid-item[^>]*>/g)].filter((match) =>
            match[0].includes('tabindex="0"'),
        );
        expect(stops).toHaveLength(1);
        expect(stops[0][0]).toContain('data-photo-key="p1"');
        const hint = /aria-describedby="([^"]+)"/.exec(stops[0][0])?.[1];
        expect(body).toMatch(new RegExp(`<p[^>]*id="${hint}"`));
    });

    it("renders the add tile, the count of the rest, and the columns asked for", () => {
        const body = render({ withViewer: false, withAdd: true, count: 14, max: 8, columns: 4 });
        expect(body).toMatch(/<button[^>]*data-photo-grid-add/);
        expect(body).toContain("Add photo");
        expect(body.match(/data-photo-key="/g)).toHaveLength(8);
        expect(body).toContain('aria-label="Score sheet 8, 6 more photos"');
        expect(body).toMatch(/data-photo-grid-more[^>]*>[\s\S]*?\+6/);
        expect(body).toContain("repeat(4, minmax(0, 1fr))");
        // The add tile is the first, and so the Tab stop.
        expect(/<button[^>]*data-photo-grid-add[^>]*>/.exec(body)?.[0]).toContain('tabindex="0"');
    });

    it("renders the selection, and the selected tile as the Tab stop", () => {
        const body = render({ withViewer: false, selectable: "single", initialSelected: "p4" });
        const tile = /<button[^>]*data-photo-key="p4"[^>]*>/.exec(body)?.[0] ?? "";
        expect(tile).toContain('aria-pressed="true"');
        expect(tile).toContain('tabindex="0"');
        expect(body.match(/aria-pressed="true"/g)).toHaveLength(1);
        expect(body.match(/data-photo-grid-check/g)).toHaveLength(1);
        expect(body).toContain('aria-label="Open Trophy"');
    });
});

describe("PhotoViewer on the server", () => {
    it("renders nothing while closed", () => {
        const body = render({});
        expect(body).not.toContain('role="dialog"');
        expect(body).toContain('data-photo-key="p1"');
    });

    it("renders an open viewer in place, named, with the photo, its box and its neighbours", () => {
        expect(typeof document).toBe("undefined");
        const body = render({ initialOpen: true, initialIndex: 1 });
        const panel = /<div[^>]*role="dialog"[^>]*>/.exec(body)?.[0] ?? "";
        expect(panel).toContain('aria-modal="true"');
        expect(panel).toContain('aria-label="Photo viewer"');
        // In place: the portal is an action, and actions do not run here.
        expect(body.indexOf('data-testid="host"')).toBeLessThan(body.indexOf('role="dialog"'));

        const current = /<img[^>]*alt="Score sheet"[^>]*>/.exec(body)?.[0] ?? "";
        expect(current).toContain("#full-2");
        expect(current).toContain('width="1600"');
        expect(current).toContain('height="1200"');
        expect(body).toContain("aspect-ratio: 1600 / 1200");
        // The blurred thumbnail stands in until the full image loads in the browser.
        expect(body).toMatch(/<img[^>]*#thumb-2[^>]*data-photo-viewer-thumb/);
        expect(body).toContain("#full-1");
        expect(body).toContain("#full-3");
        expect(body).not.toContain("#full-4");

        expect(body).toMatch(/data-photo-viewer-counter[^>]*>\s*2 \/ 6/);
        expect(body).toMatch(/aria-live="polite"[^>]*>[\s\S]*?Score sheet, 2 of 6/);
        for (const name of ["Close", "Previous photo", "Next photo"]) {
            expect(body).toContain(`aria-label="${name}"`);
        }
        expect(body).toContain("Round three, taken from the corner table.");
        // At rest: not zoomed, not dragged, no spinner yet.
        expect(panel).not.toContain("data-zoomed");
        expect(body).not.toContain("Loading photo");
    });

    it("renders the actions bar and the menu button, with the menu closed", () => {
        const noop = () => {};
        const body = render({
            initialOpen: true,
            actions: [
                { id: "share", label: "Share", onclick: noop },
                { id: "cover", label: "Set as cover", onclick: noop },
                { id: "download", label: "Download", onclick: noop },
                { id: "delete", label: "Delete", tone: "danger", onclick: noop },
            ],
        });
        expect(body).toMatch(/data-action="share"/);
        expect(body).toMatch(/data-action="cover"/);
        expect(body).not.toMatch(/data-action="delete"/);
        expect(body).toContain('aria-label="More actions"');
        expect(body).not.toContain('role="menu"');
    });

    it("renders nothing for an empty list, and marks the end for a last photo", () => {
        expect(render({ initialOpen: true, initialPhotos: [] })).not.toContain('role="dialog"');
        const body = render({ initialOpen: true, initialIndex: 5 });
        expect(/<button[^>]*aria-label="Next photo"[^>]*>/.exec(body)?.[0]).toContain('aria-disabled="true"');
        expect(/<button[^>]*aria-label="Previous photo"[^>]*>/.exec(body)?.[0]).not.toContain("aria-disabled");
    });
});
