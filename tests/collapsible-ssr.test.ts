// @vitest-environment node
import { render as renderOnServer } from "svelte/server";
import { describe, expect, it, vi } from "vitest";

import CollapsibleGroupHarness from "./fixtures/CollapsibleGroupHarness.svelte";
import CollapsibleHarness from "./fixtures/CollapsibleHarness.svelte";

/**
 * The node environment makes Vite compile the components for the server, which
 * is what SvelteKit does for the first response. Nothing here has a DOM.
 *
 * The shared Vitest config resolves `svelte` with the `browser` condition (the
 * other suites mount components in jsdom), so the server runtime is named
 * here by path. Without it `getContext` comes from the client runtime and
 * throws inside a server render.
 */
vi.mock("svelte", () => import("../node_modules/svelte/src/index-server.js"));
/** The `<details ...>` start tags of a render, in order. */
const detailsTags = (body: string) => [...body.matchAll(/<details[^>]*>/g)].map((m) => m[0]);
const isOpenTag = (tag: string) => /\sopen(=|\s|>)/.test(tag);

describe("Collapsible on the server", () => {
    it("renders a closed Collapsible as a native details a visitor can open without scripts", () => {
        const { body } = renderOnServer(CollapsibleHarness, { props: {} });

        const tags = detailsTags(body);
        expect(tags).toHaveLength(1);
        expect(isOpenTag(tags[0])).toBe(false);

        const summary = /<summary[^>]*aria-controls="([^"]+)"[^>]*>/.exec(body);
        expect(summary).toBeTruthy();
        expect(summary?.[0]).toContain("data-collapsible-trigger");
        // Native disclosure semantics: neither a role nor aria-expanded.
        expect(summary?.[0]).not.toContain("aria-expanded");
        expect(summary?.[0]).not.toContain("role=");
        expect(body).toMatch(/<summary[\s\S]*Billing[\s\S]*<\/summary>/);
        expect(body).not.toContain("<button type=\"button\" aria-expanded");

        const panel = new RegExp(`<div[^>]*id="${summary?.[1]}"[^>]*>`).exec(body);
        const triggerId = /id="([^"]+)"/.exec(summary?.[0] ?? "")?.[1];
        expect(panel?.[0]).toContain(`aria-labelledby="${triggerId}"`);
        // No `hidden` hides the panel: the browser does it, so it opens with no script.
        expect(panel?.[0]).not.toMatch(/\shidden(=|\s|>)/);
        // The content is in the markup, inside the details.
        expect(body).toContain('data-testid="note"');
        expect(body.indexOf("<details")).toBeLessThan(body.indexOf('data-testid="note"'));
        expect(body.indexOf('data-testid="note"')).toBeLessThan(body.indexOf("</details>"));
    });

    it("renders an open Collapsible as <details open>", () => {
        const { body } = renderOnServer(CollapsibleHarness, { props: { initialOpen: true } });

        const tags = detailsTags(body);
        expect(tags).toHaveLength(1);
        expect(isOpenTag(tags[0])).toBe(true);
        expect(body).toContain('data-state="open"');
        expect(body).toContain('data-testid="note"');
    });

    it("keeps the heading inside the summary and the disabled look inert without scripts", () => {
        const { body } = renderOnServer(CollapsibleHarness, {
            props: { headingLevel: 3, disabled: true },
        });
        expect(body).toMatch(/<summary[^>]*>[\s\S]*<h3[\s\S]*Billing[\s\S]*<\/h3>[\s\S]*<\/summary>/);
        const summary = /<summary[^>]*>/.exec(body)?.[0] ?? "";
        expect(summary).toContain('aria-disabled="true"');
        expect(summary).toContain('tabindex="-1"');
        expect(summary).toContain("pointer-events-none");
    });

    it("still serves a custom trigger as a button and a hidden panel", () => {
        const { body } = renderOnServer(CollapsibleHarness, { props: { custom: true } });

        expect(body).not.toContain("<details");
        expect(body).not.toContain("<summary");
        const button = /<button[^>]*aria-controls="([^"]+)"[^>]*>/.exec(body);
        expect(button?.[0]).toContain('aria-expanded="false"');
        const panel = new RegExp(`<div[^>]*id="${button?.[1]}"[^>]*>`).exec(body);
        expect(panel?.[0]).toMatch(/\shidden(=|\s|>)/);
    });

    it("leaves the content out of the markup with unmountOnClose", () => {
        const { body } = renderOnServer(CollapsibleHarness, { props: { unmountOnClose: true } });
        expect(body).not.toContain('data-testid="note"');
        expect(detailsTags(body)).toHaveLength(1);
    });

    it("renders an open panel without hidden, and a group around its members", () => {
        const { body } = renderOnServer(CollapsibleGroupHarness, {
            props: { initial: ["general"] },
        });

        // General is the open details; Advanced, Members are closed.
        expect(detailsTags(body).map(isOpenTag)).toEqual([true, false, false]);
        const open = /<div[^>]*role="region"[^>]*>/.exec(body);
        expect(open).toBeTruthy();
        expect(open?.[0]).not.toContain("hidden");
        expect(body).toContain("<h3");
    });

    it("serves a single-open group already settled when several panels start open", () => {
        const { body } = renderOnServer(CollapsibleGroupHarness, {
            props: { initial: ["general", "members", "billing"] },
        });

        // General is first, so it is the one served open. "Advanced" is nested
        // in General's panel and never open here. Billing has a custom trigger.
        expect(detailsTags(body).map(isOpenTag)).toEqual([true, false, false]);
        expect([...body.matchAll(/aria-expanded="(true|false)"/g)].map((m) => m[1])).toEqual([
            "false",
        ]);

        const regions = [...body.matchAll(/<div[^>]*role="region"[^>]*>/g)].map(
            (match) => match[0],
        );
        expect(regions).toHaveLength(3);
        expect(regions.filter((panel) => !/\shidden(=|\s|>)/.test(panel))).toHaveLength(2);
    });

    it("serves a single-open group with one shared name, and a multiple group with none", () => {
        const single = detailsTags(
            renderOnServer(CollapsibleGroupHarness, { props: {} }).body,
        );
        const names = single.map((tag) => /\sname="([^"]+)"/.exec(tag)?.[1]);
        // General and Members share it; the nested Advanced is outside the group.
        expect(names[0]).toBeTruthy();
        expect(names[2]).toBe(names[0]);
        expect(names[1]).toBeUndefined();

        const multiple = detailsTags(
            renderOnServer(CollapsibleGroupHarness, { props: { multiple: true } }).body,
        );
        for (const tag of multiple) expect(tag).not.toContain("name=");
    });

    it("serves a disabled open panel open beside the first open one", () => {
        const { body } = renderOnServer(CollapsibleGroupHarness, {
            props: { initial: ["general", "members", "billing"], disableMembers: true },
        });
        // General, Advanced (nested, closed), Members (disabled, kept open).
        expect(detailsTags(body).map(isOpenTag)).toEqual([true, false, true]);
        // Billing, with a custom trigger, is closed.
        expect(body).toContain('aria-expanded="false"');
    });
});
