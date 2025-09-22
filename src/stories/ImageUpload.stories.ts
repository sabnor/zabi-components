import type { Meta, StoryObj } from '@storybook/svelte';
import ImageUpload from '../components/molecules/ImageUpload.svelte';

const meta = {
    title: 'Design System/Molecules/ImageUpload',
    component: ImageUpload,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: { type: 'text' }
        },
        sectionId: {
            control: { type: 'number' }
        },
        disabled: {
            control: { type: 'boolean' }
        }
    }
} satisfies Meta<ImageUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        sectionId: 1,
        value: null
    }
};

export const WithImage: Story = {
    args: {
        sectionId: 1,
        value: 'https://picsum.photos/400/300'
    }
};

export const Disabled: Story = {
    args: {
        sectionId: 1,
        value: null,
        disabled: true
    }
};

export const DisabledWithImage: Story = {
    args: {
        sectionId: 1,
        value: 'https://picsum.photos/400/300',
        disabled: true
    }
};

export const DifferentSectionIds: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'space-y-8'
        },
        children: [
            {
                Component: 'div',
                props: { class: 'space-y-2' },
                children: [
                    {
                        Component: 'h3',
                        props: { class: 'text-lg font-semibold text-white' },
                        slot: 'Section 1'
                    },
                    {
                        Component: ImageUpload,
                        props: { sectionId: 1, value: null }
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
                        slot: 'Section 2'
                    },
                    {
                        Component: ImageUpload,
                        props: { sectionId: 2, value: 'https://picsum.photos/400/300' }
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
                        slot: 'Section 3 (Disabled)'
                    },
                    {
                        Component: ImageUpload,
                        props: { sectionId: 3, value: null, disabled: true }
                    }
                ]
            }
        ]
    })
};

export const States: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'grid grid-cols-1 md:grid-cols-2 gap-6'
        },
        children: [
            {
                Component: 'div',
                props: { class: 'space-y-2' },
                children: [
                    {
                        Component: 'h3',
                        props: { class: 'text-lg font-semibold text-white' },
                        slot: 'Empty State'
                    },
                    {
                        Component: ImageUpload,
                        props: { sectionId: 1, value: null }
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
                        slot: 'With Image'
                    },
                    {
                        Component: ImageUpload,
                        props: { sectionId: 2, value: 'https://picsum.photos/400/300' }
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
                        slot: 'Disabled Empty'
                    },
                    {
                        Component: ImageUpload,
                        props: { sectionId: 3, value: null, disabled: true }
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
                        slot: 'Disabled With Image'
                    },
                    {
                        Component: ImageUpload,
                        props: { sectionId: 4, value: 'https://picsum.photos/400/300', disabled: true }
                    }
                ]
            }
        ]
    })
};

export const WithDifferentImages: Story = {
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
                        slot: 'Square Image'
                    },
                    {
                        Component: ImageUpload,
                        props: { sectionId: 1, value: 'https://picsum.photos/300/300' }
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
                        slot: 'Wide Image'
                    },
                    {
                        Component: ImageUpload,
                        props: { sectionId: 2, value: 'https://picsum.photos/600/300' }
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
                        slot: 'Tall Image'
                    },
                    {
                        Component: ImageUpload,
                        props: { sectionId: 3, value: 'https://picsum.photos/300/600' }
                    }
                ]
            }
        ]
    })
};
