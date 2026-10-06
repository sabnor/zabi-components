<script lang="ts">
    import Toaster from '../../components/molecules/Toaster.svelte';
    import Button from '../../components/atoms/Button.svelte';
    import { pushToast } from '../../components/molecules/toast-store.js';
    import type { ToastDuration } from '../../components/util/toaster.js';

    interface Props {
        /** An app in Swedish: its own toasts, and the toaster's own words in Swedish too. */
        swedish?: boolean;
        /** Shows the time left as a sentence, with a button that stops the timer. */
        showCountdown?: boolean;
        /** One of the named lengths: the story then pushes toasts of that length. */
        length?: "short" | "medium" | "long" | "persistent";
        /** What a toast pushed without a duration gets, in place of medium. */
        defaultDuration?: ToastDuration;
    }

    let { swedish = false, showCountdown = false, length, defaultDuration }: Props = $props();

    /** A text that suits each length: what it is for. */
    const samples = {
        short: { message: "Saved", type: "success" },
        medium: { title: "Invitation sent", message: "Maria will get an email with a link to the round.", type: "info" },
        long: {
            title: "Export ready",
            message: "The file is in your Downloads folder, under the name of the report.",
            type: "success",
        },
        persistent: {
            title: "You are offline",
            message: "Changes are kept on this device and sent when the connection is back.",
            type: "warning",
        },
    } as const;

    const sv = {
        regionLabel: "Aviseringar",
        successTitle: "Sparat",
        errorTitle: "Något gick fel",
        warningTitle: "Kontrollera",
        infoTitle: "Meddelande",
        closesIn: (seconds: number) => `Stängs om ${seconds} sekunder.`,
        pausedClosesIn: (seconds: number) => `Pausad. Stängs om ${seconds} sekunder.`,
        stop: "Stoppa",
        okay: "Okej",
        expand: "Visa mer",
        collapse: "Visa mindre",
        dismiss: "Stäng aviseringen",
        actionAvailable: (label: string) => `${label} finns.`,
};
</script>

{#if length}
    <div class="space-y-4">
        <Button
            text={`Push a ${length} toast`}
            onclick={() => pushToast({ ...samples[length], duration: length })}
        />
        <Toaster showCountdown={length !== "persistent"} />
    </div>
{:else if swedish}
    <div class="space-y-4" lang="sv">
        <div class="flex flex-wrap gap-2">
            <Button
                text="Spara utkast"
                onclick={() => pushToast({ message: 'Utkastet är sparat.', type: 'success' })}
            />
            <Button
                variant="secondary"
                text="Fel"
                onclick={() =>
                    pushToast({
                        message: 'Det gick inte att spara. Kolla uppkopplingen och försök igen.',
                        detail: 'Servern svarade inte inom tio sekunder.',
                        type: 'error',
                        duration: 0,
                    })}
            />
            <Button
                variant="outline"
                text="Med Ångra"
                onclick={() =>
                    pushToast({
                        title: 'Rundan är arkiverad',
                        message: 'Den finns kvar i arkivet.',
                        type: 'success',
                        action: { label: 'Ångra', onclick: () => pushToast({ message: 'Rundan är tillbaka.' }) },
                    })}
            />
        </div>
        <Toaster strings={sv} {showCountdown} />
    </div>
{:else}
<div class="space-y-4">
    <div class="flex flex-wrap gap-2">
        <Button
            text="Success"
            onclick={() =>
                pushToast({
                    title: 'Changes saved',
                    message:
                        'Some settings may take a few minutes to apply across your workspace.',
                    type: 'success',
                })}
        />
        <Button
            variant="secondary"
            text="Error"
            onclick={() =>
                pushToast({
                    message: 'Something went wrong. Try again.',
                    type: 'error',
                })}
        />
        <Button
            variant="ghost"
            text="Info"
            onclick={() =>
                pushToast({ message: 'Tip: use keyboard shortcuts.', type: 'info' })}
        />
        <Button
            variant="outline"
            text="With Undo"
            onclick={() =>
                pushToast({
                    title: 'Project archived',
                    message: 'It is still in the archive, where you can restore it.',
                    type: 'success',
                    // No duration: a toast with an action stays until it is dismissed.
                    action: {
                        label: 'Undo',
                        onclick: () =>
                            pushToast({ message: 'Project restored.', type: 'info' }),
                    },
                })}
        />
    </div>
    <Toaster {showCountdown} {defaultDuration} />
</div>
{/if}
