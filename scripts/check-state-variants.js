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
 * What it reads, in src/components:
 *   - every run of text between two quote characters, as one class list;
 *   - class lists that are written apart and joined: the arguments of one
 *     `cn()` call, the parts of one template literal, the parts of one
 *     `class` attribute. Where a part is a name declared in the same file
 *     (`variantClasses`, `sizeClass()`), every string in that declaration
 *     stands for it.
 * Both rules are there because the narrower ones let real pairs through:
 *   - Opening and closing quotes used to be matched as pairs. An apostrophe
 *     in a comment earlier in MediaGrid shifted the pairing, its class list
 *     was read as the gap between two strings, and
 *     `.enabled\:hover\:border-border-medium` could be deleted unnoticed.
 *   - A base class and its variant had to be in one string. Card keeps
 *     `bg-card` in one and `hover:bg-card-hover active:bg-card-active` in
 *     another and joins them with `cn()`, so deleting either rule passed.
 * The strings of ONE declaration are alternatives (a `switch` over variants),
 * so they are paired with what they are joined to and not with each other.
 * That makes pairs the component never renders; the ones in the code today are
 * listed in NEVER_TOGETHER, each with the reason. A join the reader cannot
 * follow (a name imported from another file, a string built in a loop) is
 * still unseen.
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
const STATE_VARIANTS = new Set(['hover', 'active', 'focus', 'focus-visible', 'focus-within', 'disabled', 'enabled', 'group-hover']);

/** Utility prefix → the property a hand-written colour class would also set. */
const GROUPS = { bg: 'background-color', text: 'color', border: 'border-color' };

/** Colour keywords Tailwind accepts without a token behind them. */
const COLOUR_KEYWORDS = new Set(['transparent', 'current', 'inherit', 'white', 'black']);

/**
 * Pairs that are known to be dead and are left dead on purpose.
 *
 * For a pair where restating the variant would do harm: it would replace an
 * opaque fill (a white panel, a selected row) with a transparent tint, which
 * looks worse than no feedback. Such a pair needs a change in the component,
 * not in the stylesheet. Three were listed here until ActionPanel and Tabs
 * were fixed. The list is empty and should stay empty.
 */
export const KNOWN_DEAD = new Set([]);

/**
 * `file: base + variant` for a pair the reader puts together and the component
 * never does, with the reason. Following a join means taking every string a
 * name can stand for, and a `switch` over variants in one declaration meets a
 * `switch` over variants in another: the reader sees each arm of the first
 * with each arm of the second, the component only the matching ones.
 *
 * An entry is a statement about the component, so check it against the code
 * before adding one. An entry no file produces any more is an error.
 */
const ICON_BUTTON = 'src/components/atoms/IconButton.svelte';
const ICON_BUTTON_DANGER_TONE =
    'bg-action-danger-subtle is the held fill of the danger tone (ghost or outline); this pressed rule is in variantClass for ';
const ICON_BUTTON_TOGGLED =
    'bg-action-primary-subtle is the held fill of a toggled-on ghost, outline or link button; this pressed rule is in variantClass for ';
