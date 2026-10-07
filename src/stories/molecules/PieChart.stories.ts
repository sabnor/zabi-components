import type { Meta, StoryObj } from '@storybook/sveltekit';
import PieChart from '../../components/molecules/PieChart.svelte';

const data = [
    { label: 'Rätt', value: 14 },
    { label: 'Fel', value: 4 },
    { label: 'Överhoppade', value: 2 }
];

const meta = {
    title: 'Design System/Molecules/PieChart',
    component: PieChart,
    parameters: {
        docs: {
            description: {
                component:
                    'A pie chart, or a ring with `donut`, drawn as plain SVG: parts of a whole, clockwise from twelve o\'clock in the order given. A `figure` whose caption is `label`; the drawing is hidden from assistive technology and the same numbers are in a real table (off screen unless `showTable`). The key writes each slice\'s label, value and share, so no slice is told by colour alone. Keep it to six slices or fewer.'
            }
        }
    },
    tags: ['autodocs']
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Svar', data } };
export const Donut: Story = { args: { label: 'Svar', data, donut: true } };

export const NamedColours: Story = {
    args: {
        label: 'Svar',
        donut: true,
        data: [
            { label: 'Rätt', value: 14, color: 'success' },
            { label: 'Fel', value: 4, color: 'error' },
            { label: 'Överhoppade', value: 2, color: 'info' }
        ]
    }
};

export const SixSlices: Story = {
    args: {
        label: 'Frågor per kategori',
        categoryTitle: 'Kategori',
        valueTitle: 'Frågor',
        shareTitle: 'Andel',
        data: [
            { label: 'Musik', value: 12 },
            { label: 'Sport', value: 9 },
            { label: 'Historia', value: 8 },
            { label: 'Film', value: 6 },
            { label: 'Geografi', value: 5 },
            { label: 'Övrigt', value: 3 }
        ]
    }
};

export const OneSlice: Story = { args: { label: 'Svar', data: [{ label: 'Rätt', value: 20 }] } };
export const TableShown: Story = { args: { label: 'Svar', data, legend: false, showTable: true, size: 140 } };
