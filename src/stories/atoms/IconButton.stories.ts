import type { Meta, StoryObj } from '@storybook/sveltekit';
import { Heart } from '@lucide/svelte';
import IconButton from '../../components/atoms/IconButton.svelte';

const iconSizeByButtonSize = {
    sm: 16,
    md: 20,
    lg: 24
} as const;

const meta = {
    title: 'Design System/Atoms/IconButton',
    component: IconButton,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Icon-only button for compact actions. Provide an accessible label via the label prop.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'danger', 'ghost', 'outline', 'link']
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg']
        }
    }
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderWithIcon = (args: Story['args']) => {
    const size = (args?.size ?? 'md') as keyof typeof iconSizeByButtonSize;

    return {
        Component: IconButton,
        props: args,
        children: [
            {
                Component: Heart,
                props: { size: iconSizeByButtonSize[size] }
            }
        ]
    };
};

export const Default: Story = {
    args: {
        variant: 'primary',
        size: 'md',
        label: 'Favorite'
    },
    render: renderWithIcon
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        size: 'md',
        label: 'Favorite'
    },
    render: renderWithIcon
};

export const Danger: Story = {
    args: {
        variant: 'danger',
        size: 'md',
        label: 'Delete'
    },
    render: renderWithIcon
};

export const Small: Story = {
    args: {
        size: 'sm',
        label: 'Favorite'
    },
    render: renderWithIcon
};

export const Large: Story = {
    args: {
        size: 'lg',
        label: 'Favorite'
    },
    render: renderWithIcon
};

export const Disabled: Story = {
    args: {
        disabled: true,
        label: 'Favorite'
    },
    render: renderWithIcon
};
