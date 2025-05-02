import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'Svelte Component Library',
  brandUrl: 'https://your-project-url.com',
  brandImage: 'https://your-logo-url.com/logo.png',
});

addons.setConfig({
  theme,
});