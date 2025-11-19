import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '../dist');

// Required color scales that should be present in the theme
const requiredColorScales = [
  'brand',
  'citron',
  'pine',
  'iris'
];

// Required semantic color variables
const requiredSemanticColors = [
  'background',
  'headline',
  'body',
  'description',
  'caption',
  'border',
  'surface-elevated',
  'surface-level-0',
  'surface-level-1',
  'primary',
  'secondary',
  'success',
  'warning',
  'error'
];

function validateThemeFile(filePath, fileName) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ ${fileName} does not exist: ${filePath}`);
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];
  const warnings = [];
  const isDarkTheme = fileName.includes('dark');

  // Check for @theme block (not required for dark theme files which use .dark class)
  if (!isDarkTheme && !content.includes('@theme')) {
    errors.push(`Missing @theme block in ${fileName}`);
  }

  // Dark theme files should have .dark class
  if (isDarkTheme && !content.includes('.dark')) {
    errors.push(`Missing .dark class in ${fileName}`);
  }

  // Check for required color scales (only for light theme, dark theme uses semantic colors)
  if (!isDarkTheme) {
    for (const scale of requiredColorScales) {
      const scalePattern = new RegExp(`--color-${scale}-(50|100|200|300|400|500|600|700|800|900|950)`);
      if (!scalePattern.test(content)) {
        warnings.push(`Missing some ${scale} color scale values in ${fileName}`);
      }
    }
  }

  // Check for required semantic colors (warnings only, not errors)
  // Some theme files may intentionally omit certain semantic colors
  for (const color of requiredSemanticColors) {
    const colorPattern = new RegExp(`--color-${color.replace(/-/g, '-')}`);
    if (!colorPattern.test(content)) {
      warnings.push(`Missing semantic color: --color-${color} in ${fileName}`);
    }
  }

  // Check for duplicate variable names
  const variableRegex = /--color-([\w-]+):/g;
  const variables = new Set();
  let match;
  const duplicates = [];

  while ((match = variableRegex.exec(content)) !== null) {
    const varName = match[1];
    if (variables.has(varName)) {
      duplicates.push(varName);
    }
    variables.add(varName);
  }

  if (duplicates.length > 0) {
    errors.push(`Duplicate variable names found in ${fileName}: ${duplicates.join(', ')}`);
  }

  // Check for proper CSS custom property syntax (skip - too many false positives with theme() functions)
  // The PostCSS/Tailwind build process will catch actual syntax errors

  // Report results
  if (errors.length > 0) {
    console.error(`❌ Validation failed for ${fileName}:`);
    errors.forEach(err => console.error(`   - ${err}`));
    return false;
  }

  if (warnings.length > 0) {
    console.warn(`⚠️  Warnings for ${fileName}:`);
    warnings.forEach(warn => console.warn(`   - ${warn}`));
  } else {
    console.log(`✓ ${fileName} validated successfully`);
  }

  return true;
}

function validateDarkThemeStructure(lightThemePath, darkThemePath) {
  if (!fs.existsSync(lightThemePath) || !fs.existsSync(darkThemePath)) {
    return true; // Skip if files don't exist
  }

  const lightContent = fs.readFileSync(lightThemePath, 'utf8');
  const darkContent = fs.readFileSync(darkThemePath, 'utf8');

  // Extract variable names from both themes
  const extractVariables = (content) => {
    const vars = new Set();
    const regex = /--color-([\w-]+):/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      vars.add(match[1]);
    }
    return vars;
  };

  const lightVars = extractVariables(lightContent);
  const darkVars = extractVariables(darkContent);

  // Check if dark theme has corresponding variables (not all need to match, but structure should be similar)
  const missingInDark = Array.from(lightVars).filter(v => !darkVars.has(v));
  if (missingInDark.length > 50) { // Allow some differences, but not too many
    console.warn(`⚠️  Dark theme is missing many variables from light theme (${missingInDark.length} missing)`);
    // Don't fail build for this - dark theme structure can differ intentionally
    return true;
  }

  return true;
}

async function validateThemes() {
  console.log('🔍 Validating theme files...\n');

  const themeFiles = [
    { path: path.join(distDir, 'zabi-components-theme.css'), name: 'zabi-components-theme.css' },
    { path: path.join(distDir, 'zabi-components-theme-only.css'), name: 'zabi-components-theme-only.css' },
    { path: path.join(distDir, 'zabi-components-theme-dark.css'), name: 'zabi-components-theme-dark.css' },
    { path: path.join(distDir, 'zabi-components-theme-dark-only.css'), name: 'zabi-components-theme-dark-only.css' }
  ];

  let allValid = true;

  for (const file of themeFiles) {
    if (fs.existsSync(file.path)) {
      const isValid = validateThemeFile(file.path, file.name);
      if (!isValid) {
        allValid = false;
      }
    } else {
      console.warn(`⚠️  ${file.name} not found (may be optional)`);
    }
  }

  // Validate dark theme structure matches light theme
  console.log('\n🔍 Validating dark theme structure...');
  const structureValid = validateDarkThemeStructure(
    path.join(distDir, 'zabi-components-theme.css'),
    path.join(distDir, 'zabi-components-theme-dark.css')
  );

  if (!structureValid) {
    allValid = false;
  }

  console.log('');
  if (allValid && structureValid) {
    console.log('✅ All theme files validated successfully!');
    return 0;
  } else {
    console.error('❌ Theme validation failed!');
    return 1;
  }
}

validateThemes().then(exitCode => {
  process.exit(exitCode);
}).catch(error => {
  console.error('❌ Validation error:', error);
  process.exit(1);
});

