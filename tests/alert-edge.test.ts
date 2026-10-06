import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";

import Alert from "../src/components/molecules/Alert.svelte";

const WIDTH = "border-[length:var(--zabi-alert-border-width,1px)]";

describe("Alert edge", () => {
    it("draws the edge by default, through the width property", () => {
        render(Alert, { props: { variant: "success", title: "Booked" } });
        const el = screen.getByRole("status");
        expect(el.className).toContain(WIDTH);
        expect(el.className).toContain("border-success-border");
        expect(el.className).not.toContain("border-transparent");
    });

    it("bordered={false} makes the edge transparent and keeps the width", () => {
        render(Alert, { props: { variant: "success", bordered: false, title: "Booked" } });
        const el = screen.getByRole("status");
        expect(el.className).toContain(WIDTH);
        expect(el.className).toContain("border-transparent");
    });

    it("brand uses the brand tint, the link colour, and a status role", () => {
        const { container } = render(Alert, { props: { variant: "brand", title: "Member", message: "Hi" } });
        const el = screen.getByRole("status");
        expect(el.className).toContain("bg-action-primary-subtle");
        expect(el.className).toContain("border-action-primary-border");
        expect(el.className).toContain("text-(color:--color-link)");
        expect(container.querySelector("svg.lucide-info")).not.toBeNull();
    });

    it("keeps error and warning as alerts", () => {
        render(Alert, { props: { variant: "error", title: "No" } });
        expect(screen.getByRole("alert")).toBeTruthy();
    });
});
