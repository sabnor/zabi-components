import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { tick } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import ConfirmDialogHarness from "./fixtures/ConfirmDialogHarness.svelte";
import ConfirmDialogInModalHarness from "./fixtures/ConfirmDialogInModalHarness.svelte";

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});

const state = () => screen.getByTestId("state").textContent?.trim();
const dialog = () => screen.getByRole("alertdialog");
const confirmButton = (name = "Confirm") =>
    screen.getByRole("button", { name }) as HTMLButtonElement;
const cancelButton = (name = "Cancel") =>
    screen.getByRole("button", { name }) as HTMLButtonElement;
const opener = () => screen.getByRole("button", { name: "Delete project" });

/** Modal moves focus into the dialog on the next macrotask. */
const settled = () => new Promise((resolve) => setTimeout(resolve, 0));

async function openDialog(user: ReturnType<typeof userEvent.setup>) {
    await user.click(opener());
    await settled();
}

/** A promise the test settles by hand. */
function deferred<T>() {
    let resolve!: (value: T) => void;
    let reject!: (reason: unknown) => void;
    const promise = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return { promise, resolve, reject };
}

describe("ConfirmDialog semantics", () => {
    it("is a modal alertdialog named by the title and described by the message", () => {
        render(ConfirmDialogHarness, { props: { initialOpen: true } });

        const panel = dialog();
        expect(panel.getAttribute("role")).toBe("alertdialog");
        expect(screen.queryByRole("dialog")).toBeNull();
        expect(panel.getAttribute("aria-modal")).toBe("true");
        expect(screen.getByRole("alertdialog", { name: "Delete this project?" })).toBe(panel);
        expect(
            screen.getByRole("alertdialog", {
                description: "The project and its files are removed for everyone.",
            }),
        ).toBe(panel);
        expect(screen.getByRole("heading", { name: "Delete this project?" })).toBeTruthy();
    });

    it("keeps the message as the description when there is richer content", () => {
        render(ConfirmDialogHarness, { props: { initialOpen: true, rich: true } });

        const described = document.getElementById(
            dialog().getAttribute("aria-describedby") ?? "",
        );
        expect(described?.textContent?.trim()).toBe(
            "The project and its files are removed for everyone.",
        );
        expect(dialog().contains(screen.getByTestId("rich"))).toBe(true);
    });

    it("describes the dialog by its content when there is no message", () => {
        render(ConfirmDialogHarness, {
            props: { initialOpen: true, rich: true, message: "" },
        });
        expect(
            screen.getByRole("alertdialog", {
                description: "Type the project name to continue.",
            }),
        ).toBeTruthy();
    });

    it("has a cancel and a confirm button, and no close button", () => {
        render(ConfirmDialogHarness, { props: { initialOpen: true } });

        const buttons = Array.from(dialog().querySelectorAll("button"));
        expect(buttons.map((button) => button.textContent?.trim())).toEqual([
            "Cancel",
            "Confirm",
        ]);
        expect(buttons.every((button) => button.type === "button")).toBe(true);
    });

    it("takes its button labels from props", () => {
        render(ConfirmDialogHarness, {
            props: { initialOpen: true, confirmLabel: "Radera", cancelLabel: "Avbryt" },
        });
        expect(confirmButton("Radera")).toBeTruthy();
        expect(cancelButton("Avbryt")).toBeTruthy();
        expect(screen.queryByRole("button", { name: "Confirm" })).toBeNull();
    });

    it("renders nothing while closed", () => {
        render(ConfirmDialogHarness);
        expect(screen.queryByRole("alertdialog")).toBeNull();
    });
});

describe("ConfirmDialog variants", () => {
    const iconOf = () => dialog().querySelector("svg");

    it("defaults to info with the primary button", () => {
        render(ConfirmDialogHarness, { props: { initialOpen: true } });
        expect(dialog().getAttribute("data-variant")).toBe("info");
        expect(confirmButton().className).toContain("bg-action-primary");
        expect(iconOf()?.getAttribute("aria-hidden")).toBe("true");
    });

    it("uses the danger button for danger only", () => {
        render(ConfirmDialogHarness, { props: { initialOpen: true, variant: "danger" } });
        expect(confirmButton().className).toContain("bg-action-danger");
        cleanup();

        render(ConfirmDialogHarness, { props: { initialOpen: true, variant: "warning" } });
        expect(confirmButton().className).not.toContain("bg-action-danger");
    });

    it("gives each variant its own icon shape, so tone is not colour alone", () => {
        const shapes = new Set<string>();
        for (const variant of ["danger", "warning", "info"] as const) {
            render(ConfirmDialogHarness, { props: { initialOpen: true, variant } });
            shapes.add(iconOf()?.innerHTML ?? "");
            cleanup();
        }
        expect(shapes.size).toBe(3);
        expect(shapes.has("")).toBe(false);
    });
});

