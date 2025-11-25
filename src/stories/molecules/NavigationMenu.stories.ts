import type { Meta, StoryObj } from '@storybook/sveltekit';
import NavigationMenu from '../../components/molecules/NavigationMenu.svelte';

const meta = {
    title: 'Design System/Molecules/NavigationMenu',
    component: NavigationMenu,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Compound navigation menu component with dropdowns, rich content, and keyboard navigation. See the components page for full examples.'
            }
        }
    },
    tags: ['autodocs']
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        viewport: true
    }
};
