import type { Meta, StoryObj } from '@storybook/svelte';
import Heading from '../components/atoms/Heading.svelte';

const meta = {
    title: 'Design System/Atoms/Heading',
    component: Heading,
    parameters: {
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
    render: () => ({
        Component: 'div',
        props: { style: 'display: flex; flex-direction: column; gap: 1rem;' },
        children: [
            { Component: Heading, props: { level: 1, text: 'Heading 1 - Bold' } },
            { Component: Heading, props: { level: 2, text: 'Heading 2 - Bold' } },
            { Component: Heading, props: { level: 3, text: 'Heading 3 - Medium' } },
            { Component: Heading, props: { level: 4, text: 'Heading 4 - Medium' } },
            { Component: Heading, props: { level: 5, text: 'Heading 5 - Medium' } },
            { Component: Heading, props: { level: 6, text: 'Heading 6 - Medium' } }
        ]
    })
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