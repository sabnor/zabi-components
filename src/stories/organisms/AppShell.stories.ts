import type { Meta, StoryObj } from '@storybook/sveltekit';
import AppShellStory from './AppShellStory.svelte';

const meta = {
    title: 'Design System/Organisms/AppShell',
    component: AppShellStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'The layout of a phone app: a header (an AppBar), content that scrolls in a main element, and a footer (a BottomTabBar). The shell is as tall as the visible screen (100dvh) and only the middle scrolls; the header stays at the top of that scrolling area and the footer sits below it. Safe areas are handled on all four sides: the bars cover top and bottom, the shell covers the sides, and whichever edge has no bar. Two custom properties on the host, --app-shell-top-inset and --app-shell-bottom-inset, give the heights of the bars with their safe areas, so a floating button or a sticky bar inside the shell can stay clear of them. The stories show it in a phone-sized frame.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        frameWidth: { control: 'inline-radio', options: [320, 360, 390] },
    },
} satisfies Meta<typeof AppShellStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        Component: AppShellStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Top bar, scrolling content and tab bar in a 360px frame. Scroll down and the top bar slides away; the tab bar stays.'
            }
        }
    }
};

export const NarrowPhone: Story = {
    args: {
        frameWidth: 320,
    },
    render: (args) => ({
        Component: AppShellStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'The same at 320px, the narrowest screen the library supports. Nothing scrolls sideways.'
            }
        }
    }
};

export const ShortContent: Story = {
    args: {
        shortContent: true,
    },
    render: (args) => ({
        Component: AppShellStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'With too little content to scroll, the tab bar still sits at the bottom of the screen and the top bar stays put.'
            }
        }
    }
};

export const WithFloatingButton: Story = {
    args: {
        withFloatingButton: true,
    },
    render: (args) => ({
        Component: AppShellStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'A floating button placed 1rem above the tab bar with bottom: calc(var(--app-shell-bottom-inset) + 1rem). The value follows the real height of the bar, safe area included.'
            }
        }
    }
};

export const WithoutBars: Story = {
    args: {
        withHeader: false,
        withFooter: false,
    },
    render: (args) => ({
        Component: AppShellStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Both snippets are optional. Without a bar the shell keeps the content clear of that safe area itself, and the custom property is the safe-area inset alone.'
            }
        }
    }
};
