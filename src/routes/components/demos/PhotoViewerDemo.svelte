<script lang="ts">
    import GalleryDemo from "./GalleryDemo.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();
</script>

<GalleryDemo component="PhotoViewer" {exampleIndex} />
