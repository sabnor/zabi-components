import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  getLightBaseScale,
  getMirroredDarkSemanticScale,
  formatCssVarLines,
  formatSemanticAliasLines,
} from '../tokens/base-scale.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appCssPath = path.join(__dirname, '../src/app.css');

function replaceSection(content, startMarker, endMarker, replacement) {
  const start = content.indexOf(startMarker);
  if (start === -1) {
    throw new Error(`Start marker not found: ${startMarker}`);
  }
  const end = content.indexOf(endMarker, start);
  if (end === -1) {
    throw new Error(`End marker not found: ${endMarker}`);
  }
  return `${content.slice(0, start)}${replacement}\n\n${content.slice(end)}`;
}

async function syncThemeTokens() {
  const mode = process.env.ZABI_BASE_SCALE_MODE ?? 'fixed';
  const lightScale = await getLightBaseScale(mode);
  const darkSemanticScale = getMirroredDarkSemanticScale(lightScale);

  const lightPhysicalBlock = [
    '  /*',
    '   * Custom base (gray) ramp — single physical scale for --color-base-*.',
    '   * 21 stops: 50 … 950 (lightest → darkest). Edit hex here; mirror the same block in .dark for standalone imports.',
    '   * Dark: semantic step S maps to physical (1000 − S), e.g. 50↔950, 75↔925; 500 stays fixed.',
    mode === 'oklch'
      ? '   * Midpoints are generated in OKLCH from primary stops (50/100/200.../950).'
      : '   * Midpoints are frozen hex values (default mode: fixed).',
    '   */',
    formatCssVarLines(lightScale),
  ].join('\n');

  const lightSemanticBlock = [
    '  /* Base Color Scale — semantic tokens alias the physical ramp (light: 1:1) */',
    formatSemanticAliasLines(),
  ].join('\n');

  const darkPhysicalBlock = [
    '  /* Mirror @theme --zabi-base-* ramp (same physical hex; required for standalone dark import) */',
    formatCssVarLines(lightScale),
  ].join('\n');

  const darkSemanticBlock = [
    '  /* Base Color Scale — semantic → physical mirror (1000 − step); 500 is fixed point */',
    formatCssVarLines(darkSemanticScale, '--color-base-'),
  ].join('\n');

  let css = fs.readFileSync(appCssPath, 'utf8');
  css = replaceSection(
    css,
    '  /*\n   * Custom base (gray) ramp — single physical scale for --color-base-*.',
    '  /* Typography - Nunito Sans font family */',
    lightPhysicalBlock,
  );
  css = replaceSection(
    css,
    '  /* Base Color Scale — semantic tokens alias the physical ramp (light: 1:1) */',
    '  /* Background Colors */',
    lightSemanticBlock,
  );
  css = replaceSection(
    css,
    '  /* Mirror @theme --zabi-base-* ramp (same physical hex; required for standalone dark import) */',
    '  /* Brand Color Scale - Dark mode variants (mirrored from light physical hex; no theme() forward refs) */',
    darkPhysicalBlock,
  );
  css = replaceSection(
    css,
    '  /* Base Color Scale — semantic → physical mirror (1000 − step); 500 is fixed point */',
    '  /* Background Colors - No dark mode overrides needed, base colors are already inverted */',
    darkSemanticBlock,
  );

  fs.writeFileSync(appCssPath, css, 'utf8');
  console.log(`✓ Synced base-scale tokens into ${appCssPath} (mode: ${mode})`);
}

syncThemeTokens().catch((error) => {
  console.error('❌ Failed to sync theme tokens:', error);
  process.exit(1);
});
