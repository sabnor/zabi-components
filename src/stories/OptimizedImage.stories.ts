import type { Meta, StoryObj } from '@storybook/svelte';
import OptimizedImage from '../components/atoms/OptimizedImage.svelte';

const meta = {
    title: 'Design System/Atoms/OptimizedImage',
    component: OptimizedImage,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        src: {
            control: { type: 'text' }
        },
        alt: {
            control: { type: 'text' }
        },
        width: {
            control: { type: 'text' }
        },
        height: {
            control: { type: 'text' }
        },
        loading: {
            control: { type: 'select' },
            options: ['lazy', 'eager']
        },
        className: {
            control: { type: 'text' }
        },
        placeholder: {
            control: { type: 'text' }
        }
    }
} satisfies Meta<OptimizedImage>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImageUrl = 'https://picsum.photos/400/300';

export const Default: Story = {
    args: {
        src: sampleImageUrl,
        alt: 'Sample image',
        width: '300px',
        height: '200px'
    }
};

export const Square: Story = {
    args: {
        src: sampleImageUrl,
        alt: 'Square image',
        width: '200px',
        height: '200px'
    }
};

export const Wide: Story = {
    args: {
        src: sampleImageUrl,
        alt: 'Wide image',
        width: '400px',
        height: '200px'
    }
};

export const Tall: Story = {
    args: {
        src: sampleImageUrl,
        alt: 'Tall image',
        width: '200px',
        height: '400px'
    }
};

export const EagerLoading: Story = {
    args: {
        src: sampleImageUrl,
        alt: 'Eager loaded image',
        width: '300px',
        height: '200px',
        loading: 'eager'
    }
};

export const LazyLoading: Story = {
    args: {
        src: sampleImageUrl,
        alt: 'Lazy loaded image',
        width: '300px',
        height: '200px',
        loading: 'lazy'
    }
};

export const WithCustomClass: Story = {
    args: {
        src: sampleImageUrl,
        alt: 'Image with custom class',
        width: '300px',
        height: '200px',
        className: 'rounded-lg shadow-lg'
    }
};

export const Responsive: Story = {
    args: {
        src: sampleImageUrl,
        alt: 'Responsive image',
        width: '100%',
        height: 'auto',
        className: 'max-w-md'
    }
};

export const ErrorState: Story = {
    args: {
        src: 'https://invalid-url.com/image.jpg',
        alt: 'Image that will fail to load',
        width: '300px',
        height: '200px'
    }
};

export const DifferentAspectRatios: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'grid grid-cols-2 gap-4'
        },
        children: [
            {
                Component: OptimizedImage,
                props: { src: sampleImageUrl, alt: 'Square', width: '150px', height: '150px' }
            },
            {
                Component: OptimizedImage,
                props: { src: sampleImageUrl, alt: 'Wide', width: '200px', height: '100px' }
            },
            {
                Component: OptimizedImage,
                props: { src: sampleImageUrl, alt: 'Tall', width: '100px', height: '200px' }
            },
            {
                Component: OptimizedImage,
                props: { src: sampleImageUrl, alt: 'Standard', width: '150px', height: '150px' }
            }
        ]
    })
};

export const LoadingStates: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'space-y-4'
        },
        children: [
            {
                Component: 'h3',
                props: { class: 'text-lg font-semibold text-white' },
                slot: 'Eager Loading (loads immediately)'
            },
            {
                Component: OptimizedImage,
                props: { src: sampleImageUrl, alt: 'Eager', width: '200px', height: '150px', loading: 'eager' }
            },
            {
                Component: 'h3',
                props: { class: 'text-lg font-semibold text-white mt-4' },
                slot: 'Lazy Loading (loads when in view)'
            },
            {
                Component: OptimizedImage,
                props: { src: sampleImageUrl, alt: 'Lazy', width: '200px', height: '150px', loading: 'lazy' }
            }
        ]
    })
};

export const Gallery: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'grid grid-cols-3 gap-4'
        },
        children: [
            {
                Component: OptimizedImage,
                props: { src: 'https://picsum.photos/300/200?random=1', alt: 'Image 1', width: '100%', height: '150px', className: 'rounded-lg' }
            },
            {
                Component: OptimizedImage,
                props: { src: 'https://picsum.photos/300/200?random=2', alt: 'Image 2', width: '100%', height: '150px', className: 'rounded-lg' }
            },
            {
                Component: OptimizedImage,
                props: { src: 'https://picsum.photos/300/200?random=3', alt: 'Image 3', width: '100%', height: '150px', className: 'rounded-lg' }
            },
            {
                Component: OptimizedImage,
                props: { src: 'https://picsum.photos/300/200?random=4', alt: 'Image 4', width: '100%', height: '150px', className: 'rounded-lg' }
            },
            {
                Component: OptimizedImage,
                props: { src: 'https://picsum.photos/300/200?random=5', alt: 'Image 5', width: '100%', height: '150px', className: 'rounded-lg' }
            },
            {
                Component: OptimizedImage,
                props: { src: 'https://picsum.photos/300/200?random=6', alt: 'Image 6', width: '100%', height: '150px', className: 'rounded-lg' }
            }
        ]
    })
};
