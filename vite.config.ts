import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { brandThemes } from './vite-plugin-brand-themes.js';

// Read here rather than importing package.json from src: a source-level import
// makes the dev server fetch it over HTTP, and the repo root is outside
// `server.fs.allow`, so dev 404s while the production build silently inlines it.
const { version } = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default defineConfig({
  plugins: [sveltekit(), brandThemes()],
  server: {
    watch: {
      // Other checkouts of this repo live under .claude/worktrees. Vite
      // watched their generated tsconfig files too and reloaded every open
      // page, a running Playwright test included, whenever one of them built.
      ignored: ['**/.claude/**']
    }
  },
  define: {
    __PKG_VERSION__: JSON.stringify(version)
  }
});