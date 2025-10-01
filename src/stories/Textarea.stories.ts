import type { Meta, StoryObj } from '@storybook/svelte';
import Textarea from '../components/atoms/Textarea.svelte';

const meta = {
    title: 'Design System/Atoms/Textarea',
    component: Textarea,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A modern, accessible textarea component for multi-line text input with full semantic token support, comprehensive state management, and excellent accessibility features.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        // Core props
        value: {
            control: { type: 'text' },
            description: 'The textarea value'
        },
        label: {
            control: { type: 'text' },
            description: 'The textarea label (required for accessibility)'
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text'
        },
        helperText: {
            control: { type: 'text' },
            description: 'Helper text displayed below the textarea'
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Whether the textarea is disabled'
        },
        required: {
            control: { type: 'boolean' },
            description: 'Whether the textarea is required'
        },
        readonly: {
            control: { type: 'boolean' },
            description: 'Whether the textarea is readonly'
        },
        id: {
            control: { type: 'text' },
            description: 'Unique ID for the textarea'
        },
        name: {
            control: { type: 'text' },
            description: 'Name attribute for form submission'
        },

        // State props
        error: {
            control: { type: 'text' },
            description: 'Error message or boolean indicating error state'
        },
        success: {
            control: { type: 'text' },
            description: 'Success message or boolean indicating success state'
        },

        // Additional props
        maxLength: {
            control: { type: 'number' },
            description: 'Maximum character length'
        },
        minLength: {
            control: { type: 'number' },
            description: 'Minimum character length'
        },
        rows: {
            control: { type: 'number' },
            description: 'Number of visible text lines'
        },
        resize: {
            control: { type: 'select' },
            options: ['none', 'both', 'horizontal', 'vertical'],
            description: 'Resize behavior'
        },
        autoResize: {
            control: { type: 'boolean' },
            description: 'Automatically resize based on content'
        },

        // UI props
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
            description: 'Textarea size'
        },

        // Accessibility props
        ariaLabel: {
            control: { type: 'text' },
            description: 'ARIA label for accessibility (used when no visible label)'
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

export const WithHelperText: Story = {
    args: {
        label: 'Textarea with Helper Text',
        helperText: 'This is helpful information about the textarea'
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

export const AllStates: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'flex flex-col gap-4 w-80'
        },
        children: [
            {
                Component: Textarea,
                props: { label: 'Default State', placeholder: 'Default textarea' }
            },
            {
                Component: Textarea,
                props: { label: 'Error State', error: 'This field has an error', value: 'Invalid input' }
            },
            {
                Component: Textarea,
                props: { label: 'Success State', success: 'This field is valid', value: 'Valid input' }
            },
            {
                Component: Textarea,
                props: { label: 'Disabled State', disabled: true, value: 'Disabled textarea' }
            },
            {
                Component: Textarea,
                props: { label: 'Readonly State', readonly: true, value: 'Readonly textarea' }
            }
        ]
    })
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

export const FormExample: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'flex flex-col gap-4 w-80 p-6 bg-surface rounded-lg border border-primary'
        },
        children: [
            {
                Component: 'h3',
                props: {
                    class: 'text-lg font-semibold text-primary mb-2'
                },
                children: 'Contact Form'
            },
            {
                Component: Textarea,
                props: {
                    label: 'Message',
                    placeholder: 'Enter your message here...',
                    rows: 4,
                    required: true,
                    helperText: 'Please provide as much detail as possible'
                }
            },
            {
                Component: Textarea,
                props: {
                    label: 'Additional Comments',
                    placeholder: 'Any additional comments...',
                    rows: 3,
                    resize: 'vertical'
                }
            }
        ]
    })
};

export const AccessibilityExample: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'flex flex-col gap-4 w-80'
        },
        children: [
            {
                Component: Textarea,
                props: {
                    label: 'Accessible Textarea with Label',
                    placeholder: 'This textarea has a proper label',
                    helperText: 'This helper text is associated with the textarea via aria-describedby'
                }
            },
            {
                Component: Textarea,
                props: {
                    ariaLabel: 'Textarea without visible label',
                    placeholder: 'This textarea uses aria-label for accessibility'
                }
            },
            {
                Component: Textarea,
                props: {
                    label: 'Required Textarea',
                    placeholder: 'This field is required',
                    required: true,
                    helperText: 'Required fields are marked with an asterisk and aria-required'
                }
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
