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
                    'Skeleton on a colour block, and a group with one status. `tone="on-color"` is the surface\'s label colour at 24%, so it reads on the brand and accent Block in light and dark. `SkeletonGroup` is the one `role="status"`; the pieces inside it are hidden from assistive tech.'
            }
        }
    },
    tags: ['autodocs']
} satisfies Meta<typeof SkeletonStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnColourBlock: Story = {
    args: { scenario: 'colour' }
};

export const OneStatusForAGroup: Story = {
    args: { scenario: 'group' }
};
