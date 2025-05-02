<script>
    import Input from "../src/components/Input.svelte";
</script>

<Input
    placeholder="Type something..."
    onInput={(e) => console.log(e.target.value)}
/>
