import type { Preview } from '@storybook/svelte';
import '../src/app.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      options: {
        light: {
          name: 'light',
          value: '#ffffff'
        },

        dark: {
          name: 'dark',
          value: '#333333'
        }
      }
    },
    svelte: {
      options: {
        legacyMode: false,
        runes: true
      }
    }
  },

  initialGlobals: {
    backgrounds: {
      value: 'light'
    }
  }
};

export default preview;