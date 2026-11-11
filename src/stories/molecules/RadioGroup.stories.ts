import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import RadioGroup from '../../components/molecules/RadioGroup.svelte';

const options = [
    { value: 'system', label: 'Follow system', description: 'Uses the setting of the device' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' }
];

const meta = {
    title: 'Design System/Molecules/RadioGroup',
    component: RadioGroup,
    parameters: {
        docs: {
            description: {
                component:
                    'Fieldset of radios with a legend and arrow-key navigation. The chosen row has a ring by default.'
            }
        },
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { legend: 'Appearance', options, defaultValue: 'system' }
};

export const WithoutChosenRing: Story = {
    args: { legend: 'Appearance', options, defaultValue: 'system', chosenRing: false },
    parameters: {
        docs: {
            description: {
                story: 'chosenRing={false}: the filled radio alone shows the choice, so the row does not look keyboard-focused. Tab into the group and the focus ring still appears.'
            }
        }
    }
};

export const DescriptionAndCentredRows: Story = {
    args: { legend: 'Appearance', options, defaultValue: 'light' },
    parameters: {
        docs: {
            description: {
                story: 'An option description is tied to its radio with aria-describedby and is not part of its name ("Follow system"). A one-line option is centred in its row; with a description the radio stays at the top, level with the label.'
            }
        }
    }
};

const radii: Record<string, string> = {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    full: '9999px'
};

const shapeOptions = [
    { value: 'none', label: 'None' },
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'full', label: 'Full' }
];

const shapePreview = createRawSnippet((option: () => { value: string }) => ({
    render: () =>
        `<span style="display:block;width:3rem;height:1.75rem;background:var(--color-action-primary);border-radius:${radii[option().value]}"></span>`
}));

export const Tiles: Story = {
    args: {
        legend: 'Button shape',
        options: shapeOptions,
        appearance: 'tile',
        optionVisual: shapePreview,
        defaultValue: 'md'
    },
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'appearance="tile" with optionVisual: a wrapping grid of tiles, each a picture over its label. Five options fit and wrap on a phone. The picture is hidden from assistive technology; the label is the name. Same radios and arrow keys as the list.'
            }
        }
    }
};

export const TilesRow: Story = {
    args: {
        legend: 'Button shape',
        options: shapeOptions,
        appearance: 'tile',
        tileLayout: 'row',
        columns: 1,
        optionVisual: shapePreview,
        defaultValue: 'md'
    },
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'tileLayout="row": the picture beside the text. The chosen tile has a 2px edge, a tinted fill and a check badge, so the choice does not rest on colour alone. columns sets a fixed column count (tileMinWidth the narrowest tile otherwise).'
            }
        }
    }
};
