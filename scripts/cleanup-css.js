import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const finalFile = path.join(__dirname, '../dist/zabi-components.css');

if (fs.existsSync(finalFile)) {
  let css = fs.readFileSync(finalFile, 'utf8');
  // Remove all @import statements (they should be resolved during build)
  // This fixes PostCSS errors where @import must be at the top
  css = css.replace(/@import\s+["'][^"']+["'];?\s*\n?/g, '');
  fs.writeFileSync(finalFile, css);
  console.log(`✓ Cleaned up @import statements in: ${finalFile}`);
} else {
  console.warn(`⚠️  File not found: ${finalFile}`);
}

