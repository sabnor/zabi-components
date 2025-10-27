import type { Meta, StoryObj } from '@storybook/sveltekit';
import Checkbox from '../components/atoms/Checkbox.svelte';

const meta = {
    title: 'Design System/Atoms/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Checkbox label'
    }
};

export const Checked: Story = {
    args: {
        checked: true,
        label: 'Checked checkbox'
    }
};

export const Disabled: Story = {
    args: {
        disabled: true,
        label: 'Disabled checkbox'
    }
};