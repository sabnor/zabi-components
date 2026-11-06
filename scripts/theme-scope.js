/**
 * `.zabi-theme-scope`: a subtree that re-resolves the theme.
 *
 * A semantic token such as `--color-action-primary: var(--color-brand-600)` is
 * a custom property, and a custom property that references another one is
 * resolved where it is DECLARED, then inherited as a finished value. So
 * `--zabi-brand-*` set on a wrapper never reaches a Button inside it: the
 * aliases were resolved on `:root`, against the brand the page has. Giving the
 * wrapper the class re-declares every theme declaration that holds a `var()`,
 * on the wrapper, so they resolve against what is set on or above it. That is
 * how an admin previews a site's brand colour (inline `--zabi-brand-*`) or its
 * dark theme inside a light page of its own.
 *
 * The rules are generated from the token maps the theme is built from
 * (`readThemeMaps`), so they cannot drift from `src/app.css`.
 *
 * Which mode a scope is in:
 *   - `.zabi-theme-scope` alone follows the page: dark under `.dark` or
 *     `[data-theme="dark"]` on any ancestor (the page's `<html>`, normally),
 *     and under `[data-theme="auto"]` while the system is dark.
 *   - `data-theme="dark"` or `class="dark"` on the scope itself is dark inside
 *     a light page; `data-theme="light"` is light inside a dark page;
 *     `data-theme="auto"` follows the system. The scope's own attribute wins
 *     over the page's mode.
 *
 * Order and specificity. The light half and the dark half ship in different
 * files, the dark ones imported later, so nothing depends on the two halves
 * being written in one place:
 *   - what the page's mode brings is wrapped in `:where()`, (0,1,0), and comes
 *     after the plain scope rule, (0,1,0), in every file that has both;
 *   - what the scope's own attribute brings is (0,2,0), so it wins over the
 *     page's mode whichever file comes first.
 * A nested scope declares on its own element, which beats what it inherits
 * from the outer one.
 *
 * What is restated: the declarations whose value holds a `var()`, in the mode
 * being written, and the other declarations the dark theme replaces (the
 * dark theme's own plain values, so a dark scope in a light page has them, and
 * the light theme's, so a light scope in a dark page gets them back). A plain
 * value that nothing replaces is inherited correctly and is left out.
 */

const SCOPE = '.zabi-theme-scope';
const AUTO_MEDIA = '(prefers-color-scheme: dark)';

/** `[prop, value]` pairs: a var() in the mode's own map, or a token the other mode replaces. */
function pick(map, otherOnly) {
    return Object.entries(map).filter(([prop, value]) => value.includes('var(') || prop in otherOnly);
}

export function themeScopeDeclarations({ light, darkOnly, dark }) {
    return {
        light: pick(light, darkOnly),
        // Anything the light theme sets that dark does not replace is still the light value.
        dark: pick(dark, darkOnly),
    };
}

function block(selectors, lines, { minify, indent = '' }) {
    if (minify) return `${selectors.join(',')}{${lines.join('')}}`;
    const pad = `${indent}  `;
    return `${indent}${selectors.join(`,\n${indent}`)} {\n${lines.map((line) => `${pad}${line}\n`).join('')}${indent}}`;
}

function decls(entries, minify) {
    return entries.map(([prop, value]) => {
        const text = minify ? value.replace(/\s+/g, ' ') : value;
        return minify ? `${prop}:${text};` : `${prop}: ${text};`;
    });
}

function kv(prop, value, minify) {
    return minify ? `${prop}:${value};` : `${prop}: ${value};`;
}

/**
 * The CSS for the light half (published with the light theme) and the dark
 * half (published with the dark theme), as two strings.
 */
export function themeScopeCss(maps, { minify = false } = {}) {
    const { light, dark } = themeScopeDeclarations(maps);
    const join = (parts) => parts.join(minify ? '\n' : '\n\n');
    const text = (prop, value) => kv(prop, value, minify);
    const body = [text('color', 'var(--color-body)')];
    const lightScheme = (scheme) => [text('color-scheme', scheme), ...body];

    const lightCss = join([
        ...(minify
            ? []
            : [
                  `/* .zabi-theme-scope: the theme's var() declarations again on the element, so they resolve\n * against --zabi-* set on or above it. See scripts/theme-scope.js. */`,
              ]),
        block([SCOPE, `${SCOPE}[data-theme="light"]`, `${SCOPE}[data-theme="auto"]`], decls(light, minify), { minify }),
        block([`${SCOPE}[data-theme="light"]`], lightScheme('light'), { minify }),
        block([`${SCOPE}[data-theme="auto"]`], lightScheme('light dark'), { minify }),
    ]);

    const darkDecls = decls(dark, minify);
    const darkScheme = [text('color-scheme', 'dark'), ...body];
    const darkCss = join([
        block(
            [`:where(.dark, [data-theme="dark"]) ${SCOPE}`, `${SCOPE}.dark`, `${SCOPE}[data-theme="dark"]`],
            darkDecls,
            { minify },
        ),
        block([`${SCOPE}.dark`, `${SCOPE}[data-theme="dark"]`], darkScheme, { minify }),
        minify
            ? `@media ${AUTO_MEDIA}{${block([`:where([data-theme="auto"]) ${SCOPE}`, `${SCOPE}[data-theme="auto"]`], darkDecls, { minify })}${block([`${SCOPE}[data-theme="auto"]`], darkScheme, { minify })}}`
            : `@media ${AUTO_MEDIA} {\n${block(
                  [`:where([data-theme="auto"]) ${SCOPE}`, `${SCOPE}[data-theme="auto"]`],
                  darkDecls,
                  { minify, indent: '  ' },
              )}\n\n${block([`${SCOPE}[data-theme="auto"]`], darkScheme, { minify, indent: '  ' })}\n}`,
    ]);

    return { light: lightCss, dark: darkCss };
}
