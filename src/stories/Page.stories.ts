import type { Meta, StoryObj } from '@storybook/svelte';
import Page from '../components/Page.svelte';

const meta = {
  title: 'Components/Page',
  component: Page,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};