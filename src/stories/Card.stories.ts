import type { Meta, StoryObj } from '@storybook/svelte';
import Card from '../components/atoms/Card.svelte';

const meta = {
    title: 'Design System/Atoms/Card',
    component: Card,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Card component with built-in support for different sizes and interactive states. Use the semantic color system classes to style cards contextually for different states and meanings.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Default Card'
    }
};

export const SemanticColors: Story = {
    args: {
        title: 'Semantic Colors Documentation',
        fullWidth: false
    },
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'Apply semantic color classes to your Card components: `bg-info-surface border-info text-info` (blue), `bg-success-surface border-success text-success` (green), `bg-warning-surface border-warning text-warning` (yellow), `bg-error-surface border-error text-error` (red).'
            }
        }
    }
};

export const WithImage: Story = {
    args: {
        title: 'Card with Image',
        image: 'https://via.placeholder.com/300x200'
    }
};

export const WithContent: Story = {
    args: {
        title: 'Card with Content'
    }
};

export const Interactive: Story = {
    args: {
        title: 'Interactive Card',
        onclick: () => alert('Card clicked!')
    }
};

export const Small: Story = {
    args: {
        title: 'Small Card',
        size: 'sm'
    }
};

export const Large: Story = {
    args: {
        title: 'Large Card',
        size: 'lg'
    }
};

export const CustomWidth: Story = {
    args: {
        title: 'Custom Width Card',
        fullWidth: false
    }
};