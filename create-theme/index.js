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
import { resolveTokenColor } from './lib/resolve.js';

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

function neutralRamp(colour) {
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
    const peakChroma = Math.min(colour.chroma / profile(nearest), MAX_NEUTRAL_CHROMA);
    const out = {};
    for (const d of defaults) out[d.step] = hexAt(d.lightness, peakChroma * profile(d), colour.hue);
    return out;
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
function themeMaps(tokens) {
    return {
        light: { ...data.light, ...tokens },
        dark: { ...data.light, ...data.darkOnly, ...tokens },
    };
}

function checkPairs(tokens) {
    const maps = themeMaps(tokens);
    const warnings = [];
    let checked = 0;
    for (const mode of ['light', 'dark']) {
        for (const pair of data.pairs) {
            const bg = resolveTokenColor(maps[mode], pair.bg);
            const fg = resolveTokenColor(maps[mode], pair.fg);
            if (!bg || !fg) continue; // an alpha tint: not one flat colour
            checked += 1;
            const ratio = contrast(bg, fg);
            if (ratio >= pair.min) continue;
            warnings.push({
                type: 'contrast',
                pair: pair.name,
                mode,
                ratio,
                required: pair.min,
                foreground: { token: pair.fg, value: fg },
                background: { token: pair.bg, value: bg },
                message: `${mode} · ${pair.name}: ${fg} on ${bg} is ${ratio}:1, needs ${pair.min}:1 (${pair.fg} on ${pair.bg})`,
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
function chooseOn(name, mode, tokens) {
    const { role, fills } = ON_ROLES[name];
    const knob = mode === 'dark' ? `--zabi-on-${name}-dark` : `--zabi-on-${name}`;
    const darkEnd = `var(--zabi-${name}-950)`;
    const candidates = mode === 'dark' ? [darkEnd, WHITE] : [WHITE, darkEnd];
    let best = null;
    for (const value of candidates) {
        const map = themeMaps({ ...tokens, [knob]: value })[mode];
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

/* ---------- output ---------- */

function rampTokens(name, ramp, steps) {
    return Object.fromEntries(steps.map((step) => [`--zabi-${name}-${step}`, ramp[step]]));
}

function render({ inputs, closest, tokens, contrastWarnings, checked }) {
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
        ' *',
        ' * The ramps sit on the library\'s lightness curve, so step 600 means the same',
        ' * lightness as in every built-in ramp. Your colour supplies hue and chroma and',
        ' * is not pinned to a step: the exact hex may not appear below.',
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
    return `${header.join('\n')}\n:root {\n${body.join('\n')}\n}\n`;
}

/**
 * @param {{ brand: string, accent?: string, neutral?: string, overrides?: Record<string, string> }} options
 */
export function createTheme(options) {
    if (options === null || typeof options !== 'object') {
        throw new TypeError(`${TOOL}: createTheme needs an options object with at least { brand }`);
    }
    if (options.brand === undefined || options.brand === null) {
        throw new TypeError(`${TOOL}: brand is required, for example { brand: "#0026EA" }`);
    }
    const overrides = options.overrides ?? {};
    if (typeof overrides !== 'object') throw new TypeError(`${TOOL}: overrides must be an object of token names to values`);
    for (const [name, value] of Object.entries(overrides)) {
        if (!name.startsWith('--') || typeof value !== 'string' || !value.trim()) {
            throw new TypeError(`${TOOL}: overrides must map custom property names ("--color-link") to values (got ${name}: ${value})`);
        }
    }

    const inputs = { brand: parseHex(options.brand, 'brand') };
    if (options.accent !== undefined && options.accent !== null) inputs.accent = parseHex(options.accent, 'accent');
    if (options.neutral !== undefined && options.neutral !== null) inputs.neutral = parseHex(options.neutral, 'neutral');

    const warnings = [];
    const closest = {};
    let tokens = {};

    for (const name of ['brand', 'accent']) {
        if (!inputs[name]) continue;
        const colour = describe(inputs[name]);
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
        if (colour.chroma > MAX_NEUTRAL_CHROMA * 2) {
            warnings.push({
                type: 'input',
                option: 'neutral',
                message: `neutral ${colour.hex} is a saturated colour: only its hue is used, at low chroma, so the result is a tinted grey.`,
            });
        }
        const ramp = neutralRamp(colour);
        closest.neutral = closestStep(inputs.neutral, ramp);
        tokens = { ...tokens, ...rampTokens('base', ramp, BASE_STEPS) };
    }

    // Overrides take part in choosing the labels, and are written last.
    for (const name of ['brand', 'accent']) {
        if (!inputs[name]) continue;
        for (const mode of ['light', 'dark']) {
            const [knob, value] = chooseOn(name, mode, { ...tokens, ...overrides });
            tokens[knob] = value;
        }
    }
    tokens = { ...tokens, ...overrides };

    const { warnings: contrastWarnings, checked } = checkPairs(tokens);
    warnings.push(...contrastWarnings);

    const css = render({ inputs, closest, tokens, contrastWarnings, checked });
    return { css, tokens, warnings, closest };
}

export default createTheme;
