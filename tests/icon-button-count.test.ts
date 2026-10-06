import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import IconButton from "../src/components/atoms/IconButton.svelte";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const mark = (element: HTMLElement) => element.querySelector<HTMLElement>("[data-icon-button-count]");

describe("IconButton count", () => {
    it("draws the number inside the box and names it", () => {
        render(IconButton, { label: "Notifications", count: 3 });
        const button = screen.getByRole("button", { name: "Notifications, 3 new" });
        const badge = mark(button)!;
        expect(badge.textContent?.trim()).toBe("3");
        expect(badge.getAttribute("aria-hidden")).toBe("true");
        expect(badge.getAttribute("data-icon-button-count")).toBe("badge");
        expect(badge.className).toContain("pointer-events-none");
        expect(badge.className).toContain("absolute");
        expect(badge.className).toContain("end-0.5");
        expect(badge.className).toContain("top-0.5");
        expect(badge.className).toContain("bg-error");
        expect(badge.className).toContain("h-[18px]");
        expect(button.className.split(/\s+/)).toContain("relative");
        // The box itself is unchanged.
        expect(button.className).toContain("size-10");
    });

    it.each([0, -2, undefined])("draws nothing for %s", (count) => {
        render(IconButton, { label: "Notifications", count });
        const button = screen.getByRole("button", { name: "Notifications" });
        expect(mark(button)).toBeNull();
        expect(button.className.split(/\s+/)).not.toContain("relative");
    });

    it("caps the text but names the real count", () => {
        render(IconButton, { label: "Inbox", count: 120 });
        const button = screen.getByRole("button", { name: "Inbox, 120 new" });
        expect(mark(button)!.textContent?.trim()).toBe("99+");
    });

    it("takes countMax and countLabel", () => {
        render(IconButton, {
            label: "Inbox",
            count: 12,
            countMax: 9,
            countLabel: (n: number) => `${n} unread`,
        });
        const button = screen.getByRole("button", { name: "Inbox, 12 unread" });
        expect(mark(button)!.textContent?.trim()).toBe("9+");
    });

    it.each(["xs", "sm"] as const)("draws a dot at %s", (size) => {
        render(IconButton, { label: "Inbox", count: 5, size });
        const button = screen.getByRole("button", { name: "Inbox, 5 new" });
        const dot = mark(button)!;
        expect(dot.getAttribute("data-icon-button-count")).toBe("dot");
        expect(dot.textContent?.trim()).toBe("");
        expect(dot.className).toContain("size-2");
        expect(dot.getAttribute("aria-hidden")).toBe("true");
    });

    it.each(["md", "lg"] as const)("draws the number at %s", (size) => {
        render(IconButton, { label: "Inbox", count: 5, size });
        expect(mark(screen.getByRole("button"))!.getAttribute("data-icon-button-count")).toBe("badge");
    });

    it("works on a link", () => {
        render(IconButton, { label: "Inbox", count: 2, href: "/inbox" });
        const link = screen.getByRole("link", { name: "Inbox, 2 new" });
        expect(mark(link)).not.toBeNull();
        expect(link.getAttribute("href")).toBe("/inbox");
    });

    it("hides the badge and the count in the name while loading", () => {
        render(IconButton, { label: "Inbox", count: 2, loading: true });
        const button = screen.getByRole("button", { name: "Inbox" });
        expect(mark(button)).toBeNull();
    });

    it("warns in a dev build when there is no label to name the count", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        render(IconButton, { count: 2 });
        expect(warn).toHaveBeenCalledTimes(1);
        expect(String(warn.mock.calls[0][0])).toContain("label");
    });

    it("does not warn with a label", () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        render(IconButton, { label: "Inbox", count: 2 });
        expect(warn).not.toHaveBeenCalled();
    });
});
