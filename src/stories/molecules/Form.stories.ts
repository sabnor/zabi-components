import type { Meta, StoryObj } from '@storybook/sveltekit';
import Form from '../../components/molecules/Form.svelte';

const meta = {
    title: 'Design System/Molecules/Form',
    component: Form,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Semantic form wrapper with native submit behavior. Use visible labels and inline validation in child fields.'
            }
        }
    },
    tags: ['autodocs']
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        method: 'post',
        className: 'space-y-4'
    }
};
