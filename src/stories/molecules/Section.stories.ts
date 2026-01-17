import type { Meta, StoryObj } from '@storybook/sveltekit';
import Section from '../../components/molecules/Section.svelte';
import SectionWithContent from './SectionWithContent.svelte';

const meta = {
    title: 'Design System/Molecules/Section',
    component: Section,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: 'text',
            description: 'Section title'
        },
        description: {
            control: 'text',
            description: 'Section description/subtitle'
        },
        headingLevel: {
            control: 'number',
            min: 1,
            max: 6,
            description: 'Heading level for title (1-6)'
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Section size variant'
        },
        maxWidth: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl', '2xl', 'full', 'none'],
            description: 'Maximum width of the section container'
        },
        background: {
            control: 'select',
            options: ['default', 'muted', 'accent', 'transparent'],
            description: 'Background variant'
        },
        padding: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg', 'xl'],
            description: 'Padding variant'
        },
        centered: {
            control: 'boolean',
            description: 'Whether to center the content'
        }
    }
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Welcome Section',
        description: 'This is a default section with title and description.'
    },
    render: (args) => ({
        Component: SectionWithContent,
        props: { ...args, variant: 'default' }
    })
};

export const Centered: Story = {
    args: {
        title: 'Centered Section',
        description: 'This section has centered content and text alignment.'
    },
    render: (args) => ({
        Component: SectionWithContent,
        props: { ...args, variant: 'centered' }
    })
};

export const WithMutedBackground: Story = {
    args: {
        title: 'Muted Background Section',
        description: 'This section uses a muted background variant.'
    },
    render: (args) => ({
        Component: SectionWithContent,
        props: { ...args, variant: 'muted' }
    })
};

export const WithAccentBackground: Story = {
    args: {
        title: 'Accent Background Section',
        description: 'This section uses an accent background variant.'
    },
    render: (args) => ({
        Component: SectionWithContent,
        props: { ...args, variant: 'accent' }
    })
};

export const MinimalPadding: Story = {
    args: {
        title: 'Minimal Padding Section',
        description: 'This section uses minimal padding.'
    },
    render: (args) => ({
        Component: SectionWithContent,
        props: { ...args, variant: 'minimal' }
    })
};

export const WithoutTitle: Story = {
    args: {},
    render: (args) => ({
        Component: SectionWithContent,
        props: { ...args, variant: 'notitle' }
    })
};

export const FullWidth: Story = {
    args: {
        title: 'Full Width Section',
        description: 'This section spans the full width of the container.'
    },
    render: (args) => ({
        Component: SectionWithContent,
        props: { ...args, variant: 'fullwidth' }
    })
};

