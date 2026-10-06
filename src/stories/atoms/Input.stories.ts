import type { Meta, StoryObj } from '@storybook/sveltekit';
import Input from '../../components/atoms/Input.svelte';

const meta = {
    title: 'Design System/Atoms/Input',
    component: Input,
    parameters: {
        docs: {
            description: {
                component:
                    'Text input whose label, hint and error message are wired to the control for screen readers.'
            }
        },
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Input Label',
        placeholder: 'Enter text...'
    }
};

export const WithValue: Story = {
    args: {
        label: 'Input with Value',
        value: 'Sample text'
    }
};

export const Email: Story = {
    args: {
        type: 'email',
        label: 'Email Address',
        placeholder: 'you@example.com'
    }
};

export const Password: Story = {
    args: {
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password'
    }
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Input',
        placeholder: 'This input is disabled',
        disabled: true
    }
};

export const Small: Story = {
    args: {
        label: 'Small Input',
        placeholder: 'Small size input',
        size: 'sm'
    }
};

export const Large: Story = {
    args: {
        label: 'Large Input',
        placeholder: 'Large size input',
        size: 'lg'
    }
};

export const Success: Story = {
    args: {
        label: 'Success Input',
        placeholder: 'This input has success styling',
        variant: 'success',
        message: 'This field looks good!'
    }
};

export const Warning: Story = {
    args: {
        label: 'Warning Input',
        placeholder: 'This input has warning styling',
        variant: 'warning',
        message: 'Please review this field'
    }
};

export const Error: Story = {
    args: {
        label: 'Error Input',
        placeholder: 'This input has error styling',
        variant: 'error',
        message: 'This field is required'
    }
};

export const WithHint: Story = {
    args: {
        label: 'Password',
        type: 'password',
        autocomplete: 'new-password',
        hint: 'At least 8 characters.'
    },
    parameters: {
        docs: {
            description: {
                story: 'A hint is help that is always there. It is tied to the field with aria-describedby and read with it; it is not announced on its own.'
            }
        }
    }
};

export const WithHintAndError: Story = {
    args: {
        label: 'Password',
        type: 'password',
        value: 'abc',
        hint: 'At least 8 characters.',
        error: 'That is fewer than 8 characters.'
    },
    parameters: {
        docs: {
            description: {
                story: 'error sets the error variant, marks the field invalid and is announced. The field is described by the hint first and the error after it.'
            }
        }
    }
};

export const RevealablePassword: Story = {
    args: {
        label: 'Password',
        type: 'password',
        autocomplete: 'current-password',
        value: 'correct horse',
        revealable: true
    },
    parameters: {
        docs: {
            description: {
                story: 'A toggle at the end of the field shows the password as text and hides it again. Its name stays "Show password" and aria-pressed says which state it is in. A press with a mouse or a finger leaves focus and the caret in the field; autocomplete is not touched. Translate the name with revealLabel.'
            }
        }
    }
};

export const RevealableLarge: Story = {
    args: {
        label: 'Password',
        type: 'password',
        value: 'correct horse',
        size: 'lg',
        revealable: true,
        loading: true
    },
    parameters: {
        docs: {
            description: {
                story: 'The toggle is 8px smaller than the field at every size and sits 4px inside it. The loading spinner stands after it, and the field makes room for both.'
            }
        }
    }
};
