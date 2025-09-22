import type { Meta, StoryObj } from '@storybook/svelte';
import Modal from '../components/molecules/Modal.svelte';

const meta = {
    title: 'Design System/Molecules/Modal',
    component: Modal,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs'],
    argTypes: {
        isOpen: {
            control: { type: 'boolean' }
        },
        title: {
            control: { type: 'text' }
        },
        showCloseButton: {
            control: { type: 'boolean' }
        }
    }
} satisfies Meta<Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        isOpen: true,
        title: 'Modal Title',
        slot: 'This is the modal content. You can put any content here.'
    }
};

export const WithoutTitle: Story = {
    args: {
        isOpen: true,
        title: '',
        slot: 'This modal has no title.'
    }
};

export const WithoutCloseButton: Story = {
    args: {
        isOpen: true,
        title: 'Modal Without Close Button',
        showCloseButton: false,
        slot: 'This modal cannot be closed with the X button. You need to click outside or press Escape.'
    }
};

export const WithFooter: Story = {
    args: {
        isOpen: true,
        title: 'Modal with Footer',
        slot: 'This modal has a footer with action buttons.'
    },
    render: (args) => ({
        Component: Modal,
        props: args,
        children: [
            'This modal has a footer with action buttons.',
            {
                Component: 'div',
                props: { slot: 'footer' },
                children: [
                    {
                        Component: 'button',
                        props: { class: 'px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700' },
                        slot: 'Cancel'
                    },
                    {
                        Component: 'button',
                        props: { class: 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700' },
                        slot: 'Save'
                    }
                ]
            }
        ]
    })
};

export const LongContent: Story = {
    args: {
        isOpen: true,
        title: 'Modal with Long Content',
        slot: 'This modal has a lot of content to demonstrate scrolling behavior.'
    },
    render: (args) => ({
        Component: Modal,
        props: args,
        children: [
            'This modal has a lot of content to demonstrate scrolling behavior.',
            {
                Component: 'div',
                props: { class: 'mt-4 space-y-4' },
                children: [
                    {
                        Component: 'p',
                        slot: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                    },
                    {
                        Component: 'p',
                        slot: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                    },
                    {
                        Component: 'p',
                        slot: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
                    },
                    {
                        Component: 'p',
                        slot: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
                    },
                    {
                        Component: 'p',
                        slot: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
                    }
                ]
            }
        ]
    })
};

export const Confirmation: Story = {
    args: {
        isOpen: true,
        title: 'Confirm Action',
        slot: 'Are you sure you want to delete this item? This action cannot be undone.'
    },
    render: (args) => ({
        Component: Modal,
        props: args,
        children: [
            'Are you sure you want to delete this item? This action cannot be undone.',
            {
                Component: 'div',
                props: { slot: 'footer' },
                children: [
                    {
                        Component: 'button',
                        props: { class: 'px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700' },
                        slot: 'Cancel'
                    },
                    {
                        Component: 'button',
                        props: { class: 'px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700' },
                        slot: 'Delete'
                    }
                ]
            }
        ]
    })
};

export const Form: Story = {
    args: {
        isOpen: true,
        title: 'Create New Item',
        slot: 'Fill out the form below to create a new item.'
    },
    render: (args) => ({
        Component: Modal,
        props: args,
        children: [
            'Fill out the form below to create a new item.',
            {
                Component: 'form',
                props: { class: 'mt-4 space-y-4' },
                children: [
                    {
                        Component: 'div',
                        children: [
                            {
                                Component: 'label',
                                props: { class: 'block text-sm font-medium text-gray-300 mb-1' },
                                slot: 'Name'
                            },
                            {
                                Component: 'input',
                                props: { type: 'text', class: 'w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white' }
                            }
                        ]
                    },
                    {
                        Component: 'div',
                        children: [
                            {
                                Component: 'label',
                                props: { class: 'block text-sm font-medium text-gray-300 mb-1' },
                                slot: 'Description'
                            },
                            {
                                Component: 'textarea',
                                props: { class: 'w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white', rows: 3 }
                            }
                        ]
                    }
                ]
            },
            {
                Component: 'div',
                props: { slot: 'footer' },
                children: [
                    {
                        Component: 'button',
                        props: { type: 'button', class: 'px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700' },
                        slot: 'Cancel'
                    },
                    {
                        Component: 'button',
                        props: { type: 'submit', class: 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700' },
                        slot: 'Create'
                    }
                ]
            }
        ]
    })
};
