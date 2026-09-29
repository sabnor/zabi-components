import type { Preview } from '@storybook/svelte';
import '../src/app.css';
import { dark, light, prefersDark } from './zabi-theme';

const startsDark = prefersDark();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      },
      // Props first, then events, so the table reads in the order people use it.
      sort: 'requiredFirst'
    },
    docs: {
      theme: startsDark ? dark : light
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Design System',
          ['Colors', 'Atoms', 'Molecules', 'Organisms']
        ]
      }
    },
    // Surfaces are given as tokens, not hex values, so each one is the right
    // colour in both themes and cannot drift from the stylesheet.
    backgrounds: {
      options: {
        page: { name: 'Page', value: 'var(--color-surface-base)' },
        raised: { name: 'Raised (cards, inputs)', value: 'var(--color-surface-raised)' },
        elevated: { name: 'Elevated', value: 'var(--color-surface-elevated)' },
        overlay: { name: 'Overlay (menus, dialogs)', value: 'var(--color-surface-overlay)' }
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
    theme: startsDark ? 'dark' : 'light',
    backgrounds: { value: 'page' }
  },

  globalTypes: {
    theme: {
      description: 'Light or dark theme for the components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' }
        ],
        dynamicTitle: true
      }
    }
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';

      // The library's dark theme is the `dark` class on the html element.
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.documentElement.style.colorScheme = theme;
      }

      return Story();
    }
  ]
};

export default preview;
