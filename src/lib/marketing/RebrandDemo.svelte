<script lang="ts">
    import Button from "../../components/atoms/Button.svelte";
    import Checkbox from "../../components/atoms/Checkbox.svelte";
    import Input from "../../components/atoms/Input.svelte";
    import Progress from "../../components/atoms/Progress.svelte";

    import {
        ACCENTS as accents,
        SNIPPET_TOKENS as snippetTokens,
        styleFor,
        tokensFor,
        type Accent,
    } from "./brand-accents";

    let accent = $state<Accent>("iris");
    let checked = $state(true);
    let isDark = $state(false);

    $effect(() => {
        const root = document.documentElement;
        const sync = () => (isDark = root.classList.contains("dark"));
        sync();
        const observer = new MutationObserver(sync);
        observer.observe(root, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    });

    const snippet = $derived.by(() => {
        if (accent === "iris") {
            return `/* Iris is the default theme. Nothing to override. */`;
        }
        const tokens = tokensFor(accent, isDark);
        const lines = snippetTokens.map((name) => `  ${name}: ${tokens[name]};`);
        return `${isDark ? ".dark .brand" : ".brand"} {\n${lines.join("\n")}\n}`;
    });

    function onKeydown(event: KeyboardEvent) {
        const index = accents.findIndex((item) => item.id === accent);
        let next = index;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % accents.length;
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + accents.length) % accents.length;
        else return;
        event.preventDefault();
        accent = accents[next].id;
        const group = event.currentTarget as HTMLElement;
        group.querySelectorAll<HTMLButtonElement>("[role=radio]")[next]?.focus();
    }
</script>

<div class="rounded-3xl border border-border bg-card p-6 sm:p-8">
    <div class="flex flex-wrap items-center justify-between gap-4">
        <p id="accent-label" class="text-sm font-semibold text-label">Accent</p>
        <div
            class="inline-flex rounded-full border border-border bg-background p-1"
            role="radiogroup"
            aria-labelledby="accent-label"
            tabindex="-1"
            onkeydown={onKeydown}
        >
            {#each accents as item (item.id)}
                <button
                    type="button"
                    role="radio"
                    aria-checked={accent === item.id}
                    tabindex={accent === item.id ? 0 : -1}
                    class="focus-ring swatch-button flex h-8 cursor-pointer items-center gap-2 rounded-full px-3 text-sm font-semibold text-body transition-colors aria-checked:bg-card aria-checked:text-headline aria-checked:shadow-sm"
                    style={styleFor(item.id, isDark)}
                    onclick={() => (accent = item.id)}
                >
                    <span class="swatch" aria-hidden="true"></span>
                    {item.label}
                </button>
            {/each}
        </div>
    </div>

    <div class="mt-8 space-y-6" style={styleFor(accent, isDark)}>
        <Input label="Project name" placeholder="Northwind" class="min-w-0" />
        <div class="flex flex-wrap items-center gap-6">
            <Checkbox label="Notify the team" bind:checked />
            <a class="rounded-sm text-sm font-semibold text-link underline underline-offset-4 focus-ring" href="/docs">
                Theming guide
            </a>
        </div>
        <Progress label="Setup" value={64} />
        <div class="flex flex-wrap gap-3">
            <Button variant="primary" size="sm">Create project</Button>
            <Button variant="secondary" size="sm">Save draft</Button>
        </div>
    </div>

    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <!-- Focusable so the snippet can be scrolled by keyboard (WCAG 2.1.1). -->
    <pre
        class="focus-ring mt-8 overflow-x-auto rounded-2xl border border-border bg-background p-4 text-sm leading-6 text-body"
        tabindex="0"
        role="region"
        aria-label="Token overrides for the selected accent"><code>{snippet}</code></pre>
</div>

<style>
    .swatch {
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 999px;
        background: var(--color-action-primary);
        box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-headline) 15%, transparent);
    }
</style>
