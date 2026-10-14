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
                    'A native input of type date, styled like Input: an iPhone, an Android phone and a desktop browser each open their own date picker. The value is always YYYY-MM-DD, or an empty string, whatever the field shows. Without a locale, what it shows is the browser\'s decision: the date in the format of the browser or device, not of the page. With a locale (see With locale) the field shows the date in that language and opens the library\'s own Calendar in a sheet; the native input stays in the form, out of sight, and is what shows without scripts. To show the value as text in the language of the page, use formatDate from the package, as the line under each story does. Label, hint and error are wired to the field as in Input, the sizes are Input\'s (at least 44px on a touch screen), and inside a FormField the field takes its label and description from it. The text is 16px below the sm breakpoint, so iOS does not zoom the page on focus.'
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

export const WithLocale: Story = {
    args: { fieldLocale: 'sv', startValue: '2026-11-10', label: 'Datum' },
    parameters: {
        docs: {
            description: {
                story: 'With locale="sv" the field shows the date in Swedish whatever language the browser is in: "10 nov. 2026". The native input stays as the form control, out of sight, and submits 2026-11-10. Until the page has run, and without scripts, it is the native input.'
            }
        }
    }
};

export const WithLocaleEmpty: Story = {
    args: { fieldLocale: 'sv', startValue: '', label: 'Datum', placeholder: 'Välj datum' },
    parameters: {
        docs: { description: { story: 'Empty: the placeholder, in the placeholder colour, at the height of a filled field.' } }
    }
};

export const WithLocaleAndFormat: Story = {
    args: { fieldLocale: 'sv', startValue: '2026-10-06', label: 'Datum', format: { weekday: 'short', day: 'numeric', month: 'short' } },
    parameters: {
        docs: { description: { story: 'format is a set of Intl.DateTimeFormat options: weekday, day and month give "tis 6 okt". The value stays YYYY-MM-DD.' } }
    }
};

export const WithLocaleNativePicker: Story = {
    args: { fieldLocale: 'sv', startValue: '2026-11-10', label: 'Datum', picker: 'native' },
    parameters: {
        docs: { description: { story: 'picker="native": the field shows the date in the locale, and pressing it opens the platform\'s own date picker. Where the browser cannot open it from the button, the native input is shown instead.' } }
    }
};

export const WithLocaleLimits: Story = {
    args: { fieldLocale: 'sv', startValue: '2026-11-10', label: 'Datum', min: '2026-11-05', max: '2026-11-25', hint: 'Mellan 5 och 25 november.' },
    parameters: {
        docs: { description: { story: 'min and max: days outside are unavailable in the calendar and cannot be chosen.' } }
    }
};

export const WithLocaleError: Story = {
    args: { fieldLocale: 'sv', startValue: '', label: 'Datum', placeholder: 'Välj datum', required: true, error: 'Välj ett datum.' },
    parameters: {
        docs: { description: { story: 'An error marks the field with the error edge colour and is announced with it.' } }
    }
};

export const WithLocalePickerOpen: Story = {
    args: { fieldLocale: 'sv', startValue: '2026-11-10', label: 'Datum', openOnMount: true },
    parameters: {
        layout: 'fullscreen',
        docs: { description: { story: 'The library\'s picker, open: the Calendar in a sheet titled with the label. Choosing a day sets the value and closes it; Clear empties the field.' } }
    }
};
