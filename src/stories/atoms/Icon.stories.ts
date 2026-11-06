import type { Meta, StoryObj } from '@storybook/sveltekit';
import Heart from '@lucide/svelte/icons/heart';
import Icon from '../../components/atoms/Icon.svelte';
import IconSizesStory from './IconSizesStory.svelte';

const meta = {
    title: 'Design System/Atoms/Icon',
    component: Icon,
    parameters: {
        docs: {
            description: {
                component:
                    'An icon on zabi\'s size scale: `xs` 12px, `sm` 16px, `md` 20px (default), `lg` 24px, `inherit` 1em. Decorative and hidden from assistive technology unless given a `label`.'
            }
        },
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { icon: Heart }
};

export const Named: Story = {
    args: { icon: Heart, label: 'Favourite', class: 'text-error' }
};

export const Sizes: Story = {
    args: { icon: Heart },
    render: () => ({ Component: IconSizesStory }) as any
};
