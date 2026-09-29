import type { Meta, StoryObj } from '@storybook/sveltekit';
import Tabs from '../../components/molecules/Tabs.svelte';

const meta = {
    title: 'Design System/Molecules/Tabs',
    component: Tabs,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Tabs component with full keyboard navigation. Use Arrow Left/Right to navigate between tabs, Home/End to jump to first/last tab, and Enter/Space to activate a tab.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'activity', label: 'Activity' },
    { id: 'settings', label: 'Settings' }
];

export const Default: Story = {
    args: {
        tabs: sampleTabs,
        activeTab: 'overview'
    },
    parameters: {
        docs: {
            description: {
                story: 'Arrow keys move between tabs, and Home and End jump to the first and last.'
            }
        }
    }
};

export const Pills: Story = {
    args: {
        tabs: sampleTabs,
        activeTab: 'overview',
        variant: 'pills'
    },
    parameters: {
        docs: {
            description: {
                story: 'Pills suit a filter or a view switch inside a page. Use the default for the main sections of a page.'
            }
        }
    }
};

export const WithDisabled: Story = {
    args: {
        tabs: [
            { id: 'overview', label: 'Overview' },
            { id: 'billing', label: 'Billing', disabled: true },
            { id: 'settings', label: 'Settings' }
        ],
        activeTab: 'overview'
    },
    parameters: {
        docs: {
            description: {
                story: 'A disabled tab is skipped by the arrow keys.'
            }
        }
    }
};

export const SecondTabActive: Story = {
    args: {
        tabs: sampleTabs,
        activeTab: 'activity'
    },
    parameters: {
        docs: {
            description: {
                story: 'activeTab sets the starting tab and supports bind:activeTab.'
            }
        }
    }
};

export const ManyTabs: Story = {
    args: {
        tabs: [
            { id: 'overview', label: 'Overview' },
            { id: 'activity', label: 'Activity' },
            { id: 'members', label: 'Members' },
            { id: 'integrations', label: 'Integrations' },
            { id: 'billing', label: 'Billing' },
            { id: 'security', label: 'Security' },
            { id: 'settings', label: 'Settings' }
        ],
        activeTab: 'overview'
    },
    parameters: {
        docs: {
            description: {
                story: 'Narrow the preview to see how a long row of tabs behaves on a small screen.'
            }
        }
    }
};
