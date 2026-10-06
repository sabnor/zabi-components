import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import postcss from 'postcss';
import {
  readThemeMaps,
  resolveTokenColor,
  resolveTokenValue,
} from '../scripts/resolve-tokens.js';
import { generateSurfaceLadder } from '../tokens/surface-ladder.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const snapshotFile = path.join(__dirname, '__snapshots__', 'theme-output.snap.json');
const targetFiles = [
  'dist/zabi-components-theme.css',
  'dist/zabi-components-theme-only.css',
  'dist/zabi-components-theme-dark-only.css',
  'dist/zabi-components-colors.css',
];

function hashFile(absolutePath) {
  const content = fs.readFileSync(absolutePath);
  return createHash('sha256').update(content).digest('hex');
}

function getCurrentHashes() {
  return targetFiles.reduce((acc, relativePath) => {
    acc[relativePath] = hashFile(path.join(projectRoot, relativePath));
    return acc;
  }, {});
}

function runBuildCss() {
  const result = spawnSync('npm', ['run', 'build:css'], {
    cwd: projectRoot,
    encoding: 'utf8',
  });
  if (result.status !== 0) {
    throw new Error(`build:css failed:\n${result.stdout}\n${result.stderr}`);
  }
}

test('theme output generation is deterministic across consecutive builds', () => {
  runBuildCss();
  const first = getCurrentHashes();
  runBuildCss();
  const second = getCurrentHashes();
  assert.deepEqual(second, first);
});

test('theme output hashes match frozen snapshots', () => {
  const current = getCurrentHashes();

  if (process.env.UPDATE_SNAPSHOTS === '1') {
    fs.writeFileSync(snapshotFile, `${JSON.stringify(current, null, 2)}\n`, 'utf8');
  }

  const expected = JSON.parse(fs.readFileSync(snapshotFile, 'utf8'));
  assert.deepEqual(current, expected);
});

/* ------------------------------------------------------------------
 * Theming foundation: any brand through tokens alone.
 *
 * Everything below reads the BUILT css (the two tests above have just built
 * it), because that is what an app imports. The claim under test is the one
 * an app relies on:
 *
 *   @import "zabi-components/theme-only";
 *   @import "zabi-components/theme-dark-only";
 *   :root { --zabi-brand-600: …; --zabi-accent-600: …; --zabi-base-900: …; }
 *
 * restyles light AND dark, with no second declaration. It used not to: the
 * dark block restated every --zabi-* ramp and pinned --color-base-* and the
 * surface levels to hex.
 * ------------------------------------------------------------------ */

const read = (relativePath) => fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');

/** The two ways an app gets both themes: the token files, or the colours file. */
const TOKEN_SOURCES = {
  'theme-only + theme-dark-only': () =>
    readThemeMaps(`${read('dist/zabi-components-theme-only.css')}\n${read('dist/zabi-components-theme-dark-only.css')}`),
  colors: () => readThemeMaps(read('dist/zabi-components-colors.css')),
};

const DARK_FILES = [
  'dist/zabi-components-theme-dark.css',
  'dist/zabi-components-theme-dark-only.css',
  'dist/zabi-components-colors.css',
  'dist/zabi-components.css',
];

const SCALE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const BASE_STEPS = [50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 925, 950];

/** A warm amber brand, a pink accent and a warm (stone) grey: nothing like the defaults. */
const AMBER = ['#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f', '#451a03'];
const PINK = ['#fdf2f8', '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6', '#ec4899', '#db2777', '#be185d', '#9d174d', '#831843', '#500724'];
const STONE = ['#fafaf9', '#f5f5f4', '#e7e5e4', '#d6d3d1', '#a8a29e', '#78716c', '#57534e', '#44403c', '#292524', '#1c1917', '#0c0a09'];

function midpoint(a, b) {
  const channels = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const [x, y] = [channels(a), channels(b)];
  return '#' + x.map((c, i) => Math.round((c + y[i]) / 2).toString(16).padStart(2, '0')).join('');
}

