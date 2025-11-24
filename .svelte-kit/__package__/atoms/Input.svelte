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
        type?: string;
        name?: string;
        label?: string;
        placeholder?: string;
        disabled?: boolean;
        size?: SizeVariant;
        variant?: SemanticVariant;
        message?: string;
        oninput?: (event: Event) => void;
    }

    let {
        value = "",
        type = "text",
        name = "",
        label = "",
        placeholder = "",
        disabled = false,
        size = "md",
        variant = "default",
        message = "",
        oninput,
        ...restProps
    }: Props = $props();

    const inputId = generateId("input");

    const sizeClass = $derived(() => {
        if (size === "sm") {
            return {
                padding: "px-4 py-2",
                text: "text-sm",
                leading: "leading-5",
            };
        } else if (size === "lg") {
            return {
                padding: "px-4 py-3",
                text: "text-base",
                leading: "leading-6",
            };
        } else {
            return {
                padding: "px-4 py-2.5",
                text: "text-base",
                leading: "leading-6",
            };
        }
    });

    const variantClass = $derived(() => {
        return variant === "success"
            ? "border-success focus:border-success focus:ring-success"
            : variant === "warning"
              ? "border-warning focus:border-warning focus:ring-warning"
              : variant === "error"
                ? "border-error focus:border-error focus:ring-error"
                : "border-0 focus:ring-2 focus:ring-brand-500"; // default - no border
    });

    const inputClasses = $derived(() => {
        const sizeStyles = sizeClass();
        const baseClasses =
            "w-full bg-input hover:bg-input-hover focus:bg-input-focus disabled:bg-input-disabled rounded-lg transition-all duration-200 placeholder:text-description text-body focus:outline-none focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed";

        return `${baseClasses} ${sizeStyles.padding} ${sizeStyles.text} ${sizeStyles.leading} ${variantClass()}`.trim();
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
        const target = event.target as HTMLInputElement;
        value = target.value;

        if (oninput) {
            oninput(event);
        }
    }
</script>

<div>
    {#if label}
        <label for={inputId} class={labelClasses()}>{label}</label>
    {/if}
    <input
        id={inputId}
        {type}
        {name}
        {value}
        {placeholder}
        {disabled}
        class={inputClasses()}
        oninput={handleInput}
        aria-invalid={variant === "error" ? "true" : undefined}
        aria-describedby={message ? `${inputId}-message` : undefined}
        {...restProps}
    />
    {#if message && variant !== "default"}
        <p id={`${inputId}-message`} class={messageClasses()} role="alert">
            {#if getIcon()}
                {@const Icon = getIcon()}
                <Icon size={14} class="shrink-0" />
            {/if}
            <span>{message}</span>
        </p>
    {/if}
</div>
