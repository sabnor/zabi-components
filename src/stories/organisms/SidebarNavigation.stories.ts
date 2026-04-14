import type { Meta, StoryObj } from '@storybook/sveltekit';
import {
    House,
    BarChart3,
    Bell,
    PieChart,
    Package,
    Settings,
    Calendar
} from '@lucide/svelte';
import SidebarNavigation from '../../components/organisms/SidebarNavigation.svelte';

const sidebarItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        href: '/dashboard',
        icon: House,
        section: 'Workspace'
    },
    { id: 'revenue', label: 'Revenue', href: '/revenue', icon: BarChart3, section: 'Workspace' },
    {
        id: 'notifications',
        label: 'Notifications',
        href: '/notifications',
        icon: Bell,
        badgeCount: 2,
        section: 'Workspace'
    },
    {
        id: 'calendar',
        label: 'Calendar',
        href: '/calendar',
        icon: Calendar,
        section: 'Views'
    },
    {
        id: 'analytics',
        label: 'Analytics',
        href: '/analytics',
        icon: PieChart,
        section: 'Views'
    },
    {
        id: 'inventory',
        label: 'Inventory',
        href: '/inventory',
        icon: Package,
        section: 'Views'
    },
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
                    'Sidebar navigation with Daybridge-inspired optional card layout, section labels, optional brand row, collapsed/expanded modes, and search that pairs with `SidebarPanel`.'
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
        showLogout: true,
        layout: 'rail'
    },
    argTypes: {
        mode: {
            control: 'radio',
            options: ['expanded', 'collapsed']
        },
        layout: {
            control: 'radio',
            options: ['rail', 'card']
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

export const DaybridgeCard: Story = {
    parameters: {
        layout: 'fullscreen'
    },
    args: {
        mode: 'expanded',
        layout: 'card',
        className: 'm-4 min-h-[min(520px,calc(100vh-2rem))]',
        searchMode: 'input',
        brandName: 'Daybridge',
        logoSrc: '/favicon.png',
        logoAlt: 'Product',
        currentPath: '/calendar'
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
