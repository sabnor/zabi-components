import type { Meta, StoryObj } from '@storybook/svelte';
import Badge from '../components/atoms/Badge.svelte';

const meta = {
    title: 'Components/Atoms/Badge',
    component: Badge,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['default', 'success', 'warning', 'error', 'info', 'neutral']
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg']
        },
        shape: {
            control: { type: 'select' },
            options: ['rounded', 'pill', 'square']
        },
        dot: {
            control: { type: 'boolean' }
        },
        closable: {
            control: { type: 'boolean' }
        },
        icon: {
            control: { type: 'text' }
        },
        iconPosition: {
            control: { type: 'select' },
            options: ['left', 'right']
        }
    }
} satisfies Meta<Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: 'default'
    },
    render: (args) => ({
        Component: Badge,
        props: args,
        slot: 'Badge'
    })
};

export const Success: Story = {
    args: {
        variant: 'success'
    },
    render: (args) => ({
        Component: Badge,
        props: args,
        slot: 'Success'
    })
};

export const Warning: Story = {
    args: {
        variant: 'warning'
    },
    render: (args) => ({
        Component: Badge,
        props: args,
        slot: 'Warning'
    })
};

export const Error: Story = {
    args: {
        variant: 'error'
    },
    render: (args) => ({
        Component: Badge,
        props: args,
        slot: 'Error'
    })
};

export const Info: Story = {
    args: {
        variant: 'info'
    },
    render: (args) => ({
        Component: Badge,
        props: args,
        slot: 'Info'
    })
};

export const Neutral: Story = {
    args: {
        variant: 'neutral'
    },
    render: (args) => ({
        Component: Badge,
        props: args,
        slot: 'Neutral'
    })
};

export const Small: Story = {
    args: {
        size: 'sm'
    },
    render: (args) => ({
        Component: Badge,
        props: args,
        slot: 'Small'
    })
};

export const Large: Story = {
    args: {
        size: 'lg'
    },
    render: (args) => ({
        Component: Badge,
        props: args,
        slot: 'Large'
    })
};

export const Pill: Story = {
    args: {
        shape: 'pill'
    },
    render: (args) => ({
        Component: Badge,
        props: args,
        slot: 'Pill'
    })
};

export const Square: Story = {
    args: {
        shape: 'square'
    },
    render: (args) => ({
        Component: Badge,
        props: args,
        slot: 'Square'
    })
};

export const WithDot: Story = {
    args: {
        dot: true
    },
    render: (args) => ({
        Component: Badge,
        props: args,
        slot: 'With Dot'
    })
};

export const Closable: Story = {
    args: {
        closable: true
    },
    render: (args) => ({
        Component: Badge,
        props: args,
        slot: 'Closable'
    })
};

export const WithIcon: Story = {
    args: {
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    render: (args) => ({
        Component: Badge,
        props: args,
        slot: 'With Icon'
    })
};

export const IconRight: Story = {
    args: {
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        iconPosition: 'right'
    },
    render: (args) => ({
        Component: Badge,
        props: args,
        slot: 'Icon Right'
    })
};

export const AllVariants: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'flex flex-wrap gap-2'
        },
        children: [
            { Component: Badge, props: { variant: 'default' }, slot: 'Default' },
            { Component: Badge, props: { variant: 'success' }, slot: 'Success' },
            { Component: Badge, props: { variant: 'warning' }, slot: 'Warning' },
            { Component: Badge, props: { variant: 'error' }, slot: 'Error' },
            { Component: Badge, props: { variant: 'info' }, slot: 'Info' },
            { Component: Badge, props: { variant: 'neutral' }, slot: 'Neutral' }
        ]
    })
};
