import type { Meta, StoryObj } from '@storybook/sveltekit';
import StickyActionBarStory from './StickyActionBarStory.svelte';

const meta = {
    title: 'Design System/Molecules/StickyActionBar',
    component: StickyActionBarStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A bar that keeps a form\'s main button at the bottom of the screen and above the on-screen keyboard. Put it after the last field: it is sticky, not fixed, so the last field can always be scrolled clear of it, and while it is mounted it reserves its own height with scroll-padding-bottom, so a field that takes focus is not left under it. Where the keyboard covers the page instead of shrinking it (iOS Safari, Chrome on Android) the bar is lifted by the covered height, read from window.visualViewport; a desktop browser has no such keyboard, so that part is not seen here. The bar never takes focus. UnsavedChangesBar is the other bar for a form: that one appears only while there is something to save, announces itself and brings its own Save and Discard. The stories show the bar in a phone-sized frame that scrolls.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        frameWidth: { control: 'inline-radio', options: [320, 360, 390] },
    },
} satisfies Meta<typeof StickyActionBarStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        Component: StickyActionBarStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'One full-width button. Scroll the form: the button stays, and at the end the last field is clear of it.'
            }
        }
    }
};

export const TwoActions: Story = {
    args: {
        withSecondary: true,
        label: 'Visit',
    },
    render: (args) => ({
        Component: StickyActionBarStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'A quieter action beside the main one, 8px apart, at the end of the bar. With label the bar is a named group.'
            }
        }
    }
};

export const ShortForm: Story = {
    args: {
        shortForm: true,
    },
    render: (args) => ({
        Component: StickyActionBarStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'A form shorter than the screen. The form is a full-height column (flex min-h-full flex-col), so the bar is still at the bottom and not right under the last field.'
            }
        }
    }
};

export const NarrowPhone: Story = {
    args: {
        frameWidth: 320,
        withSecondary: true,
    },
    render: (args) => ({
        Component: StickyActionBarStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Two actions at 320px. When they do not fit side by side, with enlarged text for example, they wrap; they are not cut off.'
            }
        }
    }
};
