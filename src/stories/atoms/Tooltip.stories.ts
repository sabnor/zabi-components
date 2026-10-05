import type { Meta, StoryObj } from '@storybook/sveltekit';
import Tooltip from '../../components/atoms/Tooltip.svelte';
import Button from '../../components/atoms/Button.svelte';

const meta = {
    title: 'Design System/Atoms/Tooltip',
    component: Tooltip,
    parameters: {
        docs: {
            description: {
                component:
                    'Tooltip on hover, focus or tap, on any of four sides and kept on screen. A hint only: on touch it is easy to miss, so never essential information. A tap on the trigger opens it and the trigger still acts; it closes after touchDuration, or on a second tap, a tap elsewhere, Escape or scrolling.'
            }
        },
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        content: {
            control: 'text'
        },
        placement: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right']
        },
        touchDuration: {
            control: 'number',
            description:
                'Milliseconds the tooltip stays after a tap on a touch screen; 0 keeps it open until it is dismissed'
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

/**
 * For a trigger that does nothing else, such as an info icon: on a touch
 * screen the tooltip stays until a second tap, a tap elsewhere, Escape or
 * scrolling. With a mouse or a keyboard nothing is different.
 */
export const StaysAfterATap: Story = {
    args: {
        content: 'One point for each right answer',
        placement: 'top',
        touchDuration: 0
    },
    render: (args) => ({
        Component: Tooltip,
        props: args,
        children: [
            {
                Component: Button,
                props: { variant: 'ghost' },
                children: ['About scoring']
            }
        ]
    })
};

/** On a touch screen the tooltip goes again one second after the tap; the button still acts. */
export const ShortAfterATap: Story = {
    args: {
        content: 'Adds a question to the round',
        placement: 'bottom',
        touchDuration: 1000
    },
    render: (args) => ({
        Component: Tooltip,
        props: args,
        children: [
            {
                Component: Button,
                props: { variant: 'primary' },
                children: ['Add question']
            }
        ]
    })
};
