import type { Meta, StoryObj } from '@storybook/svelte';
import Input from '../components/atoms/Input.svelte';

const meta = {
    title: 'Design System/Atoms/Input',
    component: Input,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A modern, accessible input component with full semantic token support, comprehensive state management, and excellent accessibility features.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        // Core props
        value: {
            control: { type: 'text' },
            description: 'The input value'
        },
        type: {
            control: { type: 'select' },
            options: ['text', 'email', 'password', 'number', 'search'],
            description: 'The input type'
        },
        label: {
            control: { type: 'text' },
            description: 'The input label (required for accessibility)'
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text'
        },
        helperText: {
            control: { type: 'text' },
            description: 'Helper text displayed below the input'
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Whether the input is disabled'
        },
        required: {
            control: { type: 'boolean' },
            description: 'Whether the input is required'
        },
        readonly: {
            control: { type: 'boolean' },
            description: 'Whether the input is readonly'
        },
        id: {
            control: { type: 'text' },
            description: 'Unique ID for the input'
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
        pattern: {
            control: { type: 'text' },
            description: 'Pattern for validation'
        },
        autocomplete: {
            control: { type: 'select' },
            options: ['on', 'off', 'name', 'email', 'username', 'current-password', 'new-password', 'tel', 'url'],
            description: 'Autocomplete behavior'
        },

        // UI props
        showPasswordToggle: {
            control: { type: 'boolean' },
            description: 'Show password visibility toggle (for password inputs)'
        },
        showClearButton: {
            control: { type: 'boolean' },
            description: 'Show clear button when input has value'
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
            description: 'Input size'
        },

        // Accessibility props
        ariaLabel: {
            control: { type: 'text' },
            description: 'ARIA label for accessibility (used when no visible label)'
        }
    }
} satisfies Meta<Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Input Label',
        placeholder: 'Enter text...'
    }
};

export const WithValue: Story = {
    args: {
        label: 'Input with Value',
        value: 'Sample text'
    }
};

export const Email: Story = {
    args: {
        type: 'email',
        label: 'Email Address',
        placeholder: 'you@example.com',
        required: true
    }
};

export const Password: Story = {
    args: {
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        showPasswordToggle: true,
        required: true
    }
};

export const Number: Story = {
    args: {
        type: 'number',
        label: 'Number Input',
        placeholder: 'Enter a number'
    }
};

export const Search: Story = {
    args: {
        type: 'search',
        label: 'Search',
        placeholder: 'Search...',
        showClearButton: true
    }
};

export const Required: Story = {
    args: {
        label: 'Required Field',
        required: true,
        placeholder: 'This field is required'
    }
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Input',
        disabled: true,
        value: 'Disabled value'
    }
};

export const Readonly: Story = {
    args: {
        label: 'Readonly Input',
        readonly: true,
        value: 'Readonly value'
    }
};

export const WithError: Story = {
    args: {
        label: 'Input with Error',
        error: 'This field has an error',
        value: 'Invalid input'
    }
};

export const WithSuccess: Story = {
    args: {
        label: 'Input with Success',
        success: 'This field is valid',
        value: 'Valid input'
    }
};

export const WithHelperText: Story = {
    args: {
        label: 'Input with Helper Text',
        helperText: 'This is helpful information about the input'
    }
};

export const WithClearButton: Story = {
    args: {
        label: 'Input with Clear Button',
        value: 'Text to clear',
        showClearButton: true,
        placeholder: 'Type something...'
    }
};

export const Small: Story = {
    args: {
        size: 'sm',
        label: 'Small Input',
        placeholder: 'Small size'
    }
};

export const Large: Story = {
    args: {
        size: 'lg',
        label: 'Large Input',
        placeholder: 'Large size'
    }
};

export const AllSizes: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'flex flex-col gap-4 w-80'
        },
        children: [
            {
                Component: Input,
                props: { size: 'sm', label: 'Small', placeholder: 'Small size' }
            },
            {
                Component: Input,
                props: { size: 'md', label: 'Medium', placeholder: 'Medium size' }
            },
            {
                Component: Input,
                props: { size: 'lg', label: 'Large', placeholder: 'Large size' }
            }
        ]
    })
};

export const AllTypes: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'flex flex-col gap-4 w-80'
        },
        children: [
            {
                Component: Input,
                props: { type: 'text', label: 'Text', placeholder: 'Text input' }
            },
            {
                Component: Input,
                props: { type: 'email', label: 'Email', placeholder: 'you@example.com' }
            },
            {
                Component: Input,
                props: { type: 'password', label: 'Password', placeholder: 'Password input', showPasswordToggle: true }
            },
            {
                Component: Input,
                props: { type: 'number', label: 'Number', placeholder: 'Number input' }
            },
            {
                Component: Input,
                props: { type: 'search', label: 'Search', placeholder: 'Search...', showClearButton: true }
            }
        ]
    })
};

export const AllStates: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'flex flex-col gap-4 w-80'
        },
        children: [
            {
                Component: Input,
                props: { label: 'Default State', placeholder: 'Default input' }
            },
            {
                Component: Input,
                props: { label: 'Error State', error: 'This field has an error', value: 'Invalid input' }
            },
            {
                Component: Input,
                props: { label: 'Success State', success: 'This field is valid', value: 'Valid input' }
            },
            {
                Component: Input,
                props: { label: 'Disabled State', disabled: true, value: 'Disabled input' }
            },
            {
                Component: Input,
                props: { label: 'Readonly State', readonly: true, value: 'Readonly input' }
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
                Component: Input,
                props: {
                    type: 'text',
                    label: 'Full Name',
                    placeholder: 'Enter your full name',
                    required: true
                }
            },
            {
                Component: Input,
                props: {
                    type: 'email',
                    label: 'Email Address',
                    placeholder: 'you@example.com',
                    required: true
                }
            },
            {
                Component: Input,
                props: {
                    type: 'password',
                    label: 'Password',
                    placeholder: 'Enter your password',
                    showPasswordToggle: true,
                    required: true
                }
            },
            {
                Component: Input,
                props: {
                    type: 'search',
                    label: 'Search',
                    placeholder: 'Search for something...',
                    showClearButton: true
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
                Component: Input,
                props: {
                    label: 'Accessible Input with Label',
                    placeholder: 'This input has a proper label',
                    helperText: 'This helper text is associated with the input via aria-describedby'
                }
            },
            {
                Component: Input,
                props: {
                    ariaLabel: 'Input without visible label',
                    placeholder: 'This input uses aria-label for accessibility'
                }
            },
            {
                Component: Input,
                props: {
                    label: 'Required Field',
                    placeholder: 'This field is required',
                    required: true,
                    helperText: 'Required fields are marked with an asterisk and aria-required'
                }
            }
        ]
    })
};
