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
    buildStoriesJson: true
  },

  options: {
    storySort: {
      order: [
        'Design System',
        'Design System/Atoms',
        'Design System/Atoms/Heading',
        'Design System/Atoms/Button',
        'Design System/Atoms/Badge',
        'Design System/Atoms/Card',
        'Design System/Atoms/Input',
        'Design System/Atoms/Textarea',
        'Design System/Atoms/Select',
        'Design System/Atoms/Checkbox',
        'Design System/Atoms/Toggle',
        'Design System/Atoms/ColorPicker',
        'Design System/Atoms/ThemeToggle',
        'Design System/Atoms/Skeleton',
        'Design System/Atoms/OptimizedImage',
        'Design System/Atoms/Tooltip',
        'Design System/Molecules',
        'Design System/Molecules/Alert',
        'Design System/Molecules/Dropdown',
        'Design System/Molecules/Tabs',
        'Design System/Molecules/Modal',
        'Design System/Molecules/SlideUp',
        'Design System/Molecules/ImageUpload',
        'Design System/Organisms',
        'Design System/Organisms/Navbar',
        'Design System/Organisms/Navigation',
        '*'
      ],
      method: 'configure'
    }
  }
};

export default config;