import type { Meta, StoryObj } from '@storybook/sveltekit';
import Page from '../../components/molecules/Page.svelte';

const meta = {
    title: 'Design System/Molecules/Page',
    component: Page,
    parameters: {
        docs: {
            description: {
                component:
                    "Vertical stack for doc-style pages; set the reading width via class (max-w-4xl). Keeps clear of a phone's notch and home indicator. The insets are zero on a screen without them and until the app's viewport meta tag has viewport-fit=cover; inside an AppShell the page adds nothing, because the shell has already kept clear."
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        safeArea: {
            control: 'boolean',
            description:
                'Pad the left, right and bottom by the safe-area insets. False when your own layout already keeps clear'
        }
    }
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        class: 'max-w-4xl'
    },
    render: (args) => ({
        Component: Page,
        props: args,
        children: ['A page sets the vertical rhythm of its sections; the route sets the reading width.']
    })
};

/** For an app whose own layout already pads for the notch and the home indicator. */
export const WithoutSafeArea: Story = {
    args: {
        class: 'max-w-4xl',
        safeArea: false
    },
    render: (args) => ({
        Component: Page,
        props: args,
        children: ['This page adds no safe-area padding.']
    })
};
