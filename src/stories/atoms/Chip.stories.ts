import type { Meta, StoryObj } from '@storybook/sveltekit';
import ChipStory from './ChipStory.svelte';

const meta = {
    title: 'Design System/Atoms/Chip',
    component: ChipStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A pill for filtering and choosing, in one look and four forms. Give it an href and it is a link (aria-current while selected), which works without scripts. Give it nothing else and it is a toggle button (aria-pressed). type="checkbox" or type="radio" puts a real input under it, so it submits in a form without scripts and a choice made before the page hydrated is kept. The selected look is tonal, not solid, in light and dark, with a semibold label; the input forms take it from the native checked state. Use a ChipGroup to lay several out and to share a name and a value.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] }
    }
} satisfies Meta<typeof ChipStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Forms: Story = {
    args: { scenario: 'forms' },
    parameters: {
        docs: {
            description: {
                story: 'The four forms with one look: a link, a toggle button, a checkbox and a radio pair. Tab reaches the link, the button and the checkbox one by one; the two radios are one Tab stop, and the arrow keys move between them. A repeat press on the chosen radio does nothing; the toggle and the checkbox turn off.'
            }
        }
    }
};

export const SelectedAndNot: Story = {
    args: { scenario: 'states' },
    parameters: {
        docs: {
            description: {
                story: 'Selected is the tonal fill, a semibold label and, for a toggle button and a checkbox, a check mark. There is no outline, no ring and no solid fill. In forced colours the fill is dropped and an outline marks the selected chip.'
            }
        }
    }
};

export const Sizes: Story = {
    args: { scenario: 'sizes' },
    parameters: {
        docs: {
            description: {
                story: '28, 32 and 40px tall. On a coarse pointer the touch target reaches 44px through an invisible layer; the chip itself does not grow.'
            }
        }
    }
};

export const LeadingContentAndLongLabels: Story = {
    args: { scenario: 'leading' },
    parameters: {
        docs: {
            description: {
                story: 'An icon or an avatar before the label through the leading snippet. A label never wraps; it is cut off only when class gives the chip a maximum width.'
            }
        }
    }
};

export const Disabled: Story = {
    args: { scenario: 'disabled' },
    parameters: {
        docs: {
            description: {
                story: 'Half transparent and out of reach. A disabled link has no href and is aria-disabled, as a disabled Button link is.'
            }
        }
    }
};

export const OnABrandBlock: Story = {
    args: { scenario: 'on-brand' },
    parameters: {
        docs: {
            description: {
                story: 'Chips inside a block filled with the brand colour (bg-action-primary on-brand): the neutral and tonal fills read against it.'
            }
        }
    }
};
