<script lang="ts">
    import { CheckCircle, AlertTriangle, AlertCircle } from "@lucide/svelte";
    import type { SemanticVariant, SizeVariant } from "../types/variants.js";
    import { generateId } from "../util/ssr-safe.js";

    interface Props {
        /** Omit to auto-generate; pair with FormField `id` when used inside FormField. */
        id?: string;
        value?: string;
        type?: string;
        name?: string;
        class?: string;
        label?: string;
        /** True when FormField supplies the visible `<label>`. */
        hideLabel?: boolean;
        placeholder?: string;
        required?: boolean;
        disabled?: boolean;
        loading?: boolean;
        size?: SizeVariant;
        variant?: SemanticVariant;
        message?: string;
        oninput?: (event: Event) => void;
        onblur?: (event: Event) => void;
        "aria-label"?: string;
    }

    let {
        id: idProp,
        value = $bindable(""),
        type = "text",
        name = "",
        class: className = "",
        label = "",
        hideLabel = false,
        placeholder = "",
        required = false,
        disabled = false,
        loading = false,
        size = "md",
        variant = "default",
        message = "",
        oninput,
        onblur,
        ...restProps
    }: Props = $props();

    const fallbackId = generateId("input");
    const inputId = $derived(idProp ?? fallbackId);
    const isDisabled = $derived(disabled || loading);

    const sizeClass = $derived(() => {
        if (size === "sm") {
            return {
                padding: "px-4 py-2",
                text: "text-sm",
                leading: "leading-5",
                spinner: "size-4",
            };
        } else if (size === "lg") {
            return {
                padding: "px-4 py-3",
                text: "text-base",
                leading: "leading-6",
                spinner: "size-5",
            };
        } else {
            return {
                padding: "px-4 py-2.5",
                text: "text-base",
                leading: "leading-6",
                spinner: "size-5",
            };
        }
    });

    const variantClass = $derived(() => {
        return variant === "success"
            ? "border-success focus-visible:border-success"
            : variant === "warning"
              ? "border-warning focus-visible:border-warning"
              : variant === "error"
                ? "border-error focus-visible:border-error"
                : "border-input-border focus-visible:border-input-border";
    });

    const inputClasses = $derived(() => {
        const sizeStyles = sizeClass();
        const trailingPad = loading
            ? size === "sm"
                ? "pr-9"
                : "pr-10"
            : "";
        const baseClasses =
            "focus-ring w-full min-w-48 border bg-input hover:bg-input-hover focus-visible:bg-input-focus disabled:bg-input-disabled rounded-lg transition-all duration-200 placeholder:text-description text-body focus:outline-none focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

        return `${baseClasses} ${sizeStyles.padding} ${trailingPad} ${sizeStyles.text} ${sizeStyles.leading} ${variantClass()} ${className}`.trim();
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
        if (oninput) {
            oninput(event);
        }
    }
</script>

<div>
    {#if label && !hideLabel}
        <label for={inputId} class={labelClasses()}>{label}</label>
    {/if}
    <div class="relative">
        <input
            id={inputId}
            {type}
            {name}
            bind:value
            {placeholder}
            {required}
            disabled={isDisabled}
            class={inputClasses()}
            oninput={handleInput}
            {onblur}
            aria-invalid={variant === "error" ? "true" : undefined}
            aria-required={required ? "true" : undefined}
            aria-busy={loading ? "true" : undefined}
            aria-describedby={message ? `${inputId}-message` : undefined}
            {...restProps}
        />
        {#if loading}
            <span
                class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-description"
                aria-hidden="true"
            >
                <span
                    class="inline-block {sizeClass()
                        .spinner} shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70"
                ></span>
            </span>
        {/if}
    </div>
    {#if message && variant !== "default"}
        <p
            id={`${inputId}-message`}
            class={messageClasses()}
            role={variant === "error" ? "alert" : "status"}
            aria-live={variant === "error" ? "assertive" : "polite"}
        >
            {#if getIcon()}
                {@const Icon = getIcon()}
                <Icon size={14} class="shrink-0" />
            {/if}
            <span>{message}</span>
        </p>
    {/if}
</div>
