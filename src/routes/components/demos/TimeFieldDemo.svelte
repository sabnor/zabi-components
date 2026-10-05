<script lang="ts">
    import DateTimeFieldDemo from "./DateTimeFieldDemo.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();
</script>

<DateTimeFieldDemo kind="time" {exampleIndex} />
