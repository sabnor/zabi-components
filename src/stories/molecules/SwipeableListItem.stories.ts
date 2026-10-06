import type { Meta, StoryObj } from '@storybook/sveltekit';
import SwipeableListItemStory from './SwipeableListItemStory.svelte';

const meta = {
    title: 'Design System/Molecules/SwipeableListItem',
    component: SwipeableListItemStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A row with one or two actions behind its end. On a touch screen a swipe towards the start of the line shows them; a swipe only shows them, and an action runs when its button is pressed. The swipe is never the only way: the button at the end of the row opens the same actions for a mouse and a keyboard, Escape or a press elsewhere closes the row, and focus returns to the button. In a list one row is open at a time. It is the content of a row and a group of buttons, not a list item: put it inside your own li or ListItem.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        showMoreButton: {
            control: 'boolean',
            description: 'The button that opens the actions without a swipe. Without it the app has to offer the actions another way'
        }
    }
} satisfies Meta<typeof SwipeableListItemStory>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Three drafts, each with Archive and Delete. Use the button at the end of a row, or swipe on a touch screen. */
export const Default: Story = {
    render: (args) => ({
        Component: SwipeableListItemStory,
        props: args,
    }),
};
