import type { Meta, StoryObj } from '@storybook/sveltekit';
import Text from '../../components/atoms/Text.svelte';

const meta = {
    title: 'Design System/Atoms/Text',
    component: Text,
    tags: ['autodocs'],
    argTypes: {
        tone: {
            control: 'select',
            options: ['body', 'description', 'caption', 'headline', 'label', 'error'],
        },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
    },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {
    args: {
        tone: 'body',
        size: 'md',
    },
    render: (args) => ({
        Component: Text,
        props: args,
        children: ['The quick brown fox jumps over the lazy dog.'],
    }),
};

export const Error: Story = {
    args: {
        tone: 'error',
        size: 'sm',
    },
    render: (args) => ({
        Component: Text,
        props: args,
        children: ['Please enter a valid email address.'],
    }),
};
