import type { Meta, StoryObj } from '@storybook/sveltekit';
import StepperStory from './StepperStory.svelte';

const meta = {
    title: 'Design System/Molecules/Stepper',
    component: StepperStory,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Shows where someone is in a multi-step form. It is a navigation landmark holding one ordered list; each step is read as its number, label and state ("Step 1 of 3: Details, completed") and the current one has aria-current="step". State is never colour alone: a completed step has a check, the current one its number in a filled marker inside a ring and a heavier label, an upcoming one its number in an outlined marker, and the line between two steps is solid up to the current step and dashed after it. The full layout draws every step; the compact one draws a segmented bar and one line, "Step 2 of 3 — Ratings". With layout="auto" the Stepper is compact while it is itself narrower than 30rem, whatever the screen is, and the switch is CSS only, so it is right before any script runs. It shows progress and has nothing to press, unless interactive makes the completed steps buttons that go back; the current step and the ones after it are never buttons. When the step changes it is read out once, politely, without moving focus: putting focus on the new step\'s heading is the app\'s job. The stories wire it to Back and Next buttons, as an app would.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        count: { control: { type: 'range', min: 2, max: 7, step: 1 } },
        start: { control: { type: 'number', min: 0, max: 6 } },
        size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
        layout: { control: 'inline-radio', options: ['auto', 'full', 'compact'] },
        frameWidth: { control: 'inline-radio', options: [288, 343, 480, 640, 960] },
    },
} satisfies Meta<typeof StepperStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'The three steps of a Log visit form, at the second. In a 640px box the layout is full.'
            }
        }
    }
};

export const Compact: Story = {
    args: {
        frameWidth: 288,
    },
    parameters: {
        docs: {
            description: {
                story: 'The same Stepper in a 288px box, which is a 320px phone with 16px margins: under 30rem of its own width it is a segmented bar and one line of text.'
            }
        }
    }
};

export const ForcedLayouts: Story = {
    args: {
        layout: 'compact',
        frameWidth: 960,
    },
    parameters: {
        docs: {
            description: {
                story: 'layout="compact" keeps the compact layout at any width; layout="full" keeps the full one, and long labels then wrap under each other.'
            }
        }
    }
};

export const Interactive: Story = {
    args: {
        interactive: true,
        start: 2,
    },
    parameters: {
        docs: {
            description: {
                story: 'Completed steps are buttons that go back to that step. Pressing one puts focus on the step it has become. On a touch screen every button is 44px tall, in both layouts.'
            }
        }
    }
};

export const WithDescriptions: Story = {
    args: {
        descriptions: true,
        frameWidth: 960,
    },
    parameters: {
        docs: {
            description: {
                story: 'A step can have a line under its label. The compact layout shows the line of the current step.'
            }
        }
    }
};

export const Small: Story = {
    args: {
        size: 'sm',
    },
};

export const Large: Story = {
    args: {
        size: 'lg',
    },
};

export const FirstStep: Story = {
    args: {
        start: 0,
    },
    parameters: {
        docs: {
            description: {
                story: 'Nothing is completed yet: one filled marker and two outlined ones.'
            }
        }
    }
};

export const LastStep: Story = {
    args: {
        start: 2,
    },
};

export const ManySteps: Story = {
    args: {
        count: 7,
        start: 3,
        frameWidth: 960,
    },
    parameters: {
        docs: {
            description: {
                story: 'Seven steps. Labels wrap before the markers are pushed out of the box; for more steps than fit, set layout="compact".'
            }
        }
    }
};

export const Translated: Story = {
    args: {
        swedish: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Swedish labels with label and strings replaced. stepLabel builds the whole sentence a screen reader reads, state word included.'
            }
        }
    }
};
