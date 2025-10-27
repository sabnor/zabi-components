import type { Meta, StoryObj } from '@storybook/svelte';
import Navigation from '../components/organisms/Navigation.svelte';

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

export const Default: Story = {
    args: {
        variant: 'header',
        items: sampleItems,
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

