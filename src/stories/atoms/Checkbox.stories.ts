import type { Meta, StoryObj } from '@storybook/sveltekit';
import Checkbox from '../../components/atoms/Checkbox.svelte';

const meta = {
    title: 'Design System/Atoms/Checkbox',
    component: Checkbox,
    parameters: {
        docs: {
            description: {
                component:
                    'Checkbox input with label, focus ring, and controlled/uncontrolled checked state.'
            }
        },
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Send a welcome email'
    }
};

export const Checked: Story = {
    args: {
        checked: true,
        label: 'Send a welcome email'
    }
};

export const Disabled: Story = {
    args: {
        disabled: true,
        label: 'Send a welcome email'
    },
    parameters: {
        docs: {
            description: {
                story: 'A disabled checkbox cannot be focused or changed. Say nearby why the option is unavailable.'
            }
        }
    }
};

export const DisabledChecked: Story = {
    args: {
        disabled: true,
        checked: true,
        label: 'Required by your organisation'
    },
    parameters: {
        docs: {
            description: {
                story: 'Checked and locked: a setting that is on and that this person cannot turn off.'
            }
        }
    }
};

export const Loading: Story = {
    args: {
        loading: true,
        checked: true,
        label: 'Saving your choice'
    },
    parameters: {
        docs: {
            description: {
                story: 'Use loading while a change is being saved, so the box cannot be toggled again mid-request.'
            }
        }
    }
};

export const WithoutLabel: Story = {
    args: {
        'aria-label': 'Select row'
    } as Story['args'],
    parameters: {
        docs: {
            description: {
                story: 'In a table row or a list there is often no room for a visible label. Pass aria-label so the checkbox still has a name.'
            }
        }
    }
};
