import type { Meta, StoryObj } from '@storybook/sveltekit';
import MediaGridStory from './MediaGridStory.svelte';

const meta = {
    title: 'Design System/Molecules/MediaGrid',
    component: MediaGridStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A grid of image and video thumbnails to pick from, for a media library. It is the grid only: the modal around it, the upload button and the data stay yours. Each item is a toggle button with its delete button beside it. The grid is one Tab stop; the arrow keys move between items by the columns on screen, and Enter or Space selects. Delete only reports the item, so you can confirm before removing it.'
            }
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof MediaGridStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        Component: MediaGridStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'One item is selected at a time. The selected item has a thicker border and a check mark, and a video has a play badge. The first item cannot be deleted, so it has no delete button.'
            }
        }
    }
};

export const Multiple: Story = {
    args: {
        multiple: true,
    },
    render: (args) => ({
        Component: MediaGridStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'With multiple, any number of items can be selected and bind:selectedKeys holds their keys.'
            }
        }
    }
};

export const SelectOnly: Story = {
    args: {
        deletable: false,
    },
    render: (args) => ({
        Component: MediaGridStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Leave ondelete out for a picker that cannot change the library.'
            }
        }
    }
};

export const Loading: Story = {
    args: {
        count: 0,
        loading: true,
    },
    render: (args) => ({
        Component: MediaGridStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'While loading, placeholder tiles hold the layout and a status message tells assistive technology. With items already present, the placeholders follow them, for a next page.'
            }
        }
    }
};

export const Empty: Story = {
    args: {
        count: 0,
    },
    render: (args) => ({
        Component: MediaGridStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'An empty library shows an empty state. Change its text through strings, or replace it with the empty snippet to offer an upload button.'
            }
        }
    }
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
    render: (args) => ({
        Component: MediaGridStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Disable the grid while a delete or an upload is in flight.'
            }
        }
    }
};

export const SmallTiles: Story = {
    args: {
        count: 40,
        minTileSize: 64,
    },
    render: (args) => ({
        Component: MediaGridStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'minTileSize sets the smallest tile; the grid fits as many columns as the width allows. Narrow the preview to see the columns drop.'
            }
        }
    }
};

export const Translated: Story = {
    args: {
        translated: true,
    },
    render: (args) => ({
        Component: MediaGridStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Every built-in string comes from the strings prop: the delete button name, the video name, the loading message and the empty state. Pass only the ones you translate.'
            }
        }
    }
};
