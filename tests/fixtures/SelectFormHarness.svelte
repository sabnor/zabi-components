<script lang="ts">
    import Select from "../../src/components/atoms/Select.svelte";

    const options = [
        { value: 1, label: "Apple" },
        { value: 2, label: "Banana" },
    ];
</script>

<form data-testid="form">
    <Select name="fruit" label="Fruit" {options} value="2" />
</form>
