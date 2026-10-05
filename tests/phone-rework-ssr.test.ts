// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import Toast from "../src/components/atoms/Toast.svelte";
import Toaster from "../src/components/molecules/Toaster.svelte";
import ModalFullScreenHarness from "./fixtures/ModalFullScreenHarness.svelte";
import PageSafeAreaHarness from "./fixtures/PageSafeAreaHarness.svelte";
import TooltipTouchHarness from "./fixtures/TooltipTouchHarness.svelte";

/**
 * Compiled for the server, with no `window`, `document` or `matchMedia`: a
 * tooltip that measured the viewport, a modal that watched its scroller or a
 * page that looked for a shell in the DOM while rendering would throw. The
 * shared Vitest config resolves `svelte` with the `browser` condition, so the
 * server runtime is named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("Tooltip on the server", () => {
    it("renders a closed, parked bubble with no position of its own yet", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(TooltipTouchHarness, { props: {} });
        const bubble = /<div[^>]*role="tooltip"[^>]*>/.exec(body)?.[0] ?? "";
        expect(bubble).toContain('data-visible="false"');
        expect(bubble).toContain('aria-hidden="true"');
        // Parked from the first paint: a bubble near the edge widens no page before it hydrates.
        expect(bubble).toContain('data-parked="true"');
        expect(bubble).toContain('data-placement="top"');
        expect(bubble).not.toContain("style=");
        expect(body).toContain("Adds a question");
        // Nothing describes the trigger until the tooltip is open.
        expect(body).not.toContain("aria-describedby");
    });

    it("renders no bubble when disabled", () => {
        const { body } = renderOnServer(TooltipTouchHarness, { props: { disabled: true } });
        expect(body).not.toContain('role="tooltip"');
    });
});

describe("Modal fullScreen on the server", () => {
    it("renders nothing while closed", () => {
        const { body } = renderOnServer(ModalFullScreenHarness, { props: { fullScreen: true } });
        expect(body).not.toContain('role="dialog"');
    });

    it("renders an open full-screen modal in place, with its three parts", () => {
        const { body } = renderOnServer(ModalFullScreenHarness, {
            props: { initialOpen: true, fullScreen: true, portal: true },
        });
        const panel = /<div[^>]*role="dialog"[^>]*>/.exec(body)?.[0] ?? "";
        expect(panel).toContain('aria-modal="true"');
        expect(panel).toContain('data-full-screen="true"');
        expect(panel).toContain("h-dvh");
        expect(panel).toContain("rounded-none");
        const titleId = /aria-labelledby="([^"]+)"/.exec(panel)?.[1];
        expect(body).toMatch(new RegExp(`<h2[^>]*id="${titleId}"[^>]*>\\s*New quiz round`));
        expect(body).toContain('aria-label="Close"');
        // The content box is there, and not a Tab stop: that is decided once it can be measured.
        const content = /<div[^>]*data-modal-content[^>]*>/.exec(body)?.[0] ?? "";
        expect(content).toContain("overflow-y-auto");
        expect(content).not.toContain("tabindex");
        expect(body).toMatch(/<footer[^>]*safe-area-inset-bottom/);
        // In place: the portal is an action, and actions do not run here.
        expect(body.indexOf('data-testid="host"')).toBeLessThan(body.indexOf('role="dialog"'));
    });

    it('renders "mobile" with the rules for below md only', () => {
        const { body } = renderOnServer(ModalFullScreenHarness, {
            props: { initialOpen: true, fullScreen: "mobile" },
        });
        const panel = /<div[^>]*role="dialog"[^>]*>/.exec(body)?.[0] ?? "";
        expect(panel).toContain('data-full-screen="mobile"');
        expect(panel).toContain("max-md:h-dvh");
        expect(panel).toContain("md:rounded-overlay");
        expect(panel).not.toMatch(/[" ]h-dvh/);
    });

    it("renders the usual dialog without the prop", () => {
        const { body } = renderOnServer(ModalFullScreenHarness, { props: { initialOpen: true } });
        const panel = /<div[^>]*role="dialog"[^>]*>/.exec(body)?.[0] ?? "";
        expect(panel).not.toContain("data-full-screen");
        expect(panel).toContain("max-h-[90dvh]");
        expect(body).not.toContain("data-modal-content");
    });
});

describe("Page on the server", () => {
    it("renders the safe-area padding by default", () => {
        const { body } = renderOnServer(PageSafeAreaHarness, { props: {} });
        expect(body).toContain("pl-[env(safe-area-inset-left,0px)]");
        expect(body).toContain("pr-[env(safe-area-inset-right,0px)]");
        expect(body).toContain("pb-[env(safe-area-inset-bottom,0px)]");
    });

    it("renders none with safeArea={false}", () => {
        const { body } = renderOnServer(PageSafeAreaHarness, { props: { safeArea: false } });
        expect(body).not.toContain("safe-area");
    });

    it("knows it is inside an AppShell without a DOM to look in", () => {
        const { body } = renderOnServer(PageSafeAreaHarness, { props: { inShell: true } });
        const page = /<div[^>]*class="[^"]*space-y-10[^"]*"[^>]*>/.exec(body)?.[0] ?? "";
        expect(page).not.toBe("");
        expect(page).not.toContain("safe-area");
        // The shell's content element carries the insets, once.
        expect(body).toMatch(/data-app-shell-content[^>]*safe-area-inset-left|safe-area-inset-left[^>]*data-app-shell-content/);
    });
});

describe("Toaster and Toast on the server", () => {
    it("renders the region with its offsets, and passes a style through", () => {
        const { body } = renderOnServer(Toaster, {
            props: { style: "--toaster-bottom-offset: 65px" },
        });
        const region = /<div[^>]*data-zabi-toaster[^>]*>/.exec(body)?.[0] ?? "";
        expect(region).toContain('role="region"');
        expect(region).toContain('aria-label="Notifications"');
        expect(region).toContain("--app-shell-bottom-inset");
        expect(region).toContain("safe-area-inset-bottom");
        expect(region).toContain("--toaster-bottom-offset: 65px");
    });

    it("renders a top Toast below the safe area", () => {
        const { body } = renderOnServer(Toast, { props: { message: "Round starts" } });
        expect(body).toContain("safe-area-inset-top");
        expect(body).toContain('role="alert"');
    });
});
