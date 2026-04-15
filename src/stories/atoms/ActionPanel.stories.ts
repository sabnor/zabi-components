import type { Meta, StoryObj } from '@storybook/sveltekit';
import ActionPanel from '../../components/atoms/ActionPanel.svelte';

const meta = {
    title: 'Design System/Atoms/ActionPanel',
    component: ActionPanel,
    tags: ['autodocs'],
} satisfies Meta<typeof ActionPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Billing',
        description: 'Manage invoices and payment methods.',
        badgeText: 'New',
        badgeVariant: 'neutral',
    },
};

export const AsLink: Story = {
    args: {
        title: 'Documentation',
        description: 'Read the full API reference.',
        href: 'https://example.com',
        badgeText: 'Docs',
    },
};
