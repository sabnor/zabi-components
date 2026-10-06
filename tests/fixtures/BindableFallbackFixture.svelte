<script lang="ts">
    /**
     * What every bindable prop in the library looked like before: a fallback
     * inside `$bindable(...)`. Kept as a fixture so tests/bindable-undefined.test.ts
     * can show that its way of mounting does meet Svelte's `props_invalid_value`
     * when a component is written like this.
     */
    let { value = $bindable("fallback") }: { value?: string } = $props();
</script>

<output>{value}</output>
