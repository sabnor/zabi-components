import type { Meta, StoryObj } from '@storybook/svelte';
import Button from '../components/atoms/Button.svelte';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['brand', 'primary', 'secondary', 'success', 'danger', 'ghost']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    disabled: {
      control: { type: 'boolean' }
    },
    loading: {
      control: { type: 'boolean' }
    },
    fullWidth: {
      control: { type: 'boolean' }
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset']
    },
    className: {
      control: { type: 'text' }
    },
    uppercased: {
      control: { type: 'boolean' }
    },
    grain: {
      control: { type: 'select' },
      options: [true, false, 'auto']
    },
    grainType: {
      control: { type: 'select' },
      options: ['paper', 'canvas', 'cyber']
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brand: Story = {
  args: {
    text: 'Brand Button',
    variant: 'brand'
  }
};

export const Primary: Story = {
  args: {
    text: 'Primary Button',
    variant: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    text: 'Secondary Button',
    variant: 'secondary'
  }
};

export const Success: Story = {
  args: {
    text: 'Success Button',
    variant: 'success'
  }
};

export const Danger: Story = {
  args: {
    text: 'Danger Button',
    variant: 'danger'
  }
};

export const Ghost: Story = {
  args: {
    text: 'Ghost Button',
    variant: 'ghost'
  }
};

export const Large: Story = {
  args: {
    text: 'Large Button',
    size: 'lg'
  }
};

export const Small: Story = {
  args: {
    text: 'Small Button',
    size: 'sm'
  }
};

export const Disabled: Story = {
  args: {
    text: 'Disabled Button',
    disabled: true
  }
};

export const Loading: Story = {
  args: {
    text: 'Loading Button',
    loading: true
  }
};

export const FullWidth: Story = {
  args: {
    text: 'Full Width Button',
    fullWidth: true
  }
};

export const Uppercased: Story = {
  args: {
    text: 'Uppercased Button',
    uppercased: true
  }
};

export const WithGrain: Story = {
  args: {
    text: 'Button with Grain',
    grain: true,
    grainType: 'paper'
  }
};

export const AllVariants: Story = {
  args: {
    text: 'All Variants',
    variant: 'brand'
  }
};