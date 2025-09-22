import type { Meta, StoryObj } from '@storybook/svelte';
import Dropdown from '../components/molecules/Dropdown.svelte';

const meta = {
    title: 'Components/Molecules/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        isOpen: {
            control: { type: 'boolean' }
        },
        placement: {
            control: { type: 'select' },
            options: ['bottom-start', 'bottom-end', 'top-start', 'top-end']
        },
        offset: {
            control: { type: 'number' }
        },
        maxHeight: {
            control: { type: 'text' }
        },
        width: {
            control: { type: 'text' }
        },
        zIndex: {
            control: { type: 'number' }
        }
    }
} satisfies Meta<Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        isOpen: true
    },
    render: (args) => ({
        Component: Dropdown,
        props: args,
        children: [
            {
                Component: 'button',
                props: { slot: 'trigger', class: 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700' },
                slot: 'Open Dropdown'
            },
            {
                Component: 'div',
                props: { class: 'p-4' },
                children: [
                    {
                        Component: 'div',
                        props: { class: 'text-white mb-2' },
                        slot: 'Dropdown Content'
                    },
                    {
                        Component: 'p',
                        props: { class: 'text-gray-300 text-sm' },
                        slot: 'This is the dropdown content area.'
                    }
                ]
            }
        ]
    })
};

