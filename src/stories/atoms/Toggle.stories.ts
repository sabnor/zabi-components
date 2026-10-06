import type { Meta, StoryObj } from '@storybook/sveltekit';
import Toggle from '../../components/atoms/Toggle.svelte';

const meta = {
    title: 'Design System/Atoms/Toggle',
    component: Toggle,
    parameters: {
        docs: {
            description: {
                component:
                    'Accessible switch-style toggle with optional label and loading state.'
            }
        },
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        checked: {
            control: 'boolean'
        },
        disabled: {
            control: 'boolean'
        },
        label: {
            control: 'text'
        }
    }
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Email notifications'
    }
};

export const Checked: Story = {
    args: {
        checked: true,
        label: 'Email notifications'
    }
};

export const Disabled: Story = {
    args: {
        disabled: true,
        label: 'Email notifications'
    }
};

export const DisabledChecked: Story = {
    args: {
        disabled: true,
        checked: true,
        label: 'Two-factor authentication'
    },
    parameters: {
        docs: {
            description: {
                story: 'On and locked: a setting this person cannot turn off.'
            }
        }
    }
};

export const Loading: Story = {
    args: {
        loading: true,
        checked: true,
        label: 'Saving'
    },
    parameters: {
        docs: {
            description: {
                story: 'Use loading while the new value is being saved. A toggle takes effect at once, so it needs to show when that is still in progress.'
            }
        }
    }
};

export const InAForm: Story = {
    args: {
        name: 'marketing',
        value: 'yes',
        checked: true,
        label: 'Product updates'
    },
    parameters: {
        docs: {
            description: {
                story: 'With a name, the toggle adds a hidden input and submits its value with a native form while it is on.'
            }
        }
    }
};
