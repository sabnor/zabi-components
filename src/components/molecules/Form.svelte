<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let method: "get" | "post" = "post";
    export let action = "";
    export let className = "";

    const dispatch = createEventDispatcher();

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        dispatch("submit", { data, formData });
    }
</script>

<form {method} {action} class="form {className}" on:submit={handleSubmit}>
    <slot />
</form>

<style>
    .form {
        @apply space-y-4;
    }

    .form :global(.form-field) {
        @apply space-y-2;
    }

    .form :global(.form-label) {
        @apply block text-sm font-medium text-gray-700;
    }

    .form :global(.form-input) {
        @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500;
    }

    .form :global(.form-actions) {
        @apply flex gap-3 pt-4;
    }
</style>
