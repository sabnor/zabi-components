import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

/**
 * Size of every built stylesheet in dist/, raw and gzip -9, in bytes.
 * Run after `npm run build:css`.
 */
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const files = fs.existsSync(dist) ? fs.readdirSync(dist).filter((name) => name.endsWith('.css')).sort() : [];
if (files.length === 0) {
  console.error('No dist/*.css found. Run npm run build:css first.');
  process.exit(1);
}

const rows = files.map((name) => {
  const buffer = fs.readFileSync(path.join(dist, name));
  return [name, buffer.length, zlib.gzipSync(buffer, { level: 9 }).length];
});
const width = Math.max(4, ...rows.map(([name]) => name.length));
const num = (n) => n.toLocaleString('en-US').padStart(10);
console.log(`${'file'.padEnd(width)}  ${'raw'.padStart(10)}  ${'gzip -9'.padStart(10)}`);
for (const [name, raw, gz] of rows) console.log(`${name.padEnd(width)}  ${num(raw)}  ${num(gz)}`);
