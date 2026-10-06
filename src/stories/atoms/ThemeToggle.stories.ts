import type { Meta, StoryObj } from '@storybook/sveltekit';
import ThemeToggle from '../../components/atoms/ThemeToggle.svelte';

const meta = {
    title: 'Design System/Atoms/ThemeToggle',
    component: ThemeToggle,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Switches the page between light and dark, or with modes="three" steps through system, light and dark. It reads and writes the theme on the html element (data-theme, or the dark class on a page without the attribute), stores the choice, and follows whatever else changes the theme.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size of the toggle button'
        },
        variant: {
            control: 'select',
            options: ['default', 'ghost', 'outline'],
            description: 'Visual variant of the toggle button'
        },
        modes: {
            control: 'inline-radio',
            options: ['two', 'three'],
            description: 'two flips light and dark; three steps system, light, dark and writes data-theme'
        },
        storageKey: {
            control: 'text',
            description: 'localStorage key for the choice; null keeps nothing'
        }
    }
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: 'md',
        variant: 'default'
    }
};

export const Small: Story = {
    args: {
        size: 'sm',
        variant: 'default'
    }
};

export const Large: Story = {
    args: {
        size: 'lg',
        variant: 'default'
    }
};

export const Ghost: Story = {
    args: {
        size: 'md',
        variant: 'ghost'
    }
};

export const Outline: Story = {
    args: {
        size: 'md',
        variant: 'outline'
    }
};

/** System, light, dark. The name states the mode and what a press does: "Theme: system. Switch to light". */
export const ThreeModes: Story = {
    args: {
        modes: 'three',
        // A key of its own, so the story does not overwrite Storybook's own theme choice.
        storageKey: 'zabi-storybook-theme-toggle'
    }
};

export const ThreeModesInSwedish: Story = {
    args: {
        modes: 'three',
        storageKey: 'zabi-storybook-theme-toggle',
        labels: {
            auto: 'följ telefonen',
            light: 'ljust',
            dark: 'mörkt',
            describe: (current: string, next: string) => `Tema: ${current}. Byt till ${next}`
        }
    }
};
