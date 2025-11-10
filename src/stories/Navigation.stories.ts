import type { Meta, StoryObj } from '@storybook/sveltekit';
import Navigation from '../components/organisms/Navigation.svelte';
import { Star } from '@lucide/svelte';

const meta = {
    title: 'Design System/Organisms/Navigation',
    component: Navigation,
    parameters: {
        layout: 'padded'
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['header', 'sidebar'],
            description: 'Navigation variant style'
        }
    }
} satisfies Meta<typeof Navigation>;

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

export const Default: Story = {
    args: {
        variant: 'header',
        items: sampleItems,
        currentPath: '/'
    }
};

export const WithIcons: Story = {
    args: {
        variant: 'header',
        items: sampleItemsWithIcons,
        currentPath: '/'
    }
};

export const Sidebar: Story = {
    args: {
        variant: 'sidebar',
        items: sampleItems,
        currentPath: '/about'
    }
};

export const WithCurrentPath: Story = {
    args: {
        variant: 'header',
        items: sampleItems,
        currentPath: '/services'
    }
};

export const Empty: Story = {
    args: {
        variant: 'header',
        items: [],
        currentPath: ''
    }
};

