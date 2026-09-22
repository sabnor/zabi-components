import type { Meta, StoryObj } from '@storybook/sveltekit';
import Badge from '../../components/atoms/Badge.svelte';
import BadgeGallery from './BadgeGallery.svelte';
import BadgeWithChildren from './BadgeWithChildren.svelte';

const meta = {
    title: 'Design System/Atoms/Badge',
    component: Badge,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'success', 'warning', 'error', 'info', 'neutral', 'energetic']
        },
        text: {
            control: 'text'
        },
        showIcon: {
            control: 'boolean'
        },
        emphasis: {
            control: 'inline-radio',
            options: ['subtle', 'solid']
        }
    }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: 'default',
        text: 'Default Badge'
    }
};

export const Success: Story = {
    args: {
        variant: 'success',
        text: 'Success Badge'
    }
};

export const Warning: Story = {
    args: {
        variant: 'warning',
        text: 'Warning Badge'
    }
};

export const Error: Story = {
    args: {
        variant: 'error',
        text: 'Error Badge'
    }
};

export const Info: Story = {
    args: {
        variant: 'info',
        text: 'Info Badge'
    }
};

export const Neutral: Story = {
    args: {
        variant: 'neutral',
        text: 'Neutral Badge'
    }
};

export const Energetic: Story = {
    args: {
        variant: 'energetic',
        text: 'Energetic Badge'
    }
};

export const WithCustomClass: Story = {
    args: {
        variant: 'default',
        text: 'Custom Styled Badge',
        class: 'uppercase tracking-wide'
    },
    parameters: {
        docs: {
            description: {
                story: '`class` is merged last, so call-site utilities win over the variant styles.'
            }
        }
    }
};

export const EmptyText: Story = {
    args: {
        variant: 'default',
        text: ''
    },
    parameters: {
        docs: {
            description: {
                story:
                    'A badge with no label renders nothing at all. An empty pill is never what ' +
                    'the caller wanted, and it used to leave a stray 30px box in the layout.'
            }
        }
    }
};

export const NullText: Story = {
    args: {
        variant: 'default',
        text: null as any
    }
};

export const WithChildren: Story = {
    args: {
        variant: 'info',
        showIcon: false
    },
    render: (args) => ({
        Component: BadgeWithChildren,
        props: args
    }),
    parameters: {
        docs: {
            description: {
                story:
                    'Snippet children take precedence over `text`, so a badge can hold markup ' +
                    'rather than a plain string. A `children` string passed through CSF args ' +
                    'cannot work — Svelte needs a real snippet, which is what this harness provides.'
            }
        }
    }
};

export const DynamicContent: Story = {
    args: {
        variant: 'success',
        text: 'Dynamic content test'
    },
    parameters: {
        docs: {
            description: {
                story: 'This story tests the Badge component with dynamic content to ensure it handles rapid state changes without DOM access errors.'
            }
        }
    }
};

export const WithIcons: Story = {
    args: {
        variant: 'success',
        text: 'With Icons',
        showIcon: true
    },
    parameters: {
        docs: {
            description: {
                story: 'Badge variants with their respective Lucide icons enabled by default.'
            }
        }
    }
};

export const WithoutIcons: Story = {
    args: {
        variant: 'success',
        text: 'Without Icons',
        showIcon: false
    },
    parameters: {
        docs: {
            description: {
                story: 'Badge variants with icons disabled for a cleaner look.'
            }
        }
    }
};

export const AllVariantsWithIcons: Story = {
    render: (args) => ({
        Component: BadgeGallery,
        props: { showIcon: true, ...args }
    }),
    parameters: {
        docs: {
            description: {
                story:
                    'Every variant at both emphases. Subtle is the default: a page full of ' +
                    'saturated fills is noise, and a badge is a label, not a button. Both ' +
                    'emphases are built from the same step of each family ramp, so no variant ' +
                    'shouts louder than another.'
            }
        }
    }
};

export const Solid: Story = {
    args: {
        variant: 'warning',
        emphasis: 'solid',
        text: 'Solid Badge',
        showIcon: true
    },
    parameters: {
        docs: {
            description: {
                story: 'Use `emphasis="solid"` for the one badge on a screen that has to shout.'
            }
        }
    }
};
