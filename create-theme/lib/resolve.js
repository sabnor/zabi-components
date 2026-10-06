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
