import type { Meta, StoryObj } from '@storybook/sveltekit';
import OptimizedImage from '../components/atoms/OptimizedImage.svelte';

const meta = {
    title: 'Design System/Atoms/OptimizedImage',
    component: OptimizedImage,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof OptimizedImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        src: 'https://via.placeholder.com/300x200',
        alt: 'Placeholder image',
        width: '300px',
        height: '200px'
    }
};

export const Square: Story = {
    args: {
        src: 'https://via.placeholder.com/200x200',
        alt: 'Square image',
        width: '200px',
        height: '200px'
    }
};

export const Wide: Story = {
    args: {
        src: 'https://via.placeholder.com/400x200',
        alt: 'Wide image',
        width: '400px',
        height: '200px'
    }
};

export const WithClassName: Story = {
    args: {
        src: 'https://via.placeholder.com/300x200',
        alt: 'Image with custom class',
        width: '300px',
        height: '200px',
        className: 'rounded-lg shadow-lg'
    }
};