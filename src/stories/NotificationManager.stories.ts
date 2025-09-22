import type { Meta, StoryObj } from '@storybook/svelte';
import NotificationManager from '../components/organisms/NotificationManager.svelte';

const meta = {
    title: 'Components/Organisms/NotificationManager',
    component: NotificationManager,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs']
} satisfies Meta<NotificationManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};

export const WithNotifications: Story = {
    args: {},
    render: (args) => ({
        Component: 'div',
        props: {
            class: 'min-h-screen bg-gray-900 p-8'
        },
        children: [
            {
                Component: 'div',
                props: { class: 'text-white mb-8' },
                children: [
                    {
                        Component: 'h1',
                        props: { class: 'text-3xl font-bold mb-4' },
                        slot: 'Notification Manager Demo'
                    },
                    {
                        Component: 'p',
                        props: { class: 'text-gray-300 mb-6' },
                        slot: 'This component manages notifications and displays them in the top-right corner. In a real application, notifications would be added to the store programmatically.'
                    }
                ]
            },
            {
                Component: 'div',
                props: { class: 'space-y-4' },
                children: [
                    {
                        Component: 'div',
                        props: { class: 'bg-gray-800 p-6 rounded-lg' },
                        children: [
                            {
                                Component: 'h2',
                                props: { class: 'text-xl font-semibold mb-4 text-white' },
                                slot: 'Notification Types'
                            },
                            {
                                Component: 'div',
                                props: { class: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
                                children: [
                                    {
                                        Component: 'div',
                                        props: { class: 'space-y-2' },
                                        children: [
                                            {
                                                Component: 'h3',
                                                props: { class: 'font-semibold text-green-400' },
                                                slot: 'Success Notifications'
                                            },
                                            {
                                                Component: 'p',
                                                props: { class: 'text-gray-300 text-sm' },
                                                slot: 'Used for successful operations like saving data, completing tasks, etc.'
                                            }
                                        ]
                                    },
                                    {
                                        Component: 'div',
                                        props: { class: 'space-y-2' },
                                        children: [
                                            {
                                                Component: 'h3',
                                                props: { class: 'font-semibold text-red-400' },
                                                slot: 'Error Notifications'
                                            },
                                            {
                                                Component: 'p',
                                                props: { class: 'text-gray-300 text-sm' },
                                                slot: 'Used for errors like failed API calls, validation errors, etc.'
                                            }
                                        ]
                                    },
                                    {
                                        Component: 'div',
                                        props: { class: 'space-y-2' },
                                        children: [
                                            {
                                                Component: 'h3',
                                                props: { class: 'font-semibold text-yellow-400' },
                                                slot: 'Warning Notifications'
                                            },
                                            {
                                                Component: 'p',
                                                props: { class: 'text-gray-300 text-sm' },
                                                slot: 'Used for warnings like unsaved changes, deprecated features, etc.'
                                            }
                                        ]
                                    },
                                    {
                                        Component: 'div',
                                        props: { class: 'space-y-2' },
                                        children: [
                                            {
                                                Component: 'h3',
                                                props: { class: 'font-semibold text-blue-400' },
                                                slot: 'Info Notifications'
                                            },
                                            {
                                                Component: 'p',
                                                props: { class: 'text-gray-300 text-sm' },
                                                slot: 'Used for general information like new features, tips, etc.'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        Component: 'div',
                        props: { class: 'bg-gray-800 p-6 rounded-lg' },
                        children: [
                            {
                                Component: 'h2',
                                props: { class: 'text-xl font-semibold mb-4 text-white' },
                                slot: 'Features'
                            },
                            {
                                Component: 'ul',
                                props: { class: 'space-y-2 text-gray-300' },
                                children: [
                                    {
                                        Component: 'li',
                                        props: { class: 'flex items-start gap-2' },
                                        children: [
                                            {
                                                Component: 'span',
                                                props: { class: 'text-green-400 mt-1' },
                                                slot: '✓'
                                            },
                                            {
                                                Component: 'span',
                                                slot: 'Automatic positioning in top-right corner'
                                            }
                                        ]
                                    },
                                    {
                                        Component: 'li',
                                        props: { class: 'flex items-start gap-2' },
                                        children: [
                                            {
                                                Component: 'span',
                                                props: { class: 'text-green-400 mt-1' },
                                                slot: '✓'
                                            },
                                            {
                                                Component: 'span',
                                                slot: 'Smooth slide-in animations'
                                            }
                                        ]
                                    },
                                    {
                                        Component: 'li',
                                        props: { class: 'flex items-start gap-2' },
                                        children: [
                                            {
                                                Component: 'span',
                                                props: { class: 'text-green-400 mt-1' },
                                                slot: '✓'
                                            },
                                            {
                                                Component: 'span',
                                                slot: 'Individual close buttons for each notification'
                                            }
                                        ]
                                    },
                                    {
                                        Component: 'li',
                                        props: { class: 'flex items-start gap-2' },
                                        children: [
                                            {
                                                Component: 'span',
                                                props: { class: 'text-green-400 mt-1' },
                                                slot: '✓'
                                            },
                                            {
                                                Component: 'span',
                                                slot: 'Responsive design with proper spacing'
                                            }
                                        ]
                                    },
                                    {
                                        Component: 'li',
                                        props: { class: 'flex items-start gap-2' },
                                        children: [
                                            {
                                                Component: 'span',
                                                props: { class: 'text-green-400 mt-1' },
                                                slot: '✓'
                                            },
                                            {
                                                Component: 'span',
                                                slot: 'Accessible with proper ARIA attributes'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                Component: NotificationManager,
                props: args
            }
        ]
    })
};

export const EmptyState: Story = {
    args: {},
    render: (args) => ({
        Component: 'div',
        props: {
            class: 'min-h-screen bg-gray-900 p-8'
        },
        children: [
            {
                Component: 'div',
                props: { class: 'text-white mb-8' },
                children: [
                    {
                        Component: 'h1',
                        props: { class: 'text-3xl font-bold mb-4' },
                        slot: 'Empty Notification State'
                    },
                    {
                        Component: 'p',
                        props: { class: 'text-gray-300 mb-6' },
                        slot: 'When there are no notifications, the NotificationManager component is not visible.'
                    }
                ]
            },
            {
                Component: 'div',
                props: { class: 'bg-gray-800 p-6 rounded-lg' },
                children: [
                    {
                        Component: 'h2',
                        props: { class: 'text-xl font-semibold mb-4 text-white' },
                        slot: 'How to Add Notifications'
                    },
                    {
                        Component: 'div',
                        props: { class: 'space-y-4' },
                        children: [
                            {
                                Component: 'div',
                                props: { class: 'bg-gray-700 p-4 rounded-lg' },
                                children: [
                                    {
                                        Component: 'h3',
                                        props: { class: 'font-semibold text-blue-400 mb-2' },
                                        slot: '1. Import the notification store'
                                    },
                                    {
                                        Component: 'pre',
                                        props: { class: 'text-sm text-gray-300 font-mono' },
                                        slot: 'import { notificationStore } from "$lib/utils/errorHandling";'
                                    }
                                ]
                            },
                            {
                                Component: 'div',
                                props: { class: 'bg-gray-700 p-4 rounded-lg' },
                                children: [
                                    {
                                        Component: 'h3',
                                        props: { class: 'font-semibold text-blue-400 mb-2' },
                                        slot: '2. Add a notification'
                                    },
                                    {
                                        Component: 'pre',
                                        props: { class: 'text-sm text-gray-300 font-mono' },
                                        slot: 'notificationStore.add({\n  type: "success",\n  message: "Operation completed successfully!"\n});'
                                    }
                                ]
                            },
                            {
                                Component: 'div',
                                props: { class: 'bg-gray-700 p-4 rounded-lg' },
                                children: [
                                    {
                                        Component: 'h3',
                                        props: { class: 'font-semibold text-blue-400 mb-2' },
                                        slot: '3. Remove a notification'
                                    },
                                    {
                                        Component: 'pre',
                                        props: { class: 'text-sm text-gray-300 font-mono' },
                                        slot: 'notificationStore.remove(notificationId);'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                Component: NotificationManager,
                props: args
            }
        ]
    })
};
