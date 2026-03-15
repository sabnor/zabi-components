import type { Meta, StoryObj } from '@storybook/sveltekit';
import CodeBlock from '../../components/atoms/CodeBlock.svelte';

const meta = {
    title: 'Design System/Atoms/CodeBlock',
    component: CodeBlock,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Displays formatted source code with optional copy action.'
            }
        }
    },
    tags: ['autodocs']
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SvelteExample: Story = {
    args: {
        language: 'svelte',
        showCopyButton: true,
        code: `<script lang="ts">\n  let count = $state(0);\n</script>\n\n<button onclick={() => count++}>Count: {count}</button>`
    }
};

export const TypeScriptExample: Story = {
    args: {
        language: 'typescript',
        showCopyButton: false,
        code: `export function formatLabel(name: string): string {\n  return name.trim().toUpperCase();\n}`
    }
};
