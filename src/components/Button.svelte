<script>
    export let label = "Click me";
    export let onClick = () => {};
</script>

<button on:click={onClick}>{label}</button>
