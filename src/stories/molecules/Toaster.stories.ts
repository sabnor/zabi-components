import type { Meta, StoryObj } from '@storybook/sveltekit';
import ToasterStory from './ToasterStory.svelte';

const meta = {
    title: 'Design System/Molecules/Toaster',
    component: ToasterStory,
    parameters: {
        docs: {
            description: {
                component:
                    'Fixed notification region; pair it with pushToast from the toast store. Mount once near the app root. A toast can carry one action, such as Undo: it then stays until it is dismissed unless you give it a duration, and focusToasts() moves keyboard focus to the newest toast. Offer the same action elsewhere in the page as well. Below 640px the stack spans the width with 16px on each side; it keeps clear of the home indicator and sits above an AppShell tab bar. For a bar of your own that is fixed to the bottom, set --toaster-bottom-offset to its height on the Toaster or an ancestor: 72px above a FloatingActionButton. Over a modal overlay with a footer at the bottom of the screen the stack moves above the footer by itself, and the overlay\'s Tab cycle takes the toast controls in. More toasts than fit scroll.'
            }
        }, layout: 'fullscreen' },
    tags: ['autodocs'],
} satisfies Meta<typeof ToasterStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
    render: () => ({
        Component: ToasterStory,
    }),
};
