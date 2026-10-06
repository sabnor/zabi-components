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

  features: {
    buildStoriesJson: true,
    // Setup prompts for whoever maintains a Storybook, not for someone reading
    // this one on the site.
    sidebarOnboardingChecklist: false
  },

  core: {
    disableWhatsNewNotifications: true
  }
};

export default config;