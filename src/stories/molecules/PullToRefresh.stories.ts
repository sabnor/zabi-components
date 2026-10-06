import type { Meta, StoryObj } from '@storybook/sveltekit';
import PullToRefreshStory from './PullToRefreshStory.svelte';

const meta = {
    title: 'Design System/Molecules/PullToRefresh',
    component: PullToRefreshStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A list that reloads when it is pulled down from its top on a touch screen. The pull is a shortcut: Tab reaches a Refresh button at the top of the region, which is drawn only while it has focus, and "Refreshing" and "Updated" are announced. It acts only while what scrolls the list is at its top, and a mouse does not pull.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        disabled: { control: 'boolean', description: 'No pull and no button' },
        showButton: { control: 'boolean', description: 'The Refresh button for keyboard and screen reader' },
        threshold: { control: 'number', description: 'How far the indicator has to come out, in px' }
    }
} satisfies Meta<typeof PullToRefreshStory>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Twelve rounds in a box that scrolls. Tab to the Refresh button, or pull on a touch screen. */
export const Default: Story = {
    render: (args) => ({
        Component: PullToRefreshStory,
        props: args,
    }),
};
