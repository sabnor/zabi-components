<script lang="ts">
    import Badge from "../../components/atoms/Badge.svelte";
    import Button from "../../components/atoms/Button.svelte";
    import Checkbox from "../../components/atoms/Checkbox.svelte";
    import Input from "../../components/atoms/Input.svelte";
    import Progress from "../../components/atoms/Progress.svelte";
    import RadioGroup from "../../components/molecules/RadioGroup.svelte";

    let showNames = $state(true);
    let email = $state("");
    let emailTouched = $state(false);
    let role = $state("editor");
    let sendWelcome = $state(true);
    let sending = $state(false);
    let invited = $state<string[]>([]);
    let sendTimer: ReturnType<typeof setTimeout> | undefined;

    $effect(() => () => clearTimeout(sendTimer));

    const seatsTotal = 10;
    const seatsUsed = $derived(6 + invited.length);
    const emailIsValid = $derived(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    const emailVariant = $derived.by(() => {
        if (!emailTouched || email.length === 0) return "default";
        return emailIsValid ? "success" : "error";
    });
    const emailMessage = $derived.by(() => {
        if (emailVariant === "error") return "Enter an email address like ada@example.com.";
        if (emailVariant === "success") return "Looks good.";
        return "";
    });

    function sendInvite(event: SubmitEvent) {
        event.preventDefault();
        emailTouched = true;
        if (!emailIsValid || sending || seatsUsed >= seatsTotal) return;
        sending = true;
        clearTimeout(sendTimer);
        sendTimer = setTimeout(() => {
            invited = [...invited, email];
            email = "";
            emailTouched = false;
            sending = false;
        }, 900);
    }
</script>

<div class="specimen" data-names={showNames}>
    <div class="specimen-card rounded-3xl border border-border bg-card p-6 sm:p-8">
        <div class="flex items-start justify-between gap-4">
            <div>
                <h2 class="display text-2xl font-semibold text-headline">
                    Invite a teammate
                </h2>
                <p class="mt-1 text-sm text-description">
                    A working form, assembled from the library.
                </p>
            </div>
            <button
                type="button"
                class="focus-ring inline-flex h-7 shrink-0 cursor-pointer items-center rounded-full border border-border px-3 text-xs font-semibold text-label transition-colors hover:bg-surface-hover aria-pressed:bg-action-primary-subtle aria-pressed:text-headline"
                aria-pressed={showNames}
                onclick={() => (showNames = !showNames)}
            >
                Component names
            </button>
        </div>

        <form class="mt-6 space-y-6" novalidate onsubmit={sendInvite}>
            <div class="part">
                <span class="tag" aria-hidden="true">Input</span>
                <Input
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="ada@example.com"
                    bind:value={email}
                    onblur={() => (emailTouched = true)}
                    variant={emailVariant}
                    message={emailMessage}
                    class="min-w-0"
                />
            </div>

            <div class="part">
                <span class="tag" aria-hidden="true">RadioGroup</span>
                <RadioGroup
                    legend="Role"
                    bind:value={role}
                    options={[
                        { value: "viewer", label: "Viewer", description: "Can read and comment" },
                        { value: "editor", label: "Editor", description: "Can change content" },
                    ]}
                />
            </div>

            <div class="part">
                <span class="tag" aria-hidden="true">Checkbox</span>
                <Checkbox
                    name="welcome"
                    label="Send a welcome email"
                    bind:checked={sendWelcome}
                />
            </div>

            <div class="part">
                <span class="tag" aria-hidden="true">Progress</span>
                <Progress
                    label={`Seats used: ${seatsUsed} of ${seatsTotal}`}
                    value={seatsUsed}
                    max={seatsTotal}
                    size="sm"
                />
            </div>

            <div class="part flex flex-wrap items-center justify-end gap-3 pt-2">
                <span class="tag" aria-hidden="true">Button</span>
                <Button
                    variant="ghost"
                    size="sm"
                    type="reset"
                    onclick={() => {
                        email = "";
                        emailTouched = false;
                        role = "editor";
                        sendWelcome = true;
                    }}
                >
                    Clear
                </Button>
                <Button
                    variant="primary"
                    size="sm"
                    type="submit"
                    loading={sending}
                    disabled={seatsUsed >= seatsTotal}
                >
                    {sending ? "Sending invite" : "Send invite"}
                </Button>
            </div>
        </form>

        <div class="mt-4 min-h-8" aria-live="polite">
            {#if invited.length > 0}
                <div class="part flex flex-wrap items-center gap-2">
                    <span class="tag" aria-hidden="true">Badge</span>
                    {#each invited as address (address)}
                        <Badge variant="success" size="sm" text={`Invited ${address}`} />
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .specimen {
        position: relative;
    }

    .part {
        position: relative;
    }

    /* Anatomy labels: pinned to the left edge of the card on wide screens, inline above on narrow ones. */
    .tag {
        display: none;
        font-size: 0.6875rem;
        line-height: 1rem;
        font-weight: 700;
        letter-spacing: 0.01em;
        color: var(--color-link);
    }

    .specimen[data-names="true"] .tag {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        margin-bottom: 0.25rem;
    }

    .specimen[data-names="true"] .tag::before {
        content: "";
        width: 0.375rem;
        height: 0.375rem;
        border-radius: 999px;
        background: currentColor;
    }

    .specimen[data-names="true"] .part {
        outline: 1px dashed color-mix(in srgb, var(--color-link) 45%, transparent);
        outline-offset: 0.5rem;
        border-radius: 0.5rem;
    }

    .part.flex .tag {
        margin-right: auto;
    }

    @media (min-width: 1280px) {
        .specimen[data-names="true"] .part:not(.flex) .tag {
            position: absolute;
            right: calc(100% + 3.25rem);
            top: 0;
            margin: 0;
            white-space: nowrap;
        }

        .specimen[data-names="true"] .part:not(.flex) .tag::after {
            content: "";
            position: absolute;
            left: calc(100% + 0.5rem);
            top: 50%;
            width: 2rem;
            border-top: 1px solid color-mix(in srgb, var(--color-link) 55%, transparent);
        }
    }
</style>
