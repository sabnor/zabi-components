<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let text: string = "";
    export let onClick: () => void = () => {};
    export let variant:
        | "brand"
        | "primary"
        | "secondary"
        | "success"
        | "danger"
        | "ghost" = "brand";
    export let size: "sm" | "md" | "lg" = "md";
    export let disabled: boolean = false;
    export let loading: boolean = false;
    export let fullWidth: boolean = false;
    export let type: "button" | "submit" | "reset" = "button";
    export let className: string = "";
    export let uppercased: boolean = variant === "brand";
    export let grain: boolean | "auto" = "auto";
    export let grainType: "paper" | "canvas" | "cyber" = "paper";

    const dispatch = createEventDispatcher();

    function handleClick(event: MouseEvent) {
        if (disabled || loading) {
            event.preventDefault();
            return;
        }
        onClick?.();
        dispatch("click", event);
    }

    $: shouldApplyGrain =
        grain === true || (grain === "auto" && variant !== "ghost");

    $: grainClasses = shouldApplyGrain
        ? [
              "btn-grain",
              grainType !== "paper" ? `btn-grain-${grainType}` : "",
              variant === "brand" && grainType === "paper"
                  ? "btn-grain-cyber"
                  : "",
          ]
              .filter(Boolean)
              .join(" ")
        : "";

    const baseClasses =
        "transition-all duration-200 inline-flex items-center justify-center gap-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden";

    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm md:text-base",
        lg: "px-5 py-3 text-base",
    };

    const variantClasses = {
        brand: "border border-stone-600 bg-stone-800 text-stone-100 hover:bg-stone-700 hover:border-stone-500 active:scale-[0.98] shadow-sm",
        primary:
            "bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 hover:border-blue-700 active:scale-[0.98] shadow-sm hover:shadow-md",
        secondary:
            "bg-stone-700 text-stone-100 border border-stone-600 hover:bg-stone-600 hover:border-stone-500 active:scale-[0.98] shadow-sm hover:shadow-md",
        success:
            "bg-green-600 text-white border border-green-600 hover:bg-green-700 hover:border-green-700 active:scale-[0.98] shadow-sm hover:shadow-md",
        danger: "bg-red-600 text-white border border-red-600 hover:bg-red-700 hover:border-red-700 active:scale-[0.98] shadow-sm hover:shadow-md",
        ghost: "bg-transparent text-stone-300 border border-stone-600 hover:bg-stone-800 hover:border-stone-500 active:scale-[0.98]",
    };

    $: buttonClasses = [
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        fullWidth ? "w-full" : "",
        uppercased ? "uppercase tracking-wide font-title font-bold" : "",
        grainClasses,
        className,
    ]
        .filter(Boolean)
        .join(" ");
</script>

<button
    {type}
    class={buttonClasses}
    on:click={handleClick}
    disabled={disabled || loading}
    aria-busy={loading ? "true" : "false"}
>
    <!-- Paper grain effect overlay -->
    {#if shouldApplyGrain}
        <div
            class="absolute inset-0 rounded-lg pointer-events-none"
            style="background-image: repeating-radial-gradient(circle at center, rgba(0,0,0,0.1) 0 1px, transparent 1px 100%), repeating-radial-gradient(circle at center, rgba(255,255,255,0.05) 0 1px, transparent 1px 100%); mix-blend-mode: overlay; opacity: 0.6;"
        ></div>
    {/if}

    {#if loading}
        <svg
            class="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            />
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
        </svg>
    {/if}
    <slot>{text}</slot>
</button>