const scale = (hexes) => Object.fromEntries(SCALE_STEPS.map((step, i) => [step, hexes[i]]));
const amber = scale(AMBER);
const pink = scale(PINK);
/** The neutral ramp has 21 steps; the ten in-between ones are the midpoints of their neighbours. */
const stone = (() => {
  const out = scale(STONE);
  for (const step of BASE_STEPS) {
    if (out[step]) continue;
    const below = [...SCALE_STEPS].reverse().find((s) => s < step);
    const above = SCALE_STEPS.find((s) => s > step);
    out[step] = midpoint(out[below], out[above]);
  }
  return out;
})();

const overrideOf = (name, values) =>
  Object.fromEntries(Object.entries(values).map(([step, hex]) => [`--zabi-${name}-${step}`, hex]));

/**
 * What the page computes after an app declares `overrides` once, on :root.
 * Light is the theme with the override on top. Dark is that with the dark
 * block on top — the dark block must not declare any overridden name, which is
 * asserted separately, so the order of the app's file and the dark file in the
 * cascade cannot matter.
 */
function themed({ light, darkOnly }, overrides) {
  const lightMap = { ...light, ...overrides };
  return { light: lightMap, dark: { ...lightMap, ...darkOnly } };
}

function darkTokenRules(css) {
  const rules = [];
  postcss.parse(css).walkRules((rule) => {
    const selectors = (rule.selectors ?? [rule.selector]).map((s) => s.trim());
    const isDark = selectors.includes('.dark') || selectors.includes('[data-theme="auto"]');
    if (isDark && rule.some((node) => node.type === 'decl' && node.prop.startsWith('--'))) rules.push(rule);
  });
  return rules;
}

/**
 * What a rule declares in a current browser, as [prop, value] in order.
 *
 * In the compiled bundle Tailwind rewrites a `color-mix()` over theme
 * variables into two declarations: the mix with the default values inlined,
 * then the real one inside `@supports (color: color-mix(in lab, red, red))
 * { & { … } }`. A browser without `color-mix()` keeps the first and gets the
 * default dark surfaces, which follow nothing — what every browser got before
 * this. Every browser Tailwind v4 itself supports takes the second, so that is
 * the declaration that counts.
 */
