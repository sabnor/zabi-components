import type { Meta, StoryObj } from '@storybook/sveltekit';
import Toggle from '../components/atoms/Toggle.svelte';

const meta = {
    title: 'Design System/Atoms/Toggle',
    component: Toggle,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        checked: {
            control: 'boolean'
        },
        disabled: {
            control: 'boolean'
        },
        label: {
            control: 'text'
        }
    }
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Toggle Label'
    }
};

export const Checked: Story = {
    args: {
        checked: true,
        label: 'Checked Toggle'
    }
};

export const Disabled: Story = {
    args: {
        disabled: true,
        label: 'Disabled Toggle'
    }
};