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
 * the reader's job. A pair may name a second foreground, `orFg`: it passes when
 * either foreground reaches the minimum against `bg`.
 *
 * A pair may also name `behind`: `bg` is then a translucent paint (a material's
 * `color-mix(… p%, transparent)`) and the pair is measured on what it makes
 * laid source-over on that token. `behind` is one token, or `{ light, dark }`
 * for a token per mode. A material is never judged alone: see MATERIALS.
 */

export const AA_NORMAL = 4.5;
export const AA_LARGE = 3.0;
/** A pressed fill against the fill it replaces: where the other pressed states start. */
export const MIN_PRESSED = 1.25;
/** Value text against placeholder text: enough to tell a filled field from an empty one. */
export const MIN_VALUE_OVER_PLACEHOLDER = 1.75;

const FAMILIES = ['success', 'warning', 'error', 'info', 'energetic', 'neutral'];

/** Every surface a control can land on: the four levels and the inset well. */
const SURFACE_TOKEN = { page: 'base', card: 'raised', inset: 'inset', elevated: 'elevated', overlay: 'overlay' };
const EVERY_SURFACE = Object.keys(SURFACE_TOKEN);

/**
 * [name, token, surfaces] — parts that need 3:1 against what they sit on.
 * The brand ring was held on four surfaces while dark kept it on brand-500:
 * 2.91:1 on the dark overlay, where every modal and menu puts its controls.
 */
const UI_PARTS = [
    ['focus ring', '--color-focus-ring', EVERY_SURFACE],
    ['nav focus ring', '--color-nav-menu-focus', EVERY_SURFACE],
    // `.focus-ring--danger` reads this role, which is --color-error.
    ['danger focus ring', '--color-focus-ring-danger', EVERY_SURFACE],
    ['muted focus ring', '--color-focus-ring-muted', EVERY_SURFACE],
    ['control boundary', '--color-control-border', EVERY_SURFACE],
];

/**
 * A brand block (`bg-action-primary on-brand`) and an accent block
 * (`bg-accent on-accent`): the fill, and the label colour the theme holds to
 * 4.5:1 against it.
 */
export const BLOCKS = [
    { name: 'brand', selector: '.on-brand', fill: '--color-action-primary', on: '--color-on-brand' },
    { name: 'accent', selector: '.on-accent', fill: '--color-accent', on: '--color-on-accent' },
];

/**
 * What a control writes with when it has no fill of its own, and so what is
 * drawn directly on a block: [role, the least it needs against the fill].
 * Inside a block every one of these has to be re-pointed, and to something
 * that reads there. They were the page's colours: a Checkbox label 2.15:1 on
 * a brand block in light and 1.52:1 in dark, an outline Button's label 3.65
 * and 2.05, the danger ring 1.06.
 */
export const BLOCK_ROLES = [
    ['--color-headline', AA_NORMAL],
    ['--color-body', AA_NORMAL],
    ['--color-label', AA_NORMAL],
    ['--color-description', AA_NORMAL],
    ['--color-caption', AA_NORMAL],
    ['--color-link', AA_NORMAL],
    ['--color-link-hover', AA_NORMAL],
    ['--color-border', AA_LARGE],
    ['--color-border-medium', AA_LARGE],
    ['--color-border-strong', AA_LARGE],
    ['--color-control-border', AA_LARGE],
    ['--color-focus-ring', AA_LARGE],
    ['--color-focus-ring-muted', AA_LARGE],
    ['--color-focus-ring-danger', AA_LARGE],
    ['--color-nav-menu-focus', AA_LARGE],
];

/**
 * A `bg-*` class with one of these names is a surface: role text is written
 * on it. Inside a block it has to be in the list that gives the roles back
 * their theme values, or its text is the block's label colour on a card.
 */
export const SURFACE_CLASS = /^(surface-[\w-]+|card(-elevated)?|background|input(-disabled)?|[\w-]+-subtle|nav-menu-active|action-disabled)$/;

/**
 * The worst thing a material can float over: the far end of the neutral ramp.
 * A photo can be that dark or that bright, so light glass is judged over
 * step 950 and dark glass over step 50.
 */
export const WORST_BACKDROP = { light: '--zabi-base-950', dark: '--zabi-base-50' };

/** The token a pair's `behind` names in `mode`, or null for a pair without one. */
export function behindToken(pair, mode) {
    if (!pair.behind) return null;
    return typeof pair.behind === 'string' ? pair.behind : pair.behind[mode];
}

