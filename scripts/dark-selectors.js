/**
 * The selectors the dark theme is published under.
 *
 * `src/app.css` holds ONE `.dark { … }` rule. Every published file that carries
 * the dark tokens gets the same declarations under three selectors, generated
 * here so the block is never duplicated by hand:
 *
 *   .dark, [data-theme="dark"] { … }            always dark
 *   @media (prefers-color-scheme: dark) {
 *     [data-theme="auto"] { … }                 follows the operating system
 *   }
 *
 * `[data-theme="light"]`, or no attribute and no class, matches none of them
 * and stays light — following the OS is opt-in through `data-theme="auto"`.
 *
 * `color-scheme` goes with the tokens, so what the browser draws itself (date
 * and time pickers, scrollbars, autofill) agrees with them without any script.
 * The source `.dark` rule declares `color-scheme: dark` among its tokens, so
 * all three dark selectors carry it. The class did not set it before 8.1; a
 * dark page then showed light native controls unless the app set it itself.
 * The three attribute rules add what the tokens cannot say: light when light
 * is asked for, and `light dark` for auto while the system is light. They are
 * written BEFORE the token rules, which have the same specificity: where a
 * page carries both (`class="dark" data-theme="light"`), the rule that brings
 * the dark tokens also brings the dark scheme, so the two cannot disagree.
 *
 * All of them have the specificity of `.dark` (0,1,0), so anything that
 * overrode `.dark` before overrides these the same way.
 */

export const DARK_CLASS = '.dark';
export const DARK_ATTRIBUTE = '[data-theme="dark"]';
export const LIGHT_ATTRIBUTE = '[data-theme="light"]';
export const AUTO_ATTRIBUTE = '[data-theme="auto"]';
export const AUTO_MEDIA = '(prefers-color-scheme: dark)';

const COLOR_SCHEMES = [
    [LIGHT_ATTRIBUTE, 'light'],
    [DARK_ATTRIBUTE, 'dark'],
    [AUTO_ATTRIBUTE, 'light dark'],
];

function indent(text, spaces) {
    const pad = ' '.repeat(spaces);
    return text
        .split('\n')
        .map((line) => (line.trim() ? pad + line : line))
        .join('\n');
}

/** The dark files: `body` is the declarations of the source `.dark` rule. */
export function darkThemeCss(body) {
    return [
        COLOR_SCHEMES.map(
            ([selector, scheme]) => `${selector} {\n  color-scheme: ${scheme};\n}`,
        ).join('\n\n'),
        `${DARK_CLASS},\n${DARK_ATTRIBUTE} {\n${body}\n}`,
        `/* The same declarations again, for data-theme="auto" when the system is dark. */\n` +
            `@media ${AUTO_MEDIA} {\n  ${AUTO_ATTRIBUTE} {\n${indent(body, 2)}\n  }\n}`,
    ].join('\n\n');
}

/** The standalone colours file: one line per rule, `declarations` already minified. */
export function darkThemeCssMinified(declarations) {
    return [
        COLOR_SCHEMES.map(([selector, scheme]) => `${selector}{color-scheme:${scheme}}`).join(''),
        `${DARK_CLASS},${DARK_ATTRIBUTE}{${declarations}}`,
        `@media ${AUTO_MEDIA}{${AUTO_ATTRIBUTE}{${declarations}}}`,
    ].join('\n');
}

/**
 * The compiled bundle: Tailwind has already processed `src/app.css`, so the
 * `.dark` token rule is expanded in the PostCSS AST instead. Returns how many
 * rules were expanded; the caller fails the build unless it is exactly one.
 */
export function expandDarkRule(root, postcss) {
    const targets = [];
    root.each((node) => {
        if (node.type !== 'rule' || node.selector.trim() !== DARK_CLASS) return;
        if (!node.some((child) => child.type === 'decl' && child.prop.startsWith('--'))) return;
        targets.push(node);
    });

    for (const rule of targets) {
        const auto = rule.clone({ selector: AUTO_ATTRIBUTE });
        const media = postcss.atRule({
            name: 'media',
            params: AUTO_MEDIA,
            raws: { before: '\n', afterName: ' ', between: ' ', after: '\n' },
        });
        media.append(auto);
        rule.selector = `${DARK_CLASS},\n${DARK_ATTRIBUTE}`;
        const schemes = COLOR_SCHEMES.map(([selector, scheme]) =>
            postcss.rule({ selector }).append(postcss.decl({ prop: 'color-scheme', value: scheme })),
        );
        // Before the token rule: see the note on order at the top of this file.
        rule.before(schemes);
        rule.after(media);
    }
    return targets.length;
}
