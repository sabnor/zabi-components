import type { Meta, StoryObj } from '@storybook/svelte';
import KeyValueForm from '../components/molecules/KeyValueForm.svelte';

const meta = {
    title: 'Components/Molecules/KeyValueForm',
    component: KeyValueForm,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        values: {
            control: { type: 'object' }
        },
        fields: {
            control: { type: 'object' }
        }
    }
} satisfies Meta<KeyValueForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleFields = [
    {
        key: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter your name',
        required: true
    },
    {
        key: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        required: true
    },
    {
        key: 'age',
        label: 'Age',
        type: 'number',
        placeholder: 'Enter your age'
    },
    {
        key: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Enter a description',
        rows: 4
    },
    {
        key: 'country',
        label: 'Country',
        type: 'select',
        options: [
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'de', label: 'Germany' },
            { value: 'fr', label: 'France' }
        ],
        placeholder: 'Select a country'
    },
    {
        key: 'newsletter',
        label: 'Subscribe to newsletter',
        type: 'checkbox'
    },
    {
        key: 'notifications',
        label: 'Enable notifications',
        type: 'toggle'
    },
    {
        key: 'color',
        label: 'Favorite Color',
        type: 'colorpicker'
    },
    {
        key: 'alignment',
        label: 'Text Alignment',
        type: 'textalignment'
    }
];

export const Default: Story = {
    args: {
        fields: sampleFields,
        values: {}
    }
};

export const WithValues: Story = {
    args: {
        fields: sampleFields,
        values: {
            name: 'John Doe',
            email: 'john@example.com',
            age: 30,
            description: 'This is a sample description.',
            country: 'us',
            newsletter: true,
            notifications: false,
            color: 'bg-blue-500',
            alignment: 'center'
        }
    }
};

export const SimpleForm: Story = {
    args: {
        fields: [
            {
                key: 'title',
                label: 'Title',
                type: 'text',
                placeholder: 'Enter title',
                required: true
            },
            {
                key: 'content',
                label: 'Content',
                type: 'textarea',
                placeholder: 'Enter content',
                rows: 5
            }
        ],
        values: {}
    }
};

export const ContactForm: Story = {
    args: {
        fields: [
            {
                key: 'firstName',
                label: 'First Name',
                type: 'text',
                placeholder: 'Enter first name',
                required: true
            },
            {
                key: 'lastName',
                label: 'Last Name',
                type: 'text',
                placeholder: 'Enter last name',
                required: true
            },
            {
                key: 'email',
                label: 'Email',
                type: 'email',
                placeholder: 'Enter email address',
                required: true
            },
            {
                key: 'phone',
                label: 'Phone',
                type: 'tel',
                placeholder: 'Enter phone number'
            },
            {
                key: 'message',
                label: 'Message',
                type: 'textarea',
                placeholder: 'Enter your message',
                rows: 4,
                required: true
            },
            {
                key: 'subscribe',
                label: 'Subscribe to updates',
                type: 'checkbox'
            }
        ],
        values: {}
    }
};

export const SettingsForm: Story = {
    args: {
        fields: [
            {
                key: 'theme',
                label: 'Theme',
                type: 'select',
                options: [
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' },
                    { value: 'auto', label: 'Auto' }
                ],
                placeholder: 'Select theme'
            },
            {
                key: 'notifications',
                label: 'Enable notifications',
                type: 'toggle'
            },
            {
                key: 'emailNotifications',
                label: 'Email notifications',
                type: 'checkbox'
            },
            {
                key: 'pushNotifications',
                label: 'Push notifications',
                type: 'checkbox'
            },
            {
                key: 'language',
                label: 'Language',
                type: 'select',
                options: [
                    { value: 'en', label: 'English' },
                    { value: 'es', label: 'Spanish' },
                    { value: 'fr', label: 'French' },
                    { value: 'de', label: 'German' }
                ],
                placeholder: 'Select language'
            }
        ],
        values: {
            theme: 'dark',
            notifications: true,
            emailNotifications: true,
            pushNotifications: false,
            language: 'en'
        }
    }
};

export const ProductForm: Story = {
    args: {
        fields: [
            {
                key: 'name',
                label: 'Product Name',
                type: 'text',
                placeholder: 'Enter product name',
                required: true
            },
            {
                key: 'price',
                label: 'Price',
                type: 'number',
                placeholder: 'Enter price'
            },
            {
                key: 'category',
                label: 'Category',
                type: 'select',
                options: [
                    { value: 'electronics', label: 'Electronics' },
                    { value: 'clothing', label: 'Clothing' },
                    { value: 'books', label: 'Books' },
                    { value: 'home', label: 'Home & Garden' }
                ],
                placeholder: 'Select category'
            },
            {
                key: 'description',
                label: 'Description',
                type: 'textarea',
                placeholder: 'Enter product description',
                rows: 4
            },
            {
                key: 'inStock',
                label: 'In Stock',
                type: 'toggle'
            },
            {
                key: 'featured',
                label: 'Featured Product',
                type: 'checkbox'
            },
            {
                key: 'color',
                label: 'Primary Color',
                type: 'colorpicker'
            }
        ],
        values: {}
    }
};

export const AllFieldTypes: Story = {
    args: {
        fields: [
            {
                key: 'text',
                label: 'Text Input',
                type: 'text',
                placeholder: 'Text input'
            },
            {
                key: 'email',
                label: 'Email Input',
                type: 'email',
                placeholder: 'Email input'
            },
            {
                key: 'number',
                label: 'Number Input',
                type: 'number',
                placeholder: 'Number input'
            },
            {
                key: 'password',
                label: 'Password Input',
                type: 'password',
                placeholder: 'Password input'
            },
            {
                key: 'textarea',
                label: 'Textarea',
                type: 'textarea',
                placeholder: 'Textarea input',
                rows: 3
            },
            {
                key: 'select',
                label: 'Select',
                type: 'select',
                options: [
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' }
                ],
                placeholder: 'Select an option'
            },
            {
                key: 'checkbox',
                label: 'Checkbox',
                type: 'checkbox'
            },
            {
                key: 'toggle',
                label: 'Toggle',
                type: 'toggle'
            },
            {
                key: 'colorpicker',
                label: 'Color Picker',
                type: 'colorpicker'
            },
            {
                key: 'textalignment',
                label: 'Text Alignment',
                type: 'textalignment'
            }
        ],
        values: {}
    }
};
