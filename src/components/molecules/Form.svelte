<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLFormAttributes } from "svelte/elements";
    import { cn } from "../util/cn.js";

    type Props = Omit<HTMLFormAttributes, "method" | "action" | "onsubmit" | "class"> & {
        method?: "get" | "post";
        action?: string;
        class?: string;
        /** @deprecated use `class`. */
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
        class: classAttr = "",
        className: legacyClass = "",
        novalidate = false,
        onsubmit,
        children,
        ...restProps
    }: Props = $props();

    /** `class` is the public prop; `className` is a deprecated alias.
     * Both are merged here so existing call sites keep working. */
    const className = $derived(cn(`${classAttr} ${legacyClass}`));
</script>

<form
    {method}
    {action}
    novalidate={novalidate || undefined}
    class={cn("space-y-4", className)}
    onsubmit={(event) => onsubmit?.(event)}
    {...restProps}
>
    {@render children?.()}
</form>
