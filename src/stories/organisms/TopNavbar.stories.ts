import type { Meta, StoryObj } from '@storybook/sveltekit';
import TopNavbarDemo from './TopNavbarDemo.svelte';

const meta = {
    title: 'Design System/Organisms/TopNavbar',
    component: TopNavbarDemo,
    parameters: {
        docs: {
            description: {
                component:
                    'Top bar with brand, optional link list, theme toggle and a responsive mobile menu that opens as a sheet from the bottom. Use embedded for a link-only strip inside your own header.'
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
        menu: {
            control: 'inline-radio',
            options: ['sheet', 'inline'],
            description: 'How the links open below collapseAt: sheet (default) slides a modal bottom sheet up; inline opens a panel under the bar that pushes the page down'
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

export const PhoneMenuSheet: Story = {
    args: {
        brand: 'MyApp',
        menu: 'sheet'
    },
    parameters: {
        docs: {
            description: {
                story: 'The default below collapseAt. The menu button opens a modal bottom sheet as tall as its content, up to the full screen below the status bar, which scrolls inside. Focus moves into it and returns to the button; Escape, the backdrop, the close button or a swipe down close it, and so does following a link. Below the links the caller\'s actions and the theme choice have a section of their own at the full width of the sheet: the theme toggle becomes a segmented control (light and dark, or system, light and dark with themeModes="three"), and a control in the actions can ask getTopNavbarPlace() to draw itself large in the sheet and compact in the bar. The page behind is out of reach and does not scroll. Narrow the canvas to see the menu button.'
            }
        }
    }
};

export const PhoneMenuInline: Story = {
    args: {
        brand: 'MyApp',
        menu: 'inline'
    },
    parameters: {
        docs: {
            description: {
                story: 'menu="inline" keeps the menu of 8.1: a panel under the bar that pushes the page down. A disclosure, not a dialog: nothing is trapped or locked, and it closes on Escape, on a press or a focus move outside the bar, on a link and past the breakpoint.'
            }
        }
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
                story: 'Eight links do not fit a row at 768px. collapseAt="xl" keeps them in the menu until the screen is 1280px wide; the default, md, is unchanged. In the menu sheet each link is a full row of at least 44px, the sheet scrolls inside when the links are taller than the screen, and it closes on a link, on Escape (focus returns to the menu button), on the backdrop, and when the screen passes the breakpoint.'
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
                story: 'Every word the bar says by itself, in another language: strings names the phone menu\'s button ("Öppna menyn", "Stäng menyn"), the menu sheet ("Meny") and the note read after a link that opens in a new tab; themeLabels names the theme toggle. The links and the brand are the app\'s own. Narrow the canvas to see the menu button.'
            }
        }
    }
};
