// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import Toast from "../src/components/atoms/Toast.svelte";
import Alert from "../src/components/molecules/Alert.svelte";
import Toaster from "../src/components/molecules/Toaster.svelte";

/**
 * Compiled for the server: the names an app gives are in the first markup it
 * sends, not put there once the page runs. The shared Vitest config resolves
 * `svelte` with the `browser` condition, so the server runtime is named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("names from the app, on the server", () => {
    it("Toaster: the region is named by strings.regionLabel, and by aria-label before that", () => {
        expect(typeof document).toBe("undefined");
        const named = renderOnServer(Toaster, { props: { strings: { regionLabel: "Aviseringar" } } }).body;
        expect(named).toContain('aria-label="Aviseringar"');
        expect(named).not.toContain("Notifications");

        const both = renderOnServer(Toaster, {
            props: { "aria-label": "Meddelanden", strings: { regionLabel: "Aviseringar" } },
        }).body;
        expect(both).toContain('aria-label="Meddelanden"');
        expect(both).not.toContain("Aviseringar");

        expect(renderOnServer(Toaster, { props: {} }).body).toContain('aria-label="Notifications"');
    });

    it("Toast: closeLabel", () => {
        const { body } = renderOnServer(Toast, { props: { message: "Rundan börjar.", closeLabel: "Stäng" } });
        expect(body).toContain('aria-label="Stäng"');
        expect(body).not.toContain("Close notification");
        expect(renderOnServer(Toast, { props: { message: "x" } }).body).toContain('aria-label="Close notification"');
    });

    it("Alert: closeLabel", () => {
        const { body } = renderOnServer(Alert, {
            props: { message: "Rundan är slut.", closable: true, closeLabel: "Stäng" },
        });
        expect(body).toContain('aria-label="Stäng"');
        expect(body).not.toContain("Dismiss alert");
        expect(renderOnServer(Alert, { props: { message: "x", closable: true } }).body).toContain(
            'aria-label="Dismiss alert"',
        );
    });
});