export const NEVER_TOGETHER = new Map([
    [`${ICON_BUTTON}: bg-action-danger-subtle + active:bg-action-secondary-active`, `${ICON_BUTTON_DANGER_TONE}secondary`],
    [`${ICON_BUTTON}: bg-action-danger-subtle + active:bg-action-danger-active`, `${ICON_BUTTON_DANGER_TONE}the solid danger variant`],
    [`${ICON_BUTTON}: bg-action-danger-subtle + active:bg-action-primary-active`, `${ICON_BUTTON_DANGER_TONE}primary`],
    [
        `${ICON_BUTTON}: bg-action-danger-subtle + active:bg-surface-active`,
        `${ICON_BUTTON_DANGER_TONE}ghost and outline in the default tone; the danger tone returns before that switch`,
    ],
    [`${ICON_BUTTON}: bg-action-primary-subtle + active:bg-action-secondary-active`, `${ICON_BUTTON_TOGGLED}secondary`],
    [`${ICON_BUTTON}: bg-action-primary-subtle + active:bg-action-danger-active`, `${ICON_BUTTON_TOGGLED}the solid danger variant`],
    [`${ICON_BUTTON}: bg-action-primary-subtle + active:bg-action-primary-active`, `${ICON_BUTTON_TOGGLED}primary`],
    [
        // Together, and meant to lose: pressedClass restates the pressed fill for
        // the toggled-on state in its own string, and that one has a rule.
        `${ICON_BUTTON}: bg-action-primary-subtle + active:bg-surface-active`,
        'on one element when a ghost or outline button is toggled on, where active:bg-action-primary-subtle-hover (same string as the base, hand-written rule) is the pressed fill',
    ],
    [
        'src/components/molecules/Tabs.svelte: bg-action-primary-subtle + active:bg-surface-active',
        'bg-action-primary-subtle is the selected tab of the pill variant, which carries active:bg-action-primary-subtle-hover; active:bg-surface-active is on an unselected tab and on the selected tab of the default variant',
    ],
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

    // Top-level rules, and the ones inside `@media (hover: hover)`: the
    // hand-written hover rules are gated there so a tap does not leave them
    // on, and a rule in a media query is as unlayered as one outside it.
    const rules = [];
    /** Rules that only apply where a pointer can hover. */
    const hoverOnly = new Set();
    ast.each((node) => {
        if (node.type === 'rule') rules.push(node);
        else if (node.type === 'atrule' && node.name === 'media' && /^\(\s*hover:\s*hover\s*\)$/.test(node.params.trim())) {
            node.each((child) => {
                if (child.type !== 'rule') return;
                rules.push(child);
                hoverOnly.add(child);
            });
        }
    });

    for (const node of rules) {
        for (const selector of node.selectors) {
            // Only a hover rule may sit in the hover query. A pressed, focus or
            // disabled rule there would do nothing on a touch screen, so it does
            // not count as the rule that wins.
            if (hoverOnly.has(node) && !/:hover(?![\w-])/.test(selector)) continue;
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
    }

    return { colourTokens, baseClasses, variantRules, baseStateRules };
}

function readFilesRecursively(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) return readFilesRecursively(full);
        return /\.(svelte|ts|js)$/.test(entry.name) ? [full] : [];
    });
}

