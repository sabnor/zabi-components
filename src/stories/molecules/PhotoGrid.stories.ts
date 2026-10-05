import type { Meta, StoryObj } from '@storybook/sveltekit';
import GalleryStory from './GalleryStory.svelte';

const meta = {
    title: 'Design System/Molecules/PhotoGrid',
    component: GalleryStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A grid of square photo thumbnails, cropped to fill, loaded as they come into view, each under a placeholder until it has loaded. A press on a tile calls onopen with its place, which is where an app opens a PhotoViewer. With onadd an Add photo tile comes first; with max the last tile shows how many more photos there are. With selectable a press selects instead: single for one photo, where pressing it again changes nothing, and multiple for any number, where a press toggles; each tile then has a small button of its own that opens it. Left alone, the grid has 3 columns, 4 from 480px of its own width and 5 from 768px. It is one Tab stop: the arrow keys move between tiles, Home and End along a row, and with Ctrl to the first and last. Each tile is a button named by the photo\'s alt text. The stories show the grid in a phone-width frame, wired to a viewer.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        selectable: { control: 'inline-radio', options: [undefined, 'single', 'multiple'] },
        actionCount: { table: { disable: true } },
        longCaption: { table: { disable: true } },
        openAt: { table: { disable: true } },
        frameWidth: { control: 'inline-radio', options: [320, 360, 390, 800] },
    },
} satisfies Meta<typeof GalleryStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Twelve photos in three columns. Press one to open it in the viewer; when the viewer closes, focus is on the tile of the photo that was showing.'
            }
        }
    }
};

export const WithAddAndMax: Story = {
    args: {
        withAdd: true,
        max: 8,
        count: 14,
    },
    parameters: {
        docs: {
            description: {
                story: 'onadd puts an Add photo tile first: open your own file picker or an ImageUpload from it. max shows eight photos; the last tile says +6 and opens the viewer at its own photo, from where the rest can be reached.'
            }
        }
    }
};

export const SelectMultiple: Story = {
    args: {
        selectable: 'multiple',
        count: 9,
    },
    parameters: {
        docs: {
            description: {
                story: 'For choosing photos to delete. A press ticks a photo and another press unticks it. The small button in the corner of each tile opens that photo.'
            }
        }
    }
};

export const SelectSingle: Story = {
    args: {
        selectable: 'single',
        count: 6,
        columns: 3,
    },
    parameters: {
        docs: {
            description: {
                story: 'For choosing a cover photo. One photo is selected at a time, and pressing the selected one again leaves it selected.'
            }
        }
    }
};

export const WideContainer: Story = {
    args: {
        frameWidth: 800,
        count: 14,
    },
    parameters: {
        docs: {
            description: {
                story: 'At 768px of its own width and more, five columns. The count follows the width of the grid, not of the screen, so it is right in a sheet or a sidebar too.'
            }
        }
    }
};

export const NarrowPhone: Story = {
    args: {
        frameWidth: 320,
        withAdd: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'A 320px screen with 16px margins: three tiles of 93px with 4px between them.'
            }
        }
    }
};
