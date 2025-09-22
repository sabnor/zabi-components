import type { Meta, StoryObj } from '@storybook/svelte';
import PerformanceMonitor from '../../components/atoms/PerformanceMonitor.svelte';

const meta = {
    title: 'Design System/Atoms/PerformanceMonitor',
    component: PerformanceMonitor,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs']
} satisfies Meta<PerformanceMonitor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};

export const Visible: Story = {
    args: {},
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
                        slot: 'Performance Monitor Demo'
                    },
                    {
                        Component: 'p',
                        props: { class: 'text-gray-300' },
                        slot: 'The performance monitor will appear in the bottom-left corner in development mode. It shows Core Web Vitals and performance metrics.'
                    }
                ]
            },
            {
                Component: PerformanceMonitor,
                props: args
            }
        ]
    })
};

export const WithContent: Story = {
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
                        slot: 'Performance Monitor with Content'
                    },
                    {
                        Component: 'p',
                        props: { class: 'text-gray-300 mb-6' },
                        slot: 'This page has content to demonstrate the performance monitoring capabilities.'
                    }
                ]
            },
            {
                Component: 'div',
                props: { class: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8' },
                children: [
                    {
                        Component: 'div',
                        props: { class: 'bg-gray-800 p-6 rounded-lg' },
                        children: [
                            {
                                Component: 'h2',
                                props: { class: 'text-xl font-semibold mb-3 text-white' },
                                slot: 'Card 1'
                            },
                            {
                                Component: 'p',
                                props: { class: 'text-gray-300' },
                                slot: 'This is a sample card with some content to demonstrate the performance monitor.'
                            }
                        ]
                    },
                    {
                        Component: 'div',
                        props: { class: 'bg-gray-800 p-6 rounded-lg' },
                        children: [
                            {
                                Component: 'h2',
                                props: { class: 'text-xl font-semibold mb-3 text-white' },
                                slot: 'Card 2'
                            },
                            {
                                Component: 'p',
                                props: { class: 'text-gray-300' },
                                slot: 'Another card with content to test performance metrics.'
                            }
                        ]
                    },
                    {
                        Component: 'div',
                        props: { class: 'bg-gray-800 p-6 rounded-lg' },
                        children: [
                            {
                                Component: 'h2',
                                props: { class: 'text-xl font-semibold mb-3 text-white' },
                                slot: 'Card 3'
                            },
                            {
                                Component: 'p',
                                props: { class: 'text-gray-300' },
                                slot: 'A third card to add more content to the page.'
                            }
                        ]
                    }
                ]
            },
            {
                Component: 'div',
                props: { class: 'text-white' },
                children: [
                    {
                        Component: 'h2',
                        props: { class: 'text-2xl font-semibold mb-4' },
                        slot: 'Performance Metrics Explained'
                    },
                    {
                        Component: 'div',
                        props: { class: 'space-y-3' },
                        children: [
                            {
                                Component: 'div',
                                props: { class: 'bg-gray-800 p-4 rounded-lg' },
                                children: [
                                    {
                                        Component: 'h3',
                                        props: { class: 'font-semibold text-green-400 mb-2' },
                                        slot: 'FCP (First Contentful Paint)'
                                    },
                                    {
                                        Component: 'p',
                                        props: { class: 'text-gray-300 text-sm' },
                                        slot: 'Measures when the first text or image is painted. Good: < 1.8s'
                                    }
                                ]
                            },
                            {
                                Component: 'div',
                                props: { class: 'bg-gray-800 p-4 rounded-lg' },
                                children: [
                                    {
                                        Component: 'h3',
                                        props: { class: 'font-semibold text-blue-400 mb-2' },
                                        slot: 'LCP (Largest Contentful Paint)'
                                    },
                                    {
                                        Component: 'p',
                                        props: { class: 'text-gray-300 text-sm' },
                                        slot: 'Measures when the largest content element is painted. Good: < 2.5s'
                                    }
                                ]
                            },
                            {
                                Component: 'div',
                                props: { class: 'bg-gray-800 p-4 rounded-lg' },
                                children: [
                                    {
                                        Component: 'h3',
                                        props: { class: 'font-semibold text-yellow-400 mb-2' },
                                        slot: 'CLS (Cumulative Layout Shift)'
                                    },
                                    {
                                        Component: 'p',
                                        props: { class: 'text-gray-300 text-sm' },
                                        slot: 'Measures visual stability. Good: < 0.1'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                Component: PerformanceMonitor,
                props: args
            }
        ]
    })
};
