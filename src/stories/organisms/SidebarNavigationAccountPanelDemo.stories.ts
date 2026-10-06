import type { Meta, StoryObj } from '@storybook/sveltekit';
import House from '@lucide/svelte/icons/house';
import BarChart3 from '@lucide/svelte/icons/chart-column';
import Bell from '@lucide/svelte/icons/bell';
import PieChart from '@lucide/svelte/icons/chart-pie';
import Package from '@lucide/svelte/icons/package';
import Settings from '@lucide/svelte/icons/settings';
import Calendar from '@lucide/svelte/icons/calendar';
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
                    'Consumer wiring example: `SidebarNavigation` profile launcher toggles a side panel (same pattern as the project picker). Search uses the same defaults as the main story: inline field shows the magnifying glass; button mode uses the outlined Command trigger.'
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
        profileEmail: 'jane@example.com',
        searchMode: 'input',
        searchPlaceholder: 'Search navigation…'
    },
    argTypes: {
        themeModes: {
            control: 'inline-radio',
            options: ['two', 'three'],
            description:
                'On `SidebarAccountPanel`. two: the theme row flips light and dark and the app switches the page. three: the row steps through system, light and dark and switches the page itself.'
        },
        swedish: {
            control: 'boolean',
            description: 'Story only: passes Swedish `strings` to the sidebar and to the panel'
        }
    }
} satisfies Meta<typeof SidebarNavigationAccountPanelDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SideBySide: Story = {};

export const ThreeThemeModes: Story = {
    args: {
        themeModes: 'three'
    },
    parameters: {
        docs: {
            description: {
                story:
                    'Open the panel from the profile row. With `themeModes="three"` the theme row of `SidebarAccountPanel` steps through system, light and dark, sets `data-theme` on the page itself as ThemeToggle does, and reports the mode through `onThemeModeChange`. The story passes `themeStorageKey={null}`, so the choice is not kept.'
            }
        }
    }
};

export const Swedish: Story = {
    args: {
        swedish: true,
        themeModes: 'three',
        brandName: 'Dagbron',
        profileName: 'Anna Lind',
        profileEmail: 'anna@example.com',
        searchPlaceholder: 'Sök i menyn…',
        items: [
            { id: 'dashboard', label: 'Översikt', href: '/dashboard', icon: House, section: 'Arbetsyta' },
            { id: 'revenue', label: 'Intäkter', href: '/revenue', icon: BarChart3, section: 'Arbetsyta' },
            { id: 'calendar', label: 'Kalender', href: '/calendar', icon: Calendar, section: 'Vyer' },
            {
                id: 'settings',
                label: 'Inställningar',
                href: '/settings',
                icon: Settings,
                group: 'secondary' as const
            }
        ]
    },
    parameters: {
        docs: {
            description: {
                story:
                    'The sidebar and its account panel in Swedish: `strings` on `SidebarNavigation` (the names of its lists, the footer, the brand header) and `strings` on `SidebarAccountPanel` (its heading, rows and the three theme modes), with `logoutLabel` on both.'
            }
        }
    }
};
