import type { Meta, StoryObj } from '@storybook/sveltekit';
import TableStory from './TableStory.svelte';

const meta = {
    title: 'Design System/Atoms/Table',
    component: TableStory,
    tags: ['autodocs'],
} satisfies Meta<typeof TableStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => ({
        Component: TableStory,
    }),
};
