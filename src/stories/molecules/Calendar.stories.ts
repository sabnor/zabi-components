import type { Meta, StoryObj } from '@storybook/sveltekit';
import CalendarStory from './CalendarStory.svelte';

const meta = {
    title: 'Design System/Molecules/Calendar',
    component: CalendarStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'One month as a grid of days. Today is marked with a ring and a heavier number, a day with events shows a dot per event (three at most), and pressing a day selects it; pressing the selected day again changes nothing. Dates are strings: YYYY-MM-DD for a day, YYYY-MM for the month, both bindable. It is an ARIA grid named by the month title, which is announced when the month changes. One day in the grid takes Tab; the arrow keys move by a day and a week and on into the next month, Home and End go to the ends of the week, Page Up and Page Down move by a month and with Shift by a year, and Enter or Space selects. The name of each day is the full date, then today, selected or unavailable, then its events; every word comes from strings. Days of other months are not shown, and a month has as many rows as it touches. The calendar is as wide as its container: days are at least 44px tall and, on a 320px screen with 16px margins, 41px wide. The stories show it in a phone-width frame with the selected day\'s events listed under it, as an app would.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        weekStartsOn: { control: 'inline-radio', options: [0, 1, 2, 3, 4, 5, 6] },
        frameWidth: { control: 'inline-radio', options: [320, 360, 390] },
    },
} satisfies Meta<typeof CalendarStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'October 2026 with events on four days. The 17th has four events and shows three dots; its name still lists all four.'
            }
        }
    }
};

export const Swedish: Story = {
    args: {
        swedish: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'locale="sv" for the month and day names, and strings for the words the calendar adds: the button names, today, selected, and the events part of a day\'s name.'
            }
        }
    }
};

export const WeekFromSunday: Story = {
    args: {
        weekStartsOn: 0,
        locale: 'en-US',
    },
    parameters: {
        docs: {
            description: {
                story: 'weekStartsOn takes 0 for Sunday to 6 for Saturday. Home and End follow it.'
            }
        }
    }
};

export const WithLimits: Story = {
    args: {
        min: '2026-10-05',
        max: '2026-11-20',
        closedMondays: true,
        startSelected: '',
    },
    parameters: {
        docs: {
            description: {
                story: 'Days before min and after max are unavailable, and the months beyond them cannot be reached: the previous button says so and does nothing. isDateDisabled closes every Monday. An unavailable day can still be focused and read, but not selected.'
            }
        }
    }
};

export const SixRows: Story = {
    args: {
        startMonth: '2026-08',
        startSelected: '',
        withoutEvents: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'August 2026 touches six weeks from Monday. A month has as many rows as it needs, four to six, so the grid does not keep an empty row on a phone; what is under it moves with it.'
            }
        }
    }
};

export const NarrowPhone: Story = {
    args: {
        frameWidth: 320,
    },
    parameters: {
        docs: {
            description: {
                story: 'A 320px screen with 16px margins leaves 288px: seven days of 41px, still 44px tall, with no gaps between them.'
            }
        }
    }
};
