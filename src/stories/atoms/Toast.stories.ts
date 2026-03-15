import type { Meta, StoryObj } from '@storybook/sveltekit';
import Toast from '../../components/atoms/Toast.svelte';

const meta = {
    title: 'Design System/Atoms/Toast',
    component: Toast,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Transient status toast. Use for non-blocking feedback after user actions.'
            }
        }
    },
    tags: ['autodocs']
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
    args: {
        message: 'Changes saved successfully.',
        type: 'info',
        closable: true
    }
};

export const Error: Story = {
    args: {
        message: 'Upload failed. Please retry.',
        type: 'error',
        closable: true
    }
};
