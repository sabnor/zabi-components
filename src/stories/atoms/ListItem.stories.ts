import type { Meta, StoryObj } from '@storybook/sveltekit';
import ListItem from '../../components/atoms/ListItem.svelte';
import ListItemCompositionDemo from './ListItemCompositionDemo.svelte';

const baseItem = {
    id: 'billing',
    label: 'Billing',
    description: 'Update payment methods and invoices',
    href: '/billing'
};

const meta = {
    title: 'Design System/Atoms/ListItem',
    component: ListItem,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Standalone list row. Set `icon`, `avatar`, and `avatarAlt` on `item` for leading visuals without snippets. Use the `trailing` snippet for badges or meta on the right.'
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

/** Icon, avatar, and text-only rows via `item` fields. */
export const WithIconAvatarAndPlain = {
    render: () => ({
        Component: ListItemCompositionDemo
    })
} as StoryObj<Meta>;
