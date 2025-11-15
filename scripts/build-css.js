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

  // Process through PostCSS/Tailwind first
  const result = await postcss([
    tailwindcss(),
    autoprefixer()
  ]).process(css, {
    from: inputFile,
    to: outputFile
  });

  css = result.css;

  // Write the processed CSS (without :root block - colors.css is separate)
  fs.writeFileSync(outputFile, css);
  console.log(`✓ Built CSS: ${outputFile}`);
}

buildCSS().catch(console.error);

