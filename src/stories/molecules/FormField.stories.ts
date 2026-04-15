import type { Meta, StoryObj } from '@storybook/sveltekit';
import FormFieldStory from './FormFieldStory.svelte';

const meta = {
    title: 'Design System/Molecules/FormField',
    component: FormFieldStory,
    tags: ['autodocs'],
} satisfies Meta<typeof FormFieldStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInput: Story = {
    render: () => ({
        Component: FormFieldStory,
    }),
};
