import type { Meta, StoryObj } from '@storybook/sveltekit';
import Select from '../components/atoms/Select.svelte';

const meta = {
    title: 'Design System/Atoms/Select',
    component: Select,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
];

export const Default: Story = {
    args: {
        label: 'Select Label',
        placeholder: 'Choose an option',
        options: sampleOptions
    }
};

export const WithValue: Story = {
    args: {
        label: 'Select with Value',
        value: 'option2',
        options: sampleOptions
    }
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Select',
        placeholder: 'This select is disabled',
        disabled: true,
        options: sampleOptions
    }
};

export const Small: Story = {
    args: {
        label: 'Small Select',
        size: 'sm',
        options: sampleOptions
    }
};

export const Medium: Story = {
    args: {
        label: 'Medium Select',
        size: 'md',
        options: sampleOptions
    }
};

export const Large: Story = {
    args: {
        label: 'Large Select',
        size: 'lg',
        options: sampleOptions
    }
};

export const Success: Story = {
    args: {
        label: 'Success Select',
        variant: 'success',
        message: 'Selection is valid',
        options: sampleOptions
    }
};

export const Warning: Story = {
    args: {
        label: 'Warning Select',
        variant: 'warning',
        message: 'Please verify your selection',
        options: sampleOptions
    }
};

export const Error: Story = {
    args: {
        label: 'Error Select',
        variant: 'error',
        message: 'Please select an option',
        options: sampleOptions
    }
};

export const ManyOptions: Story = {
    args: {
        label: 'Select with Many Options',
        placeholder: 'Choose an option',
        options: [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
            { value: '4', label: 'Option 4' },
            { value: '5', label: 'Option 5' },
            { value: '6', label: 'Option 6' },
            { value: '7', label: 'Option 7' },
            { value: '8', label: 'Option 8' }
        ]
    }
};

export const WithDisabledOption: Story = {
    args: {
        label: 'Select with Disabled Option',
        options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2 (Disabled)', disabled: true },
            { value: 'option3', label: 'Option 3' }
        ]
    }
};