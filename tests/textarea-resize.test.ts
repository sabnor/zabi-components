import { cleanup, fireEvent, render, screen } from "@testing-library/svelte";
import { tick } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import Textarea from "../src/components/atoms/Textarea.svelte";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const field = () => screen.getByLabelText("Notes") as HTMLTextAreaElement;
const classesOf = (element: HTMLElement) => element.className.split(/\s+/);

describe("Textarea resize", () => {
    it("has the vertical grip with a mouse and none on a touch screen by default", () => {
        render(Textarea, { props: { label: "Notes" } });
        expect(classesOf(field())).toEqual(
            expect.arrayContaining(["resize-y", "pointer-coarse:resize-none"]),
        );
    });

    it("vertical keeps the grip everywhere", () => {
        render(Textarea, { props: { label: "Notes", resize: "vertical" } });
        expect(classesOf(field())).toContain("resize-y");
        expect(classesOf(field())).not.toContain("pointer-coarse:resize-none");
    });

    it("none removes it", () => {
        render(Textarea, { props: { label: "Notes", resize: "none" } });
        expect(classesOf(field())).toContain("resize-none");
        expect(classesOf(field())).not.toContain("resize-y");
    });
});

describe("Textarea autogrow", () => {
    it("has no grip and is held between rows and maxRows", () => {
        render(Textarea, {
            props: { label: "Notes", autogrow: true, rows: 2, maxRows: 6, resize: "vertical" },
        });
        expect(classesOf(field())).toContain("resize-none");
        // Two and six 1.5rem lines, 1rem of padding, two 1px borders.
        expect(field().style.minHeight).toContain("4rem");
        expect(field().style.maxHeight).toContain("10rem");
        expect(field().style.overflowY).toBe("auto");
    });

    it("has no upper limit without maxRows, and no limits at all without autogrow", () => {
        render(Textarea, { props: { label: "Notes", autogrow: true } });
        expect(field().style.minHeight).toContain("7rem");
        expect(field().style.maxHeight).toBe("");
        cleanup();
        render(Textarea, { props: { label: "Notes", maxRows: 6 } });
        expect(field().style.minHeight).toBe("");
        expect(field().style.maxHeight).toBe("");
        expect(field().style.height).toBe("");
    });

    it("measures the content where the browser has no field-sizing", async () => {
        // jsdom has neither `field-sizing` nor layout: the content height is given here.
        let content = 60;
        vi.spyOn(HTMLTextAreaElement.prototype, "scrollHeight", "get").mockImplementation(() => content);
        vi.spyOn(HTMLTextAreaElement.prototype, "offsetHeight", "get").mockReturnValue(62);
        vi.spyOn(HTMLTextAreaElement.prototype, "clientHeight", "get").mockReturnValue(60);

        render(Textarea, { props: { label: "Notes", autogrow: true, rows: 2 } });
        await tick();
        expect(field().style.height).toBe("62px");

        content = 108;
        await fireEvent.input(field(), { target: { value: "one\ntwo\nthree\nfour" } });
        await tick();
        expect(field().style.height).toBe("110px");
    });
});
