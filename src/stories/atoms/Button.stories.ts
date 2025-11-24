import type { Meta, StoryObj } from '@storybook/sveltekit';
import Button from '../../components/atoms/Button.svelte';

const meta = {
    title: 'Design System/Atoms/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Button component with multiple variants and sizes. Fully keyboard accessible with Enter and Space key support.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: 'primary',
        size: 'md',
        text: 'Button'
    }
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        text: 'Button'
    }
};

export const Danger: Story = {
    args: {
        variant: 'danger',
        text: 'Button'
    }
};

export const Small: Story = {
    args: {
        size: 'sm',
        text: 'Button'
    }
};

export const Medium: Story = {
    args: {
        size: 'md',
        text: 'Button'
    }
};

export const Large: Story = {
    args: {
        size: 'lg',
        text: 'Button'
    }
};

export const Disabled: Story = {
    args: {
        disabled: true,
        text: 'Button'
    }
};

export const Outline: Story = {
    args: {
        variant: 'outline',
        text: 'Button'
    }
};

export const Link: Story = {
    args: {
        variant: 'link',
        text: 'Button'
    }
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        text: 'Button'
    }
};