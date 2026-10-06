import type { Meta, StoryObj } from '@storybook/sveltekit';
import EmptyStateStory from './EmptyStateStory.svelte';

const meta = {
    title: 'Design System/Molecules/EmptyState',
    component: EmptyStateStory,
    parameters: {
        docs: {
            description: {
                component:
                    'Centered empty state with title, description, and optional action/media snippets.'
            }
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof EmptyStateStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        Component: EmptyStateStory,
        props: args,
    }),
};

export const WithMedia: Story = {
    args: {
        withMedia: true,
    },
    render: (args) => ({
        Component: EmptyStateStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'The media snippet takes an icon or an illustration above the title.'
            }
        }
    }
};

export const WithoutAction: Story = {
    args: {
        title: 'No results',
        description: 'Nothing matches your search. Try a shorter term or check the spelling.',
        withAction: false,
    },
    render: (args) => ({
        Component: EmptyStateStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Leave the action out when there is nothing for the person to create, as with an empty search.'
            }
        }
    }
};

export const FirstUse: Story = {
    args: {
        title: 'Invite your first teammate',
        description: 'Teammates can see every project in this workspace. You choose what each of them can change.',
        actionLabel: 'Invite teammate',
        withMedia: true,
    },
    render: (args) => ({
        Component: EmptyStateStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'An empty state is often the first thing a new user sees. Say what the space is for and offer the one action that fills it.'
            }
        }
    }
};

export const Compact: Story = {
    args: {
        title: 'No comments',
        description: 'Comments on this task will show up here.',
        actionLabel: 'Add comment',
        size: 'compact',
        headingLevel: 3,
    },
    render: (args) => ({
        Component: EmptyStateStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'The compact size has tighter padding and a smaller title, for an empty list inside a card. Set `headingLevel` so the title fits the heading outline around it; here it is an `h3` under the card\'s `h2`. The default size is a named region, a landmark; the compact size is a plain `div`, so a page of cards does not become a page of landmarks.'
            }
        }
    }
};
