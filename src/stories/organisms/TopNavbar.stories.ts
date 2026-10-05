import type { Meta, StoryObj } from '@storybook/sveltekit';
import TopNavbarDemo from './TopNavbarDemo.svelte';

const meta = {
    title: 'Design System/Organisms/TopNavbar',
    component: TopNavbarDemo,
    parameters: {
        docs: {
            description: {
                component:
                    'Top bar with brand, optional link list, theme toggle and a responsive mobile menu. Use embedded for a link-only strip inside your own header.'
            }
        },
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
        },
        collapseAt: {
            control: 'inline-radio',
            options: ['sm', 'md', 'lg', 'xl'],
            description: 'Breakpoint at which the links move from the phone menu into the bar'
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

export const ManyItemsCollapseAtXl: Story = {
    args: {
        brand: 'MyApp',
        manyItems: true,
        collapseAt: 'xl'
    },
    parameters: {
        docs: {
            description: {
                story: 'Eight links do not fit a row at 768px. collapseAt="xl" keeps them in the menu until the screen is 1280px wide; the default, md, is unchanged. In the menu each link is a full row, the menu scrolls on its own on a short screen, and it closes on a link, on Escape (focus returns to the menu button), on a press or a focus move outside the bar, and when the screen passes the breakpoint.'
            }
        }
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