function effectiveDeclarations(rule) {
  const map = new Map();
  rule.each((node) => {
    if (node.type === 'decl') map.set(node.prop, node.value.trim());
    if (node.type === 'atrule' && node.name === 'supports' && /color-mix\(/.test(node.params)) {
      node.walkDecls((decl) => map.set(decl.prop, decl.value.trim()));
    }
  });
  return [...map];
}

test('the dark block declares no raw palette, in every published file', () => {
  for (const file of DARK_FILES) {
    const rules = darkTokenRules(read(file));
    assert.equal(rules.length, 2, `${file}: expected the .dark rule and its data-theme="auto" copy`);
    for (const rule of rules) {
      const declared = effectiveDeclarations(rule);
      assert.ok(declared.length > 100, `${file}: ${rule.selector} has only ${declared.length} declarations`);
      for (const [prop, value] of declared) {
        if (!prop.startsWith('--')) continue;
        assert.ok(!prop.startsWith('--zabi-'), `${file}: ${rule.selector} restates the physical token ${prop}`);
        assert.ok(!/#[0-9a-fA-F]{3,8}\b/.test(value), `${file}: ${rule.selector} pins ${prop} to a hex literal (${value})`);
      }
    }
  }
});

test('dark is published under .dark, [data-theme="dark"] and an opt-in [data-theme="auto"]', () => {
  for (const file of DARK_FILES) {
    const root = postcss.parse(read(file));
    const [dark, auto] = darkTokenRules(read(file));

    assert.deepEqual(dark.selectors.map((s) => s.trim()), ['.dark', '[data-theme="dark"]'], file);
    assert.equal(dark.parent.type, 'root', `${file}: .dark must not sit inside a media query`);

    // Following the OS is opt-in: the only thing a dark media query may switch
    // is [data-theme="auto"]. A bare :root or .dark in there would turn every
    // page without the attribute dark on a dark system.
    assert.deepEqual(auto.selectors.map((s) => s.trim()), ['[data-theme="auto"]'], file);
    assert.equal(auto.parent.type, 'atrule', file);
    assert.equal(auto.parent.params.replace(/\s+/g, ' ').trim(), '(prefers-color-scheme: dark)', file);
    root.walkAtRules('media', (media) => {
      if (!/prefers-color-scheme:\s*dark/.test(media.params)) return;
      media.walkRules((rule) => {
        if (!rule.some((node) => node.type === 'decl' && node.prop.startsWith('--color-'))) return;
        // Tailwind's nested `& { … }` inside the auto rule is the auto rule.
        if (rule.selector.trim() === '&' && rule.parent?.parent?.selector?.trim() === '[data-theme="auto"]') return;
        assert.deepEqual(rule.selectors.map((s) => s.trim()), ['[data-theme="auto"]'], `${file}: ${rule.selector} follows the OS without opting in`);
      });
    });

    assert.deepEqual(effectiveDeclarations(auto), effectiveDeclarations(dark), `${file}: the two dark blocks differ`);

    // color-scheme travels with the tokens: the class did not set it before
    // 8.1, and a `.dark` page kept light date pickers and scrollbars.
    const schemeOf = (rule) => {
      const found = [];
      rule.walkDecls('color-scheme', (decl) => found.push(decl.value.trim()));
      return found;
    };
    assert.deepEqual(schemeOf(dark), ['dark'], `${file}: .dark, [data-theme="dark"] sets color-scheme: dark`);
    assert.deepEqual(schemeOf(auto), ['dark'], `${file}: [data-theme="auto"] sets it in the dark media query`);

    // The attribute-only rules say what the tokens cannot, and come first, so
    // that on `class="dark" data-theme="light"` the rule with the tokens wins.
    const order = [];
    root.walkRules((rule) => {
      if (rule.some((node) => node.type === 'decl' && node.prop === 'color-scheme')) {
        order.push(`${rule.selectors.map((s) => s.trim()).join(', ')} = ${schemeOf(rule).join('/')}`);
      }
    });
    // A file that also carries the light tokens starts with the light theme's
    // own rule: light on the root, which every rule after it can override.
    const carriesLight = file.endsWith('colors.css') || file.endsWith('zabi-components.css');
    assert.equal(order[0] === ':root, [data-theme="light"] = light', carriesLight, `${file}: ${order[0]}`);
    if (carriesLight) order.shift();
    assert.ok(!order.some((entry) => entry.startsWith(':root')), `${file}: a second root color-scheme rule`);
    assert.deepEqual(
      order.slice(0, 4),
      [
        '[data-theme="light"] = light',
        '[data-theme="dark"] = dark',
        '[data-theme="auto"] = light dark',
        '.dark, [data-theme="dark"] = dark',
      ],
      file,
    );
  }
});

for (const [sourceName, load] of Object.entries(TOKEN_SOURCES)) {
  test(`${sourceName}: the default theme resolves to the values it always had`, () => {
    const { light, dark } = load();
    const expected = {
      light: {
        '--color-action-primary': '#4f68da',
        '--color-action-primary-text': '#ffffff',
        '--color-on-brand': '#ffffff',
        '--color-focus-ring': '#4f68da',
        // Light did not move when the two roles below were added: the muted
        // ring and an empty star are still the grey they always were.
        '--color-border-strong': '#71717a',
        '--color-control-border': '#71717a',
        '--color-focus-ring-muted': '#71717a',
        // The pressed Select trigger: a step past hover (#f4f4f5).
        '--color-input-active': '#e4e4e7',
        '--color-link': '#3c52ba',
        '--color-surface-base': '#fafafa',
        '--color-surface-raised': '#ffffff',
        '--color-headline': '#18181b',
        '--color-accent': '#5d7900',
        '--color-on-accent': '#ffffff',
        '--color-energetic': '#5d7900',
      },
      dark: {
        '--color-action-primary': '#92a9ff',
        '--color-action-primary-text': '#111d49',
        '--color-on-brand': '#111d49',
        '--color-focus-ring': '#92a9ff',
        '--color-nav-menu-focus': '#92a9ff',
        // The decorative edge stays on the mirror's fixed point; the two roles
        // that need 3:1 on the dark elevated and overlay surfaces are pinned
        // one step lighter.
        '--color-border-strong': '#71717a',
        '--color-control-border': '#a1a1aa',
        '--color-focus-ring-muted': '#a1a1aa',
        '--color-input-active': '#333338',
        '--color-link': '#b5c6ff',
        // The ladder was four baked hex values; it is now color-mix() over the
        // neutral ramp and has to land on exactly the same four.
        '--color-surface-base': '#18181b',
        '--color-surface-raised': '#262629',
        '--color-surface-elevated': '#363638',
        '--color-surface-overlay': '#454547',
        '--color-surface-overlay-hover': '#52525b',
        '--color-headline': '#f4f4f5',
        '--color-base-50': '#09090b',
        '--color-base-950': '#fafafa',
        '--color-accent': '#99b55e',
        '--color-on-accent': '#192300',
        '--color-energetic': '#99b55e',
      },
    };
    for (const [token, hex] of Object.entries(expected.light)) assert.equal(resolveTokenColor(light, token), hex, `light ${token}`);
    for (const [token, hex] of Object.entries(expected.dark)) assert.equal(resolveTokenColor(dark, token), hex, `dark ${token}`);
  });

  test(`${sourceName}: one :root override of --zabi-brand-* restyles light and dark`, () => {
    const maps = load();
    const overrides = overrideOf('brand', amber);
    for (const name of Object.keys(overrides)) assert.ok(!(name in maps.darkOnly), `dark re-declares ${name}`);
    const { light, dark } = themed(maps, overrides);

    const expected = {
      light: {
        '--color-action-primary': amber[600],
        '--color-action-primary-hover': amber[700],
        '--color-action-primary-active': amber[800],
        '--color-action-primary-subtle': amber[100],
        '--color-primary': amber[600],
        '--color-focus-ring': amber[600],
        '--color-nav-menu-focus': amber[600],
        '--color-link': amber[700],
        '--color-link-hover': amber[800],
        '--color-nav-menu-active': amber[100],
      },
      dark: {
        '--color-action-primary': amber[400],
        '--color-action-primary-hover': amber[300],
        '--color-action-primary-active': amber[200],
        '--color-action-primary-subtle': amber[900],
        '--color-primary': amber[400],
        '--color-focus-ring': amber[400],
        '--color-nav-menu-focus': amber[400],
        '--color-link': amber[300],
        '--color-link-hover': amber[200],
        '--color-nav-menu-active': amber[900],
        // The dark label is the dark end of whatever ramp the app supplied.
        '--color-action-primary-text': amber[950],
      },
    };
    for (const [token, hex] of Object.entries(expected.light)) assert.equal(resolveTokenColor(light, token), hex, `light ${token}`);
    for (const [token, hex] of Object.entries(expected.dark)) assert.equal(resolveTokenColor(dark, token), hex, `dark ${token}`);

    // Nothing may be left on the default brand: any token that resolved to a
    // default brand step has to have moved, in both themes.
    const defaults = { light: maps.light, dark: maps.dark };
    const brandHex = new Set(SCALE_STEPS.map((step) => resolveTokenColor(maps.light, `--zabi-brand-${step}`)));
    for (const [theme, map] of Object.entries({ light, dark })) {
      for (const token of Object.keys(map)) {
        if (!brandHex.has(resolveTokenColor(defaults[theme], token))) continue;
        assert.ok(!brandHex.has(resolveTokenColor(map, token)), `${theme} ${token} is still the default brand colour`);
      }
    }
  });

  test(`${sourceName}: the "on brand" label is set per theme from :root`, () => {
    const maps = load();
    // Amber-600 cannot carry white (3.19:1), which is the case the token exists for.
    const lightOnly = themed(maps, { ...overrideOf('brand', amber), '--zabi-on-brand': amber[950] });
    assert.equal(resolveTokenColor(lightOnly.light, '--color-action-primary-text'), amber[950]);
    assert.equal(resolveTokenColor(lightOnly.dark, '--color-action-primary-text'), amber[950]);

    const both = themed(maps, { '--zabi-on-brand': '#000000', '--zabi-on-brand-dark': '#ffffff' });
    assert.equal(resolveTokenColor(both.light, '--color-action-primary-text'), '#000000');
    assert.equal(resolveTokenColor(both.dark, '--color-action-primary-text'), '#ffffff');
    assert.equal(resolveTokenColor(both.light, '--color-on-brand'), '#000000');
    assert.equal(resolveTokenColor(both.dark, '--color-on-brand'), '#ffffff');

    // The dark knob alone must leave light as it was.
    const darkKnob = themed(maps, { '--zabi-on-brand-dark': '#ffffff' });
    assert.equal(resolveTokenColor(darkKnob.light, '--color-action-primary-text'), '#ffffff');
    assert.equal(resolveTokenColor(darkKnob.dark, '--color-action-primary-text'), '#ffffff');
    const lightKnob = themed(maps, { '--zabi-on-brand': '#000000' });
    assert.equal(resolveTokenColor(lightKnob.dark, '--color-action-primary-text'), '#111d49');
  });

  test(`${sourceName}: one :root override of --zabi-accent-* restyles light and dark`, () => {
    const maps = load();
    const overrides = overrideOf('accent', pink);
    for (const name of Object.keys(overrides)) assert.ok(!(name in maps.darkOnly), `dark re-declares ${name}`);
    const { light, dark } = themed(maps, overrides);

    const expected = {
      light: {
        '--color-accent': pink[600],
        '--color-accent-hover': pink[700],
        '--color-accent-active': pink[800],
        '--color-accent-subtle': pink[100],
        '--color-accent-border': pink[200],
        '--color-accent-text': pink[700],
        '--color-on-accent': '#ffffff',
      },
      dark: {
        '--color-accent': pink[400],
        '--color-accent-hover': pink[300],
        '--color-accent-active': pink[200],
        '--color-accent-subtle': pink[900],
        '--color-accent-border': pink[800],
        '--color-accent-text': pink[300],
        '--color-on-accent': pink[950],
      },
    };
    for (const [token, hex] of Object.entries(expected.light)) assert.equal(resolveTokenColor(light, token), hex, `light ${token}`);
    for (const [token, hex] of Object.entries(expected.dark)) assert.equal(resolveTokenColor(dark, token), hex, `dark ${token}`);

    for (const [theme, map] of Object.entries({ light, dark })) {
      for (const step of SCALE_STEPS) {
        const mirrored = theme === 'dark' ? 1000 - step : step;
        assert.equal(resolveTokenColor(map, `--color-accent-${step}`), pink[mirrored], `${theme} --color-accent-${step}`);
      }
      // `energetic` is citron itself, not the accent: it stays where it was.
      assert.equal(
        resolveTokenColor(map, '--color-energetic'),
        resolveTokenColor(theme === 'dark' ? maps.dark : maps.light, '--color-energetic'),
        `${theme} --color-energetic moved with the accent`,
      );
    }
  });

  test(`${sourceName}: one :root override of --zabi-base-* restyles light and dark, surfaces included`, () => {
    const maps = load();
    const overrides = overrideOf('base', stone);
    for (const name of Object.keys(overrides)) assert.ok(!(name in maps.darkOnly), `dark re-declares ${name}`);
    const { light, dark } = themed(maps, overrides);

    // The four dark levels an app's neutral produces, from the same ladder the
    // build uses: its step 50 washed over its step 900.
    const ladder = generateSurfaceLadder(stone);

    const expected = {
      light: {
        '--color-surface-base': stone[50],
        '--color-surface-elevated': stone[100],
        '--color-surface-inset': stone[100],
        '--color-headline': stone[900],
        '--color-body': stone[800],
        '--color-description': stone[600],
        '--color-border': stone[300],
        '--color-input-border': stone[500],
        '--color-neutral-subtle': stone[200],
        '--color-action-disabled': stone[250],
        '--color-tooltip-bg': stone[800],
      },
      dark: {
        '--color-surface-base': ladder['surface-base'],
        '--color-surface-raised': ladder['surface-raised'],
        '--color-surface-elevated': ladder['surface-elevated'],
        '--color-surface-overlay': ladder['surface-overlay'],
        '--color-surface-overlay-hover': stone[600],
        '--color-surface-inset': stone[850],
        '--color-card': ladder['surface-raised'],
        '--color-background': stone[900],
        '--color-headline': stone[100],
        '--color-body': stone[200],
        '--color-description': stone[300],
        '--color-border': stone[700],
        '--color-input-border': stone[500],
        '--color-neutral-subtle': stone[700],
        '--color-action-disabled': stone[800],
        '--color-tooltip-bg': stone[200],
      },
    };
    assert.equal(ladder['surface-base'], stone[900]);
    for (const [token, hex] of Object.entries(expected.light)) assert.equal(resolveTokenColor(light, token), hex, `light ${token}`);
    for (const [token, hex] of Object.entries(expected.dark)) assert.equal(resolveTokenColor(dark, token), hex, `dark ${token}`);

    for (const [theme, map] of Object.entries({ light, dark })) {
      for (const step of BASE_STEPS) {
        const mirrored = theme === 'dark' ? 1000 - step : step;
        assert.equal(resolveTokenColor(map, `--color-base-${step}`), stone[mirrored], `${theme} --color-base-${step}`);
      }
    }

    // No role may still resolve to one of the default greys, or to one of the
    // default dark surface levels, in either theme.
    const defaultGreys = new Set([
      ...BASE_STEPS.map((step) => resolveTokenColor(maps.light, `--zabi-base-${step}`)),
      ...Object.values(generateSurfaceLadder()),
    ]);
    for (const [theme, map] of Object.entries({ light, dark })) {
      for (const token of Object.keys(map)) {
        const colour = resolveTokenColor(map, token);
        assert.ok(!colour || !defaultGreys.has(colour), `${theme} ${token} is still a default grey (${colour})`);
      }
    }
  });

  test(`${sourceName}: font tokens default to today's values and follow one override`, () => {
    const { light } = load();
    assert.equal(resolveTokenValue(light, '--font-family-heading'), resolveTokenValue(light, '--font-family-sans'));
    assert.equal(resolveTokenValue(light, '--font-family-mono'), '"Monaco", "Menlo", "Ubuntu Mono", monospace');
    assert.equal(resolveTokenValue(light, '--font-weight-regular'), '400');
    assert.equal(resolveTokenValue(light, '--font-weight-normal'), '400');
    assert.equal(resolveTokenValue(light, '--font-weight-medium'), '500');
    assert.equal(resolveTokenValue(light, '--font-weight-semibold'), '600');
    assert.equal(resolveTokenValue(light, '--font-weight-bold'), '700');

    const display = { ...light, '--font-family-heading': '"Fraunces", var(--font-family-sans)', '--font-weight-regular': '300' };
    assert.equal(resolveTokenValue(display, '--font-family-heading'), `"Fraunces", ${resolveTokenValue(light, '--font-family-sans')}`);
    assert.equal(resolveTokenValue(display, '--font-weight-normal'), '300');
  });
}

test('the theme files apply the heading family to headings, below utilities', () => {
  for (const file of ['dist/zabi-components-theme.css', 'dist/zabi-components-theme-only.css', 'dist/zabi-components.css']) {
    let found = false;
    postcss.parse(read(file)).walkRules((rule) => {
      const selectors = (rule.selectors ?? [rule.selector]).map((s) => s.trim());
      if (!['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].every((h) => selectors.includes(h))) return;
      if (!rule.some((node) => node.type === 'decl' && node.prop === 'font-family' && node.value === 'var(--font-family-heading)')) return;
      // Unlayered, the rule would beat a `font-*` utility on the heading itself.
      assert.equal(rule.parent.type, 'atrule', file);
      assert.equal(`${rule.parent.name} ${rule.parent.params}`, 'layer base', file);
      found = true;
    });
    assert.ok(found, `${file}: no h1–h6 rule using --font-family-heading`);
  }
});

/**
 * The focus ring composes with Tailwind's shadow and ring utilities.
 *
 * As a plain box-shadow in `@layer components` it lost to any `shadow-*` or
 * `ring-*` utility on the same element. It is handed to
 * `--tw-ring-offset-shadow`, one of the five properties those utilities build
 * their box-shadow from, and painted from the same five when no utility is
 * there. playwright/focus-ring.spec.ts measures the result in a browser; this
 * holds the published rule to the shape that makes it work.
 */
test('the focus ring is drawn through the channel shadow utilities compose', () => {
  const channel = ['--tw-inset-shadow', '--tw-inset-ring-shadow', '--tw-ring-offset-shadow', '--tw-ring-shadow', '--tw-shadow'];
  for (const file of ['dist/zabi-components-theme.css', 'dist/zabi-components-theme-only.css', 'dist/zabi-components.css']) {
    for (const selector of ['.focus-ring:focus-visible', '.focus-brand:focus-visible', '.focus-nav:focus-visible']) {
      const rules = [];
      postcss.parse(read(file)).walkRules((rule) => {
        const selectors = (rule.selectors ?? [rule.selector]).map((s) => s.trim());
        // The forced-colours rule lists the same selector; it sets an outline, not a shadow.
        if (selectors.includes(selector) && rule.some((node) => node.type === 'decl' && node.prop === 'box-shadow')) rules.push(rule);
      });
      assert.equal(rules.length, 1, `${file}: one ${selector} rule with a box-shadow`);
      const [rule] = rules;
      // Below utilities, so that a utility's box-shadow is the one that carries the ring.
      assert.equal(`${rule.parent.name} ${rule.parent.params}`, 'layer components', file);
      const value = (prop) => rule.nodes.find((node) => node.type === 'decl' && node.prop === prop)?.value.replace(/\s+/g, ' ');
      assert.equal(
        value('--tw-ring-offset-shadow'),
        '0 0 0 2px var(--zabi-focus-ring-offset-color), 0 0 0 4px var(--zabi-focus-ring-color)',
        `${file} ${selector}: the 2px gap, then the 2px ring`,
      );
      const shadow = value('box-shadow');
      const positions = channel.map((name) => shadow.indexOf(`var(${name}`));
      assert.ok(positions.every((at) => at >= 0), `${file} ${selector}: box-shadow reads all five properties (${shadow})`);
      assert.deepEqual([...positions].sort((a, b) => a - b), positions, `${file} ${selector}: in Tailwind's order`);
      // A literal ring here would be dropped by the first utility on the element.
      assert.ok(!/\d+px/.test(shadow), `${file} ${selector}: no ring written into box-shadow itself (${shadow})`);
    }
  }
});

/**
 * No token is ever removed or renamed without someone deciding to.
 *
 * The hash snapshot above cannot say that: it changes on every edit, and
 * refreshing it accepts a removal as readily as an addition. This list only
 * grows. UPDATE_SNAPSHOTS=1 adds new names; a name that has gone missing fails
 * either way, and taking it out of the list is a hand edit — that is, a
 * breaking change somebody signed off.
 */
test('no published token has been removed or renamed', () => {
  const namesFile = path.join(__dirname, '__snapshots__', 'theme-token-names.snap.json');
  const { light, darkOnly } = readThemeMaps(read('dist/zabi-components-colors.css'));
  const current = new Set([...Object.keys(light), ...Object.keys(darkOnly)]);
  const frozen = JSON.parse(fs.readFileSync(namesFile, 'utf8'));

  if (process.env.UPDATE_SNAPSHOTS === '1') {
    const merged = [...new Set([...frozen, ...current])].sort();
    fs.writeFileSync(namesFile, `${JSON.stringify(merged, null, 2)}\n`, 'utf8');
  }

  const expected = JSON.parse(fs.readFileSync(namesFile, 'utf8'));
  const removed = expected.filter((name) => !current.has(name));
  assert.deepEqual(removed, [], 'tokens removed or renamed');
  const unrecorded = [...current].filter((name) => !expected.includes(name)).sort();
  assert.deepEqual(unrecorded, [], 'new tokens not recorded yet: run UPDATE_SNAPSHOTS=1 npm run test:themes');
});
