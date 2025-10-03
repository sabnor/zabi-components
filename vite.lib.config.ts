import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        svelte({
            compilerOptions: {
                css: 'injected'
            }
        })
    ],
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, 'src/lib/index.ts'),
                atoms: resolve(__dirname, 'src/components/atoms/index.ts'),
                molecules: resolve(__dirname, 'src/components/molecules/index.ts'),
                organisms: resolve(__dirname, 'src/components/organisms/index.ts'),
                types: resolve(__dirname, 'src/types/index.ts')
            },
            formats: ['es'],
            fileName: (format, entryName) => `${entryName}/index.js`
        },
        rollupOptions: {
            external: ['svelte', 'svelte/store', '@sveltejs/kit'],
            output: {
                globals: {
                    svelte: 'Svelte',
                    'svelte/store': 'SvelteStore',
                    '@sveltejs/kit': 'SvelteKit'
                }
            }
        },
        outDir: 'dist',
        emptyOutDir: true
    }
});
