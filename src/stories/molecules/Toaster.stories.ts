import type { Meta, StoryObj } from '@storybook/sveltekit';
import ToasterStory from './ToasterStory.svelte';

const meta = {
    title: 'Design System/Molecules/Toaster',
    component: ToasterStory,
    parameters: {
        docs: {
            description: {
                component:
                    'Fixed notification region; pair it with pushToast from the toast store. Mount once near the app root.'
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
