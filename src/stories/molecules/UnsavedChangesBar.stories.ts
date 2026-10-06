import type { Meta, StoryObj } from '@storybook/sveltekit';
import UnsavedChangesBarStory from './UnsavedChangesBarStory.svelte';

const meta = {
    title: 'Design System/Molecules/UnsavedChangesBar',
    component: UnsavedChangesBarStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A bar that appears while a form has unsaved changes, with Save and Discard. Set dirty while the form differs from what is saved, and clear it when the save has gone through. It is sticky, not fixed: put it after the last field and it stays in view while the form scrolls, without covering that field at the end. Its appearance is announced politely and it never takes focus. When it goes, focus returns to the field the user was editing. Warning before the page is closed is left to your app.'
            }
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof UnsavedChangesBarStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        Component: UnsavedChangesBarStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Save returns a promise here, so the bar shows its saving state until the request settles. Discard puts the saved value back.'
            }
        }
    }
};

export const Clean: Story = {
    args: {
        startDirty: false,
    },
    render: (args) => ({
        Component: UnsavedChangesBarStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Nothing shows until the form is dirty. Type in the field to bring the bar in; focus stays in the field.'
            }
        }
    }
};

export const Top: Story = {
    args: {
        position: 'top',
    },
    render: (args) => ({
        Component: UnsavedChangesBarStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'position="top" sticks the bar to the top of its scroll container. Put it before the first field.'
            }
        }
    }
};

export const Saving: Story = {
    args: {
        saving: true,
    },
    render: (args) => ({
        Component: UnsavedChangesBarStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'While saving, Save shows its loading state and Discard is disabled. Set saving yourself when onsave does not return a promise.'
            }
        }
    }
};

export const FailingSave: Story = {
    args: {
        failing: true,
    },
    render: (args) => ({
        Component: UnsavedChangesBarStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'When the promise from onsave rejects, the bar stays, leaves its saving state and calls onerror, so you can show what went wrong.'
            }
        }
    }
};

export const WithExtraAction: Story = {
    args: {
        withActions: true,
        message: 'This page has changes that are not published',
        saveLabel: 'Publish',
    },
    render: (args) => ({
        Component: UnsavedChangesBarStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'The actions snippet adds buttons before Discard. The message and both button labels are props.'
            }
        }
    }
};
