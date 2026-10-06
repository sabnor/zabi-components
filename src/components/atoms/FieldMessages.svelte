<script lang="ts">
    import CheckCircle from "@lucide/svelte/icons/circle-check-big";
    import AlertCircle from "@lucide/svelte/icons/circle-alert";
    import AlertTriangle from "@lucide/svelte/icons/triangle-alert";
    import { cn } from "../util/cn.js";
    import { fieldHintId, fieldMessageId, type FieldMessageState } from "../util/field.js";

    /**
     * The text under a field: its status message and its hint. Internal: it is
     * not exported from the package. Input, Textarea and Select render it, and
     * DateField and TimeField through Input, so the markup, the ids and the
     * way a message is announced are the same in all of them.
     *
     * The ids are the ones `fieldDescribedBy` lists on the control.
     */
    interface Props {
        /** Id of the control the text belongs to. */
        fieldId: string;
        /** From `fieldMessageState`. */
        status: FieldMessageState;
        hint?: string;
        /** Distance from the control, and between the two: Textarea and Select sit 4px closer. */
        gap?: "mt-1" | "mt-2";
        /** Extra classes for the status message. */
        messageClass?: string;
    }

    let { fieldId, status, hint = "", gap = "mt-2", messageClass = "" }: Props = $props();

    // Message text uses the `-text` step (700), which clears 4.5:1 on a page
    // surface; the solid fill step (600) is for fills, not for small text.
    const toneClass = $derived(
        status.variant === "error"
            ? "text-error-text"
            : status.variant === "success"
              ? "text-success-text"
              : status.variant === "warning"
                ? "text-warning-text"
                : "text-description",
    );

    const Icon = $derived(
        status.variant === "error"
            ? AlertCircle
            : status.variant === "success"
              ? CheckCircle
              : status.variant === "warning"
                ? AlertTriangle
                : null,
    );
</script>

{#if status.showMessage}
    <p
        id={fieldMessageId(fieldId)}
        class={cn("flex items-center gap-2 text-sm", gap, toneClass, messageClass)}
        role={status.variant === "error" ? "alert" : "status"}
        aria-live={status.variant === "error" ? "assertive" : "polite"}
    >
        {#if Icon}
            <Icon size={14} class="shrink-0" />
        {/if}
        <span>{status.message}</span>
    </p>
{/if}
{#if status.showHint}
    <!-- Not a live region: a hint is there from the start and is read with the field. -->
    <p id={fieldHintId(fieldId)} class={cn("text-sm text-description", gap)}>{hint}</p>
{/if}
