import type { Meta, StoryObj } from '@storybook/sveltekit';
import SlideUp from '../../components/molecules/SlideUp.svelte';

const meta = {
    title: 'Design System/Molecules/SlideUp',
    component: SlideUp,
    parameters: {
        docs: {
            description: {
                component:
                    'Panel that slides up from the bottom edge, with a title and close control. It keeps its content clear of the home indicator on a phone. With swipeToClose it gets a grip at the top and closes on a swipe down as well; the close button, the backdrop and Escape stay. For a sheet that rests at half or full height, use BottomSheet.'
            }
        },
        layout: 'fullscreen'
    },
    tags: ['autodocs'],
    argTypes: {
        isOpen: {
            control: 'boolean'
        },
        title: {
            control: 'text'
        }
    }
} satisfies Meta<typeof SlideUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        isOpen: true,
        title: 'Slide Up Panel'
    },
    render: (args) => ({
        Component: SlideUp,
        props: args,
        children: ['This is the slide up panel content. You can put any content here.']
    })
};

export const WithoutTitle: Story = {
    args: {
        isOpen: true,
        title: ''
    },
    render: (args) => ({
        Component: SlideUp,
        props: args,
        children: ['This slide up panel has no title.']
    })
};

export const Closed: Story = {
    args: {
        isOpen: false,
        title: 'Closed Panel'
    },
    render: (args) => ({
        Component: SlideUp,
        props: args,
        children: ['This panel is closed.']
    })
};

export const SwipeToClose: Story = {
    args: {
        isOpen: true,
        title: 'Release notes',
        swipeToClose: true
    },
    render: (args) => ({
        Component: SlideUp,
        props: args,
        children: ['Drag the grip down, or swipe down on this text, to close the panel. A short pull springs back.']
    }),
    parameters: {
        docs: {
            description: {
                story: 'swipeToClose adds a grip and the gesture. The grip is decorative: the close button is still the control for a keyboard and a screen reader.'
            }
        }
    }
};
