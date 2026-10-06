import type { Meta, StoryObj } from '@storybook/sveltekit';
import AvatarGroup from '../../components/molecules/AvatarGroup.svelte';

const people = [
    'Ada Lovelace',
    'Grace Hopper',
    'Alan Turing',
    'Edsger Dijkstra',
    'Barbara Liskov',
    'Donald Knuth',
    'Tim Berners-Lee'
].map((name) => ({ name }));

const meta = {
    title: 'Design System/Molecules/AvatarGroup',
    component: AvatarGroup,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A row of overlapping avatars: who is going, the members, who rated. It is a list, each avatar named by its person. Past max (4 by default) the rest stand behind a "+3" of the same size, named by strings.more ("and 3 more"); one person too many is shown and not counted, so there is never a "+1". The ring between two avatars is the raised surface colour; on another surface set --zabi-avatar-ring on the group. Not interactive.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
        max: { control: { type: 'number', min: 1, max: 7 } }
    }
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { people, label: "Who's going" }
};

export const OneTooMany: Story = {
    args: { people: people.slice(0, 5), label: 'Members' },
    parameters: {
        docs: {
            description: {
                story: 'Five people with max 4: the fifth is shown, since a "+1" would take the same room.'
            }
        }
    }
};

export const SmallWithMax: Story = {
    args: { people, size: 'sm', max: 3, label: 'Who rated' }
};

export const Large: Story = {
    args: { people, size: 'lg', label: 'Members' }
};
