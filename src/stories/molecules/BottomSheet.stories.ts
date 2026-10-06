import type { Meta, StoryObj } from '@storybook/sveltekit';
import BottomSheetStory from './BottomSheetStory.svelte';

const meta = {
    title: 'Design System/Molecules/BottomSheet',
    component: BottomSheetStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A panel that slides up from the bottom of the screen for a picker, a set of filters or a short form, and rests at half or full height. It is a modal dialog like Modal, SlideUp and Drawer: focus moves in and stays in, the page behind does not scroll, and Escape, the backdrop, the close button or a swipe down close it and return focus to what opened it. The grip at the top drags the sheet between its snap points and is also a button that moves it a step, so the same is there for a keyboard and a screen reader. A swipe on the content scrolls the content, and moves the sheet only when the content is at its top. Full height stops at the status bar; the footer keeps clear of the home indicator. From the md breakpoint up the sheet stays on the bottom edge, centred and at most 40rem wide. For a form or a picker, pass initialFocus to its first field, or focus starts on the grip. The sheet does not follow the on-screen keyboard: with a real keyboard up, a sheet at half height may leave its footer behind it (not verified on a device), so open a sheet with fields at full height. View these stories at a phone width.'
            }
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof BottomSheetStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        Component: BottomSheetStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Half and full. Drag the grip up to full and back, or press it; drag or flick it down past half to close. The list scrolls under a finger, and a swipe down moves the sheet only from the top of the list.'
            }
        }
    }
};

export const Full: Story = {
    args: {
        startSnap: 'full',
    },
    render: (args) => ({
        Component: BottomSheetStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Opened at full height through snap. The grip is now named Collapse, and the close button is still in reach below the status bar.'
            }
        }
    }
};

export const OneSnapPoint: Story = {
    args: {
        snapPoints: ['half'],
        form: true,
        title: 'Rename team',
    },
    render: (args) => ({
        Component: BottomSheetStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'A short form at half height only. With one snap point the grip is not a button: it only drags, down to close. Focus starts in the field through initialFocus.'
            }
        }
    }
};

export const WithDescription: Story = {
    args: {
        description: 'The page moves to the team you pick.',
    },
    render: (args) => ({
        Component: BottomSheetStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'The description is read out with the dialog. It scrolls with the content, so it takes nothing from a sheet at half height.'
            }
        }
    }
};

export const NotDismissible: Story = {
    args: {
        dismissible: false,
    },
    render: (args) => ({
        Component: BottomSheetStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Escape, the backdrop, the close button and a swipe down do nothing. The grip still moves the sheet between its heights, and Done closes it, because the page sets isOpen itself.'
            }
        }
    }
};
