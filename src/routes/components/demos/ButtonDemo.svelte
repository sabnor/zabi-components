<script lang="ts">
    import Button from "../../../components/atoms/Button.svelte";
    import Input from "../../../components/atoms/Input.svelte";
    import Select from "../../../components/atoms/Select.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();
</script>

{#if exampleIndex === 0}
    <div class="w-full">
        <Button>Save changes</Button>
    </div>
{:else if exampleIndex === 1}
    <div class="flex flex-wrap items-center gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="danger">Delete</Button>
        <Button variant="accent">Accent</Button>
    </div>
{:else if exampleIndex === 2}
    <div class="flex flex-wrap items-center gap-2">
        <Button disabled>Saving…</Button>
        <Button variant="secondary" disabled>Cancel</Button>
    </div>
{:else if exampleIndex === 3}
    <div class="w-full space-y-3">
        <div class="flex flex-wrap items-center gap-2">
            <Button href="#log-in" data-testid="button-demo-link">Log in</Button>
            <Button href="#docs" variant="outline" target="_blank" rel="noopener">Open the docs</Button>
            <Button href="#log-in" disabled data-testid="button-demo-link-disabled">Not yet</Button>
        </div>
        <p class="text-sm text-body" data-testid="button-demo-sentence">
            No account yet? You can
            <Button href="#register" variant="link" data-testid="button-demo-inline">
                create one with your e-mail address
            </Button>
            and log in straight away.
        </p>
    </div>
{:else if exampleIndex === 4}
    <div class="w-full space-y-3" data-testid="button-demo-wrap">
        <Button size="lg" fullWidth data-testid="button-demo-long">
            Email me a sign-in link
        </Button>
        <div class="flex flex-wrap items-start gap-2">
            <Button data-testid="button-demo-short">Save</Button>
            <Button variant="outline" loading>Saving the visit</Button>
        </div>
        <!-- One line each: on the shared height scale, beside a field of the same size. -->
        {#each ["sm", "md", "lg"] as const as size (size)}
            <div class="flex flex-wrap items-start gap-2" data-testid="button-demo-row-{size}">
                <Button {size}>Save</Button>
                <Button {size} variant="outline">Cancel</Button>
                <div class="min-w-0 flex-[1_1_8rem]">
                    <Input {size} aria-label="Place" value="The Crown" />
                </div>
                <div class="min-w-0 flex-[1_1_8rem]">
                    <Select
                        {size}
                        searchable={false}
                        placeholder="Team"
                        options={[{ value: "a", label: "Quizzly Bears" }]}
                    />
                </div>
            </div>
        {/each}
    </div>
{:else}
    <div class="flex flex-wrap items-center gap-2">
        <Button>Button</Button>
    </div>
{/if}

