import type { Meta, StoryObj } from '@storybook/sveltekit';
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
