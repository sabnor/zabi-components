import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { resolveDrawerEdge } from "../src/components/util/drawer";
import DrawerHarness from "./fixtures/DrawerHarness.svelte";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
    document.body.removeAttribute("style");
    document.documentElement.removeAttribute("dir");
    delete document.body.dataset.zabiScrollLock;
    delete document.body.dataset.zabiScrollLockOverflow;
});

const state = () => screen.getByTestId("state").textContent?.trim();
const drawer = () => screen.getByRole("dialog", { name: "Choose a project" });
const opener = () => screen.getByRole("button", { name: "Open projects" });
const closeButton = (name = "Close") =>
    within(drawer()).getByRole("button", { name });

/**
 * What a browser does when the focused control is disabled: focus falls to
 * `<body>`. jsdom leaves it on the disabled button, so put it there by hand.
 */
function dropFocusOnBody() {
    document.body.tabIndex = -1;
    document.body.focus();
    document.body.removeAttribute("tabindex");
    expect(document.activeElement).toBe(document.body);
}

/** The overlays move focus into the panel on the next macrotask. */
const settled = () => new Promise((resolve) => setTimeout(resolve, 0));

async function openDrawer(user: ReturnType<typeof userEvent.setup>) {
    await user.click(opener());
    await settled();
}

describe("resolveDrawerEdge", () => {
    it("keeps left and right physical in both directions", () => {
        expect(resolveDrawerEdge("left", false)).toBe("left");
        expect(resolveDrawerEdge("left", true)).toBe("left");
        expect(resolveDrawerEdge("right", false)).toBe("right");
        expect(resolveDrawerEdge("right", true)).toBe("right");
    });

    it("mirrors start and end in a right-to-left page", () => {
        expect(resolveDrawerEdge("start", false)).toBe("left");
        expect(resolveDrawerEdge("end", false)).toBe("right");
        expect(resolveDrawerEdge("start", true)).toBe("right");
        expect(resolveDrawerEdge("end", true)).toBe("left");
    });
});

