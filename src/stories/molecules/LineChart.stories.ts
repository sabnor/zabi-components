import type { Meta, StoryObj } from '@storybook/sveltekit';
import LineChart from '../../components/molecules/LineChart.svelte';

const xLabels = ['v. 36', 'v. 37', 'v. 38', 'v. 39', 'v. 40', 'v. 41', 'v. 42', 'v. 43'];
const series = [
    { name: 'Vårt lag', points: [62, 68, 71, 66, 78, 74, 81, 85] },
    { name: 'Snitt', points: [58, 60, 59, 63, 64, 62, 66, 65] }
];

const meta = {
    title: 'Design System/Molecules/LineChart',
    component: LineChart,
    parameters: {
        docs: {
            description: {
                component:
                    'A line chart for one or a few series over shared x labels, drawn as plain SVG; there is no chart library under it. A `figure` whose caption is `label`; the drawing is hidden from assistive technology and the same numbers are in a real table (off screen unless `showTable`). Each series has its own marker shape as well as its colour. Point at or tap the plot to read the values at that x label. The six series colours are `--zabi-chart-1` to `--zabi-chart-6`, which default to theme tokens.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        yFormat: { control: 'inline-radio', options: ['number', 'percent'] }
    }
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { label: 'Rätt svar per vecka', xTitle: 'Vecka', xLabels, series, yMin: 0, yMax: 100, yFormat: 'percent' }
};

export const OneSeries: Story = {
    args: { label: 'Poäng per vecka', xLabels, series: [{ name: 'Poäng', points: [12, 14, 13, 17, 16, 19, 18, 21] }] }
};

export const WithAGap: Story = {
    args: {
        label: 'Rätt svar per vecka',
        xLabels,
        series: [{ name: 'Vårt lag', points: [62, 68, null, null, 78, 74, 81, 85] }, series[1]],
        yFormat: 'percent'
    }
};

export const SixSeries: Story = {
    args: {
        label: 'Sex lag',
        xLabels,
        series: ['A', 'B', 'C', 'D', 'E', 'F'].map((name, at) => ({
            name: `Lag ${name}`,
            points: xLabels.map((_, index) => 20 + at * 12 + ((index * (at + 3)) % 9))
        }))
    }
};

export const TableShown: Story = {
    args: { label: 'Rätt svar per vecka', xTitle: 'Vecka', xLabels, series, yFormat: 'percent', showTable: true, height: 180 }
};

export const ManyPoints: Story = {
    args: {
        label: 'Trettio dagar',
        markers: false,
        xLabels: Array.from({ length: 30 }, (_, index) => `${index + 1} okt`),
        series: [{ name: 'Spelade', points: Array.from({ length: 30 }, (_, index) => 40 + Math.round(25 * Math.sin(index / 4))) }]
    }
};
