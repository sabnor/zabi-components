#!/usr/bin/env node
/**
 * After `tsc` with `emitDeclarationOnly`, declaration files under `dist/components/types/`
 * pair with specifiers like `page.types.js` / `variants.js`, but tsc emits no `.js` there.
 * `dist/types/*.d.ts` re-exports from `../components/types/*.js`, so those runtime modules
 * must exist for consumers and strict resolution. Writes:
 * - `dist/components/types/page.types.js` — empty ESM (types-only source)
 * - `dist/components/types/variants.js` — transpiled from `src/components/types/variants.ts`
 *   (single canonical runtime for `isSemanticVariant` / `isExtendedSemanticVariant`)
 * - `dist/types/variants.js` — re-exports from `../components/types/variants.js` so it matches
 *   `dist/types/variants.d.ts` (also a re-export) and avoids duplicating implementations.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as ts from 'typescript';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'dist', 'components', 'types');

fs.mkdirSync(outDir, { recursive: true });

const pageTypesJs = path.join(outDir, 'page.types.js');
fs.writeFileSync(pageTypesJs, 'export {};\n', 'utf8');
console.log(`✓ Wrote ${path.relative(root, pageTypesJs)}`);

const variantsSrcPath = path.join(root, 'src', 'components', 'types', 'variants.ts');
const variantsSrc = fs.readFileSync(variantsSrcPath, 'utf8');
const { outputText, diagnostics } = ts.transpileModule(variantsSrc, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2020,
    removeComments: false,
  },
  fileName: 'variants.ts',
  reportDiagnostics: true,
});

if (diagnostics?.length) {
  const text = diagnostics.map((d) => d.messageText).join('\n');
  console.error('❌ transpileModule diagnostics for variants.ts:\n', text);
  process.exit(1);
}

const variantsJs = path.join(outDir, 'variants.js');
fs.writeFileSync(variantsJs, outputText, 'utf8');
console.log(`✓ Wrote ${path.relative(root, variantsJs)}`);

const typesRootDir = path.join(root, 'dist', 'types');
fs.mkdirSync(typesRootDir, { recursive: true });
const variantsTypesEntryJs = path.join(typesRootDir, 'variants.js');
fs.writeFileSync(
  variantsTypesEntryJs,
  "export * from '../components/types/variants.js';\n",
  'utf8',
);
console.log(`✓ Wrote ${path.relative(root, variantsTypesEntryJs)}`);
