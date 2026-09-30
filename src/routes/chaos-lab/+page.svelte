<script lang="ts">
    import { onMount } from "svelte";
    import Tooltip from "../../components/atoms/Tooltip.svelte";
    import Modal from "../../components/molecules/Modal.svelte";
    import NavigationMenu, {
        type NavigationMenuItemData,
    } from "../../components/molecules/NavigationMenu.svelte";
    import RadioGroup from "../../components/molecules/RadioGroup.svelte";
    import SortableList from "../../components/molecules/SortableList.svelte";

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

    /** Rows of unequal height: a drag has to cope with real layout, not a fixed step. */
    let sortableItems = $state([
        { id: "hero", title: "Hero", lines: 1 },
        { id: "gallery", title: "Gallery", lines: 3 },
        { id: "pricing", title: "Pricing", lines: 1 },
        { id: "faq", title: "FAQ", lines: 2 },
    ]);
    let sortableLastMove = $state("");

    let portalOpen = $state(false);
    let trappedOpen = $state(false);
    let portalLastClose = $state("");
    let pageModalOpen = $state(false);
    let textOnlyOpen = $state(false);
</script>

<svelte:head>
    <title>Chaos lab — Playwright</title>
    <!-- A test fixture, not a page for visitors. robots.txt must not block it:
    a crawler that cannot fetch the page never sees this tag. -->
    <meta name="robots" content="noindex" />
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

    <section class="space-y-3" aria-labelledby="chaos-sortable-heading">
        <h2 id="chaos-sortable-heading" class="text-lg font-medium">
            Sortable list
        </h2>
        <SortableList
            bind:items={sortableItems}
            getKey={(entry) => entry.id}
            getLabel={(entry) => entry.title}
            onreorder={({ item, from, to }) =>
                (sortableLastMove = `${item.id}:${from}>${to}`)}
            aria-labelledby="chaos-sortable-heading"
            data-testid="chaos-sortable"
        >
            {#snippet item(entry)}
                <div
                    class="rounded-container border border-border bg-surface-raised p-3 text-sm"
                    data-testid="chaos-sortable-card-{entry.id}"
                >
                    <p class="font-medium">{entry.title}</p>
                    {#each { length: entry.lines - 1 } as _, line (line)}
                        <p class="text-description">Extra line {line + 1}</p>
                    {/each}
                </div>
            {/snippet}
        </SortableList>
        <!-- Plays a parent that replaces the list (a poll, a refetch) while a drag is in progress. -->
        <button
            type="button"
            data-testid="chaos-sortable-reverse"
            onclick={() => (sortableItems = [...sortableItems].reverse())}
        >
            Reverse order
        </button>
        <p class="text-sm text-description">
            Order: <span data-testid="chaos-sortable-order"
                >{sortableItems.map((entry) => entry.id).join(",")}</span
            >
            · Last move:
            <span data-testid="chaos-sortable-last-move">{sortableLastMove}</span>
        </p>
    </section>

    <section class="space-y-3" aria-labelledby="chaos-portal-heading">
        <h2 id="chaos-portal-heading" class="text-lg font-medium">
            Portalled modal
        </h2>
        <!-- The transform makes this box the containing block of a fixed
        descendant and the overflow clips it: the in-place modal is trapped
        here, the portalled one must not be. -->
        <div
            class="h-24 overflow-hidden rounded-container border border-border p-3"
            style="transform: translateZ(0)"
            data-testid="chaos-portal-trap"
        >
            <div class="flex flex-wrap gap-2">
                <button
                    type="button"
                    data-testid="chaos-open-portal"
                    onclick={() => (portalOpen = true)}
                >
                    Open portalled modal
                </button>
                <button
                    type="button"
                    data-testid="chaos-open-trapped"
                    onclick={() => (trappedOpen = true)}
                >
                    Open in-place modal
                </button>
            </div>
            <Modal
                bind:isOpen={portalOpen}
                portal
                title="Chaos portalled"
                data-testid="chaos-modal-portal"
                onclose={({ reason }) => (portalLastClose = reason)}
            >
                <Tooltip content="Chaos modal tooltip" placement="bottom">
                    <button type="button" data-testid="chaos-portal-action">
                        In-portal action
                    </button>
                </Tooltip>
                <button
                    type="button"
                    data-testid="chaos-open-page-modal"
                    onclick={() => (pageModalOpen = true)}
                >
                    Open page modal
                </button>
            </Modal>
            <Modal
                bind:isOpen={trappedOpen}
                title="Chaos trapped"
                data-testid="chaos-modal-trapped"
            >
                <p class="text-sm text-description">Rendered in place.</p>
            </Modal>
        </div>
        <p class="text-sm text-description">
            Last close:
            <span data-testid="chaos-portal-last-close">{portalLastClose}</span>
        </p>
        <!-- Declared in the page and rendered in place, so it sits before the
        portalled modal in the document and is opened after it. -->
        <Modal
            bind:isOpen={pageModalOpen}
            title="Chaos page modal"
            data-testid="chaos-modal-page"
        >
            <p class="text-sm text-description">Opened from the portalled modal.</p>
        </Modal>
        <button
            type="button"
            data-testid="chaos-open-text-only"
            onclick={() => (textOnlyOpen = true)}
        >
            Open text-only modal
        </button>
        <Modal
            bind:isOpen={textOnlyOpen}
            showClose={false}
            data-testid="chaos-modal-text-only"
            aria-label="Chaos text only"
        >
            <p class="text-sm text-description">Nothing to focus in here.</p>
        </Modal>
    </section>
</main>
