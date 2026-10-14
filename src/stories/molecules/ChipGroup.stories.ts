import type { Meta, StoryObj } from '@storybook/sveltekit';
import ChipGroupStory from './ChipGroupStory.svelte';

const meta = {
    title: 'Design System/Molecules/ChipGroup',
    component: ChipGroupStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A named set of chips. layout="wrap" breaks onto as many lines as it needs; layout="row" is one line that scrolls sideways, with the chosen chip brought into view on load and an edge fade on the side that has more chips beyond it (edge="none" turns it off). type="radio" or "checkbox" makes the chips inputs that share the group\'s name and value; without a type the group only lays out links and toggle buttons. A ChipGroup inside a ChipGroup is a named sub-group in the same row, with a wider gap around it. Every group has an accessible name through label, aria-label or aria-labelledby.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        edge: { control: 'inline-radio', options: ['fade', 'none'] }
    }
} satisfies Meta<typeof ChipGroupStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WrapWithCheckboxChips: Story = {
    args: { scenario: 'wrap-checkbox' },
    parameters: {
        docs: {
            description: {
                story: 'A checkbox group: value is an array, chips turn on and off, and each submits under the group\'s name in a form. Tab reaches each chip.'
            }
        }
    }
};

export const RadioGroup: Story = {
    args: { scenario: 'radio' },
    parameters: {
        docs: {
            description: {
                story: 'A radiogroup: one Tab stop, the arrow keys move and choose, and a repeat press on the chosen chip changes nothing. A single selection never clears.'
            }
        }
    }
};

export const OneRowOfLinkChips: Story = {
    args: { scenario: 'row-links' },
    parameters: {
        docs: {
            description: {
                story: '13 link chips in a 360px container, the 11th selected. The row scrolls sideways (only the row, never the page), the selected chip is in view on load without animation, and a fade marks the side with more chips. Each chip is a plain link, so the row works with JavaScript off.'
            }
        }
    }
};

export const NamedSubGroupsInOneRow: Story = {
    args: { scenario: 'row-subgroups' },
    parameters: {
        docs: {
            description: {
                story: 'Three named groups in one row, with a wider gap between groups (24px) than between chips (8px). Each sub-group has its own accessible name, and its own type, name and value.'
            }
        }
    }
};

export const WithoutTheEdgeFade: Story = {
    args: { scenario: 'row-no-edge' },
    parameters: {
        docs: {
            description: {
                story: 'edge="none": flat colour, the chips are cut off at the edge with no fade.'
            }
        }
    }
};

export const OnABrandBlock: Story = {
    args: { scenario: 'on-brand' },
    parameters: {
        docs: {
            description: {
                story: 'The fade is a mask on the row, so it works on any background, a block filled with the brand colour included.'
            }
        }
    }
};
