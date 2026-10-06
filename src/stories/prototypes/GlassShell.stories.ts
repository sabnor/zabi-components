import type { Meta, StoryObj } from '@storybook/sveltekit';
import GlassShellPrototype from './GlassShellPrototype.svelte';

const meta = {
    title: 'Prototypes/Glass shell (9.0)',
    component: GlassShellPrototype,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A prototype of the 9.0 direction from docs/DESIGN_REVIEW_2026-10-06.md, not library code. The 8.1.0 components are unchanged; glass bars, a floating tab bar, a colour wash on the canvas, a grouped list and the system typeface are laid over them with styles in the story. It falls back to opaque surfaces when the reader asks for less transparency or more contrast.'
            }
        }
    },
    argTypes: {
        frameWidth: { control: 'inline-radio', options: [320, 360, 390] },
    },
} satisfies Meta<typeof GlassShellPrototype>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Glass: Story = {
    render: (args) => ({
        Component: GlassShellPrototype,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Scroll the list: rows pass under the top bar and the floating tab bar.'
            }
        }
    }
};

export const BeforeAndAfter: Story = {
    args: {
        compare: true,
    },
    render: (args) => ({
        Component: GlassShellPrototype,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'The current 8.1.0 shell beside the prototype, same components and content.'
            }
        }
    }
};
