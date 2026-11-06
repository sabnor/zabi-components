/**
 * createTheme — one brand colour in, a file of token overrides out.
 *
 *   import { createTheme } from 'zabi-components/create-theme';
 *   const { css, tokens, warnings } = createTheme({ brand: '#0026EA' });
 *
 * The CSS holds `--zabi-brand-50 … 950` (and `--zabi-accent-*`, `--zabi-base-*`
 * when asked for) on `:root`. Imported after `zabi-components/theme-only` and
 * `zabi-components/theme-dark-only` it restyles light and dark; nothing is
 * repeated for dark, because the dark theme only remaps roles onto the ramps.
 *
 * How the ramps are built:
 *   - On the library's shared lightness curve (./lib/ramp-math.js), so
 *     `<ramp>-600` means the same lightness as in every built-in ramp and every
 *     role keeps the contrast it was designed with. The colour you give
 *     supplies hue and chroma; it is NOT pinned to a step, so the exact hex may
 *     not appear in the ramp. `closest` says which step it landed nearest.
 *   - The neutral ramp keeps the base scale's own 21 lightness steps and is
 *     tinted toward the hue you give, at low chroma, so it stays a neutral.
 *
 * `pin` puts the exact colour on the primary action. The ramp stays on the
 * curve, and the roles that ARE the brand colour (the primary fill, and where
 * they still pass, the focus ring and links) are written as role overrides:
 * light on `:root`, dark under the selectors the dark theme is published
 * under. See "pinning" below.
 *
 * Then every role pair the library guards (the same list as
 * scripts/check-contrast.js) is resolved in light and in dark with the new
 * ramps in place, and anything under WCAG AA comes back in `warnings`.
 *
 * `./theme-data.js` is not in the source tree: scripts/build-create-theme.js
 * writes it next to this file in dist/, from src/app.css and the pair list, on
 * every build. It is the default theme's token map and cannot go stale.
 *
 * The ramp, the contrast ratio and the label rule are also exported on their
 * own (./color.js, `zabi-components/color`), so an app can store and preview
 * exactly what this writes. `brandRamp` hands createTheme a stored ramp; `check:
 * false` skips the full pair check for per-request use.
 *
 * The ramp, the contrast ratio and the label rule are also exported on their
 * own (./color.js, `zabi-components/color`), so an app can store and preview
 * exactly what this writes. `brandRamp` hands createTheme a stored ramp;
 * `check: false` skips the full pair check for per-request use.
 *
 * Plain ESM, no build step. Runtime dependency: culori.
 */

import data from './theme-data.js';
import { RAMP_STEPS, hexAt, cieL, toOklch } from './lib/ramp-math.js';
import { resolveTokenColor, resolveTokenPaint, compositeOver, dimBackdrop, backdropBrightness } from './lib/resolve.js';
import { luminance, contrastExact, failingRatioLabel } from './lib/wcag.js';
import { parseHex, describe, MIN_USEFUL_CHROMA } from './lib/brand-ramp.js';
import { generateBrandRamp, closestStep, accessibleBrand } from './color.js';
import { WHITE, shades, SHADE_DIRECTIONS, shadeRecipe, labelCandidates, pickLabel } from './lib/pin-maths.js';

/** The neutral ramp's 21 steps. */
export const BASE_STEPS = [
    50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500,
    550, 600, 650, 700, 750, 800, 850, 900, 925, 950,
];

export { RAMP_STEPS };
export { generateBrandRamp, closestStep, getContrastRatio, readableOn, meetsAA, brandContrast, accessibleBrand } from './color.js';

const TOOL = 'zabi-theme';

/** A neutral stays a neutral: this is the most chroma any of its steps gets. */
const MAX_NEUTRAL_CHROMA = 0.03;
/** `neutralChroma` may lift the cap, but not past this: beyond it the steps stop being neutrals. */
const MAX_NEUTRAL_CHROMA_OPTION = 0.1;
/** The least any neutral step keeps of that, so the lightest steps still tint. */
const MIN_NEUTRAL_PROFILE = 0.25;
/** CIELAB ΔE past which the input is visibly not one of the ramp's steps. */
const FAR_FROM_RAMP = 10;

/* ---------- input ---------- */

/** Notes about an input that will not give the ramp its author expects. */
function inputWarnings(option, colour) {
    const out = [];
    const add = (message) => out.push({ type: 'input', option, message: `${option} ${colour.hex} ${message}` });
    if (colour.chroma < MIN_USEFUL_CHROMA) {
        add('has almost no colour in it, so the ramp is a grey scale. Give a more saturated colour for a visible hue.');
    } else if (colour.lightness > 96) {
        add('is nearly white: only its hue is used, and the ramp is built at the chroma that hue can carry.');
    } else if (colour.lightness < 6) {
        add('is nearly black: only its hue is used, and the ramp is built at the chroma that hue can carry.');
    }
    return out;
}

/* ---------- overrides ---------- */

const MODE_KEYS = ['light', 'dark', 'both'];

function checkDeclarations(map, where, flat) {
    for (const [name, value] of Object.entries(map)) {
        if (!name.startsWith('--') || typeof value !== 'string' || !value.trim()) {
            throw new TypeError(
                flat
                    ? `${TOOL}: overrides must map custom property names ("--color-link") to values (got ${name}: ${value})`
                    : `${TOOL}: ${where}["${name}"] must map a custom property name ("--color-link") to a non-empty string value (got ${name}: ${typeof value === 'string' ? `"${value}"` : String(value)})`,
            );
        }
    }
}

/**
 * `overrides` is a flat map of `--token: value` (both modes), or an object with
 * any of `light`, `dark` and `both`, each a flat map. Flat keys beside them
 * count as `both`. Returns the maps by mode.
 */
function readOverrides(overrides) {
    if (overrides === null || typeof overrides !== 'object' || Array.isArray(overrides)) {
        throw new TypeError(`${TOOL}: overrides must be an object of token names to values`);
    }
    const nested = MODE_KEYS.some((key) => key in overrides);
    const out = { light: {}, dark: {}, both: {} };
    if (!nested) {
        checkDeclarations(overrides, 'overrides', true);
        out.both = { ...overrides };
        return out;
    }
    for (const [key, value] of Object.entries(overrides)) {
        if (MODE_KEYS.includes(key)) {
            if (value === null || typeof value !== 'object' || Array.isArray(value)) {
                throw new TypeError(`${TOOL}: overrides.${key} must be an object of token names to values (got ${JSON.stringify(value)})`);
            }
            checkDeclarations(value, `overrides.${key}`, false);
            out[key] = { ...out[key], ...value };
        } else {
            if (!key.startsWith('--')) {
                throw new TypeError(`${TOOL}: overrides has no "${key}"; it takes light, dark, both, or custom property names ("--color-link")`);
            }
            checkDeclarations({ [key]: value }, 'overrides', false);
            out.both[key] = value;
        }
    }
    return out;
}

