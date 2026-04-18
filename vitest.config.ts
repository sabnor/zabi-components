import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { defineConfig } from 'vitest/config';

const projectRoot = dirname(fileURLToPath(import.meta.url));
const testingLibraryVitestSetup = join(
    projectRoot,
    'node_modules/@testing-library/svelte/src/vitest.js',
);

export default defineConfig({
    plugins: [sveltekit(), svelteTesting()],
    test: {
        environment: 'jsdom',
        globals: false,
        include: ['tests/**/*.test.ts'],
        setupFiles: [testingLibraryVitestSetup, './tests/vitest-setup.ts'],
        env: {
            STL_SKIP_AUTO_CLEANUP: 'true',
        },
    },
});
