import type { Meta, StoryObj } from '@storybook/sveltekit';
import { CreditCard, Shield, User } from '@lucide/svelte';
import List from '../../components/atoms/List.svelte';

const itemsWithLeadingVisuals = [
    {
        id: 'profile',
        label: 'Profile',
        description: 'Manage your account preferences',
        href: '/profile',
        icon: User
    },
    {
        id: 'billing',
        label: 'Billing',
        description: 'Update payment methods and invoices',
        href: '/billing',
        icon: CreditCard
    },
    {
        id: 'team',
        label: 'Team members',
        description: 'Invite teammates and assign roles',
        icon: Shield
    }
];

const avatarItems = [
    {
        id: 'alex',
        label: 'Alex Rivera',
        description: 'Product · Berlin',
        href: '/people/alex',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        avatarAlt: ''
    },
    {
        id: 'sam',
        label: 'Sam Lee',
        description: 'Engineering · Remote',
        href: '/people/sam',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
        avatarAlt: ''
    }
];

const baseItems = [
    {
        id: 'profile',
        label: 'Profile',
        description: 'Manage your account preferences',
        href: '/profile'
    },
    {
        id: 'billing',
        label: 'Billing',
        description: 'Update payment methods and invoices',
        href: '/billing'
    },
    {
        id: 'team',
        label: 'Team members',
        description: 'Invite teammates and assign roles'
    }
];

const meta = {
    title: 'Design System/Atoms/List',
    component: List,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Pass `items` as `ListItemData[]`. Optional `icon` or `avatar`/`avatarAlt` per item render an aligned leading visual. Use `ListItem` with a `trailing` snippet for badges or meta when needed.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListExample: Story = {
    args: {
        items: baseItems,
        ariaLabel: 'Account navigation'
    }
};

export const ListExampleWithSelectedItem: Story = {
    args: {
        items: baseItems,
        selectedId: 'billing',
        ariaLabel: 'Account navigation'
    }
};

export const ListExampleWithoutArrows: Story = {
    args: {
        items: baseItems,
        showArrow: false,
        ariaLabel: 'Account navigation'
    }
};

export const WithIconsPerItem: Story = {
    args: {
        items: itemsWithLeadingVisuals,
        selectedId: 'billing',
        ariaLabel: 'Account navigation with icons'
    }
};

export const WithAvatars: Story = {
    args: {
        items: avatarItems,
        ariaLabel: 'People directory'
    }
};
