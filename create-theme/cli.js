#!/usr/bin/env node
/**
 * zabi-theme — the command line over createTheme.
 *
 *   npx zabi-theme --brand "#0026EA" --out src/lib/brand.generated.css
 *
 * The stylesheet goes to --out, or to stdout. Everything else (warnings, the
 * one-line summary) goes to stderr, so `zabi-theme … > file.css` stays clean.
 *
 * Exit codes: 0 done · 1 --strict and a role pair is below WCAG AA · 2 bad usage.
 */

import fs from 'node:fs';
import path from 'node:path';
import { createTheme } from './index.js';

const HELP = `zabi-theme: generate brand tokens for zabi-components

Usage
  zabi-theme --brand <hex> [--pin] [--accent <hex>] [--pin-accent] [--neutral <hex>]
             [--neutral-chroma <n>] [--dark-primary brand|mirror]
             [--out <file>] [--strict] [--set <token>=<value> ...]
             [--set-light <token>=<value> ...] [--set-dark <token>=<value> ...]

Options
  --brand <hex>     Brand colour (required). Builds --zabi-brand-50 … 950.
  --pin             Put the exact brand colour on primary buttons (see below).
  --accent <hex>    Second brand colour. Builds --zabi-accent-50 … 950.
  --pin-accent      The same for the solid accent fill. Needs --accent.
  --neutral <hex>   Tints the 21-step neutral ramp, --zabi-base-50 … 950.
  --neutral-chroma <n>
                    Chroma at the neutral ramp's peak, 0 to 0.1 (OKLCH). Default: the
                    hue of --neutral at most 0.03. Use 0.04 to 0.06 for a clearly
                    tinted neutral. Needs --neutral. With it, the ink roles (secondary
                    button, hover and pressed tints, overlay edge, shadow colour)
                    follow the neutral ramp instead of staying grey.
  --dark-primary <brand|mirror>
                    Dark primary and danger fills. brand (default): the same steps as
                    light, with a white label. mirror: the 8.1 pale mirrored steps.
  --out <file>      Write the CSS here. Without it the CSS goes to stdout.
  --strict          Exit 1 when any role pair is below WCAG AA.
  --set <t>=<v>     Also write this declaration, e.g. --set "--color-link=var(--color-brand-800)".
                    Repeatable. It applies in light and dark and is contrast-checked.
  --set-light <t>=<v>
                    The same, for light only. Dark keeps the library's own value for that
                    token: the file restates it under the dark selectors. Repeatable.
  --set-dark <t>=<v>
                    The same, for dark only. Repeatable. A token given to --set and to
                    --set-light or --set-dark: the mode-specific value wins in its mode.
  --help            Show this text.

Each ramp is built on the library's lightness curve. Your colour supplies hue
and chroma and is not pinned to a step, so the exact hex may not appear in the
file; the header says which step is closest.

With --pin the ramp is the same, and the primary action is the exact colour in
light: the fill, its hover and pressed states, and where they still pass, the
focus ring and links. The label is white or the ramp's dark end, whichever
reaches 4.5:1. Dark takes the colour only if it passes there; otherwise dark
keeps the ramp, and the header says so. A pair that fails is reported, and
the colour is never moved to make it pass.

Import the file after the theme:
  @import "zabi-components/theme-only";
  @import "zabi-components/theme-dark-only";
  @import "./brand.generated.css";
`;

const VALUE_OPTIONS = ['brand', 'accent', 'neutral', 'neutral-chroma', 'dark-primary', 'out'];
const FLAG_OPTIONS = ['strict', 'help', 'pin', 'pin-accent'];

function usageError(message) {
    process.stderr.write(`zabi-theme: ${message}\nRun "zabi-theme --help" for usage.\n`);
    process.exit(2);
}

