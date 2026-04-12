import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * CSS build: reads src/app.css and writes dist theme bundles for different consumers.
 *
 * Outputs (all under dist/):
 * - zabi-components.css — PostCSS/Tailwind full build (utilities + tokens + .dark)
 * - zabi-components-theme.css — @import tailwind + @theme (greenfield Tailwind)
 * - zabi-components-theme-only.css — @theme only (Tailwind already in app)
 * - zabi-components-theme-dark.css — @import tailwind + .dark
 * - zabi-components-theme-dark-only.css — .dark only (import after theme-only)
 * - zabi-components-colors.css — :root + .dark custom properties (no @theme; vanilla CSS)
 *
 * Package exports: zabi-components/theme, theme-only, theme-dark, theme-dark-only, colors, css
 * See docs/theme-imports.md for which file to use.
 */

const inputFile = path.join(__dirname, '../src/app.css');
const outputFile = path.join(__dirname, '../dist/zabi-components.css');

/**
 * Get raw children text for an at-rule/rule block.
 */
function stringifyChildNodes(node) {
  if (!node.nodes || node.nodes.length === 0) return '';
  return node.nodes.map((child) => child.toString()).join('\n').trim();
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

async function buildCSS() {
  let css = fs.readFileSync(inputFile, 'utf8');

  // Extract @theme and .dark block(s) for generated bundles using AST parsing.
  const { themeBlocks, darkModeContent } = extractThemeAndDarkBlocks(css, inputFile);
  
  if (themeBlocks.length > 0) {
    // Merge all theme blocks (they should be at root level, not nested)
    const mergedTheme = themeBlocks.join('\n\n');
    
    // Create theme file with Tailwind import (for standalone use)
    const themeBlock = `@import "tailwindcss";\n\n@theme {\n${mergedTheme}\n}`;
    const themeOutputFile = path.join(__dirname, '../dist/zabi-components-theme.css');
    fs.writeFileSync(themeOutputFile, themeBlock);
    console.log(`✓ Built theme CSS: ${themeOutputFile}`);
    
    // Create theme-only file without Tailwind import (for consumers with existing Tailwind)
    const themeOnlyBlock = `@theme {\n${mergedTheme}\n}`;
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
    const darkThemeBlock = `@import "tailwindcss";\n\n/* Dark Mode Theme - CSS Custom Properties */\n/* Import this file after the main theme to enable dark mode support */\n.dark {\n${darkModeContent}\n}`;
    const darkThemeOutputFile = path.join(__dirname, '../dist/zabi-components-theme-dark.css');
    fs.writeFileSync(darkThemeOutputFile, darkThemeBlock);
    console.log(`✓ Built dark theme CSS: ${darkThemeOutputFile}`);
    
    // Create dark theme-only version without Tailwind import
    const darkThemeOnlyBlock = `/* Dark Mode Theme - CSS Custom Properties */\n/* Import this file after the main theme to enable dark mode support */\n.dark {\n${darkModeContent}\n}`;
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

  // Write the processed CSS (without :root block - colors.css is separate)
  fs.writeFileSync(outputFile, css);
  console.log(`✓ Built CSS: ${outputFile}`);

  // Generate standalone colors.css file from app.css
  // This extracts CSS custom properties from @theme and .dark blocks
  // and converts them to :root and .dark format for standalone use
  // Note: theme() functions will remain as-is (consumers need Tailwind or can override)
  let colorsCss = '';
  
  // Extract @theme block and convert to :root
  if (themeBlocks.length > 0) {
    const themeContent = themeBlocks.join('\n\n');
    colorsCss += `/* ========================================\n`;
    colorsCss += `   ZABI COMPONENTS COLOR SYSTEM\n`;
    colorsCss += `   Standalone CSS Custom Properties\n`;
    colorsCss += `   Generated from src/app.css\n`;
    colorsCss += `   ⚠️ DO NOT EDIT - This file is auto-generated\n`;
    colorsCss += `   Edit src/app.css instead\n`;
    colorsCss += `   ======================================== */\n\n`;
    colorsCss += `:root {\n`;
    // Add proper indentation
    const indentedContent = themeContent.split('\n').map(line => {
      // Preserve existing indentation but ensure at least 2 spaces
      if (line.trim() === '') return '';
      return '  ' + line.trim();
    }).join('\n');
    colorsCss += indentedContent + '\n';
    colorsCss += `}\n\n`;
  }
  
  // Extract .dark block
  if (darkModeContent) {
    colorsCss += `/* Dark Mode */\n`;
    colorsCss += `.dark {\n`;
    // Add proper indentation
    const indentedDarkContent = darkModeContent.split('\n').map(line => {
      if (line.trim() === '') return '';
      return '  ' + line.trim();
    }).join('\n');
    colorsCss += indentedDarkContent + '\n';
    colorsCss += `}\n`;
  }
  
  // Write standalone colors.css file
  const colorsOutputFile = path.join(__dirname, '../dist/zabi-components-colors.css');
  fs.writeFileSync(colorsOutputFile, colorsCss);
  console.log(`✓ Built standalone colors CSS: ${colorsOutputFile}`);
}

buildCSS().catch(console.error);

