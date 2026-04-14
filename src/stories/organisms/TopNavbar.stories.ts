import type { Meta, StoryObj } from '@storybook/sveltekit';
import TopNavbarDemo from './TopNavbarDemo.svelte';

const meta = {
    title: 'Design System/Organisms/TopNavbar',
    component: TopNavbarDemo,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs'],
    argTypes: {
        brand: {
            control: 'text',
            description: 'Brand name or logo text'
        },
        showThemeToggle: {
            control: 'boolean',
            description: 'Show theme toggle button'
        }
    }
} satisfies Meta<typeof TopNavbarDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        brand: 'MyApp',
        showThemeToggle: true
    }
};

export const WithoutThemeToggle: Story = {
    args: {
        brand: 'MyApp',
        showThemeToggle: false
    }
};

export const CustomBrand: Story = {
    args: {
        brand: 'Company Name',
        showThemeToggle: true
    }
};

export const WithCustomActions: Story = {
    args: {
        brand: 'MyApp',
        showThemeToggle: true,
        customActions: true
    }
};
