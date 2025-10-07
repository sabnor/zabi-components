import type { Meta, StoryObj } from '@storybook/svelte';
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
            control: { type: 'boolean' }
        },
        disabled: {
            control: { type: 'boolean' }
        },
        label: {
            control: { type: 'text' }
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