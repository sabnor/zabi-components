import type { Meta, StoryObj } from '@storybook/svelte';
import Alert from '../components/molecules/Alert.svelte';

const meta = {
    title: 'Design System/Molecules/Alert',
    component: Alert,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['success', 'warning', 'danger', 'info']
        },
        title: {
            control: { type: 'text' }
        },
        message: {
            control: { type: 'text' }
        },
        dismissible: {
            control: { type: 'boolean' }
        },
        onDismiss: {
            action: 'dismissed'
        },
        actions: {
            control: { type: 'object' }
        }
    }
} satisfies Meta<Alert>;

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

export const Danger: Story = {
    args: {
        variant: 'danger',
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
        dismissible: true
    }
};

export const NotDismissible: Story = {
    args: {
        variant: 'danger',
        title: 'Persistent Alert',
        message: 'This alert cannot be dismissed.',
        dismissible: false
    }
};

export const WithActions: Story = {
    args: {
        variant: 'warning',
        title: 'Action Required',
        message: 'Please review and confirm your changes before proceeding.',
        actions: [
            { label: 'Review Changes', onClick: () => {} },
            { label: 'Learn More', href: '#' }
        ]
    }
};

export const AllVariants: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'space-y-4'
        },
        children: [
            {
                Component: Alert,
                props: { variant: 'success', title: 'Success', message: 'Operation completed successfully.' }
            },
            {
                Component: Alert,
                props: { variant: 'warning', title: 'Warning', message: 'Please be careful with this action.' }
            },
            {
                Component: Alert,
                props: { variant: 'danger', title: 'Error', message: 'Something went wrong. Please try again.' }
            },
            {
                Component: Alert,
                props: { variant: 'info', title: 'Information', message: 'Here is some helpful information.' }
            }
        ]
    })
};

export const DismissibleVariants: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'space-y-4'
        },
        children: [
            {
                Component: Alert,
                props: { variant: 'success', title: 'Dismissible Success', message: 'This success alert can be dismissed.', dismissible: true }
            },
            {
                Component: Alert,
                props: { variant: 'warning', title: 'Dismissible Warning', message: 'This warning alert can be dismissed.', dismissible: true }
            },
            {
                Component: Alert,
                props: { variant: 'danger', title: 'Dismissible Error', message: 'This error alert can be dismissed.', dismissible: true }
            },
            {
                Component: Alert,
                props: { variant: 'info', title: 'Dismissible Info', message: 'This info alert can be dismissed.', dismissible: true }
            }
        ]
    })
};

export const WithActionsVariants: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'space-y-4'
        },
        children: [
            {
                Component: Alert,
                props: {
                    variant: 'success',
                    title: 'Profile Updated',
                    message: 'Your profile has been successfully updated.',
                    actions: [
                        { label: 'View Profile', href: '#' }
                    ]
                }
            },
            {
                Component: Alert,
                props: {
                    variant: 'warning',
                    title: 'Session Expiring',
                    message: 'Your session will expire in 5 minutes.',
                    actions: [
                        { label: 'Extend Session', onClick: () => console.log('Extend clicked') },
                        { label: 'Logout', href: '#' }
                    ]
                }
            },
            {
                Component: Alert,
                props: {
                    variant: 'danger',
                    title: 'Payment Failed',
                    message: 'We were unable to process your payment.',
                    actions: [
                        { label: 'Try Again', onClick: () => console.log('Retry clicked') },
                        { label: 'Contact Support', href: '#' }
                    ]
                }
            },
            {
                Component: Alert,
                props: {
                    variant: 'info',
                    title: 'New Feature Available',
                    message: 'Check out our latest feature that can help improve your workflow.',
                    actions: [
                        { label: 'Learn More', href: '#' },
                        { label: 'Dismiss', onClick: () => console.log('Dismiss clicked') }
                    ]
                }
            }
        ]
    })
};