/**
 * What the overrides write. `root` goes on `:root`: both, then light. `dark` is
 * what the dark rules must say so that `:root` does not reach dark: the dark
 * override; for a token set in `light` alone, dark's own value without it; for
 * one also set in `both`, that value. `own` is that dark value, from what the
 * file writes already, then the library's dark theme, then its light default.
 */
function overrideMaps({ light, dark, both }, tokens, darkTokens) {
    const root = { ...both, ...light };
    const out = { ...dark };
    for (const name of Object.keys(light)) {
        if (name in dark) continue;
        out[name] = both[name] ?? darkTokens[name] ?? data.darkOnly[name] ?? tokens[name] ?? data.light[name];
    }
    for (const name of Object.keys(out)) if (out[name] === undefined) delete out[name];
    const skip = new Set([...Object.keys(root), ...Object.keys(dark)]);
    return { root, dark: out, skip };
}

/* ---------- neutral ramp ---------- */

function neutralRamp(colour, chromaOption) {
    const defaults = BASE_STEPS.map((step) => {
        const hex = data.light[`--zabi-base-${step}`];
        return { step, lightness: cieL(hex), chroma: toOklch(hex).c ?? 0 };
    });
    const peak = Math.max(...defaults.map((d) => d.chroma)) || 1;
    // The default greys carry most chroma mid-ramp and almost none at the ends.
    // The tint keeps that shape, with a floor so the page and card still tint.
    const profile = (d) => Math.max(d.chroma / peak, MIN_NEUTRAL_PROFILE);
    const nearest = defaults.reduce((best, d) =>
        Math.abs(d.lightness - colour.lightness) < Math.abs(best.lightness - colour.lightness) ? d : best,
    );
    // `neutralChroma` replaces the capped value; the profile across the steps stays.
    const peakChroma = chromaOption ?? Math.min(colour.chroma / profile(nearest), MAX_NEUTRAL_CHROMA);
    const out = {};
    for (const d of defaults) out[d.step] = hexAt(d.lightness, peakChroma * profile(d), colour.hue);
    return out;
}

/* ---------- ink roles ---------- */

/**
 * The translucent roles that are fixed alpha tints of near-black (light) or
 * near-white (dark) in the library, so grey over any ramp. With `neutralChroma`
 * they are the neutral ramp's own ink at the same alpha instead. Each keeps the
 * alpha the library gives it, read from the default theme's data. The dark
 * `--color-border-overlay` is already a ramp step: it is restated as it is.
 */
const INK_ROLES = [
    '--color-action-secondary',
    '--color-action-secondary-hover',
    '--color-action-secondary-active',
    '--color-surface-hover',
    '--color-surface-active',
    '--color-border-overlay',
];

/** `rgba(9, 9, 11, 0.1)` -> 10. Null for anything that is not an rgba() tint. */
function alphaPercent(value) {
    const match = /^rgba\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*([\d.]+)\s*\)$/.exec(String(value ?? '').trim());
    return match ? Math.round(Number(match[1]) * 1000) / 10 : null;
}

/** `#18181b` -> `24 24 27`, the form `--shadow-color` takes. */
function triplet(hex) {
    return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(' ');
}

/**
 * Light and dark declarations for the ink roles over a neutral ramp. A role
 * the author overrides in a mode (or in `both`) is left out for that mode, so
 * their override is what it shows. The other mode keeps the ramp's ink: a role
 * set in `light` alone is still the tinted mix in dark, not the library's grey.
 */
function inkTokens(ramp, modes) {
    const light = {};
    const dark = {};
    const setIn = (mode, role) => role in modes[mode] || role in modes.both;
    const mix = (step, percent) => `color-mix(in srgb, var(--zabi-base-${step}) ${percent}%, transparent)`;
    for (const role of INK_ROLES) {
        const lightPercent = alphaPercent(data.light[role]);
        if (lightPercent !== null && !setIn('light', role)) light[role] = mix(900, lightPercent);
        if (setIn('dark', role)) continue;
        const darkPercent = alphaPercent(data.darkOnly[role]);
        // A role the dark theme already points at a ramp step (the overlay edge)
        // keeps that: the light value on `:root` would otherwise win there too.
        if (darkPercent !== null) dark[role] = mix(50, darkPercent);
        else if (data.darkOnly[role] !== undefined) dark[role] = data.darkOnly[role];
    }
    if (!setIn('light', '--shadow-color')) light['--shadow-color'] = triplet(ramp[900]);
    if (!setIn('dark', '--shadow-color')) dark['--shadow-color'] = '0 0 0';
    return { light, dark };
}

/* ---------- contrast ---------- */

/**
 * What the page computes once the generated file is imported after the theme
 * files. The file is last in the cascade and `:root` has the specificity of
 * `.dark`, so its declarations win in both modes.
 */
/** The library's dark map before the app's tokens, built once. */
const DARK_BASE = { ...data.light, ...data.darkOnly };

function themeMaps(tokens, darkTokens = {}) {
    return {
        light: { ...data.light, ...tokens },
        // The generated dark rule comes after the generated `:root` rule.
        dark: { ...DARK_BASE, ...tokens, ...darkTokens },
    };
}

function checkPairs(tokens, darkTokens = {}, extraPairs = [], { gradients = true } = {}) {
    const maps = themeMaps(tokens, darkTokens);
    // The maps do not change during the check and many pairs share a token,
    // so each token is resolved once per mode. Same answers, a fraction of the work.
    const memo = (fn) => {
        const seen = { light: new Map(), dark: new Map() };
        return (mode, token) => {
            const cache = seen[mode];
            if (!cache.has(token)) cache.set(token, fn(maps[mode], token));
            return cache.get(token);
        };
    };
    const colorIn = memo(resolveTokenColor);
    const paintIn = memo(resolveTokenPaint);
    const brightness = { light: backdropBrightness(maps.light), dark: backdropBrightness(maps.dark) };
    const warnings = [];
    let checked = 0;
    for (const mode of ['light', 'dark']) {
        for (const pair of [...data.pairs, ...extraPairs]) {
            // `only`: a pair about one mode (the dark field is a translucent step; light's is opaque).
            if (pair.only && pair.only !== mode) continue;
            // The control veils are settled last (settleControlGradients), so a
            // choice made before then must not be steered by them.
            if (!gradients && pair.gradient) continue;
            const behind = pair.behind ? (typeof pair.behind === 'string' ? pair.behind : pair.behind[mode]) : null;
            let bg = colorIn(mode, pair.bg);
            if (behind) {
                // A material: its fill (an alpha paint) laid over what is behind it.
                const paint = paintIn(mode, pair.bg);
                const flat = colorIn(mode, behind);
                // A material's filter dims what is behind it (D137); other `behind` pairs are not filtered.
                const backdrop = flat && pair.material ? dimBackdrop(flat, brightness[mode]) : flat;
                bg = paint && backdrop ? backdrop : null;
                // `layers`: the same paint stacked, each laid over the last (nested translucent cards).
                for (let layer = 0; layer < (pair.layers ?? 1) && bg; layer += 1) bg = compositeOver(paint, bg);
            }
            let fg = colorIn(mode, pair.fg);
            if (behind && pair.fgPaint) {
                // `fgPaint`: the foreground is a fill too (a pressed field against the resting one), laid over the same backdrop.
                const fgPaint = paintIn(mode, pair.fg);
                let under = colorIn(mode, behind);
                for (let layer = 0; layer < (pair.layers ?? 1) && under && fgPaint; layer += 1) under = compositeOver(fgPaint, under);
                fg = fgPaint ? under : null;
            }
            if (!bg || !fg) continue; // an alpha tint: not one flat colour
            checked += 1;
            const exact = contrastExact(bg, fg);
            if (exact >= pair.min) continue;
            // A pair with a second foreground passes when either one does.
            const other = pair.orFg ? colorIn(mode, pair.orFg) : null;
            if (other && contrastExact(bg, other) >= pair.min) continue;
            const ratio = failingRatioLabel(exact, pair.min);
            warnings.push({
                type: 'contrast',
                pair: pair.name,
                mode,
                ratio,
                required: pair.min,
                foreground: { token: pair.fg, value: fg },
                background: { token: pair.bg, value: bg },
                message: `${mode} · ${pair.name}: ${fg} on ${bg} is ${ratio}:1, needs ${pair.min}:1 (${pair.fg} on ${pair.bg}${behind ? ` over ${behind}` : ''})`,
            });
        }
    }
    return { warnings, checked };
}

