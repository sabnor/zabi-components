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
  zabi-theme --brand <hex> [--accent <hex>] [--neutral <hex>] [--out <file>] [--strict]
             [--set <token>=<value> ...]

Options
  --brand <hex>     Brand colour (required). Builds --zabi-brand-50 … 950.
  --accent <hex>    Second brand colour. Builds --zabi-accent-50 … 950.
  --neutral <hex>   Tints the 21-step neutral ramp, --zabi-base-50 … 950.
  --out <file>      Write the CSS here. Without it the CSS goes to stdout.
  --strict          Exit 1 when any role pair is below WCAG AA.
  --set <t>=<v>     Also write this declaration, e.g. --set "--color-link=var(--zabi-brand-800)".
                    Repeatable. It applies in light and dark and is contrast-checked.
  --help            Show this text.

Each ramp is built on the library's lightness curve. Your colour supplies hue
and chroma and is not pinned to a step, so the exact hex may not appear in the
file; the header says which step is closest.

Import the file after the theme:
  @import "zabi-components/theme-only";
  @import "zabi-components/theme-dark-only";
  @import "./brand.generated.css";
`;

const VALUE_OPTIONS = ['brand', 'accent', 'neutral', 'out'];
const FLAG_OPTIONS = ['strict', 'help'];

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
        if (name === 'set') {
            // The value is itself a custom property name, so it starts with "--".
            const pair = inline !== undefined ? inline : argv[(i += 1)];
            const match = /^(--[\w-]+)\s*[=:]\s*(.+)$/s.exec(pair ?? '');
            if (!match) usageError('--set needs <token>=<value>, for example --set "--color-link=var(--zabi-brand-800)"');
            options.overrides = { ...options.overrides, [match[1]]: match[2].trim() };
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
        overrides: options.overrides,
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
process.stderr.write(
    `zabi-theme: ${options.out ? `wrote ${options.out}` : 'done'} (${closest}); ` +
        (contrast.length === 0
            ? 'every role pair passes WCAG AA in light and dark.\n'
            : `${contrast.length} role pair${contrast.length === 1 ? '' : 's'} below WCAG AA.\n`),
);

if (options.strict && contrast.length > 0) process.exit(1);
