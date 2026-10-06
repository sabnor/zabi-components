import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { chromium, type FullConfig } from "@playwright/test";

import { componentsCatalog } from "../src/lib/showcase/components-catalog";

/**
 * Warms the dev server before the first test.
 *
 * `vite dev` compiles a route the first time it is asked for. Left to the
 * tests, every worker asks for a different one at once, and the first minute
 * of a run is pages that take longer to load and hydrate than a test waits:
 * failures that say nothing about the library. So each route the suite
 * visits is opened here, one at a time, until it has hydrated
 * (`data-zabi-hydrated`, set by src/routes/+layout.svelte).
 *
 * The routes are read from where they are defined, so a new page or lab is
 * warmed without being added here: the component pages from the catalog,
 * the labs from the folders under src/routes.
 *
 * `PLAYWRIGHT_WARMUP=0` skips it, for a run of one file that does not need
 * the rest (see RELEASING.md).
 */

/** How long one route may take. This is setup, not a test: it bounds a hang, not the product. */
const ROUTE_BUDGET = 120_000;

/** `/chaos-lab`, `/chaos-lab/tabs` and so on: every folder under `lab` that has a page. */
function labRoutes(lab: string): string[] {
    const found: string[] = [];
    const walk = (dir: string, route: string) => {
        if (!existsSync(dir)) return;
        if (existsSync(join(dir, "+page.svelte"))) found.push(route);
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            if (entry.isDirectory()) walk(join(dir, entry.name), `${route}/${entry.name}`);
        }
    };
    walk(join("src", "routes", lab), `/${lab}`);
    return found.sort();
}

function routes(): string[] {
    const components = Object.values(componentsCatalog)
        .flat()
        .map((component) => `/components/${component.name}`);
    return ["/", "/docs", "/theming", ...components, ...labRoutes("chaos-lab"), ...labRoutes("phone-lab")];
}

export default async function globalSetup(config: FullConfig): Promise<void> {
    if (process.env.PLAYWRIGHT_WARMUP === "0") return;
    const baseURL = config.projects[0]?.use.baseURL;
    if (!baseURL) throw new Error("Warm-up: the config has no baseURL to open the routes at.");

    const all = routes();
    const began = Date.now();
    const browser = await chromium.launch();
    const page = await browser.newPage();
    try {
        for (const route of all) {
            const started = Date.now();
            try {
                await page.goto(new URL(route, baseURL).href, {
                    waitUntil: "domcontentloaded",
                    timeout: ROUTE_BUDGET,
                });
                await page.waitForFunction(
                    () => document.documentElement.dataset.zabiHydrated === "true",
                    undefined,
                    { timeout: Math.max(1, ROUTE_BUDGET - (Date.now() - started)) },
                );
            } catch (cause) {
                throw new Error(
                    `Warm-up: ${route} did not load and hydrate within ${ROUTE_BUDGET / 1000} s. ` +
                        `Open ${new URL(route, baseURL).href} in a browser to see why. ` +
                        `(PLAYWRIGHT_WARMUP=0 skips the warm-up.)`,
                    { cause },
                );
            }
        }
    } finally {
        await browser.close();
    }
    const seconds = ((Date.now() - began) / 1000).toFixed(1);
    console.log(`Warm-up: ${all.length} routes opened and hydrated in ${seconds} s.`);
}
