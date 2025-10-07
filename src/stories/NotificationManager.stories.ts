import type { Meta, StoryObj } from '@storybook/svelte';
import NotificationManager from '../components/molecules/NotificationManager.svelte';

const meta = {
    title: 'Design System/Molecules/NotificationManager',
    component: NotificationManager,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof NotificationManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};

export const WithNotifications: Story = {
    args: {},
    render: (args) => ({
        Component: NotificationManager,
        props: args
    })
};

export const AutoDismiss: Story = {
    args: {
        autoDismiss: true
    }
};

export const WithCloseButton: Story = {
    args: {
        showCloseButton: true
    }
};

export const CustomDuration: Story = {
    args: {
        duration: 10000
    }
};

export const AllVariants: Story = {
    render: () => ({
        Component: NotificationManager,
        props: {}
    })
};