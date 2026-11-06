/**
 * Colour helpers an app can use without building a whole theme, so that what
 * it stores and previews is exactly what createTheme writes.
 *
 *   import { generateBrandRamp, getContrastRatio, readableOn } from 'zabi-components/color';
 *
 * Also exported by name from `zabi-components/create-theme`. Pure functions;
 * runtime dependency: culori, for the ramp (its lightness is solved in OKLCH).
 * The theme data and the contrast pair list are not loaded.
 */

import { clampChroma, formatHex } from 'culori';
import { toLab, toOklch, RAMP_STEPS } from './lib/ramp-math.js';
import { parseHex, describe, chromaticRamp } from './lib/brand-ramp.js';
import { contrast, contrastExact, failingRatioLabel } from './lib/wcag.js';
import { WHITE as WHITE_LABEL } from './lib/pin-maths.js';
import { pinnedFill } from './lib/pinned-fill.js';
import { DEFAULT_SURFACES } from './lib/default-surfaces.js';

/** The label colours the theme chooses between: white, or the ramp's dark end. */
const WHITE = WHITE_LABEL;
/** The library's near-black, the dark end of its neutral ramp (`--zabi-base-950`). */
const NEAR_BLACK = '#09090b';

/** What text needs (WCAG 1.4.3) and what UI parts and focus rings need (1.4.11). */
const AA = { text: 4.5, ui: 3 };

/**
 * The ramp createTheme builds for `brand`: `{ 50, 100 … 900, 950 }`, each
 * `#rrggbb` in lowercase, the same values as `--zabi-brand-<step>`. Accepts
 * `#rgb` or `#rrggbb`. The colour supplies hue and chroma; it is not pinned to
 * a step.
 *
 * @throws {TypeError} when `brand` is not a hex colour.
 */
export function generateBrandRamp(brand) {
    return chromaticRamp(describe(parseHex(brand, 'brand')));
}

/**
 * Which step of `ramp` is nearest `hex` (CIELAB distance), as createTheme
 * reports in `closest`: `{ step, hex, deltaE, exact }`, deltaE to one decimal.
 * `ramp` maps steps to `#rrggbb`, as generateBrandRamp returns.
 */
export function closestStep(hex, ramp) {
    const target = parseHex(hex, 'hex');
    let best = null;
    for (const [step, value] of Object.entries(ramp)) {
        const [x, y] = [toLab(target), toLab(value)];
        const distance = Math.hypot(x.l - y.l, x.a - y.a, x.b - y.b);
        if (!best || distance < best.deltaE) best = { step: Number(step), hex: value, deltaE: distance };
    }
    return { ...best, deltaE: Math.round(best.deltaE * 10) / 10, exact: best.hex === target };
}

/**
 * The WCAG 2.x contrast ratio of two colours (`#rgb` or `#rrggbb`), 1 to 21.
 * By default it is rounded to two decimals, for display: 2.996 reads 3. Do
 * not compare that figure with a threshold. For a pass/fail check pass
 * `{ exact: true }`, which returns the unrounded ratio (2.996). Order does not
 * matter. Opaque colours only.
 *
 * @param {string} a
 * @param {string} b
 * @param {{ exact?: boolean }} [options] `exact: true` for the unrounded ratio.
 */
export function getContrastRatio(a, b, options = {}) {
    const [x, y] = [parseHex(a, 'a'), parseHex(b, 'b')];
    return options?.exact === true ? contrastExact(x, y) : contrast(x, y);
}

/**
 * The label colour createTheme chooses for a solid fill: white if it reaches
 * 4.5:1 on the fill, otherwise the dark end (`darkEnd`, default the library's
 * near-black `#09090b`; pass a ramp's step 950 to match a theme), and if
 * neither reaches 4.5:1 the one with more contrast. Returns `#rrggbb`. A theme
 * applies the same rule to a fill together with its hover and pressed states,
 * so a label chosen for one fill can differ from the theme's choice for the
 * set.
 */
