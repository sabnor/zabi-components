<script lang="ts">
    export let src: string;
    export let alt: string = "";
    export let width: number | string = "100%";
    export let height: number | string = "auto";
    export let className: string = "";
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
    {...$$restProps}
/>
