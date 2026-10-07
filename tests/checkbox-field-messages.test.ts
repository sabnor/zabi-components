import { cleanup, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import Checkbox from "../src/components/atoms/Checkbox.svelte";
import Radio from "../src/components/atoms/Radio.svelte";

afterEach(cleanup);

describe("Checkbox and Radio error, message and hint (Z-090)", () => {
    it("an error marks the box invalid and is an alert tied to it", () => {
        render(Checkbox, { props: { label: "Accept", error: "You must accept" } });
        const box = screen.getByRole("checkbox", { name: "Accept" });
        expect(box.getAttribute("aria-invalid")).toBe("true");
        const alert = screen.getByRole("alert");
        expect(alert.textContent).toContain("You must accept");
        expect(box.getAttribute("aria-describedby")).toContain(alert.id);
    });

    it("a hint is read with the box and does not mark it invalid", () => {
        render(Checkbox, { props: { label: "Accept", hint: "Needed to continue" } });
        const box = screen.getByRole("checkbox", { name: "Accept" });
        expect(box.hasAttribute("aria-invalid")).toBe(false);
        const hint = screen.getByText("Needed to continue");
        expect(box.getAttribute("aria-describedby")).toBe(hint.id);
    });

    it("variant + message works as on Input, and a neutral message is not shown", () => {
        const { unmount } = render(Checkbox, { props: { label: "A", variant: "error", message: "Bad" } });
        expect(screen.getByRole("alert").textContent).toContain("Bad");
        expect(screen.getByRole("checkbox").getAttribute("aria-invalid")).toBe("true");
        unmount();
        render(Checkbox, { props: { label: "B", message: "Quiet" } });
        expect(screen.queryByText("Quiet")).toBeNull();
    });

    it("keeps the caller's aria-describedby first", () => {
        render(Checkbox, { props: { label: "Accept", hint: "H", "aria-describedby": "mine" } });
        const ids = (screen.getByRole("checkbox").getAttribute("aria-describedby") ?? "").split(" ");
        expect(ids[0]).toBe("mine");
        expect(ids).toHaveLength(2);
    });

    it("without them nothing changes: no wrapper text, no aria-invalid, no describedby", () => {
        render(Checkbox, { props: { label: "Accept" } });
        const box = screen.getByRole("checkbox");
        expect(box.hasAttribute("aria-invalid")).toBe(false);
        expect(box.hasAttribute("aria-describedby")).toBe(false);
        expect(screen.queryByRole("alert")).toBeNull();
    });

    it("a Radio takes the same props, with its description first", () => {
        render(Radio, { props: { label: "Phone", description: "Follows it", error: "Pick one" } });
        const radio = screen.getByRole("radio", { name: "Phone" });
        // aria-invalid is not a radio attribute; the error is a description and an alert.
        expect(radio.hasAttribute("aria-invalid")).toBe(false);
        expect(screen.getByRole("alert").textContent).toContain("Pick one");
        const ids = (radio.getAttribute("aria-describedby") ?? "").split(" ");
        expect(ids).toHaveLength(2);
        expect(ids[0]).toMatch(/-description$/);
    });
});
