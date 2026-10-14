<script lang="ts">
    /*
     * PROTOTYPE for the 9.0 glass direction (docs/DESIGN_REVIEW_2026-10-06.md).
     * Nothing here is library code: the glass, the canvas wash, the typeface
     * and the floating tab bar are all done with the styles at the bottom of
     * this file, laid over the unchanged 8.1.0 components. It exists to judge
     * the look before anything is built.
     */
    import Bell from '@lucide/svelte/icons/bell';
    import ChevronRight from '@lucide/svelte/icons/chevron-right';
    import House from '@lucide/svelte/icons/house';
    import Plus from '@lucide/svelte/icons/plus';
    import Search from '@lucide/svelte/icons/search';
    import Trophy from '@lucide/svelte/icons/trophy';
    import User from '@lucide/svelte/icons/user';
    import IconButton from '../../components/atoms/IconButton.svelte';
    import AppBar from '../../components/molecules/AppBar.svelte';
    import BottomTabBar from '../../components/molecules/BottomTabBar.svelte';
    import AppShell from '../../components/organisms/AppShell.svelte';
    import type { BottomTabBarItem } from '../../components/util/bottom-tab-bar.js';

    interface Props {
        /** Show the current 8.1.0 shell beside the prototype. */
        compare?: boolean;
        /** Width of each phone frame in px. */
        frameWidth?: 320 | 360 | 390;
    }

    let { compare = false, frameWidth = 360 }: Props = $props();

    const items: BottomTabBarItem[] = [
        { href: '/home', label: 'Home', icon: House },
        { href: '/quiz', label: 'Quiz', icon: Trophy },
        { href: '/inbox', label: 'Inbox', icon: Bell, badge: 3 },
        { href: '/me', label: 'Me', icon: User },
    ];

    let active = $state('/quiz');
    const title = $derived(items.find((item) => item.href === active)?.label ?? '');
    const rounds = Array.from({ length: 14 }, (_, index) => `Round ${index + 1}`);

    /** The tabs are real links; a story has nowhere for them to go. */
    function select(event: MouseEvent) {
        const link = (event.target as Element).closest('a');
        if (!link) return;
        event.preventDefault();
        active = link.getAttribute('href') ?? active;
    }
</script>

