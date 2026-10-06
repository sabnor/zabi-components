import type { Meta, StoryObj } from '@storybook/sveltekit';
import GalleryStory from './GalleryStory.svelte';

const meta = {
    title: 'Design System/Molecules/PhotoViewer',
    component: GalleryStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Photos one at a time on the whole screen. Touch: swipe sideways between photos, pinch or double tap to zoom, drag to pan while zoomed, swipe down to close. Keyboard: Left and Right change photo (and pan while zoomed), Page Up and Page Down always change photo, Home and End go to the first and last, plus and minus zoom and 0 goes back to fitted, Escape leaves the zoom first and closes on the next press. Mouse: the previous, next and close buttons, a double click or Ctrl with the wheel to zoom, a drag to pan. It is a modal dialog: focus stays inside, the page behind does not scroll, and when it closes focus goes to the tile of the photo that was showing, or to whatever opened it. The photo\'s alt text and its place are read out when the photo changes. The viewer is black behind the photo in both themes; every control, the counter and the caption sit on opaque plates in the theme\'s own surface colour, inside the safe areas. The thumbnail is shown blurred until the full image has loaded, in the same box, and the photos before and after are loaded ahead. Actions are yours: the viewer shares, downloads and deletes nothing itself. View these stories at a phone width.'
            }
        }
    },
    tags: ['autodocs'],
    args: {
        openAt: 2,
    },
    argTypes: {
        columns: { table: { disable: true } },
        max: { table: { disable: true } },
        selectable: { table: { disable: true } },
        withAdd: { table: { disable: true } },
        frameWidth: { table: { disable: true } },
        actionCount: { control: 'inline-radio', options: [0, 2, 4] },
    },
} satisfies Meta<typeof GalleryStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Open at the second photo, with no actions. Close it and press a tile to open it again.'
            }
        }
    }
};

export const WithActions: Story = {
    args: {
        actionCount: 2,
    },
    parameters: {
        docs: {
            description: {
                story: 'Up to three actions are labelled buttons under the photo. Delete here removes the photo: the viewer shows the one that takes its place, and closes when none is left.'
            }
        }
    }
};

export const ManyActions: Story = {
    args: {
        actionCount: 4,
    },
    parameters: {
        docs: {
            description: {
                story: 'With more than three, two are buttons and the rest are in a menu that opens upwards and stays on the screen.'
            }
        }
    }
};

export const LongCaption: Story = {
    args: {
        longCaption: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'A caption is two lines at most. A longer one has a More button that unfolds it, on a plate that scrolls and takes no more than 40% of the screen.'
            }
        }
    }
};

export const SinglePhoto: Story = {
    args: {
        count: 1,
        openAt: 1,
    },
    parameters: {
        docs: {
            description: {
                story: 'With one photo there are no previous and next buttons. Zoom, pan and close work as usual.'
            }
        }
    }
};
