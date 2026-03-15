import type { Meta, StoryObj } from '@storybook/sveltekit';
import Progress from '../../components/atoms/Progress.svelte';

const meta = {
    title: 'Design System/Atoms/Progress',
    component: Progress,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Progress indicator for long-running operations. Use for uploads, processing, and task completion feedback.'
            }
        }
    },
    tags: ['autodocs']
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Upload progress',
        value: 45,
        max: 100,
        size: 'md'
    }
};

export const Complete: Story = {
    args: {
        label: 'Import progress',
        value: 100,
        max: 100,
        size: 'md'
    }
};

export const Large: Story = {
    args: {
        label: 'Processing',
        value: 70,
        max: 100,
        size: 'lg'
    }
};
