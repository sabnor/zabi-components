import type { Meta, StoryObj } from '@storybook/svelte';
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
    argTypes: {}
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
    args: {}
};

export const Small: Story = {
    args: {}
};

export const Large: Story = {
    args: {}
};

export const Minimal: Story = {
    args: {}
};

export const Outline: Story = {
    args: {}
};

export const AllVariants: Story = {
    args: {}
};