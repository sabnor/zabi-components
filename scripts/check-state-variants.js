#!/usr/bin/env node
/**
 * Fails when a component pairs a hand-written colour class with a state
 * variant that cannot win.
 *
 * The colour classes in src/app.css (`.text-description`, `.border-border`,
 * `.bg-card`, ...) are outside every cascade layer. A generated state variant
 * lives in `@layer utilities`, and an unlayered rule beats a layered one
 * whatever its specificity. So `text-description hover:text-headline` compiled,
 * looked right in review, and never changed colour on hover. Three such pairs
 * shipped before anyone noticed, because nothing fails: the class exists, it
 * just loses.
 *
 * A pair is safe when one of these holds:
 *   - src/app.css has a hand-written rule for the variant class itself
 *     (`.hover\:text-headline:hover`), the block headed "STATE VARIANTS OF THE
 *     HAND-WRITTEN COLOUR CLASSES";
 *   - src/app.css has a state rule on the base class for every state in the
 *     variant (`.bg-action-primary:hover` covers `hover:bg-action-primary-hover`);
 *   - the variant is `!important`.
 *
 * What it reads: every quoted string in src/components. Both classes have to
 * be in the same string to be seen, so a base class in one string and its
 * variant in another, joined by `cn()`, is not caught here.
 *
 * Run: node scripts/check-state-variants.js [path/to/app.css]
 * Also run by `npm test` through tests/state-variants.test.ts.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import postcss from 'postcss';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const defaultCssPath = path.join(root, 'src', 'app.css');
const componentsDir = path.join(root, 'src', 'components');

/** Variants that select a state of the element (or of its `group`). */
const STATE_VARIANTS = new Set(['hover', 'active', 'focus', 'focus-visible', 'focus-within', 'disabled', 'group-hover']);

/** Utility prefix → the property a hand-written colour class would also set. */
const GROUPS = { bg: 'background-color', text: 'color', border: 'border-color' };

/** Colour keywords Tailwind accepts without a token behind them. */
const COLOUR_KEYWORDS = new Set(['transparent', 'current', 'inherit', 'white', 'black']);

/**
 * Pairs that are known to be dead and are left dead on purpose.
 *
 * Restating these variants would replace an opaque fill (a white panel, a
 * selected row) with a transparent tint, which looks worse than no feedback.
 * They need a change in the component, not in the stylesheet. The list is
 * meant to reach empty; do not add to it.
 */
export const KNOWN_DEAD = new Set([
    'bg-card + hover:bg-surface-hover', // atoms/ActionPanel.svelte
    'bg-card + active:bg-surface-active', // atoms/ActionPanel.svelte
    'bg-brand-100 + active:bg-surface-active', // molecules/Tabs.svelte (selected pill)
]);

function unescapeClass(name) {
    return name.replace(/\\(.)/g, '$1');
}

function readStylesheet(cssPath) {
    const ast = postcss.parse(fs.readFileSync(cssPath, 'utf8'), { from: cssPath });
    const colourTokens = new Set();
    ast.walkAtRules('theme', (atRule) => {
        atRule.walkDecls(/^--color-/, (d) => colourTokens.add(d.prop.slice('--color-'.length)));
    });

    /** class → Set of properties, for unlayered single-class rules */
    const baseClasses = new Map();
    /** variant class names that have a hand-written rule (`hover:text-body`) */
    const variantRules = new Set();
    /** `base|state` for rules such as `.bg-action-primary:hover` */
    const baseStateRules = new Set();

    ast.each((node) => {
        if (node.type !== 'rule') return;
        for (const selector of node.selectors) {
            // The subject is the last compound: `.group:hover .group-hover\:x` → `.group-hover\:x`.
            const subject = selector.trim().split(/\s+/).pop();
            const m = /^\.((?:\\.|[\w-])+)((?::[\w-]+)*)$/.exec(subject);
            if (!m) continue;
            const name = unescapeClass(m[1]);
            const states = m[2] ? m[2].slice(1).split(':') : [];
            const props = new Set();
            node.walkDecls((d) => {
                if (Object.values(GROUPS).includes(d.prop)) props.add(d.prop);
            });
            if (name.includes(':')) {
                variantRules.add(name);
            } else if (states.length === 0 && selector.trim() === subject) {
                if (props.size) baseClasses.set(name, new Set([...(baseClasses.get(name) ?? []), ...props]));
            } else if (selector.trim() === subject) {
                for (const state of states) baseStateRules.add(`${name}|${state}`);
            }
        }
    });

    return { colourTokens, baseClasses, variantRules, baseStateRules };
}

