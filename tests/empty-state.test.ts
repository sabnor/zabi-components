import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import EmptyState from "../src/components/molecules/EmptyState.svelte";

afterEach(() => {
    cleanup();
});

const props = { title: "No projects yet", description: "Create one to get started." };
const classesOf = (element: Element) => element.className.split(/\s+/);

describe("EmptyState", () => {
    it("defaults to an h2 at the roomy size", () => {
        render(EmptyState, { props });

        const heading = screen.getByRole("heading", { name: "No projects yet" });
        expect(heading.tagName).toBe("H2");
        expect(classesOf(heading)).toContain("text-lg");
        const region = screen.getByRole("region", { name: "No projects yet" });
        expect(classesOf(region)).toEqual(expect.arrayContaining(["gap-4", "px-6", "py-12"]));
    });

    it.each([1, 3, 4, 6] as const)("renders the title as an h%i", (headingLevel) => {
        render(EmptyState, { props: { ...props, headingLevel } });

        const heading = screen.getByRole("heading", { level: headingLevel });
        expect(heading.tagName).toBe(`H${headingLevel}`);
        // Whatever the element, it still names the section.
        expect(screen.getByRole("region", { name: "No projects yet" })).toBeTruthy();
    });

    it("tightens padding, gaps and the title at the compact size", () => {
        render(EmptyState, { props: { ...props, size: "compact" } });

        const heading = screen.getByRole("heading", { name: "No projects yet" });
        const root = heading.parentElement?.parentElement as HTMLElement;
        expect(classesOf(root)).toEqual(expect.arrayContaining(["gap-3", "px-4", "py-6"]));
        expect(classesOf(root)).not.toContain("py-12");
        expect(classesOf(heading)).toContain("text-base");
        expect(classesOf(heading)).not.toContain("text-lg");
    });

    it("is a landmark at the default size only", () => {
        const { unmount } = render(EmptyState, { props });
        expect(screen.getByRole("region", { name: "No projects yet" }).tagName).toBe("SECTION");
        unmount();

        // Compact empty states sit one per card; as regions they would fill
        // the page's landmark list.
        render(EmptyState, { props: { ...props, size: "compact", headingLevel: 3 } });
        expect(screen.queryByRole("region")).toBeNull();
        const heading = screen.getByRole("heading", { name: "No projects yet", level: 3 });
        const root = heading.parentElement?.parentElement as HTMLElement;
        expect(root.tagName).toBe("DIV");
        expect(root.hasAttribute("aria-labelledby")).toBe(false);
        // The heading keeps its id, for a caller that wants to point at it.
        expect(heading.id).toMatch(/^empty-state-title/);
    });
});
