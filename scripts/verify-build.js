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
  const docsPath = path.join(__dirname, '../docs/theme-imports.md');
  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ package.json not found');
    return false;
  }
  if (!fs.existsSync(docsPath)) {
    console.error('❌ docs/theme-imports.md not found');
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const exports = packageJson.exports || {};
  const docsContent = fs.readFileSync(docsPath, 'utf8');

  // Canonical export paths that must exist.
  const requiredExports = [
    './theme',
    './theme-only',
    './theme-dark',
    './theme-dark-only',
    './colors',
    './css'
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

  // Validate every exported CSS path exists and is documented.
  const cssExportEntries = Object.entries(exports).filter(([, target]) =>
    typeof target === 'string' && target.endsWith('.css'),
  );
  if (cssExportEntries.length === 0) {
    console.error('❌ No CSS exports found in package.json');
    allExportsValid = false;
  }
  for (const [exportPath, targetPath] of cssExportEntries) {
    const distRelative = targetPath.replace('./dist/', '');
    const outputPath = path.join(distDir, distRelative);
    if (!fs.existsSync(outputPath)) {
      console.error(`❌ CSS export points to missing file: ${exportPath} -> ${targetPath}`);
      allExportsValid = false;
    }
    const documented =
      docsContent.includes(`\`${exportPath.replace('./', 'zabi-components/')}\``) ||
      docsContent.includes(`\`${targetPath}\``) ||
      docsContent.includes(`\`${distRelative}\``);
    if (!documented) {
      console.error(`❌ CSS export is not documented in docs/theme-imports.md: ${exportPath}`);
      allExportsValid = false;
    }
  }

  if (allExportsValid) {
    console.log('✓ Package exports verified');
  }

  return allExportsValid;
}

/** Ensure shared util imports resolve under dist/util (not above dist/). */
function verifyPackagedSvelteImports() {
  const badRoutesLib = '../../routes/lib/';
  const utilLibRoot = path.join(distDir, 'util');
  const roots = ['atoms', 'molecules', 'organisms'].map((sub) =>
    path.join(distDir, sub),
  );
  const staleRoutesLib = [];
  const brokenResolve = [];

  const utilImportRe = /from\s+['"]((?:\.\.\/)+)(util\/[^'"]+)['"]/g;

  function resolveSpec(filePath, spec) {
    return path.normalize(path.join(path.dirname(filePath), spec));
  }

  function targetExists(resolved) {
    if (fs.existsSync(resolved)) return true;
    if (resolved.endsWith('.js')) {
      const ts = resolved.slice(0, -3) + '.ts';
      if (fs.existsSync(ts)) return true;
    }
    return false;
  }

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const st = fs.statSync(full);
      if (st.isDirectory()) {
        walk(full);
      } else if (name.endsWith('.svelte')) {
        const text = fs.readFileSync(full, 'utf8');
        if (text.includes(badRoutesLib)) {
          staleRoutesLib.push(path.relative(distDir, full));
        }
        utilImportRe.lastIndex = 0;
        let m;
        while ((m = utilImportRe.exec(text)) !== null) {
          const spec = m[1] + m[2];
          const resolved = resolveSpec(full, spec);
          if (!resolved.startsWith(utilLibRoot + path.sep) && resolved !== utilLibRoot) {
            brokenResolve.push({
              file: path.relative(distDir, full),
              spec,
              resolved,
            });
          } else if (!targetExists(resolved)) {
            brokenResolve.push({
              file: path.relative(distDir, full),
              spec,
              resolved,
              missing: true,
            });
          }
        }
      }
    }
  }

  for (const root of roots) {
    walk(root);
  }

  if (staleRoutesLib.length > 0) {
    console.error(
      `❌ Packaged Svelte still contains "${badRoutesLib}" (stale routes/lib import):`,
    );
    for (const f of staleRoutesLib) {
      console.error(`   - ${f}`);
    }
  }
  if (brokenResolve.length > 0) {
    console.error('❌ util/ import does not resolve under dist/util:');
    for (const row of brokenResolve) {
      console.error(
        `   - ${row.file}: "${row.spec}" -> ${row.resolved}${row.missing ? ' (missing file)' : ''}`,
      );
    }
  }

  if (staleRoutesLib.length > 0 || brokenResolve.length > 0) {
    return false;
  }
  console.log('✓ Packaged Svelte util/ imports verified');
  return true;
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

  console.log('\n📦 Verifying packaged component imports...');
  const importsValid = verifyPackagedSvelteImports();
  if (!importsValid) {
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

