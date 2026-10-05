/**
 * The fill/foreground pairs the components actually render, with the WCAG AA
 * ratio each must reach.
 *
 * One list, two readers. scripts/check-contrast.js holds the library's own
 * theme to it in both modes. scripts/build-create-theme.js writes it into the
 * published theme generator, which checks an app's generated brand against
 * exactly the same pairs — so a pair added here is guarded in both places, and
 * there is no second hand-kept list to forget.
 *
 * Each pair is token names only (`bg`, `fg`) and a minimum; resolving them is
 * the reader's job.
 */

export const AA_NORMAL = 4.5;
export const AA_LARGE = 3.0;

const FAMILIES = ['success', 'warning', 'error', 'info', 'energetic', 'neutral'];

/** Every surface a control can land on: the four levels and the inset well. */
const SURFACE_TOKEN = { page: 'base', card: 'raised', inset: 'inset', elevated: 'elevated', overlay: 'overlay' };
const EVERY_SURFACE = Object.keys(SURFACE_TOKEN);
/**
 * KNOWN GAP, not a pass: the brand ring (--color-focus-ring, and the nav ring
 * that aliases it) is 2.91:1 on the dark overlay with the default theme
 * (#6d87f1 on #454547). Closing it means moving dark --color-focus, which
 * re-colours every focus ring in dark, so it waits for a decision. Until then
 * these two rings are held on the four surfaces they pass on; in light the
 * overlay is the card's white, so nothing light is left unchecked. Replace
 * this list with EVERY_SURFACE when the dark ring has moved.
 */
const BRAND_RING_SURFACES = ['page', 'card', 'inset', 'elevated'];

/** [name, token, surfaces] — parts that need 3:1 against what they sit on. */
const UI_PARTS = [
    ['focus ring', '--color-focus-ring', BRAND_RING_SURFACES],
    ['nav focus ring', '--color-nav-menu-focus', BRAND_RING_SURFACES],
    // `.focus-ring--danger` reads --color-error.
    ['danger focus ring', '--color-error', EVERY_SURFACE],
    ['muted focus ring', '--color-focus-ring-muted', EVERY_SURFACE],
    ['control boundary', '--color-control-border', EVERY_SURFACE],
];

