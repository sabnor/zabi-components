import type { Meta, StoryObj } from '@storybook/sveltekit';
import ImageUpload from '../../components/molecules/ImageUpload.svelte';
import ImageUploadMediaLibraryStory from './ImageUploadMediaLibraryStory.svelte';

const meta = {
    title: 'Design System/Molecules/ImageUpload',
    component: ImageUpload,
    parameters: {
        docs: {
            description: {
                component:
                    'File input with an image or video preview, an accept filter, drag and drop, and a clear control. Give it a label to name the dropzone and its actions.'
            }
        },
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof ImageUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: null,
        disabled: false,
        accept: 'image/*',
        placeholder: 'No image selected'
    }
};

export const WithImage: Story = {
    args: {
        value: 'https://placehold.co/300x200',
        disabled: false,
        accept: 'image/*',
        placeholder: 'No image selected'
    }
};

export const Disabled: Story = {
    args: {
        value: null,
        disabled: true,
        accept: 'image/*',
        placeholder: 'Upload disabled'
    }
};

export const CustomAccept: Story = {
    args: {
        value: null,
        disabled: false,
        accept: 'image/png,image/jpeg',
        placeholder: 'Select PNG or JPEG image'
    }
};

export const ErrorState: Story = {
    args: {
        value: null,
        disabled: false,
        accept: 'image/*',
        placeholder: 'No image selected',
        errorMessage: 'We could not process this file. Please upload a valid image and try again.'
    }
};

export const WithLabel: Story = {
    args: {
        label: 'Logo',
        value: 'https://placehold.co/300x200',
        alt: 'Placeholder logo'
    },
    parameters: {
        docs: {
            description: {
                story: 'The label names the dropzone, and Change and Remove are announced as "Change Logo" and "Remove Logo". On a touch screen the actions stay visible as a strip instead of waiting for hover.'
            }
        }
    }
};

export const VideoPreview: Story = {
    args: {
        label: 'Hero video',
        accept: 'image/*,video/*',
        value: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
    },
    parameters: {
        docs: {
            description: {
                story: 'A value ending in a video extension, or a picked video file, previews as a video with native controls. It never autoplays. Set `previewType` for a URL with no extension.'
            }
        }
    }
};

export const MediaLibrary: Story = {
    args: {
        label: 'Cover image',
        placeholder: 'No media selected',
        browseText: 'Click to open the media library'
    },
    render: (args) => ({
        Component: ImageUploadMediaLibraryStory,
        props: args
    }),
    parameters: {
        docs: {
            description: {
                story: '`onbrowse` replaces the native file chooser, here with a picker that returns a stored URL.'
            }
        }
    }
};

export const CustomCopy: Story = {
    args: {
        label: 'Logotyp',
        placeholder: 'Ingen bild vald',
        browseText: 'Klicka eller släpp en fil här',
        errorMessage: 'Filen är större än 2 MB.',
        errorTitle: 'Uppladdningen misslyckades',
        errorRecovery: false
    }
};
