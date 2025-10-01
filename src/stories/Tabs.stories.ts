import type { Meta, StoryObj } from '@storybook/svelte';
import Tabs from '../components/molecules/Tabs.svelte';

const meta: Meta<Tabs> = {
    title: 'Molecules/Tabs',
    component: Tabs,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'A flexible tabs component with keyboard navigation, multiple variants, and full accessibility support. Perfect for organizing content into logical sections.'
            }
        }
    },
    argTypes: {
        tabs: {
            control: { type: 'object' },
            description: 'Array of tab objects with id, label, disabled, icon, and badge properties'
        },
        activeTab: {
            control: { type: 'text' },
            description: 'Currently active tab ID'
        },
        variant: {
            control: { type: 'select' },
            options: ['default', 'pills', 'underline', 'cards'],
            description: 'Visual style variant'
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
            description: 'Size of the tabs'
        },
        orientation: {
            control: { type: 'select' },
            options: ['horizontal', 'vertical'],
            description: 'Layout orientation'
        },
        fullWidth: {
            control: { type: 'boolean' },
            description: 'Whether tabs should take full width'
        }
    }
};

export default meta;
type Story = StoryObj<Tabs>;

const sampleTabs = [
    { id: 'tab1', label: 'Overview', icon: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z' },
    { id: 'tab2', label: 'Details', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'tab3', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    { id: 'tab4', label: 'Disabled', disabled: true },
    { id: 'tab5', label: 'With Badge', badge: '3' }
];

export const Default: Story = {
    args: {
        tabs: sampleTabs,
        activeTab: 'tab1',
        variant: 'default',
        size: 'md',
        orientation: 'horizontal',
        fullWidth: false
    }
};

export const Pills: Story = {
    args: {
        tabs: sampleTabs,
        activeTab: 'tab1',
        variant: 'pills',
        size: 'md',
        orientation: 'horizontal',
        fullWidth: false
    }
};

export const Underline: Story = {
    args: {
        tabs: sampleTabs,
        activeTab: 'tab1',
        variant: 'underline',
        size: 'md',
        orientation: 'horizontal',
        fullWidth: false
    }
};

export const Cards: Story = {
    args: {
        tabs: sampleTabs,
        activeTab: 'tab1',
        variant: 'cards',
        size: 'md',
        orientation: 'horizontal',
        fullWidth: false
    }
};

export const Vertical: Story = {
    args: {
        tabs: sampleTabs,
        activeTab: 'tab1',
        variant: 'default',
        size: 'md',
        orientation: 'vertical',
        fullWidth: false
    }
};

export const FullWidth: Story = {
    args: {
        tabs: sampleTabs,
        activeTab: 'tab1',
        variant: 'pills',
        size: 'md',
        orientation: 'horizontal',
        fullWidth: true
    }
};

export const Small: Story = {
    args: {
        tabs: sampleTabs,
        activeTab: 'tab1',
        variant: 'default',
        size: 'sm',
        orientation: 'horizontal',
        fullWidth: false
    }
};

export const Large: Story = {
    args: {
        tabs: sampleTabs,
        activeTab: 'tab1',
        variant: 'default',
        size: 'lg',
        orientation: 'horizontal',
        fullWidth: false
    }
};

export const WithContent: Story = {
    args: {
        tabs: sampleTabs,
        activeTab: 'tab1',
        variant: 'default',
        size: 'md',
        orientation: 'horizontal',
        fullWidth: false
    },
    render: (args) => ({
        Component: Tabs,
        props: args,
        slots: {
            tab1: 'This is the overview content. It contains important information about the current state.',
            tab2: 'Here are the detailed information and specifications for this item.',
            tab3: 'Configure your settings and preferences here.',
            tab5: 'This tab has a badge and shows notification content.'
        }
    })
};
