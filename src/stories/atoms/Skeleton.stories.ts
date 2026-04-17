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
                    'Lightweight loading placeholder primitive. Fills its parent width by default (except `circle`, which stays square). Override width with the `width` prop (CSS length or pixel number, e.g. `"50%"` or `200`) or a fixed Tailwind utility via `class` (e.g. `w-64`). Uses the `bg-surface-2` token so it sits subtly above `surface-1` cards and pages in both light and dark modes.'
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
        class: { control: 'text' }
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
