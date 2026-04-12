import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const snapshotFile = path.join(__dirname, '__snapshots__', 'theme-output.snap.json');
const targetFiles = [
  'dist/zabi-components-theme.css',
  'dist/zabi-components-theme-only.css',
  'dist/zabi-components-theme-dark-only.css',
  'dist/zabi-components-colors.css',
];

function hashFile(absolutePath) {
  const content = fs.readFileSync(absolutePath);
  return createHash('sha256').update(content).digest('hex');
}

function getCurrentHashes() {
  return targetFiles.reduce((acc, relativePath) => {
    acc[relativePath] = hashFile(path.join(projectRoot, relativePath));
    return acc;
  }, {});
}

function runBuildCss() {
  const result = spawnSync('npm', ['run', 'build:css'], {
    cwd: projectRoot,
    encoding: 'utf8',
  });
  if (result.status !== 0) {
    throw new Error(`build:css failed:\n${result.stdout}\n${result.stderr}`);
  }
}

test('theme output generation is deterministic across consecutive builds', () => {
  runBuildCss();
  const first = getCurrentHashes();
  runBuildCss();
  const second = getCurrentHashes();
  assert.deepEqual(second, first);
});

test('theme output hashes match frozen snapshots', () => {
  const current = getCurrentHashes();

  if (process.env.UPDATE_SNAPSHOTS === '1') {
    fs.writeFileSync(snapshotFile, `${JSON.stringify(current, null, 2)}\n`, 'utf8');
  }

  const expected = JSON.parse(fs.readFileSync(snapshotFile, 'utf8'));
  assert.deepEqual(current, expected);
});
