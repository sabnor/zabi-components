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
                    'Tooltip on hover, focus or tap, on any of four sides and kept on screen. A hint only: on touch it is easy to miss, so never essential information. A tap on the trigger opens it and the trigger still acts; it stays until a second tap, a tap elsewhere, Escape or scrolling, or for touchDuration milliseconds when that is set. With a mouse the bubble can be pointed at and stays open while the pointer is on it.'
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
        tone: {
            control: 'select',
            options: ['material', 'inverted'],
            description:
                'material (default): the bubble is thick glass with body text and no arrow. inverted: the 8.1 dark bubble with an arrow'
        },
        touchDuration: {
            control: 'number',
            description:
                'Milliseconds after which a tooltip opened by a tap closes by itself; 0, the default, keeps it open until it is dismissed'
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
 * The default: on a touch screen the tooltip stays until a second tap, a tap
 * elsewhere, Escape or scrolling. With a mouse or a keyboard nothing is
 * different.
 */
export const StaysAfterATap: Story = {
    args: {
        content: 'One point for each right answer',
        placement: 'top'
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

/**
 * It says why the button cannot be used. `aria-disabled` keeps the button in
 * the tab order, so the keyboard opens the tooltip too; a natively disabled
 * button takes no focus.
 */
export const OnAnUnavailableButton: Story = {
    args: {
        content: 'Add a question first',
        placement: 'top'
    },
    render: (args) => ({
        Component: Tooltip,
        props: args,
        children: [
            {
                Component: Button,
                props: { variant: 'primary', 'aria-disabled': 'true' },
                children: ['Publish']
            }
        ]
    })
};

/** The 8.1 bubble: a dark fill with light text and an arrow, for a page where glass does not read. */
export const Inverted: Story = {
    args: {
        content: 'Adds a question to the round',
        placement: 'bottom',
        tone: 'inverted'
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
