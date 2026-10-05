<script lang="ts">
    import { onMount } from "svelte";
    import House from "@lucide/svelte/icons/house";
    import Info from "@lucide/svelte/icons/info";
    import Trophy from "@lucide/svelte/icons/trophy";
    import User from "@lucide/svelte/icons/user";
    import Button from "../../components/atoms/Button.svelte";
    import Checkbox from "../../components/atoms/Checkbox.svelte";
    import FloatingActionButton from "../../components/atoms/FloatingActionButton.svelte";
    import IconButton from "../../components/atoms/IconButton.svelte";
    import Input from "../../components/atoms/Input.svelte";
    import Radio from "../../components/atoms/Radio.svelte";
    import Toast from "../../components/atoms/Toast.svelte";
    import Tooltip from "../../components/atoms/Tooltip.svelte";
    import AppBar from "../../components/molecules/AppBar.svelte";
    import BottomTabBar from "../../components/molecules/BottomTabBar.svelte";
    import Modal from "../../components/molecules/Modal.svelte";
    import Page from "../../components/molecules/Page.svelte";
    import Toaster from "../../components/molecules/Toaster.svelte";
    import { pushToast } from "../../components/molecules/toast-store.js";
    import AppShell from "../../components/organisms/AppShell.svelte";
    import type { BottomTabBarItem } from "../../components/util/bottom-tab-bar.js";

    /** Playwright: the page is usable before it hydrates; wait for this marker. */
    let hydrated = $state(false);
    onMount(() => {
        hydrated = true;
    });

    const tabs: BottomTabBarItem[] = [
        { href: "/home", label: "Home", icon: House },
        { href: "/quiz", label: "Quiz", icon: Trophy },
        { href: "/me", label: "Me", icon: User },
    ];

    let added = $state(0);
    let shellOpen = $state(false);
    let standaloneBar = $state(false);
    let topToast = $state(false);
    let fab = $state(false);
    let undone = $state(0);

    let formOpen = $state(false);
    let mobileOpen = $state(false);
    let textOpen = $state(false);
    let plainOpen = $state(false);
    let lastClose = $state("none");

    const fields = Array.from({ length: 14 }, (_, index) => `Question ${index + 1}`);
    const paragraphs = Array.from({ length: 30 }, (_, index) => index);

    function toast() {
        pushToast({ title: "Saved", message: "Your answers were saved.", type: "success", duration: 0 });
    }

    function toastWithAction() {
        pushToast({
            title: "Answer removed",
            message: "The answer was taken out of the round.",
            type: "info",
            action: { label: "Undo", onclick: () => (undone += 1) },
        });
    }

    /** The tabs are real links; this page has nowhere for them to go. */
    function stayHere(event: MouseEvent) {
        if ((event.target as Element).closest("a")) event.preventDefault();
    }
</script>

<svelte:head>
    <title>Phone lab — Playwright</title>
    <!-- A test fixture, not a page for visitors. -->
    <meta name="robots" content="noindex" />
</svelte:head>

<Toaster style={standaloneBar ? "--toaster-bottom-offset: calc(4rem + 1px)" : undefined} />

