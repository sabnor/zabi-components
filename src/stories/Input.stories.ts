import type { Meta, StoryObj } from '@storybook/svelte';
import Input from '../components/atoms/Input.svelte';

const meta = {
    title: 'Design System/Atoms/Input',
    component: Input,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Input>;

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
        placeholder: 'you@example.com'
    }
};

export const Password: Story = {
    args: {
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password'
    }
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Input',
        placeholder: 'This input is disabled',
        disabled: true
    }
};

export const Small: Story = {
    args: {
        label: 'Small Input',
        placeholder: 'Small size input',
        size: 'sm'
    }
};

export const Large: Story = {
    args: {
        label: 'Large Input',
        placeholder: 'Large size input',
        size: 'lg'
    }
};

export const Success: Story = {
    args: {
        label: 'Success Input',
        placeholder: 'This input has success styling',
        variant: 'success'
    }
};

export const Warning: Story = {
    args: {
        label: 'Warning Input',
        placeholder: 'This input has warning styling',
        variant: 'warning'
    }
};

export const Error: Story = {
    args: {
        label: 'Error Input',
        placeholder: 'This input has error styling',
        variant: 'error'
    }
};