export function readableOn(fill, darkEnd = NEAR_BLACK) {
    const base = parseHex(fill, 'fill');
    const dark = parseHex(darkEnd, 'darkEnd');
    const white = contrastExact(WHITE, base);
    if (white >= AA.text) return WHITE;
    return contrastExact(dark, base) > white ? dark : WHITE;
}

/**
 * Whether a ratio meets WCAG AA: 4.5 for `'text'`, 3 for `'ui'` (UI parts,
 * focus rings, large text). Pass an exact ratio (`getContrastRatio(a, b,
 * { exact: true })`): the default rounded figure can read 3 for 2.996.
 *
 * @throws {TypeError} when `kind` is neither.
 */
export function meetsAA(ratio, kind) {
    if (!(kind in AA)) throw new TypeError(`zabi-theme: meetsAA kind must be "text" or "ui" (got ${JSON.stringify(kind)})`);
    return ratio >= AA[kind];
}

/**
 * What a pinned brand colour does in light and dark, as createTheme writes it:
 * the label it chooses for the fill with its hover and pressed states, the
 * states, and the ratios. The states and the label come from the same code
 * pin uses (lib/pin-maths.js), and the guarded pairs a pinned fill takes part
 * in are held to the theme by a test, so `light.label` and `light.states` are
 * `--zabi-on-brand`, `--color-action-primary-hover` and `-active` of
 * `createTheme({ brand: hex, pin: true })`, and the same for dark.
 *
 * A mode passes when the label reaches 4.5:1 on the fill and both states
 * (`passes.text`) and the fill reaches 3:1 on the page and on a card
 * (`passes.ui`). Light is always pinned; dark is when createTheme takes the
 * colour there (`pin.dark: 'auto'`), and when it is not, `dark` describes the
 * colour as it would be, not the ramp step the theme keeps. `passes` at the top
 * is true only when both modes pass and dark takes the colour, so that a
 * colour that passes is the colour the site shows.
 *
 * `options.ramp` is a stored brand ramp (default: the ramp of `hex`).
 *
 * @throws {TypeError} when `hex` is not a hex colour or `ramp` lacks a step.
 */
export function brandContrast(hex, options = {}) {
    const colour = parseHex(hex, 'hex');
    const ramp = readRamp(options.ramp) ?? generateBrandRamp(colour);
    const result = pinnedFill(colour, ramp);
    const report = (mode) => {
        const { direction, fill, hover, active, label, pinned } = result[mode];
        const surfaces = DEFAULT_SURFACES[mode];
        // Reported to two decimals; a ratio below its threshold never reads as
        // meeting it (4.495 shows 4.49). The pass/fail test uses the exact ones.
        const shown = (a, b, min) => {
            const exact = contrastExact(a, b);
            return exact < min ? failingRatioLabel(exact, min) : contrast(a, b);
        };
        const ratios = {
            label: { fill: shown(label, fill, AA.text), hover: shown(label, hover, AA.text), active: shown(label, active, AA.text) },
            page: shown(fill, surfaces.page, AA.ui),
            card: shown(fill, surfaces.card, AA.ui),
        };
        const exactLabel = [fill, hover, active].map((colour) => contrastExact(label, colour));
        const exactUi = [surfaces.page, surfaces.card].map((surface) => contrastExact(fill, surface));
        return {
            label,
            states: { hover, active },
            direction,
            ratios,
            passes: {
                text: exactLabel.every((ratio) => ratio >= AA.text),
                ui: exactUi.every((ratio) => ratio >= AA.ui),
            },
            pinned,
        };
    };
    const light = report('light');
    const dark = report('dark');
    const modePasses = (mode) => mode.passes.text && mode.passes.ui;
    return { hex: colour, passes: modePasses(light) && modePasses(dark) && dark.pinned, light, dark };
}

