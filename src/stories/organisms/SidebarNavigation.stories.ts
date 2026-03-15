import type { Meta, StoryObj } from '@storybook/sveltekit';
import {
    House,
    BarChart3,
    Bell,
    PieChart,
    Package,
    Settings
} from '@lucide/svelte';
import SidebarNavigation from '../../components/organisms/SidebarNavigation.svelte';

const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: House },
    { id: 'revenue', label: 'Revenue', href: '/revenue', icon: BarChart3 },
    {
        id: 'notifications',
        label: 'Notifications',
        href: '/notifications',
        icon: Bell,
        badgeCount: 2
    },
    { id: 'analytics', label: 'Analytics', href: '/analytics', icon: PieChart },
    { id: 'inventory', label: 'Inventory', href: '/inventory', icon: Package },
    {
        id: 'settings',
        label: 'Settings',
        href: '/settings',
        icon: Settings,
        group: 'secondary' as const
    }
];

const meta = {
    title: 'Design System/Organisms/SidebarNavigation',
    component: SidebarNavigation,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Sidebar navigation with input search mode and button-trigger mode for opening an adjacent picker panel.'
            }
        }
    },
    tags: ['autodocs'],
    args: {
        items: sidebarItems,
        currentPath: '/revenue',
        showProfile: true,
        showSearch: true,
        showThemeToggle: true,
        showLogout: true
    },
    argTypes: {
        mode: {
            control: 'radio',
            options: ['expanded', 'collapsed']
        }
    }
} satisfies Meta<typeof SidebarNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchableInput: Story = {
    args: {
        mode: 'expanded',
        searchMode: 'input',
        searchValue: 're'
    }
};

export const TriggerButtonMode: Story = {
    args: {
        mode: 'expanded',
        searchMode: 'button',
        searchValue: 'Search projects'
    }
};

export const Collapsed: Story = {
    args: {
        mode: 'collapsed',
        searchMode: 'button',
        showThemeToggle: false
    }
};

export const EmptyState: Story = {
    args: {
        mode: 'expanded',
        items: [],
        emptyStateTitle: 'Create your first section',
        emptyStateDescription:
            'Add your first sidebar item to help users move through your workspace.',
        emptyStateActionLabel: 'Create item'
    }
};
