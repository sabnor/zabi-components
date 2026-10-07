<script lang="ts">
    import SpeechBubble from "../../../components/atoms/SpeechBubble.svelte";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();
</script>

{#if exampleIndex === 0}
    <div class="w-full max-w-xs">
        <SpeechBubble label="Säg så här i luren">
            <p>Hej, vi vill boka bord för quiz på onsdag.</p>
        </SpeechBubble>
    </div>
{:else}
    <div
        class="w-full max-w-xs"
        style="--zabi-bubble-radius: 1.75rem 2.25rem 2rem 2.5rem / 2.25rem 1.75rem 2.5rem 1.9rem; --zabi-bubble-tilt: -1.2deg"
    >
        <SpeechBubble label="Säg så här i luren" side="start">
            <p>Hej, vi vill boka bord för quiz på onsdag, 4 personer.</p>
        </SpeechBubble>
    </div>
{/if}
