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
      default: 'app',
      values: [
        {
          name: 'app',
          value: '#f4f4f5'
        },
        {
          name: 'white',
          value: '#ffffff'
        },
        {
          name: 'muted',
          value: '#ececee'
        },
        {
          name: 'dark canvas',
          value: '#09090b'
        }
      ]
    },
    svelte: {
      options: {
        legacyMode: false,
        runes: true
      }
    }
  },

  initialGlobals: {
    theme: 'light'
  },

  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' }
        ],
        dynamicTitle: true
      }
    }
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';

      // Apply theme to document element
      if (typeof document !== 'undefined') {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }

      return Story();
    }
  ]
};

export default preview;