// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import MapView from "../src/components/molecules/MapView.svelte";
import { mapViewSupported } from "../src/components/util/map-view";

/**
 * Compiled for the server, with no `document` or `window`: the map library is
 * asked for only when the component is mounted in a browser, so rendering
 * must neither load it nor reach for the page. The shared Vitest config
 * resolves `svelte` with the `browser` condition, so the server runtime is
 * named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("MapView on the server", () => {
    it("renders its box, loading, with no marker and without asking for the library", () => {
        expect(typeof document).toBe("undefined");
        const load = vi.fn(() => Promise.reject(new Error("not on the server")));
        const { body } = renderOnServer(MapView, {
            props: {
                points: [{ id: "a", lng: 18, lat: 59.3, label: "Bar Kaja" }],
                styleLight: "light.json",
                load,
            },
        });
        expect(body).toMatch(/<div[^>]*role="group"[^>]*aria-label="Map"/);
        expect(body).toContain('data-status="loading"');
        expect(body).not.toContain("data-map-marker=");
        expect(load).not.toHaveBeenCalled();
    });

    it("answers the WebGL question with no", () => {
        expect(mapViewSupported()).toBe(false);
    });
});
