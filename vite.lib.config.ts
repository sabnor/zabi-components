import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        svelte({
            compilerOptions: {
                css: 'injected',
                runes: true  // Enable runes for Svelte 5 compatibility
            },
            emitCss: false,
            experimental: {
                inspector: false
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
                types: resolve(__dirname, 'src/types/index.ts'),
                react: resolve(__dirname, 'src/react/index.ts')
            },
            formats: ['es'],
            fileName: (format, entryName) => `${entryName}/index.js`
        },
        rollupOptions: {
            external: [
                /^svelte($|\/)/,
                '@sveltejs/kit',
                '@sveltejs/adapter-auto',
                '$app/environment',
                'react'
            ],
            output: {
                // Ensure proper module format for SvelteKit
                format: 'es',
                preserveModules: true,
                preserveModulesRoot: 'src'
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
