import type { Meta, StoryObj } from '@storybook/sveltekit';
import Divider from '../../components/atoms/Divider.svelte';

const meta = {
    title: 'Design System/Atoms/Divider',
    component: Divider,
    tags: ['autodocs'],
    argTypes: {
        orientation: { control: 'select', options: ['horizontal', 'vertical'] },
        decorative: { control: 'boolean' },
    },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
    args: {
        orientation: 'horizontal',
        decorative: true,
    },
};

export const WithLabel: Story = {
    args: {
        orientation: 'horizontal',
        label: 'Or',
        decorative: true,
    },
};