{#snippet header()}
    <!-- The bar stays: content is meant to be seen passing under it. -->
    <AppBar {title} headingLevel={2}>
        {#snippet actions()}
            <IconButton variant="ghost" size="lg" label="Search">
                <Search size={20} />
            </IconButton>
        {/snippet}
    </AppBar>
{/snippet}

{#snippet footer()}
    <BottomTabBar {items} {active} onclick={select} />
{/snippet}

{#snippet fab(extra: string)}
    <IconButton
        size="lg"
        label="New quiz"
        class="absolute right-4 rounded-pill shadow-lg {extra}"
    >
        <Plus size={24} />
    </IconButton>
{/snippet}

<div class="flex flex-wrap items-start gap-8">
    {#if compare}
        <figure class="m-0">
            <figcaption class="mb-2 text-sm text-description">Current (8.1.0)</figcaption>
            <div
                class="overflow-hidden rounded-container border border-border"
                style="width: {frameWidth}px;"
            >
                <AppShell class="h-[40rem]" {header} {footer}>
                    <ul class="m-0 list-none space-y-3 p-4">
                        {#each rounds as round (round)}
                            <li class="rounded-container border border-border bg-card p-4">
                                <p class="font-medium text-headline">{round}</p>
                                <p class="text-sm text-description">
                                    Ten questions, one point each.
                                </p>
                            </li>
                        {/each}
                    </ul>
                    {@render fab('bottom-[calc(var(--app-shell-bottom-inset)+1rem)]')}
                </AppShell>
            </div>
        </figure>
    {/if}

    <figure class="m-0">
        {#if compare}
            <figcaption class="mb-2 text-sm text-description">Glass prototype (9.0)</figcaption>
        {/if}
        <div class="glass overflow-hidden rounded-[2rem]" style="width: {frameWidth}px;">
            <AppShell class="h-[40rem]" {header} {footer}>
                <div class="space-y-6 px-4 pt-2">
                    <!-- Colour in the content layer, so the glass has something to show. -->
                    <section class="glass-hero rounded-[1.25rem] p-5">
                        <p class="m-0 text-sm font-medium opacity-80">Tonight, 20:00</p>
                        <p class="m-0 mt-1 text-2xl font-bold tracking-tight">Music quiz</p>
                        <p class="m-0 mt-1 text-sm opacity-80">The Crown. Six teams signed up.</p>
                    </section>

                    <section>
                        <h3 class="m-0 px-4 pb-2 text-sm font-medium text-description">Rounds</h3>
                        <!-- One solid surface with dividers, not a card per row. -->
                        <ul class="glass-group m-0 list-none overflow-hidden rounded-[1.25rem] bg-card p-0">
                            {#each rounds as round (round)}
                                <li class="glass-row flex items-center gap-3 px-4 py-3">
                                    <div class="min-w-0 flex-1">
                                        <p class="m-0 font-medium text-headline">{round}</p>
                                        <p class="m-0 text-sm text-description">
                                            Ten questions, one point each.
                                        </p>
                                    </div>
                                    <ChevronRight size={18} class="shrink-0 text-caption" />
                                </li>
                            {/each}
                        </ul>
                    </section>
                </div>
                {@render fab('glass-fab bottom-[calc(var(--app-shell-bottom-inset)+1.75rem)]')}
            </AppShell>
        </div>
    </figure>
</div>

<style>
    /* ---- What 9.0 would hold as tokens -------------------------------- */
    .glass {
        /* Typeface: the platform's own UI face (San Francisco on Apple
           devices), in place of Nunito Sans. */
        --font-family-sans:
            ui-sans-serif, system-ui, -apple-system, "SF Pro Text", "Segoe UI", Roboto,
            "Helvetica Neue", sans-serif;
        --font-family-heading: var(--font-family-sans);
        font-family: var(--font-family-sans);

        /* A near-white canvas (near-black in dark) under a colour wash. */
        --color-surface-base: var(--color-base-50);
        --color-background: var(--color-base-50);

        /* The material: fill, blur, light edge, soft layered shadow. */
        --glass-fill: color-mix(in srgb, var(--color-surface-raised) 58%, transparent);
        --glass-wash: 85%;
        --glass-filter: blur(24px) saturate(180%);
        --glass-highlight: rgb(255 255 255 / 0.6);
        --glass-rim: color-mix(in srgb, var(--color-headline) 9%, transparent);
        --glass-shadow: 0 1px 2px rgb(0 0 0 / 0.06), 0 10px 30px rgb(0 0 0 / 0.14);
        --glass-hairline: color-mix(in srgb, var(--color-headline) 10%, transparent);
    }
    :global(.dark) .glass {
        --glass-highlight: rgb(255 255 255 / 0.14);
        --glass-wash: 45%;
        --glass-shadow: 0 1px 2px rgb(0 0 0 / 0.3), 0 10px 30px rgb(0 0 0 / 0.5);
    }

    /* ---- Canvas: a wash that does not scroll -------------------------- */
    .glass :global([data-app-shell]) {
        background:
            radial-gradient(
                90% 46% at 8% 0%,
                color-mix(in srgb, var(--color-brand-300) var(--glass-wash), transparent),
                transparent 70%
            ),
            radial-gradient(
                80% 40% at 100% 4%,
                color-mix(in srgb, var(--color-accent-300) var(--glass-wash), transparent),
                transparent 70%
            ),
            var(--color-surface-base);
    }

    /* ---- Top bar: no slab, a soft edge that content fades under ------- */
    .glass :global([data-app-shell-header] > header) {
        border-bottom-color: transparent;
        background: transparent;
    }
    .glass :global([data-app-shell-header] > header)::before {
        position: absolute;
        inset: 0 0 -1.25rem 0;
        z-index: -1;
        content: "";
        background: linear-gradient(
            to bottom,
            color-mix(in srgb, var(--color-surface-base) 72%, transparent),
            transparent
        );
        backdrop-filter: blur(18px) saturate(160%);
        -webkit-backdrop-filter: blur(18px) saturate(160%);
        mask-image: linear-gradient(to bottom, black 55%, transparent);
        -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent);
        pointer-events: none;
    }
    /* A control on the bar is its own piece of glass. */
    .glass :global([data-app-shell-header] button) {
        border-radius: var(--radius-pill);
        background: var(--glass-fill);
        box-shadow:
            inset 0 1px 0 var(--glass-highlight),
            inset 0 0 0 1px var(--glass-rim),
            var(--glass-shadow);
        backdrop-filter: var(--glass-filter);
        -webkit-backdrop-filter: var(--glass-filter);
    }

    /* ---- Tab bar: floats over the content ----------------------------- */
    .glass :global([data-app-shell-footer]) {
        position: absolute;
        inset: auto 0.75rem 0.75rem 0.75rem;
    }
    .glass :global([data-app-shell-footer] > nav) {
        border: 0;
        border-radius: 1.75rem;
        background: var(--glass-fill);
        box-shadow:
            inset 0 1px 0 var(--glass-highlight),
            inset 0 0 0 1px var(--glass-rim),
            var(--glass-shadow);
        backdrop-filter: var(--glass-filter);
        -webkit-backdrop-filter: var(--glass-filter);
    }
    /* The active mark keeps its outline (it is what carries 3:1); the fill
       becomes a tint of the glass. */
    .glass :global([data-app-shell-footer] a[aria-current="page"] > span:first-child) {
        background: color-mix(in srgb, var(--color-action-primary) 16%, transparent);
    }
    /* The bar no longer takes room, so the content clears it itself. */
    .glass :global([data-app-shell-content]) {
        padding-bottom: calc(var(--app-shell-bottom-inset) + 2rem);
    }

    /* ---- Content layer: solid, with colour and gradients -------------- */
    .glass-hero {
        color: var(--color-on-brand);
        background: linear-gradient(135deg, var(--color-brand-600), var(--color-brand-800));
        box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.25),
            0 12px 28px color-mix(in srgb, var(--color-brand-700) 30%, transparent);
    }
    .glass-group {
        box-shadow: 0 0 0 1px var(--glass-hairline);
    }
    .glass-row + .glass-row {
        border-top: 1px solid var(--glass-hairline);
    }

    /* ---- Floating button: a gradient with a light top edge ------------ */
    .glass :global(.glass-fab) {
        background-image: linear-gradient(
            to bottom,
            color-mix(in srgb, white 22%, var(--color-action-primary)),
            var(--color-action-primary)
        );
        box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.4),
            0 2px 4px rgb(0 0 0 / 0.12),
            0 12px 24px color-mix(in srgb, var(--color-action-primary) 40%, transparent);
    }

    /* ---- Fallbacks: the 8.1.0 opaque surfaces ------------------------- */
    @media (prefers-reduced-transparency: reduce), (prefers-contrast: more), (forced-colors: active) {
        .glass {
            --glass-fill: var(--color-surface-raised);
            --glass-filter: none;
        }
        .glass :global([data-app-shell-header] > header) {
            border-bottom-color: var(--color-border-weak);
            background: var(--color-surface-raised);
        }
        .glass :global([data-app-shell-header] > header)::before {
            display: none;
        }
    }
    @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
        .glass {
            --glass-fill: var(--color-surface-raised);
        }
        .glass :global([data-app-shell-header] > header) {
            background: var(--color-surface-raised);
        }
    }
</style>
