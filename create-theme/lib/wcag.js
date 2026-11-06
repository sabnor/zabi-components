/**
 * WCAG 2.x relative luminance and contrast ratio for `#rrggbb` colours.
 *
 * Shared by the generator's contrast check and by the public colour helpers
 * (../color.js), so an app that calls getContrastRatio gets the number the
 * generator's own check computed. No dependencies.
 */

function channel(c) {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

export function luminance(hex) {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** WCAG contrast ratio, rounded to two decimals as the library's guard does. */
export function contrast(a, b) {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
}
