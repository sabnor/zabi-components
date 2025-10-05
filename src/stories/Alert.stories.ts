import type { Meta, StoryObj } from '@storybook/svelte';
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
        message: 'Please be careful with this action.'
    }
};

export const Error: Story = {
    args: {
        variant: 'error',
        title: 'Error',
        message: 'Something went wrong. Please try again.'
    }
};

export const Info: Story = {
    args: {
        variant: 'info',
        title: 'Information',
        message: 'Here is some helpful information for you.'
    }
};

export const WithoutTitle: Story = {
    args: {
        variant: 'info',
        message: 'This alert has no title, just a message.'
    }
};

export const WithoutMessage: Story = {
    args: {
        variant: 'success',
        title: 'Success'
    }
};

export const Dismissible: Story = {
    args: {
        variant: 'info',
        title: 'Dismissible Alert',
        message: 'This alert can be dismissed by clicking the X button.',
        closable: true
    }
};

export const NotDismissible: Story = {
    args: {
        variant: 'error',
        title: 'Persistent Alert',
        message: 'This alert cannot be dismissed.',
        closable: false
    }
};

export const WithActions: Story = {
    args: {
        variant: 'warning',
        title: 'Action Required',
        message: 'Please review and confirm your changes before proceeding.',
        actions: [
            { label: 'Review Changes', onClick: () => { } },
            { label: 'Learn More', href: '#' }
        ]
    }
};

export const AllVariants: Story = {
    render: () => ({
        Component: Alert,
        props: { variant: 'info', title: 'All Variants', message: 'All variants showcase' }
    })
};

export const DismissibleVariants: Story = {
    render: () => ({
        Component: Alert,
        props: { variant: 'info', title: 'Dismissible Alert', message: 'This alert can be dismissed.', closable: true }
    })
};

export const WithActionsVariants: Story = {
    render: () => ({
        Component: Alert,
        props: {
            variant: 'info',
            title: 'Alert with Actions',
            message: 'This alert has action buttons.'
        }
    })
};
