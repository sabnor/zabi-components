import type { Meta, StoryObj } from '@storybook/sveltekit';
import DateTimeFieldStory from './DateTimeFieldStory.svelte';

const meta = {
    title: 'Design System/Atoms/TimeField',
    component: DateTimeFieldStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A native input of type time, styled like Input: an iPhone, an Android phone and a desktop browser each open their own time picker. The value is always 24-hour HH:mm, or an empty string, whatever the field shows. Without a locale, what it shows is the browser\'s decision: 24-hour or 12-hour time by the settings of the browser or device, not of the page. With a locale (see With locale) the field shows the time in that language and opens the library\'s own hours and minutes columns in a sheet; the native input stays in the form, out of sight, and is what shows without scripts. To show the value as text in the language of the page, use formatTime from the package, as the line under each story does. Label, hint and error are wired to the field as in Input, the sizes are Input\'s (at least 44px on a touch screen), and inside a FormField the field takes its label and description from it. The text is 16px below the sm breakpoint, so iOS does not zoom the page on focus.'
            }
        }
    },
    tags: ['autodocs'],
    args: {
        kind: 'time',
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
        min: '17:00',
        max: '23:00',
        step: 900,
        hint: 'In steps of 15 minutes.',
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
        startValue: '16:00',
        error: 'The pub opens at 17:00.',
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

export const WithLocale: Story = {
    args: { kind: 'time', fieldLocale: 'sv', startValue: '18:30', label: 'Tid' },
    parameters: {
        docs: {
            description: {
                story: 'With locale="sv" the field shows "18:30", never "06:30 PM", whatever the browser or device is set to. The native input stays as the form control and submits 18:30. Until the page has run, and without scripts, it is the native input.'
            }
        }
    }
};

export const WithLocaleEmpty: Story = {
    args: { kind: 'time', fieldLocale: 'sv', startValue: '', label: 'Tid', placeholder: 'Välj tid' },
    parameters: {
        docs: { description: { story: 'Empty: the placeholder, in the placeholder colour, at the height of a filled field.' } }
    }
};

export const WithLocaleAndFormat: Story = {
    args: { kind: 'time', fieldLocale: 'en-US', startValue: '18:30', label: 'Time', format: { hour: 'numeric', minute: '2-digit', hour12: true } },
    parameters: {
        docs: { description: { story: 'format is a set of Intl.DateTimeFormat options. The value stays 24-hour HH:mm.' } }
    }
};

export const WithLocaleNativePicker: Story = {
    args: { kind: 'time', fieldLocale: 'sv', startValue: '18:30', label: 'Tid', picker: 'native' },
    parameters: {
        docs: { description: { story: 'picker="native": the field shows the time in the locale, and pressing it opens the platform\'s own time picker. A step under 60 seconds does the same.' } }
    }
};

export const WithLocaleLimits: Story = {
    args: { kind: 'time', fieldLocale: 'sv', startValue: '18:30', label: 'Tid', min: '17:00', max: '21:30', step: 900, hint: 'Mellan 17:00 och 21:30, var 15:e minut.' },
    parameters: {
        docs: { description: { story: 'min and max disable the hours and minutes outside; step is in seconds, so 900 is every 15 minutes.' } }
    }
};

export const WithLocaleError: Story = {
    args: { kind: 'time', fieldLocale: 'sv', startValue: '', label: 'Tid', placeholder: 'Välj tid', required: true, error: 'Välj en tid.' },
    parameters: {
        docs: { description: { story: 'An error marks the field with the error edge colour and is announced with it.' } }
    }
};

export const WithLocalePickerOpen: Story = {
    args: { kind: 'time', fieldLocale: 'sv', startValue: '18:30', label: 'Tid', openOnMount: true },
    parameters: {
        layout: 'fullscreen',
        docs: { description: { story: 'The library\'s picker, open: hours and minutes in two columns in a sheet titled with the label; Done sets the time, Clear empties the field.' } }
    }
};
