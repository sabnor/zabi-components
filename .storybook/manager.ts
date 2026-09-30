import { addons } from 'storybook/manager-api';
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events';
import { dark, light, prefersDark } from './zabi-theme';

// Before the preview has reported its globals, the operating system is the
// only thing known.
addons.setConfig({
    theme: prefersDark() ? dark : light
});

/**
 * After that the sidebar and toolbar follow the Theme control in the toolbar,
 * the same global the stories read. They used to take the OS preference once,
 * so choosing Light on a dark system showed light stories inside dark chrome.
 */
addons.register('zabi/theme', (api) => {
    const follow = ({ globals }: { globals?: Record<string, unknown> }) => {
        const theme = globals?.theme;
        if (theme !== 'light' && theme !== 'dark') return;
        api.setOptions({ theme: theme === 'dark' ? dark : light });
    };
    api.on(SET_GLOBALS, follow);
    api.on(GLOBALS_UPDATED, follow);
});
