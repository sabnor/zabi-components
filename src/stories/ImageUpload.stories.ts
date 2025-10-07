import type { Meta, StoryObj } from '@storybook/svelte';
import ImageUpload from '../components/molecules/ImageUpload.svelte';

const meta = {
    title: 'Design System/Molecules/ImageUpload',
    component: ImageUpload,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof ImageUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: null,
        disabled: false,
        accept: 'image/*',
        placeholder: 'No image selected'
    }
};

export const WithImage: Story = {
    args: {
        value: 'https://via.placeholder.com/300x200',
        disabled: false,
        accept: 'image/*',
        placeholder: 'No image selected'
    }
};

export const Disabled: Story = {
    args: {
        value: null,
        disabled: true,
        accept: 'image/*',
        placeholder: 'Upload disabled'
    }
};

export const CustomAccept: Story = {
    args: {
        value: null,
        disabled: false,
        accept: 'image/png,image/jpeg',
        placeholder: 'Select PNG or JPEG image'
    }
};