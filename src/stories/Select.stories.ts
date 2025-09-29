import type { Meta, StoryObj } from '@storybook/svelte';
import Select from '../components/atoms/Select.svelte';

const meta = {
    title: 'Design System/Atoms/Select',
    component: Select,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: { type: 'text' }
        },
        options: {
            control: { type: 'object' }
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
        searchable: {
            control: { type: 'boolean' }
        },
        clearable: {
            control: { type: 'boolean' }
        },
        name: {
            control: { type: 'text' }
        },
        id: {
            control: { type: 'text' }
        }
    }
} satisfies Meta<Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' }
];

export const Default: Story = {
    args: {
        label: 'Select Label',
        options: sampleOptions,
        placeholder: 'Choose an option...'
    }
};

export const WithValue: Story = {
    args: {
        label: 'Select with Value',
        options: sampleOptions,
        value: 'option2'
    }
};

export const Required: Story = {
    args: {
        label: 'Required Select',
        options: sampleOptions,
        required: true,
        placeholder: 'Please select an option'
    }
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Select',
        options: sampleOptions,
        disabled: true,
        value: 'option1'
    }
};

export const WithError: Story = {
    args: {
        label: 'Select with Error',
        options: sampleOptions,
        error: 'This field has an error',
        value: 'option1'
    }
};

export const WithSuccess: Story = {
    args: {
        label: 'Select with Success',
        options: sampleOptions,
        success: 'This field is valid',
        value: 'option1'
    }
};

export const WithHelpText: Story = {
    args: {
        label: 'Select with Help',
        options: sampleOptions,
        helpText: 'This is helpful information about the select'
    }
};

export const Clearable: Story = {
    args: {
        label: 'Clearable Select',
        options: sampleOptions,
        clearable: true,
        value: 'option2'
    }
};

export const Small: Story = {
    args: {
        size: 'sm',
        label: 'Small Select',
        options: sampleOptions,
        placeholder: 'Small size'
    }
};

export const Large: Story = {
    args: {
        size: 'lg',
        label: 'Large Select',
        options: sampleOptions,
        placeholder: 'Large size'
    }
};

export const Outlined: Story = {
    args: {
        variant: 'outlined',
        label: 'Outlined Select',
        options: sampleOptions,
        placeholder: 'Outlined variant'
    }
};

export const Filled: Story = {
    args: {
        variant: 'filled',
        label: 'Filled Select',
        options: sampleOptions,
        placeholder: 'Filled variant'
    }
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        label: 'Ghost Select',
        options: sampleOptions,
        placeholder: 'Ghost variant'
    }
};

export const WithDisabledOptions: Story = {
    args: {
        label: 'Select with Disabled Options',
        options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2', disabled: true },
            { value: 'option3', label: 'Option 3' },
            { value: 'option4', label: 'Option 4', disabled: true },
            { value: 'option5', label: 'Option 5' }
        ],
        placeholder: 'Some options are disabled'
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
                Component: Select,
                props: { size: 'sm', label: 'Small', options: sampleOptions, placeholder: 'Small size' }
            },
            {
                Component: Select,
                props: { size: 'md', label: 'Medium', options: sampleOptions, placeholder: 'Medium size' }
            },
            {
                Component: Select,
                props: { size: 'lg', label: 'Large', options: sampleOptions, placeholder: 'Large size' }
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
                Component: Select,
                props: { variant: 'default', label: 'Default', options: sampleOptions, placeholder: 'Default variant' }
            },
            {
                Component: Select,
                props: { variant: 'outlined', label: 'Outlined', options: sampleOptions, placeholder: 'Outlined variant' }
            },
            {
                Component: Select,
                props: { variant: 'filled', label: 'Filled', options: sampleOptions, placeholder: 'Filled variant' }
            },
            {
                Component: Select,
                props: { variant: 'ghost', label: 'Ghost', options: sampleOptions, placeholder: 'Ghost variant' }
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
                Component: Select,
                props: { label: 'Normal', options: sampleOptions, placeholder: 'Normal state' }
            },
            {
                Component: Select,
                props: { label: 'With Value', options: sampleOptions, value: 'option2' }
            },
            {
                Component: Select,
                props: { label: 'Disabled', options: sampleOptions, disabled: true, value: 'option1' }
            },
            {
                Component: Select,
                props: { label: 'Error', options: sampleOptions, error: 'This field has an error', value: 'option1' }
            },
            {
                Component: Select,
                props: { label: 'Success', options: sampleOptions, success: 'This field is valid', value: 'option1' }
            }
        ]
    })
};
