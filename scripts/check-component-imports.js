#!/usr/bin/env node
/**
 * Fail if packaged library components use ../../types (escapes dist/ after svelte-package).
 * Run via: npm run check
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const componentsDir = path.join(__dirname, '..', 'src', 'components');
const badRe = /from\s+['"](?:\.\.\/){2,}types\//;

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      walk(full, out);
    } else if (name.endsWith('.svelte')) {
      out.push(full);
    }
  }
  return out;
}

const files = walk(componentsDir);
const violations = [];
for (const filePath of files) {
  const text = fs.readFileSync(filePath, 'utf8');
  if (badRe.test(text)) {
    violations.push(path.relative(path.join(__dirname, '..'), filePath));
  }
}

if (violations.length > 0) {
  console.error(
    '❌ Do not use ../../types/ from src/components (packaging escapes dist/). Use ../types/ instead.',
  );
  for (const f of violations) {
    console.error(`   - ${f}`);
  }
  process.exit(1);
}
console.log('✓ Component import paths (types) OK');
