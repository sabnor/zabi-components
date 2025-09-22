import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|ts|svelte)'],
  addons: [
    '@storybook/addon-svelte-csf'
  ],
  framework: {
    name: '@storybook/sveltekit',
    options: {}
  },
  docs: {
    autodocs: 'tag'
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