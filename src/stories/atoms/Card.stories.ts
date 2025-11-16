import type { Meta, StoryObj } from '@storybook/sveltekit';
import Card from '../../components/atoms/Card.svelte';
import CardWithContent from './CardWithContent.svelte';

const meta = {
    title: 'Design System/Atoms/Card',
    component: Card,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Card component with built-in support for different sizes and interactive states. Cards with an `onclick` handler will show hover effects (shadow and background change), while cards without `onclick` remain static. Uses semantic color system for consistent theming.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size of the card padding'
        },
        fullWidth: {
            control: 'boolean',
            description: 'Whether the card takes full width'
        },
        description: {
            control: 'text',
            description: 'Optional description text displayed under the title'
        }
    }
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Default Card'
    },
    render: (args) => ({
        Component: CardWithContent,
        props: args
    })
};

export const WithDescription: Story = {
    args: {
        title: 'Card with Description',
        description: 'This is an optional description that appears under the title.'
    },
    render: (args) => ({
        Component: CardWithContent,
        props: args
    })
};

export const WithImage: Story = {
    args: {
        title: 'Card with Image',
        image: 'https://via.placeholder.com/400x200'
    },
    render: (args) => ({
        Component: CardWithContent,
        props: args
    })
};

export const WithContent: Story = {
    args: {
        title: 'Card with Content'
    },
    render: (args) => ({
        Component: CardWithContent,
        props: args
    })
};

export const Interactive: Story = {
    args: {
        title: 'Interactive Card',
        onclick: () => alert('Card clicked!')
    },
    render: (args) => ({
        Component: CardWithContent,
        props: args
    })
};

export const Small: Story = {
    args: {
        title: 'Small Card',
        size: 'sm'
    },
    render: (args) => ({
        Component: CardWithContent,
        props: args
    })
};

export const Medium: Story = {
    args: {
        title: 'Medium Card',
        size: 'md'
    },
    render: (args) => ({
        Component: CardWithContent,
        props: args
    })
};

export const Large: Story = {
    args: {
        title: 'Large Card',
        size: 'lg'
    },
    render: (args) => ({
        Component: CardWithContent,
        props: args
    })
};

export const CustomWidth: Story = {
    args: {
        title: 'Custom Width Card',
        fullWidth: false
    },
    render: (args) => ({
        Component: CardWithContent,
        props: args
    })
};
