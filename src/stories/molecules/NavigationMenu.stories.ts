import type { Meta, StoryObj } from '@storybook/sveltekit';
import NavigationMenu from '../../components/molecules/NavigationMenu.svelte';

const meta = {
    title: 'Design System/Molecules/NavigationMenu',
    component: NavigationMenu,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Compound navigation menu component with dropdowns, rich content, and keyboard navigation. See the components page for full examples.'
            }
        }
    },
    tags: ['autodocs']
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        viewport: true
    }
};

export const RegressionOpenClose: Story = {
    args: {
        items: [
            {
                value: 'products',
                label: 'Products',
                content: [{ href: '#web', label: 'Web' }, { href: '#mobile', label: 'Mobile' }]
            }
        ]
    },
    parameters: {
        docs: {
            description: {
                story: 'Manual regression check: open/close dropdown content via trigger click.'
            }
        }
    }
};

export const RegressionEscapeClose: Story = {
    args: {
        items: [
            {
                value: 'resources',
                label: 'Resources',
                content: [{ href: '#docs', label: 'Docs' }, { href: '#guides', label: 'Guides' }]
            }
        ]
    },
    parameters: {
        docs: {
            description: {
                story: 'Manual regression check: with content open, press Escape to close and verify focus returns to trigger.'
            }
        }
    }
};

export const RegressionOutsideClickClose: Story = {
    args: {
        items: [
            {
                value: 'account',
                label: 'Account',
                content: [{ href: '#profile', label: 'Profile' }, { href: '#settings', label: 'Settings' }]
            }
        ]
    },
    parameters: {
        docs: {
            description: {
                story: 'Manual regression check: open a panel then click outside target button to close the panel.'
            }
        }
    }
};
