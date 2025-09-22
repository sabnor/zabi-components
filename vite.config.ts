import { defineConfig } from 'vite';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      preprocess: vitePreprocess(),
      compilerOptions: {
        dev: true
      }
    })
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ZabiComponents',
      fileName: (format) => `zabi-components.${format}.js`
    },
    rollupOptions: {
      external: ['svelte'],
      output: {
        globals: {
          svelte: 'Svelte'
        }
      }
    }
  },
  server: {
    fs: {
      strict: false
    }
  }
});
