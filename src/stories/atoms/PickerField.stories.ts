import type { Meta, StoryObj } from '@storybook/sveltekit';
import PickerFieldStory from './PickerFieldStory.svelte';

const meta = {
    title: 'Design System/Atoms/PickerField',
    component: PickerFieldStory,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A field-shaped trigger that opens whatever the app gives it, usually its own BottomSheet. It looks like a Select of the same size, with the label above, the chosen text, a chevron, and a hint or error below. It is one button named by its label and its value (aria-haspopup="dialog" by default). It opens nothing itself: onclick does, and expanded tells it the sheet is open. Bind element to return focus to it when the sheet closes. Give it an href and it is a link, which works without scripts. With name and formValue it submits the chosen id through a hidden input.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] }
    }
} satisfies Meta<typeof PickerFieldStory>;

export default meta;
type Story = StoryObj<typeof meta>;

const story = (text: string) => ({ docs: { description: { story: text } } });

export const Empty: Story = {
    args: { scenario: 'empty' },
    parameters: story('Nothing chosen: the placeholder, in the placeholder colour, with a hint below.')
};

export const WithValue: Story = {
    args: { scenario: 'value' },
    parameters: story('The chosen text. It truncates on one line. The control is named "Pub The Bishops Arms".')
};

export const WithLeadingIcon: Story = {
    args: { scenario: 'leading' },
    parameters: story('An icon or an avatar before the text, through the leading snippet.')
};

export const WithError: Story = {
    args: { scenario: 'error' },
    parameters: story('The error edge colour and a message that is announced and read with the field. A button has no aria-invalid, so those two carry it.')
};

export const Disabled: Story = {
    args: { scenario: 'disabled' },
    parameters: story('Not pressable, with and without a value.')
};

export const Sizes: Story = {
    args: { scenario: 'sizes' },
    parameters: story('32, 40 and 48px, as Select, Input and Button. 44px on a touch screen for the two smaller.')
};

export const OpensASheet: Story = {
    args: { scenario: 'interactive' },
    parameters: story('The app owns the sheet: onclick opens a BottomSheet, expanded follows it, and choosing writes the text back and returns focus to the field through bind:element.')
};

export const AsALink: Story = {
    args: { scenario: 'link' },
    parameters: story('With href the control is a link to a page that does the picking, and nothing depends on scripts. With scripts, onclick may call preventDefault() and open a sheet instead.')
};