export function buildPairs() {
    const pairs = [];

    for (const family of FAMILIES) {
        // Badge / solid emphasis: family fill + the card surface as label.
        pairs.push({
            name: `badge solid · ${family}`,
            bg: `--color-${family}`,
            fg: '--color-card',
            min: AA_NORMAL,
        });
        // Badge / subtle emphasis and Alert: tinted fill + the -text step.
        pairs.push({
            name: `badge subtle · ${family}`,
            bg: `--color-${family}-subtle`,
            fg: `--color-${family}-text`,
            min: AA_NORMAL,
        });
        // Alert body copy sits on the same tinted fill.
        pairs.push({
            name: `alert body · ${family}`,
            bg: `--color-${family}-subtle`,
            fg: '--color-body',
            min: AA_NORMAL,
        });
        // Validation message text on the page surface.
        pairs.push({
            name: `message text · ${family}`,
            bg: '--color-surface-base',
            fg: `--color-${family}-text`,
            min: AA_NORMAL,
        });
    }

    // Accent — the second brand colour. Solid fills carry --color-on-accent
    // (not the card surface, as a status badge does): an app that re-colours
    // --zabi-accent-* sets the label with --zabi-on-accent / -dark.
    pairs.push(
        { name: 'accent fill', bg: '--color-accent', fg: '--color-on-accent', min: AA_NORMAL },
        { name: 'accent fill :hover', bg: '--color-accent-hover', fg: '--color-on-accent', min: AA_NORMAL },
        { name: 'accent fill :active', bg: '--color-accent-active', fg: '--color-on-accent', min: AA_NORMAL },
        { name: 'accent subtle', bg: '--color-accent-subtle', fg: '--color-accent-text', min: AA_NORMAL },
        { name: 'accent subtle body', bg: '--color-accent-subtle', fg: '--color-body', min: AA_NORMAL },
        { name: 'accent text on page', bg: '--color-surface-base', fg: '--color-accent-text', min: AA_NORMAL },
        { name: 'accent text on card', bg: '--color-surface-raised', fg: '--color-accent-text', min: AA_NORMAL },
        // "On brand" — the role components reach through --color-action-primary-text.
        { name: 'on-brand label on primary', bg: '--color-action-primary', fg: '--color-on-brand', min: AA_NORMAL },
        { name: 'on-brand label on primary :hover', bg: '--color-action-primary-hover', fg: '--color-on-brand', min: AA_NORMAL },
        { name: 'on-brand label on primary :active', bg: '--color-action-primary-active', fg: '--color-on-brand', min: AA_NORMAL },
    );

    pairs.push(
        { name: 'button primary', bg: '--color-action-primary', fg: '--color-action-primary-text', min: AA_NORMAL },
        { name: 'button primary :hover', bg: '--color-action-primary-hover', fg: '--color-action-primary-text', min: AA_NORMAL },
        { name: 'button primary :active', bg: '--color-action-primary-active', fg: '--color-action-primary-text', min: AA_NORMAL },
        { name: 'button danger', bg: '--color-action-danger', fg: '--color-action-danger-text', min: AA_NORMAL },
        { name: 'button danger :hover', bg: '--color-action-danger-hover', fg: '--color-action-danger-text', min: AA_NORMAL },
        { name: 'button danger :active', bg: '--color-action-danger-active', fg: '--color-action-danger-text', min: AA_NORMAL },
        { name: 'body text on page', bg: '--color-surface-base', fg: '--color-body', min: AA_NORMAL },
        { name: 'body text on card', bg: '--color-surface-raised', fg: '--color-body', min: AA_NORMAL },
        { name: 'description on page', bg: '--color-surface-base', fg: '--color-description', min: AA_NORMAL },
        { name: 'description on overlay', bg: '--color-surface-overlay', fg: '--color-description', min: AA_NORMAL },
        { name: 'caption on card', bg: '--color-surface-raised', fg: '--color-caption', min: AA_NORMAL },
        { name: 'label on page', bg: '--color-surface-base', fg: '--color-label', min: AA_NORMAL },
        { name: 'link on page', bg: '--color-surface-base', fg: '--color-link', min: AA_NORMAL },
        { name: 'link on card', bg: '--color-surface-raised', fg: '--color-link', min: AA_NORMAL },
        { name: 'input value', bg: '--color-input', fg: '--color-body', min: AA_NORMAL },
        // Placeholders are decorative-ish, but must stay readable — large-text bar.
        { name: 'input placeholder', bg: '--color-input', fg: '--color-input-placeholder', min: AA_LARGE },
        { name: 'tooltip', bg: '--color-tooltip-bg', fg: '--color-tooltip-fg', min: AA_NORMAL },
        // Disabled controls are exempt from WCAG, but should still be legible.
        { name: 'disabled control', bg: '--color-action-disabled', fg: '--color-action-disabled-text', min: 3.0 },
        // WCAG 1.4.11: a focus indicator needs 3:1 against what it is drawn
        // next to. Light brand-500 was 2.99:1 on the page and nothing checked it.
        { name: 'focus ring on page', bg: '--color-surface-base', fg: '--color-focus-ring', min: AA_LARGE },
        { name: 'focus ring on card', bg: '--color-surface-raised', fg: '--color-focus-ring', min: AA_LARGE },
        { name: 'nav focus ring on page', bg: '--color-surface-base', fg: '--color-nav-menu-focus', min: AA_LARGE },
        { name: 'nav focus ring on card', bg: '--color-surface-raised', fg: '--color-nav-menu-focus', min: AA_LARGE },
        // The ring may equal the primary fill (it does in light), so on a
        // primary button it is the 2px offset gap that separates the two.
        { name: 'focus offset gap on primary button', bg: '--color-action-primary', fg: '--color-focus-ring-offset', min: AA_LARGE },
        { name: 'focus ring against its offset gap', bg: '--color-focus-ring-offset', fg: '--color-focus-ring', min: AA_LARGE },
    );

    // WCAG 1.4.11 again, on the rest of the ladder. The four pairs above stop
    // at the card, and a ring or a control's only edge is drawn wherever the
    // control lands. `.focus-ring--muted` read --color-base-500, the same grey
    // in both themes: 4.40:1 on the light elevated surface and 2.49:1 on the
    // dark one, where the AppBar puts its ghost buttons. The empty Rating star
    // was the same grey and the same 2.49:1.
    for (const [name, fg, surfaces] of UI_PARTS) {
        for (const surface of surfaces) {
            const pair = { name: `${name} on ${surface}`, bg: `--color-surface-${SURFACE_TOKEN[surface]}`, fg, min: AA_LARGE };
            // Page and card are already listed above for the two brand rings.
            if (!pairs.some((p) => p.bg === pair.bg && p.fg === pair.fg)) pairs.push(pair);
        }
    }

    return pairs;
}
