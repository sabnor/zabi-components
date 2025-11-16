import type { Meta, StoryObj } from '@storybook/sveltekit';
import Badge from '../../components/atoms/Badge.svelte';

const meta = {
    title: 'Design System/Atoms/Badge',
    component: Badge,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'success', 'warning', 'error', 'info', 'neutral', 'energetic']
        },
        text: {
            control: 'text'
        },
        showIcon: {
            control: 'boolean'
        }
    }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: 'default',
        text: 'Default Badge'
    }
};

export const Success: Story = {
    args: {
        variant: 'success',
        text: 'Success Badge'
    }
};

export const Warning: Story = {
    args: {
        variant: 'warning',
        text: 'Warning Badge'
    }
};

export const Error: Story = {
    args: {
        variant: 'error',
        text: 'Error Badge'
    }
};

export const Info: Story = {
    args: {
        variant: 'info',
        text: 'Info Badge'
    }
};

export const Neutral: Story = {
    args: {
        variant: 'neutral',
        text: 'Neutral Badge'
    }
};

export const Energetic: Story = {
    args: {
        variant: 'energetic',
        text: 'Energetic Badge'
    }
};

export const WithCustomClass: Story = {
    args: {
        variant: 'default',
        text: 'Custom Styled Badge'
    }
};

export const EmptyText: Story = {
    args: {
        variant: 'default',
        text: ''
    }
};

export const NullText: Story = {
    args: {
        variant: 'default',
        text: null as any
    }
};

export const WithChildren: Story = {
    args: {
        variant: 'info',
        text: ''
    },
    render: (args) => ({
        Component: Badge,
        props: args,
        children: 'Custom content with children'
    })
};

export const DynamicContent: Story = {
    args: {
        variant: 'success',
        text: 'Dynamic content test'
    },
    parameters: {
        docs: {
            description: {
                story: 'This story tests the Badge component with dynamic content to ensure it handles rapid state changes without DOM access errors.'
            }
        }
    }
};

export const WithIcons: Story = {
    args: {
        variant: 'success',
        text: 'With Icons',
        showIcon: true
    },
    parameters: {
        docs: {
            description: {
                story: 'Badge variants with their respective Lucide icons enabled by default.'
            }
        }
    }
};

export const WithoutIcons: Story = {
    args: {
        variant: 'success',
        text: 'Without Icons',
        showIcon: false
    },
    parameters: {
        docs: {
            description: {
                story: 'Badge variants with icons disabled for a cleaner look.'
            }
        }
    }
};

export const AllVariantsWithIcons: Story = {
    args: {
        variant: 'default',
        text: 'Badge',
        showIcon: false
    },
    render: () => ({
        Component: 'div' as any,
        props: {
            class: 'flex flex-wrap gap-2 items-center'
        },
        children: [
            { Component: Badge, props: { variant: 'default', text: 'Default', showIcon: true } },
            { Component: Badge, props: { variant: 'success', text: 'Success', showIcon: true } },
            { Component: Badge, props: { variant: 'warning', text: 'Warning', showIcon: true } },
            { Component: Badge, props: { variant: 'error', text: 'Error', showIcon: true } },
            { Component: Badge, props: { variant: 'info', text: 'Info', showIcon: true } },
            { Component: Badge, props: { variant: 'neutral', text: 'Neutral', showIcon: true } },
            { Component: Badge, props: { variant: 'energetic', text: 'Energetic', showIcon: true } }
        ]
    } as any),
    parameters: {
        docs: {
            description: {
                story: 'All badge variants displayed with their respective Lucide icons (Check, AlertTriangle, X, Info).'
            }
        }
    }
};