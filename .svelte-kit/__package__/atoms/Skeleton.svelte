<script lang="ts">
    interface Props {
        width?: string;
        height?: string;
        className?: string;
        "aria-label"?: string;
    }

    let {
        width = "100%",
        height = "1rem",
        className = "",
        "aria-label": ariaLabel = "Loading...",
        ...restProps
    }: Props = $props();

    const classes = $derived(
        `animate-pulse bg-action-secondary rounded${className ? ` ${className}` : ""}`,
    );
    const styles = $derived(`width: ${width}; height: ${height};`);
</script>

<div
    class={classes}
    style={styles}
    aria-busy="true"
    aria-label={ariaLabel}
    role="status"
    {...restProps}
></div>
