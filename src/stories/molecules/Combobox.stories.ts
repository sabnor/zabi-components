import type { Meta, StoryObj } from '@storybook/sveltekit';
import Combobox from '../../components/molecules/Combobox.svelte';

const PLACES = [
    { value: 'malmo', label: 'Malmö', description: 'Skåne' },
    { value: 'mora', label: 'Mora', description: 'Dalarna' },
    { value: 'moss', label: 'Moss', description: 'Closed', disabled: true },
    { value: 'umea', label: 'Umeå', description: 'Västerbotten' }
];

const find = async (query: string) =>
    PLACES.filter((p) => p.label.toLowerCase().includes(query.trim().toLowerCase()));

const meta = {
    title: 'Design System/Molecules/Combobox',
    component: Combobox,
    parameters: {
        docs: {
            description: {
                component:
                    'An autocomplete field: type, and an async `search(query, signal)` fills a listbox under the field. Arrows and Enter choose, Escape closes. Free text stays as typed when nothing is chosen. Looks like Input of the same size.'
            }
        },
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } }
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { label: 'Place', placeholder: 'Start typing a place', search: find, hint: 'Try "m".' }
};

export const Slow: Story = {
    args: {
        label: 'Place',
        search: (q: string) => new Promise((resolve) => setTimeout(() => resolve(find(q)), 1200))
    }
};

export const NoMatches: Story = { args: { label: 'Place', search: async () => [] } };

export const Failing: Story = {
    args: { label: 'Place', search: async () => Promise.reject(new Error('offline')), error: '' }
};

export const WithError: Story = {
    args: { label: 'Place', search: find, error: 'Choose a place from the list' }
};

export const Large: Story = { args: { label: 'Place', size: 'lg', search: find } };
