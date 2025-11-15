import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|ts|svelte)', '../src/**/*.mdx'],

  addons: [
    '@storybook/addon-docs'
  ],

  framework: {
    name: '@storybook/sveltekit',
    options: {}
  },

  staticDirs: ['../static'],

  options: {
    storySort: {
      order: [
        'Design System',
        'Design System/Atoms',
        'Design System/Molecules',
        'Design System/Organisms',
        '*'
      ],
      method: 'alphabetical'
    }
  }
};

export default config;