import type { Meta, StoryObj } from '@storybook/sveltekit';
import Tooltip from '../components/atoms/Tooltip.svelte';
import Button from '../components/atoms/Button.svelte';

const meta = {
    title: 'Design System/Atoms/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        content: {
            control: { type: 'text' }
        },
        placement: {
            control: { type: 'select' },
            options: ['top', 'bottom', 'left', 'right']
        }
    }
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        content: 'This is a tooltip',
        placement: 'top'
    },
    render: (args) => ({
        Component: Tooltip,
        props: args,
        children: [
            {
                Component: Button,
                props: { variant: 'primary' },
                children: ['Hover me']
            }
        ]
    })
};

export const Bottom: Story = {
    args: {
        content: 'Tooltip below',
        placement: 'bottom'
    },
    render: (args) => ({
        Component: Tooltip,
        props: args,
        children: [
            {
                Component: Button,
                props: { variant: 'secondary' },
                children: ['Hover me']
            }
        ]
    })
};

export const Left: Story = {
    args: {
        content: 'Tooltip on the left',
        placement: 'left'
    },
    render: (args) => ({
        Component: Tooltip,
        props: args,
        children: [
            {
                Component: Button,
                props: { variant: 'danger' },
                children: ['Hover me']
            }
        ]
    })
};

export const Right: Story = {
    args: {
        content: 'Tooltip on the right',
        placement: 'right'
    },
    render: (args) => ({
        Component: Tooltip,
        props: args,
        children: [
            {
                Component: Button,
                props: { variant: 'primary' },
                children: ['Hover me']
            }
        ]
    })
};