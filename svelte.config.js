import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter()
    },
    compilerOptions: {
        // Enable CSS extraction for library builds
        css: 'injected',
        runes: true
    }
};

export default config;
