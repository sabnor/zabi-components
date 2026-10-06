import type { Meta, StoryObj } from '@storybook/sveltekit';
import ZabiStringsProviderStory from './ZabiStringsProviderStory.svelte';

const meta = {
    title: 'Design System/Atoms/ZabiStringsProvider',
    component: ZabiStringsProviderStory,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    "Sets the library's own words once for everything inside it. Each component falls back to the provider's entry for it, or to the common words (close, back, required and so on) for a single-text prop, before its built-in English; a component's own strings and props still win. It is Svelte context: per request on a server, and a provider inside another replaces only the words it gives. It renders no element of its own."
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        swedish: { control: 'boolean', description: 'Wrap the screen in a provider with Swedish words' }
    }
} satisfies Meta<typeof ZabiStringsProviderStory>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One screen of an app with nothing set on any component: the back control, the field's placeholder, "(required)" and the password button are the app's Swedish. */
export const Swedish: Story = {
    args: { swedish: true }
};

/** The same screen under no provider: the English every component has always said. */
export const WithoutProvider: Story = {
    args: { swedish: false }
};
