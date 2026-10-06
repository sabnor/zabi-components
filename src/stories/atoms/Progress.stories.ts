import type { Meta, StoryObj } from '@storybook/sveltekit';
import Progress from '../../components/atoms/Progress.svelte';
import SegmentedSizesStory from './ProgressSegmentedSizesStory.svelte';

const meta = {
    title: 'Design System/Atoms/Progress',
    component: Progress,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Progress indicator for long-running operations. Use for uploads, processing, and task completion feedback.'
            }
        }
    },
    tags: ['autodocs']
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Upload progress',
        value: 45,
        max: 100,
        size: 'md',
        class: 'w-80'
    }
};

export const Empty: Story = {
    args: {
        label: 'Waiting to start',
        value: 0,
        class: 'w-80'
    }
};

export const Complete: Story = {
    args: {
        label: 'Import complete',
        value: 100,
        max: 100,
        size: 'md',
        class: 'w-80'
    }
};

export const CustomMaximum: Story = {
    args: {
        label: 'Seats used: 6 of 10',
        value: 6,
        max: 10,
        class: 'w-80'
    },
    parameters: {
        docs: {
            description: {
                story: 'value and max can be any scale. The percentage beside the label is worked out from the two.'
            }
        }
    }
};

export const Small: Story = {
    args: {
        label: 'Storage',
        value: 30,
        size: 'sm',
        class: 'w-80'
    }
};

export const Large: Story = {
    args: {
        label: 'Processing',
        value: 70,
        max: 100,
        size: 'lg',
        class: 'w-80'
    }
};

export const WithoutLabel: Story = {
    args: {
        value: 60,
        class: 'w-80',
        'aria-label': 'Profile completeness'
    } as Story['args'],
    parameters: {
        docs: {
            description: {
                story: 'Without a visible label, pass aria-label so screen readers can say what is progressing.'
            }
        }
    }
};

export const ExtraLarge: Story = {
    name: 'Extra large',
    args: {
        label: 'Processing',
        value: 55,
        size: 'xl',
        class: 'w-80'
    }
};

export const Segmented: Story = {
    args: {
        label: 'Round',
        value: 4,
        max: 19,
        segmented: true,
        class: 'w-80'
    },
    parameters: {
        docs: {
            description: {
                story: 'segmented draws max separate segments (a whole number from 2 to 24), value of them filled. Screen readers get one progressbar with the text "4 of 19". Any other max draws the continuous bar.'
            }
        }
    }
};

export const SegmentedSizes: Story = {
    name: 'Segmented, in each size',
    render: (() => ({ Component: SegmentedSizesStory })) as unknown as Story['render'],
    parameters: {
        docs: {
            description: {
                story: '4 of 19 and 3 of 5, in all four sizes.'
            }
        }
    }
};