/* ---------- "on" colours ---------- */

const ON_ROLES = {
    brand: {
        role: '--color-on-brand',
        fills: ['--color-action-primary', '--color-action-primary-hover', '--color-action-primary-active'],
    },
    accent: {
        role: '--color-on-accent',
        fills: ['--color-accent', '--color-accent-hover', '--color-accent-active'],
    },
};

/**
 * The label for a solid fill: white or the ramp's dark end, whichever reaches
 * 4.5:1 on the fill, its hover and its active step. The library's own choice
 * for the role and mode is tried first (white, except the accent in dark); if neither passes, the better one is kept and
 * the pair check reports it.
 */
function chooseOn(name, mode, tokens, darkTokens = {}) {
    const { role, fills } = ON_ROLES[name];
    const knob = mode === 'dark' ? `--zabi-on-${name}-dark` : `--zabi-on-${name}`;
    const darkEnd = `var(--zabi-${name}-950)`;
    // The candidates and the rule for choosing among them are lib/pin-maths.js,
    // which brandContrast (color.js) runs too.
    const value = pickLabel(labelCandidates(name, mode, darkEnd), (candidate) => {
        const map = themeMaps({ ...tokens, [knob]: candidate }, darkTokens)[mode];
        const label = resolveTokenColor(map, role);
        return fills.map((fill) => {
            const colour = resolveTokenColor(map, fill);
            return label && colour ? contrastExact(label, colour) : 0;
        });
    });
    return [knob, value];
}

/* ---------- dark primary ---------- */

/**
 * What `darkPrimary: 'mirror'` writes under the dark selectors: the 8.1 dark
 * fills, which are the mirrored semantic steps (pale in dark), the danger
 * aliases with the label they had, and the lighten-heavy control veil made for
 * a pale fill. The label knob is chosen by chooseOn like any other.
 */
const MIRRORED_DARK = {
    '--color-action-primary': 'var(--color-brand-600)',
    '--color-action-primary-hover': 'var(--color-brand-700)',
    '--color-action-primary-active': 'var(--color-brand-800)',
    '--color-action-danger': 'var(--color-error-600)',
    '--color-action-danger-hover': 'var(--color-error-700)',
    '--color-action-danger-active': 'var(--color-error-800)',
    '--color-action-danger-text': 'var(--color-error-50)',
    '--gradient-control-top-strength': '22%',
    '--gradient-control-bottom-strength': '6%',
};

function readDarkPrimary(value) {
    if (value === undefined || value === null) return 'brand';
    if (value !== 'brand' && value !== 'mirror') {
        throw new TypeError(
            `${TOOL}: darkPrimary must be "brand" or "mirror" (got ${typeof value === 'string' ? `"${value}"` : JSON.stringify(value)})`,
        );
    }
    return value;
}

/* ---------- pinning ---------- */

/**
 * The roles a pinned colour can take over. `fill` always follows, since that
 * is what pinning means. Each of `follow` is the brand colour by design in
 * the library (the focus ring is the primary fill; a link is the brand as
 * text), so it follows too, but only if every guarded pair still passes with
 * it; otherwise it stays on the ramp, which was built to pass.
 *
 * What stays on the ramp whatever happens: the tints (`-subtle`, `-border`),
 * because a tint is a lightness, not the brand colour, and the ramp steps
 * themselves (`--color-brand-*`).
 */
const PIN_ROLES = {
    brand: {
        fill: (c, [hover, pressed, deeper]) => ({
            '--color-action-primary': c,
            '--color-action-primary-hover': hover,
            '--color-action-primary-active': pressed,
            '--color-primary': c,
            '--color-primary-weak': hover,
            '--color-primary-medium': pressed,
            '--color-primary-strong': deeper,
        }),
        follow: {
            'focus ring': (c, [hover, pressed, deeper]) => ({
                '--color-focus': c,
                '--color-focus-weak': hover,
                '--color-focus-medium': pressed,
                '--color-focus-strong': deeper,
            }),
            link: (c, [hover]) => ({ '--color-link': c, '--color-link-hover': hover }),
        },
        // A fill has to be seen against what it sits on (WCAG 1.4.11). On the
        // ramp, step 600 always is; an arbitrary colour may not be.
        pairs: [
            { name: 'pinned primary fill against the page', bg: '--color-surface-base', fg: '--color-action-primary', min: 3 },
            { name: 'pinned primary fill against a card', bg: '--color-surface-raised', fg: '--color-action-primary', min: 3 },
        ],
    },
    accent: {
        fill: (c, [hover, pressed]) => ({
            '--color-accent': c,
            '--color-accent-hover': hover,
            '--color-accent-active': pressed,
        }),
        follow: {
            'accent text': (c) => ({ '--color-accent-text': c }),
        },
        pairs: [
            { name: 'pinned accent fill against the page', bg: '--color-surface-base', fg: '--color-accent', min: 3 },
            { name: 'pinned accent fill against a card', bg: '--color-surface-raised', fg: '--color-accent', min: 3 },
        ],
    },
};

const PIN_DARK_POLICIES = ['auto', 'force', 'ramp', 'fill'];

