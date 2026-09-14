<script lang="ts">
    import ImageUpload, {
        type ImageUploadFileDetail,
    } from "../../src/components/molecules/ImageUpload.svelte";

    interface Props {
        onfileselect?: (detail: ImageUploadFileDetail) => void;
    }

    let { onfileselect }: Props = $props();

    let value = $state<string | null>(null);
</script>

<ImageUpload bind:value {onfileselect} />
<output data-testid="bound-value">{value ?? ""}</output>
