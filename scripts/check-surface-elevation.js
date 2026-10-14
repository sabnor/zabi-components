#!/usr/bin/env node
/**
 * Surface elevation guard, both themes.
 *
 * 1. Resolves the four semantic surface levels (`--color-surface-base|raised|elevated|overlay`)
 *    from `src/app.css` in both themes (`.dark` overrides `@theme`) and requires all four to exist.
 * 2. Dark mode, decisions D133/D134. Dark art-directs its own surfaces: plain steps of the
 *    neutral ramp, with elevation in at most two tone steps, and overlays told apart by their
 *    edge and shadow rather than by being greyer:
 *    a. The four levels, `--color-surface-overlay-hover` and `--color-surface-inset` are each
 *       DECLARED as one step of the ramp (`var(--zabi-base-N)` or `var(--color-base-N)`), not a
 *       `color-mix()` with a wash. That is what keeps the ramp's hue and chroma on a tinted
 *       neutral. The declared value is checked, not only the hex it resolves to.
 *    b. Lightness never decreases base → raised → elevated → overlay, and raised is strictly
 *       lighter than the page.
 *    c. At most DARK_MAX_TONE_STEPS distinct tone steps above the page across raised, elevated
 *       and overlay; each distinct step is DARK_MIN_TONE_STEP to DARK_MAX_TONE_STEP OKLCH L
 *       points; the top is at most DARK_MAX_TOTAL points above the page.
 *    d. Tone no longer separates an overlay, so its edge does: `--color-material-rim` laid over
 *       the overlay surface reaches OVERLAY_EDGE_MIN_CONTRAST:1 against the page and the card
 *       and OVERLAY_EDGE_MIN_CONTRAST_SELF:1 against the overlay itself; and the card edge
 *       (`--color-border`) reaches CARD_EDGE_MIN_CONTRAST:1 against the page and the card.
 *    e. `--color-surface-overlay-hover` is lighter than the overlay, and `--color-tooltip-bg`
 *       is not darker than it.
 * 3. Floating components (modals, sheets, menus, toasts) must paint `bg-surface-overlay`
 *    and must not use a lower surface class for their panel.
 * 4. Both themes: text tokens (`TEXT_TOKENS`) must reach WCAG AA (MIN_TEXT_CONTRAST) on every
 *    surface level and on the inset surface, so secondary text stays readable wherever a
 *    component is placed.
 * 5. Light mode (decision D102): the page is a near-white and the card is told apart from it by
 *    an edge, not by lightness, so the light ladder is ordered like this: raised and overlay no
 *    darker than the page; elevated sits at least LIGHT_MIN_STEP points below raised; and the
 *    card edge (`--color-border`, what Card's default variant draws) reaches
 *    CARD_EDGE_MIN_CONTRAST:1 against both the page and the raised surface. (Until 8.1 the page
 *    was a grey and a lightness ladder separated page, nested card and card.)
 * 6. Both themes: `--color-surface-inset` must sit at least INSET_MIN_STEP points below the
 *    raised surface it is cut into. In dark it must also not be darker than the page.
 *
 * Run standalone (`node scripts/check-surface-elevation.js`) or via `scripts/validate-theme.js`.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import postcss from 'postcss';
import { converter, wcagContrast, wcagLuminance } from 'culori';
import { resolveTokenValue, resolveTokenPaint, compositeOver } from './resolve-tokens.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const appCssPath = path.join(root, 'src', 'app.css');

export const SURFACE_LEVELS = ['surface-base', 'surface-raised', 'surface-elevated', 'surface-overlay'];
/** The recessed surface inside a card, checked in both themes. */
export const INSET_SURFACE = 'surface-inset';
export const INSET_MIN_STEP = 2;
/**
 * Dark surfaces are steps of the neutral ramp (D133/D134): the roles that must be declared as
 * one, the fewest tone steps above the page, and how far apart they may be, in OKLCH L points.
 */
