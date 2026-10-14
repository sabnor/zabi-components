import type { Meta, StoryObj } from '@storybook/sveltekit';
import Skeleton from '../../components/atoms/Skeleton.svelte';

const meta = {
    title: 'Design System/Atoms/Skeleton',
    component: Skeleton,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Lightweight loading placeholder primitive. Fills its parent width by default (except `circle`, which stays square). Override width with the `width` prop (CSS length or pixel number, e.g. `"50%"` or `200`) or a fixed Tailwind utility via `class` (e.g. `w-64`). Uses the `bg-surface-2` token so it sits subtly above `surface-1` cards and pages in both light and dark modes. It pulses, and under prefers-reduced-motion it stays a still fill. A lone Skeleton is its own `role="status"` named "Loading…" (from the strings provider\'s `skeleton.label`, or `aria-label`). For a screen of pieces, wrap them in `SkeletonGroup` (one status, pieces hidden) or set `decorative` on each. `lines` draws a paragraph with a shorter last line; `tone="on-color"` is the fill for a brand, accent or fill block.'
            }
        }
    },
    argTypes: {
        variant: {
            control: 'inline-radio',
            options: ['text', 'circle', 'block']
        },
        width: { control: 'text' },
        height: { control: 'text' },
        class: { control: 'text' },
        tone: { control: 'inline-radio', options: ['neutral', 'on-color'] },
        lines: { control: 'number' },
        decorative: { control: 'boolean' }
    },
    tags: ['autodocs']
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
    args: {
        variant: 'text'
    }
};

export const ShorterTextLine: Story = {
	args: {
		variant: 'text',
		width: '50%'
	}
};

export const Circle: Story = {
    args: {
        variant: 'circle'
    }
};

export const Block: Story = {
    args: {
        variant: 'block'
    }
};

export const UtilityWidthOverride: Story = {
    args: {
        variant: 'block',
        class: 'w-64'
    }
};

export const ExplicitSize: Story = {
    args: {
        variant: 'block',
        width: 200,
        height: 120
    }
};

export const Paragraph: Story = {
    args: {
        lines: 3
    }
};

export const Decorative: Story = {
    parameters: {
        docs: {
            description: {
                story: 'No role, no label, hidden from assistive tech. Every piece still carries `data-skeleton` (its variant) and passes other div attributes through, so a test or a style finds it without the `animate-pulse` class.'
            }
        }
    },
    args: {
        decorative: true,
        'data-testid': 'avatar-skeleton'
    } as Story['args']
};
