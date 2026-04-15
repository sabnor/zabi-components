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
                    'Sidebar navigation with Daybridge-inspired optional card layout, section labels, optional brand row, and collapsed/expanded modes. **Search:** `searchMode="input"` shows an inline field with a magnifying glass (`Search` icon). `searchMode="button"` (or collapsed / `onSearchClick`) uses an **outlined** trigger with the **Command** icon by default—pair with `SidebarPanel` or a command palette via `onSearchClick`. Override with `searchTriggerIcon` and `searchTriggerVariant`.'
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
        layout: 'rail',
        mode: 'expanded',
        searchMode: 'input',
        searchPlaceholder: 'Search navigation…',
        searchValue: ''
    },
    argTypes: {
        mode: {
            control: 'radio',
            options: ['expanded', 'collapsed']
        },
        layout: {
            control: 'radio',
            options: ['rail', 'card']
        },
        searchMode: {
            control: 'inline-radio',
            options: ['input', 'button'],
            description:
                'input: inline search field with Search icon. button: outlined Command trigger for opening a panel.'
        },
        searchPlaceholder: {
            control: 'text'
        },
        searchValue: {
            control: 'text'
        },
        searchTriggerVariant: {
            control: 'select',
            options: ['outline', 'secondary', 'ghost', 'primary', 'danger', 'link'],
            description: 'Panel/search trigger style (default: outline).'
        },
        searchTriggerIcon: {
            control: false,
            description:
                'Lucide icon component for the trigger (default: Command). Not shown in Controls; set in code. Input mode always uses Search beside the field.'
        },
        onSearchClick: {
            description:
                'Handler when the Command/outline trigger is pressed—open `SidebarPanel` or command UI. Ignored for UI when `searchMode` is `input` (inline field always shows).'
        }
    }
} satisfies Meta<typeof SidebarNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Primary story: inline search input (magnifying glass) and full nav—uses meta `searchMode: 'input'`. */
export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Default canvas: **search field** filters items as you type. Uses Controls for `searchValue` and `searchPlaceholder`.'
            }
        }
    }
};

export const SearchableInput: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Inline `type="search"` field with a magnifying glass—filter nav items as you type (`searchMode="input"`).'
            }
        }
    },
    args: {
        mode: 'expanded',
        searchMode: 'input',
        searchPlaceholder: 'Search navigation…',
        searchValue: 're'
    }
};

export const PanelSearchTrigger: Story = {
    name: 'Panel search trigger',
    parameters: {
        docs: {
            description: {
                story:
                    'Default **outline** button with **Command** icon; label shows `searchPlaceholder` or `searchValue`. Wire `onSearchClick` in your app to open `SidebarPanel` or a command palette.'
            }
        }
    },
    args: {
        mode: 'expanded',
        searchMode: 'button',
        searchPlaceholder: 'Search projects',
        searchValue: '',
        searchTriggerVariant: 'outline'
    }
};

export const Collapsed: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Icon-only **outline** trigger (Command) with the same width as collapsed nav icons.'
            }
        }
    },
    args: {
        mode: 'collapsed',
        searchMode: 'button',
        searchTriggerVariant: 'outline',
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
