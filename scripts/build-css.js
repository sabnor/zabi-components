import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { darkThemeCss, darkThemeCssMinified, expandDarkRule } from './dark-selectors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * CSS build: reads src/app.css and writes dist theme bundles for different consumers.
 *
 * Outputs (all under dist/):
 * - zabi-components.css — PostCSS/Tailwind full build (utilities + tokens + dark)
 * - zabi-components-theme.css — @import tailwind + @theme (greenfield Tailwind)
 * - zabi-components-theme-only.css — @theme only (Tailwind already in app)
 * - zabi-components-theme-dark.css — @import tailwind + dark
 * - zabi-components-theme-dark-only.css — dark only (import after theme-only)
 * - zabi-components-colors.css — :root + dark custom properties (no @theme; vanilla CSS)
 *
 * "dark" is the source's single `.dark { … }` rule, published under `.dark`,
 * `[data-theme="dark"]` and `[data-theme="auto"]` inside
 * `@media (prefers-color-scheme: dark)`. See scripts/dark-selectors.js.
 *
 * Package exports: zabi-components/theme, theme-only, theme-dark, theme-dark-only, colors, css
 * See docs/theme-imports.md for which file to use.
 */

const inputFile = path.join(__dirname, '../src/app.css');
const outputFile = path.join(__dirname, '../dist/zabi-components.css');

/**
 * Get raw children text for an at-rule/rule block.
 *
 * PostCSS keeps the semicolon between declarations on the parent, not on the
 * declaration, so `decl.toString()` comes back without one. Joining those with
 * newlines produced theme files a CSS parser read as a single declaration.
 */
function stringifyChildNodes(node) {
  if (!node.nodes || node.nodes.length === 0) return '';
  return node.nodes
    .map((child) => (child.type === 'decl' ? `${child.toString()};` : child.toString()))
    .join('\n')
    .trim();
}

/**
 * Extract @theme and .dark block bodies using PostCSS AST.
 * This avoids fragile regex/string parsing around comments or braces.
 */
function extractThemeAndDarkBlocks(css, fromPath) {
  const root = postcss.parse(css, { from: fromPath });
  const themeBlocks = [];
  const darkBlocks = [];

  root.walkAtRules('theme', (atRule) => {
    const content = stringifyChildNodes(atRule);
    if (content) themeBlocks.push(content);
  });

  root.walkRules((rule) => {
    const selectors = (rule.selectors ?? [rule.selector]).map((s) => s.trim());
    if (!selectors.includes('.dark')) return;
    const content = stringifyChildNodes(rule);
    if (content) darkBlocks.push(content);
  });

  return {
    themeBlocks,
    darkModeContent: darkBlocks.length > 0 ? darkBlocks.join('\n\n') : null,
  };
}

/**
 * The hand-written rules in app.css: everything that is neither a token block
 * nor Tailwind itself.
 *
 * Tailwind can generate `.text-action-primary` from the `--color-action-primary`
 * token, but it would set the label to the fill colour. The library's own rule
 * points at `--color-action-primary-text` instead, and `.focus-ring`, the action
 * hover states and the `z-*` scale have no generated equivalent at all. A theme
 * file without these styles nothing correctly, so they ship with it.
 *
 * Left out: the universal-selector scrollbar rules. They restyle every
 * scrollbar in the consumer's app, which importing a theme should not do;
 * `.scrollbar-semantic` is the opt-in.
 */
function extractComponentStyles(css, fromPath) {
  const root = postcss.parse(css, { from: fromPath });
  root.walkComments((comment) => comment.remove());

  const kept = [];
  root.each((node) => {
    if (node.type === 'atrule' && (node.name === 'import' || node.name === 'theme')) return;
    if (node.type === 'rule') {
      const selectors = (node.selectors ?? [node.selector]).map((s) => s.trim());
      if (selectors.includes('.dark')) return;
      if (selectors.every((selector) => selector.startsWith('*'))) return;
    }
    kept.push(node.toString().trim());
  });
  return kept.join('\n\n');
}

/**
 * Tailwind does not scan node_modules, so without this the classes inside the
 * package are never generated. The path is relative to the theme file, which
 * sits in dist/ beside the compiled components.
 */
const SOURCE_DIRECTIVE = '@source "./**/*.{svelte,js}";';

/**
 * Serialize declarations from an @theme at-rule or a rule (e.g. `.dark`) to one line:
 * comments stripped, each decl ends with `;`. Must use the PostCSS AST — stringifying
 * `@theme` children and re-parsing drops semicolons and merges declarations incorrectly.
 */
function minifyDeclarationsFromContainer(container) {
  container.walkComments((c) => c.remove());
  let out = '';
  container.walkDecls((decl) => {
    out += decl.prop + ':' + decl.value + ';';
  });
  return out;
}

