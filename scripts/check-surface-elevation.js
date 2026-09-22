#!/usr/bin/env node
/**
 * Surface elevation guard for dark mode.
 *
 * Shadows don't read on dark backgrounds, so elevation must come from lightness. This check:
 * 1. Resolves the four semantic surface levels (`--color-surface-base|raised|elevated|overlay`)
 *    from `src/app.css` in both themes (`.dark` overrides `@theme`) and requires all four to exist.
 * 2. Dark mode: OKLCH lightness must strictly increase base → raised → elevated → overlay,
 *    with every step between MIN_STEP and MAX_STEP points (L × 100).
 * 3. Dark mode: `--color-surface-overlay-hover` must be lighter than the overlay, and
 *    `--color-tooltip-bg` must not be darker than the overlay.
 * 4. Floating components (modals, sheets, menus, toasts) must paint `bg-surface-overlay`
 *    and must not use a lower surface class for their panel.
 * 5. Both themes: text tokens (`TEXT_TOKENS`) must reach WCAG AA (MIN_TEXT_CONTRAST) on every
 *    surface level, so secondary text stays readable wherever a component is placed.
 *
 * Run standalone (`node scripts/check-surface-elevation.js`) or via `scripts/validate-theme.js`.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import postcss from 'postcss';
import { converter, wcagContrast, wcagLuminance } from 'culori';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const appCssPath = path.join(root, 'src', 'app.css');

export const SURFACE_LEVELS = ['surface-base', 'surface-raised', 'surface-elevated', 'surface-overlay'];
export const MIN_STEP = 5;
export const MAX_STEP = 8;

/** Text tokens that must stay readable on every surface level, in both themes. */
export const TEXT_TOKENS = ['--color-headline', '--color-body', '--color-label', '--color-description', '--color-caption'];
export const MIN_TEXT_CONTRAST = 4.5;

/** Components whose panel floats above all content → must use the overlay level. */
export const FLOATING_COMPONENTS = [
  'src/components/molecules/Modal.svelte',
  'src/components/molecules/SlideUp.svelte',
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

function resolveVar(name, scopes, seen = new Set()) {
  if (seen.has(name)) throw new Error(`circular var() reference at ${name}`);
  seen.add(name);
  let value;
  for (const scope of scopes) {
    if (scope.has(name)) { value = scope.get(name); break; }
  }
  if (value === undefined) return undefined;
  const match = value.match(/^var\(\s*(--[\w-]+)\s*(?:,\s*(.+))?\)$/);
  if (!match) return value;
  return resolveVar(match[1], scopes, seen) ?? match[2]?.trim();
}

function lightness(color) {
  const parsed = toOklch(color);
  if (!parsed) return undefined;
  return parsed.l * 100;
}

export function checkSurfaceElevation({ log = console.log } = {}) {
  const errors = [];
  const css = fs.readFileSync(appCssPath, 'utf8');
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

  const darkLevels = report.dark;
  if (darkLevels.length === SURFACE_LEVELS.length) {
    for (let i = 1; i < darkLevels.length; i++) {
      const prev = darkLevels[i - 1];
      const cur = darkLevels[i];
      const step = cur.L - prev.L;
      if (step <= 0) {
        errors.push(`dark: ${cur.level} (L ${cur.L.toFixed(1)}) is not lighter than ${prev.level} (L ${prev.L.toFixed(1)})`);
      } else if (step < MIN_STEP || step > MAX_STEP) {
        errors.push(`dark: ${prev.level} → ${cur.level} steps ${step.toFixed(1)} OKLCH L points (allowed ${MIN_STEP}–${MAX_STEP})`);
      }
    }
    const overlayL = darkLevels[darkLevels.length - 1].L;
    const hover = resolveVar('--color-surface-overlay-hover', themes.dark);
    if (!hover || !(lightness(hover) > overlayL)) {
      errors.push(`dark: --color-surface-overlay-hover (${hover}) must be lighter than --color-surface-overlay`);
    }
    const tooltip = resolveVar('--color-tooltip-bg', themes.dark);
    if (tooltip && lightness(tooltip) !== undefined && lightness(tooltip) < overlayL) {
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
      const failing = report[theme]
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
    if (!/(?<![\w:-])bg-surface-overlay(?![\w-])/.test(source)) {
      errors.push(`${relative}: floating panel must use bg-surface-overlay`);
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
    log(`  ${theme}: ${row}`);
  }

  return errors;
}

const invokedDirectly = import.meta.url === pathToFileURL(process.argv[1] ?? '').href;
if (invokedDirectly) {
  console.log('🔍 Checking surface elevation levels...');
  const errors = checkSurfaceElevation();
  if (errors.length > 0) {
    console.error('❌ Surface elevation check failed:');
    errors.forEach((e) => console.error(`   - ${e}`));
    process.exit(1);
  }
  console.log('✅ Surface elevation levels valid');
}
