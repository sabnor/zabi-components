import type { Meta, StoryObj } from '@storybook/svelte';
import Dropdown from '../components/molecules/Dropdown.svelte';

const meta = {
    title: 'Design System/Molecules/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        isOpen: true
    },
    render: (args) => ({
        Component: Dropdown,
        props: args,
        children: ['Default Dropdown Content']
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
        children: ['Bottom Start Placement']
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
        children: ['Bottom End Placement']
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
        children: ['Top Start Placement']
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
        children: ['Top End Placement']
    })
};

export const WithOffset: Story = {
    args: {
        isOpen: true,
        offset: 10
    },
    render: (args) => ({
        Component: Dropdown,
        props: args,
        children: ['Dropdown with Offset']
    })
};

export const WithMaxHeight: Story = {
    args: {
        isOpen: true,
        maxHeight: '200px'
    },
    render: (args) => ({
        Component: Dropdown,
        props: args,
        children: ['Dropdown with Max Height']
    })
};

export const WithWidth: Story = {
    args: {
        isOpen: true,
        width: '300px'
    },
    render: (args) => ({
        Component: Dropdown,
        props: args,
        children: ['Dropdown with Custom Width']
    })
};

export const WithZIndex: Story = {
    args: {
        isOpen: true,
        zIndex: 1000
    },
    render: (args) => ({
        Component: Dropdown,
        props: args,
        children: ['Dropdown with Custom Z-Index']
    })
};

export const Closed: Story = {
    args: {
        isOpen: false
    },
    render: (args) => ({
        Component: Dropdown,
        props: args,
        children: ['Closed Dropdown']
    })
};