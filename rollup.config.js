import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.ts',
  output: {
    sourcemap: true,
    format: 'umd',
    name: 'MyComponentLibrary',
    file: pkg.module,
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // extract CSS into a separate file (recommended)
      css: css => {
        css.write('public/bundle.css');
      },
    }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),
    typescript({ sourceMap: !production }),
    production && terser(), // minify in production
  ],
  watch: {
    clearScreen: false,
  },
};