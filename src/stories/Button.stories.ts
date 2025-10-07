import type { Meta, StoryObj } from '@storybook/svelte';
import Button from '../components/atoms/Button.svelte';

const meta = {
    title: 'Design System/Atoms/Button',
    component: Button,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: 'primary',
        size: 'md'
    }
};

export const Secondary: Story = {
    args: {
        variant: 'secondary'
    }
};

export const Danger: Story = {
    args: {
        variant: 'danger'
    }
};

export const Small: Story = {
    args: {
        size: 'sm'
    }
};

export const Large: Story = {
    args: {
        size: 'lg'
    }
};

export const Disabled: Story = {
    args: {
        disabled: true
    }
};