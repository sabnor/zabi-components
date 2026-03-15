import type { Meta, StoryObj } from '@storybook/sveltekit';
import ContactForm from '../../components/molecules/ContactForm.svelte';

const meta = {
    title: 'Design System/Molecules/ContactForm',
    component: ContactForm,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Prebuilt contact form with inline validation and clear recovery messaging.'
            }
        }
    },
    tags: ['autodocs']
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};
