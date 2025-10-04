<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let method: "get" | "post" = "post";
    export let action = "";
    export let className = "";

    const dispatch = createEventDispatcher<FormEvents>();

    function handleSubmit(event: SubmitEvent) {
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        dispatch("submit", { data, formData, event });
    }
</script>

<form {method} {action} class="form {className}" on:submit|preventDefault={handleSubmit}>
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
        @apply block text-sm font-medium text-gray-700;
    }

    :global(.form .form-input) {
        @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500;
    }

    :global(.form .form-actions) {
        @apply flex gap-3 pt-4;
    }
</style>
