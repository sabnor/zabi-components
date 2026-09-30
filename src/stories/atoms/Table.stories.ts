import type { Meta, StoryObj } from '@storybook/sveltekit';
import TableStory from './TableStory.svelte';

const meta = {
    title: 'Design System/Atoms/Table',
    component: TableStory,
    parameters: {
        docs: {
            description: {
                component:
                    'Scrollable table shell with an optional caption; pass thead and tbody as children. It can stack its rows on small screens instead of scrolling.'
            }
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof TableStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        Component: TableStory,
        props: args,
    }),
};

export const HiddenCaption: Story = {
    args: {
        captionHidden: true,
    },
    render: (args) => ({
        Component: TableStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'With `captionHidden` the caption still names the table for screen readers but takes no space, for a table that already sits under a visible heading.'
            }
        }
    }
};

export const Stacked: Story = {
    args: {
        stacked: true,
    },
    render: (args) => ({
        Component: TableStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Each row becomes a block of label and value pairs and the minimum width is dropped, so nothing scrolls sideways. `stacked` stacks at every width; `stacked="sm"`, `"md"` or `"lg"` stacks only below that breakpoint. The label beside each value is the `data-label` attribute you put on the cell: `<td data-label="Role">Admin</td>`. A cell without one shows its value alone. Keep the `<thead>`: it is hidden from view when stacked but still gives each cell its column header.'
            }
        }
    }
};

export const StackedBelowSm: Story = {
    args: {
        stacked: 'sm',
    },
    render: (args) => ({
        Component: TableStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Narrow the viewport below 640px to see the rows stack; above it this is the ordinary table.'
            }
        }
    }
};
