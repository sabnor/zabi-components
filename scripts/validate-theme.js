import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import {
  DARK_CLASS,
  DARK_ATTRIBUTE,
  LIGHT_ATTRIBUTE,
  AUTO_ATTRIBUTE,
  AUTO_MEDIA,
  LIGHT_SCHEME_SELECTORS,
} from './dark-selectors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '../dist');

const BASE_STEPS = [
  50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500,
  550, 600, 650, 700, 750, 800, 850, 900, 925, 950,
];
const SCALE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const REQUIRED_COLOR_SCALES = ['brand', 'citron', 'accent', 'pine', 'iris', 'warning', 'error'];
/** Physical ramps: declared once, in the light theme, and never in dark. */
const PHYSICAL_SCALES = ['brand', 'citron', 'accent', 'pine', 'iris', 'warning', 'error'];
const REQUIRED_LIGHT_SEMANTICS = [
  'color-background',
  'color-headline',
  'color-body',
  'color-description',
  'color-caption',
  'color-border',
  'color-primary',
  'color-secondary',
  'color-success',
  'color-warning',
  'color-error',
  'color-input',
  'color-card',
  'color-overlay',
  // Theming foundation: the roles and knobs an app rebrands through.
  'color-accent',
  'color-accent-hover',
  'color-accent-active',
  'color-accent-subtle',
  'color-accent-border',
  'color-accent-text',
  'color-on-accent',
  'zabi-on-accent',
  'zabi-on-accent-dark',
  'color-on-brand',
  'zabi-on-brand',
  'zabi-on-brand-dark',
  'color-action-primary-text',
  'font-family-sans',
  'font-family-heading',
  'font-family-mono',
  'font-weight-regular',
  'font-weight-medium',
  'font-weight-bold',
];
const REQUIRED_DARK_OVERRIDES = [
  'color-input',
  'color-input-border',
  'color-card',
  'color-overlay',
  'color-action-danger',
  'color-surface-base',
  'color-surface-raised',
  'color-surface-elevated',
  'color-surface-overlay',
  'color-on-brand',
  'color-on-accent',
  'color-accent-subtle',
  'color-accent-border',
  // Dark REMAPS every semantic step; it must not restate a physical ramp.
  // It used to be required to (--zabi-base-*, --zabi-brand-* …, "for
  // standalone dark imports"), and that copy is what undid an app's :root
  // override in dark mode. The requirement is now the opposite: see
  // findRawPaletteInDark below.
  ...BASE_STEPS.map((step) => `color-base-${step}`),
  ...REQUIRED_COLOR_SCALES.flatMap((scale) => SCALE_STEPS.map((step) => `color-${scale}-${step}`)),
];
/** Dark-only tokens not present in light @theme (prefer defining in @theme + mirror instead). */
const ALLOWED_DARK_ONLY_VARIABLES = new Set();

/**
 * Token names as a CSS parser sees them, in source order.
 *
 * Parsed rather than pattern-matched on purpose. A regex for `--name:` was
 * satisfied by theme files that had lost every semicolon, which a parser reads
 * as one declaration with a very long value; those files shipped in 8.0.0.
 * Only the token block counts: the component rules that follow it set custom
 * properties of their own (`--zabi-focus-ring-color`), and those are not tokens.
 */
function readTokenNames(content, isDarkTheme) {
  return readTokenDeclarations(content, isDarkTheme).map(([name]) => name);
}

/** [name, value] for every token, in source order. */
function readTokenDeclarations(content, isDarkTheme) {
  const root = postcss.parse(content);
  const names = [];
  const collect = (container) => {
    container.each((node) => {
      if (node.type === 'decl' && node.prop.startsWith('--')) {
        names.push([node.prop.slice(2), node.value.trim()]);
      }
    });
  };
  if (isDarkTheme) {
    root.walkRules((rule) => {
      const selectors = (rule.selectors ?? [rule.selector]).map((s) => s.trim());
      if (selectors.includes('.dark')) collect(rule);
    });
  } else {
    root.walkAtRules('theme', collect);
  }
  return names;
}

