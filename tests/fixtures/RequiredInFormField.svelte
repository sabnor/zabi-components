<script lang="ts">
    import FormField from "../../src/components/molecules/FormField.svelte";
    import Input from "../../src/components/atoms/Input.svelte";
    import Textarea from "../../src/components/atoms/Textarea.svelte";

    /** An Input or a Textarea inside a required FormField: for tests/required-marker.test.ts. */
    let { kind = "input" }: { kind?: "input" | "textarea" } = $props();
</script>

<FormField label="Email" required>
    {#snippet control(props)}
        {#if kind === "input"}
            <Input {...props} hideLabel label="Email" required />
        {:else}
            <Textarea {...props} hideLabel label="Email" required />
        {/if}
    {/snippet}
</FormField>
