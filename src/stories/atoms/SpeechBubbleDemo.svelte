<script lang="ts">
    import SpeechBubble from '../../components/atoms/SpeechBubble.svelte';

    type Props = {
        label?: string;
        labelHidden?: boolean;
        side?: 'end' | 'start';
        tone?: 'ink' | 'paper';
        text?: string;
        sparkle?: boolean;
        onBlock?: boolean;
        style?: string;
    };

    let {
        label = 'Säg så här i luren',
        labelHidden = false,
        side = 'end',
        tone = 'ink',
        text = 'Hej, vi vill boka bord för quiz på onsdag, 4 personer.',
        sparkle = false,
        onBlock = false,
        style = ''
    }: Props = $props();
</script>

{#snippet spark()}
    <svg viewBox="0 0 24 24" class="size-6 text-action-primary" fill="currentColor">
        <path d="M12 0C12.7 7.5 16.5 11.3 24 12 16.5 12.7 12.7 16.5 12 24 11.3 16.5 7.5 12.7 0 12 7.5 11.3 11.3 7.5 12 0Z" />
    </svg>
{/snippet}

<div class={onBlock ? 'bg-action-primary on-brand rounded-container p-6' : 'p-6'} style="inline-size: 22rem; {style}">
    <SpeechBubble {label} {labelHidden} {side} {tone} decoration={sparkle ? spark : undefined}>
        <p>{text}</p>
    </SpeechBubble>
</div>