export const DARK_RAMP_ROLES = [...SURFACE_LEVELS, 'surface-overlay-hover', INSET_SURFACE];
export const DARK_MAX_TONE_STEPS = 2;
export const DARK_MIN_TONE_STEP = 2;
export const DARK_MAX_TONE_STEP = 5;
export const DARK_MAX_TOTAL = 8;
/** `var(--zabi-base-N)` or `var(--color-base-N)` and nothing else: no `color-mix()`, no wash. */
export const RAMP_STEP_DECLARATION = /^var\(\s*--(?:zabi|color)-base-\d+\s*\)$/;
/** Overlays are set apart by their edge: the rim over the overlay vs page, card and itself. */
export const OVERLAY_EDGE_TOKEN = '--color-material-rim';
export const OVERLAY_EDGE_MIN_CONTRAST = 1.5;
export const OVERLAY_EDGE_MIN_CONTRAST_SELF = 1.3;
/** Light steps are smaller than dark ones (shadows share the work) but never below this. */
export const LIGHT_MIN_STEP = 2;
/** The card's 1px edge against the page and against the card, both themes (D102, D134). */
export const CARD_EDGE_TOKEN = '--color-border';
export const CARD_EDGE_MIN_CONTRAST = 1.2;

/** Text tokens that must stay readable on every surface level, in both themes. */
export const TEXT_TOKENS = ['--color-headline', '--color-body', '--color-label', '--color-description', '--color-caption'];
export const MIN_TEXT_CONTRAST = 4.5;

/** Components whose panel floats above all content → must use the overlay level. */
export const FLOATING_COMPONENTS = [
  'src/components/molecules/Modal.svelte',
  'src/components/molecules/SlideUp.svelte',
  'src/components/molecules/Drawer.svelte',
  'src/components/molecules/Dropdown.svelte',
  'src/components/molecules/NavigationMenuContent.svelte',
  'src/components/molecules/ToasterToast.svelte',
  'src/components/atoms/Toast.svelte',
];
const LOWER_SURFACE_CLASS =
  /(?<![\w:-])bg-(?:card|background|surface-(?:base|raised|elevated|1|2))(?![\w-])/g;

const toOklch = converter('oklch');

function collectDeclarations(css) {
  const ast = postcss.parse(css, { from: appCssPath });
  const light = new Map();
  const dark = new Map();
  ast.walkAtRules('theme', (atRule) => {
    atRule.walkDecls((d) => light.set(d.prop, d.value.trim()));
  });
  ast.walkRules((rule) => {
    const selectors = (rule.selectors ?? [rule.selector]).map((s) => s.trim());
    if (!selectors.includes('.dark')) return;
    rule.walkDecls((d) => dark.set(d.prop, d.value.trim()));
  });
  return { light, dark };
}

/**
 * A token's computed value, with the first scope that declares a name winning.
 * The dark levels are `color-mix()` over the neutral ramp; the shared resolver
 * evaluates them to the hex a browser paints, so the steps are still measured.
 */
function resolveVar(name, scopes) {
  const merged = {};
  for (const scope of [...scopes].reverse()) {
    for (const [prop, value] of scope) merged[prop] = value;
  }
  return resolveTokenValue(merged, name) ?? undefined;
}

function lightness(color) {
  const parsed = toOklch(color);
  if (!parsed) return undefined;
  return parsed.l * 100;
}

