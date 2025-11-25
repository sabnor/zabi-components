import type { Meta, StoryObj } from '@storybook/sveltekit';
import Sidebar from '../../components/molecules/Sidebar.svelte';

const meta = {
    title: 'Design System/Molecules/Sidebar',
    component: Sidebar,
    parameters: {
        layout: 'padded'
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: 'text',
            description: 'Sidebar title'
        },
        selectedItemId: {
            control: 'text',
            description: 'Currently selected item ID'
        }
    }
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSections = [
    {
        title: 'Categories',
        items: [
            {
                id: 'category-atoms',
                label: 'Atoms',
                description: 'Basic building blocks'
            },
            {
                id: 'category-molecules',
                label: 'Molecules',
                description: 'Composite components'
            },
            {
                id: 'category-organisms',
                label: 'Organisms',
                description: 'Complex components'
            }
        ]
    },
    {
        title: 'Components',
        items: [
            {
                id: 'button',
                label: 'Button'
            },
            {
                id: 'input',
                label: 'Input'
            },
            {
                id: 'card',
                label: 'Card'
            },
            {
                id: 'modal',
                label: 'Modal'
            }
        ]
    }
];

export const Default: Story = {
    args: {
        title: 'Components',
        sections: sampleSections,
        selectedItemId: 'button'
    }
};

export const WithoutTitle: Story = {
    args: {
        sections: sampleSections,
        selectedItemId: 'input'
    }
};

export const SimpleItems: Story = {
    args: {
        title: 'Navigation',
        items: [
            {
                id: 'home',
                label: 'Home'
            },
            {
                id: 'about',
                label: 'About'
            },
            {
                id: 'contact',
                label: 'Contact'
            }
        ],
        selectedItemId: 'home'
    }
};
