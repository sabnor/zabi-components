import type { Meta, StoryObj } from '@storybook/sveltekit';
import ColorPicker from '../../components/atoms/ColorPicker.svelte';

const meta = {
    title: 'Design System/Atoms/ColorPicker',
    component: ColorPicker,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Color Picker'
    }
};

export const WithValue: Story = {
    args: {
        label: 'Color Picker',
        value: '#3b82f6'
    }
};

export const Disabled: Story = {
    args: {
        label: 'Color Picker',
        disabled: true
    }
};
