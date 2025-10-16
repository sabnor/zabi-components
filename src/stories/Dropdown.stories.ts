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

export const WithTopPlacement: Story = {
    args: {
        isOpen: true,
        placement: 'top-start'
    },
    render: (args) => ({
        Component: Dropdown,
        props: args,
        children: ['Dropdown with Top Placement']
    })
};

export const WithBottomEndPlacement: Story = {
    args: {
        isOpen: true,
        placement: 'bottom-end'
    },
    render: (args) => ({
        Component: Dropdown,
        props: args,
        children: ['Dropdown with Bottom End Placement']
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