function extractCssVariables(content, isDarkTheme) {
  return new Set(readTokenNames(content, isDarkTheme));
}

/**
 * Dark holds no raw palette.
 *
 * A `--zabi-*` declaration in the dark block re-pins a physical ramp, and a
 * hex literal pins a role to the default greys. Either one means an app's
 * single `:root` override of `--zabi-brand-*`, `--zabi-accent-*` or
 * `--zabi-base-*` stops reaching dark mode. Dark may only point roles at the
 * ramps (`var()`, `color-mix()` over them); the alpha tints and the shadow
 * colour are `rgb()`/`rgba()` and are not ramp steps.
 */
function findRawPaletteInDark(content) {
  const problems = [];
  for (const [name, value] of readTokenDeclarations(content, true)) {
    if (name.startsWith('zabi-')) {
      problems.push(`--${name} is a physical token; declare it once, in @theme`);
    } else if (/#[0-9a-fA-F]{3,8}\b/.test(value)) {
      problems.push(`--${name}: ${value} is a hex literal; point it at a --zabi-* ramp step`);
    }
  }
  return problems;
}

function declarationList(rule) {
  const out = [];
  rule.each((node) => {
    if (node.type === 'decl') out.push(`${node.prop}:${node.value.trim()}`);
  });
  return out;
}

/**
 * Every published file with dark tokens must carry them under all three
 * selectors, with identical declarations: `.dark, [data-theme="dark"]`, and
 * `[data-theme="auto"]` inside `@media (prefers-color-scheme: dark)`. The copy
 * is generated (scripts/dark-selectors.js); this is what notices if one output
 * stops getting it, or the two blocks drift apart.
 */
function validateDarkSelectors(filePath, fileName) {
  const root = postcss.parse(fs.readFileSync(filePath, 'utf8'));
  const errors = [];
  let darkRule;
  let autoRule;
  const colorSchemes = new Map();

  root.walkRules((rule) => {
    const selectors = (rule.selectors ?? [rule.selector]).map((s) => s.trim());
    const hasTokens = rule.some((node) => node.type === 'decl' && node.prop.startsWith('--'));
    const inAutoMedia =
      rule.parent?.type === 'atrule' &&
      rule.parent.name === 'media' &&
      rule.parent.params.replace(/\s+/g, ' ').trim() === AUTO_MEDIA;
    if (hasTokens && selectors.includes(DARK_CLASS) && rule.parent?.type === 'root') {
      if (darkRule) errors.push(`more than one ${DARK_CLASS} token rule`);
      darkRule = rule;
      if (!selectors.includes(DARK_ATTRIBUTE)) {
        errors.push(`the ${DARK_CLASS} rule is not also published as ${DARK_ATTRIBUTE}`);
      }
      if (selectors.length !== 2) {
        errors.push(`unexpected selectors on the dark rule: ${selectors.join(', ')}`);
      }
    }
    if (hasTokens && inAutoMedia && selectors.length === 1 && selectors[0] === AUTO_ATTRIBUTE) {
      if (autoRule) errors.push(`more than one ${AUTO_ATTRIBUTE} token rule`);
      autoRule = rule;
    }
    if (rule.parent?.type === 'root' && selectors.length === 1) {
      rule.each((node) => {
        if (node.type === 'decl' && node.prop === 'color-scheme') colorSchemes.set(selectors[0], node.value.trim());
      });
    }
  });

  if (!darkRule) errors.push(`no ${DARK_CLASS} token rule`);
  if (!autoRule) errors.push(`no ${AUTO_ATTRIBUTE} rule inside @media ${AUTO_MEDIA}`);
  if (darkRule && autoRule) {
    const dark = declarationList(darkRule);
    const auto = declarationList(autoRule);
    if (dark.length !== auto.length || dark.some((decl, i) => decl !== auto[i])) {
      errors.push(`${AUTO_ATTRIBUTE} does not declare exactly what ${DARK_CLASS} declares (${auto.length} vs ${dark.length} declarations)`);
    }
  }
  for (const [selector, scheme] of [[LIGHT_ATTRIBUTE, 'light'], [DARK_ATTRIBUTE, 'dark'], [AUTO_ATTRIBUTE, 'light dark']]) {
    if (colorSchemes.get(selector) !== scheme) {
      errors.push(`${selector} must set color-scheme: ${scheme} (found ${colorSchemes.get(selector) ?? 'nothing'})`);
    }
  }
  // The class must say it too. It did not before 8.1, and a page switched
  // with `.dark` kept light date pickers and scrollbars on dark surfaces.
  for (const [name, rule] of [[`${DARK_CLASS}, ${DARK_ATTRIBUTE}`, darkRule], [`${AUTO_ATTRIBUTE} (in the dark media query)`, autoRule]]) {
    if (!rule) continue;
    const schemes = [];
    rule.each((node) => {
      if (node.type === 'decl' && node.prop === 'color-scheme') schemes.push(node.value.trim());
    });
    if (schemes.length !== 1 || schemes[0] !== 'dark') {
      errors.push(`${name} must set color-scheme: dark once, with its tokens (found ${schemes.join(', ') || 'nothing'})`);
    }
  }

  if (errors.length > 0) {
    console.error(`❌ Dark selectors invalid in ${fileName}:`);
    errors.forEach((error) => console.error(`   - ${error}`));
    return false;
  }
  console.log(`✓ ${fileName} carries dark under ${DARK_CLASS}, ${DARK_ATTRIBUTE} and ${AUTO_ATTRIBUTE}`);
  return true;
}

