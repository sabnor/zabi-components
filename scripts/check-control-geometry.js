/**
 * Fails when form controls drift off the shared height scale, or when a
 * component reaches for a t-shirt radius instead of a role radius.
 *
 * This is a static check on purpose: it runs in CI without a browser, and the
 * thing it guards is a source-level convention.
 *
 *   1. HEIGHT — Button, IconButton, Input, Select and Slider must use the same height
 *      utility for the same size. They previously rendered at 40/48/64,
 *      38/46/50 and 32/40/48 respectively, so a `lg` Button stood 14px taller
 *      than the `lg` Input beside it.
 *
 *      A control whose label may wrap (Button) declares the height as a
 *      minimum, `min-h-N`, so two lines make it taller instead of painting
 *      outside it. That only keeps the scale if one line never exceeds the
 *      minimum: such a box must state its vertical padding (`py-N`), and one
 *      line of the size's own text, that padding and a 1px border on each
 *      side must fit in the minimum height. Then a label that fits on one
 *      line is exactly as tall as the Input beside it.
 *
 *   2. TOUCH — on a coarse pointer the same controls must be at least 44px tall at
 *      `sm` and `md` (`pointer-coarse:min-h-11` in the size's `box`), and the
 *      square IconButton 44px wide as well. They all grow together, so a row
 *      still lines up on a phone. `lg` is 48px already. Without this a `md`
 *      Button was a 40px target on a touch screen, and an Input that grew
 *      alone would no longer line up with the Button beside it.
 *
 *   3. RADIUS — no component may use `rounded-{xs,sm,md,lg,xl,2xl,3xl}`.
 *      Radius is chosen by role (`rounded-control` / `rounded-container` /
 *      `rounded-overlay` / `rounded-pill`), never by size. The library
 *      previously had eight radii in play, from a 2px Badge to a 24px Modal.
 *      `rounded-button` is the control radius by default (src/app.css reads
 *      `--zabi-button-radius` and falls back to `--radius-control`), so an app
 *      can round its buttons without rounding its fields (Z-047). It is a
 *      rule change to match a decided design, not a loosened threshold: it is
 *      the same role radius, and a Button may use either class. The stylesheet
 *      is checked to keep that fallback, so `rounded-button` cannot drift off
 *      the control corner.
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

/**
 * Sizes that exist on one control only. IconButton has `xs`, a 24px box for
 * dense pointer-first layouts; no text control is that small, so it is not on
 * the shared scale, but it is pinned here so it cannot drift either.
 */
const EXTRA_HEIGHT = { 'atoms/IconButton.svelte': { xs: 'h-6' }, 'atoms/Button.svelte': { xl: 'h-14' } };

const CONTROLS = [
    'atoms/Button.svelte',
    'atoms/IconButton.svelte',
    'atoms/Input.svelte',
    'atoms/Select.svelte',
    'atoms/Slider.svelte',
];

/** Sizes below 44px, which have to grow on a coarse pointer. `lg` (48px) does not. */
const TOUCH_SIZES = ['sm', 'md'];
const TOUCH_MIN_HEIGHT = 'pointer-coarse:min-h-11';
const TOUCH_MIN_WIDTH = 'pointer-coarse:min-w-11';
/** Controls that are as wide as they are tall, so the width needs the minimum too. */
const SQUARE_CONTROLS = new Set(['atoms/IconButton.svelte']);

const BANNED_RADII = /(?<![\w-])rounded(-[trblxy]{1,2})?-(xs|sm|md|lg|xl|2xl|3xl)(?![\w-])/g;

/**
 * Pull the height out of each arm of a component's size map.
 *
 * Every control declares its box as `box: "h-10 px-4"` (or `box: "size-10"`
 * for the square IconButton), so the height is read from the `box` value only
 * — never from a spinner or icon class that happens to sit nearby.
 */
function boxesBySize(source, extraSizes = []) {
    const found = { sm: null, md: null, lg: null };
    for (const size of extraSizes) found[size] = null;

    // Arms are written as: if (size === "sm") ... box: "..."   / "lg" likewise.
    for (const size of ['sm', 'lg', ...extraSizes]) {
        const arm = new RegExp(`size === "${size}"[\\s\\S]{0,240}?box:\\s*"([^"]+)"`);
        const m = source.match(arm);
        if (m) found[size] = m[1];
    }

    // md is the fall-through arm: the last `box:` after the "lg" branch.
    const tail = source.split(/size === "lg"/).pop() || '';
    const boxes = [...tail.matchAll(/box:\s*"([^"]+)"/g)];
    if (boxes.length) found.md = boxes[boxes.length - 1][1];

    return found;
}

/**
 * The fine-pointer height in a `box` value: `h-N`, `size-N`, or `min-h-N` for
 * a control that grows with a wrapped label. A variant-prefixed class
 * (`pointer-coarse:min-h-11`) does not count.
 */
function heightOf(box) {
    if (!box) return null;
    const m = box.match(/(?<![\w:-])(?:min-h|h|size)-(\d+(?:\.\d+)?)(?![\w-])/);
    return m ? `h-${m[1]}` : null;
}

/** The line height that comes with each text size a control may set. */
const LINE_HEIGHT_PX = { 'text-xs': 16, 'text-sm': 20, 'text-base': 24, 'text-lg': 28 };
/** A bordered variant (outline) adds 1px above and below. */
const BORDER_PX = 2;