/**
 * The materials (D97) and the roles each may carry, each held to its floor on
 * the worst backdrop AND over the mode's own page (the easy case, so a fill
 * cannot pass by being too dark). The alphas in src/app.css are the smallest
 * whole 2% that passes all of these; a lower one fails here.
 *  thin: a control on a bar (an icon, a short headline-coloured label)
 *  regular: bars, the tab bar, a floating sidebar
 *  thick: sheets, menus, modals, toasts, tooltips: all five text roles
 * Regular and thick also keep the focus ring at 3:1 (WCAG 1.4.11): controls sit
 * inside a bar or a sheet, so their rings are drawn on the material. Thin does
 * not (D106): it is a single control, and its ring is drawn around it, outside
 * the material, against the offset gap.
 */
export const MATERIALS = [
    { name: 'thin', fill: '--color-material-thin', text: ['headline'], ring: false },
    { name: 'regular', fill: '--color-material-regular', text: ['headline', 'body', 'label'] },
    { name: 'thick', fill: '--color-material-thick', text: ['headline', 'body', 'label', 'description', 'caption'] },
];

/** The two named stops of the canvas wash (--gradient-canvas) and the text roles on it. */
export const CANVAS_STOPS = [
    { name: 'brand', token: '--color-canvas-wash-brand' },
    { name: 'accent', token: '--color-canvas-wash-accent' },
];
export const CANVAS_TEXT = ['headline', 'body', 'label', 'description', 'caption'];

/**
 * The solid controls that take a gradient: a translucent veil (start on top,
 * end at the bottom) over the control's own fill, per state. The label is
 * held at 4.5:1 on both ends of each state.
 */
