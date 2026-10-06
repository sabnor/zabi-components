#!/usr/bin/env node
/**
 * Fail if packaged library components use ../../types (escapes dist/ after svelte-package),
 * or import an icon from the `@lucide/svelte` barrel instead of its own file
 * (see scripts/lucide-barrel.js for what that costs an app).
 * Run via: npm run check
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { findLucideBarrelImports, lucideBarrelLines } from './lucide-barrel.js';

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

// A dynamic element is taken out and put back when the page hydrates. A field
// or a link inside it that the user had already focused is blurred on the way,
// and what they type next is lost (playwright/hydration-focus.spec.ts). Write
// one branch per tag over a shared snippet instead. Comments may name it.
const dynamicElementRe = /<svelte:element[\s>/]/;
const dynamicElements = [];
for (const filePath of files) {
  const lines = fs
    .readFileSync(filePath, 'utf8')
    .replace(/<!--[\s\S]*?-->/g, (comment) => comment.replace(/[^\n]/g, ' '))
    .split('\n');
  lines.forEach((line, index) => {
    if (dynamicElementRe.test(line)) {
      dynamicElements.push(`${path.relative(path.join(__dirname, '..'), filePath)}:${index + 1}`);
    }
  });
}
if (dynamicElements.length > 0) {
  console.error(
    '❌ Do not use <svelte:element> in src/components: hydration re-inserts it and blurs a focused control inside. Use one {#if} branch per tag over a shared snippet:',
  );
  for (const where of dynamicElements) {
    console.error(`   - ${where}`);
  }
  process.exit(1);
}
console.log('✓ No dynamic elements in components');

// Everything a consumer may copy from, not only what is packaged: the catalog's
// code samples, the stories, the docs site and the written docs.
const repoRoot = path.join(__dirname, '..');
const barrelAllowed = new Set([
  // The type test that proves an icon from the barrel is still accepted by every icon prop.
  'src/types/IconPropsCheck.svelte',
  // Says in prose what not to write.
  'docs/lucide-icons.md',
]);
const barrelImports = [
  ...findLucideBarrelImports(path.join(repoRoot, 'src'), ['.svelte', '.ts', '.js', '.md', '.mdx'], repoRoot),
  ...findLucideBarrelImports(path.join(repoRoot, 'docs'), ['.md', '.mdx'], repoRoot),
  ...findLucideBarrelImports(path.join(repoRoot, '.storybook'), ['.svelte', '.ts', '.js', '.mdx'], repoRoot),
  ...lucideBarrelLines(fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8')).map(
    (line) => `README.md:${line}`,
  ),
].filter((where) => !barrelAllowed.has(where.replace(/:\d+$/, '').split(path.sep).join('/')));
if (barrelImports.length > 0) {
  console.error(
    '❌ Import each icon from its own file (`import X from "@lucide/svelte/icons/x"`), not from the `@lucide/svelte` barrel:',
  );
  for (const where of barrelImports) {
    console.error(`   - ${where}`);
  }
  console.error(
    '   The barrel re-exports every icon, and a bundler compiles all of them to find the one that is used.',
  );
  process.exit(1);
}
console.log('✓ Icons are imported per file, not from the @lucide/svelte barrel');
