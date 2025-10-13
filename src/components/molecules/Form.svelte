<script lang="ts">
    interface Props {
        method?: "get" | "post";
        action?: string;
        className?: string;
        onsubmit?: (event: Event) => void;
    }

    let {
        method = "post",
        action = "",
        className = "",
        children,
        ...restProps
    } = $props<Props & { children?: any }>();

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
    onsubmit={handleSubmit}
    {...restProps}
>
    {@render children?.()}
</form>
