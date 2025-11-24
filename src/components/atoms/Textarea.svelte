<script lang="ts">
    import { CheckCircle, AlertTriangle, AlertCircle } from "@lucide/svelte";
    import type { SemanticVariant, SizeVariant } from "../../types/variants.js";

    function generateId(prefix: string = "id"): string {
        if (typeof window !== "undefined") {
            return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
        } else {
            return `${prefix}-ssr-${Date.now()}`;
        }
    }

    interface Props {
        value?: string;
        name?: string;
        label?: string;
        placeholder?: string;
        disabled?: boolean;
        rows?: number;
        size?: SizeVariant;
        variant?: SemanticVariant;
        message?: string;
        oninput?: (event: Event) => void;
    }

    let {
        value = "",
        name = "",
        label = "",
        placeholder = "",
        disabled = false,
        rows = 4,
        variant = "default",
        message = "",
        oninput,
        ...restProps
    }: Props = $props();

    const textareaId = generateId("textarea");

    const variantClass = $derived(() => {
        return variant === "success"
            ? "border-success focus:border-success focus:ring-success"
            : variant === "warning"
              ? "border-warning focus:border-warning focus:ring-warning"
              : variant === "error"
                ? "border-error focus:border-error focus:ring-error"
                : "border-0 focus:ring-2 focus:ring-brand-500"; // default - no border
    });

    const textareaClasses = $derived(() => {
        const baseClasses =
            "w-full bg-input hover:bg-input-hover focus:bg-input-focus disabled:bg-input-disabled rounded-lg transition-all duration-200 placeholder:text-description text-body focus:outline-none focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed resize-y px-4 py-2.5 text-base leading-6";

        return `${baseClasses} ${variantClass()}`.trim();
    });

    const labelClasses = $derived(
        () => "block text-sm font-medium text-label mb-1",
    );

    const messageClasses = $derived(() => {
        if (variant === "error") {
            return "text-error text-sm mt-1 flex items-center gap-1.5";
        } else if (variant === "success") {
            return "text-success text-sm mt-1 flex items-center gap-1.5";
        } else if (variant === "warning") {
            return "text-warning text-sm mt-1 flex items-center gap-1.5";
        }
        return "text-description text-sm mt-1 flex items-center gap-1.5";
    });

    const getIcon = $derived(() => {
        if (variant === "error") return AlertCircle;
        if (variant === "success") return CheckCircle;
        if (variant === "warning") return AlertTriangle;
        return null;
    });

    function handleInput(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        value = target.value;

        if (oninput) {
            oninput(event);
        }
    }
</script>

<div>
    {#if label}
        <label for={textareaId} class={labelClasses()}>{label}</label>
    {/if}
    <textarea
        id={textareaId}
        {name}
        {value}
        {placeholder}
        {disabled}
        {rows}
        class={textareaClasses()}
        oninput={handleInput}
        aria-invalid={variant === "error" ? "true" : undefined}
        aria-describedby={message ? `${textareaId}-message` : undefined}
        {...restProps}
    ></textarea>
    {#if message && variant !== "default"}
        <p id={`${textareaId}-message`} class={messageClasses()} role="alert">
            {#if getIcon()}
                {@const Icon = getIcon()}
                <Icon size={14} class="shrink-0" />
            {/if}
            <span>{message}</span>
        </p>
    {/if}
</div>
