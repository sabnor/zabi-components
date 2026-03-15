import type { Meta, StoryObj } from '@storybook/sveltekit';
import FeatureCard from '../../components/atoms/FeatureCard.svelte';

const meta = {
    title: 'Design System/Atoms/FeatureCard',
    component: FeatureCard,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Feature summary card for marketing and overview sections.'
            }
        }
    },
    tags: ['autodocs']
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        icon: '⚡',
        title: 'Fast setup',
        description: 'Build interface sections quickly with prebuilt components.'
    }
};

export const AccessibilityFocused: Story = {
    args: {
        icon: '♿',
        title: 'Accessible by default',
        description: 'Includes semantic HTML and keyboard-friendly interaction patterns.'
    }
};
