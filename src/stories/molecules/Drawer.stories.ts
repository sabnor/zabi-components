import type { Meta, StoryObj } from '@storybook/sveltekit';
import DrawerStory from './DrawerStory.svelte';

const meta = {
    title: 'Design System/Molecules/Drawer',
    component: DrawerStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A panel that slides in from the side of the screen, over the page. It is a modal dialog: focus moves into it and stays there, the page behind does not scroll, and Escape, the backdrop or the close button close it and return focus to what opened it. It renders in document.body, shares its scroll lock with Modal and SlideUp, and can be opened over a Modal or host one.'
            }
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof DrawerStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        Component: DrawerStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'From the right edge at the md width. initialFocus points at the search field, so it takes the initial focus instead of the close button.'
            }
        }
    }
};

export const FromTheLeft: Story = {
    args: {
        side: 'left',
        size: 'sm',
        title: 'Filters',
    },
    render: (args) => ({
        Component: DrawerStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'left and right are physical edges and stay put in a right-to-left page. Use start or end for a drawer that should follow the writing direction.'
            }
        }
    }
};

export const WithDescriptionAndFooter: Story = {
    args: {
        description: 'The page moves to the project you pick.',
        withFooter: true,
        long: true,
    },
    render: (args) => ({
        Component: DrawerStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'The description is the dialog\'s accessible description. The footer stays at the bottom while the content scrolls.'
            }
        }
    }
};

export const Large: Story = {
    args: {
        size: 'lg',
    },
    render: (args) => ({
        Component: DrawerStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'The three widths are 20rem, 28rem and 42rem. On a phone the panel is never wider than the screen.'
            }
        }
    }
};

export const NotDismissible: Story = {
    args: {
        dismissible: false,
    },
    render: (args) => ({
        Component: DrawerStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'With dismissible set to false, Escape, the backdrop and the close button do nothing; the close button stays focusable and is marked aria-disabled. Close the drawer from your own control.'
            }
        }
    }
};

export const Translated: Story = {
    args: {
        title: 'Välj projekt',
        description: 'Sidan flyttas till projektet du väljer.',
        closeLabel: 'Stäng',
    },
    render: (args) => ({
        Component: DrawerStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'title, description and closeLabel are the only strings the drawer renders.'
            }
        }
    }
};
