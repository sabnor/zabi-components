// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import AppShellHarness from "./fixtures/AppShellHarness.svelte";

/**
 * Compiled for the server, with no `document` and no `ResizeObserver`: the
 * bars cannot be measured, so the layout must not depend on it and the custom
 * properties must still have a usable value. The shared Vitest config resolves
 * `svelte` with the `browser` condition, so the server runtime is named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("AppShell on the server", () => {
    it("renders header, main and footer in order, without a document", () => {
        expect(typeof document).toBe("undefined");
        const { body } = renderOnServer(AppShellHarness, { props: {} });
        const header = body.indexOf("<header");
        const main = body.indexOf("<main");
        const nav = body.indexOf("<nav");
        expect(header).toBeGreaterThan(-1);
        expect(main).toBeGreaterThan(header);
        expect(nav).toBeGreaterThan(body.indexOf("</main>"));
        expect(body).toContain("Ten questions, one point each.");
    });

    it("renders the content in a div, and no main, when asked", () => {
        const { body } = renderOnServer(AppShellHarness, { props: { contentElement: "div" } });
        expect(body).not.toContain("<main");
        const content = /<div[^>]*data-app-shell-content[^>]*>/.exec(body)?.[0] ?? "";
        expect(content).toContain("safe-area-inset-left");
        expect(body.indexOf("data-app-shell-content")).toBeGreaterThan(body.indexOf("<header"));
        expect(body.indexOf("<nav")).toBeGreaterThan(body.indexOf("data-app-shell-content"));
        expect(body).toContain("Ten questions, one point each.");
    });

    it("leaves the top padding off the content with flushTop and no header, and keeps it otherwise", () => {
        const content = (props: Record<string, unknown>) =>
            /<[a-z]+[^>]*data-app-shell-content[^>]*>/.exec(
                renderOnServer(AppShellHarness, { props }).body,
            )?.[0] ?? "";
        expect(content({ withHeader: false })).toContain("safe-area-inset-top");
        expect(content({ withHeader: false, flushTop: true })).not.toContain("safe-area-inset-top");
        expect(content({ withHeader: false, flushTop: true })).toContain("safe-area-inset-left");
    });

    it("marks the content element when it is a main", () => {
        const { body } = renderOnServer(AppShellHarness, { props: {} });
        expect(body).toMatch(/<main[^>]*data-app-shell-content/);
        expect(body.match(/<main/g)).toHaveLength(1);
    });

    it("gives the custom properties the default bar heights", () => {
        const { body } = renderOnServer(AppShellHarness, { props: {} });
        const host = /<div[^>]*data-app-shell(?=[\s>=])[^>]*>/.exec(body)?.[0] ?? "";
        expect(host).toContain(
            "--app-shell-top-inset: calc(56px + env(safe-area-inset-top, 0px))",
        );
        expect(host).toContain(
            "--app-shell-bottom-inset: calc(64px + env(safe-area-inset-bottom, 0px))",
        );
    });

    it("tells the bars they are inside it: the tab bar is not fixed, and the page is marked", () => {
        const { body } = renderOnServer(AppShellHarness, { props: { active: "/inbox" } });
        const nav = /<nav[^>]*>/.exec(body)?.[0] ?? "";
        expect(nav).toContain('data-position="static"');
        expect(nav).not.toMatch(/class="[^"]*(^|\s)fixed(\s|")/);
        expect(/<a[^>]*href="\/inbox"[^>]*>/.exec(body)?.[0]).toContain('aria-current="page"');
    });

    it("renders without either bar", () => {
        const { body } = renderOnServer(AppShellHarness, {
            props: { withHeader: false, withFooter: false },
        });
        expect(body).not.toContain("<header");
        expect(body).not.toContain("<nav");
        expect(body).toContain("--app-shell-top-inset: env(safe-area-inset-top, 0px)");
        expect(body).toContain("<main");
    });
});
