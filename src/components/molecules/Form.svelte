<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLFormAttributes } from "svelte/elements";

    type Props = Omit<HTMLFormAttributes, "method" | "action" | "onsubmit" | "class"> & {
        method?: "get" | "post";
        action?: string;
        className?: string;
        /** Skip native constraint validation (e.g. when validating in `onsubmit`). */
        novalidate?: boolean;
        /**
         * Runs on submit. The form still submits natively unless you call
         * `event.preventDefault()` — do so for client-side handling.
         */
        onsubmit?: (event: SubmitEvent) => void;
        children?: Snippet;
    };

    let {
        method = "post",
        action = "",
        className = "",
        novalidate = false,
        onsubmit,
        children,
        ...restProps
    }: Props = $props();
</script>

<form
    {method}
    {action}
    novalidate={novalidate || undefined}
    class="space-y-4 {className}"
    onsubmit={(event) => onsubmit?.(event)}
    {...restProps}
>
    {@render children?.()}
</form>
