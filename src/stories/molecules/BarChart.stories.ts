import type { Meta, StoryObj } from '@storybook/sveltekit';
import BarChart from '../../components/molecules/BarChart.svelte';

const data = [
    { label: 'R1', value: 7 },
    { label: 'R2', value: 9 },
    { label: 'R3', value: 4 },
    { label: 'R4', value: 8 },
    { label: 'R5', value: 6 }
];

const meta = {
    title: 'Design System/Molecules/BarChart',
    component: BarChart,
    parameters: {
        docs: {
            description: {
                component:
                    'A bar chart of one set of values, drawn as plain SVG: upright bars from a zero line, a label under each and its value over it. A `figure` whose caption is `label`; the drawing is hidden from assistive technology and the same numbers are in a real table (off screen unless `showTable`). The bars are one colour, `--zabi-chart-1` unless `color` or a datum says otherwise.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        color: { control: 'select', options: [undefined, 'primary', 'accent', 'success', 'warning', 'error', 'info'] }
    }
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { label: 'Poäng per runda', categoryTitle: 'Runda', valueTitle: 'Poäng', data, yMax: 10 }
};

export const Percent: Story = {
    args: {
        label: 'Rätt svar per kategori',
        yFormat: 'percent',
        yMax: 100,
        color: 'accent',
        data: [
            { label: 'Musik', value: 82 },
            { label: 'Sport', value: 45 },
            { label: 'Historia', value: 67 },
            { label: 'Film', value: 73 }
        ]
    }
};

export const OneBarPickedOut: Story = {
    args: { label: 'Poäng per runda', data: data.map((bar, index) => (index === 1 ? { ...bar, color: 'success' } : bar)) }
};

export const BelowZero: Story = {
    args: {
        label: 'Förändring mot förra veckan',
        data: [
            { label: 'Mån', value: 3 },
            { label: 'Tis', value: -2 },
            { label: 'Ons', value: 5 },
            { label: 'Tor', value: -4 }
        ]
    }
};

export const TableShown: Story = { args: { label: 'Poäng per runda', data, showTable: true, height: 180 } };
