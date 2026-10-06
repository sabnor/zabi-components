import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import SidebarNavigation from "../src/components/organisms/SidebarNavigation.svelte";
import SidebarPanel from "../src/components/organisms/SidebarPanel.svelte";
import SidebarShell from "../src/components/organisms/SidebarShell.svelte";
import TopNavbar from "../src/components/organisms/TopNavbar.svelte";

/** D127: one active indicator, sentence-case labels, 36px rows, flush chrome. */

afterEach(cleanup);

const items = [
    { id: "a", label: "Overview", href: "/a", section: "Workspace" },
    { id: "b", label: "Reports", href: "/b", section: "Workspace" },
];

describe("SidebarNavigation (D127)", () => {
    it("marks the current row once: the fill and a heavier label, no bar element", () => {
        const { container } = render(SidebarNavigation, { props: { items, currentPath: "/a", showSearch: false } });
        const active = screen.getByRole("link", { name: "Overview" });
        const idle = screen.getByRole("link", { name: "Reports" });
        expect(active.getAttribute("aria-current")).toBe("page");
        expect(active.className).toContain("bg-nav-menu-active");
        expect(active.className).toContain("text-nav-menu-item-active");
        expect(active.className).toContain("font-semibold");
        expect(idle.className).not.toContain("font-semibold");
        expect(active.querySelector("span[aria-hidden='true'].absolute")).toBeNull();
        expect(container.innerHTML).not.toContain("w-[3px]");
        expect(active.className).not.toMatch(/shadow|(^| )ring-/);
    });

    it("rows are 36px, 44px on coarse pointers", () => {
        render(SidebarNavigation, { props: { items, currentPath: "/a", showSearch: false } });
        const link = screen.getByRole("link", { name: "Reports" });
        expect(link.className).toContain("min-h-9");
        expect(link.className).toContain("pointer-coarse:min-h-11");
        expect(link.className).not.toContain("min-h-10");
    });

    it("section headings keep the consumer's case: no uppercase, no tracking", () => {
        render(SidebarNavigation, { props: { items, showSearch: false } });
        const heading = screen.getByRole("heading", { name: "Workspace" });
        expect(heading.className).toContain("text-xs");
        expect(heading.className).toContain("font-medium");
        expect(heading.className).not.toContain("uppercase");
        expect(heading.className).not.toContain("tracking");
    });

    it("uses duration tokens, not literals, and no dividers between sections", () => {
        const { container } = render(SidebarNavigation, { props: { items, showSearch: false } });
        expect(container.innerHTML).not.toContain("duration-150");
        expect(container.innerHTML).not.toContain("divide-y");
    });
});

describe("SidebarShell (D127)", () => {
    it("reads the chrome token with a single weak hairline on the content side", () => {
        render(SidebarShell, { props: { ariaLabel: "Rail" } });
        const nav = screen.getByRole("navigation", { name: "Rail" });
        expect(nav.className).toContain("bg-surface-chrome");
        expect(nav.className).toContain("border-r");
        expect(nav.className).toContain("border-border-weak");
        expect(nav.className).not.toContain("bg-background");
    });

    it("the card layout has the edge only, no shadow", () => {
        render(SidebarShell, { props: { ariaLabel: "Card", layout: "card" } });
        expect(screen.getByRole("navigation", { name: "Card" }).className).not.toContain("shadow");
    });
});

describe("SidebarPanel (D127)", () => {
    it("is a flat card and marks the selected row once", () => {
        render(SidebarPanel, {
            props: {
                ariaLabel: "Picker",
                items: [{ id: "x", label: "One" }, { id: "y", label: "Two" }],
                selectedItemId: "x",
            },
        });
        const panel = screen.getByLabelText("Picker");
        expect(panel.className).not.toMatch(/shadow|ring-1/);
        const selected = screen.getByRole("option", { name: "One" });
        expect(selected.className).toContain("bg-nav-menu-active");
        expect(selected.className).toContain("text-nav-menu-item-active");
        expect(selected.className).not.toMatch(/shadow|ring-1/);
        expect(selected.className).toContain("min-h-9");
        expect(selected.className).toContain("pointer-coarse:min-h-11");
    });
});

describe("TopNavbar links (D127)", () => {
    const links = [
        { label: "Docs", href: "/docs" },
        { label: "Blog", href: "/blog" },
    ];

    it("are 14px, untracked, with one tinted-pill indicator", () => {
        render(TopNavbar, { props: { items: links, currentPath: "/docs" } });
        const active = screen.getAllByRole("link", { name: "Docs" })[0];
        const idle = screen.getAllByRole("link", { name: "Blog" })[0];
        const label = active.querySelector("span")!;
        expect(label.className).toContain("text-sm");
        expect(label.className).not.toContain("tracking");
        expect(label.className).not.toContain("text-xs");
        expect(active.className).toContain("bg-nav-menu-active");
        expect(active.className).toContain("font-semibold");
        expect(idle.className).toContain("font-medium");
        expect(active.className).not.toMatch(/underline|border-b/);
    });
});