/** A stored ramp as lowercase hex, or undefined when none is given. */
function readRamp(ramp) {
    if (ramp === undefined || ramp === null) return undefined;
    if (typeof ramp !== 'object' || Array.isArray(ramp)) throw new TypeError('zabi-theme: ramp must be an object of steps (50 … 950) to hex colours');
    return Object.fromEntries(
        RAMP_STEPS.map((step) => {
            if (ramp[step] === undefined || ramp[step] === null) throw new TypeError(`zabi-theme: ramp needs every step from 50 to 950; step ${step} is missing`);
            return [step, parseHex(ramp[step], `ramp[${step}]`)];
        }),
    );
}

/** The search moves OKLCH lightness by this much a step, and no further than MAX_SEARCH from the input. */
const SEARCH_STEP = 0.002;
const MAX_SEARCH = 0.6;

/**
 * The nearest brand fill that passes: the colour itself if it already does,
 * otherwise the same OKLCH hue at the nearest lightness (searched outward in
 * both directions, the darker one on a tie) with chroma reduced only as far as
 * sRGB needs. "Passes" is what brandContrast calls passing, in each of
 * `options.modes` (default both): 4.5:1 for the label on the fill, hover and
 * pressed, 3:1 for the fill on the page and a card, and, in dark, createTheme
 * taking the colour. So `createTheme({ brand, pin: { brand: 'nearest-aa' } })`
 * pins exactly `accessibleBrand(brand).hex`.
 *
 * Returns `{ hex, requested, changed, found, ...brandContrast(hex) }`. When
 * nothing within the search passes, `found` is false and `hex` is the best
 * effort: the colour failing the fewest checks, then the nearest.
 *
 * `options.ramp` is the brand ramp, as for brandContrast. Pass the ramp built
 * from the colour you were given, as createTheme does, not one rebuilt from
 * the adjusted colour.
 *
 * @throws {TypeError} when `hex` is not a hex colour, `ramp` lacks a step or `modes` names another mode.
 */
export function accessibleBrand(hex, options = {}) {
    const requested = parseHex(hex, 'hex');
    const ramp = readRamp(options.ramp) ?? generateBrandRamp(requested);
    const modes = options.modes ?? ['light', 'dark'];
    if (!Array.isArray(modes) || modes.length === 0 || modes.some((mode) => mode !== 'light' && mode !== 'dark')) {
        throw new TypeError('zabi-theme: accessibleBrand modes must be "light", "dark" or both');
    }
    // How many of the checks fail: light and dark each have text and ui, dark also has to take the colour.
    const failures = (report) =>
        modes.reduce((n, mode) => n + (report[mode].passes.text ? 0 : 1) + (report[mode].passes.ui ? 0 : 1) + (report[mode].pinned ? 0 : 1), 0);
    const given = brandContrast(requested, { ramp });
    if (failures(given) === 0) return { ...given, requested, changed: false, found: true };

    const start = toOklch(requested);
    const chroma = start.c ?? 0;
    const hue = Number.isFinite(start.h) ? start.h : 0;
    const seen = new Set([requested]);
    let best = { report: given, failed: failures(given), distance: 0 };
    for (let n = 1; n * SEARCH_STEP <= MAX_SEARCH; n += 1) {
        // The darker candidate first, so a tie is the darker one.
        for (const sign of [-1, 1]) {
            const l = start.l + sign * n * SEARCH_STEP;
            if (l < 0 || l > 1) continue;
            const candidate = formatHex(clampChroma({ mode: 'oklch', l, c: chroma, h: hue }, 'oklch'));
            if (seen.has(candidate)) continue;
            seen.add(candidate);
            const report = brandContrast(candidate, { ramp });
            const failed = failures(report);
            if (failed === 0) return { ...report, requested, changed: true, found: true };
            if (failed < best.failed) best = { report, failed, distance: n };
        }
    }
    return { ...best.report, requested, changed: best.report.hex !== requested, found: false };
}
