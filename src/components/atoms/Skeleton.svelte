<script lang="ts">
    interface Props {
        width?: string;
        height?: string;
        className?: string;
    }

    let {
        width = "100%",
        height = "1rem",
        className = "",
        children,
        ...restProps
    } = $props<Props & { children?: any }>();
</script>

<div
    class="animate-pulse bg-gray-200 rounded {className}"
    style="width: {width}; height: {height};"
    {...restProps}
></div>