/** The class names in a piece of source, one list per run of text between quotes. */
function classLists(text) {
    // Split on every quote character instead of matching pairs of them: an
    // apostrophe in a comment must not decide what counts as a string. A
    // class list holds no quotes, so it is always inside one segment.
    return text
        .split(/["'`]/)
        .map((segment) => [...new Set(segment.split(/[\s{}$]+/).filter(Boolean))])
        .filter((tokens) => tokens.length > 0);
}

/** Index just past the bracket that closes the one opened at `open`. */
function closing(source, open) {
    const pairs = { '(': ')', '{': '}', '[': ']' };
    const close = pairs[source[open]];
    let depth = 0;
    for (let i = open; i < source.length; i += 1) {
        if (source[i] === source[open]) depth += 1;
        else if (source[i] === close && (depth -= 1) === 0) return i + 1;
    }
    return source.length;
}

/**
 * Every declaration that can hold class lists: `const x = …;`, `let x = …;`
 * and `function x(…) { … }`, with where it starts. The end of a `const` is
 * the first `;` outside every bracket, counted without regard to strings:
 * brackets inside a class list (`active:scale-[0.98]`) are balanced.
 */
function declarations(source) {
    const found = [];
    for (const match of source.matchAll(/\b(?:const|let)\s+([A-Za-z_$][\w$]*)\s*(?::[^=;]+)?=(?!=|>)/g)) {
        let depth = 0;
        let end = match.index + match[0].length;
        for (; end < source.length; end += 1) {
            const char = source[end];
            if ('([{'.includes(char)) depth += 1;
            else if (')]}'.includes(char)) depth -= 1;
            else if (char === ';' && depth <= 0) break;
            if (depth < 0) break;
        }
        found.push({ name: match[1], at: match.index, lists: classLists(source.slice(match.index + match[0].length, end)) });
    }
    for (const match of source.matchAll(/\bfunction\s+([A-Za-z_$][\w$]*)\s*\(/g)) {
        const body = source.indexOf('{', closing(source, match.index + match[0].length - 1));
        if (body >= 0) found.push({ name: match[1], at: match.index, lists: classLists(source.slice(body, closing(source, body))) });
    }
    return found.filter((declaration) => declaration.lists.length > 0).sort((x, y) => x.at - y.at);
}

/**
 * The places where class lists are put together, each as its parts. A part is
 * a set of alternative lists: one literal string, or everything a name
 * declared in this file can stand for.
 *
 * A name means the nearest declaration above the join, as it does to the
 * compiler in all the code here: Toggle has a `const base` in the function
 * for its track and another in the function for its thumb, and they are two
 * elements.
 */
function joins(source) {
    const declared = declarations(source);
    /** { at, text, host }: `host` is the text of the join that is itself a class list. */
    const found = [];
    for (const match of source.matchAll(/\bcn\(/g)) {
        const open = match.index + match[0].length - 1;
        found.push({ at: match.index, text: source.slice(open + 1, closing(source, open) - 1) });
    }
    // A template literal and a written-out class attribute are class lists
    // with holes: `a b ${on ? "c" : "d"}` and class="a b {on ? 'c' : 'd'}".
    // What is outside the holes is on the element with whatever fills them.
    const withHoles = (at, text, hole) => {
        let host = '';
        let inside = '';
        for (let i = 0; i < text.length; i += 1) {
            if (text.startsWith(hole, i)) {
                const end = closing(text, i + hole.length - 1);
                inside += ` ${text.slice(i + hole.length, end - 1)} `;
                host += ' ';
                i = end - 1;
            } else host += text[i];
        }
        found.push({ at, text: inside, host });
    };
    for (const match of source.matchAll(/`([^`]*\$\{[^`]*)`/g)) withHoles(match.index, match[1], '${');
    for (const match of source.matchAll(/\bclass="([^"]*\{[^"]*)"/g)) withHoles(match.index, match[1], '{');
    for (const match of source.matchAll(/\bclass=\{/g)) {
        const open = match.index + match[0].length - 1;
        found.push({ at: match.index, text: source.slice(open + 1, closing(source, open) - 1) });
    }

    return found.map(({ at, text, host }) => {
        // `literal` marks a string written in the join itself. Two of those are
        // not paired with each other: they are as often the two arms of a
        // ternary as two lists on one element, and one string is one list.
        const parts = classLists(text).map((list) => ({ literal: true, lists: [list] }));
        if (host) parts.push({ literal: false, lists: classLists(host) });
        for (const name of new Set(declared.map((declaration) => declaration.name))) {
            if (!new RegExp(`(?<![\\w$.-])${name.replace(/\$/g, '\\$')}(?![\\w$-])`).test(text)) continue;
            const candidates = declared.filter((declaration) => declaration.name === name);
            const above = candidates.filter((declaration) => declaration.at < at);
            parts.push({ literal: false, lists: (above.length ? above[above.length - 1] : candidates[0]).lists });
        }
        return parts;
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
    const apart = new Set();
    let pairsSeen = 0;

    for (const file of readFilesRecursively(componentsDir)) {
        const source = fs.readFileSync(file, 'utf8');
        const relative = path.relative(root, file);
        /** One base class and one variant that end up on the same element. */
        const seen = new Set();
        const pairUp = (token, base) => {
            const variant = parseVariant(token, colourTokens);
            if (!variant) return;
            if (!baseClasses.get(base)?.has(variant.group)) return;
            const pair = `${base} + ${token}`;
            if (seen.has(pair)) return;
            seen.add(pair);
            pairsSeen += 1;
            // `border-error focus-visible:border-error` restates the base: nothing to lose.
            if (token.endsWith(`:${base}`)) return;
            if (variantRules.has(token)) return;
            if (variant.states.every((state) => baseStateRules.has(`${base}|${state}`))) return;
            if (KNOWN_DEAD.has(pair)) {
                known.add(pair);
                return;
            }
            if (NEVER_TOGETHER.has(`${relative}: ${pair}`)) {
                apart.add(`${relative}: ${pair}`);
                return;
            }
            if (!dead.has(pair)) dead.set(pair, new Set());
            dead.get(pair).add(relative);
        };

        // Within one class list.
        for (const tokens of classLists(source)) {
            if (tokens.length < 2) continue;
            for (const token of tokens) for (const base of tokens) pairUp(token, base);
        }
        // Across the parts of one join, in both directions; never between two
        // alternatives of the same part.
        for (const parts of joins(source)) {
            for (const [i, variants] of parts.entries()) {
                for (const [j, bases] of parts.entries()) {
                    if (i === j || (variants.literal && bases.literal)) continue;
                    for (const tokens of variants.lists) {
                        for (const token of tokens) {
                            if (!token.includes(':')) continue;
                            for (const list of bases.lists) for (const base of list) pairUp(token, base);
                        }
                    }
                }
            }
        }
    }

    const errors = [...dead].map(
        ([pair, files]) =>
            `${pair} (${[...files].join(', ')}): the unlayered base class beats the generated variant; ` +
            `add a hand-written rule for the variant to src/app.css`,
    );
    for (const entry of NEVER_TOGETHER.keys()) {
        if (!apart.has(entry)) errors.push(`${entry}: listed in NEVER_TOGETHER but the reader no longer pairs them; remove the entry`);
    }
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
