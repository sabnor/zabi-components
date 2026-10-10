import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Skeleton from "../src/components/atoms/Skeleton.svelte";
import SkeletonGroup from "../src/components/atoms/SkeletonGroup.svelte";
import SkeletonHarness from "./fixtures/SkeletonHarness.svelte";

afterEach(cleanup);

describe("Skeleton: an attribute of its own on every piece (Z-123)", () => {
    it("data-skeleton is the variant, announced or decorative", () => {
        for (const variant of ["text", "circle", "block"] as const) {
            for (const decorative of [false, true]) {
                const { container, unmount } = render(Skeleton, { props: { variant, decorative } });
                const piece = container.firstElementChild!;
                expect(piece.getAttribute("data-skeleton")).toBe(variant);
                expect(piece.classList.contains("animate-pulse")).toBe(true);
                unmount();
            }
        }
    });

    it("the default piece is data-skeleton=text", () => {
        const { container } = render(Skeleton);
        expect(container.firstElementChild!.getAttribute("data-skeleton")).toBe("text");
    });

    it("pieces and lines inside a group are found by [data-skeleton], one for each animate-pulse element", () => {
        const { container } = render(SkeletonHarness, { props: { kind: "group" } });
        const group = container.querySelector("[data-skeleton-group]")!;
        expect(group.getAttribute("role")).toBe("status");
        expect(group.querySelectorAll("[data-skeleton]").length).toBe(group.querySelectorAll(".animate-pulse").length);
        // circle, text, then the two lines of the paragraph
        expect(Array.from(group.querySelectorAll("[data-skeleton]")).map((el) => el.getAttribute("data-skeleton"))).toEqual([
            "circle",
            "text",
            "text",
            "text",
        ]);
    });

    it("a paragraph keeps data-skeleton-line on each line and marks its wrapper", () => {
        const { container } = render(Skeleton, { props: { lines: 3 } });
        const wrapper = container.firstElementChild!;
        expect(wrapper.hasAttribute("data-skeleton-paragraph")).toBe(true);
        expect(wrapper.hasAttribute("data-skeleton")).toBe(false);
        const lines = wrapper.querySelectorAll("[data-skeleton-line]");
        expect(lines).toHaveLength(3);
        for (const line of Array.from(lines)) expect(line.getAttribute("data-skeleton")).toBe("text");
    });
});

describe("Skeleton: rest props reach the root (Z-123)", () => {
    it("id, data-testid, aria-describedby and style reach the piece, beside width and height", () => {
        render(Skeleton, {
            props: {
                decorative: true,
                id: "avatar",
                "data-testid": "avatar-skeleton",
                "aria-describedby": "note",
                style: "opacity: 0.5;",
                width: 40,
            } as never,
        });
        const piece = screen.getByTestId("avatar-skeleton");
        expect(piece.id).toBe("avatar");
        expect(piece.getAttribute("aria-describedby")).toBe("note");
        expect((piece as HTMLElement).style.width).toBe("40px");
        expect((piece as HTMLElement).style.opacity).toBe("0.5");
    });

    it("a paragraph's rest props reach its wrapper", () => {
        render(Skeleton, { props: { lines: 2, "data-testid": "para", id: "p" } as never });
        const wrapper = screen.getByTestId("para");
        expect(wrapper.id).toBe("p");
        expect(wrapper.hasAttribute("data-skeleton-paragraph")).toBe(true);
    });

    it("a rest prop cannot override role, aria-busy, aria-hidden or data-skeleton", () => {
        const { container } = render(Skeleton, {
            props: { role: "img", "aria-busy": "false", "aria-hidden": "false", "data-skeleton": "x" } as never,
        });
        const piece = container.firstElementChild!;
        expect(piece.getAttribute("role")).toBe("status");
        expect(piece.getAttribute("aria-busy")).toBe("true");
        expect(piece.hasAttribute("aria-hidden")).toBe(false);
        expect(piece.getAttribute("data-skeleton")).toBe("text");
    });

    it("a decorative piece stays hidden whatever the rest props say", () => {
        const { container } = render(Skeleton, {
            props: { decorative: true, role: "status", "aria-busy": "true", "aria-hidden": "false" } as never,
        });
        const piece = container.firstElementChild!;
        expect(piece.getAttribute("aria-hidden")).toBe("true");
        expect(piece.hasAttribute("role")).toBe(false);
        expect(piece.hasAttribute("aria-busy")).toBe(false);
    });

    it("SkeletonGroup takes rest props and keeps its status", () => {
        const { container } = render(SkeletonGroup, {
            props: { id: "g", "data-testid": "grp", role: "presentation", "aria-busy": "false" } as never,
        });
        const group = screen.getByTestId("grp");
        expect(group).toBe(container.firstElementChild);
        expect(group.id).toBe("g");
        expect(group.getAttribute("role")).toBe("status");
        expect(group.getAttribute("aria-busy")).toBe("true");
        expect(group.hasAttribute("data-skeleton-group")).toBe(true);
    });
});
