import type { Meta, StoryObj } from '@storybook/sveltekit';
import Heading from '../../components/atoms/Heading.svelte';

const meta = {
    title: 'Design System/Atoms/Heading',
    component: Heading,
    parameters: {
        docs: {
            description: {
                component:
                    'Renders h1-h6, with an optional visual size that differs from the semantic level.'
            }
        },
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        level: {
            control: { type: 'number', min: 1, max: 6 }
        }
    }
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
    args: {
        level: 1,
        text: 'Heading 1'
    }
};

export const H2: Story = {
    args: {
        level: 2,
        text: 'Heading 2'
    }
};

export const H3: Story = {
    args: {
        level: 3,
        text: 'Heading 3'
    }
};

export const H4: Story = {
    args: {
        level: 4,
        text: 'Heading 4'
    }
};

export const H5: Story = {
    args: {
        level: 5,
        text: 'Heading 5'
    }
};

export const H6: Story = {
    args: {
        level: 6,
        text: 'Heading 6'
    }
};

export const AllLevels: Story = {
    args: {
        level: 1,
        text: 'Heading'
    },
    render: () => ({
        Component: 'div' as any,
        props: { style: 'display: flex; flex-direction: column; gap: 1rem;' },
        children: [
            { Component: Heading, props: { level: 1, text: 'Heading 1 - Bold' } },
            { Component: Heading, props: { level: 2, text: 'Heading 2 - Bold' } },
            { Component: Heading, props: { level: 3, text: 'Heading 3 - Medium' } },
            { Component: Heading, props: { level: 4, text: 'Heading 4 - Medium' } },
            { Component: Heading, props: { level: 5, text: 'Heading 5 - Medium' } },
            { Component: Heading, props: { level: 6, text: 'Heading 6 - Medium' } }
        ]
    } as any)
};

export const WithSlot: Story = {
    args: {
        level: 2,
        text: 'Heading with '
    },
    render: (args) => ({
        Component: Heading,
        props: args,
        children: ['Slot Content']
    })
};

export const Display: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'The display face (`--font-family-display`) with its own, larger steps: 60px for level 1 (48px on a phone) down to 20px for level 6. Weight and tracking are `--zabi-display-weight` and `--zabi-display-tracking`.'
            }
        }
    },
    render: () => ({
        Component: 'div' as any,
        props: { style: 'display: flex; flex-direction: column; gap: 1rem;' },
        children: [1, 2, 3, 4, 5, 6].map((level) => ({
            Component: Heading,
            props: { level, variant: 'display', text: `Display ${level}` }
        }))
    } as any)
};

export const DisplayWithOwnFace: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'A second typeface is a token, not a CSS rule: set `--font-family-display` (and, if the face wants it, `--zabi-display-weight`) on any ancestor.'
            }
        }
    },
    render: () => ({
        Component: 'div' as any,
        props: { style: '--font-family-display: Georgia, serif; --zabi-display-weight: 400;' },
        children: [{ Component: Heading, props: { level: 1, variant: 'display', text: 'Ett annat typsnitt' } }]
    } as any)
};