function parseArgs(argv) {
    const options = {};
    for (let i = 0; i < argv.length; i += 1) {
        const arg = argv[i];
        if (arg === '-h') { options.help = true; continue; }
        if (!arg.startsWith('--')) usageError(`unexpected argument "${arg}"`);
        const [name, inline] = arg.slice(2).split(/=(.*)/s, 2);
        if (name === 'set' || name === 'set-light' || name === 'set-dark') {
            // The value is itself a custom property name, so it starts with "--".
            const pair = inline !== undefined ? inline : argv[(i += 1)];
            const match = /^(--[\w-]+)\s*[=:]\s*(.+)$/s.exec(pair ?? '');
            if (!match) usageError(`--${name} needs <token>=<value>, for example --${name} "--color-link=var(--color-brand-800)"`);
            // `--set` alone stays the flat map; a mode flag adds its own map.
            const key = name === 'set' ? 'both' : name === 'set-light' ? 'light' : 'dark';
            options.modes = { ...options.modes, [key]: { ...options.modes?.[key], [match[1]]: match[2].trim() } };
        } else if (FLAG_OPTIONS.includes(name)) {
            if (inline !== undefined) usageError(`--${name} takes no value`);
            options[name] = true;
        } else if (VALUE_OPTIONS.includes(name)) {
            const value = inline !== undefined ? inline : argv[(i += 1)];
            if (value === undefined || value === '' || (inline === undefined && value.startsWith('--'))) {
                usageError(`--${name} needs a value`);
            }
            options[name] = value;
        } else {
            usageError(`unknown option "--${name}"`);
        }
    }
    return options;
}

function parseChroma(text) {
    const value = Number(text);
    if (text.trim() === '' || !Number.isFinite(value)) usageError(`--neutral-chroma must be a number such as 0.05 (got "${text}")`);
    return value;
}

const options = parseArgs(process.argv.slice(2));

if (options.help) {
    process.stdout.write(HELP);
    process.exit(0);
}
if (!options.brand) usageError('--brand is required, for example --brand "#0026EA"');

let result;
try {
    result = createTheme({
        brand: options.brand,
        accent: options.accent,
        neutral: options.neutral,
        // Left out when not asked for, so the options are what they always were.
        ...(options['neutral-chroma'] !== undefined ? { neutralChroma: parseChroma(options['neutral-chroma']) } : {}),
        ...(options['dark-primary'] !== undefined ? { darkPrimary: options['dark-primary'] } : {}),
        // `--set` alone is the flat map, as it always was; a mode flag makes it { light, dark, both }.
        overrides: options.modes && (options.modes.light || options.modes.dark) ? options.modes : options.modes?.both,
        // Left out when not asked for, so the options are what they always were.
        ...(options.pin || options['pin-accent'] ? { pin: { brand: !!options.pin, accent: !!options['pin-accent'] } } : {}),
    });
} catch (error) {
    if (error instanceof TypeError) usageError(error.message.replace(/^zabi-theme: /, ''));
    throw error;
}

if (options.out) {
    const target = path.resolve(options.out);
    try {
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, result.css, 'utf8');
    } catch (error) {
        usageError(`could not write ${options.out}: ${error.message}`);
    }
} else {
    process.stdout.write(result.css);
}

const contrast = result.warnings.filter((warning) => warning.type === 'contrast');
for (const warning of result.warnings) {
    process.stderr.write(`zabi-theme: warning: ${warning.message}\n`);
}
const closest = Object.entries(result.closest)
    .map(([name, c]) => `${name} closest to step ${c.step}`)
    .join(', ');
for (const [name, report] of Object.entries(result.pinned ?? {})) {
    process.stderr.write(
        `zabi-theme: ${name} ${report.hex} is pinned in light` +
            (report.dark.pinned ? ' and in dark.\n' : '; dark keeps the ramp, because the colour fails there.\n'),
    );
}
process.stderr.write(
    `zabi-theme: ${options.out ? `wrote ${options.out}` : 'done'} (${closest}); ` +
        (contrast.length === 0
            ? 'every role pair passes WCAG AA in light and dark.\n'
            : `${contrast.length} role pair${contrast.length === 1 ? '' : 's'} below WCAG AA.\n`),
);

if (options.strict && contrast.length > 0) process.exit(1);
