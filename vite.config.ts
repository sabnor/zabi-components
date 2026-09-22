import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';

// Read here rather than importing package.json from src: a source-level import
// makes the dev server fetch it over HTTP, and the repo root is outside
// `server.fs.allow`, so dev 404s while the production build silently inlines it.
const { version } = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default defineConfig({
  plugins: [sveltekit()],
  define: {
    __PKG_VERSION__: JSON.stringify(version)
  }
});