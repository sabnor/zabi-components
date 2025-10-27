import type { Meta, StoryObj } from '@storybook/sveltekit';
import Select from '../components/atoms/Select.svelte';

const meta = {
    title: 'Design System/Atoms/Select',
    component: Select,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
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

export const Large: Story = {
    args: {
        label: 'Large Select',
        size: 'lg',
        options: sampleOptions
    }
};