function readFilesRecursively(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) return readFilesRecursively(full);
        return /\.(svelte|ts|js)$/.test(entry.name) ? [full] : [];
    });
}

/** `hover:text-headline/90` → { states: ['hover'], group: 'color' } when it is a colour state variant. */
function parseVariant(token, colourTokens) {
    if (token.startsWith('!') || token.endsWith('!')) return null;
    const parts = token.split(':');
    if (parts.length < 2) return null;
    const utility = parts.pop();
    if (utility.startsWith('!')) return null;
    if (!parts.every((p) => STATE_VARIANTS.has(p))) return null;
    const m = /^(bg|text|border)-(.+?)(?:\/\d+)?$/.exec(utility);
    if (!m) return null;
    if (!colourTokens.has(m[2]) && !COLOUR_KEYWORDS.has(m[2])) return null;
    return { states: parts.map((p) => p.replace(/^group-/, '')), group: GROUPS[m[1]] };
}

export function checkStateVariants({ cssPath = defaultCssPath } = {}) {
    const { colourTokens, baseClasses, variantRules, baseStateRules } = readStylesheet(cssPath);
    const dead = new Map();
    const known = new Set();
    let pairsSeen = 0;

    for (const file of readFilesRecursively(componentsDir)) {
        const source = fs.readFileSync(file, 'utf8');
        for (const match of source.matchAll(/(["'`])((?:(?!\1)[^\\]|\\.)*)\1/g)) {
            const tokens = [...new Set(match[2].split(/[\s{}$]+/).filter(Boolean))];
            if (tokens.length < 2) continue;
            for (const token of tokens) {
                const variant = parseVariant(token, colourTokens);
                if (!variant) continue;
                for (const base of tokens) {
                    if (!baseClasses.get(base)?.has(variant.group)) continue;
                    pairsSeen += 1;
                    // `border-error focus-visible:border-error` restates the base: nothing to lose.
                    if (token.endsWith(`:${base}`)) continue;
                    if (variantRules.has(token)) continue;
                    if (variant.states.every((state) => baseStateRules.has(`${base}|${state}`))) continue;
                    const pair = `${base} + ${token}`;
                    if (KNOWN_DEAD.has(pair)) {
                        known.add(pair);
                        continue;
                    }
                    if (!dead.has(pair)) dead.set(pair, new Set());
                    dead.get(pair).add(path.relative(root, file));
                }
            }
        }
    }

    const errors = [...dead].map(
        ([pair, files]) =>
            `${pair} (${[...files].join(', ')}): the unlayered base class beats the generated variant; ` +
            `add a hand-written rule for the variant to src/app.css`,
    );
    for (const pair of KNOWN_DEAD) {
        if (!known.has(pair)) errors.push(`${pair}: listed in KNOWN_DEAD but no component uses it any more; remove the entry`);
    }

    return { errors, pairsSeen, known: [...known] };
}

const invokedDirectly = import.meta.url === pathToFileURL(process.argv[1] ?? '').href;
if (invokedDirectly) {
    console.log('🔍 Checking state variants of the hand-written colour classes...');
    const { errors, pairsSeen, known } = checkStateVariants(
        process.argv[2] ? { cssPath: path.resolve(process.argv[2]) } : {},
    );
    if (known.length) {
        console.warn(`⚠️  ${known.length} known dead pairs left for a component change: ${known.join('; ')}`);
    }
    if (errors.length) {
        console.error('❌ Dead state variants:');
        errors.forEach((e) => console.error(`   - ${e}`));
        process.exit(1);
    }
    console.log(`✓ ${pairsSeen} base/variant pairs in src/components all have a rule that wins`);
}
