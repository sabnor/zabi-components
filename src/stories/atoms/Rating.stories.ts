import type { Meta, StoryObj } from '@storybook/sveltekit';
import Rating from '../../components/atoms/Rating.svelte';
import RatingCompactSizesStory from './RatingCompactSizesStory.svelte';

const meta = {
    title: 'Design System/Atoms/Rating',
    component: Rating,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A star rating from 1 to max that can be left empty. It is a radio group of native radio inputs named by label: each star reads as "4 of 5 stars", the arrow keys change the value, and name submits it with a form. Every star is a 44px target at every size. A single selection never clears on a repeat press, so pressing the selected star again does nothing; clearable adds a clear button beside the stars, and Delete or Backspace clears too. readonly turns it into one image with one name, where a star can be partly filled and the number is shown beside the stars; it has no inputs, so it submits nothing, even with name. Pass strings and formatValue to translate. Use it on page, card and inset surfaces: on the dark elevated surface the outline of an empty star is 2.49:1, under the 3:1 it has everywhere else.'
            }
        }
    },
    argTypes: {
        size: {
            control: 'inline-radio',
            options: ['sm', 'md', 'lg', 'xl', 'display']
        },
        value: {
            control: { type: 'number', min: 0, max: 5, step: 0.5 }
        }
    },
    tags: ['autodocs']
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Quiz',
        value: null
    },
    parameters: {
        docs: {
            description: {
                story: 'Starts empty: no star is selected, and the group is still one Tab stop. Without clearable, a rating that was given can be changed but not removed.'
            }
        }
    }
};

export const WithValue: Story = {
    args: {
        label: 'Quiz',
        value: 4
    }
};

export const Clearable: Story = {
    args: {
        label: 'Food',
        value: 3,
        clearable: true
    },
    parameters: {
        docs: {
            description: {
                story: 'The clear button sits beside the stars while there is a rating to clear. Delete and Backspace clear from the keyboard. Pressing the selected star again does nothing.'
            }
        }
    }
};

export const ReadOnlyAverage: Story = {
    args: {
        label: 'Pub score',
        value: 3.5,
        readonly: true
    },
    parameters: {
        docs: {
            description: {
                story: 'An average: the fourth star is half filled and the number is beside the stars. It is read as "Pub score, 3.5 of 5 stars".'
            }
        }
    }
};

export const ReadOnlyWithoutRating: Story = {
    args: {
        label: 'Pub score',
        value: null,
        readonly: true
    },
    parameters: {
        docs: {
            description: {
                story: 'Without a value the stars are empty and the text says so. Replace it with strings.noRating.'
            }
        }
    }
};

export const Translated: Story = {
    args: {
        label: 'Snitt',
        value: 4.3,
        readonly: true,
        formatValue: (value: number) => value.toFixed(1).replace('.', ','),
        strings: {
            starLabel: (value: string, max: number) => `${value} av ${max} stjärnor`,
            clearLabel: 'Rensa betyg',
            noRating: 'Inget betyg'
        }
    },
    parameters: {
        docs: {
            description: {
                story: 'formatValue writes the number for a locale, and strings replaces every built-in text.'
            }
        }
    }
};

export const Small: Story = {
    args: {
        label: 'Service',
        value: 3,
        size: 'sm'
    },
    parameters: {
        docs: {
            description: {
                story: 'Stars are 20, 24 or 32px. The target around an interactive star is 44px at sm and md, and 48px at lg.'
            }
        }
    }
};

export const Large: Story = {
    args: {
        label: 'Service',
        value: 3,
        size: 'lg',
        clearable: true
    }
};

export const WithShownValue: Story = {
    args: {
        label: 'Atmosphere',
        value: 4,
        showValue: true
    },
    parameters: {
        docs: {
            description: {
                story: 'showValue is on by default when readonly; here it is turned on for an interactive rating.'
            }
        }
    }
};

export const Disabled: Story = {
    args: {
        label: 'Locked',
        value: 3,
        clearable: true,
        disabled: true
    }
};

export const WithoutVisibleLabel: Story = {
    args: {
        label: 'Quiz',
        hideLabel: true,
        value: 2
    },
    parameters: {
        docs: {
            description: {
                story: 'hideLabel keeps the label as the accessible name only, for a row that shows its own heading. aria-label and aria-labelledby work too.'
            }
        }
    }
};

const comma = (value: number) => value.toFixed(1).replace('.', ',');

export const Compact: Story = {
    args: { compact: true, value: 3.5, max: 5, formatValue: comma },
    parameters: {
        docs: {
            description: {
                story: 'A score for a list: one filled star and the number, from the real value and max. It is one image named "3.5 of 5 stars" (the number is not read twice). Sizes sm, md, lg, xl and display (a 40px star and a 48px number in the display face). label names it, and shows beside it unless hideLabel.'
            }
        }
    }
};

export const CompactSizes: Story = {
    args: { compact: true, value: 3.5 },
    render: () => ({ Component: RatingCompactSizesStory }) as any,
    parameters: {
        docs: { description: { story: 'All five sizes with 3.5 and a comma: sm, md, lg, xl and display.' } }
    }
};

export const CompactWithLabel: Story = {
    args: { compact: true, value: 4, label: 'Pub score', size: 'lg', formatValue: comma }
};

export const ExtraLargeInput: Story = {
    args: { label: 'Quiz', value: null, size: 'xl' },
    parameters: {
        docs: { description: { story: 'An input with 40px stars. Each star is still a 48px target.' } }
    }
};

export const SoftEmptyState: Story = {
    args: { label: 'Quiz', value: 2, size: 'xl', empty: 'soft' },
    parameters: {
        docs: {
            description: {
                story: 'An empty star is a soft fill instead of an outline (--zabi-rating-off-fill). The soft fill is below 3:1 against the page, so keep the label and value visible. Read-only: set readonly and value 3.5 to see the half star on the soft one.'
            }
        }
    }
};

export const SoftEmptyReadOnly: Story = {
    args: { label: 'Pub score', value: 3.5, readonly: true, empty: 'soft' }
};

export const CompactNoRating: Story = {
    args: { compact: true, value: null },
    parameters: {
        docs: { description: { story: 'No rating: an empty star and "No rating", named the same way.' } }
    }
};
