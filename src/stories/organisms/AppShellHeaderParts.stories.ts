import type { Meta, StoryObj } from '@storybook/sveltekit';
import AppShellHeaderPartsStory from './AppShellHeaderPartsStory.svelte';

const meta = {
    title: 'Design System/Organisms/AppShell header parts',
    component: AppShellHeaderPartsStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A header made of AppShellHeaderPart blocks, each of which sticks to the top of the scrolling area or scrolls away with the content (sticky, default true). The parts that stick stack under one another in document order; the shell reports only what is stuck as --app-shell-top-inset, so a focused field or an anchor is never hidden under them. The glass and one hairline sit under the lowest stuck part once content is under it, and the status bar is always covered by whatever is topmost. Keep the stuck parts short: above 40% of the screen the lower ones stop sticking. The stories show it in a phone-sized frame.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        layout: { control: 'inline-radio', options: ['filter-sticks', 'tabs-stick', 'all-stick'] },
        frameWidth: { control: 'inline-radio', options: [320, 360, 390] },
    },
} satisfies Meta<typeof AppShellHeaderPartsStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BarScrollsAwayFilterSticks: Story = {
    args: { layout: 'filter-sticks' },
    render: (args) => ({ Component: AppShellHeaderPartsStory, props: args }),
    parameters: {
        docs: {
            description: {
                story: 'The app bar is a part with sticky={false}: it scrolls away with the content and the filter row stays at the top, under the status bar.'
            }
        }
    }
};

export const LargeTitleScrollsAwayBarAndTabsStick: Story = {
    args: { layout: 'tabs-stick' },
    render: (args) => ({ Component: AppShellHeaderPartsStory, props: args }),
    parameters: {
        docs: {
            description: {
                story: 'An AppBar with a large title in the first part: the large row leaves, the 56px bar stays, and the tabs stick directly under it.'
            }
        }
    }
};

export const EverythingSticks: Story = {
    args: { layout: 'all-stick' },
    render: (args) => ({ Component: AppShellHeaderPartsStory, props: args }),
    parameters: {
        docs: {
            description: {
                story: 'Every part sticks, as a header without parts always did: bar, filter row and tabs stack with no gap, one surface and one hairline under the tabs.'
            }
        }
    }
};
