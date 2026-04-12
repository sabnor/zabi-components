import type { Meta, StoryObj } from '@storybook/sveltekit';
import CardWithContent from './CardWithContent.svelte';
import CardCompound from './CardCompound.svelte';

const meta = {
    title: 'Design System/Atoms/Card',
    component: CardWithContent,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Card component with compound composition (CardHeader, CardContent, CardFooter). Supports different sizes, variants, and interactive states. Cards with an `onclick` handler show hover effects.'
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
        title: {
            control: 'text',
            description: 'Card header title'
        },
        description: {
            control: 'text',
            description: 'Optional description text displayed under the title'
        }
    }
} satisfies Meta<typeof CardWithContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Default Card'
    }
};

export const WithDescription: Story = {
    args: {
        title: 'Card with Description',
        description: 'This is an optional description that appears under the title.'
    }
};

export const WithImage: Story = {
    args: {
        title: 'Card with Image',
        image: 'https://placehold.co/400x200'
    }
};

export const WithContent: Story = {
    args: {
        title: 'Card with Content'
    }
};

export const Interactive: Story = {
    args: {
        title: 'Interactive Card',
        onclick: () => alert('Card clicked!')
    }
};

export const Small: Story = {
    args: {
        title: 'Small Card',
        size: 'sm'
    }
};

export const Medium: Story = {
    args: {
        title: 'Medium Card',
        size: 'md'
    }
};

export const Large: Story = {
    args: {
        title: 'Large Card',
        size: 'lg'
    }
};

export const CustomWidth: Story = {
    args: {
        title: 'Custom Width Card',
        fullWidth: false
    }
};

export const Elevated: Story = {
    args: {
        title: 'Elevated Card',
        variant: 'elevated',
        description: 'Card with stronger shadow for elevated appearance'
    }
};

export const Outlined: Story = {
    args: {
        title: 'Outlined Card',
        variant: 'outlined',
        description: 'Card with border and no shadow'
    }
};

export const Flat: Story = {
    args: {
        title: 'Flat Card',
        variant: 'flat',
        description: 'Card with no shadow and no border'
    }
};

export const CompoundComponents: Story = {
    args: {
        variant: 'default'
    },
    render: (args) => ({
        Component: CardCompound,
        props: args
    })
};

export const CompoundElevated: Story = {
    args: {
        variant: 'elevated'
    },
    render: (args) => ({
        Component: CardCompound,
        props: args
    })
};
