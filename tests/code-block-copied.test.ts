import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import CodeBlock from "../src/components/atoms/CodeBlock.svelte";

/**
 * Copying code changes the button's name for two seconds. A screen reader
 * does not read a new name on the button that has focus, so the same words
 * are put in a status region, which it does read.
 */

afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
});

function withClipboard() {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });
    return writeText;
}

describe("CodeBlock, once the code is copied", () => {
    it("says so in a status region that was in the page, empty, before", async () => {
        const writeText = withClipboard();
        render(CodeBlock, { code: "let a = 1;" });
        const status = screen.getByRole("status");
        expect(status.textContent).toBe("");

        await fireEvent.click(screen.getByRole("button", { name: "Copy code to clipboard" }));
        expect(writeText).toHaveBeenCalledWith("let a = 1;");
        await waitFor(() => expect(status.textContent).toBe("Code copied to clipboard"));
        expect(screen.getByRole("status"), "The same element: a region added with its text is not always read").toBe(status);
        expect(screen.getByRole("button", { name: "Code copied to clipboard" })).toBeTruthy();
    });

    it("says it in the app's words", async () => {
        withClipboard();
        render(CodeBlock, { code: "let a = 1;", copyLabel: "Kopiera koden", copiedLabel: "Koden är kopierad" });
        await fireEvent.click(screen.getByRole("button", { name: "Kopiera koden" }));
        await waitFor(() => expect(screen.getByRole("status").textContent).toBe("Koden är kopierad"));
        expect(document.body.textContent).not.toContain("copied");
    });

    it("has no status region without the copy button", () => {
        render(CodeBlock, { code: "let a = 1;", showCopyButton: false });
        expect(screen.queryByRole("status")).toBeNull();
    });
});
