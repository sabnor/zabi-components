/**
 * Fails when form controls drift off the shared height scale, or when a
 * component reaches for a t-shirt radius instead of a role radius.
 *
 * This is a static check on purpose: it runs in CI without a browser, and the
 * thing it guards is a source-level convention.
 *
 *   1. HEIGHT — Button, IconButton, Input and Select must use the same height
 *      utility for the same size. They previously rendered at 40/48/64,
 *      38/46/50 and 32/40/48 respectively, so a `lg` Button stood 14px taller
 *      than the `lg` Input beside it.
 *
 *   2. RADIUS — no component may use `rounded-{xs,sm,md,lg,xl,2xl,3xl}`.
 *      Radius is chosen by role (`rounded-control` / `rounded-container` /
 *      `rounded-overlay` / `rounded-pill`), never by size. The library
 *      previously had eight radii in play, from a 2px Badge to a 24px Modal.
 *
 * Run: node scripts/check-control-geometry.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const componentsDir = path.join(__dirname, '../src/components');

/** The shared scale. `size-N` counts as `h-N` (square controls). */
const EXPECTED_HEIGHT = { sm: 'h-8', md: 'h-10', lg: 'h-12' };

const CONTROLS = [
    'atoms/Button.svelte',
    'atoms/IconButton.svelte',
    'atoms/Input.svelte',
    'atoms/Select.svelte',
];

const BANNED_RADII = /(?<![\w-])rounded(-[trblxy]{1,2})?-(xs|sm|md|lg|xl|2xl|3xl)(?![\w-])/g;

/**
 * Pull the height out of each arm of a component's size map.
 *
 * Every control declares its box as `box: "h-10 px-4"` (or `box: "size-10"`
 * for the square IconButton), so the height is read from the `box` value only
 * — never from a spinner or icon class that happens to sit nearby.
 */
function heightsBySize(source) {
    const found = { sm: null, md: null, lg: null };
    const heightOf = (box) => {
        const m = box.match(/(?<![\w-])(?:h|size)-(\d+(?:\.\d+)?)(?![\w-])/);
        return m ? `h-${m[1]}` : null;
    };

    // Arms are written as: if (size === "sm") ... box: "..."   / "lg" likewise.
    for (const size of ['sm', 'lg']) {
        const arm = new RegExp(`size === "${size}"[\\s\\S]{0,240}?box:\\s*"([^"]+)"`);
        const m = source.match(arm);
        if (m) found[size] = heightOf(m[1]);
    }

    // md is the fall-through arm: the last `box:` after the "lg" branch.
    const tail = source.split(/size === "lg"/).pop() || '';
    const boxes = [...tail.matchAll(/box:\s*"([^"]+)"/g)];
    if (boxes.length) found.md = heightOf(boxes[boxes.length - 1][1]);

    return found;
}

function walk(dir) {
    const out = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) out.push(...walk(full));
        else if (entry.name.endsWith('.svelte')) out.push(full);
    }
    return out;
}

function main() {
    const failures = [];

    console.log('🔍 Validating control geometry...');

    // 1. Heights
    const table = {};
    for (const rel of CONTROLS) {
        const full = path.join(componentsDir, rel);
        if (!fs.existsSync(full)) {
            failures.push(`${rel} not found`);
            continue;
        }
        const heights = heightsBySize(fs.readFileSync(full, 'utf8'));
        table[rel] = heights;
        for (const size of ['sm', 'md', 'lg']) {
            if (!heights[size]) {
                failures.push(`${rel}: could not find a height utility for size "${size}"`);
            } else if (heights[size] !== EXPECTED_HEIGHT[size]) {
                failures.push(
                    `${rel}: size "${size}" is ${heights[size]}, expected ${EXPECTED_HEIGHT[size]} ` +
                    '(controls of the same size must be the same height)',
                );
            }
        }
    }

    console.log('  component                 sm     md     lg');
    for (const [rel, h] of Object.entries(table)) {
        console.log(
            '  ' + rel.replace(/^.*\//, '').padEnd(24) +
            String(h.sm).padEnd(7) + String(h.md).padEnd(7) + String(h.lg),
        );
    }

    // 2. Radii
    const radiusOffenders = [];
    for (const file of walk(componentsDir)) {
        const source = fs.readFileSync(file, 'utf8');
        const hits = [...source.matchAll(BANNED_RADII)].map((m) => m[0]);
        if (hits.length) {
            radiusOffenders.push(`${path.relative(componentsDir, file)}: ${[...new Set(hits)].join(', ')}`);
        }
    }
    if (radiusOffenders.length) {
        failures.push(
            't-shirt radii found — use rounded-control / rounded-container / rounded-overlay / rounded-pill:\n      ' +
            radiusOffenders.join('\n      '),
        );
    }

    if (failures.length) {
        console.error('\n❌ Control geometry check failed:\n');
        failures.forEach((f) => console.error('  • ' + f));
        console.error('');
        process.exit(1);
    }

    console.log('✓ Controls share one height scale; radii are role-based\n');
}

main();
