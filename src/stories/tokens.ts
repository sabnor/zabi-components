import css from '../app.css?raw';

/**
 * Colour values for the docs pages, read from the stylesheet itself.
 *
 * The previous Colors page listed hex values by hand. The ramps were
 * regenerated in 8.0.0 and the page kept the old ones, so it documented
 * colours the library no longer shipped. Reading src/app.css at build time
 * means the page cannot drift again.
 */

/** Body of the first block opened by `opener`, found by matching braces. */
function blockBody(source: string, opener: RegExp): string {
    const match = opener.exec(source);
    if (!match) return '';
    const start = match.index + match[0].length;
    let depth = 1;
    for (let i = start; i < source.length; i++) {
        if (source[i] === '{') depth++;
        else if (source[i] === '}' && --depth === 0) return source.slice(start, i);
    }
    return '';
}

function declarations(body: string): Map<string, string> {
    const found = new Map<string, string>();
    for (const [, name, value] of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
        found.set(name, value.trim());
    }
    return found;
}

const lightTokens = declarations(blockBody(css, /@theme\s*\{/));

export type Swatches = Record<string, string>;

/**
 * A physical ramp, e.g. `ramp('brand')` reads `--zabi-brand-50` to `-950`.
 * `from` and `to` take a slice of it: base has 21 steps, which is wider than
 * the page in one row.
 */
export function ramp(name: string, from = 0, to = 1000): Swatches {
    const prefix = `--zabi-${name}-`;
    const label = name.charAt(0).toUpperCase() + name.slice(1);
    return Object.fromEntries(
        [...lightTokens]
            .filter(([token]) => token.startsWith(prefix) && /^\d+$/.test(token.slice(prefix.length)))
            .map(([token, value]) => [Number(token.slice(prefix.length)), value] as const)
            .filter(([step]) => step >= from && step <= to)
            .sort(([a], [b]) => a - b)
            .map(([step, value]) => [`${label} ${step}`, value]),
    );
}

/**
 * Semantic tokens as live `var()` references, so each swatch shows the value
 * for whichever theme the toolbar is set to. A name the stylesheet does not
 * define is dropped, which keeps a removed token from being documented.
 */
export function semantic(names: string[]): Swatches {
    return Object.fromEntries(
        names
            .filter((name) => lightTokens.has(`--color-${name}`))
            .map((name) => [name, `var(--color-${name})`]),
    );
}
