/**
 * Resolve design tokens the way a browser would, without a browser.
 *
 * The guards and the theme tests all need the colour a token ends up as. They
 * used to follow `var()` chains to a hex literal and stop, which was enough
 * while every dark surface was a baked hex. The surface ladder is now
 * `color-mix(in srgb, var(--zabi-base-50) 6.4%, var(--zabi-base-900))`, so
 * that it follows an app's neutral override — and a resolver that cannot
 * evaluate that would silently skip every pair measured against a dark card.
 *
 * Supported, because it is all the stylesheet uses for a flat colour:
 *   - `var(--token)` and `var(--token, fallback)`, anywhere in a value
 *   - `color-mix(in srgb, <opaque> p%, <opaque>)` (either or both percentages)
 * Anything else (`rgba()`, a mix with `transparent`) is returned as written,
 * for the caller to composite over a surface or to skip.
 */

import postcss from 'postcss';

// The resolver itself has no dependencies and ships with the theme generator.
export {
    substituteVars,
    evaluateColorMix,
    resolveTokenValue,
    resolveTokenColor,
} from '../create-theme/lib/resolve.js';

/** Custom properties declared directly in a rule or at-rule, later ones winning. */
export function declarationsOf(container) {
    const map = {};
    container.each((node) => {
        if (node.type === 'decl' && node.prop.startsWith('--')) map[node.prop] = node.value.trim();
    });
    return map;
}

/**
 * Light and dark token maps from a stylesheet: `@theme` (or `:root`) for
 * light, and the rule whose selector list includes `.dark` laid over it.
 * Works on `src/app.css` and on the built `colors` and theme files alike.
 */
export function readThemeMaps(css) {
    const root = postcss.parse(css);
    let light = {};
    let darkOnly = {};
    root.walkAtRules('theme', (atRule) => {
        light = { ...light, ...declarationsOf(atRule) };
    });
    root.each((node) => {
        if (node.type !== 'rule') return;
        const selectors = (node.selectors ?? [node.selector]).map((s) => s.trim());
        if (selectors.includes(':root')) light = { ...light, ...declarationsOf(node) };
        if (selectors.includes('.dark')) darkOnly = { ...darkOnly, ...declarationsOf(node) };
    });
    return { light, darkOnly, dark: { ...light, ...darkOnly } };
}
