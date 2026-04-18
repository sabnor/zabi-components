<script lang="ts">
    import { onMount } from "svelte";
    import Tooltip from "../../components/atoms/Tooltip.svelte";
    import Modal from "../../components/molecules/Modal.svelte";
    import NavigationMenu, {
        type NavigationMenuItemData,
    } from "../../components/molecules/NavigationMenu.svelte";
    import RadioGroup from "../../components/molecules/RadioGroup.svelte";

    let modalOpen = $state(false);
    let outerOpen = $state(false);
    let innerOpen = $state(false);

    const navItems: NavigationMenuItemData[] = [
        {
            value: "alpha",
            label: "Chaos Alpha",
            content: [
                {
                    href: "#chaos-nav-anchor",
                    label: "Chaos panel link",
                },
            ],
        },
        {
            value: "beta",
            label: "Chaos Beta",
            content: [
                {
                    href: "#chaos-nav-anchor",
                    label: "Chaos other link",
                },
            ],
        },
    ];

    let radioSwap = $state(false);
    let radioValue = $state("");
    const radioOptsA = [
        { value: "x", label: "Rx" },
        { value: "y", label: "Ry" },
    ];
    const radioOptsB = [
        { value: "p", label: "Rp" },
        { value: "q", label: "Rq" },
    ];
    const radioOptions = $derived(radioSwap ? radioOptsB : radioOptsA);

    /** Playwright: `load` can finish before client JS runs; wait for this marker. */
    let chaosClientHydrated = $state(false);
    onMount(() => {
        chaosClientHydrated = true;
    });

    const chaosTooltipDelayMs = 320;
</script>

<svelte:head>
    <title>Chaos lab — Playwright</title>
</svelte:head>

<main class="mx-auto max-w-3xl space-y-16 p-8">
    {#if chaosClientHydrated}
        <span data-testid="chaos-hydrated" aria-hidden="true" hidden></span>
    {/if}
    <h1 class="text-2xl font-semibold">Chaos lab</h1>
    <p class="text-description text-sm">
        Pre-release interaction harness. Not linked from public navigation.
    </p>

    <section class="space-y-3" aria-labelledby="chaos-modal-heading">
        <h2 id="chaos-modal-heading" class="text-lg font-medium">Modal</h2>
        <div class="flex flex-wrap gap-2">
            <button
                type="button"
                data-testid="chaos-open-modal"
                onclick={() => (modalOpen = true)}
            >
                Open chaos modal
            </button>
            <button type="button" data-testid="chaos-outside-before">
                Before modal
            </button>
        </div>
        <Modal
            bind:isOpen={modalOpen}
            title="Chaos modal"
            data-testid="chaos-modal-root"
        >
            <p class="text-sm text-description">Modal body for focus trap checks.</p>
            <button type="button" data-testid="chaos-modal-body-action">
                In-modal action
            </button>
        </Modal>
    </section>

    <section class="space-y-3" aria-labelledby="chaos-nested-heading">
        <h2 id="chaos-nested-heading" class="text-lg font-medium">
            Nested modals
        </h2>
        <div class="flex flex-wrap gap-2">
            <button
                type="button"
                data-testid="chaos-open-outer"
                onclick={() => (outerOpen = true)}
            >
                Open outer
            </button>
            <button type="button" data-testid="chaos-nested-outside">
                Before nested modals
            </button>
        </div>
        <Modal
            bind:isOpen={outerOpen}
            title="Chaos outer"
            data-testid="chaos-modal-outer"
        >
            <button
                type="button"
                data-testid="chaos-open-inner"
                onclick={() => (innerOpen = true)}
            >
                Open inner
            </button>
            <Modal
                bind:isOpen={innerOpen}
                title="Chaos inner"
                data-testid="chaos-modal-inner"
            >
                <button
                    type="button"
                    data-testid="chaos-close-inner"
                    onclick={() => (innerOpen = false)}
                >
                    Close inner
                </button>
            </Modal>
            <button
                type="button"
                data-testid="chaos-close-outer"
                onclick={() => (outerOpen = false)}
            >
                Close outer
            </button>
        </Modal>
    </section>

    <section
        class="space-y-3"
        aria-labelledby="chaos-tooltip-heading"
        data-chaos-tooltip-delay={String(chaosTooltipDelayMs)}
    >
        <h2 id="chaos-tooltip-heading" class="text-lg font-medium">Tooltip</h2>
        <Tooltip
            content="Chaos delayed tooltip"
            delay={chaosTooltipDelayMs}
            placement="top"
        >
            <button type="button">Chaos tooltip target</button>
        </Tooltip>
    </section>

    <section class="space-y-3" aria-labelledby="chaos-nav-heading">
        <h2 id="chaos-nav-heading" class="text-lg font-medium">
            Navigation menu
        </h2>
        <div id="chaos-nav-anchor" tabindex="-1"></div>
        <NavigationMenu
            items={navItems}
            menuId="playwright-chaos-nav"
            viewport={false}
        />
    </section>

    <section class="space-y-3" aria-labelledby="chaos-radio-heading">
        <h2 id="chaos-radio-heading" class="text-lg font-medium">Radio group</h2>
        <button
            type="button"
            data-testid="chaos-radio-swap"
            aria-label="Swap chaos radio groups"
            onclick={() => (radioSwap = !radioSwap)}
        >
            Swap options
        </button>
        <RadioGroup legend="Chaos radios" bind:value={radioValue} options={radioOptions} />
    </section>
</main>
