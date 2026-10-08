import type { Meta, StoryObj } from '@storybook/sveltekit';
import CodeField from '../../components/atoms/CodeField.svelte';

const meta = {
    title: 'Design System/Atoms/CodeField',
    component: CodeField,
    parameters: {
        docs: {
            description: {
                component:
                    'A field for a verification or one-time code. One real `<input>` (`autocomplete="one-time-code"`, numeric keyboard) holds the code under drawn boxes that are hidden from assistive technology, so autofill from a message, paste of the whole code ("123 456" too) and a form post by `name` work, with scripts off as well. `length` (default 6), `mode` (`numeric` or `alphanumeric`), `error` / `hint` / `message` as on `Input`, and `oncomplete` when the last place is filled.'
            }
        },
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        mode: { control: 'inline-radio', options: ['numeric', 'alphanumeric'] },
        variant: { control: 'select', options: ['default', 'success', 'warning', 'error'] },
        length: { control: { type: 'number', min: 1, max: 12 } }
    },
    args: { class: 'w-80', name: 'code' }
} satisfies Meta<typeof CodeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { hint: 'From the email we sent you' } };
export const Filled: Story = { args: { value: '123456' } };
export const PartlyFilled: Story = { args: { value: '123' } };
export const WithError: Story = { args: { value: '123456', error: 'That code is not right.' } };
export const Success: Story = { args: { value: '123456', variant: 'success', message: 'Code accepted' } };
export const FourLettersAndDigits: Story = { args: { length: 4, mode: 'alphanumeric', label: 'Invite code' } };
export const LabelHidden: Story = { args: { labelHidden: true } };
export const Disabled: Story = { args: { value: '123', disabled: true } };
export const ReadOnly: Story = { args: { value: '123456', readonly: true } };