export const BottomStart: Story = {
    args: {
        isOpen: true,
        placement: 'bottom-start'
    },
    render: (args) => ({
        Component: Dropdown,
        props: args,
        children: [
            {
                Component: 'button',
                props: { slot: 'trigger', class: 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700' },
                slot: 'Bottom Start'
            },
            {
                Component: 'div',
                props: { class: 'p-4' },
                children: [
                    {
                        Component: 'div',
                        props: { class: 'text-white mb-2' },
                        slot: 'Bottom Start Placement'
                    },
                    {
                        Component: 'p',
                        props: { class: 'text-gray-300 text-sm' },
                        slot: 'This dropdown is positioned at the bottom start of the trigger.'
                    }
                ]
            }
        ]
    })
};

export const BottomEnd: Story = {
    args: {
        isOpen: true,
        placement: 'bottom-end'
    },
    render: (args) => ({
        Component: Dropdown,
        props: args,
        children: [
            {
                Component: 'button',
                props: { slot: 'trigger', class: 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700' },
                slot: 'Bottom End'
            },
            {
                Component: 'div',
                props: { class: 'p-4' },
                children: [
                    {
                        Component: 'div',
                        props: { class: 'text-white mb-2' },
                        slot: 'Bottom End Placement'
                    },
                    {
                        Component: 'p',
                        props: { class: 'text-gray-300 text-sm' },
                        slot: 'This dropdown is positioned at the bottom end of the trigger.'
                    }
                ]
            }
        ]
    })
};

export const TopStart: Story = {
    args: {
        isOpen: true,
        placement: 'top-start'
    },
    render: (args) => ({
        Component: Dropdown,
        props: args,
        children: [
            {
                Component: 'button',
                props: { slot: 'trigger', class: 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700' },
                slot: 'Top Start'
            },
            {
                Component: 'div',
                props: { class: 'p-4' },
                children: [
                    {
                        Component: 'div',
                        props: { class: 'text-white mb-2' },
                        slot: 'Top Start Placement'
                    },
                    {
                        Component: 'p',
                        props: { class: 'text-gray-300 text-sm' },
                        slot: 'This dropdown is positioned at the top start of the trigger.'
                    }
                ]
            }
        ]
    })
};

export const TopEnd: Story = {
    args: {
        isOpen: true,
        placement: 'top-end'
    },
    render: (args) => ({
        Component: Dropdown,
        props: args,
        children: [
            {
                Component: 'button',
                props: { slot: 'trigger', class: 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700' },
                slot: 'Top End'
            },
            {
                Component: 'div',
                props: { class: 'p-4' },
                children: [
                    {
                        Component: 'div',
                        props: { class: 'text-white mb-2' },
                        slot: 'Top End Placement'
                    },
                    {
                        Component: 'p',
                        props: { class: 'text-gray-300 text-sm' },
                        slot: 'This dropdown is positioned at the top end of the trigger.'
                    }
                ]
            }
        ]
    })
};

export const WithMenu: Story = {
    args: {
        isOpen: true,
        width: '200px'
    },
    render: (args) => ({
        Component: Dropdown,
        props: args,
        children: [
            {
                Component: 'button',
                props: { slot: 'trigger', class: 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700' },
                slot: 'Menu Dropdown'
            },
            {
                Component: 'div',
                props: { class: 'py-2' },
                children: [
                    {
                        Component: 'button',
                        props: { class: 'w-full px-4 py-2 text-left text-white hover:bg-gray-700' },
                        slot: 'Profile'
                    },
                    {
                        Component: 'button',
                        props: { class: 'w-full px-4 py-2 text-left text-white hover:bg-gray-700' },
                        slot: 'Settings'
                    },
                    {
                        Component: 'button',
                        props: { class: 'w-full px-4 py-2 text-left text-white hover:bg-gray-700' },
                        slot: 'Help'
                    },
                    {
                        Component: 'hr',
                        props: { class: 'my-2 border-gray-600' }
                    },
                    {
                        Component: 'button',
                        props: { class: 'w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700' },
                        slot: 'Sign Out'
                    }
                ]
            }
        ]
    })
};

export const WithLongContent: Story = {
    args: {
        isOpen: true,
        maxHeight: '200px',
        width: '300px'
    },
    render: (args) => ({
        Component: Dropdown,
        props: args,
        children: [
            {
                Component: 'button',
                props: { slot: 'trigger', class: 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700' },
                slot: 'Long Content'
            },
            {
                Component: 'div',
                props: { class: 'p-4' },
                children: [
                    {
                        Component: 'div',
                        props: { class: 'text-white mb-4' },
                        slot: 'Long Content Dropdown'
                    },
                    {
                        Component: 'div',
                        props: { class: 'space-y-2' },
                        children: [
                            {
                                Component: 'p',
                                props: { class: 'text-gray-300 text-sm' },
                                slot: 'This dropdown has a lot of content to demonstrate scrolling behavior.'
                            },
                            {
                                Component: 'p',
                                props: { class: 'text-gray-300 text-sm' },
                                slot: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                            },
                            {
                                Component: 'p',
                                props: { class: 'text-gray-300 text-sm' },
                                slot: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                            },
                            {
                                Component: 'p',
                                props: { class: 'text-gray-300 text-sm' },
                                slot: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
                            },
                            {
                                Component: 'p',
                                props: { class: 'text-gray-300 text-sm' },
                                slot: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                            }
                        ]
                    }
                ]
            }
        ]
    })
};

export const AllPlacements: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'grid grid-cols-2 gap-8 p-8'
        },
        children: [
            {
                Component: Dropdown,
                props: { isOpen: true, placement: 'bottom-start' },
                children: [
                    {
                        Component: 'button',
                        props: { slot: 'trigger', class: 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700' },
                        slot: 'Bottom Start'
                    },
                    {
                        Component: 'div',
                        props: { class: 'p-4' },
                        children: [
                            {
                                Component: 'div',
                                props: { class: 'text-white mb-2' },
                                slot: 'Bottom Start'
                            }
                        ]
                    }
                ]
            },
            {
                Component: Dropdown,
                props: { isOpen: true, placement: 'bottom-end' },
                children: [
                    {
                        Component: 'button',
                        props: { slot: 'trigger', class: 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700' },
                        slot: 'Bottom End'
                    },
                    {
                        Component: 'div',
                        props: { class: 'p-4' },
                        children: [
                            {
                                Component: 'div',
                                props: { class: 'text-white mb-2' },
                                slot: 'Bottom End'
                            }
                        ]
                    }
                ]
            },
            {
                Component: Dropdown,
                props: { isOpen: true, placement: 'top-start' },
                children: [
                    {
                        Component: 'button',
                        props: { slot: 'trigger', class: 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700' },
                        slot: 'Top Start'
                    },
                    {
                        Component: 'div',
                        props: { class: 'p-4' },
                        children: [
                            {
                                Component: 'div',
                                props: { class: 'text-white mb-2' },
                                slot: 'Top Start'
                            }
                        ]
                    }
                ]
            },
            {
                Component: Dropdown,
                props: { isOpen: true, placement: 'top-end' },
                children: [
                    {
                        Component: 'button',
                        props: { slot: 'trigger', class: 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700' },
                        slot: 'Top End'
                    },
                    {
                        Component: 'div',
                        props: { class: 'p-4' },
                        children: [
                            {
                                Component: 'div',
                                props: { class: 'text-white mb-2' },
                                slot: 'Top End'
                            }
                        ]
                    }
                ]
            }
        ]
    })
};
