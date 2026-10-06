/**
 * Resolve design tokens the way a browser would, without a browser.
 *
 * Pure functions over a `{ '--token': 'value' }` map: no file access and no
 * dependencies, because the theme generator ships this file to apps
 * (dist/create-theme/lib/) to run its contrast check. The library's own
 * guards reach it through scripts/resolve-tokens.js, which adds the PostCSS
 * reading of stylesheets on top.
 *
 * Supported, because it is all the stylesheet uses for a flat colour:
 *   - `var(--token)` and `var(--token, fallback)`, anywhere in a value
 *   - `color-mix(in srgb, <opaque> p%, <opaque>)` (either or both percentages)
 *   - `color-mix(in srgb, <colour> p%, transparent)` and `rgba()`, as a colour
 *     with an alpha (resolveTokenPaint), for the materials' fills
 * Anything else (`rgba()`, a mix with `transparent`) is returned as written,
 * for the caller to composite over a surface or to skip.
 */

const HEX = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function parseHex(hex) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}

function toHex(channels) {
    return '#' + channels.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('');
}

/** Split on commas that are not inside parentheses. */
function splitTopLevel(text) {
    const parts = [];
    let depth = 0;
    let current = '';
    for (const char of text) {
        if (char === '(') depth += 1;
        if (char === ')') depth -= 1;
        if (char === ',' && depth === 0) {
            parts.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    parts.push(current.trim());
    return parts;
}

/** Index of the parenthesis that closes the one at `open`. */
function closingParen(text, open) {
    let depth = 0;
    for (let i = open; i < text.length; i += 1) {
        if (text[i] === '(') depth += 1;
        if (text[i] === ')') {
            depth -= 1;
            if (depth === 0) return i;
        }
    }
    return -1;
}

/**
 * Replace every `var()` in `value` with what it refers to in `map`.
 * Returns null when a reference has neither a declaration nor a fallback,
 * which is what makes a declaration invalid at computed-value time.
 */
export function substituteVars(map, value, seen = new Set()) {
    let out = value.replace(/\/\*[\s\S]*?\*\//g, '').trim();
    let guard = 0;
    while (out.includes('var(')) {
        guard += 1;
        if (guard > 200) return null;
        const start = out.indexOf('var(');
        const end = closingParen(out, start + 3);
        if (end === -1) return null;
        const [name, ...fallback] = splitTopLevel(out.slice(start + 4, end));
        let replacement;
        if (map[name] !== undefined && !seen.has(name)) {
            replacement = substituteVars(map, map[name], new Set([...seen, name]));
        }
        if (replacement === null || replacement === undefined) {
            replacement = fallback.length
                ? substituteVars(map, fallback.join(', '), seen)
                : null;
        }
        if (replacement === null) return null;
        out = out.slice(0, start) + replacement + out.slice(end + 1);
    }
    return out;
}

/**
 * `color-mix(in srgb, A p%, B q%)` of two opaque colours, as hex.
 * Returns null for anything it cannot reduce to one flat colour.
 */
export function evaluateColorMix(value) {
    const match = /^color-mix\(([\s\S]*)\)$/.exec(value.trim());
    if (!match) return null;
    const [space, first, second] = splitTopLevel(match[1]);
    if (!space || !first || !second || space.replace(/\s+/g, ' ') !== 'in srgb') return null;

    const operand = (text) => {
        const percent = /(-?[\d.]+)%/.exec(text);
        const colourText = text.replace(/-?[\d.]+%/, '').trim();
        const colour = HEX.test(colourText) ? colourText : evaluateColorMix(colourText);
        return colour ? { colour, percent: percent ? Number(percent[1]) : null } : null;
    };
    const a = operand(first);
    const b = operand(second);
    if (!a || !b) return null;

    let pa = a.percent;
    let pb = b.percent;
    if (pa === null && pb === null) { pa = 50; pb = 50; }
    else if (pa === null) pa = 100 - pb;
    else if (pb === null) pb = 100 - pa;
    const total = pa + pb;
    // A sum under 100% leaves the result partly transparent; over-100 is normalised.
    if (total <= 0 || total < 100) return null;
    const wa = pa / total;
    const ca = parseHex(a.colour);
    const cb = parseHex(b.colour);
    return toHex(ca.map((channel, i) => channel * wa + cb[i] * (1 - wa)));
}

/**
 * The literal a token computes to: `var()` chains followed and an opaque
 * `color-mix()` evaluated to hex. Null when the token is not declared.
 */
export function resolveTokenValue(map, token) {
    if (map[token] === undefined) return null;
    const substituted = substituteVars(map, map[token], new Set([token]));
    if (substituted === null) return null;
    if (substituted.startsWith('color-mix(')) return evaluateColorMix(substituted) ?? substituted;
    return substituted;
}

/** As above, but only when the result is one flat opaque colour. */
export function resolveTokenColor(map, token) {
    const value = resolveTokenValue(map, token);
    return value && HEX.test(value) ? value.toLowerCase() : null;
}

/* ---------- colours with an alpha ---------- */

/** `#rrggbb` + alpha, or null. `transparent` is alpha 0. */
function parsePaint(text) {
    const value = text.trim();
    if (value === 'transparent') return { hex: '#000000', alpha: 0 };
    if (HEX.test(value)) return { hex: value.toLowerCase().length === 4 ? toHex(parseHex(value)) : value.toLowerCase(), alpha: 1 };
    const rgba = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+%?))?\s*\)$/.exec(value);
    if (rgba) {
        const a = rgba[4] === undefined ? 1 : rgba[4].endsWith('%') ? Number.parseFloat(rgba[4]) / 100 : Number(rgba[4]);
        return { hex: toHex([rgba[1], rgba[2], rgba[3]].map(Number)), alpha: a };
    }
    if (value.startsWith('color-mix(')) return mixPaint(value);
    return null;
}

