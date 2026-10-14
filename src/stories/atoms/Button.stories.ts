import type { Meta, StoryObj } from '@storybook/sveltekit';
import Button from '../../components/atoms/Button.svelte';

const meta = {
    title: 'Design System/Atoms/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Button component with multiple variants and sizes. Fully keyboard accessible with Enter and Space key support.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: 'primary',
        size: 'md',
        text: 'Button'
    }
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        text: 'Button'
    }
};

export const Danger: Story = {
    args: {
        variant: 'danger',
        text: 'Button'
    }
};

export const Small: Story = {
    args: {
        size: 'sm',
        text: 'Button'
    }
};

export const Medium: Story = {
    args: {
        size: 'md',
        text: 'Button'
    }
};

export const Large: Story = {
    args: {
        size: 'lg',
        text: 'Button'
    }
};

export const Disabled: Story = {
    args: {
        disabled: true,
        text: 'Button'
    }
};

export const Outline: Story = {
    args: {
        variant: 'outline',
        text: 'Button'
    }
};

export const Link: Story = {
    args: {
        variant: 'link',
        text: 'Button'
    }
};

export const Tonal: Story = {
    args: {
        variant: 'tonal',
        text: 'Button'
    },
    parameters: {
        docs: {
            description: {
                story: 'A brand-tinted fill with a brand label: the quieter action beside a primary, and a chosen answer.'
            }
        }
    }
};

export const Text: Story = {
    args: {
        variant: 'text',
        text: 'Change booking'
    },
    parameters: {
        docs: {
            description: {
                story: 'A standalone text action: no underline, a semibold label in the link colour, the same height as the other buttons. With href it is still a boxed action; only variant link with href is an underlined link inside a sentence.'
            }
        }
    }
};

export const ExtraLarge: Story = {
    args: {
        size: 'xl',
        text: 'Button'
    },
    parameters: {
        docs: {
            description: {
                story: 'xl is 56px tall. Only Button has it.'
            }
        }
    }
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        text: 'Button'
    }
};

export const AsLink: Story = {
    args: {
        text: 'Log in',
        href: '#log-in'
    },
    parameters: {
        docs: {
            description: {
                story: 'With href it is a real link (an a element) that looks like the button: Enter follows it, and it can be opened in a new tab. target, rel and download pass through.'
            }
        }
    }
};

export const DisabledLink: Story = {
    args: {
        text: 'Not yet',
        href: '#log-in',
        disabled: true
    },
    parameters: {
        docs: {
            description: {
                story: 'A link cannot be disabled, so while disabled or loading it has no href, is aria-disabled, is not a Tab stop and does nothing when pressed.'
            }
        }
    }
};

export const InlineLink: Story = {
    args: {
        text: 'create one with your e-mail address',
        href: '#register',
        variant: 'link'
    },
    parameters: {
        docs: {
            description: {
                story: 'variant link with href is a text link: underlined, with no box or minimum height, flowing with the sentence around it and breaking across lines as a link does.'
            }
        }
    }
};

export const LongLabel: Story = {
    args: {
        text: 'Mejla mig en inloggningslänk',
        size: 'lg',
        fullWidth: true
    },
    parameters: {
        docs: {
            description: {
                story: 'A label that does not fit on one line wraps, balanced over its lines, and the button grows. Narrow the canvas or enlarge the text to see it. A label that fits is 32, 40 or 48px tall as before.'
            }
        }
    }
};
