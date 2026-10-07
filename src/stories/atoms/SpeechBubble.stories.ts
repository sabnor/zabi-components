import type { Meta, StoryObj } from '@storybook/sveltekit';
import SpeechBubbleDemo from './SpeechBubbleDemo.svelte';

const meta = {
    title: 'Design System/Atoms/SpeechBubble',
    component: SpeechBubbleDemo,
    parameters: {
        docs: {
            description: {
                component:
                    'A quotation in a bubble with a drawn tail: a `figure` whose `figcaption` is the label and whose content is a `blockquote`. The fill, text colour, corner radii and tilt are four custom properties (`--zabi-bubble-fill`, `--zabi-bubble-text`, `--zabi-bubble-radius`, `--zabi-bubble-tilt`); the tail follows the fill and is sized in rem.'
            }
        },
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        side: { control: 'inline-radio', options: ['end', 'start'] },
        tone: { control: 'inline-radio', options: ['ink', 'paper'] }
    }
} satisfies Meta<typeof SpeechBubbleDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
export const TailAtStart: Story = { args: { side: 'start' } };
export const LabelHidden: Story = { args: { labelHidden: true } };
export const PaperOnBrandBlock: Story = { args: { tone: 'paper', onBlock: true } };
export const WithDecoration: Story = { args: { sparkle: true } };

export const HandCut: Story = {
    args: {
        sparkle: true,
        style: '--zabi-bubble-radius: 1.75rem 2.25rem 2rem 2.5rem / 2.25rem 1.75rem 2.5rem 1.9rem; --zabi-bubble-tilt: -1.2deg'
    }
};

export const CustomPair: Story = {
    args: { style: '--zabi-bubble-fill: var(--color-action-primary); --zabi-bubble-text: var(--color-on-brand)' }
};

export const LongText: Story = {
    args: {
        text: 'Hej, vi är ett sällskap som vill boka bord för quizkvällen på fredag, vi blir fyra personer och kommer vid sju. Går det bra?'
    }
};
