import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";

import TopNavbar from "../src/components/organisms/TopNavbar.svelte";

describe("TopNavbar external links", () => {
    const items = [
        { label: "Docs", href: "/docs" },
        { label: "GitHub", href: "https://github.com/example/repo" },
        { label: "Storybook", href: "/storybook/", external: true },
        { label: "Partner", href: "https://example.com", external: false },
    ];

    const link = (name: RegExp) => screen.getAllByRole("link", { name })[0];

    it("opens absolute URLs in a new tab and leaves app routes alone", () => {
        render(TopNavbar, { props: { items } });

        expect(link(/Docs/).getAttribute("target")).toBeNull();
        expect(link(/GitHub/).getAttribute("target")).toBe("_blank");
        expect(link(/GitHub/).getAttribute("rel")).toBe("noopener noreferrer");
    });

    it("lets an item override the default with external", () => {
        render(TopNavbar, { props: { items } });

        // A same-origin link that leaves the app.
        expect(link(/Storybook/).getAttribute("target")).toBe("_blank");
        expect(link(/Storybook/).getAttribute("rel")).toBe("noopener noreferrer");
        // An absolute URL kept in the same tab.
        expect(link(/Partner/).getAttribute("target")).toBeNull();
    });
});
