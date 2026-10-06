<script lang="ts">
    import AvatarDemo from "./AvatarDemo.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();
</script>

<AvatarDemo {exampleIndex} group />
