import type { Meta, StoryObj } from '@storybook/sveltekit';
import SkeletonStory from './SkeletonStory.svelte';

const meta = {
    title: 'Design System/Atoms/Skeleton/Scenarios',
    component: SkeletonStory,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A group with one status. `SkeletonGroup` is the one `role="status"`; the pieces inside it are hidden from assistive tech.'
            }
        }
    },
    tags: ['autodocs']
} satisfies Meta<typeof SkeletonStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneStatusForAGroup: Story = {
    args: {}
};
