import type { Meta, StoryObj } from '@storybook/sveltekit';
import Container from '../../components/atoms/Container.svelte';

const meta = {
    title: 'Design System/Atoms/Container',
    component: Container,
    tags: ['autodocs'],
    argTypes: {
        maxWidth: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
        },
        padded: { control: 'boolean' },
    },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        as: 'div',
        maxWidth: 'lg',
        padded: true,
    },
    render: (args) => ({
        Component: Container,
        props: args,
        children: [
            'Centered content respects max width and horizontal padding.',
        ],
    }),
};
