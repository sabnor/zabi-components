import type { Meta, StoryObj } from '@storybook/svelte';
import Input from '../../components/atoms/Input.svelte';

const meta = {
    title: 'Design System/Atoms/Input',
    component: Input,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: { type: 'text' }
        },
        type: {
            control: { type: 'select' },
            options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search']
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
        showPasswordToggle: {
            control: { type: 'boolean' }
        },
        maxLength: {
            control: { type: 'number' }
        },
        minLength: {
            control: { type: 'number' }
        },
        pattern: {
            control: { type: 'text' }
        },
        autocomplete: {
            control: { type: 'select' },
            options: ['on', 'off', 'name', 'email', 'username', 'current-password', 'new-password', 'tel', 'url']
        },
        name: {
            control: { type: 'text' }
        },
        id: {
            control: { type: 'text' }
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
        placeholder: 'Enter your email'
    }
};

export const Password: Story = {
    args: {
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        showPasswordToggle: true
    }
};

export const Number: Story = {
    args: {
        type: 'number',
        label: 'Number Input',
        placeholder: 'Enter a number'
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

export const WithHelpText: Story = {
    args: {
        label: 'Input with Help',
        helpText: 'This is helpful information about the input'
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

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        label: 'Outlined Input',
        placeholder: 'Outlined variant'
    }
};

export const Filled: Story = {
    args: {
        variant: 'filled',
        label: 'Filled Input',
        placeholder: 'Filled variant'
    }
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        label: 'Ghost Input',
        placeholder: 'Ghost variant'
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

export const AllVariants: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'flex flex-col gap-4'
        },
        children: [
            {
                Component: Input,
                props: { variant: 'default', label: 'Default', placeholder: 'Default variant' }
            },
            {
                Component: Input,
                props: { variant: 'outlined', label: 'Outlined', placeholder: 'Outlined variant' }
            },
            {
                Component: Input,
                props: { variant: 'filled', label: 'Filled', placeholder: 'Filled variant' }
            },
            {
                Component: Input,
                props: { variant: 'ghost', label: 'Ghost', placeholder: 'Ghost variant' }
            }
        ]
    })
};

export const AllTypes: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'flex flex-col gap-4'
        },
        children: [
            {
                Component: Input,
                props: { type: 'text', label: 'Text', placeholder: 'Text input' }
            },
            {
                Component: Input,
                props: { type: 'email', label: 'Email', placeholder: 'Email input' }
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
                props: { type: 'tel', label: 'Telephone', placeholder: 'Phone number' }
            },
            {
                Component: Input,
                props: { type: 'url', label: 'URL', placeholder: 'Website URL' }
            },
            {
                Component: Input,
                props: { type: 'search', label: 'Search', placeholder: 'Search...' }
            }
        ]
    })
};
