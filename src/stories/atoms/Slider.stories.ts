import type { Meta, StoryObj } from '@storybook/sveltekit';
import Slider from '../../components/atoms/Slider.svelte';

const meta = {
    title: 'Design System/Atoms/Slider',
    component: Slider,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A native range input in the library\'s colours. Because it is native, the keyboard (arrow keys, Home, End, Page Up and Page Down), touch, right-to-left layouts and form submission work as the browser provides them. Use bind:value for the number, showValue to display it, and formatValue to add a unit; the formatted text is also what a screen reader reads.'
            }
        }
    },
    argTypes: {
        size: {
            control: 'inline-radio',
            options: ['sm', 'md', 'lg']
        },
        variant: {
            control: 'inline-radio',
            options: ['default', 'success', 'warning', 'error']
        }
    },
    tags: ['autodocs']
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Volume',
        value: 40
    },
    parameters: {
        docs: {
            description: {
                story: 'From 0 to 100 in steps of 1 unless min, max and step say otherwise.'
            }
        }
    }
};

export const WithValue: Story = {
    args: {
        label: 'Image quality',
        value: 80,
        min: 10,
        max: 100,
        step: 10,
        showValue: true,
        formatValue: (value: number) => `${value} %`,
        message: 'Lower quality makes smaller files.'
    },
    parameters: {
        docs: {
            description: {
                story: 'showValue puts the current value beside the label. formatValue adds the unit, for the display and for assistive technology.'
            }
        }
    }
};

export const Small: Story = {
    args: {
        label: 'Opacity',
        value: 20,
        size: 'sm',
        showValue: true
    },
    parameters: {
        docs: {
            description: {
                story: 'The row is 32, 40 or 48px tall, the same scale as Input and Button, so a slider lines up with them in a toolbar.'
            }
        }
    }
};

export const Large: Story = {
    args: {
        label: 'Brightness',
        value: 70,
        size: 'lg',
        showValue: true
    }
};

export const Disabled: Story = {
    args: {
        label: 'Locked by your plan',
        value: 30,
        showValue: true,
        disabled: true
    }
};

export const WithError: Story = {
    args: {
        label: 'Zoom',
        value: 8,
        min: 1,
        max: 10,
        showValue: true,
        formatValue: (value: number) => `${value}x`,
        variant: 'error',
        message: 'Above 6x the image is too blurred to print.'
    },
    parameters: {
        docs: {
            description: {
                story: 'An error message is tied to the input and marks it invalid.'
            }
        }
    }
};

export const WithoutVisibleLabel: Story = {
    args: {
        'aria-label': 'Volume',
        value: 40,
        showValue: true
    },
    parameters: {
        docs: {
            description: {
                story: 'Without a label the value sits at the end of the track. Give the input a name with aria-label.'
            }
        }
    }
};
