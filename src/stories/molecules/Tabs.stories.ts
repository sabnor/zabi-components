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
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3' }
];

export const Default: Story = {
    args: {
        tabs: sampleTabs,
        activeTab: 'tab1'
    }
};

export const Pills: Story = {
    args: {
        tabs: sampleTabs,
        activeTab: 'tab1',
        variant: 'pills'
    }
};

export const WithDisabled: Story = {
    args: {
        tabs: [
            { id: 'tab1', label: 'Tab 1' },
            { id: 'tab2', label: 'Tab 2', disabled: true },
            { id: 'tab3', label: 'Tab 3' }
        ],
        activeTab: 'tab1'
    }
};