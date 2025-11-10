import type { Meta, StoryObj } from '@storybook/sveltekit';
import ThemeToggle from '../components/atoms/ThemeToggle.svelte';

const meta = {
    title: 'Design System/Atoms/ThemeToggle',
    component: ThemeToggle,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A theme toggle component that switches between light and dark modes. Supports different sizes and variants, with automatic theme persistence and system preference detection.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size of the toggle button'
        },
        variant: {
            control: 'select',
            options: ['default', 'ghost', 'outline'],
            description: 'Visual variant of the toggle button'
        }
    }
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: 'md',
        variant: 'default'
    }
};

export const Small: Story = {
    args: {
        size: 'sm',
        variant: 'default'
    }
};

export const Large: Story = {
    args: {
        size: 'lg',
        variant: 'default'
    }
};

export const Ghost: Story = {
    args: {
        size: 'md',
        variant: 'ghost'
    }
};

export const Outline: Story = {
    args: {
        size: 'md',
        variant: 'outline'
    }
};
