<script lang="ts">
    interface Props {
        src: string;
        alt?: string;
        width?: number | string;
        height?: number | string;
        className?: string;
    }

    let {
        src,
        alt = "",
        width = "100%",
        height = "auto",
        className = "",
        children,
        ...restProps
    } = $props<Props & { children?: any }>();
</script>

<img
    {src}
    {alt}
    class="w-full h-auto object-cover {className}"
    style="width: {typeof width === 'number'
        ? width + 'px'
        : width}; height: {typeof height === 'number'
        ? height + 'px'
        : height};"
    loading="lazy"
    {...restProps}
/>
