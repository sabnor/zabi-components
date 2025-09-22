import type { Meta, StoryObj } from '@storybook/svelte';
import Card from '../../components/atoms/Card.svelte';

const meta = {
    title: 'Design System/Atoms/Card',
    component: Card,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['default', 'interactive']
        },
        density: {
            control: { type: 'select' },
            options: ['compact', 'comfortable', 'spacious']
        },
        disabled: {
            control: { type: 'boolean' }
        },
        loading: {
            control: { type: 'boolean' }
        },
        className: {
            control: { type: 'text' }
        },
        ariaLabel: {
            control: { type: 'text' }
        },
        ariaDescribedBy: {
            control: { type: 'text' }
        }
    }
} satisfies Meta<Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: 'default'
    },
    render: (args) => ({
        Component: Card,
        props: args,
        slot: 'Card content goes here'
    })
};

export const Interactive: Story = {
    args: {
        variant: 'interactive'
    },
    render: (args) => ({
        Component: Card,
        props: args,
        slot: 'Clickable card'
    })
};

export const Compact: Story = {
    args: {
        density: 'compact'
    },
    render: (args) => ({
        Component: Card,
        props: args,
        slot: 'Compact card'
    })
};

export const Spacious: Story = {
    args: {
        density: 'spacious'
    },
    render: (args) => ({
        Component: Card,
        props: args,
        slot: 'Spacious card'
    })
};

export const Disabled: Story = {
    args: {
        disabled: true
    },
    render: (args) => ({
        Component: Card,
        props: args,
        slot: 'Disabled card'
    })
};

export const Loading: Story = {
    args: {
        loading: true
    },
    render: (args) => ({
        Component: Card,
        props: args,
        slot: 'Loading card'
    })
};

export const WithHeader: Story = {
    args: {
        variant: 'default'
    },
    render: (args) => ({
        Component: Card,
        props: args,
        children: [
            {
                Component: 'div',
                props: { slot: 'header', class: 'text-lg font-semibold mb-2' },
                slot: 'Card Header'
            },
            'Card content goes here'
        ]
    })
};

export const WithFooter: Story = {
    args: {
        variant: 'default'
    },
    render: (args) => ({
        Component: Card,
        props: args,
        children: [
            'Card content goes here',
            {
                Component: 'div',
                props: { slot: 'footer', class: 'mt-4 pt-2 border-t border-stone-600' },
                slot: 'Card Footer'
            }
        ]
    })
};

export const Complete: Story = {
    args: {
        variant: 'default',
        density: 'comfortable'
    },
    render: (args) => ({
        Component: Card,
        props: args,
        children: [
            {
                Component: 'div',
                props: { slot: 'header', class: 'text-lg font-semibold mb-2' },
                slot: 'Card Title'
            },
            'This is the main content of the card. It can contain any text or elements you need.',
            {
                Component: 'div',
                props: { slot: 'footer', class: 'mt-4 pt-2 border-t border-stone-600 text-sm text-stone-400' },
                slot: 'Last updated 2 hours ago'
            }
        ]
    })
};

export const AllDensities: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'flex flex-col gap-4'
        },
        children: [
            {
                Component: Card,
                props: { density: 'compact' },
                slot: 'Compact density card'
            },
            {
                Component: Card,
                props: { density: 'comfortable' },
                slot: 'Comfortable density card'
            },
            {
                Component: Card,
                props: { density: 'spacious' },
                slot: 'Spacious density card'
            }
        ]
    })
};