describe("ConfirmDialog focus and keyboard", () => {
    it.each(["danger", "warning", "info"] as const)(
        "puts the initial focus on Cancel for %s",
        async (variant) => {
            const user = userEvent.setup();
            render(ConfirmDialogHarness, { props: { variant } });

            await openDialog(user);
            expect(document.activeElement).toBe(cancelButton());
        },
    );

    it("activates only the focused button on Enter", async () => {
        const user = userEvent.setup();
        const onconfirm = vi.fn();
        const oncancel = vi.fn();
        render(ConfirmDialogHarness, { props: { onconfirm, oncancel } });

        await openDialog(user);
        await user.keyboard("{Enter}");
        expect(onconfirm).not.toHaveBeenCalled();
        expect(oncancel).toHaveBeenCalledWith({ reason: "cancel-button" });
        expect(state()).toBe("closed");
    });

    it("has no Enter shortcut when focus is not on a button", async () => {
        const user = userEvent.setup();
        const onconfirm = vi.fn();
        const oncancel = vi.fn();
        render(ConfirmDialogHarness, { props: { onconfirm, oncancel } });

        await openDialog(user);
        dialog().focus();
        await user.keyboard("{Enter}");
        expect(onconfirm).not.toHaveBeenCalled();
        expect(oncancel).not.toHaveBeenCalled();
        expect(state()).toBe("open");
    });

    it("keeps Tab between the two buttons", async () => {
        const user = userEvent.setup();
        render(ConfirmDialogHarness);

        await openDialog(user);
        await user.tab();
        expect(document.activeElement).toBe(confirmButton());
        await user.tab();
        expect(document.activeElement).toBe(cancelButton());
        await user.tab({ shift: true });
        expect(document.activeElement).toBe(confirmButton());
    });

    it("returns focus to the opener after a confirm and after a cancel", async () => {
        const user = userEvent.setup();
        render(ConfirmDialogHarness);

        await openDialog(user);
        await user.click(confirmButton());
        expect(state()).toBe("closed");
        expect(document.activeElement).toBe(opener());

        await openDialog(user);
        await user.keyboard("{Escape}");
        expect(state()).toBe("closed");
        expect(document.activeElement).toBe(opener());
    });
});

describe("ConfirmDialog confirm and cancel", () => {
    it("closes after a synchronous confirm", async () => {
        const user = userEvent.setup();
        const onconfirm = vi.fn();
        const oncancel = vi.fn();
        render(ConfirmDialogHarness, { props: { onconfirm, oncancel } });

        await openDialog(user);
        await user.click(confirmButton());
        expect(onconfirm).toHaveBeenCalledTimes(1);
        expect(oncancel).not.toHaveBeenCalled();
        expect(state()).toBe("closed");
        expect(screen.queryByRole("alertdialog")).toBeNull();
        expect(screen.queryByRole("dialog")).toBeNull();
    });

    it("stays open when onconfirm returns false", async () => {
        const user = userEvent.setup();
        render(ConfirmDialogHarness, { props: { onconfirm: () => false } });

        await openDialog(user);
        await user.click(confirmButton());
        expect(state()).toBe("open");
        expect(confirmButton().disabled).toBe(false);
    });

    it("reports how the user backed out", async () => {
        const user = userEvent.setup();
        const oncancel = vi.fn();
        const onconfirm = vi.fn();
        render(ConfirmDialogHarness, { props: { oncancel, onconfirm } });

        await openDialog(user);
        await user.click(cancelButton());
        await openDialog(user);
        await user.keyboard("{Escape}");
        await openDialog(user);
        await fireEvent.click(dialog().parentElement as HTMLElement);

        expect(oncancel.mock.calls).toEqual([
            [{ reason: "cancel-button" }],
            [{ reason: "escape" }],
            [{ reason: "backdrop" }],
        ]);
        expect(onconfirm).not.toHaveBeenCalled();
        expect(state()).toBe("closed");
    });

    it("binds open in both directions", async () => {
        const user = userEvent.setup();
        render(ConfirmDialogHarness, { props: { initialOpen: true } });

        await user.click(cancelButton());
        expect(state()).toBe("closed");

        await user.click(opener());
        expect(screen.getByRole("alertdialog")).toBeTruthy();
        // The backdrop covers the page for a pointer; the parent's state does not care.
        await fireEvent.click(screen.getByRole("button", { name: "Close from parent" }));
        expect(screen.queryByRole("alertdialog")).toBeNull();
    });
});