/**
 * Which of the two colours `pin` asks for, and what dark does with them:
 * `auto` (the default) takes the colour when no guarded pair fails because of
 * it, `force` takes it whatever fails, `ramp` never takes it, `fill` takes only
 * the fill and its two states, when the fill reaches 3:1 on the page and a card. `brand` can also
 * be "nearest-aa": the colour pinned is accessibleBrand's nearest passing fill.
 */
function readPin(pin) {
    if (pin === undefined || pin === null || pin === false) return { brand: false, accent: false, dark: 'auto' };
    if (pin === true) return { brand: true, accent: false, dark: 'auto' };
    if (typeof pin !== 'object' || Array.isArray(pin)) {
        throw new TypeError(`${TOOL}: pin must be true, false or { brand, accent } (got ${JSON.stringify(pin)})`);
    }
    for (const key of Object.keys(pin)) {
        if (key !== 'brand' && key !== 'accent' && key !== 'dark') {
            throw new TypeError(`${TOOL}: pin has no "${key}"; it takes brand, accent and dark`);
        }
    }
    const dark = pin.dark ?? 'auto';
    if (!PIN_DARK_POLICIES.includes(dark)) {
        throw new TypeError(
            `${TOOL}: pin.dark must be "auto", "force", "ramp" or "fill" (got ${typeof dark === 'string' ? `"${dark}"` : JSON.stringify(dark)})`,
        );
    }
    // A string is the new policy word, so a misspelt one says so. Anything
    // else that is not true stays "not pinned", as before "nearest-aa".
    if (typeof pin.brand === 'string' && pin.brand !== 'nearest-aa') {
        throw new TypeError(`${TOOL}: pin.brand must be true, false or "nearest-aa" (got "${pin.brand}")`);
    }
    return { brand: pin.brand === 'nearest-aa' ? 'nearest-aa' : pin.brand === true, accent: pin.accent === true, dark };
}

const failing = (warnings, mode) => new Set(warnings.filter((w) => w.mode === mode).map((w) => w.pair));

/**
 * Pins one colour. Returns the role overrides for `:root` and for the dark
 * rule, the "on" knobs, and what was decided.
 *
 * Light: the fill is the colour, always. If that fails a pair, the pair is
 * reported; the colour is not moved.
 *
 * Dark: the same hex is usually wrong there. A deep blue that carries white
 * text on a white page is about 2:1 against a dark page, where a fill needs
 * 3:1, and no label makes that a button. So dark takes the colour only when nothing guarded fails with it,
 * and otherwise keeps what it has without `pin`: the mirrored ramp step.
 * `darkPolicy` changes that: 'force' takes the colour in dark all the same, and
 * lists what fails with it in `report.dark.failed` (the pairs are warnings too);
 * 'ramp' never takes it; 'fill' takes only the fill roles (the action fill and
 * its two states, exactly light's values) when the fill reaches 3:1 on the page
 * and a card in dark, checks nothing else, and keeps the ramp otherwise. The roles that follow the fill keep their rule in
 * every policy: only where light followed, and only if no worse than the fill.
 */
function pinColour(name, colour, tokens, earlierDark, userOverrides, extraPairs, skip, darkPrimary = 'brand', darkPolicy = 'auto') {
    const roles = PIN_ROLES[name];
    const keep = (group) => Object.fromEntries(Object.entries(group).filter(([role]) => !skip.has(role)));
    // What dark has for a role without the pin: what the file already says for
    // dark (the mirrored fills under darkPrimary: 'mirror'), then the library.
    const libraryDark = (role) => earlierDark[role] ?? data.darkOnly[role] ?? data.light[role];
    // The brand's dark fill is the light recipe (the same steps, darker states)
    // unless it is mirrored; the accent's dark fill is still the pale step.
    const recipe = (mode) => shadeRecipe(name, mode, darkPrimary);
    const light = {};
    const dark = {};
    const knobs = {};
    const report = { hex: colour.hex, light: { followed: [], onRamp: [] }, dark: { pinned: false, followed: [], onRamp: [] } };

    // What the page has when a set of roles is tried, with the label chosen for it.
    const attempt = (mode, lightRoles, darkRoles) => {
        const root = { ...tokens, ...knobs, ...lightRoles, ...userOverrides };
        const darkRule = { ...earlierDark, ...darkRoles };
        const [knob, value] = chooseOn(name, mode, root, darkRule);
        const result = checkPairs({ ...root, [knob]: value }, darkRule, extraPairs, { gradients: false });
        return { knob, value, failures: failing(result.warnings, mode) };
    };
    const noWorse = (after, before) => [...after].every((pair) => before.has(pair));

    /**
     * The fill with its states, in the direction that fails least. The states
     * decide which label can be used: darker states under a dark label lose
     * contrast with every step, so an amber that needs a dark label gets
     * lighter states, as its mirrored ramp step has in dark.
     */
    const bestFill = (mode, tryWith) => {
        let best = null;
        for (const direction of SHADE_DIRECTIONS[recipe(mode)]) {
            const states = shades(colour, recipe(mode), direction);
            if (!states) continue;
            const result = tryWith(keep(roles.fill(colour.hex, states)));
            if (!best || result.failures.size < best.result.failures.size) best = { direction, states, result };
        }
        return best;
    };

    // Every role written on `:root` reaches dark as well, so dark restates it;
    // until dark is decided below, with the library's own dark value.
    const restatedFor = (lightRoles) =>
        Object.fromEntries(Object.keys(lightRoles).map((role) => [role, dark[role] ?? libraryDark(role)]));
    const restated = () => restatedFor(light);

    // Light.
    const lightFill = bestFill('light', (group) => attempt('light', group, restatedFor(group)));
    Object.assign(light, keep(roles.fill(colour.hex, lightFill.states)));
    report.light.states = lightFill.direction;
    let current = attempt('light', light, restated());
    for (const [label, build] of Object.entries(roles.follow)) {
        const group = keep(build(colour.hex, lightFill.states));
        const next = attempt('light', { ...light, ...group }, restated());
        if (noWorse(next.failures, current.failures)) {
            Object.assign(light, group);
            current = next;
            report.light.followed.push(label);
        } else {
            report.light.onRamp.push(label);
        }
    }
    knobs[current.knob] = current.value;

    // Dark.
    const unpinned = attempt('dark', light, restated());
    if (darkPolicy === 'fill') {
        // Only the fill roles, with light's own values and nothing else moved.
        const fillRoles = Object.keys(roles.fill(colour.hex, [colour.hex, colour.hex, colour.hex])).filter((role) => role.startsWith(name === 'brand' ? '--color-action-primary' : '--color-accent') && role in light);
        const darkFill = Object.fromEntries(fillRoles.map((role) => [role, light[role]]));
        const root = { ...tokens, ...knobs, ...light, ...userOverrides };
        const darkRule = { ...earlierDark, ...restated(), ...darkFill };
        const surfaces = themeMaps(root, darkRule).dark;
        const failed = roles.pairs
            .filter(({ bg, fg, min }) => {
                const back = resolveTokenColor(surfaces, bg);
                const front = resolveTokenColor(surfaces, fg);
                return back && front && contrastExact(front, back) < min;
            })
            .map(({ name: pair }) => pair);
        report.dark.policy = 'fill';
        if (failed.length === 0) {
            Object.assign(dark, darkFill);
            report.dark.pinned = true;
            report.dark.states = report.light.states;
            report.dark.onRamp.push(...Object.keys(roles.follow));
            // The light label first, then the other one: the first that reaches 4.5:1 on the three fills.
            const { role, fills } = ON_ROLES[name];
            const knob = `--zabi-on-${name}-dark`;
            const lightValue = knobs[`--zabi-on-${name}`];
            const candidates = [lightValue, labelCandidates(name, 'light', `var(--zabi-${name}-950)`).find((c) => c !== lightValue)].filter((c) => c !== undefined);
            const value = pickLabel(candidates, (candidate) => {
                const map = themeMaps({ ...root, [knob]: candidate }, darkRule).dark;
                const label = resolveTokenColor(map, role);
                return fills.map((fill) => {
                    const colour = resolveTokenColor(map, fill);
                    return label && colour ? contrastExact(label, colour) : 0;
                });
            });
            knobs[knob] = value;
            return { light, dark: { ...restated(), ...dark }, knobs, report };
        }
        report.dark.failed = failed;
        report.dark.onRamp.push(...Object.keys(roles.follow));
        knobs[unpinned.knob] = unpinned.value;
        return { light, dark: { ...restated(), ...dark }, knobs, report };
    }
    const darkBest = bestFill('dark', (group) => attempt('dark', light, { ...restated(), ...group }));
    const darkFill = keep(roles.fill(colour.hex, darkBest.states));
    let darkCurrent = darkBest.result;
    if (darkPolicy !== 'ramp' && (darkPolicy === 'force' || noWorse(darkCurrent.failures, unpinned.failures))) {
        Object.assign(dark, darkFill);
        report.dark.pinned = true;
        report.dark.states = darkBest.direction;
        for (const [label, build] of Object.entries(roles.follow)) {
            const group = keep(build(colour.hex, darkBest.states));
            const next = attempt('dark', light, { ...restated(), ...dark, ...group });
            // Only where light followed too: a role that is the brand colour in
            // one mode and a ramp step in the other would be two brands.
            if (report.light.followed.includes(label) && noWorse(next.failures, darkCurrent.failures)) {
                Object.assign(dark, group);
                darkCurrent = next;
                report.dark.followed.push(label);
            } else {
                report.dark.onRamp.push(label);
            }
        }
        if (darkPolicy === 'force') {
            const failed = [...darkCurrent.failures].filter((pair) => !unpinned.failures.has(pair));
            report.dark.policy = 'force';
            if (failed.length) report.dark.failed = failed;
        }
    } else {
        darkCurrent = unpinned;
        report.dark.onRamp.push(...Object.keys(roles.follow));
        if (darkPolicy === 'ramp') report.dark.policy = 'ramp';
        else report.dark.failed = [...darkBest.result.failures].filter((pair) => !unpinned.failures.has(pair));
    }
    knobs[darkCurrent.knob] = darkCurrent.value;

    return { light, dark: { ...restated(), ...dark }, knobs, report };
}

