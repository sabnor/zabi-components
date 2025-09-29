import type { Meta, StoryObj } from '@storybook/svelte';
import Textarea from '../components/atoms/Textarea.svelte';

const meta = {
    title: 'Design System/Atoms/Textarea',
    component: Textarea,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: { type: 'text' }
        },
        placeholder: {
            control: { type: 'text' }
        },
        label: {
            control: { type: 'text' }
        },
        disabled: {
            control: { type: 'boolean' }
        },
        required: {
            control: { type: 'boolean' }
        },
        readonly: {
            control: { type: 'boolean' }
        },
        error: {
            control: { type: 'text' }
        },
        success: {
            control: { type: 'text' }
        },
        helpText: {
            control: { type: 'text' }
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg']
        },
        variant: {
            control: { type: 'select' },
            options: ['default', 'outlined', 'filled', 'ghost']
        },
        rows: {
            control: { type: 'number' }
        },
        maxLength: {
            control: { type: 'number' }
        },
        minLength: {
            control: { type: 'number' }
        },
        name: {
            control: { type: 'text' }
        },
        id: {
            control: { type: 'text' }
        },
        resize: {
            control: { type: 'select' },
            options: ['none', 'both', 'horizontal', 'vertical']
        },
        autoResize: {
            control: { type: 'boolean' }
        }
    }
} satisfies Meta<Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Textarea Label',
        placeholder: 'Enter your message...'
    }
};

export const WithValue: Story = {
    args: {
        label: 'Textarea with Value',
        value: 'This is some sample text in the textarea.'
    }
};

export const Required: Story = {
    args: {
        label: 'Required Textarea',
        required: true,
        placeholder: 'This field is required'
    }
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Textarea',
        disabled: true,
        value: 'This textarea is disabled'
    }
};

export const Readonly: Story = {
    args: {
        label: 'Readonly Textarea',
        readonly: true,
        value: 'This textarea is readonly'
    }
};

export const WithError: Story = {
    args: {
        label: 'Textarea with Error',
        error: 'This field has an error',
        value: 'Invalid input'
    }
};

export const WithSuccess: Story = {
    args: {
        label: 'Textarea with Success',
        success: 'This field is valid',
        value: 'Valid input'
    }
};

export const WithHelpText: Story = {
    args: {
        label: 'Textarea with Help',
        helpText: 'This is helpful information about the textarea'
    }
};

export const WithMaxLength: Story = {
    args: {
        label: 'Textarea with Max Length',
        maxLength: 100,
        placeholder: 'Maximum 100 characters'
    }
};

export const Small: Story = {
    args: {
        size: 'sm',
        label: 'Small Textarea',
        placeholder: 'Small size'
    }
};

export const Large: Story = {
    args: {
        size: 'lg',
        label: 'Large Textarea',
        placeholder: 'Large size'
    }
};

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        label: 'Outlined Textarea',
        placeholder: 'Outlined variant'
    }
};

export const Filled: Story = {
    args: {
        variant: 'filled',
        label: 'Filled Textarea',
        placeholder: 'Filled variant'
    }
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        label: 'Ghost Textarea',
        placeholder: 'Ghost variant'
    }
};

export const NoResize: Story = {
    args: {
        label: 'No Resize Textarea',
        resize: 'none',
        placeholder: 'Cannot be resized'
    }
};

export const HorizontalResize: Story = {
    args: {
        label: 'Horizontal Resize Textarea',
        resize: 'horizontal',
        placeholder: 'Can be resized horizontally'
    }
};

export const VerticalResize: Story = {
    args: {
        label: 'Vertical Resize Textarea',
        resize: 'vertical',
        placeholder: 'Can be resized vertically'
    }
};

export const AutoResize: Story = {
    args: {
        label: 'Auto Resize Textarea',
        autoResize: true,
        placeholder: 'Automatically resizes based on content'
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
                Component: Textarea,
                props: { size: 'sm', label: 'Small', placeholder: 'Small size', rows: 3 }
            },
            {
                Component: Textarea,
                props: { size: 'md', label: 'Medium', placeholder: 'Medium size', rows: 4 }
            },
            {
                Component: Textarea,
                props: { size: 'lg', label: 'Large', placeholder: 'Large size', rows: 5 }
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
                Component: Textarea,
                props: { variant: 'default', label: 'Default', placeholder: 'Default variant' }
            },
            {
                Component: Textarea,
                props: { variant: 'outlined', label: 'Outlined', placeholder: 'Outlined variant' }
            },
            {
                Component: Textarea,
                props: { variant: 'filled', label: 'Filled', placeholder: 'Filled variant' }
            },
            {
                Component: Textarea,
                props: { variant: 'ghost', label: 'Ghost', placeholder: 'Ghost variant' }
            }
        ]
    })
};

export const ResizeOptions: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'flex flex-col gap-4'
        },
        children: [
            {
                Component: Textarea,
                props: { label: 'No Resize', resize: 'none', placeholder: 'Cannot be resized' }
            },
            {
                Component: Textarea,
                props: { label: 'Horizontal Resize', resize: 'horizontal', placeholder: 'Can be resized horizontally' }
            },
            {
                Component: Textarea,
                props: { label: 'Vertical Resize', resize: 'vertical', placeholder: 'Can be resized vertically' }
            },
            {
                Component: Textarea,
                props: { label: 'Both Directions', resize: 'both', placeholder: 'Can be resized in both directions' }
            }
        ]
    })
};