/**
 * The light theme says `color-scheme: light` on the root element and for
 * `data-theme="light"`. Without it a page with no class and no attribute left
 * the scheme to the browser, and a `light dark` meta tag on a dark system gave
 * dark native controls on light surfaces.
 *
 * The rule has to come before every rule that sets a dark or automatic scheme
 * in the same file: they have the same specificity, so the later one wins, and
 * a light rule placed after them would turn a dark page's scrollbars light.
 */
function validateLightScheme(filePath, fileName) {
  const root = postcss.parse(fs.readFileSync(filePath, 'utf8'));
  const errors = [];
  /** [selectors, value] for every rule that sets color-scheme, in source order. */
  const schemes = [];
  root.walkRules((rule) => {
    rule.each((node) => {
      if (node.type === 'decl' && node.prop === 'color-scheme') {
        schemes.push([(rule.selectors ?? [rule.selector]).map((s) => s.trim()), node.value.trim()]);
      }
    });
  });
  const isLightRule = ([selectors, value]) =>
    value === 'light' &&
    selectors.length === LIGHT_SCHEME_SELECTORS.length &&
    LIGHT_SCHEME_SELECTORS.every((selector) => selectors.includes(selector));
  const at = schemes.findIndex(isLightRule);
  if (at === -1) {
    errors.push(`no ${LIGHT_SCHEME_SELECTORS.join(', ')} { color-scheme: light } rule`);
  } else {
    if (schemes.filter(isLightRule).length > 1) errors.push('more than one light color-scheme rule');
    const before = schemes.slice(0, at).filter(([, value]) => value !== 'light');
    if (before.length > 0) {
      errors.push(
        `the light color-scheme rule comes after ${before.map(([selectors]) => selectors.join(', ')).join(' and ')}, which it would then override`,
      );
    }
  }
  if (errors.length > 0) {
    console.error(`❌ Light color-scheme invalid in ${fileName}:`);
    errors.forEach((error) => console.error(`   - ${error}`));
    return false;
  }
  console.log(`✓ ${fileName} says color-scheme: light for the root and ${LIGHT_ATTRIBUTE}, before any dark rule`);
  return true;
}

/** Classes the components need that Tailwind cannot generate from the tokens. */
const REQUIRED_COMPONENT_SELECTORS = [
  '.text-action-primary',
  '.focus-ring',
  '.focus-ring:focus-visible',
  '.bg-action-primary:hover',
  '.z-modal',
];

