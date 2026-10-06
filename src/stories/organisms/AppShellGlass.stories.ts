import type { Meta, StoryObj } from '@storybook/sveltekit';
import AppShellGlassStory from './AppShellGlassStory.svelte';
import AppShellFlushStory from './AppShellFlushStory.svelte';

const meta = {
    title: 'Design System/Organisms/AppShell (9.0)',
    component: AppShellGlassStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'The redesigned shell: a large-title bar and a navigation that are the page colour at rest and turn to glass once content passes under them. The navigation slot takes one AppNavigation, which is a tab bar on a phone, a rail on a tablet and a sidebar on a desktop, placed by CSS so the server sends the right layout. Each story forces one placement in a frame of that device width; Adaptive follows the window. Light and dark follow the theme toolbar.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        placement: { control: 'inline-radio', options: ['auto', 'tabs', 'rail', 'sidebar'] },
        frameWidth: { control: { type: 'number', min: 320, max: 1440, step: 10 } },
        frameHeight: { control: { type: 'number', min: 400, max: 1000, step: 10 } },
    },
} satisfies Meta<typeof AppShellGlassStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Phone: Story = {
    args: { placement: 'tabs', frameWidth: 390, frameHeight: 780 },
    render: (args) => ({ Component: AppShellGlassStory, props: args }),
    parameters: {
        docs: {
            description: {
                story: 'Navigation forced to tabs in a 390px frame. Scroll the list: rows pass under the large-title bar and the tab bar.'
            }
        }
    }
};

export const PhoneFloatingTabs: Story = {
    args: { placement: 'tabs', frameWidth: 390, frameHeight: 780, floating: true },
    render: (args) => ({ Component: AppShellGlassStory, props: args }),
    parameters: {
        docs: {
            description: {
                story: 'The same with floating, which draws the tab bar as a glass capsule inset from the screen edges.'
            }
        }
    }
};

export const TabletRail: Story = {
    args: { placement: 'rail', frameWidth: 834, frameHeight: 780 },
    render: (args) => ({ Component: AppShellGlassStory, props: args }),
    parameters: {
        docs: {
            description: {
                story: 'Navigation forced to a rail in an 834px frame: an 80px column at the start, each destination an icon in a pill above its label.'
            }
        }
    }
};

export const DesktopSidebar: Story = {
    args: { placement: 'sidebar', frameWidth: 1280, frameHeight: 780 },
    render: (args) => ({ Component: AppShellGlassStory, props: args }),
    parameters: {
        docs: {
            description: {
                story: 'Navigation forced to a sidebar in a 1280px frame: a 256px column of 36px rows with the count at the end of the row and the active row tinted.'
            }
        }
    }
};

export const Adaptive: Story = {
    args: { placement: 'auto', fullscreen: true },
    render: (args) => ({ Component: AppShellGlassStory, props: args }),
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'Placement auto, the shell filling the window. Resize it: tabs below 768px, a rail from 768px and a sidebar from 1024px, with nothing mounted again.'
            }
        }
    }
};

export const BrandBar: Story = {
    args: { placement: 'tabs', frameWidth: 390, frameHeight: 780, brandBar: true },
    render: (args) => ({ Component: AppShellGlassStory, props: args }),
    parameters: {
        docs: {
            description: {
                story: 'AppBar tone brand over a brand-coloured block, so the bar and the block join without a seam.'
            }
        }
    }
};

export const ColourBlockUnderStatusBar: Story = {
    args: { placement: 'tabs' },
    render: () => ({ Component: AppShellFlushStory }),
    parameters: {
        docs: {
            description: {
                story: 'A tab screen with no header: AppShell flushTop starts the content at the top of the screen, so the accent block runs under the status bar. The AppBar inside it is position static and tone inherit, so it pads the safe area itself and its title, back control and actions take the block\'s text colour. A sticky bar over scrolling content takes its fill from the app: class="[--color-bar:var(--your-block-colour)]".'
            }
        }
    }
};
