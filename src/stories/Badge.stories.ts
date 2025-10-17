import type { Meta, StoryObj } from '@storybook/svelte';
import Badge from '../components/atoms/Badge.svelte';

const meta = {
    title: 'Design System/Atoms/Badge',
    component: Badge,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: 'default',
        text: 'Default Badge'
    }
};

export const Success: Story = {
    args: {
        variant: 'success',
        text: 'Success Badge'
    }
};

export const Warning: Story = {
    args: {
        variant: 'warning',
        text: 'Warning Badge'
    }
};

export const Error: Story = {
    args: {
        variant: 'error',
        text: 'Error Badge'
    }
};

export const Info: Story = {
    args: {
        variant: 'info',
        text: 'Info Badge'
    }
};

export const WithCustomClass: Story = {
    args: {
        variant: 'default',
        text: 'Custom Styled Badge',
        className: 'text-lg px-4 py-2'
    }
};