/**
 * `color-mix(in srgb, A p%, B q%)` where either side may be `transparent` or
 * carry an alpha. Premultiplied, as the browser mixes; a sum under 100% leaves
 * the result that much more transparent. Null when it cannot be reduced.
 */
function mixPaint(value) {
    const match = /^color-mix\(([\s\S]*)\)$/.exec(value.trim());
    if (!match) return null;
    const [space, first, second] = splitTopLevel(match[1]);
    if (!space || !first || !second || space.replace(/\s+/g, ' ') !== 'in srgb') return null;
    const operand = (text) => {
        const t = text.trim();
        let percent = null;
        let colourText = t;
        const trailing = /^([\s\S]*\S)\s+(-?[\d.]+)%$/.exec(t);
        const leading = /^(-?[\d.]+)%\s+([\s\S]*)$/.exec(t);
        if (trailing) [, colourText, percent] = trailing;
        else if (leading) [, percent, colourText] = leading;
        const paint = parsePaint(colourText);
        return paint ? { paint, percent: percent === null ? null : Number(percent) } : null;
    };
    const a = operand(first);
    const b = operand(second);
    if (!a || !b) return null;
    let pa = a.percent;
    let pb = b.percent;
    if (pa === null && pb === null) { pa = 50; pb = 50; }
    else if (pa === null) pa = 100 - pb;
    else if (pb === null) pb = 100 - pa;
    const total = pa + pb;
    if (total <= 0) return null;
    const wa = (pa / total) * a.paint.alpha;
    const wb = (pb / total) * b.paint.alpha;
    const alpha = wa + wb;
    if (alpha === 0) return { hex: '#000000', alpha: 0 };
    const ca = parseHex(a.paint.hex);
    const cb = parseHex(b.paint.hex);
    return {
        hex: toHex(ca.map((channel, i) => (channel * wa + cb[i] * wb) / alpha)),
        alpha: alpha * Math.min(1, total / 100),
    };
}

/**
 * What a token paints, as `{ hex, alpha }`: a flat colour (alpha 1), a
 * `color-mix()` with `transparent`, or an `rgba()` tint. Null when the token
 * is not declared or is not one of those.
 */
export function resolveTokenPaint(map, token) {
    if (map[token] === undefined) return null;
    const substituted = substituteVars(map, map[token], new Set([token]));
    return substituted === null ? null : parsePaint(substituted);
}

/** The colour `paint` makes laid source-over on the opaque `backdropHex`, as hex. */
export function compositeOver(paint, backdropHex) {
    const under = parseHex(backdropHex);
    const over = parseHex(paint.hex);
    return toHex(over.map((channel, i) => channel * paint.alpha + under[i] * (1 - paint.alpha)));
}

/**
 * The backdrop a material's filter hands to its fill: `brightness()` multiplies
 * the sRGB-encoded channels, so each channel of `backdropHex` is scaled by
 * `factor` (a number; 1 is the identity). Material pairs only.
 */
export function dimBackdrop(backdropHex, factor) {
    const f = Number(factor);
    if (!Number.isFinite(f) || f === 1) return backdropHex;
    return toHex(parseHex(backdropHex).map((channel) => channel * f));
}

/** The mode's `--material-backdrop-brightness` as a number; 1 when it is not declared or not a number. */
export function backdropBrightness(map) {
    const value = resolveTokenValue(map, '--material-backdrop-brightness');
    const n = value === null ? NaN : Number(value);
    return Number.isFinite(n) ? n : 1;
}
