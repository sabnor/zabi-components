<script lang="ts">
    let { level = 1, text }: { level?: number; text: string } = $props();
</script>

<div class="text-headline" role="heading" aria-level={level}>{text}</div>
