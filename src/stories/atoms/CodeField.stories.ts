import type { Meta, StoryObj } from '@storybook/sveltekit';
import CodeField from '../../components/atoms/CodeField.svelte';

const meta = {
    title: 'Design System/Atoms/CodeField',
    component: CodeField,
    parameters: {
        docs: {
            description: {
                component:
                    'A field for a verification or one-time code. One real `<input>` (`autocomplete="one-time-code"`, numeric keyboard) holds the code under drawn boxes that are hidden from assistive technology, so autofill from a message, paste of the whole code ("123 456" too) and a form post by `name` work, with scripts off as well. `length` (default 6), `mode` (`numeric` or `alphanumeric`), `error` / `hint` / `message` as on `Input`, `size` (`sm` is 44px tall), `groups` (a number or a list, e.g. 4 for 1234 5678; drawing only), and `oncomplete` when the last place is filled. The boxes never get narrower than their digit: at large text the row wraps.'
            }
        },
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        mode: { control: 'inline-radio', options: ['numeric', 'alphanumeric'] },
        variant: { control: 'select', options: ['default', 'success', 'warning', 'error'] },
        size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
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
export const EightInTwoGroups: Story = {
    parameters: { docs: { description: { story: '`length={8} groups={4}` draws 1234 5678. Only the drawing is grouped: the value, the post and a paste of "1234-5678" are one run of digits. At 200% text or 320px the row wraps between the groups.' } } },
    args: { length: 8, groups: 4, value: '1234' }
};
export const Uneven: Story = { args: { length: 10, groups: [3, 3, 4], value: '123456' } };
export const Compact: Story = { args: { length: 8, groups: 4, size: 'sm', value: '1234' } };
export const Large: Story = { args: { size: 'lg', value: '123' } };
export const LabelHidden: Story = { args: { labelHidden: true } };
export const Disabled: Story = { args: { value: '123', disabled: true } };
export const ReadOnly: Story = { args: { value: '123456', readonly: true } };
