import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Skeleton from "../src/components/atoms/Skeleton.svelte";
import SkeletonHarness from "./fixtures/SkeletonHarness.svelte";

afterEach(cleanup);

describe("Skeleton status and label (Z-094)", () => {
    it("a lone Skeleton is one status named Loading…, as before", () => {
        render(SkeletonHarness, { props: { kind: "lone" } });
        const status = screen.getByRole("status", { name: "Loading…" });
        expect(status.getAttribute("aria-busy")).toBe("true");
    });

    it("three loose pieces are still three statuses (the default is unchanged)", () => {
        render(SkeletonHarness, { props: { kind: "three" } });
        expect(screen.getAllByRole("status")).toHaveLength(3);
    });

    it("a decorative piece has no role, no label and is hidden", () => {
        const { container } = render(Skeleton, { props: { decorative: true } });
        const piece = container.firstElementChild!;
        expect(screen.queryByRole("status")).toBeNull();
        expect(piece.getAttribute("aria-hidden")).toBe("true");
        expect(piece.hasAttribute("role")).toBe(false);
        expect(piece.hasAttribute("aria-label")).toBe(false);
        expect(piece.hasAttribute("aria-busy")).toBe(false);
    });

    it("a group is one status with the label; its pieces, lines included, are hidden", () => {
        const { container } = render(SkeletonHarness, { props: { kind: "group" } });
        expect(screen.getAllByRole("status")).toHaveLength(1);
        expect(screen.getByRole("status", { name: "Laddar sidan" })).toBeTruthy();
        const status = container.querySelector('[role="status"]')!;
        const pieces = Array.from(status.children);
        expect(pieces).toHaveLength(3);
        for (const piece of pieces) {
            expect(piece.getAttribute("aria-hidden")).toBe("true");
            expect(piece.hasAttribute("role")).toBe(false);
        }
    });

    it("the label comes from the strings provider, and aria-label still wins", () => {
        const { unmount } = render(SkeletonHarness, { props: { kind: "provider" } });
        expect(screen.getByRole("status", { name: "Laddar…" })).toBeTruthy();
        unmount();
        render(SkeletonHarness, { props: { kind: "group-provider" } });
        expect(screen.getByRole("status", { name: "Laddar…" })).toBeTruthy();
        cleanup();
        render(Skeleton, { props: { "aria-label": "Loading profile", strings: { label: "x" } } });
        expect(screen.getByRole("status", { name: "Loading profile" })).toBeTruthy();
        cleanup();
        render(Skeleton, { props: { strings: { label: "Hämtar" } } });
        expect(screen.getByRole("status", { name: "Hämtar" })).toBeTruthy();
    });
});
