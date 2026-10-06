import type { Meta, StoryObj } from '@storybook/sveltekit';
import Container from '../../components/atoms/Container.svelte';

const meta = {
    title: 'Design System/Atoms/Container',
    component: Container,
    parameters: {
        docs: {
            description: {
                component:
                    'Centered max-width wrapper with optional horizontal padding.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        maxWidth: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
        },
        padded: { control: 'boolean' },
    },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        as: 'div',
        maxWidth: 'lg',
        padded: true,
        class: 'rounded-container border border-border bg-surface-raised py-6',
    },
    render: (args) => ({
        Component: Container,
        props: args,
        children: [
            'Centered content respects max width and horizontal padding.',
        ],
    }),
};

export const Narrow: Story = {
    args: {
        maxWidth: 'sm',
        padded: true,
        class: 'rounded-container border border-border bg-surface-raised py-6',
    },
    render: (args) => ({
        Component: Container,
        props: args,
        children: ['A narrow column, for a sign-in form or a single block of reading text.'],
    }),
};

export const FullWidth: Story = {
    args: {
        maxWidth: 'full',
        padded: true,
        class: 'rounded-container border border-border bg-surface-raised py-6',
    },
    render: (args) => ({
        Component: Container,
        props: args,
        children: ['No maximum width: the container fills its parent and keeps its side padding.'],
    }),
};

export const WithoutPadding: Story = {
    args: {
        maxWidth: 'lg',
        padded: false,
        class: 'rounded-container border border-border bg-surface-raised py-6',
    },
    render: (args) => ({
        Component: Container,
        props: args,
        children: ['Without padding the content reaches the edge of the container.'],
    }),
    parameters: {
        docs: {
            description: {
                story: 'Turn padding off when the content brings its own, such as a full-bleed image or a table.'
            }
        }
    }
};

export const AsMain: Story = {
    args: {
        as: 'main',
        maxWidth: 'lg',
        padded: true,
        class: 'rounded-container border border-border bg-surface-raised py-6',
    },
    render: (args) => ({
        Component: Container,
        props: args,
        children: ['Rendered as a main element.'],
    }),
    parameters: {
        docs: {
            description: {
                story: 'as sets the element, so the container can be the page landmark itself instead of a div inside one.'
            }
        }
    }
};
