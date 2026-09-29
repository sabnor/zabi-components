import type { Meta, StoryObj } from '@storybook/sveltekit';
import Divider from '../../components/atoms/Divider.svelte';
import DividerVerticalDemo from './DividerVerticalDemo.svelte';

const meta = {
    title: 'Design System/Atoms/Divider',
    component: Divider,
    parameters: {
        docs: {
            description: {
                component:
                    'Horizontal or vertical separator; optional inset and label.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        orientation: { control: 'select', options: ['horizontal', 'vertical'] },
        decorative: { control: 'boolean' },
    },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
    args: {
        orientation: 'horizontal',
        decorative: true,
    },
};

export const WithLabel: Story = {
    args: {
        orientation: 'horizontal',
        label: 'Or',
        decorative: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'A labelled divider, for example between a sign-in form and the single sign-on buttons.'
            }
        }
    }
};

export const Inset: Story = {
    args: {
        orientation: 'horizontal',
        inset: true,
        decorative: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Inset pulls the line in from the edges, for separating rows inside a list or a card.'
            }
        }
    }
};

export const Vertical: Story = {
    args: {
        decorative: true,
    },
    render: (args) => ({
        Component: DividerVerticalDemo,
        props: { decorative: args.decorative },
    }),
    parameters: {
        docs: {
            description: {
                story: 'A vertical divider takes its height from the row it sits in.'
            }
        }
    }
};

export const Announced: Story = {
    args: {
        orientation: 'horizontal',
        decorative: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'With decorative off the divider has the separator role, so screen readers announce the break. Use it when the split carries meaning, not for spacing.'
            }
        }
    }
};
