import type { Meta, StoryObj } from '@storybook/svelte';
import Button from '../components/atoms/Button.svelte';

const meta = {
    title: 'Design System/Atoms/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A versatile button component with semantic token support, accessibility features, and multiple variants.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variant stories
export const Primary: Story = {
    args: {
        children: 'Primary Button',
        variant: 'primary'
    }
};

export const Secondary: Story = {
    args: {
        children: 'Secondary Button',
        variant: 'secondary'
    }
};

export const Success: Story = {
    args: {
        children: 'Success Button',
        variant: 'success'
    }
};

export const Warning: Story = {
    args: {
        children: 'Warning Button',
        variant: 'warning'
    }
};

export const Danger: Story = {
    args: {
        children: 'Danger Button',
        variant: 'danger'
    }
};

export const Info: Story = {
    args: {
        children: 'Info Button',
        variant: 'info'
    }
};

export const Ghost: Story = {
    args: {
        children: 'Ghost Button',
        variant: 'ghost'
    }
};

export const Link: Story = {
    args: {
        children: 'Link Button',
        variant: 'link'
    }
};

export const Neutral: Story = {
    args: {
        children: 'Neutral Button',
        variant: 'neutral'
    }
};

// Size stories
export const Small: Story = {
    args: {
        children: 'Small Button',
        size: 'sm'
    }
};

export const Medium: Story = {
    args: {
        children: 'Medium Button',
        size: 'md'
    }
};

export const Large: Story = {
    args: {
        children: 'Large Button',
        size: 'lg'
    }
};

// State stories
export const Disabled: Story = {
    args: {
        children: 'Disabled Button',
        disabled: true
    }
};

export const Loading: Story = {
    args: {
        children: 'Loading Button',
        loading: true
    }
};

export const FullWidth: Story = {
    args: {
        children: 'Full Width Button',
        fullWidth: true
    }
};

// Interactive stories
export const WithIcons: Story = {
    args: {
        children: 'Button with Icons',
        iconLeft: '🔍',
        iconRight: '→'
    }
};

export const LoadingWithIcons: Story = {
    args: {
        children: 'Loading with Icons',
        loading: true,
        iconLeft: '🔍',
        iconRight: '→'
    }
};

// Accessibility stories
export const WithAriaLabel: Story = {
    args: {
        children: '🔍',
        ariaLabel: 'Search',
        variant: 'ghost'
    }
};

export const ToggleButton: Story = {
    args: {
        children: 'Toggle Button',
        ariaPressed: false,
        variant: 'secondary'
    }
};

// All variants showcase
export const AllVariants: Story = {
    render: () => ({
        Component: Button,
        props: { children: 'All Variants Showcase' }
    })
};

// Size comparison
export const SizeComparison: Story = {
    render: () => ({
        Component: Button,
        props: { children: 'Size Comparison' }
    })
};

// State comparison
export const StateComparison: Story = {
    render: () => ({
        Component: Button,
        props: { children: 'State Comparison' }
    })
};