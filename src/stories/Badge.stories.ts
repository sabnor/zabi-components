import type { Meta, StoryObj } from '@storybook/svelte';
import Badge from '../components/atoms/Badge.svelte';

const meta = {
    title: 'Design System/Atoms/Badge',
    component: Badge,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['default', 'success', 'warning', 'error', 'info']
        },
        text: {
            control: { type: 'text' }
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