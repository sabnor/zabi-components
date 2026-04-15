import type { Meta, StoryObj } from '@storybook/sveltekit';
import EmptyStateStory from './EmptyStateStory.svelte';

const meta = {
    title: 'Design System/Molecules/EmptyState',
    component: EmptyStateStory,
    tags: ['autodocs'],
} satisfies Meta<typeof EmptyStateStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => ({
        Component: EmptyStateStory,
    }),
};
