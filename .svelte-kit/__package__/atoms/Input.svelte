<script lang="ts">
    import { CheckCircle, AlertTriangle, AlertCircle } from "@lucide/svelte";
    
    // SSR-safe ID generation
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
        size?: "sm" | "md" | "lg";
        variant?: "default" | "success" | "warning" | "error";
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

    // Generate unique ID - SSR safe (call directly, not in $state)
    const inputId = generateId("input");

    // Size classes matching M3 design specifications
    const sizeClass = $derived(() => {
        if (size === "sm") {
            return {
                padding: "px-4 py-2",
                text: "text-sm",
                leading: "leading-5"
            };
        } else if (size === "lg") {
            return {
                padding: "px-4 py-3",
                text: "text-base",
                leading: "leading-6"
            };
        } else {
            // default md
            return {
                padding: "px-4 py-2.5",
                text: "text-base",
                leading: "leading-6"
            };
        }
    });

    // Variant classes using semantic colors
    const variantClass = $derived(() => {
        return variant === "success"
            ? "border-success focus:border-success focus:ring-success"
            : variant === "warning"
              ? "border-warning focus:border-warning focus:ring-warning"
              : variant === "error"
                ? "border-error focus:border-error focus:ring-error"
                : "border-0 focus:ring-2 focus:ring-brand-500"; // default - no border
    });

    // Input classes matching M3 design
    const inputClasses = $derived(() => {
        const sizeStyles = sizeClass();
        const baseClasses =
            "w-full bg-brand-100 rounded-lg transition-all duration-200 placeholder:text-description text-body focus:outline-none focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed";

        return `${baseClasses} ${sizeStyles.padding} ${sizeStyles.text} ${sizeStyles.leading} ${variantClass()}`.trim();
    });

    // Label classes using semantic text colors
    const labelClasses = $derived(
        () => "block text-sm font-medium text-label mb-1",
    );

    // Message classes based on variant
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

    // Get icon component based on variant
    const getIcon = $derived(() => {
        if (variant === "error") return AlertCircle;
        if (variant === "success") return CheckCircle;
        if (variant === "warning") return AlertTriangle;
        return null;
    });

    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        value = target.value;

        // Call the parent's oninput handler if provided
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
