import type { Meta, StoryObj } from '@storybook/sveltekit';
import { ShieldCheck, Sparkles, Zap } from '@lucide/svelte';
import FeatureCard from '../../components/atoms/FeatureCard.svelte';

const meta = {
    title: 'Design System/Atoms/FeatureCard',
    component: FeatureCard,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Minimal, Stripe-inspired feature card for marketing and overview sections. Uses `bg-surface-1` and text tokens by default. Pass a Lucide icon component directly via the `icon` prop.'
            }
        }
    },
    argTypes: {
        title: { control: 'text' },
        description: { control: 'text' },
        class: { control: 'text' },
        icon: { control: false }
    },
    tags: ['autodocs']
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        icon: Zap,
        title: 'Fast setup',
        description: 'Build interface sections quickly with prebuilt components.'
    }
};

export const TitleOnly: Story = {
    args: {
        title: 'Composable by design'
    }
};

export const AccessibilityFocused: Story = {
    args: {
        icon: ShieldCheck,
        title: 'Accessible by default',
        description:
            'Includes semantic HTML and keyboard-friendly interaction patterns.'
    }
};

export const Delightful: Story = {
    args: {
        icon: Sparkles,
        title: 'Delightful details',
        description: 'Small animations and transitions that reward the user.'
    }
};
