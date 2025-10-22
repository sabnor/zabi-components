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
        title: 'Card Title'
    }
};

export const WithImage: Story = {
    args: {
        title: 'Card with Image',
        image: 'https://via.placeholder.com/300x200'
    }
};

export const Success: Story = {
    args: {
        title: 'Success Card'
    }
};

export const Warning: Story = {
    args: {
        title: 'Warning Card'
    }
};

export const Error: Story = {
    args: {
        title: 'Error Card'
    }
};

export const Interactive: Story = {
    args: {
        title: 'Interactive Card'
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