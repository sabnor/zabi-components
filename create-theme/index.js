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
 * Plain ESM, no build step. Runtime dependency: culori.
 */

import data from './theme-data.js';
import {
    RAMP_STEPS,
    TARGET_LIGHTNESS,
    CHROMA_ENVELOPE,
    generateRampFromSeed,
    hexAt,
    cieL,
    toOklch,
    toLab,
} from './lib/ramp-math.js';
import { resolveTokenColor, resolveTokenPaint, compositeOver } from './lib/resolve.js';

/** The neutral ramp's 21 steps. */
export const BASE_STEPS = [
    50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500,
    550, 600, 650, 700, 750, 800, 850, 900, 925, 950,
];

export { RAMP_STEPS };

const TOOL = 'zabi-theme';
const WHITE = '#ffffff';

/** Below this OKLCH chroma a colour has no hue worth building a ramp from. */
const MIN_USEFUL_CHROMA = 0.02;
/** A ramp never asks for more chroma than this; sRGB cannot show it anyway. */
const MAX_PEAK_CHROMA = 0.4;
/** The envelope is not trusted below this when dividing a pale input by it. */
const MIN_ENVELOPE = 0.2;
/** A neutral stays a neutral: this is the most chroma any of its steps gets. */
const MAX_NEUTRAL_CHROMA = 0.03;
/** `neutralChroma` may lift the cap, but not past this: beyond it the steps stop being neutrals. */
const MAX_NEUTRAL_CHROMA_OPTION = 0.1;
/** The least any neutral step keeps of that, so the lightest steps still tint. */
const MIN_NEUTRAL_PROFILE = 0.25;
/** CIELAB ΔE past which the input is visibly not one of the ramp's steps. */
const FAR_FROM_RAMP = 10;

/* ---------- input ---------- */

