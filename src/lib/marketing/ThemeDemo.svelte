<script lang="ts">
    import Badge from "../../components/atoms/Badge.svelte";
    import Button from "../../components/atoms/Button.svelte";
    import Card from "../../components/atoms/Card.svelte";
    import Checkbox from "../../components/atoms/Checkbox.svelte";
    import Heading from "../../components/atoms/Heading.svelte";
    import Input from "../../components/atoms/Input.svelte";
    import Progress from "../../components/atoms/Progress.svelte";
    import Text from "../../components/atoms/Text.svelte";
    import ThemeToggle from "../../components/atoms/ThemeToggle.svelte";
    import SegmentedControl from "../../components/molecules/SegmentedControl.svelte";

    import { ACCENTS, generatedTheme } from "./brand-accents";
    import { brand, isAccent } from "./brand-state.svelte";

    /**
     * The two-brand proof on the theming page.
     *
     * The switch sets the same state as the menu in the top bar, so the brand
     * goes on the document: the whole page, the top bar and every other page
     * follow, in light and in dark. That is the only way a generated brand
     * can be shown, because it replaces the ramps the roles are resolved from
     * on the root element.
     *
     * Only the default and the generated brands are offered here. Pine and
     * Citron, in the top bar, re-point roles and are not what the guide
     * describes.
     */
    const options = ACCENTS.filter((item) => item.kind !== "roles").map((item) => ({
        value: item.id,
        label: item.kind === "default" ? "Default" : item.label,
    }));

    let remember = $state(true);

    const theme = $derived(generatedTheme(brand.accent));

    function choose(value: string) {
        if (isAccent(value)) brand.accent = value;
    }
</script>

<div
    class="rounded-container border border-border bg-surface-raised p-4 shadow-sm sm:p-6"
    data-testid="theme-demo"
>
    <div class="flex flex-wrap items-end justify-between gap-4">
        <div class="min-w-0 grow sm:max-w-xs">
            <p id="theme-demo-brand" class="mb-2 text-sm font-semibold text-label">Brand</p>
            <SegmentedControl
                {options}
                value={brand.accent}
                onchange={choose}
                aria-labelledby="theme-demo-brand"
            />
        </div>
        <div class="flex items-center gap-3">
            <span class="text-sm font-semibold text-label">Light or dark</span>
            <ThemeToggle variant="outline" />
        </div>
    </div>

    <Card class="mt-6" variant="outlined">
        <div class="space-y-6">
            <div class="flex flex-wrap items-start justify-between gap-3">
                <div class="min-w-0">
                    <Heading level={3} size={4}>Tonight's round</Heading>
                    <Text tone="description" class="mt-1">
                        Ten questions, one walk. Starts at the harbour.
                    </Text>
                </div>
                <Badge variant="info" text="Open" />
            </div>
            <Input label="Team name" placeholder="The Night Owls" class="min-w-0" />
            <div class="flex flex-wrap items-center gap-6">
                <Checkbox label="Remember this team" bind:checked={remember} />
                <a
                    class="focus-ring relative rounded-sm text-sm font-semibold text-link underline underline-offset-4 before:absolute before:inset-x-0 before:-inset-y-3 hover:text-link-hover"
                    href="#tokens"
                >
                    Which tokens did that?
                </a>
            </div>
            <Progress label="Answered" value={60} />
            <div class="flex flex-wrap gap-3">
                <Button variant="primary">Start the round</Button>
                <Button variant="secondary">Invite a friend</Button>
            </div>
        </div>
    </Card>

    <p class="mt-6 text-sm leading-6 text-description" aria-live="polite">
        {#if theme}
            Generated from <code class="text-headline">{theme.options.brand}</code
            >{#if theme.options.neutral}
                {" "}and the neutral <code class="text-headline">{theme.options.neutral}</code
                >{/if}. The brand is
            {theme.closest.brand.exact ? "exactly" : "closest to"} step
            {theme.closest.brand.step}; the primary button is step 600,
            <code class="text-headline">{theme.tokens["--zabi-brand-600"]}</code>, in light and
            step 400, <code class="text-headline">{theme.tokens["--zabi-brand-400"]}</code>, in
            dark.
        {:else}
            The theme as it ships. Nothing is overridden.
        {/if}
    </p>
</div>
