import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '../dist');

const BASE_STEPS = [
  50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500,
  550, 600, 650, 700, 750, 800, 850, 900, 925, 950,
];
const SCALE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const REQUIRED_COLOR_SCALES = ['brand', 'citron', 'pine', 'iris'];
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
];
const ALLOWED_DARK_ONLY_VARIABLES = new Set([
  'color-info-active',
]);

function extractCssVariables(content) {
  const variables = new Set();
  const regex = /--([\w-]+)\s*:/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    variables.add(match[1]);
  }
  return variables;
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
  const variables = extractCssVariables(content);

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
      BASE_STEPS.map((step) => `color-base-${step}`),
      errors,
      fileName,
    );
    requireVariables(variables, REQUIRED_LIGHT_SEMANTICS, errors, fileName);
  } else {
    requireVariables(variables, REQUIRED_DARK_OVERRIDES, errors, fileName);
  }

  const variableRegex = /--([\w-]+)\s*:/g;
  const seen = new Set();
  let match;
  const duplicates = [];
  while ((match = variableRegex.exec(content)) !== null) {
    const variableName = match[1];
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
  const lightVars = extractCssVariables(lightContent);
  const darkVars = extractCssVariables(darkContent);

  const requiredParity = [
    ...BASE_STEPS.map((step) => `zabi-base-${step}`),
    ...BASE_STEPS.map((step) => `color-base-${step}`),
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

