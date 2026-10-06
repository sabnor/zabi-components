/**
 * Dark-mode surfaces, taken from steps of the neutral ramp.
 *
 * Shadows don't read on a dark page, so the surfaces carry elevation by tone:
 * but in as few steps as the design needs. 9.0 art-directs dark on its own
 * terms (decisions D133 and D134):
 *
 *   page      --zabi-base-900   L 21.0
 *   card      --zabi-base-850   L 24.1
 *   elevated  --zabi-base-800   L 27.4
 *   overlay   --zabi-base-800   L 27.4   (the same tone as elevated)
 *
 * Two tone steps above the page in all. An overlay (a sheet, a menu, a modal)
 * is no longer told apart by being greyer: it is told apart by its edge
 * (`--color-material-rim`) and its shadow. The overlay hover, one ramp step
 * lighter, is `--zabi-base-750`; the inset (a field, a well) is the page step.
 *
 * Every level is a plain `var(--zabi-base-N)` and nothing else. That is what
 * keeps hue and chroma: the old ladder washed `--zabi-base-50` over the page,
 * which pulled each higher level towards grey on a tinted neutral
 * (`createTheme({ neutral, neutralChroma })`). A step of the ramp is the
 * ramp's own colour, so an app that overrides `--zabi-base-*` gets its own
 * dark surfaces with no further tokens, and an overlay stays opaque.
 *
 * check-surface-elevation.js holds the rule: every level declared as a ramp
 * step (checked on the declared value, not the hex), lightness never
 * decreasing, at most two tone steps of 2 to 5 points, the overlay edge, the
 * card edge. The static toolchain resolves the aliases itself
 * (scripts/resolve-tokens.js).
 */

import { FIXED_LIGHT_SCALE } from './base-scale.js';

/**
 * The physical neutral step of each dark surface role. The page is 900; the
 * rest are the steps above it. The generator writes these into the `.dark`
 * rule in src/app.css.
 */
export const SURFACE_STEP = {
    'surface-base': 900,
    'surface-raised': 850,
    'surface-elevated': 800,
    'surface-overlay': 800,
    'surface-overlay-hover': 750,
    'surface-inset': 900,
};

/** The neutral step that is the dark page. */
export const DARK_BASE_STEP = SURFACE_STEP['surface-base'];

/** Default value of the dark page step, for the checks and the build log. */
export const DARK_BASE = FIXED_LIGHT_SCALE[DARK_BASE_STEP];

/**
 * The dark surface roles as flat hex.
 *
 * Pass another neutral scale (`{ 800: '#…', 850: '#…', 900: '#…' }`) to get
 * the surfaces an overridden `--zabi-base-*` produces; the default is the
 * library's own greys.
 */
export function generateSurfaceLadder(scale = FIXED_LIGHT_SCALE) {
    const levels = {};
    for (const [name, step] of Object.entries(SURFACE_STEP)) levels[name] = scale[step];
    return levels;
}

/** The same roles as the CSS that ships: an alias of its ramp step. */
export function generateSurfaceLadderCss(prefix = '--zabi-base-') {
    const levels = {};
    for (const [name, step] of Object.entries(SURFACE_STEP)) levels[name] = `var(${prefix}${step})`;
    return levels;
}
