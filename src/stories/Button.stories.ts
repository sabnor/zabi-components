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
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'success', 'warning', 'danger', 'ghost', 'link'],
            description: 'The visual style variant of the button'
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
            description: 'The size of the button'
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Whether the button is disabled'
        },
        loading: {
            control: { type: 'boolean' },
            description: 'Whether the button is in a loading state'
        },
        fullWidth: {
            control: { type: 'boolean' },
            description: 'Whether the button should take full width of its container'
        },
        type: {
            control: { type: 'select' },
            options: ['button', 'submit', 'reset'],
            description: 'The HTML button type'
        },
        className: {
            control: { type: 'text' },
            description: 'Additional CSS classes to apply'
        },
        iconLeft: {
            control: false,
            description: 'Icon component to display on the left side'
        },
        iconRight: {
            control: false,
            description: 'Icon component to display on the right side'
        },
        ariaLabel: {
            control: { type: 'text' },
            description: 'Accessible label for screen readers'
        },
        ariaDescribedBy: {
            control: { type: 'text' },
            description: 'ID of element that describes the button'
        },
        ariaExpanded: {
            control: { type: 'boolean' },
            description: 'Whether the button controls an expanded element'
        },
        ariaControls: {
            control: { type: 'text' },
            description: 'ID of element controlled by the button'
        },
        ariaPressed: {
            control: { type: 'boolean' },
            description: 'Whether the button is pressed (for toggle buttons)'
        }
    }
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
        Component: 'div',
        props: {
            class: 'grid grid-cols-2 md:grid-cols-4 gap-4 p-4'
        },
        children: [
            { Component: Button, props: { children: 'Primary', variant: 'primary' } },
            { Component: Button, props: { children: 'Secondary', variant: 'secondary' } },
            { Component: Button, props: { children: 'Success', variant: 'success' } },
            { Component: Button, props: { children: 'Warning', variant: 'warning' } },
            { Component: Button, props: { children: 'Danger', variant: 'danger' } },
            { Component: Button, props: { children: 'Ghost', variant: 'ghost' } },
            { Component: Button, props: { children: 'Link', variant: 'link' } },
            { Component: Button, props: { children: 'Loading', variant: 'primary', loading: true } }
        ]
    })
};

// Size comparison
export const SizeComparison: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'flex items-center gap-4 p-4'
        },
        children: [
            { Component: Button, props: { children: 'Small', size: 'sm' } },
            { Component: Button, props: { children: 'Medium', size: 'md' } },
            { Component: Button, props: { children: 'Large', size: 'lg' } }
        ]
    })
};

// State comparison
export const StateComparison: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'flex items-center gap-4 p-4'
        },
        children: [
            { Component: Button, props: { children: 'Normal', variant: 'primary' } },
            { Component: Button, props: { children: 'Hover', variant: 'primary' } },
            { Component: Button, props: { children: 'Loading', variant: 'primary', loading: true } },
            { Component: Button, props: { children: 'Disabled', variant: 'primary', disabled: true } }
        ]
    })
};