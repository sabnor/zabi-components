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
        variant: 'default'
    }
};

export const Success: Story = {
    args: {
        variant: 'success'
    }
};

export const Warning: Story = {
    args: {
        variant: 'warning'
    }
};

export const Error: Story = {
    args: {
        variant: 'error'
    }
};

export const Info: Story = {
    args: {
        variant: 'info'
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

export const Closable: Story = {
    args: {
        closable: true
    }
};