// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import Select from "../src/components/atoms/Select.svelte";

/**
 * Compiled for the server, with no `document`. What the server sends is what
 * a visitor has until the scripts arrive, and all they have without scripts:
 * a native `<select>` that is the labelled, visible form control, and the
 * custom trigger not shown. The shared Vitest config resolves `svelte` with
 * the `browser` condition, so the server runtime is named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const options = [
    { value: "weekly", label: "Every week" },
    { value: "monthly", label: "Every month" },
    { value: "never", label: "Never", disabled: true },
];

const render = (props: Record<string, unknown>) =>
    renderOnServer(Select, { props: { label: "Frequency", options, ...props } as never }).body;
const selectTag = (body: string) => /<select[^>]*>/.exec(body)![0];
const attribute = (tag: string, name: string) => new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1];

describe("Select on the server", () => {
    it("renders a native select that the label names, with the name, the options and the chosen one", () => {
        expect(typeof document).toBe("undefined");
        const body = render({ name: "frequency", value: "monthly" });
        const tag = selectTag(body);
        expect(attribute(tag, "name")).toBe("frequency");
        expect(body).toContain(`<label for="${attribute(tag, "id")}"`);
        // Visible and reachable: none of what hides it once the trigger has taken over.
        expect(tag).not.toContain("aria-hidden");
        expect(tag).not.toContain("tabindex");
        expect(tag).not.toMatch(/[" ]invisible[" ]/);
        expect(tag).toContain("appearance-none");
        expect(tag).toContain("h-10");

        const rendered = [...body.matchAll(/<option([^>]*)>([^<]*)<\/option>/g)].map((match) => ({
            value: attribute(match[1], "value"),
            selected: /\sselected/.test(match[1]),
            disabled: /\sdisabled/.test(match[1]),
            text: match[2].trim(),
        }));
        expect(rendered).toEqual([
            { value: "weekly", selected: false, disabled: false, text: "Every week" },
            { value: "monthly", selected: true, disabled: false, text: "Every month" },
            { value: "never", selected: false, disabled: true, text: "Never" },
        ]);
        expect(body).not.toContain('type="hidden"');
    });

    it("the custom trigger is in the markup and not shown, under an id of its own", () => {
        const body = render({ value: "monthly" });
        const button = /<button[^>]*aria-haspopup="listbox"[^>]*>/.exec(body)![0];
        expect(attribute(button, "class")!.split(/\s+/)).toContain("hidden");
        expect(attribute(button, "id")).not.toBe(attribute(selectTag(body), "id"));
        // No list until it is opened.
        expect(body).not.toContain('role="listbox"');
    });

    it("nothing chosen: the placeholder is the empty first option, and required is the element's", () => {
        const body = render({ required: true, placeholder: "Choose one" });
        expect(selectTag(body)).toMatch(/\srequired/);
        const first = /<option([^>]*)>([^<]*)<\/option>/.exec(body)!;
        expect(attribute(first[1], "value")).toBe("");
        expect(first[2].trim()).toBe("Choose one");
    });

    it("disabled is the element's own on the server, where it is the control", () => {
        expect(selectTag(render({ disabled: true, value: "weekly" }))).toMatch(/\sdisabled/);
    });

    it("strings reach the server's markup", () => {
        const body = render({ strings: { placeholder: "Välj" } });
        expect(body).toContain("Välj");
        expect(body).not.toContain("Select an option");
    });

    it('presentation="native": the select and no trigger', () => {
        const body = render({ presentation: "native", value: "weekly", name: "frequency" });
        expect(body).toContain("<select");
        expect(body).not.toContain('aria-haspopup="listbox"');
    });

    it("the markup before mount is the same for auto, popover and sheet", () => {
        const neutral = (body: string) => body.replace(/(id|for|aria-controls|aria-describedby)="[^"]*"/g, '$1=""');
        const popover = neutral(render({ presentation: "popover", value: "weekly" }));
        expect(neutral(render({ presentation: "auto", value: "weekly" }))).toBe(popover);
        expect(neutral(render({ presentation: "sheet", value: "weekly" }))).toBe(popover);
    });
});
