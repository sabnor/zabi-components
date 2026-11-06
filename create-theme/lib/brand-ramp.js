/**
 * The chromatic ramp createTheme builds for a colour, and the hex parsing
 * and colour description it starts from. Public as generateBrandRamp
 * (../color.js); createTheme calls the same functions, so a stored ramp and a
 * generated theme cannot differ.
 *
 * Runtime dependency: culori (through ./ramp-math.js).
 */

import { RAMP_STEPS, TARGET_LIGHTNESS, CHROMA_ENVELOPE, generateRampFromSeed, cieL, toOklch } from './ramp-math.js';

const TOOL = 'zabi-theme';

/** Below this OKLCH chroma a colour has no hue worth building a ramp from. */
export const MIN_USEFUL_CHROMA = 0.02;
/** A ramp never asks for more chroma than this; sRGB cannot show it anyway. */
const MAX_PEAK_CHROMA = 0.4;
/** The envelope is not trusted below this when dividing a pale input by it. */
const MIN_ENVELOPE = 0.2;

/** `#rgb` or `#rrggbb`, with or without the `#`, as lowercase `#rrggbb`. `option` names the input in the error. */
export function parseHex(value, option) {
    const shown = typeof value === 'string' ? `"${value}"` : String(value);
    const fail = () =>
        new TypeError(`${TOOL}: ${option} must be a hex colour such as "#0026EA" or "#06e" (got ${shown})`);
    if (typeof value !== 'string') throw fail();
    const text = value.trim().replace(/^#/, '');
    if (!/^(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(text)) throw fail();
    const full = text.length === 3 ? text.split('').map((c) => c + c).join('') : text;
    return `#${full.toLowerCase()}`;
}

export function describe(hex) {
    const { c, h } = toOklch(hex);
    return { hex, lightness: cieL(hex), chroma: c ?? 0, hue: Number.isFinite(h) ? h : 0 };
}

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
export function chromaticRamp(colour) {
    const envelope = Math.max(envelopeAt(colour.lightness), MIN_ENVELOPE);
    const peakChroma = Math.min(colour.chroma / envelope, MAX_PEAK_CHROMA);
    return generateRampFromSeed({ hue: colour.hue, peakChroma, hueShift: 0 });
}
