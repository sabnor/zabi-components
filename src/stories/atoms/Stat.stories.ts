import type { Meta, StoryObj } from '@storybook/sveltekit';
import Stat from '../../components/atoms/Stat.svelte';
import StatRowOnBrand from './StatRowOnBrand.svelte';

const meta = {
    title: 'Design System/Atoms/Stat',
    component: Stat,
    parameters: {
        docs: {
            description: {
                component:
                    'A figure with a label and an optional unit. The value is set in the display face (`--font-family-display`), the unit sits on its baseline, and the label follows the figure in reading order, or leads it with `labelPosition="above"`.'
            }
        },
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
        align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
        labelPosition: { control: 'inline-radio', options: ['below', 'above'] }
    }
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = { args: { value: '5', label: 'besök', size: 'sm' } };
export const Medium: Story = { args: { value: '4,0', label: 'Snittbetyg', size: 'md' } };
export const Large: Story = { args: { value: '12', label: 'Poäng', size: 'lg' } };

export const WithUnit: Story = {
    args: { value: '4', unit: 'av 19', label: 'pubar besökta', size: 'lg' }
};

export const LabelAbove: Story = {
    args: { value: '2:a', unit: 'av 11', label: 'Placering', labelPosition: 'above', size: 'lg' }
};

export const Centered: Story = {
    args: { value: '5,0', label: 'Betyg', align: 'center', size: 'lg' },
    decorators: [() => ({ Component: 'div' as any, props: { style: 'inline-size: 16rem' } }) as any]
};

export const OnBrandBlock: Story = {
    args: { value: '4' },
    render: () => ({ Component: StatRowOnBrand }) as any
};
