<script lang="ts">
    import Button from "../../components/atoms/Button.svelte";
    import Checkbox from "../../components/atoms/Checkbox.svelte";
    import Input from "../../components/atoms/Input.svelte";
    import Progress from "../../components/atoms/Progress.svelte";

    type Accent = "iris" | "pine" | "citron";
    type TokenMap = Record<string, string>;

    const accents: { id: Accent; label: string }[] = [
        { id: "iris", label: "Iris" },
        { id: "pine", label: "Pine" },
        { id: "citron", label: "Citron" },
    ];

    /**
     * Single source of truth for the demo: these maps are applied as inline custom properties
     * AND printed in the snippet, so the code shown always matches what renders.
     * Dark entries layer on top of light ones, exactly like a `.dark .brand` rule would.
     */
    const overrides: Record<Exclude<Accent, "iris">, { light: TokenMap; dark: TokenMap }> = {
        pine: {
            light: {
                "--color-action-primary": "var(--zabi-pine-700)",
                "--color-action-primary-hover": "var(--zabi-pine-600)",
                "--color-action-primary-active": "var(--zabi-pine-500)",
                "--color-action-primary-text": "var(--zabi-pine-50)",
                "--color-action-primary-subtle": "var(--zabi-pine-100)",
                "--color-action-secondary": "color-mix(in srgb, var(--zabi-pine-600) 12%, transparent)",
                "--color-action-secondary-hover": "color-mix(in srgb, var(--zabi-pine-600) 22%, transparent)",
                "--color-brand-500": "var(--zabi-pine-400)",
                "--color-brand-600": "var(--zabi-pine-500)",
                "--color-brand-700": "var(--zabi-pine-600)",
                "--color-focus": "var(--zabi-pine-400)",
                "--color-focus-ring": "var(--zabi-pine-400)",
                "--color-link": "var(--zabi-pine-600)",
            },
            dark: {
                "--color-action-primary": "var(--zabi-pine-200)",
                "--color-action-primary-hover": "var(--zabi-pine-100)",
                "--color-action-primary-active": "var(--zabi-pine-300)",
                "--color-action-primary-text": "var(--zabi-pine-950)",
                "--color-action-primary-subtle": "var(--zabi-pine-900)",
                "--color-action-secondary": "color-mix(in srgb, var(--zabi-pine-300) 16%, transparent)",
                "--color-action-secondary-hover": "color-mix(in srgb, var(--zabi-pine-300) 26%, transparent)",
                "--color-brand-600": "var(--zabi-pine-300)",
                "--color-link": "var(--zabi-pine-200)",
                "--color-focus": "var(--zabi-pine-300)",
                "--color-focus-ring": "var(--zabi-pine-300)",
            },
        },
        citron: {
            light: {
                "--color-action-primary": "var(--zabi-citron-800)",
                "--color-action-primary-hover": "var(--zabi-citron-900)",
                "--color-action-primary-active": "var(--zabi-citron-700)",
                "--color-action-primary-text": "var(--zabi-citron-50)",
                "--color-action-primary-subtle": "var(--zabi-citron-100)",
                "--color-action-secondary": "color-mix(in srgb, var(--zabi-citron-700) 14%, transparent)",
                "--color-action-secondary-hover": "color-mix(in srgb, var(--zabi-citron-700) 24%, transparent)",
                "--color-brand-500": "var(--zabi-citron-500)",
                "--color-brand-600": "var(--zabi-citron-600)",
                "--color-brand-700": "var(--zabi-citron-700)",
                "--color-focus": "var(--zabi-citron-500)",
                "--color-focus-ring": "var(--zabi-citron-500)",
                "--color-link": "var(--zabi-citron-800)",
            },
            dark: {
                "--color-action-primary": "var(--zabi-citron-300)",
                "--color-action-primary-hover": "var(--zabi-citron-200)",
                "--color-action-primary-active": "var(--zabi-citron-400)",
                "--color-action-primary-text": "var(--zabi-citron-950)",
                "--color-action-primary-subtle": "var(--zabi-citron-900)",
                "--color-action-secondary": "color-mix(in srgb, var(--zabi-citron-300) 16%, transparent)",
                "--color-action-secondary-hover": "color-mix(in srgb, var(--zabi-citron-300) 26%, transparent)",
                "--color-brand-600": "var(--zabi-citron-400)",
                "--color-link": "var(--zabi-citron-300)",
                "--color-focus": "var(--zabi-citron-400)",
                "--color-focus-ring": "var(--zabi-citron-400)",
            },
        },
    };

    /** Tokens worth showing in the snippet; the full map is still applied. */
    const snippetTokens = [
        "--color-action-primary",
        "--color-brand-600",
        "--color-focus-ring",
        "--color-link",
    ];

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

    function tokensFor(id: Accent, dark: boolean): TokenMap {
        if (id === "iris") return {};
        const { light, dark: darkMap } = overrides[id];
        return dark ? { ...light, ...darkMap } : light;
    }

    function styleFor(id: Accent, dark: boolean): string {
        return Object.entries(tokensFor(id, dark))
            .map(([name, value]) => `${name}: ${value}`)
            .join("; ");
    }

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
                    class="focus-ring swatch-button flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold text-body transition-colors aria-checked:bg-card aria-checked:text-headline aria-checked:shadow-sm"
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

    <pre
        class="mt-8 overflow-x-auto rounded-2xl border border-border bg-background p-4 text-sm leading-6 text-body"><code>{snippet}</code></pre>
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
