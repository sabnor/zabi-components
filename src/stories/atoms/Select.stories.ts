import type { Meta, StoryObj } from '@storybook/sveltekit';
import Select from '../../components/atoms/Select.svelte';

const meta = {
    title: 'Design System/Atoms/Select',
    component: Select,
    parameters: {
        docs: {
            description: {
                component:
                    'Dropdown with type-ahead search, scrollable options and validation states.'
            }
        },
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
];

export const Default: Story = {
    args: {
        label: 'Select Label',
        placeholder: 'Choose an option',
        options: sampleOptions
    }
};

export const WithValue: Story = {
    args: {
        label: 'Select with Value',
        value: 'option2',
        options: sampleOptions
    }
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Select',
        placeholder: 'This select is disabled',
        disabled: true,
        options: sampleOptions
    }
};

export const Small: Story = {
    args: {
        label: 'Small Select',
        size: 'sm',
        options: sampleOptions
    }
};

export const Medium: Story = {
    args: {
        label: 'Medium Select',
        size: 'md',
        options: sampleOptions
    }
};

export const Large: Story = {
    args: {
        label: 'Large Select',
        size: 'lg',
        options: sampleOptions
    }
};

export const Success: Story = {
    args: {
        label: 'Success Select',
        variant: 'success',
        message: 'Selection is valid',
        options: sampleOptions
    }
};

export const Warning: Story = {
    args: {
        label: 'Warning Select',
        variant: 'warning',
        message: 'Please verify your selection',
        options: sampleOptions
    }
};

export const Error: Story = {
    args: {
        label: 'Error Select',
        variant: 'error',
        message: 'Please select an option',
        options: sampleOptions
    }
};

export const ManyOptions: Story = {
    args: {
        label: 'Select with Many Options',
        placeholder: 'Choose an option',
        options: [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
            { value: '4', label: 'Option 4' },
            { value: '5', label: 'Option 5' },
            { value: '6', label: 'Option 6' },
            { value: '7', label: 'Option 7' },
            { value: '8', label: 'Option 8' }
        ]
    }
};

export const WithDisabledOption: Story = {
    args: {
        label: 'Select with Disabled Option',
        options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2 (Disabled)', disabled: true },
            { value: 'option3', label: 'Option 3' }
        ]
    }
};

export const SearchableWithScroll: Story = {
    args: {
        label: 'Searchable Select',
        placeholder: 'Choose an option',
        searchable: true,
        searchPlaceholder: 'Search options',
        maxMenuHeight: '50vh',
        options: Array.from({ length: 20 }, (_, index) => ({
            value: `option-${index + 1}`,
            label: `Option ${index + 1}`
        }))
    }
};

export const LoadingState: Story = {
    args: {
        label: 'Loading Select',
        placeholder: 'Choose an option',
        isLoading: true,
        loadingText: 'Loading options...',
        options: []
    }
};

export const EmptyState: Story = {
    args: {
        label: 'Empty Select',
        placeholder: 'Choose an option',
        emptyStateTitle: 'Create your first option',
        emptyStateDescription: 'Add an option to start organizing and selecting values.',
        emptyStateActionLabel: 'Add Option',
        onEmptyStateAction: () => {
            console.log('Empty state primary action clicked');
        },
        options: []
    }
};

/**
 * Always in a BottomSheet, as `presentation="auto"` (the default) opens it on
 * a phone: titled by the label, the search field under the header, 48px rows.
 */
export const InASheet: Story = {
    args: {
        label: 'Pub',
        placeholder: 'Choose a pub',
        presentation: 'sheet',
        options: [
            { value: '1', label: 'Akkurat' },
            { value: '2', label: 'Bishops Arms' },
            { value: '3', label: 'Carmen' },
            { value: '4', label: 'Dovas', disabled: true },
            { value: '5', label: 'Engelen' },
            { value: '6', label: 'Flying Elk' },
            { value: '7', label: 'Half Way Inn' },
            { value: '8', label: 'Kvarnen' }
        ]
    }
};

/**
 * Only the browser's own select, styled as the field: the platform's picker.
 * It shows the options' labels and nothing else. Every Select also renders
 * this element on the server, where it is the control until the page has
 * hydrated, and all there is without scripts.
 */
export const Native: Story = {
    args: {
        label: 'Frequency',
        name: 'frequency',
        presentation: 'native',
        value: 'biweekly',
        options: [
            { value: 'weekly', label: 'Every week' },
            { value: 'biweekly', label: 'Every other week' },
            { value: 'monthly', label: 'Every month' },
            { value: 'never', label: 'Never', disabled: true }
        ]
    }
};

/** Every text of the component's own in another language, through `strings`. */
export const Swedish: Story = {
    args: {
        label: 'Hur ofta',
        options: [
            { value: 'vecka', label: 'Varje vecka' },
            { value: 'varannan', label: 'Varannan vecka på torsdagar' },
            { value: 'manad', label: 'Första torsdagen i varje månad' }
        ],
        strings: {
            placeholder: 'Välj ett alternativ',
            searchPlaceholder: 'Sök',
            noResults: 'Inga träffar',
            loading: 'Hämtar alternativ…',
            emptyTitle: 'Inga alternativ',
            emptyDescription: 'Lägg till ett alternativ för att kunna välja.',
            listLabel: 'Alternativ',
            closeLabel: 'Stäng',
            expandLabel: 'Visa mer',
            collapseLabel: 'Visa mindre'
        }
    }
};
