import type { Meta, StoryObj } from '@storybook/sveltekit';
import ToasterStory from './ToasterStory.svelte';

const meta = {
    title: 'Design System/Molecules/Toaster',
    component: ToasterStory,
    parameters: {
        docs: {
            description: {
                component:
                    'Fixed notification region; pair it with pushToast from the toast store. Mount once near the app root. A toast can carry one action, such as Undo: it then stays until it is dismissed unless you give it a duration, and focusToasts() moves keyboard focus to the newest toast. Offer the same action elsewhere in the page as well. Below 640px the stack spans the width with 16px on each side; it keeps clear of the home indicator and sits above an AppShell tab bar. For a bar of your own that is fixed to the bottom, set --toaster-bottom-offset to its height on the Toaster or an ancestor: 72px above a FloatingActionButton. Over a modal overlay with a footer at the bottom of the screen the stack moves above the footer by itself, and the overlay\'s Tab cycle takes the toast controls in. More toasts than fit scroll.'
            }
        }, layout: 'fullscreen' },
    tags: ['autodocs'],
    argTypes: {
        swedish: {
            control: 'boolean',
            description: 'An app in Swedish: the toaster takes its own words through strings'
        },
        showCountdown: {
            control: 'boolean',
            description: 'Show the time a toast has left as a sentence, with a button that stops the timer'
        },
        length: {
            control: 'inline-radio',
            options: ['short', 'medium', 'long', 'persistent'],
            description: 'Story only: push toasts with this duration. short is 3 seconds, medium 7, long 14; persistent stays until dismissed'
        },
        defaultDuration: {
            control: 'inline-radio',
            options: ['short', 'medium', 'long', 'persistent'],
            description: 'What a toast pushed without a duration gets, in place of medium. An error and a toast with an action still stay until dismissed'
        }
    }
} satisfies Meta<typeof ToasterStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
    render: () => ({
        Component: ToasterStory,
    }),
};

/**
 * A toast shows what it was pushed with. Every word the toaster adds by itself
 * (the region's name, the names of its buttons, the sentence about the time
 * left, the default title of a toast pushed with no text) comes from
 * `strings`, so an app in another language has none of the English.
 */
export const InSwedish: Story = {
    args: { swedish: true },
    render: (args) => ({
        Component: ToasterStory,
        props: args,
    }),
};

/** The time a toast has left as a sentence under it, with a button that stops the timer. Off by default. */
export const WithCountdown: Story = {
    args: { showCountdown: true },
    render: (args) => ({
        Component: ToasterStory,
        props: args,
    }),
};

/**
 * `duration: "short"`: 3 seconds. For a few words that need no reading time. The stories
 * for the lengths show the time left as a sentence, so it can be seen.
 */
export const Short: Story = {
    args: { length: 'short' },
    render: (args) => ({
        Component: ToasterStory,
        props: args,
    }),
};

/** `duration: "medium"`: 7 seconds. What a toast gets when nothing is said, unless it is an error, has an action, or has more than 120 characters of text. */
export const Medium: Story = {
    args: { length: 'medium' },
    render: (args) => ({
        Component: ToasterStory,
        props: args,
    }),
};

/** `duration: "long"`: 14 seconds. For a message of a few lines; a toast with 121 to 240 characters of text gets it by itself, and a longer one stays. */
export const Long: Story = {
    args: { length: 'long' },
    render: (args) => ({
        Component: ToasterStory,
        props: args,
    }),
};

/** `duration: "persistent"`: until it is dismissed. For what the user has to act on, and for errors; an error and a toast with an action are persistent by themselves. */
export const Persistent: Story = {
    args: { length: 'persistent' },
    render: (args) => ({
        Component: ToasterStory,
        props: args,
    }),
};

/** `defaultDuration` on the Toaster: every toast pushed without a duration gets it, in place of medium. The error still stays. */
export const DefaultDuration: Story = {
    args: { defaultDuration: 'short', showCountdown: true },
    render: (args) => ({
        Component: ToasterStory,
        props: args,
    }),
};
