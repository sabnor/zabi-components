import type { Meta, StoryObj } from '@storybook/sveltekit';
import Skeleton from '../components/atoms/Skeleton.svelte';

const meta = {
    title: 'Design System/Atoms/Skeleton',
    component: Skeleton,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        width: '200px',
        height: '1rem'
    }
};

export const Text: Story = {
    args: {
        width: '100%',
        height: '1rem'
    }
};

export const Avatar: Story = {
    args: {
        width: '40px',
        height: '40px',
        className: 'rounded-full'
    }
};

export const Card: Story = {
    args: {
        width: '300px',
        height: '200px',
        className: 'rounded-lg'
    }
};

export const Circle: Story = {
    args: {
        width: '40px',
        height: '40px',
        className: 'rounded-full'
    }
};

export const MultipleText: Story = {
    render: () => ({
        Component: Skeleton,
        props: { width: '100%', height: '1rem' }
    })
};

export const CardSkeleton: Story = {
    render: () => ({
        Component: Skeleton,
        props: { width: '100%', height: '1rem' }
    })
};

export const LoadingStates: Story = {
    render: () => ({
        Component: Skeleton,
        props: { width: '100%', height: '1rem' }
    })
};