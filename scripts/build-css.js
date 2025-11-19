import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.join(__dirname, '../src/app.css');
const outputFile = path.join(__dirname, '../dist/zabi-components.css');


async function buildCSS() {
  let css = fs.readFileSync(inputFile, 'utf8');

  // Extract @theme block(s) for consumers to import
  // Use global regex to find all @theme blocks and merge them
  const themeBlocks = [];
  const themeRegex = /@theme\s*\{([\s\S]*?)\}/g;
  let match;
  
  while ((match = themeRegex.exec(css)) !== null) {
    themeBlocks.push(match[1].trim());
  }
  
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

  // Extract dark mode CSS custom properties from .dark class
  // Note: In Tailwind v4, dark mode is handled via CSS custom properties in .dark selector
  // We extract these to a separate file that consumers can import
  // Match .dark { ... } block - need to find matching closing brace
  const darkModeRegex = /\.dark\s*\{([\s\S]*?)\n\}/;
  const darkModeMatch = css.match(darkModeRegex);
  
  // If simple match doesn't work, try to find the block manually
  let darkModeContent = null;
  if (darkModeMatch) {
    darkModeContent = darkModeMatch[1].trim();
  } else {
    // Fallback: find .dark { and match until the closing brace
    const darkStart = css.indexOf('.dark {');
    if (darkStart !== -1) {
      let braceCount = 0;
      let inBlock = false;
      let contentStart = darkStart + 7; // length of '.dark {'
      let contentEnd = contentStart;
      
      for (let i = darkStart; i < css.length; i++) {
        if (css[i] === '{') {
          braceCount++;
          inBlock = true;
        } else if (css[i] === '}') {
          braceCount--;
          if (braceCount === 0 && inBlock) {
            contentEnd = i;
            break;
          }
        }
      }
      
      if (contentEnd > contentStart) {
        darkModeContent = css.substring(contentStart, contentEnd).trim();
      }
    }
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
}

buildCSS().catch(console.error);

