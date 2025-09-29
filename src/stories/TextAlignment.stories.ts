import type { Meta, StoryObj } from '@storybook/svelte';
import TextAlignment from '../components/atoms/TextAlignment.svelte';

const meta = {
    title: 'Design System/Atoms/TextAlignment',
    component: TextAlignment,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: { type: 'select' },
            options: ['left', 'center', 'right']
        },
        label: {
            control: { type: 'text' }
        },
        required: {
            control: { type: 'boolean' }
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg']
        }
    }
} satisfies Meta<TextAlignment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Text Alignment'
    }
};

export const Left: Story = {
    args: {
        value: 'left',
        label: 'Text Alignment'
    }
};

export const Center: Story = {
    args: {
        value: 'center',
        label: 'Text Alignment'
    }
};

export const Right: Story = {
    args: {
        value: 'right',
        label: 'Text Alignment'
    }
};

export const Required: Story = {
    args: {
        label: 'Text Alignment',
        required: true
    }
};

export const Small: Story = {
    args: {
        size: 'sm',
        label: 'Small Text Alignment'
    }
};

export const Medium: Story = {
    args: {
        size: 'md',
        label: 'Medium Text Alignment'
    }
};

export const Large: Story = {
    args: {
        size: 'lg',
        label: 'Large Text Alignment'
    }
};

export const AllSizes: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'flex flex-col gap-4'
        },
        children: [
            {
                Component: TextAlignment,
                props: { size: 'sm', label: 'Small' }
            },
            {
                Component: TextAlignment,
                props: { size: 'md', label: 'Medium' }
            },
            {
                Component: TextAlignment,
                props: { size: 'lg', label: 'Large' }
            }
        ]
    })
};

export const AllAlignments: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'flex flex-col gap-4'
        },
        children: [
            {
                Component: TextAlignment,
                props: { value: 'left', label: 'Left Alignment' }
            },
            {
                Component: TextAlignment,
                props: { value: 'center', label: 'Center Alignment' }
            },
            {
                Component: TextAlignment,
                props: { value: 'right', label: 'Right Alignment' }
            }
        ]
    })
};

export const WithPreview: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'space-y-6'
        },
        children: [
            {
                Component: 'div',
                props: { class: 'space-y-2' },
                children: [
                    {
                        Component: 'h3',
                        props: { class: 'text-lg font-semibold text-white' },
                        slot: 'Text Alignment Control'
                    },
                    {
                        Component: TextAlignment,
                        props: { label: 'Choose Alignment' }
                    }
                ]
            },
            {
                Component: 'div',
                props: { class: 'space-y-2' },
                children: [
                    {
                        Component: 'h3',
                        props: { class: 'text-lg font-semibold text-white' },
                        slot: 'Preview'
                    },
                    {
                        Component: 'div',
                        props: { class: 'bg-gray-800 p-4 rounded-lg border border-gray-700' },
                        children: [
                            {
                                Component: 'p',
                                props: { class: 'text-gray-300' },
                                slot: 'This is a sample text to demonstrate the different alignment options. You can see how the text alignment affects the visual appearance of the content.'
                            }
                        ]
                    }
                ]
            }
        ]
    })
};
