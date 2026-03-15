import type { Meta, StoryObj } from '@storybook/sveltekit';
import List from '../../components/atoms/List.svelte';
import { CreditCard, Settings, User } from '@lucide/svelte';

const baseItems = [
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
        icon: Settings
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
                    'Accessible list rows with hover feedback and optional right-arrow icons.'
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
