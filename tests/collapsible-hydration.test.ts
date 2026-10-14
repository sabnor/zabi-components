import { cleanup, waitFor } from "@testing-library/svelte";
import { hydrate, tick, unmount } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";

import CollapsibleHarness from "./fixtures/CollapsibleHarness.svelte";

/**
 * A visitor can toggle a server-rendered `Collapsible` before its scripts
 * arrive: the browser opens the `<details>` by itself. Hydration must adopt
 * that, not set the element back from the state. The markup below is what
 * `renderOnServer(CollapsibleHarness)` produces (see `collapsible-ssr.test.ts`,
 * which has the node environment a server render needs); here jsdom plays the
 * browser that received it.
 */

const CLOSED = `<!--[--><!--[-1--><div class="" data-state="closed" data-testid="host"><!--[-1--><details data-collapsible-ssr=""><summary id="collapsible-trigger-ssr-1" aria-controls="collapsible-panel-ssr-2" data-collapsible-trigger="" class="focus-ring block w-full cursor-pointer list-none rounded-control text-start text-sm font-medium text-headline transition-colors duration-150 hover:bg-surface-hover active:bg-surface-active motion-reduce:transition-none [&amp;::-webkit-details-marker]:hidden"><!--[-1--><span class="m-0 flex items-center justify-between gap-2 px-3 py-2 text-sm font-medium pointer-coarse:min-h-11"><span class="min-w-0 flex-1">Billing</span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="lucide-icon lucide lucide-chevron-down shrink-0 text-description transition-transform duration-150 motion-reduce:transition-none"><!--[--><!----><path d="m6 9 6 6 6-6"><!----></path><!----><!--]--><!----><!----></svg><!----><!----></span><!--]--></summary> <div id="collapsible-panel-ssr-2" role="group" aria-labelledby="collapsible-trigger-ssr-1" class="px-3 pb-3 pt-1"><!--[0--><label>Note <input data-testid="note"/></label> <a href="/details">Read more</a> <button type="button">Save</button><!----><!--]--></div><!----></details><!--]--></div><!--]--> <button type="button">Outside toggle</button> <p data-testid="state">closed</p><!--]-->`;

/** The same page as the server renders it for `initialOpen`. */
const OPEN = CLOSED.replace('data-state="closed"', 'data-state="open"')
    .replace('<details data-collapsible-ssr="">', '<details open="" data-collapsible-ssr="">')
    .replace(">closed</p>", ">open</p>");

let mounted: ReturnType<typeof hydrate> | undefined;

afterEach(() => {
    if (mounted) unmount(mounted);
    mounted = undefined;
    cleanup();
    document.body.innerHTML = "";
    vi.restoreAllMocks();
});

async function hydrateFrom(html: string, initialOpen: boolean, before: (details: HTMLDetailsElement) => void) {
    document.body.innerHTML = html;
    const details = document.querySelector("details") as HTMLDetailsElement;
    before(details);
    // Let the toggle event of that change fire with nobody listening, as it would.
    await new Promise((resolve) => setTimeout(resolve, 20));
    const onopenchange = vi.fn();
    mounted = hydrate(CollapsibleHarness, { target: document.body, props: { initialOpen, onopenchange } });
    await tick();
    await new Promise((resolve) => setTimeout(resolve, 30));
    return { details, onopenchange };
}

const state = () => document.querySelector("[data-testid=state]")?.textContent?.trim();

describe("Collapsible hydration", () => {
    it("keeps a panel the visitor opened before hydration, and reports it", async () => {
        const { details, onopenchange } = await hydrateFrom(CLOSED, false, (d) => (d.open = true));

        expect(details.isConnected).toBe(true);
        expect(details.open).toBe(true);
        expect(state()).toBe("open");
        expect(document.querySelector("[data-testid=host]")?.getAttribute("data-state")).toBe("open");
        expect(onopenchange.mock.calls).toEqual([[true]]);
    });

    it("keeps a panel the visitor closed before hydration", async () => {
        const { details, onopenchange } = await hydrateFrom(OPEN, true, (d) => (d.open = false));

        expect(details.open).toBe(false);
        expect(state()).toBe("closed");
        expect(onopenchange.mock.calls).toEqual([[false]]);
    });

    it("changes nothing, and reports nothing, when the visitor did nothing", async () => {
        const { details, onopenchange } = await hydrateFrom(OPEN, true, () => {});

        expect(details.open).toBe(true);
        expect(state()).toBe("open");
        expect(onopenchange).not.toHaveBeenCalled();
    });

    it("works as usual afterwards", async () => {
        const { details } = await hydrateFrom(CLOSED, false, () => {});

        document.querySelector("summary")?.click();
        await waitFor(() => expect(state()).toBe("open"));
        expect(details.open).toBe(true);
    });
});
