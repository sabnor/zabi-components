import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import postcss from 'postcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '../dist');

const BASE_STEPS = [
  50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500,
  550, 600, 650, 700, 750, 800, 850, 900, 925, 950,
];
const SCALE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const REQUIRED_COLOR_SCALES = ['brand', 'citron', 'pine', 'iris', 'warning', 'error'];
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
];
const REQUIRED_DARK_OVERRIDES = [
  'color-input',
  'color-input-border',
  'color-card',
  'color-overlay',
  'color-action-danger',
  ...BASE_STEPS.map((step) => `color-base-${step}`),
  ...BASE_STEPS.map((step) => `zabi-base-${step}`),
  ...SCALE_STEPS.map((step) => `zabi-brand-${step}`),
  ...SCALE_STEPS.map((step) => `zabi-pine-${step}`),
  ...SCALE_STEPS.map((step) => `zabi-citron-${step}`),
  ...SCALE_STEPS.map((step) => `zabi-iris-${step}`),
  ...SCALE_STEPS.map((step) => `zabi-warning-${step}`),
  ...SCALE_STEPS.map((step) => `zabi-error-${step}`),
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
  const root = postcss.parse(content);
  const names = [];
  const collect = (container) => {
    container.each((node) => {
      if (node.type === 'decl' && node.prop.startsWith('--')) {
        names.push(node.prop.slice(2));
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
    requireVariables(
      variables,
      SCALE_STEPS.map((step) => `zabi-brand-${step}`),
      errors,
      fileName,
    );
    requireVariables(
      variables,
      SCALE_STEPS.map((step) => `zabi-pine-${step}`),
      errors,
      fileName,
    );
    requireVariables(
      variables,
      SCALE_STEPS.map((step) => `zabi-citron-${step}`),
      errors,
      fileName,
    );
    requireVariables(
      variables,
      SCALE_STEPS.map((step) => `zabi-iris-${step}`),
      errors,
      fileName,
    );
    requireVariables(
      variables,
      SCALE_STEPS.map((step) => `zabi-warning-${step}`),
      errors,
      fileName,
    );
    requireVariables(
      variables,
      SCALE_STEPS.map((step) => `zabi-error-${step}`),
      errors,
      fileName,
    );
    requireVariables(
      variables,
      BASE_STEPS.map((step) => `color-base-${step}`),
      errors,
      fileName,
    );
    requireVariables(variables, REQUIRED_LIGHT_SEMANTICS, errors, fileName);
  } else {
    requireVariables(variables, REQUIRED_DARK_OVERRIDES, errors, fileName);
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

  const requiredParity = [
    ...BASE_STEPS.map((step) => `zabi-base-${step}`),
    ...BASE_STEPS.map((step) => `color-base-${step}`),
    ...SCALE_STEPS.map((step) => `zabi-brand-${step}`),
    ...SCALE_STEPS.map((step) => `color-brand-${step}`),
    ...SCALE_STEPS.map((step) => `zabi-pine-${step}`),
    ...SCALE_STEPS.map((step) => `color-pine-${step}`),
    ...SCALE_STEPS.map((step) => `zabi-citron-${step}`),
    ...SCALE_STEPS.map((step) => `color-citron-${step}`),
    ...SCALE_STEPS.map((step) => `zabi-iris-${step}`),
    ...SCALE_STEPS.map((step) => `color-iris-${step}`),
    ...SCALE_STEPS.map((step) => `zabi-warning-${step}`),
    ...SCALE_STEPS.map((step) => `color-warning-${step}`),
    ...SCALE_STEPS.map((step) => `zabi-error-${step}`),
    ...SCALE_STEPS.map((step) => `color-error-${step}`),
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

