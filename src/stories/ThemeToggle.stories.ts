import type { Meta, StoryObj } from '@storybook/svelte';
import ThemeToggle from '../components/atoms/ThemeToggle.svelte';

const meta: Meta<ThemeToggle> = {
    title: 'Atoms/ThemeToggle',
    component: ThemeToggle,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A theme toggle component that switches between light and dark modes. Supports different sizes and variants, with automatic theme persistence and system preference detection.'
            }
        }
    },
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
            description: 'Size of the toggle button'
        },
        variant: {
            control: { type: 'select' },
            options: ['default', 'minimal', 'outline'],
            description: 'Visual variant of the toggle button'
        }
    }
};

export default meta;
type Story = StoryObj<ThemeToggle>;

export const Default: Story = {
    args: {
        size: 'md',
        variant: 'default'
    }
};

export const Small: Story = {
    args: {
        size: 'sm',
        variant: 'default'
    }
};

export const Large: Story = {
    args: {
        size: 'lg',
        variant: 'default'
    }
};

export const Minimal: Story = {
    args: {
        size: 'md',
        variant: 'minimal'
    }
};

export const Outline: Story = {
    args: {
        size: 'md',
        variant: 'outline'
    }
};

export const AllVariants: Story = {
    render: () => ({
        Component: ThemeToggle,
        props: {}
    }),
    decorators: [
        () => ({
            template: `
				<div class="space-y-4 p-8">
					<div class="space-y-2">
						<h3 class="text-lg font-medium">Sizes</h3>
						<div class="flex items-center space-x-4">
							<div class="text-center">
								<ThemeToggle size="sm" variant="default" />
								<p class="text-xs text-gray-500 mt-1">Small</p>
							</div>
							<div class="text-center">
								<ThemeToggle size="md" variant="default" />
								<p class="text-xs text-gray-500 mt-1">Medium</p>
							</div>
							<div class="text-center">
								<ThemeToggle size="lg" variant="default" />
								<p class="text-xs text-gray-500 mt-1">Large</p>
							</div>
						</div>
					</div>
					
					<div class="space-y-2">
						<h3 class="text-lg font-medium">Variants</h3>
						<div class="flex items-center space-x-4">
							<div class="text-center">
								<ThemeToggle size="md" variant="default" />
								<p class="text-xs text-gray-500 mt-1">Default</p>
							</div>
							<div class="text-center">
								<ThemeToggle size="md" variant="minimal" />
								<p class="text-xs text-gray-500 mt-1">Minimal</p>
							</div>
							<div class="text-center">
								<ThemeToggle size="md" variant="outline" />
								<p class="text-xs text-gray-500 mt-1">Outline</p>
							</div>
						</div>
					</div>
				</div>
			`
        })
    ]
};
