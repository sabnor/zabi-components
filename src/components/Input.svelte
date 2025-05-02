<script>
    export let value = "";
    export let placeholder = "Enter text";
    export let onInput = () => {};
</script>

<input type="text" bind:value on:input={onInput} {placeholder} />
