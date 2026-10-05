import type { Meta, StoryObj } from '@storybook/sveltekit';
import AppBarStory from './AppBarStory.svelte';

const meta = {
    title: 'Design System/Molecules/AppBar',
    component: AppBarStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'The bar at the top of a phone screen: the title as a heading, the way back, and at most two actions. It is a header element that stays at the top of whatever scrolls and keeps clear of the status bar. With collapseOnScroll it slides away while the page scrolls down and returns as soon as it scrolls up; it never hides while keyboard focus is inside it (focus left by a tap does not hold it), and under reduced motion it changes without animation. Use IconButton at size lg for the actions, so each is a 48px target. The stories show it in a phone-width frame that scrolls.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        headingLevel: { control: 'inline-radio', options: [1, 2, 3, 4, 5, 6] },
        actionCount: { control: 'inline-radio', options: [0, 1, 2] },
        frameWidth: { control: 'inline-radio', options: [320, 360, 390] },
    },
} satisfies Meta<typeof AppBarStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        Component: AppBarStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Back, title and two actions. The back control here is a button (onback); with backHref it is a link.'
            }
        }
    }
};

export const TitleOnly: Story = {
    args: {
        withBack: false,
        actionCount: 0,
        title: 'Quizrundan',
    },
    render: (args) => ({
        Component: AppBarStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'A top-level screen: nothing to go back to, nothing to do. Set headingLevel to 1 when the bar names the page.'
            }
        }
    }
};

export const WithLeading: Story = {
    args: {
        withBack: false,
        withLeading: true,
        actionCount: 1,
        title: 'Quizrundan',
    },
    render: (args) => ({
        Component: AppBarStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'The leading snippet puts a logo or an avatar before the title.'
            }
        }
    }
};

export const CollapsesOnScroll: Story = {
    args: {
        collapseOnScroll: true,
    },
    render: (args) => ({
        Component: AppBarStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Scroll the frame down and the bar slides away; scroll up a little and it is back. Tab to the back button while it is away and it returns.'
            }
        }
    }
};

export const LongTitleNarrowPhone: Story = {
    args: {
        frameWidth: 320,
        title: 'Musikfrågor från åttiotalet, andra omgången',
    },
    render: (args) => ({
        Component: AppBarStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'At 320px with a title that does not fit. It wraps to two lines before it is cut, and the bar grows with it; the controls keep their size.'
            }
        }
    }
};
