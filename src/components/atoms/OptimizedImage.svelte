<script lang="ts">
    import { cn } from "../util/cn.js";

    interface Props {
        src: string;
        alt?: string;
        width?: number | string;
        height?: number | string;
        class?: string;
        /** @deprecated use `class`. */
        className?: string;
    }

    let {
        src,
        alt = "",
        width = "100%",
        height = "auto",
        class: classAttr = "",
        className: legacyClass = "",
        children,
        ...restProps
    } = $props<Props & { children?: any }>();

    /** `class` is the public prop; `className` is a deprecated alias.
     * Both are merged here so existing call sites keep working. */
    const className = $derived(`${classAttr} ${legacyClass}`.trim());
</script>

<img
    {src}
    {alt}
    class={cn("w-full h-auto object-cover", className)}
    style="width: {typeof width === 'number'
        ? width + 'px'
        : width}; height: {typeof height === 'number'
        ? height + 'px'
        : height};"
    loading="lazy"
    {...restProps}
/>
