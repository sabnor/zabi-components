import type { Meta, StoryObj } from '@storybook/sveltekit';
import SidebarShellStory from './SidebarShellStory.svelte';

const meta = {
    title: 'Design System/Organisms/SidebarShell',
    component: SidebarShellStory,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'The chrome of a sidebar with the regions left open: width, surface, collapse behaviour and a scrolling middle. With mobile="drawer" the rail is there from the lg breakpoint (1024px) up, and below it the same regions open in a Drawer from the start edge, closing when a link in it is followed.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        mode: { control: 'select', options: ['expanded', 'collapsed'] },
        mobile: {
            control: 'select',
            options: ['none', 'drawer'],
            description: 'What the sidebar is below 1024px: the rail, or a drawer'
        },
        label: { control: 'text', description: 'Accessible name of the scrolling region' }
    }
} satisfies Meta<typeof SidebarShellStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { mode: 'expanded', mobile: 'none' }
};

export const Collapsed: Story = {
    args: { mode: 'collapsed', mobile: 'none' }
};

/** Narrow the window below 1024px: the rail goes, and the button opens the sidebar in a drawer. */
export const DrawerBelowLg: Story = {
    args: { mode: 'expanded', mobile: 'drawer' }
};
