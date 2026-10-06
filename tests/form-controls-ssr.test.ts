// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import Button from "../src/components/atoms/Button.svelte";
import Checkbox from "../src/components/atoms/Checkbox.svelte";
import Input from "../src/components/atoms/Input.svelte";
import ListItem from "../src/components/atoms/ListItem.svelte";
import Select from "../src/components/atoms/Select.svelte";
import Textarea from "../src/components/atoms/Textarea.svelte";
import FormHarness from "./fixtures/FormHarness.svelte";

/**
 * Compiled for the server, with no `document` and no `ResizeObserver`: the
 * field's ends are not measured there, so the room for them has to be right
 * from the markup alone. The shared Vitest config resolves `svelte` with the
 * `browser` condition, so the server runtime is named by path.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));

const body = (component: unknown, props: Record<string, unknown>) =>
    renderOnServer(component as never, { props: props as never }).body;
const ids = (markup: string) => [...markup.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
const describedBy = (markup: string) => (/aria-describedby="([^"]*)"/.exec(markup)?.[1] ?? "").split(" ").filter(Boolean);

describe("fields on the server", () => {
    it.each([
        ["Input", Input],
        ["Textarea", Textarea],
        ["Select", Select],
    ] as const)("%s: every id in aria-describedby is in the markup, hint before error", (_name, component) => {
        expect(typeof document).toBe("undefined");
        const markup = body(component, { label: "Lösenord", hint: "Minst 8 tecken", error: "För kort" });
        const listed = describedBy(markup);
        expect(listed).toHaveLength(2);
        expect(listed[0].endsWith("-hint")).toBe(true);
        expect(listed[1].endsWith("-message")).toBe(true);
        for (const id of listed) expect(ids(markup)).toContain(id);
        expect(markup).toMatch(/role="alert"/);
    });

    it.each([
        ["Input", Input],
        ["Textarea", Textarea],
        ["Select", Select],
    ] as const)("%s: a message without a variant leaves no dangling reference", (_name, component) => {
        const markup = body(component, { label: "Lösenord", message: "Minst 8 tecken" });
        expect(markup).not.toContain("aria-describedby");
        expect(markup).not.toContain("Minst 8 tecken");
    });

    it("Input: native attributes are in the first byte", () => {
        const markup = body(Input, { label: "E-post", autocomplete: "email", inputmode: "email", maxlength: 120, enterkeyhint: "next" });
        expect(markup).toMatch(/<input[^>]*autocomplete="email"/);
        expect(markup).toMatch(/<input[^>]*inputmode="email"/);
        expect(markup).toMatch(/<input[^>]*maxlength="120"/);
        expect(markup).toMatch(/<input[^>]*enterkeyhint="next"/);
    });

    it("Input: a revealable password is a password, with its button and the room for it", () => {
        const markup = body(FormHarness, { show: "reveal" });
        expect(markup).toMatch(/<input[^>]*type="password"/);
        expect(markup).toMatch(/<input[^>]*autocomplete="current-password"/);
        expect(markup).toMatch(/<button[^>]*aria-pressed="false"[^>]*aria-label="Show password"|<button[^>]*aria-label="Show password"[^>]*aria-pressed="false"/);
        // 4 + 32 + 4, before anything is measured.
        expect(markup).toMatch(/<input[^>]*style="[^"]*padding-inline-end: 40px/);
    });

    it("Input: leading and trailing content is rendered, with room at both ends", () => {
        const markup = body(FormHarness, { show: "slots" });
        expect(markup).toContain('data-testid="lead"');
        expect(markup).toContain('data-testid="trail"');
        expect(markup).toMatch(/padding-inline-start: 40px/);
        expect(markup).toMatch(/padding-inline-end: 40px/);
    });

    it("Checkbox: the input is not hidden under the ring", () => {
        const markup = body(Checkbox, { label: "Villkor" });
        const input = /<input[^>]*>/.exec(markup)![0];
        expect(input).not.toContain("sr-only");
        expect(input).toContain("opacity-0");
    });
});

describe("buttons, links and rows on the server", () => {
    it("Button with href is an anchor; disabled, it has no address", () => {
        expect(body(Button, { text: "Log in", href: "/login" })).toMatch(/<a[^>]*href="\/login"[^>]*>/);
        const disabled = body(Button, { text: "Log in", href: "/login", disabled: true });
        expect(disabled).toMatch(/<a[^>]*aria-disabled="true"/);
        expect(disabled).not.toContain("href=");
        expect(body(Button, { text: "Save" })).toMatch(/<button[^>]*type="button"/);
    });

    it("a row with nothing to do is plain content", () => {
        const plain = body(ListItem, { item: { id: "a", label: "Notifications" } });
        expect(plain).not.toContain("<button");
        expect(plain).not.toContain("<svg");
        expect(plain).not.toContain("cursor-pointer");
        const link = body(ListItem, { item: { id: "a", label: "Notifications", href: "/n" } });
        expect(link).toMatch(/<a[^>]*href="\/n"/);
        expect(link).toContain("<svg");
    });

    it.each([1, 2, 3, 4, 5, 6])("headings are static h%i elements, with no dynamic element between", (level) => {
        const markup = body(FormHarness, { show: "tags", level });
        expect(markup.match(new RegExp(`<h${level}[\\s>]`, "g"))).toHaveLength(4);
        expect(markup).toMatch(/<p[^>]*data-testid="text-p"/);
        expect(markup).toMatch(/<span[^>]*data-testid="text-span"/);
        expect(markup).toMatch(/<div[^>]*data-testid="text-div"/);
    });
});
