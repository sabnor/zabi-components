/**
 * `virtual:zabi-brand-themes`: the brands in src/lib/marketing/brand-inputs.ts,
 * run through `createTheme` when the site starts or builds.
 *
 * The site demonstrates rebranding with a generated theme, so the theme has to
 * come from the generator and not from a copy of its output. The generator's
 * source (create-theme/) imports `./theme-data.js`, which only exists once
 * scripts/build-create-theme.js has written it into dist/. `npm run build:site`
 * does not build the library, so this assembles the generator the way that
 * script does, from the same exported pieces, in node_modules/.cache, and
 * leaves dist/ alone.
 *
 * Exports
 *   default            { [id]: { options, css, tokens, warnings, closest } }
 *   defaultBrandRamp   the stylesheet's own --zabi-brand-* values, for showing
 *                      the default brand while another one is on the page
 *
 * Used by vite.config.ts (site, Storybook) and vitest.config.ts.
 */

import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
    GENERATOR_FILES,
    THEME_DATA_FILE,
    buildThemeData,
    renderThemeData,
} from './scripts/build-create-theme.js';
import { GENERATED_BRANDS } from './src/lib/marketing/brand-inputs.ts';

const root = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.join(root, 'create-theme');
const cacheRoot = path.join(root, 'node_modules', '.cache', 'zabi-brand-themes');

const VIRTUAL_ID = 'virtual:zabi-brand-themes';
const RESOLVED_ID = `\0${VIRTUAL_ID}`;

/**
 * The generator with today's theme data beside it. The directory is named by
 * a hash of everything in it, so an edit to src/app.css or to the generator
 * gets a fresh copy and Node's module cache cannot serve the old one.
 */
async function loadCreateTheme(themeData) {
    const files = GENERATOR_FILES.map((file) => [file, fs.readFileSync(path.join(sourceDir, file))]);
    const hash = createHash('sha256').update(themeData);
    for (const [, content] of files) hash.update(content);
    const dir = path.join(cacheRoot, hash.digest('hex').slice(0, 16));

    if (!fs.existsSync(path.join(dir, THEME_DATA_FILE))) {
        // Written beside the target and renamed, so two processes starting at
        // once (vitest and a dev server) never import a half-written copy.
        const staging = `${dir}.${process.pid}`;
        for (const [file, content] of files) {
            const target = path.join(staging, file);
            fs.mkdirSync(path.dirname(target), { recursive: true });
            fs.writeFileSync(target, content);
        }
        // node_modules ends the lookup for the project's package.json.
        fs.writeFileSync(path.join(staging, 'package.json'), '{ "type": "module" }\n');
        fs.writeFileSync(path.join(staging, THEME_DATA_FILE), themeData);
        try {
            fs.renameSync(staging, dir);
        } catch {
            fs.rmSync(staging, { recursive: true, force: true });
        }
    }

    const { createTheme } = await import(pathToFileURL(path.join(dir, 'index.js')).href);
    return createTheme;
}

export function brandThemes() {
    return {
        name: 'zabi-brand-themes',
        resolveId(id) {
            return id === VIRTUAL_ID ? RESOLVED_ID : null;
        },
        async load(id) {
            if (id !== RESOLVED_ID) return null;
            this.addWatchFile(path.join(root, 'src', 'app.css'));
            this.addWatchFile(path.join(root, 'src', 'lib', 'marketing', 'brand-inputs.ts'));

            const data = buildThemeData();
            const createTheme = await loadCreateTheme(renderThemeData(data));

            const themes = Object.fromEntries(
                Object.entries(GENERATED_BRANDS).map(([name, options]) => [
                    name,
                    { options, ...createTheme(options) },
                ]),
            );
            const defaultBrandRamp = Object.fromEntries(
                Object.entries(data.light).filter(([name]) => /^--zabi-brand-\d+$/.test(name)),
            );

            return (
                `export const defaultBrandRamp = ${JSON.stringify(defaultBrandRamp)};\n` +
                `export default ${JSON.stringify(themes)};\n`
            );
        },
    };
}
