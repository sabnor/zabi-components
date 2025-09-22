import type { Meta, StoryObj } from '@storybook/svelte';
import Header from '../components/Header.svelte';

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    user: {
      control: 'object',
    },
  },
} satisfies Meta<Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    user: null,
  },
};

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedInWithLongName: Story = {
  args: {
    user: {
      name: 'Christopher Alexander Johnson',
    },
  },
};