describe("ConfirmDialog loading", () => {
    it("blocks every way out while the loading prop is set", async () => {
        const user = userEvent.setup();
        const oncancel = vi.fn();
        const onconfirm = vi.fn();
        render(ConfirmDialogHarness, {
            props: { initialOpen: true, loading: true, oncancel, onconfirm },
        });
        await settled();

        expect(confirmButton().disabled).toBe(true);
        expect(confirmButton().getAttribute("aria-busy")).toBe("true");
        expect(cancelButton().disabled).toBe(true);
        expect(dialog().getAttribute("aria-busy")).toBe("true");

        await user.keyboard("{Escape}");
        await fireEvent.click(dialog().parentElement as HTMLElement);
        await user.click(cancelButton());
        await user.click(confirmButton());

        expect(state()).toBe("open");
        expect(oncancel).not.toHaveBeenCalled();
        expect(onconfirm).not.toHaveBeenCalled();
    });

    it("loads by itself while a promise from onconfirm is pending, then closes", async () => {
        const user = userEvent.setup();
        const work = deferred<void>();
        const onconfirm = vi.fn(() => work.promise);
        render(ConfirmDialogHarness, { props: { onconfirm } });

        await openDialog(user);
        await user.click(confirmButton());

        expect(state()).toBe("open");
        expect(confirmButton().disabled).toBe(true);
        expect(confirmButton().getAttribute("aria-busy")).toBe("true");
        expect(cancelButton().disabled).toBe(true);
        // Focus is held inside the dialog instead of falling to <body>.
        expect(document.activeElement).toBe(dialog());

        await user.keyboard("{Escape}");
        expect(state()).toBe("open");
        await user.click(confirmButton());
        expect(onconfirm).toHaveBeenCalledTimes(1);

        work.resolve();
        await waitFor(() => expect(state()).toBe("closed"));
        expect(document.activeElement).toBe(opener());
    });

    it("stays open when the promise resolves to false", async () => {
        const user = userEvent.setup();
        render(ConfirmDialogHarness, {
            props: { onconfirm: () => Promise.resolve(false) },
        });

        await openDialog(user);
        await user.click(confirmButton());
        await waitFor(() => expect(confirmButton().disabled).toBe(false));
        expect(state()).toBe("open");
    });

    it("stays open on a rejection, hands the error to onerror and gives focus back", async () => {
        const user = userEvent.setup();
        const work = deferred<void>();
        const onerror = vi.fn();
        const failure = new Error("409");
        render(ConfirmDialogHarness, {
            props: { onconfirm: () => work.promise, onerror },
        });

        await openDialog(user);
        await user.click(confirmButton());
        work.reject(failure);

        await waitFor(() => expect(onerror).toHaveBeenCalledWith(failure));
        await tick();
        expect(state()).toBe("open");
        expect(confirmButton().disabled).toBe(false);
        expect(cancelButton().disabled).toBe(false);
        expect(document.activeElement).toBe(confirmButton());

        // Escape works again.
        await user.keyboard("{Escape}");
        expect(state()).toBe("closed");
    });

    it("reports a rejection nobody handles instead of swallowing it", async () => {
        const user = userEvent.setup();
        const reported = vi.fn();
        vi.stubGlobal("reportError", reported);
        const failure = new Error("offline");
        render(ConfirmDialogHarness, {
            props: { onconfirm: () => Promise.reject(failure) },
        });

        await openDialog(user);
        await user.click(confirmButton());

        await waitFor(() => expect(reported).toHaveBeenCalledWith(failure));
        expect(state()).toBe("open");
    });
});

describe("ConfirmDialog portal", () => {
    it("renders in document.body by default", () => {
        render(ConfirmDialogHarness, { props: { initialOpen: true } });
        expect(screen.getByTestId("host").contains(dialog())).toBe(false);
        expect(document.body.contains(dialog())).toBe(true);
        expect(screen.getByTestId("confirm")).toBe(dialog());
    });

    it("renders in place with portal={false}", () => {
        render(ConfirmDialogHarness, { props: { initialOpen: true, portal: false } });
        expect(screen.getByTestId("host").contains(dialog())).toBe(true);
    });

    it("leaves nothing in body after it closes or unmounts", async () => {
        const user = userEvent.setup();
        const view = render(ConfirmDialogHarness, { props: { initialOpen: true } });

        await user.click(cancelButton());
        expect(document.querySelector('[role="alertdialog"]')).toBeNull();

        await user.click(opener());
        view.unmount();
        expect(document.querySelector('[role="alertdialog"]')).toBeNull();
    });
});

describe("ConfirmDialog over a Modal", () => {
    it("keeps Tab and Escape to itself, then closes both on confirm", async () => {
        const user = userEvent.setup();
        render(ConfirmDialogInModalHarness);
        await settled();

        const discard = screen.getByRole("button", { name: "Discard changes" });
        await user.click(discard);
        await settled();

        const confirm = screen.getByRole("alertdialog", { name: "Discard your changes?" });
        const cancel = screen.getByRole("button", { name: "Cancel" });
        const proceed = screen.getByRole("button", { name: "Discard" });
        expect(document.activeElement).toBe(cancel);

        // The modal underneath must not pull focus back to its own controls.
        await user.tab();
        expect(document.activeElement).toBe(proceed);
        await user.tab();
        expect(document.activeElement).toBe(cancel);

        // Escape closes the confirm only, and focus goes back to what opened it.
        await user.keyboard("{Escape}");
        expect(screen.queryByRole("alertdialog", { name: "Discard your changes?" })).toBeNull();
        expect(confirm.isConnected).toBe(false);
        expect(state()).toBe("editing");
        expect(document.activeElement).toBe(discard);

        await user.click(discard);
        await settled();
        await user.click(screen.getByRole("button", { name: "Discard" }));
        expect(state()).toBe("closed");
        expect(screen.queryByRole("alertdialog")).toBeNull();
        expect(screen.queryByRole("dialog")).toBeNull();
    });
});