export const CONTROL_GRADIENTS = [
    {
        name: 'primary',
        start: '--color-control-gradient-start',
        end: '--color-control-gradient-end',
        on: '--color-action-primary-text',
        fills: [['rest', '--color-action-primary'], ['hover', '--color-action-primary-hover'], ['active', '--color-action-primary-active']],
    },
    {
        name: 'accent',
        start: '--color-control-gradient-accent-start',
        end: '--color-control-gradient-accent-end',
        on: '--color-on-accent',
        fills: [['rest', '--color-accent'], ['hover', '--color-accent-hover'], ['active', '--color-accent-active']],
    },
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

    // Badge / brand: the subtle text is the link role (as the label of a
    // selected pill tab); the solid label is the primary fill's own.
    pairs.push(
        { name: 'badge subtle · brand', bg: '--color-action-primary-subtle', fg: '--color-link', min: AA_NORMAL },
        { name: 'badge solid · brand', bg: '--color-action-primary', fg: '--color-action-primary-text', min: AA_NORMAL },
    );

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
        // A filled Rating star in the accent tone is outlined in the accent's
        // text step, because an accent may be a yellow that no fill of its own
        // can show on a white card. The outline is the star's boundary (WCAG
        // 1.4.11): 3:1 on the inset surface too; page and card are above.
        { name: 'accent star outline on inset', bg: '--color-surface-inset', fg: '--color-accent-text', min: AA_LARGE },
        // Button variant="accent", focused. The ring is the brand colour and the
        // fill is the accent, two colours an app chooses freely: the library's
        // own are 1.03:1 apart, an app's blue and yellow 6:1. So either the
        // 2px gap or the ring itself has to show against the fill. One is
        // enough, which is what `orFg` says.
        { name: 'focus ring or its offset gap on an accent button', bg: '--color-accent', fg: '--color-focus-ring-offset', orFg: '--color-focus-ring', min: AA_LARGE },
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
        // The pressed Select trigger. It borrowed the hover fill, 1.10:1 against
        // the resting field, when every other pressed fill is 1.26:1 or more.
        { name: 'input value on a pressed field', bg: '--color-input-active', fg: '--color-body', min: AA_NORMAL },
        { name: 'pressed field against the resting field', bg: '--color-input', fg: '--color-input-active', min: MIN_PRESSED },
        // A toggled-on IconButton, held down. Its resting fill is the subtle
        // one, and the pressed fill was the hover step: 1.24:1 (ghost) and
        // 1.18:1 (danger tone) in light, and the same fill a mouse already
        // shows on hover. The pressed role is its own step; the icon, which is
        // all there is on an IconButton, keeps 3:1 on it (WCAG 1.4.11).
        { name: 'held toggled-on fill against its resting fill', bg: '--color-action-primary-subtle', fg: '--color-action-primary-subtle-active', min: MIN_PRESSED },
        { name: 'icon on a held toggled-on fill', bg: '--color-action-primary-subtle-active', fg: '--color-link', min: AA_LARGE },
        { name: 'held toggled-on danger fill against its resting fill', bg: '--color-action-danger-subtle', fg: '--color-action-danger-subtle-active', min: MIN_PRESSED },
        { name: 'icon on a held toggled-on danger fill', bg: '--color-action-danger-subtle-active', fg: '--color-error', min: AA_LARGE },
        // The selected pill Tab is the same fill with a text label. The label
        // is the link colour at rest and the link's own pressed colour while
        // held (`.text-link:active`); on the old pressed fill, the hover step,
        // the resting link colour was 4.02:1.
        { name: 'label on a selected pill tab', bg: '--color-action-primary-subtle', fg: '--color-link', min: AA_NORMAL },
        { name: 'label on a held selected pill tab', bg: '--color-action-primary-subtle-active', fg: '--color-link-hover', min: AA_NORMAL },
        // Placeholders are decorative-ish, but must stay readable — large-text bar.
        // Placeholder text is read: an example, or the format hint of an empty
        // DateField ("dd/mm/yyyy"). It was held to 3:1 on the resting field only,
        // and dark sat at 3.40:1 there and 2.60:1 on the pressed fill. It is
        // held to 4.5:1 on every fill a field can show.
        { name: 'input placeholder', bg: '--color-input', fg: '--color-input-placeholder', min: AA_NORMAL },
        { name: 'input placeholder on a hovered field', bg: '--color-input-hover', fg: '--color-input-placeholder', min: AA_NORMAL },
        { name: 'input placeholder on a focused field', bg: '--color-input-focus', fg: '--color-input-placeholder', min: AA_NORMAL },
        { name: 'input placeholder on a pressed field', bg: '--color-input-active', fg: '--color-input-placeholder', min: AA_NORMAL },
        // And it must not become the value: an empty field has to look empty.
        { name: 'input value against its placeholder', bg: '--color-input-placeholder', fg: '--color-body', min: MIN_VALUE_OVER_PLACEHOLDER },
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

    // WCAG 1.4.11: the edge of a form field is what finds the field, and on a
    // white card the field fill is the card, so the edge is all there is. It was
    // base-350 in light (1.9:1 on white) and was in no pair at all. Held to 3:1
    // against the fill, the page and the card. Not the overlay: the dark overlay
    // (#454547) needs a lighter step than the other three (base-600, not
    // base-500), which is a separate decision; light overlay is the card.
    pairs.push(
        { name: 'field edge on the field fill', bg: '--color-input', fg: '--color-input-border', min: AA_LARGE },
        { name: 'field edge on page', bg: '--color-background', fg: '--color-input-border', min: AA_LARGE },
        { name: 'field edge on card', bg: '--color-surface-raised', fg: '--color-input-border', min: AA_LARGE },
        // WCAG 1.4.11: the fill of Progress must be seen against its track.
        { name: 'progress fill on track', bg: '--color-progress-track', fg: '--color-progress-fill', min: AA_LARGE },
    );

    for (const material of MATERIALS) {
        for (const [where, behind] of [['the worst backdrop', WORST_BACKDROP], ['the page', '--color-surface-base']]) {
            for (const role of material.text) {
                pairs.push({ name: `material ${material.name} · ${role} over ${where}`, bg: material.fill, fg: `--color-${role}`, min: AA_NORMAL, behind });
            }
            if (material.ring !== false) {
                pairs.push({ name: `material ${material.name} · focus ring over ${where}`, bg: material.fill, fg: '--color-focus-ring', min: AA_LARGE, behind });
            }
        }
    }

    // Gradients (D99): never judged as a gradient, only at their worst stops.
    // The canvas wash is strongest at its centre, where it is the stop colour
    // over the page; every text role that can sit on the canvas is held there.
    for (const stop of CANVAS_STOPS) {
        for (const role of CANVAS_TEXT) {
            pairs.push({ name: `canvas wash ${stop.name} · ${role}`, bg: stop.token, fg: `--color-${role}`, min: AA_NORMAL, behind: '--color-surface-base' });
        }
        pairs.push({ name: `canvas wash ${stop.name} · link`, bg: stop.token, fg: '--color-link', min: AA_NORMAL, behind: '--color-surface-base' });
        pairs.push({ name: `canvas wash ${stop.name} · focus ring`, bg: stop.token, fg: '--color-focus-ring', min: AA_LARGE, behind: '--color-surface-base' });
        pairs.push({ name: `canvas wash ${stop.name} · field edge`, bg: stop.token, fg: '--color-input-border', min: AA_LARGE, behind: '--color-surface-base' });
    }
    // The control gradient is a veil over the control's own fill, so each state
    // is the veil stop over that state's fill, and the label must hold on both ends.
    for (const control of CONTROL_GRADIENTS) {
        for (const [state, fill] of control.fills) {
            for (const [end, bg] of [['top', control.start], ['bottom', control.end]]) {
                pairs.push({ name: `${control.name} gradient ${end} · ${state}`, bg, fg: control.on, min: AA_NORMAL, behind: fill });
            }
        }
    }

    return pairs;
}
