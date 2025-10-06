import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        svelte({
            compilerOptions: {
                css: 'injected',
                runes: true
            },
            emitCss: false
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
            external: ['svelte', 'svelte/store', '@sveltejs/kit', '@sveltejs/adapter-auto', '$app/environment'],
            output: {
                globals: {
                    svelte: 'Svelte',
                    'svelte/store': 'SvelteStore',
                    '@sveltejs/kit': 'SvelteKit',
                    '@sveltejs/adapter-auto': 'SvelteKitAdapter',
                    '$app/environment': 'SvelteKitApp'
                },
                // Ensure proper module format for SvelteKit
                format: 'es',
                preserveModules: false
            }
        },
        outDir: 'dist',
        emptyOutDir: true,
        // Ensure proper CSS handling
        cssCodeSplit: false
    },
    // Ensure proper module resolution
    resolve: {
        alias: {
            '$lib': resolve(__dirname, 'src/lib')
        }
    }
});
