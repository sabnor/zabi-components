/**
 * `src/app.css` holds one `.dark { … }` rule. The published files carry it
 * under `[data-theme="dark"]` and `[data-theme="auto"]` as well; this step does
 * the same for the dev site and Storybook, which read `src/app.css` directly,
 * with the function the build uses (scripts/dark-selectors.js). It only touches
 * a top-level `.dark` rule that declares custom properties, so component
 * styles pass through unchanged.
 *
 * scripts/build-css.js does not load this file; it runs the expansion itself.
 */
const dataThemeSelectors = () => ({
    postcssPlugin: 'zabi-data-theme-selectors',
    async Once(root, { postcss }) {
        // dark-selectors.js is an ES module and this config is CommonJS.
        const { expandDarkRule } = await import('./scripts/dark-selectors.js');
        expandDarkRule(root, postcss);
        // The rules it adds are new nodes. Without a source PostCSS warns
        // about a missing `from` when Vite asks for a source map.
        root.walk((node) => {
            if (!node.source) node.source = node.parent.source;
        });
    },
});
dataThemeSelectors.postcss = true;

module.exports = {
    plugins: [
        require('@tailwindcss/postcss')(),
        require('autoprefixer')(),
        dataThemeSelectors(),
    ],
};
