import type { Meta, StoryObj } from '@storybook/sveltekit';
import { CalendarDays, List } from '@lucide/svelte';
import SegmentedControl from '../../components/molecules/SegmentedControl.svelte';

const meta = {
    title: 'Design System/Molecules/SegmentedControl',
    component: SegmentedControl,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Two to four choices in one row, such as List and Month, or Going, Maybe and Can\'t. It is a radio group of native radio inputs, not tabs: one segment is selected, the arrow keys move and select, the group is one Tab stop, and name submits the value with a form. Pressing the selected segment again does nothing. Give the group a name with label, or with aria-labelledby when a visible heading already says it. Segments share the row equally and stay at least 44px tall on a touch screen; a long label wraps onto a second line, and the segments fold into rows when the text is zoomed too far for one row.'
            }
        }
    },
    argTypes: {
        size: {
            control: 'inline-radio',
            options: ['sm', 'md', 'lg']
        }
    },
    tags: ['autodocs']
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

const views = [
    { value: 'list', label: 'List' },
    { value: 'month', label: 'Month' }
];

export const Default: Story = {
    args: {
        label: 'View',
        options: views,
        value: 'list'
    },
    parameters: {
        docs: {
            description: {
                story: 'Two segments of equal width. The selected one carries the primary action fill.'
            }
        }
    }
};

export const ThreeOptionsUnanswered: Story = {
    args: {
        label: 'Are you coming on Thursday?',
        options: [
            { value: 'going', label: 'Going' },
            { value: 'maybe', label: 'Maybe' },
            { value: 'no', label: 'Can\'t' }
        ]
    },
    parameters: {
        docs: {
            description: {
                story: 'Without a value nothing is selected, and the first segment takes Tab. Once an answer is given it can be changed but not removed.'
            }
        }
    }
};

export const FourOptions: Story = {
    args: {
        label: 'Period',
        options: [
            { value: 'day', label: 'Day' },
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
            { value: 'year', label: 'This year' }
        ],
        value: 'week'
    },
    parameters: {
        docs: {
            description: {
                story: 'Four is the most a row holds. They share one row on a 320px screen; a label that does not fit wraps onto a second line.'
            }
        }
    }
};

export const WithIcons: Story = {
    args: {
        label: 'View',
        options: [
            { value: 'list', label: 'List', icon: List },
            { value: 'month', label: 'Month', icon: CalendarDays }
        ],
        value: 'month'
    },
    parameters: {
        docs: {
            description: {
                story: 'An icon sits before its label and is decorative: the label names the segment.'
            }
        }
    }
};

export const Small: Story = {
    args: {
        label: 'View',
        options: views,
        value: 'list',
        size: 'sm'
    },
    parameters: {
        docs: {
            description: {
                story: 'The control is 32, 40 or 48px tall, the same scale as Input and Button. On a touch screen sm and md grow so a segment is 44px tall.'
            }
        }
    }
};

export const Large: Story = {
    args: {
        label: 'View',
        options: views,
        value: 'list',
        size: 'lg'
    }
};

export const ContentWidth: Story = {
    args: {
        label: 'View',
        options: views,
        value: 'list',
        fullWidth: false
    },
    parameters: {
        docs: {
            description: {
                story: 'With fullWidth off the control is as wide as its labels, for a toolbar.'
            }
        }
    }
};

export const DisabledOption: Story = {
    args: {
        label: 'Plan',
        options: [
            { value: 'free', label: 'Free' },
            { value: 'team', label: 'Team' },
            { value: 'enterprise', label: 'Enterprise', disabled: true }
        ],
        value: 'free'
    },
    parameters: {
        docs: {
            description: {
                story: 'A disabled segment cannot be chosen and the arrow keys skip it.'
            }
        }
    }
};

export const Disabled: Story = {
    args: {
        label: 'View',
        options: views,
        value: 'month',
        disabled: true
    }
};