function parseHex(value, option) {
    const shown = typeof value === 'string' ? `"${value}"` : String(value);
    const fail = () =>
        new TypeError(`${TOOL}: ${option} must be a hex colour such as "#0026EA" or "#06e" (got ${shown})`);
    if (typeof value !== 'string') throw fail();
    const text = value.trim().replace(/^#/, '');
    if (!/^(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(text)) throw fail();
    const full = text.length === 3 ? text.split('').map((c) => c + c).join('') : text;
    return `#${full.toLowerCase()}`;
}

function describe(hex) {
    const { c, h } = toOklch(hex);
    return { hex, lightness: cieL(hex), chroma: c ?? 0, hue: Number.isFinite(h) ? h : 0 };
}

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

/* ---------- chromatic ramps ---------- */

/** The chroma envelope at any L*, by linear interpolation between the steps. */
function envelopeAt(lightness) {
    const points = RAMP_STEPS.map((step) => [TARGET_LIGHTNESS[step], CHROMA_ENVELOPE[step]]).sort((a, b) => a[0] - b[0]);
    if (lightness <= points[0][0]) return points[0][1];
    if (lightness >= points[points.length - 1][0]) return points[points.length - 1][1];
    for (let i = 0; i < points.length - 1; i += 1) {
        const [l0, e0] = points[i];
        const [l1, e1] = points[i + 1];
        if (lightness >= l0 && lightness <= l1) return e0 + ((lightness - l0) / (l1 - l0)) * (e1 - e0);
    }
    return 1;
}

/**
 * The input's own chroma, read back through the envelope: a colour at the
 * lightness of step 500 is taken to be 92% of the ramp's peak, and so on. That
 * is what lets the step nearest the input come out close to the input.
 */
function chromaticRamp(colour) {
    const envelope = Math.max(envelopeAt(colour.lightness), MIN_ENVELOPE);
    const peakChroma = Math.min(colour.chroma / envelope, MAX_PEAK_CHROMA);
    return generateRampFromSeed({ hue: colour.hue, peakChroma, hueShift: 0 });
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

/* ---------- closest step ---------- */

function deltaE(a, b) {
    const [x, y] = [toLab(a), toLab(b)];
    return Math.hypot(x.l - y.l, x.a - y.a, x.b - y.b);
}

function closestStep(hex, ramp) {
    let best = null;
    for (const [step, value] of Object.entries(ramp)) {
        const distance = deltaE(hex, value);
        if (!best || distance < best.deltaE) best = { step: Number(step), hex: value, deltaE: distance };
    }
    return { ...best, deltaE: Math.round(best.deltaE * 10) / 10, exact: best.hex === hex };
}

/* ---------- contrast ---------- */

function channel(c) {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** WCAG contrast ratio, rounded to two decimals as the library's guard does. */
function contrast(a, b) {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
}

/**
 * What the page computes once the generated file is imported after the theme
 * files. The file is last in the cascade and `:root` has the specificity of
 * `.dark`, so its declarations win in both modes.
 */
function themeMaps(tokens, darkTokens = {}) {
    return {
        light: { ...data.light, ...tokens },
        // The generated dark rule comes after the generated `:root` rule.
        dark: { ...data.light, ...data.darkOnly, ...tokens, ...darkTokens },
    };
}

function checkPairs(tokens, darkTokens = {}, extraPairs = [], { gradients = true } = {}) {
    const maps = themeMaps(tokens, darkTokens);
    const warnings = [];
    let checked = 0;
    for (const mode of ['light', 'dark']) {
        for (const pair of [...data.pairs, ...extraPairs]) {
            // The control veils are settled last (settleControlGradients), so a
            // choice made before then must not be steered by them.
            if (!gradients && pair.gradient) continue;
            const behind = pair.behind ? (typeof pair.behind === 'string' ? pair.behind : pair.behind[mode]) : null;
            let bg = resolveTokenColor(maps[mode], pair.bg);
            if (behind) {
                // A material: its fill (an alpha paint) laid over what is behind it.
                const paint = resolveTokenPaint(maps[mode], pair.bg);
                const backdrop = resolveTokenColor(maps[mode], behind);
                bg = paint && backdrop ? compositeOver(paint, backdrop) : null;
            }
            const fg = resolveTokenColor(maps[mode], pair.fg);
            if (!bg || !fg) continue; // an alpha tint: not one flat colour
            checked += 1;
            const ratio = contrast(bg, fg);
            if (ratio >= pair.min) continue;
            // A pair with a second foreground passes when either one does.
            const other = pair.orFg ? resolveTokenColor(maps[mode], pair.orFg) : null;
            if (other && contrast(bg, other) >= pair.min) continue;
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
 * for the mode is tried first; if neither passes, the better one is kept and
 * the pair check reports it.
 */
function chooseOn(name, mode, tokens, darkTokens = {}) {
    const { role, fills } = ON_ROLES[name];
    const knob = mode === 'dark' ? `--zabi-on-${name}-dark` : `--zabi-on-${name}`;
    const darkEnd = `var(--zabi-${name}-950)`;
    const candidates = mode === 'dark' ? [darkEnd, WHITE] : [WHITE, darkEnd];
    let best = null;
    for (const value of candidates) {
        const map = themeMaps({ ...tokens, [knob]: value }, darkTokens)[mode];
        const label = resolveTokenColor(map, role);
        const ratios = fills.map((fill) => {
            const colour = resolveTokenColor(map, fill);
            return label && colour ? contrast(label, colour) : 0;
        });
        const worst = Math.min(...ratios);
        if (worst >= 4.5) return [knob, value];
        if (!best || worst > best.worst) best = { value, worst };
    }
    return [knob, best.value];
}

/* ---------- pinning ---------- */

/**
 * A pinned colour is the fill; its hover and pressed states and one deeper
 * step are the same hue and chroma moved along L* by the distances the curve
 * puts between steps 600, 700, 800 and 900 in light (darker), and between
 * 400, 300, 200 and 100 in dark (lighter).
 */
const SHADE_STEPS = {
    light: [700, 800, 900].map((step) => TARGET_LIGHTNESS[step] - TARGET_LIGHTNESS[600]),
    dark: [300, 200, 100].map((step) => TARGET_LIGHTNESS[step] - TARGET_LIGHTNESS[400]),
};
/** No shade is asked to go past these: there is nothing darker or lighter to show. */
const MIN_SHADE_L = 4;
const MAX_SHADE_L = 98;

/**
 * [hover, pressed, deeper] for a pinned fill, going `darker` or `lighter`, or
 * null when the pressed step would leave the range: a colour that near black
 * has nothing darker to show.
 */
function shades(colour, mode, direction) {
    const sign = direction === 'darker' ? -1 : 1;
    const steps = SHADE_STEPS[mode].map((step) => sign * Math.abs(step));
    const pressed = colour.lightness + steps[1];
    if (pressed < MIN_SHADE_L || pressed > MAX_SHADE_L) return null;
    return steps.map((step) =>
        hexAt(Math.min(MAX_SHADE_L, Math.max(MIN_SHADE_L, colour.lightness + step)), colour.chroma, colour.hue),
    );
}

/** The library's own direction first: darker in light, lighter in dark. */
const SHADE_DIRECTIONS = { light: ['darker', 'lighter'], dark: ['lighter', 'darker'] };

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

/** Which of the two colours `pin` asks for. */
function readPin(pin) {
    if (pin === undefined || pin === null || pin === false) return { brand: false, accent: false };
    if (pin === true) return { brand: true, accent: false };
    if (typeof pin !== 'object') {
        throw new TypeError(`${TOOL}: pin must be true, false or { brand, accent } (got ${JSON.stringify(pin)})`);
    }
    for (const key of Object.keys(pin)) {
        if (key !== 'brand' && key !== 'accent') throw new TypeError(`${TOOL}: pin has no "${key}"; it takes brand and accent`);
    }
    return { brand: pin.brand === true, accent: pin.accent === true };
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
 */
function pinColour(name, colour, tokens, earlierDark, userOverrides, extraPairs, skip) {
    const roles = PIN_ROLES[name];
    const keep = (group) => Object.fromEntries(Object.entries(group).filter(([role]) => !skip.has(role)));
    const libraryDark = (role) => data.darkOnly[role] ?? data.light[role];
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
        for (const direction of SHADE_DIRECTIONS[mode]) {
            const states = shades(colour, mode, direction);
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
    const darkBest = bestFill('dark', (group) => attempt('dark', light, { ...restated(), ...group }));
    const darkFill = keep(roles.fill(colour.hex, darkBest.states));
    let darkCurrent = darkBest.result;
    if (noWorse(darkCurrent.failures, unpinned.failures)) {
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
    } else {
        darkCurrent = unpinned;
        report.dark.onRamp.push(...Object.keys(roles.follow));
        report.dark.failed = [...darkBest.result.failures].filter((pair) => !unpinned.failures.has(pair));
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

function render({ inputs, closest, tokens, darkTokens, pinned, neutralChroma, contrastWarnings, checked }) {
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
        contrastWarnings.length === 0
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
        if (report.light.followed.length) lines.push(` *   light, also this colour: ${list(report.light.followed)}`);
        if (report.light.onRamp.length) {
            lines.push(` *   light, left on the ramp because the colour fails a guarded pair there: ${list(report.light.onRamp)}`);
        }
        if (report.dark.pinned) {
            lines.push(` *   dark: the same colour, since no guarded pair fails because of it; hover and pressed go ${report.dark.states}`);
            if (report.dark.followed.length) lines.push(` *   dark, also this colour: ${list(report.dark.followed)}`);
            if (report.dark.onRamp.length) lines.push(` *   dark, left on the ramp: ${list(report.dark.onRamp)}`);
        } else {
            lines.push(' *   dark: NOT pinned. The colour fails there, so dark keeps the mirrored ramp step, as it');
            lines.push(' *   does without pin. With the colour, these would fail:');
            for (const pair of report.dark.failed) lines.push(` *     - ${pair}`);
            lines.push(' *   To force a dark value all the same, write the role in your own dark rule after this file.');
        }
    }
    return lines;
}

/**
 * @param {{ brand: string, accent?: string, neutral?: string, neutralChroma?: number, overrides?: Record<string, string> | { light?: Record<string, string>, dark?: Record<string, string>, both?: Record<string, string> } & Record<string, unknown>, pin?: boolean | { brand?: boolean, accent?: boolean } }} options
 */
export function createTheme(options) {
    if (options === null || typeof options !== 'object') {
        throw new TypeError(`${TOOL}: createTheme needs an options object with at least { brand }`);
    }
    if (options.brand === undefined || options.brand === null) {
        throw new TypeError(`${TOOL}: brand is required, for example { brand: "#0026EA" }`);
    }
    const modes = readOverrides(options.overrides ?? {});
    const inputs = { brand: parseHex(options.brand, 'brand') };
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

    const pin = readPin(options.pin);
    if (pin.accent && !inputs.accent) throw new TypeError(`${TOOL}: pin.accent needs an accent colour`);
    const pinning = pin.brand || pin.accent;

    const warnings = [];
    const closest = {};
    const described = {};
    let tokens = {};
    let darkTokens = {};

    for (const name of ['brand', 'accent']) {
        if (!inputs[name]) continue;
        const colour = describe(inputs[name]);
        described[name] = colour;
        warnings.push(...inputWarnings(name, colour));
        const ramp = chromaticRamp(colour);
        closest[name] = closestStep(inputs[name], ramp);
        if (colour.chroma >= MIN_USEFUL_CHROMA && closest[name].deltaE > FAR_FROM_RAMP) {
            // Typically a very bright colour: the curve fixes each step's
            // lightness, and sRGB has no such chroma at that lightness.
            warnings.push({
                type: 'input',
                option: name,
                message:
                    `${name} ${colour.hex} is not in the ramp built from it: the nearest step is ` +
                    `${closest[name].step} (${closest[name].hex}, ΔE ${closest[name].deltaE.toFixed(1)}). ` +
                    'The ramp keeps its hue on the library\'s lightness curve; fills use step 600 in light and 400 in dark.',
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
        const result = pinColour(name, described[name], tokens, { ...darkTokens, ...own.dark }, own.root, extraPairs, own.skip);
        tokens = { ...tokens, ...result.knobs, ...result.light };
        darkTokens = { ...darkTokens, ...result.dark };
        pinned[name] = result.report;
    }
    const own = overrideMaps(modes, tokens, darkTokens);
    tokens = { ...tokens, ...own.root };
    darkTokens = { ...darkTokens, ...own.dark };

    // What the generator settles once the app's own values are in place.
    if (!pin.brand) ({ tokens, darkTokens } = followPrimaryWithLink(tokens, darkTokens, modes));
    ({ tokens, darkTokens } = settleControlGradients(tokens, darkTokens, modes));

    const { warnings: contrastWarnings, checked } = checkPairs(tokens, darkTokens, extraPairs);
    warnings.push(...contrastWarnings);

    const css = render({ inputs, closest, tokens, darkTokens, pinned: pinning ? pinned : null, neutralChroma, contrastWarnings, checked });
    const hasDark = pinning || neutralChroma !== undefined || Object.keys(darkTokens).length > 0;
    return {
        css,
        tokens,
        ...(hasDark ? { darkTokens } : {}),
        ...(pinning ? { pinned } : {}),
        warnings,
        closest,
    };
}

export default createTheme;
