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
            control: { type: 'select' },
            options: [1, 2, 3, 4, 5, 6]
        },
        text: {
            control: { type: 'text' }
        },
        color: {
            control: { type: 'text' }
        },
        spacing: {
            control: { type: 'select' },
            options: ['tight', 'normal', 'loose']
        }
    }
} satisfies Meta<Heading>;

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

export const WithCustomColor: Story = {
    args: {
        level: 2,
        text: 'Colored Heading',
        color: 'text-plasma-red-500'
    }
};

export const TightSpacing: Story = {
    args: {
        level: 2,
        text: 'Tight Spacing',
        spacing: 'tight'
    }
};

export const LooseSpacing: Story = {
    args: {
        level: 2,
        text: 'Loose Spacing',
        spacing: 'loose'
    }
};

export const AllLevels: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'space-y-4'
        },
        children: [
            {
                Component: Heading,
                props: { level: 1, text: 'Heading 1' }
            },
            {
                Component: Heading,
                props: { level: 2, text: 'Heading 2' }
            },
            {
                Component: Heading,
                props: { level: 3, text: 'Heading 3' }
            },
            {
                Component: Heading,
                props: { level: 4, text: 'Heading 4' }
            },
            {
                Component: Heading,
                props: { level: 5, text: 'Heading 5' }
            },
            {
                Component: Heading,
                props: { level: 6, text: 'Heading 6' }
            }
        ]
    })
};

export const ColorVariants: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'space-y-4'
        },
        children: [
            {
                Component: Heading,
                props: { level: 2, text: 'Default White', color: 'text-white' }
            },
            {
                Component: Heading,
                props: { level: 2, text: 'Plasma Red', color: 'text-plasma-red-500' }
            },
            {
                Component: Heading,
                props: { level: 2, text: 'Matrix Green', color: 'text-matrix-green-500' }
            },
            {
                Component: Heading,
                props: { level: 2, text: 'Cyber Amber', color: 'text-cyber-amber-500' }
            },
            {
                Component: Heading,
                props: { level: 2, text: 'Blood Red', color: 'text-blood-red-500' }
            }
        ]
    })
};

export const SpacingVariants: Story = {
    render: () => ({
        Component: 'div',
        props: {
            class: 'space-y-8'
        },
        children: [
            {
                Component: 'div',
                props: { class: 'border-b border-gray-600 pb-4' },
                children: [
                    {
                        Component: Heading,
                        props: { level: 2, text: 'Tight Spacing', spacing: 'tight' }
                    },
                    {
                        Component: 'p',
                        props: { class: 'text-gray-400' },
                        slot: 'This paragraph follows a heading with tight spacing.'
                    }
                ]
            },
            {
                Component: 'div',
                props: { class: 'border-b border-gray-600 pb-4' },
                children: [
                    {
                        Component: Heading,
                        props: { level: 2, text: 'Normal Spacing', spacing: 'normal' }
                    },
                    {
                        Component: 'p',
                        props: { class: 'text-gray-400' },
                        slot: 'This paragraph follows a heading with normal spacing.'
                    }
                ]
            },
            {
                Component: 'div',
                children: [
                    {
                        Component: Heading,
                        props: { level: 2, text: 'Loose Spacing', spacing: 'loose' }
                    },
                    {
                        Component: 'p',
                        props: { class: 'text-gray-400' },
                        slot: 'This paragraph follows a heading with loose spacing.'
                    }
                ]
            }
        ]
    })
};
