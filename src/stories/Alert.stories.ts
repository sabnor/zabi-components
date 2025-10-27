import type { Meta, StoryObj } from '@storybook/sveltekit';
import Alert from '../components/molecules/Alert.svelte';

const meta = {
    title: 'Design System/Molecules/Alert',
    component: Alert,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: 'info',
        title: 'Information',
        message: 'This is an informational alert message.'
    }
};

export const Success: Story = {
    args: {
        variant: 'success',
        title: 'Success',
        message: 'Your action was completed successfully.'
    }
};

export const Warning: Story = {
    args: {
        variant: 'warning',
        title: 'Warning',
        message: 'Please check your input before proceeding.'
    }
};

export const Error: Story = {
    args: {
        variant: 'error',
        title: 'Error',
        message: 'Something went wrong. Please try again.'
    }
};

export const Closable: Story = {
    args: {
        variant: 'info',
        title: 'Closable Alert',
        message: 'This alert can be dismissed.',
        closable: true
    }
};