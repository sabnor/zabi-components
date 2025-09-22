import type { Meta, StoryObj } from '@storybook/svelte';
import SlideUp from '../components/molecules/SlideUp.svelte';

const meta = {
    title: 'Components/Molecules/SlideUp',
    component: SlideUp,
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
        maxHeight: {
            control: { type: 'text' }
        },
        zIndex: {
            control: { type: 'number' }
        }
    }
} satisfies Meta<SlideUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        isOpen: true,
        title: 'SlideUp Title',
        slot: 'This is the slideup content. It slides up from the bottom of the screen.'
    }
};

export const WithoutTitle: Story = {
    args: {
        isOpen: true,
        title: '',
        slot: 'This slideup has no title.'
    }
};

export const WithLongContent: Story = {
    args: {
        isOpen: true,
        title: 'Long Content SlideUp',
        slot: 'This slideup has a lot of content to demonstrate scrolling behavior.'
    },
    render: (args) => ({
        Component: SlideUp,
        props: args,
        children: [
            'This slideup has a lot of content to demonstrate scrolling behavior.',
            {
                Component: 'div',
                props: { class: 'p-4 space-y-4' },
                children: [
                    {
                        Component: 'p',
                        props: { class: 'text-gray-300' },
                        slot: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                    },
                    {
                        Component: 'p',
                        props: { class: 'text-gray-300' },
                        slot: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                    },
                    {
                        Component: 'p',
                        props: { class: 'text-gray-300' },
                        slot: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
                    },
                    {
                        Component: 'p',
                        props: { class: 'text-gray-300' },
                        slot: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
                    },
                    {
                        Component: 'p',
                        props: { class: 'text-gray-300' },
                        slot: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
                    }
                ]
            }
        ]
    })
};

export const WithForm: Story = {
    args: {
        isOpen: true,
        title: 'Create New Item',
        slot: 'Fill out the form below to create a new item.'
    },
    render: (args) => ({
        Component: SlideUp,
        props: args,
        children: [
            'Fill out the form below to create a new item.',
            {
                Component: 'form',
                props: { class: 'p-4 space-y-4' },
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
                    },
                    {
                        Component: 'div',
                        props: { class: 'flex gap-3 pt-4' },
                        children: [
                            {
                                Component: 'button',
                                props: { type: 'button', class: 'flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700' },
                                slot: 'Cancel'
                            },
                            {
                                Component: 'button',
                                props: { type: 'submit', class: 'flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700' },
                                slot: 'Create'
                            }
                        ]
                    }
                ]
            }
        ]
    })
};

export const WithList: Story = {
    args: {
        isOpen: true,
        title: 'Select Option',
        slot: 'Choose one of the options below.'
    },
    render: (args) => ({
        Component: SlideUp,
        props: args,
        children: [
            'Choose one of the options below.',
            {
                Component: 'div',
                props: { class: 'py-2' },
                children: [
                    {
                        Component: 'button',
                        props: { class: 'w-full px-4 py-3 text-left text-white hover:bg-gray-700 border-b border-gray-700' },
                        slot: 'Option 1'
                    },
                    {
                        Component: 'button',
                        props: { class: 'w-full px-4 py-3 text-left text-white hover:bg-gray-700 border-b border-gray-700' },
                        slot: 'Option 2'
                    },
                    {
                        Component: 'button',
                        props: { class: 'w-full px-4 py-3 text-left text-white hover:bg-gray-700 border-b border-gray-700' },
                        slot: 'Option 3'
                    },
                    {
                        Component: 'button',
                        props: { class: 'w-full px-4 py-3 text-left text-white hover:bg-gray-700 border-b border-gray-700' },
                        slot: 'Option 4'
                    },
                    {
                        Component: 'button',
                        props: { class: 'w-full px-4 py-3 text-left text-white hover:bg-gray-700' },
                        slot: 'Option 5'
                    }
                ]
            }
        ]
    })
};

export const CustomHeight: Story = {
    args: {
        isOpen: true,
        title: 'Custom Height SlideUp',
        maxHeight: '50vh',
        slot: 'This slideup has a custom maximum height of 50vh.'
    }
};

export const WithBackdrop: Story = {
    args: {
        isOpen: true,
        title: 'SlideUp with Backdrop',
        slot: 'This slideup has a backdrop that can be clicked to close it.'
    },
    render: (args) => ({
        Component: 'div',
        props: {
            class: 'min-h-screen bg-gray-900 p-8'
        },
        children: [
            {
                Component: 'div',
                props: { class: 'text-white mb-4' },
                children: [
                    {
                        Component: 'h1',
                        props: { class: 'text-2xl font-bold mb-2' },
                        slot: 'SlideUp with Backdrop Demo'
                    },
                    {
                        Component: 'p',
                        props: { class: 'text-gray-300' },
                        slot: 'The slideup is open and has a backdrop. You can click outside to close it or press Escape.'
                    }
                ]
            },
            {
                Component: SlideUp,
                props: args,
                children: [
                    'This slideup has a backdrop that can be clicked to close it.',
                    {
                        Component: 'div',
                        props: { class: 'p-4' },
                        children: [
                            {
                                Component: 'p',
                                props: { class: 'text-gray-300 mb-4' },
                                slot: 'Click outside the slideup or press Escape to close it.'
                            },
                            {
                                Component: 'button',
                                props: { class: 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700' },
                                slot: 'Close SlideUp'
                            }
                        ]
                    }
                ]
            }
        ]
    })
};