<main class="mx-auto max-w-3xl space-y-12 p-4" data-testid="phone-lab">
    {#if hydrated}
        <span data-testid="phone-lab-hydrated" aria-hidden="true" hidden></span>
    {/if}
    <h1 class="text-2xl font-semibold text-headline">Phone lab</h1>
    <p class="text-sm text-description">
        Fixture for the phone tests of Tooltip, Toaster, Modal and Page. Not linked from the site.
    </p>

    <section class="space-y-4" aria-labelledby="lab-tooltip">
        <h2 id="lab-tooltip" class="text-lg font-medium text-headline">Tooltip</h2>
        <!-- One at each edge: the bubble is wider than the room beside its trigger. -->
        <div class="flex flex-wrap items-center justify-between gap-y-2" data-testid="tip-edges">
            <Tooltip content="Shown at the left edge of a narrow screen, where it has to move in">
                <button type="button" class="focus-ring rounded-control p-3 text-body" data-testid="tip-left">
                    L
                </button>
            </Tooltip>
            <Tooltip content="Adds a question to the round">
                <Button data-testid="tip-button" onclick={() => (added += 1)}>Add</Button>
            </Tooltip>
            <Tooltip content="Shown at the right edge of a narrow screen, where it has to move in">
                <button type="button" class="focus-ring rounded-control p-3 text-body" data-testid="tip-right">
                    R
                </button>
            </Tooltip>
        </div>
        <p class="text-sm text-description" data-testid="tip-count">Added {added}</p>
        <div class="flex items-center justify-between">
            <!-- Does nothing itself: the tooltip stays until it is dismissed. -->
            <Tooltip content="One point for each right answer" touchDuration={0}>
                <IconButton variant="ghost" label="About scoring" data-testid="tip-info">
                    <Info size={20} />
                </IconButton>
            </Tooltip>
            <Tooltip content="Asked for on the left, where a phone has no room" placement="left">
                <button type="button" class="focus-ring rounded-control p-3 text-body" data-testid="tip-side">
                    Side
                </button>
            </Tooltip>
        </div>
        <div class="flex flex-wrap items-center gap-4">
            <!-- A disabled button takes no focus and no click; the tooltip says why. -->
            <Tooltip content="Add a question first">
                <Button disabled data-testid="tip-disabled">Start</Button>
            </Tooltip>
            <!-- A link: the tap that opens the tooltip is also the tap that follows it. -->
            <Tooltip content="Jumps to the toaster section">
                <a href="#lab-toaster" class="focus-ring rounded-control p-3 text-link underline" data-testid="tip-link">
                    Link
                </a>
            </Tooltip>
            <Tooltip content="Placed against the viewport" fixed>
                <button type="button" class="focus-ring rounded-control p-3 text-body" data-testid="tip-fixed">
                    Fixed
                </button>
            </Tooltip>
        </div>
        <!-- A box that scrolls on its own: scrolling it closes a tooltip opened by a tap. -->
        <div class="h-24 overflow-y-auto rounded-container border border-border p-3" data-testid="tip-scroller">
            <Tooltip content="Inside a box that scrolls">
                <button type="button" class="focus-ring rounded-control p-3 text-body" data-testid="tip-scroll">
                    In a scroller
                </button>
            </Tooltip>
            <div class="h-64" aria-hidden="true"></div>
        </div>
        <div class="space-y-2" data-testid="selection-disabled">
            <Checkbox label="Disabled box" disabled />
            <Checkbox label="Disabled ticked box" disabled checked />
            <Checkbox label="Enabled box" />
            <Radio label="Disabled radio" name="lab-radio" value="a" disabled />
        </div>
    </section>

    <section class="space-y-3" aria-labelledby="lab-toaster">
        <h2 id="lab-toaster" class="text-lg font-medium text-headline">Toaster</h2>
        <div class="flex flex-wrap gap-2">
            <Button data-testid="toast-push" onclick={toast}>Toast</Button>
            <Button variant="secondary" data-testid="shell-open" onclick={() => (shellOpen = true)}>
                Shell
            </Button>
            <Button
                variant="secondary"
                data-testid="bar-toggle"
                onclick={() => (standaloneBar = !standaloneBar)}
            >
                Bar
            </Button>
            <Button variant="secondary" data-testid="top-toast-toggle" onclick={() => (topToast = !topToast)}>
                Top
            </Button>
            <Button variant="secondary" data-testid="toast-action-push" onclick={toastWithAction}>
                Undo toast
            </Button>
            <Button variant="secondary" data-testid="fab-toggle" onclick={() => (fab = !fab)}>FAB</Button>
        </div>
    </section>

    <section class="space-y-3" aria-labelledby="lab-modal">
        <h2 id="lab-modal" class="text-lg font-medium text-headline">Modal</h2>
        <div class="flex flex-wrap gap-2">
            <Button data-testid="modal-form-open" onclick={() => (formOpen = true)}>Form</Button>
            <Button variant="secondary" data-testid="modal-mobile-open" onclick={() => (mobileOpen = true)}>
                Phone
            </Button>
            <Button variant="secondary" data-testid="modal-text-open" onclick={() => (textOpen = true)}>
                Text
            </Button>
            <Button variant="secondary" data-testid="modal-plain-open" onclick={() => (plainOpen = true)}>
                Plain
            </Button>
        </div>
        <p class="text-sm text-description" data-testid="toast-undone">Undone {undone}</p>
        <p class="text-sm text-description" data-testid="modal-last-close">Last close: {lastClose}</p>
    </section>

    <section class="space-y-3" aria-labelledby="lab-page">
        <h2 id="lab-page" class="text-lg font-medium text-headline">Page</h2>
        <div data-testid="page-default">
            <Page class="max-w-4xl"><p class="text-body">A page that keeps clear of the safe areas.</p></Page>
        </div>
        <div data-testid="page-off">
            <Page class="max-w-4xl" safeArea={false}><p class="text-body">A page that leaves them alone.</p></Page>
        </div>
    </section>
    <!-- Room to scroll a trigger to the top of the screen. -->
    <div class="h-dvh" aria-hidden="true"></div>
</main>

<Modal
    bind:isOpen={formOpen}
    fullScreen
    title="New quiz round"
    description="Fourteen questions, in the order they are asked."
    data-testid="modal-form"
    onclose={({ reason }) => (lastClose = reason)}
>
    <div class="space-y-4">
        {#each fields as field (field)}
            <Input label={field} placeholder="Type the question" />
        {/each}
    </div>
    {#snippet footer()}
        <Button variant="secondary" onclick={() => (formOpen = false)}>Cancel</Button>
        <Button data-testid="modal-form-save" onclick={() => (formOpen = false)}>Save round</Button>
    {/snippet}
</Modal>

<Modal
    bind:isOpen={mobileOpen}
    fullScreen="mobile"
    title="Edit team"
    data-testid="modal-mobile"
    onclose={({ reason }) => (lastClose = reason)}
>
    <div class="space-y-4">
        <Input label="Team name" />
        <Input label="Captain" />
    </div>
    {#snippet footer()}
        <Button variant="secondary" onclick={() => (mobileOpen = false)}>Cancel</Button>
        <Button onclick={() => (mobileOpen = false)}>Save</Button>
    {/snippet}
</Modal>

<Modal bind:isOpen={textOpen} fullScreen title="House rules" data-testid="modal-text">
    {#each paragraphs as paragraph (paragraph)}
        <p class="mb-4 text-body">
            Rule {paragraph + 1}. Phones stay in pockets while a round is being played, and the
            quizmaster has the last word on every answer.
        </p>
    {/each}
</Modal>

<Modal bind:isOpen={plainOpen} title="Confirm changes" data-testid="modal-plain">
    <p class="text-description">This change affects all team members.</p>
    {#snippet footer()}
        <Button variant="secondary" onclick={() => (plainOpen = false)}>Cancel</Button>
        <Button onclick={() => (plainOpen = false)}>Confirm</Button>
    {/snippet}
</Modal>

{#if topToast}
    <Toast message="The round starts in a minute." />
{/if}

{#if fab}
    <FloatingActionButton label="New round" data-testid="lab-fab" />
{/if}

{#if standaloneBar}
    <BottomTabBar items={tabs} active="/quiz" onclick={stayHere} data-testid="standalone-bar" />
{/if}

{#if shellOpen}
    <!-- Over the whole page, so the shell is as tall as the screen, as in an app. -->
    <div class="fixed inset-0 z-modal" data-testid="shell-screen">
        <AppShell contentElement="div" data-testid="shell">
            {#snippet header()}
                <AppBar title="Quiz" headingLevel={2} onback={() => (shellOpen = false)} backLabel="Close app shell" />
            {/snippet}
            <div data-testid="page-in-shell">
                <Page>
                    <div class="space-y-3 p-4">
                        <Button data-testid="shell-toast-push" onclick={toast}>Push toast</Button>
                        <p class="text-body">The page inside a shell adds no safe-area padding of its own.</p>
                    </div>
                </Page>
            </div>
            {#snippet footer()}
                <BottomTabBar items={tabs} active="/quiz" onclick={stayHere} />
            {/snippet}
        </AppShell>
    </div>
{/if}
