import type { Meta, StoryObj } from '@storybook/sveltekit';
import Avatar from '../../components/atoms/Avatar.svelte';

const meta = {
    title: 'Design System/Atoms/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A round picture of a person that falls back to their initials: the first letter of the first and of the last word of the name, one letter for a name of one word, and a person icon for an empty name. The initials are under the picture from the start, so nothing moves when the picture arrives or fails to load. It is one image named by the person; alt="" makes it decorative for a name printed beside it. The circle is 24, 32 or 48px and does not grow with the text size. Not interactive: put it in a link or a button of your own.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] }
    }
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {
    args: { name: 'Ada Lovelace' }
};

export const OneWord: Story = {
    args: { name: 'Plato' }
};

export const PictureThatFails: Story = {
    args: { name: 'Alan Turing', src: '/media/missing.jpg' },
    parameters: {
        docs: {
            description: {
                story: 'The address does not load, so the initials that were under the picture are what is left.'
            }
        }
    }
};

export const NoName: Story = {
    args: { name: '', alt: 'Unknown member' }
};

export const Small: Story = {
    args: { name: 'Grace Hopper', size: 'sm' }
};

export const Large: Story = {
    args: { name: 'Grace Hopper', size: 'lg' }
};
