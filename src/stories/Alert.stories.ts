import type { Meta, StoryObj } from '@storybook/svelte';
import Alert from '../components/molecules/Alert.svelte';

const meta = {
    title: 'Components/Molecules/Alert',
    component: Alert,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['error', 'warning', 'success', 'info', 'game-error']
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
        }
    }
} satisfies Meta<Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        type: 'info',
        title: 'Information',
        message: 'This is an informational alert message.'
    }
};

export const Error: Story = {
    args: {
        type: 'error',
        title: 'Error',
        message: 'Something went wrong. Please try again.'
    }
};

export const Warning: Story = {
    args: {
        type: 'warning',
        title: 'Warning',
        message: 'Please be careful with this action.'
    }
};

export const Success: Story = {
    args: {
        type: 'success',
        title: 'Success',
        message: 'Your action was completed successfully.'
    }
};

export const Info: Story = {
    args: {
        type: 'info',
        title: 'Information',
        message: 'Here is some helpful information for you.'
    }
};

export const GameError: Story = {
    args: {
        type: 'game-error',
        title: 'Authentication Failed',
        message: 'Unable to connect to the game server. Please check your credentials.'
    }
};

export const WithoutTitle: Story = {
    args: {
        type: 'info',
        message: 'This alert has no title, just a message.'
    }
};

export const WithoutMessage: Story = {
    args: {
        type: 'success',
        title: 'Success'
    }
};

export const Dismissible: Story = {
    args: {
        type: 'info',
        title: 'Dismissible Alert',
        message: 'This alert can be dismissed by clicking the X button.',
        dismissible: true
    }
};

export const NotDismissible: Story = {
    args: {
        type: 'error',
        title: 'Persistent Alert',
        message: 'This alert cannot be dismissed.',
        dismissible: false
    }
};

export const AllTypes: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'space-y-4'
        },
        children: [
            {
                Component: Alert,
                props: { type: 'error', title: 'Error', message: 'Something went wrong.' }
            },
            {
                Component: Alert,
                props: { type: 'warning', title: 'Warning', message: 'Please be careful.' }
            },
            {
                Component: Alert,
                props: { type: 'success', title: 'Success', message: 'Operation completed.' }
            },
            {
                Component: Alert,
                props: { type: 'info', title: 'Information', message: 'Here is some info.' }
            },
            {
                Component: Alert,
                props: { type: 'game-error', title: 'Game Error', message: 'Connection failed.' }
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
                props: { type: 'error', title: 'Dismissible Error', message: 'This error can be dismissed.', dismissible: true }
            },
            {
                Component: Alert,
                props: { type: 'warning', title: 'Dismissible Warning', message: 'This warning can be dismissed.', dismissible: true }
            },
            {
                Component: Alert,
                props: { type: 'success', title: 'Dismissible Success', message: 'This success can be dismissed.', dismissible: true }
            },
            {
                Component: Alert,
                props: { type: 'info', title: 'Dismissible Info', message: 'This info can be dismissed.', dismissible: true }
            }
        ]
    })
};
