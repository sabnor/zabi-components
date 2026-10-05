import type { Meta, StoryObj } from '@storybook/sveltekit';
import BottomTabBarStory from './BottomTabBarStory.svelte';

const meta = {
    title: 'Design System/Molecules/BottomTabBar',
    component: BottomTabBarStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'The navigation bar at the bottom of a phone screen: three to five links, each an icon over a short label. The tab for the current page, or the closest one above it, gets aria-current; pass active (in SvelteKit, page.url.pathname) or leave it out and the bar reads the address in the browser. A count on a tab is part of the name of its link. On its own the bar is fixed to the bottom of the screen and clear of the home indicator; inside AppShell the shell places it. The stories show it in a phone-width frame.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        count: { control: 'inline-radio', options: [3, 4, 5] },
        frameWidth: { control: 'inline-radio', options: [320, 360, 390] },
    },
} satisfies Meta<typeof BottomTabBarStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        Component: BottomTabBarStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Five tabs in a 360px frame. The active tab has the action colour on its icon, a filled pill behind it and a heavier label, so it does not depend on colour alone. Pressing it again changes nothing.'
            }
        }
    }
};

export const ThreeTabs: Story = {
    args: {
        count: 3,
        startActive: '/home',
    },
    render: (args) => ({
        Component: BottomTabBarStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'The fewest the bar is made for. With fewer or more than three to five, a development build warns in the console.'
            }
        }
    }
};

export const WithBadges: Story = {
    args: {
        withBadges: true,
    },
    render: (args) => ({
        Component: BottomTabBarStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'A count sits on the icon and is read out with the link: "Inbox, 3 new". Above badgeMax it shows as 99+ and the name keeps the real number. badgeLabel replaces the wording.'
            }
        }
    }
};

export const NarrowPhone: Story = {
    args: {
        frameWidth: 320,
        longLabels: true,
        withBadges: true,
    },
    render: (args) => ({
        Component: BottomTabBarStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Five tabs at 320px with labels that are too long. They wrap instead of being cut off or pushing the bar sideways; every tab stays at least 44px wide. Keep labels to one short word.'
            }
        }
    }
};
