#!/usr/bin/env node
/**
 * @lucide/svelte (0.544.x) ships `dist/icons/*.svelte.d.ts` with a duplicate
 * `type X = ReturnType<typeof X>` line that makes some TypeScript language
 * services treat the file as a non-module; re-exports from the package root
 * then fail (e.g. `Check` / `Copy` missing). Strip those lines after install.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconsDir = path.join(__dirname, "..", "node_modules", "@lucide", "svelte", "dist", "icons");

const duplicateTypeLine = /\r?\ntype (\w+) = ReturnType<typeof \1>;\r?\n/g;

function fixFile(filePath) {
    let text = fs.readFileSync(filePath, "utf8");
    const next = text.replace(duplicateTypeLine, "\n");
    if (next !== text) {
        fs.writeFileSync(filePath, next);
    }
}

function main() {
    if (!fs.existsSync(iconsDir)) {
        return;
    }
    for (const name of fs.readdirSync(iconsDir)) {
        if (!name.endsWith(".svelte.d.ts")) continue;
        fixFile(path.join(iconsDir, name));
    }
}

main();
