import type { Meta, StoryObj } from '@storybook/sveltekit';
import CollapsibleStory from './CollapsibleStory.svelte';

const meta = {
    title: 'Design System/Molecules/Collapsible',
    component: CollapsibleStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'A trigger and the panel it shows and hides. Pass a title for the built-in header, a native details and summary: it opens and closes without scripts, before hydration and for a visitor who has none, and closed content stays in the DOM so a form inside it keeps its values and still submits them. Pass a trigger snippet instead to put the wiring on your own button inside your own header; that path needs scripts, because the button and the hidden panel are yours. CollapsibleGroup turns several into an accordion, exclusive without scripts too in browsers that support it.'
            }
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof CollapsibleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        Component: CollapsibleStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'The default trigger is a full-width summary with a chevron, inside a native details. Enter and Space toggle it and it works with JavaScript off, because the browser does the toggling. Find-in-page opens it too.'
            }
        }
    }
};

export const InsideAHeading: Story = {
    args: {
        heading: true,
        open: true,
    },
    render: (args) => ({
        Component: CollapsibleStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'headingLevel puts a real heading inside the summary, so the section shows up in the document outline. Pick the level that fits the page.'
            }
        }
    }
};

export const CustomTrigger: Story = {
    args: {
        customTrigger: true,
        open: true,
    },
    render: (args) => ({
        Component: CollapsibleStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'The trigger snippet renders your own header. Spread its first argument on a button and the wiring is done; the second argument carries the open state. Other buttons in the header are left alone. This one needs scripts: use title for content that must open without them.'
            }
        }
    }
};

export const UnmountOnClose: Story = {
    args: {
        unmountOnClose: true,
    },
    render: (args) => ({
        Component: CollapsibleStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'By default the field keeps what you typed while the panel is closed. With unmountOnClose the content is removed while closed and starts fresh each time, which suits heavy or read-only content.'
            }
        }
    }
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
    render: (args) => ({
        Component: CollapsibleStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'A disabled trigger cannot be activated. The panel keeps the state it has, and a CollapsibleGroup does not close it when another panel opens.'
            }
        }
    }
};

export const Accordion: Story = {
    args: {
        group: 'single',
    },
    render: (args) => ({
        Component: CollapsibleStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Inside a CollapsibleGroup, opening one panel closes the others. Arrow Up, Arrow Down, Home and End move focus between the header buttons; Tab still reaches each of them.'
            }
        }
    }
};

export const AccordionMultiple: Story = {
    args: {
        group: 'multiple',
    },
    render: (args) => ({
        Component: CollapsibleStory,
        props: args,
    }),
    parameters: {
        docs: {
            description: {
                story: 'With multiple, panels open and close independently and the group only adds the arrow keys.'
            }
        }
    }
};
