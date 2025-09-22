import type { Meta, StoryObj } from '@storybook/svelte';
import ColorPicker from '../../components/atoms/ColorPicker.svelte';

const meta = {
    title: 'Design System/Atoms/ColorPicker',
    component: ColorPicker,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: { type: 'text' }
        },
        label: {
            control: { type: 'text' }
        },
        required: {
            control: { type: 'boolean' }
        },
        disabled: {
            control: { type: 'boolean' }
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg']
        },
        variant: {
            control: { type: 'select' },
            options: ['default', 'outlined', 'filled', 'ghost']
        }
    }
} satisfies Meta<ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Color Picker'
    }
};

export const WithValue: Story = {
    args: {
        label: 'Color Picker',
        value: 'bg-plasma-red-500'
    }
};

export const Required: Story = {
    args: {
        label: 'Color Picker',
        required: true
    }
};

export const Disabled: Story = {
    args: {
        label: 'Color Picker',
        disabled: true
    }
};

export const Small: Story = {
    args: {
        size: 'sm',
        label: 'Small Color Picker'
    }
};

export const Large: Story = {
    args: {
        size: 'lg',
        label: 'Large Color Picker'
    }
};

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        label: 'Outlined Color Picker'
    }
};

export const Filled: Story = {
    args: {
        variant: 'filled',
        label: 'Filled Color Picker'
    }
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        label: 'Ghost Color Picker'
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
                Component: ColorPicker,
                props: { size: 'sm', label: 'Small' }
            },
            {
                Component: ColorPicker,
                props: { size: 'md', label: 'Medium' }
            },
            {
                Component: ColorPicker,
                props: { size: 'lg', label: 'Large' }
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
                Component: ColorPicker,
                props: { variant: 'default', label: 'Default' }
            },
            {
                Component: ColorPicker,
                props: { variant: 'outlined', label: 'Outlined' }
            },
            {
                Component: ColorPicker,
                props: { variant: 'filled', label: 'Filled' }
            },
            {
                Component: ColorPicker,
                props: { variant: 'ghost', label: 'Ghost' }
            }
        ]
    })
};
