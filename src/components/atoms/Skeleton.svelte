<script lang="ts">
    export let width: string = "100%";
    export let height: string = "1rem";
    export let className: string = "";
</script>

<div
    class="animate-pulse bg-gray-200 rounded {className}"
    style="width: {width}; height: {height};"
    {...$$restProps}
></div>
