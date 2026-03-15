import type { Meta, StoryObj } from '@storybook/sveltekit';
import ListItem from '../../components/atoms/ListItem.svelte';
import { CreditCard } from '@lucide/svelte';

const baseItem = {
    id: 'billing',
    label: 'Billing',
    description: 'Update payment methods and invoices',
    href: '/billing',
    icon: CreditCard
};

const meta = {
    title: 'Design System/Atoms/ListItem',
    component: ListItem,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Standalone list item row with hover state and optional right-arrow icon.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandaloneItem: Story = {
    args: {
        item: baseItem
    }
};

export const SelectedStandaloneItem: Story = {
    args: {
        item: baseItem,
        selected: true
    }
};

export const StandaloneItemWithoutArrow: Story = {
    args: {
        item: baseItem,
        showArrow: false
    }
};
