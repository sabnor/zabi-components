import type { Meta, StoryObj } from '@storybook/svelte';
import Tooltip from '../components/atoms/Tooltip.svelte';
import Button from '../components/atoms/Button.svelte';

const meta: Meta<Tooltip> = {
    title: 'Atoms/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A flexible tooltip component with multiple placements, triggers, and variants. Provides contextual information without cluttering the interface.'
            }
        }
    },
    argTypes: {
        content: {
            control: { type: 'text' },
            description: 'Tooltip content text'
        },
        placement: {
            control: { type: 'select' },
            options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end', 'left-start', 'left-end', 'right-start', 'right-end'],
            description: 'Tooltip placement relative to trigger'
        },
        trigger: {
            control: { type: 'select' },
            options: ['hover', 'click', 'focus', 'manual'],
            description: 'How the tooltip is triggered'
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Whether the tooltip is disabled'
        },
        delay: {
            control: { type: 'number' },
            description: 'Delay before showing tooltip (ms)'
        },
        variant: {
            control: { type: 'select' },
            options: ['default', 'dark', 'light', 'info', 'success', 'warning', 'error'],
            description: 'Visual variant'
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
            description: 'Size of the tooltip'
        },
        arrow: {
            control: { type: 'boolean' },
            description: 'Whether to show arrow pointing to trigger'
        },
        interactive: {
            control: { type: 'boolean' },
            description: 'Whether tooltip stays open when hovering over it'
        }
    }
};

export default meta;
type Story = StoryObj<Tooltip>;

export const Default: Story = {
    args: {
        content: 'This is a helpful tooltip',
        placement: 'top',
        trigger: 'hover',
        disabled: false,
        delay: 200,
        variant: 'default',
        size: 'md',
        arrow: true,
        interactive: false
    },
    render: (args) => ({
        Component: Tooltip,
        props: args,
        slots: {
            default: 'Hover me'
        }
    })
};

export const AllPlacements: Story = {
    render: () => ({
        Component: Tooltip,
        props: {},
        template: `
			<div class="grid grid-cols-3 gap-8 p-8">
				<div class="flex justify-center">
					<Tooltip content="Top tooltip" placement="top">
						<Button text="Top" />
					</Tooltip>
				</div>
				<div class="flex justify-center">
					<Tooltip content="Top start tooltip" placement="top-start">
						<Button text="Top Start" />
					</Tooltip>
				</div>
				<div class="flex justify-center">
					<Tooltip content="Top end tooltip" placement="top-end">
						<Button text="Top End" />
					</Tooltip>
				</div>
				
				<div class="flex justify-center">
					<Tooltip content="Left tooltip" placement="left">
						<Button text="Left" />
					</Tooltip>
				</div>
				<div class="flex justify-center">
					<Tooltip content="Center tooltip" placement="top">
						<Button text="Center" />
					</Tooltip>
				</div>
				<div class="flex justify-center">
					<Tooltip content="Right tooltip" placement="right">
						<Button text="Right" />
					</Tooltip>
				</div>
				
				<div class="flex justify-center">
					<Tooltip content="Bottom tooltip" placement="bottom">
						<Button text="Bottom" />
					</Tooltip>
				</div>
				<div class="flex justify-center">
					<Tooltip content="Bottom start tooltip" placement="bottom-start">
						<Button text="Bottom Start" />
					</Tooltip>
				</div>
				<div class="flex justify-center">
					<Tooltip content="Bottom end tooltip" placement="bottom-end">
						<Button text="Bottom End" />
					</Tooltip>
				</div>
			</div>
		`
    })
};

export const Variants: Story = {
    render: () => ({
        Component: Tooltip,
        props: {},
        template: `
			<div class="flex gap-4 p-8">
				<Tooltip content="Default tooltip" variant="default">
					<Button text="Default" />
				</Tooltip>
				<Tooltip content="Info tooltip" variant="info">
					<Button text="Info" />
				</Tooltip>
				<Tooltip content="Success tooltip" variant="success">
					<Button text="Success" />
				</Tooltip>
				<Tooltip content="Warning tooltip" variant="warning">
					<Button text="Warning" />
				</Tooltip>
				<Tooltip content="Error tooltip" variant="error">
					<Button text="Error" />
				</Tooltip>
			</div>
		`
    })
};

export const Sizes: Story = {
    render: () => ({
        Component: Tooltip,
        props: {},
        template: `
			<div class="flex gap-4 p-8">
				<Tooltip content="Small tooltip" size="sm">
					<Button text="Small" />
				</Tooltip>
				<Tooltip content="Medium tooltip" size="md">
					<Button text="Medium" />
				</Tooltip>
				<Tooltip content="Large tooltip" size="lg">
					<Button text="Large" />
				</Tooltip>
			</div>
		`
    })
};

export const Triggers: Story = {
    render: () => ({
        Component: Tooltip,
        props: {},
        template: `
			<div class="flex gap-4 p-8">
				<Tooltip content="Hover to show" trigger="hover">
					<Button text="Hover" />
				</Tooltip>
				<Tooltip content="Click to show" trigger="click">
					<Button text="Click" />
				</Tooltip>
				<Tooltip content="Focus to show" trigger="focus">
					<Button text="Focus" />
				</Tooltip>
			</div>
		`
    })
};

export const Interactive: Story = {
    args: {
        content: 'This tooltip stays open when you hover over it',
        placement: 'top',
        trigger: 'hover',
        interactive: true,
        arrow: true
    },
    render: (args) => ({
        Component: Tooltip,
        props: args,
        slots: {
            default: 'Interactive Tooltip'
        }
    })
};

export const LongContent: Story = {
    args: {
        content: 'This is a very long tooltip that demonstrates how the component handles longer text content. It should wrap properly and maintain good readability.',
        placement: 'top',
        trigger: 'hover',
        maxWidth: '300px',
        arrow: true
    },
    render: (args) => ({
        Component: Tooltip,
        props: args,
        slots: {
            default: 'Long Content'
        }
    })
};

export const WithoutArrow: Story = {
    args: {
        content: 'Tooltip without arrow',
        placement: 'top',
        trigger: 'hover',
        arrow: false
    },
    render: (args) => ({
        Component: Tooltip,
        props: args,
        slots: {
            default: 'No Arrow'
        }
    })
};
