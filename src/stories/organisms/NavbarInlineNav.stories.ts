import type { Meta, StoryObj } from '@storybook/sveltekit';
import Navbar from '../../components/organisms/Navbar.svelte';
import { Star } from '@lucide/svelte';

const meta = {
    title: 'Design System/Organisms/Navbar/Inline nav',
    component: Navbar,
    parameters: {
        layout: 'padded'
    },
    tags: ['autodocs'],
    argTypes: {
        navVariant: {
            control: 'select',
            options: ['header', 'sidebar'],
            description: 'Layout for built-in link list'
        }
    }
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' }
];

const sampleItemsWithIcons = [
    { label: 'Home', href: '/', icon: Star },
    { label: 'About', href: '/about', icon: Star },
    { label: 'Services', href: '/services', icon: Star }
];

export const EmbeddedHeader: Story = {
    args: {
        embedded: true,
        ariaLabel: 'Primary',
        navVariant: 'header',
        items: sampleItems,
        currentPath: '/'
    }
};

export const EmbeddedWithIcons: Story = {
    args: {
        embedded: true,
        ariaLabel: 'Primary',
        navVariant: 'header',
        items: sampleItemsWithIcons,
        currentPath: '/'
    }
};

export const EmbeddedSidebar: Story = {
    args: {
        embedded: true,
        ariaLabel: 'Section',
        navVariant: 'sidebar',
        items: sampleItems,
        currentPath: '/about'
    }
};

export const EmbeddedCurrentPath: Story = {
    args: {
        embedded: true,
        ariaLabel: 'Primary',
        navVariant: 'header',
        items: sampleItems,
        currentPath: '/services'
    }
};

export const EmbeddedEmpty: Story = {
    args: {
        embedded: true,
        ariaLabel: 'Primary',
        navVariant: 'header',
        items: [],
        currentPath: ''
    }
};