export function checkSurfaceElevation({ log = console.log, cssPath = appCssPath } = {}) {
  const errors = [];
  const css = fs.readFileSync(cssPath, 'utf8');
  const { light, dark } = collectDeclarations(css);
  const themes = { light: [light], dark: [dark, light] };
  const report = {};

  for (const [theme, scopes] of Object.entries(themes)) {
    report[theme] = [];
    for (const level of SURFACE_LEVELS) {
      const prop = `--color-${level}`;
      const resolved = resolveVar(prop, scopes);
      const L = resolved ? lightness(resolved) : undefined;
      if (resolved === undefined || L === undefined) {
        errors.push(`${theme}: ${prop} is missing or not a resolvable color (got ${resolved})`);
        continue;
      }
      report[theme].push({ level, color: resolved, L, Y: wcagLuminance(resolved) * 100 });
    }
  }

  const inset = {};
  for (const [theme, scopes] of Object.entries(themes)) {
    const prop = `--color-${INSET_SURFACE}`;
    const resolved = resolveVar(prop, scopes);
    const L = resolved ? lightness(resolved) : undefined;
    if (resolved === undefined || L === undefined) {
      errors.push(`${theme}: ${prop} is missing or not a resolvable color (got ${resolved})`);
      continue;
    }
    inset[theme] = { level: INSET_SURFACE, color: resolved, L };
    const base = report[theme].find((r) => r.level === 'surface-base');
    const raised = report[theme].find((r) => r.level === 'surface-raised');
    if (raised && raised.L - L < INSET_MIN_STEP) {
      errors.push(
        `${theme}: ${prop} (L ${L.toFixed(1)}) must sit at least ${INSET_MIN_STEP} OKLCH L points below ` +
          `--color-surface-raised (L ${raised.L.toFixed(1)}); it steps ${(raised.L - L).toFixed(1)}`,
      );
    }
    if (theme === 'dark' && base && L < base.L) {
      errors.push(`${theme}: ${prop} (L ${L.toFixed(1)}) is darker than --color-surface-base (L ${base.L.toFixed(1)})`);
    }
  }

  const lightLevels = report.light;
  if (lightLevels.length === SURFACE_LEVELS.length) {
    const [base, raised, elevated, overlay] = lightLevels;
    for (const upper of [raised, overlay]) {
      if (upper.L < base.L) {
        errors.push(`light: ${upper.level} (L ${upper.L.toFixed(1)}) is darker than the page ${base.level} (L ${base.L.toFixed(1)}); cards and overlays must not be darker than the page`);
      }
    }
    // The light surfaces below the card step down from it, not up from the page.
    const below = [elevated, ...(inset.light ? [inset.light] : [])];
    for (const surface of below) {
      const step = raised.L - surface.L;
      if (step < LIGHT_MIN_STEP) {
        errors.push(`light: ${surface.level} steps ${step.toFixed(1)} OKLCH L points below ${raised.level} (needs ≥ ${LIGHT_MIN_STEP})`);
      }
    }
    const edge = resolveVar(CARD_EDGE_TOKEN, themes.light);
    if (!edge || lightness(edge) === undefined) {
      errors.push(`light: ${CARD_EDGE_TOKEN} is missing or not a resolvable color (got ${edge})`);
    } else {
      for (const against of [base, raised]) {
        const ratio = wcagContrast(edge, against.color);
        report.light.edge = report.light.edge ?? [];
        report.light.edge.push(`${against.level} ${ratio.toFixed(2)}:1`);
        if (ratio < CARD_EDGE_MIN_CONTRAST) {
          errors.push(`light: ${CARD_EDGE_TOKEN} (${edge}) on --color-${against.level} is ${ratio.toFixed(2)}:1 (needs ≥ ${CARD_EDGE_MIN_CONTRAST}:1)`);
        }
      }
    }
  }

  const darkLevels = report.dark;
  // 2a. Every dark surface role is declared as one step of the ramp.
  {
    const merged = { ...Object.fromEntries(light), ...Object.fromEntries(dark) };
    for (const role of DARK_RAMP_ROLES) {
      const prop = `--color-${role}`;
      const declared = dark.get(prop) ?? merged[prop];
      if (declared === undefined || !RAMP_STEP_DECLARATION.test(declared)) {
        errors.push(
          `dark: ${prop} is declared as \`${declared}\`; it must be one step of the neutral ramp ` +
            `(var(--zabi-base-N) or var(--color-base-N)), not a mix or a literal, so it keeps the ramp's hue and chroma`,
        );
      }
    }
  }
  if (darkLevels.length === SURFACE_LEVELS.length) {
    const [base, raised, elevated, overlay] = darkLevels;
    // 2b. Never lighter downwards; the card is lighter than the page.
    for (let i = 1; i < darkLevels.length; i++) {
      const prev = darkLevels[i - 1];
      const cur = darkLevels[i];
      if (cur.L < prev.L - 0.05) {
        errors.push(`dark: ${cur.level} (L ${cur.L.toFixed(1)}) is darker than ${prev.level} (L ${prev.L.toFixed(1)})`);
      }
    }
    if (!(raised.L > base.L + 0.05)) {
      errors.push(`dark: ${raised.level} (L ${raised.L.toFixed(1)}) must be lighter than the page ${base.level} (L ${base.L.toFixed(1)})`);
    }
    // 2c. At most two tone steps above the page, each 2 to 5 points, the top within 8.
    const tones = [];
    for (const level of [raised, elevated, overlay]) {
      if (!tones.some((L) => Math.abs(L - level.L) < 0.05)) tones.push(level.L);
    }
    tones.sort((a, b) => a - b);
    if (tones.length > DARK_MAX_TONE_STEPS) {
      errors.push(`dark: raised, elevated and overlay use ${tones.length} distinct tones above the page (at most ${DARK_MAX_TONE_STEPS})`);
    }
    let previousL = base.L;
    for (const L of tones) {
      const step = L - previousL;
      if (step < DARK_MIN_TONE_STEP || step > DARK_MAX_TONE_STEP) {
        errors.push(`dark: a tone step of ${step.toFixed(1)} OKLCH L points (L ${previousL.toFixed(1)} → ${L.toFixed(1)}); each must be ${DARK_MIN_TONE_STEP}–${DARK_MAX_TONE_STEP}`);
      }
      previousL = L;
    }
    const total = previousL - base.L;
    if (total > DARK_MAX_TOTAL) {
      errors.push(`dark: the top surface is ${total.toFixed(1)} OKLCH L points above the page (at most ${DARK_MAX_TOTAL})`);
    }
    // 2d. The overlay is told apart by its edge, and the card by its hairline.
    const merged = {};
    for (const scope of [light, dark]) for (const [prop, value] of scope) merged[prop] = value;
    const rim = resolveTokenPaint(merged, OVERLAY_EDGE_TOKEN);
    if (!rim) {
      errors.push(`dark: ${OVERLAY_EDGE_TOKEN} is missing or not a colour with alpha`);
    } else {
      const edge = compositeOver(rim, overlay.color);
      const rows = [];
      for (const [against, min] of [
        [base, OVERLAY_EDGE_MIN_CONTRAST],
        [raised, OVERLAY_EDGE_MIN_CONTRAST],
        [overlay, OVERLAY_EDGE_MIN_CONTRAST_SELF],
      ]) {
        const ratio = wcagContrast(edge, against.color);
        rows.push(`${against.level.replace('surface-', '')} ${ratio.toFixed(2)}:1`);
        if (ratio < min) {
          errors.push(`dark: ${OVERLAY_EDGE_TOKEN} over the overlay (${edge}) on --color-${against.level} is ${ratio.toFixed(2)}:1 (needs ≥ ${min}:1)`);
        }
      }
      report.dark.overlayEdge = rows;
    }
    const hairline = resolveVar(CARD_EDGE_TOKEN, themes.dark);
    if (!hairline || lightness(hairline) === undefined) {
      errors.push(`dark: ${CARD_EDGE_TOKEN} is missing or not a resolvable color (got ${hairline})`);
    } else {
      report.dark.edge = [];
      for (const against of [base, raised]) {
        const ratio = wcagContrast(hairline, against.color);
        report.dark.edge.push(`${against.level} ${ratio.toFixed(2)}:1`);
        if (ratio < CARD_EDGE_MIN_CONTRAST) {
          errors.push(`dark: ${CARD_EDGE_TOKEN} (${hairline}) on --color-${against.level} is ${ratio.toFixed(2)}:1 (needs ≥ ${CARD_EDGE_MIN_CONTRAST}:1)`);
        }
      }
    }
    // 2e. Hover on an overlay is lighter than it; a tooltip is not darker than it.
    const hover = resolveVar('--color-surface-overlay-hover', themes.dark);
    if (!hover || !(lightness(hover) > overlay.L)) {
      errors.push(`dark: --color-surface-overlay-hover (${hover}) must be lighter than --color-surface-overlay`);
    }
    const tooltip = resolveVar('--color-tooltip-bg', themes.dark);
    if (tooltip && lightness(tooltip) !== undefined && lightness(tooltip) < overlay.L) {
      errors.push(`dark: --color-tooltip-bg (${tooltip}) is darker than --color-surface-overlay; tooltips must float lighter`);
    }
  }

  for (const [theme, scopes] of Object.entries(themes)) {
    for (const token of TEXT_TOKENS) {
      const text = resolveVar(token, scopes);
      if (!text || lightness(text) === undefined) {
        errors.push(`${theme}: ${token} is missing or not a resolvable color (got ${text})`);
        continue;
      }
      const failing = [...report[theme], ...(inset[theme] ? [inset[theme]] : [])]
        .map((surface) => ({ surface, ratio: wcagContrast(text, surface.color) }))
        .filter(({ ratio }) => ratio < MIN_TEXT_CONTRAST);
      for (const { surface, ratio } of failing) {
        errors.push(
          `${theme}: ${token} (${text}) on --color-${surface.level} is ${ratio.toFixed(2)}:1 (needs ≥ ${MIN_TEXT_CONTRAST}:1)`,
        );
      }
    }
  }

  for (const relative of FLOATING_COMPONENTS) {
    const file = path.join(root, relative);
    if (!fs.existsSync(file)) {
      errors.push(`${relative}: floating component not found (update FLOATING_COMPONENTS)`);
      continue;
    }
    const source = fs.readFileSync(file, 'utf8');
    // The thick material (and its layer form) IS the overlay surface at partial
    // alpha: --color-material-thick is a mix of --color-surface-overlay, and its
    // fallbacks are that surface itself.
    if (!/(?<![\w:-])(bg-surface-overlay|material-thick|material-layer-thick)(?![\w-])/.test(source)) {
      errors.push(`${relative}: floating panel must use bg-surface-overlay or the thick material`);
    }
    const lower = [...new Set(source.match(LOWER_SURFACE_CLASS) ?? [])];
    if (lower.length > 0) {
      errors.push(`${relative}: uses surface class below overlay (${lower.join(', ')})`);
    }
  }

  for (const theme of Object.keys(report)) {
    const row = report[theme]
      .map((r) => `${r.level.replace('surface-', '')} ${r.color} L${r.L.toFixed(1)}`)
      .join(' → ');
    const edgeNote =
      (report[theme].edge ? ` · card edge ${report[theme].edge.join(', ')}` : '') +
      (report[theme].overlayEdge ? ` · overlay rim ${report[theme].overlayEdge.join(', ')}` : '');
    const insetNote = inset[theme] ? ` · inset ${inset[theme].color} L${inset[theme].L.toFixed(1)}` : '';
    log(`  ${theme}: ${row}${insetNote}${edgeNote}`);
  }

  return errors;
}

const invokedDirectly = import.meta.url === pathToFileURL(process.argv[1] ?? '').href;
if (invokedDirectly) {
  console.log('🔍 Checking surface elevation levels...');
  // Optional path, so the guard can be run against another revision of the stylesheet.
  const errors = checkSurfaceElevation(process.argv[2] ? { cssPath: path.resolve(process.argv[2]) } : {});
  if (errors.length > 0) {
    console.error('❌ Surface elevation check failed:');
    errors.forEach((e) => console.error(`   - ${e}`));
    process.exit(1);
  }
  console.log('✅ Surface elevation levels valid');
}
