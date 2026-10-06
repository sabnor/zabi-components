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
        },
        themeModes: {
            control: 'inline-radio',
            options: ['two', 'three'],
            description: 'two: the toggle switches light and dark. three: it steps through system, light and dark.'
        },
        swedish: {
            control: 'boolean',
            description: 'Story only: passes Swedish `strings` and `themeLabels`'
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

export const ThreeThemeModes: Story = {
    args: {
        brand: 'MyApp',
        showThemeToggle: true,
        themeModes: 'three'
    },
    parameters: {
        docs: {
            description: {
                story: 'themeModes="three": the toggle steps through system, light and dark, and its name says the mode it is in and the one a press goes to ("Theme: system. Switch to light"). The default, "two", is a switch between light and dark. The story passes themeStorageKey={null}, so the choice is not kept; an app leaves that prop out and the choice is stored under "theme".'
            }
        }
    }
};

export const Swedish: Story = {
    args: {
        brand: 'MinApp',
        showThemeToggle: true,
        themeModes: 'three',
        swedish: true
    },
    parameters: {
        docs: {
            description: {
                story: 'Every word the bar says by itself, in another language: strings names the phone menu\'s button ("Öppna menyn", "Stäng menyn") and the note read after a link that opens in a new tab; themeLabels names the theme toggle. The links and the brand are the app\'s own. Narrow the canvas to see the menu button.'
            }
        }
    }
};
