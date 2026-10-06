import type { CreateThemeOptions } from "../../../create-theme/index";

/**
 * The brands the site generates with `createTheme`.
 *
 * These are inputs, the same ones an app passes to `zabi-theme`. The token
 * values are built from them by vite-plugin-brand-themes.js each time the site
 * starts or builds, so no ramp is written out by hand anywhere in the site.
 *
 * Amber is the second brand the docs site and the Playwright theme tests run
 * under: a warm brand colour, a warm neutral and a serif heading face, as far
 * from the default blue as a brand is likely to get.
 */
export const GENERATED_BRANDS = {
    amber: {
        brand: "#C17B00",
        neutral: "#78716c",
        overrides: {
            "--font-family-heading": 'Georgia, "Times New Roman", serif',
        },
    },
    // Not a brand the site can wear: the guide's example of a colour that
    // lands far from the step the primary button uses.
    cobalt: {
        brand: "#0026EA",
    },
} satisfies Record<string, CreateThemeOptions>;

export type GeneratedBrand = keyof typeof GENERATED_BRANDS;
