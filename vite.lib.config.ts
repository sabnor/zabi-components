import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        svelte({
            compilerOptions: {
                // Avoid runtime CSS injection (uses document) for SSR safety
                css: 'external',
                runes: true  // Enable runes for Svelte 5 compatibility
            },
            // Extract CSS so SSR doesn't try to touch document at runtime
            emitCss: true,
            experimental: {
                inspector: false
            }
        })
    ],
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, 'src/routes/lib/index.ts'),
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
        // Extract CSS to a single file that the consumer can import
        cssCodeSplit: false
    },
    // Ensure proper module resolution
    resolve: {
        alias: {
            '$lib': resolve(__dirname, 'src/routes/lib')
        }
    }
});
