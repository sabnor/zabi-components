<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let method: "get" | "post" = "post";
    export let action = "";
    export let className = "";

    const dispatch = createEventDispatcher<{
        submit: { data: any; formData: FormData; event: SubmitEvent };
    }>();

    function handleSubmit(event: SubmitEvent) {
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        dispatch("submit", { data, formData, event });
    }
</script>

<form
    {method}
    {action}
    class="form {className}"
    on:submit|preventDefault={handleSubmit}
>
    <slot />
</form>

<style>
    .form {
        @apply space-y-4;
    }

    :global(.form .form-field) {
        @apply space-y-2;
    }

    :global(.form .form-label) {
        @apply block text-sm font-medium;
        color: rgb(var(--color-text));
    }

    :global(.form .form-input) {
        @apply w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2;
        border-color: rgb(var(--color-border));
        color: rgb(var(--color-text));
        background-color: rgb(var(--color-surface));
    }

    :global(.form .form-input:focus) {
        border-color: rgb(var(--color-border-focus));
        ring-color: rgb(var(--color-focus-ring));
    }

    :global(.form .form-actions) {
        @apply flex gap-3 pt-4;
    }
</style>
