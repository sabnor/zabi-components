import type { Meta, StoryObj } from '@storybook/sveltekit';
import DateTimeFieldStory from './DateTimeFieldStory.svelte';

const meta = {
    title: 'Design System/Atoms/DateField',
    component: DateTimeFieldStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A native input of type date, styled like Input: an iPhone, an Android phone and a desktop browser each open their own date picker. The value is always YYYY-MM-DD, or an empty string, whatever the field shows. What it shows is the browser\'s decision: the date in the format of the browser or device, not of the page, and no attribute changes that. To show the value as text in the language of the page, use formatDate from the package, as the line under each story does. Label, hint and error are wired to the field as in Input, the sizes are Input\'s (at least 44px on a touch screen), and inside a FormField the field takes its label and description from it. The text is 16px below the sm breakpoint, so iOS does not zoom the page on focus.'
            }
        }
    },
    tags: ['autodocs'],
    args: {
        kind: 'date',
    },
    argTypes: {
        kind: { table: { disable: true } },
        size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    },
} satisfies Meta<typeof DateTimeFieldStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Bound to a value. Change it with the picker or the keyboard: the value under it stays in the native format, and the text follows in Swedish.'
            }
        }
    }
};

export const Empty: Story = {
    args: {
        startValue: '',
        required: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Empty and required. The field keeps its height and width; a desktop browser shows its format as a hint, in the placeholder colour, and a phone shows nothing until a value is picked.'
            }
        }
    }
};

export const WithLimitsAndHint: Story = {
    args: {
        min: '2026-10-01',
        max: '2026-12-31',
        hint: 'Teams can join until the end of this day.',
    },
    parameters: {
        docs: {
            description: {
                story: 'min, max and step are the browser\'s to enforce, in its picker and its validation. The hint is read out with the field.'
            }
        }
    }
};

export const WithError: Story = {
    args: {
        startValue: '2026-09-15',
        error: 'Pick a day in October or later.',
    },
    parameters: {
        docs: {
            description: {
                story: 'An error marks the field invalid, is announced, and is read out with the field.'
            }
        }
    }
};

export const InFormField: Story = {
    args: {
        inFormField: true,
        required: true,
        hint: 'Shown in the invitation.',
    },
    parameters: {
        docs: {
            description: {
                story: 'Inside FormField: hide the field\'s own label and spread the props the FormField hands to its control. Label, description, required and error then come from the FormField.'
            }
        }
    }
};

export const Small: Story = {
    args: { size: 'sm' },
    parameters: {
        docs: { description: { story: '32px tall with a mouse, 44px on a touch screen.' } }
    }
};

export const Large: Story = {
    args: { size: 'lg' },
    parameters: {
        docs: { description: { story: '48px tall: the size for a phone-first form.' } }
    }
};

export const ReadOnly: Story = {
    args: { readonly: true },
    parameters: {
        docs: { description: { story: 'Shows the value without letting it be changed; it is still submitted with a form.' } }
    }
};

export const Disabled: Story = {
    args: { disabled: true },
    parameters: {
        docs: { description: { story: 'Cannot be changed and is not submitted.' } }
    }
};
