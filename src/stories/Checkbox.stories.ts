import type { Meta, StoryObj } from '@storybook/svelte';
import Checkbox from '../components/atoms/Checkbox.svelte';

const meta = {
    title: 'Design System/Atoms/Checkbox',
    component: Checkbox,
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
        required: {
            control: { type: 'boolean' }
        },
        label: {
            control: { type: 'text' }
        },
        helpText: {
            control: { type: 'text' }
        },
        error: {
            control: { type: 'text' }
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg']
        },
        variant: {
            control: { type: 'select' },
            options: ['default', 'outlined', 'filled']
        },
        indeterminate: {
            control: { type: 'boolean' }
        },
        name: {
            control: { type: 'text' }
        },
        id: {
            control: { type: 'text' }
        },
        value: {
            control: { type: 'text' }
        }
    }
} satisfies Meta<Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Checkbox label'
    }
};

export const Checked: Story = {
    args: {
        checked: true,
        label: 'Checked checkbox'
    }
};

export const Disabled: Story = {
    args: {
        disabled: true,
        label: 'Disabled checkbox'
    }
};

export const Required: Story = {
    args: {
        required: true,
        label: 'Required checkbox'
    }
};

export const WithHelpText: Story = {
    args: {
        label: 'Checkbox with help text',
        helpText: 'This is helpful information about the checkbox'
    }
};

export const WithError: Story = {
    args: {
        label: 'Checkbox with error',
        error: 'This field is required'
    }
};

export const Small: Story = {
    args: {
        size: 'sm',
        label: 'Small checkbox'
    }
};

export const Large: Story = {
    args: {
        size: 'lg',
        label: 'Large checkbox'
    }
};

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        label: 'Outlined checkbox'
    }
};

export const Filled: Story = {
    args: {
        variant: 'filled',
        label: 'Filled checkbox'
    }
};

export const Indeterminate: Story = {
    args: {
        indeterminate: true,
        label: 'Indeterminate checkbox'
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
                Component: Checkbox,
                props: { size: 'sm', label: 'Small checkbox' }
            },
            {
                Component: Checkbox,
                props: { size: 'md', label: 'Medium checkbox' }
            },
            {
                Component: Checkbox,
                props: { size: 'lg', label: 'Large checkbox' }
            }
        ]
    })
};

export const AllVariants: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'flex flex-col gap-4'
        },
        children: [
            {
                Component: Checkbox,
                props: { variant: 'default', label: 'Default variant' }
            },
            {
                Component: Checkbox,
                props: { variant: 'outlined', label: 'Outlined variant' }
            },
            {
                Component: Checkbox,
                props: { variant: 'filled', label: 'Filled variant' }
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
                Component: Checkbox,
                props: { label: 'Normal state' }
            },
            {
                Component: Checkbox,
                props: { checked: true, label: 'Checked state' }
            },
            {
                Component: Checkbox,
                props: { disabled: true, label: 'Disabled state' }
            },
            {
                Component: Checkbox,
                props: { indeterminate: true, label: 'Indeterminate state' }
            },
            {
                Component: Checkbox,
                props: { error: 'This field has an error', label: 'Error state' }
            }
        ]
    })
};
