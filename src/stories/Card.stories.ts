import type { Meta, StoryObj } from '@storybook/svelte';
import Card from '../components/atoms/Card.svelte';

const meta = {
    title: 'Design System/Atoms/Card',
    component: Card,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Card Title',
        variant: 'default'
    }
};

export const WithImage: Story = {
    args: {
        title: 'Card with Image',
        image: 'https://via.placeholder.com/300x200',
        variant: 'default'
    }
};

export const Success: Story = {
    args: {
        title: 'Success Card',
        variant: 'success'
    }
};

export const Warning: Story = {
    args: {
        title: 'Warning Card',
        variant: 'warning'
    }
};

export const Error: Story = {
    args: {
        title: 'Error Card',
        variant: 'error'
    }
};

export const Interactive: Story = {
    args: {
        title: 'Interactive Card',
        interactive: true
    }
};

export const Small: Story = {
    args: {
        title: 'Small Card',
        size: 'sm'
    }
};

export const Large: Story = {
    args: {
        title: 'Large Card',
        size: 'lg'
    }
};