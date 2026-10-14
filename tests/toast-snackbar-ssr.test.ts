// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import Toaster from "../src/components/molecules/Toaster.svelte";
import { pushToast, toastStore } from "../src/components/molecules/toast-store";
import { easeStandard, toastStays, toastTexts } from "../src/components/util/toaster";

vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

describe("the phone toast, without a document", () => {
    it("renders the region for every mode, clipped at its docked edge only where it can be a snackbar", () => {
        const html = (mode?: "stack" | "snackbar" | "auto") =>
            renderOnServer(Toaster, { props: mode ? { mode } : {} }).body;
        expect(html()).toContain("data-zabi-toaster");
        expect(html("stack")).not.toContain("clip-path");
        expect(html("snackbar")).toContain("[clip-path:inset(");
        expect(html("auto")).toContain("max-sm:[clip-path:inset(");
        expect(() => renderOnServer(Toaster, { props: { mode: "auto", max: 2, avoid: "[data-x]", swipeToDismiss: false } })).not.toThrow();
    });

    it("a toast in the store renders its words at once on the server", () => {
        toastStore.clear();
        pushToast({ message: "Saved", type: "success" });
        const body = renderOnServer(Toaster, {}).body;
        toastStore.clear();
        expect(body).toContain("Saved");
        expect(body).toContain('role="status"');
    });

    it("the helpers need no document", () => {
        expect(typeof document).toBe("undefined");
        const strings = { successTitle: "S", errorTitle: "E", warningTitle: "W", infoTitle: "I" };
        expect(toastTexts({ message: " Hi ", type: "info" }, strings)).toMatchObject({ headerTitle: "Hi", secondLine: "" });
        expect(toastTexts({ title: "T", message: "M", type: "info" }, strings)).toMatchObject({ headerTitle: "T", secondLine: "M" });
        expect(toastTexts({ message: "", type: "error" }, strings).headerTitle).toBe("E");
        expect(toastStays({ message: "a", type: "error" })).toBe(true);
        expect(toastStays({ message: "a", type: "info", action: {} })).toBe(true);
        expect(toastStays({ message: "a", type: "info", duration: "persistent" })).toBe(true);
        expect(toastStays({ message: "a", type: "info" })).toBe(false);
        expect(toastStays({ message: "a", type: "info", duration: "short" }, "persistent")).toBe(false);
        expect(easeStandard(0)).toBeCloseTo(0, 3);
        expect(easeStandard(1)).toBeCloseTo(1, 3);
        // Never past the end: no overshoot.
        for (let t = 0; t <= 1; t += 0.05) expect(easeStandard(t)).toBeLessThanOrEqual(1.0001);
    });
});
