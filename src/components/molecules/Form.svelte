<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let method: "get" | "post" = "post";
    export let action: string = "";
    export let className: string = "";

    const dispatch = createEventDispatcher();

    function handleSubmit(event: SubmitEvent) {
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        dispatch("submit", { data, formData, event });
    }
</script>

<form
    {method}
    {action}
    class="space-y-4 {className}"
    on:submit|preventDefault={handleSubmit}
>
    <slot />
</form>