/** The `text:` value of each arm of the size map, as `boxesBySize` reads `box:`. */
function textsBySize(source, extraSizes = []) {
    const found = { sm: null, md: null, lg: null };
    for (const size of ['sm', 'lg', ...extraSizes]) {
        const arm = new RegExp(`size === "${size}"[\\s\\S]{0,240}?text:\\s*"([^"]+)"`);
        const m = source.match(arm);
        if (m) found[size] = m[1];
    }
    const tail = source.split(/size === "lg"/).pop() || '';
    const texts = [...tail.matchAll(/text:\s*"([^"]+)"/g)];
    if (texts.length) found.md = texts[texts.length - 1][1];
    return found;
}

/**
 * For a box whose height is a minimum: why one line of text could make it
 * taller than that minimum, or `null` when it cannot.
 */
function minHeightProblem(box, text) {
    if (!box) return null;
    const min = box.match(/(?<![\w:-])min-h-(\d+(?:\.\d+)?)(?![\w-])/);
    if (!min) return null;
    if (/(?<![\w:-])(?:h|size)-\d/.test(box)) return null;
    const py = box.match(/(?<![\w:-])py-(\d+(?:\.\d+)?)(?![\w-])/);
    if (!py) {
        return `has min-h-${min[1]} but no py-N: without a stated vertical padding one line cannot be shown to fit`;
    }
    const textClass = (text ?? '').split(/\s+/).find((name) => name in LINE_HEIGHT_PX);
    if (!textClass) {
        return `has min-h-${min[1]} but its text size (${text ?? 'none'}) is not one whose line height is known here`;
    }
    const linePx = LINE_HEIGHT_PX[textClass];
    const minPx = Number(min[1]) * 4;
    const onePx = linePx + 2 * Number(py[1]) * 4 + BORDER_PX;
    if (onePx > minPx) {
        return `py-${py[1]}, one ${linePx}px line of ${textClass} and a border are ${onePx}px, taller than min-h-${min[1]} (${minPx}px): a one-line label would leave the height scale`;
    }
    if (/(?<![\w-])(?:pt|pb)-\d/.test(box)) {
        return 'sets pt-N or pb-N beside py-N: the vertical padding must be the one py-N that is checked';
    }
    return null;
}

function heightsBySize(source, extraSizes = []) {
    const boxes = boxesBySize(source, extraSizes);
    return Object.fromEntries(Object.entries(boxes).map(([size, box]) => [size, heightOf(box)]));
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
        const extra = EXTRA_HEIGHT[rel] ?? {};
        const source = fs.readFileSync(full, 'utf8');
        const heights = heightsBySize(source, Object.keys(extra));
        table[rel] = heights;

        // Touch: sm and md grow to 44px on a coarse pointer, in every control alike.
        const boxes = boxesBySize(source);
        for (const size of TOUCH_SIZES) {
            const classes = (boxes[size] ?? '').split(/\s+/);
            if (!classes.includes(TOUCH_MIN_HEIGHT)) {
                failures.push(
                    `${rel}: size "${size}" is under 44px and its box has no ${TOUCH_MIN_HEIGHT} ` +
                    '(a touch target must be at least 44px tall on a coarse pointer)',
                );
            }
            if (SQUARE_CONTROLS.has(rel) && !classes.includes(TOUCH_MIN_WIDTH)) {
                failures.push(
                    `${rel}: size "${size}" is under 44px wide and its box has no ${TOUCH_MIN_WIDTH}`,
                );
            }
        }
        const texts = textsBySize(source);
        // Button's `xl` (56px) is held to the same rule as the shared sizes.
        const extraBoxes = boxesBySize(source, Object.keys(extra));
        const extraTexts = textsBySize(source, Object.keys(extra));
        for (const size of Object.keys(extra)) {
            const problem = minHeightProblem(extraBoxes[size], extraTexts[size]);
            if (problem) failures.push(`${rel}: size "${size}" ${problem}`);
        }
        for (const size of ['sm', 'md', 'lg']) {
            const problem = minHeightProblem(boxes[size], texts[size]);
            if (problem) failures.push(`${rel}: size "${size}" ${problem}`);
        }
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
        for (const [size, expected] of Object.entries(extra)) {
            if (!heights[size]) {
                failures.push(`${rel}: could not find a height utility for size "${size}"`);
            } else if (heights[size] !== expected) {
                failures.push(`${rel}: size "${size}" is ${heights[size]}, expected ${expected}`);
            }
        }
    }

    console.log('  component                 sm     md     lg     xs/xl');
    for (const [rel, h] of Object.entries(table)) {
        console.log(
            '  ' + rel.replace(/^.*\//, '').padEnd(24) +
            String(h.sm).padEnd(7) + String(h.md).padEnd(7) + String(h.lg).padEnd(7) + (h.xs ?? h.xl ?? ''),
        );
    }

    // 3. Radii
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
            't-shirt radii found — use rounded-control / rounded-button / rounded-container / rounded-overlay / rounded-pill:\n      ' +
            radiusOffenders.join('\n      '),
        );
    }

    // `rounded-button` stands for the control radius by default.
    const appCss = fs.readFileSync(path.join(__dirname, '../src/app.css'), 'utf8');
    if (!/\.rounded-button\s*\{\s*border-radius:\s*var\(--zabi-button-radius,\s*var\(--radius-control\)\);/.test(appCss)) {
        failures.push('src/app.css: .rounded-button must be `border-radius: var(--zabi-button-radius, var(--radius-control))`, the control radius unless an app sets the button radius');
    }

    if (failures.length) {
        console.error('\n❌ Control geometry check failed:\n');
        failures.forEach((f) => console.error('  • ' + f));
        console.error('');
        process.exit(1);
    }

    console.log('✓ Controls share one height scale and reach 44px on a coarse pointer; radii are role-based\n');
}

main();
