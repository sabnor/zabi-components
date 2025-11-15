import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '../dist');

// Required theme files that should be generated
const requiredThemeFiles = [
  'zabi-components-theme.css',
  'zabi-components-theme-only.css',
  'zabi-components-theme-dark.css',
  'zabi-components-theme-dark-only.css'
];

// Required component files
const requiredComponentFiles = [
  'zabi-components.css',
  'zabi-components-colors.css',
  'index.js',
  'index.d.ts'
];

// Maximum reasonable file sizes (in bytes) - prevent empty or corrupted files
const maxFileSizes = {
  'zabi-components-theme.css': 50000, // ~50KB
  'zabi-components-theme-only.css': 50000,
  'zabi-components-theme-dark.css': 30000, // ~30KB
  'zabi-components-theme-dark-only.css': 30000,
  'zabi-components.css': 500000, // ~500KB
  'zabi-components-colors.css': 20000, // ~20KB
  'index.js': 10000, // ~10KB
  'index.d.ts': 5000 // ~5KB
};

// Minimum file sizes (in bytes) - ensure files have content
const minFileSizes = {
  'zabi-components-theme.css': 1000,
  'zabi-components-theme-only.css': 1000,
  'zabi-components-theme-dark.css': 500,
  'zabi-components-theme-dark-only.css': 500,
  'zabi-components.css': 10000,
  'zabi-components-colors.css': 500,
  'index.js': 100,
  'index.d.ts': 100
};

function verifyFile(fileName, isRequired = true) {
  const filePath = path.join(distDir, fileName);
  
  if (!fs.existsSync(filePath)) {
    if (isRequired) {
      console.error(`❌ Required file missing: ${fileName}`);
      return false;
    } else {
      console.warn(`⚠️  Optional file missing: ${fileName}`);
      return true; // Optional files don't fail the build
    }
  }

  const stats = fs.statSync(filePath);
  const fileSize = stats.size;

  // Check minimum size
  if (minFileSizes[fileName] && fileSize < minFileSizes[fileName]) {
    console.error(`❌ File too small (may be empty): ${fileName} (${fileSize} bytes, expected at least ${minFileSizes[fileName]} bytes)`);
    return false;
  }

  // Check maximum size
  if (maxFileSizes[fileName] && fileSize > maxFileSizes[fileName]) {
    console.warn(`⚠️  File larger than expected: ${fileName} (${fileSize} bytes, expected at most ${maxFileSizes[fileName]} bytes)`);
    // Don't fail, just warn
  }

  // Basic content validation
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check for CSS files
  if (fileName.endsWith('.css')) {
    // Check for basic CSS structure
    if (content.trim().length === 0) {
      console.error(`❌ CSS file is empty: ${fileName}`);
      return false;
    }
    
    // Check for @theme in theme files
    if (fileName.includes('theme') && !fileName.includes('dark')) {
      if (!content.includes('@theme')) {
        console.error(`❌ Theme file missing @theme block: ${fileName}`);
        return false;
      }
    }
    
    // Check for .dark in dark theme files
    if (fileName.includes('dark')) {
      if (!content.includes('.dark')) {
        console.error(`❌ Dark theme file missing .dark class: ${fileName}`);
        return false;
      }
    }
  }

  // Check for JS/TS files
  if (fileName.endsWith('.js') || fileName.endsWith('.d.ts')) {
    if (content.trim().length === 0) {
      console.error(`❌ File is empty: ${fileName}`);
      return false;
    }
  }

  console.log(`✓ ${fileName} verified (${(fileSize / 1024).toFixed(2)} KB)`);
  return true;
}

function verifyPackageExports() {
  const packageJsonPath = path.join(__dirname, '../package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ package.json not found');
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const exports = packageJson.exports || {};

  // Check that theme exports exist
  const requiredExports = [
    './theme',
    './theme-only',
    './theme-dark',
    './theme-dark-only'
  ];

  let allExportsValid = true;
  for (const exportPath of requiredExports) {
    if (!exports[exportPath]) {
      console.error(`❌ Missing export in package.json: ${exportPath}`);
      allExportsValid = false;
    } else {
      const exportFile = exports[exportPath].replace('./dist/', '');
      if (!fs.existsSync(path.join(distDir, exportFile))) {
        console.error(`❌ Export points to non-existent file: ${exportPath} -> ${exports[exportPath]}`);
        allExportsValid = false;
      }
    }
  }

  if (allExportsValid) {
    console.log('✓ Package exports verified');
  }

  return allExportsValid;
}

async function verifyBuild() {
  console.log('🔍 Verifying build output...\n');

  let allValid = true;

  // Verify theme files
  console.log('📦 Verifying theme files...');
  for (const file of requiredThemeFiles) {
    const isValid = verifyFile(file, true);
    if (!isValid) {
      allValid = false;
    }
  }

  // Verify component files
  console.log('\n📦 Verifying component files...');
  for (const file of requiredComponentFiles) {
    const isValid = verifyFile(file, true);
    if (!isValid) {
      allValid = false;
    }
  }

  // Verify package exports
  console.log('\n📦 Verifying package exports...');
  const exportsValid = verifyPackageExports();
  if (!exportsValid) {
    allValid = false;
  }

  console.log('');
  if (allValid) {
    console.log('✅ Build verification passed!');
    return 0;
  } else {
    console.error('❌ Build verification failed!');
    return 1;
  }
}

verifyBuild().then(exitCode => {
  process.exit(exitCode);
}).catch(error => {
  console.error('❌ Verification error:', error);
  process.exit(1);
});

