import type { Meta, StoryObj } from '@storybook/sveltekit';
import SidebarPanel from '../../components/organisms/SidebarPanel.svelte';

const panelItems = [
    {
        id: 'proj-zabi-web',
        label: 'Zabi Web App',
        description: 'Production workspace',
        badgeText: 'Active'
    },
    {
        id: 'proj-design-system',
        label: 'Design System',
        description: 'Component library',
        badgeText: 'New'
    },
    {
        id: 'proj-marketing',
        label: 'Marketing Site',
        description: 'Landing and docs'
    },
    {
        id: 'proj-analytics',
        label: 'Analytics Dashboard',
        description: 'Internal reports'
    }
];

const meta = {
    title: 'Design System/Organisms/SidebarPanel',
    component: SidebarPanel,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Adjacent picker panel for sidebar flows, with searchable items, selected state, and close action. The elevated shell aligns with `SidebarNavigation` layout="card".'
            }
        }
    },
    tags: ['autodocs'],
    args: {
        title: 'Project picker',
        subtitle: 'Search and switch projects',
        items: panelItems,
        selectedItemId: 'proj-zabi-web'
    }
} satisfies Meta<typeof SidebarPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Searchable: Story = {
    args: {
        searchValue: 'design'
    }
};

export const EmptyState: Story = {
    args: {
        items: [],
        emptyStateTitle: 'No projects yet',
        emptyStateDescription: 'Create a project to start organizing your work.'
    }
};

export const PlainShell: Story = {
    args: {
        variant: 'plain'
    }
};
