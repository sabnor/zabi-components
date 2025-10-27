import type { Meta, StoryObj } from '@storybook/sveltekit';
import Textarea from '../components/atoms/Textarea.svelte';

const meta = {
    title: 'Design System/Atoms/Textarea',
    component: Textarea,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Textarea>;

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
        value: 'This is some sample text content.'
    }
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Textarea',
        placeholder: 'This textarea is disabled',
        disabled: true
    }
};

export const WithRows: Story = {
    args: {
        label: 'Textarea with Custom Rows',
        placeholder: 'This textarea has 5 rows',
        rows: 5
    }
};

export const Small: Story = {
    args: {
        label: 'Small Textarea',
        placeholder: 'Small size textarea',
        size: 'sm'
    }
};

export const Large: Story = {
    args: {
        label: 'Large Textarea',
        placeholder: 'Large size textarea',
        size: 'lg'
    }
};

export const Success: Story = {
    args: {
        label: 'Success Textarea',
        placeholder: 'This textarea has success styling',
        variant: 'success'
    }
};

export const Warning: Story = {
    args: {
        label: 'Warning Textarea',
        placeholder: 'This textarea has warning styling',
        variant: 'warning'
    }
};

export const Error: Story = {
    args: {
        label: 'Error Textarea',
        placeholder: 'This textarea has error styling',
        variant: 'error'
    }
};