import type { Meta, StoryObj } from '@storybook/svelte';
import ScaleDemo from '../components/atoms/ScaleDemo.svelte';

const meta: Meta<ScaleDemo> = {
	title: 'Design System/ScaleDemo',
	component: ScaleDemo,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: 'A comprehensive demonstration of all Tailwind scales supporting both light and dark modes. This component showcases color scales, typography, spacing, border radius, shadows, animations, and component examples.'
			}
		}
	},
	argTypes: {}
};

export default meta;
type Story = StoryObj<ScaleDemo>;

export const Default: Story = {
	args: {}
};

export const LightMode: Story = {
	args: {},
	parameters: {
		backgrounds: {
			default: 'light'
		}
	}
};

export const DarkMode: Story = {
	args: {},
	parameters: {
		backgrounds: {
			default: 'dark'
		}
	}
};
