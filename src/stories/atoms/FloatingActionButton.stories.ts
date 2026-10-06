import type { Meta, StoryObj } from '@storybook/sveltekit';
import FloatingActionButtonStory from './FloatingActionButtonStory.svelte';

const meta = {
    title: 'Design System/Atoms/FloatingActionButton',
    component: FloatingActionButtonStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'The one main action of a screen, as a 56px round button that floats over the content. label is required and is its accessible name; with extended it is also shown as text beside the icon. It is a button, or a link with href. Inside AppShell it is placed against the shell, 16px above the tab bar and 16px from the edge; on its own it is fixed to the screen above the home indicator, and --fab-bottom-offset lifts it over anything else fixed to the bottom. The margins are in px, so they do not grow with the text size. It lies over the content: give the list padding at the end (pb-24) so its last row can scroll clear. The stories show it in a phone-sized frame.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        position: { control: 'inline-radio', options: ['bottom-end', 'bottom-start', 'bottom-center'] },
        frameWidth: { control: 'inline-radio', options: [320, 360, 390] },
    },
} satisfies Meta<typeof FloatingActionButtonStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        Component: FloatingActionButtonStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'At the bottom end, above the tab bar. It stays put while the list scrolls, and the last row can be scrolled clear of it.'
            }
        }
    }
};

export const Extended: Story = {
    args: {
        extended: true,
        label: 'Write a question',
        pencil: true,
        position: 'bottom-center',
    },
    render: (args) => ({
        Component: FloatingActionButtonStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'extended shows the label beside an icon of your own, here centred. A label too long for the screen wraps; the button is never wider than the screen less its margins.'
            }
        }
    }
};

export const BottomStart: Story = {
    args: {
        position: 'bottom-start',
    },
    render: (args) => ({
        Component: FloatingActionButtonStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'bottom-start and bottom-end follow the writing direction: start is the left here, and the right in a right-to-left page.'
            }
        }
    }
};

export const AsLink: Story = {
    args: {
        asLink: true,
    },
    render: (args) => ({
        Component: FloatingActionButtonStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'With href it is a link and looks the same. Use it when the action is going somewhere.'
            }
        }
    }
};

export const WithoutTabBar: Story = {
    args: {
        withTabBar: false,
    },
    render: (args) => ({
        Component: FloatingActionButtonStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Without a footer the shell\'s bottom inset is the safe area alone, and the button sits 16px above that.'
            }
        }
    }
};
