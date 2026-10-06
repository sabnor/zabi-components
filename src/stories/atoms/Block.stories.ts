import type { Meta, StoryObj } from '@storybook/sveltekit';
import BlockStory from './BlockStory.svelte';

const meta = {
    title: 'Design System/Atoms/Block',
    component: BlockStory,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A full-width, square-cornered colour section: one colour per block, no shadow, no border. On brand, accent and a custom fill the text, links and controls inside take the fill\'s label colour. A Block does not break out of a padded parent: put it outside the padded container, or pass a negative inline margin through `class` (for example `-mx-4`).'
            }
        }
    },
    tags: ['autodocs']
} satisfies Meta<typeof BlockStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tones: Story = {
    args: { scenario: 'tones' },
    parameters: { docs: { description: { story: 'Neutral, tint, brand and accent.' } } }
};

export const PageSection: Story = {
    args: { scenario: 'page' },
    parameters: { docs: { description: { story: 'A brand block directly followed by a tint block: no border or shadow between them, the colour change is the divide.' } } }
};

export const CustomFill: Story = {
    args: { scenario: 'fill' },
    parameters: { docs: { description: { story: 'A fill the app chooses, with its label colour. The library cannot check the contrast of the pair.' } } }
};