function readSelectors(content) {
  const selectors = new Set();
  postcss.parse(content).walkRules((rule) => {
    for (const selector of rule.selectors ?? [rule.selector]) {
      selectors.add(selector.trim());
    }
  });
  return selectors;
}

function requireVariables(variables, expected, errors, context) {
  const missing = expected.filter((name) => !variables.has(name));
  if (missing.length > 0) {
    errors.push(`${context} is missing required variables:\n   - ${missing.join('\n   - ')}`);
  }
}

function validateThemeFile(filePath, fileName) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ ${fileName} does not exist: ${filePath}`);
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];
  const isDarkTheme = fileName.includes('dark');
  const tokenNames = readTokenNames(content, isDarkTheme);
  const variables = new Set(tokenNames);

  if (!isDarkTheme) {
    const selectors = readSelectors(content);
    const missing = REQUIRED_COMPONENT_SELECTORS.filter((selector) => !selectors.has(selector));
    if (missing.length > 0) {
      errors.push(`Missing component rules in ${fileName}:\n   - ${missing.join('\n   - ')}`);
    }
    if (!/@source\s+["']/.test(content)) {
      errors.push(`Missing @source directive in ${fileName}: Tailwind will not scan the package`);
    }
  }

  if (!isDarkTheme && !content.includes('@theme')) {
    errors.push(`Missing @theme block in ${fileName}`);
  }
  if (isDarkTheme && !content.includes('.dark')) {
    errors.push(`Missing .dark class in ${fileName}`);
  }

  if (!isDarkTheme) {
    for (const scale of REQUIRED_COLOR_SCALES) {
      requireVariables(
        variables,
        SCALE_STEPS.map((step) => `color-${scale}-${step}`),
        errors,
        fileName,
      );
    }
    requireVariables(
      variables,
      BASE_STEPS.map((step) => `zabi-base-${step}`),
      errors,
      fileName,
    );
    for (const scale of PHYSICAL_SCALES) {
      requireVariables(
        variables,
        SCALE_STEPS.map((step) => `zabi-${scale}-${step}`),
        errors,
        fileName,
      );
    }
    requireVariables(
      variables,
      BASE_STEPS.map((step) => `color-base-${step}`),
      errors,
      fileName,
    );
    requireVariables(variables, REQUIRED_LIGHT_SEMANTICS, errors, fileName);
  } else {
    requireVariables(variables, REQUIRED_DARK_OVERRIDES, errors, fileName);
    const raw = findRawPaletteInDark(content);
    if (raw.length > 0) {
      errors.push(`Dark must only remap roles, but ${fileName} holds raw palette values:\n   - ${raw.join('\n   - ')}`);
    }
  }

  const seen = new Set();
  const duplicates = [];
  for (const variableName of tokenNames) {
    if (seen.has(variableName)) {
      duplicates.push(variableName);
    }
    seen.add(variableName);
  }
  if (duplicates.length > 0) {
    errors.push(`Duplicate variable names found in ${fileName}:\n   - ${duplicates.join('\n   - ')}`);
  }

  if (errors.length > 0) {
    console.error(`❌ Validation failed for ${fileName}:`);
    errors.forEach((error) => console.error(`   - ${error}`));
    return false;
  }

  console.log(`✓ ${fileName} validated successfully`);
  return true;
}

function validateDarkThemeStructure(lightThemePath, darkThemePath) {
  if (!fs.existsSync(lightThemePath) || !fs.existsSync(darkThemePath)) {
    return true;
  }

  const lightContent = fs.readFileSync(lightThemePath, 'utf8');
  const darkContent = fs.readFileSync(darkThemePath, 'utf8');
  const lightVars = extractCssVariables(lightContent, false);
  const darkVars = extractCssVariables(darkContent, true);

  // Dark mirrors every semantic step the light theme has. The physical
  // --zabi-* ramps are deliberately absent from dark (findRawPaletteInDark).
  const requiredParity = [
    ...BASE_STEPS.map((step) => `color-base-${step}`),
    ...REQUIRED_COLOR_SCALES.flatMap((scale) => SCALE_STEPS.map((step) => `color-${scale}-${step}`)),
  ];
  const missingParity = requiredParity.filter((name) => !darkVars.has(name));
  if (missingParity.length > 0) {
    console.error('❌ Dark theme parity check failed. Missing required base variables:\n' +
      `   - ${missingParity.join('\n   - ')}`);
    return false;
  }

  const unknownDarkVariables = Array.from(darkVars)
    .filter((name) => !lightVars.has(name))
    .filter((name) => !ALLOWED_DARK_ONLY_VARIABLES.has(name));
  if (unknownDarkVariables.length > 0) {
    console.error('❌ Dark theme declares variables missing from light theme source:\n' +
      `   - ${unknownDarkVariables.join('\n   - ')}`);
    return false;
  }

  console.log('✓ Dark theme parity validated');
  return true;
}

async function validateThemes() {
  console.log('🔍 Validating theme files...\n');

  const themeFiles = [
    { path: path.join(distDir, 'zabi-components-theme.css'), name: 'zabi-components-theme.css' },
    { path: path.join(distDir, 'zabi-components-theme-only.css'), name: 'zabi-components-theme-only.css' },
    { path: path.join(distDir, 'zabi-components-theme-dark.css'), name: 'zabi-components-theme-dark.css' },
    { path: path.join(distDir, 'zabi-components-theme-dark-only.css'), name: 'zabi-components-theme-dark-only.css' },
  ];

  let allValid = true;
  for (const file of themeFiles) {
    if (!fs.existsSync(file.path)) {
      console.warn(`⚠️  ${file.name} not found (may be optional)`);
      continue;
    }
    const isValid = validateThemeFile(file.path, file.name);
    if (!isValid) {
      allValid = false;
    }
  }

  console.log('\n🔍 Validating dark theme structure...');
  const structureValid = validateDarkThemeStructure(
    path.join(distDir, 'zabi-components-theme.css'),
    path.join(distDir, 'zabi-components-theme-dark.css'),
  );
  if (!structureValid) {
    allValid = false;
  }

  console.log('\n🔍 Validating dark selectors in every file that carries dark tokens...');
  for (const name of [
    'zabi-components-theme-dark.css',
    'zabi-components-theme-dark-only.css',
    'zabi-components-colors.css',
    'zabi-components.css',
  ]) {
    const filePath = path.join(distDir, name);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ ${name} not found`);
      allValid = false;
      continue;
    }
    if (!validateDarkSelectors(filePath, name)) allValid = false;
  }

  console.log('\n🔍 Validating the light theme\'s color-scheme in every file that carries light tokens...');
  for (const name of [
    'zabi-components-theme.css',
    'zabi-components-theme-only.css',
    'zabi-components-colors.css',
    'zabi-components.css',
  ]) {
    const filePath = path.join(distDir, name);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ ${name} not found`);
      allValid = false;
      continue;
    }
    if (!validateLightScheme(filePath, name)) allValid = false;
  }

  console.log('\n🔍 Validating surface elevation levels...');
  const { checkSurfaceElevation } = await import('./check-surface-elevation.js');
  const surfaceErrors = checkSurfaceElevation();
  if (surfaceErrors.length > 0) {
    console.error('❌ Surface elevation check failed:');
    surfaceErrors.forEach((error) => console.error(`   - ${error}`));
    allValid = false;
  } else {
    console.log('✓ Surface elevation levels validated');
  }

  console.log('');
  if (allValid) {
    console.log('✅ All theme files validated successfully!');
    return 0;
  }
  console.error('❌ Theme validation failed!');
  return 1;
}

validateThemes().then((exitCode) => {
  process.exit(exitCode);
}).catch((error) => {
  console.error('❌ Validation error:', error);
  process.exit(1);
});

