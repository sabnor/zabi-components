<script lang="ts">
    import Rating from "../../src/components/atoms/Rating.svelte";
    import type { RatingStrings } from "../../src/components/util/rating";

    interface Props {
        initial?: number | null;
        max?: number;
        label?: string;
        hideLabel?: boolean;
        size?: "sm" | "md" | "lg";
        readonly?: boolean;
        clearable?: boolean;
        disabled?: boolean;
        name?: string;
        showValue?: boolean;
        formatValue?: (value: number) => string;
        strings?: Partial<RatingStrings>;
        onchange?: (value: number | null) => void;
    }

    let {
        initial = null,
        max,
        label = "Quiz",
        hideLabel,
        size,
        readonly,
        clearable,
        disabled,
        name = "quiz",
        showValue,
        formatValue,
        strings,
        onchange,
    }: Props = $props();

    // svelte-ignore state_referenced_locally
    let value = $state<number | null>(initial);
</script>

<form data-testid="form">
    <Rating
        bind:value
        {max}
        {label}
        {hideLabel}
        {size}
        {readonly}
        {clearable}
        {disabled}
        {name}
        {showValue}
        {formatValue}
        {strings}
        {onchange}
        data-testid="rating"
    />
</form>
<p data-testid="bound">{String(value)}</p>
<button type="button" data-testid="reset" onclick={() => (value = null)}>Reset</button>
