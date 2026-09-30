import type { Meta, StoryObj } from '@storybook/sveltekit';
import Spinner from '../../components/atoms/Spinner.svelte';

const meta = {
    title: 'Design System/Atoms/Spinner',
    component: Spinner,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'The ring Button, IconButton and Input show while loading, on its own. It takes the text colour. Beside text that already says what is happening it is decorative; give it a label when it stands alone, and it becomes a status that screen readers announce. Under a reduced-motion preference it fades in and out instead of spinning.'
            }
        }
    },
    argTypes: {
        size: {
            control: 'inline-radio',
            options: ['xs', 'sm', 'md', 'lg']
        },
        label: { control: 'text' },
        class: { control: 'text' }
    },
    tags: ['autodocs']
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Decorative: hidden from assistive technology. Put it next to text such as "Saving changes".'
            }
        }
    }
};

export const Small: Story = {
    args: {
        size: 'sm'
    },
    parameters: {
        docs: {
            description: {
                story: 'The sizes are 12, 14, 16 and 20px, the ones the built-in loading states use.'
            }
        }
    }
};

export const Large: Story = {
    args: {
        size: 'lg'
    }
};

export const WithLabel: Story = {
    args: {
        label: 'Loading projects',
        size: 'lg'
    },
    parameters: {
        docs: {
            description: {
                story: 'With a label the spinner is a status and the label is read out. Nothing about it looks different.'
            }
        }
    }
};

export const CustomSizeAndColour: Story = {
    args: {
        class: 'size-8 text-link'
    },
    parameters: {
        docs: {
            description: {
                story: 'class takes a size utility for anything off the scale, and a text colour utility to change the colour.'
            }
        }
    }
};