/* ---------- links that follow the primary ---------- */

/** What the app's overrides say a role is in `mode`, or undefined. */
const overrideIn = (modes, mode, role) => modes[mode][role] ?? modes.both[role];

/**
 * Sets roles for one mode, answering a light value with the library's own
 * dark one so that dark does not move (as overrideMaps does for `light`).
 */
function setRoles(tokens, darkTokens, mode, roles) {
    if (mode === 'light') {
        const dark = { ...darkTokens };
        for (const role of Object.keys(roles)) if (!(role in dark)) dark[role] = data.darkOnly[role] ?? data.light[role];
        return { tokens: { ...tokens, ...roles }, darkTokens: dark };
    }
    return { tokens, darkTokens: { ...darkTokens, ...roles } };
}

/** The pairs failing in `mode` with these tokens. */
const failingIn = (tokens, darkTokens, mode) => failing(checkPairs(tokens, darkTokens).warnings, mode);

/**
 * `--color-link` follows an overridden primary, as a pinned colour's link
 * does (PIN_ROLES): the library's link is the brand's step 700 because step
 * 600, its primary, does not hold 4.5:1 as text on tints. An app that sets
 * its own primary (a deeper step, say) otherwise has links beside buttons in
 * a different blue. In each mode where the app sets `--color-action-primary`
 * and not `--color-link`, link is that primary and, if the app set a primary
 * hover too, link-hover is that (otherwise the ramp's link-hover stays: the
 * library's hover is a step the app's primary does not use), but only if no
 * guarded pair fails that did not fail before; otherwise the ramp's link
 * stays in that mode.
 * An explicit `--color-link` always wins.
 */
function followPrimaryWithLink(tokens, darkTokens, modes) {
    for (const mode of ['light', 'dark']) {
        const primary = overrideIn(modes, mode, '--color-action-primary');
        if (primary === undefined || overrideIn(modes, mode, '--color-link') !== undefined) continue;
        const hover = overrideIn(modes, mode, '--color-action-primary-hover');
        const before = failingIn(tokens, darkTokens, mode);
        for (const roles of [
            ...(hover === undefined ? [] : [{ '--color-link': primary, '--color-link-hover': hover }]),
            { '--color-link': primary },
        ]) {
            const next = setRoles(tokens, darkTokens, mode, roles);
            const after = failingIn(next.tokens, next.darkTokens, mode);
            if ([...after].every((pair) => before.has(pair))) {
                ({ tokens, darkTokens } = next);
                break;
            }
        }
    }
    return { tokens, darkTokens };
}

/**
 * The edge of the Progress track (`--color-progress-track-border`) is the field
 * edge by default, because the default track is the field fill and does not
 * reach 3:1 against the page or a card (WCAG 1.4.11). An app that overrides
 * the track so that it does reach 3:1 against both, in a mode, does not need
 * an edge there: it is written as `transparent` for that mode, as the link
 * follows an overridden primary. An edge the app sets itself, in either
 * mode or both, is its decision, and is never moved (a `transparent` of its
 * own draws no warning: a pair with no flat colour is skipped).
 */
const PROGRESS_TRACK = '--color-progress-track';
const PROGRESS_TRACK_EDGE = '--color-progress-track-border';
const MIN_TRACK_AGAINST_SURFACE = 3;

