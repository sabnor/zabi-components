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

/**
 * The WCAG contrast ratio, unrounded. Every pass/fail comparison against a
 * threshold uses this one: a ratio of 2.996 does not reach 3:1.
 */
export function contrastExact(a, b) {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
}

/** WCAG contrast ratio rounded to two decimals. For display only; never compare it with a threshold. */
export function contrast(a, b) {
    return Math.round(contrastExact(a, b) * 100) / 100;
}

/**
 * A ratio for a warning that failed its threshold. The rounded figure, unless
 * rounding would make a failing ratio read as met (4.495 as 4.5 against 4.5);
 * then it is floored to two decimals (4.49).
 */
export function failingRatioLabel(exact, min) {
    const rounded = Math.round(exact * 100) / 100;
    return rounded >= min ? Math.floor(exact * 100) / 100 : rounded;
}
