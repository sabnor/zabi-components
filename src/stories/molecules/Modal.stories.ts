import type { Meta, StoryObj } from '@storybook/sveltekit';
import Modal from '../../components/molecules/Modal.svelte';
import ModalWithContent from './ModalWithContent.svelte';

const meta = {
    title: 'Design System/Molecules/Modal',
    component: Modal,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Modal component with focus trap and keyboard navigation. Press Escape to close, Tab to navigate within modal. Focus is automatically returned to the trigger element when closed. Set portal to render the overlay in document.body, use onclose to learn why it closed, and set dismissible to false to block closing while an action is pending.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size of the modal'
        },
        role: {
            control: 'select',
            options: ['dialog', 'alertdialog'],
            description: 'alertdialog for a dialog that interrupts to ask for a response'
        },
        closeLabel: {
            control: 'text',
            description: 'Accessible name of the close button'
        },
        portal: {
            control: 'boolean',
            description: 'Render the overlay in document.body'
        },
        dismissible: {
            control: 'boolean',
            description: 'Let Escape, the backdrop and the close button close the modal'
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

export const WithContentAndButtons: Story = {
    args: {
        isOpen: true,
        title: 'Dialog title',
        size: 'md'
    },
    render: (args) => ({
        Component: ModalWithContent,
        props: args
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

/** Rendered in `document.body`, out of reach of a transformed or clipped ancestor. */
export const Portalled: Story = {
    args: {
        isOpen: true,
        title: 'Portalled modal',
        portal: true
    },
    render: (args) => ({
        Component: ModalWithContent,
        props: args
    })
};

/** Escape, the backdrop and the close button do nothing; the footer actions close it. */
export const NotDismissible: Story = {
    args: {
        isOpen: true,
        title: 'Saving changes',
        dismissible: false
    },
    render: (args) => ({
        Component: ModalWithContent,
        props: args
    })
};
