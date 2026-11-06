/**
 * The few values of the default theme that a pinned fill is judged against,
 * as resolved hex, so that brandContrast and accessibleBrand (../color.js) do
 * not have to load the theme data or the pair list.
 *
 * They are copies, and tests/create-theme.test.js holds them to what the
 * built theme data resolves to: a token change that moves one fails the test
 * instead of letting the helper drift from createTheme.
 *
 *   page   --color-surface-base
 *   card   --color-surface-raised; also --color-focus-ring-offset (the gap
 *          round a focused button is the card colour)
 *   track  --color-progress-track, which the progress fill is judged against
 */
export const DEFAULT_SURFACES = {
    light: { page: '#fafafa', card: '#ffffff', track: '#ffffff' },
    dark: { page: '#18181b', card: '#1f1f22', track: '#101013' },
};

/**
 * The guarded pairs a pinned brand fill takes part in, each one a name from
 * scripts/contrast-pairs.js, so that the sets of failing pairs compare as
 * createTheme's do. `a` is the fill (or a state), `b` what it is measured
 * against: the label, or a surface. The last two are the pairs createTheme
 * adds when the brand is pinned (PIN_ROLES.brand.pairs). The control gradient
 * pairs are not here: settleControlGradients takes the veil off before it
 * lets one fail where the flat fill passes.
 */
export const PINNED_FILL_PAIRS = [
    ['badge solid · brand', 'fill', 'label', 4.5],
    ['on-brand label on primary', 'fill', 'label', 4.5],
    ['on-brand label on primary :hover', 'hover', 'label', 4.5],
    ['on-brand label on primary :active', 'active', 'label', 4.5],
    ['button primary', 'fill', 'label', 4.5],
    ['button primary :hover', 'hover', 'label', 4.5],
    ['button primary :active', 'active', 'label', 4.5],
    ['on-brand text on an on-brand bar', 'fill', 'label', 4.5],
    ['toggle knob on the on track', 'fill', 'label', 3],
    ['toggle knob on the on track :hover', 'hover', 'label', 3],
    ['toggle knob on the on track :active', 'active', 'label', 3],
    ['focus offset gap on primary button', 'fill', 'card', 3],
    ['primary fill against the page', 'fill', 'page', 3],
    ['primary fill against a card', 'fill', 'card', 3],
    ['progress fill on track', 'fill', 'track', 3],
    ['pinned primary fill against the page', 'fill', 'page', 3],
    ['pinned primary fill against a card', 'fill', 'card', 3],
];