function settleProgressTrackEdge(tokens, darkTokens, modes) {
    for (const mode of ['light', 'dark']) {
        if (overrideIn(modes, mode, PROGRESS_TRACK) === undefined) continue;
        if (overrideIn(modes, mode, PROGRESS_TRACK_EDGE) !== undefined) continue;
        const maps = themeMaps(tokens, darkTokens)[mode];
        const track = resolveTokenColor(maps, PROGRESS_TRACK);
        if (!track) continue; // an alpha tint: not one flat colour
        const surfaces = ['--color-surface-base', '--color-surface-raised'].map((role) => resolveTokenColor(maps, role));
        if (surfaces.some((surface) => !surface || contrastExact(track, surface) < MIN_TRACK_AGAINST_SURFACE)) continue;
        ({ tokens, darkTokens } = setRoles(tokens, darkTokens, mode, { [PROGRESS_TRACK_EDGE]: 'transparent' }));
    }
    return { tokens, darkTokens };
}

/* ---------- control gradients ---------- */

/** The strongest veil tried: the library's own cap. */
const MAX_VEIL = 14;

/**
 * The veil of a solid control is a light stop on top and a dark one at the
 * bottom, over the control's own fill. The library's light default darkens
 * only (top 0, bottom 14%): a darker fill can only help a light label. An app
 * whose fill takes a DARK label (a light accent, an amber) loses contrast to
 * that darkening, so for each veil and each mode: if every pair passes, nothing
 * is written; if not, the veil is flipped to lighten-only (the top at the
 * largest whole percent up to 14 that passes, the bottom 0), or the other way
 * if the label is the light one; if neither direction passes, both are 0%,
 * which is no veil. A strength the app set itself is never moved: the pair
 * check reports it. Primary and danger share one veil, so they flip together.
 */
function settleControlGradients(tokens, darkTokens, modes) {
    const veils = new Map();
    for (const control of data.controlGradients) {
        const key = control.strengths.join('|');
        if (!veils.has(key)) veils.set(key, { strengths: control.strengths, controls: [] });
        veils.get(key).controls.push(control);
    }
    for (const mode of ['light', 'dark']) {
        for (const { strengths, controls } of veils.values()) {
            if (strengths.some((role) => overrideIn(modes, mode, role) !== undefined)) continue;
            const failed = (t, d) =>
                [...failingIn(t, d, mode)].filter((pair) => controls.some((control) => pair.startsWith(`${control.name} gradient `)));
            if (failed(tokens, darkTokens).length === 0) continue;
            const [top, bottom] = strengths;
            const maps = themeMaps(tokens, darkTokens)[mode];
            const labelIsDark = controls.some((control) => {
                const label = resolveTokenColor(maps, control.on);
                const fill = resolveTokenColor(maps, control.fills[0][1]);
                return label && fill && luminance(label) < luminance(fill);
            });
            const directions = labelIsDark ? ['lighten', 'darken'] : ['darken', 'lighten'];
            let chosen = { [top]: '0%', [bottom]: '0%' };
            search: for (const direction of directions) {
                for (let percent = MAX_VEIL; percent >= 1; percent -= 1) {
                    const roles = direction === 'lighten' ? { [top]: `${percent}%`, [bottom]: '0%' } : { [top]: '0%', [bottom]: `${percent}%` };
                    const next = setRoles(tokens, darkTokens, mode, roles);
                    if (failed(next.tokens, next.darkTokens).length === 0) {
                        chosen = roles;
                        break search;
                    }
                }
            }
            ({ tokens, darkTokens } = setRoles(tokens, darkTokens, mode, chosen));
        }
    }
    return { tokens, darkTokens };
}

/* ---------- output ---------- */

function rampTokens(name, ramp, steps) {
    return Object.fromEntries(steps.map((step) => [`--zabi-${name}-${step}`, ramp[step]]));
}

function render({ inputs, closest, tokens, darkTokens, pinned, neutralChroma, darkPrimary, contrastWarnings, checked, skippedCheck, givenRamp }) {
    const describeInput = (name) =>
        inputs[name]
            ? `${inputs[name]}  closest step ${closest[name].step} (${closest[name].hex}, ` +
              `${closest[name].exact ? 'exact' : `ΔE ${closest[name].deltaE.toFixed(1)}`})`
            : name === 'accent'
              ? 'not set (library default: citron)'
              : 'not set (library default)';
    const header = [
        '/*',
        ` * Generated by ${TOOL} (zabi-components/create-theme). Do not edit; run it again.`,
        ' *',
        ` *   brand    ${describeInput('brand')}`,
        ` *   accent   ${describeInput('accent')}`,
        ` *   neutral  ${describeInput('neutral')}`,
        ...(givenRamp ? [' *   brand ramp: the one you gave, used as it is (not built from the colour).'] : []),
        ...(darkPrimary === 'mirror'
            ? [
                  ' *   dark primary: mirror. The primary and danger fills use the mirrored (pale) steps in',
                  ' *   dark, as in 8.1, with the label and control veil chosen for them.',
              ]
            : []),
        ...(neutralChroma === undefined
            ? []
            : [
                  ` *   neutral chroma ${neutralChroma} (peak, OKLCH). The ink roles (secondary button,`,
                  ' *   hover and pressed tints, overlay edge, shadow colour) follow the neutral ramp.',
              ]),
        ' *',
        ...(pinned ? pinnedNotes(pinned) : [
        ' * The ramps sit on the library\'s lightness curve, so step 600 means the same',
        ' * lightness as in every built-in ramp. Your colour supplies hue and chroma and',
        ' * is not pinned to a step: the exact hex may not appear below.',
        ]),
        ' *',
        ' * Import after zabi-components/theme-only and zabi-components/theme-dark-only.',
        ' * One file covers light and dark.',
        ' *',
        skippedCheck
            ? ' * Contrast: the full role-pair check was skipped (check: false). Run it where it can take the time.'
            : contrastWarnings.length === 0
            ? ` * Contrast: all ${checked} role pairs pass WCAG AA in light and dark.`
            : ` * Contrast: ${contrastWarnings.length} of ${checked} role pairs are below WCAG AA:`,
        ...contrastWarnings.map((w) => ` *   ${w.message}`),
        ' */',
    ];
    const body = Object.entries(tokens).map(([name, value]) => `  ${name}: ${value};`);
    const root = `${header.join('\n')}\n:root {\n${body.join('\n')}\n}\n`;
    if (!pinned && Object.keys(darkTokens).length === 0) return root;
    // A role on `:root` is one value in light and in dark, so dark says its own,
    // under each selector the dark theme is published under.
    const dark = Object.entries(darkTokens).map(([name, value]) => `${name}: ${value};`);
    const { always, auto, media } = data.darkSelectors;
    return (
        root +
        `\n${always} {\n${dark.map((line) => `  ${line}`).join('\n')}\n}\n` +
        `\n@media ${media} {\n  ${auto} {\n${dark.map((line) => `    ${line}`).join('\n')}\n  }\n}\n`
    );
}

