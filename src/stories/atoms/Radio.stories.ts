import type { Meta, StoryObj } from '@storybook/sveltekit';
import Radio from '../../components/atoms/Radio.svelte';
import SelectionLeadingStory from './SelectionLeadingStory.svelte';

const meta = {
    title: 'Design System/Atoms/Radio',
    component: Radio,
    parameters: {
        docs: {
            description: {
                component:
                    'Single radio input with label, focus ring, and controlled or uncontrolled checked state.'
            }
        },
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: 'plan',
        value: 'basic',
        label: 'Basic'
    }
};

export const WithLeading: StoryObj<typeof SelectionLeadingStory> = {
    render: () => ({ Component: SelectionLeadingStory, props: { control: 'radio' } }),
    parameters: {
        docs: {
            description: {
                story: 'The leading snippet sits inside the one label, between the dot and the name, so pressing the avatar chooses the option. Give the avatar an empty alt: the label already names the row.'
            }
        }
    }
};
