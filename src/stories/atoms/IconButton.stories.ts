import type { Meta, StoryObj } from '@storybook/sveltekit';
import Bold from '@lucide/svelte/icons/bold';
import Heart from '@lucide/svelte/icons/heart';
import Trash2 from '@lucide/svelte/icons/trash-2';
import IconButton from '../../components/atoms/IconButton.svelte';

const iconSizeByButtonSize = {
    xs: 14,
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
                component:
                    'Icon-only button for compact actions. Provide an accessible label via the label prop. Pass pressed to make it a toggle button, and tone="danger" on a ghost or outline button for a quiet destructive action.'
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
            options: ['xs', 'sm', 'md', 'lg']
        },
        tone: {
            control: 'select',
            options: ['default', 'danger']
        },
        pressed: {
            control: 'boolean'
        }
    }
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderWith = (Icon: typeof Heart) => (args: Story['args']) => {
    const size = (args?.size ?? 'md') as keyof typeof iconSizeByButtonSize;

    return {
        Component: IconButton,
        props: args,
        children: [
            {
                Component: Icon,
                props: { size: iconSizeByButtonSize[size] }
            }
        ]
    };
};

const renderWithIcon = renderWith(Heart);

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

/** 24px, for dense pointer-first layouts such as a card header. Where the primary input is touch, use `sm` or larger. */
export const ExtraSmall: Story = {
    args: {
        variant: 'ghost',
        size: 'xs',
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

/** A toolbar toggle: click it to flip `pressed`, which is announced through `aria-pressed`. */
export const PressedToggle: Story = {
    args: {
        variant: 'ghost',
        size: 'sm',
        pressed: true,
        label: 'Bold'
    },
    render: renderWith(Bold)
};

/** The quiet destructive button for inline delete. `tone` applies to ghost and outline. */
export const GhostDanger: Story = {
    args: {
        variant: 'ghost',
        tone: 'danger',
        label: 'Delete'
    },
    render: renderWith(Trash2)
};
