import { createRawSnippet } from "svelte";
import { cleanup, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import Select from "../src/components/atoms/Select.svelte";
import BottomSheet from "../src/components/molecules/BottomSheet.svelte";

afterEach(() => {
    cleanup();
    document.body.style.overflow = "";
});

const languages = [
    { value: "sv", label: "Svenska", lang: "sv" },
    { value: "en", label: "English", lang: "en" },
];

const triggerOf = (container: HTMLElement) =>
    container.querySelector<HTMLButtonElement>('button[aria-haspopup="listbox"]')!;

describe("Select sheet height (Z-084)", () => {
    const open = async (props: Record<string, unknown>) => {
        const { container } = render(Select, { label: "Språk", presentation: "sheet", ...props });
        await userEvent.click(triggerOf(container));
        return await waitFor(() => {
            const panel = document.querySelector<HTMLElement>('[role="dialog"]');
            expect(panel).not.toBeNull();
            return panel!;
        });
    };

    it("is as tall as a short list without a search field needs", async () => {
        const panel = await open({ options: languages, searchable: false });
        expect(panel.style.height).toBe("auto");
        expect(panel.style.maxHeight).toContain("50%");
    });

    it("keeps the half sheet with sheetFit false, with a search field, and for a long list", async () => {
        for (const props of [
            { options: languages, searchable: false, sheetFit: false },
            { options: languages, searchable: true },
            { options: Array.from({ length: 9 }, (_, i) => ({ value: i, label: `Pub ${i}` })), searchable: false },
        ]) {
            const panel = await open(props);
            // jsdom drops the min()/max() height; what matters is that it is not `auto`.
            expect(panel.style.height).not.toBe("auto");
            expect(panel.style.maxHeight).toBe("");
            cleanup();
            document.body.innerHTML = "";
        }
    });
});

describe("BottomSheet fit", () => {
    const content = createRawSnippet(() => ({ render: () => `<p>Short</p>` }));

    it("is auto-high, capped at half, with one resting height and no expand button", async () => {
        render(BottomSheet, { props: { isOpen: true, title: "Pick", fit: true, children: content } });
        const panel = document.querySelector<HTMLElement>('[role="dialog"]')!;
        expect(panel.style.height).toBe("auto");
        expect(panel.style.maxHeight).toContain("50%");
        expect(panel.getAttribute("data-snap")).toBe("half");
        expect(panel.querySelector("button[data-sheet-grip]")).toBeNull();
    });

    it("is half the screen without fit, as before", () => {
        render(BottomSheet, { props: { isOpen: true, title: "Pick", children: content } });
        const panel = document.querySelector<HTMLElement>('[role="dialog"]')!;
        expect(panel.style.height).not.toBe("auto");
        expect(panel.style.maxHeight).toBe("");
    });
});
