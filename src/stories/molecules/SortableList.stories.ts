import type { Meta, StoryObj } from '@storybook/sveltekit';
import SortableListStory from './SortableListStory.svelte';

const meta = {
    title: 'Design System/Molecules/SortableList',
    component: SortableListStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A list whose order the user can change. It owns the ordering only: the drag handle, the move buttons, the keyboard model and the announcements. You render each row with the item snippet. On the handle, Arrow Up and Arrow Down move the item one place and Home and End move it to the start or the end; every move is announced in a polite live region. Dragging works with mouse and touch, and Escape cancels a drag.'
            }
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SortableListStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        Component: SortableListStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Drag the handle, focus it and press the arrow keys, or use the move buttons. The buttons at the two ends are disabled.'
            }
        }
    }
};

export const CardsWithHandleInHeader: Story = {
    args: {
        cards: true,
    },
    render: (args) => ({
        Component: SortableListStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'With controls="manual" the list renders only your snippet, and the snippet places row.handle and row.moveButtons itself. Use it when the handle belongs inside a card header.'
            }
        }
    }
};

export const HandleOnly: Story = {
    args: {
        cards: true,
        showMoveButtons: false,
    },
    render: (args) => ({
        Component: SortableListStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'A dense header can leave the move buttons out. The arrow keys on the handle still reorder, so the list stays usable without a pointer.'
            }
        }
    }
};

export const DisabledItem: Story = {
    args: {
        lockLast: true,
    },
    render: (args) => ({
        Component: SortableListStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'isItemDisabled turns off one item\'s own controls. Other items can still be moved past it, so use it for an item the user may not move, not for a fixed position.'
            }
        }
    }
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
    render: (args) => ({
        Component: SortableListStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Disable the whole list while a save is in flight, or for a reader who may not reorder.'
            }
        }
    }
};

export const Translated: Story = {
    args: {
        translated: true,
    },
    render: (args) => ({
        Component: SortableListStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Every built-in string comes from the strings prop: the handle name and its description, the move button names, and the two announcements. Pass only the ones you translate.'
            }
        }
    }
};
