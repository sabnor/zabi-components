import type { Meta, StoryObj } from '@storybook/sveltekit';
import ConfirmDialogStory from './ConfirmDialogStory.svelte';

const meta = {
    title: 'Design System/Molecules/ConfirmDialog',
    component: ConfirmDialogStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A modal that asks before something happens. It is built on Modal and renders in document.body. The title names the dialog and the message describes it. Focus starts on Cancel for every variant, so a stray Enter never confirms. When onconfirm returns a promise the dialog shows its loading state and cannot be dismissed until the promise settles: it closes on success and stays open on failure.'
            }
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ConfirmDialogStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
    render: (args) => ({
        Component: ConfirmDialogStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'The default variant, with the primary button. A synchronous onconfirm closes the dialog unless it returns false.'
            }
        }
    }
};

export const Danger: Story = {
    args: {
        variant: 'danger',
        title: 'Delete this project?',
        message: 'The project and its files are removed for everyone. This cannot be undone.',
        confirmLabel: 'Delete',
    },
    render: (args) => ({
        Component: ConfirmDialogStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'The confirm button is the danger button and the icon changes shape, so the tone does not depend on colour. Name the action on the button: Delete, not Confirm.'
            }
        }
    }
};

export const Warning: Story = {
    args: {
        variant: 'warning',
        title: 'Transfer ownership?',
        message: 'You keep access as a member, and only the new owner can undo this.',
        confirmLabel: 'Transfer',
    },
    render: (args) => ({
        Component: ConfirmDialogStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'For a step with consequences that is not destructive.'
            }
        }
    }
};

export const AsyncConfirm: Story = {
    args: {
        variant: 'danger',
        title: 'Delete this project?',
        message: 'The project and its files are removed for everyone.',
        confirmLabel: 'Delete',
        outcome: 'resolve',
    },
    render: (args) => ({
        Component: ConfirmDialogStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'onconfirm returns a promise. Until it settles the confirm button shows its spinner, Cancel is disabled, and Escape and the backdrop do nothing. The dialog closes when the promise resolves.'
            }
        }
    }
};

export const AsyncFailure: Story = {
    args: {
        variant: 'warning',
        title: 'Transfer ownership?',
        message: 'You keep access as a member, and only the new owner can undo this.',
        confirmLabel: 'Transfer',
        outcome: 'reject',
    },
    render: (args) => ({
        Component: ConfirmDialogStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'When the promise rejects the dialog stays open, onerror receives the error, and focus returns to the confirm button. Show the error inside the dialog through children.'
            }
        }
    }
};

export const Loading: Story = {
    args: {
        loading: true,
        open: true,
    },
    render: (args) => ({
        Component: ConfirmDialogStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'The loading prop is for callers who track the request themselves. It blocks every way out until it is false again.'
            }
        }
    }
};

export const Translated: Story = {
    args: {
        variant: 'danger',
        title: 'Radera projektet?',
        message: 'Projektet och dess filer tas bort för alla.',
        confirmLabel: 'Radera',
        cancelLabel: 'Avbryt',
    },
    render: (args) => ({
        Component: ConfirmDialogStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Every string comes from props: title, message, confirmLabel and cancelLabel. There is no built-in text besides the two button defaults.'
            }
        }
    }
};
