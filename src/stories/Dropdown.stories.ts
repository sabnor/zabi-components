import type { Meta, StoryObj } from '@storybook/sveltekit';
import Dropdown from '../components/molecules/Dropdown.svelte';
import Button from '../components/atoms/Button.svelte';
import DropdownWithContent from './DropdownWithContent.svelte';

const meta = {
    title: 'Design System/Molecules/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        placement: {
            control: 'select',
            options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
            description: 'Placement of the dropdown menu'
        },
        isOpen: {
            control: 'boolean',
            description: 'Whether the dropdown is open'
        }
    }
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        isOpen: true,
        placement: 'bottom-start'
    },
    render: (args) => ({
        Component: DropdownWithContent,
        props: args
    })
};

export const BottomStart: Story = {
    args: {
        isOpen: true,
        placement: 'bottom-start'
    },
    render: (args) => ({
        Component: DropdownWithContent,
        props: args
    })
};

export const BottomEnd: Story = {
    args: {
        isOpen: true,
        placement: 'bottom-end'
    },
    render: (args) => ({
        Component: DropdownWithContent,
        props: args
    })
};

export const TopStart: Story = {
    args: {
        isOpen: true,
        placement: 'top-start'
    },
    render: (args) => ({
        Component: DropdownWithContent,
        props: args
    })
};

export const TopEnd: Story = {
    args: {
        isOpen: true,
        placement: 'top-end'
    },
    render: (args) => ({
        Component: DropdownWithContent,
        props: args
    })
};

export const Closed: Story = {
    args: {
        isOpen: false,
        placement: 'bottom-start'
    },
    render: (args) => ({
        Component: DropdownWithContent,
        props: args
    })
};