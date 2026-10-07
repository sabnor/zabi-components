import type { Meta, StoryObj } from '@storybook/sveltekit';
import Sparkline from '../../components/atoms/Sparkline.svelte';

const meta = {
    title: 'Design System/Atoms/Sparkline',
    component: Sparkline,
    parameters: {
        docs: {
            description: {
                component:
                    'A small line with no axes, for a trend beside a figure or in a table cell. Plain SVG; an image named by `label`, or decoration without one. 5rem by 1.5rem unless `class` says otherwise; the line stretches to the box and keeps its thickness.'
            }
        },
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        color: { control: 'select', options: [undefined, 'primary', 'accent', 'success', 'warning', 'error', 'info'] }
    }
} satisfies Meta<typeof Sparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { points: [3, 5, 4, 7, 6, 9], label: 'Poäng, sex senaste: stigande' } };
export const Success: Story = { args: { points: [3, 5, 4, 7, 6, 9], color: 'success', label: 'Stigande' } };
export const WithAGap: Story = { args: { points: [3, 5, null, 7, 6, 9], label: 'Poäng, en vecka saknas' } };
export const Wide: Story = { args: { points: [8, 6, 7, 3, 4, 2, 5, 1], class: 'h-10 w-64', label: 'Fallande' } };
