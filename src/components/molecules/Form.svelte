<script lang="ts">
    export let method: "get" | "post" = "post";
    export let action: string = "";
    export let className: string = "";

    function handleSubmit(event: SubmitEvent) {
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        // Form submission is now handled by the parent component
        // through event forwarding
    }
</script>

<form
    {method}
    {action}
    class="space-y-4 {className}"
    on:submit|preventDefault={handleSubmit}
    {...$$restProps}
>
    <slot />
</form>
