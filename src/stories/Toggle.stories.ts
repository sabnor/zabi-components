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
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg']
        }
    }
} satisfies Meta<Toggle>;

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

export const DisabledChecked: Story = {
    args: {
        disabled: true,
        checked: true,
        label: 'Disabled Checked Toggle'
    }
};

export const Small: Story = {
    args: {
        size: 'sm',
        label: 'Small Toggle'
    }
};

export const Large: Story = {
    args: {
        size: 'lg',
        label: 'Large Toggle'
    }
};

export const WithoutLabel: Story = {
    args: {
        checked: false
    }
};

export const AllSizes: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'flex flex-col gap-4'
        },
        children: [
            {
                Component: Toggle,
                props: { size: 'sm', label: 'Small Toggle' }
            },
            {
                Component: Toggle,
                props: { size: 'md', label: 'Medium Toggle' }
            },
            {
                Component: Toggle,
                props: { size: 'lg', label: 'Large Toggle' }
            }
        ]
    })
};

export const States: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'flex flex-col gap-4'
        },
        children: [
            {
                Component: Toggle,
                props: { label: 'Unchecked' }
            },
            {
                Component: Toggle,
                props: { checked: true, label: 'Checked' }
            },
            {
                Component: Toggle,
                props: { disabled: true, label: 'Disabled' }
            },
            {
                Component: Toggle,
                props: { disabled: true, checked: true, label: 'Disabled Checked' }
            }
        ]
    })
};
