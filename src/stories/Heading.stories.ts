import type { Meta, StoryObj } from '@storybook/svelte';
import Heading from '../components/atoms/Heading.svelte';

const meta = {
    title: 'Design System/Atoms/Heading',
    component: Heading,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
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
        text: 'All Levels Showcase'
    }
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