function pinnedNotes(pinned) {
    const lines = [
        ' * The ramps sit on the library\'s lightness curve, so step 600 means the same',
        ' * lightness as in every built-in ramp, and tints, borders and every role not',
        ' * named here keep their place on it.',
    ];
    for (const [name, report] of Object.entries(pinned)) {
        const what = name === 'brand' ? 'the primary action' : 'the solid accent fill';
        const list = (items) => items.join(', ');
        lines.push(' *');
        lines.push(` * PINNED ${name} ${report.hex}: in light, ${what} is exactly this colour. Hover and`);
        lines.push(` * pressed are the same hue and chroma, ${report.light.states} by the distance the curve puts`);
        lines.push(' * between steps 600, 700 and 800.');
        if (report.adjusted) lines.push(` *   adjusted from ${report.requested}: the nearest fill of the same hue that passes (pin.brand "nearest-aa").`);
        else if (report.requested) lines.push(` *   ${report.requested} was not moved (pin.brand "nearest-aa").`);
        if (report.light.followed.length) lines.push(` *   light, also this colour: ${list(report.light.followed)}`);
        if (report.light.onRamp.length) {
            lines.push(` *   light, left on the ramp because the colour fails a guarded pair there: ${list(report.light.onRamp)}`);
        }
        if (report.dark.pinned) {
            lines.push(
                report.dark.policy === 'fill'
                    ? ` *   dark: only the fill and its two states, the same as light (pin dark: "fill"); hover and pressed go ${report.dark.states}`
                    : report.dark.policy === 'force'
                    ? ` *   dark: the same colour, forced (pin dark: "force"); hover and pressed go ${report.dark.states}`
                    : ` *   dark: the same colour, since no guarded pair fails because of it; hover and pressed go ${report.dark.states}`,
            );
            if (report.dark.policy === 'force' && report.dark.failed) {
                lines.push(' *   dark, these fail with it and are reported below:');
                for (const pair of report.dark.failed) lines.push(` *     - ${pair}`);
            }
            if (report.dark.followed.length) lines.push(` *   dark, also this colour: ${list(report.dark.followed)}`);
            if (report.dark.onRamp.length) lines.push(` *   dark, left on the ramp: ${list(report.dark.onRamp)}`);
        } else if (report.dark.policy === 'ramp') {
            lines.push(' *   dark: NOT pinned (pin dark: "ramp"). Dark keeps the ramp step it has without pin.');
        } else if (report.dark.policy === 'fill') {
            lines.push(' *   dark: NOT pinned (pin dark: "fill"). The fill is under 3:1 on the page or a card there,');
            lines.push(' *   so dark keeps the ramp step it has without pin. These would fail:');
            for (const pair of report.dark.failed) lines.push(` *     - ${pair}`);
        } else {
            lines.push(' *   dark: NOT pinned. The colour fails there, so dark keeps the ramp step it has');
            lines.push(' *   without pin. With the colour, these would fail:');
            for (const pair of report.dark.failed) lines.push(` *     - ${pair}`);
            lines.push(' *   To force a dark value all the same, write the role in your own dark rule after this file.');
        }
    }
    return lines;
}

/**
 * A stored brand ramp: every step 50 … 950 as a hex colour, returned as
 * lowercase `#rrggbb`. A missing step or an unknown key is an error.
 */
function readBrandRamp(ramp) {
    if (ramp === null || typeof ramp !== 'object' || Array.isArray(ramp)) {
        throw new TypeError(`${TOOL}: brandRamp must be an object of steps (50 … 950) to hex colours`);
    }
    for (const key of Object.keys(ramp)) {
        if (!RAMP_STEPS.includes(Number(key))) throw new TypeError(`${TOOL}: brandRamp has no step "${key}"; it takes ${RAMP_STEPS.join(', ')}`);
    }
    const out = {};
    for (const step of RAMP_STEPS) {
        if (ramp[step] === undefined || ramp[step] === null) {
            throw new TypeError(`${TOOL}: brandRamp needs every step from 50 to 950; step ${step} is missing`);
        }
        out[step] = parseHex(ramp[step], `brandRamp[${step}]`);
    }
    return out;
}

/**
 * `brandRamp` is used as given for `--zabi-brand-*`; `brand` is then optional
 * and, left out, is the ramp's step 600 (what `pin` pins and what `closest`
 * measures). Label choice, pinning and the pair check all run against the ramp.
 *
 * `check: false` skips only the final check of every guarded pair (about a
 * fifth of a plain brand's time; memoising saves the rest). The checks the generator needs to decide something,
 * the label colours, the pin and the control veils, still run, so a pinned or
 * overridden theme costs more than a plain one. `warnings` then holds input
 * notes only, and the header says the check was skipped. Everything else is
 * what it is with the check on.
 *
 * @param {{ brand?: string, brandRamp?: Record<number, string>, accent?: string, neutral?: string, neutralChroma?: number, overrides?: Record<string, string> | { light?: Record<string, string>, dark?: Record<string, string>, both?: Record<string, string> } & Record<string, unknown>, pin?: boolean | { brand?: boolean | 'nearest-aa', accent?: boolean, dark?: 'auto' | 'force' | 'ramp' | 'fill' }, darkPrimary?: 'brand' | 'mirror', check?: boolean }} options
 */
