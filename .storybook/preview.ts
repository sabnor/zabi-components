import type { Preview } from '@storybook/svelte';
import { createElement, useEffect, useState } from 'react';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { addons } from 'storybook/preview-api';
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events';
import '../src/app.css';
import { dark, light, prefersDark } from './zabi-theme';

const startsDark = prefersDark();

type ThemeName = 'light' | 'dark';

/** The Theme control's value, from the URL a story or docs page was opened with. */
function themeFromUrl(): ThemeName | undefined {
  if (typeof window === 'undefined') return undefined;
  const match = /(?:^|;)theme:(light|dark)(?:;|$)/.exec(
    new URLSearchParams(window.location.search).get('globals') ?? ''
  );
  return match ? (match[1] as ThemeName) : undefined;
}

/**
 * Docs pages in the theme the toolbar asks for.
 *
 * `parameters.docs.theme` is read once, so it could only ever follow the
 * operating system: with the toolbar on Light and the system on dark, light
 * stories sat in a dark page. This wraps Storybook's own container and hands
 * it the theme of the Theme control, and changes it when the control changes.
 */
function ThemedDocsContainer(props: Parameters<typeof DocsContainer>[0]) {
  const [theme, setTheme] = useState<ThemeName>(
    themeFromUrl() ?? (startsDark ? 'dark' : 'light')
  );

  useEffect(() => {
    const channel = addons.getChannel();
    const follow = ({ globals }: { globals?: Record<string, unknown> }) => {
      if (globals?.theme === 'light' || globals?.theme === 'dark') setTheme(globals.theme);
    };
    channel.on(SET_GLOBALS, follow);
    channel.on(GLOBALS_UPDATED, follow);
    return () => {
      channel.off(SET_GLOBALS, follow);
      channel.off(GLOBALS_UPDATED, follow);
    };
  }, []);

  useEffect(() => {
    // The page around the stories uses the tokens too, so it needs the class
    // even before the first story on it has run its decorator.
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return createElement(DocsContainer, { ...props, theme: theme === 'dark' ? dark : light });
}

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
      theme: startsDark ? dark : light,
      container: ThemedDocsContainer
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
