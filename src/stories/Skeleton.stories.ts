import type { Meta, StoryObj } from '@storybook/svelte';
import Skeleton from '../../components/atoms/Skeleton.svelte';

const meta = {
    title: 'Design System/Atoms/Skeleton',
    component: Skeleton,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        width: {
            control: { type: 'text' }
        },
        height: {
            control: { type: 'text' }
        },
        borderRadius: {
            control: { type: 'text' }
        },
        className: {
            control: { type: 'text' }
        }
    }
} satisfies Meta<Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};

export const CustomSize: Story = {
    args: {
        width: '200px',
        height: '50px'
    }
};

export const Circle: Story = {
    args: {
        width: '50px',
        height: '50px',
        borderRadius: '50%'
    }
};

export const Square: Story = {
    args: {
        width: '100px',
        height: '100px',
        borderRadius: '0'
    }
};

export const Rounded: Story = {
    args: {
        width: '150px',
        height: '30px',
        borderRadius: '15px'
    }
};

export const Text: Story = {
    args: {
        width: '100%',
        height: '1rem',
        borderRadius: '0.25rem'
    }
};

export const Button: Story = {
    args: {
        width: '120px',
        height: '40px',
        borderRadius: '0.5rem'
    }
};

export const Card: Story = {
    args: {
        width: '300px',
        height: '200px',
        borderRadius: '0.75rem'
    }
};

export const Avatar: Story = {
    args: {
        width: '40px',
        height: '40px',
        borderRadius: '50%'
    }
};

export const MultipleText: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'space-y-2'
        },
        children: [
            {
                Component: Skeleton,
                props: { width: '100%', height: '1rem' }
            },
            {
                Component: Skeleton,
                props: { width: '80%', height: '1rem' }
            },
            {
                Component: Skeleton,
                props: { width: '60%', height: '1rem' }
            }
        ]
    })
};

export const CardSkeleton: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'p-4 border border-stone-700 rounded-lg space-y-4'
        },
        children: [
            {
                Component: Skeleton,
                props: { width: '100%', height: '200px', borderRadius: '0.5rem' }
            },
            {
                Component: 'div',
                props: { class: 'space-y-2' },
                children: [
                    {
                        Component: Skeleton,
                        props: { width: '100%', height: '1.5rem' }
                    },
                    {
                        Component: Skeleton,
                        props: { width: '80%', height: '1rem' }
                    },
                    {
                        Component: Skeleton,
                        props: { width: '60%', height: '1rem' }
                    }
                ]
            }
        ]
    })
};

export const ListSkeleton: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'space-y-4'
        },
        children: [
            {
                Component: 'div',
                props: { class: 'flex items-center space-x-3' },
                children: [
                    {
                        Component: Skeleton,
                        props: { width: '40px', height: '40px', borderRadius: '50%' }
                    },
                    {
                        Component: 'div',
                        props: { class: 'flex-1 space-y-2' },
                        children: [
                            {
                                Component: Skeleton,
                                props: { width: '100%', height: '1rem' }
                            },
                            {
                                Component: Skeleton,
                                props: { width: '60%', height: '0.75rem' }
                            }
                        ]
                    }
                ]
            },
            {
                Component: 'div',
                props: { class: 'flex items-center space-x-3' },
                children: [
                    {
                        Component: Skeleton,
                        props: { width: '40px', height: '40px', borderRadius: '50%' }
                    },
                    {
                        Component: 'div',
                        props: { class: 'flex-1 space-y-2' },
                        children: [
                            {
                                Component: Skeleton,
                                props: { width: '100%', height: '1rem' }
                            },
                            {
                                Component: Skeleton,
                                props: { width: '60%', height: '0.75rem' }
                            }
                        ]
                    }
                ]
            },
            {
                Component: 'div',
                props: { class: 'flex items-center space-x-3' },
                children: [
                    {
                        Component: Skeleton,
                        props: { width: '40px', height: '40px', borderRadius: '50%' }
                    },
                    {
                        Component: 'div',
                        props: { class: 'flex-1 space-y-2' },
                        children: [
                            {
                                Component: Skeleton,
                                props: { width: '100%', height: '1rem' }
                            },
                            {
                                Component: Skeleton,
                                props: { width: '60%', height: '0.75rem' }
                            }
                        ]
                    }
                ]
            }
        ]
    })
};
