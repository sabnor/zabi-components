import type { Meta, StoryObj } from '@storybook/sveltekit';
import Modal from '../components/molecules/Modal.svelte';

const meta = {
    title: 'Design System/Molecules/Modal',
    component: Modal,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size of the modal'
        }
    }
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

export const Small: Story = {
    args: {
        isOpen: true,
        title: 'Small Modal',
        size: 'sm'
    },
    render: (args) => ({
        Component: Modal,
        props: args,
        children: ['Small modal (max width 24rem on desktop). On mobile, all modals slide up from the bottom.']
    })
};

export const Medium: Story = {
    args: {
        isOpen: true,
        title: 'Medium Modal',
        size: 'md'
    },
    render: (args) => ({
        Component: Modal,
        props: args,
        children: ['Medium modal (max width 28rem on desktop). This is the default size.']
    })
};

export const Large: Story = {
    args: {
        isOpen: true,
        title: 'Large Modal',
        size: 'lg'
    },
    render: (args) => ({
        Component: Modal,
        props: args,
        children: ['Large modal (max width 42rem on desktop). Perfect for displaying more content.']
    })
};