async function buildCSS() {
  let css = fs.readFileSync(inputFile, 'utf8');

  // A fresh checkout has no dist/ yet, and this is the first step that writes there.
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });

  // Extract @theme and .dark block(s) for generated bundles using AST parsing.
  const { themeBlocks, darkModeContent } = extractThemeAndDarkBlocks(css, inputFile);
  
  if (themeBlocks.length > 0) {
    // Merge all theme blocks (they should be at root level, not nested)
    const mergedTheme = themeBlocks.join('\n\n');
    const componentStyles = extractComponentStyles(css, inputFile);
    const themeBody = `${SOURCE_DIRECTIVE}\n\n@theme {\n${mergedTheme}\n}\n\n${componentStyles}\n`;
    
    // Create theme file with Tailwind import (for standalone use)
    const themeBlock = `@import "tailwindcss";\n\n${themeBody}`;
    const themeOutputFile = path.join(__dirname, '../dist/zabi-components-theme.css');
    fs.writeFileSync(themeOutputFile, themeBlock);
    console.log(`✓ Built theme CSS: ${themeOutputFile}`);
    
    // Create theme-only file without Tailwind import (for consumers with existing Tailwind)
    const themeOnlyBlock = themeBody;
    const themeOnlyOutputFile = path.join(__dirname, '../dist/zabi-components-theme-only.css');
    fs.writeFileSync(themeOnlyOutputFile, themeOnlyBlock);
    console.log(`✓ Built theme-only CSS: ${themeOnlyOutputFile}`);
    
    // Verify files were created
    if (!fs.existsSync(themeOutputFile)) {
      throw new Error('Theme file was not created successfully!');
    }
    if (!fs.existsSync(themeOnlyOutputFile)) {
      throw new Error('Theme-only file was not created successfully!');
    }
  } else {
    console.warn('⚠️  No @theme blocks found in source CSS');
  }

  if (darkModeContent) {
    // Create dark mode theme file with Tailwind import
    // This file contains the .dark class with all dark mode CSS custom properties
    const darkBlocks = darkThemeCss(darkModeContent);
    const darkThemeBlock = `@import "tailwindcss";\n\n/* Dark Mode Theme - CSS Custom Properties */\n/* Import this file after the main theme to enable dark mode support */\n${darkBlocks}\n`;
    const darkThemeOutputFile = path.join(__dirname, '../dist/zabi-components-theme-dark.css');
    fs.writeFileSync(darkThemeOutputFile, darkThemeBlock);
    console.log(`✓ Built dark theme CSS: ${darkThemeOutputFile}`);
    
    // Create dark theme-only version without Tailwind import
    const darkThemeOnlyBlock = `/* Dark Mode Theme - CSS Custom Properties */\n/* Import this file after the main theme to enable dark mode support */\n${darkBlocks}\n`;
    const darkThemeOnlyOutputFile = path.join(__dirname, '../dist/zabi-components-theme-dark-only.css');
    fs.writeFileSync(darkThemeOnlyOutputFile, darkThemeOnlyBlock);
    console.log(`✓ Built dark theme-only CSS: ${darkThemeOnlyOutputFile}`);
    
    // Verify files were created
    if (!fs.existsSync(darkThemeOutputFile)) {
      throw new Error('Dark theme file was not created successfully!');
    }
    if (!fs.existsSync(darkThemeOnlyOutputFile)) {
      throw new Error('Dark theme-only file was not created successfully!');
    }
  } else {
    console.warn('⚠️  No .dark class found in source CSS');
  }

  // Process through PostCSS/Tailwind first
  const result = await postcss([
    tailwindcss(),
    autoprefixer()
  ]).process(css, {
    from: inputFile,
    to: outputFile
  });

  css = result.css;

  // Remove all @import statements from the final output
  // PostCSS/Tailwind should have resolved all imports during processing
  // Any remaining @import statements are invalid and cause PostCSS errors
  css = css.replace(/@import\s+["'][^"']+["'];?\s*\n?/g, '');

  // Publish the dark tokens under [data-theme] as well as .dark.
  const compiled = postcss.parse(css, { from: outputFile });
  const expanded = expandDarkRule(compiled, postcss);
  if (expanded !== 1) {
    throw new Error(`Expected one .dark token rule in the compiled CSS, found ${expanded}`);
  }
  css = compiled.toString();

  // Write the processed CSS (without :root block - colors.css is separate)
  fs.writeFileSync(outputFile, css);
  console.log(`✓ Built CSS: ${outputFile}`);

  // Standalone colors: AST walk (same tokens as app.css), minified — no comment blocks, one line per selector
  const appAst = postcss.parse(fs.readFileSync(inputFile, 'utf8'), { from: inputFile });
  let colorsCss =
    '/* zabi-components-colors — generated from src/app.css; edit app.css */\n';
  const themeChunks = [];
  appAst.walkAtRules('theme', (atRule) => {
    themeChunks.push(minifyDeclarationsFromContainer(atRule));
  });
  if (themeChunks.length > 0) {
    colorsCss += ':root{' + themeChunks.join('') + '}\n';
  }
  const darkChunks = [];
  appAst.walkRules((rule) => {
    const selectors = (rule.selectors ?? [rule.selector]).map((s) => s.trim());
    if (!selectors.includes('.dark')) return;
    darkChunks.push(minifyDeclarationsFromContainer(rule));
  });
  if (darkChunks.length > 0) {
    colorsCss += darkThemeCssMinified(darkChunks.join('')) + '\n';
  }

  const colorsOutputFile = path.join(__dirname, '../dist/zabi-components-colors.css');
  fs.writeFileSync(colorsOutputFile, colorsCss);
  console.log(`✓ Built standalone colors CSS: ${colorsOutputFile}`);
}

// A failed build must fail the command: this used to log the error and exit 0.
buildCSS().catch((error) => {
  console.error(error);
  process.exit(1);
});