describe("Drawer semantics", () => {
    it("is a modal dialog named by its title and described by its description", () => {
        render(DrawerHarness, {
            props: { initialOpen: true, description: "Pick where the page goes." },
        });

        const panel = drawer();
        expect(panel.getAttribute("aria-modal")).toBe("true");
        expect(panel.getAttribute("tabindex")).toBe("-1");
        expect(
            screen.getByRole("dialog", { description: "Pick where the page goes." }),
        ).toBe(panel);
        expect(screen.getByRole("heading", { level: 2, name: "Choose a project" })).toBeTruthy();
        expect(screen.getByTestId("drawer")).toBe(panel);
    });

    it("has no description attribute without a description", () => {
        render(DrawerHarness, { props: { initialOpen: true } });
        expect(drawer().hasAttribute("aria-describedby")).toBe(false);
    });

    it("names the close button from closeLabel", () => {
        render(DrawerHarness, { props: { initialOpen: true, closeLabel: "Stäng" } });
        const button = closeButton("Stäng");
        expect(button.tagName).toBe("BUTTON");
        expect(button.getAttribute("type")).toBe("button");
        expect(within(drawer()).queryByRole("button", { name: "Close" })).toBeNull();
    });

    it("renders the footer snippet below the content", () => {
        render(DrawerHarness, { props: { initialOpen: true, withFooter: true } });
        const done = screen.getByRole("button", { name: "Done" });
        const apply = screen.getByRole("button", { name: "Apply" });
        expect(drawer().contains(done)).toBe(true);
        expect(
            apply.compareDocumentPosition(done) & Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();
    });

    it("renders nothing while closed", () => {
        render(DrawerHarness);
        expect(screen.queryByRole("dialog")).toBeNull();
    });
});

describe("Drawer side, size and surface", () => {
    it("defaults to the right edge at the md width", () => {
        render(DrawerHarness, { props: { initialOpen: true } });
        const panel = drawer();
        expect(panel.getAttribute("data-side")).toBe("right");
        expect(panel.className).toContain("right-0");
        expect(panel.className).toContain("border-l");
        expect(panel.className).toContain("w-[min(100%,28rem)]");
    });

    it.each([
        ["left", "left-0", "border-r"],
        ["start", "start-0", "border-e"],
        ["end", "end-0", "border-s"],
    ] as const)("anchors %s with %s", (side, edge, border) => {
        render(DrawerHarness, { props: { initialOpen: true, side } });
        expect(drawer().className).toContain(edge);
        expect(drawer().className).toContain(border);
    });

    it.each([
        ["sm", "w-[min(100%,20rem)]"],
        ["lg", "w-[min(100%,42rem)]"],
    ] as const)("caps the %s width to the viewport", (size, width) => {
        render(DrawerHarness, { props: { initialOpen: true, size } });
        expect(drawer().className).toContain(width);
    });

    it("paints the overlay surface on the modal layer", () => {
        render(DrawerHarness, { props: { initialOpen: true } });
        expect(drawer().className).toContain("bg-surface-overlay");
        expect(drawer().className).toContain("border-border-overlay");
        expect((drawer().parentElement as HTMLElement).className).toContain("z-modal");
    });
});

describe("Drawer motion", () => {
    function spyOnAnimate() {
        const animate = vi.fn();
        // jsdom has no Web Animations; the component skips the slide without it.
        Object.defineProperty(HTMLElement.prototype, "animate", {
            configurable: true,
            value: animate,
        });
        return {
            animate,
            restore: () => delete (HTMLElement.prototype as { animate?: unknown }).animate,
        };
    }
    const reducedMotion = (matches: boolean) =>
        vi.stubGlobal(
            "matchMedia",
            vi.fn(() => ({ matches })),
        );

    it.each([
        ["right", "ltr", "translateX(100%)"],
        ["left", "ltr", "translateX(-100%)"],
        ["start", "ltr", "translateX(-100%)"],
        ["start", "rtl", "translateX(100%)"],
        ["end", "rtl", "translateX(-100%)"],
        ["right", "rtl", "translateX(100%)"],
    ] as const)("slides %s in from its edge in %s", (side, dir, from) => {
        const spy = spyOnAnimate();
        reducedMotion(false);
        document.documentElement.setAttribute("dir", dir);
        try {
            render(DrawerHarness, { props: { initialOpen: true, side } });
            expect(spy.animate).toHaveBeenCalledTimes(1);
            const [frames] = spy.animate.mock.calls[0];
            expect(frames[0].transform).toBe(from);
            expect(frames[1].transform).toBe("translateX(0)");
        } finally {
            spy.restore();
        }
    });

    it("does not animate under prefers-reduced-motion", () => {
        const spy = spyOnAnimate();
        reducedMotion(true);
        try {
            render(DrawerHarness, { props: { initialOpen: true } });
            expect(spy.animate).not.toHaveBeenCalled();
            expect(drawer()).toBeTruthy();
        } finally {
            spy.restore();
        }
    });
});

describe("Drawer focus", () => {
    it("moves focus to the first control, then back to the opener on close", async () => {
        const user = userEvent.setup();
        render(DrawerHarness);

        await openDrawer(user);
        expect(document.activeElement).toBe(closeButton());

        await user.click(closeButton());
        expect(state()).toBe("closed");
        expect(document.activeElement).toBe(opener());
    });

    it("starts on the control initialFocus selects", async () => {
        const user = userEvent.setup();
        render(DrawerHarness, { props: { initialFocus: "#project-search" } });

        await openDrawer(user);
        expect(document.activeElement).toBe(
            screen.getByRole("textbox", { name: "Search projects" }),
        );
    });

    it("falls back to the first control when initialFocus matches nothing", async () => {
        const user = userEvent.setup();
        render(DrawerHarness, { props: { initialFocus: "#missing" } });

        await openDrawer(user);
        expect(document.activeElement).toBe(closeButton());
    });

    it("keeps Tab inside the panel in both directions", async () => {
        const user = userEvent.setup();
        render(DrawerHarness, { props: { withFooter: true } });

        await openDrawer(user);
        const first = closeButton();
        const last = screen.getByRole("button", { name: "Done" });

        await user.tab({ shift: true });
        expect(document.activeElement).toBe(last);
        await user.tab();
        expect(document.activeElement).toBe(first);
        await user.tab();
        expect(document.activeElement).toBe(
            screen.getByRole("textbox", { name: "Search projects" }),
        );
    });

    it("takes Tab and Escape back when the focused control is disabled", async () => {
        const user = userEvent.setup();
        render(DrawerHarness);

        await openDrawer(user);
        // Apply disables itself; a browser then drops focus on <body>.
        await user.click(screen.getByRole("button", { name: "Apply" }));
        dropFocusOnBody();

        await user.keyboard("{Tab}");
        expect(document.activeElement).toBe(closeButton());

        dropFocusOnBody();
        await user.keyboard("{Escape}");
        expect(state()).toBe("closed");
    });

    it("returns focus when the parent closes it", async () => {
        const user = userEvent.setup();
        render(DrawerHarness, { props: { withFooter: true } });

        await openDrawer(user);
        await user.click(screen.getByRole("button", { name: "Done" }));
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        expect(document.activeElement).toBe(opener());
    });
});

describe("Drawer closing", () => {
    it("reports what the user did", async () => {
        const user = userEvent.setup();
        const onclose = vi.fn();
        render(DrawerHarness, { props: { onclose } });

        await openDrawer(user);
        await user.keyboard("{Escape}");
        await openDrawer(user);
        await fireEvent.click(drawer().parentElement as HTMLElement);
        await openDrawer(user);
        await user.click(closeButton());

        expect(onclose.mock.calls).toEqual([
            [{ reason: "escape" }],
            [{ reason: "backdrop" }],
            [{ reason: "close-button" }],
        ]);
        expect(state()).toBe("closed");
    });

    it("stays open for a click inside the panel", async () => {
        const user = userEvent.setup();
        const onclose = vi.fn();
        render(DrawerHarness, { props: { initialOpen: true, onclose } });

        await user.click(screen.getByRole("heading", { name: "Choose a project" }));
        expect(state()).toBe("open");
        expect(onclose).not.toHaveBeenCalled();
    });

    it("does not report a close the parent made", async () => {
        const onclose = vi.fn();
        render(DrawerHarness, { props: { initialOpen: true, onclose } });

        await fireEvent.click(screen.getByRole("button", { name: "Close from parent" }));
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
        expect(onclose).not.toHaveBeenCalled();
    });

    it("ignores Escape, the backdrop and the close button when not dismissible", async () => {
        const user = userEvent.setup();
        const onclose = vi.fn();
        render(DrawerHarness, {
            props: { initialOpen: true, dismissible: false, onclose },
        });
        await settled();

        const close = closeButton();
        // Focusable, so it can keep the focus it may already hold.
        expect(close.getAttribute("aria-disabled")).toBe("true");
        expect((close as HTMLButtonElement).disabled).toBe(false);

        await user.keyboard("{Escape}");
        await fireEvent.click(drawer().parentElement as HTMLElement);
        await user.click(close);
        expect(state()).toBe("open");
        expect(onclose).not.toHaveBeenCalled();

        // The parent can still close it.
        await fireEvent.click(screen.getByRole("button", { name: "Close from parent" }));
        await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    });
});

describe("Drawer portal and scroll lock", () => {
    it("renders in document.body by default, and in place on request", () => {
        render(DrawerHarness, { props: { initialOpen: true } });
        expect(screen.getByTestId("host").contains(drawer())).toBe(false);
        expect(drawer().parentElement?.parentElement).toBe(document.body);
        cleanup();

        render(DrawerHarness, { props: { initialOpen: true, portal: false } });
        expect(screen.getByTestId("host").contains(drawer())).toBe(true);
    });

    it("locks body scroll while open and restores the previous value", async () => {
        const user = userEvent.setup();
        document.body.style.overflow = "auto";
        render(DrawerHarness);

        await openDrawer(user);
        expect(document.body.style.overflow).toBe("hidden");
        expect(document.body.dataset.zabiScrollLock).toBe("1");

        await user.keyboard("{Escape}");
        expect(document.body.style.overflow).toBe("auto");
        expect(document.body.dataset.zabiScrollLock).toBeUndefined();
    });

    it("leaves nothing behind when unmounted while open", () => {
        const view = render(DrawerHarness, { props: { initialOpen: true } });
        view.unmount();
        expect(document.querySelector('[role="dialog"]')).toBeNull();
        expect(document.body.style.overflow).toBe("");
        expect(document.body.dataset.zabiScrollLock).toBeUndefined();
    });
});

describe("Drawer with Modal", () => {
    it("opens over a modal: one lock, its own Tab cycle, Escape closes only the drawer", async () => {
        const user = userEvent.setup();
        render(DrawerHarness, { props: { nesting: "drawer-in-modal" } });

        const editOpener = screen.getByRole("button", { name: "Edit page" });
        await user.click(editOpener);
        await settled();
        const modal = screen.getByRole("dialog", { name: "Edit page" });
        expect(document.body.dataset.zabiScrollLock).toBe("1");

        await user.click(opener());
        await settled();
        expect(document.body.dataset.zabiScrollLock).toBe("2");
        expect(document.activeElement).toBe(closeButton());
        // Later in the document than the modal, so it stacks above it.
        expect(
            modal.compareDocumentPosition(drawer()) & Node.DOCUMENT_POSITION_FOLLOWING,
        ).toBeTruthy();

        // The modal underneath must not pull Tab back to its own controls.
        await user.tab();
        expect(document.activeElement).toBe(
            screen.getByRole("textbox", { name: "Search projects" }),
        );
        await user.tab({ shift: true });
        await user.tab({ shift: true });
        expect(drawer().contains(document.activeElement)).toBe(true);

        await user.keyboard("{Escape}");
        expect(screen.queryByRole("dialog", { name: "Choose a project" })).toBeNull();
        expect(screen.getByRole("dialog", { name: "Edit page" })).toBe(modal);
        expect(document.body.style.overflow).toBe("hidden");
        expect(document.body.dataset.zabiScrollLock).toBe("1");
        expect(document.activeElement).toBe(opener());

        await user.keyboard("{Escape}");
        expect(screen.queryByRole("dialog")).toBeNull();
        expect(document.body.dataset.zabiScrollLock).toBeUndefined();
        expect(document.body.style.overflow).toBe("");
        expect(document.activeElement).toBe(editOpener);
    });

    it("hosts a modal: Escape closes only the modal, and focus unwinds in order", async () => {
        const user = userEvent.setup();
        render(DrawerHarness, { props: { nesting: "modal-in-drawer" } });

        await openDrawer(user);
        const newProject = screen.getByRole("button", { name: "New project" });
        await user.click(newProject);
        await settled();

        const modal = screen.getByRole("dialog", { name: "New project" });
        expect(document.body.dataset.zabiScrollLock).toBe("2");
        expect(modal.contains(document.activeElement)).toBe(true);

        // The drawer underneath must not pull Tab back to its own controls.
        await user.tab();
        expect(modal.contains(document.activeElement)).toBe(true);
        await user.tab();
        expect(modal.contains(document.activeElement)).toBe(true);

        await user.keyboard("{Escape}");
        expect(screen.queryByRole("dialog", { name: "New project" })).toBeNull();
        expect(state()).toBe("open");
        expect(document.activeElement).toBe(newProject);
        expect(document.body.dataset.zabiScrollLock).toBe("1");

        await user.keyboard("{Escape}");
        expect(state()).toBe("closed");
        expect(document.activeElement).toBe(opener());
        expect(document.body.dataset.zabiScrollLock).toBeUndefined();
    });

    it("keeps a modal underneath open when the drawer is not dismissible", async () => {
        const user = userEvent.setup();
        render(DrawerHarness, {
            props: { nesting: "drawer-in-modal", dismissible: false },
        });

        await user.click(screen.getByRole("button", { name: "Edit page" }));
        await settled();
        await user.click(opener());
        await settled();

        await user.keyboard("{Escape}");
        expect(screen.getByRole("dialog", { name: "Choose a project" })).toBeTruthy();
        expect(screen.getByRole("dialog", { name: "Edit page" })).toBeTruthy();
    });
});
