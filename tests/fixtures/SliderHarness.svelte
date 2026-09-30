<script lang="ts">
    import Slider from "../../src/components/atoms/Slider.svelte";

    interface Props {
        initial?: number;
        min?: number;
        max?: number;
        step?: number;
        label?: string;
        hideLabel?: boolean;
        showValue?: boolean;
        percent?: boolean;
        disabled?: boolean;
        size?: "sm" | "md" | "lg";
        message?: string;
        variant?: "default" | "success" | "warning" | "error" | "info";
        oninput?: (event: Event) => void;
        onchange?: (event: Event) => void;
    }

    let {
        initial,
        min,
        max,
        step,
        label = "Volume",
        hideLabel,
        showValue,
        percent = false,
        disabled,
        size,
        message,
        variant,
        oninput,
        onchange,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let value = $state<number>(initial ?? min ?? 0);
</script>

<form data-testid="form">
    <Slider
        bind:value
        name="volume"
        formatValue={percent ? (current) => `${current} %` : undefined}
        {min}
        {max}
        {step}
        {label}
        {hideLabel}
        {showValue}
        {disabled}
        {size}
        {message}
        {variant}
        {oninput}
        {onchange}
        data-testid="range"
    />
</form>
<p data-testid="bound">{String(value)}</p>
