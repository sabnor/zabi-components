// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import FloatingActionButton from "../src/components/atoms/FloatingActionButton.svelte";
import AppShellHarness from "./fixtures/AppShellHarness.svelte";
import BottomSheetHarness from "./fixtures/BottomSheetHarness.svelte";
import MobileFormHarness from "./fixtures/MobileFormHarness.svelte";

/**
 * Compiled for the server, with no `window`, `document`, `visualViewport` or
 * `ResizeObserver`: a portal, a scroll lock, a drag listener or a keyboard
 * measurement that reached for one while rendering would throw. The shared
 * Vitest config resolves `svelte` with the `browser` condition, so the server
 * runtime is named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("BottomSheet on the server", () => {
    it("renders nothing while closed", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(BottomSheetHarness, { props: {} });
        expect(body).not.toContain('role="dialog"');
        expect(body).toContain("Open filters");
    });

    it("renders an open sheet in place, wired and at its snap point", () => {
        const { body } = renderOnServer(BottomSheetHarness, {
            props: { initialOpen: true, description: "Narrow the list." },
        });
        const panel = /<div[^>]*role="dialog"[^>]*>/.exec(body)?.[0] ?? "";
        expect(panel).toContain('aria-modal="true"');
        expect(panel).toContain('data-snap="half"');
        expect(panel).toContain("50%");
        const titleId = /aria-labelledby="([^"]+)"/.exec(panel)?.[1];
        expect(body).toMatch(new RegExp(`<h2[^>]*id="${titleId}"[^>]*>\\s*Filters`));
        const descriptionId = /aria-describedby="([^"]+)"/.exec(panel)?.[1];
        expect(body).toMatch(new RegExp(`<p[^>]*id="${descriptionId}"[^>]*>\\s*Narrow the list.`));
        expect(body).toMatch(/<button[^>]*data-sheet-grip[^>]*aria-label="Expand"/);
        expect(body).toContain('aria-label="Close"');
        expect(body).toContain("Show results");
        // In place: the portal is an action, and actions do not run here.
        expect(body.indexOf('data-testid="host"')).toBeLessThan(body.indexOf('role="dialog"'));
    });

    it("renders the snap point it is given, and a plain grip with only one", () => {
        const { body } = renderOnServer(BottomSheetHarness, {
            props: { initialOpen: true, initialSnap: "full", snapPoints: ["full"] },
        });
        expect(body).toContain('data-snap="full"');
        expect(body).not.toContain('aria-label="Expand"');
        expect(body).not.toContain('aria-label="Collapse"');
        expect(body).toMatch(/<div[^>]*data-sheet-grip/);
    });
});

describe("FloatingActionButton on the server", () => {
    it("renders a fixed, named button outside a shell", () => {
        const { body } = renderOnServer(FloatingActionButton, { props: { label: "New quiz" } });
        const button = /<button[^>]*>/.exec(body)?.[0] ?? "";
        expect(button).toContain('aria-label="New quiz"');
        expect(button).toContain('type="button"');
        expect(button).toContain('data-position="bottom-end"');
        expect(button).toMatch(/class="[^"]*(\s)fixed(\s)/);
        expect(body).toContain("<svg");
    });

    it("renders a link with href and its label when extended", () => {
        const { body } = renderOnServer(FloatingActionButton, {
            props: { label: "Write a question", href: "/new", extended: true },
        });
        const link = /<a[^>]*>/.exec(body)?.[0] ?? "";
        expect(link).toContain('href="/new"');
        expect(link).not.toContain("aria-label");
        expect(body).toContain("Write a question");
    });

    it("knows it is inside a shell, and is placed against it", () => {
        const { body } = renderOnServer(MobileFormHarness, { props: { piece: "fab-in-shell" } });
        const button = /<button[^>]*aria-label="New quiz"[^>]*>/.exec(body)?.[0] ?? "";
        expect(button).toContain("--app-shell-bottom-inset");
        expect(button).toMatch(/class="[^"]*(\s)absolute(\s)/);
        expect(button).not.toMatch(/class="[^"]*(\s)fixed(\s)/);
    });
});

describe("StickyActionBar on the server", () => {
    it("renders at rest: sticky, padded for the home indicator, not lifted", () => {
        expect(typeof window).toBe("undefined");
        const { body } = renderOnServer(MobileFormHarness, {
            props: { piece: "bar", label: "Visit" },
        });
        const bar = /<div[^>]*data-testid="bar"[^>]*>/.exec(body)?.[0] ?? "";
        expect(bar).toContain('role="group"');
        expect(bar).toContain('aria-label="Visit"');
        expect(bar).toContain("sticky");
        expect(bar).toContain("safe-area-inset-bottom");
        expect(bar).not.toContain("data-keyboard-open");
        expect(bar).not.toContain("margin-bottom");
        expect(body).toContain("Save visit");
    });
});

describe("SlideUp on the server", () => {
    it("renders the grip only with swipeToClose", () => {
        const plain = renderOnServer(MobileFormHarness, {
            props: { piece: "slide-up", initialOpen: true },
        }).body;
        expect(plain).toContain('role="dialog"');
        expect(plain).not.toContain("data-sheet-grip");
        expect(plain).toContain("safe-area-inset-bottom");

        const swipe = renderOnServer(MobileFormHarness, {
            props: { piece: "slide-up", initialOpen: true, swipeToClose: true },
        }).body;
        expect(swipe).toMatch(/<div[^>]*data-sheet-grip[^>]*aria-hidden="true"/);
        expect(swipe).toContain('aria-label="Close"');
    });
});

describe("AppShell on the server", () => {
    it("does not reach for <html> to mirror its insets", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(AppShellHarness, { props: {} });
        expect(body).toContain("--app-shell-bottom-inset");
    });
});
