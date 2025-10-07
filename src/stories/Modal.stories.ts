import type { Meta, StoryObj } from '@storybook/svelte';
import Modal from '../components/molecules/Modal.svelte';

const meta = {
    title: 'Design System/Molecules/Modal',
    component: Modal,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        isOpen: true,
        title: 'Modal Title'
    },
    render: (args) => ({
        Component: Modal,
        props: args,
        children: ['This is the modal content. You can put any content here.']
    })
};

export const WithoutTitle: Story = {
    args: {
        isOpen: true,
        title: ''
    },
    render: (args) => ({
        Component: Modal,
        props: args,
        children: ['This modal has no title.']
    })
};

export const Closed: Story = {
    args: {
        isOpen: false,
        title: 'Closed Modal'
    },
    render: (args) => ({
        Component: Modal,
        props: args,
        children: ['This modal is closed.']
    })
};