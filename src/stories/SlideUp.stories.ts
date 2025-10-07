import type { Meta, StoryObj } from '@storybook/svelte';
import SlideUp from '../components/molecules/SlideUp.svelte';

const meta = {
    title: 'Design System/Molecules/SlideUp',
    component: SlideUp,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs'],
    argTypes: {
        isOpen: {
            control: { type: 'boolean' }
        },
        title: {
            control: { type: 'text' }
        }
    }
} satisfies Meta<typeof SlideUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        isOpen: true,
        title: 'Slide Up Panel'
    },
    render: (args) => ({
        Component: SlideUp,
        props: args,
        children: ['This is the slide up panel content. You can put any content here.']
    })
};

export const WithoutTitle: Story = {
    args: {
        isOpen: true,
        title: ''
    },
    render: (args) => ({
        Component: SlideUp,
        props: args,
        children: ['This slide up panel has no title.']
    })
};

export const Closed: Story = {
    args: {
        isOpen: false,
        title: 'Closed Panel'
    },
    render: (args) => ({
        Component: SlideUp,
        props: args,
        children: ['This panel is closed.']
    })
};