export function createTheme(options) {
    if (options === null || typeof options !== 'object') {
        throw new TypeError(`${TOOL}: createTheme needs an options object with at least { brand }`);
    }
    const hasRamp = options.brandRamp !== undefined && options.brandRamp !== null;
    if ((options.brand === undefined || options.brand === null) && !hasRamp) {
        throw new TypeError(`${TOOL}: brand is required, for example { brand: "#0026EA" }`);
    }
    if (options.check !== undefined && typeof options.check !== 'boolean') {
        throw new TypeError(`${TOOL}: check must be true or false (got ${JSON.stringify(options.check)})`);
    }
    const checkPairsAtEnd = options.check !== false;
    const modes = readOverrides(options.overrides ?? {});
    const brandRamp = hasRamp ? readBrandRamp(options.brandRamp) : null;
    const inputs = { brand: options.brand === undefined || options.brand === null ? brandRamp[600] : parseHex(options.brand, 'brand') };
    if (options.accent !== undefined && options.accent !== null) inputs.accent = parseHex(options.accent, 'accent');
    if (options.neutral !== undefined && options.neutral !== null) inputs.neutral = parseHex(options.neutral, 'neutral');

    let neutralChroma;
    if (options.neutralChroma !== undefined && options.neutralChroma !== null) {
        const value = options.neutralChroma;
        if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > MAX_NEUTRAL_CHROMA_OPTION) {
            throw new TypeError(
                `${TOOL}: neutralChroma must be a number from 0 to ${MAX_NEUTRAL_CHROMA_OPTION}, the OKLCH chroma at the neutral ramp's peak (got ${
                    typeof value === 'string' ? `"${value}"` : String(value)
                })`,
            );
        }
        if (!inputs.neutral) throw new TypeError(`${TOOL}: neutralChroma needs a neutral colour, for example { neutral: "#607296", neutralChroma: 0.05 }`);
        neutralChroma = value;
    }

    const darkPrimary = readDarkPrimary(options.darkPrimary);
    const pin = readPin(options.pin);
    if (pin.accent && !inputs.accent) throw new TypeError(`${TOOL}: pin.accent needs an accent colour`);
    const pinning = pin.brand || pin.accent;

    const warnings = [];
    const closest = {};
    const described = {};
    const rampOf = {};
    let tokens = {};
    let darkTokens = {};

    for (const name of ['brand', 'accent']) {
        if (!inputs[name]) continue;
        const colour = describe(inputs[name]);
        described[name] = colour;
        const given = name === 'brand' && brandRamp !== null;
        // A ramp the app gave is not built from the colour, so notes about what
        // the colour would build do not apply.
        if (!given) warnings.push(...inputWarnings(name, colour));
        const ramp = given ? brandRamp : generateBrandRamp(inputs[name]);
        rampOf[name] = ramp;
        closest[name] = closestStep(inputs[name], ramp);
        if (!given && colour.chroma >= MIN_USEFUL_CHROMA && closest[name].deltaE > FAR_FROM_RAMP) {
            // Typically a very bright colour: the curve fixes each step's
            // lightness, and sRGB has no such chroma at that lightness.
            warnings.push({
                type: 'input',
                option: name,
                message:
                    `${name} ${colour.hex} is not in the ramp built from it: the nearest step is ` +
                    `${closest[name].step} (${closest[name].hex}, ΔE ${closest[name].deltaE.toFixed(1)}). ` +
                    'The ramp keeps its hue on the library\'s lightness curve; fills use step 600 in light and in dark (400 in dark with darkPrimary: "mirror").',
            });
        }
        tokens = { ...tokens, ...rampTokens(name, ramp, RAMP_STEPS) };
    }
    if (inputs.neutral) {
        const colour = describe(inputs.neutral);
        if (neutralChroma === undefined && colour.chroma > MAX_NEUTRAL_CHROMA * 2) {
            warnings.push({
                type: 'input',
                option: 'neutral',
                message: `neutral ${colour.hex} is a saturated colour: only its hue is used, at low chroma, so the result is a tinted grey.`,
            });
        }
        const ramp = neutralRamp(colour, neutralChroma);
        closest.neutral = closestStep(inputs.neutral, ramp);
        tokens = { ...tokens, ...rampTokens('base', ramp, BASE_STEPS) };
        if (neutralChroma !== undefined) {
            // Opt-in: without it these roles are the library's grey tints, as before.
            const ink = inkTokens(ramp, modes);
            tokens = { ...tokens, ...ink.light };
            darkTokens = ink.dark;
        }
    }

    // darkPrimary: 'mirror' writes the 8.1 dark fills under the dark selectors,
    // except for a role the app sets itself in dark or in both modes.
    if (darkPrimary === 'mirror') {
        for (const [role, value] of Object.entries(MIRRORED_DARK)) {
            if (role in modes.dark || role in modes.both) continue;
            darkTokens = { ...darkTokens, [role]: value };
        }
    }

    // Overrides take part in choosing the labels, and are written last. Each
    // mode sees its own values.
    for (const name of ['brand', 'accent']) {
        if (!inputs[name] || pin[name]) continue;
        const own = overrideMaps(modes, tokens, darkTokens);
        for (const mode of ['light', 'dark']) {
            const [knob, value] = chooseOn(name, mode, { ...tokens, ...own.root }, { ...darkTokens, ...own.dark });
            tokens[knob] = value;
        }
    }

    // Pinned colours: role overrides for light, their dark counterparts, and
    // the labels chosen with those in place.
    const pinned = {};
    const extraPairs = ['brand', 'accent'].flatMap((name) => (pin[name] ? PIN_ROLES[name].pairs : []));
    for (const name of ['brand', 'accent']) {
        if (!pin[name]) continue;
        const own = overrideMaps(modes, tokens, darkTokens);
        // "nearest-aa": the same hue at the nearest lightness that passes, found
        // by the helper an app calls (color.js), over this theme's own ramp.
        const adjustedTo = pin[name] === 'nearest-aa' ? accessibleBrand(inputs[name], { ramp: rampOf[name], ...(pin.dark === 'fill' ? { dark: 'fill' } : {}) }) : null;
        if (adjustedTo && !adjustedTo.found) {
            warnings.push({
                type: 'input',
                option: name,
                message: `pin.brand "nearest-aa": no fill near ${inputs[name]} passes in both modes; ${adjustedTo.hex} is the nearest to passing and is pinned. The pairs it fails are below.`,
            });
        }
        const result = pinColour(name, adjustedTo ? describe(adjustedTo.hex) : described[name], tokens, { ...darkTokens, ...own.dark }, own.root, extraPairs, own.skip, darkPrimary, pin.dark);
        tokens = { ...tokens, ...result.knobs, ...result.light };
        darkTokens = { ...darkTokens, ...result.dark };
        pinned[name] = adjustedTo ? { ...result.report, requested: inputs[name], adjusted: adjustedTo.changed } : result.report;
    }
    const own = overrideMaps(modes, tokens, darkTokens);
    tokens = { ...tokens, ...own.root };
    darkTokens = { ...darkTokens, ...own.dark };

    // What the generator settles once the app's own values are in place.
    if (!pin.brand) ({ tokens, darkTokens } = followPrimaryWithLink(tokens, darkTokens, modes));
    ({ tokens, darkTokens } = settleProgressTrackEdge(tokens, darkTokens, modes));
    ({ tokens, darkTokens } = settleControlGradients(tokens, darkTokens, modes));

    const { warnings: contrastWarnings, checked } = checkPairsAtEnd ? checkPairs(tokens, darkTokens, extraPairs) : { warnings: [], checked: 0 };
    warnings.push(...contrastWarnings);

    const css = render({
        inputs,
        closest,
        tokens,
        darkTokens,
        pinned: pinning ? pinned : null,
        neutralChroma,
        darkPrimary,
        contrastWarnings,
        checked,
        skippedCheck: !checkPairsAtEnd,
        givenRamp: brandRamp !== null,
    });
    // What the page computes for the labels, with every generated token in place.
    const maps = themeMaps(tokens, darkTokens);
    const labelOf = (mode, role) => resolveTokenColor(maps[mode], role)?.toLowerCase();
    const labels = { light: { brand: labelOf('light', '--color-on-brand') }, dark: { brand: labelOf('dark', '--color-on-brand') } };
    if (inputs.accent) {
        labels.light.accent = labelOf('light', '--color-on-accent');
        labels.dark.accent = labelOf('dark', '--color-on-accent');
    }
    const hasDark = pinning || neutralChroma !== undefined || Object.keys(darkTokens).length > 0;
    return {
        css,
        tokens,
        ...(hasDark ? { darkTokens } : {}),
        ...(pinning ? { pinned } : {}),
        warnings,
        closest,
        labels,
    };
}

export default createTheme;
