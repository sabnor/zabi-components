import type { Meta, StoryObj } from '@storybook/sveltekit';
import Text from '../../components/atoms/Text.svelte';

const meta = {
    title: 'Design System/Atoms/Text',
    component: Text,
    parameters: {
        docs: {
            description: {
                component:
                    'Typography primitive with tone and size tokens, rendered as p, span or div.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        tone: {
            control: 'select',
            options: ['body', 'description', 'caption', 'headline', 'label', 'error'],
        },
        size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
        weight: { control: 'select', options: ['normal', 'medium', 'semibold', 'bold'] },
        as: { control: 'select', options: ['p', 'span', 'div'] },
    },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Headline: Story = {
    args: {
        tone: 'headline',
        size: 'lg',
    },
    render: (args) => ({
        Component: Text,
        props: args,
        children: ['Invite your team'],
    }),
};

export const Body: Story = {
    args: {
        tone: 'body',
        size: 'md',
    },
    render: (args) => ({
        Component: Text,
        props: args,
        children: ['Teammates you invite can see every project in this workspace.'],
    }),
};

export const Description: Story = {
    args: {
        tone: 'description',
        size: 'sm',
    },
    render: (args) => ({
        Component: Text,
        props: args,
        children: ['You can change their role at any time.'],
    }),
    parameters: {
        docs: {
            description: {
                story: 'Secondary text under a heading or beside a control.'
            }
        }
    }
};

export const Caption: Story = {
    args: {
        tone: 'caption',
        size: 'xs',
    },
    render: (args) => ({
        Component: Text,
        props: args,
        children: ['Last updated 2 minutes ago'],
    }),
    parameters: {
        docs: {
            description: {
                story: 'The quietest tone, for timestamps and footnotes.'
            }
        }
    }
};

export const Label: Story = {
    args: {
        tone: 'label',
        size: 'sm',
    },
    render: (args) => ({
        Component: Text,
        props: args,
        children: ['Email address'],
    }),
    parameters: {
        docs: {
            description: {
                story: 'Label sets a medium weight, to match form labels.'
            }
        }
    }
};

export const Error: Story = {
    args: {
        tone: 'error',
        size: 'sm',
    },
    render: (args) => ({
        Component: Text,
        props: args,
        children: ['Please enter a valid email address.'],
    }),
};

export const AsSpan: Story = {
    args: {
        as: 'span',
        tone: 'description',
        size: 'sm',
    },
    render: (args) => ({
        Component: Text,
        props: args,
        children: ['Rendered as a span, for text inside a line.'],
    }),
    parameters: {
        docs: {
            description: {
                story: 'as chooses the element: p by default, span inside a line of text, div when it wraps other blocks.'
            }
        }
    }
};

export const WeightOverride: Story = {
    args: {
        tone: 'body',
        size: 'md',
        weight: 'semibold',
    },
    render: (args) => ({
        Component: Text,
        props: args,
        children: ['Body text at semibold weight.'],
    }),
    parameters: {
        docs: {
            description: {
                story: 'weight overrides the weight the tone implies.'
            }
        }
    }
};
