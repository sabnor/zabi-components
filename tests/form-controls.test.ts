import { cleanup, render, screen, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Button from "../src/components/atoms/Button.svelte";
import Checkbox from "../src/components/atoms/Checkbox.svelte";
import DateField from "../src/components/atoms/DateField.svelte";
import IconButton from "../src/components/atoms/IconButton.svelte";
import Input from "../src/components/atoms/Input.svelte";
import List from "../src/components/atoms/List.svelte";
import ListItem from "../src/components/atoms/ListItem.svelte";
import Radio from "../src/components/atoms/Radio.svelte";
import Select from "../src/components/atoms/Select.svelte";
import Table from "../src/components/atoms/Table.svelte";
import Textarea from "../src/components/atoms/Textarea.svelte";
import Toggle from "../src/components/atoms/Toggle.svelte";
import RadioGroup from "../src/components/molecules/RadioGroup.svelte";
import { fieldDescribedBy, fieldMessageState } from "../src/components/util/field";
import FormHarness from "./fixtures/FormHarness.svelte";

afterEach(cleanup);

const classes = (element: Element) => element.className.split(/\s+/);
/** Every id in `aria-describedby`, and whether each names an element that exists. */
const describedBy = (control: Element) => (control.getAttribute("aria-describedby") ?? "").split(/\s+/).filter(Boolean);
const texts = (control: Element) => describedBy(control).map((id) => document.getElementById(id)?.textContent?.trim() ?? null);

describe("field messages, shared", () => {
    it("lets an error win over the variant and the message", () => {
        expect(fieldMessageState({ variant: "success", message: "Saved", error: "Too short" })).toEqual({
            variant: "error",
            message: "Too short",
            showMessage: true,
            showHint: false,
        });
    });

    it("shows a message with a variant, and not without one", () => {
        expect(fieldMessageState({ variant: "warning", message: "Careful" }).showMessage).toBe(true);
        expect(fieldMessageState({ message: "Minst 8 tecken" }).showMessage).toBe(false);
        expect(fieldMessageState({ variant: "error" }).showMessage).toBe(false);
        expect(fieldMessageState({ hint: "Help" }).showHint).toBe(true);
    });

    it("lists the caller's ids, then the hint, then the message, and only what is rendered", () => {
        const both = { showHint: true, showMessage: true };
        expect(fieldDescribedBy("f", both, "outer")).toBe("outer f-hint f-message");
        expect(fieldDescribedBy("f", { showHint: true, showMessage: false })).toBe("f-hint");
        expect(fieldDescribedBy("f", { showHint: false, showMessage: true })).toBe("f-message");
        expect(fieldDescribedBy("f", { showHint: false, showMessage: false })).toBeUndefined();
        expect(fieldDescribedBy("f", { showHint: false, showMessage: false }, null)).toBeUndefined();
    });
});

const fields = [
    { name: "Input", component: Input, control: () => screen.getByRole("textbox") },
    { name: "Textarea", component: Textarea, control: () => screen.getByRole("textbox") },
    { name: "Select", component: Select, control: () => document.querySelector("button[aria-haspopup]")! },
] as const;

describe.each(fields)("$name: hint, error and what describes the field", ({ component, control }) => {
    // The components differ in their props beyond these; a loose type keeps one table.
    const show = (props: Record<string, unknown>) => render(component as never, { props: { label: "Lösenord", ...props } as never });

    it("a message without a variant renders nothing, and the field does not point at an id that is not there", () => {
        show({ message: "Minst 8 tecken" });
        expect(screen.queryByText("Minst 8 tecken")).toBeNull();
        expect(control().hasAttribute("aria-describedby")).toBe(false);
    });

    it("a hint is its own element, tied to the field, and not a live region", () => {
        show({ hint: "Minst 8 tecken" });
        const hint = screen.getByText("Minst 8 tecken");
        expect(texts(control())).toEqual(["Minst 8 tecken"]);
        expect(hint.id.endsWith("-hint")).toBe(true);
        expect(hint.hasAttribute("role")).toBe(false);
        expect(hint.hasAttribute("aria-live")).toBe(false);
        expect(control().getAttribute("aria-invalid")).toBeNull();
    });

    it("an error is announced and the field lists hint then error", () => {
        show({ hint: "Minst 8 tecken", error: "För kort" });
        expect(texts(control())).toEqual(["Minst 8 tecken", "För kort"]);
        const alert = screen.getByRole("alert");
        expect(alert.textContent).toContain("För kort");
        expect(alert.id.endsWith("-message")).toBe(true);
        expect(classes(control())).toContain("border-error");
    });

    it("an error wins over variant and message", () => {
        show({ variant: "success", message: "Sparat", error: "För kort" });
        expect(screen.queryByText("Sparat")).toBeNull();
        expect(texts(control())).toEqual(["För kort"]);
        expect(classes(control())).not.toContain("border-success");
    });

    it("variant and message still work as they did", () => {
        show({ variant: "warning", message: "Nästan" });
        const status = screen.getByRole("status");
        expect(status.textContent).toContain("Nästan");
        expect(status.getAttribute("aria-live")).toBe("polite");
        expect(texts(control())).toEqual(["Nästan"]);
        expect(classes(control())).toContain("border-warning");
    });

    it("keeps the caller's own description, first", () => {
        show({ hint: "Minst 8 tecken", "aria-describedby": "outside" });
        expect(describedBy(control())[0]).toBe("outside");
        expect(describedBy(control())).toHaveLength(2);
    });

    it("never lists an id that does not exist", () => {
        for (const props of [{ hint: "a" }, { error: "b" }, { hint: "a", error: "b" }, { variant: "error" }, { message: "c" }]) {
            show(props);
            expect(texts(control())).not.toContain(null);
            cleanup();
        }
    });
});

describe("Input and Textarea mark an invalid field", () => {
    it.each([Input, Textarea])("with aria-invalid when there is an error", (component) => {
        render(component as never, { props: { label: "Namn", error: "Saknas" } as never });
        expect(screen.getByRole("textbox").getAttribute("aria-invalid")).toBe("true");
    });
});

describe("DateField uses the same piece", () => {
    it("lists hint then error, both rendered by Input", () => {
        render(DateField, { props: { label: "Datum", hint: "Senast i dag", error: "Välj ett datum" } });
        const field = screen.getByLabelText("Datum");
        expect(texts(field)).toEqual(["Senast i dag", "Välj ett datum"]);
        expect(field.getAttribute("aria-invalid")).toBe("true");
        expect(screen.getByRole("alert").textContent).toContain("Välj ett datum");
        expect(document.querySelectorAll("[id$='-hint']")).toHaveLength(1);
    });
});

describe("native attributes land on the element", () => {
    it("Input", () => {
        render(Input, {
            props: { label: "E-post", autocomplete: "email", inputmode: "email", maxlength: 120, enterkeyhint: "next", "data-testid": "email" },
        });
        const input = screen.getByTestId("email");
        expect(input.tagName).toBe("INPUT");
        expect(input.getAttribute("autocomplete")).toBe("email");
        expect(input.getAttribute("inputmode")).toBe("email");
        expect(input.getAttribute("maxlength")).toBe("120");
        expect(input.getAttribute("enterkeyhint")).toBe("next");
    });

    it("Textarea", () => {
        render(Textarea, { props: { label: "Anteckningar", maxlength: 500, enterkeyhint: "enter", "data-testid": "notes" } });
        const area = screen.getByTestId("notes");
        expect(area.tagName).toBe("TEXTAREA");
        expect(area.getAttribute("maxlength")).toBe("500");
        expect(area.getAttribute("enterkeyhint")).toBe("enter");
    });

    it("Select: on the trigger, which keeps its own wiring", () => {
        render(Select, { props: { label: "Lag", id: "team", "data-testid": "team-trigger", options: [{ value: "a", label: "A" }] } });
        const trigger = screen.getByTestId("team-trigger");
        expect(trigger.tagName).toBe("BUTTON");
        expect(trigger.id).toBe("team");
        expect(trigger.getAttribute("aria-haspopup")).toBeTruthy();
        expect(screen.getByLabelText("Lag")).toBe(trigger);
    });

    it("Checkbox, Radio and Toggle", () => {
        render(Checkbox, { props: { label: "Villkor", required: true, "data-testid": "terms" } });
        expect(screen.getByTestId("terms")).toBe(screen.getByRole("checkbox"));
        expect((screen.getByRole("checkbox") as HTMLInputElement).required).toBe(true);
        cleanup();
        render(Radio, { props: { label: "Ja", "data-testid": "yes" } });
        expect(screen.getByTestId("yes")).toBe(screen.getByRole("radio"));
        cleanup();
        render(Toggle, { props: { label: "Aviseringar", "data-testid": "notify" } });
        expect(screen.getByTestId("notify")).toBe(screen.getByRole("switch"));
    });

    it("Table and Text, which took none before", () => {
        render(Table, { props: { caption: "Besök", id: "visits", "data-testid": "visits" } });
        expect(screen.getByTestId("visits").tagName).toBe("TABLE");
        expect(screen.getByTestId("visits").id).toBe("visits");
        cleanup();
        render(FormHarness, { props: { show: "tags" } });
        expect(screen.getByTestId("text-p").id).toBe("intro");
    });
});

describe("Input: leading and trailing", () => {
    it("renders both inside the field's box, beside the one input", () => {
        render(FormHarness, { props: { show: "slots" } });
        const input = screen.getByLabelText("Search");
        const box = input.parentElement!;
        expect(box.contains(screen.getByTestId("lead"))).toBe(true);
        expect(box.contains(screen.getByTestId("trail"))).toBe(true);
        expect(screen.getAllByRole("textbox")).toHaveLength(1);
    });

    it("makes room at both ends, from the start and the end and not left and right", () => {
        render(FormHarness, { props: { show: "slots" } });
        const style = screen.getByLabelText("Search").getAttribute("style") ?? "";
        // No layout in jsdom: the least size of a slot, 4px in, and 4px of air: 4 + 32 + 4.
        expect(style).toContain("padding-inline-start: 40px");
        expect(style).toContain("padding-inline-end: 40px");
        expect(style).not.toMatch(/padding-(left|right)/);
    });

    it("leaves the field as it was when there is nothing in it", () => {
        render(Input, { props: { label: "Plain" } });
        expect(screen.getByLabelText("Plain").hasAttribute("style")).toBe(false);
        expect(document.querySelector("[data-input-leading], [data-input-trailing]")).toBeNull();
    });

    it("lets a press through decoration and takes it on a control", async () => {
        render(FormHarness, { props: { show: "slots" } });
        const lead = document.querySelector("[data-input-leading]")!;
        expect(classes(lead)).toContain("pointer-events-none");
        expect(lead.className).toContain("[&_:is(a,button,input,select,textarea,[tabindex])]:pointer-events-auto");
        await userEvent.click(screen.getByTestId("trail"));
        expect(screen.getByTestId("value").textContent).toBe("");
    });

    it("keeps the spinner after the trailing content, and counts it in the room", () => {
        render(FormHarness, { props: { show: "slots", loading: true } });
        const end = document.querySelector("[data-input-trailing]")!;
        const spinner = end.querySelector(".animate-spin")!;
        expect(screen.getByTestId("trail").compareDocumentPosition(spinner) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        // 4 + two 32px slots + 4 between + 4.
        expect(screen.getByLabelText("Search").getAttribute("style")).toContain("padding-inline-end: 76px");
    });

    it("a loading field with nothing else keeps the padding it had", () => {
        render(Input, { props: { label: "Busy", loading: true } });
        const input = screen.getByLabelText("Busy");
        expect(classes(input)).toContain("pe-10");
        expect(input.hasAttribute("style")).toBe(false);
    });
});

describe("Input: revealable", () => {
    const field = () => screen.getByLabelText("Password") as HTMLInputElement;
    const toggle = () => screen.getByRole("button", { name: "Show password" });

    it("adds a toggle button with one name, not pressed, on a password field", () => {
        render(FormHarness, { props: { show: "reveal" } });
        expect(field().type).toBe("password");
        expect(toggle().getAttribute("aria-pressed")).toBe("false");
        expect(toggle().getAttribute("type")).toBe("button");
    });

    it("shows the password as text and hides it again; the name stays, the state changes", async () => {
        render(FormHarness, { props: { show: "reveal" } });
        await userEvent.click(toggle());
        expect(field().type).toBe("text");
        expect(toggle().getAttribute("aria-pressed")).toBe("true");
        expect(field().value).toBe("hunter2!");
        await userEvent.click(toggle());
        expect(field().type).toBe("password");
        expect(toggle().getAttribute("aria-pressed")).toBe("false");
    });

    it("leaves autocomplete alone in both states", async () => {
        render(FormHarness, { props: { show: "reveal" } });
        expect(field().getAttribute("autocomplete")).toBe("current-password");
        await userEvent.click(toggle());
        expect(field().getAttribute("autocomplete")).toBe("current-password");
    });

    it("announces nothing but its own state: no live region appears", async () => {
        render(FormHarness, { props: { show: "reveal" } });
        await userEvent.click(toggle());
        expect(document.querySelector("[aria-live], [role='status'], [role='alert']")).toBeNull();
    });

    it("a pointer press does not take focus from the field, and the caret stays", async () => {
        render(FormHarness, { props: { show: "reveal" } });
        field().focus();
        field().setSelectionRange(3, 3);
        const down = new MouseEvent("mousedown", { bubbles: true, cancelable: true });
        toggle().dispatchEvent(down);
        expect(down.defaultPrevented).toBe(true);
        toggle().click();
        await vi.waitFor(() => expect(field().type).toBe("text"));
        expect(document.activeElement).toBe(field());
        await vi.waitFor(() => expect(field().selectionStart).toBe(3));
    });

    it("from the keyboard the button has focus and keeps it", async () => {
        const user = userEvent.setup();
        render(FormHarness, { props: { show: "reveal" } });
        field().focus();
        await user.tab();
        expect(document.activeElement).toBe(toggle());
        await user.keyboard(" ");
        expect(field().type).toBe("text");
        expect(document.activeElement).toBe(toggle());
        await user.keyboard("{Enter}");
        expect(field().type).toBe("password");
    });

    it("takes another name", () => {
        render(Input, { props: { label: "Lösenord", type: "password", revealable: true, revealLabel: "Visa lösenord" } });
        expect(screen.getByRole("button", { name: "Visa lösenord" })).toBeTruthy();
    });

    it("is there on a password field without being asked for", () => {
        render(Input, { props: { label: "Lösenord", type: "password" } });
        expect(screen.getByRole("button", { name: "Show password" })).toBeTruthy();
    });

    it("is not there on another type, or when turned off", () => {
        render(Input, { props: { label: "E-post", type: "email", revealable: true } });
        expect(screen.queryByRole("button")).toBeNull();
        cleanup();
        render(Input, { props: { label: "Lösenord", type: "password", revealable: false } });
        expect(screen.queryByRole("button")).toBeNull();
    });

    it("is disabled with the field", () => {
        render(FormHarness, { props: { show: "reveal", disabled: true } });
        expect((toggle() as HTMLButtonElement).disabled).toBe(true);
    });

    it("sits 4px inside the field, with the corner that goes with that, and a 44px layer for touch", () => {
        render(FormHarness, { props: { show: "reveal" } });
        const button = classes(toggle());
        expect(button).toContain("rounded-[calc(var(--radius-control)-4px)]");
        expect(button).not.toContain("rounded-control");
        expect(button).toContain("size-8");
        expect(button).toContain("pointer-coarse:min-h-0");
        expect(button).not.toContain("pointer-coarse:min-h-11");
        expect(button).toContain("pointer-coarse:before:min-h-11");
        expect(document.querySelector("[data-input-trailing]")!.className).toContain("pe-[4px]");
    });

    it.each([
        ["sm", "size-6"],
        ["md", "size-8"],
        ["lg", "size-10"],
    ] as const)("at %s the button is 8px smaller than the field", (size, box) => {
        render(FormHarness, { props: { show: "reveal", size } });
        expect(classes(toggle())).toContain(box);
    });
});

describe("Button and IconButton as links", () => {
    it("render an anchor with the button's look", () => {
        render(FormHarness, { props: { show: "links" } });
        const link = screen.getByRole("link", { name: "Log in" });
        expect(link.tagName).toBe("A");
        expect(link.getAttribute("href")).toBe("/login");
        expect(link.hasAttribute("type")).toBe(false);
        expect(link.hasAttribute("disabled")).toBe(false);
        cleanup();
        render(Button, { props: { text: "Log in" } });
        const button = screen.getByRole("button", { name: "Log in" });
        render(Button, { props: { text: "Log in", href: "/login" } });
        expect(screen.getByRole("link", { name: "Log in" }).className).toBe(button.className);
    });

    it("pass target, rel and download on", () => {
        render(FormHarness, { props: { show: "links" } });
        const docs = screen.getByRole("link", { name: "Docs" });
        expect(docs.getAttribute("target")).toBe("_blank");
        expect(docs.getAttribute("rel")).toBe("noopener");
        expect(docs.getAttribute("download")).toBe("docs.pdf");
    });

    it("call onclick with the event", async () => {
        const onclick = vi.fn((event: MouseEvent) => event.preventDefault());
        render(FormHarness, { props: { show: "links", onclick } });
        await userEvent.click(screen.getByRole("link", { name: "Log in" }));
        await userEvent.click(screen.getByRole("link", { name: "Settings" }));
        expect(onclick).toHaveBeenCalledTimes(2);
    });

    it.each([{ disabled: true }, { loading: true }])("a link that is %o has no address, says so, and does nothing", async (state) => {
        const onclick = vi.fn();
        render(FormHarness, { props: { show: "links", onclick, ...state } });
        for (const name of ["Log in", "Settings"]) {
            const link = screen.getByRole("link", { name });
            expect(link.hasAttribute("href")).toBe(false);
            expect(link.getAttribute("aria-disabled")).toBe("true");
            // A disabled link is out of the Tab order; a loading one keeps
            // its Tab stop, so focus is not dropped when loading starts.
            expect(link.getAttribute("tabindex")).toBe("loading" in state ? "0" : null);
            const click = new MouseEvent("click", { bubbles: true, cancelable: true });
            link.dispatchEvent(click);
            expect(click.defaultPrevented).toBe(true);
            expect(classes(link)).toContain("cursor-not-allowed");
            expect(link.className).not.toContain("hover:bg-action-primary-hover");
        }
        expect(onclick).not.toHaveBeenCalled();
        if ("loading" in state) expect(screen.getByRole("link", { name: "Log in" }).getAttribute("aria-busy")).toBe("true");
    });

    it("a link variant with an address is a text link: inline, underlined, no box", () => {
        render(FormHarness, { props: { show: "links" } });
        const link = classes(screen.getByRole("link", { name: "Create one" }));
        expect(link).toContain("inline");
        expect(link).toContain("underline");
        expect(link).toContain("focus-ring");
        expect(link).not.toContain("inline-flex");
        expect(link.some((name) => /^(min-h|h|px|py)-/.test(name))).toBe(false);
    });

    it("an icon link has its name, and is not a toggle", () => {
        render(FormHarness, { props: { show: "links" } });
        const pin = screen.getByRole("link", { name: "Pin" });
        expect(pin.hasAttribute("aria-pressed")).toBe(false);
        expect(classes(pin)).toContain("size-10");
    });

    it("without an address they are the buttons they were", () => {
        render(Button, { props: { text: "Save" } });
        const button = screen.getByRole("button", { name: "Save" });
        expect(button.getAttribute("type")).toBe("button");
        expect(button.hasAttribute("href")).toBe(false);
        expect(button.hasAttribute("role")).toBe(false);
        cleanup();
        render(Button, { props: { text: "Send", type: "submit" } });
        expect(screen.getByRole("button", { name: "Send" }).getAttribute("type")).toBe("submit");
        cleanup();
        render(IconButton, { props: { label: "Bold", pressed: false } });
        expect(screen.getByRole("button", { name: "Bold" }).getAttribute("aria-pressed")).toBe("false");
    });
});

describe("Button: labels wrap, and the press respects reduced motion", () => {
    it.each(["primary", "secondary", "danger", "ghost", "outline"] as const)("%s: no nowrap, a minimum height, balanced lines", (variant) => {
        render(Button, { props: { text: "Mejla mig en inloggningslänk", variant, size: "lg", fullWidth: true } });
        const button = classes(screen.getByRole("button"));
        expect(button).not.toContain("whitespace-nowrap");
        expect(button).toContain("text-balance");
        expect(button).toContain("min-h-12");
        expect(button).not.toContain("h-12");
        expect(button).toContain("items-center");
    });

    it.each([Button, IconButton])("the pressed dip is off under prefers-reduced-motion", (component) => {
        // Every variant that dips: `accent` had the dip without its reduced-motion pair.
        for (const variant of ["primary", "secondary", "danger", "ghost", "outline", "accent"] as const) {
            render(component as never, { props: { text: "Save", label: "Save", variant } as never });
            const button = classes(screen.getByRole("button"));
            expect(button, variant).toContain("active:scale-[0.98]");
            expect(button, variant).toContain("motion-reduce:active:scale-100");
            cleanup();
        }
        render(IconButton, { props: { label: "Delete", variant: "ghost", tone: "danger" } });
        expect(classes(screen.getByRole("button"))).toContain("motion-reduce:active:scale-100");
    });
});

describe("Checkbox, Radio and RadioGroup: the real input takes the press", () => {
    const cases = [
        { name: "Checkbox", show: () => render(Checkbox, { props: { label: "Villkor" } }), input: () => screen.getByRole("checkbox") },
        { name: "Radio", show: () => render(Radio, { props: { label: "Ja" } }), input: () => screen.getByRole("radio") },
        {
            name: "RadioGroup",
            show: () => render(RadioGroup, { props: { label: "Svar", options: [{ value: "a", label: "A" }, { value: "b", label: "B" }] } }),
            input: () => screen.getAllByRole("radio")[0],
        },
    ];

    it.each(cases)("$name: the input covers the box and nothing lies over it", ({ show, input }) => {
        show();
        const control = input();
        const own = classes(control);
        expect(own).not.toContain("sr-only");
        expect(own).toEqual(expect.arrayContaining(["absolute", "size-5", "opacity-0"]));
        // On a touch screen the input itself is the 44px target, centred on the box.
        expect(own).toEqual(
            expect.arrayContaining(["pointer-coarse:size-11", "pointer-coarse:-top-3.5", "pointer-coarse:-start-3.5"]),
        );
        // Everything else in the box lets a press through.
        for (const sibling of control.parentElement!.children) {
            if (sibling === control) continue;
            expect(sibling.getAttribute("class") ?? "", sibling.outerHTML).toContain("pointer-events-none");
        }
    });

    it.each(cases)("$name: still a native control with its label, toggled by a click on either", async ({ show, input }) => {
        show();
        const control = input() as HTMLInputElement;
        expect(control.tagName).toBe("INPUT");
        expect(control.labels?.length).toBe(1);
        await userEvent.click(control);
        expect(control.checked).toBe(true);
    });
});

describe("ListItem: a row is a link, a button, or plain content", () => {
    const item = { id: "notifications", label: "Notifications" };

    it("with neither href nor onclick it is not a button: no arrow, no pointer, not focusable", () => {
        render(ListItem, { props: { item } });
        expect(screen.queryByRole("button")).toBeNull();
        expect(screen.queryByRole("link")).toBeNull();
        const row = screen.getByText("Notifications").closest("div")!;
        expect(row.querySelector("svg")).toBeNull();
        expect(row.hasAttribute("tabindex")).toBe(false);
        const own = classes(row);
        expect(own).not.toContain("cursor-pointer");
        expect(own).not.toContain("focus-ring");
        expect(own.some((name) => name.startsWith("hover:") || name.startsWith("active:"))).toBe(false);
        // The same box as a row that can be pressed.
        expect(own).toEqual(expect.arrayContaining(["flex", "border", "border-[color:var(--zabi-list-row-border-color,transparent)]", "px-4", "py-3"]));
    });

    it("a List without onclick renders such rows, and the links among them stay links", () => {
        render(List, { props: { items: [item, { id: "privacy", label: "Privacy", href: "/privacy" }] } });
        expect(screen.queryAllByRole("button")).toHaveLength(0);
        expect(screen.getAllByRole("link")).toHaveLength(1);
        expect(screen.getAllByRole("listitem")).toHaveLength(2);
        expect(within(screen.getAllByRole("listitem")[0]).queryByRole("img", { hidden: true })).toBeNull();
    });

    it("with onclick it is a button with an arrow, a hover fill and a pressed fill", async () => {
        const onclick = vi.fn();
        render(ListItem, { props: { item, onclick } });
        const row = screen.getByRole("button", { name: "Notifications" });
        expect(row.querySelector("svg")).not.toBeNull();
        const own = classes(row);
        expect(own).toEqual(
            expect.arrayContaining(["cursor-pointer", "focus-ring", "hover:bg-surface-hover", "active:bg-surface-active", "focus-visible:bg-surface-hover"]),
        );
        await userEvent.click(row);
        expect(onclick).toHaveBeenCalledWith(item, expect.any(MouseEvent));
    });

    it("with href it is a link with the same states", () => {
        render(ListItem, { props: { item: { ...item, href: "/settings" } } });
        const own = classes(screen.getByRole("link", { name: "Notifications" }));
        expect(own).toEqual(expect.arrayContaining(["hover:bg-surface-hover", "active:bg-surface-active"]));
    });

    it("a selected row has a pressed fill of its own and no idle hover; a disabled one has neither", () => {
        render(ListItem, { props: { item, selected: true, onclick: () => {} } });
        const selected = classes(screen.getByRole("button"));
        expect(selected).toContain("active:bg-action-primary-subtle-active");
        expect(selected).not.toContain("hover:bg-surface-hover");
        cleanup();
        render(ListItem, { props: { item: { ...item, disabled: true }, onclick: () => {} } });
        const disabled = classes(screen.getByRole("button"));
        expect(disabled.some((name) => name.startsWith("hover:") || name.startsWith("active:"))).toBe(false);
    });
});

describe("headings and text are the element they say, at every level", () => {
    it.each([1, 2, 3, 4, 5, 6] as const)("level %i", (level) => {
        render(FormHarness, { props: { show: "tags", level } });
        const tag = `H${level}`;
        expect(screen.getByTestId("heading").tagName).toBe(tag);
        expect(screen.getByTestId("heading").querySelector("a")).not.toBeNull();
        expect(screen.getByText("Card title").tagName).toBe(tag);
        expect(screen.getByText("Bar title").tagName).toBe(tag);
        expect(screen.getByText("Empty title").tagName).toBe(tag);
        expect(screen.getByText("Empty title").id).toBeTruthy();
    });

    it("Text is a p, a span or a div", () => {
        render(FormHarness, { props: { show: "tags" } });
        expect(screen.getByTestId("text-p").tagName).toBe("P");
        expect(screen.getByTestId("text-span").tagName).toBe("SPAN");
        expect(screen.getByTestId("text-div").tagName).toBe("DIV");
        expect(classes(screen.getByTestId("text-p"))).toEqual(expect.arrayContaining(["text-body", "text-base"]));
    });
});
