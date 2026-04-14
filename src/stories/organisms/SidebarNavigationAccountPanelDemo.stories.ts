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
import SidebarNavigationAccountPanelDemo from './SidebarNavigationAccountPanelDemo.svelte';

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
    title: 'Design System/Organisms/SidebarNavigation/Account panel',
    component: SidebarNavigationAccountPanelDemo,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Consumer wiring example: `SidebarNavigation` profile launcher toggles a side panel (same pattern as the project picker).'
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
        layout: 'card',
        mode: 'expanded',
        className: 'm-4 min-h-[min(520px,calc(100vh-2rem))]',
        brandName: 'Daybridge',
        logoSrc: '/favicon.png',
        logoAlt: 'Product',
        profileName: 'Jane Doe',
        profileEmail: 'jane@example.com'
    }
} satisfies Meta<typeof SidebarNavigationAccountPanelDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SideBySide: Story = {};

