<script lang="ts">
    import Text from "../../src/components/atoms/Text.svelte";

    /** Text takes no rest attributes, so each one sits in a wrapper the test can find it through. */
    const tones = ["inherit", "on-brand", "on-accent", "body", "description", "error"] as const;
</script>

{#each tones as tone (tone)}
    <Text {tone} as="span" class="probe-{tone}">{tone}</Text>
{/each}
