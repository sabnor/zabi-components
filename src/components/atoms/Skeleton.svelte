<script lang="ts">
    export let width: string = "100%";
    export let height: string = "1rem";
    export let borderRadius: string = "0.5rem";
    export let className: string = "";
</script>

<div
    class="animate-pulse {className}"
    style="width: {width}; height: {height}; border-radius: {borderRadius}; background-color: rgb(var(--color-surface-secondary));"
></div>
