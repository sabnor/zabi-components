import type { Meta, StoryObj } from '@storybook/sveltekit';
import TableStory from './TableStory.svelte';

const meta = {
    title: 'Design System/Atoms/Table',
    component: TableStory,
    parameters: {
        docs: {
            description: {
                component:
                    'Scrollable table shell with an optional caption; pass thead and tbody as children.'
            }
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof TableStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => ({
        Component: TableStory,
    }),
};
